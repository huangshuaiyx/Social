<template>
    <div id="member">
        <div class="isloading" v-if="!data.dataislodaing">
            <SvgaComponent :src="data.imageUrl" class-name="svga-icon"></SvgaComponent>
            <div id="demoCanvas" ref="demoCanvas"></div>
        </div>
        <div class="content" v-if="data.dataislodaing">
            <div class="banner">
                <van-swipe indicator-color="white">
                    <van-swipe-item v-for="(x, i) in data.equityList" :key="i" :autoplay="3000">
                        <div v-if="x.anchorName">
                            <div class="vipanchorbj">
                                <van-image class="anchorimg" round fit="cover" v-if="x.iconActive" :src="x.iconActive">
                                    <template v-slot:loading>
                                        <van-loading type="spinner" size="20" />
                                    </template>
                                </van-image>
                            </div>
                            <div class="anchortext">
                                <div class="imgTexttop">{{ t('vip.anchorText1') }}</div>
                                <div class="imgText">{{ t('vip.anchorText2') }} {{ x.anchorName.length>10? x.anchorName.substring(0, 10) :x.anchorName }} {{ t('vip.anchorText3') }} <span v-show="x.anchorName.length>10">...</span></div>
                            </div>
                        </div>
                        <div v-if="!x.anchorName" class="anchortext">
                            <img  class="noanchorimg" :src="x.iconActive" alt="" />
                            <div class="imgTexttop" v-if="x.bizDesc">{{ x.bizDesc.split(',')[0] }}</div>
                            <div class="imgText" v-if="x.bizDesc">{{ x.bizDesc.split(',')[1] }}</div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>

            <div class="vips" :class="{'vipsmax': data.actionShow,'vipsmin':!data.actionShow}">
                <!--vip商品  -->
                <div class="vipShop">
                    <div class="vipShop-div" :class="'vipShop'+i" v-for="(x, i) in data.vipShopList" :key="i" @click="shopClick(x, i)" v-show="data.datauploading">
                        <!-- <img class="vipShop-div-p1" v-show="i == 0" src="../../assets/vip/viptop.png" alt="" /> -->
                        <div class="shoplabel"><span> {{ x.lable }}</span></div>
                        <div class="labelborder"></div>
                        <div class="itemmonth">{{  x.name }}</div>
                        <img class="vipicon" v-show="i == 0" src="../../assets/silveryvip@2x.png" alt="">
                        <img class="vipicon" v-show="i == 1" src="../../assets/goldenvip@2x.png" alt="">
                        <img class="vipicon" v-show="i == 2" src="../../assets/copperyvip@2x.png" alt="">
                        <div class="station"></div>
                        <div class="symbol">+</div>
                        <div class="conisInfo" v-show="x.giveRechargeAmount">
                            <span>{{ x.giveRechargeAmount }}</span>
                            <img src="../../assets/coinsmoney@2x.png" alt="">
                        </div>
                        <div class="itemtext">{{ t('vip.coinsMonth') }}</div>
                        <div class="vipShopprice" :class="'vipShopprice' + i">
                            ${{(x.price.replace(/[^0-9/.]/gi, "") / 1).toFixed(2) }}/mo
                        </div>
                        <!-- <p class="vipShop-div-p1" v-show="i == 2">70% off</p> -->
                        <!-- <p class="vipShop-div-p2">{{ parseInt(x.name) }}</p> -->
                        <!-- <p class="vipShop-div-p3">{{ x.name.replace(/[^a-zA-Z]/g, "") }}</p> -->
                        <!-- <p class="vipShop-div-p4" v-show="i == 0">
                        Only $ {{ (x.price.replace(/[^0-9/.]/gi, "") / 30).toFixed(2) }}/Day
                    </p>
                    <p class="vipShop-div-p5" v-show="i == 1">
                        $ {{ (x.price.replace(/[^0-9/.]/gi, "") / 0.5).toFixed(2) }}
                    </p>
                    <div class="vipShop-div-p5" v-show="i == 2">
                        $ {{ (x.price.replace(/[^0-9/.]/gi, "") / 0.5).toFixed(2) }}
                    </div>
                    <p class="vipShop-div-p6">{{ x.price }}</p> -->
                    </div>
                </div>
                <!-- <img src="../../assets/vip/mengceng.png" alt="" /> -->

                <!-- <div class="continue" @click="vipPay">Continue</div> -->

                <p class="p-tips">{{ t('vip.timetext') }}</p>
                <div class="p-tipsd tipsd" ref="divDom" v-show="!data.actionShow">
                    {{ t('vip.text1') }}
                </div>
                <div class="p-tipsd" ref="divDom" v-show="data.actionShow">
                    {{ t('vip.text2') }}
                </div>
                <img class="p-img" @click="actionClick" :src="data.actionShow == false ? require('../../assets/vip/unexpanded.png') : require('../../assets/vip/expand.png')" alt="">
            </div>

            <!-- 跳转之前蒙层 -->
            <!-- <div class="mengceng" v-if="maskDisplay">
            <van-loading type="spinner" color="#fff" />
        </div> -->
            <!-- 客服 -->
            <Customerservice></Customerservice>

            <!-- 挽留弹框 -->
            <Fallbackbox :gobackShow="data.gobackShow" @increase="property" :faces="data.faces"></Fallbackbox>
            <!-- 支付成功弹框 -->
            <div class="coinsfew" v-show="data.vipShow">
                <div class="coinsfew-div">
                    <img @click.stop="data.vipShow = false" class="closeImg" src="../../assets/vip/closeImg.png" alt="">
                    <img class="crown" src="../../assets/vipsuccess@2x.png" alt="">
                    <p>{{ t('vip.success1') }} <span class="numtext">{{ data.vipNnumber }}</span> <span>{{ data.vipNnumberText }}</span> {{ t('vip.success2') }}</p>
                    <div class="successok" @click.stop="data.vipShow = false"><span>OK</span></div>
                </div>
            </div>
        </div>
        <!-- load 加载动画 -->
        <div class="walletloading" v-show="store.state.ispayloading">
            <div class="walletloadingimg">
                <SvgaComponent :src="data.imageUrl" class-name="svga-icon"></SvgaComponent>
                <div id="demoCanvasloading" ref="demoCanvasloading"></div>
            </div>
        </div>
    </div>
