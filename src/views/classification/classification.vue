<template>
  <div style="width:100%;height:100%">
    <van-nav-bar title="分类" @click-left="$router.go(-1)">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#444444" />
      </template>
    </van-nav-bar>
    <div class="ridhg">
      <!-- 左侧导航 -->
      <div class="ridhg-left" ref="tabLeft">
        <van-sidebar v-model="activeKey" @scroll="scrollEvents">
          <van-sidebar-item v-for="(x,i) in list" :key="i" :title="x.catName" @click="clickLeft" />
        </van-sidebar>
      </div>
      <!-- 右边 -->
      <div class="ridhg-right" ref="sdsd" @scroll="scrollEvent">
        <div v-for="(y,i) in list" :key="i" class="right-scroll" ref="right">
          <p ref="hfor">{{y.catName}}</p>
          <div class="right-sui">
            <div v-for="(v,i) in y.children" :key="i" class="right-sd">
              <div
                @click="$router.push({name:'commodity',query:
                {id:v.catId,
                name:v.catName
                }
            })"
              >
                <img :src="v.imgUrl" alt />
              </div>
              <p>{{v.catName}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getPddGoodsCat } from "@/api/api.js";
import { Notify } from "vant";
import { scrollToTop } from "@/utils/index.js";
export default {
  data() {
    return {
      activeKey: 0,
      list: [],
      arr: [],
      v: 0,
    };
  },
  created() {
    getPddGoodsCat().then((res) => {
      this.list = res.data.data.catTree;
    });
  },
  mounted: function () {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    clickLeft(i) {
      let obj = this.$refs.right;
      this.$refs.sdsd.scrollTop = 46;
      for (let key in obj) {
        if (i == key) {
          //左侧元素距离顶部的高 = 右侧元素距离顶部的高
          this.$refs.sdsd.scrollTop =
            this.$refs.right[key].getBoundingClientRect().top - 300;
        }
      }
    },
    //左侧导航
    scrollEvents() {},
    //右侧滑动
    scrollEvent() {
      let _this = this;
      let read = _this.$el.querySelector(".ridhg-right");
      let right = _this.$refs.right;
      for (let i in right) {
            this.$store.commit("offsetTop", read.scrollTop);
        if (read.scrollTop >= right[i].offsetTop - 550) {
          this.activeKey = i;
          if (i >= 8) {
            //左侧的高度 = 滚动条距离顶部的高
            this.$refs.tabLeft.scrollTop = this.$refs.sdsd.scrollHeight;
          } else {
            this.$refs.tabLeft.scrollTop = 0;
          }
        }
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/commodity") {
      to.meta.isBack = true;
      next(vm=>{
    let read = vm.$el.querySelector(".ridhg-right");
      read.scrollTop =  vm.$store.state.offsetTop
      })
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
    }
    this.$route.meta.isBack = false;
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title {
  font-size: 1.125rem;
  color: #333333;
}
.ridhg {
  width: 100%;
  height: 94%;
  background: #f0f1f3;
  .ridhg-left {
    font-size: 0.8125rem;
    float: left;
    overflow-y: auto;
    height: 100%;
    width: 5rem;
    box-sizing: border-box;
    background: white;
    overflow-x: hidden;
    ::v-deep .van-sidebar-item--select {
      color: red;
    }
    ::v-deep .van-sidebar-item {
      padding: 0.9rem 0.75rem;
      text-align: center;
      background: white;
      color: #666666;
    }
    ::v-deep .van-sidebar-item--select::before {
      height: 2.7rem;
      width: 0.2rem;
    }
    ::v-deep .van-sidebar-item--select {
      background: #f0f1f3;
    }
  }
  .ridhg-right {
    float: left;
    overflow-y: auto;
    height: 100%;
    width: calc(100% - 5.25rem);
    box-sizing: border-box;
    overflow-x: hidden;
    padding: 0 0.4rem;
    .right-scroll {
      width: 100%;
      margin-left: 0.3rem;
    }
    div {
      margin-bottom: 1rem;
      margin-top: 0.8rem;
      p {
        text-indent: 0.5rem;
        margin: 0.7rem 0;
        font-size: 0.9375rem;
        color: #666666;
      }
      .right-sui {
        width: 98%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        background: white;
        border-radius: 0.5rem;
        .right-sd {
          width: 4.7rem;
          height: auto;
          margin: 0.5rem 0 0 0.7rem;
          padding: 0;
          div {
            width: 2.5rem;
            height: 4.5rem;
            margin: 0.2rem auto 0;
            img {
              width: 3rem;
              height: 3.5rem;
              margin: 0 auto;
            }
          }
          p {
            width: 100%;
            text-align: center;
            font-size: 0.65rem;
            margin-top: 0.6rem;
          }
        }
      }
    }
  }
}
</style>