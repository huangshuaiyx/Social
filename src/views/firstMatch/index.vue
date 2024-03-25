<template>
    <div class="firtMatch">
        <el-button size="mini" v-on:click="add" type="primary">新增</el-button>
        <div class="table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="dictKey" label="用户国家"></el-table-column>
                <el-table-column prop="dictValue" label="优先主播国家"></el-table-column>
                <el-table-column prop="dictLabel" label="高加权国家"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="editconutry(scope.row)" type="text">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="isadd" :visible.sync="centerDialogVisible" center :close-on-click-modal="false">
            <el-form ref="form" label-width="180px">
                <el-form-item label="用户国家">
                    <el-select class="itemselect" multiple v-model="dictKey" filterable placeholder="请选择用户国家">
                        <el-option v-for="item in userCountrtData" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先主播国家">
                    <el-select class="itemselect" multiple v-model="dictValue" filterable placeholder="请选择优先主播国家">
                        <el-option v-for="item in anchorCountrtData" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="高加权国家">
                    <el-select class="itemselect" multiple v-model="dictLabel" filterable placeholder="请选择高加权国家">
                        <el-option v-for="item in userCountrtData" :key="item.dictKey" :label="item.dictValue" :value="item.dictValue">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="cancle">取 消</el-button>
                <el-button size="mini" type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { getqueryDictListByTypeApi, addqueryDictListByTypeApi, updatequeryDictListByTypeApi } from '@/api/anchor/index'
export default {
    data () {
        return {
            editId: "",
            centerDialogVisible: false,
            dictLabel: [],
            dictKey: [],
            dictValue: [],
            isadd: '新增',
            tableData: [],
            userCountrtData: usertData,
            anchorCountrtData: usertData
        }
    },
    watch: {
        centerDialogVisible (newval) {
            if (!newval) {
                this.dictKey = []
                this.dictValue = []
                this.dictLabel = []
                this.editId = ''
            }
        }
    },
    created () {
        this.getqueryDictListByTypeList()
    },
    methods: {
        getqueryDictListByTypeList () {
            let obj = {
                dictType: "priority_provider_country"
            }
            getqueryDictListByTypeApi(obj).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data
                    this.tableData.forEach(item => {
                        item.isEditStatus = true
                    })
                    console.log(this.tableData);
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(req => {
                this.$message.error(req.msg)
            })
        },
        add () {
            this.isadd = '新增'
            this.centerDialogVisible = true
        },
        editconutry (row) {
            this.isadd = '编辑'
            this.centerDialogVisible = true
            this.dictKey = row.dictKey.split(',')
            this.dictValue = row.dictValue.split(',')
            this.dictLabel = row.dictLabel ? row.dictLabel.split(',') : []
            this.editId = row.id
        },
        submit () {
            if (!this.dictValue.length || !this.dictKey.length) return this.$message.warning('请选择用户国家、优先主播国家')
            if (this.isadd == '新增') {
                let obj = {
                    dictKey: this.dictKey.join(','),
                    dictValue: this.dictValue.join(','),
                    dictLabel: this.dictLabel.join(','),
                    dictType: "priority_provider_country"
                }
                try {
                    addqueryDictListByTypeApi(obj).then(res => {
                        if (res.code == 200) {
                            this.$message.success('新增成功！')
                            this.getqueryDictListByTypeList()

                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(req => {
                        this.$message.error(req.msg)
                    })
                } catch (error) {

                } finally {
                    this.centerDialogVisible = false
                }
            } else {
                let obj = {
                    id: this.editId,
                    dictKey: this.dictKey.join(','),
                    dictValue: this.dictValue.join(','),
                    dictLabel: this.dictLabel.join(',')
                }
                try {
                    updatequeryDictListByTypeApi(obj).then(res => {
                        if (res.code == 200) {
                            this.$message.success('编辑成功！')
                            this.getqueryDictListByTypeList()

                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(req => {
                        this.$message.error(req.msg)
                    })
                } catch (error) {

                } finally {
                    this.centerDialogVisible = false
                }

            }
        },
        cancle () {
            this.centerDialogVisible = false
        }
    }
}
const usertData = [
    { dictKey: 'AE', dictValue: 'AE' },
    { dictKey: 'AU', dictValue: 'AU' },
    { dictKey: 'AR', dictValue: 'AR' },
    { dictKey: 'BD', dictValue: 'BD' },
    { dictKey: 'BH', dictValue: 'BH' },
    { dictKey: 'BR', dictValue: 'BR' },
    { dictKey: 'CA', dictValue: 'CA' },
    { dictKey: 'CL', dictValue: 'CL' },
    { dictKey: 'CO', dictValue: 'CO' },
    { dictKey: 'DE', dictValue: 'DE' },
    { dictKey: 'DO', dictValue: 'DO' },
    { dictKey: 'EC', dictValue: 'EC' },
    { dictKey: 'EG', dictValue: 'EG' },
    { dictKey: 'ES', dictValue: 'ES' },
    { dictKey: 'FR', dictValue: 'FR' },
    { dictKey: 'GB', dictValue: 'GB' },
    { dictKey: 'ID', dictValue: 'ID' },
    { dictKey: 'IL', dictValue: 'IL' },
    { dictKey: 'IN', dictValue: 'IN' },
    { dictKey: 'IQ', dictValue: 'IQ' },
    { dictKey: 'IT', dictValue: 'IT' },
    { dictKey: 'JO', dictValue: 'JO' },
    { dictKey: 'JP', dictValue: 'JP' },
    { dictKey: 'KH', dictValue: 'KH' },
    { dictKey: 'KW', dictValue: 'KW' },
    { dictKey: 'KR', dictValue: 'KR' },
    { dictKey: 'KZ', dictValue: 'KZ' },
    { dictKey: 'LK', dictValue: 'LK' },
    { dictKey: 'MA', dictValue: 'MA' },
    { dictKey: 'MY', dictValue: 'MY' },
    { dictKey: 'MG', dictValue: 'MG' },
    { dictKey: 'MX', dictValue: 'MX' },
    { dictKey: 'MU', dictValue: 'MU' },
    { dictKey: 'NG', dictValue: 'NG' },
    { dictKey: 'NL', dictValue: 'NL' },
    { dictKey: 'NZ', dictValue: 'NZ' },
    { dictKey: 'OM', dictValue: 'OM' },
    { dictKey: 'PE', dictValue: 'PE' },
    { dictKey: 'PH', dictValue: 'PH' },
    { dictKey: 'PK', dictValue: 'PK' },
    { dictKey: 'PR', dictValue: 'PR' },
    { dictKey: 'QA', dictValue: 'QA' },
    { dictKey: 'RU', dictValue: 'RU' },
    { dictKey: 'SA', dictValue: 'SA' },
    { dictKey: 'SG', dictValue: 'SG' },
    { dictKey: 'TH', dictValue: 'TH' },
    { dictKey: 'TR', dictValue: 'TR' },
    { dictKey: 'UA', dictValue: 'UA' },
    { dictKey: 'US', dictValue: 'US' },
    { dictKey: 'VE', dictValue: 'VE' },
    { dictKey: 'VN', dictValue: 'VN' },
    { dictKey: 'ZA', dictValue: 'ZA' },
]
</script>

<style lang="scss" scoped>
.firtMatch {
    padding: 20px;

    .table {
        margin-top: 10px;
    }
    .itemselect {
        width: 100%;
    }
}
</style>