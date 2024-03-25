<template>
  <div class="Officialtutor">
    <!-- 头部 -->
    <div class="hear">
      <van-icon
        @click="$router.go(-1)"
        name="arrow-left"
        size="25"
        color="#fff"
      />
    </div>
    <div class="title">
      <img src="../../assets/zhuanzhuan/标题@2x.png" alt="" />
      <p>想自己网购一年省几千？</p>
      <p>想买商品苦于无优惠券？</p>
      <p>想0元投资，每个月赚几千上万？</p>
      <div class="titleDiv">
        <span>在线微信导师，不厌其烦，告诉你以上秘籍</span>
      </div>
      <img class="img" src="../../assets/zhuanzhuan/优惠@2x.png" alt="" />
    </div>
    <div class="exclusive">
      <p class="exclusivePone">专属导师微信：michenggo</p>
      <button
        class="tag-read"
        data-clipboard-text="michenggo"
        @click="copys"
      >
        复制微信号
      </button>
      <p class="exclusivePtwo">导师在线时间：周一~周六 9:00-18:30</p>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard"; //点击复制
import { Toast } from "vant"; //提示框
export default {
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
.Officialtutor {
  width: 100%;
  height: 100%;
  background: url("../../assets/zhuanzhuan/背景@2x.png") no-repeat 100% 100%;
  .hear {
    height: 2.75rem;
    position: relative;
    top: 0;
    .van-icon {
      margin-top: 0.8rem;
    }
  }
  .title {
    width: 100%;
    height: auto;
    text-align: center;
    font-size: 0.8125rem;
    color: #fff7cf;
    p {
      margin: 0.75rem 0;
    }
    img {
      width: 15.625rem;
      height: 5.6875rem;
    }
    .img {
      width: 19.25rem;
      height: 12.375rem;
    }
    .titleDiv {
      width: 16.8125rem;
      height: 4rem;
      background: url("../../assets/zhuanzhuan/对话框@2x.png") no-repeat
        center/contain;
      margin: 0 auto;
      color: #e83a2c;
      position: relative;
      font-size: 0.5rem;
      span {
        position: absolute;
        left: 1.3rem;
        top: 1.4rem;
      }
    }
  }
  .exclusive {
    width: 20.6875rem;
    height: 10.9375rem;
    background: #fff;
    border-radius: 0.5rem;
    margin: 1.375rem auto 0;
    text-align: center;
    .exclusivePone {
      padding: 1.875rem 0 0;
      font-size: 0.9375rem;
    }
    button {
      width: 12.125rem;
      height: 2.75rem;
      background: #ff3833;
      border-radius: 1.375rem;
      color: #fff;
      border: none;
      margin: 1rem 0;
    }
    .exclusivePtwo {
      color: #555;
      font-size: 0.8125rem;
    }
  }
}
</style>