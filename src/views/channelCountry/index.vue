<template>
  <div id="chaChan" :style="{ 'background': style.bg }">
    <Title :titlecen="titlecen"></Title>
    <div class="div_paro" style="margin-top: 80px;">
      <p>Product</p>
      <p class="div_paro_p2">{{ priceInfo.name }}</p>
    </div>
    <div class="div_paro">
      <p>Price</p>
      <p class="div_paro_p4">{{ priceInfo.price }}</p>
    </div>
    <div class="chaChanTitle">
      <p>Payment</p>
    </div>

    <!-- 渠道列表 -->
    <div class="chaChanPayList">
      <!-- 支付渠道 -->
      <van-loading type="spinner" color="#FF63C6" v-show="payList.length <= 0" />
      <div class="payList-div" @click="pays(x, i)" v-for="(x, i) in payList" :key="i">
        <p class="payList-p1">
          <img :src="x.payTypeLogo ? x.payTypeLogo : require('../../assets/channelCountry/defaultavatar.png')" alt="" />
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
    <button @click="Gopay" :class="payRadio != -1 ? 'button' : 'buttons'" :disabled="payRadio == -1"
      v-preventReClick="3000">
      Confirm
    </button>
    <!-- 遮罩蒙层 -->
    <div class="markbox" v-show="loading">
      <div class="sun-loading">
        <div class="img"></div>
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
