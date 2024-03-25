
<style scoped lang="scss">
.vompulsoryvideo {
    .title {
        font-size: 17px;
        font-weight: 700;
    }
    .content {
        display: flex;
        width: 900px;
        justify-content: space-around;
        .matchVideo {
            width: 200px;
            height: 100px;
        }
        .itemReft,
        .itemLeft {
            width: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .itemMatch {
                margin: 10px 0px;
            }
            .matchVideo {
                margin-bottom: 10px;
            }
            .videom {
                border: 1px solid #ccc;
            }
        }
    }
    .contenttitle {
        margin-top: 10px;
        font-size: 17px;
        font-weight: 700;
    }
    .footer {
        margin: 10px 0px;
    }
    .table {
        width: 900px;
        .top {
            display: flex;
            align-content: center;
            .titleItem {
                width: 300px;
                border: 1px solid #ccc;
                text-align: center;
                height: 30px;
                line-height: 30px;
            }
        }
        .tablecontent {
            overflow: auto;
            height: 500px;
            width: 920px;
            .tableItem {
                display: flex;
                .previewVideo {
                    width: 100px;
                    height: 100px;
                }
                .titleItem {
                    width: 300px;
                    border: 1px solid #ccc;
                    height: 120px;
                    line-height: 120px;
                    text-align: center;
                    .previewVideo {
                        margin: 10px 0px;
                    }
                }
                .deltext {
                    width: 300px;
                    border: 1px solid #ccc;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
}
</style>
<template>
    <div class="vompulsoryvideo">
        <el-card class="box-card" :style="{height:`calc(100vh - ${heights})`}">
            <div class="title">Compulsory video</div>
            <div class="content">
                <div class="itemLeft" v-loading="matchloading">
                    <div class="itemMatch">Match</div>
                    <video :src="matchvideoUrl" v-if="matchvideoUrl" controls class="matchVideo"></video>
                    <div v-else class="matchVideo videom"></div>
                    <el-upload accept="video/mp4" :action="uploadFileUrl" list-type="text" :on-progress="matchuploadVideoProcess" :on-success="matchvideoSuccessPr" :show-file-list="false">
                        <el-button size="mini" type="primary">Upload</el-button>
                    </el-upload>
                </div>
                <div class="itemReft" v-loading="liveloading">
                    <div class="itemMatch">Live</div>
                    <video :src="livevideoUrl" v-if="livevideoUrl" controls class="matchVideo"></video>
                    <div v-else class="matchVideo videom"></div>
                    <el-upload accept="video/mp4" :action="uploadFileUrl" list-type="text" :on-progress="liveuploadVideoProcess" :on-success="livevideoSuccessPr" :show-file-list="false">
                        <el-button size="mini" type="primary">Upload</el-button>
                    </el-upload>
                </div>
            </div>
            <div class="contenttitle">Latest video</div>
            <div>
                <div class="footer">
                    <el-upload accept="video/mp4" :action="uploadFileUrl" list-type="text" :on-progress="newuploadVideoProcess" :on-success="newvideoSuccessPr" :show-file-list="false">
                        <el-button :disabled="isDisabled" size="mini" type="primary">Upload New</el-button>
                    </el-upload>
                </div>
                <div class="table" v-loading="Latestloading">
                    <div class="top">
                        <div class="titleItem">Upload time</div>
                        <div class="titleItem">preview</div>
                        <div class="titleItem">Manage</div>
                    </div>
                    <div class="tablecontent" v-if="videoList.length > 0">
                        <div v-for="item in videoList" :key="item.id" class="tableItem">
                            <div class="uploadTime titleItem">{{ item.createTime }}</div>
                            <div class="preview titleItem">
                                <video class="previewVideo " controls :src="item.url"></video>
                            </div>
                            <div class="deltext">
                                <template>
                                    <el-popconfirm @confirm="confrimdelvideo(item.id)" title="确定要删除这个视频吗？">
                                        <el-link type="danger" :underline="false" slot="reference">Delete</el-link>
                                    </el-popconfirm>
                                </template>
                            </div>
                        </div>
                    </div>
                    <el-empty v-else description="空"></el-empty>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getLearnListApi, delLearnVideoListApi, addLearnVideoListApi } from '@/api/compulsoryvideo/index'
import { upbaseUrl } from "@/config/index";
export default {
    data () {
        return {
            uploadFileUrl: upbaseUrl + "/third/resource/uploadAndGetFileInformation", // 上传的图片服务器地址
            heights: '84px',
            matchvideoUrl: "",
            matchvideoId: '',
            livevideoUrl: "",
            livevideoId: '',
            matchloading: false,
            liveloading: false,
            Latestloading: false,
            videoListloading: false,
            videoList: [],
            isDisabled: false
        }
    },
    created () {
        this.getVideoList()
    },
    methods: {
        // 获取视频
        getVideoList () {
            this.videoListloading = true
            try {
                getLearnListApi().then(res => {
                    if (res.code == 200) {
                        this.videoList = res.data.latests
                        this.matchvideoUrl = res.data.match ? res.data.match.url : ''
                        this.matchvideoId = res.data.match ? res.data.match.id : ''
                        this.livevideoUrl = res.data.live ? res.data.live.url : ''
                        this.livevideoId = res.data.live ? res.data.live.id : ''
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } catch (err) {
                this.$message.error(err.msg)
            } finally {
                this.videoListloading = false
            }
        },
        //文件上传的回调 match
        async matchuploadVideoProcess (event, file, fileList) {
            console.log(file); //注意在data中添加对应的变量名
            this.matchloading = true;
            console.log(this.matchvideoId);
            if (this.matchvideoId) {
                await this.confrimdelvideo(this.matchvideoId, '1', 'delete',)
            }
        },
        matchvideoSuccessPr (res, file, fileList) {
            console.log(res);
            try {
                addLearnVideoListApi({ url: res.data.url, type: "1" }).then(response => {
                    if (response.code == 200) {
                        this.matchvideoUrl = res.data.url
                        this.getVideoList()
                    } else {
                        this.$message.error(response.msg)
                    }
                })
            } catch (err) {
                this.$message.error(err.msg)
            } finally {
                this.matchloading = false;
            }
        },
        //文件上传的回调 live
        async liveuploadVideoProcess (event, file, fileList) {
            console.log(file); //注意在data中添加对应的变量名
            this.liveloading = true;
            if (this.livevideoId) {
                await this.confrimdelvideo(this.livevideoId, '1', 'delete',)
            }
        },
        livevideoSuccessPr (res, file, fileList) {
            console.log(res);
            try {
                addLearnVideoListApi({ url: res.data.url, type: "2" }).then(response => {
                    if (response.code == 200) {
                        this.livevideoUrl = res.data.url
                        this.getVideoList()
                    } else {
                        this.$message.error(response.msg)
                    }
                })
            } catch (err) {
                this.$message.error(err.msg)
            } finally {
                this.liveloading = false;
            }
        },
        //文件上传的回调
        newuploadVideoProcess (event, file, fileList) {
            console.log(file); //注意在data中添加对应的变量名
            this.Latestloading = true
            this.isDisabled = true
        },
        newvideoSuccessPr (res, file, fileList) {
            console.log(res);
            try {
                addLearnVideoListApi({ url: res.data.url, type: "3" }).then(response => {
                    if (response.code == 200) {
                        this.getVideoList()
                    } else {
                        this.$message.error(response.msg)
                    }
                })
            } catch (err) {
                this.$message.error(err.msg)
            } finally {
                this.Latestloading = false;
                this.isDisabled = false
            }
        },
        // 删除视频
        confrimdelvideo (id, type, upoload) {
            try {
                let obj = { type, id: id }
                delLearnVideoListApi(obj).then(res => {
                    if (res.code == 200) {
                        if (!upoload) {
                            this.$message.success('删除成功！')
                            this.getVideoList()
                        }
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } catch (err) {
                this.$message.error(err.msg)
            }
        }
    }
}
</script>