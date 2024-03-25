import { getOptionsConfigData, getTaskInfo, selectLogList, updateAudit, saved, savesd, saveObtain } from "@/api/operate/anchorReview/reviewList/index";

export default {
    components: {

    },
    data() {
        return {
            count: 0,
            /** 规格 */
            /**硬实力 */
            hardpower: [],
            selectArr: [],
            subIndex: [],
            hardData: [],
            hardval: [],
            /**视频违规标签默认 */
            cities: [
            ],
            checkboxGroup: [
            ],
            /**软实力 */
            softpower: [],
            softselectArr: [],
            softsubIndex: [],
            softData: [],
            selval: [],
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
            /**测试上次下标 */
            indexBio: '',
            /**当前下标 */
            currentIndex: [],
            loading: true,
            auditStatus: -1,
            providerId: '',
            historyList: [],
            providerInfod: {},
            userIbfo: {},
            id: "",
            collectShow: true,
            offSwitch: true,
            frequencyShow: 1
        };
    },
    created() {

    },
    mounted() {
        let str = window.location.href;
        let urls = str.split("?");
        let params = urls[1].split("&");
        this.auditStatus = params[0].split("=")[1];
        this.providerId = params[1].split("=")[1];
        this.id = params[2].split("=")[1];
        getOptionsConfigData({}).then(res => {
            if (res.code == 200) {
                this.hardpower = res.data.subjectiveOptions
                this.softpower = res.data.objectiveOptions
                this.serious = res.data.seriousViolationOptions
                this.violation = res.data.generalViolationOptions
                this.cities = res.data.videoViolationOptions
                this.init()
            }
        })

        getTaskInfo({
            id: this.id,
            auditStatus: this.auditStatus
        }).then(res => {
            if (res.code == 200) {
                this.providerInfod = res.data
                this.userIbfo = res.data.providerInfo
                this.softData = res.data.objectiveOptions
                this.hardData = res.data.subjectiveOptions
                this.seriousData = res.data.seriousViolationOptions
                this.violationData = res.data.generalViolationOptions
                this.collectShow = res.data.favoritesStatus == null ? 0 : res.data.favoritesStatus
                this.recordingId = res.data.recordingId
                // this.checkboxGroup = res.data.violationTags
                this.init()
                this.saveObtaind()
            }
        })
        // 历史记录
        selectLogList({ providerUserId: this.providerId, banTypes: [1, 2] }).then(resd => {
            if (resd.code == 200) {
                this.historyList = resd.data
            }
        })


    },
    methods: {
        init() {
            let arr1 = [...this.softData]
            let arr3 = [...this.softpower]
            let arr2 = [...this.hardData]
            let arr4 = [...this.hardpower]
            let arr5 = [...this.seriousData]
            let arr7 = [...this.serious]
            let arr6 = [...this.violationData]
            let arr8 = [...this.violation]
            // 硬实力
            // arr2.forEach((r, i) => {
            //     arr4.forEach(x => {
            //         for (let z = 0; z < x.optionsItem.length; z++) {
            //             if (x.optionsItem[z].key == r.key) {
            //                 this.subIndex.unshift(z);
            //             }
            //         }
            //     })
            // })
            arr4.forEach(x => {
                for (let z = 0; z < x.optionsItem.length; z++) {
                    x.optionsItem[z].type = false;
                    x.optionsItem[z].status = false;
                }
                arr2.forEach((r, i) => {
                    x.optionsItem.forEach((q, d) => {
                        if (r.topicCode == x.topicCode) {
                            if (x.optionsItem[d].key == r.options) {
                                x.optionsItem[d].type = true;
                                this.selval[i] = { topicCode: r.topicCode, index: d };
                            }
                        }
                    })
                })
            })

            arr3.forEach(x => {
                for (let z = 0; z < x.optionsItem.length; z++) {
                    x.optionsItem[z].type = false;
                    x.optionsItem[z].status = false;
                }
                arr1.forEach((r, i) => {
                    x.optionsItem.forEach((q, d) => {
                        if (r.topicCode == x.topicCode) {
                            if (x.optionsItem[d].key == r.options) {
                                x.optionsItem[d].type = true;
                                this.hardval[i] = { topicCode: r.topicCode, index: d };
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



            // arr5.forEach(x => {
            //     for (let z = 0; z < x.optionsItem.length; z++) {
            //         x.optionsItem[z].type = false;
            //     }
            //     arr5.forEach((r, i) => {
            //         x.optionsItem.forEach((q, d) => {
            //             if (r.topicCode == x.topicCode) {
            //                 if (x.optionsItem[d].key == r.options) {
            //                     x.optionsItem[d].type = true;
            //                 }
            //             }
            //         })
            //     })
            // })

            this.$set(arr4, "type", false)
            this.$set(arr7, "type", false)
            this.$set(arr8, "type", false)
            this.$set(arr3, "type", false)
            this.$set(arr4, "status", false)
            this.$set(arr3, "status", false)
            console.log(arr3)
            this.$forceUpdate(); // 重绘
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
        nextClick() {
            let Arr2;
            let Arr3;
            Arr2 = [...new Set(this.softData)]
            Arr3 = this.hardData
            console.log(Arr2, Arr2.length, Arr2.length > 0, Arr2.length >= 6, "客端", Arr3, Arr3.length, "主观", this.violationData, "一般违规", this.seriousData, "严重违规")
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
                updateAudit(
                    {
                        id: this.id,
                        objectiveOptions: Arr2,
                        unfitReason: "",
                        subjectiveOptions: Arr3,
                        generalViolationOptions: this.violationData,
                        seriousViolationOptions: this.seriousData,
                    }).then(res => {
                        if (res.code == 200) {
                            this.$store.dispatch("tagsView/delView", this.$route);
                            // this.$router.replace({ path: `/operate/anchotinspection/anchotinspection?pageNum=${this.pageNum}` }); // 关闭之后要返回的页面
                            location.href = `${window.location.origin}/#/operate/anchotinspection/anchotinspection`
                        }
                    })
            }
        },
        /**主观 */
        selectItem(x, res, index, resIndex) {
            console.log(this.selval, x, res, '-----')
            let t = this;
            let obj = {
                topicCode: x.topicCode
                , options: res.key
            }
            let art = [...t.hardData]
            console.log(art, t.hardData)
            if (res.type == true) {
                res.type = false
                for (let index = 0; index < art.length; index++) {
                    if (art[index].topicCode == obj.topicCode) {
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
                            console.log(res.type, q)
                        } else {
                            q.type = false
                        }
                    }
                })
            })

            t.hardpower.map((x) => {
                t.selval.map((c, o) => {
                    if (c.topicCode == x.topicCode) {
                        if (c.index != resIndex) {
                            x.optionsItem[c.index].status = true;
                        }
                    }
                });
            });
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

            t.softpower.map((x) => {
                t.hardval.map((c, o) => {
                    if (c.topicCode == x.topicCode) {
                        if (c.index != resIndex) {
                            x.optionsItem[c.index].status = true;
                        }
                    }
                });
            });
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
                        console.log(c.topicCode, x.topicCode, i)
                        if (c.topicCode == x.topicCode) {
                            // asd.push(res.key,c.options)
                            // t.$message({
                            //     message: '已经存在了~',
                            //     type: 'error'
                            // });
                            // asd.splice(i, 1, { optionsList: [res.key, c.options], topicCode: c.topicCode })
                            // console.log(art, art.splice(i, 1, { optionsList: [res.key, c.options], topicCode: c.topicCode }), obj, c, i, asd)
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

            console.log(art)
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
                            // // asd.push(res.key,c.options)
                            // t.$message({
                            //     message: '已经存在了~',
                            //     type: 'error'
                            // });
                            // asd.splice(i, 1, { optionsList: [res.key, c.options], topicCode: c.topicCode })
                            // console.log(art, art.splice(i, 1, { optionsList: [res.key, c.options], topicCode: c.topicCode }), obj, c, i, asd)
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

            console.log(art)
            t.seriousData = art
            console.log(art, t.seriousData)
            t.$forceUpdate(); // 重绘
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
        /**不规则选中 */
        handleCheckedCitiesChange(value) {
            console.log(value)
        },

        /**不适合 */
        unsuited() {

        },
        // 封禁冻结状态
        banDone(row) {
            switch (row) {
                case 1:
                    return "封禁";
                case 2:
                    return "冻结";
                case 3:
                    return "解封禁";
                case 4:
                    return "解冻结";

                default:
                    return "--";
            }
        },

        // // 点击黑频
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
    watch: {

    },

};
