<template>
    <div style="padding:10px">
        <p class="titile">审核列表下发任务库</p>
        <table id="myTable" cellspacing="0" cellpadding="10" style="text-align: center;" width="30%">
            <tr class="header">
                <th>任务</th>
                <th>开启状态</th>
                <th>操作</th>
            </tr>
            <tr v-for="(x, i) in formData" :key="i">
                <td>{{ x.level }}级</td>
                <td>{{ x.enable == 1 ? "开启" : "不开启" }}</td>
                <td @click="typeClick(x)" style="color:cornflowerblue; cursor: pointer;">{{ x.enable == 1 ? "取消开启" : "授权开启" }}
                </td>
            </tr>
        </table>
        <p class="titile">权限分配</p>
        <table id="myTable"  cellspacing="0" cellpadding="10" style="text-align: center;" width="40%">
            <tr class="header">
                <th>任务</th>
                <th>分配状态</th>
                <th>分配审核人员</th>
                <th>操作</th>
            </tr>
            <tr v-for="(x, i) in formDataQuan" :key="i">
                <td>{{ x.level }}级</td>
                <td>{{ x.enable == 1 ? "可分配" : "不可分配" }}</td>
                <td><p v-for="(x,i) in x.userList" style="padding:0;margin: 5px 0;">{{ x.userName }}</p></td>
                <td>
                    <!-- <el-button size="mini" @click="editClick(x)" v-show="x.enable == 1">修改</el-button> -->
                    <el-button type="text" size="mini" @click="editClick(x)" v-show="x.enable == 1">修改</el-button>
                    <p v-show="x.enable == 0" style="padding:0;margin:0">--</p>
                </td>
            </tr>
        </table>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
            <span style="padding:0;margin:0">修改{{ editInfo.level }}级审核人员</span>
            <div class="bulletFrame">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="(x, i) in operateList" :key="i" :label="`${x.userId}`">{{ x.nickName
}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkClick">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getAuditTaskLevel, settingAuditTaskLevel, settingAuditTaskAssign, getAuditTaskAssign } from "@/api/operate/anchorReview/reviewList/index";
import { allocatedUserList, listRole } from "@/api/system/role";
export default {
    data() {
        return {
            formData: [
            ],
            formDataQuan: [
            ],
            dialogVisible: false,
            editInfo: {},
            checkList: [],
            operateList: [],
            /**查询运营角色 */
            queryParamsd: {
                pageNum: 1,
                pageSize: 100,
                roleId: null,
            },
        };
    },
    created() {
        this.init()
        listRole({
            pageNum: 1,
            pageSize: 20,
        }).then(res => {
            if (res.code == 200) {
                if (res.rows.length > 0) {
                    res.rows.map(x => {
                        if (x.roleKey == "outsource") {
                            this.queryParamsd.roleId = x.roleId
                            this.allocatedUserListd(this.queryParamsd)
                        }
                    })
                }
            }

        })
    },
    methods: {
        init() {
            getAuditTaskLevel().then(res => {
                this.formData = res.data
            })
            getAuditTaskAssign().then(res => {
                this.formDataQuan = res.data
            })
        },
        typeClick(val) {
            if (val.enable == 0) {
                val.enable = 1
            } else {
                val.enable = 0
            }
            settingAuditTaskLevel({
                "level": val.level,
                "enable": val.enable
            }
            ).then(res => {
                if (res.code == 200) {
                    this.init()
                    this.$message({
                        type: "success",
                        message: "成功",
                    });
                }
            })

        },
        editClick(val) {
            console.log(val,this.checkList)
            this.checkList = []
            this.dialogVisible = true
            this.editInfo = val
            val.userList.map(x=>{
                this.checkList.push(x.userId)
            })
            
        },
        checkClick() {
            console.log(this.checkList)
            this.dialogVisible = false
            settingAuditTaskAssign({
                level: this.editInfo.level,
                userIdList: this.checkList
            }
            ).then(res=>{
                if(res.code == 200){
                    this.init()
                    this.$message({
                        type: "success",
                        message: "成功",
                    });
                }
            })
        },
        allocatedUserListd(val) {
            allocatedUserList(val).then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.operateList = res.rows
                }
            })
            
        },
    }
}

</script>

<style scoped>
.bulletFrame {
    width: 150px;
    height: auto;
    display: flex;
    padding: 10px 15px;
    margin: 15px 15px 15px 30px;
    border: solid 1px;

}

.el-checkbox {
    padding: 5px 0;
}

table,th,td{
    border:1px solid rgb(202, 197, 197);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.titile{
    font-size: 18px;
    font-weight: 600;
}
</style>