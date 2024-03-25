<template>
    <!-- <div id="maskedlayer" @click.stop="maskCkick"> -->
        <!-- <div class="floatingwindowbox"> -->
            <!-- <SvgaComponent :src="imageUrl" class-name="svga-icon"></SvgaComponent> -->
            <!-- <div id="demoCanvas" ref="demoCanvas"></div>
            <div class="countdown">
                <CountDown v-if="data.countdownShow == true"></CountDown>
            </div>
            <p class="copywriting">Top up to continue video chatting</p>
            <div class="commodity">
                <img src="../../assets/floatingwindowgoldcoin.png" alt="" />
                <p class="commodity-name">{{ data.moneyList.name }}</p>
                <p class="commodity-price" @click="placeClick">
                    {{ data.moneyList.price }}
                </p>
            </div>
            <div class="button" @click="placeClick">Top up</div>
        </div> -->
    <!-- </div> -->
</template>
  
<!-- <script setup>
import { onMounted, reactive } from "vue";
import CountDown from "../../components/countDown"
import SVGA from "svgaplayerweb";
import { useStore } from 'vuex';
const store = useStore()
import { getQueryString, iphoneappPay, googleappPay, googleappPayVip, getPhoneType } from "@/utils/index"

const data = reactive({
    imageUrl:
        "https://s3.vchatgood.com/otovideochat/app/recharge_backlight2.svga",
    moneyList: {
        name: null,
        currency: null,
        subscribeType: null,
        productId: null,
        price: null,
        jumpType: 1,
        itemType: 1,
    },
    countdownShow: true,
    formData: {},
    time: new Date().getTime()
})

onMounted(() => {
    initMachineSVGA()
    let that = this;
    data.moneyList.name = getQueryString("name");
    data.moneyList.currency = getQueryString("currency");
    data.moneyList.subscribeType = getQueryString("subscribeType");
    data.moneyList.productId = getQueryString("productId");
    data.moneyList.price = getQueryString("price") || 0;
    data.moneyList.jumpType = getQueryString("jumpType");
    data.moneyList.itemType = getQueryString("itemType");
    // console.log(this.moneyList)
    dsBridge.register("notify", function (resolve) {
        let asd = JSON.parse(resolve);
        data.formData = asd.data
        console.log(asd, asd.notifyId == "ROOM_COUNT_DOWN");
        if (asd.notifyId == "ROOM_COUNT_DOWN") {
            data.countdownShow = true;
        }
    });
    let totalTmie = new Date().getTime()
    let obj = {
        event: "P2100000",
        type: 'load',
        cost: data.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
})

// 动画
const initMachineSVGA = () => {
    var mycanvas = document.getElementById("demoCanvas");
    // 修改容器大小
    mycanvas.style.width = 150 + "px";
    mycanvas.style.height = 150 + "px";
    let player = new SVGA.Player("#demoCanvas");
    let parser = new SVGA.Parser("#demoCanvas");
    // imageUrl 定义一个参数接收url
    parser.load(data.imageUrl, function (videoItem) {
        player.setVideoItem(videoItem);
        player.startAnimation();
    });
}

// 点击
const placeClick = () => {
    notice(1)
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0010001",
    });
    if (getPhoneType() == "Android") {
        if (data.moneyList.jumpType == 0 || data.moneyList.jumpType == null) {
            JumpH5("/paychannelcountry", "", "", false, "", {
                productId: data.moneyList.productId,
                itemType: data.moneyList.itemType,
                price: data.moneyList.price,
                name: data.moneyList.name,
                recommend: data.moneyList.recommend,
                subscribeType: data.moneyList.subscribeType,
                validDate: data.moneyList.validDate,
                currency: data.moneyList.currency,
            });
        } else if (data.moneyList.jumpType == 1) {
            if (data.moneyList.itemType == 1) {
                googleappPay(data.moneyList);
            } else {
                googleappPayVip(data.moneyList,data.formData);
            }
            console.log(data.moneyList)
        } 
        else {
            outerBrowser('www.baidu.com')
        }
    } else {
        iphoneappPay()
    }

}
</script>
  
<style lang="scss" scoped>
@import "./index.scss";
</style>
   -->