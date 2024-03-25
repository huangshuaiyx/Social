<template>
  <div class="one">
    <!-- 轮播 -->
    <div class="banner-box" v-if="bannerList != ''">
      <div class="info">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(v, i) in bannerList" :key="i">
            <img @click="banner(v)" class="banner" :src="v.imgUrl" :alt="v.imgUrl" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 京东淘宝 -->
    <div class="tmall">
      <div>
        <figure v-for="(x,i) in gridArrs" :key="i" text="i" @click="figure(x)">
          <img :src="x.navigationPicUrl" alt />
          <figcaption>
            <span style="marginTop:10px">{{x.navigationName}}</span>
          </figcaption>
        </figure>
      </div>
      <div>
        <figure v-for="(x,i) in gridArr" :key="i" text="i" @click="figure(x)">
          <img :src="x.navigationPicUrl" alt />
          <figcaption>
            <span style="marginTop:10px">{{x.navigationName}}</span>
          </figcaption>
        </figure>
      </div>
    </div>
    <!-- 新人一元购 -->
    <div style="width:100%;background:white;paddingBottom:0.4rem">
      <div class="newPeople" v-show="peopleMany" @click="newPeoples">
        <div class="newPeople-img">
          <div v-for="(x,i) in bannImg" :key="i">
            <img class="people-img" :src="x.thumbnailUrl" alt />
            <img class="people-yiyuan" src="../../assets/png_1yuan@2x.png" alt />
          </div>
        </div>
      </div>
      <div class="peoples" v-show="peoples">
        <img :src="this.imgMany" alt />
      </div>
    </div>
    <!-- 运营活动 -->
    <div class="homeActivities" v-for="(x,i) of Activity" :key="i">
      <div>
        <img
          @click="jumpUrl(x)"
          v-for="(x,i) of Activity[i].activityList"
          :key="i"
          :src="x.imgUrl"
          alt
        />
      </div>
    </div>
    <!-- 商品 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多啦~"
      @load="load"
      :immediate-check="false"
      offset="3000"
    >
      <div class="good">
        <figure v-for="(x, i) of list" :key="i" :title="x" @click="homepage(x)">
          <!-- 商品默认图 -->
          <img class="good-one" v-if="x.thumbnailUrl == ''" src="../../assets/shop.png" alt />
          <!-- 商品图片 -->
          <img class="good-one" v-else :src="x.thumbnailUrl" alt />
          <figcaption>
            <!-- 商品标题 -->
            <p class="good-two">{{x.subTitle}}</p>
            <!-- 标签 -->
            <div class="label">
              <van-tag
                v-for="(y,i) of x.goodsTagList"
                :key="i"
                :color="`#${y.bgColor}`"
                :text-color="`#${y.fontColor}`"
              >{{y.tagName}}</van-tag>
            </div>
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
                <a class="icon" v-if="x.dataSource == '1'">拼多多</a>0
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
  </div>
</template>

<script>
let information = JSON.parse(localStorage.getItem("jd-webapp"));
var that = this;
import BScroll from "better-scroll";
import { Toast } from "vant";
import axios from "axios";
import {
  getRecommendTbGoods,
  createRId,
  getRecommendBanner,
  getRecommendBannerUrl,
  getGoodsDetails,
  indexBarGoodsList,
  getPddGoodsCat,
  getBanner,
  banners,
  newsUnReadCount, //未读消息
  getOperationalActivityList, //运营活动
} from "@/api/api.js";
import { baseUrl } from "@/config";

