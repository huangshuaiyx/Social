<template>
  <div class="name">
    <div class="modify">
      <van-icon size="1.5rem" name="arrow-left" @click="$router.go(-1)" />
      <span>修改昵称</span>
    </div>
    <van-cell-group>
      <van-field v-model="value" maxlength="10" :clearable="true" @input="input" />
    </van-cell-group>
    <p>10个字符以内，支持中英文</p>
    <van-button round type="info" size="large" @click="to(value)" :disabled="disabled">保存</van-button>
  </div>
</template>

<script>
let ob = JSON.parse(localStorage.getItem("jd-webapp"));
import { changeHeadIcon2, changeBaseInfo } from "@/api/api.js";
import { Toast } from "vant";

export default {
  
  data() {
    return {
      value: "",
      disabled: false,
    };
  },

  mounted() {
    this.value = this.$route.query.name;
  },
  methods: {
    to(value) {
      var re1 = new RegExp("^[a-zA-Z\u4e00-\u9fa5]+$"); //只包括英文字母与汉字
      if (!re1.test(value)) {
        Toast("只能输入中英文");
        return false;
      }
      if (value) {
        changeBaseInfo({
          nickName: value,
          token: ob.token,
        }).then((res) => {
          if (res.data.code == 0) {
             setTimeout(function () {
              Toast("修改成功");
            }, 1000);
            this.$router.push({ name: "mine" });
          }
        });
      } else {
        Toast("内容不能为空");
      }
      return true;
    },
    input(value) {
      if (value == "") {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      if (value.length >= 10) {
        Toast("最多输入10位");
      }
    },
  },
    

};
</script>


<style lang="scss" scoped>
.name {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  .modify {
    width: 100%;
    height: 3rem;
    margin-top: 0.5rem;
    line-height: 3rem;
    span {
      margin-left: 35%;
    }
  }
  p {
    font-size: 0.7rem;
    padding: 0 0.5rem;
    color: gray;
  }
  .van-button--large {
    width: 90%;
    height: 2.2rem;
    margin: 1rem 0 0 5%;
    background: red;
    border: none;
  }
}
</style>