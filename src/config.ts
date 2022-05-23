// 服务端口
export const port: number = 3000;

// 微服务服务端口
export const msPort: number =4000;

// socket服务端口
export const wsPort: number =5000;

// swagger文档服务地址
export const swaggerBaseUrl: string = 'http://localhost:3002'

// 允许跨域的地址数组
export const corsBaseUrlArray: string[] = [
  'http://192.168.1.159:3001',
  'http://localhost:3001',
  'http://localhost:8080',
]

// token加密/解密的密钥
export const passwordKey: string = '我是密钥'

// 图片加密/解密的密钥
export const imgKey: string = '我是图片的密钥'

// 上传视频配置文件夹
export const uploadVideoBaseUrl: string = "/Users/mac/Desktop/"

// 上传图片配置文件夹
export const uploadImageBaseUrl: string = '/Users/mac/Desktop/'
