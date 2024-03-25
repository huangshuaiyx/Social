import { Toast } from "vant";
import { networkRequest, setTitleBar } from "../../api/inedx";
import Title from "../../components/title.vue"

export default {
    name: "errPage",
    components: { Title },
    data () {
        return {
            signature: this.$route.query.text ? this.$route.query.text : "",
            disabledsignature: false,
            disabledprofession: false,
            locale: this.$route.query.locale ? this.$route.query.locale : "en",
            time: null,
            style: {},
            titlecen: 'Self Introduction'
        };
    },
    created(){
        this.time = new Date().getTime()
        let asd = require('../../JSON/public.json')
        this.style = asd
    },
    mounted () {
        setTitleBar(this.$t("editdata.Self"));
        if (this.signature.length == 0) {
            this.disabledsignature = true;
        } else {
            this.disabledsignature = false;
        }
        let totalTmie = new Date().getTime()
        let obj = {
            event: "HP1103000",
            type: 'load',
            cost: this.time,
            totalCost: totalTmie,
        }
        this.$store.dispatch("onStatistics",obj)
    },
    methods: {
        textareainp () {
            let obj = {
                event: "HE0002013",
                type: 'click',
            }
            this.$store.dispatch("onStatistics",obj)
        },
        textareas (e) {
            this.signature = e.target.value;
        },
        // 签名确定
        oKsignature (t) {
            if (t != "") {
                if (this.$route.query.type == 0) {
                    networkRequest("v2", "/ums/info/updateUmsInfo", {
                        selfIntroduction: t,
                    }).then((res) => {
                        console.log(res)
                        if (res.code == 200) {
                            Toast(res.msg);
                            this.$router.go(-1);
                        } else {
                            Toast(res.msg);
                        }
                    });
                }
            }
            let obj = {
                event: "HE0002014",
                type: 'click',
            }
            this.$store.dispatch("onStatistics",obj)
        },
    },
    watch: {
        signature: function (newQuestion) {
            if (newQuestion.length == 0) {
                this.disabledsignature = true;
            } else {
                this.disabledsignature = false;
            }
        },
    },
};
