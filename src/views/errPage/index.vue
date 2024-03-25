<template>
  <div id="err404">
    <van-empty class="custom-image">
      <img src="../../assets/timg.jpg" slot="image" />
    </van-empty>
    <div class="btn_box">
      <van-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="$router.push({name:'homepage'})"
        round
      >返回首页</van-button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "err404",
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
#err404 {
  width: 100%;
  height: 100%;
  background: url('../../assets/xingkong.jpg') no-repeat center/contain;
  background-size: 100%;
  ::v-deep .van-empty__image {
    width: 200px;
    height: 150px;
  }
  .btn_box {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    .van-button {
      width: 100px;
    }
  }
}
</style>