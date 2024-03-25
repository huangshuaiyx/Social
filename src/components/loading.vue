<template>
  <div class="markbox" v-show="loading">
    <div class="sun-loading">
      <div class="img"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      loading: false,
    };
  },
  created() {
    var that = this;
    this.bus.$on("loading", function (data) {
      that.loading = !!data;
    });
  },
};
</script>

<style lang="scss" scoped>
.markbox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 2003;
  background: rgba(0, 0, 0, 0.3);
}

/*loading开始*/
.sun-loading {
  width: 75px;
  height: 75px;
  display: block;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 15px;

  .img {
    width: 32px;
    height: 32px;
    animation: sunLoading 1s steps(12, end) infinite;
    background: transparent url("../assets/jiazai.png");
    background-size: 100%;
    animation: load 2s linear infinite;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}

@keyframes load {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/*loading结束*/
</style>
