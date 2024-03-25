<template>
    <div>
        <div class="edition">
            <p :class="inedx == i ? 'edition-p' : 'edition-p1'" v-for="(x,i) in editionData" :key="i"
                @click="editionClick(x, i)">{{ x.label }}</p>
        </div>
        <div class="search">
            <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
                <el-form-item label="主播长id" prop="name">
                    <el-input placeholder="请输入内容" v-model="queryParams.parmas.userId" class="input-with-select">
                        <el-button slot="append"  @click="searchClick" icon="el-icon-search"></el-button>
                        <!-- <el-button slot="append" @click="searchClick" type="primary"
                            <el-button slot="append" icon="el-icon-search"></el-button>
                            style="background-color: #1890ff; color: #fff;margin-left: 10px;">搜索
                        </el-button> -->
                    </el-input>
                  <el-checkbox @change="selfSupportChange" :false-label="0" :true-label="1" v-model="queryParams.parmas.selfSupport">仅查看自营主播</el-checkbox>
                </el-form-item>
            </el-form>
            <div class="refesh">
                <div>最后刷新时间{{ times }}</div>
                <el-button class="btn" size="mini" type="primary" @click="refreshClick">刷新</el-button>
            </div>
        </div>

        <el-table v-loading="loading" :data="umsInfos">
            <el-table-column label="排序" align="center" type="index" :index="indexMethod">

            </el-table-column>
            <el-table-column label="主播长ID" align="center" prop="userId" />
            <el-table-column label="主播照片" align="center" prop="url">
                <template slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.face"
                        :preview-src-list="[scope.row.face]" fit="cover">
                        <div slot="error" class="image-slot" style="line-height:100px">
                            <!-- <i class="el-icon-picture-outline" style="line-height: 50px;"></i> -->
                            --
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="主播得分" align="center" prop="totalScore" />
            <el-table-column label="主播等级/临时等级" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.level }}
                        <span v-if="scope.row.levelSource  ">({{ scope.row.levelSource  }})</span>
                        /{{ scope.row.tempLevel }}</span>
                </template>
            </el-table-column>
            <el-table-column label="在线状态" align="center" prop="onlineState" :formatter='statusType' />
            <el-table-column label="A0生命值" align="center" prop="healthA0"  >
                <template slot-scope="scope">
                    <p>{{ scope.row.healthA0 != null ? scope.row.healthA0: '--'}}<span v-show="scope.row.healthA0">s</span> </p>
                </template>
            </el-table-column>
            <el-table-column label="当前状态" align="center" prop="callState">
                <template slot-scope="scope">
                   <div v-if="scope.row.callState == 'idle'">
                    <p>空闲</p>
                   </div>
                   <!-- <p>{{ scope.row.callState == null ? '--' : scope.row.callState == 'idle' ? '空闲' : '' }}</p> -->
                   <!-- <div v-if="!scope.row.callState">
                    <p>--</p>
                   </div> -->
                   <div v-if="scope.row.callState == 'busy'">
                    <div style="color: #efc681">忙碌</div>
                    <p v-show="scope.row.orderId" style="color: #efc681">通话中，订单号：{{ scope.row.orderId}}</p>
                   </div>
                </template>
            </el-table-column>
            <el-table-column label="账户状态" align="center" prop="userStatus" :formatter='userType' />
            <el-table-column label="得分明细" align="center">
                <template slot-scope="scope">
                    <p>最终等级分:{{ scope.row.totalLevelScore }}</p>
                    <p>在线分:{{ scope.row.onlineScore }}</p>
                    <p>得分合计={{ scope.row.totalScore }}</p>
                </template>
            </el-table-column>

        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="initialask" />

    </div>
</template>

<script>
import { getProviderSortList } from '@/api/operate/refresh/index'
import { formatDate } from '../../../utils/index'
export default {
    data() {
        return {
            loading: true,
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    selfSupport: 0,
                    userId: null,
                    language: 'en'
                }
            },
            editionData: [{ value: "en", label: "英语版本" }, { value: "id", label: "印尼语版本" }, { value: "hi", label: "印地语版本" }, { value: "ar", label: "阿拉伯语版本" }],
            inedx: 0,
            times: formatDate(JSON.parse(localStorage.getItem('time'))),
            umsInfos: [],
            total: 0
        };
    },
    mounted() {
        this.initialask()
    },
    methods: {
        // 初始请求
        initialask() {
            console.log("123")
            this.loading = true
            getProviderSortList(this.queryParams).then((result) => {
                this.umsInfos = result.data.list
                this.total = result.data.total
                this.loading = false
            })
            localStorage.setItem("time", JSON.stringify(new Date()))
            this.times = formatDate(JSON.parse(localStorage.getItem('time')))
        },
        // 切换语言版本
        editionClick(x, i) {
            this.loading = true
            this.inedx = i
            this.queryParams.parmas.language = x.value
            this.initialask()
        },
        // 排序
        indexMethod(val) {
            return val + 1
        },
        // 刷新
        refreshClick() {
            this.inedx = 0
            this.queryParams.pageNum = 1
            this.queryParams.parmas.language = 'en'
            this.queryParams.parmas.selfSupport = 0
            this.queryParams.parmas.userId = null
            this.initialask()
        },
        selfSupportChange() {
            this.initialask()
        },
        // 状态转文字
        statusType(val) {
            switch (val.onlineState) {
                case 'green1':
                    return <span style="color:green">绿1</span>;
                case 'green2':
                    return <span style="color:green">绿2</span>;
                case 'green3':
                    return <span style="color:green">绿3</span>;
                case 'yellow1':
                    return <span style="color:#b5b500">黄1</span>;
                case 'yellow2':
                    return <span style="color:#b5b500">黄2</span>;
                case 'yellow3':
                    return <span style="color:#b5b500">黄3</span>;
                case 'red1':
                    return <span style="color:red">红1</span>;
                case 'red2':
                    return <span style="color:red">红2</span>;
                case 'red3':
                    return <span style="color:red">红3</span>;
                case 'red4':
                    return <span style="color:red">红4</span>;
                default:
                    return "--";
            }

        },
        // 状态转文字
        userType(val) {
            switch (val.userStatus) {
                case 'normal':
                    return "正常";
                case 'ban':
                    return "封禁";
                case 'freeze':
                    return "冻结";
                case 'blacklist':
                    return "黑名单";
                case 'whitelist':
                    return "白名单";
                case 'failassess':
                    return "考核未通过";
                case 'default':
                    return "待定";
                case 'audit':
                    return '审核'
                default:
                    return "--";
            }
        },
        // 搜索
        searchClick() {
            console.log(this.queryParams.parmas.userId)
            if (this.queryParams.parmas.userId == '') {
                this.queryParams.parmas.userId = null
            }
            this.queryParams.pageNum = 1
            this.initialask()
        }
    },
}
</script>

<style lang="scss" scoped>
.edition {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: flex-start;
    cursor: pointer; // 手指
    margin-left: 40px;

    .edition-p {
        margin-left: 50px;
        font-weight: bold;
        line-height: 70px;
    }

    .edition-p1 {
        margin-left: 50px;
        line-height: 70px;
    }
}

.input-with-select{
    width: 350px;
    margin-right: 10px;
}

.search {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-form-item{
        margin-bottom: 0px;
    }
    .refesh {
        width: 400px;
        align-items: center;
        display: flex;

        button {
            width: 80px;
            height: 40px;
            margin: 8px;
        }
        .btn{
            height: 30px;
        }
       
    }
}
</style>
