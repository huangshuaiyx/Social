<template>
  <div class="head">
    <!-- <div class="wallet-top">
      <p>支付结果</p>
    </div> -->
    <div class="head-img">
      <img src="../assets/zhifu.png" alt="" />
      <p>Payment completed</p>
    </div>
    <button @click="ok">Return app</button>
  </div>
</template>

<script>
import { socialApp  } from "../api/inedx";
import { getQueryString } from "../utils/index";
export default {
  name: "bounceback",
  data() {
    return {
      urls: this.$store.state.urls,
      payOrderNo: "",
    };
  },
  mounted() {},
  methods: {

    ok() {
      // /wallet?displayHide=1&payOrderNo=${getQueryString("payOrderNo")}
      let asd = getQueryString('appId')
      window.location.href = socialApp(asd);
      // outerBrowser("https://play.google.com/store/apps/details?id=com.hkfuliao.chamet&referrer=utm_source%3Dtest_source%26utm_medium%3Dtest_medium%26utm_term%3Dtest-term%26utm_content%3Dtest_content%26utm_campaign%3Dtest_name")
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  background: #fff;
  overflow: hidden;
  .wallet-top {
    width: 100%;
    display: flex;
    justify-content: flex-start;

    p {
      width: 100%;
      font-size: (34px/2);
      font-weight: 500;
      color: #222222;
      line-height: 40px;
      text-align: center;
      margin-top: 34px;
    }
  }

  .head-img {
    width: 100%;
    height: 150px;
    text-align: center;
    margin-top: 100px;
    img {
      width: 150px;
      height: 150px;
    }
    p {
      margin-top: 20px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  button {
    width: (470px/2);
    height: 50px;
    background: linear-gradient(0deg, #fec554, #f6cf41);
    border-radius: 50px;
    border: none;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 250px;
    font-size: (30px/2);
    color: #ffffff;
  }
}
</style>
