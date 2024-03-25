import {
  outerBrowser,
  getPay,
  networkRequest,
  JumpH5,
  // getGoodsList,
} from "../api/inedx";
import { Toast } from "vant";
import store from '../store/index'
export default {
  install(Vue) {
    // 全局变量
    Vue.prototype.overall = {
      getWallet: {},
    };
    // 谷歌支付-商品
    Vue.prototype.getPhoneType = function (val, Pcode) {
      console.log(val);

      window.socailNR.call("pay", {
        bizItemId: val.productId,
        subscribeType: val.subscribeType,
        currency: val.currency,
        payChannelConfigId:val.payChannelConfigId,
        payChannelId:val.payChannelId,
        payChannelCode:val.payChannelCode,
      },(res) => {
        console.log(res,'调起谷歌')
        if (typeof (res.code) != undefined) {
         store.dispatch("onStatistics", {
            type: "custom",
            event: "HC1400008",
            remark: { Pcode: Pcode, productId: val.productId, type: 'vip' },
          });
        } else {
          if (res.msg != "" || res.code == 1000) {
            Toast(res.msg);
          }
         store.dispatch("onStatistics", {
            type: "custom",
            event: "HC1400009",
            err: { code: res.code, body: res.msg, Pcode: Pcode },
          });
        }
      })

    };
    // 信用卡支付
    Vue.prototype.airwallex = function (val) {
      let name = String(val.name);
      let titles = val.title != null ? val.title : "";
      let payOrice = val.price.replace(/[^0-9/.]/gi, "");
      let form = {
        itemId: val.productId, //商品id
        platformCoins: name.replace(/[^0-9]/gi, ""), // 金币数量
        payAmountTitle: titles.replace(/&/g, "and"), // 标题
        payChannelConfigId: JSON.parse(
          localStorage.getItem("defaultChannelConfig")
        ).payChannelConfigId,
        currency: val.currency, // 币种
        tradeAmount: payOrice, // 支付金额
      };
      return networkRequest(
        "v3",
        "/wallet/rechargeorder/thirdPayUnifiedOrderByItemAmount",
        form
      ).then((res) => {
        //   console.log(res);
        if (typeof (res.code) != undefined) {
          store.dispatch("onStatistics", {
            type: "custom",
            event: "HC1400007",
          });
          outerBrowser(
            `${window.location.origin}#/airwallex?currency=${res.data.currency}&intentId=${res.data.outTradeNo}&clientSecret=${res.data.airwallexClientSecret}`
          );
        } else {
          store.dispatch("onStatistics", {
            type: "custom",
            event: "HC1400004",
          });
        }
      });
    };
    // 点击商品
    Vue.prototype.payClick = function (jumpType, val, type, Pcode) {
      console.log(jumpType, val, type, "casd撒旦阿斯顿");
      this.bus.$emit("loading", true);
      if (jumpType == 0 || jumpType == null) {
        JumpH5("/channelCountry", {
          productId: val.productId,
          itemType: type,
          price: val.price,
          name: val.name,
          recommend: val.recommend,
          subscribeType: val.subscribeType,
          validDate: val.validDate,
          currency: val.currency,
          Pcode: Pcode
        });
        setTimeout(() => {
          this.bus.$emit("loading", false);
        }, 1000);
        localStorage.setItem("time", new Date().getTime());
      } else if (jumpType == 1) {
        if (type == 1) {
          setTimeout(() => {
            this.bus.$emit("loading", false);
            this.getPhoneType(val, Pcode);
          }, 1000);
        } else {
          setTimeout(() => {
            this.bus.$emit("loading", false);
            this.googleappPayVip(val, Pcode);
          }, 1000);
        }
      } else if (jumpType == 4) {
        setTimeout(() => {
          this.bus.$emit("loading", false);
          this.airwallex(val);
        }, 1000);
      } else if (jumpType == 2){
        window.socailNR.call("pay", {
          bizItemId: val.productId,
          subscribeType: val.subscribeType,
          currency: val.currency,
          payChannelConfigId:val.payChannelConfigId,
          payChannelId:val.payChannelId,
          payChannelCode:val.payChannelCode,
        },(res) => {
          this.bus.$emit("loading", false);
          console.log(res,'苹果支付')
          if (typeof (res.code) != undefined) {
            store.dispatch("onStatistics", {
              type: "custom",
              event: "HC1400009",
              remark: { Pcode: Pcode, productId: val.productId, type: 'vip' },
            });
          } else {
            if (res.msg != "" || res.code == 1000) {
              Toast(res.msg);
            }
            store.dispatch("onStatistics", {
              type: "custom",
              event: "HC1400010",
              err: { code: res.code, body: res.msg, Pcode: Pcode },
            });
          }
        })
      }
      store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001003",
        remark: { productId: val.productId },
      });
    };
    // 谷歌支付-订阅
    Vue.prototype.googleappPayVip = function (val, Pcode) {

      store.dispatch("onStatistics", {
        type: "custom",
        event: "HC1400009",
      });
      window.socailNR.call("pay", {
        bizItemId: val.productId,
        subscribeType: val.subscribeType,
        currency: val.currency,
        payChannelConfigId:val.payChannelConfigId,
        payChannelId:val.payChannelId,
        payChannelCode:val.payChannelCode,
      },(res) => {
        console.log(res,'调起谷歌')
        if (typeof (res.code) != undefined) {
          store.dispatch("onStatistics", {
            type: "custom",
            event: "HC1400009",
            remark: { Pcode: Pcode, productId: val.productId, type: 'vip' },
          });
        } else {
          if (res.msg != "" || res.code == 1000) {
            Toast(res.msg);
          }
          store.dispatch("onStatistics", {
            type: "custom",
            event: "HC1400010",
            err: { code: res.code, body: res.msg, Pcode: Pcode },
          });
        }
      })
     


      // let obj = {}
      // window.socailNR.call("request", {
      //   url: '/api/v2/up/vipOrder/buyVipItem',
      //   args: {
      //     payChannelCode: val.payChannelCode, // 支付渠道code
      //     payChannelConfigId: val.payChannelConfigId, // 支付渠道配置id
      //     skuId: val.productId, // 商品id
      //     currency: val.currency, // 币种
      //   }
      // }, (resd) => {
      //   console.log(resd, 'vip下单')
       


        // getPay({
        //   orderID: obj.payOrderNo,
        //   bizItemId: val.productId,
        //   subscribeType: obj.subscribeType,
        //   currency: val.currency
        // }).then((res) => {
        //   console.log(res,'调起谷歌')
        //   if (typeof (res.code) != undefined) {
        //     this.$store.dispatch("onStatistics", {
        //       type: "custom",
        //       event: "HC1100003",
        //       remark: { Pcode: Pcode, productId: val.productId, type: 'vip' },
        //     });
        //   } else {
        //     if (res.msg != "" || res.code == 1000) {
        //       Toast(res.msg);
        //     }
        //     this.$store.dispatch("onStatistics", {
        //       type: "custom",
        //       event: "HC1100004",
        //       err: { code: res.code, body: res.msg, Pcode: Pcode },
        //     });
        //   }
        // });
      // })



      // networkRequest("", "/up/vipOrder/buyVipItem", {
      //   payChannelCode: val.payChannelCode, // 支付渠道code
      //   payChannelConfigId: val.payChannelConfigId, // 支付渠道配置id
      //   skuId: val.productId, // 商品id
      //   currency: val.currency, // 币种
      // }).then((resd) => {
      //   console.log(resd, "谷歌支付vip");

      //   try {
      //     this.$store.dispatch("onStatistics", {
      //       type: "custom",
      //       event: "HC1400009",
      //     });

      //     getPay({
      //       orderID: resd.payOrderNo,
      //       bizItemId: val.productId,
      //       subscribeType: resd.subscribeType,
      //       currency: val.currency
      //     }).then((res) => {
      //       if (res.code == 200) {
      //         this.$store.dispatch("onStatistics", {
      //           type: "custom",
      //           event: "HC1100003",
      //           remark: { Pcode: Pcode, productId: val.productId, type: 'vip' },
      //         });
      //       } else {
      //         if (res.msg != "" || res.code == 1000) {
      //           Toast(res.msg);
      //         }
      //         this.$store.dispatch("onStatistics", {
      //           type: "custom",
      //           event: "HC1100004",
      //           err: { code: res.code, body: res.msg, Pcode: Pcode },
      //         });
      //       }
      //     });
      //   } catch (e) {
      //     alert(e);
      //   }


      // if (resd.code == 200) {

      // } else {
      //   if (resd.msg != "") {
      //     Toast(resd.msg);
      //   }
      // }
      // });
    };

  },
};
