<template>
  <div id="Diamondrechargebox" @click.self="delClick">
    <div class="zhezhaos" @click="delClick"></div>
    <div class="bottomDiv">

      <div class="bottomDiv_div">
        <p class="bottomDiv_div_p"><img src="../../assets/wallet/wallet.png" alt="">{{walletamount}}</p>
        <p class="bottomDiv_div_p2">{{  this.$t('diamondrechargebox.blance') }}</p>
      </div>
      <div class="bottomDiv_banner">
        <van-swipe indicator-color="#fff" :autoplay="3000">
          <van-swipe-item v-for="(x, i) in equityList" :key="i">
            <div class="van_swipe_item_div">
              <img :src="x.iconActive" alt="" />
              <div>
                <p style="font-size: 14px;margin-top: 5px;">{{ x.textone }}</p>
                <p style="color: rgba(255,255,255,0.5);margin-top: 3px;font-size: 12px;">{{ x.texttwo }}</p>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="bottomDiv_commodity">
        <div class="bottomDiv_commodity_div" v-for="(x,i) in DiamondList" :key="i" @click="payClicks(x)">
          <div class="bottomDiv_commodity_div_div" style="background: ;">
            <img class="bottomDiv_commodity_div_div_img" v-if=" x.tagUrl != '' && x.tagUrl != null" :src="x.tagUrl" alt="">
            <div class="bottomDiv_commodity_div_div_copywriting">
              <p v-show="x.lable != null && x.v != ''">{{ x.lable }}</p>
              <p><img src="../../assets/wallet/wallet.png" alt=""> {{ x.name }}</p>
            </div>
          </div>
          <div class="bottomDiv_commodity_div_button" :style="{background: x.specsMap.btnClocr}">{{ x.price }}</div>
        </div>
      </div>

      <van-loading color='#fff' style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);" v-show="DiamondList.length <= 0" />

    </div>
    <!-- 挽留弹框 -->
    <Goback v-show="gobackShow == true" @property="property"></Goback>
  </div>
</template>

<script>
import index from "./index.js";
export default index;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
