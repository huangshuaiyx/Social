<template>
    <div id="box" v-show="gobackShow">
        <div class="box-top">
            <img @dragstart.prevent class="box-img" src="../../assets/close@2x.png" alt="" @click="withdraw">
            <div class="box-text">
                <div class="text">{{ t('fallbackbox.text1') }} {{ t('fallbackbox.text2') }}</div>
            </div>
            <div class="box-bg" v-if="faces.length">
                <van-image @dragstart.prevent  v-for="(x, i) in faces" :key="i" :src="x.faceUrl" fit="cover" :error-icon="require('@/assets/defaultavatar.png')" :loading-icon="require('@/assets/defaultavatar.png')" round>
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </div>
            <div class="box-button">
                <button @click="cancel">{{ t('fallbackbox.text4') }}</button>
                <button @click="withdraw">{{ t('fallbackbox.text3') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { close } from "@/api/index";
import { getQueryString } from "@/utils/index";
import { gotoIndex } from "@/api/index";
import { onMounted, reactive, } from "vue";
import { Image as VanImage } from 'vant';
import { useStore } from 'vuex'
const store = useStore()
import { useI18n } from "vue-i18n";
const { t } = useI18n()

let props = defineProps({
    gobackShow: {
        type: Boolean,
        default: false,
        required: true
    },
    faces: {
        type: Array,
        default: () => [],
        required: true
    }
})
// watch(props, (newValue) => {
//     console.log(newValue, 'newValue');
//     data.property = newValue.gobackShow
// })
const data = reactive({
    // faces: [],
})


onMounted(() => {
    // obtainavata()
})


const emits = defineEmits(['increase']);
const withdraw = () => {
    // ctx.emit("property", JSON.stringify(false));
    emits('increase', false)
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001007",
    })

}

const cancel = () => {
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001006",
    })
    console.log(getQueryString("from"), '匹配参数')
    if (getQueryString("from") == 'match') {
        gotoIndex()
    } else {
        close();
    }

}
</script>


<style lang="scss" scoped>
#box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba($color: #000, $alpha: 0.5);
    z-index: 2002;
    display: flex;
    justify-content: center;
    align-items: center;

    .box-top {
        width: 315px;
        height: 304px;
        background: url('../../assets/fallbackbox@2x.png') no-repeat center;
        background-size: 100% 100%;
        border-radius: 20px 20px 20px 20px;
        z-index: 100;
        position: relative;
        margin-top: -30px;

        .box-text {
            height: 37px;
            font-size: 14px;
            font-family: Arial;
            font-weight: bold;
            color: #fff;
            margin: 38px auto 0;
            text-align: center;
            line-height: 18px;
            font-size: 16px;
            .text {
                margin-bottom: 3px;
                padding: 0px 24px;
            }
        }

        .box-button {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 25px 0 0 0;
            overflow: hidden;

            button:nth-child(1) {
                width: 110px;
                border: 2px solid #efefef;
                font-size: (28px/2);
                font-family: Arial;
                color: #fff;
                margin-left: 15px;
                border: none;
                height: 43px;
                font-weight: 600;
                background: #21232e;
                border-radius: 25px 25px 25px 25px;
                opacity: 1;
                background: rgba(255, 255, 255, 0.1);
            }

            button:nth-child(2) {
                width: 130px;
                height: 63px;
                border-radius: 25px;
                font-size: (28px/2);
                font-family: Arial;
                font-weight: 600;
                color: #fff;
                border: none;
                margin-right: 15px;
                background: url('../../assets/retentionbtn@2x.png') no-repeat center;
                background-size: 100% 100%;
            }
        }

        .box-img {
            width: 23px;
            height: 23px;
            position: absolute;
            top: 12px;
            right: 15px;
        }

        .box-bg {
            width: 251px;
            height: 104px;
            background: url('@/assets/retentionframe.png') no-repeat;
            background-size: cover;
            margin: 26px auto 0;
            display: flex;
            justify-content: flex-start;
            position: relative;

            .van-image:nth-child(1) {
                border: 2px solid #ffffff;
                width: 66px;
                height: 66px;
                border-radius: 50%;
                background: #36bbf0;
                position: absolute;
                top: 15px;
                left: 32px;

                /deep/.van-icon__image {
                    width: 100%;
                    height: 100%;
                }
            }

            .van-image:nth-child(2) {
                border: 2px solid #ffffff;
                width: 66px;
                height: 66px;
                border-radius: 50%;
                background: #36bbf0;
                position: absolute;
                top: 15px;
                left: 92px;

                /deep/.van-icon__image {
                    width: 100%;
                    height: 100%;
                }
            }

            .van-image:nth-child(3) {
                border: 2px solid #ffffff;
                width: 66px;
                height: 66px;
                border-radius: 50%;
                background: #36bbf0;
                position: absolute;
                top: 15px;
                left: 152px;

                /deep/.van-icon__image {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
