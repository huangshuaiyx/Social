// 获取手机型号
export const getPhoneType = () => {
  var u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    // 安卓手机
    return "Android";
  } else if (u.indexOf("iPhone") > -1) {
    // 苹果手机
    return "iPhone";
  } else if (u.indexOf("iPad") > -1) {
    // iPad
    return "iPad";
  } else if (u.indexOf("Windows Phone") > -1) {
    // winphone手机
    return "winphone";
  } else {
    return "other";
  }
};
// 滚动到顶部
// export const scrollToTop = () => {
//   const c = document.documentElement.scrollTop || document.body.scrollTop;
//   if (c > 0) {
//     window.requestAnimationFrame(scrollToTop);
//     window.scrollTo(0, c - c / 8);
//   }
// };
// 身高
export const heightlist = () => {
  const arr = [];
  for (let i = 140; i <= 230; i++) {
    arr.push(`${i}`);
  }
  return arr;
};
// 体重
export const weightlist = () => {
  const arr = [];
  for (let i = 40; i <= 100; i++) {
    arr.push(`${i}`);
  }
  return arr;
};

// 拼接url
export const urlEncode = (param, key, encode) => {
  if (param == null) return "";
  var paramStr = "";
  var t = typeof param;
  if (t == "string" || t == "number" || t == "boolean") {
    paramStr +=
      "&" +
      key +
      "=" +
      (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};
// url获取参数
export function getQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const r =
    window.location.search.substr(1).match(reg) ||
    window.location.hash
      .substring(window.location.hash.search(/\?/) + 1)
      .match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
}
