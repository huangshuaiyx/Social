<template>
  <div id="shoplist">
    <!--------------- 标题 ----------------->
    <div class="title">
      <van-icon size="1.5rem" name="arrow-left" @click="$router.go(-1)" />
      <span>{{ this.$route.query.navigationName }}</span>
    </div>
    <!--------------- 商品列表 ----------------->
    <div class="shop">
      <!-- <van-pull-refresh v-model="refreshing"> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多啦~"
        @load="onLoad"
        :immediate-check="true"
      >
        <figure v-for="(x, i) of list" :key="i" @click="homepage(x)">
          <!-- 商品默认图 -->
          <img
            class="good-one"
            v-if="x.thumbnailUrl == ''"
            src="../../assets/shop.png"
            alt
          />
          <!-- 商品图片 -->
          <img class="good-one" v-else :src="x.thumbnailUrl" alt />
          <figcaption>
            <span class="omit">
              {{ x.goodsName }}
            </span>
            <!-- 券后价 -->
            <div class="aftercoupons">
              <div class="aftercouponsDivOne">
                <p class="pOne">券后¥<b>{{ Number(Number(x.originalPrice)-Number(x.couponDiscount?x.couponDiscount:0)-Number(x.returnMoney)).toFixed(2)}}</b></p>
                <p class="pTwo">原价¥<s>{{x.originalPriceV2}}</s></p>
              </div>
              <div class="aftercouponsDivTwo">
                <p class="pThree">再返¥{{ x.returnMoneyV2 }}</p>
                <p class="pFour">{{x.returnCoupon}}元券</p>
              </div>
            </div>

            <div class="flagshipstore">
              <p>{{ x.shopName | ellipsis }}</p>
              <p>
                <span>
                  <!-- 淘宝图标 -->
                  <a
                    class="icon"
                    v-if="x.dataSource == '2' && x.userType != '1'"
                    alt
                    >淘宝</a
                  >
                  <!-- 拼多多图标 -->
                  <a class="icon" v-if="x.dataSource == '1'">拼多多</a>
                  <!-- 京东图标 -->
                  <a class="icon" v-if="x.dataSource == '3'">京东</a>
                  <!-- 京东自营 -->
                  <a
                    class="icon"
                    v-if="x.dataSource == '3' && x.userType == '2'"
                    >京东自营</a
                  >
                  <!-- 天猫图标 -->
                  <a
                    class="icon"
                    v-if="x.dataSource == '2' && x.userType == '1'"
                    alt
                    >天猫</a
                  >
                </span>
                <span>月销{{ x.strVolume }}</span>
              </p>
            </div>
            <!-- <p style="color:#fe0c05;font-size:0.69rem" class="goog-five">
                返后价 ¥
                <span style="font-size:18px">{{ Number(Number(x.originalPrice)-Number(x.couponDiscount?x.couponDiscount:0)-Number(x.returnMoney)).toFixed(2) }}</span>
                
              </p>
              <p class="good-six" style="color:gray">
                <span style="color:#999">
                原价¥<s>{{ x.originalPrice }}</s>
                </span>
                <span class="sales">月销{{x.strVolume}}</span>
              </p> -->
          </figcaption>
        </figure>
      </van-list>
      <!-- </van-pull-refresh> -->
    </div>
  </div>
</template>

<script>
import {
  post,
  createPddExtensionUrl,
  getGoodsDetails,
  indexBarGoodsList,
  get,
  gethotGoods,
} from "@/api/api.js";
export default {
  data() {
    return {
      returnMoney: 2,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      isLastPage: true,
      imgType: "",
      formData: {
        page: 0,
        navigationId: this.$route.query.navigationId,
      },
      imgMao: false,
    };
  },
  filters: {
    //超过2位截取
    ellipsis: function (value) {
      if (!value) return "";
      if (value.length > 7) {
        return value.slice(0, 7) + "...";
      }
      return value;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.lala);
  },
  methods: {
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
    goTo() {
      window.scrollTo(0, 0);
    },
    // 加载商品
    onLoad() {
      this.formData.page++;
      indexBarGoodsList(this.formData)
        .then((res) => {
          this.loading = false;
          if (res.data.code == 0) {
            if (res.data.data.goodsList != 0) {
              if (this.page == 1) {
                this.list = res.data.data.goodsList;
              } else {
                this.list = [...this.list, ...res.data.data.goodsList];
              }
            } else {
              this.finished = true;
            }
          } else {
            this.finished = true;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.refreshing = false;
          this.finished = true;
        });
    },
    // // 下拉刷新商品
    // onRefresh() {
    //   this.finished = false;
    //   this.formData.page = 0;
    //   this.loading = true;
    //   this.onLoad();
    // },
    // 点击商品
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
          goodsTagList: JSON.stringify(x.goodsTagList) || null,
        },
      });
    },
  },
};
</script>                
<style lang="scss" scoped>
#shoplist {
  width: 100%;
  height: 100%;
  padding-top: 2.8rem;
  box-sizing: border-box;
  .title {
    position: relative;
    width: 100%;
    height: 2.8rem;
    font-size: 1rem;
    position: fixed;
    top: 0;
    z-index: 99999;
    background: #fff;
    .van-icon {
      position: absolute;
      z-index: 9999;
      top: 0.8rem;
      left: 0.3rem;
    }
    span {
      line-height: 3rem;
      display: inline;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  //商品列表
  .shop {
    width: 100%;
    height: 82%;
    figure {
      display: flex;
      margin-top: 0.5rem;
      padding: 0 0.5rem;
      background: white;
      figcaption {
        width: 80%;
        margin-left: 1rem;
        margin-top: 0.3rem;
        border-bottom: solid 0.5px #999;
      }
      .good-one {
        width: 8.25rem;
        height: 8.25rem;
        margin-left: 0;
        margin-top: 0.3rem;
        border-radius: 0.3rem;
        flex-shrink: 0;
      }
      //券后价
      .aftercoupons {
        width: 100%;
        display: flex;
        margin-top: 1.9rem;
        .aftercouponsDivOne {
          font-size: 0.6rem;
          padding: 0 0.5rem;
          .pOne {
            color: red;
            b{
              font-size: 1.2rem;
            }
          }
          .pTwo{
            margin-top: 0.5rem;
            color: #999;
          }
        }
        .aftercouponsDivTwo{
          margin-left: 1rem;
          font-size: 0.5rem;
          .pThree{
            padding: 0.02rem 0.7rem;
            border: solid 1px red;
            color: red;
          }
          .pFour{
             padding: 0.1rem 0.5rem;
             background: url("../../assets/券png@2x.png") no-repeat center/100%;
             margin-top: 0.5rem;
             text-align: center;
             color: #fff;
          }
        }
      }
      .flagshipstore {
        font-size: 10px;
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 0.15rem;
        p:nth-child(2) {
          span:nth-child(1) {
            margin-right: 0.4rem;
          }
        }
      }
      .omit {
        display: -webkit-box !important;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        font-size: 0.78rem;
        color: #000;
        margin-top: 0.3rem;
      }
    }
  }
}
</style>