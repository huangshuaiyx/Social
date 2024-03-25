<template>
  <div style="width:100%;height:aout;background:#f6f6f6">
    <div class="zhiding">
      <van-nav-bar :title="this.name" @click-left="window.history.back()" :border="false">
        <template #left>
          <van-icon size="1.5rem" name="arrow-left" color="#000000" />
        </template>
      </van-nav-bar>
      <!-- 分类 -->
      <van-tabs v-model="active" @click="clickTab" line-width="1rem" type="line" :border="false">
        <van-tab title="京东" name="3"></van-tab>
        <van-tab title="天猫淘宝" name="2"></van-tab>
        <van-tab title="拼多多" name="1"></van-tab>

        <div class="tabs" ref="tabsd">
          <van-tabs v-model="actives" @click="clickTabs" type="line" :border="true">
            <van-tab title="综合" name="0"></van-tab>
            <van-tab title="高返" name="1"></van-tab>
            <van-tab title="销量" name="2"></van-tab>
            <van-tab title="价格" name="3"></van-tab>
            <img class="img" v-if="actives != 3" src="../../assets/icon_返后价默认@2x.png" alt />
            <img
              class="img"
              v-if="actives == 3 && formData.isAsc == false"
              src="../../assets/icon_返后价降序2@2x.png"
              alt
            />
            <img
              class="img"
              v-if="actives ==3 && formData.isAsc == true"
              src="../../assets/icon_price_rise@2x.png"
              alt
            />
          </van-tabs>
        </div>
      </van-tabs>
    </div>

    <div class="shop">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多啦~"
          @load="onLoad"
          :immediate-check="true"
        >
          <figure v-for="(x,i) of arrList" :key="i" @click="homepage(x)">
            <!-- 商品默认图 -->
            <img class="good-one" v-if="x.thumbnailUrl == ''" src="../../assets/shop.png" alt />
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
                <span
                  style="font-size:18px"
                >{{ Number(Number(x.originalPrice)-Number(x.couponDiscount?x.couponDiscount:0)-Number(x.returnMoney)).toFixed(2) }}</span>
              </p>
              <p class="good-six" style="color:gray">
                <span>
                  原价¥
                  <s>{{ x.originalPrice }}</s>
                </span>
                <span class="sales" v-if="active != 1">月销{{x.strVolume}}</span>
                <span class="sales" v-if="active == 1">月销{{x.strVolume}}</span>
              </p>
            </figcaption>
          </figure>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getCatGoods } from "@/api/api.js";
export default {
  data() {
    return {
      window,
      active: 2, //一级tab
      actives: 0 || this.$store.state.dataSource, // 二级tab
      refreshing: false,
      finished: false,
      loading: false,
      formData: {
        page: 0,
        dataSource: 2,
        catId: this.$route.query.id,
        isAsc: false,
        sort: 0,
      },
      name: this.$route.query.name,
      arrList: [],
      descending: "0",
      imgs: false,
      imgMao: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.lala);
  },
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
      var scroll = scrollHeight - this.i;
      this.i = scrollHeight;
      if (scroll <= 1) {
        this.$refs.tabsd.style.position = "fixed";
        this.$refs.tabsd.style.top = "4rem";
        this.$refs.tabsd.style.width = "100%";
        this.$refs.tabsd.style.marginTop = "1.5rem";
        this.$refs.tabsd.style.paddingBottom = "1rem";
      } else {
        this.$refs.tabsd.style.position = "fixed";
        this.$refs.tabsd.style.top = "0rem";
        this.$refs.tabsd.style.width = "100%";
        this.$refs.tabsd.style.marginTop = "0rem";
      }
    },
    clickTab(name) {
      this.$store.commit("actives", name);
      this.arrList = [];
      this.formData.page = 0;
      this.actives = 0;
      this.formData.dataSource = this.active;
      this.onLoad();
    },
    clickTabs(name) {
      window.scrollTo(0, 0);
      this.$store.commit("dataSource", name);
      this.arrList = [];
      this.formData.sort = name;
      this.isAsc = false;
      this.formData.page = 0;
      if (name == 3) {
        if (this.formData.isAsc == false) {
          this.formData.isAsc = true;
        } else if (this.formData.isAsc == true) {
          this.formData.isAsc = false;
        }
      }
      this.onLoad();
    },
    // 下拉上拉
    onLoad() {
      this.formData.page++;
      getCatGoods(this.formData)
        .then((res) => {
          this.loading = false;
          this.refreshing = false;
          if (res.data.data.isLastPage == false) {
            if (this.formData.page == 1) {
              this.arrList = res.data.data.goodsList;
            } else {
              this.arrList = [...this.arrList, ...res.data.data.goodsList];
            }
            this.loading = false;
          } else if (res.data.data.isLastPage == true) {
            this.finished = true;
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    onRefresh() {
      this.formData.page = 0;
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    //点击商品
    homepage(x) {
      this.returnMoney = x.returnMoney;
      this.$router.push({
        name: "details",
        query: {
          obj: x,
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
      this.arrList = [];
      this.formData.page = 0;
      this.formData.dataSource = 3;
      this.formData.catId = this.$route.query.id;
      this.name = this.$route.query.name;
      this.active = 3;
      this.actives = 0;
      this.formData.sort = 0;
      this.formData.isAsc = false;
      this.onLoad();
    }
    this.$route.meta.isBack = false;
  },
  //销毁滚动
  beforeDestroy() {
    window.removeEventListener("scroll", this.lala);
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-tab--active {
  color: red;
}
.zhiding {
  width: 100%;
  height: 10rem;
  position: fixed;
  top: 0;
  z-index: 100;
}
.shop {
  width: 100%;
  height: 82%;
  margin-top: 8.5rem;
  background: white;
  ::v-deep .van-tabs__content {
    background: #f6f6f6;
  }
  figure {
    display: flex;
    margin-top: 0.5rem;
    padding: 0 0.5rem;
    figcaption {
      border-bottom: solid 0.01rem #f6f6f6;
      width: 70%;
      height: auto;
      margin-left: 0.5rem;
    }
    .good-one {
      width: 8.25rem;
      height: 8.25rem;
      margin-left: 0;
      border-radius: 0.3rem;
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
    }
    .good-teer {
      width: 3.44rem;
      height: 1.13rem;
      line-height: 1.13rem;
      border-radius: 0.25rem;
      font-size: 0.625rem;
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
    }
    .good-for span:nth-of-type(2) {
      margin-left: 0.6rem;
    }
    .goog-five {
      margin: 0.5rem 0;
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
    b {
      color: #fe0c05;
      font-size: 1.13rem;
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
      margin-top: 0.3rem;
    }
  }
}
.tabs {
  ::v-deep .van-tabs__line {
    display: none;
  }
  .img {
    width: 0.5rem;
    height: 0.9rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
.van-tabs {
  padding: 0.2rem 0;
  margin-top: -0.2rem;
}
</style>