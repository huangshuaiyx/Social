import { selectProviderConversaList, selectImMessageRecordByPartitionKey, selectPenaltyRecordList, getProviderRateSummary, googleTranslateByList, penalty, selectMoreDictDataByDictType, getRewardPermission } from "../../../../api/operate/Hostconfiguration/index"
import { getMonthWeek, formatDate } from "../../../../utils/index"
import { updateUserStatus } from "@/api/operate/anchorReview/reviewList/index";

export default {
    data() {
        return {
            // 详情loding
            tablesdLoading: false,
            index: -1,
            historyList: [],
            formData: [],
            // 减扣弹框
            deductionShow: false,
            // 双倍减扣
            doubleDiscountShow: false,
            // 处罚
            punishShow: false,
            punishInputa: "",
            punishInputb: null,
            punishInputc: null,
            openMatching: false,
            banReasonShow: false,
            leftLoading: false,
            // 冻结数据
            frozenData: [],
            frozenTimeData: [],
            // 封禁原因
            banData: [],
            // 罚款原因
            options: [],
            // chufa
            punishoptions: [],
            // 停止领取
            stopOptions: [],
            banTime: null,
            // 冻结选择
            banReasonTime: '',
            banReason: "",
            // 封禁选择
            goliveStatus: "",
            //  用户列表
            usertionData: {
                pageNum: 1,
                pageSize: 12,
                fromUserId: ""
            },
            // usertion
            usertioncount: 0,
            // 会话数据
            conversationData: {
                partitionKey: "",
                pageNum: 1,
                pageSize: 10,
                senders: []
            },
            // 用户列表
            conversationList: [],
            hostId: "",
            userId: "",
            parTime: "",
            // 是否在加载中
            loading: false,
            // 请求到多少条数据
            count: 50,
            // 是否有更多数据
            noMore: false,
            // 处罚记录
            punishQuery: {
                pageNum: 1,
                pageSize: 10,
                providerId: ""
            },
            // 处罚记录数据
            punishQueryList: [],
            noMorePunish: false,
            loadingPunish: false,
            // 处罚多少数据
            countPunish: 0,
            // 主播的率
            hostRateData: {},
            // 用户选中
            userChecked: [],
            // 100数据
            dialogueList: [],
            // 当前的时间
            getMonthWeekDate: {},
            // 28天
            daysTwoEven: {},
            textTranslate: false,
            permission: {},
            pageNumd: 0,
            deductionNum: 0,
            doubleDiscountNum: 0,
            penaltyCopy: "", // 处罚文案
            penetrateData: {},
            fromUserId: "",
            weekArr: [],
            translate: [], //翻译
            videoLogo: null,
            UsersIfonpartitionKey:""
        };
    },
    created() {
        let str = window.location.href;
        let urls = str.split("?");
        let params = urls[1].split("&");
        this.usertionData.fromUserId = params[0].split("=")[1];
        this.punishQuery.providerId = params[0].split("=")[1];
        this.hostId = params[0].split("=")[1];
        this.fromUserId = params[3].split("=")[1];
        this.userId = params[1].split("=")[1];
        this.parTime = params[2].split("=")[1];
        this.conversation(this.usertionData)
        this.punishRecord()
        this.hostRate(this.hostId)
        this.selectMoreDic()

    },
    mounted() {
        let preDate = new Date();
        for (let i = 0; i < 28; i++) {
            let dayStamp = 24 * 60 * 60 * 1000 * i;
            preDate = new Date(preDate.getTime() - dayStamp);
            let daysTwoEven = getMonthWeek(preDate.getFullYear(), preDate.getMonth() + 1, preDate.getDate())
            this.weekArr.push(daysTwoEven)
            console.log(this.weekArr)
        }
        // this.divScroll()
        let conversationData = { ...this.conversationData }
        this.userChecked = [{ fromUserId: this.fromUserId, toUserId: this.userId, partitionKey: this.parTime }]
        conversationData.senders = this.userChecked
        // conversationData.partitionKey = Array.from(new Set(this.weekArr))[this.pageNumd]
        conversationData.partitionKey = formatDate(new Date().getTime());
        this.userList(conversationData)
        this.getRewardPermission()

    },
    methods: {
        // 用户列表
        conversation(val) {
            selectProviderConversaList(val).then((result) => {
                if (result.code == 200) {
                    this.conversationList = result.data.list
                    this.usertioncount = result.data.total
                    this.leftLoading = false;
                }
            })
        },
        // 聊天详情
        userList(val) {
            this.noMore = false;
            let conversationData = { ...val }
            console.log(conversationData, conversationData.pageNum, val,formatDate(new Date().setMonth((new Date().getMonth()-1))),formatDate(new Date().setDate((new Date().getDate()-7))))
            if (conversationData.partitionKey == formatDate(new Date().setMonth((new Date().getMonth()-1)))) {
                this.loading = false;
                this.noMore = true;
            } else {
                selectImMessageRecordByPartitionKey(val).then(resvalue => {
                    if (resvalue.code == 200) {
                        this.formData = this.formData.concat(resvalue.data[0].contents)
                        if (resvalue.data[0].contents.length > 0 && resvalue.data[0].contents.length <= 9) {
                            
                            this.init(this.formData)
                            this.dialogueList = this.dialogueList.concat(resvalue.data[0].contents)
                            this.noMore = false;
                            this.loading = false;
                            console.log(resvalue.data[0].contents.length, resvalue.data[0].contents.length > 0, resvalue.data[0].contents.length <= 9)
                            conversationData.pageNum++
                            conversationData.partitionKey = val.partitionKey - 1;
                            this.userList(conversationData)
                            // if (resvalue.data[0].contents.length <= 9) {
                            //     conversationData.pageNum++
                            //     if (conversationData.pageNum > 3) {
                            //         this.loading = false;
                            //         this.noMore = true;
                            //     } else {
                            //         conversationData.pageNum = 1
                            //         // this.userChecked = [{ fromUserId: this.fromUserId, toUserId: this.userId, partitionKey: this.parTime }]
                            //         val.senders = this.userChecked
                            //         // val.partitionKey = Array.from(new Set(this.weekArr))[this.pageNumd]
                            //         // conversationData.partitionKey = new Date()[this.pageNumd]
                            //         conversationData.partitionKey = formatDate(new Date().getTime());
                            //         this.userList(conversationData)
                            //         console.log(val)
                            //     }
                            // }

                        } else if (resvalue.data[0].contents.length == 0) {
                            // conversationData.pageNum++
                            // if (conversationData.pageNum > 3) {
                            //     this.loading = false;
                            //     this.noMore = true;
                            // } else {
                            //     conversationData.pageNum = 1
                            //     // this.userChecked = [{ fromUserId: this.fromUserId, toUserId: this.userId, partitionKey: this.parTime }]
                            //     conversationData.senders = this.userChecked
                            //     // conversationData.partitionKey = Array.from(new Set(this.weekArr))[this.pageNumd]
                            //     conversationData.partitionKey = formatDate(new Date().getTime());
                            //     this.userList(conversationData)

                            // }
                            conversationData.pageNum = 1
                            conversationData.partitionKey = conversationData.partitionKey - 1;
                            this.userList(conversationData)
                            this.loading = false;
                            this.noMore = true;
                            console.log("数据为空")
                        } else {
                            this.loading = false;
                            this.noMore = true;
                        }
                    } else if (resvalue.code == 501) {
                        this.loading = false;
                        this.noMore = true;
                    }
                })
            }

        },
        // 刷新
        refresh() {
            this.index = -1
            // this.usertionData.fromUserId = this.fromUserId
            this.$refs.punishref.scrollTop = 0
            console.log(this.$refs.punishref.scrollTop)
            this.conversation(this.usertionData)
            this.punishQuery.pageNum = 1
            this.punishRecord()
            this.hostRate(this.hostId)
            this.selectMoreDic()
            this.tablesdLoading = true;
            this.leftLoading = true
            setTimeout(() => {
                this.tablesdLoading = false;
            }, 1000);
            this.pageNumd = 0
            this.getRewardPermission()
            this.formData = []
            let conversationData = { ...this.conversationData }
            conversationData.pageNum = 1
            this.userChecked = [{ fromUserId: this.fromUserId, toUserId: this.userId, partitionKey: this.parTime }]
            conversationData.senders = this.userChecked
            // conversationData.partitionKey = Array.from(new Set(this.weekArr))[this.pageNumd]
            conversationData.partitionKey = formatDate(new Date().getTime()); // 输出 '20220304'
            console.log(conversationData)
            this.userList(conversationData)
        },
        translateClick() {
            console.log(this.formData)
            this.init(this.formData)
        },
        // 翻译
        init(parameter) {
            let val = [...parameter]
            if (val.length > 0) {
                let arrText = []
                let translateData = []
                this.translate = []
                for (let z = 0; z < val.length; z++) {
                    this.$set(val[z], "textd", null)
                    // if (val[z].messageType != 'PICTURE') {
                    //     // arrText.push(this.messageProcessing(arr[z]))
                    //     arrText.push(this.messageProcessing(val[z]))
                    // }
                    arrText.push(this.messageProcessing(val[z]))
                }
                this.$nextTick(() => {
                    googleTranslateByList({
                        targetLanguage: "zh-cn",
                        text: arrText
                    }
                    ).then(res => {
                        if (res.code == 200) {
                            for (let z = 0; z < val.length; z++) {
                                let asd = res.data
                                if (val[z].messageType != 'PICTURE') {
                                    console.log(val)
                                    val[z].textd = asd[z].text
                                } else {
                                    console.log(val[z])
                                }

                            }
                        }
                    })
                });

            }

            this.$forceUpdate(); // 重绘
        },
        // 主播的率
        hostRate(val) {
            getProviderRateSummary({ providerId: val }).then(res => {
                if (res.code == 200) {
                    this.hostRateData = res.data
                }
            })
        },

        //  选中的用户
        userClick(x, i) {
            console.log(x)
            this.index = i
            this.tablesdLoading = true;
            setTimeout(() => {
                this.tablesdLoading = false;
            }, 1000);
            this.pageNumd = 0
            let conversationData = { ...this.conversationData }
            conversationData.pageNum = 1
            this.userChecked = [{ fromUserId: x.fromUserId, toUserId: x.toUserId }]
            conversationData.senders = this.userChecked
            // this.conversationData.partitionKey = Array.from(new Set(this.weekArr))[this.pageNumd]
            conversationData.partitionKey = x.partitionKey;
            this.userList(conversationData)
            this.formData = []
            this.dialogueList = []
            this.divScroll(x)
            this.UsersIfonpartitionKey = x.partitionKey
        },
        // 减扣
        deduction(val) {
            this.deductionShow = true
            this.deductionNum = this.carryGold(val)
            console.log(val)
            this.penetrateData = val
        },
        // 双倍减扣
        doubleDiscount(val) {
            this.doubleDiscountShow = true
            this.doubleDiscountNum = this.carryGold(val)
            this.penetrateData = val
        },

        // 处罚
        punishClick(val) {
            this.punishShow = true
            console.log(val)
            this.penetrateData = val
            this.punishInputa = "",
                this.punishInputb = null;
            this.punishInputc = null;
            console.log(this.punishInputa, this.punishInputb, this.punishInputc)
        },
        // 减扣
        deductionOk(val) {
            penalty({ penaltyWay: val, providerId: this.hostId, penaltyBalance: this.deductionNum, penaltyContent: this.messageProcessing(this.penetrateData) }).then(res => {
                if (res.code == 200) {
                    this.deductionShow = false
                    this.$message({
                        type: "success",
                        message: "减扣成功",
                    });
                    this.punishQuery.pageNum = 1
                    this.punishRecord()
                }
            })
        },
        // 双倍减扣
        deductionsOK(val) {
            penalty({ penaltyWay: val, providerId: this.hostId, penaltyBalance: this.doubleDiscountNum * 2, penaltyContent: this.messageProcessing(this.penetrateData) }).then(res => {
                if (res.code == 200) {
                    this.doubleDiscountShow = false
                    this.$message({
                        type: "success",
                        message: "双倍减扣成功",
                    });
                    this.punishQuery.pageNum = 1
                    this.punishRecord()
                }
            })
        },
        // 处罚
        punishOK(val) {
            console.log(val, this.messageProcessing(this.penetrateData))
            if (this.punishInputa != "" || this.punishInputb != null) {
                if (this.punishInputc != null) {
                    penalty({ penaltyWay: val, penaltyContent: this.messageProcessing(this.penetrateData), penaltyBalance: this.punishInputa, penaltyReason: this.punishInputc, providerId: this.hostId, penaltyReceiveAwardTime: this.punishInputb }).then(res => {
                        if (res.code == 200) {
                            this.punishShow = false
                            this.$message({
                                type: "success",
                                message: "处罚成功",
                            });
                            this.punishQuery.pageNum = 1
                            this.punishRecord()
                            this.getRewardPermission()
                        }
                    })
                } else {
                    this.$message.error('请输入处罚原因');
                }
            } else {
                this.$message.error('请选择罚款或领取金币资格');
            }



        },
        // 封禁确定
        submitMatching() {
            this.openMatching = false;
            if (this.goliveStatus == -1) {
                this.$message.error('Restricted reason is required');
            } else {
                updateUserStatus({
                    "userType": 2,
                    "userId": this.hostId,
                    "userStatus": 2,
                    "goliveStatus": "1",
                    "banReason": this.goliveStatus,
                }).then(res => {
                    if (res.code == 200) {
                        this.banReasonShow = false
                        this.$message({
                            message: 'Remove',
                            type: 'success'
                        });
                    }
                })
            }
        },
        // 冻结确定
        reasonMatching() {
            if (this.banReasonTime == null) {
                this.$message.error('Restricted reason, restricted period is required');
            } else if (this.banReason == null) {
                this.$message.error('Restricted reason, restricted period is required');
            } else {
                updateUserStatus({
                    "userType": 2,
                    "userId": this.hostId,
                    "userStatus": 4,
                    "goliveStatus": "1",
                    "banReason": this.banReason,
                    "banTimeVal": this.banTime,
                    "banPeriod": this.banReasonTime
                }).then(res => {
                    if (res.code == 200) {
                        this.banReasonShow = false
                        this.$message({
                            message: 'Restrict',
                            type: 'success'
                        });
                    }
                })
            }
        },
        /**冻结时间 */
        banRadio(x) {
            this.banTime = x.dictValue
        },
        // 词典文案
        selectMoreDic() {
            selectMoreDictDataByDictType({
                dictTypes: ["ban_reason_by_penalty",
                    "freeze_time_by_penalty",
                    "freeze_reason_by_penalty", "provider_penalty_balance", "provider_reward_permission", "provider_penalty_reason"]
            }).then(res => {
                if (res.code == 200) {
                    this.banData = res.data.ban_reason_by_penalty
                    this.frozenData = res.data.freeze_reason_by_penalty
                    this.frozenTimeData = res.data.freeze_time_by_penalty
                    this.options = res.data.provider_penalty_reason
                    this.punishoptions = res.data.provider_penalty_balance
                    this.stopOptions = res.data.provider_reward_permission
                }
            })

        },
        // 翻页
        changePage(val) {
            console.log(val)
            this.leftLoading = true
            this.index = -1,
                this.usertionData.pageNum = val
            this.formData = []
            this.conversation(this.usertionData)
        },
        // 详情数据加载
        divScroll(event,val) {
            console.log("滚动了")
            const scrollTop = this.$refs.messagrScoll.scrollTop; // 滚动条的位置
            const windowHeitht = this.$refs.messagrScoll.clientHeight; // 在页面上返回内容的可视高度
            const scrollHeight = this.$refs.messagrScoll.scrollHeight; // 返回整个元素的高度（包括带滚动条的隐蔽的地方）

            // 是否滚动到底部的判断
            if (Math.round(scrollTop) + windowHeitht === scrollHeight) {
                console.log(this.dialogueList.length, this.dialogueList.length, "///////////////////////", scrollTop, windowHeitht, scrollHeight)
                if (this.dialogueList.length < 100) {
                    console.log(this.conversationData)
                    let conversationData = { ...this.conversationData }
                    this.conversationData.pageNum++
                    this.userChecked = [{ fromUserId: this.fromUserId, toUserId: this.userId, partitionKey: this.parTime }]
                    this.conversationData.senders = this.userChecked
                    // this.conversationData.partitionKey = Array.from(new Set(this.weekArr))[this.pageNumd]
                    conversationData.partitionKey = this.UsersIfonpartitionKey;
                    if (this.conversationData.pageNum > 3) {
                        this.loading = false;
                        this.noMore = true;
                    } else {
                        console.log(this.conversationData)
                        this.userList(conversationData)
                        this.loading = true;
                        this.noMore = false;
                    }

                } else {
                    this.noMore = true;
                    this.loading = false;
                }
            }

        },
        // 处罚记录
        punishRecord() {
            this.noMorePunish = false;
            selectPenaltyRecordList(this.punishQuery).then(res => {
                if (res.code == 200) {
                    this.countPunish = res.data.totalPage
                    if (res.data.list.length > 0) {
                        if (this.punishQuery.pageNum == 1) {
                            this.punishQueryList = res.data.list
                        } else {
                            this.punishQueryList = this.punishQueryList.concat(res.data.list)
                            console.log(this.punishQueryList, this.countPunish)
                        }

                    } else {
                        this.loadingPunish = false
                        this.noMorePunish = true;
                    }

                } else {
                    this.loadingPunish = false
                    this.noMorePunish = true;
                }
            })
        },
        // 处罚数据加载
        punishScroll() {
            const scrollTop = this.$refs.punishref.scrollTop; // 滚动条的位置
            const windowHeitht = this.$refs.punishref.clientHeight; // 在页面上返回内容的可视高度
            const scrollHeight = this.$refs.punishref.scrollHeight; // 返回整个元素的高度（包括带滚动条的隐蔽的地方）
            // 是否滚动到底部的判断
            if (Math.round(scrollTop) + windowHeitht === scrollHeight) {
                //此处加载数据
                this.loadingPunish = true
                if (this.punishQuery.pageNum < this.countPunish) {
                    this.punishQuery.pageNum++
                    this.punishRecord();
                } else {
                    this.noMorePunish = true;
                    this.loadingPunish = false;
                }

            } else {
                this.noMorePunish = true;
                this.loadingPunish = false;
            }

        },
        // 查看金币权限
        getRewardPermission() {
            getRewardPermission({ providerId: this.hostId }).then(res => {
                if (res.code == 200) {
                    this.permission = res.data
                }
            })
        },
        //消息处理
        messageProcessing(val) {
            if (val.messageType == "TEXT") {
                return val.body
            } else if (val.messageType == "PICTURE") {
                let asd = JSON.parse(val.attach)
                return asd.url
            } else if (val.messageType == "CUSTOM") {
                let asdd = JSON.parse(val.attach).payload
                return asdd.desc
            } else {
                return null
            }
        },
        liwuProcessing(val) {
            if (val.messageType == "CUSTOM") {
                let asdd = JSON.parse(val.attach).payload
                if (JSON.parse(val.attach).eventType == "UP_GIVE_ITEM") {
                    return asdd.iconUrl
                } else {
                    return null
                }
            }
        },
        // 携带金币
        carryGold(val) {
            if (val.messageType == "TEXT" || val.messageType == "PICTURE") {
                if (val.ext == null || val.ext == "") {
                    return null
                } else {
                    if (val.senderType == 1) {
                        if (JSON.parse(val.ext).award != undefined) {
                            let asd = JSON.parse(val.ext).award
                            return asd.takeAward
                        } else {
                            return null
                        }
                    } else {
                        if (JSON.parse(val.ext).awardReceive != null) {
                            let asd = JSON.parse(val.ext).awardReceive
                            return asd.receiveAward
                        } else if (JSON.parse(val.ext).source != undefined) {
                            let asd = JSON.parse(val.ext).source
                            return asd.source
                        } else {
                            return null
                        }
                    }
                }
            }
        },
        // 房间标识
        fangjianLogo(val) {
            if (val.messageType == "TEXT") {
                if (val.ext == null || val.ext == "") {
                    let asd = "{}"
                } else {

                    if (val.senderType == 1) {
                        if (JSON.parse(val.ext).source != undefined) {
                            let asd = JSON.parse(val.ext)
                            return asd.source
                        } else {
                            return null
                        }
                    } else {
                        if (JSON.parse(val.ext).source != undefined) {
                            let asd = JSON.parse(val.ext)
                            return asd.source
                        } else {
                            return null
                        }
                    }
                }
            }
        }

    },
}