export default {
  name: "one",
  data() {
    return {
      active: this.$route.query.type,
      taobao: [],
      show: false,
      list: [],
      loading: false,
      finished: false,
      page: 0,
      show1: false,
      returnMoney: "",
      shareUrl: "",
      imgType: "",
      // 轮播列表
      bannerList: [],
      //图标列表
      catList: [],
      peopleMany: true,
      imgMany: "",
      peoples: false,
      bannImg: [],
      dataSource: "",
      formData: {
        page: 1,
        navigationId: "",
        itemId: "",
      },
      readCount: "",
      Activity: [], //运营活动
      owner: 0,
      labelList: [], //标签
      gridArr: [],
      gridArrs: [],
    };
  },
  created() {
    //运营活动
    getOperationalActivityList({
      firstFunctionId: 101,
      secondFunctionId: 10104,
    }).then((res) => {
      this.Activity = res.data.data;
    });
    //新人一元购
    banners().then((res) => {
      if (this.$store.state.userId) {
        if (res.data.data.bannersList.length != 0) {
          if (res.data.data.bannersList[0].isOneyuanActivity == true) {
            this.bannImg = res.data.data.bannersList[0].activityGoodsList;
            this.peopleMany = true;
            this.peoples = false;
          } else {
            this.peopleMany = false;
            this.peoples = true;
            this.imgMany = res.data.data.bannersList[0].imgUrl;
          }
        } else {
          this.peopleMany = false;
          this.peoples = false;
        }
      } else {
        if (res.data.data.bannersList[0].activityGoodsList != 0) {
          this.bannImg = res.data.data.bannersList[0].activityGoodsList;
          this.peopleMany = true;
        } else {
          this.peopleMany = false;
        }
      }
    });
    this.load(this.page);
    // 获取轮播图图片
    getBanner().then((res) => {
      this.bannerList = res.data.data;
    });
    window.addEventListener("scroll", this.lala);
  },
  mounted() {
    //查看未读消息
    newsUnReadCount().then((res) => {
      this.readCount = res.data.data.unReadCount;
    });
    // 如果是从淘宝授权页面返回则给用户绑定淘宝
    var code = this.GetUrlParam("code");
    if (code) {
      // 绑定用户信息
      createRId({ code }).then((res) => {
        if (res.data.data.rid) {
          let userInfo = JSON.parse(localStorage.getItem("jd-webapp"));
          userInfo.trelationId = res.data.data.rid;
          this.$store.commit("loginchange", userInfo);
        }
      });
    }
    //获取九宫格图标
    getPddGoodsCat().then((res) => {
      this.catList = res.data.data.indexBar;
      let arrCatList = [];
      let arrCatLists = [];
      this.catList.forEach((x, i) => {
        if (i % 2 != 0) {
          let xx = arrCatList.push(x);
          this.gridArr = arrCatList; 
        }else  if (i % 2 == 0){
          let xx = arrCatLists.push(x);
          this.gridArrs = arrCatLists;
        }
      });
    });
  },
  methods: {
    //新人一元购
    newPeoples() {
      this.$router.push({name:'newPeoples'})
    },
    //点击第三方
    figure(x) {
      //没登陆之前
      if (this.$store.token == "") {
        if (
          x.navigationName == "饿了么" ||
          x.navigationName == "考拉海购" ||
          x.navigationName == "省钱加油"
        ) {
          this.$router.push({ name: "register" });
        } else if (
          x.navigationName == "拼多多" ||
          x.navigationName == "天猫" ||
          x.navigationName == "淘宝" ||
          x.navigationName == "京东"
        ) {
          if (x.navigationName == "拼多多") {
            this.dataSource = 1;
            this.$router.push({
              name: "exclusive",
              query: {
                navigationName: x.navigationName,
                navigationId: x.navigationId,
                dataSource: this.dataSource,
                itemId: x.itemId,
              },
            });
          } else if (x.navigationName == "天猫") {
            this.dataSource = 2;
            this.$router.push({
              name: "exclusive",
              query: {
                navigationName: x.navigationName,
                navigationId: x.navigationId,
                dataSource: this.dataSource,
                itemId: x.itemId,
              },
            });
          } else if (x.navigationName == "淘宝") {
            this.dataSource = 2;
            this.$router.push({
              name: "exclusive",
              query: {
                navigationName: x.navigationName,
                navigationId: x.navigationId,
                dataSource: this.dataSource,
                itemId: x.itemId,
              },
            });
          } else if (x.navigationName == "京东") {
            this.dataSource = 3;
            this.$router.push({
              name: "exclusive",
              query: {
                navigationName: x.navigationName,
                navigationId: x.navigationId,
                dataSource: this.dataSource,
                itemId: x.itemId,
              },
            });
          }
        } else if (
          x.navigationName == "京东自营" ||
          x.navigationName == "精选爆款" ||
          x.navigationName == "9.9包邮" ||
          x.navigationName == "今日必买"
        ) {
          this.$router.push({
            name: "shopList",
            query: {
              navigationName: x.navigationName,
              navigationId: x.navigationId,
              dataSource: this.dataSource,
              itemId: x.itemId,
            },
          });
        }
        //登录之后
      } else if (this.$store.token != "") {
        this.formData.navigationId = x.navigationId;
        this.formData.itemId = x.itemId;
        indexBarGoodsList(this.formData).then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.url) {
              window.location.href = res.data.data.url.shortLink;
            } else if (
              x.navigationName == "拼多多" ||
              x.navigationName == "天猫" ||
              x.navigationName == "淘宝" ||
              x.navigationName == "京东"
            ) {
              if (x.navigationName == "拼多多") {
                this.dataSource = 1;
              } else if (x.navigationName == "天猫") {
                this.dataSource = 2;
                this.owner = 1;
              } else if (x.navigationName == "淘宝") {
                this.dataSource = 2;
                this.owner = 0;
              } else if (x.navigationName == "京东") {
                this.dataSource = 3;
              }
              this.$router.push({
                name: "exclusive",
                query: {
                  navigationName: x.navigationName,
                  navigationId: x.navigationId,
                  dataSource: this.dataSource,
                  itemId: x.itemId,
                },
              });
            } else if (
              x.navigationName == "京东自营" ||
              x.navigationName == "精选爆款" ||
              x.navigationName == "9.9包邮" ||
              x.navigationName == "今日必买"
            ) {
              this.$router.push({
                name: "shopList",
                query: {
                  navigationName: x.navigationName,
                  navigationId: x.navigationId,
                  dataSource: this.dataSource,
                  itemId: x.itemId,
                  owner: this.owner,
                },
              });
            }
          }
        });
      }
    },
    // 点击轮播图
    banner(val) {
      if (information == null) {
        this.$router.push({ name: "register" });
      } else {
        window.location.href =
          `${val.jumpUrl}&isH5=1&appUserToken=${this.$store.state.token}&appUserId=${this.$store.state.userId}` ||
          `${val.linkUrl}&isH5=1&appUserToken=${this.$store.state.token}&appUserId=${this.$store.state.userId}`;
      }
    },
    jumpUrl(x) {
      window.location.href = x.jumpUrl;
    },
    //滚动条事件
    lala() {
      let scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop;
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
          goodsTagList: JSON.stringify(x.goodsTagList) || null,
        },
      });
    },
    //无限
    load() {
      this.page++;
      getRecommendTbGoods({ page: this.page }).then((res) => {
        this.loading = false;
        this.refreshing = false;
        if (res.data.code == 0) {
          if (res.data.data.isLastPage != true) {
            if (this.page == 1) {
              this.list = res.data.data.goodsList;
            } else {
              this.list = this.list.concat(res.data.data.goodsList);
            }
          } else {
            this.finished = true;
          }
        } else {
          this.finished = true;
        }
      });
    },
    // 获取淘宝返回code
    GetUrlParam(paraName) {
      var url = document.location.toString();
      var arrObj = url.split("?");
      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");
          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      } else {
        return "";
      }
    },
    //回顶部
    goTo() {
      window.scrollTo(0, 0);
    },
  },

  //销毁滚动
  beforeDestroy() {
    window.removeEventListener("scroll", this.lala);
  },
};
</script>

