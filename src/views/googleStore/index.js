import { outerBrowser } from "../../api/inedx"
import { getQueryString } from "../../utils/index";
import { getTarget } from "../../api/paymenrt"
import { Toast } from "vant";
export default {
    data() {
        return {
            authCode: null,
            formData: {},
        }
    },
    mounted() {
        this.authCode = getQueryString("authCode")
        console.log(this.authCode)
        getTarget({ authCode: this.authCode }).then(res => {
            console.log(res)
            if (res.data.code == 200) {
                this.formData = res.data.data
                console.log(this.formData)
            }
        })
    },
    methods: {
        downClick() {
            // outerBrowser(this.formData.downloadLink)
            //    window.open(this.formData.downloadLink)
            window.location.href = this.formData.downloadLink
            // window.location.href =` https://play.app.goo.gl/?link=${this.formData.downloadLink}`


        },
        copyOrderId2(code) {
            if (code == undefined) return
            var input = document.createElement("input"); // 创建input对象
            input.value = code; // 设置复制内容
            document.body.appendChild(input); // 添加临时实例
            input.select(); // 选择实例内容
            document.execCommand("Copy"); // 执行复制
            document.body.removeChild(input); // 删除临时实例
            Toast("Copy Successfully")
        },
    }
}