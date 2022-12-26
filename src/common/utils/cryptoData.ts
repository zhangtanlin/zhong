// 参考文档:https://leeguangxing.cn/blog_post_41.html

// 使用 nodejs 原声提供的方法,生成公私钥
import { Logger } from "@nestjs/common";
import { constants, createSign, createVerify, KeyPairSyncResult, privateDecrypt, publicEncrypt, generateKeyPairSync } from "crypto";
import { readFileSync, writeFileSync } from 'fs';
import { join } from "path";
import { isFolderExist } from "../utils/file";

/**
 * 加解密填充方式
 * [constants.RSA_NO_PADDING]    禁用填充
 * [constants.RSA_PKCS1_PADDING] 什么填充不知道后面再学习
 */
const paddingType: number = constants.RSA_PKCS1_OAEP_PADDING;
// 公钥私钥
let publicKeyStr = "";
let privateKeyStr = "";

/**
 * 生成 rsa 非对称密钥对(私钥公钥)
 * @param {string} passphrase 密码短句
 * @returns { publicKey, privateKey }
 */
export const getKeyPair = (): KeyPairSyncResult<string, string> => {
  return generateKeyPairSync("rsa", {
    // 模数的位数，即密钥的位数，2048 或以上一般是安全的
    // 注意: 这里的字如果设置的太小的话，会导致加密不成功,很可能会出现`msg4 Error: error:0200006E:rsa routines::** too large for key size`
    modulusLength: 4096,
    publicKeyEncoding: {
      // 用于存储公钥信息的语法标准
      type: 'spki',
      // base64 编码的 DER 证书格式
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
  });
}

// 保存非对称密钥文件到指定路径下的文件
export const saveKeyPairFile = async (
  publicKey: string,
  privateKey: string,
) => {
  try {
    isFolderExist(join(__dirname, '../../../ssh'));
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
    Logger.error('密钥保存到本地失败', error);
  }
}

/**
 * 读取私钥公钥文件
 * @param url  路径
 * @returns 
 */
export const getPrivatePublicKey = async (url: string,) => {
  try {
    return await readFileSync(url, 'utf-8');
  } catch (error) {
    return ''
  }
}

/**
 * 公钥加密
 * @param data 需要加密的数据
 * @returns 返回加密之后的 base64 字符串
 */
export const publicEncryptFn = async (data: any): Promise<string> => {
  if (!publicKeyStr) {
    publicKeyStr = await getPrivatePublicKey(
      join(__dirname, '../../../ssh/public.pem'),
    );
  }
  try {
    const msg = JSON.stringify(data);
    const encryptBuffer = publicEncrypt(
      {
        key: publicKeyStr,
        padding: paddingType,
      },
      Buffer.from(msg, 'utf-8'),
    );
    const tempEncrypt = encryptBuffer.toString('base64')
    return tempEncrypt;
  } catch (error) {
    return ''
  }
}

/**
 * 私钥解密
 * @param encryptBase64 为需要解密的 base64
 * @returns 返回解密之后的正常数据,一般为一个对象
 */
export const privateDecryptFn = async (encryptBase64: string) => {
  if (!privateKeyStr) {
    privateKeyStr = await getPrivatePublicKey(
      join(__dirname, '../../../ssh/private.pem'),
    );
  }
  try {
    const tempBuffer = Buffer.from(encryptBase64, 'base64')
    const msgBuffer = privateDecrypt(
      {
        key: privateKeyStr,
        padding: paddingType,
      },
      tempBuffer,
    );
    const tempDecrypt = msgBuffer.toString('utf-8')
    return tempDecrypt;
  } catch (error) {
    return ''
  }
}


/**
 * 私钥签名(待验证)
 * @param {String} signStr 待签名的字符串
 * @returns 返回一个 base64 的字符串
 */
export const privateSignFn = (signStr: String) => {
  try {
    const tempSignBuffer = Buffer.from(signStr, 'utf-8');
    const tempSign = createSign("RSA-SHA256");
    tempSign.update(tempSignBuffer);
    tempSign.end();
    const signatureBuffer = tempSign.sign({
      key: privateKeyStr,
    });
    const signatureString = signatureBuffer.toString('base64');
    return signatureString
  } catch (error) {
    return '';
  }
}

/**
 * 公钥验签(待验证)
 * @param data 需要验签的数据(未签名的数据).
 * @param signatureStr 签名之后的数据(即上面的 privateSignFn 方法的返回值).
 * @returns 
 */
export const publicVerifyFn = (
  data: String,
  signatureStr: String,
) => {
  const tempDataBuffer = Buffer.from(data, 'utf-8');
  const tempSignatureBuffer = Buffer.from(signatureStr, 'base64');
  const tempVerify = createVerify('RSA-SHA256');
  tempVerify.update(tempDataBuffer);
  tempVerify.end();
  const verifyStr = tempVerify.verify(
    publicKeyStr,
    tempSignatureBuffer,
  );
  return verifyStr
}
