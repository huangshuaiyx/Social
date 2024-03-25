import getEnv from "./getEnv";

// 公共url
// const baseUrl = "http://dev.withufuture.com/api"; // 恋爱IP
let falseUrl = "0";
let baseUrl = ""; // 恋爱IP
if (getEnv() === "production") {
  //   /** ***************************** 正式 *************************************/
  //   // 恋爱IP
  baseUrl = "https://api.shagvideocallingu.com";
} else if (getEnv() === "test") {
  //   /** ***************************** 测试 *************************************/
  //   // 恋爱IP
  baseUrl = "http://atest.voiceseix.com";
} else {
  //   /** ***************************** 本地 *************************************/
  //   恋爱IP
  baseUrl = "http://atest.voiceseix.com";
}

export { baseUrl, falseUrl };
