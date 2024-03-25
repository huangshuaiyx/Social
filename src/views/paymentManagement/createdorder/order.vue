<style lang="scss" scoped>
.order {
    .dialoginfo {
        max-height: 600px;
        overflow: auto;
        .upload {
            display: flex;
            align-items: center;
            .fileName {
                margin-left: 20px;
            }
        }
        .ellink {
            margin: 20px 0px;
            color: #1890ff;
        }
        .dialogrow {
            margin-bottom: 20px;
        }
    }
}
</style>
<template>
    <div class="order">
        <el-dialog title="批量创建订单" :visible="dialogVisible" width="50%" :before-close="handClose">
            <div class="dialoginfo">
                <div class="upload">
                    <el-upload class="upload-demo" accept=".xls,.xlsx" :auto-upload="false" :show-file-list="false" :before-upload="handlePreview" action="#" :on-change="handlechange" :file-list="fileList">
                        <el-button size="small" type="primary">提交Exl文件</el-button>
                    </el-upload>
                    <span class="fileName">{{ fileName }}</span>
                </div>
                <el-link class="ellink" @click="loadingExl">下载事例文件</el-link>
                <div class="dialogrow">
                    <span>选择代付渠道：</span>
                    <el-select v-model="channelCode" placeholder="请选择代付渠道">
                        <el-option v-for="item in inpaymentlist" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="details">
                    <el-table :data="detailstableData" border style="width: 100%" v-loading="detailsLoading">
                        <el-table-column prop="beneficiaryName" label="用户姓名"></el-table-column>
                        <el-table-column prop="beneficiaryEmail" label="用户邮箱"></el-table-column>
                        <el-table-column prop="beneficiaryMobile" label="用户电话"></el-table-column>
                        <el-table-column prop="beneficiaryAccount" label="用户账号"></el-table-column>
                        <el-table-column prop="beneficiaryIfsc" label="IFSC"></el-table-column>
                        <el-table-column prop="amount" label="付款金额(INR)"></el-table-column>
                        <el-table-column prop="submitCount" label="24h内累计提交"></el-table-column>
                    </el-table>
                    <div style="margin-top: 20px;">{{ detailsTotal }} 条订单, 共计<span style="padding: 0px 5px">{{ totalMoney.toFixed(2) }}</span>INR</div>
                </div>
            </div>
            <span v-if="detailstableData.length != 0" slot="footer" class="dialog-footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" :loading="submitLoading" @click="submit">生成代付订单</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { orderimportApi, creatOrderListApi } from '@/api/operate/order/inpayment'
export default {
    data () {
        return {
            fileName: "",
            fileList: [],
            detailstableData: [],
            detailsTotal: 0,
            totalMoney: 0,
            channelCode: "R_PAY",
            inpaymentlist: [
                { label: 'Rpay', value: 'R_PAY' }
            ],
            detailsLoading: false,
            submitLoading: false,
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        dialogVisible: {
            handler (val) {
                if (!val) {
                    this.detailstableData = []
                    this.detailsTotal = 0
                    this.totalMoney = 0
                    this.fileName = ''
                }
            }
        }

    },
    methods: {
        uploadfile (file) {
            console.log(file);
        },
        handlePreview (file) {
            // console.log( '11');
            // this.fileList = []
            // console.log(file);
        },
        handlechange (file, fileList) {
            this.fileName = file.name
            let data = new FormData()
            data.append('file', file.raw)
            console.log(file);
            orderimportApi(data).then(res => {
                if (res.code == 200) {
                    this.$message.success(res.msg)
                    this.detailstableData = res.data.list
                    this.detailsTotal = res.data.orderCount
                    this.totalMoney = res.data.totalAmount
                }
            }).catch(req => {
                console.log(req);
                this.$message.error(req.msg)
            })
        },
        handClose () {
            this.$emit('update:dialogVisible', false)
        },
        // 下载模板
        loadingExl () {
            let url = 'https://otovideo-china.s3.cn-north-1.amazonaws.com.cn/%E4%BB%A3%E4%BB%98%E8%AE%A2%E5%8D%95%E6%A8%A1%E6%9D%BF.xls'
            fetch(url).then(res => res.blob()).then(blob => {
                const a = document.createElement('a');
                document.body.appendChild(a)
                a.style.display = 'none'
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = '代付订单模板'; //视频下载后的名称
                a.click();
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url);
            })
        },
        submit () {
            this.submitLoading = true
            this.detailsLoading = true
            let obj = {
                channelCode: this.channelCode,
                list: this.detailstableData,
            }
            creatOrderListApi(obj).then(res => {
                if (res.code == 200) {
                    this.$message.success('操作成功！')
                    this.$emit('update:dialogVisible', false)
                    this.$emit('getTabledata')
                }
            }).catch(req => {
                this.$message.error(req.msg)
            }).finally(() => {
                this.submitLoading = false
                this.detailsLoading = false
                this.handClose()
            })

        },
        cancle () {
            this.detailstableData = []
            this.$emit('update:dialogVisible', false)
        }
    }
}
</script>

