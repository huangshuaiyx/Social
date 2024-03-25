import {
  outerBrowser,
  getPay,
  networkRequest,
  JumpH5,
  close,
} from "../api/inedx";
import { Toast } from "vant";
export default {
  install(Vue) {
    // 全局变量
    Vue.prototype.overall = {
      getWallet: {},
    };
    // 谷歌支付-商品
    Vue.prototype.getPhoneType = async function (val, Pcode) {
      console.log(val);
      const resd = await networkRequest("v4", "/wallet/rechargeorder/unifiedorder", {
        tradeChannel: 1,
        itemId: val.productId,
        currency: val.currency,
        source: val.source,
        subSource: val.subSource,
        bizId: val.bizId,
        providerId: val.providerId,
        ext: val.ext
      });
      console.log("生成谷歌支付", resd);
      if (resd.code == 200) {
        this.$store.dispatch("onStatistics", {
          type: "custom",
          event: "HC1400008",
        });
        let skuType = "inapp";
        if (val.subscribeType == 1) {
          skuType = "inapp";
        } else {
          skuType = "subs";
        }
        this.bus.$emit("loading", false);
        getPay("google", {
          orderID: resd.data.body,
          sku: resd.data.bizItemId,
          skuType: skuType,
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$store.dispatch("onStatistics", {
              type: "custom",
              event: "HC1100003",
              remark: { Pcode: Pcode, productId: val.productId },
            });
            close()
          } else {
            if (res.msg != "" || res.code == 1000) {
              Toast(res.msg);
            }
            this.$store.dispatch("onStatistics", {
              type: "custom",
              event: "HC1100004",
              err: { code: res.code, body: res.msg, Pcode: Pcode },
            });
            networkRequest("v4", "/wallet/googlePay/inform", {
              orderNo: resd.data.body,
              errorMsg: res.msg,
              errorCode: res.code,
            });
          }
        });
      } else {
        this.bus.$emit("loading", false);
        if (resd.msg != "") {
          Toast(resd.msg);
        }
      }
    };
    // 信用卡支付
    Vue.prototype.airwallex = function (val, type) {
      let asd = type == 1 ? "/wallet/rechargeorder/thirdPayUnifiedOrderByItemAmount" : '/up/vipOrder/buyVipItem'
      let api = type == 1 ? 'v3' : 'v1'
      return networkRequest(
        api,
        asd,
        val
      ).then((res) => {
        //   console.log(res);
        if (res.code == 200) {
          this.$store.dispatch("onStatistics", {
            type: "custom",
            event: "HC1400007",
          });
          outerBrowser(
            `${window.location.origin}#/airwallex?currency=${res.data.currency}&intentId=${res.data.outTradeNo}&clientSecret=${res.data.airwallexClientSecret}`
          );
        } else {
          this.$store.dispatch("onStatistics", {
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
        JumpH5("/channelCountry", "fullScreen", "", false, "", {
          productId: val.productId,
          itemType: type,
          price: val.price,
          name: val.name,
          recommend: val.recommend,
          subscribeType: val.subscribeType,
          validDate: val.validDate,
          currency: val.currency,
          Pcode: Pcode,
        }, val.closeParentActivity,
          val.pcode,
          val.source,
          val.subSource,
          val.bizId,
          val.ext,
          val.providerId, val.orderType);
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
      }
    };
    // 谷歌支付-订阅
    Vue.prototype.googleappPayVip = function (val, Pcode) {
      return networkRequest("v2", "/up/vipOrder/buyVipItem", {
        payChannelCode: val.payChannelCode, // 支付渠道code
        payChannelConfigId: val.payChannelConfigId, // 支付渠道配置id
        skuId: val.productId, // 商品id
        currency: val.currency, // 币种
        source: val.source,
        subSource: val.subSource,
        bizId: val.bizId,
        providerId: val.providerId,
        ext: val.ext
      }).then((resd) => {
        console.log(resd, "谷歌支付vip");
        if (resd.code == 200) {
          this.bus.$emit("loading", false);
          this.$store.dispatch("onStatistics", {
            type: "custom",
            event: "HC1400009",
          });
          let skuType = "inapp";
          if (resd.data.subscribeType == 1) {
            skuType = "inapp";
          } else {
            skuType = "subs";
          }
          getPay("google", {
            orderID: resd.data.payOrderNo,
            sku: resd.data.bizItemId,
            skuType: skuType,
          }).then((res) => {
            if (res.code == 200) {
              this.$store.dispatch("onStatistics", {
                type: "custom",
                event: "HC1100003",
                remark: { Pcode: Pcode, productId: val.productId, type: 'vip' },
              });
              close()
            } else {
              if (res.msg != "" || res.code == 1000) {
                Toast(res.msg);
              }
              this.$store.dispatch("onStatistics", {
                type: "custom",
                event: "HC1100004",
                err: { code: res.code, body: res.msg, Pcode: Pcode },
              });
            }
          });
        } else {
          if (resd.msg != "") {
            Toast(resd.msg);
          }
        }
      });
    };

  },
};
