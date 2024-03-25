<template>
  <div></div>
</template>

<script>
import { getQueryString } from "../utils/index";
import { redirectToCheckout, loadAirwallex } from "airwallex-payment-elements";
// redirectToCheckout
import getEnv from "../config/getEnv";
import { networkRequest } from "../api/inedx";
let env = "demo";
if (getEnv() == "production") {
  env = "prod";
} else {
  env = "demo";
}
loadAirwallex({
  env: env, // Can choose other production environments, 'staging | 'demo' | 'prod'
});
export default {
  data() {
    return {
      priceInfo: {},
      currency: "",
      intentId: "",
      clientSecret: "",
    };
  },
  created() {
    this.$nextTick(() => {
      //   this.priceInfo = JSON.parse(decodeURIComponent(getQueryString("params")));
      this.currency = getQueryString("currency");
      this.intentId = getQueryString("intentId");
      this.clientSecret = getQueryString("clientSecret");
    });
    console.log(
      this.priceInfo,
      window.location,
      this.currency,
      this.intentId,
      this.clientSecret
    );
    this.initial();
  },
  mounted() {
    this.bus.$emit("loading", true);
    setTimeout(() => {
      //   this.init(this.priceInfo);
      this.initial();
    }, 800);
  },
  methods: {
    init(val) {
      this.bus.$emit("loading", true);
      networkRequest(
        "v3",
        "/wallet/rechargeorder/thirdPayUnifiedOrderByItemAmount",
        {
          itemId: val.itemId, //商品id
          platformCoins: val.platformCoins, // 金币数量
          payAmountTitle: val.payAmountTitle, // 标题
          payChannelConfigId: val.payChannelConfigId,
          currency: val.currency, // 币种
          tradeAmount: val.tradeAmount, // 支付金额
        }
      ).then((res) => {
        //   console.log(res);
        if (res.code == 200) {
          this.bus.$emit("loading", false);
          redirectToCheckout({
            env: env,
            mode: "payment",
            currency: res.data.currency,
            intent_id: res.data.outTradeNo, // Required, must provide intent details
            client_secret: res.data.airwallexClientSecret, // Required
            successUrl: `${window.location.origin}#/callback?source=1`, // Must be HTTPS sites
          });
        }
      });
    },
    initial() {
      console.log("asd123");
      redirectToCheckout({
        env: env,
        mode: "payment",
        currency: this.currency,
        intent_id: this.intentId, // Required, must provide intent details
        client_secret: this.clientSecret, // Required
        successUrl: `${window.location.origin}#/callback?source=1`, // Must be HTTPS sites
      });
    },
  },
};
</script>
