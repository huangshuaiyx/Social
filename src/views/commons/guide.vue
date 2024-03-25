<template>
  <div class="guide">
    <button type="submit" @click="$router.push({name:'homepage'})">跳转</button>
    <van-swipe @change="change">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
export default {
  data() {
    return {
      images: [
        require("../../assets/引导页/a.jpg"),
        require("../../assets/引导页/b.jpg"),
        require("../../assets/引导页/c.jpg"),
      ],
    };
  },
  methods: {
    change(index) {
      if (index >= 2) {
        this.$router.push({ name: "homepage" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
html,
body,
#app .guide {
  width: 100%;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100vh;
  }
  button {
    width: 3rem;
    height: 1.5rem;
    color: #999;
    font-size: 1rem;
    border-radius: 1rem;
    background: black;
    opacity: 0.2;
    position: absolute;
    right: 1rem;
    top: 0.5rem;
    z-index: 100;
  }
}
</style>    