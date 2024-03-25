import { setTitleBar, close, JumpH5 } from "../../../api/inedx";
// var dsBridge = require("dsbridge");
// import 'dsbridge_flutter'
import Title from "../../../components/title.vue"

export default {
    name: "doddess",
    components: {
        Title
    },
    data() {
        return {
            formData: {},
            time: null,
            titlecen: 'About Us',
            style: {}
        };
    },
    created() {
        this.time = new Date().getTime()
        let asd = require('../../../JSON/public.json')
        this.style = asd
    },
    mounted() {
        setTitleBar(this.$t("About Us"), false, false);
        if (!dsBridge.call("nativeEnv")) return
        this.formData = JSON.parse(dsBridge.call("nativeEnv"));
        console.log(this.formData, '参数');
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
        goBacks() {
            close()
        },
        // 用户 
        serviceClick() {
            JumpH5("/consumer")
        },
        // 隐私
        PrivacyClick() {
            JumpH5("/secret")
        }
    },
};
