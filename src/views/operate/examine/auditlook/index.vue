<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24" class="card-box">
                <el-card>
                    <div slot="header"><span>基本信息</span></div>
                    <div class="el-table el-table--enable-row-hover el-table--medium ">
                        <table cellspacing="0" style="width: 100%" id="table-min">
                            <tbody>
                                <tr>
                                    <td style="width:80px;">
                                        <div id="title" class="cell">昵称:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.nickName }}
                                        </div>
                                    </td>
                                    <td style="width:80px">
                                        <div id="title" class="cell">主播长ID:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.userId }}
                                        </div>
                                    </td>
                                    <td style="width:80px">
                                        <div id="title" class="cell">主播短ID:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.userCode }}
                                        </div>
                                    </td>
                                    <td style="width:80px">
                                        <div id="title" class="cell">年龄:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.age }}
                                        </div>
                                    </td>
                                    <td style="width:80px">
                                        <div id="title" class="cell">代理号:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.agentCode }}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="title" class="cell">审核ID：</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.auditId }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">国家:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.country }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">语言:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.bestLanguage }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">英语水平:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.englishLevel }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">角色:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.userType == 1 ? "用户" : "主播" }}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="title" class="cell">状态:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ auditFormat(baseInfo.accountStatus) }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">注册时间:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ baseInfo.regTime }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">注册渠道:</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ getstatussd(baseInfo.bindPlatform) }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="24" class="card-box" v-for="(x, i) in dataInfo" :key="i">
                <el-card>
                    <div slot="header"><span>审核内容</span></div>
                    <div class="nickname">
                        <p class="nickname-p1">{{ getstatusType(x) }}</p>
                        <p class="nickname-p3" v-if="x.auditType == 2 && x.subType == 3">
                            <!-- <img :src="x.auditContent" alt=""> -->
                            <el-image style="width: 100px; height: 100px" :src="x.auditContent" :preview-src-list="[x.auditContent]">
                            </el-image>
                        </p>
                        <p class="nickname-p2" v-if="x.auditType == 1 || x.auditType == 4">{{ x.auditContent }}</p>
                        <p class="nickname-p2" v-if="x.auditType == 3 && x.subType == 1">{{ x.auditContent }}</p>
                        <p class="nickname-p4" v-if="x.auditType == 2 && x.subType == 2">
                            <video controls="true" autoplay :src="x.auditContent"></video>
                        </p>
                        <p class="nickname-p3" v-if="x.auditType == 2 && x.subType == 1">
                            <!-- <img :src="x.auditContent" alt=""> -->
                            <el-image style="width: 100px; height: 100px" :src="x.auditContent" :preview-src-list="[x.auditContent]">
                            </el-image>
                        </p>
                        <div class="nickname-p5" v-if="x.auditType == 5">
                            <!-- <img :src="x.auditContent" alt=""> -->
                            <div v-for="(q, w) in x.auditResource" :key="w">
                                <el-image style="width: 100px; height: 120px; display: block !important;" :src="q.url" :preview-src-list="x.auditResourcesrc">
                                </el-image>
                                <!-- <el-button class="el-button-delete" icon="el-icon-delete" @click="elImgClick(q.id, w)">不通过</el-button> -->

                                <!-- <i class="el-icon-delete" @click="elImgClick(q.id, w)"></i> -->
                                <el-radio-group :disabled="firstinstancesource" v-model="q.radiogroup">
                                    <el-radio :label="3">通过</el-radio>
                                    <el-radio :label="2">不通过</el-radio>
                                </el-radio-group>
                                <div style="width: 370px;" v-if="q.radiogroup == 2">
                                    <el-radio-group :disabled="firstinstancesource" v-model="q.nopassValue" v-for="(c, i) in faceDictType" :key="i">
                                        <el-radio :label="c.id">{{ c.dictLabel }}</el-radio>
                                    </el-radio-group>
                                    <el-input :disabled="firstinstancesource" style="margin-left: 0px; width: 80%;" type="textarea" :rows="3" placeholder="请输入内容" maxlength="200" v-model="q.auditRemark"></el-input>
                                </div>
                                <div v-else style="width: 370px;"></div>
                            </div>
                        </div>

                        <div class="nickname-right" v-show="x.auditType != 5">
                            <div class="nickname-right-top">
                                <p>审核结果（必选）</p>
                                <p class="nickname-right-top-p2">
                                    <el-radio-group :disabled="firstinstancesource" v-model="x.auditStatus">
                                        <el-radio :label="3">通过</el-radio>
                                        <el-radio :label="2">不通过</el-radio>
                                    </el-radio-group>
                                </p>
                            </div>
                            <div class="nickname-right-center" v-show="x.auditType == 4 && x.auditStatus == 2">
                                <el-radio-group :disabled="firstinstancesource" v-model="x.failReasons" v-for="(c, i) in nameDictType" :key="i">
                                    <el-radio :label="c.id">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center" v-show="x.auditType == 1 && x.auditStatus == 2">
                                <el-radio-group :disabled="firstinstancesource" v-model="x.failReasons" v-for="(c, i) in nameDictType" :key="i">
                                    <el-radio :label="c.id">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center" v-show="x.auditType == 2 && x.subType == 1 && x.auditStatus == 2">
                                <el-radio-group :disabled="firstinstancesource" v-model="x.failReasons" v-for="(c, i) in faceDictType" :key="i">
                                    <el-radio :label="c.id">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center" v-show="x.auditType == 2 && x.subType == 3 && x.auditStatus == 2">
                                <el-radio-group :disabled="firstinstancesource" v-model="x.failReasons" v-for="(c, i) in faceDictType" :key="i">
                                    <el-radio :label="c.id">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center" v-show="x.auditType == 3 && x.auditStatus == 2">
                                <el-radio-group :disabled="firstinstancesource" v-model="x.failReasons" v-for="(c, i) in callDictType" :key="i">
                                    <el-radio :label="c.id">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center" v-show="x.auditType == 4 && x.subType == 2 && x.auditStatus == 2">
                                <el-radio-group :disabled="firstinstancesource" v-model="x.failReasons" v-for="(c, i) in aboutDictType" :key="i">
                                    <el-radio :label="c.id">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center" v-show="x.auditType == 2 && x.subType == 2 && x.auditStatus == 2">
                                <el-radio-group :disabled="firstinstancesource" v-model="x.failReasons" v-for="(c, i) in videoDictType" :key="i">
                                    <el-radio :label="c.id">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-bottom">
                                <p>审核备注</p>
                                <el-input :disabled="firstinstancesource" type="textarea" :rows="3" placeholder="请输入内容" maxlength="200" v-model="x.auditRemark">
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="helloImg" v-if="x.auditType == 3">
                        <div v-for="(w, e) in x.auditResource" :key="e">
                            <el-image style="width: 100px; height: 120px" :src="w.url" :preview-src-list="[w.url]">
                            </el-image>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="24" class="card-box">
                <el-card>
                    <div slot="header"><span>历史审核信息</span></div>
                    <div class="el-table el-table--enable-row-hover el-table--medium">
                        <el-table v-loading="loading" :data="histories" class="table">
                            <el-table-column label="提交时间" align="center" prop="submitTime" />
                            <el-table-column label="审核时间" align="center" prop="auditTime" />
                            <el-table-column label="审核结果（必选）" align="center" prop="userCode" :formatter="auditProviderListType" />
                            <el-table-column label="审核人" align="center" prop="auditor" />
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 相册不通过 -->
        <el-dialog title="不通过原因" :visible.sync="pohotodialogVisible" width="50%">
            <div>
                <el-radio-group v-model="pohotodnopass" v-for="(c, i) in faceDictType" :key="i">
                    <el-radio :label="c.dictValue+'+' +c.dictType">{{ c.dictLabel }}</el-radio>
                </el-radio-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="pohotcancle">取 消</el-button>
                <el-button size="mini" type="primary" @click="pohotSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    delResource,
    selectRegisterApplyDetail,
    submitAudit,
    registerAudit,
    getRegisterAuditResultApi,
} from "@/api/operate/examine/audit/audit";
import { getQueryString } from "../../../../utils/index";

