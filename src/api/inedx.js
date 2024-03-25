var dsBridge = require("dsbridge");
// import 'dsbridge_flutter'

// 获取客户端参数
export const getStorage = (key) => {
  return new Promise((resolve) => {
    dsBridge.call("call", `/getStorage?key=${key}`, (res) => {
      resolve(res);
    });
  });
};

// dsBridge.registerAsyn("jsCall", function (url, callback) {
//   //解析url，执行动作
//   if (url == "/intercept") {
//       that.signout();
//   }
//   callback(""); //返回一个带 code 、msg、data的json
// });

// 网络请求
export const networkRequest = (num, url, params = {}) => {
  return new Promise((resolve) => {
    dsBridge.call(
      "request",
      JSON.stringify({
        url: `api/${num}${url}`,
        method: "POST",
        params: params,
      }),
      (res) => {
        console.log(url, '参数', params, JSON.parse(res))
        resolve(JSON.parse(res));
      }
    );

  });
};

// 获取商品列表 google/apple
export const getGoodsList = (params) => {
  return new Promise((resolve) => {
    dsBridge.call("call", `/getGoodsList?skuList=${params}`, (res) => {
      resolve(JSON.parse(res));
    });
  });
};

// 获取商品列表sku集合 google/apple
export const getGoodsListSkus = (params) => {
  console.log(params, "商品列表sku集合");
  return new Promise((resolve) => {
    dsBridge.call(
      "call",
      `/getSkus?skuList=${JSON.stringify(params)}`,
      (res) => {
        resolve(JSON.parse(res));
      }
    );
  });
};

export const getGoodsListSkusTest = (params) => {
  console.log(params, "商品列表sku集合");
  return new Promise((resolve) => {
    resolve({
      code: "200",
      data: [
        {
          description: "Buy 14,000 diamonds",
          name: "14,000 Diamonds",
          price: "US$2.99",
          price_amount_micros: "2990000",
          price_currency_code: "USD",
          productId: "price4",
          skuDetailsToken:
            "AEuhp4KkTe3XmkVsk7oS2Tp4p7L-696dwMX9UhH9yjehQ6ei1Yc8Cp7Undle0QZHKpBS",
          title: "14,000 Diamonds (VChat：Live Video Chat)", 
          type: "inapp",
        },
        {
          description: "Buy 48,000 diamonds",
          name: "48,000 Diamonds",
          price: "US$9.99",
          price_amount_micros: "9990000",
          price_currency_code: "USD",
          productId: "price3",
          skuDetailsToken:
            "AEuhp4IhZcE5xSUpJnic9Bnfso8d5pCmff2eBoNy6r3KHnbKvNjK2opK4b07uTqFQ-PY",
          title: "48,000 Diamonds (VChat：Live Video Chat)",
          type: "inapp",
        },
        {
          description: "Buy 150,000 diamonds",
          name: "150,000 Diamonds",
          price: "US$28.99",
          price_amount_micros: "28990000",
          price_currency_code: "USD",
          productId: "price1",
          skuDetailsToken:
            "AEuhp4LeG83gz9hJWHIFQYyGqAHR7B_A9Y8lRY-fAbJRuFZ49DWVqGrdeXfj5YEb0tLM",
          title: "150,000 Diamonds (VChat：Live Video Chat)",
          type: "inapp",
        },
        {
          description: "Buy 510,000 diamonds",
          name: "510,000 Diamonds",
          price: "US$99.99",
          price_amount_micros: "99990000",
          price_currency_code: "USD",
          productId: "price2",
          skuDetailsToken:
            "AEuhp4LCFbiDtx0AZi2xfRBhxLTgp_t2XlMKi_pOeMN1pSjBc1UkzzyyxbsTkzHUurwY",
          title: "510,000 Diamonds (VChat：Live Video Chat)",
          type: "inapp",
        },
      ],
    });
  });
};

// 支付 google/apple
export const getPay = (payType, params = {}) => {
  return new Promise((resolve) => {
    dsBridge.call(
      "call",
      `/pay?payType=${payType}&params=${JSON.stringify(params)}`,
      (res) => {
        console.log(res, "getPay")
        resolve(JSON.parse(res));
      }
    );
  });
};

// 关闭当前页面
export const close = () => {
  return new Promise((resolve) => {
    dsBridge.call("call", `/close`, (res) => {
      resolve(res);
    });
  });
};

// 获取地址
export const getLocation = () => {
  return new Promise((resolve) => {
    dsBridge.call("call", `/getLocation`, (res) => {
      resolve(res);
    });
  });
};

// 选择图片/视频上传
export const chooseAndUpload = (
  mediaType,
  max,
  withShoot,
  type = false,
  widths = 1,
  heights = 1
) => {
  return new Promise((resolve) => {
    dsBridge.call(
      "call",
      `/chooseAndUpload?mediaType=${mediaType}&max=${max}&withShoot=${withShoot}&enableCrop=${type}&cropRatioWidth=${widths}&cropRatioHeight=${heights}`,
      (res) => {
        resolve(res != null ? JSON.parse(res) : res);
      }
    );
  });
};