</template>
  

<script setup>
import { networkRequest, JumpH5, getGoodsListSkus, close, interceptBack, setTitleBar, goupdateCoin, nativeEnv } from "@/api/index"
import { reactive, onMounted, ref, watch } from "vue";
import { showToast } from 'vant';
import { getPhoneType, googleappPay, iphoneappPay, getQueryString } from "../../utils/index"
import Customerservice from "../../components/payment/customerservice"
import Fallbackbox from "@/components/payment/fallbackbox.vue"
import { useStore } from 'vuex'
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n()
const store = useStore()
import SVGA from "svgaplayerweb";
const CallBackName = store.state.unifyCallBackName
const divDom = ref(null)
const data = reactive({
    imageUrl: "https://s3.hibella.mobi/socialus/9000/9001/ums/2023/08/loading.svga",
    walletamount: 0, //金币数量
    vipnumText: "", // vip数量,
    vipNnumberText: '',
    vipNnumber: null,
    equityList: [],
    vipShopList: [],
    /**选中商品id */
    shopIndex: -1,
    /**选择商品的数据 */
    shopData: {},
    defaultChannelConfig: {}, // 支付需要的参数
    // 支付成功弹框
    vipShow: false,
    // 展示
    actionShow: false,
    time: new Date().getTime(),
    gobackShow: false,
    vipStatus: 0,
    jumpType: 1, // 支付方式 ,
    providerId: '', //主播id,
    art: [], //谷歌参数
    resd: {},
    faces: [],
    dataislodaing: false,
    datauploading: true, // 更新dom,
    title: ""
})
watch(() => window, (newval) => {
    console.log(newval, 'newval');
})

