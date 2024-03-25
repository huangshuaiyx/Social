<template>
    <div id="member">
        <div class="top">
            <img @click="gocustomer" class="customerRight" src="../../assets/vip/customer@2x.png" alt="">
            <img class="goOutLeft" @click="delClick" src="../../assets/vip/goOut@2x.png" alt="">
        </div>
        <div class="member_bg"></div>

        <van-swipe indicator-color="#fff" :autoplay="3000">
            <van-swipe-item v-for="(x, i) in equityList" :key="i">
                <p class="van-swipe-item-p1">{{ x.text1 }}</p>
                <p class="van-swipe-item-p2">{{ x.text2 }}</p>
                <div class="van_swipe_item_div">
                    <img :src="x.iconActive" alt="" />
                </div>
            </van-swipe-item>
        </van-swipe>

        <div class="equity" v-if="vipShow == false">
            <div :class="shopId == i ? 'vipStop' : 'vipStopa'" v-for="(x, i) in vipShopList" :key="i"
                @click="shopClick(x, i)" :style="{ background: backgroundColor[i] }">
                <p class="vipStop_p5">{{ x.lable }}</p>
                <img class="vipStop_img" src="../../assets/vip/identifying.png" alt="">
                <p class="vipStop_p1">{{ x.name }} </p>
                <p class="vipShop_div_p4" v-show="i == 0">
                    {{ (x.price.replace(/[^0-9/.]/gi, "") / x.validDate).toFixed(2) }}/Day
                </p>
                <p class="vipShop_div_p4" v-show="i == 1">
                    {{ (x.price.replace(/[^0-9/.]/gi, "") / x.validDate).toFixed(2) }}/Day
                </p>
                <p class="vipShop_div_p4" v-show="i == 2">
                    {{ (x.price.replace(/[^0-9/.]/gi, "") / x.validDate).toFixed(2) }}/Day
                </p>
                <p class="vipStop_p4">{{ x.price }}</p>
            </div>
            <van-loading color='#fff' style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);"
                v-show="vipShopList.length <= 0" />
        </div>

        <div class="button_div" v-if="vipShow == false && vipShopList.length > 0" @click="vipPay"> <span>{{ shopData.price }}/ {{ shopData.name
        }}</span> </div>
        <div class="button" v-if="vipShow == true">
            <div class="button_wallet" @click="getDiamClick">{{ this.$t('vipopened.diamonds') }}</div>
            <div class="button_vip" @click="VIPClick">{{ this.$t('vipopened.vipTest') }}</div>
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
  