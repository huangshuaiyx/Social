// 滚动到顶部
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
  }
}

//获取手机型号
export const  getPhoneType = () => {
  var u = navigator.userAgent;
  console.log(u,'手机型号')
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