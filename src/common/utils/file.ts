import {
  readFileSync,
  writeFileSync,
  unlinkSync,
  access,
  existsSync,
  mkdirSync,
} from "fs";
import { join, } from "path";

/**
 * 存储文件【当前主要为buffer】
 * @param {object} [params]          - 参数
 * @param {string} [params.fileName] - 存储的文件名
 * @param {buffer} [params.buffer]   - 传递过来的二进制数据
 * @param {buffer} [params.filePath] - 存储路径
 * @returns 返回成功失败的boolean状态    
 */
export const saveFileBuffer = async (
  params: {
    fileName: string,
    buffer: Buffer,
    filePath: string,
  }
) => {
  const writeFilesUrl = join(params?.filePath + params?.fileName)
  try {
    writeFileSync(writeFilesUrl, params?.buffer);
    return true;
  } catch (error) {
    return false
  }
}

/**
 * 读取文件【当前默认读取视频目录的文件】
 * @param {string} [params]          - 参数
 * @param {string} [params.fullPath] - 完整的文件路径
 * @param {string} [params.fileName] - 文件名
 * @param {string} [params.filePath] - 文件所在文件路径
 * @returns {any} [cb] - 返回值为null或者buffer
 */
export const readFileBuffer = async (
  params:{
    fullPath?: string,
    fileName: string,
    filePath: string,
  }
) => {
  let tempFilesPath = "";
  if (params?.fullPath) {
    tempFilesPath = params?.fullPath;
  } else {
    tempFilesPath = join(params?.filePath + params?.fileName);
  }
  try {
    return readFileSync(tempFilesPath);
  } catch (error) {
    return "";
  }
}

/**
 * 删除文件【当前默认读取视频目录的文件】
 * @param {string} [fileName] - 文件名
 * @param {string} [filePath] - 文件路径
 */
export const unlinkFile = (
  fileName: string,
  filePath: string,
) => {
  return new Promise((resolve,) => {
    const unlinkFilesPath = join(filePath + fileName)
    unlinkSync(unlinkFilesPath);
    resolve(true);
  }).catch(() => {
    return false;
  });
}

/**
 * 判定文件是否存在
 * @param {string} [path] 文件路径
 */
export const isFailExisted = (path: string,) => {
  return new Promise((resolve, reject) => {
    access(path, (error) => {
      if (error) {
        reject(false); // 不存在
      } else {
        resolve(true); // 存在
      }
    })
  });
}

/**
 * 判定文件夹是否存在(如果不存在就创建一个)
 * @param {string} [pathString] 文件夹路径
 */
export const isFolderExist = (pathString: string) => {
  return new Promise<void>((resolve,) => {
    const tempExist = existsSync(pathString);
    if (!tempExist) {
      mkdirSync(pathString);
    }
    resolve();
  })
}