import {
  readFileSync,
  writeFileSync,
  unlinkSync,
  existsSync,
  mkdirSync,
  accessSync,
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
): Promise<boolean> => {
  try {
    const writeFilesUrl = join(params?.filePath + params?.fileName)
    writeFileSync(writeFilesUrl, params?.buffer);
    return true; // 成功
  } catch (error) {
    return false; // 失败
  }
}

/**
 * 读取文件【当前默认读取视频目录的文件】
 * @param {string} [params]          参数
 * @param {string} [params.fullPath] 文件全路径(含所在文件夹和文件名)
 * @param {string} [params.fileName] 文件名
 * @param {string} [params.filePath] 文件所在文件夹路径
 * @returns 返回值""或者buffer
 */
export const readFileBuffer = async (
  params: {
    fullPath?: string,
    fileName: string,
    filePath: string,
  }
): Promise<any> => {
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
 * 删除文件【文件地址】
 * @param {string} [params] 参数
 * @param {string} [params.fullPath] 文件全路径(含所在文件夹和文件名)
 * @param {string} [params.fileName] 文件名
 * @param {string} [params.filePath] 文件所在目录路径
 */
export const unlinkFile = async (
  params: {
    fullPath?: string,
    fileName: string,
    filePath: string,
  }
): Promise<boolean> => {
  try {
    let tempPath = "";
    if (params?.fullPath) {
      tempPath = params?.fullPath;
    } else {
      tempPath = join(params?.filePath + params?.fileName);
    }
    unlinkSync(tempPath);
    return true; // 删除成功
  } catch (error) {
    return false; // 删除失败
  }
}

/**
 * 判定文件是否存在
 * @param {string} [pathString] 文件路径
 */
export const isFailExisted = async (
  pathString: string,
): Promise<boolean> => {
  try {
    accessSync(pathString);
    return true; // 存在
  } catch (error) {
    return false; // 不存在
  };
}

/**
 * 判定文件夹是否存在(如果不存在就创建一个)
 * @param {string} [pathString] 文件夹路径
 */
export const isFolderExist = async (
  pathString: string
): Promise<boolean> => {
  try {
    const tempExist = existsSync(pathString);
    if (!tempExist) {
      mkdirSync(pathString);
    }
    return true;
  } catch (error) {
    return false;
  }
}