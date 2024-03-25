
<style scoped lang="scss">
.private {
    .topTiem {
        display: flex;
        margin-top: 10px;
        padding-left: 100px;
        .top {
            border-top: 8px solid #ccc;
            display: flex;
            span {
                margin-top: 10px;
                width: 158px;
                height: 50px;
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
        }
        .inp {
            width: 150px;
            font-size: 13px;
            border: 1px dashed #ed8995;
            margin: 3px 5px;
            span {
                color: #a30014;
            }
        }
        .item {
            width: 150px;
            height: 60px;
            margin: 3px 5px;
            font-size: 13px;
            border: 1px dashed #ed8995;
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
    <div class="private">
        <div>private 收入</div>
        <div class="topTiem">
            <div class="top">
                <span>0s</span>
                <span>10s</span>
                <span>20s</span>
                <span>30s</span>
                <span>42s</span>
                <span>+12s each</span>
            </div>
            <span class="time">时间轴</span>
        </div>
        <div v-loading="loading">
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_private_A" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">
                        <el-input :disabled="imputDisabled" type='text' :maxlength="3" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" @blur="onblur(item,index,'dictValue')" v-model.number="item.dictValue" size="mini"></el-input><span>COINS</span>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_private_B" :key="index">
                    <div class="lable" v-show="index==0">{{  tableData.rtc_profit_private_B[0].label }}</div>
                    <div class="inp">
                        <el-input :disabled="imputDisabled" type='text' :maxlength="3" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" @blur="onblur(item,index,'dictValue')" v-model.number="item.dictValue" size="mini"></el-input><span>COINS</span>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_private_C" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">
                        <el-input :disabled="imputDisabled" type='text' :maxlength="3" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" @blur="onblur(item,index,'dictValue')" v-model.number="item.dictValue" size="mini"></el-input><span>COINS</span>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_private_D" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">
                        <el-input :disabled="imputDisabled" type='text' :maxlength="3" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" @blur="onblur(item,index,'dictValue')" v-model.number="item.dictValue" size="mini"></el-input><span>COINS</span>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_private_E" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">
                        <el-input :disabled="imputDisabled" type='text' :maxlength="3" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" @blur="onblur(item,index,'dictValue')" v-model.number="item.dictValue" size="mini"></el-input><span>COINS</span>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_private_F" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">
                        <el-input :disabled="imputDisabled" type='text' :maxlength="3" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" @blur="onblur(item,index,'dictValue')" v-model.number="item.dictValue" size="mini"></el-input><span>COINS</span>
                    </div>
                </div>
            </div>
            <div class="tablelist">
                <div class="benner" v-for="(item,index) in tableData.rtc_profit_private_T" :key="index">
                    <div class="lable" v-show="index==0">{{ item.label }}</div>
                    <div class="inp">
                        <el-input :disabled="imputDisabled" type='text' :maxlength="3" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" @blur="onblur(item,index,'dictValue')" v-model.number="item.dictValue" size="mini"></el-input><span>COINS</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div v-for="(item,index) in tableData.rtc_profit_private_B" :key="index" class="tablelist">
            <div class="lable">{{ item.label }}</div>
            <div class="inp">
                <el-input :disabled="imputDisabled" type='text' :maxlength="3" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" @blur="onblur(item,index,'frist')" v-model.number="item.dictKey" size="mini"></el-input><span>COINS</span>
            </div>
            <div class="inp">
                <el-input :maxlength="3" :disabled="imputDisabled" @blur="onblur(item,index,'two')" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model.number="item.dictKey" size="mini"></el-input><span>COINS</span>
            </div>
            <div class="inp">
                <el-input :maxlength="3" :disabled="imputDisabled" @blur="onblur(item,index,'three')" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model.number="item.three" size="mini"></el-input><span>COINS</span>
            </div>
            <div class="item">
                <div class="coins">
                    <el-input :maxlength="3" :disabled="imputDisabled" @blur="onblur(item,index,'four')" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model.number="item.four" size="mini"></el-input><span>COINS</span>
                </div>
                <span class="text">{{ item.imputText }}</span>
            </div>
            <div class="item">
                <div class="coins">
                    <el-input :disabled="imputDisabled" :maxlength="3" @blur="onblur(item,index,'five')" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model.number="item.five" size="mini"></el-input><span>COINS</span>
                </div>
                <span class="text">{{ item.imputText }}</span>
            </div>
            <div class="item">
                <div class="coins">
                    <el-input :disabled="imputDisabled" :maxlength="3" @blur="onblur(item,index,'six')" oninput='value=value.replace(/[^\d]/g, "").replace( /^[0] + [0 - 9] * $ / gi, "")' onafterpaste="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model.number="item.six" size="mini"></el-input><span>COINS</span>
                </div>
                <span class="text">{{ item.imputText }}</span>
            </div>
        </div> -->
        <div class="foottrer">
            <el-button @click="submit" type="primary" size="mini">{{ imputDisabled ? '编辑': '保存'  }}</el-button>
            <el-button size="mini" @click="cancle">取消</el-button>
        </div>
    </div>
</template>

<script>
import { getprivatedatalistApi, submitbatchInsertUpdateDictValueByReApi } from '@/api/anchor/index'
export default {
    data () {
        return {
            loading: false,
            imputDisabled: true,
            tableData: [],
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
                    "rtc_profit_private_A",
                    "rtc_profit_private_B",
                    "rtc_profit_private_C",
                    "rtc_profit_private_D",
                    "rtc_profit_private_E",
                    "rtc_profit_private_F",
                    "rtc_profit_private_T",
                ]
            }
            getprivatedatalistApi(obj).then(res => {
                if (res.code == 200) {
                    if (res.data.rtc_profit_private_A.length < 6) {
                        let num = 6 - res.data.rtc_profit_private_A.length
                        let n = res.data.rtc_profit_private_A.length
                        for (let i = 0; i < num; i++) {
                            let obj = {
                                cssClass: null,
                                dictKey: "0",
                                dictLabel: "收入管理",
                                dictSort: n += 1,
                                dictType: "rtc_profit_private_A",
                                dictValue: "0",
                                listClass: null,
                                remark: null,
                                status: 0,
                                weight: null,
                            }

                            res.data.rtc_profit_private_A.push(obj)

                        }
                    }
                    if (res.data.rtc_profit_private_B.length < 6) {
                        let num = 6 - res.data.rtc_profit_private_B.length
                        let n = res.data.rtc_profit_private_B.length
                        for (let i = 0; i < num; i++) {
                            let obj = {
                                cssClass: null,
                                dictKey: "0",
                                dictLabel: "收入管理",
                                dictSort: n += 1,
                                dictType: "rtc_profit_private_B",
                                dictValue: "0",
                                listClass: null,
                                remark: null,
                                status: 0,
                                weight: null,
                            }
                            res.data.rtc_profit_private_B.push(obj)
                        }
                    }
                    if (res.data.rtc_profit_private_C.length < 6) {
                        let num = 6 - res.data.rtc_profit_private_C.length
                        let n = res.data.rtc_profit_private_C.length
                        for (let i = 0; i < num; i++) {
                            console.log(i, num);
                            let obj = {
                                cssClass: null,
                                dictKey: "0",
                                dictLabel: "收入管理",
                                dictSort: n += 1,
                                dictType: "rtc_profit_private_C",
                                dictValue: "0",
                                listClass: null,
                                remark: null,
                                status: 0,
                                weight: null,
                            }
                            res.data.rtc_profit_private_C.push(obj)
                        }
                    }
                    if (res.data.rtc_profit_private_D.length < 6) {
                        let num = 6 - res.data.rtc_profit_private_D.length
                        let n = res.data.rtc_profit_private_D.length
                        for (let i = 0; i < num; i++) {
                            let obj = {
                                cssClass: null,
                                dictKey: "0",
                                dictLabel: "收入管理",
                                dictSort: n += 1,
                                dictType: "rtc_profit_private_D",
                                dictValue: "0",
                                listClass: null,
                                remark: null,
                                status: 0,
                                weight: null,
                            }
                            res.data.rtc_profit_private_D.push(obj)
                        }
                    }
                    if (res.data.rtc_profit_private_E.length < 6) {
                        let num = 6 - res.data.rtc_profit_private_E.length
                        let n = res.data.rtc_profit_private_E.length
                        for (let i = 0; i < num; i++) {
                            let obj = {
                                cssClass: null,
                                dictKey: "0",
                                dictLabel: "收入管理",
                                dictSort: n += 1,
                                dictType: "rtc_profit_private_E",
                                dictValue: "10",
                                listClass: null,
                                remark: null,
                                status: 0,
                                weight: null,
                            }
                            res.data.rtc_profit_private_E.push(obj)
                        }
                    }
                    if (res.data.rtc_profit_private_F.length < 6) {

                        let num = 6 - res.data.rtc_profit_private_F.length
                        let n = res.data.rtc_profit_private_F.length
                        for (let i = 0; i < num; i++) {
                            let obj = {
                                cssClass: null,
                                dictKey: "0",
                                dictLabel: "收入管理",
                                dictSort: n += 1,
                                dictType: "rtc_profit_private_F",
                                dictValue: "0",
                                listClass: null,
                                remark: null,
                                status: 0,
                                weight: null,
                            }
                            res.data.rtc_profit_private_F.push(obj)
                        }
                    }
                    if (res.data.rtc_profit_private_T.length < 6) {

                        let num = 6 - res.data.rtc_profit_private_T.length
                        let n = res.data.rtc_profit_private_T.length
                        for (let i = 0; i < num; i++) {
                            let obj = {
                                cssClass: null,
                                dictKey: "0",
                                dictLabel: "收入管理",
                                dictSort: n += 1,
                                dictType: "rtc_profit_private_T",
                                dictValue: "0",
                                listClass: null,
                                remark: null,
                                status: 0,
                                weight: null,
                            }
                            res.data.rtc_profit_private_T.push(obj)
                        }
                    }
                    Object.keys(res.data).forEach(item => {
                        res.data[item] = res.data[item].reverse()
                    })
                    res.data.rtc_profit_private_A[0]['label'] = '主播等级A'
                    res.data.rtc_profit_private_B[0]['label'] = '主播等级B'
                    res.data.rtc_profit_private_C[0]['label'] = '主播等级C'
                    res.data.rtc_profit_private_D[0]['label'] = '主播等级D'
                    res.data.rtc_profit_private_E[0]['label'] = '主播等级E'
                    res.data.rtc_profit_private_F[0]['label'] = '主播等级F'
                    res.data.rtc_profit_private_T[0]['label'] = '主播等级T'
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
        onblur (item, index, val) {
            console.log(item[val]);
            // return
            // item[val] = parseInt(item[val])
            // if(!item[val])  this.$message.error('请填写完整的数据') 
            // if (!item[val] || isNaN(parseInt(item[val]))) item[val] = 0
            // item[val] = parseInt(item[val])
            if ((/[^\d{1-3}$]/g).test(item[val]) || !item[val]) {
                item[val] = 0
            }
            if (+item[val] > 300) item[val] = 300
            console.log(item[val]);
            // this.$set(this.tableData[index], val, item[val])
            console.log(JSON.parse(JSON.stringify(this.tableData)));
        },
        submit () {
            this.imputDisabled = !this.imputDisabled
            if (!this.imputDisabled) return
            let arr = []
            Object.keys(this.tableData).forEach(item => {
                this.tableData[item].forEach(it => {
                    arr.push(it)
                })

            })
            arr = arr.map(item => {
                switch (item.dictSort) {
                    case 1:
                        item.dictKey = '0s'
                        break;
                    case 2:
                        item.dictKey = '10s'
                        break;
                    case 3:
                        item.dictKey = '20s'
                        break;
                    case 4:
                        item.dictKey = '30s'
                        break;
                    case 5:
                        item.dictKey = '42s'
                        break;
                    case 6:
                        item.dictKey = '+12s'
                        break;
                    default:
                        break;
                }
                return {
                    appId: '1001',
                    productId: '100201',
                    dictTypePrefix: 'rtc_profit_private',
                    dictTypePostfix: item.dictType.split('_')[3],
                    dictKey: item.dictKey,
                    dictValue: item.dictValue,
                    dictLabel: item.dictLabel,
                    dictSort: item.dictSort,

                }
            })
            submitbatchInsertUpdateDictValueByReApi(arr).then(res => {
                if (res.code == 200) {
                    this.$message.success('更新成功!')
                    this.getdatalist()
                }
            }).catch(req => {
                this.$message.error(req.msg)
            })
        },
        cancle () {
            this.imputDisabled = true
        }
    }

}
</script>
