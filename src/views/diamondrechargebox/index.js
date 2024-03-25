import { getQueryString } from "../../utils/index";
import {
  setTitleBar,
  close,
  getUserInfos,
  networkRequest,
  JumpH5,
  getGoodsListSkus,
  closeNative
} from "../../api/inedx";

import Goback from "../../components/goback.vue"
// import 'dsbridge_flutter'

export default {
  components: {
    Goback
  },
  data() {
    return {
      walletamount: 0, // 余额
      DiamondList: [],
      // 我已支付弹框
      // hidedisplay: false,
      /** 挽留弹框 */
      gobackShow: false,
      /**banner */
      walletImg: "",
      loading: false,
      dsBridge: require("dsbridge"),
      hidden: 395,
      title: {}, //背景
      goldcoinData: {}, // 余额
      formData: {}, // 商品配置
      time: null,
      userInfos: {},
      rechargesource: {
        source: "",
        subSource: "",
        bizId: "",
        providerId: "",
        ext: "",
        orderType: "recharge",
        pcode: getQueryString("pcode"),
        closeParentActivity: getQueryString("closeParentActivity")
      },

    };
  },
  created() {
    setTitleBar("", false, true);
    // 重新加载
    let that = this;
    dsBridge.registerAsyn("jsCall", function (url, callback) {
      //解析url，执行动作
      if (url == "/intercept") {
        that.delClick()
      } else {
        console.log("不必运行");
      }
      callback(""); //返回一个带 code 、msg、data的json
    });
    this.time = new Date().getTime();
    this.rechargesource.source = getQueryString("source")
    this.rechargesource.subSource = getQueryString("subSource")
    this.rechargesource.bizId = getQueryString("bizId")
    this.rechargesource.ext = getQueryString("ext")
    this.rechargesource.providerId = getQueryString("providerId")
    this.getWallet({ itemType: 1 })
    this.$store.dispatch("checkthebalance");
    this.walletamount = this.$store.state.balance.balance != undefined ? this.$store.state.balance.balance : 0;
    networkRequest("v1", "/wallet/payOrder/source/save", this.rechargesource)
  },
  mounted() {
    let that = this
    let totalTmie = new Date().getTime()
    this.$store.dispatch("onStatistics", {
      type: "load",
      event: "HP1002000",
      cost: this.time,
      totalCost: totalTmie,
      remark: {
        providerId: getQueryString("providerId") || "",
      },
    });

    getUserInfos().then(res => {
      console.log(res)
      if (res.code == 200) {
        this.userInfos = res.data
      }
    })

    this.dsBridge.register("notify", function (resolve) {
      let asd = JSON.parse(resolve);
      console.log(asd, "弹出")
      if (asd.notifyId == "RECHARGE_SUCCESS") {
        that.$store.dispatch("checkthebalance");
      }
    });

  },
  methods: {
    // 点击遮罩
    overlay() {
      this.gobackShow = true;
    },
    /**接收子数据 */
    property(data) {
      console.log(data);
      this.gobackShow = data;
    },
    delClick() {
      console.log("子元素", this.walletamount);
      if (this.walletamount >= 2000) {
        if (getQueryString("closeParentActivity") == "1") {
          closeNative(getQueryString("pcode"));
          setTimeout(() => {
            close();
          }, 20);
        } else {
          close();
        }
      } else {
        this.gobackShow = true;
      }
    },
    getWallet(x) {
      console.log(x, "获取商品");
      networkRequest("v7", "/wallet/pay/items", x)
        .then((resd) => {
          if (resd.code == 200) {
            let art = [];
            this.DiamondList = resd.data.items
            this.jumpType = resd.data.jumpType
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
            this.$store.dispatch("onStatistics", {
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
                  this.$store.dispatch("onStatistics", {
                    type: "custom",
                    event: "HC1000001",
                    remark: {
                      type: "diamond",
                      commodity: googleArr
                    },
                  });
                  this.DiamondList = arr2
                } else {
                  this.DiamondList = resd.data.items
                }
              } else {
                this.DiamondList = resd.data.items;
                this.$store.dispatch("onStatistics", {
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
    },

    // 点击商品]
    payClicks(val) {
      this.payClick(
        this.jumpType,
        {
          ...val, ...this.rechargesource
        },
        1,
        'HP1401000'
      );
      this.$store.dispatch("onStatistics", {
        type: "click",
        event: "HP1002000",
        remark: { productId: val.productId },
      });
    }
  },
  watch: {
    "$store.state.balance"(newnew, oldold) {
      console.log("balance", newnew, oldold);
      this.walletamount = newnew.balance;
    },
  },
  destroyed() {
    clearInterval(this.myInterval);
  },
};
