<template>
  <div id="app">
    <!-- <transition group name="slide-fade"> -->
    <router-view v-if="!$route.meta.keepHome" />

    <keep-alive>
      <router-view v-if="$route.meta.keepHome"></router-view>
    </keep-alive>
    <!-- </transition> -->

    <!-- 描点 -->
    <!-- <img class="maodian" src="./assets/icon_top@2x.png" @click="goTo" v-show="imgMao" alt /> -->

    <div @click="goTo" class="maodian" v-if="imgMao">
      <img src="./assets/顶部icon@2x.png" alt />
      <br />顶部
    </div>

    <!-- 淘宝授权 -->
    <authorization v-if="show" :show="show" @changeShow="(v) => (show = v)" />
    <!-- 前往购买 -->
    <purchase
      v-if="show1"
      :show="show1"
      @changeShow="(v) => (show1 = v)"
      :returnMoney="returnMoney"
      :shareUrl="shareUrl"
      :imgType="imgType"
    />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  name: "App",
  methods: {
    goTo() {
      window.scrollTo(0, 0);
    },
    lala() {
      let scrollHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      if (scrollHeight >= 500) {
        this.imgMao = true;
      } else {
        this.imgMao = false;
      }
    },
  },
  //销毁滚动
  beforeDestroy() {
    window.removeEventListener("scroll", this.lala);
  },
  data() {
    return {
      msg: "one.vue",
      currentRouter: "/",
      imgMao: false,
      show: false,
      show1: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.lala, true);
    this.show = false;
    this.show1 = false;
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-size: 16px;
  position: relative;
  .maodian {
    width: 3rem;
    height: 3rem;
    position: fixed;
    bottom: 7.5rem;
    right: 1.5rem;
    border-radius: 50%;
    z-index: 100002;
    img {
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: middle;
      margin-top: 0.4rem;
    }
    font-size: 0.4rem;
    text-align: center;
    background: rgba(255, 255, 255, 0.85);
  }

  .fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: 0.3s;
  }
  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: 0.3s;
  }
  .fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: 0.3s;
  }
  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: 0.3s;
  }
  @keyframes fold-left-in {
    0% {
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fold-left-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
}
</style>
