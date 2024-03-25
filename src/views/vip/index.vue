<template>
    <div :class="$style['member']">
        <div class="title">
            <img class="title-img" src="../../assets/vip/return.png" alt="" @click="signout" />
            <p>VIP</p>
            <div class="title-imgs">
                <img src="../../assets/vip/service.png" alt="" @click="kefu" />
            </div>
        </div>

        <div class="equity">
            <van-swipe indicator-color="#fff" :autoplay="3000">
                <van-swipe-item v-for="(x, i) in equityList" :key="i">
                    <div class="van-swipe-item-div">
                        <img :src="x.iconActive" alt="" />
                    </div>
                    <p class="van-swipe-item-p1">{{ x.text1 }}</p>
                    <p class="van-swipe-item-p2">{{ x.text2 }}</p>
                </van-swipe-item>
            </van-swipe>
        </div>

        <div style="height:calc(100% - 80px);overflow-y: auto;background: #fff;border-radius: 25px 25px 0px 0px;">
            <!-- <div :class="$style['vip_card']">
                <img :src="userInfos.face" alt="" :class="$style['vip_card_img']">
                <div :class="$style['vip_card_div']">
                    <p>
                        Info
                        <img src="../../assets/vip/vipnotopened.png" alt="">
                    </p>
                    <p>Get VIP to chat with girls</p>
                </div>
            </div> -->


            <div>
                <div :class="$style['commodity']">
                    <div :class="shopId == i ? $style['vipStop'] : $style['vipStopa']" v-for="(x, i) in vipShopList"
                        :key="i" @click="shopClick(x, i)" v-preventReClick="2000">
                        <p :class="$style['vipStop_p0']">{{ x.lable }}</p>
                        <div :class="$style['vipStop_div0']">
                            <p :class="$style['vipStop_p1']">
                                <span>{{ parseInt(x.name) }}</span>
                                <span>{{ x.name.replace(/[^a-zA-Z]/g, "") }}</span>
                            </p>
                            <div :class="$style['vipStop_div']">
                                <p :class="$style['vipShop_div_p4']" v-if="i == 0">
                                    {{ daymoney(x.validDate, x.price) }}
                                </p>
                                <p :class="$style['vipShop_div_p4']" v-if="i == 1">
                                    {{ daymoney(x.validDate, x.price) }}
                                </p>
                                <p :class="$style['vipShop_div_p4']" v-if="i == 2">
                                    {{ daymoney(x.validDate, x.price) }}
                                </p>
                            </div>
                        </div>

                        <p :class="$style['vipStop_p2']">
                            <span>{{ x.price }}</span>
                        </p>

                    </div>
                    <van-loading color='#fff'
                        style="position: absolute; top: 70%; left: 50%; transform: translate(-50%,-50%);"
                        v-show="vipShopList.length <= 0" />
                </div>
                <div class="button" v-if="vipShopList.length > 0">
                    <div class="button_label">
                        <p class="button_label_p4">
                            {{ discounts.symbol }}{{ discounts.rebate }}/Day
                        </p>
                    </div>
                    <div class="button_not_svga_bg" @click="vipPay" v-preventReClick="2000">
                        <div class="button_not">
                            <div class="button_not_bg">
                            </div>
                            <div class="button_not_text">
                                Subscribe <span>{{ shopData.price }}/{{ shopData.name }}</span>
                            </div>
                        </div>
                        <div class="button_not_svga">
                            <div id="demoCanvas">
                            </div>
                        </div>
                    </div>
                </div>

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

<style lang="scss" scoped module>
@import "./index.scss";
</style>

  
<style lang="scss" scoped >
.equity {
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: space-around;
    padding-top: 5px;
    background: #222;
    margin-top: 70px;

    .van-swipe {
        width: 90%;
        height: 180px;

        .van-swipe-item {
            width: 90%;
            height: 180px;

            .van-swipe-item-div {
                width: 215px;
                height: 100px;
                margin: 0 auto 0;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .van-swipe-item-p1 {
                width: 100%;
                text-align: center;
                font-size: 14px;
                font-family: Arial-Bold, Arial;
                font-weight: 700;
                color: #fff;
                margin-top: 15px;
            }

            .van-swipe-item-p2 {
                width: 100%;
                text-align: center;
                font-size: 14px;
                font-family: Arial-Bold, Arial;
                font-weight: 700;
                color: rgba(255, 255, 255, 0.3);
                margin-top: 7px;
            }



        }

        /deep/.van-swipe__indicator--active {
            width: 10px;
            height: 7px;
            background: #FFFFFF;
            border-radius: 25px;
        }

        /deep/.van-swipe__indicator {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: rgba(153, 157, 185, 0.302);
        }
    }
}

// 底部按钮
.button {
    width: 100%;
    height: 100px;
    position: relative;
    margin-top: 40px;


    .button_label {
        width: 79px;
        height: 42px;
        position: absolute;
        top: -6px;
        right: 20px;
        z-index: 99;
        background: url('../../assets/vip/label.png') no-repeat;
        background-size: contain;
        // overflow: hidden; //超出的文本隐藏
        // text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行

        .button_label_p4 {
            width: 79px;
            height: 42px;
            line-height: 38px;
            transform: rotate(-17deg);
            text-align: left;
            color: #222;
            font-size: 11px;
            padding-left: 13px;
            font-weight: 600;

        }

    }

    .button_not_svga_bg {
        width: 311px;
        height: 80px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .button_not {
            width: 311px;
            height: 80px;
            margin: 0 auto;

            .button_not_bg {
                position: absolute;
                width: 98%;
                height: 50px;
                
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 0;
                background: url('../../assets/vip/button.png') no-repeat;
                background-size: contain;
            }

            .button_not_text {
                width: 100%;
                height: 80px;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                line-height: 80px;
                text-align: center;
                color: #fff;
                font-size: 15px;
                z-index: 99;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行

                span {
                    color: #FFEB33;
                }
            }

        }


        .button_not_svga {
            width: 390px;
            height: 90px;
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);

            #demoCanvas {
                text-align: center !important;
                color: #fff;
                line-height: 44px;
                font-size: 15px;
                margin: 0 auto;
                font-weight: 600;
                box-sizing: border-box;

                span {
                    color: #fff;
                }
            }
        }

    }


}


.title {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    padding-top: 40px;
    padding-bottom: 5px;
    position: fixed;
    top: 0;
    left: 0;
    background: #222;

    .title-img {
        width: 30px;
        height: 30px;
    }

    p {
        width: calc(100% - 120px);
        height: auto;
        text-align: center;
        line-height: 35px;
        // margin-left: (230px/2);
        font-size: 18px;
        font-family: Arial;
        font-weight: bold;
        color: #fff;
    }

    .title-imgs {
        width: 30px;
        height: 30px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
  