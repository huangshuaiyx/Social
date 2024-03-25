/**
 * 获取当前系统所处环境
 * 本地开发环境 测试环境 生产环境
 */
export default function getEnv() {
  const url = location.host;
  let env = "";
 if (/ishengqu.com/.test(url)) {
    env = "test";
  } else if (/192.168.10.46/.test(url)) {
    env = "localhost";
  } else {
    env = "production";
  }
  return env;
}
