import Vue from "vue";
import Vuex from "vuex";
let dsBridge = require("dsbridge");
let nativeEnv = dsBridge.call("nativeEnv");
import { networkRequest, getGoodsListSkus } from "../api/inedx";
import { Toast } from "vant";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLanguage: "ar", // 语言
    version: {}, // 版本信息
    ProductInformation: {}, // 商品信息
    hidedisplay: false, // 弹框余额
    balance: { menuTrees: [{ children: [{}, {}, {}] }] }, // 余额信息
    productConfig: [], // 商品配置
    menuTrees: [], // 用户信息
  },
  mutations: {
    // 语言
    APPLANGUAGE(state, params) {
      state.appLanguage = params != undefined ? JSON.parse(params).lan : "en";
      console.log(state, params, '语言')
    },
    // 商品信息
    COMMODITY(state, params) {
      state.ProductInformation = params;
      console.log(state, params);
    },
    // 是否支付弹框
    HIDE_DISPALY(state, params) {
      state.hidedisplay = params;
      console.log(state, params);
    },
    // 余额
    BALANCE(state, params) {
      state.balance = params;
    },
    // 商品配置
    PRODUCT_CONFIG(state, params) {
      state.productConfig = params;
      console.log(state, params);
    },
    // 用户信息
    MENU_TREES(state, params) {
      state.menuTrees = params;
      console.log(state, params);
    },
  },
  actions: {
    // 语言查询
    async appLanguages(context) {
      await context.commit("APPLANGUAGE", nativeEnv);
    },
    // 埋点
    async onStatistics(context, x) {
      let time = dsBridge.call('pageLoadTime') ? dsBridge.call('pageLoadTime') : 0
      console.log('客户端进入h5的time', time);
      // let time = ''
      let cost =
        x.cost != undefined ? (x.totalCost - x.cost) : '';
      let totalCost =
        x.totalCost != undefined
          ? (x.totalCost - time)
          : '';
      console.log(
        x,
        {
          pgName: window.location.hash.split('?')[0].split('#/')[1],
          pgCode: window.location.hash.split('?')[0].split('#/')[1],
          bizId: x.bizId || '',
          cost: cost,
          totalCost: totalCost,
          err: x.err || '',
          remark: x.remark || '',
          userId: x.userId || '',
          activeTime: x.activeTime || '',
          registerTime: x.registerTime || '',
          dt: new Date().getTime(),
          tag: x.tag || '',
          extra: x.extra || '',
          resp: x.resp || '',
        },
        x.cost,
        cost
      );
      await dsBridge.call(
        "call",
        `/onStatistics?event=${x.event}&type=${x.type}&params=${JSON.stringify({
          pgName: window.location.hash.split('?')[0].split('#/')[1],
          pgCode: window.location.hash.split('?')[0].split('#/')[1],
          bizId: x.bizId || '',
          cost: cost || 0,
          totalCost: totalCost || 0,
          err: JSON.stringify(x.err) || '',
          remark: JSON.stringify(x.remark) || '',
          userId: x.userId || '',
          activeTime: x.activeTime || 0,
          registerTime: x.registerTime || 0,
          dt: new Date().getTime(),
          tag: x.tag || '',
          extra: x.extra || '',
          resp: JSON.stringify(x.resp) || '',
        }) || "{}"
        }`

        // &pgName=${window.location.hash}&pgCode=${window.location.hash}&bizId=${
        //   x.bizId || null
        // }&cost=${cost}&totalCost=${x.totalCost}&err=${x.err}&remark=${
        //   x.remark
        // }`,
        // (res) => {
        //   console.log(res);
        // }
      );
    },

    // 获取商品
    getWallet(context, x) {
      console.log(x, "获取商品");
      return new Promise((resolve, reject) => {
        networkRequest("v7", "/wallet/pay/items", x)
          .then((resd) => {
            resolve(resd);
            if (resd.code == 200) {
              let art = [];
              context.commit("COMMODITY", resd.data);
              console.log(resd, "服务器数据")
              resd.data.items.map((w, i) => {
                let subscribe = {};
                subscribe.sku = w.productId;
                if (w.subscribeType == 1) {
                  subscribe.skuType = "inapp";
                } else {
                  subscribe.skuType = "subs";
                }
                art.push(subscribe);
              });
              context.dispatch("onStatistics", {
                type: "custom",
                event: "HC1300001",
                remark: {
                  type: "diamond",
                  commodity: art
                },
              });
              getGoodsListSkus(art).then((res) => {
                console.log(res, "获取谷歌商品");
                if (res.code == 200) {
                  let googleArr = [];
                  if (res.data.length != 0) {
                    let arr1 = res.data;
                    let arr2 = resd.data.items;
                    arr1.map((x) => {
                      googleArr.push(x.productId);
                      arr2.map((c) => {
                        if (c.productId == x.productId) {
                          c.currency = x.price_currency_code;
                          c.price = x.price;
                        }
                      });
                    });
                    context.dispatch("onStatistics", {
                      type: "custom",
                      event: "HC1000001",
                      remark: {
                        type: "diamond",
                        commodity: googleArr
                      },
                    });
                    context.commit("COMMODITY", resd.data);
                  } else {
                    context.commit("COMMODITY", resd.data);
                  }
                } else {
                  context.commit("COMMODITY", resd.data);
                  context.dispatch("onStatistics", {
                    type: "custom",
                    event: "HC1100002",
                    remark: {
                      type: "diamond",
                      err: { code: res.code, body: res.msg },
                    },
                  });
                }
              });
            } else {
              Toast(resd.msg);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });

      // let resd = {
      //   code: 200,
      //   msg: "OK",
      //   data: {
      //     items: [
      //       {
      //         "id": "6454c1be1aeaaf61cae2cb5c",
      //         "productId": "fake13",
      //         "price": "PEN 3.69",
      //         "currency": "PEN",
      //         "name": "1 month",
      //         "discountPrice": "PEN 3.69",
      //         "lable": "80% first choose",
      //         "recommend": 0,
      //         "tagUrl": "https://s3.vchatgood.com/otovideochat/app/vipBackgroundImage.png",
      //         "validDate": 30,
      //         "subscribeType": 1,
      //         "itemLevel": 1,
      //         "itemType": 2,
      //         "specsMap": {
      //           "selectedLinearGradient": "linear-gradient(180deg, #FF6426 0%, #FFB546 100%)",
      //           "backgroundImage": "https://s3.vchatgood.com/otovideochat/app/vipBackgroundImage.png",
      //           "unselectedColor":"#fff"
      //         }
      //       },
      //       {
      //         "id": "6454c1be1aeaaf61cae2ccc3",
      //         "productId": "fake22",
      //         "price": "PEN 3.69",
      //         "currency": "PEN",
      //         "name": "2 months",
      //         "discountPrice": "PEN 3.69",
      //         "lable": "Popular",
      //         "recommend": 1,
      //         "tagUrl": "",
      //         "validDate": 60,
      //         "subscribeType": 1,
      //         "itemLevel": 2,
      //         "itemType": 2,
      //         "specsMap": {
      //           "selectedLinearGradient": "linear-gradient(180deg, #FF6426 0%, #FFB546 100%)",
      //           "backgroundImage": "",
      //           "unselectedColor":"#fff"
      //         }
      //       },
      //       {
      //         "id": "6454c1be1aeaaf61cae2cb9f",
      //         "productId": "fake15",
      //         "price": "PEN 25.99",
      //         "currency": "PEN",
      //         "name": "12 months",
      //         "discountPrice": "PEN 25.99",
      //         "lable": "70% off",
      //         "recommend": 0,
      //         "tagUrl": "",
      //         "validDate": 90,
      //         "subscribeType": 1,
      //         "itemLevel": 3,
      //         "itemType": 2,
      //         "specsMap": {
      //           "selectedLinearGradient": "linear-gradient(180deg, #FF6426 0%, #FFB546 100%)",
      //           "backgroundImage": "",
      //           "unselectedColor":"#fff"
      //         }
      //       }
      //     ],
      //     jumpType: 1,
      //     defaultChannelConfig: {
      //       payChannelConfigId: "636a2e34d5fb245c6fb5b944",
      //       payTypeId: "61ee64abc57e569eb3f60e4b",
      //       payTypeLogo: null,
      //       payTypeFullName: null,
      //       payChannelId: "61e7c615d6be38b57a9aadf2",
      //       payChannelCode: "GOOGLE_PAY",
      //       informationEnable: 0,
      //       informationUrl: null,
      //       payChannelRewardId: null,
      //       rewardDesc: null,
      //       jumpType: 0,
      //     },
      //     subscribe: {
      //       nextSubscriptionTime: "2023-02-18 15:28:49",
      //       nextSubscriptionTimeMs: 1676714329000,
      //     },
      //   },
      //   timestamp: "1656579596184",
      // };
      // if (resd.code == 200) {
      //   let art = [];
      //   setTimeout(() => {
      //     context.commit("COMMODITY", resd.data);
      //   }, 2000);
      //   resd.data.items.map((w, i) => {
      //     let subscribe = {};
      //     subscribe.sku = w.productId;
      //     if (w.subscribeType == 1) {
      //       subscribe.skuType = "inapp";
      //     } else {
      //       subscribe.skuType = "subs";
      //     }
      //     art.push(subscribe);
      //     if (w.recommend == 1) {
      //       this.shopId = i;
      //       this.shopData = w;
      //     }
      //   });
      //   context.dispatch("onStatistics", {
      //     type: "custom",
      //     event: "C1300001",
      //     remark: {
      //       code: resd.code,
      //       body: art,
      //     },
      //   });
      //   // getGoodsListSkusTest(art).then((res) => {
      //   //   console.log(res, "获取谷歌商品");
      //   //   if (res.code == 200) {
      //   //     let googleArr = [];
      //   //     this.noData = false;
      //   //     if (res.data.length != 0) {
      //   //       console.log(res.data, resd.data.items);
      //   //       let arr1 = res.data;
      //   //       let arr2 = resd.data.items;
      //   //       arr1.map((x) => {
      //   //         console.log(x);
      //   //         googleArr.push(x.productId);
      //   //         arr2.map((c) => {
      //   //           if (c.productId == x.productId) {
      //   //             c.currency = x.price_currency_code;
      //   //             c.price = x.price;
      //   //             console.log(c);
      //   //             // this.$set(c, "currency", x.price_currency_code);
      //   //             // this.$set(c, "price", x.price);
      //   //           }
      //   //         });
      //   //       });
      //   //       console.log(arr2);
      //   //       context.commit("COMMODITY", resd.data);
      //   //     } else {
      //   //       context.commit("COMMODITY", resd.data);
      //   //     }
      //   //   } else {
      //   //     this.noData = false;
      //   //     context.commit("COMMODITY", resd.data);
      //   //   }
      //   // });
      // } else {
      //   Toast(resd.msg);
      // }
    },
    // 查询余额
    checkthebalance(context) {
      return new Promise((resolve, reject) => {
        networkRequest("v1", "/wallet/info/extInfo")
          .then((res) => {
            if (res.code == 200) {
              context.commit("BALANCE", res.data);
              context.dispatch("onStatistics", {
                type: "custom",
                event: "HC1300002",
              });
            } else {
              Toast(res.msg);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });

    },
    // 用户信息
    umsInfoByVipPage(context) {
      return new Promise((resolve, reject) => {
        networkRequest("v3", "/ums/info/umsInfoByVipPage").then((res) => {
          if (res.code == 200) {
            context.commit("MENU_TREES", res.data.menuTrees);
            console.log("用户信息", res);
            // this.artisticfont = res.data.menuTrees[0].iconActive;
          }
        });
      });
    },
  },
  modules: {},
});
