import {
    close,
    networkRequest,
    chooseAndUpload,
    getLocation,
    update,
    setTitleBar,
} from "../../api/inedx";
import {
    ActionSheet,
    Picker,
    Popup,
    DatetimePicker,
    Toast,
    Image,
    Loading,
} from "vant";
import Title from "../../components/title.vue"

export default {
    components: {
        [ActionSheet.name]: ActionSheet,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [DatetimePicker.name]: DatetimePicker,
        [Image.name]: Image,
        [Loading.name]: Loading,
        Title
    },
    name: "",
    data() {
        return {
            showAge: false, // Age隐藏
            showRegion: false, // Region隐藏
            albums: false, //相册弹框
            videos: false, //视频弹框
            porters: false, // 海报
            avatared: false, // 头像
            radio: null, // 国籍选择
            minDate: new Date(1921, 0, 1), // 生日选择器开始日期
            maxDate: new Date(), // 生日选择器结束日期
            birthday: new Date(), //生日默认选择
            areaForm: { },
            formData: {},
            numImg: 0, // 可上传图片数量
            selectEditUrl: "/ums/info/getUserPersonalEdit",
            saveUmsInfoUrl: "/ums/info/updateUmsInfo",
            deletImgs: "/ums/resource/deleteResourceById",
            time: null,
            styles: {},
            sueRadio: true
        };
    },
    created() {
        let asd = require('../../JSON/public.json')
        this.styles = asd
        this.time = new Date().getTime()
        this.editData();
    },
    mounted() {
        update("reloadData");
        this.$store.dispatch("appLanguages");
        this.$i18n.locale = this.$store.state.appLanguage;
        setTitleBar(this.$t("agree.prfile"), false, false);
        let totalTmie = new Date().getTime()
        let obj = {
            event: "HP1101000",
            type: 'load',
            cost: this.time,
            totalCost: totalTmie,
        }
        this.$store.dispatch("onStatistics", obj)
    },
    methods: {
        editData() {
            networkRequest("v2", this.selectEditUrl).then((res) => {
                console.log(res)
                if (res.code == 200) {
                    this.formData = res.data;
                    console.log(this.formData);
                } else if (res.code == 40006) {
                    Toast.fail(res.msg);
                    setTimeout(() => {
                        close();
                    }, 1500);
                }
            });
        },
        // 名字 ,签名
        JumpIntroduction(n) {
            let resp = {}
            networkRequest("v2", this.selectEditUrl).then((res) => {
                if (res.code == 200) {
                    if (res.data.selfIntroductionAuditStatus == 1) {
                        Toast.fail("under review");
                    } else {
                        this.$router.push({
                            name: "introduction",
                            query: {
                                text: n,
                                locale: this.$i18n.locale,
                                type: 0,
                            },
                        });
                    }
                } else {
                    Toast(res.msg);
                }
                resp = res
            });
            let obj = {
                event: "HE0002005",
                type: 'click',
                resp: resp.code,
                tag: window.location.hash.split('?')[0].split('#/')[1],
            }
            this.$store.dispatch("onStatistics", obj)
        },
        JumpName(n) {
            let resp = {}
            networkRequest("v2", this.selectEditUrl).then((res) => {
                if (res.code == 200) {
                    if (res.data.nickNameAuditStatus == 1) {
                        Toast.fail("under review");
                    } else {
                        this.$router.push({
                            name: "nickName",
                            query: {
                                text: n,
                                locale: this.$i18n.locale,
                                type: 0,
                            },
                        });
                    }
                } else {
                    Toast(res.msg);
                }
                resp = res
            });
            let obj = {
                event: "HE0002006",
                type: 'click',
                resp: resp.code,
            }
            this.$store.dispatch("onStatistics", obj)
        },
        //国旗确定
        Confirm() {
            console.log(this.radio,'adasdasd')
            let obj = {
                event: "HE0002012",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
            if (this.radio == null) {
                Toast("Please select a country");
            } else {
                networkRequest("v2", this.saveUmsInfoUrl, {
                    region: this.radio,
                }).then((res) => {
                    if (res.code == 200) {
                        this.showRegion = false;
                        Toast.success(res.msg);
                        this.editData();
                    } else {
                        Toast(res.msg);
                    }
                });
            }
        },
        // 取消
        onCancel() {
            this.showAge = false;
            this.showRegion = false;
            this.radio = ""
            let obj = {
                event: "HE0002013",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
        },
        // 国家选择
        radioclick(t) {
            this.sueRadio = !this.sueRadio
            if (this.sueRadio == false) {
                this.radio = t;
            } else {
                this.radio = null;
            }
            console.log(this.radio,'1111111111111111111')
            let obj = {
                event: "HE0002014",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
        },
        // poster
        poster() {
            let resp = {}
            networkRequest("v2", this.selectEditUrl).then((res) => {
                if (res.code == 200) {
                    if (res.data.posterAuditStatus == 1) {
                        Toast.fail("under review");
                    } else {
                        this.porters = true;
                    }
                } else {
                    Toast(res.msg);
                }
                resp = res
            });
            let obj = {
                event: "HE0002002",
                type: 'click',
                resp: resp.code,
            }
            this.$store.dispatch("onStatistics", obj)
        },

        // 获取地理位置
        regions(n) {
            console.log(n, "sadas")
            networkRequest("v1", "/ums/info/getUmsRegionInfo", {
                longitude: '-1',
                latitude: '-1',
            }).then((resd) => {
                console.log(resd)
                if (resd.code == 200) {
                    this.showRegion = true;
                    this.areaForm = resd.data;
                    // if (resd.data.city == n) {
                    //     this.radio = resd.data.city;
                    // } else if (resd.data.country == n) {
                    //     this.radio = resd.data.country;
                    // }
                } else {
                    Toast(resd.msg);
                }
            });
            let obj = {
                event: "HE0002008",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
        },
        // 生日确定
        birthdayok(value) {
            this.showAge = false;
            let seperator1 = "-";
            let month = value.getMonth() + 1;
            let strDate = value.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.birthday =
                value.getFullYear() + seperator1 + month + seperator1 + strDate;
            networkRequest("v2", this.saveUmsInfoUrl, {
                birthday: this.birthday,
            }).then((res) => {
                if (res.code == 200) {
                    Toast(res.msg);
                    this.editData();
                } else {
                    Toast(res.msg);
                }
            });
        },
        avtarClick(x) {
            this.$router.push({
                name: "avatar",
            });
            let obj = {
                event: "HE0002001",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
        },
        // 点击age
        Agebirthday() {
            this.showAge = true;
            let obj = {
                event: "HE0002007",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
        },
    },
};