export default {
    name: "Server",
    data () {
        return {
            pohotodnopass: "",
            pohotodialogVisible: false,
            // 遮罩层
            loading: false,
            // 审核ID
            auditId: null,
            // 主播ID
            providerUserId: null,
            // cache信息
            cache: [],
            // 基本信息
            baseInfo: {},
            // 资料信息
            dataInfo: [],
            // 历史审核资料
            histories: [],
            poster: "",
            auditFormData: [{
                //    审核备注
                auditRemark: "",
                // 审核结果
                auditStatus: 1,
                // 资料类型
                auditInfoType: "",
                //被审核用户的id
                auditInfoUserId: "",
                //被审核用户的类型
                auditInfoUserType: getQueryString('type'),
                // 这条审核记录的Id
                auditInfoId: "",
                failReasons: []
            }],
            firstinstancesource: true, //注册跳过来的不能编辑此页面
            nameDictType: [],
            faceDictType: [],
            callDictType: [],
            aboutDictType: [],
            videoDictType: [],
            typeData: { dictTypes: ["nickname_info_audit_fail_reason", "face_info_audit_fail_reason", "video_info_audit_fail_reason", "call_info_audit_fail_reason", "self_introduction_info_audit_fail_reason"] }
        };
    },
    created () {
        this.$store.dispatch("queryDictListByType", this.typeData).then(res => {
            console.log(res)
            this.nameDictType = res.data.nickname_info_audit_fail_reason,
                this.faceDictType = res.data.face_info_audit_fail_reason,
                this.callDictType = res.data.call_info_audit_fail_reason,
                this.aboutDictType = res.data.self_introduction_info_audit_fail_reason,
                this.videoDictType = res.data.video_info_audit_fail_reason
        });

    },
    mounted () {
        let id = this.$route.query.auditId ? this.$route.query.auditId : ""
        getRegisterAuditResultApi({ id: id }).then(res => {
            if (res.code == 200) {
                this.baseInfo = res.data.baseInfo
                // debugger
                let arr = []
                res.data.auditInfo.forEach((item, index) => {
                    item.auditResourcesrc = []
                    item.failReasons = item.auditOptionId
                    if (item.auditType == 5) {
                        arr = item
                    }
                    if (item.auditResource && item.auditResource.length) {
                        item.auditResource.forEach(it => {
                            item.auditResourcesrc.push(it.url)
                        })
                    }
                })
                arr.auditResource.forEach(item => {
                    item.radiogroup = item.auditStatus
                    item.nopassValue = item.auditOptionId

                })
                this.dataInfo[this.dataInfo.length - 1] = arr
                this.dataInfo = res.data.auditInfo
                this.histories = res.data.auditHistory
            } else {
                this.$message.error(res.msg)
            }
        })
        // let a = { "baseInfo": { "nickName": "fgh", "userId": "650d4946e4b06ebd08d0197f", "userCode": "99901858", "age": 18, "agentCode": "123456", "auditId": "650d4951e4b06ebd08d019c6", "country": "Brazil", "englishLevel": "Little", "bestLanguage": "en", "userType": 2, "accountStatus": 1, "regTime": "2023-09-22 13:29:03", "bindPlatform": 4 }, "auditInfo": [{ "auditType": 1, "subType": 1, "auditContent": null, "auditStatus": 3, "auditRemark": 'pppp', "auditOptionId": null, "auditResource": null }, { "auditType": 2, "subType": 1, "auditContent": null, "auditStatus": 2, "auditRemark": null, "auditOptionId": "63f88391dd02ec10abca76c3", "auditResource": null }, { "auditType": 5, "subType": 1, "auditContent": null, "auditStatus": null, "auditRemark": null, "auditOptionId": null, "auditResource": [{ "id": "650d4a25e4b06ebd08d01da4", "productId": "2001", "appId": "200101", "userId": "650d4946e4b06ebd08d0197f", "type": 1, "videoCoverPicture": null, "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d4a23e4b0c4606e81b7d6.jpeg", "width": null, "height": null, "duration": null, "size": null, "ext": null, "auditStatus": 3, "delStatus": null, "aiAuditStatus": null, "auditOptionId": null, "auditRemark": "" }, { "id": "650d4a25e4b06ebd08d01da4", "productId": "2001", "appId": "200101", "userId": "650d4946e4b06ebd08d0197f", "type": 1, "videoCoverPicture": null, "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d4a23e4b0c4606e81b7d6.jpeg", "width": null, "height": null, "duration": null, "size": null, "ext": null, "auditStatus": 2, "delStatus": null, "aiAuditStatus": null, "auditOptionId": "63f88391dd02ec10abca76c1", "auditRemark": "" }, { "id": "650d4a25e4b06ebd08d01da4", "productId": "2001", "appId": "200101", "userId": "650d4946e4b06ebd08d0197f", "type": 1, "videoCoverPicture": null, "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d4a23e4b0c4606e81b7d6.jpeg", "width": null, "height": null, "duration": null, "size": null, "ext": null, "auditStatus": 3, "delStatus": null, "aiAuditStatus": null, "auditOptionId": null, "auditRemark": "1111" }, { "id": "650d4a25e4b06ebd08d01da4", "productId": "2001", "appId": "200101", "userId": "650d4946e4b06ebd08d0197f", "type": 1, "videoCoverPicture": null, "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d4a23e4b0c4606e81b7d6.jpeg", "width": null, "height": null, "duration": null, "size": null, "ext": null, "auditStatus": 3, "delStatus": null, "aiAuditStatus": null, "auditOptionId": null, "auditRemark": "" }, { "id": "650d4a25e4b06ebd08d01da4", "productId": "2001", "appId": "200101", "userId": "650d4946e4b06ebd08d0197f", "type": 1, "videoCoverPicture": null, "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d4a23e4b0c4606e81b7d6.jpeg", "width": null, "height": null, "duration": null, "size": null, "ext": null, "auditStatus": 3, "delStatus": null, "aiAuditStatus": null, "auditOptionId": null, "auditRemark": "222" }, { "id": "650d4a25e4b06ebd08d01da4", "productId": "2001", "appId": "200101", "userId": "650d4946e4b06ebd08d0197f", "type": 1, "videoCoverPicture": null, "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d4a23e4b0c4606e81b7d6.jpeg", "width": null, "height": null, "duration": null, "size": null, "ext": null, "auditStatus": 3, "delStatus": null, "aiAuditStatus": null, "auditOptionId": null, "auditRemark": "" }, { "id": "650d4a25e4b06ebd08d01da4", "productId": "2001", "appId": "200101", "userId": "650d4946e4b06ebd08d0197f", "type": 1, "videoCoverPicture": null, "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d4a23e4b0c4606e81b7d6.jpeg", "width": null, "height": null, "duration": null, "size": null, "ext": null, "auditStatus": 3, "delStatus": null, "aiAuditStatus": null, "auditOptionId": null, "auditRemark": "" }, { "id": "650d4a25e4b06ebd08d01da4", "productId": "2001", "appId": "200101", "userId": "650d4946e4b06ebd08d0197f", "type": 1, "videoCoverPicture": null, "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d4a23e4b0c4606e81b7d6.jpeg", "width": null, "height": null, "duration": null, "size": null, "ext": null, "auditStatus": 2, "delStatus": null, "aiAuditStatus": null, "auditOptionId": "63f88391dd02ec10abca76c1", "auditRemark": "" }] }, { "auditType": 2, "subType": 2, "auditContent": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d49a1e4b0c4606e81b7cc.mp4", "auditStatus": 3, "auditRemark": null, "auditOptionId": null, "auditResource": null }, { "auditType": 3, "subType": 1, "auditContent": "会很尴尬韩剧嘟嘟你到家觉得记得记得", "auditStatus": 3, "auditRemark": null, "auditOptionId": null, "auditResource": [{ "id": "650d4a42e4b06ebd08d01e26", "productId": "2001", "appId": "200101", "userId": "650d4946e4b06ebd08d0197f", "type": 5, "videoCoverPicture": null, "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d4a36e4b0c4606e81b7d7.jpeg", "width": null, "height": null, "duration": null, "size": null, "ext": null, "auditStatus": null, "delStatus": null, "aiAuditStatus": null, "auditOptionId": null, "auditRemark": '111' }] }, { "auditType": 3, "subType": 1, "auditContent": "会很尴尬韩剧嘟嘟你到家觉得记得记得", "auditStatus": 3, "auditRemark": '111111', "auditOptionId": null, "auditResource": [{ "id": "650d4a42e4b06ebd08d01e26", "productId": "2001", "appId": "200101", "userId": "650d4946e4b06ebd08d0197f", "type": 5, "videoCoverPicture": null, "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/09/650d4a36e4b0c4606e81b7d7.jpeg", "width": null, "height": null, "duration": null, "size": null, "ext": null, "auditStatus": null, "delStatus": null, "aiAuditStatus": null, "auditOptionId": null, "auditRemark": 1111 }] }] }
        // console.log(a);
        // this.baseInfo = a.baseInfo
        // // debugger
        // let arr = []
        // a.auditInfo.forEach((item, index) => {
        //     item.failReasons = item.auditOptionId
        //     if (item.auditType == 5) {
        //         arr = item
        //     }
        // })
        // // let arr = a.auditInfo[a.auditInfo.length - 1]
        // // let arr1 = arr.splice(arr.length-1,1)

        // arr.auditResource.forEach(item => {
        //     item.radiogroup = item.auditStatus
        //     item.nopassValue = item.auditOptionId

        // })

        // this.dataInfo[this.dataInfo.length - 1] = arr
        // this.dataInfo = a.auditInfo
        // 获取地址上的参数
        // console.log(this.$store.state)
    },
    methods: {
        auditFormat (row) {
            switch (row) {
                case 1:
                    return "正常";
                case 2:
                    return "禁用";
                case 3:
                    return "注销";
                case 4:
                    return "冻结";
                default:
                    return "--";
            }
        },
        auditProviderListType (row) {
            switch (row.auditStatus) {
                case 1:
                    return "审核中 ";
                case 2:
                    return "审核失败";
                case 3:
                    return "审核成功";
                default:
                    return "--";
            }
        },
        /** 查询审核用户信息 */
        selectRegisterApplyDetail () {
            this.loading = true;
            let data = {
                auditId: getQueryString('auditId'),
                userId: getQueryString('userId')
            };
            selectRegisterApplyDetail(data).then((response) => {
                this.baseInfo = response.data.baseInfo;
                this.loading = false;
                let arr = response.data.auditInfo
                // this.histories = response.data.auditHistory
                // arr.forEach(x => {
                //     // this.$set(x, "failReasons", [])
                //     // this.$set(x, "auditStatus", 1)
                //     // this.$set(x, "auditRemark", null)
                //     //   this.$set(x, "nopassValue", [])
                // })
                arr.forEach(item => {
                    item.auditResourcesrc = []
                    if (item.auditResource && item.auditResource.length) {
                        item.auditResource.forEach(it => {
                            item.auditResourcesrc.push(it.url)
                        })
                    }
                    console.log();
                    if (item.auditResource instanceof Array) {
                        item.auditResource.forEach(it => {
                            it.radiogroup = ''
                            it.auditRemark = ''
                        })
                    }
                })
                this.dataInfo = arr
                console.log(arr);
                // this.$set(arr,"failReasons",[])
                console.log(this.dataInfo, response.data.auditInfo, arr)
            });
        },
        /** 提交审核结果 */

        getstatus (val) {
            switch (val) {
                case 100:
                    return "A";
                case 80:
                    return "B";
                case 60:
                    return "C";
                case 40:
                    return "D";
                case 20:
                    return "E";
                default:
                    return "--";
            }
        },
        getstatussd (val) {
            switch (val) {
                case 1:
                    return "google ";
                case 2:
                    return "facebook ";
                case 3:
                    return "apple ";
                case 4:
                    return "账号密码";
                default:
                    return "--";
            }
        },
        getstatusType (val) {
            if (val.auditType == 1) {
                return "昵称"
            } else if (val.auditType == 2 && val.subType == 2) {
                return "视频"
            } else if (val.auditType == 2 && val.subType == 1) {
                return "头像"
            } else if (val.auditType == 3 && val.subType == 1) {
                return "招呼语"
            } else if (val.auditType == 3 && val.subType == 2) {
                return "招呼语图片"
            } else if (val.auditType == 4) {
                return "关于我"
            } else if (val.auditType == 5) {
                return "相册"
            } else if (val.auditType == 2 && val.subType == 3) {
                return "自拍"
            }
        },


        pohotcancle () {
            this.pohotodialogVisible = false
        },
        pohotSubmit () {
            console.log(this.pohotodnopass);
            if (!this.pohotodnopass) return this.$message.warning('请选择不通过原因！')
            pohotSubmitApi({ pohotodnopass: this.pohotodnopass }).then(res => {
                if (res.code == 200) {
                    // this.selectRegisterApplyDetail();
                    this.$message.success('操纵成功！')
                }
            }).catch(req => {
                this.$message.error(req.msg)
            })
        },
    },
};
</script>

