<template>
  <div id="diamondrechargebox" @click.self="delClick">
    <div class="diamondrechargebox_bottom">
      <div class="diamondrechargebox_bottom_gift"><img src="../../assets/wallet/gift.png" alt=""></div>
      <div class="diamondrechargebox_bottom_top">
        <img src="../../assets//wallet/wallet_coins.png" alt="">{{ walletamount }}
      </div>
      <div class="diamondrechargebox_shop">
        <div :class="i == 0 ? 'diamondrechargebox_goodsone' : 'diamondrechargebox_goods'" v-for="(x, i) in DiamondList"
          :key="i" @click="payClicks(x)">
          <div class="diamondrechargebox_goods_title">
            <p class="diamondrechargebox_goods_title_p1" v-show="i == 0 && x.lable != null">{{ x.lable }}</p>
            <p class="diamondrechargebox_goods_title_p2" v-show="i == 3 && x.lable != null">{{ x.lable }}</p>
          </div>
          <div class="diamondrechargebox_goods_name">{{ parseInt(x.name) }}</div>
          <div class="diamondrechargebox_goods_preferential">
            <p v-show="i == 2">15% OFF</p>
            <p v-show="i == 3">25% OFF</p>
          </div>
          <div class="diamondrechargebox_goods_icon">
            <img src="../../assets/wallet/walletone.png" v-show="i == 0" alt="">
            <img src="../../assets/wallet/wallettwo.png" v-show="i == 1" alt="">
            <img src="../../assets/wallet/walletthree.png" v-show="i == 2" alt="">
            <img src="../../assets/wallet/walletfour.png" v-show="i == 3" alt="">
          </div>
          <div class="diamondrechargebox_goods_price">
            <div class="diamondrechargebox_goods_original" v-show="i == 0 && x.discountPrice != null">
              <p>{{x.discountPrice}}</p>
              <p>╳</p>
            </div>
            <div class="diamondrechargebox_goods_current">{{ x.price }}</div>
          </div>
        </div>
        <van-loading color='#fff' style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);"
            v-show="DiamondList.length <= 0" />
      </div>

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
