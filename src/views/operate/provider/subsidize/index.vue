<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="用户ID" prop="providerUserId">
                <el-input v-model="queryParams.parmas.userId" placeholder="请输入参数名称" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="clearDel" />
            </el-form-item>
            <el-form-item label="用户代码" prop="userCode">
                <el-input v-model="queryParams.parmas.userCode" placeholder="请输入参数名称" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="resetQuery" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="queryParams.parmas.nickname" placeholder="请输入参数名称" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="resetQuery" />
            </el-form-item>
            <el-form-item label="代理号" prop="agentCode">
                <el-input v-model="queryParams.parmas.agentCode" placeholder="请输入代理号" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="resetQuery" />
            </el-form-item>
            <el-form-item label="主播国家" prop="regionCode">
                <el-input v-model="queryParams.parmas.regionCode" placeholder="请输入主播国家代码" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="resetQuery" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="addTo">添加</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="umsInfos">
            <el-table-column label="用户ID" align="center" prop="userId" width="200" />
            <el-table-column label="用户代码" align="center" prop="userCode" width="150" />
            <el-table-column label="昵称" align="center" prop="nickname" width="200" />
            <el-table-column label="代理号" align="center" prop="agents" width="150" />
            <el-table-column label="主播国家代码" align="center" prop="regionCode" width="150" />
            <el-table-column label="补贴状态" align="center" :formatter="shengxiao" width="80" />
            <!-- （0-撤销 1-正常 3- --） -->
            <el-table-column label="创建时间" align="center" prop="createTime" width="200" />
            <el-table-column label="接通率目标" align="center" prop="callAcceptRate" width="120"> </el-table-column>
            <el-table-column label="挂断率目标" align="center" prop="callRefuseRate" width="120">
            </el-table-column>
            <el-table-column label="工作状态" align="center" :formatter="gongzuoState" width="100" />
            <el-table-column label="最后一次离开goWork时间" align="center" prop="lastGoWorkTime" width="180" />
            <el-table-column label="操作" align="center" width="300">
                <template slot-scope="scope">
                    <el-button type="primary" round size="small" @click="incentivesPriceEdit(scope.row)">更改补贴规格
                    </el-button>
                    <el-button type="danger" round size="small" @click="handleCheck(scope.row)">撤销补贴主播
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="撤销理由" :visible.sync="centerDialogVisible" width="30%" center>
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 35 }" placeholder="请输入内容" v-model="textarea"
                maxlength="500">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="chexiaoOk">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="补贴规格" :visible.sync="centerDialogButie" width="90%" center>
            <div id="guige">
                <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
                    <el-form-item label="主播长id" prop="providerUserId">

                        <el-input v-model="zhuboID" placeholder="请输入内容" clearable @clear="clearDel"
                            :disabled="disabledZhubo"></el-input>
                        <div class="guigeSelse" v-show="selseShow">
                            <p @click="checkedCan(anchorList.nickname)">{{ anchorList.nickname }}</p>
                        </div>

                        <!-- <el-autocomplete v-model="zhuboID" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"
                            :trigger-on-focus="false" @select="handleSelect" clearable @clear="clearDel">
                        </el-autocomplete> -->
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="seace" :disabled="disabledZhubo">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="incentivesPriceAdd">添加</el-button>
                    </el-form-item>
                </el-form>

                <div class="guisd" id="butie" v-for="(x, i) in subsidyData.periods" :key="i" >
                    <div id="butie-div">
                        <p id="butie-p">设定补贴时段</p>
                        <div style="margin-bottom:15px;display: flex" id="butie">

                            <el-select v-model="x.startTime" placeholder="">
                                <el-option v-for="item in userStatusOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <span
                                style="font-size:20px;margin-left:20px;margin-right:20px;width: 50px;line-height: 50px;">to</span>
                            <el-select v-model="x.endTime" placeholder="">
                                <el-option v-for="item in userTypeOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div id="butie-div">
                        <p id="butie-p">设定补贴规格</p>
                        <el-select v-model="x.incentivesPrice" placeholder="请选择" style="width: 180px;">
                            <el-option v-for="item in options" :key="item.dictValue" :label="item.dictLabel"
                                :value="item.dictValue">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="width:330px" id="butie-div">
                        <p id="butie-p">设定补贴时段达标时长上下限(小时)</p>
                        <el-input-number v-model="x.limitLower" controls-position="right"
                            @change="handleChangeStarts(x.limitLower)" :min="0" :max="24"></el-input-number>
                        /
                        <el-input-number v-model="x.limitUpper" controls-position="right"
                            @change="handleChangeEnd(x.limitUpper)" :min="0" :max="24"></el-input-number>
                    </div>

                    <div id="butie-div">
                        <p id="butie-p">操作</p>
                        <el-button type="danger" round size="small" @click="incentivesPriceDelet(i)"
                            style="margin-top:5px">删除
                        </el-button>
                    </div>
                </div>

            </div>
            <div style="text-align: center;">
                <span style="font-size: 18px;
    font-weight: 600;margin-right: 10px;">设定接通率目标</span>
                <el-input-number v-model="subsidyData.callAcceptRate" controls-position="right" :controls="false"
                    :min="0" :max="100"></el-input-number> %
            </div>
            <div style="text-align: center;margin-top: 20px;">
                <span style="font-size: 18px;
    font-weight: 600;margin-right: 10px;">设定挂断率目标</span>
                <el-input-number v-model="subsidyData.callRefuseRate" controls-position="right" :controls="false"
                    :min="0" :max="100"></el-input-number> %
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelsd">取 消</el-button>
                <el-button type="primary" @click="butieOk">确 定</el-button>
            </span>
        </el-dialog>


        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getUserInfoByPageAndParams" />
    </div>
