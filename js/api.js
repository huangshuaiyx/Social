
var api = {
  networkRequest(url, params = {}, trace = false) {
    console.log(`/api${url}`, params, '传参');
    return new Promise((resolve) => {
      window.dsBridge.call(
        "webRequest",
        {
          url: `/api${url}`,
          method: "POST",
          params: params,
          trace: trace
        },
        (res) => {
          resolve(JSON.parse(res));
        }
      );
    });
  },

  JumpH5(url, params = {},) {
    console.log(`${window.location.origin}${url}?params=${encodeURIComponent(
      JSON.stringify(params)
    )}`)
    return window.dsBridge.call(
      "JumpH5",
      {
        url: `${window.location.origin}${url}?params=${encodeURIComponent(
          JSON.stringify(params)
        )}`
      }
    );
  },

  Jumpbrowser(url) {
    return window.dsBridge.call(
      "Jumpbrowser",
      { url: `${url}` }
    );
  },

  getGoodsListSkus(params) {
    console.log(params, "商品列表sku集合", JSON.stringify(params));
    return new Promise((resolve) => {
      dsBridge.call(
        "googleProducts",
        { params: params },
        (res) => {
          resolve(JSON.parse(res));
        }
      );
    });
  },

  // 支付 google/apple
  getPay(params = {}) {
    return new Promise((resolve) => {
      dsBridge.call(
        "callgooglePay",
        { params: params },
        (res) => {
          console.log(res, '谷歌回调')
          resolve(JSON.parse(res));
        }
      );
    });
  },
}