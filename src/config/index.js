import getEnv from './getEnv'
// 公共url
let baseUrl = '' // 项目url
if (getEnv() === 'prod') 
// 正式环境
{
  baseUrl = "https://servicesg.mc.cn"; // 正式域名
} else if (getEnv() === 'test') 
// 测试环境
{
  // baseUrl = 'http://47.115.4.243:8080' // 测试域名
} else if (getEnv() === 'localhost') 
// 开发环境
{
  baseUrl = 'http://192.168.1.132:8080' // 线下域名
}

export { baseUrl }
 