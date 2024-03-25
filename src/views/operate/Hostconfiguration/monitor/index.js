import { selectImMessageSummaryList, selectListDetailByPartitionKey } from "../../../../api/operate/Hostconfiguration/index"
export default {
    data() {
        return {
            // loding
            messagrLoading: false,
            // 用户请求数据
            queryParams: {
                pageNum: 1,
                pageSize: 5,
                productId: "2001",
                providerId: null,
            },
            // 会话数据
            conversationData: {
                pageNum: 1,
                pageSize: 4,
                senders: []
            },
            // 是否在加载中
            loading: false,
            // 请求到多少条数据
            count: 50,
            // 是否有更多数据
            noMore: false,
            formData: [],
            dialogueList: [],
            getMonthWeekDate: null,
            userGold: {}, // 用户携带金币,
            translate: [], // 翻译
            panduanState: 1
        };
    },

    created() {
        this.userList(this.queryParams)
        this.messagrLoading = true;
        setTimeout(() => {
            this.messagrLoading = false;
        }, 1500);
    },
    mounted() {

    },
    methods: {
        userList(val) {
            this.panduanState == 1
            this.loading = true;
            selectImMessageSummaryList(val).then(res => {
                if (res.code == 200) {
                    if (res.data.list.length > 0) {
                        if (res.data.total <= 0) {
                            this.noMore = true;
                            this.loading = false;
                        }
                        this.dialogueList = this.dialogueList.concat(res.data.list)
                        let conversationData = { ...this.conversationData }
                        conversationData.senders = res.data.list
                        selectListDetailByPartitionKey(conversationData).then(resvalue => {
                            this.messagrLoading = false;
                            if (resvalue.code == 200) {
                                this.formData = this.formData.concat(resvalue.data)
                                this.noMore = false;
                                this.loading = false;
                            }
                        })
                    } else {
                        this.formData = []
                        this.noMore = true;
                        this.loading = false;
                    }

                }
            })
        },
        divScroll(event) {
            const scrollTop = this.$refs.messagrScoll.scrollTop; // 滚动条的位置
            const windowHeitht = this.$refs.messagrScoll.clientHeight; // 在页面上返回内容的可视高度
            const scrollHeight = this.$refs.messagrScoll.scrollHeight; // 返回整个元素的高度（包括带滚动条的隐蔽的地方）
            // 是否滚动到底部的判断
            if (Math.round(scrollTop) + windowHeitht === scrollHeight) {
                //此处加载数据
                this.loading = true
                if (this.panduanState == 0) {
                    this.noMore = true;
                    this.loading = false;
                } else {
                    if (this.dialogueList.length < 50) {
                        this.queryParams.pageNum++;
                        this.queryParams.pageSize = 5;
                        this.userList(this.queryParams);
                    } else {
                        this.noMore = true;
                        this.loading = false;
                    }
                }


            }
        },
        //跳转详情
        jumpdetalis(val, t) {
            window.location.href = `${window.location.origin}/#/operate/Hostconfiguration/messageDetails?providerId=${val.contents[0].providerId}&toUserId=${val.contents[0].toUserId}&partitionKey=${val.contents[0].partitionKey}&fromUserId=${val.contents[0].fromUserId}`
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.panduanState = 0
            if (this.queryParams.providerId != null) {
                this.messagrLoading = true;
                this.dialogueList = []
                this.formData = []
                setTimeout(() => {
                    this.messagrLoading = false;
                }, 1500);
                this.queryParams.pageNum = 1
                this.queryParams.pageSize = 5
                this.userList(this.queryParams)
            } else {
                this.$message.error('请输入主播ID');
            }
        },
        //  刷新
        refresh() {
            this.panduanState = 1
            this.$refs.messagrScoll.scrollTop = 0
            this.queryParams.pageNum = 1
            this.queryParams.pageSize = 5
            this.queryParams.providerId = null
            this.messagrLoading = true;
            this.userList(this.queryParams)
            this.formData = []
            this.dialogueList = []
            this.noMore = false
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
            } else if (val.messageType == "VIDEO") {
                let asd = JSON.parse(val.attach)
                return asd.url
            }
        },
        // 携带金币
        carryGold(val) {
            if (val.messageType == "TEXT" || val.messageType == "PICTURE") {
                if (val.ext == null || val.ext == "") {
                    let asd = "{}"
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
    }
}