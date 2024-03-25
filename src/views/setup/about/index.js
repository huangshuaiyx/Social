import { setTitleBars, close, JumpH5 } from "../../../api/inedx";
export default {
    name: "doddess",
    data () {
        return {
            formData: {},
            time: null,
        };
    },
    async created () {
        await this.$store.dispatch("appLanguages");
        // console.log(params, '语言');params.language
        this.$i18n.locale = this.$store.state.appLanguage
        this.time = new Date().getTime()
        setTitleBars(this.$t("about.title"), false, false);
        window.socailNR.call("nativeEnv", {}, (res) => {
            console.log(JSON.parse(JSON.stringify(res)), 'app信息')
            this.formData = JSON.parse(JSON.stringify(res))
        })
    },
    mounted () {
        console.log(this.formData, 'nativeEnv');
        let totalTmie = new Date().getTime()
        let obj = {
            event: "HP1901000",
            type: 'load',
            cost: this.time,
            totalCost: totalTmie,
        }
        this.$store.dispatch("onStatistics", obj)
    },
    methods: {
        goBacks () {
            close()
        },
        // 用户 
        serviceClick () {
            JumpH5("/subscriberagreement")
        },
        // 隐私
        PrivacyClick () {
            JumpH5("/concealagreement")
        }
    },
};
