// 参考文档:https://leeguangxing.cn/blog_post_41.html

// 使用 nodejs 原声提供的方法,生成公私钥
import { Logger } from "@nestjs/common";
import { constants, createSign, createVerify, KeyPairSyncResult, privateDecrypt, publicEncrypt, } from "crypto";
import { generateKeyPairSync } from "crypto";
import { writeFileSync } from 'fs';
import { join } from "path";

// 加解密填充方式(偏移量)
const paddingType: number = constants.RSA_PKCS1_PADDING;
// 加解密密码短句
const passphraseStr: any = 'shortpassword';

/**
 * 生成 rsa 非对称密钥对(私钥公钥)
 * @param {string} passphrase 密码短句
 * @returns { publicKey, privateKey }
 */
export const getKeyPair = (): KeyPairSyncResult<string, string> => {
  return generateKeyPairSync("rsa", {
    // 模数的位数，即密钥的位数，2048 或以上一般是安全的
    modulusLength: 2048,
    publicKeyEncoding: {
      // 用于存储公钥信息的语法标准
      type: 'spki',
      // base64 编码的 DER 证书格式
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      // 加密算法和操作模式
      cipher: 'aes-256-cbc',
      // 密码短句
      passphrase: passphraseStr,
    }
  });
}

// 保存非对称密钥文件到指定路径下的文件
export const saveKeyPairFile = (
  publicKey: any,
  privateKey: any,
) => {
  try {
    writeFileSync(
      join(__dirname, '../../../ssh/private.pem'),
      privateKey,
      'utf-8',
    );
    writeFileSync(
      join(__dirname, '../../../ssh/public.pem'),
      publicKey,
      'utf-8',
    );
  } catch (error) {
    Logger.log('密钥保存到本地失败');
  }
}

// 单例-加解密相关
class EncryptDecrypt {
  // 私有化一个单例
  static instance: EncryptDecrypt;
  // 私有化公钥变量
  private _publicKey: any;
  // 私有化私钥变量
  private _privateKey: any;

  /**
   * 私有化构造函数,防止外部调用
   * @param publicKey 
   * @param privateKey 
   * @returns 
   */
  private constructor(
    publicKey?: string,
    privateKey?: string,
  ) {
    // 用以兼容客户端使用 new 重复创建实例.
    if (EncryptDecrypt.instance) {
      return EncryptDecrypt.instance;
    }
    this._publicKey = publicKey;
    this._privateKey = privateKey;
  };

  // 获取单例
  public static getInstance() {
    if (!EncryptDecrypt.instance) {
      const { publicKey, privateKey } = getKeyPair();
      EncryptDecrypt.instance = new EncryptDecrypt(
        publicKey, privateKey,
      );
      saveKeyPairFile(
        publicKey, privateKey,
      );
    }
    return EncryptDecrypt.instance;
  }

  // 获取公钥 key
  getPublicKey = () => {
    return this._publicKey;
  }

  // 获取私钥 key
  getPrivateKey = () => {
    return this._privateKey;
  }

  /**
   * 公钥加密
   * @param data 需要加密的字符串
   * @returns 返回加密之后的 base64 字符串
   */
  publicEncryptFn = (data: String): String => {
    try {
      const msg = JSON.stringify(data);
      const encryptBuffer = publicEncrypt(
        {
          key: this._publicKey,
          padding: paddingType,
        },
        Buffer.from(msg, 'utf-8'),
      );
      return encryptBuffer.toString('base64');
    } catch (error) {
      return ''
    }
  };

  /**
   * 私钥解密方法
   * @param encryptBase64 为需要解密的 base64
   * @returns 返回解密之后的正常数据,一般为一个对象
   */
  privateDecryptFn = (encryptBase64: any) => {
    try {
      const tempBuffer = Buffer.from(encryptBase64, 'base64')
      const msgBuffer = privateDecrypt(
        {
          key: this._privateKey,
          passphrase: passphraseStr,
          padding: paddingType,
        },
        tempBuffer,
      );
      return JSON.parse(msgBuffer.toString('utf-8'));
    } catch (error) {
      return ''
    }
  };

  /**
   * 私钥签名
   * @param {String} signStr 待签名的字符串
   * @returns 返回一个 base64 的字符串
   */
  privateSignFn = (signStr: string) => {
    try {
      const tempSignBuffer = Buffer.from(signStr, 'utf-8');
      const tempSign = createSign("RSA-SHA256");
      tempSign.update(tempSignBuffer);
      tempSign.end();
      const signatureBuffer = tempSign.sign({
        key: this._privateKey,
        passphrase: passphraseStr,
      });
      return signatureBuffer.toString('base64');
    } catch (error) {
      return '';
    }
  }

  /**
   * 公钥验签
   * @param data 需要验签的数据(未签名的数据).
   * @param signatureStr 签名之后的数据(即上面的 privateSignFn 方法的返回值).
   * @returns 
   */
  publicVerifyFn = (
    data: String,
    signatureStr: String,
  ) => {
    const tempDataBuffer = Buffer.from(data, 'utf-8');
    const tempSignatureBuffer = Buffer.from(signatureStr, 'base64');
    const tempVerify = createVerify('RSA-SHA256');
    tempVerify.update(tempDataBuffer);
    tempVerify.end();
    return tempVerify.verify(
      this._publicKey,
      tempSignatureBuffer,
    );
  }
}

export default EncryptDecrypt.getInstance();