<style scoped>
.delBtn {
    position: relative;
    top: -80px;
    right: 40px;
    padding: 0;
}

.nickname {
    display: flex;
    justify-content: flex-start;
}

.nickname-right {
    width: 600px;
    height: auto;
    margin-left: 15%;
}

.nickname-right-top {
    display: flex;
}

.nickname-right-center {
    margin-left: 50px;
    display: flex;
    flex-wrap: wrap;
}

::v-deep.el-checkbox-group {
    margin-right: 15px;
}

.el-radio-group {
    margin: 5px;
}

.nickname-right-bottom {
    display: flex;
}

.el-textarea {
    width: 50%;
    margin-left: 80px;
    margin-top: 10px;
}

.nickname-right-top-p2 {
    margin-left: 20px;
}

.nickname-p1 {
    line-height: 100px;
    width: 200px;
}

.nickname-p2 {
    margin-left: 20%;
    width: 200px;
    line-height: 100px;
}

.nickname-p3 {
    width: 60px;
    height: 60px;
    margin-top: 35px;
    margin-left: 20%;
    width: 200px;
}

.nickname-p3 > img {
    width: 60px;
    height: 60px;
}

.nickname-p4 {
    width: 150px;
    height: 200px;
    padding: 0 !important;
    margin-left: 20%;
    width: 200px;
}

.nickname-p5 {
    height: auto;
    padding: 0 !important;
    display: flex;
    flex-wrap: wrap;
}

.nickname-p5 > p {
    margin: 5px;
    position: relative;
    height: 160px;
}

.nickname-p5 > .el-image {
    width: 60px;
    height: 60px;
    border-radius: 5px;
}

::v-deep .el-icon-delete {
    color: red;
}

::v-deep .el-button-delete {
    position: absolute;
    top: 125px;
    left: 0px;
}

.nickname-p4 > video {
    width: 150px;
    height: 200px;
}

.el-button-sub {
    width: 300px;
    height: 90px;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
    font-size: 18px;
}

.helloImg {
    width: 60%;
    height: auto;
    margin-left: 300px;
    margin-top: 10px;
    display: flex;
}

.helloImg > div {
    width: 100px;
    height: 150px;
    margin: 0 15px;
    position: relative;
}

.helloImg > div > .el-image {
    width: 100px;
    height: 150px;
}

.helloImg > div > i {
    position: absolute;
    right: 5px;
    top: 5px;
}

#title {
    width: 80px;
    margin: 0 !important;
}

.el-table .cell {
    padding: 0;
}

/* ::v-deep table tbody tr td{
  width: 100px !important;
} */
</style>
