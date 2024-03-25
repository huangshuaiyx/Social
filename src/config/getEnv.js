/**
 * 获取当前系统所处环境
 * 本地开发环境 测试环境 生产环境
 */
export default function getEnv() {
  const url = location.host;
  let env = "";
  if (/sg-a.mc.cn/.test(url)) {
    env = "prod";
  } else if (/47.115.4.243/.test(url)) {
    env = "test";
  } else {
    env = "localhost";
  }
  return env;
}