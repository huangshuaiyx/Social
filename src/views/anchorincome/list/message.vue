
<style scoped lang="scss">
.message {
    .topTiem {
        display: flex;
        margin-top: 10px;
        padding-left: 100px;
        .replaytime {
            position: absolute;
            top: 41px;
            width: 100px;
            text-align: center;
            height: 50px;
            line-height: 50px;
            left: 0px;
            background-color: #ffff80;
            border: 1px solid #000;
        }
        .top {
            // border-top: 8px solid #ccc;
            display: flex;
            span {
                background-color: #caf982;
                border: 1px solid #000;
                margin-top: 10px;
                width: 158px;
                height: 50px;
                text-align: center;
                line-height: 50px;
            }
        }
        .time {
            margin: -6px 0px 0px 5px;
        }
    }

    .tablelist {
        display: flex;
        .benner {
            display: flex;
        }
        .lable {
            width: 100px;
            padding-top: 10px;
            text-align: center;
            border: 1px solid #000;
        }
        .inp {
            width: 158px;
            line-height: 31px;
            text-align: center;
            font-size: 13px;
            border: 1px solid #000;
            span {
                color: #a30014;
            }
        }
        .item {
            width: 150px;
            height: 60px;
            font-size: 13px;
            .text {
                padding-left: 12px;
            }
            .coins {
                display: flex;
                align-items: center;
                span {
                    color: #a30014;
                }
            }
        }
        ::v-deep .el-input__inner {
            color: #a30014;
            height: 40px !important;
            width: 40px;
            padding-right: 2px;
            // border: 0px;
        }
        ::v-deep .el-input--mini {
            width: 40px;
        }
        .item:nth-child(2) {
            margin: 0px !important;
        }
    }
    .foottrer {
        margin-top: 40px;
        width: 100%;
        text-align: center;
    }
}
</style>
<template>
    <div class="message">
        <div>消息收入</div>
        <div class="topTiem">
            <span class="replaytime">回复时长</span>
            <div class="top">

                <span>&lt;180s</span>
                <span>180s≤ xs&lt;300s</span>
                <span>300s≤ xs&lt;600s</span>
                <span>600s≤ xs&lt;12</span>
                <span>&gt; 12h</span>
                <!-- <span>+12s each</span> -->
            </div>
            <!-- <span class="time">时间轴</span> -->
        </div>
        <div v-loading="loading">
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_message_A" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">
                        <div>{{item.dictValue}}</div>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_message_B" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">

                        <div>{{item.dictValue}}</div>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_message_C" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">

                        <div>{{item.dictValue}}</div>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_message_D" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">

                        <div>{{item.dictValue}}</div>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_message_E" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">

                        <div>{{item.dictValue}}</div>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_message_F" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">

                        <div>{{item.dictValue}}</div>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_message_T" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">

                        <div>{{item.dictValue}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getprivatedatalistApi } from '@/api/anchor/index'
export default {
    data () {
        return {
            loading: false,
            imputDisabled: true,
            tableData: {},
        }
    },
    created () {
        this.getdatalist()
    },
    methods: {
        getdatalist () {
            this.loading = true
            let obj = {
                dictTypes: [
                    "rtc_profit_message_A",
                    "rtc_profit_message_B",
                    "rtc_profit_message_C",
                    "rtc_profit_message_D",
                    "rtc_profit_message_E",
                    "rtc_profit_message_F",
                    "rtc_profit_message_T",
                ]
            }
            getprivatedatalistApi(obj).then(res => {
                if (res.code == 200) {
                    Object.keys(res.data).forEach(item => {
                        res.data[item] = res.data[item].reverse()
                    })
                    res.data.rtc_profit_message_A[0]['label'] = '主播等级A'
                    res.data.rtc_profit_message_B[0]['label'] = '主播等级B'
                    res.data.rtc_profit_message_C[0]['label'] = '主播等级C'
                    res.data.rtc_profit_message_D[0]['label'] = '主播等级D'
                    res.data.rtc_profit_message_E[0]['label'] = '主播等级E'
                    res.data.rtc_profit_message_F[0]['label'] = '主播等级F'
                    res.data.rtc_profit_message_T[0]['label'] = '主播等级T'
                    console.log(res.data);
                    this.tableData = res.data
                    console.log(this.tableData);
                }
            }).catch(req => {
                console.log(req);
            }).finally(() => {
                this.loading = false
            })
        },

    }

}
</script>