<style lang="scss" scoped>
.one {
  width: 100%;
  height: auto;
  padding: 0 0 4rem 0;
  background: #f6f6f6;
  position: relative;
  /* 轮播 */
  .banner-box {
    width: 100%;
    height: 9rem;
    background: url("../../assets/bg3@2x.png") 10% 180% no-repeat;
    box-sizing: border-box;
    padding: 0.2rem 0.5rem;
    background-size: 100%;
    .info {
      width: 100%;
      height: 100%;
      .banner {
        display: block;
        width: 100%;
        height: 8.63rem;
        border-radius: 0.5rem;
      }
    }
  }
  /* 淘宝京东 */
  .tmall {
    width: 95%;
    height: auto;
    box-sizing: border-box;
    font-size: 0.75rem;
    background: #f6f6f6;
    overflow: auto;
    div {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      figure {
        width: 3.5rem;
        height: auto;
        flex-shrink: 0;
        margin: 0.5rem;
        img {
          width: 2.725rem;
          height: 2.625rem;
        }
      }
    }
  }
}

//新人一元
.newPeople {
  width: 21.9375rem;
  height: 8.0625rem;
  background: url("../../assets/bg_1yuanGou@2x.png") no-repeat center/100% white;
  .newPeople-img {
    display: flex;
    height: 8.0625rem;
    width: 13.5rem;
    margin-left: 7.3rem;
    padding: 0.45rem 0;
    div {
      width: 6.5375rem;
      height: 7.0625rem;
      border-radius: 0.25rem;
      background: white;
      position: relative;
      margin-left: 0.5rem;
      .people-img {
        width: 5.9375rem;
        height: 6.625rem;
        flex-shrink: 0;
        margin: 0.2rem 0;
      }
      .people-yiyuan {
        width: 3.1875rem;
        height: 1.125rem;
        position: absolute;
        top: 5.6875rem;
        right: 1.4rem;
      }
    }
  }
}

.peoples {
  width: 95%;
  height: 5rem;
  margin: 0.5rem auto;
  img {
    width: 100%;
    height: 100%;
  }
}
// 首页活动
.homeActivities {
  width: 100%;
  height: auto;
  background: #fff;
  display: flex;
  justify-content: space-between;
  div {
    width: 100%;
    height: 8.8125rem;
    // text-align: left;
    img {
      width: auto;
      height: 8.8125rem;
    }
  }
}
/* 商品 */
::v-deep .van-list {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  overflow: hidden;
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
      padding: 0 0.2rem 0.1rem;

      .good-two {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 0.78rem;
        color: #333333;
        text-align: left;
        margin-top: 0.3rem;
        margin-bottom: 0.4375rem;
      }
      .label {
        text-align: left;
        .van-tag {
          margin: 0.2rem 0 0.2rem 0.3rem;
          font-size: 10px;
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
}

::v-deep .van-grid-item__content {
  padding: 0.5rem;
}
::v-deep .van-list__finished-text {
  margin: 0 auto;
  font-size: 0.625rem;
}
</style>