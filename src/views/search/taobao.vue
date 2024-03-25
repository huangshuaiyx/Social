<template>
  <div class="tao" style="overflow:auto">
    <div class="tabs">
      <van-tabs v-model="actives" @click="clickTabs">
        <van-tab title="综合" name="0"></van-tab>
        <van-tab title="高返" name="1"></van-tab>
        <van-tab title="销量" name="2"></van-tab>
        <van-tab title="返后价" name="3"></van-tab>
        <img class="img" v-if="this.formData.sort == 3" src="../../assets/icon_返后价降序2@2x.png" alt />
        <img class="img" v-if="this.formData.sort != 3" src="../../assets/icon_返后价默认@2x.png" alt />
        <!-- <img class="img"  v-show="imgs"  src="../../assets/icon_price_rise@2x.png" alt /> -->
      </van-tabs>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多啦~" @load="onLoad">
        <figure v-for="(x,i) of pddlist" :key="i" @click="homepage(x)">
          <img class="good-one" style="display: block" :src="x.thumbnailUrl" alt />
          <figcaption>
            <span class="omit">
              <!-- 淘宝图标 -->
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
              {{ x.goodsName }}
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
              <span>
                            {{ Number(Number(x.originalPrice)-Number(x.couponDiscount?x.couponDiscount:0)-Number(x.returnMoney)).toFixed(2) }}

              </span>
              <span>
                原价¥
                <s>{{x.originalPrice}}</s>
              </span>
            </p>
            <p class="good-six" style="color:gray">
              <span>{{x.shopName}}</span>
              <span>{{x.provcity}}</span>
              <span class="sales">月销{{x.strVolume}}</span>
            </p>
          </figcaption>
        </figure>
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
import kong from "@/views/search/kong";
import {
  createPddExtensionUrl,
  getGoodsDetails,
  findByKeyWord,
  getsearch,
} from "@/api/api.js";
export default {
  data() {
    return {
      list: [],
      pddlist: [],
      loading: false,
      finished: false,
      refreshing: false,
      kong: false,
      // 跳转淘宝相关
      show1: false,
      shareUrl: "",
      returnMoney: 0,
      imgType: "",
      show: false,
      actives: 0,
      sort: 0,
      formData: {
        keyWord: this.$route.query.val || "",
        sort: 1,
        sortType: "desc",
        dataSource: 1,
        listId: 1,
        source: 4,
        owner: "g",
        page: 1,
      },
    };
  },
  mounted() {},
  methods: {
    onLoad() {
      this.page++;
      var that = this;
      getsearch(this.formData)
        .then((res) => {
          if (res.data.data.goodsList == 0) {
            this.$router.push({ name: "kong" });
          } else if (res.data.data.goodsList != []) {
            this.loading = false;
            this.refreshing = false;
            that.noDate = res.data.data.goodsList;
            if (that.page == 1) {
              this.pddlist = res.data.data.goodsList;
            } else {
              that.pddlist = that.pddlist.concat(res.data.data.goodsList);
            }
            if (res.data.data.goodsList.length < 20) {
              this.finished = true;
            } else {
              this.finished = false;
            }
          }
        })
        .catch((err) => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    onRefresh() {
      this.page = 0;
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    //tab栏
    clikeTabs(name) {
      this.pddlist = [];
      this.sort = name;
      this.page = 0;
      this.onLoad();
    },
    // 首页点击商品
    homepage(x) {
      this.returnMoney = x.returnMoney;
      this.$router.push({
        name: "details",
        query: {
          obj: x, //全部参数
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
};
</script>

<style lang="scss" scoped>
.good-two {
  width: 3.25rem;
  height: 1.13rem;
  line-height: 1.13rem;
  background: url("../../assets/png_bg_quan@2x.png") no-repeat center/contain;
  background-size: 100%;
  display: block;
}
.good-teer {
  width: 3.44rem;
  height: 1.13rem;
  line-height: 1.13rem;
  border-radius: 0.25rem;
  display: block;
  background: #fe7f02;
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
.searchtu .icon {
  width: 0.88rem;
  height: 0.88rem;
  vertical-align: middle;
}
.searchtu b {
  color: #fe0c05;
  font-size: 1.13rem;
}
.omit {
  display: inline-block !important;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.78rem;
  color: #333333;
  margin-top: 0.3rem;
}

.tao {
  width: 100%;
  height: 42rem;
  figure {
    width: 100%;
    height: auto;
    display: flex;
    margin-top: 0.3rem;
    background: white;
    border-radius: 0.3rem;
    .good-one {
      width: 8.25rem;
      height: 8.25rem;
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
      flex-shrink: 0;
    }
    figcaption {
      margin-left: 0.3rem;
      img {
        width: 0.88rem;
        height: 0.88rem;
        vertical-align: middle;
      }
    }
  }
}
::v-deep .van-tabs__content {
  background: #f6f6f6;
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
</style>