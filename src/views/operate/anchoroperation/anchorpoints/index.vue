<template>
    <div class="app-container">

        <div class="allleft">
            <div>
                BI快速链接
                <a href="">主播分布报表</a>
            </div>
            <p style="font-weight: 600;">
                当前设置
            </p>
            <table id="myTable" border="1" cellspacing="0" cellpadding="10" style="text-align: center;" width="50%">
                <tr class="header">
                    <th>等级</th>
                    <th>区间起点(不含)</th>
                    <th>区间终点(含)</th>
                </tr>
                <tr v-for="(x, i) in formData" :key="i">
                    <td>等级{{ x.gradeCode }}</td>
                    <td>{{ x.minScore }}</td>
                    <td>{{ x.maxScore }}</td>
                </tr>
            </table>

            <p style="font-weight: 600;">修改设置</p>
            <table id="myTable" cellspacing="0" cellpadding="10" style="text-align: center;" width="50%">
                <tr class="header">
                    <th></th>
                    <th>不含</th>
                    <th>含</th>
                </tr>
                
                <tr v-for="(x, i) in arrData" :key="i">
                    <td>等级{{ x.gradeCode }}</td>
                    <td>
                        <el-input-number v-model="x.minScore" style="width: 100px" controls-position="right" :min="0"
                            :max="5" :disabled="x.state == true"></el-input-number>

                    </td>
                    <td>
                        <el-input-number v-model="x.maxScore" style="width: 100px" controls-position="right" :min="0"
                            :max="5" :disabled="x.status == true"></el-input-number>

                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td>
                        <button @click="okQue">确认修改</button>
                    </td>

                </tr>
            </table>

        </div>

        <div id="allright">
            <p style="margin:20px;font-weight: 600">修改记录</p>
            <div style="margin:20px" v-for="(x, i) in historyList" :key="i">
                <p>{{ x.modifyTime }} | 修改人：{{ x.modifierName }}</p>
                <p v-for="(q, w) in x.logList" :key="w">{{ q.gradeCode }}
                    从{{ q.oldMinScore }} - {{ q.oldMaxScore }}修改为{{ q.newMinScore }} - {{ q.newMaxScore }}</p>

                <hr />
            </div>
        </div>



    </div>
</template>

<script>
import {
    updateConfig, getConfigList, getModifyRecordList
} from "@/api/operate/anchoroperation/index.js";
export default {
    components: {}, //注册组件
    name: "",
    data() {
        return {
            // 遮罩层
            loading: true,
            formData: [],
            historyList: [],
            arrData: [],
        };
    },
    created() {
        this.getMarketAnchorPageList();
        this.getModifyRecord()
    },
    mounted() {


    },
    methods: {
        /** 查询列表 */
        getMarketAnchorPageList() {
            this.loading = true;
            getConfigList().then((response) => {
                if (response.code == 200) {
                    this.formData = response.data
                    let arr = [...this.formData]
                    for (let index = 0; index < arr.length; index++) {
                        arr[index].status = false
                        arr[index].state = false
                    }
                    this.$set(arr, "status", false);
                    this.$set(arr, "state", false);
                    console.log(this.formData, arr)
                    this.arrData = arr
                    arr.map(x => {
                        if (x.gradeCode == "A") {
                            if (x.maxScore == 5) {
                                x.status = true
                            }
                        } else if (x.gradeCode == "E") {
                            if (x.minScore == 0) {
                                x.state = true
                            }
                        }
                    })

                }
                this.loading = false;

            });
        },
        /**历史记录 */
        getModifyRecord() {
            getModifyRecordList({}).then(res => {
                if (res.code == 200) {
                    this.historyList = res.data.list
                }
            })
        },
        okQue() {
            let arr = []
            arr.push(this.dengjiA, this.dengjiB, this.dengjiC, this.dengjiD, this.dengjiE)
            console.log(arr)
            updateConfig({ configItemList: this.arrData }).then(res => {
                if (res.code == 200) {
                    this.getMarketAnchorPageList()
                    this.getModifyRecord()
                    this.$message({
                        type: "success",
                        message: "成功",
                    });
                } else {
                    this.getMarketAnchorPageList();
                }
            })

        }


    },
};
</script>

<style lang="scss" scoped>
.app-container {
    display: flex;

    .allleft {
        width: 50%;

        .el-input .el-input--medium {
            .el-input__inner {
                text-align: center;
            }
        }

        button {
            width: 110px;
            height: 40px;
            background: rgba(22, 155, 213, 1);
            color: #fff;
            border: none;
            border-radius: 5px;
        }

    }

    #allright {
        width: 50%;
        height: 800px;
        overflow-y: auto;
        border: solid 1px;

    }


}
</style>
