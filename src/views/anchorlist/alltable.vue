<style scoped lang="scss">
.fivetable {
    .top {
        width: 400px;
        display: flex;
        margin-bottom: 20px;
        .inp {
            margin-right: 10px;
        }
    }
    .buttons {
        display: flex;
    }
    .head {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .markingvideoInfo {
        width: 100px;
        overflow-x: hidden;
        height: 110px;
    }
}
</style>
<template>
    <div class="fivetable">
        <div class="top">
            <el-input class="inp" size="mini" placeholder="Please Enter Type Host Id Or Host Code" v-model="providerId" @keyup.enter.native="onSeach"/>
            <el-button @click="onSeach" size="mini">search</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column align="center" prop="userId" label="Host Id" width="220">
            </el-table-column>
            <el-table-column align="center" prop="userCode" label="Host Code"  width="100"></el-table-column>
            <el-table-column align="center" prop="face" label="Avater" width="160">
                <template slot-scope="scoped">
                    <div class="head" v-show="scoped.row.face">
                        <el-image :src="scoped.row.face" :preview-src-list="[scoped.row.face]"></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="videoFace" label="Life Video" width="160">
                <template slot-scope="scoped">
                    <div v-if="scoped.row.videoFace">
                        <el-popover prop="video" placement="top" trigger="hover" :close-delay="10">
                            <video :src="scoped.row.videoFace" width="230" height="200" controls preload></video>
                            <div slot="reference" class="head">
                                <video width="100" height="100" controls :src="scoped.row.videoFace"></video>
                            </div>
                        </el-popover>
                    </div>
                    <span v-else>None</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="urls" label="Marking Video" width="160">
                <template slot-scope="scoped">
                    <div v-if="scoped.row.urls" class="markingvideoInfo">
                        <div v-for="(item,index) in scoped.row.urls.split(',')" :key="index">
                            <el-popover prop="video" placement="top" trigger="hover" :open-delay="300">
                                <video :src="item" width="300" height="200" controls preload></video>
                                <div slot="reference" class="head">
                                    <video width="100" height="100" controls :src="item"></video>
                                </div>
                            </el-popover>
                        </div>
                    </div>
                    <span v-else>None</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="nickName" label="NickName" width="200"></el-table-column>
            <el-table-column align="center" prop="operationScoreLevelCode" label="Current Level Highest Level" width="200">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.operationScoreLevelCode}}
                        <span v-if="scoped.row.levelSource">({{ scoped.row.levelSource }})</span>
                        /{{ scoped.row.highestLevel}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="address" label="View" width="200">
                <template slot-scope="scoped">
                    <div class="buttons">
                        <el-button @click="MoreInfo(scoped.row)" size="mini">More info</el-button>
                        <el-button @click="videoCheck(scoped.row)" size="mini">Video check</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="type" label="State" width="150">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.type | stateFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="reason" label="Reason" width="220"></el-table-column>
            <el-table-column align="center" prop="address" label="Operate" width="280px">
                <template slot-scope="scoped">
                    <div class="buttons">
                        <el-button v-if="!['1','3'].includes(scoped.row.type)" @click="addBtn(scoped.row)" size="mini">Join</el-button>
                        <el-button v-if="['1','3'].includes(scoped.row.type)" @click="recommed(scoped.row)" size="mini">Remove</el-button>
                        <el-button v-if="['1','3'].includes(scoped.row.type)" @click="neverrecommed(scoped.row)" size="mini">Block This Host</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-pagination v-show="tableData.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formPage.pageSize" :page-sizes="[10, 20, 30, 50]" :page-size="formPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination> -->
    </div>
</template>

<script>
import { neverRecommendApi, searchalljoinListApi, joinListApi, removerecommendApi } from '@/api/anchor/index'
export default {
    filters: {
        stateFilter (val) {
            if (!['1', '3'].includes(val)) return 'Not in us version'
            return 'in us version'
        }
    },
    data () {
        return {
            providerId: "",
            heights: '105px',
            tableData: [],
            loading: false,
            formPage: {
                pageNum: 1,
                pageSize: 10,
            },
            total: 0
        }
    },
    methods: {
        onSeach () {
            if (!this.providerId) return this.$message.warning('Please Enter Type Host iD Or Host Code')
            this.loading = true
            searchalljoinListApi({ type: '5', providerCode: this.providerId }).then(res => {
                if (res.code == 200) {
                    if(!res.data) return  this.tableData = []
                    this.tableData = [res.data]
                }
            }).catch(req => {
                console.log(req);
            }).finally(() => {
                this.loading = false
            })

        },
        // 操作
        addBtn (row) {
            joinListApi({ providerId: row.userId, type: row.type }).then(res => {
                if (res.code == 200) {
                    this.$message.success('success！')
                    this.onSeach()
                }
            })
        },
        recommed (val) {
            removerecommendApi({ type: val.type, providerId: val.userId }).then(res => {
                if (res.code == 200) {
                    this.$message.success('success！')
                    this.onSeach()
                }
            })
        },
        neverrecommed (val) {
            neverRecommendApi({ type: val.type, providerId: val.userId }).then(res => {
                if (res.code == 200) {
                    this.$message.success('success！')
                    this.onSeach()
                }
            })
        },
        // 分页
        handleSizeChange (value) {
            this.formPage.pageNum = 1
            this.formPage.pageSize = value
            this.onSeach()
        },
        handleCurrentChange (value) {
            this.formPage.pageNum = value
            this.onSeach()
        },
        // 更多信息
        MoreInfo (row) {
            let userId = row.userId
            let userType = 2
            console.log(window.location.origin + '/#/anchorlist/info');

            location.href = `${window.location.origin}/#/operate/jump/info?userId=${userId}&userType=${userType}`
            // location.href = `${window.location.origin}/#/anchorlist/anchorlist/info?userId=${userId}&userType=${userType}&skipStatus=false`
        },
        videoCheck (row) {
            let userId = row.userId
            let userType = 2
            console.log(window.location.origin + '/#/anchorlist/info');

            location.href = `${window.location.origin}/#/anchorlist/anchorlist/videoInfo?userId=${userId}&userType=${userType}&skipStatus=false`
        },
    }

}
</script>

