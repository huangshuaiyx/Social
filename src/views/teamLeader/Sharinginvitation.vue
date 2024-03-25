<template>
  <div class="Sharinginvitation">
    <van-nav-bar title="分享邀请" @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#333" />
      </template>
    </van-nav-bar>

    <van-swipe
      :width="300"
      :height="600"
      :show-indicators="false"
      @change="changes"
      :stop-propagation="false"
    >
      <van-swipe-item
        v-for="(image, index) in images"
        :key="index"
        :class="{ swipeItem: index == i }"
      >
        <img v-lazy="image.posterUrl" />
        <p>
          <img src="../../assets/位图@2x.png" alt="" />
          <br />
          <span>{{ defaultInvitationCode }}</span>
        </p>
      </van-swipe-item>
    </van-swipe>
    <van-button
      class="button"
      round
      type="info"
      :data-clipboard-text="this.appDownloadUrl"
      @click="copys"
      >复制链接</van-button
    >
    <van-button round type="info" @click="poster">分享海报</van-button>
  </div>
</template> 

 
<script>
import { invitationPoster } from "@/api/api.js";
import { ImagePreview } from "vant";
import Clipboard from "clipboard"; //点击复制
import { Toast } from "vant";
let instance;
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      images: [],
      defaultInvitationCode: "",
      appDownloadUrl: "",
      i: "",
    };
  },
  mounted() {
    invitationPoster().then((res) => {
      this.images = res.data.data.posterList;
      this.defaultInvitationCode = res.data.data.defaultInvitationCode;
      this.appDownloadUrl = res.data.data.appDownloadUrl;
    });
  },
  methods: {
    //粘贴复制
    copys(data) {
      var clipboard = new Clipboard(".button");
      clipboard.on("success", (e) => {
        Toast("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        Toast("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    poster() {},
    changes(index) {
      this.images.forEach((x, i) => {
        if (index == i) {
          this.i = i;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Sharinginvitation {
  width: 100%;
  height: 100%;
}
.van-swipe {
  width: 100%;
  .swipeItem {
    width: 100%;
    margin-left: 2.3rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
    }
  }
}

.van-button {
  width: 10rem;
  height: 3rem;
  background: red;
  border: none;
  margin-left: 1rem;
  margin-top: 2rem;
}
.button {
  width: 10rem;
  height: 3rem;
  background: orange;
  border: none;
  margin-left: 1rem;
  margin-top: 2rem;
  z-index: 100;
}
p {
  width: 6.25rem;
  height: 6.25rem;
  position: absolute;
  bottom: 3rem;
  left: 6rem;
  text-align: center;
  color: #fff;
  img {
    padding: 0.2rem;
    background: #fff;
    border-radius: 0;
  }
  span {
    width: 6.6rem;
    height: 1.2rem;
    line-height: 1.3rem;
    font-size: 0.625rem;
    border-radius: 0.6rem;
    color: #333;
    display: block;
    background: #fff;
  }
}
</style>