<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="88px">
            <el-form-item label="主播长id" prop="providerUserId">
                <el-input v-model="queryParams.parmas.userId" placeholder="请输入参数名称" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="主播短id" prop="userCode">
                <el-input v-model="queryParams.parmas.userCode" placeholder="请输入参数名称" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="queryParams.parmas.nickname" placeholder="请输入参数名称" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="代理号" prop="agentCode">
                <el-input v-model="queryParams.parmas.agentCode" placeholder="请输入代理号" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="resetQuery" />
            </el-form-item>
            <el-form-item label="主播国家" prop="regionCode">
                <el-input v-model="queryParams.parmas.regionCode" placeholder="请输入主播国家代码" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="resetQuery" />
            </el-form-item>
            <el-form-item label="" prop="">
                <el-date-picker  style="width: 240px"  size="mini" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="timeChang">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <div class="">
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    <el-button type="primary" icon="el-icon-download" size="mini" @click="exportData">导出</el-button>
                </div>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="umsInfos">
            <el-table-column label="日期" align="center" prop="reportDate" />
            <el-table-column label="主播长uid" align="center" prop="userId" />
            <el-table-column label="主播短uid" align="center" prop="userCode" />
            <el-table-column label="主播昵称" align="center" prop="nickname" />
            <el-table-column label="代理号" align="center" prop="agents" width="150" />
            <el-table-column label="主播国家代码" align="center" prop="regionCode" width="150" />
            <el-table-column label="接通数" align="center" prop="answerNum" />
            <el-table-column label="接通率目标" align="center" prop="answerExpect" />
            <el-table-column label="接通率(%)" align="center" prop="answerRate" />
            <el-table-column label="挂断数" align="center" prop="hangUpNum" />
            <el-table-column label="挂断率目标" align="center" prop="hangUpExpect" />
            <el-table-column label="挂断率(%)" align="center" prop="hangUpRate" />
            <el-table-column label="达标工作时长(分钟)" align="center" prop="workingTime" />
            <el-table-column label="达标工作时长(小时)" align="center" prop="revenueTime" />
            <el-table-column label="补贴金币金额" align="center" prop="incentivesPrice" />
            <el-table-column label="是否完成" align="center" :formatter="shengxiao" />
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getUserInfoByPageAndParams" />
    </div>
</template>
<script>
import { pageForOperate, exportProviderCall } from '@/api/operate/user/manager/manager'
import { baseUrl } from '../../../../config';
import { exportExcel,parseTime } from "../../../../utils/ruoyi"
import axios from "axios";
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
                    nickname: null,
                    agentCode: null,
                    regionCode: null,
                    userCode: null,
                    userId: null,
                    startTime: null,
                    endTime: null
                }

            },
            // 表单参数
            form: {},
            userTypeOptions: [
                { value: 0, label: '正常' },
                { value: 1, label: '冻结' }
            ],
            userStatusOptions: [
                { value: 1, label: '正常' },
                { value: 2, label: '禁用' },
                { value: 3, label: '注销' }
            ],
            fileList: [],
            file: [],
            time: []
        }
    },
    created() {
        this.getUserInfoByPageAndParams()
        
    },
    methods: {
        userTypeFormat(row) {
            let str = ''
            this.userTypeOptions.forEach((t) => {
                if (t.value === row.userFirstChargeStatus) {
                    str = t.label
                }
            })
            return str
        },
        userStatusFormat(row) {
            let str = ''
            this.userStatusOptions.forEach((t) => {
                if (t.value === row.userStatus) {
                    str = t.label
                }
            })
            return str
        },
        /** 查询用户信息 */
        getUserInfoByPageAndParams() {
            this.loading = true
           try {
                pageForOperate(this.queryParams).then(response => {
                    if (response.code == 200) {
                        this.umsInfos = response.data.list
                        this.total = response.data.total
                    } else {
                        this.$message.error(response.msg)
                    }
                })
           } catch (error) {
            
           }finally{
            this.loading = false
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
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    userCode: null,
                    nickname: null,
                    agentCode: null,
                    regionCode: null,
                    startTime: null,
                    endTime: null
                },
            }
            this.time = []
            this.resetForm('queryForm')
            this.handleQuery()
        },
        handleChange(file, fileList) {
            this.loading = true
            this.show = true
            let data = []
            this.fileList = [fileList[fileList.length - 1]]; // 只能上传⼀个Excel，重复上传会覆盖之前的
            this.file = file.raw;
            let reader = new FileReader()
            let _this = this
            reader.readAsArrayBuffer(this.file)
            reader.onload = function () {
                let buffer = reader.result
                let bytes = new Uint8Array(buffer)
                let length = bytes.byteLength
                let binary = ''
                for (let i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i])
                }
                let XLSX = require('xlsx')
                let wb = XLSX.read(binary, {
                    type: 'binary'
                })
                let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                console.log('这是上传表格', outdata)
            }
        },

        //导出
        exportData() {
            exportProviderCall(this.queryParams).then(res => {
                exportExcel(res,`补贴报表${parseTime(new Date())}`);
            })
        },

        /**时间的确定 */
        timeChang() {
            this.queryParams.parmas.startTime = `${this.time[0]}`;
            this.queryParams.parmas.endTime = `${this.time[1]}`;
            console.log(
                this.queryParams.parmas.startTime,
                this.queryParams.parmas.endTime,
                this.time
            );

            this.getUserInfoByPageAndParams();
        },
        /**是完成 */
        shengxiao(row) {
            switch (row.done) {
                case 0:
                    return <span style="color:#f56c6c">未完成</span>;
                case 1:
                    return <span style="color:#67c23a">完成</span>;
                default:
                    return "--";
            }
        },
    }
}
</script>


<style lang="scss" scoped>
.qiangxing {
    width: auto;
    display: flex;
    line-height: 36px;
    height: 36px;
    margin-left: 10px;

    .upload-demo {
        margin: 0 10px;
        height: 35px;
        line-height: 35px;

        .pan-btn {
            padding: 10px 13px;
            border-radius: 4px;
        }
    }

}
</style>