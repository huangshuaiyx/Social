<template>
    <div class="anchorlevelconfiguration">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column prop="date" label="配置项">
                <template slot-scope="scoped">
                    <span v-if="scoped.row.type == 'join'">自动加入</span>
                    <span v-else>自动移出</span>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="主播等级">
                <template slot-scope="scoped">
                    <span v-if="scoped.row.leveList.length">{{ scoped.row.leveList | filterleveList}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operatorName" label="操作人"> </el-table-column>
            <el-table-column prop="updateTime" label="操作时间"> </el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scoped">

                    <el-link :underline="false" @click="editItem(scoped.$index,scoped.row)" type="primary" size="mini">修改</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑 -->
        <el-dialog title="修改移入等级配置" :visible="centerDialogVisible" width="40%" center :before-close="cancle" :close-on-click-modal="false">
            <el-form ref="form" :model="authorform" label-width="80px">
                <el-form-item label="主播等级">
                    <el-select class="authorselect" v-model="authorform.authorVal" multiple placeholder="请选择主播等级">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
import { getAutoSetConfigApi, setAutoConfigApi } from '@/api/anchor/index'
export default {
    filters: {
        filterleveList (value) {
            if (!value.length) return
            return value.join(',')
        }
    },
    data () {
        return {
            centerDialogVisible: false,
            loading: true,
            tableData: [],
            authorform: {
                authorVal: [],
            },
            rowItem: {},
            options: [
                { labe: "A", value: "A" },
                { labe: "B", value: "B" },
                { labe: "C", value: "C" },
                { labe: "D", value: "D" },
                { labe: "E", value: "E" },
                { labe: "F", value: "F" },
            ]
        }
    },
    created () {
        this.getAuthorData()
    },
    watch: {
        centerDialogVisible (newval, oldval) {
            if (!newval) {
                this.authorform.authorVal = []
            }
        }
    },
    methods: {
        getAuthorData () {
            try {
                let obj = {}
                getAutoSetConfigApi(obj).then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data
                    } else {
                        this.$message.error(res.msg)
                    }
                }).catch(req => {
                    this.$message.error(req.msg)
                })
            } catch (error) {

            } finally {
                this.loading = false
            }
        },
        editItem (index, row) {
            this.rowItem = row
            this.rowItem.type = row.type
            this.rowItem.index = index
            this.authorform.authorVal = row.leveList[0] ? row.leveList : []
            this.centerDialogVisible = true

        },
        cancle () {
            this.centerDialogVisible = false
        },
        submit () {
            this.loading = true
            let obj = {
                type: this.rowItem.type,
                levelList: this.authorform.authorVal
            }
            let copytableData = JSON.parse(JSON.stringify(this.tableData))
            copytableData.splice(this.rowItem.index, 1)
            let arr = []
            copytableData.map(item => {
                return item.leveList.map(it => {
                    arr.push(it)
                })

            })
            console.log(arr, 'arr', this.authorform.authorVal);
            let falg = this.authorform.authorVal.some(item => arr.includes(item))
            if (falg) {
                this.$message.warning('主播等级配置已存在')
                this.loading = false
                return
            }
            try {
                setAutoConfigApi(obj).then(res => {
                    if (res.code == 200) {
                        this.getAuthorData()
                        this.$message.success('修改成功')

                    } else {
                        this.$message.error(res.msg)
                    }
                })
                    .catch(req => {
                        this.$message.error(req.msg)
                    })
            } catch (error) {
                this.$message.error(req.msg)
            } finally {
                this.loading = false
                this.centerDialogVisible = false
            }

        },
    }
}
</script>

<style lang="scss" scoped>
.anchorlevelconfiguration {
    padding: 20px;
    .authorselect {
        width: 400px;
    }
}
</style>