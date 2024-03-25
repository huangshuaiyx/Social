<style scoped lang="scss">
.threetable {
    .top {
        width: 500px;
        display: flex;
        margin-bottom: 20px;
        .inp {
            width: 260px;
            margin-right: 10px;
        }
        .usergrade {
            width: 150px;
            margin-right: 10px;
        }
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
    .buttons {
        display: flex;
    }
}
</style>
<template>
    <div class="threetable">
        <div class="top">
            <el-input class="inp" size="mini" placeholder="Please Enter Type Host Id Or Host Code" v-model="providerId" @keyup.enter.native="onSeach" />
            <el-input class="inp" size="mini" placeholder="Please Enter The Region" v-model="regionCode" @keyup.enter.native="onSeach" />
            <el-select v-model="GradeInput" width="180" size="mini" placeholder="请选择主播等级" class="usergrade">
                <el-option v-for="(item, i) in optionsGrade" :key="i" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="onSeach" size="mini">search</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column align="center" prop="userId" label="Host Id" width="220">
            </el-table-column>
            <el-table-column align="center" prop="userCode" label="Host Code" width="100"></el-table-column>
            <el-table-column prop="regionCode" label="Country" align="center"></el-table-column>
            <el-table-column align="center" prop="face" label="Avater" width="160">
                <template slot-scope="scoped">
                    <div class="head" v-show="scoped.row.face">
                        <el-image :src="scoped.row.face" :preview-src-list="authorImgList"></el-image>
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
                        <el-button @click="moreInfo(scoped.row)" size="mini">More info</el-button>
                        <el-button @click="videoCheck(scoped.row)" size="mini">Video check</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="reason" label="Reason" width="220"></el-table-column>
            <el-table-column align="center" prop="address" label="Operate" width="280px">
                <template slot-scope="scoped">
                    <div class="buttons">
                        <el-button @click="removeBtn(scoped.row)" size="mini">Remove</el-button>
                        <el-button @click="recommed(scoped.row)" size="mini">Block This Host</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: right;">
            <el-pagination v-show="tableData.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formPage.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="formPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { neverRecommendApi, removerecommendApi, getrecommendListApi } from '@/api/anchor/index'
export default {
    data () {
        return {
            providerId: '',
            heights: '105px',
            tableData: [],
            authorImgList: [], // 表格图片集合
            loading: false,
            total: 0,
            formPage: {
                pageSize: 10,
                pageNum: 1
            },
            GradeInput: '',
            regionCode: '',
            optionsGrade: [
                { value: "A", label: "A", },
                { value: "B", label: "B", },
                { value: "C", label: "C", },
                { value: "D", label: "D", },
                { value: "E", label: "E", },
                { value: "T", label: "T", },
                { value: "F", label: "F", },
            ],
        }
    },
    created () {

    },
    methods: {
        onSeach () {
            this.formPage.pageNum = 1
            this.getDataList()
        },
        // 获取列表数据
        getDataList () {
            this.loading = true
            let obj = { ...this.formPage, parmas: {regionCode: this.regionCode, providerCode: this.providerId, type: '3', level: this.GradeInput } }
            getrecommendListApi(obj).then(res => {
                if (res.code == 200) {
                    this.authorImgList = []
                    this.tableData = res.data.list
                    res.data.list.forEach(item => {
                        this.authorImgList.push(item.face)
                    })
                    console.log('1');
                    this.total = res.data.total
                }
            }).catch(req => {
                console.log(req);
            }).finally(() => {
                this.loading = false
            })
        },
        // 操作
        removeBtn (val) {
            removerecommendApi({ type: '3', providerId: val.userId }).then(res => {
                if (res.code == 200) {
                    this.$message.success('success！')
                    this.getDataList()
                }
            })
        },
        recommed (val) {
            neverRecommendApi({ type: '3', providerId: val.userId }).then(res => {
                if (res.code == 200) {
                    this.$message.success('success！')
                    this.getDataList()
                }
            })
        },
        // 分页
        handleSizeChange (value) {
            this.formPage.pageNum = 1
            this.formPage.pageSize = value
            this.getDataList()
        },
        handleCurrentChange (value) {
            this.formPage.pageNum = value
            this.getDataList()
        },
        // 更多信息
        moreInfo (row) {
            let userId = row.userId
            let userType = 2
            console.log(window.location.origin + '/#/anchorlist/info');

            location.href = `${window.location.origin}/#/operate/jump/info?userId=${userId}&userType=${userType}`
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

