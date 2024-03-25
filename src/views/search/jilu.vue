<template>
  <div class="like" style="overflow:auto">
    <div class="tabs">
      <van-tabs v-model="actives" line-width="20px" line-height="2px">
        <van-tab title="综合" name="0"></van-tab>
        <van-tab title="高返" name="1"></van-tab>
        <van-tab title="销量" name="2"></van-tab>
        <van-tab title="返后价" name="3"></van-tab>
      </van-tabs>
    </div>
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh" > -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多啦~" @load="onLoad">
      <div class="results">
        <img src="./../../assets/png_search_kong@2x.png" alt />
        <p>抱歉,没有找到相关商品哦~</p>
      </div>

      <div class="recommend">
        <van-divider :style="{ borderColor: '#969799'}">
          <span>为您推荐</span>
        </van-divider>
      </div>

      <div class="good">
        <figure v-for="(x, i) of list" :key="i" :title="x" @click="homepage(x)">
          <img class="good-one" :src="x.thumbnailUrl" alt />
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
                v-if="x.couponDiscount  && x.couponDiscount != 0"
              >{{ x.couponDiscount }}元券</span>
              <span class="good-teer">返{{ x.returnMoney }}元</span>
            </p>
            <p class="good-five" style="color: #fe0c05; font-size: 0.69rem;">
              返后价 ¥
              <span>
                {{ Number(Number(x.originalPrice)-Number(x.couponDiscount?x.couponDiscount:0)-Number(x.returnMoney)).toFixed(2) }}
              </span>
            </p>
            <p class="good-six" style="color: gray;">
              <span>
                原价¥<s>{{ x.originalPrice }}</s>
              </span>
              <span class="sales">月销{{ x.salesVolume  | million}}</span>
            </p>
          </figcaption>
        </figure>
      </div>
    </van-list>
    <!-- 淘宝授权 -->
    <authorization v-if="show3" :show="show3" @changeShow="v => show = v" />
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
  noGoodsRecommend,
} from "@/api/api.js";
export default {
  data() {
    return {
      page: 0,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      // 跳转淘宝相关
      show1: false,
      shareUrl: "",
      returnMoney: 0,
      imgType: "",
      // 绑定淘宝相关
      show3: false,
    };
  },
  methods: {
    onLoad() {
      this.page++;
      var that = this;
      noGoodsRecommend({
        page: this.page,
        dataSource: this.$props.dataSource,
      })
        .then((res) => {
          this.loading = false;
          this.refreshing = false;
          if (res.data.data.goodsList != 0) {
            if (this.page == 1) {
              this.list = res.data.data.goodsList;
            } else {
              this.list = [...this.list, ...res.data.data.goodsList];
            }
          } else {
            this.finished = true;
          }
        })
        .catch((err) => {
          this.loading = false;
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
         strVolume:x.strVolume,
          discountPrice: x.discountPrice,
          couponStartTime: x.couponStartTime || "",
          couponEndTime: x.couponEndTime || "",
          couponDiscount: x.couponDiscount,
          userType: x.userType,
          jdCouponUrl: x.jdCouponUrl,
          goodsUrl: x.goodsUrl,
          goodsId: x.goodsId,
          shareUrl:x.shareUrl
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.kong {
  width: 100%;
  border: solid 1px;
}
.good {
  width: 100%;
  height: auto;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: -1.2rem;
}
.good figure {
  width: 10.6875rem;
  height: auto;
  margin-top: 1rem;
  border-radius: 0.3rem;
}
.good-one {
  width: 10.6rem;
  height: 10.6rem;
  margin-left: 0;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  display: block;
}
.good-two {
  width: 3.34rem;
  height: 1.13rem;
  background: url("../../assets/png_bg_quan@2x.png") no-repeat center/contain;
  background-size: 3.34rem 1.13rem;
  display: block;
  line-height: 1.13rem;
  color: white;
  font-size: 0.3rem;
  text-align: center;
}
.good-teer {
  width: 3.34rem;
  height: 1.13rem;
  border-radius: 0.25rem;
  display: block;
  background: #fe7f02;
  line-height: 1.13rem;
  color: white;
  font-size: 0.3rem;
  text-align: center;
}
.good-for {
  width: 100%;
  display: flex;
  font-size: 0.63rem;
  color: white;
  margin-top: 0.5rem;
}
.good-for span:nth-of-type(2) {
  margin-left: 0.6rem;
}
.good-five {
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
  margin: 0.3rem 0;
}
.good-six {
  font-size: 0.75rem;
  text-align: left;
}
.good-six span:nth-of-type(2) {
  margin-left: 2rem;
}
.good .icon {
  width: 0.88rem;
  height: 0.88rem;
  vertical-align: middle;
}
.good b {
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

.like {
  width: 100%;
  height: 40rem;
  background: #f6f6f6;
  .recommend {
    width: 60%;
    margin: 0 auto;
    line-height: -0.2rem;
    font-size: 1.2rem;
    background: #f6f6f6;
    color: gray;
    .recommend span {
      background: #f6f6f6;
    }
    .el-divider__text {
      background: #f6f6f6;
    }
  }
  .results {
    width: 100%;
    height: auto;
    background: white;
    padding: 0.5rem;
    img {
      width: 4.88rem;
      height: 4.31rem;
      margin-left: 9.13rem;
      margin-top: 2.75rem;
    }

    p {
      text-align: center;
      color: #999999;
      font-size: 0.88rem;
      margin-top: 1.27rem;
    }
  }
}
</style>