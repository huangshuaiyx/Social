<template>
    <div style="overflow: hidden;height: 100%;" :style="{ 'background': style.bg }">
        <Title :titlecen="titlecen"></Title>

        <div class="left">
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

            <div class="nametext" :style="{ 'background': style.textareabg }">
                <textarea @focus="reportinp" v-model="text" rows="10" maxlength="100" @change="textarea"
                    placeholder=""></textarea>
                <p>{{ text.length }}/100</p>
            </div>
            <div class="img">
                <!-- <img v-if="images != ''" :src="images[0]" alt="" /> -->
                <van-image :src="images[0]" v-show="images != ''" fit="cover">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
                <img @click="tianjia" src="../assets/public/add.png" alt="" />
            </div>
            <button @click="but()" :disabled="!display" :class="display == true ? 'button' : 'buttons'">
                {{ this.$t("report.submit") }}
            </button>
        </div>


    </div>
</template>

<script>
import { Toast, RadioGroup, Radio, Cell, CellGroup, Image, Loading } from 'vant'
import { networkRequest, chooseAndUpload, setTitleBar, close, notice } from '../api/inedx'
import { getQueryString } from '../utils/index'
import Title from "../components/title.vue"

export default {
    components: {
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Image.name]: Image,
        [Loading.name]: Loading,
        Title
    },
    data() {
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
            radioIndex: -1,
            titlecen: 'Report',
            style: {}
        }
    },
    async created() {
        await this.$store.dispatch('appLanguages')
        this.$i18n.locale = this.$store.state.appLanguage
        this.time = new Date().getTime()
        let asd = require('../JSON/public.json')
        this.style = asd
    },
    mounted() {
        setTitleBar(this.$t('agree.report'))
        networkRequest("v2", this.queryDictListByLanguageUrl, {
            dictType: 'report_reason_v2',
        }).then((res) => {
            console.log(res, '举报选项');
            if (res.code == 200) {
                this.formData = res.data
            }
        })

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
        reportinp() {
            let obj = {
                event: "HE0006001",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
        },
        textarea() { },
        // 提交
        but() {
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
                Toast(res.msg)
                let obj = {
                    toUserId: getQueryString('toUserId'),
                    name: 'block_ok'
                }
                console.log(obj, '举报拉黑');
                setTimeout(() => {
                    close()
                }, 200);
            })
            let obj = {
                event: "HE0006003",
                type: 'click',
                bizId: getQueryString('toUserId') ? getQueryString('toUserId') : ''
            }
            this.$store.dispatch("onStatistics", obj)
        },
        // 举报原因
        dicClick(x, i) {
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
        tianjia() {
            console.log('1111111111', window.socailNR)
            let obj = {
                event: "HE0006002",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
            chooseAndUpload({}).then((res) => {
                if (res.code == 200) {
                    this.images.unshift(res.data[0].fileUrl)
                } else {
                    Toast(res.msg)
                }
            })

        },
        goBacks() {
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
.left {

    height: calc(100% - 70px);
    margin-top: 80px;
    overflow-y: auto;
    overflow-x: hidden;

    .p {
        width: 92%;
        margin: 20px auto;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999DB9;
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
                color: #222;
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
        border-radius: 10px;
        margin: 20px auto 0;
        background: #F5F4FA;
        border-radius: 10px;
        border: solid 1px #D3D4E5;

        textarea {
            width: 90%;
            height: 110px;
            border: none;
            font-size: 15px;
            color: #222;
            margin: 15px 16px 0;
            -webkit-user-select: text !important;
            background: rgba($color: #fff, $alpha: 0.0);
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

        .van-image {
            margin: 0 0 0 15px;
            width: (150px/2);
            height: (150px/2);
        }

        img {
            width: (150px/2);
            height: (150px/2);
            margin: 0 14px;
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
        color: #999DB9;
    }

    /deep/ .van-radio-group {
        /deep/ .van-hairline--top-bottom {
            /deep/ .van-cell {
                border: none;
                flex-direction: row-reverse; // 反向排序

                /deep/ .van-cell__title {
                    text-align: right;

                    span {
                        font-size: 15px;
                        color: #282e5e;
                    }
                }
            }
        }
    }

    .nametext {
        width: (686px/2);
        height: 150px;
        border-radius: 10px;
        margin: 0px auto 0;
        position: relative;
        top: 20px;
        border-radius: 10px;
        border: solid 1px #fff;

        textarea {
            width: 90%;
            height: 110px;
            border: none;
            font-size: 15px;
            color: #fff;
            margin: 15px 16px 0;
            -webkit-user-select: text !important;
            text-align: right;
            direction: rtl;
            background: rgba($color: #fff, $alpha: 0.0);
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

        img:nth-child(1) {
            margin: 0 15px 0 0;
        }

        img {
            width: (150px/2);
            height: (150px/2);
            border: solid 1px #f5f4fa;
            margin: 0 14px;
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
    color: #fff;
    border: none;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 45px;
    margin-bottom: 20px;
}

.buttons {
    width: 275px;
    height: 44px;
    background: url('../assets/public/button.png') no-repeat;
    background-size: cover;
    border-radius: (55px/2);
    font-size: (34px/2);
    font-weight: bold;
    color: #fff;
    border: none;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 45px;
    margin-bottom: 20px;
    opacity: 0.5;
}
</style>
