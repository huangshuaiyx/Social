<template>
    <div>
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select"
            style="width: 40%;margin-top: 20px;margin-left: 10px;">
            <el-button slot="append" icon="el-icon-search" @click="inputClick"></el-button>
        </el-input>
        <div class="residue" v-show="isShow">
            <div>
                <span>vip天数到期时间：</span>
                <span>{{ userInfo.vipTime }}</span>
            </div>
            <div>
                <span>剩余钻石数量：</span>
                <span>{{ userInfo.balance }}</span>
            </div>
            <div>
                <span>所属国家code：</span>
                <span>{{ userInfo.userRechargeRegionCode }}</span>
            </div>
        </div>
        <div class="emptyInfo" v-show="!isShow">
            请先查询用户信息！
        </div>
        <div>
            <el-input placeholder="请输入vip天数" v-model="vipInput" class="input-with-select"
                style="width: 15%;margin-top: 20px;margin-left: 10px;" :disabled="buttondisabled">
                <!-- <el-button type="primary" slot="append" @click="inputClick(1)" :disabled="buttondisabled">添加</el-button> -->
            </el-input>
            <el-input placeholder="请输入钻石数量" v-model="diamondInput" class="input-with-select"
                style="width: 15%;margin-top: 20px;margin-left: 10px;" :disabled="buttondisabled">
                <!-- <el-button type="primary" slot="append" @click="inputClick(2)" :disabled="buttondisabled">添加</el-button> -->
            </el-input>
            <el-input placeholder="请输入国家code" v-model="countryInput" class="input-with-select"
                style="width: 15%;margin-top: 20px;margin-left: 10px;" :disabled="buttondisabled">
                <!-- <el-button type="primary" slot="append" @click="inputClick(3)" :disabled="buttondisabled">添加</el-button> -->
            </el-input>
            <el-button style="margin-left: 10px;" :disabled="buttondisabled" @click="addClick(3)">添加</el-button>
        </div>

        <hr style="border: 1px solid rgb(233, 229, 229);" />
        <div class="residue" v-show="isShow">
            <div>
                <span>关注的ID</span>
            </div>
        </div>
        <div>
            <el-input placeholder="请输入需要关注的ID" v-model="interestInput" class="input-with-select"
                style="width: 15%;margin: 20px 0 10px 10px;" :disabled="followdisabled">
            </el-input>
            <el-button style="margin-left: 10px;" :disabled="followdisabled" @click="interestClick()">关注</el-button>
        </div>
    </div>
</template>

<script>
import { userinfo, userupdate, userexecutor } from "../../../api/remoteControl/index"
export default {
    data() {
        return {
            input3: null,
            buttondisabled: true,
            countryInput: null,
            diamondInput: null,
            vipInput: null,
            userId: null,
            userInfo: {},
            isShow: false,
            interestInput: null,
            followdisabled: true,
        }
    },
    methods: {
        inputClick() {
            if (!this.input3) {
                this.isShow = false
                this.userId = null
                this.buttondisabled = true
                this.followdisabled = true
            }
            userinfo({ userId: this.input3 }).then(res => {
                if (res.code == 200) {
                    this.buttondisabled = false
                    this.userId = res.data.userId
                    this.followdisabled = false
                    this.userInfo = res.data
                    this.isShow = true
                }
            })
        },
        addClick() {
            userupdate({
                userId: this.userId,
                userRechargeRegionCode: this.countryInput,
                vipTime: this.vipInput,
                balance: this.diamondInput
            }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.vipInput = null
                    this.diamondInput = null
                    this.countryInput = null
                    this.userId = null
                    this.input3 = null
                    this.buttondisabled = true
                    this.isShow = false
                }
            })
        },
        // 关注
        interestClick() {
            if (this.interestInput) {
                userexecutor({
                    scriptGroup: "user.add.relation",
                    data: {
                        fromUserId: this.userId,
                        toUserId: this.interestInput
                    }
                }
                ).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.followdisabled = true
                        this.interestInput = null
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    }

                })
            } else {
                this.$message('请输入内容');
            }

        },
    }
}
</script>


<style lang="scss" scoped>
.residue {
    margin-top: 20px;
    padding: 0px 10px;
    color: #c0c4cc;
    width: 700px;
    display: flex;
    justify-content: space-between;
}

.emptyInfo {
    width: 700px;
    text-align: center;
    margin-top: 20px;
    color: #c0c4cc;
}

// ::v-deep .el-input-group__append,
// // .el-input-group__prepend {
// //     background: #0c7be4;
// //     color: #fff;
// // }
</style>