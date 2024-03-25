<template>
  <div class="fuli">
    <van-nav-bar title="客服微信二维码" @click-left="$router.go(-1)" :border="false">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000" />
      </template>
    </van-nav-bar>
    <div class="erweima">
      <img src="../../assets/orderetails/省购客服二维码@2x.png"  ref="picurl" id="picurl" alt />
      <p>您遇到任何返利方面的问题，都可以联系米橙省购微信客服。</p>
    </div>
    <div class="preservation">
      <div @click="savePic">
        <img src="../../assets/orderetails/保存图片@2x.png" alt />
        <p>保存相册</p>
      </div>
      <div @click="copys" class="tag-read" data-clipboard-text="mcshengo">
        <img src="../../assets/orderetails/复制@2x.png" alt />
        <p>复制</p>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard"; //点击复制
import { Toast } from "vant"; //提示框
export default {
  methods:{
        savePic() {
      var picurl = this.$refs.picurl.src;

      //alert(picurl);
      this.savePicture(picurl);
    },
    savePicture(Url) {
      var blob = new Blob([""], { type: "application/octet-stream" });
      var url = URL.createObjectURL(blob);

      var a = document.createElement("a");

      a.href = Url;

      a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0];
      var e = document.createEvent("MouseEvents");

      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
      URL.revokeObjectURL(url);
    },
     //粘贴复制
      copys(data) {
      var clipboard = new Clipboard(".tag-read");
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
  }
}
</script>

<style lang="scss" scoped>
.fuli {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  .erweima {
    width: 19.9375rem;
    height: 23.0625rem;
    background: white;
    margin: 3rem auto 0;
    img {
      width: 15.9375rem;
      height: 15.9375rem;
      margin: 2rem 2rem 0.9375rem;
    }
    p {
      width: 15.4375rem;
      height: 2.25rem;
      margin: 0 auto;
      font-size: 13px;
      color: #aeaeae;
      text-align: center;
    }
  }
  .preservation{
    width: auto;
    height: auto;
    display: flex;
    justify-content: space-around;
    margin: 2rem 0;
    text-align: center;
    font-size: 12px;
    img{
      width: 2.75rem;
      height: 2.75rem;
    }
    p{
      color: #333;
      margin:  0.5rem 0 0;
    }
  }
}
</style>