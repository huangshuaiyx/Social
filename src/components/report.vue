<template>
    <div class="redorfd">
        <div class="left" v-if="$i18n.locale != 'ar'">
            <p class="p">{{ this.$t("report.chooseText") }}</p>
            <div class="optionClass">
                <div clickable @click="dicClick(x, i)" v-for="(x, i) in formData" :key="i" class="radioClass">
                    <div class="radioClass_text">{{ x.dictLabel }}</div>
                    <div class="radioClass_img">
                        <img v-if="radioIndex == i" src="../assets/report/selected.png" alt="">
                        <img v-else src="../assets/report/notselected.png" alt="">
                    </div>
                </div>
            </div>

            <div class="nametext">
                <textarea @focus="reportinp" v-model="text" rows="10" maxlength="100" @change="textarea" placeholder=""></textarea>
                <p>{{ text.length }}/100</p>
            </div>
            <div class="img">
                <van-image :src="images[0]" v-show="images.length != 0" fit="cover">
                    <template v-slot:loading>
                        <img src="../assets/report/default.png" alt="">
                    </template>
                </van-image>
                <img @click="tianjia" src="../assets/report/repotAdd.png" alt="" />
            </div>
        </div>
        <div class="right" v-else>
            <p class="p par">{{ this.$t("report.chooseText") }}</p>
            <div class="optionClass">
                <div clickable @click="dicClick(x, i)" v-for="(x, i) in formData" :key="i" class="radioClass">
                    <div class="radioClass_img">
                        <img v-if="radioIndex == i" src="../assets/report/selected.png" alt="">
                        <img v-else src="../assets/report/notselected.png" alt="">
                    </div>
                    <div class="radioClass_text">{{ x.dictLabel }}</div>
                </div>
            </div>
            <div class="nametext">
                <textarea @focus="reportinp" v-model="text" rows="10" maxlength="100" @change="textarea" placeholder=""></textarea>
                <p>{{ text.length }}/100</p>
            </div>
            <div class="img">
                <img @click="tianjia" src="../assets/report/repotAdd.png" alt="" />
                <van-image :src="images[0]" fit="cover" v-show="images.length != 0">
                    <template v-slot:loading>
                        <img src="../assets/report/default.png" alt="">
                    </template>
                </van-image>
            </div>
        </div>
        <button @click="but()" :disabled="radioIndex == -1 || !text" :class="(radioIndex != -1 && text) ? 'button' : 'buttons'">
            {{ this.$t("report.submit") }}
        </button>
    </div>
</template>