onMounted(() => {
    buryingpoint()
    appLanguages()
    setHeader()
    setinterceptBack()
    obtainavata()
    getequityList()
    getviplist()
    initMachineSVGA('demoCanvasloading')
    initMachineSVGA('demoCanvas')
    window.gobackShow = false
})
// 语言查询
const appLanguages = () => {
    nativeEnv((res) => {
        if (res.code == 200) {
            locale.value = res.data
            console.log('语言', res);
            localStorage.setItem("lang", res.data);
        }
    })
}
// 获取金币余额
const getconisNum = () => {
    networkRequest('v1/wallet/info/getUserBalance', {}, (res) => {
        console.log('更新')
        goupdateCoin(res.data.userBalance + '')
    })
}
const setHeader = () => {
    data.title = t('vip.toptitle')
    setTitleBar(data.title, 'FFFFFFFF', 'FF12121A', '10', res => { }, '1');
}
const obtainavata = () => {
    networkRequest("v1/provider/info/recommendList", {
        pageCode: "P1204000",
        size: 3
    }, (res) => {
        console.log(res, "头像")
        if (res.code == 200) {
            data.faces = res.data
        }
    })
}
const setinterceptBack = () => {
    interceptBack()
}
const buryingpoint = async () => {
    let totalTmie = new Date().getTime()
    store.dispatch("onStatistics", {
        type: "load",
        event: "HP1401000",
        cost: data.time,
        totalCost: totalTmie,
        // remark: { source: getQueryString("source") },
    })
}
const getviplist = () => {
    networkRequest("v7/wallet/pay/items", { itemType: '2' }, (resd) => {
        console.log(resd, 'vip列表');
        window.gobackShow = true

        if (resd.code == 200) {
            data.resd = resd
            // data.art = [];
            data.jumpType = resd.data.jumpType
            data.defaultChannelConfig = resd.data.defaultChannelConfig
            data.vipShopList = resd.data.items
            resd.data.items.map((w, i) => {
                // let subscribe = {};
                // subscribe.sku = w.productId;
                // if (w.subscribeType == 1) {
                //     subscribe.skuType = "inapp";
                // } else {
                //     subscribe.skuType = "subs";
                // }
                data.art.push(w.productId);
            });
            // console.log(art, 'art');
            getGoodsList()

        } else {
            data.vipShopList = resd.data ? resd.data.items : []
            showToast(resd.msg);

        }
    })
}
const getGoodsList = () => {
    getGoodsListSkus(data.art.join(','), (res) => {
        console.log('谷歌商品', res);
        if (res.code == 200) {
            data.datauploading = false
            if (res.data.length != 0) {
                let arr1 = res.data;
                let arr2 = data.resd.data.items
                arr1.map((x) => {
                    arr2.map((c) => {
                        if (c.productId == x.productId) {
                            c.currency = x.price_currency_code;
                            c.price = x.price;
                        }
                    });
                });
                data.vipShopList = arr2
                console.log(data.vipShopList, '  data.vipShopList');
            } else {

                data.vipShopList = data.resd.data.items

                console.log(data.vipShopList, '  data.vipShopList1');
            }
            data.datauploading = true
            store.dispatch("onStatistics", {
                type: "custom",
                event: "HC1000001",
            })
        } else {
            store.dispatch("onStatistics", {
                type: "custom",
                event: "HC1100002",
            })
            console.log(data.vipShopList, '  data.vipShopList3');
            data.vipShopList = data.resd.data.items
        }
        data.dataislodaing = true
    })
}
const openVip = () => {
    // getStorage('vipnum', 'getvipnumcallbackName')
    // window.getvipnumcallbackName = res => {

    // }
    let res = window.localStorage.getItem('vipnum')
    getconisNum()
    data.vipnumText = res.replace('"', "").replace('"', "")
    data.vipNnumber = data.vipnumText.substring(0, 1)
    data.vipNnumberText = data.vipnumText.substring(1, data.vipnumText.length)
    data.vipShow = true;
}
window.openVip = openVip
/**接收子数据 */
const property = (val) => {
    data.gobackShow = val;
}

