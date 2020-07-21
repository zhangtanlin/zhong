/**
 * 导入
 * @requires uploadVideoBaseUrl - 上传视频地址 
 */
import * as fs from "fs"
import * as path from 'path'
import { uploadVideoBaseUrl } from "../config"

/**
 * 把id和pid组合成树
 */
export const idPidToTree = (arr) => {
  // 使用reduce给数组定义一个方法
  let formatObj = arr.reduce((pre, cur) => {
    return { ...pre, [cur['id']]: cur }
  }, {})
  // 构造新的数据
  let formatArray = arr.reduce((arr, cur) => {
    let pid = cur.pid ? cur.pid : 0
    let parent = formatObj[pid]
    if (parent) {
      parent.children ? parent.children.push(cur) : (parent.children = [cur])
    } else {
      arr.push(cur)
    }
    return arr
  }, [])
  return formatArray
}

/**
 * 存储文件【当前主要为buffer】
 * @param {string} [fileNameMd5] - 存储的文件名称
 * @param {buffer} [buffer]      - 传递过来的二进制文件
 * @returns {boolean} [cb] - 返回成功失败的状态    
 */
export const saveFileBuffer = async (fileName, buffer, filePath = uploadVideoBaseUrl) => {
  var cb = true
  const writeFilesUrl = path.join(filePath + fileName)
  try {
    await fs.writeFileSync(writeFilesUrl, buffer);
  } catch (error) {
    cb = false
  } finally {
    return cb;
  }
}

/**
 * 读取文件【当前默认读取视频目录的文件】
 * @param {buffer} [buffer] - 传递过来的二进制文件
 * @returns {any} [cb] - 返回值为null或者buffer
 */
export const readFileBuffer = async (fileName, filePath = uploadVideoBaseUrl) => {
  var cb = null;
  const readFilesPath = path.join(filePath + fileName)
  try {
    cb = await fs.readFileSync(readFilesPath);
  } catch (error) {
    cb = null
  } finally {
    return cb;
  }
}

/**
 * 读取文件【当前默认读取视频目录的文件】
 * @param {buffer} [buffer] - 传递过来的二进制文件
 * @returns {any} [cb] - 返回值为null或者buffer
 */
export const unlinkFile = async (fileName, filePath = uploadVideoBaseUrl) => {
  var cb = false;
  const unlinkFilesPath = path.join(filePath + fileName)
  try {
    await fs.unlinkSync(unlinkFilesPath);
    cb = true;
  } catch (error) {
    cb = false
  } finally {
    return cb;
  }
}
