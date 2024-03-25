<template>
  <div style="height:100%">
    <van-nav-bar title="修改支付宝" left-arrow @click-left="$router.go(-1)" />
    <!-- 支付宝账号 -->
    <div class="zhifubao">
      <van-form @submit="onSubmit" class="from">
        <van-field
          v-model="username"
          name="支付宝账号"
          label="支付宝账号"
          placeholder="请输入支付宝账号（手机/邮箱）"
          :rules="[{ required: true, message: '请填写用户名' }]"
          @focus="focuss"
          :clearable="true"
          @input="input"
        />
        <van-field
          v-model="password"
          name="真实姓名"
          label="真实姓名"
          placeholder="请输入支付宝姓名"
          :rules="[{ required: true, message: '请填写密码' }]"
          @focus="focusd"
          :clearable="true"
          @input="input"
          ref="groupName"
        />
      </van-form>
      <p class="tishi">提示：验证码将发送至您的手机号{{shouji}}</p>
      <van-button class="land" @click="land" round type="info" :disabled="disabled">修改</van-button>
    </div>
  </div>
</template>


<script>
var ob = JSON.parse(localStorage.getItem("jd-webapp"));
var zf = JSON.parse(localStorage.getItem("zf-webapp"));
import { Toast } from "vant";
import { Notify } from "vant";
import Vue from "vue";
Vue.use(Toast);
import {
  sendBindVerifyCode,
  bindPayInfo,
  updateBindPayInfo,
  getBindPayInfo,
} from "@/api/api.js";
export default {
  data() {
    return {
      isyzm: true,
      vcodeBtnName: "获取验证码",
      username: "",
      password: "",
      countDownTimer: "", //定时器
      mobile: "",
      id: new Date().getTime(),
      shouji: "",
      disabled: false, //禁止按钮
      fouc: true,
      sms: "",
    };
  },
  mounted() {
    this.shouji = `${ob && ob.username.substr(0, 3)}****${
      ob && ob.username.substr(7)
    }`;
    if (this.password != "" && this.username != "") {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
    //查询支付宝绑定信息
    getBindPayInfo({
      userId: this.$store.state.userId && this.$store.state.userId,
    }).then((res) => {
      if (res.data.code == 0) {
        let str = res.data.data.payInfoList[0];
        if (str.payAccountInfo != "") {
          this.username = str.payAccountInfo;
          this.password = str.payUsername;
          let long = {
            zhanghao: str.payAccountInfo,
            name: str.payUsername,
            payAccountId: str.payAccountId,
          };
          this.$store.commit("zhanghao", long);
          if (this.password != "" && this.username != "") {
            this.disabled = false;
          } else {
            this.disabled = true;
          }
        }
      } else {
        Toast(res.data.message);
      }
    });
  },
  methods: {
    input() {
      if (this.password != "" && this.username != "") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    inputChange(e) {
      const o = e.target;
      o.value = o.value.replace(/[^\u4E00-\u9FA5]/g, ""); // 清除除了中文以外的输入的字符
      this.password = o.value;
    },
    fan() {
      this.$router.go(-1);
    },
    // 退出
    tui() {
      this.$router.push({ name: "one" });
    },

    onSubmit(values) {
    },
    //获取焦点
    focuss(event) {
      getBindPayInfo({
        userId: this.$store.state.userId && this.$store.state.userId,
      }).then((res) => {
        if (res.data.code == 0) {
          let str = res.data.data.payInfoList[0];
          if (str.payAccountInfo != "") {
            if (event.srcElement.value == str.payAccountInfo) {
              this.username = "";
              if (this.password != "" && this.username != "") {
                this.disabled = false;
              } else {
                this.disabled = true;
              }
            } else {
              this.username = event.srcElement.value;
            }
          }
        }
      });
    },
    focusd(event) {
      getBindPayInfo({
        userId: this.$store.state.userId && this.$store.state.userId,
      }).then((res) => {
        if (res.data.code == 0) {
          let str = res.data.data.payInfoList[0];
          if (str.payAccountInfo != "") {
            if (event.srcElement.value == str.payUsername) {
              this.password = "";
              if (this.password != "" && this.username != "") {
                this.disabled = false;
              } else {
                this.disabled = true;
              }
            } else {
              this.password = event.srcElement.value;
            }
          }
        }
      });
    },
    land(username, password, yanzhengma) {
      updateBindPayInfo({
        payAccountId: zf.payAccountId,
        payUserName: this.password,
        payAccountType: 1,
        payAccountInfo: this.username,
        code: this.yanzhengma,
      }).then((res) => {
        if (res.data.code != 0) {
          Toast(res.data.message);
        } else {
          setTimeout(function () {
            Toast("修改成功");
          }, 1000);
          this.$router.go(-1);
        }
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.sAll {
  display: flex;
}
h4 {
  margin-top: 1rem;
  margin-left: 2.3rem;
  font-size: 1.13rem;
}
.time {
  width: 100%;
  height: 2.75rem;
}
.ok {
  width: 5.81rem;
  height: 2rem;
  border: solid 0.06rem #f0f0f0;
  border-radius: 1rem;
  margin: 1rem 0.75rem 0;
  background: #f0f0f0;
}
.ok img:nth-of-type(1) {
  width: 1rem;
  height: 1rem;
  margin-left: 0.81rem;
  margin-top: 0.5rem;
  vertical-align: sub;
}
.ok span {
  width: 1rem;
  height: 1rem;
  margin-top: 0.2rem;
}
.ok span:nth-of-type(2) {
  text-align: center;
  font-size: 1rem;
  font-weight: 300;
  margin-top: 1rem;
  margin-left: 0.5rem;
  color: #c2c2c2;
}
.zhifubao {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f6f6f6;
}
.van-field {
  width: auto;
  height: 3.63rem;
  border-bottom: solid 1px gainsboro;
  line-height: 2.36rem;
}
.from button {
  width: 6rem;
  height: 1.88rem;
  border-radius: 0.94rem;
  font-size: 0.81rem;
  color: #ff6303;
  border: none;
  background: #ededed;
  // margin-left: 1.5rem;
  // position: absolute;
  // top: 8.2rem;
  // left: 15.58rem;
}
.tishi {
  width: 18.63rem;
  height: 1.25rem;
  font-size: 0.88rem;
  color: #999999;
  margin: 0.5rem 0.75rem;
}
.land {
  width: 21.56rem;
  height: 2.75rem;
  background: #ff6303;
  border-radius: 1.38rem;
  color: white;
  border: none;
  margin: 1.5rem 0.75rem 1rem;
}
::v-deep.van-field--error .van-field__control::-webkit-input-placeholder {
  color: #c8c9cc;
}

::v-deep .van-icon {
  font-size: 1.3rem;
  color: #999;
}

::v-deep .van-nav-bar__text {
  color: #999;
  font-size: 1.49rem;
  margin-left: -1rem;
}
::v-deep .van-field__control {
  line-height: 2.2rem;
  -ms-line-height: 40px;
}
</style>