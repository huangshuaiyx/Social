import {
    JumpH5,
    close,
    closeNative,
    getGoodsListSkus,
    networkRequest,
    setTitleBars,
} from "../../api/inedx";
import Goback from "../../components/goback.vue";
import { getQueryString } from "../../utils/index";

export default {
  components: {
    Goback,
  },
  data() {
    return {
      vipShopList: [],
      shopId: 0,
      equityList: [
        {
          iconActive: require("../../assets/vip/message.png"),
          text1: "Unlock chat restrictions",
          text2: "Unlimited chatting with anybody",
        },
        {
          iconActive: require("../../assets/vip/phone.png"),
          text1: "Access to calls",
          text2: "Purchase diamonds for calls",
        },
        {
          iconActive: require("../../assets/vip/user.png"),
          text1: "Quality user recommendation",
          text2: "Recommend you better and more enthusiastic girl",
        },
        {
          iconActive: require("../../assets/vip/business.png"),
          text1: "Unlock all personal information",
          text2: "Let more interesting people find you",
        },
        {
          iconActive: require("../../assets/vip/vip.png"),
          text1: "VIP exclusive logo",
          text2: "Can view secret albums and videos",
        },
      ],
      shopData: {}, //承载参数
      gobackShow: false,
      userInfos: {},
      vipShow: false,
      defaultChannelConfig: {},
      backgroundColor: [
        "linear-gradient(270deg, #644AFA 0%, #27A6D8 100%)",
        "linear-gradient(129deg, #934AFF 19%, #79A5FF 88%)",
        "linear-gradient(180deg, #FF6F78 0%, #F783CC 100%)",
      ],
    };
  },
  async created() {
    // this.searchVipstatus();
    // setTitleBars("vip", true, true, { canBack: false });
    this.getWallet({ itemType: 2 });
  },
  mounted() {
    window.delClick = this.delClick;
    let totalTmie = new Date().getTime();
    this.$store.dispatch("onStatistics", {
      type: "load",
      event: "HP1401000",
      cost: this.time,
      totalCost: totalTmie,
      remark: { source: getQueryString("source") },
    });
  },
  methods: {
    searchVipstatus() {
      networkRequest("v2", "/ums/info/getUmsCenter", {}).then((res) => {
        this.vipShow = res.vipInfo.vipStatus == 1 ? true : false;
      });
    },
    /**退出vip */
    delClick() {
      this.getUmsCenter();
      // this.$store.dispatch("onStatistics", {
      //   type: "click",
      //   event: "HE0005002",
      // });
    },
    /**接收子数据 */
    property(data) {
      this.gobackShow = data;
    },
    // 选择商品
    shopClick(x, i) {
      this.shopId = i;
      this.shopData = x;
      this.$store.dispatch("onStatistics", {
        type: "click",
        event: "HE0005001",
        remark: { productId: x.productId },
      });
    },
    // 退出
    getUmsCenter() {
      close() 
      networkRequest("v2", "/ums/info/getUmsCenter", {}).then((res) => {
        console.log(res, "11111111111111");
        if (typeof res.code != undefined) {
          this.userInfos = res;
          if (this.userInfos.vipInfo.vipStatus == 1) {
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
        }
      });
    },
    // 初始商品
    getWallet(x) {
      window.socailNR.call(
        "request",
        { url: "/api/v7/wallet/pay/items", args: x },
        (resd) => {
          console.log(resd, "获取商品");
          if (typeof resd.code != undefined) {
            let art = [];
            this.vipShopList = resd.items;
            this.jumpType = resd.jumpType;
            this.shopData = resd.items[this.shopId];
            this.defaultChannelConfig = resd.defaultChannelConfig;
            resd.items.map((w, i) => {
              let subscribe = {};
              subscribe.productId = w.productId;
              art.push(subscribe);
            });
            this.$store.dispatch("onStatistics", {
              type: "custom",
              event: "HC1300001",
              remark: {
                type: "diamond",
                commodity: art,
              },
            });
            getGoodsListSkus({ skus: art }).then((res) => {
              console.log(res, "获取谷歌商品");
              if (typeof res.code != undefined) {
                let googleArr = [];
                if (res.data.length != 0) {
                  let arr1 = res.data;
                  let arr2 = resd.items;
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
                      commodity: googleArr,
                    },
                  });
                  this.DiamondList = arr2;
                } else {
                  this.DiamondList = resd.items;
                }
              } else {
                this.DiamondList = resd.items;
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
        }
      );

      // networkRequest("v7", "/wallet/pay/items", x)
      //     .then((resd) => {

      //     })
    },
    // 购买vip
    vipPay() {
      if (this.shopId != -1) {
        this.payClick(
          this.jumpType,
          { ...this.shopData, ...this.defaultChannelConfig },
          2,
          "HP1401000"
        );
      } else {
        Toast("Please select a recharge item");
      }
    },
    //  客服
    gocustomer() {
      setTimeout(() => {
        JumpH5("/customerservice");
      }, 200);
      this.$store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001001",
      });
    },
    // 跳转钱包
    getDiamClick() {
      JumpH5("/diamondbulletframe");
    },
    // 跳转vip
    VIPClick() {
      // 显示loading
      this.bus.$emit("loading", true);
      setTimeout(() => {
        this.bus.$emit("loading", false);
        this.vipShow = false;
      }, 1000);
    },
  },
};