</template>
<script>
import { pagesd, queryDictListByType, searchProvider, detail, save, cancel } from '@/api/operate/user/manager/manager'

export default {
    name: 'Manager',
    data() {
        return {
            // 遮罩层
            loading: false,
            // 导出遮罩层
            exportLoading: false,
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            // 参数表格数据
            umsInfos: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    userCode: null,
                    agentCode: null,
                    regionCode: null,
                    nickname: null,
                }
            },
            // 表单参数
            form: {},
            userTypeOptions: [
                { value: "01:59", label: '01:59' },
                { value: "02:59", label: '02:59' },
                { value: "03:59", label: '03:59' },
                { value: "04:59", label: '04:59' },
                { value: "05:59", label: '05:59' },
                { value: "06:59", label: '06:59' },
                { value: "07:59", label: '07:59' },
                { value: "08:59", label: '08:59' },
                { value: "09:59", label: '09:59' },
                { value: "10:59", label: '10:59' },
                { value: "11:59", label: '11:59' },
                { value: "12:59", label: '12:59' },
                { value: "13:59", label: '13:59' },
                { value: "14:59", label: '14:59' },
                { value: "15:59", label: '15:59' },
                { value: "16:59", label: '16:59' },
                { value: "17:59", label: '17:59' },
                { value: "18:59", label: '18:59' },
                { value: "19:59", label: '19:59' },
                { value: "20:59", label: '20:59' },
                { value: "21:59", label: '21:59' },
                { value: "22:59", label: '22:59' },
                { value: "23:59", label: '23:59' },
            ],
            userStatusOptions: [
                { value: "00:00", label: '00:00' },
                { value: "01:00", label: '01:00' },
                { value: "02:00", label: '02:00' },
                { value: "03:00", label: '03:00' },
                { value: "04:00", label: '04:00' },
                { value: "05:00", label: '05:00' },
                { value: "06:00", label: '06:00' },
                { value: "07:00", label: '07:00' },
                { value: "08:00", label: '08:00' },
                { value: "09:00", label: '09:00' },
                { value: "10:00", label: '10:00' },
                { value: "11:00", label: '11:00' },
                { value: "12:00", label: '12:00' },
                { value: "13:00", label: '13:00' },
                { value: "14:00", label: '14:00' },
                { value: "15:00", label: '15:00' },
                { value: "16:00", label: '16:00' },
                { value: "17:00", label: '17:00' },
                { value: "18:00", label: '18:00' },
                { value: "19:00", label: '19:00' },
                { value: "20:00", label: '20:00' },
                { value: "21:00", label: '21:00' },
                { value: "22:00", label: '22:00' },
                { value: "23:00", label: '23:00' },
            ],
            centerDialogVisible: false,
            /**撤销理由 */
            textarea: '',
            // 更改补贴弹框
            centerDialogButie: false,
            subsidyData: {
                userId: "",
                callAcceptRate: "",
                callRefuseRate: "",
                id: null,
                periods: [

                ],
            },

            valueData: {
                id: 0,
                startTime: '',
                endTime: '',
                limitLower: 1,
                limitUpper: 1,
                incentivesPrice: '0',
            },

            /**补贴规格 */
            options: [],
            /**主播ID */
            zhuboID: "",
            /**主播USERid */
            zhuboUserID: "",
            id: null,
            restaurants: [],
            loading: false,
            // 主播下拉框显示
            selseShow: false,
            /**主播列表 */
            anchorList: {},
            /**主播禁止修改 */
            disabledZhubo: false,
            // 撤销id
            chexiaoId: "",
            // 选择的结束时间
            selseEndTime: 0,
            // 选择的开始时间
            selseStaTime: 0,
            // 主播状态
            zhubState: false

        }
    },
    created() {
        this.getUserInfoByPageAndParams()
    },
    mounted() {

        // 查询规格字典
        queryDictListByType({ dictType: "provider_incentives_price" }).then(res => {
            console.log(res)
            if (res.code == 200) {
                this.options = res.data
            }

        })
    },
    methods: {

        /** 查询用户信息 */
        getUserInfoByPageAndParams() {
            this.loading = true
            pagesd(this.queryParams).then(response => {
                if (response.code == 200) {
                    this.umsInfos = response.data.list
                    this.total = response.data.total
                    this.loading = false
                } else {
                    this.loading = false
                    this.$message.error(response.msg)
                }
            }
            ).catch((err) => {
                console.log(err)
                this.loading = false
                this.umsInfos = []
                this.total = 0

            })
        },
        /** 撤销主播 */
        handleCheck(row) {
            if (row.valid == 1) {
                this.textarea = ""
                this.centerDialogVisible = true
                this.chexiaoId = row.id
            } else {
                this.$message({
                    type: "error",
                    message: "状态已失效",
                });
            }
        },
        /**更改补贴规格 */
        incentivesPriceEdit(row) {
            if (row.valid == 1) {
                this.centerDialogButie = true;
                this.disabledZhubo = true;
                this.zhuboUserID = row.userId;
                detail({ userId: row.userId }).then(res => {
                    console.log(res)
                    this.subsidyData = res.data
                    this.zhuboID = res.data.nickname
                    this.id = res.data.id
                })
            } else {
                this.$message({
                    type: "error",
                    message: "状态已失效",
                });
            }

        },
        // 取消按钮
        cancel() {
            this.open = false
            this.reset()
        },
        // 表单重置
        reset() {
            this.resetForm('form')
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1
            this.queryParams.pageSize = 10
            this.getUserInfoByPageAndParams()
        },
        /**撤销理由确定 */
        chexiaoOk() {
            console.log(this.textarea)
            this.centerDialogVisible = false
            cancel({ id: this.chexiaoId, cancelReason: this.textarea }).then(res => {
                if (res.code == 200) {
                    this.getUserInfoByPageAndParams()
                    this.$message({
                        type: "success",
                        message: "撤销成功",
                    });
                }
            })
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    userCode: null,
                    agentCode: null,
                    regionCode: null,
                    nickname: null,
                    userType: 2
                }
            }
            this.resetForm('queryForm')
            this.handleQuery()
        },
        /**添加补贴主播 */
        incentivesPriceAdd() {
            console.log(this.zhuboID, this.zhubState)
            if (this.disabledZhubo == false) {
                if (this.zhuboID != "") {
                    if (this.zhubState == true) {
                        let valueData = { ...this.valueData }
                        valueData.id += 1
                        this.subsidyData.periods.push(valueData)
                        console.log(valueData)
                    } else {
                        this.$message({
                            type: "error",
                            message: "没有找到到对应的主播",
                        });
                    }
                } else {
                    this.$message({
                        type: "error",
                        message: "服务者不能为空",
                    });
                }

            } else {
                let valueData = { ...this.valueData }
                valueData.id += 1
                this.subsidyData.periods.push(valueData)
            }

        },
        /**时段 */
        handleChangeStarts(x) {
            this.subsidyData.limitLower = x
            console.log(this.subsidyData.limitLower, x)
        },
        /**时段 */
        handleChangeEnd(x) {
            this.subsidyData.limitUpper = x
            console.log(this.subsidyData.limitUpper, x)
        },
        /**删除 */
        incentivesPriceDelet(index) {
            this.subsidyData.periods.splice(index, 1);
        },
        /**添加主播 */
        addTo() {
            this.zhuboID = "",
                this.zhuboUserID = "";
                this.id = null;
            this.subsidyData.id = null
            this.disabledZhubo = false;
            this.subsidyData.callAcceptRate = 0,
                this.subsidyData.callRefuseRate = 0,
                this.subsidyData.periods = [],
                this.centerDialogButie = true;
                console.log(this.subsidyData)
        },
        /**补贴规格的确定 */
        butieOk() {
            console.log(this.zhuboID)
            if (this.zhuboID != "") {
                let subsidyData = { ...this.subsidyData }
                subsidyData.userId = this.zhuboUserID
                subsidyData.id = this.id
                console.log(this.subsidyData, subsidyData.periods.endTime != "")
                if (subsidyData.periods.length != 0) {
                    let art = false
                    let asd = false
                    subsidyData.periods.map(x => {
                        if (x.endTime != "" && x.startTime != "" && x.incentivesPrice != "") {
                            if (x.endTime < x.startTime) {
                                art = false
                                asd = false
                            } else {
                                art = true
                                asd = false
                            }
                        } else {
                            art = false
                            asd = true
                        }
                    })
                    if (art == true) {

                        save(subsidyData).then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    type: "success",
                                    message: "操作成功",
                                });
                                this.selseShow = false;
                                this.centerDialogButie = false;
                                this.getUserInfoByPageAndParams()
                            }
                        })
                        console.log(this.subsidyData, this.zhuboUserID)
                    } else {
                        if (asd == true) {
                            this.$message({
                                type: "error",
                                message: "请输入补贴规格"
                            });
                        } else {
                            this.$message({
                                type: "error",
                                message: "开始时间不能大于结束时间"
                            });
                        }

                    }

                } else {
                    this.$message({
                        type: "error",
                        message: "请输入补贴规格"
                    });
                }
            } else {
                this.$message({
                    type: "error",
                    message: "服务者不能为空"
                });
            }

        },
        /**取消补贴规格 */
        cancelsd() {
            this.centerDialogButie = false;
            this.selseShow = false;
        },
        //   删除内容
        clearDel() {
            this.subsidyData.periods = []
            this.selseShow = false;
        },
        // 选中主播
        checkedCan(x) {
            this.selseShow = false;
            this.zhuboID = x;

        },

        /**是否生效 */
        shengxiao(row) {
            switch (row.valid) {
                case 0:
                    return <span style="color:#f56c6c">失效</span>;
                case 1:
                    return <span style="color:#67c23a">有效</span>;
                default:
                    return "--";
            }
        },
        // 工作状态
        gongzuoState(row) {
            switch (row.workState) {
                case 0:
                    return <span style="color:#f56c6c">离线</span>;
                case 1:
                    return <span style="color:#67c23a">在线</span>;
                case 2:
                    return "goWork中";
                default:
                    return "--";
            }
        },
        // 查询主播
        seace() {
            console.log(this.zhuboID)
            if (this.zhuboID != "") {
                searchProvider({ userId: this.zhuboID }).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.selseShow = true;
                        this.anchorList = res.data
                        this.zhuboUserID = res.data.userId
                        this.zhubState = true
                    } else {
                        this.selseShow = false;
                        this.zhubState = false
                    }
                })
            } else {
                this.$message({
                    type: "error",
                    message: "服务者不能为空",
                });
            }
        },

    },
    //     watch: {
    //     zhuboID: function (newQuestion) {
    //       if (newQuestion.length != 0) {
    //         this.selseShow = true;
    //       } else {
    //         this.selseShow = false;
    //       }
    //     },
    //   },
}
</script>

<style lang="scss" scoped>
#guige {
    width: 100%;
    height: 100%;
    padding: 0 0 100px;
    overflow: hidden;

    H2 {
        width: 100%;
        text-align: center;
    }

    .addButton {
        position: absolute;
        top: 10px;
        right: 100px;
    }

    .guisd {
        display: flex;
        justify-content: flex-start;
        width: 90%;
        height: 80%;
        margin: 5px auto 0;
        background: #f8f8f9;

        div {
            margin: 5px 20px;

            p {
                text-align: center;
            }
        }

        .el-input-number--medium {
            width: 90px;
        }

        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
            width: 200px;
        }


    }

    .guigeSelse {
        margin: 10px 0;
        box-shadow: 0 0 10px 5px rgb(223, 221, 221);
        border-radius: 5px;

        p {
            margin: 0;
            padding: 0 5px;
            border-bottom: solid 1px #f8f8f9;
        }

        p:hover {
            background: #f8f8f9;
        }
    }


}
</style>
