<template>
  <div id="app">
    <!-- <transition :name="transitionName">
      <router-view />
    </transition> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <loading></loading>
  </div>
</template>

<script>
import loading from "./components/loading.vue";
import "babel-polyfill";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },

  components: { loading },
  data() {
    return {
      transitionName: "",
    };
  },
  mounted() {
    // this.bus.$emit("loading", true);
    // setTimeout(() => {
    //   this.bus.$emit("loading", false);
    // }, 1000);
  },
  methods: {},
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background: none;
}
// 隐藏滚动条
#app::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;
}

#app {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
</style>
