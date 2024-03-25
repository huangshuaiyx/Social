import {
  close,
  getGoodsListSkus,
  getUserInfos,
  networkRequest,
  setTitleBars
} from "../../api/inedx";
import Goback from "../../components/goback.vue";
import { getQueryString } from "../../utils/index";

export default {
  components: {
    Goback
  },
  data() {
    return {
      walletamount: 0, // 余额
      DiamondList: [],
      bgColor: [
        { url: require('../../assets/wallet/Mostpopular.png'), bg: "linear-gradient(270deg, #37FCEB 0%, #1B5CF4 100%)", title: 'Most popular' },
        { url: require('../../assets/wallet/Basicone.png'), bg: 'linear-gradient(270deg, #37FCEB 0%, #1B5CF4 100%)', title: 'Basic one' },
        { url: require('../../assets/wallet/Mediumone.png'), bg: "linear-gradient(270deg, #37FCEB 0%, #1B5CF4 100%)", title: 'Medium one', },
        { url: "", bg: "linear-gradient(90deg, #4C84FF 0%, #644AFA 100%)", title: '', }
      ],
      // 我已支付弹框
      // hidedisplay: false,
      /** 挽留弹框 */
      gobackShow: false,
      /**banner */
      walletImg: "",
      loading: false,
      hidden: 395,
      title: {}, //背景
      goldcoinData: {}, // 余额
      formData: {}, // 商品配置
      time: null,
      userInfos: {},
      defaultChannelConfig: {},
      equityList: [
        {
          iconActive: require('../../assets/wallet/video.png'),
          textone: "Video chat",
          texttwo: "Video chat with sexy girls"
        },
        {
          iconActive: require('../../assets/wallet/gift.png'),
          textone: "Give gifts to",
          texttwo: "Someone you like"
        },
        {
          iconActive: require('../../assets/wallet/message.png'),
          textone: "Enjoy private and",
          texttwo: "Secure video calls"
        }
      ],
    };
  },
 async created() {
    await this.$store.dispatch("appLanguages");
    // console.log(params, '语言');params.language
    this.$i18n.locale = this.$store.state.appLanguage
    window.delClick = this.delClick
    this.time = new Date().getTime();
    setTitleBars("vidiamondrechargeboxp", true, true, { canBack: false });
    this.getWallet({ itemType: 1 })
    this.extInfo()

  },
  mounted() {
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
    function jsCall(res) {
      console.log(res, '阿萨')
      if (that.walletamount >= 2000) {
        close();
      } else {
        that.gobackShow = true;
      }
    }

    getUserInfos().then(res => {
      console.log(res)
      if (res.code == 200) {
        this.userInfos = res.data
      }
    })

    this.myInterval = setInterval(() => {
      this.extInfo()
    }, 5000);

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
        close();
      } else {
        this.gobackShow = true;
      }
    },
    getWallet(x) {
      networkRequest("v7", "/wallet/pay/items", x)
        .then((resd) => {
          console.log(typeof (resd), "获取商品");
          if (typeof (resd.code) != undefined) {
            let art = [];
            this.jumpType = resd.jumpType
            this.DiamondList = resd.items
            this.defaultChannelConfig = resd.defaultChannelConfig
            console.log(resd, "服务器数据")
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
                // commodity: art
              },
            });
            getGoodsListSkus(art).then((res) => {
              console.log(res, "获取谷歌商品");
              if (typeof (res.code) != undefined) {
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
                  console.log(googleArr,'googleArr');
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
                  this.DiamondList = resd.items
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
          }
        })
    },
    extInfo() {
      networkRequest("v1", "/wallet/info/extInfo", {}).then((res) => {
        console.log(res, '返回的数据')
        this.walletamount = res.balance
      })
    },

    // 点击商品]
    payClicks(val) {
      console.log(val, '阿松大', this.jumpType)
      this.payClick(
        this.jumpType,
        { ...val, ...this.defaultChannelConfig },
        1,
        'HP1401000'
      );
      this.$store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001003",
        remark: { productId: val.productId },
      });
    },

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
