import { Toast } from "vant";
import { networkRequest, setTitleBar } from "../../api/inedx";
import Title from "../../components/title.vue"

export default {
  name: "errPage",
  components: { Title },
  data() {
    return {
      text: this.$route.query.text ? this.$route.query.text : "",
      disabledname: true,
      disabledprofession: false,
      locale: this.$route.query.locale ? this.$route.query.locale : "en",
      style: {},
      titlecen: this.$t("editdata.Nickname")
    };
  },
  created() {
    let asd = require('../../JSON/public.json')
    this.style = asd
  },
  mounted() {
    let totalTmie = new Date().getTime()
    let obj = {
      event: "HP1102000",
      type: 'load',
      cost: this.time,
      totalCost: totalTmie,
    }
    this.$store.dispatch("onStatistics", obj)
    setTitleBar(this.$t("editdata.Nickname"));
    if (this.text.length == 0) {
      this.disabledname = true;
    } else {
      this.disabledname = false;
    }
  },
  methods: {
    inputs(e) {
      this.text = e.target.value;
    },
    focuss() {
      let obj = {
        event: "HE0002012",
        type: 'click',
      }
      this.$store.dispatch("onStatistics", obj)
    },
    // 名字u确定
    oKtext(t) {
      if (this.text.length == 0) {
        Toast('Please enter content')
      } else {
        if (this.$route.query.type == 0) {
          networkRequest("v2", "/ums/info/updateUmsInfo", { nickName: t }).then(
            (res) => {
              if (res.code == 200) {
                Toast(res.msg);
                this.$router.go(-1);
              } else {
                Toast(res.msg);
              }
            }
          );
        }
      }

      this.$store.dispatch("onStatistics", {
        type: "click",
        event: "HE0002011",
      });
    },
    goBack(){
      this.$router.go(-1);
    }
  },
  watch: {
    // 如果 `activeName` 发生改变，这个函数就会运行
    text: function (newQuestion) {
      if (newQuestion.length == 0) {
        this.disabledname = true;
      } else {
        this.disabledname = false;
      }
    },
  },
};
