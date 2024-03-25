<template>
  <div class="homepage">
    <!-- 头部 -->
    <header>
      <div class="divinput">
        <input type="text" />
        <p class="divinputP" @click="baseinput">
          <span>
            粘贴
            <img class="icontu" src="../../assets/xin_jingdong@3x.png" alt />
            <img class="icontu" src="../../assets/png_tianmao@2x.png" alt />
            <img class="icontu" src="../../assets/png_tianmao@2x.png" alt />
            <img class="icontu" src="../../assets/xin_pinduoduo@3x.png" alt />
            商品标题
          </span>
          <span>领券享返利</span>
        </p>
        <!-- 消息 -->
        <img class="xiaoxi" @click="xiaoxi" src="../../assets/消息@2xx.png" alt />
        <div v-if="readCount" class="num">{{this.unReadCount}}</div>
      </div>
      <div class="posicon" @click="ReadCount">
        <van-icon size="1rem" name="bars" />
        <span>分类</span>
      </div>
      <van-tabs
        class="van"
        @click="tab"
        v-model="active"
        :animated="true"
        title-inactive-color="#f5f5f5"
      >
        <van-tab style="height:1rem" title="推荐" name="-1"></van-tab>
        <van-tab
          style="height:1rem"
          v-for="(x,i) in arr"
          :key="i"
          :title="x.catName"
          :name=" String(x.catId)"
        ></van-tab>
      </van-tabs>
    </header>
    <center>
      <one v-if="one"></one>
      <two v-if="two" :catId="catId"></two>
    </center>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getPddGoodsCat, newsUnReadCount } from "@/api/api.js";
import one from "../home/one";
import two from "../home/two";
export default {
  name: "homepage",
  data() {
    return {
      arr: [],
      active: "" || this.$store.state.activename,
      one: true,
      two: false,
      catId: "",
      unReadCount: "", //未读消息
      readCount: false,
    };
  },
  //注册
  components: {
    one,
    two,
  },

  methods: {
    //消息
    xiaoxi() {
      if (this.$store.state.token != "") {
        this.$router.push({ name: "news" });
      } else {
        this.$router.push({ name: "register" });
      }
    },
    tab(name, title) {
      window.scrollTo(0, 0);
      this.$store.commit("activename", name);
      if (this.active != "-1") {
        this.catId = name;
        this.two = true;
        this.one = false;
      } else {
        this.one = true;
        this.two = false;
      }
    },
    ReadCount() {
      if (this.$store.state.token == "") {
        this.readCount = false;
      } else {
        if (this.unReadCount != 0) {
          this.readCount = true;
        }
        this.$router.push({ name: "classification" });
      }
    },
    lala() {
      let scrollHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      this.$store.commit("scroll", scrollHeight);
    },
    // 跳转搜索页面
    baseinput() {
      this.$router.push({ name: "seach" });
    },
  },
  mounted() {
    if (this.$store.state.token == "") {
      this.readCount = false;
    } else {
      //查询未读消息数量
      newsUnReadCount().then((res) => {
        if (res.data.data.unReadCount == "") {
          this.readCount = false;
        } else {
          if (res.data.data.unReadCount > 99) {
            this.unReadCount = "99+";
          } else {
            this.unReadCount = res.data.data.unReadCount;
          }
          this.readCount = true;
        }
      });
    }

    window.addEventListener("scroll", this.lala);
    this.active = this.$store.state.activename;
    getPddGoodsCat().then((res) => {
      this.arr = res.data.data.catTree;
      if (res.data.data.catTree != 0) {
        this.$store.commit("CHANGE_LEIMULIST", res.data.data.catTree);
        this.$store.commit("CHANGE_BANNERLIST", res.data.data.indexBar);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  font-size: 16px;
}
.homepage {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
/* 头部 */
header {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  background-image: linear-gradient(45deg, #fe0c05 60%, #ff6303 100%);
  position: fixed;
  top: 0;
  z-index: 100;
}
/* 标题 */
.divinput {
  width: 90%;
  height: auto;
  margin-left: 0.75rem;
  .xiaoxi {
    width: 1.35rem;
    height: 1.5rem;
    position: relative;
    top: 0.4rem;
    right: -0.8rem;
  }
  .num {
    width: 1.2rem;
    height: 0.9375rem;
    border-radius: 0.6rem;
    position: absolute;
    top: 0.5rem;
    right: 0.4rem;
    background: #fff;
    color: #fe0c05;
    font-size: 0.625rem;
    text-align: center;
    line-height: 1rem;
  }
}
/* 搜索框 */
header input {
  width: 19.7rem;
  height: 2.15rem;
  border: solid 1px;
  border-radius: 1.13rem;
  border: none;
  /* padding-left: 2.13rem; */
  margin: 0.56rem auto 0;
  background: url("../../assets/home_icon_search@2x.png") 4% 50% no-repeat white;
  background-size: 1rem 1rem;
}
input::-webkit-input-placeholder {
  position: relative;
  left: 2.13rem;
  font-size: 0.875rem;
}

/* 导航栏 */

::v-deep .van-pull-refresh__head {
  height: 2rem;
}
::v-deep header .van-tabs {
  height: 2rem;
  font-size: 0.88rem;
  background-image: linear-gradient(45deg, #fe0c05 60%, #ff6303 100%);
}
::v-deep .van {
  width: 100%;
  height: auto;
  background-image: linear-gradient(45deg, #fe0c05 60%, #ff6303 100%);
}
::v-deep .van-hairline--top-bottom {
  background-image: linear-gradient(45deg, #fe0c05 90%, #ff6303 100%);
  margin-top: 1rem;
}
::v-deep .van-hairline--top-bottom {
  margin-top: -0.6rem;
}
center {
  width: 100%;
  height: 55.45rem;
  top: 5.8rem;
  position: relative;
  background: #f6f6f6;
}
::v-deep .van-hairline--top-bottom::after {
  border: none;
}
::v-deep .van-tabs__nav {
  background: #fe0c05;
  width: 86%;
}
::v-deep .van-tabs__line {
  width: 1rem !important ;
  height: 0.12rem !important;
  transform: translateX(1.3125rem) translateX(-50%);
  margin-bottom: 0.3rem;
  background: white;
  border-radius: 1rem;
  opacity: 0.8;
  border: none;
}
::v-deep .van-tabs__wrap {
  height: 2.3rem;
  margin-top: 0.8rem;
}

::v-deep .van-tab {
  color: white;
  flex-basis: auto !important;
  margin: 0 0.3rem;
  opacity: 0.9;
}
.icon {
  position: absolute;
  top: 7.9rem;
  right: 0;
  color: white;
  z-index: 900;
  width: 2rem;
  height: 1.5rem;
  background: linear-gradient(top right, #ff6303);
  line-height: 1.4rem;
  text-align: center;
}
.posicon {
  position: absolute;
  top: 3.45rem;
  right: 0;
  color: white;
  z-index: 900;
  width: 3.5rem;
  height: 2.28rem;
  background: #fe0c05;
  line-height: 2.6rem;
  text-align: center;
  font-size: 14px;
  span {
    position: relative;
    top: -0.1rem;
  }
}
.van-icon {
  top: 0.1rem;
}
.divinputP {
  width: 19.0625rem;
  height: 1.4375rem;
  position: absolute;
  top: 1rem;
  left: 3rem;
  font-size: 0.875rem;
  color: #c4c4c4;
  span {
    width: auto;
    img {
      width: 0.875rem;
      height: 0.875rem;
      border-radius: 0.165625rem;
      border: solid 0.7px white;
      margin-left: 0.1rem;
      vertical-align: middle;
    }
  }
}
</style>