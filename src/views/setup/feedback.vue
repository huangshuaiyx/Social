<template>
  <div class="feedback">
    <!-- 头部 -->
    <van-nav-bar title="问题反馈" @click-left="$router.go(-1)">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
    </van-nav-bar>
    <div class="opinion">
      <textarea
        @input="inputtext"
        name="intro"
        id="content"
        cols="30"
        rows="10"
        maxlength="140"
        autofocus
        placeholder="请在此输入您要反馈的问题或意见..."
        class="text"
      ></textarea>
      <van-uploader v-model="fileList" accept=image/jpeg multiple :max-count="2" />
      <span
        class="span"
      >{{content?content:0}}/140</span>
      <van-divider />
      <van-cell-group :border="false">
        <van-field
          maxlength="11"
          v-model="value"
          placeholder="请留下您的手机号码"
          oninput="value=value.replace(/[^\d]/g,'')"
          :clearable="true"
          @input="input"
        />
      </van-cell-group>
    </div>
    <van-button round type="info" class="land" color="red" @click="land" :disabled="disabled">提交</van-button>
  </div>
</template>

<script>
import { feedback } from "@/api/api.js";
import axios from "axios";
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
//图片转base64
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      value: "",
      content: "",
      fileList: [],
      disabled: false,
      file: {},
    };
  },
  mounted() {
    let content = document.getElementById("content").value;
    var $textarea = $("textarea[name=intro]");
    var html = $textarea.val();
    $textarea.val($(html).text());

    if (this.$store.state.token == "") {
      this.disabled = true;
    }
    if (this.value == "" && content == "") {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  },
  methods: {
    inputtext(value) {
      let content = document.getElementById("content").value.length;
      if (content >= 0) {
        content + 1;
      }
      if (content >= 140) {
        content = 140;
      }
      this.content = content;
    },
    land() {
      if (this.value) {
        var strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        if (strTemp.test(this.value)) {
          return true;
        } else {
          Toast("手机号不合理");
          return false;
        }
      }
      let formData = new FormData();
      formData.append("mobile", this.value);
      formData.append("content", document.getElementById("content").value);
      formData.append("token", this.$store.state.token);
      formData.append("files[]", this.fileList.map((v) => v.file)[0]);
      formData.append("files[]", this.fileList.map((v) => v.file)[1]);
      let config = {
        headers: {
          // 修改请求头
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://121.199.64.112:8080/feedback", formData, config)
        .then(function (res) {
          if (res.data.code == 0) {
            Toast("您的反馈已提交");
            window.history.back();
          } else {
            Toast("提交失败");
          }
        });
    },

    input(value) {
      if (this.value.length >= 11) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.feedback {
  width: 100%;
  height: 100%;
  background: #f0f1f3;
  overflow: hidden;
  margin: 0 auto;
  .opinion {
    width: 90%;
    height: auto;
    background: white;
    margin: 1rem auto;
    position: relative;
    .text {
      width: 90%;
      height: 11.5625rem;
      resize: none;
      margin: 1rem;
      border: none;
    }
    textarea::-webkit-input-placeholder {
      color: #d6d6d6;
      font-size: 0.9375rem;
    }
    .opinio {
      width: 100%;
      height: 10rem;
    }
    .van-uploader {
      margin: 0 0 0 1rem;
    }
    .span {
      width: auto;
      position: absolute;
      top: 18rem;
      right: 1.5rem;
      color: #d6d6d6;
    }
  }
  .land {
    width: 90%;
    margin: 2rem 5% 0;
  }
  ::v-deep .van-cell-group {
    margin-top: -0.7rem;
  }
}
</style>