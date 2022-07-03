// 服务端口
export const port: number = 3000;

/**
 * 数据库
 * dbType: 数据库类型
 * dbHost: 数据库ip
 * dbPort: 数据库端口
 * dbUserName: 数据库用户名
 * dbPwd: 数据库密码
 * dbName: 数据库名称
 */
export const dbType: any = 'mysql'
export const dbHost: string = '127.0.0.1'
export const dbPort: number = 3306
export const dbUserName: string = 'root'
export const dbPwd: string = 'Qaz@123456'
export const dbName: string = 'website'

/**
 * redis
 * redisType: 数据库类型
 * redisHost: 数据库ip
 * redisPort: 数据库端口
 * redisPwd: 数据库密码
 * redisDb: 数据库名称
 */
export const redisHost: string = '127.0.0.1'
export const redisPort: number = 6379
export const redisPwd: string = 'Qaz@123456'
export const redisDb: number = 0

// 微服务服务端口
export const msPort: number =4000;

// socket服务端口
export const wsPort: number =5000;

// swagger文档服务地址
export const swaggerBaseUrl: string = 'http://localhost:3002'

// 允许跨域的地址
export const corsUrlArray: string[] = [
  'http://192.168.1.159:3001',
  'http://127.0.0.1:3030',
  'http://localhost:3001',
  'http://localhost:8080',
]

// 允许跨域的请求方式
export const corsMethodsArray: string[] = ['GET', 'POST', 'PUT', 'DELETE']

// token加密/解密的密钥
export const passwordKey: string = '我是密钥'

// 图片加密/解密的密钥
export const imgKey: string = '我是图片的密钥'

// 上传视频配置文件夹
export const uploadVideoBaseUrl: string = "/Users/mac/Desktop/"

// 上传图片配置文件夹
export const uploadImageBaseUrl: string = '/Users/mac/Desktop/'
