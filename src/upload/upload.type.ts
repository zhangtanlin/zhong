// upload 模块需要用到的的一些类型

/**
 * 上传之前
 * uploaded:当前文件是否已经上传过
 * part:还有哪些部分未上传
 */
type UploadBeforeType = {
  uploaded: boolean,
  part: string[]
}