<template>
  <div id="chaChan">
    <!-- <div class="title">
      <img class="title-img" src="../../assets/channelCountry/return.png" alt="" @click="goBack" />
      <p>Payment</p>
      <div class="title-imgs">
      </div>
    </div> -->
    <div class="div_paro">
      <p>{{ this.$t('channelCountry.Product') }}</p>
      <p class="div_paro_p2">{{ priceInfo.name }}</p>
    </div>
    <div class="div_paro">
      <p>{{ this.$t('channelCountry.Price') }}</p>
      <p class="div_paro_p4">{{ priceInfo.price }}</p>
    </div>
    <div class="chaChanTitle">
      <p>{{ this.$t('channelCountry.Payment') }}</p>
    </div>

    <!-- 渠道列表 -->
    <div class="chaChanPayList">
      <!-- 支付渠道 -->
      <van-loading type="spinner" color="#FF63C6" v-show="payList.length <= 0" />
      <div class="payList-div" @click="pays(x, i)" v-for="(x, i) in payList" :key="i">
        <p class="payList-p1">
          <img :src="x.payTypeLogo" alt="" />
        </p>
        <p :class="x.rewardDesc ? 'payList-divP' : 'payList-div-P'">
          {{ x.payTypeFullName }}
        </p>
        <p class="payList-p4">
          <img v-if="payRadio == i" src="../../assets/channelCountry/Unselected.png" alt="" />
          <img v-else src="../../assets/channelCountry/Selected.png" alt="" />
        </p>
      </div>
    </div>

    <!-- 支付 -->
    <button @click="Gopay" :class="payRadio != -1 ? 'button' : 'buttons'" :disabled="selestShowData">
      {{ priceInfo.price }}/{{ priceInfo.name }}
    </button>
    <!-- 遮罩蒙层 -->
    <div class="markbox" v-show="loading">
      <div class="sun-loading">
        <div class="img"></div>
      </div>
    </div>

    <!-- 支付成功弹框 -->
    <div v-show="paymentSuccessful" class="successfu-markbox">
      <div class="successfu" :style="{ background: `url(${formData.bg}) 0% 0% / cover no-repeat` }">
        <p :style="{ color: formData.tColor }">{{ formData.text }}</p>
        <p :style="{ color: formData.tCColor }">{{ formData.textConter }}</p>
        <button @click="starClick"
          :style="{ background: formData.butBg, border: formData.butBorder, 'border-radius': formData.butRadio, color: formData.butColor }">{{
            formData.butText }}</button>
      </div>
    </div>

  </div>
</template>

<script>
import index from "./index.js";
export default index;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
