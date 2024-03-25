import getEnv from './getEnv'

// 公共url
let baseUrl = ''
let upbaseUrl = ""

if (getEnv() === 'production') {
  /******************************* 正式 *************************************/ 
  baseUrl = 'https://apioperate.guildwebv2.com'
  // upbaseUrl = "https://api.vchatgood.com/api/v2"
  upbaseUrl = "https://api.otohostpro.com/api/v2"
} else if (getEnv() === 'development') {
  /******************************* 开发 ********* **************************** 
//   baseUrl = 'http://aoperatedev.voiceseix.com'
  baseUrl = 'http://aoperatetest.voiceseix.com'
  upbaseUrl = "http://atest.voiceseix.com/api/v2"
} else if (getEnv() === 'test') {
  /******************************* 测试 *************************************/ 
  baseUrl = 'http://aoperatetest.voiceseix.com'
  upbaseUrl = "http://atest.voiceseix.com/api/v2"
} else if(getEnv() === "test") {
  /******************************* 本地 *************************************/ 
  // baseUrl = 'http://192.168.10.51:8081'
  // baseUrl = 'https://apioperate.guildwebv2.com'
  baseUrl = 'http://aoperatetest.voiceseix.com'
  upbaseUrl = "http://atest.voiceseix.com/api/v2"
  // upbaseUrl = "https://api.otohostpro.com/api"
}
console.log(baseUrl,"请求地址")
export { baseUrl,upbaseUrl }
 


