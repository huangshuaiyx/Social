<template>
  <div style="height:100%">
    <van-nav-bar title="绑定支付宝" left-arrow @click-left="$router.go(-1)" />
    <!-- 支付宝账号 -->
    <div class="zhifubao">
      <van-form @submit="onSubmit" class="from">
        <van-field
          class="input"
          v-model="username"
          name="支付宝账号"
          label="支付宝账号"
          placeholder="请输入支付宝账号（手机/邮箱）"
          :rules="[{ required: true, message: '请填写用户名' }]"
          :error="false"
          :clearable="true"
          @input="input"
        />
        <van-field
          v-model="password"
          name="真实姓名"
          label="真实姓名"
          placeholder="请输入支付宝姓名"
          :rules="[{ required: true, message: '请填写密码' }]"
          :clearable="true"
          @input="input"
        />
        <!-- <van-field   v-model="yanzhengma"
          type="number"
          name="验证码"
          label="验证码"
          :rules="[{ required: true, message: '验证码' }]"
          maxlength="6"
          :clearable="true"
          @input="input"
          placeholder="请输入验证码">
          <template #button>
            <van-button size="small" round  @click="code" v-if="isyzm" type="info">{{vcodeBtnName}}</van-button>
            <van-button v-if="!isyzm" round  size="small" type="info">{{vcodeBtnName}}</van-button>
          </template>
        </van-field> -->

        <!-- <button @click="code" v-if="isyzm">{{vcodeBtnName}}</button>
        <button v-if="!isyzm">{{vcodeBtnName}}</button> -->
      </van-form>
      <p class="tishi">提示：验证码将发送至您的手机号{{shouji}}</p>
      <van-button class="land" @click="land" round type="info" :disabled="disabled">绑定</van-button>
    </div>
  </div>
</template>
s

<script>
var ob = JSON.parse(localStorage.getItem("jd-webapp"));
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
import { sendBindVerifyCode, bindPayInfo } from "@/api/api.js";
export default {
  data() {
    return {
      isyzm: true,
      vcodeBtnName: "获取验证码",
      username: "",
      password: "",
      countDownTimer: "",
      yanzhengma: "",
      mobile: "",
      id: new Date().getTime(),
      shouji: "",
      disabled: true, //禁用
    };
  },
  mounted() {
    this.shouji = `${ob && ob.username.substr(0, 3)}****${
      ob && ob.username.substr(7)
    }`;
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
        }
      } else {
        Toast(res.data.message);
      }
    });
  },
  methods: {
    input() {
      if (this.password && this.username ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
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
    land(username, password, yanzhengma) {
      if (this.username == "" && this.password == "" && this.yanzhengma == "") {
        Toast("请输入内容");
      } else {
        bindPayInfo({
          userId: ob.userId, //用户id
          payUserName: this.password, //名称
          payAccountInfo: this.username, //账号
          payAccountType: "1", //类型
          code: this.yanzhengma, //验证码
        }).then((res) => {
          if (res.data.code == 0) {
            let long = {
              zhanghao: this.username,
              name: this.password,
            };
            this.$store.commit("zhanghao", long);
            this.$router.go(-1);
            setTimeout(function () {
              Toast("绑定成功");
            }, 1000);
          } else {
            if (res.data.message == "验证码输入有误，请检查") {
              Toast("验证码输入有误，请检查");
            } else {
              Toast(res.data.message);
            }
          }
        });
      }
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
}
.van-field {
  width: auto;
  height: 3.53rem;
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
  font-size: 1.2rem;
  margin-left: -1rem;
}
::v-deep .van-field__control {
  line-height: 2.15rem;
  -ms-line-height: 40px;
}

</style>