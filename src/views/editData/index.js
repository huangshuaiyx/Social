import {
  ActionSheet,
  DatetimePicker,
  Image,
  Loading,
  Picker,
  Popup,
  Toast,
} from "vant";
import {
  chooseAndUpload,
  close,
  networkRequest,
  setTitleBars,
} from "../../api/inedx";
export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Image.name]: Image,
    [Loading.name]: Loading,
  },
  name: "",
  data() {
    return {
      showAge: false, // Age隐藏
      minDate: new Date(1921, 0, 1), // 生日选择器开始日期
      maxDate: new Date(), // 生日选择器结束日期
      birthday: new Date(), //生日默认选择
      formData: {
        face: "",
        selfIntroduction: "",
        nickName: "",
        language: "",
        age: "",
      },
      selectEditUrl: "/ums/info/getUserPersonalEdit",
      saveUmsInfoUrl: "/ums/info/updateUmsInfo",
      deletImgs: "/ums/resource/deleteResourceById",
      time: null,
      indexLanguage: "",
      lanList: [],
    };
  },
  async created() {
    await this.$store.dispatch("appLanguages");
    // console.log(params, '语言');params.language
    this.$i18n.locale = this.$store.state.appLanguage;
    this.time = new Date().getTime();
    // 显示loading
    this.bus.$emit("loading", true);
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 200);

    this.editData();
    this.lang();
    setTitleBars(this.$t("agree.prfile"), true, false);
  },
  mounted() {
    let totalTmie = new Date().getTime();
    let obj = {
      event: "HP1101000",
      type: "load",
      cost: this.time,
      totalCost: totalTmie,
    };
    this.$store.dispatch("onStatistics", obj);
  },
  methods: {
    editData() {
      networkRequest("v2", this.selectEditUrl).then((res) => {
        console.log(res);
        if (typeof res.code != undefined) {
          this.formData = res;
          console.log(this.formData);
        } else {
          Toast.fail(res.msg);
          setTimeout(() => {
            close();
          }, 1500);
        }
      });
    },
    // 取消
    onCancel() {
      this.showAge = false;
      this.showRegion = false;
      let obj = {
        event: "HE0002013",
        type: "click",
      };
      this.$store.dispatch("onStatistics", obj);
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
      var today = new Date();
      let age = Math.floor((today - value) / (365.25 * 24 * 60 * 60 * 1000));
      if (age < 18) {
        age = 18;
        this.birthday =
          new Date().getFullYear() -
          18 +
          seperator1 +
          month +
          seperator1 +
          strDate;
      } else {
        this.birthday =
          value.getFullYear() + seperator1 + month + seperator1 + strDate;
      }
      this.formData.age = age;
      console.log(this.birthday, "this.birthday");
      this.formData.birthday = this.birthday;
      // networkRequest("v2", this.saveUmsInfoUrl, {
      //     birthday: this.birthday,
      // }).then((res) => {
      //     if (res.code == 200) {
      //         Toast(res.msg);
      //         this.editData();
      //     } else {
      //         Toast(res.msg);
      //     }
      // });
    },
    avtarClick(x) {
      this.$router.push({
        name: "avatar",
      });
    },
    // 点击age
    Agebirthday() {
      this.showAge = true;
      let obj = {
        event: "HE0002007",
        type: "click",
      };
      this.$store.dispatch("onStatistics", obj);
    },
    // 保存
    save() {
      setTimeout(() => {
        console.log(this.formData, "formDataformData");
        networkRequest("v2", this.saveUmsInfoUrl, this.formData).then((res) => {
          console.log(res, res == null, "成功");
          if (!res) {
            close();
          } else {
            Toast("error");
          }
        });
      }, 500);
    },
    // 返回
    signout() {
      close();
    },
    //头像
    onCancelsavatared() {
      this.avatared = false;
      this.bus.$emit("loading", true);
      chooseAndUpload("image", "1", "false", "true").then((res) => {
        console.log(res, "asda啊实打实");
        if (typeof res.code != undefined) {
          this.bus.$emit("loading", false);
          this.formData.face = res[0].fileUrl;
          // networkRequest("v2", this.saveUmsInfoUrl, {
          //     face: res.data.image,
          // }).then((res) => {
          //     if (res.code == 200) {
          //         this.editData();
          //     } else {
          //         Toast.fail(res.msg);
          //     }
          // });
        } else {
          Toast(res.msg);
        }
      });
    },
    // 语言
    languageClick(x, i) {
      this.indexLanguage = x.dictKey;
      this.formData.language = x.dictKey;
    },
    lang() {
      networkRequest("v2", "/sys/dictData/queryDictListByLanguage", {
        dictType: "first_language",
      }).then((res) => {
        console.log(res);
        if (typeof res.code != undefined) {
          this.lanList = res;
        } else {
          Toast(res.msg);
        }
      });
    },
  },
};
