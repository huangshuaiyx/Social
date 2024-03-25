<style scoped lang="scss">
.mmhost {
    ::v-deep .el-table__body-wrapper {
        overflow: auto !important;
    }
    // padding: 20px;
    // overflow: auto;
    // .scheduletotal {
    //     display: flex;
    //     box-sizing: border-box;
    //     align-content: center;
    //     .step {
    //         width: 80px;
    //         text-align: center;
    //         padding: 5px;
    //         border: 1px solid #797979;
    //         flex-shrink: 0;
    //     }

    //     .scheduletotalitem {
    //         padding: 5px;
    //         border: 1px solid #797979;
    //         display: flex;
    //         align-content: center;
    //     }
    //     .nickName {
    //         width: 180px;
    //         line-height: 28px;
    //         white-space: nowrap; /* 防止文字换行 */
    //         overflow: hidden; /* 隐藏溢出部分 */
    //         text-overflow: ellipsis; /* 使用省略号显示溢出部分 */
    //     }
    //     .nickNamelable {
    //         cursor: pointer;
    //         color: #1890ff;
    //     }
    // }
    .title {
        display: flex;
        margin: 10px 0px 10px 0px;
        .titleSelect {
            width: 600px;
            .el-select {
                width: 100%;
            }
        }
        .btnInfo {
            margin-left: 10px;
        }
    }
    .inp {
        width: 260px;
    }
    .table {
        .delBtn {
            margin-left: 20px;
        }
        .uesrname {
            color: #1890ff;
            cursor: pointer;
        }
        .itemVideototal {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            width: 315px;
            .vedioitem {
                margin-left: 5px;
            }
        }
    }
}
</style>
<template>
    <div class="mmhost">
        <el-card class="box-card" :style="{height:`calc(100vh - ${heights})`}">
            <el-tabs v-model="userRegionGroup" @tab-click="handleClick">
                <el-tab-pane :label="item.dictKey" :name="item.dictValue" v-for="(item,index) in tabList" :key="index">
                </el-tab-pane>
            </el-tabs>
            <div class="title">
                <div class="titleSelect">
                    <el-select size="mini" v-model="schedule" clearable multiple placeholder="请选择进度可多选">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="btnInfo">
                    <el-button type="primary" size="mini" @click="search">搜索</el-button>
                    <el-button type="primary" size="mini" @click="add">新增</el-button>
                </div>
            </div>
            <div class="table">
                <el-table :data="tableData" style="width: 100%" v-loading="loading">
                    <el-table-column  type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="step" label="当前进度" width="80"></el-table-column>
                    <el-table-column prop="userCode" label="主播短ID" width="100"></el-table-column>
                    <el-table-column prop="userId" label="主播长ID" width="220"></el-table-column>
                    <el-table-column prop="marketVideoList" label="营销视频ID" width="220">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.marketVideoList" :key="item.id">
                                <span>{{ item.id }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickName" label="主播昵称" width="100">
                        <template slot-scope="scope">
                            <div @click="linktoInfo(scope.row)" class="uesrname">{{ scope.row.nickName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="regionCode" label="主播国家" width="80"></el-table-column>
                    <el-table-column prop="name" label="营销视频" width="300">
                        <template slot-scope="scoped">
                            <div v-if="scoped.row.marketVideoList" class="itemVideototal">
                                <div v-for="(item,index) in scoped.row.marketVideoList" :key="index" class="vedioitem">
                                    <div>
                                        <el-popover prop="video" placement="top" trigger="hover" :close-delay="10">
                                            <video :src="item.url" width="230" height="200" controls preload></video>
                                            <div slot="reference" class="head">
                                                <video width="100" height="100" controls :src="item.url"></video>
                                            </div>
                                        </el-popover>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastUpdateTimebj" label="上次操作时间" width="160">
                        <template slot-scope="scoped">
                            {{ scoped.row.lastUpdateTimebj | timeFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="lastStep" label="上次进度" width="80"></el-table-column>
                    <el-table-column prop="updateTimebj" label="操作时间" width="160">
                        <template slot-scope="scoped">
                            {{ scoped.row.updateTimebj | timeFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100px">
                        <template slot-scope="scope">
                            <el-link @click="edit(scope.row)" type="primary" :underline="false">修改</el-link>
                            <el-popconfirm title="确定删除当前主播吗？" @confirm="delItem(scope.row)">
                                <el-link slot="reference" class="delBtn" type="danger" :underline="false">删除</el-link>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog :title="isadd" :visible.sync="centerDialogVisible" center :close-on-click-modal="false" width="30%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="主播短ID" v-if="isadd == '新增'">
                        <div class="inp">
                            <el-input placeholder="请输入主播短ID" v-model="userCode"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="进度设置">
                        <div class="inp">
                            <el-select style="width: 100%;" v-model="probabilityVal" placeholder="请选择进度">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="cancle">取 消</el-button>
                    <el-button size="mini" type="primary" @click="submit">确 定</el-button>
                </span>
            </el-dialog>

            <!-- <div v-for="item in scheduleList" :key="item.userId" class="scheduletotal">
            <div class="step">进度{{ item.step }}</div>
            <div v-for="it in item.providerList" :key="it.id" class="scheduletbox">
                <div class="scheduletotalitem">
                    <el-tooltip class="item" effect="dark" :open-delay="300" :content="it.nickName" placement="top-start">
                        <div class="nickName nickNamelable" @click="golink(it.userId)">{{ it.nickName }}</div>
                    </el-tooltip>
                    <el-button type="danger" size="mini" @click="deleteitem(it.userId)">删除</el-button>
                </div>
            </div>
            <div>
                <div class="scheduletotalitem">
                    <el-input class="nickName" v-model="item.userCode" size="mini" placeholder="请输入主播短ID"></el-input>
                    <el-button size="mini" @click="addUserCode(item.step,item.userCode)">增加</el-button>
                </div>
            </div>
        </div> -->
        </el-card>
    </div>
</template>

<script>
import { queryDictListByType } from '@/api/operate/user/manager/manager'
import { getmarketmatchListApi, removemarketmatchApi, addmarketmatchApi, updatemarketmatchApi } from '@/api/anchor/index'
export default {
    filters: {
        timeFilter (val) {
            if (!val) return ''
            var date = new Date(val);
            let sign2 = ":";
            let year = date.getFullYear() // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日
            let hour = date.getHours(); // 时
            let minutes = date.getMinutes(); // 分
            let seconds = date.getSeconds() //秒
            // 给一位数的数据前面加 “0”
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
        }
    },
    data () {
        return {
            probabilityVal: '',
            heights: "90px",
            userCode: '',
            centerDialogVisible: false,
            isadd: "新增",
            loading: true,
            tableData: [],
            schedule: [],
            tabList: [],
            options: [],
            userRegionGroup: '',
            itemInfo: {}, //单条数据
            // scheduleList: [],
        }
    },
    watch: {
        centerDialogVisible (newval) {
            if (!newval) {
                this.probabilityVal = ''
                this.userCode = ""
                this.itemInfo = {}
            }
        }
    },
    async created () {
        this.getSelectscheduleList()
        await this.getTabsListList()
        this.getscheduleList()
    },
    mounted () {
        let cardhtheight = document.querySelector('.box-card').clientHeight
        document.querySelector('.el-table__body-wrapper').style.height = cardhtheight - 48 - 134 + 'px'
    },
    methods: {
        add () {
            this.isadd = '新增'
            this.centerDialogVisible = true
        },
        cancle () {
            this.centerDialogVisible = false
        },
        search () {
            this.getscheduleList()
        },
        handleClick (val) {
            this.getscheduleList()
        },
        linktoInfo (row) {
            window.open(`${window.location.origin}/#/operate/jump/info?userId=${row.userId}&userType=2`)
        },
        delItem (row) {
            let obj = {
                id: row.id,
                userId: row.userId,
                userRegionGroup: this.userRegionGroup
            }
            removemarketmatchApi(obj).then(res => {
                if (res.code == 200) {
                    this.$message.success('删除成功！')
                    this.getscheduleList()
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(req => {
                this.$message.error(req.msg)
            })
        },
        edit (row) {
            this.isadd = '修改进度'
            this.centerDialogVisible = true
            this.probabilityVal = row.step
            this.itemInfo = row
        },
        submit () {
            if (this.isadd == '新增') {
                if (!this.userCode || !this.probabilityVal) return this.$message.warning('请输入进度和主播短ID！')
                let obj = {
                    userCode: this.userCode,
                    step: this.probabilityVal,
                    userRegionGroup: this.userRegionGroup,
                }
                try {
                    addmarketmatchApi(obj).then(res => {
                        if (res.code == 200) {
                            this.$message.success('新增成功')
                            this.getscheduleList()
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
                if (!this.probabilityVal) return this.$message.warning('请输入进度！')
                let obj = {
                    userRegionGroup: this.userRegionGroup,
                    step: this.probabilityVal,
                    userId: this.itemInfo.userId,
                    id: this.itemInfo.id,
                }
                try {
                    updatemarketmatchApi(obj).then(res => {
                        if (res.code == 200) {
                            this.$message.success('新增成功')
                            this.getscheduleList()
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
        // 字典查询 tab
        getTabsListList () {
            return new Promise((resove, reject) => {
                queryDictListByType({ dictType: 'user_region_group' }).then(res => {
                    if (res.code == 200) {
                        resove(res)
                        this.tabList = res.data
                        this.userRegionGroup = this.tabList[0].dictValue
                    } else {
                        this.$message.error(res.msg)
                    }
                }).catch(req => {
                    this.$message.error(req.msg)
                })
            })
        },
        // 字典查询 进度
        getSelectscheduleList () {
            queryDictListByType({
                dictType: "mm_host_config",
                dict_key: "mm_host_max_step"
            }).then(res => {
                if (res.code == 200) {
                    for (let i = 1; i <= res.data[0].dictValue; i++) {
                        let obj = { value: i + "", label: i + "" }
                        this.options.push(obj)
                    }
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(req => {
                this.$message.error(req.msg)
            })
        },
        getscheduleList () {
            this.loading = true
            let obj = {
                userRegionGroup: this.userRegionGroup,
                stepList: this.schedule
            }
            try {
                getmarketmatchListApi(obj).then(res => {
                    if (res.code == 200) {
                        if (res.data.length) {
                            res.data.forEach(item => {
                                item.lastUpdateTimebj = new Date(item.lastUpdateTime).getTime() ? new Date(item.lastUpdateTime).getTime() + 2.5 * 60 * 60 * 1000 : 0
                                item.updateTimebj = new Date(item.updateTime).getTime() + 60 * 60 * 1000 ? new Date(item.updateTime).getTime() + 2.5 * 60 * 60 * 1000 : 0
                            })
                        }
                        this.tableData = res.data
                    } else {
                        this.$message.error(res.msg)
                    }
                }).catch(req => {
                    this.$message.error(req.msg)
                })
            } catch (error) {

            } finally {
                setTimeout(() => {
                    this.loading = false
                }, 200);
            }
        },
        // golink (value) {
        //     this.$router.push({
        //         path: `/operate/jump/info?userId=${value}&userType=2`,
        //     })
        // },
        // addUserCode (value, userCode) {
        //     if (!userCode) return this.$message.warning('请输入主播短ID')
        //     addmarketmatchApi({ step: value, userCode: userCode }).then(res => {
        //         if (res.code == 200) {
        //             this.userCode = ''
        //             this.$message.success('新增成功')
        //             this.getscheduleList()
        //         } else {
        //             this.$message.error(res.msg)
        //         }
        //     }).catch(req => {
        //         this.$message.error(req.msg)
        //     })
        // },
        // deleteitem (id) {
        //     removemarketmatchApi({ userId: id }).then(res => {
        //         if (res.code == 200) {
        //             this.$message.success('删除成功！')
        //             this.getscheduleList()
        //         } else {
        //             this.$message.error(res.msg)
        //         }
        //     }).catch(req => {
        //         this.$message.error(req.msg)
        //     })
        // }
    },
}
</script>

