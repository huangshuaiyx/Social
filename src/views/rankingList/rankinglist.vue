<template>
  <div id="rankinglist" :style="{backgroundImage:'url('+require('../../assets/paihang.png')+')'}">
    <img class="rankinglistImg" src="../../assets/png_jingxuan@2x.png" alt />
    <div class="selected">
      <div @click=" selected('3')" ref="selected" class="selectedDiv" v-if="activesd != 3">
        <img src="../../assets/png_youhui_0@2x.png" alt />
        <span>优惠榜</span>
      </div>

      <div ref="selected" class="selecteddiv" v-if="activesd == 3">
        <p style="marginTop:1.5rem">
          <img src="../../assets/png_youhui_1@2x.png" alt />
        </p>
        <div style="marginTop:1.5rem">
          <span>优惠榜</span>
          <br />
          <span style="font-size:0.69rem">大额券超便宜</span>
        </div>
        <div class="sanJiao"></div>
      </div>

      <div @click="selected('1')" ref="selected" class="selectedDiv" v-if="activesd != 1">
        <img src="../../assets/png_gaofan_0@2x.png" alt />
        <span>高返榜</span>
      </div>

      <div ref="selected" class="selecteddiv" v-if="activesd == 1">
        <p style="marginTop:1.5rem">
          <img src="../../assets/png_gaofan_1@2x.png" alt />
        </p>
        <div style="marginTop:1.5rem">
          <span>高返榜</span>
          <br />
          <span style="font-size:0.69rem">返利高达80%</span>
        </div>
        <div class="sanJiaotwo"></div>
      </div>

      <div @click="selected('2')" ref="selected" class="selectedDiv" v-if="activesd != 2">
        <img src="../../assets/png_xiaoliang_0@2x.png" alt />
        <span>销量榜</span>
      </div>

      <div ref="selected" class="selecteddiv" v-if="activesd == 2">
        <p style="marginTop:1.5rem">
          <img src="../../assets/png_xiaoliang_1@2x.png" alt />
        </p>
        <div style="marginTop:1.5rem">
          <span>销量榜</span>
          <br />
          <span style="font-size:0.69rem">精选热卖好物</span>
        </div>
        <div class="sanJiaoone"></div>
      </div>
    </div>
    <!-- 排行 -->
    <div class="selectedList" ref="selectedList">
      <!-- 淘宝 京东 -->
      <van-tabs
        v-model="activeName"
        line-width="1.5rem"
        title-active-color="#fe0c05"
        @click="clickTab"
        line-height="0.1rem"
      >
        <van-tab title="淘宝" name="2"></van-tab>
        <van-tab title="京东" name="3"></van-tab>
        <van-tab title="拼多多" name="1"></van-tab>
      </van-tabs>

      <!-- 商品 -->
      <div class="shop">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多啦~"
            @load="onLoad"
            :immediate-check="true"
          >
            <figure v-for="(x,i) of list" :key="i" @click="homepage(x)">
              <div class="bang" v-show="i == 0">{{i + 1}}</div>
              <div class="bang" v-show="i == 1">{{i + 1}}</div>
              <div class="bang" v-show="i == 2">{{i + 1}}</div>
              <div class="bang" v-show="i > 2 && i < 10">{{i + 1}}</div>
            <!-- 商品默认图 -->
          <img class="good-one" v-if="x.thumbnailUrl == ''" src="../../assets/shop.png"  alt />
          <!-- 商品图片 -->
          <img class="good-one" v-else :src="x.thumbnailUrl" alt />
              <figcaption>
                <span class="omit">
                  <img
                    class="icon"
                    v-if="x.dataSource == '2' && x.userType != '1'"
                    src="../../assets/png_taobao@2x.png"
                    alt
                  />
                  <!-- 拼多多图标 -->
                  <img
                    class="icon"
                    v-if="x.dataSource == '1'"
                    src="../../assets/png_pinduoduo@2x.png"
                    alt
                  />
                  <!-- 京东图标 -->
                  <img
                    class="icon"
                    v-if="x.dataSource == '3'"
                    src="../../assets/png_jingdong@2x.png"
                    alt
                  />
                  <!-- 天猫图标 -->
                  <img
                    class="icon"
                    v-if="x.dataSource == '2' && x.userType == '1'"
                    src="../../assets/png_tianmao@2x.png"
                    alt
                  />
                  {{x.goodsName}}
                </span>
                <p class="good-for">
                  <span
                    class="good-two"
                    v-if="x.couponDiscount && x.couponDiscount != 0"
                  >{{x.couponDiscount}}元券</span>
                  <span class="good-teer">返{{x.returnMoney}}元</span>
                </p>
                <p style="color:#fe0c05;font-size:0.69rem" class="goog-five">
                  返后价 ¥
                  <span style="font-size:18px">
                    {{(
                    (x.originalPrice)-Number(x.couponDiscount)-Number(x.returnMoney)).toFixed(2)}}
                  </span>
                </p>
                <p class="good-six" style="color:gray">
                  <span>
                    原价¥<s>{{ x.originalPrice }}</s>
                  </span>
                  <span class="sales">月销{{x.strVolume}}</span>
                </p>
              </figcaption>
            </figure>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <!-- 置顶 -->
    <div class="paiHang" v-if="paihang" ref="paiHang">
      <van-tabs
        v-model="activesd"
        line-width="0"
        title-active-color="#fff"
        @click="selectseds"
        title-inactive-color="#fff"
        background="#fe0c05"
      >
        <van-tab title="优惠榜" name="3"></van-tab>
        <van-tab title="高返榜" name="1"></van-tab>
        <van-tab title="销量榜" name="2"></van-tab>
      </van-tabs>
    </div>
    <!-- 淘宝,拼多多  置顶-->
    <div class="jtp-zhi" v-if="jtpZhi" ref="tabsd">
      <van-tabs
        v-model="activeName"
        @click="clickJdt"
        line-width="1.5rem"
        line-height="0.2rem"
        title-active-color="red"
      >
        <van-tab title="淘宝" name="2"></van-tab>
        <van-tab title="京东" name="3"></van-tab>
        <van-tab title="拼多多" name="1"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import Vue from "vue";
