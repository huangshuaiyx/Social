/**
 * 获取当前系统所处环境
 * 本地开发环境 测试环境 生产环境
 */
export default function getEnv() {
  const url = location.host
 
  let env = ''
  if (/operate-test.voiceseix.com/.test(url)) {
    env = 'test'
  } else if (/localhost/.test(url)) {
    env = 'development'
  } else {  
    env = 'production'
  }
  console.log(location.host,/operate.vchatgood.com/.test(url),env)
  return env
}
