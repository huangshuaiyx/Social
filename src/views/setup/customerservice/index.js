import { Toast, Image, Loading } from "vant";
import {
  chooseAndUpload,
  networkRequest,
  setTitleBar,
  close,
} from "../../../api/inedx";
import Title from "../../../components/title.vue"

export default {
  components: {
    [Image.name]: Image,
    [Loading.name]: Loading,
    Title
  },
  name: "doddess",
  data() {
    return {
      content: "",
      disabled: false,
      imageList: [], // 相册
      email: "",
      time: null,
      titlecen: 'Costomer Service',
      style: {}
    };
  },
  created() {
    this.time = new Date().getTime();
    let asd = require('../../../JSON/public.json')
    this.style = asd
  },
  mounted() {
    this.$store.dispatch("appLanguages");
    this.$i18n.locale = this.$store.state.appLanguage;
    setTitleBar("Costomer Service");
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
    oK() {
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
          imageList: this.imageList.length != 0 ? this.imageList : null,
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            Toast(res.msg);
            close();
            return;
          }
          Toast(res.msg);
        });
      }
    },
    // 输入邮箱
    nametextinp() {
      console.log("11");
      let obj = {
        event: "HE0007001",
        type: "click",
      };
      this.$store.dispatch("onStatistics", obj);
    },
    // 输入内容
    emailinp() {
      let obj = {
        event: "HE0007001",
        type: "click",
      };
      this.$store.dispatch("onStatistics", obj);
    },
    // 图片
    album() {
      this.albums = false;

      let obj = {
        event: "HE0007003",
        type: "click",
      };
      this.$store.dispatch("onStatistics", obj);
      chooseAndUpload("image", 4 - this.imageList.length, "false").then(
        (res) => {
          if (res.code == 200) {
            let types = Array.isArray(res.data);
            if (types == true) {
              res.data.map((x) => {
                this.imageList.push(x.fileUrl);
              });
            } else {
              this.imageList.push(res.data.fileUrl);
            }
          } else {
            Toast(res.msg);
          }
        }
      );
    },
    // 删除图片
    delImgs(t) {
      let obj = {
        event: "HE0007005",
        type: "click",
      };
      this.imageList.splice(t, 1); //选中删除
      this.$store.dispatch("onStatistics", obj);
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