// window.property = property
const getequityList = () => {
    data.providerId = getQueryString('providerId') ? getQueryString('providerId') : ''
    networkRequest('v3/ums/info/umsInfoByVipPage', { providerId: data.providerId }, (res) => {
        console.log(res, '轮播');
        if (res.code == 200) {
            data.equityList = res.data.menuTrees
            if (res.data.providerName) {
                let obj = {
                    anchorName: res.data.providerName,
                    iconActive: res.data.providerPicture
                }
                data.equityList.unshift(obj)
            }
        }
    })
}

/**退出vip */
const signOut = () => {
    console.log('1');
    // data.gobackShow = data.vipStatus;
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0005003",
    })
    if (!data.vipStatus) {
        data.gobackShow = true
        data.vipStatus = 1
    } else {
        close()
    }

}
window.signOut = signOut
const shopClick = async (x, i) => {
    data.shopIndex = i;
    data.shopData = x;
    vipPay()
}

// 动画
const initMachineSVGA = (value) => {
    var mycanvas = document.getElementById(value);
    // 修改容器大小
    mycanvas.style.width = 35 + "px";
    mycanvas.style.height = 35 + "px";
    let player = new SVGA.Player('#' + value);
    let parser = new SVGA.Parser('#' + value);
    // imageUrl 定义一个参数接收url
    parser.load(data.imageUrl, function (videoItem) {
        player.setVideoItem(videoItem);
        player.startAnimation();
    });
}
/**购买vip */
const vipPay = () => {
    window.preReClick(vipbuy)
}
const vipbuy = () => {
    // store.commit('GETPAYOVER', true)
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0005002",
        remark: { productId: data.shopData.productId },
    })
    if (data.shopIndex != -1) {
        let buryInfo = {
            Pcode: 'HP1002000',
            type: "vip",
            isclose: data.jumpType
        }
        const params = {
            payChannelCode: data.defaultChannelConfig ? data.defaultChannelConfig.payChannelCode : '',
            payChannelConfigId: data.defaultChannelConfig ? data.defaultChannelConfig.payChannelConfigId : '',
            skuId: data.shopData.productId,
            priceAmountMicros: "",
            currency: data.shopData.currency,
            price: data.shopData.price.match(/\d+(\.\d+)?/)[0]
        }
        // console.log(getPhoneType(), 'getPhoneType()');
        window.localStorage.setItem('vipnum', data.shopData.itemValue + '' + data.shopData.itemUnit)
        if (getPhoneType() == "Android") {
            console.log('安卓支付');
            if (data.jumpType == 1) {
                googleappPay(params, buryInfo);
            } else {
                // store.commit('GETPAYOVER', false)
                JumpH5("/paychannelcountry", "", JSON.stringify({ ...data.shopData, type: 'vip' }));
            }
        } else {
            if (data.jumpType == 2) {
                iphoneappPay(params, buryInfo);
            } else {
                // store.commit('GETPAYOVER', false)
                JumpH5("/paychannelcountry", "", JSON.stringify({ ...data.shopData, type: 'vip', jumpType: data.jumpType }));
            }

        }
    } else {
        showToast("Please select a recharge item");
    }
}

const actionClick = () => {
    console.log(data.actionShow)
    if (data.actionShow == false) {
        data.actionShow = true
    } else {
        data.actionShow = false

    }
}

</script>

<style lang="scss" scoped>
@import './index.scss';
</style>