import { Toast, Image, Loading } from "vant";
import {
    chooseAndUpload,
    networkRequest,
    setTitleBars,
    close,
} from "../../../api/inedx";
export default {
    components: {
        [Image.name]: Image,
        [Loading.name]: Loading,
    },
    name: "doddess",
    data () {
        return {
            content: "",
            disabled: false,
            imageList: [], // 相册
            email: "",
            time: null,
        };
    },
    async created () {
        await this.$store.dispatch("appLanguages");
        this.$i18n.locale = this.$store.state.appLanguage;
        this.time = new Date().getTime();
        setTitleBars("Costomer Service", true, false);
    },
    mounted () {


        if (this.content) {
            this.disabled = true;
        } else {
            this.disabled = false;
        }
        let totalTmie = new Date().getTime();
        let obj = {
            event: "HP1701000",
            type: "load",
            cost: this.time,
            totalCost: totalTmie,
        };
        this.$store.dispatch("onStatistics", obj);
    },
    methods: {
        oK () {
            let obj = {
                event: "HE0007004",
                type: "click",
            };
            this.$store.dispatch("onStatistics", obj);
            console.log(this.content);
            if (this.content != "") {
                networkRequest("v1", "/ums/feedback/save", {
                    content: this.content,
                    email: this.email,
                    imageList: this.imageList,
                }).then((res) => {
                    console.log(res);
                    Toast('ok');
                    close();
                    return;
                });
            }
        },
        // 输入邮箱
        nametextinp () {
            console.log("11");
            let obj = {
                event: "HE0007002",
                type: "click",
            };
            this.$store.dispatch("onStatistics", obj);
        },
        // 输入内容
        emailinp () {
            let obj = {
                event: "HE0007001",
                type: "click",
            };
            this.$store.dispatch("onStatistics", obj);
        },
        // 图片
        album () {
            this.albums = false;
            let obj = {
                event: "HE0007003",
                type: "click",
            };
            this.$store.dispatch("onStatistics", obj);
            chooseAndUpload("image", 4 - this.imageList.length, "false").then(
                (res) => {
                    console.log(res, '图片')
                    this.imageList.push(res[0].fileUrl);
                }
            );
        },
        // 删除图片
        delImgs (t) {
            let obj = {
                event: "HE0007005",
                type: "click",
            };
            this.imageList.splice(t, 1); //选中删除
            this.$store.dispatch("onStatistics", obj);
        },
        /**退出 */
        signout () {
            close();
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0005003",
            });
        },
    },
    watch: {
        content: function (newQuestion) {
            if (newQuestion) {
                if (newQuestion.replace(/\s/g, "")) {
                    this.disabled = true;
                }
            } else {
                this.disabled = false;
            }
        },
    },
};
