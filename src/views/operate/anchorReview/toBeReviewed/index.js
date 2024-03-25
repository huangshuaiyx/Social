import { getOptionsConfigData, selectLogList, selectMoreDictDataByDictType, updateUserStatus, getNextTask, auditHandle, saved, savesd, saveObtain } from "@/api/operate/anchorReview/reviewList/index";
export default {
    components: {

    },
    data() {
        return {
            loading: false,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    userCode: null,
                    agents: null,
                    auditStatus: 2,
                },
            },
            count: 0,
            // 封禁弹框
            openMatching: false,
            // 封禁选中
            goliveStatus: null,
            // 封禁原因
            banData: [],
            /**冻结选中 */
            banReason: null,
            /**冻结时间选中 */
            banReasonTime: null,
            /**冻结弹框 */
            banReasonShow: false,
            /**冻结原因 */
            frozenData: [],
            /**冻结时间 */
            frozenTimeData: [],
            /** 规格 */
            /**主观 */
            hardpower: [],
            selectArr: [],
            subIndex: [],
            hardData: [],
            // /**视频违规标签默认 */
            // cities: [],
            checkboxGroup: [],
            /**客观 */
            softpower: [],
            softselectArr: [],
            softsubIndex: [],
            softData: [],
            /**不符合审核 */
            InconformityData: [],
            // 一般违规
            violation: [],
            violationArr: [],
            violationIndex: [],
            violationData: [],
            // 严重违规
            serious: [],
            seriousArr: [],
            seriousIndex: [],
            seriousData: [],
            /**违规 */
            inunsuited: "",
            director: "",
            /**主播详情 */
            providerInfo: {},
            /**all参数 */
            addData: {},
            /**封禁记录 */
            // historyList: [],
            id: "",
            banTime: "",
            collectShow: 0,
            // 录制id
            recordingId: "",
            userIbfo: {},
            offSwitch: false,
            frequencyShow: 1,
            userId: JSON.parse(localStorage.getItem("userId")),
        };
    },
    created() {
        this.selectMoreDic()
        console.log(this.formData)
    },
    mounted() {
        // let str = window.location.href;
        // let urls = str.split("?");
        // let params = urls[1].split("&");
        // this.director = params[0].split("=")[1];
        getOptionsConfigData({}).then(res => {
            if (res.code == 200) {
                this.hardpower = res.data.subjectiveOptions
                this.softpower = res.data.objectiveOptions
                this.InconformityData = res.data.unfitAuditOptions
                this.serious = res.data.seriousViolationOptions
                this.violation = res.data.generalViolationOptions
                this.cities = res.data.videoViolationOptions
                this.init()
            }
        })
        this.nextTask()
    },
    methods: {
        // 封禁,冻结文案
        selectMoreDic() {
            selectMoreDictDataByDictType({
                dictTypes: ["ban_reason",
                    "freeze_time",
                    "freeze_reason"]
            }).then(res => {
                if (res.code == 200) {
                    this.banData = res.data.ban_reason
                    this.frozenData = res.data.freeze_reason
                    this.frozenTimeData = res.data.freeze_time
                }
            })

        },
        saveObtaind() {
            saveObtain({
                recordingId: this.recordingId
            }).then(res => {
                if (res.code == 200) {
                    let asd = res.data != [] ? res.data : []
                    asd.map(x => {
                        if (x == "blankscreen") {
                            this.frequencyShow = 0
                        } else {
                            this.frequencyShow = 1
                        }
                    })
                }
            })
        },
        /**获取审核任务 */
        nextTask() {
            this.loading = true
            console.log(this.formData)
            this.$store.dispatch('query', { userId: this.userId }).then(resd => {
                if (resd.data != undefined) {
                    this.property = resd.data.taskType
                    this.formData = resd.data.taskList
                    if (this.formData != 0) {
                        if(this.property == 2001){
                            let res = this.formData[0].taskInfo
                            if (res == null) {
                                this.$store.dispatch("tagsView/delView", this.$route);
                                this.$router.replace({ path: "/operate/anchorReview/reviewList" }); // 关闭之后要返回的页面
                            } else {
                                this.loading = false
                                this.id = res.id
                                this.addData = res
                                if (res.providerInfo != null) {
                                    this.userIbfo = res.providerInfo
                                    this.softData = res.objectiveOptions
                                    this.hardData = res.subjectiveOptions
                                    this.seriousData = res.seriousViolationOptions != null ? res.seriousViolationOptions : []
                                    this.recordingId = res.recordingId
                                    this.collectShow = res.favoritesStatus == null ? 0 : res.favoritesStatus
                                    this.init()
                                    this.saveObtaind()
                                }
                            }
                        }else{
                            this.$parent.getmethod()
                        }
                        
                    } else {
                        this.$store.dispatch("tagsView/delView", this.$route);
                        this.$router.replace({ path: "/operate/anchorReview/reviewList" }); // 关闭之后要返回的页面
                    }
                } else {
                    this.$store.dispatch("tagsView/delView", this.$route);
                    this.$router.replace({ path: "/operate/anchorReview/reviewList" }); // 关闭之后要返回的页面
                }

            })
        },
        init() {
            let arr1 = [...this.softData]
            let arr3 = [...this.softpower]
            let arr2 = [...this.hardData]
            let arr4 = [...this.hardpower]
            let arr5 = [...this.seriousData]
            let arr7 = [...this.serious]
            let arr6 = [...this.violationData]
            let arr8 = [...this.violation]
            arr4.forEach(x => {
                for (let z = 0; z < x.optionsItem.length; z++) {
                    x.optionsItem[z].type = false;
                }
                arr2.forEach((r, i) => {
                    x.optionsItem.forEach((q, d) => {
                        if (r.topicCode == x.topicCode) {
                            if (x.optionsItem[d].key == r.options) {
                                x.optionsItem[d].type = true;
                            }
                        }
                    })
                })
            })

            arr3.forEach(x => {
                for (let z = 0; z < x.optionsItem.length; z++) {
                    x.optionsItem[z].type = false;
                }
                arr1.forEach((r, i) => {
                    x.optionsItem.forEach((q, d) => {
                        if (r.topicCode == x.topicCode) {
                            if (x.optionsItem[d].key == r.options) {
                                x.optionsItem[d].type = true;
                            }
                        }
                    })
                })
            })


            arr7.forEach(x => {
                for (let z = 0; z < x.optionsItem.length; z++) {
                    x.optionsItem[z].type = false;
                }
                arr5.forEach((r, i) => {
                    x.optionsItem.forEach((q, d) => {
                        if (r.topicCode == x.topicCode) {
                            if (x.optionsItem[d].key == r.options) {
                                x.optionsItem[d].type = true;
                            }
                        }
                    })
                })
            })

            arr8.forEach(x => {
                for (let z = 0; z < x.optionsItem.length; z++) {
                    x.optionsItem[z].type = false;
                }
                arr6.forEach((r, i) => {
                    x.optionsItem.forEach((q, d) => {
                        if (r.topicCode == x.topicCode) {
                            if (x.optionsItem[d].key == r.options) {
                                x.optionsItem[d].type = true;
                            }
                        }
                    })
                })
            })

            this.$set(arr4, "type", false)
            this.$set(arr3, "type", false)
            this.$set(arr7, "type", false)
            this.$set(arr8, "type", false)
            this.$forceUpdate(); // 重绘
        },
        // 下一个
        nextClick(value) {
            let Arr2;
            let Arr3;
            Arr2 = this.softData 
            Arr3 = this.hardData
            // console.log(Arr2, Arr2.length >= 6, Arr2.length <= 0, "客端", Arr3, Arr3.length, "主观", this.violationData, "一般违规", this.seriousData, "严重违规")
            // else if (this.softsubIndex.every(x => x === -1) == true) {
            // this.$message.error('请主观项必填');
            // } 
            // this.loading = true
            if (Arr2.length != this.softpower.length) {
                this.$message.error('请选择客观印象');
            } 
            // else if (Arr3.length <= 0) {
            //     this.$message.error('请选择主观印象');
            // }
             else {
                auditHandle(
                    {
                        id: this.id,
                        objectiveOptions: Arr2,
                        unfitReason: "",
                        subjectiveOptions: Arr3,
                        generalViolationOptions: this.violationData,
                        seriousViolationOptions: this.seriousData,
                    }
                ).then(res => {
                    // this.loading  = false
                    if (res.code == 200) {
                        // this.loading = true;
                        this.selectArr = [];
                        this.subIndex = [];
                        this.hardData = [];
                        this.softselectArr = [];
                        this.softsubIndex = [];
                        this.softData = [];
                        this.violationtArr = [];
                        this.violationIndex = [];
                        this.violationData = [];
                        this.seriousArr = [];
                        this.seriousIndex = [];
                        this.seriousData = [];
                        this.checkboxGroup = [];
                        // setTimeout(() => {
                        //     this.loading = false; //点击一次时隔两秒后才能再次点击
                        // }, 500);
                        // this.$parent.getmethod()
                        if(value == 'over'){
                            this.$router.push({
                                path:"/operate/anchorReview/reviewList"
                            })
                        }else{
                            this.nextTask()
                        }
                        // if (res.data == "audited") {
                        //     this.$message({
                        //         message: 'Task does not exitst or is finished.',
                        //         type: 'success'
                        //     });
                        //     this.loading = true;
                        //     this.selectArr = [];
                        //     this.subIndex = [];
                        //     this.hardData = [];
                        //     this.softselectArr = [];
                        //     this.softsubIndex = [];
                        //     this.softData = [];
                        //     this.violationtArr = [];
                        //     this.violationIndex = [];
                        //     this.violationData = [];
                        //     this.seriousArr = [];
                        //     this.seriousIndex = [];
                        //     this.seriousData = [];
                        //     this.checkboxGroup = [];
                        //     setTimeout(() => {
                        //         this.loading = false; //点击一次时隔两秒后才能再次点击
                        //     }, 500);
                        // } else {
                        //     this.loading = true;
                        //     this.selectArr = [];
                        //     this.subIndex = [];
                        //     this.hardData = [];
                        //     this.softselectArr = [];
                        //     this.softsubIndex = [];
                        //     this.softData = [];
                        //     this.violationtArr = [];
                        //     this.violationIndex = [];
                        //     this.violationData = [];
                        //     this.seriousArr = [];
                        //     this.seriousIndex = [];
                        //     this.seriousData = [];
                        //     this.checkboxGroup = [];
                        //     setTimeout(() => {
                        //         this.loading = false; //点击一次时隔两秒后才能再次点击
                        //     }, 500);
                        // }

                    }else{
                        this.$message.error(`${res.msg}`);
                        if(value == 'over'){
                            this.$router.push({
                                path:"/operate/anchorReview/reviewList"
                            })
                        }else{
                            this.nextTask()
                        }
                    }
                })
            }

        },
        // 封禁确定
        // submitMatching() {
        //     this.openMatching = false;
        //     if (this.goliveStatus == -1) {
        //         this.$message.error('Restricted reason is required');
        //     } else {
        //         updateUserStatus({
        //             "userType": 2,
        //             "userId": this.addData.providerId,
        //             "userStatus": 2,
        //             "goliveStatus": "1",
        //             "banReason": this.goliveStatus,
        //         }).then(res => {
        //             if (res.code == 200) {
        //                 this.banReasonShow = false
        //                 this.nextTask(this.director)
        //                 this.$message({
        //                     message: 'Remove',
        //                     type: 'success'
        //                 });
        //             }
        //         })
        //     }
        // },
        // 冻结确定
        // reasonMatching() {
        //     if (this.banReasonTime == null) {
        //         this.$message.error('Restricted reason, restricted period is required');
        //     } else if (this.banReason == null) {
        //         this.$message.error('Restricted reason, restricted period is required');
        //     } else {
        //         updateUserStatus({
        //             "userType": 2,
        //             "userId": this.addData.providerId,
        //             "userStatus": 4,
        //             "goliveStatus": "1",
        //             "banReason": this.banReason,
        //             "banTimeVal": this.banTime,
        //             "banPeriod": this.banReasonTime
        //         }).then(res => {
        //             if (res.code == 200) {
        //                 this.banReasonShow = false
        //                 this.nextTask(this.director)
        //                 this.$message({
        //                     message: 'Restrict',
        //                     type: 'success'
        //                 });
        //             }
        //         })
        //     }
        // },
        /**主观 */
        selectItem(x, res, index, resIndex) {
            let t = this;
            let obj = {
                topicCode: x.topicCode
                , options: res.key
            }
            let art = [...t.hardData]
            console.log(t.hardData, art)
            if (res.type == true) {
                res.type = false
                for (let index = 0; index < t.hardData.length; index++) {
                    if (t.hardData[index].topicCode == obj.topicCode) {
                        art.splice(index, 1)
                    }
                }
            } else {
                res.type = true
                if (art.length > 0) {
                    art.forEach(x => {
                        if (x.topicCode == x.topicCode) {
                            art.splice(index, 1, obj)
                        } else {
                            art.push(obj)
                        }
                    })
                } else {
                    art.push(obj)
                }

            }

            t.hardpower.map((c) => {
                c.optionsItem.map((q, i) => {
                    if (c.topicCode == x.topicCode) {
                        if (q.key == res.key) {
                            console.log(res.type)
                        } else {
                            q.type = false
                        }
                    }
                })
            })
            t.hardData = art
            console.log(art)
            t.$forceUpdate(); // 重绘
        },
        /**客观 */
        softselect(x, res, index, resIndex) {
            console.log(x, res, this.softData, this.softpower, "----")
            let t = this;
            let obj = {
                topicCode: x.topicCode
                , options: res.key
            }

            let asd = t.softData
            console.log(asd)
            t.softpower.map((c) => {
                c.optionsItem.map((q, i) => {
                    if (c.topicCode == x.topicCode) {
                        if (q.key != res.key) {
                            q.type = false
                        }
                    }
                })
            })

            if (res.type == true) {
                res.type = false
                for (let indexs = 0; indexs < asd.length; indexs++) {
                    if (asd[indexs].topicCode == obj.topicCode) {
                        asd.splice(indexs, 1)
                    }
                }
                t.softData = asd
            } else if (res.type == false) {
                res.type = true
                if (t.softData.length > 0) {
                    let rxft = false

                    t.softData.forEach((o, i) => {
                        console.log(o.topicCode, x.topicCode, o.topicCode == x.topicCode)
                        if (o.topicCode == x.topicCode) {
                            asd.splice(i, 1, obj)
                            console.log(x.topicCode, o.topicCode, asd, index, "相同")
                        } else {
                            asd.push(obj)
                        }
                    })
                } else {
                    t.softData.push(obj)
                }

                // t.$forceUpdate(); // 重绘
            }
            t.softData = [...new Set(asd)]

            console.log(t.softData, [...new Set(t.softData)])
            t.$forceUpdate(); // 重绘
        },
        // 一般违规
        violationClick(x, res, index, resIndex) {
            console.log(x, res, index, "---------------------")
            let t = this;
            let obj = {
                topicCode: x.topicCode
                , options: res.key
            }
            let art = [...t.violationData]
            if (res.type == true) {

                res.type = false
                for (let index = 0; index < t.violationData.length; index++) {
                    if (t.violationData[index].topicCode == obj.topicCode) {
                        art.splice(index, 1)
                    }
                }
            } else {
                res.type = true
                if (art.length > 0) {
                    let exist = false;//判断是否存在
                    art.map((c, i) => {
                        // console.log({ optionsList: [c.topicCode, res.key], topicCode: x.topicCode })
                        // c.options = null
                        // c.optionsList = [c.topicCode, res.key]
                        // return c.topicCode == x.topicCode ? { optionsList: [c.topicCode, res.key], topicCode: x.topicCode }: c; 
                    })
                    console.log(art)
                    if (!exist) {
                        art.push(obj)
                    }
                } else {
                    art.push(obj)
                }

            }

            console.log(art,)
            t.violationData = art
            console.log(art, t.violationData)
            t.$forceUpdate(); // 重绘
        },
        // 严重违规
        seriousClick(x, res, index, resIndex) {
            console.log(x, res, index, "---------------------")
            let t = this;
            let obj = {
                topicCode: x.topicCode
                , options: res.key
            }
            let art = [...t.seriousData]
            if (res.type == true) {
                res.type = false
                console.log(obj)
                for (let index = 0; index < t.seriousData.length; index++) {
                    if (t.seriousData[index].topicCode == obj.topicCode) {
                        art.splice(index, 1)
                    }
                }
            } else {
                res.type = true
                if (art.length > 0) {
                    let exist = false;//判断是否存在
                    art.map((c, i) => {
                        console.log(c.topicCode, x.topicCode, i)
                        if (c.topicCode == x.topicCode) {

                        }
                    })
                    if (!exist) {
                        art.push(obj)
                    }
                } else {
                    console.log("数据不为空")
                    art.push(obj)
                }

            }

            console.log(art,)
            t.seriousData = art
            console.log(art, t.seriousData)
            t.$forceUpdate(); // 重绘
        },

        /**不适合 */
        unsuited(val) {
            if (this.softsubIndex.every(x => x === -1) == true) {
                this.inunsuited = val
                this.softselectArr = [];
                this.softsubIndex = [];
                this.softData = []
                this.hardArr = [];
                this.hardIndex = [];
                this.hardData = []
                auditHandle({
                    unfitReason: val,
                    id: this.id,
                    objectiveOptions: this.softData,
                    subjectiveOptions: this.hardData,
                    generalViolationOptions: this.violationData,
                    seriousViolationOptions: this.seriousData,
                }).then(res => {
                    if (res.code == 200) {
                        this.loading = true;
                        this.softselectArr = [];
                        this.softsubIndex = [];
                        this.softData = [];
                        setTimeout(() => {
                            this.loading = false; //点击一次时隔两秒后才能再次点击
                        }, 500);
                        this.nextTask()
                    }
                })
            } else {
                this.$message.error('Please check optional mark is chosen or not, you need to cancel to choose the opetional mark then submit failed to mark option');
            }

        },

        // 收藏
        collect(val) {
            this.collectShow = val
            console.log(this.providerInfo)
            saved({
                recordingId: this.recordingId,
                "type": val
            }
            ).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '成功',
                        type: 'success'
                    });
                }
            })
        },
        // 取消全选
        deselectAll() {
            let arr4 = [...this.hardpower]
            let arr5 = [...this.softpower]
            let arr6 = [...this.violation]
            let arr7 = [...this.serious]
            arr4.forEach(x => {
                for (let z = 0; z < x.optionsItem.length; z++) {
                    x.optionsItem[z].type = false;
                }
            })
            arr5.forEach(x => {
                for (let z = 0; z < x.optionsItem.length; z++) {
                    x.optionsItem[z].type = false;
                }
            })
            arr6.forEach(x => {
                for (let z = 0; z < x.optionsItem.length; z++) {
                    x.optionsItem[z].type = false;
                }
            })
            arr7.forEach(x => {
                for (let z = 0; z < x.optionsItem.length; z++) {
                    x.optionsItem[z].type = false;
                }
            })
            this.softData = []
            this.hardData = []
            this.violationData = []
            this.seriousData = []
            this.softArr = []
            this.hardArr = []
            this.violationArr = []
            this.seriousArr = []
            this.$set(arr4, "type", false)
            this.$set(arr5, "type", false)
            this.$set(arr6, "type", false)
            this.$set(arr7, "type", false)
            console.log(arr4, this.hardData, arr5, this.softData)
            this.$forceUpdate(); // 重绘
        },
        // 点击黑频
        frequency(n) {
            if (n == 1) {
                savesd({ recordingId: this.recordingId, tags: ["blankscreen"] }).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: '成功',
                            type: 'success'
                        });
                        this.frequencyShow = 0
                        this.saveObtaind()
                    }
                })
            } else {
                savesd({ recordingId: this.recordingId, tags: [] }).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: '成功',
                            type: 'success'
                        });
                        this.frequencyShow = 1
                        this.saveObtaind()
                    }
                })
            }

        }
    },

};