Vue.use(Toast);
import { getRankingGoods, getGoodsDetails } from "@/api/api.js";
export default {
  data() {
    return {
      activeName: "2", //淘宝京东  置顶前
      activesd: 3 | this.$store.state.active, //榜单
      formData: {
        page: 0,
        dataSource: this.$store.state.actives || "2",
        rankingType: this.activesd || "3",
      },
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      paihang: false,
      imgMao: false,
      jtpZhi: false,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.scrollChange);
  },
  methods: {
    //置顶前点击
    selected(x) {
      this.activesd = x;
      this.list = [];
      this.$store.commit("active", x);
      this.formData.page = 0;
      this.formData.rankingType = x;
      this.onLoad();
    },
    //置顶后点击
    selectseds(name) {
      this.list = [];
      this.formData.page = 0;
      this.formData.rankingType = name;
      this.onLoad();
      window.scrollTo(0,0)

    },
    //回顶部
    goTo() {
      window.scrollTo(0, 0);
    },
    // 下拉上拉
    onLoad() {
      this.formData.page++;
      getRankingGoods({
        page: this.formData.page++,
        rankingType: this.formData.rankingType,
        dataSource: this.formData.dataSource,
      })
        .then((res) => {
          this.loading = false;
          this.refreshing = false;
          if (res.data.data.goodsList) {
            if (this.page == 1) {
              this.list = res.data.data.goodsList;
            } else {
              this.list = this.list.concat(res.data.data.goodsList);
            }
          } else {
            this.finished = true;
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    //下拉加载
    onRefresh() {
      this.page = 0;
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    //京东,淘宝Tab栏
    clickTab(name) {
      this.list = [];
      this.formData.dataSource = name;
      this.formData.page = 0;
      this.$store.commit("actives", name);
      this.onLoad();
         window.scrollTo(0,0)
    },
    //京东 淘宝  置顶后
    clickJdt(name) {
      this.list = [];
      this.formData.dataSource = name;
      this.formData.page = 0;
      this.onLoad();
      window.scrollTo(0,0)
    },
    //滚动条
    scrollChange() {
      let scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop;
      //排行榜
      if (scrollHeight >= 180) {
        this.paihang = true;
      } else {
        this.paihang = false;
      }
      //置顶图片
      if (scrollHeight >= 500) {
        this.imgMao = true;
      } else {
        this.imgMao = false;
      }
      //榜单..
      if (scrollHeight >= 270) {
        this.jtpZhi = true;
      } else if (scrollHeight <= 270) {
        this.jtpZhi = false;
      }
      //京东,淘宝..
      let scroll = scrollHeight - this.i;
      this.i = scrollHeight;
      if (scroll < 0) {
        this.$refs.tabsd.style.position = "fixed";
        this.$refs.tabsd.style.top = "2.7rem";
        this.$refs.tabsd.style.width = "100%";
      } else {
        this.$refs.tabsd.style.position = "fixed";
        this.$refs.tabsd.style.top = "-3rem";
        this.$refs.tabsd.style.width = "100%";
      }
    },
    // 首页点击商品
    homepage(x) {
      this.returnMoney = x.returnMoney;
      this.$router.push({
        name: "details",
        query: {
          obj:x, //全部参数
          imgUrlArr: x.imgUrlArr,
          goodsName: x.goodsName,
          mallName: x.mallName,
          originalPrice: x.originalPrice,
          returnMoney: x.returnMoney,
          dataSource: x.dataSource,
          strVolume: x.strVolume,
          discountPrice: x.discountPrice,
          couponStartTime: x.couponStartTime || "",
          couponEndTime: x.couponEndTime || "",
          couponDiscount: x.couponDiscount,
          userType: x.userType,
          jdCouponUrl: x.jdCouponUrl,
          goodsUrl: x.goodsUrl,
          goodsId: x.goodsId,
          shareUrl: x.shareUrl,
        },
      });
    },
  },
  //销毁滚动
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollChange);
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/details") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
          this.list = []
          this.onLoad()
    }
    this.$route.meta.isBack = false;
  },
};
</script>


<style lang="scss" scoped>
#rankinglist {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100%;
  color: white;
  text-align: center;
  .rankinglistImg {
    width: 9.0625rem;
    height: 2.375rem;
    margin-top: 4.25rem;
  }
  //榜
  .selected {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    margin-top: 2.5rem;
    .selectedDiv {
      width: 6.3125rem;
      height: 3.9375rem;
      background: linear-gradient(to right, #fffdf9, #fff0d1);
      border-radius: 0.5rem;
      color: #ff7f00;
      line-height: 3.9rem;
      img {
        width: 35px;
        height: 34px;
        vertical-align: middle;
      }
    }
    .selecteddiv {
      width: 7.8125rem;
      height: 4.8125rem;
      background: linear-gradient(to right, #fffcfc, #ffd6d5);
      border-radius: 0.5rem;
      color: #fe0c05;
      line-height: 4.8rem;
      margin-bottom: 0.5rem;
      img {
        width: 2.3125rem;
        height: 2.0625rem;
        vertical-align: middle;
      }
    }
    .selecteddiv {
      width: 7.8125rem;
      height: 4.8125rem;
      background-image: linear-gradient(top, #fffcfc, #ffd6d5);
      border-radius: 0.5rem;
      color: #fe0c05;
      display: flex;
      line-height: 1rem;
      margin-top: -0.9rem;
      position: relative;
      text-align: center;
      img {
        width: 2.3125rem;
        height: 2.0625rem;
        margin-left: 0.5rem;
      }
    }
    //小三角
    .sanJiaotwo {
      width: 0px;
      height: 0px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent yellow transparent;
      border-style: solid dashed dashed dashed;
      border-color: #ffd6d5 transparent transparent transparent;
      position: absolute;
      top: 4.8rem;
      left: 2rem;
    }
    .sanJiao {
      width: 0px;
      height: 0px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent yellow transparent;
      border-style: solid dashed dashed dashed;
      border-color: #ffd6d5 transparent transparent transparent;
      position: absolute;
      top: 4.8rem;
      left: 2rem;
    }
    .sanJiaoone {
      width: 0px;
      height: 0px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent yellow transparent;
      border-style: solid dashed dashed dashed;
      border-color: #ffd6d5 transparent transparent transparent;
      position: absolute;
      top: 4.8rem;
      left: 2rem;
    }
  }
  //排行
  .selectedList {
    width: 21.9375rem;
    min-height: 200%;
    margin: 0 auto;
    border-radius: 0.75rem;
    margin-top: 1rem;
    background: white;
    padding: 0 0.5rem;
    .van-tabs {
      ::v-deep .van-tabs__wrap {
        border-radius: 0.75rem;
        ::v-deep.van-tabs__line {
          margin-bottom: 0.3rem;
          bottom: 1.2rem;
        }
      }
    }
    .shop {
      width: 100%;
      height: 82%;
      margin-top: 0.5rem;
      margin-bottom: 2.4rem;
      ::v-deep .van-tabs__content {
        background: #f6f6f6;
      }
      figure {
        display: flex;
        margin-top: 1rem;
        position: relative;
        .bang {
          width: 1.5rem;
          height: 1.8125rem;
          text-align: center;
          line-height: 1.8125rem;
          font-size: 1.125rem;
          color: #fff;
          position: absolute;
          top: 0;
          left: 0;
          &:nth-of-type(1) {
            background: url("../../assets/bang_one@2x.png") no-repeat
              center/cover;
          }
          &:nth-of-type(2) {
            background: url("../../assets/bang_two@2x.png") no-repeat
              center/cover;
          }
          &:nth-of-type(3) {
            background: url("../../assets/bang_three@2x.png") no-repeat
              center/cover;
          }
          &:nth-of-type(4) {
            width: 1.25rem;
            height: 1.5rem;
            font-size: 0.875rem;
            line-height: 1.5rem;
            background: url("../../assets/bang_four@2x.png") no-repeat
              center/cover;
          }
        }
        figcaption {
          margin-left: 1rem;
          border-bottom: solid 0.02rem #f6f6f6;
        }
        .good-one {
          width: 8.25rem;
          height: 8.25rem;
          margin-left: 0;
          border-top-left-radius: 0.3rem;
          border-top-right-radius: 0.3rem;
          display: block;
          flex-shrink: 0;
        }
        .good-two {
          width: 3.25rem;
          height: 1.13rem;
          line-height: 1.13rem;
          background: url("../../assets/png_bg_quan@2x.png") no-repeat
            center/contain;
          background-size: 100%;
          display: block;
          text-align: center;
          padding: 0 0.2rem;
        }
        .good-teer {
          width: auto;
          height: 1.13rem;
          padding: 0 0.2rem;
          line-height: 1.13rem;
          border-radius: 0.25rem;
          display: block;
          background: #fe7f02;
          text-align: center;
        }
        .good-for {
          display: flex;
          text-align: center;
          font-size: 0.63rem;
          color: white;
          margin-top: 0.6rem;
          text-align: left;
          width: auto;
        }
        .good-for span:nth-of-type(2) {
          margin-left: 0.6rem;
        }
        .goog-five {
          margin: 0.5rem 0 0.2rem;
          text-align: left;
        }
        .good-six {
          font-size: 0.75rem;
          display: flex;
          justify-content: space-between;
        }
        .icon {
          width: 0.88rem;
          height: 0.88rem;
          vertical-align: middle;
        }
        .omit {
          display: -webkit-box !important;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 0.78rem;
          color: #333333;
          text-align: left;
          margin-top: 0.3rem;
        }
      }
    }
  }
  //置顶
  .paiHang {
    width: 100%;
    height: 2.75rem;
    background: #fe0c05;
    position: fixed;
    color: white;
    top: 0;
    z-index: 100;
    ::v-deep .van-tab--active {
      padding: 0.2rem;
      background: #fe0c05;
      .van-tab__text--ellipsis {
        padding: 0.2rem 0.8rem;
        border-radius: 0.2rem;
        background: rgba(253, 245, 230, 0.4);
      }
    }
  }
}
.jtp-zhi {
  width: 100%;
  height: 2.4rem;
  background: white;
  ::v-deep .van-tabs {
    ::v-deep .van-tabs__wrap {
      ::v-deep.van-tabs__line {
        margin-bottom: 0.2rem;
        bottom: 1.1rem;
      }
    }
  }
}
::v-deep .van-list__finished-text {
  margin: 0 auto;
  font-size: 0.625rem;
}
</style>