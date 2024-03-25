
<style lang="scss" scoped>
.inpayment {
    padding: 20px;
    .title {
        height: 30px;
        line-height: 30px;
        background-color: #f2f2f2;
        margin-bottom: 5px;
        text-align: left;
    }
    .segmentation {
        border-bottom: 1px solid #ccc;
        margin: 5px 0px;
    }
    .inpaymentbanner {
        .createOrder {
            margin: 10px 0px;
        }
        .selectTime {
            width: 200px;
        }
    }
    .dialoginfo {
        .dialogrow {
            .item {
                text-align: left;
                display: inline-block;
                height: 40px;
                line-height: 40px;
            }
            .item:nth-child(1) {
                width: 290px;
            }
            .item:nth-child(2){
                width: 280px;
            }
        }
        .details {
            max-height: 500px;
            overflow: auto;
            margin-top: 20px;
        }
    }
}
</style>
<template>
    <div class="inpayment">
        <div class="title">IN代付管理</div>
        <div class="segmentation"></div>
        <div class="inpaymentbanner">
            <div class="createOrder">
                <el-button type="success" size="mini" @click="createOrder">批量创建订单</el-button>
            </div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="平台流水号">
                    <el-input size="mini" v-model="formInline.parmas.orderId" placeholder="请输入平台流水号"></el-input>
                </el-form-item>
                <el-form-item label="三方流水号">
                    <el-input size="mini" v-model="formInline.parmas.thirdTradeId" placeholder="请输入三方流水号"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名">
                    <el-input size="mini" v-model="formInline.parmas.beneficiaryName " placeholder="请输入用户姓名"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱">
                    <el-input size="mini" v-model="formInline.parmas.beneficiaryEmail " placeholder="请输入用户邮箱"></el-input>
                </el-form-item>
                <el-form-item label="用户账号">
                    <el-input size="mini" v-model="formInline.parmas.beneficiaryAccount " placeholder="请输入用户账号"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select size="mini" v-model="formInline.parmas.orderStatus" placeholder="请选择订单状态">
                        <el-option v-for="item in orderOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker class="selectTime" size="mini" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" v-model="formInline.parmas.createTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="成功时间">
                    <el-date-picker class="selectTime" size="mini" :default-time="['00:00:00', '23:59:59']" v-model="formInline.parmas.successTime" value-format="yyyy-MM-dd HH:mm:ss" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" @click="onSearch">搜索</el-button>
                    <el-button size="mini" type="primary" @click="resetting">重置</el-button>
                    <el-button size="mini" :loading="exportLoading" type="success" @click="exportExl">导出订单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableInfo">
            <el-table :data="orderData" style="width: 100%" v-loading="orderloading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading">
                <el-table-column prop="orderId" label="平台流水号" width="90"></el-table-column>
                <el-table-column prop="thirdTradeId" label="三方流水号" width="90"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"> </el-table-column>
                <el-table-column prop="channelName" label="渠道"> </el-table-column>
                <el-table-column prop="beneficiaryName" label="用户姓名"> </el-table-column>
                <el-table-column prop="beneficiaryEmail" label="用户邮箱"> </el-table-column>
                <el-table-column prop="beneficiaryMobile" label="用户电话"> </el-table-column>
                <el-table-column prop="beneficiaryAccount" label="用户账号"> </el-table-column>
                <el-table-column prop="beneficiaryIfsc" label="IFSC" width="110"> </el-table-column>
                <el-table-column prop="amount" label="付款金额(INR)" width="110"> </el-table-column>
                <el-table-column prop="serviceCharge" label="手续费(INR)" width="110"> </el-table-column>
                <el-table-column prop="orderStatus" label="订单状态">
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.orderStatus | statusFilter }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="successTime" label="成功时间"> </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scoped">
                        <el-button size="mini" @click="lookInfo(scoped.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination v-show="orderData.length>0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formPage.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="formPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="orderTotal">
            </el-pagination>
        </div>
        <!-- 代付详情 -->
        <el-dialog title="代付详情" :visible.sync="dialogVisible" width="60%">
            <div class="dialoginfo" v-loading="infoLoading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading">
                <div class="dialogrow">
                    <div class="item">
                        <span>平台流水号：</span><span>{{ orderInfo.orderId }}</span>
                    </div>
                    <div class="item">
                        <span>三方流水号：</span><span>{{ orderInfo.thirdTradeId }}</span>
                    </div>
                    <div class="item">
                        <span>渠道：</span> <span>{{ orderInfo.channelName }}</span>
                    </div>
                </div>
                <div class="dialogrow">
                    <div class="item">
                        <span>用户姓名：</span><span>{{orderInfo.beneficiaryName  }}</span>
                    </div>
                    <div class="item">
                        <span>用户邮箱：</span><span>{{  orderInfo.beneficiaryEmail  }}</span>
                    </div>
                    <div class="item">
                        <span>用户账号：</span> <span>{{ orderInfo.beneficiaryAccount  }}</span>
                    </div>
                </div>
                <div class="dialogrow">
                    <div class="item">
                        <span>IFSC：</span> <span>{{ orderInfo.beneficiaryIfsc  }}</span>
                    </div>
                    <div class="item">
                        <span>付款金额（INR）:</span> <span>{{ orderInfo.amount  }}</span>
                    </div>
                    <div class="item">
                        <span>手续费（INR）:</span> <span>{{ orderInfo.serviceCharge }}</span>
                    </div>
                </div>
                <div class="details">
                    <el-table :data="detailstableData" border style="width: 100%">
                        <el-table-column prop="occurrenceTime" label="时间" width="180">
                        </el-table-column>
                        <el-table-column prop="orderStatus" label="状态变化" width="180">
                            <template slot-scope="scoped">
                                <span>{{ scoped.row.orderStatus | statusFilter }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注">
                        </el-table-column>
                    </el-table>
                </div>
            </div>

        </el-dialog>
        <order @getTabledata="getTabledataList" :dialogVisible.sync="orderVisible" />
    </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
import { getorderpageApi, getOrderInfoApi, orderexportApi } from '@/api/operate/order/inpayment'

export default {
    components: {
        order: () => import('./createdorder/order.vue'),
    },
    filters: {
        statusFilter (val) {
            if (val == 0) return "待提交"
            if (val == 1) return "代付中"
            if (val == 2) return "代付成功"
            if (val == 3) return "代付失败"
            if (val == 4) return "代付下单失败"
        }
    },
    data () {
        return {
            exportLoading: false,
            orderInfo: {}, // 详情信息
            detailstableData: [],
            orderVisible: false,
            dialogVisible: false,
            orderloading: false,
            infoLoading: false,
            orderData: [],
            formPage: {
                pageSize: 10,
                pageNum: 1
            },
            orderTotal: 0,
            formInline: {
                parmas: {
                    successTime: null,
                    createTime: null,
                    orderId: null,
                    thirdTradeId: null,
                    beneficiaryEmail: null,
                    beneficiaryName: null,
                    beneficiaryAccount: null,
                    orderStatus: null,
                }
            },
            //晒选条件
            orderOptions: [
                { label: '待提交', value: 0 },
                { label: '代付中', value: 1 },
                { label: '代付成功', value: 2 },
                { label: '代付失败', value: 3 },
                { label: '代付下单失败', value: 4 },
            ]
        }
    },
    created () {
        this.getTabledataList()
    },
    methods: {
        // 分页
        handleCurrentChange (value) {
            this.formPage.pageNum = value
            this.getTabledataList()
            scrollTo(0, 600);
        },
        handleSizeChange (value) {
            this.formPage.pageSize = value
            this.getTabledataList()
            scrollTo(0, 600);
        },
        // 批量创建订单
        createOrder () {
            this.orderVisible = true
        },
        onSearch () {
            this.formPage.pageNum = 1
            this.getTabledataList()
        },
        resetting () {
            this.formInline = {
                parmas: {
                    successTime: null,
                    createTime: null,
                    orderId: null,
                    thirdTradeId: null,
                    beneficiaryEmail: null,
                    beneficiaryName: null,
                    beneficiaryAccount: null,
                    orderStatus: null,
                }
            }
            this.formPage.pageNum = 1
            this.getTabledataList()
        },
        // 导出
        async exportExl () {
            this.exportLoading = true
            let obj = {
                ...this.formPage,
                ...this.formInline
            }
            obj.startSuccessDate = obj.successTime ? obj.successTime[0] : null
            obj.endSuccessDate = obj.successTime ? obj.successTime[1] : null
            obj.startCreateDate = obj.createTime ? obj.createTime[0] : null
            obj.endCreateDate = obj.createTime ? obj.createTime[1] : null
            const res = await orderexportApi(obj)
            const blob = new Blob([res]);
            const fileName = '代付订单记录' + '.xlsx';
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            this.exportLoading = false
            document.body.removeChild(elink);
        },
        lookInfo (row) {
            this.infoLoading = true
            this.dialogVisible = true
            getOrderInfoApi({ recordId: row.recordId }).then(res => {
                if (res.code == 200) {
                    this.detailstableData = res.data.changeLogs
                    this.orderInfo = res.data
                }
            }).catch(req => {
                console.log(req);
            }).finally(() => {
                this.infoLoading = false
            })
        },
        getTabledataList () {
            this.orderloading = true
            let obj = {
                ...this.formInline,
                ...this.formPage,
            }
            obj.parmas.startSuccessDate = obj.parmas.successTime ? obj.parmas.successTime[0] : null
            obj.parmas.endSuccessDate = obj.parmas.successTime ? obj.parmas.successTime[1] : null
            obj.parmas.startCreateDate = obj.parmas.createTime ? obj.parmas.createTime[0] : null
            obj.parmas.endCreateDate = obj.parmas.createTime ? obj.parmas.createTime[1] : null
            Object.keys(obj.parmas).forEach(item => {
                if (!obj.parmas[item] && obj.parmas[item] !== 0) {
                    obj.parmas[item] = null
                }
            })
            getorderpageApi(obj).then(res => {
                if (res.code == 200) {
                    this.orderData = res.data.list
                    this.orderTotal = res.data.total
                }
            }).catch(req => {
                console.log(req);
            }).finally(() => {
                this.orderloading = false
            })
        },
    }
}
</script>
