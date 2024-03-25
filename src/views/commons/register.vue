<template>
  <div class="big">
    <!-- 头部 -->
    <div class="bigbox">
      <div class="one-one">
        <img @click="goback" src="../../assets/icon_cancel@2x.png" alt />
        <h1>米橙省购</h1>
        <p>
          <router-link :to="{'name':'logon'}" tag="li">注册</router-link>
        </p>
      </div>
      <!-- 登录 -->
      <div class="form">
        <p>
          <van-cell-group class="form-p" :border="false">
            <van-field
              v-model="value"
              placeholder="请输入手机号"
              :clearable="true"
              @input="input"
              maxlength="11"
              oninput="this.value=this.value.replace(/[^0-9]/g,'')"
            />
          </van-cell-group>
        </p>
        <p>
          <van-cell-group :border="false">
            <van-field
              class="form-input"
              v-model="valueone"
              placeholder="请输入验证码"
              :clearable="true"
              @input="input"
              maxlength="6"
              oninput="this.value=this.value.replace(/[^0-9]/g,'')"
            >
              <template #button>
                <van-button
                  size="small"
                  round
                  @click="code"
                  v-if="isyzm"
                  type="info"
                >{{vcodeBtnName}}</van-button>
                <van-button v-if="!isyzm" round size="small" type="info">{{vcodeBtnName}}</van-button>
              </template>
            </van-field>
          </van-cell-group>
        </p>
      </div>
      <van-button
        class="land"
        @click="land"
        type="primary"
        color="#FE0C05"
        round
        :disabled="disabled"
      >登录</van-button>
      <!-- 用户协议 -->
      <p class="tree">
        登录即表示您已阅读并同意
        <a href="https://url.mc.cn/jAvqEvaa">用户协议</a>
      </p>
    </div>
    <!-- 第三方 -->
    <div class="inos">
      <van-divider :style="{ borderColor: '#969799',width:'12rem',marginLeft:'6rem'}">
        <span ref="details">其他方式登录</span>
      </van-divider>
      <div>
        <img @click="sign(1)" src="../../assets/sign/QQ登@2x.png" alt />
        <img @click="sign(2)" src="../../assets/sign/微信登@2x.png" alt />
        <img @click="sign(3)" src="../../assets/sign/支付宝登@2x.png" alt />
        <img @click="sign(4)" src="../../assets/sign/淘宝登@2x.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
const wxLogin = (appid, url) => {
  let redirect_uri = encodeURIComponent(url);
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATUS#wechat_redirect`;
};