// 跳转原生页面 	/userHome用户  /providerHome服务者  /home	首页
export const JumpValue = (url, user) => {
  return dsBridge.call("call", `/${url}?userId=${user}`);
};

// 获取语言
export const nativeEnv = () => {
  return dsBridge.call("nativeEnv");
};

/** 跳转H5
 *
 * @param {*} url 参数  title标题  hideBack 返回 默认false有返回 
 *   titleBgColor 背景色 titleFgColor 前景色(包括返回按钮)
 *  windowType fullScreen 全屏无标题，此时上面四个设置标题的字段无效  fullTrans  全屏透明，此时上面四个设置标题的字段无效，适用于H5弹窗 
   jumpType 打开新页面 redirect 跳转新页时，同时关闭当前页 popUtil 期望是回退到指定页。 如果在栈里找到就退回指定页并刷新，并弹出其上的所有页面。 如果栈里没有，就回归默认方式，打开新页面
 * @returns
 */

export const JumpH5 = (
  url,
  type = "",
  jump = "",
  hideBack = false,
  can = "",
  params = {},
  closeParentActivity = null,
  pcode = null,
  source = null,
  subSource = null,
  bizId = null,
  ext = null,
  providerId = null,
  orderType = null
) => {
  console.log(`${window.location.origin
    }#${url}?windowType=${type}&jumpType=${jump}&hideBack=${hideBack}&payConfigId=${can}&params=${encodeURIComponent(
      JSON.stringify(params)
    )}`)
  return dsBridge.call(
    "call",
    `${window.location.origin
    }#${url}?windowType=${type}&jumpType=${jump}&hideBack=${hideBack}&payConfigId=${can}&params=${encodeURIComponent(
      JSON.stringify(params)
    )}&closeParentActivity=${closeParentActivity}&pcode=${pcode}&source=${source}&subSource=${subSource}&bizId=${bizId}&ext=${ext}&providerId=${providerId}&orderType=${orderType}`
  );
};

export const JumpH5external = (url, type) => {
  return dsBridge.call("call", `${url}&windowType=${type}`);
};
export const JumpH5externalData = (url, type) => {
  return dsBridge.call("call", `${url}?windowType=${type}`);
};
// 跳转浏览器
export const outerBrowser = (url) => {
  return dsBridge.call("call", `/outerBrowser?url=${encodeURIComponent(url)}`);
};
// 设置客户端当前页面标题
export const setTitleBar = (title, type = false, interceptBack = false, bgColor) => {
  return dsBridge.call(
    "call",
    `/setTitleBar?title=${title}&hideBack=${type}&interceptBack=${interceptBack}`
  );
};

// 刷新H5
export const update = (type) => {
  return dsBridge.call("call", `/update?type=${type}`);
};

// 缓存数据到客户端
export const setStorage = (key, val) => {
  return dsBridge.call(
    "call",
    `/setStorage?key=${key}&value=${JSON.stringify(val)}`
  );
};
// 是否刷新上一页
export const markNeedUpdate = (type) => {
  return dsBridge.call("call", `/markNeedUpdate?type=${type}`);
};

// H5关闭指定原生页面
export const closeNative = (type) => {
  return dsBridge.call("call", `/closeNative?pcode=${type}`);
};

// 回跳app(带参)
/**
 *
 * @param {*} id  // 版本id
 * @param {*} url  // 从外部回来需要打开的H5
 * @param {*} closeUrls // 字符串用“,”号拼接地址
 * @returns
 * url=${encodeURIComponent(
    window.location.origin + "#" + url
  )}&closeUrls=${encodeURIComponent(closeUrls)}
 */
export const socialApp = (id, url = "") => {
  return `social${id}://main/web?url=${encodeURIComponent(url)}`;
};
// 回跳app(不带参)
/**
 *
 * @param {*} id  // 版本id
 * @returns
 * url=${encodeURIComponent(
    window.location.origin + "#" + url
  )}&closeUrls=${encodeURIComponent(closeUrls)}
 */
export const socialAppNo = (id) => {
  return `social${id}://main/web`;
};

//  跳转原生页面
export const goNatived = (pageCode, params = "{}") => {
  return dsBridge.call(
    "call",
    `/goNative?pageCode=${pageCode}&params=${encodeURIComponent(
      JSON.stringify(params)
    )}`
  );
};

//  获取用户信息-getUserInfo
export const getUserInfos = () => {
  return new Promise((resolve) => {
    dsBridge.call("call", `/getUserInfo`, (res) => {
      resolve(JSON.parse(res));
    });
  });
};

// 匹配状态-setMatchStatus
export const setMatchStatus = (status) => {
  return dsBridge.call("call", `/setMatchStatus?status=${status}`);
};

// 匹配状态-setMatchStatus
export const switchTabd = (pageCode) => {
  console.log("跳转匹配页");
  return dsBridge.call("call", `/switchTab?pageCode=${pageCode}`);
};

// 通知客户端 1:关闭倒计时页面
export const notice = (type, toUserId) => {
  return dsBridge.call("call", `/notice?type=${type}&toUserId=${toUserId}`);
};