<script>
import { Cell, CellGroup, Image, Loading, Radio, RadioGroup } from 'vant'
import { chooseAndUpload, close, networkRequest, notice, reportSuccess, setTitleBars } from '../api/inedx'
import { getQueryString } from '../utils/index'
export default {
    components: {
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Image.name]: Image,
        [Loading.name]: Loading,
    },
    data () {
        return {
            radio: '',
            text: '',
            images: [],
            userId: '',
            formData: [],
            queryDictListByLanguageUrl: '/sys/dictData/queryDictListByType',
            saveUrl: '/ums/report/save',
            display: false, // 是否可以点击
            time: null,
            radioIndex: -1
        }
    },
    async created () {
        await this.$store.dispatch('appLanguages')
        this.$i18n.locale = this.$store.state.appLanguage
        this.time = new Date().getTime()
    },
    mounted () {
        setTimeout(() => {
            setTitleBars(this.$t('agree.report'))
            networkRequest("v2", this.queryDictListByLanguageUrl, {
                dictType: 'report_reason_v2',
            }).then((res) => {
                console.log(res,'举报选项');
                if (typeof (res.code) != undefined) {
                    this.formData = res
                }
            })
        }, 200);

        let totalTmie = new Date().getTime();
        let obj = {
            event: "HP1501000",
            type: 'load',
            cost: this.time,
            totalCost: totalTmie,
        }
        this.$store.dispatch("onStatistics", obj)
    },
    methods: {
        // 输入内容
        reportinp () {
            let obj = {
                event: "HE0006001",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
        },
        textarea () { },
        // 提交
        but () {
            networkRequest("v1", this.saveUrl, {
                bizType: getQueryString('reportType') != undefined ? getQueryString('reportType') : 2,
                bizId: getQueryString('toUserId'),
                reasonId: this.radio,
                content: this.text,
                images: this.images.length != 0 ? this.images : null,
                resourceUrl: getQueryString('reportUrl') != undefined ? getQueryString('reportUrl') : '',
                toUserId: getQueryString('toUserId'),
            }).then((res) => {
                notice(2, getQueryString('toUserId'))
                // Toast('ok')
                let obj = {
                    toUserId: getQueryString('toUserId'),
                    name: 'block_ok'
                }
                console.log(obj, '举报拉黑');
                reportSuccess(obj)
                setTimeout(() => {
                    close()
                }, 500);
            })
            let obj = {
                event: "HE0006003",
                type: 'click',
                bizId: getQueryString('toUserId') ? getQueryString('toUserId') : ''
            }
            this.$store.dispatch("onStatistics", obj)
        },
        // 举报原因
        dicClick (x, i) {
            let obj = {
                event: "HE0006004",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
            this.radio = x.dictValue
            this.radioIndex = i
            if (this.text != '') {
                this.display = true
            } else {
                this.display = false
            }
        },
        // 添加图片
        tianjia () {
            let obj = {
                event: "HE0006002",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
            chooseAndUpload({}).then((res) => {
                this.images.unshift(res[0].fileUrl)
            })
        },
        goBacks () {
            close()
        }
    },
    watch: {
        text: function (newQuestion) {
            if (newQuestion.length != 0) {
                if (this.radio != '') {
                    this.display = true
                } else {
                    this.display = false
                }
            } else {
                this.display = false
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.redorfd {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    background: #0e061e;

    .title {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        background: #5d3ab8;
        padding-top: 20px;
        position: fixed;
        top: 0;
        z-index: 99;

        .title-img {
            width: 30px;
            height: 30px;
        }

        p {
            width: calc(100% - 120px);
            height: 50px;
            text-align: center;
            line-height: 40px;
            // margin-left: (230px/2);
            font-size: 18px;
            font-family: Arial;
            font-weight: bold;
            color: #ffffff;
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

    .left {
        height: auto;
        overflow-y: auto;

        .p {
            width: 90%;
            margin: 20px auto;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.3);
        }

        .optionClass {
            width: 343px;
            height: auto;
            border-top: solid 1px rgba(255, 255, 255, 0.1);
            margin: 0 auto;

            .radioClass {
                width: 100%;
                height: 50px;
                border-bottom: solid 1px rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: space-between;

                .radioClass_text {
                    font-size: 14px;
                    font-family: Arial-Regular, Arial;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 50px;
                }

                .radioClass_img {
                    width: 22px;
                    height: 22px;
                    margin-top: 15px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .nametext {
            width: (686px/2);
            height: 150px;
            border-radius: 15px;
            margin: 0px auto 0;
            position: relative;
            top: 20px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);

            textarea {
                width: 90%;
                height: 110px;
                border: none;
                font-size: 15px;
                color: #fff;
                margin: 15px 16px 0;
                -webkit-user-select: text !important;
                background: rgba(255, 255, 255, 0);
            }

            p {
                font-size: (24px/2);
                font-weight: bold;
                color: #999db9;
                margin-left: (600px/2);
            }
        }

        .img {
            width: 100%;
            height: (150px/2);
            margin: 40px 0 10px;
            border-radius: 10px;

            .van-image {
                margin: 0 0 0 15px;
                width: (150px/2);
                height: (150px/2);
                border-radius: 10px;
            }

            img {
                width: (150px/2);
                height: (150px/2);
                margin: 0 14px;
                border-radius: 10px;
            }
        }
    }

    .right {
        .p {
            width: 92%;
            margin: 20px auto;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #282e5e;
        }
        .par{
            text-align: end !important;
        }

        .optionClass {
            width: 343px;
            height: auto;
            border-top: solid 1px rgba(255, 255, 255, 0.1);
            margin: 0 auto;

            .radioClass {
                width: 100%;
                height: 50px;
                border-bottom: solid 1px rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: space-between;

                .radioClass_text {
                    font-size: 14px;
                    font-family: Arial-Regular, Arial;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 50px;
                    // transform: scaleX(-1); // 字体反向
                    text-align: right;
                }

                .radioClass_img {
                    width: 22px;
                    height: 22px;
                    margin-top: 15px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .nametext {
            width: (686px/2);
            height: 150px;
            margin: 0px auto 0;
            position: relative;
            top: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);

            textarea {
                width: 90%;
                height: 110px;
                border: none;
                font-size: 15px;
                color: #000;
                margin: 15px 16px 0;
                -webkit-user-select: text !important;
                background: rgba(255, 255, 255, 0);
                text-align: right;
                direction: rtl;
            }

            p {
                font-size: (24px/2);
                font-weight: bold;
                color: #999db9;
                margin-left: (50px/2);
            }
        }

        .img {
            width: 100%;
            height: (150px/2);
            margin: 40px 0 10px;
            display: flex;
            flex-direction: row-reverse; // 反向排序

            img {
                width: (150px/2);
                height: (150px/2);
                margin: 0 14px;
                border-radius: 10px;
            }

            .van-image {
                width: (150px/2);
                height: (150px/2);
                border-radius: 10px;
            }
        }
    }

    .button {
        width: 275px;
        height: 44px;
        background: url('../assets/report/button.png') no-repeat;
        background-size: cover;
        border-radius: (55px/2);
        font-size: (34px/2);
        font-weight: bold;
        color: #222222;
        border: none;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: 30px;
        margin-bottom: 20px;
    }

    .buttons {
        width: 275px;
        height: 44px;
        background: url('../assets/report/buttonNo.png') no-repeat;
        background-size: cover;
        border-radius: (55px/2);
        font-size: (34px/2);
        font-weight: bold;
        color: #222222;
        border: none;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: 30px;
        margin-bottom: 20px;
    }
}
</style>
