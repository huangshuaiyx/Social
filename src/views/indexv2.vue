<template>
    <div>
        <div class="top-right">
            <el-button icon="el-icon-refresh" circle @click="shuax"></el-button>
        </div>

        <el-table v-loading="loading" :data="tableData" style="width: 100%" show-summary :summary-method="getSummaries" id="avf">
            <el-table-column fixed prop="levelCode" label="等级" align="center">
            </el-table-column>
            <el-table-column prop="green1Total" label="绿1" align="center">
            </el-table-column>
            <el-table-column prop="green2Total" label="绿2" align="center">
            </el-table-column>
            <el-table-column prop="green3Total" label="绿3" align="center">
            </el-table-column>
            <el-table-column prop="yellow1Total" label="黄1" align="center">
            </el-table-column>
            <el-table-column prop="yellow2Total" label="黄2" align="center">
            </el-table-column>
            <el-table-column prop="yellow3Total" label="黄3" align="center">
            </el-table-column>
            <el-table-column prop="greenYellowTotal" label="在线合计" align="center" class-name="over8">
            </el-table-column>
            <el-table-column prop="" label="明细链接" align="center">
                <template slot-scope="scoped">
                    <div class="detaillink" @click="gotoLink(scoped.row)">details</div>
                </template>
            </el-table-column>
            <el-table-column prop="onlineRatio" label="当前在线比例" width="100" align="center">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.onlineRatio }}%</span>
                </template>
            </el-table-column>
            <el-table-column prop="red1Total" label="红1" align="center">
            </el-table-column>
            <el-table-column prop="red2Total" label="红2" align="center">
            </el-table-column>
            <el-table-column prop="red3Total" label="红3" align="center">
            </el-table-column>
            <el-table-column prop="redTotal" label="不在线合计" align="center" class-name="over12">
            </el-table-column>
            <el-table-column prop="red4Total" label="红4" align="center">
            </el-table-column>
        </el-table>

    </div>
</template>
  
  <script>
import { getStateSummaryForScoreCardApi } from '@/api/operate/user/manager/manager'
export default {
    data () {
        return {
            tableData: [],
            // 遮罩层
            loading: false,
            num: 0
        }
    },
    mounted () {
        this.getStateSumm()
    },
    methods: {
        gotoLink (value) {
            window.open(`${window.location.origin}/#/operate/provider/stateList?onlineState=online&scoreLevelCode=${value.levelCode}`)
        },
        getStateSumm () {
            try {
                this.loading = true;
                getStateSummaryForScoreCardApi({}).then(res => {
                    if (res.code == 200) {
                        this.loading = false;
                        this.tableData = res.data
                    }
                })
            } catch (error) {

            } finally {
                this.loading = false;
            }
        },
        shuax () {
            this.getStateSumm()
        },
        objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 7 || columnIndex === 12) {
                if (rowIndex === 0) {
                    return {
                        rowspan: 5,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },

        getSummaries (param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index];
                } else {
                    sums[index] = '';
                }

            });
            return sums;
        },
        calculation (row) {
            console.log
        }

    }
}
  </script>
  
  
  
  <style lang="scss" scoped>
.detaillink {
    cursor: pointer;
    color: #498fb1;
}
div {
    p {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        color: #fff;
        font-size: 50px;
        // background-image: -webkit-linear-gradient(left bottom, #40c9c6, #0700ff);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
    }

    .top-right {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-end;

        .el-button {
            margin: 5px 10px;
        }

        // .right-i {
        //   width: 22px;
        //   height: 22px;
        //   border-radius: 50%;
        //   border: solid 1px;
        //   margin-right: 15px;
        //   margin-top: 5px;

        //   .el-icon-refresh {
        //     margin-top: 50%;
        //     margin-left: 10%;
        //     transform: translateY(-50%);

        //   }
        // }
    }

    ::v-deep .el-table__footer-wrapper {
        .over8 {
            font-size: 20px;
            font-weight: 600;
        }
    }

    ::v-deep .el-table__footer-wrapper {
        .over12 {
            font-size: 20px;
            font-weight: 600;
        }
    }
    // ::v-deep thead tr th:nth-child(2){
    //     background-color: green;
    //     color: #000;
    // }
    
    
}
</style>
  
  