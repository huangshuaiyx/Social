<template>
    <div :class="$style['member']">
        <div class="title">
            <img class="title-img" src="../../assets/vip/notopened_return.png" alt="" @click="signout" />
            <p>VIP</p>
            <div class="title-imgs">
                <img src="../../assets/vip/service.png" alt="" @click="kefu" />
            </div>
        </div>
        <div style="height:calc(100% - 80px);overflow-y: auto;border-radius: 25px 25px 0px 0px;background: #fff;">
            <div :class="$style['vip_card']">
                <div :class="$style['vip_card_img']">
                    <img src="../../assets/vip/vipopened.png" alt="">
                </div>
                <p :class="$style['ingoVip']">Expired: {{ userInfos.vipExpireTime }}</p>

            </div>
            <p :class="$style['vip_p']">Diamonds Privilege</p>
            <div class="equity" v-for="(x, i) in equityList" :key="i">
                <div class="equity_div">
                    <div class="equity_div_img"><img :src="x.img" alt="" /></div>
                    <div class="equity_div_text">
                        <p>{{ x.text1 }}</p>
                        <p>{{ x.text2 }}</p>
                    </div>
                </div>
            </div>
            <div :class="$style['vips']">
                <img src="../../assets/vip/vips.png" alt="">
            </div>

            <div class="button">
                <div @click="jumpClick" v-preventReClick="2000">
                    Buy diamonds
                </div>

                <div class="button_div1" @click="jumpvip" v-preventReClick="2000">
                    Extend VIP
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
    height: auto;
    display: flex;
    justify-content: space-around;

    .equity_div {
        width: 100%;
        height: 50px;
        font-size: 17px;
        font-family: Arial-Bold, Arial;
        font-weight: 700;
        color: #222222;
        margin-left: 25px;
        display: flex;
        justify-content: flex-start;
        margin: 16px 0 0 16px;

        .equity_div_img {
            width: 50px;
            height: 50px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .equity_div_text {
            margin: 10px 0 0 15px;
            p:nth-child(1) {
                font-size: 14px;
                font-weight: 700;
                color: #222222;
            }
            p:nth-child(2) {
                font-size: 12px;
                font-weight: 700;
                color: #999DB9;
                margin-top: 5px; 
            }
        }
    }

}

// 底部按钮
.button {
    width: 100%;
    height: auto;
    overflow: hidden;

    div:nth-child(1) {
        width: 275px;
        height: 47px;
        background: #222;
        text-align: center;
        line-height: 47px;
        font-size: 15px;
        font-weight: 400;
        color: #FFFFFF;
        border-radius: 25px;
        margin: 20px auto 0;
    }

    div:nth-child(2) {
        width: 100%;
        height: auto;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
        color: #999DB9;
        margin: 20px auto 20px;
    }


}

.title {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;

    .title-img {
        width: 30px;
        height: 30px;
        margin-top: 35px;
    }

    p {
        width: calc(100% - 120px);
        height: auto;
        text-align: center;
        line-height: 90px;
        // margin-left: (230px/2);
        font-size: 18px;
        font-family: Arial;
        font-weight: bold;
        color: #fff;
    }

    .title-imgs {
        width: 30px;
        height: 30px;
        margin-top: 35px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
  