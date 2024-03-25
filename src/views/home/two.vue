<template>
  <div class="two">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多啦~"
        @load="onLoad"
        :immediate-check="false"
      >
        <div class="classification">
          <div class="right-sui">
            <div class="right-sd" v-for="(x,i) in grid" :key="i">
              <div
                @click="$router.push({name:'commodity',query:{
                id:x.catId,
                name:x.catName,
                dataTpe:'2'
              }})"
              >
                <img :src="x.imgUrl" alt />
              </div>
              <p>{{x.catName}}</p>
            </div>
          </div>
        </div>
        <div class="good">
          <figure v-for="(x, i) of list" :key="i" :title="x" @click="homepage(x)">
            <!-- 商品默认图 -->
            <img class="good-one" v-if="x.thumbnailUrl == ''" src="../../assets/shop.png" alt />
            <!-- 商品图片 -->
            <img class="good-one" v-else :src="x.thumbnailUrl" alt />
            <figcaption>
              <!-- 商品标题 -->
              <p class="good-two">{{x.subTitle}}</p>
              <!-- 价格 -->
              <p class="good-five" style="color: #fe0c05; font-size: 0.69rem;">
                <span>¥</span>
                <span>{{ Number(Number(x.originalPrice)-Number(x.couponDiscount?x.couponDiscount:0)-Number(x.returnMoney)).toFixed(2)}}</span>
                <span>再返{{x.returnMoney}}</span>
              </p>
              <p class="good-six">
                <span>
                  原价¥
                  <s>{{ x.originalPrice }}</s>
                </span>
                <span class="omit">
                  <!-- 淘宝图标 -->
                  <a class="icon" v-if="x.dataSource == '2' && x.userType != '1'" alt>淘宝</a>
                  <!-- 拼多多图标 -->
                  <a class="icon" v-if="x.dataSource == '1'">拼多多</a>
                  <!-- 京东图标 -->
                  <a class="icon" v-if="x.dataSource == '3'">京东</a>
                  <!-- 天猫图标 -->
                  <a class="icon" v-if="x.dataSource == '2' && x.userType == '1'" alt>天猫</a>
                </span>
              </p>
            </figcaption>
          </figure>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 淘宝授权 -->
    <authorization v-if="show" :show="show" @changeShow="v => show = v" />
    <!-- 前往购买 -->
    <purchase
      v-if="show1"
      :show="show1"
      @changeShow="v => show1 = v"
      :returnMoney="returnMoney"
      :shareUrl="shareUrl"
      :imgType="imgType"
    />
  </div>
</template>


<script>
import {
  createPddExtensionUrl,
  getGoodsDetails,
  getsearch,
  getCatGoods,
} from "@/api/api.js";
export default {
  name: "two",
  props: {
    catId: String,
  },
  activated() {},
  data() {
    return {
      // 跳转淘宝相关
      show1: false,
      shareUrl: "",
      returnMoney: 0,
      imgType: "",
      catIds: this.$store.state.activename,
      // 绑定淘宝相关
      show: false,
      imgMao: false,
      grid: [],
      // 下拉列表
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      // 表单
      formData: {
        sort: 1,
        isAsc: false,
        catId: 3,
        page: 0,
      },
    };
  },
  watch: {
    catId: {
      handler(val) {
        if (this.$store.state.leimuList) {
          let art = this.$store.state.leimuList;
          art.forEach((x, i) => {
            if (this.$store.state.activename == x.catId) {
              this.grid = x.children;
            }
          });
        }
        this.formData.catId = this.catIds;
        this.formData.page = 0;
        this.list = [];
        this.onLoad();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onLoad() {
      this.formData.page++;
      this.formData.catId = this.$store.state.activename;
      getCatGoods(this.formData)
        .then((res) => {
          this.loading = false;
          this.refreshing = false;
          if (res.data.data.isLastPage != true) {
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
          this.refreshing = false;
        });
    },
    onRefresh() {
      this.formData.page = 0;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    goTo() {
      window.scrollTo(0, 0);
    },
    // 首页点击商品
    homepage(x) {
      this.returnMoney = x.returnMoney;
      this.$router.push({
        name: "details",
        query: {
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
          goodsTagList: JSON.stringify(x.goodsTagList) || null ,
        },
      });
    },
    //滚动条事件
    lala() {
      let scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollHeight >= 500) {
        this.imgMao = true;
      } else {
        this.imgMao = false;
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$nextTick(() => {
      window.addEventListener("scroll", this.lala);
    });
  },
};
</script>

<style lang="scss" scoped>
.two {
  width: 100%;
  height: auto;
  background: #f6f6f6;
  padding-bottom: 3rem;
}
::v-deep .van-list__finished-text {
  margin: 0 auto;
  font-size: 0.625rem;
}
.good {
  width: 100%;
  height: auto;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 0.3rem;
  figure {
    width: 10.69rem;
    height: auto;
    margin: 0.3rem 0;
    border-radius: 0.3rem;
    background: white;
    .good-one {
      width: 10.69rem;
      height: 10.69rem;
      margin-left: 0;
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
      display: block;
    }
    figcaption {
      padding: 0 0.2rem 0.2rem;
      }
      .good-for {
        width: 100%;
        display: flex;
        font-size: 0.63rem;
        color: white;
        margin-top: 0.5rem;
        span:nth-of-type(2) {
          margin-left: 0.6rem;
        }
        .good-two {
          width: 3rem;
          height: 1.13rem;
          background: url("../../assets/png_bg_quan@2x.png") 100% 100% no-repeat;
          background-size: 3rem 1.13rem;
          display: block;
          line-height: 1.13rem;
          text-align: center;
        }
        .good-teer {
          width: auto;
          padding: 0 0.2rem;
          height: 1.13rem;
          border-radius: 0.25rem;
          display: block;
          background: #fe7f02;
          line-height: 1.13rem;
        }
      }
        .good-five {
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: left;
        margin: 0.3rem 0;
        display: flex;
        span:nth-child(1) {
          margin-top: 0.2rem;
        }
        span:nth-child(2) {
          font-size: 1.125rem;
          display: block;
        }
        span:nth-child(3) {
          height: 0.8rem;
          width: auto;
          border: solid 1px;
          margin-left: 0.5rem;
          margin-top: 0.2rem;
          line-height: 0.9rem;
        }
      }
      .good-six {
        font-size: 0.69rem;
        text-align: left;
        display: flex;
        justify-content: space-between;
        color: #999;
        margin-bottom: 0.875rem;
      }
    }
  }

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.classification {
  width: 95%;
  height: auto;
  margin: 0.7rem auto 0.5rem;
  border-radius: 0.5rem;
  background: white;
  .right-sui {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    .right-sd {
      width: 20%;
      height: auto;
      margin: 1rem 0;
      div {
        width: 2.5rem;
        height: 2.5rem;
        img {
          width: 100%;
          height: 100%;
          margin: 0 auto;
        }
      }
      p {
        width: 100%;
        text-align: center;
        font-size: 0.65rem;
      }
    }
  }
}
</style>