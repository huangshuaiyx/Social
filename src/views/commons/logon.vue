<template>
  <div class="big" :class="isad?'animation-fade':''">
    <!-- 头部 -->
    <div class="bigbox">
      <div class="one-one">
        <img @click="fan" src="../../assets/3333.png" alt />
        <h1>欢迎注册</h1>
        <p></p>
      </div>
      <!-- 登录 -->
      <div class="form">
        <p>
          <van-cell-group class="form-p" :border="false">
            <van-field
              v-model="value"
              type="number"
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
              type="number"
               placeholder="请输入验证码"
              v-model="valueone"
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
      <van-button class="land" @click="land"  type="primary" round :disabled="disabled">注册</van-button>
      <!-- 用户协议 -->
      <!-- 用户协议 -->
      <p class="tree">
        注册即表示您已阅读并同意
        <a href="https://url.mc.cn/jAvqEvaa">用户协议</a>
      </p>
      <!-- 弹出框 -->
      <transition name="van-fade">
        <div v-show="visible">验证码已发送</div>
      </transition>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { registerBySms, getSms, createPId } from "@/api/api.js";
export default {
  data() {
    return {
      value: this.$route.query.moblie || "",
      valueone: "",
      showone: false,
      isyzm: true,
      visible: false,
      vcodeBtnName: "获取验证码",
      countDownTimer: "",
      dele: { display: "none" },
      delet: { display: "none" },
      disabled: true, //按钮禁用
      isad: false ,//动画
    };
  },
  mounted() {
    this.isad = true
    if (this.value != "") {
      getSms({
        mobile: this.value,
        type: "1",
      })
        .then((res) => {
          if (res.code == 0) {
            Toast(res.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      // 验证码
      this.isyzm = false;
      this.countNum = 60;
      this.countDownTimer = setInterval(() => {
        this.countNum--;
        this.vcodeBtnName = this.countNum + "s";
        if (this.countNum <= 0) {
          this.isyzm = true;
          clearInterval(this.countDownTimer);
          this.vcodeBtnName = "重新发送";
        }
      }, 1000);
    } else {
      this.disabled = true;
    }
  },
  methods: {
    onInput(value) {},
    onDelete() {
      Toast("删除");
    },
    //手机号
    nameword(value) {
      this.delet = {
        display: "block",
      };
    },
    blurs() {
      this.delet = {
        display: "none",
      };
    },
    focus() {
      this.delet = {
        display: "block",
      };
    },
    //删除内容

    dum() {
      this.delet = {
        display: "none",
      };
      this.valueone = "";
    },
    // 验证码
    name(valueone) {
      this.dele = {
        display: "block",
      };
    },
    blurss() {
      this.dele = {
        display: "none",
      };
    },
    focusw() {
      this.dele = {
        display: "block",
      };
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
    // 注册
    land() {
      registerBySms({
        mobile: this.value,
        type: "1",
        code: this.valueone,
        forget_register: 0,
      })
        .then((res) => {
          if (res.data.code == 0) {
            let obj = {};
            obj.token = res.data.data.token;
            obj.userid = res.data.data.user.id;
            obj.username = res.data.data.user.mobile;
            this.$store.commit("loginchange", obj);
            createPId();
            setTimeout(function () {
              Toast("注册成功");
            }, 1000);
            this.$router.push({
              name: "may",
              query: { name: res.data.data.user.mobile },
            });
          } else {
            Toast(res.data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 返回
    fan() {
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
          type: "1",
        })
          .then((res) => {
            if (res.data.code == 0) {
              Toast(res.data.message);
              // 验证码
              this.isyzm = true;
              this.countNum = 60;
              this.countDownTimer = setInterval(() => {
                this.countNum--;
                this.vcodeBtnName = this.countNum + "s";
                if (this.countNum <= 0) {
                  this.isyzm = true;
                  clearInterval(this.countDownTimer);
                  this.vcodeBtnName = "重新发送";
                }
              }, 1000);
            } else if (res.data.code != 0) {
              return Toast(res.data.message);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.big {
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
}

.bigbox {
  width: 22rem;
  margin: 0 auto;
  margin-top: 1rem;
}
.one-one {
  width: 21rem;
  display: flex;
  justify-content: space-between;
  margin-left: 0.81rem;
}
.one-one img {
  width: 1rem;
  height: 1rem;
  margin-top: 0.87rem;
}
h1 {
  font-size: 1.13rem;
  margin-top: 0.5rem;
}
.one-one p {
  width: 2rem;
  height: 1.38rem;
  font-size: 1rem;
  color: #ff6303;
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
  width: 0.88rem;
  height: 0.88rem;
  margin-top: 1.3rem;
  vertical-align: sub;
}
.fromdelde {
  width: 0.88rem;
  height: 0.88rem;
  position: relative;
  left: 12.5rem;
  top: -3.5rem;
}
.form button {
  width: 6rem;
  height: 1.88rem;
  border-radius: 0.94rem;
  font-size: 0.81rem;
  border: solid 1px #ededed;
  background: white;
  color: #000;
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
  background: #FE0C05;
  border-radius: 1.38rem;
  color: white;
  border: none;
  margin: 2.5rem 0.75rem 1rem 0;
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

.animation-fade {
  animation-name: fade;
  animation-duration: 1s;
  animation-timing-function: linear;
}
@keyframes fade {
  0% {
    right: 0;
      transform: translateX(100%);
  }
  25% {
    right: 100px;
      transform: translateX(100px);
  }
  50% {
   right: 100px;
      transform: translateX(100px);
  }
  75% {
   right: 100px;
      transform: translateX(100px);
  }
  100% {
   right: 100px;
      transform: translateX(100px);
  }
}

</style>