import { Toast } from "vant";
import {
  getSms,
  loginBySms,
  getRidAndSidByUserId,
  createPId,
  loginByCode,
} from "@/api/api.js";
export default {
  data() {
    return {
      value: "",
      valueone: "",
      isyzm: true,
      vcodeBtnName: "获取验证码",
      delet: false,
      // delet: { display: "none" },
      dele: { display: "none" },
      countDownTimer: "",
      disabled: true, //按钮禁用 
    };
  },

  methods: {
    //第三方登录
    sign(x) {
      if (x == 1) {
      } else if (x == 2) {
        wxLogin("wx71467564ce045e9a", "http://whc.mouhua.cn/mobile/v-accredit");
      } else if (x == 3) {
      } else if (x == 4) {
        window.location.href = 'https://oauth.taobao.com/authorize?response_type=code&client_id=30191213&redirect_uri=http://192.168.1.215:8080&state=1212&view=wap`'
      }
    },
    //手机号
    nameword(value) {},
    // 验证码
    name(valueone) {},

    // 登录
    land() {
      loginBySms({
        mobile: this.value,
        code: this.valueone,
      })
        .then((res) => {
          if (res.code == 0) {
            Toast(res.data.message);
          } else if (res.data.message == "首次登录") {
            Toast("账号尚未注册");
          } else if (res.data.message == "登录成功") {
            setTimeout(function () {
              Toast("登录成功");
            }, 1000);
            let obj = {};
            obj.token = res.data.data.token;
            obj.userid = res.data.data.user.id;
            obj.username = res.data.data.user.mobile;
            this.$store.commit("loginchange", obj);
            createPId();
            return obj;
          } else {
            Toast(res.data.message);
          }
        })
        .then((obj) => {
          if (obj.code != 2) {
            // 登录成功之后检测是否绑定淘宝
            getRidAndSidByUserId().then((res) => {
              if (res.data.message == "成功") {
                obj.trelationId = res.data.data.trelationId;
              } else {
                obj.trelationId = "";
              }
              this.$store.commit("loginchange", obj);
              this.$router.go(-1);
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    input() {
      if (this.value.length == 11 && this.valueone.length == 6) {
        var strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        if (strTemp.test(this.value)) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      } else {
        this.disabled = true;
      }
      if (this.value) {
        this.delet = {
          display: "block",
        };
      }
      if (this.valueone) {
        this.dele = {
          display: "block",
        };
      }
    },
    //失去焦点
    blurs() {
      this.delet = false;
    },
    blurss() {},
    focus(x) {
      if (x == "") {
        this.delet = false;
      } else {
        this.delet = true;
      }
    },
    focusw() {},
    // 清除手机号
    dums() {
      this.value = "";
    },
    dump() {
      this.valueone = "";
    },
    // 返回我的页面
    goback() {
      this.$router.go(-1);
    },
    // 获取验证码
    code() {
      if (this.value == "") {
        Toast("请输入完整的手机号码");
      } else if (this.value.length < 11) {
        Toast("请输入完整的手机号码");
      } else {
        getSms({
          mobile: this.value,
          type: "2",
        }).then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.registered == false) {
              this.$router.push({
                name: "logon",
                query: { moblie: this.value },
              });
              setTimeout(function () {
                Toast("请先注册");
              }, 1000);
            } else {
              Toast("短信发送成功");
              this.isyzm = false;
              this.countNum = 60;
              this.countDownTimer = setInterval(() => {
                this.countNum--;
                this.vcodeBtnName = this.countNum + "s";
                if (this.countNum <= 0) {
                  this.isyzm = true;
                  this.countNum = 0;
                  clearInterval(this.countDownTimer);
                  this.vcodeBtnName = "重新发送";
                }
              }, 1000);
            }
          } else {
            Toast(res.data.message);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.big {
  position: relative;
  width: 100%;
}

.bigbox {
  width: 22rem;
  margin: 1rem auto 0;
}
.one-one {
  width: 98%;
  display: flex;
  justify-content: space-between;
  margin-left: 0.81rem;
}
.one-one img {
  width: 1rem;
  height: 1rem;
  margin-top: 0.73rem;
}
h1 {
  font-size: 1.13rem;
  margin-top: 0.5rem;
}
.one-one p {
  width: 2.5rem;
  height: 1.38rem;
  font-size: 1rem;
  color: #ff6303;
  list-style: none;
  margin-top: 0.5rem;
}
.form {
  margin: 5rem 0.75rem 0;
  position: relative;
}
.form p {
  width: 20.94rem;
  height: 3rem;
  margin-top: 2rem;
  position: relative;
}
.form img {
  width: 1.13rem;
  height: 1.13rem;
  margin-top: 1.3rem;
  vertical-align: sub;
}

.form button {
  width: 6rem;
  height: 1.88rem;
  border-radius: 0.94rem;
  font-size: 0.81rem;
  border: solid 1px #ededed;
  color: #000;
  background: white;
  margin-left: 0.5rem;
}
.form-p .van-field {
  width: 20rem;
  height: 3rem;
  border: solid 1px white;
  border-bottom-color: gainsboro;
  background: url("../../assets/sign_icon_account@2x.png") 0% 50% no-repeat;
  background-size: 1.13rem 1.13rem;
  padding-left: 2rem;
}
.form-input {
  width: 20rem;
  height: 3rem;
  border: solid 1px white;
  border-bottom-color: gainsboro;
  background: url("../../assets/sign_icon_key@2x.png") 0% 50% no-repeat;
  background-size: 1.13rem 1.13rem;
  padding-left: 2rem;
}
.form-p img {
  position: absolute;
  top: 0;
  left: 20rem;
}
.fromdelde {
  width: 1.13rem;
  height: 1.13rem;
  position: relative;
  left: 12.5rem;
  top: -3.8rem;
}
.tree {
  width: 13rem;
  height: 1.06rem;
  font-size: 0.75rem;
  margin: 0 auto;
}
a {
  color: #236de7;
}
.land {
  width: 21.56rem;
  height: 2.75rem;
  border-radius: 1.38rem;
  color: white;
  border: none;
  margin: 2.5rem 0.75rem 1rem 0;
  text-align: center;
}
an-cell-group {
  display: flex;
}
.look {
  width: 100%;
  height: 20rem;
  border: solid 1px;
  box-sizing: border-box;
}
.inos {
  width: 100%;
  height: auto;
  margin-top: 5rem;
  div {
    width: 80%;
    margin: 1rem auto 0;
    display: flex;
    justify-content: space-around;
    img {
      width: 2.75rem;
      height: 2.75rem;
    }
  }
}
</style>