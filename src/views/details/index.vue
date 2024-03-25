<template>
  <!-- 详情页 -->
  <div class="detalis" :class="isad ? 'animation-fade' : ''">
    <!-- 吸顶前 -->
    <div class="goto_left" @click="backOff">
      <img src="../../assets/icon_back白@2x.png" alt />
    </div>
    <!-- 吸顶后 -->
    <div class="xiding" v-show="xiding">
      <van-nav-bar class="xiding" v-if="babyShow">
        <template #left>
          <van-icon
            name="arrow-left"
            size="1.5rem"
            color="#000000"
            @click="backOff"
          />
          <van-tabs
            v-model="activeName"
            style="margin-left: 2rem; width: 15rem; z-index: 100"
            line-width="20px"
            @click="clickTab"
            :animated="true"
            title-active-color="red"
            ref="tabszhi"
          >
            <van-tab name="1" title="商品"></van-tab>
            <van-tab name="2" title="详情"></van-tab>
          </van-tabs>
        </template>
      </van-nav-bar>
    </div>
    <!-- 轮播图 -->
    <div ref="sdsd">
      <van-swipe
        height="23.44rem"
        width="23.44rem"
        @change="onChanges"
        :touchable="true"
      >
        <van-swipe-item
          v-for="(image, index) in this.rotationList"
          :key="index"
        >
          <img v-lazy="image" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ currents + 1 }}/{{ lengths }}</div>
        </template>
      </van-swipe>
    </div>
    <div class="bootmbox">
      <!-- 标题 -->
      <div class="title">
        <!-- 淘宝图标 -->
        <span>{{ this.$route.query.goodsName }}</span>
      </div>
      <!-- 标签 -->
      <div class="label">
        <van-tag
          v-for="(y, i) of JSON.parse(this.$route.query.goodsTagList)"
          :key="i"
          :color="`#${y.bgColor}`"
          :text-color="`#${y.fontColor}`"
          >{{ y.tagName }}</van-tag
        >
      </div>
      <!-- 价格 -->
      <div class="price">
        <p class="price_sb">
          <span style="font-size: 12px">返后价</span>
          <span style="font-size: 0.94rem">¥</span>
          <span>
            {{
              (
                Number(this.$route.query.originalPrice) -
                Number(
                  this.$route.query.couponDiscount
                    ? this.$route.query.couponDiscount
                    : 0
                )
              ).toFixed(1)
            }}
          </span>
          <span class="again">再返¥{{ this.$route.query.returnMoney }}</span>
        </p>
        <p>
          <span>
            原价¥
            <s>{{ this.$route.query.originalPrice }}</s>
          </span>
          <span
            style="
              color: #999;
              font-size: 0.75rem;
              line-height: 1.5rem;
              width: 6rem;
            "
          >
            <!-- 淘宝图标 -->
            <a
              class="icon"
              v-if="
                this.$route.query.dataSource == '2' &&
                this.$route.query.userType != '1'
              "
              alt
              >淘宝</a
            >
            <!-- 拼多多图标 -->
            <a class="icon" v-if="this.$route.query.dataSource == '1'"
              >拼多多</a
            >
            <!-- 京东图标 -->
            <a class="icon" v-if="this.$route.query.dataSource == '3'">京东</a>
            <!-- 天猫图标 -->
            <a
              class="icon"
              v-if="
                this.$route.query.dataSource == '2' &&
                this.$route.query.userType == '1'
              "
              alt
              >天猫</a
            >
            月销{{ this.detailsData.strVolume }}
          </span>
        </p>
      </div>
      <!-- 优惠卷 -->
      <div class="coupon" v-if="shop">
        <div>
          <span style="font-size: 0.94rem">¥</span>
          <span style="font-size: 32px">{{
            this.$route.query.couponDiscount
          }}</span
          >优惠券
          <p style="font-size: 0.69rem; opacity: 0.75">
            使用期限:{{
              Number(this.$route.query.couponStartTime) | getTime
            }}-{{ Number(this.$route.query.couponEndTime) | getTime }}
          </p>
        </div>
        <p class="price_sb" style="font-size: 0.88rem" @click="land">
          立即领券
        </p>
      </div>
      <!-- 店铺 -->
      <!-- <div class="shop" >
      <p>
        <img src="../../assets/dianpu@3x.png" alt />
      </p>
      <div>
        <p style="font-size:14px">{{this.$route.query.mallName?this.$route.query.mallName:'无店铺名'}}</p>
        <p>
          <span style="margin:0">
            宝贝描述
            <u style="color:red;text-decoration:none;marginLeft:0.1rem;marginRight:0.1rem">{{this.$route.query.servTxt | getpin}}</u>高
          </span>
          <span>
            卖家服务
            <u style="color:red;text-decoration:none;marginLeft:0.1rem;marginRight:0.1rem">4.8</u>高
          </span>
          <span>
            物流服务
            <u style="color:red;text-decoration:none;marginLeft:0.1rem;marginRight:0.1rem">4.8</u>高
          </span>
        </p>
      </div>
      </div>-->
    </div>
    <!-- 相关推荐 -->
    <p class="recommendP">相关推荐</p>
    <div class="recommend" ref="recommend">
      <div class="recommendDiv">
        <div v-for="(x, i) of list" :key="i" @click="homepage(x)">
          <img :src="x.thumbnailUrl" alt />
          <p>{{ x.goodsName }}</p>
          <p style="color: #fe0c05">
            ¥{{
              Number(
                Number(x.originalPriceV2) - Number(x.returnMoneyV2)
              ).toFixed(2)
            }}
          </p>
        </div>
      </div>
      <div class="recommendDiv">
        <div v-for="(x, i) of ersd" :key="i" @click="homepage(x)">
          <img :src="x.thumbnailUrl" alt />
          <p>{{ x.goodsName }}</p>
          <p style="color: #fe0c05">
            ¥{{
              Number(
                Number(x.originalPriceV2) - Number(x.returnMoneyV2)
              ).toFixed(2)
            }}
          </p>
        </div>
      </div>
    </div>
    <!-- 商品详情 -->
    <p class="recommendP">商品详情</p>
    <div ref="shop" class="xiangqing">
      <div class="xqingImg">
        <img
          v-for="(x, i) in this.shopImg"
          :key="i"
          :src="x"
          alt
          style="width: 100%; float: left"
        />
      </div>
      <p class="xqingImgp">没有更多啦~</p>
    </div>

    <!-- 按钮 -->
    <div class="back">
      <div @click="collection" class="collectionss">
        <span style="font-size: 12px">¥</span>
         {{
              (
                Number(this.$route.query.originalPrice) -
                Number(
                  this.$route.query.couponDiscount
                    ? this.$route.query.couponDiscount
                    : 0
                )
              ).toFixed(1)
            }}
      </div>
      <!-- 分享赚,自省购 -->
      <div class="land">
        <van-button type="info" @click="share">
          分享
          <br />
          <p style="font-size: 12px">
            可赚¥{{ Number(this.$route.query.returnMoney).toFixed(2) }}
          </p>
        </van-button>
        <van-button type="info" @click="land">
          购买
          <br />
          <p style="font-size: 12px">
            可省¥
            {{
              (
                Number(this.$route.query.couponDiscount) +
                Number(this.$route.query.returnMoney)
              ).toFixed(2)
            }}
          </p>
        </van-button>
      </div>
    </div>
    <!-- 淘宝授权 -->
    <authorization v-if="show" :show="show" @changeShow="(v) => (show = v)" />
    <!-- 前往购买 -->
    <purchase
      v-if="show1"
      :show="show1"
      @changeShow="(v) => (show1 = v)"
      :returnMoney="this.$route.query.returnMoney"
      :shareUrl="shareUrl"
      :imgType="imgType"
    />
    <!-- 收藏 -->
    <div @click="collection" class="collection" v-if="collectionShow">
      <img src="../../assets/icon_已收藏@2x.png" alt />
      <br />已收藏
    </div>
    <div @click="collection" class="collection" v-else>
      <img src="../../assets/icon_收藏@2x.png" alt />
      <br />收藏
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {
  createPddExtensionUrl,
  goodsDetailUl,
  getRecommendTbGoods,
  getGoodsDetails,
  getput,
  getstatus,
  getdelete,
  getJdGoodsRecommendUrl,
  similarGoodsRecommend, //相似商品
  getGet,
} from "@/api/api.js";
import { Toast } from "vant";

window.onscroll = function () {
  var distance = document.documentElement.scrollTop; //获取滚动条初始高度的值 ：0
};

export default {
  data() {
    return {
      active: "",
      show: false, //淘宝
      show1: false, //前往购买
      loading: false,
      finished: false,
      returnMoney: 0,
      list: [], //推荐商品
      ersd: [],
      rotationList: [], //轮播图片
      detailsList: [], //详情图片
      imgMao: false, //锚点
      page: 1, //页数
      activeName: "",
      babyShow: false, //吸顶展示
      shopImg: [], //详情图片
      collectionShow: 0,
      shop: false, //优惠券
      xiding: false,
      artList: {}, //全部参数
      formData: {
        goodsList: [
          {
            goodsId: this.$route.query.goodsId,
            dataSource: this.$route.query.dataSource,
          },
        ],
      }, //收藏传参
      goodsId: "", //是否收藏
      dataSource: "", //是否收藏
      currents: 0, //索引
      lengths: 0, //轮播长度
      ziyings: false,
      isad: false,
      detailsData: [],
    };
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (newV) {
        console.log(newV)
        getGoodsDetails(this.$route.query).then((res) => {
          this.detailsData = res.data.data;
          this.rotationList = res.data.data.imgUrlArr;
          this.lengths = this.rotationList.length;
          let shoparr = [];
          if (res.data.data.goodsDetailUrl) {
            let str = res.data.data.goodsDetailUrl.substring(
              res.data.data.goodsDetailUrl.indexOf("?") + 1
            );
            let xx;
            let that = this;
            var script = document.createElement("script");
            script.src = res.data.data.goodsDetailUrl;
            document.body.appendChild(script);
            document.body.removeChild(script);
            window[qs.parse(str).callback] = function (asd) {
              shoparr = asd.data.wdescContent.pages;
              let arr = [];
              shoparr.forEach((x) => {
                xx = x.replace(/<[^<>]+>/g, ""); //截取标签
                let ssUrl = xx;
                that.shopImg = ssUrl;
                let xs = arr.push(ssUrl);
              });
              that.shopImg = arr;
            };
          } else {
            this.shopImg = res.data.data.imgUrlArr;
          }
          //判断是否有优惠卷
          if (
            this.$route.query.couponDiscount == "" ||
            this.$route.query.couponDiscount == 0
          ) {
            this.shop = false;
          } else {
            this.shop = true;
          }
          //优惠券的时间
          if (
            this.$route.query.couponStartTime == "" ||
            this.$route.query.couponStartTime == 0
          ) {
            this.shop = false;
          } else {
            this.shop = true;
          }
        });
        // let ads = document.createElement("script");
        // ads.src =
        //   "//s.click.taobao.com/t?e=m%3D2%26s%3DuU15%2B9e96Ohw4vFB6t2Z2ueEDrYVVa64r4ll3HtqqoxyINtkUhsv0JVhpQF5XceRFIS4hJeadWnr8xixhFw6e%2Bpkkofts9wKhvTMUqKXvAls6pxEnru5mtdSxOvjGhftxl%2BhMPmMA%2BPeSR6keAQNpN1tmhv4dYEukgsWuVGV531s3nz8QVXiBncRAFbIBHTZNYamYfNuGHXPZMUUR31Kpg%3D%3D&scm=null&pvid=100_11.8.222.116_63737_2591594965212624043&app_pvid=59590_11.24.55.114_22510_1594965212617&ptl=floorId:2836;originalFloorId:2836;pvid:100_11.8.222.116_63737_2591594965212624043;app_pvid:59590_11.24.55.114_22510_1594965212617&xId=2cc3SBB2eauNsf0nzKqY3Uf5gowdZV8KfdZEQiGFygjdYL90N76EyDKveFKrhszdzvzWp7oCqZS4spa2spUpatzwS9meSVb3M3SKGbUPI4r5&union_lens=lensId%3AMAPI%401594965212%400b183772_0eba_1735b55be23_8dcd%4001";
        // window.mtopjsonp1 = function(a) {
        //   console.log(a);
        // };

        if (this.$route.query.ziyings == true) {
          this.ziyings = true;
        } else {
          this.ziyings = false;
        }
        //是否收藏
        getstatus({
          goodsId: this.$route.query.goodsId,
          dataSource: this.$route.query.dataSource,
        }).then((res) => {
          if (res.data.data.isFavorite == true) {
            this.collectionShow = 1;
          } else {
            this.collectionShow = 0;l
          }
        });
      },
    },
  },
  //清除
  beforeDestroy() {
    window.removeEventListener("scroll", this.lala);
  },
  mounted() {
    this.show1 = false;
    window.scrollTo(0, 0);
    // 吸顶导航
    this.$nextTick(() => {
      window.addEventListener("scroll", this.lala);
    });
    //相似
    similarGoodsRecommend({
      goodsId: this.$route.query.goodsId,
      goodsName: this.$route.query.goodsName,
      dataSource: this.$route.query.dataSource,
    }).then((res) => {
      this.list = res.data.data.goodsList;
      let lists = this.list;
      if (this.list.length != 0) {
        let arr = [];
        let arri = [];
        let lists = this.list;
        lists.forEach((x, i) => {
          if (i >= 0 && i <= 5) {
            let arrs = arr.push(x);
            this.list = arr;
          }
          if (i >= 6 && i <= 11) {
            let arrs = arri.push(x);
            this.ersd = arri;
          }
        });
      }
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.lala, true);
  },
  methods: {
    onChanges(index) {
      this.currents = index;
    },
    //回顶部
    goTo() {
      window.scrollTo(0, 0);
    },
    //回退
    backOff() {
      this.$router.go(-1);
    },
    //跳转
    land() {
      let ob = JSON.parse(localStorage.getItem("jd-webapp"));
      if (ob == null) {
        this.$router.push({ name: "register" });
      } else {
        // 淘宝
        if (
          (this.$route.query.dataSource == "2" &&
            this.$route.query.userType != "1") ||
          (this.$route.query.dataSource == "2" &&
            this.$route.query.userType == "1")
        ) {
          this.imgType = "tb";
          // 判断是否淘宝授权
          if (this.$store.getters.trelationId) {
            this.show1 = true;
            this.shareUrl = this.$route.query.shareUrl;
          } else {
            this.show = true;
          }
          // 拼多多
        } else if (this.$route.query.dataSource == "1") {
          this.imgType = "pdd";
          createPddExtensionUrl({
            goodsId: this.$route.query.goodsId,
          }).then((res) => {
            this.show1 = true;
            this.shareUrl = res.data.data.url;
          });
          // 京东
        } else if (this.$route.query.dataSource == "3") {
          this.imgType = "jd";
          getJdGoodsRecommendUrl({
            goodsUrl: this.$route.query.goodsUrl,
            couponUrl: this.$route.query.jdCouponUrl,
          }).then((res) => {
            this.show1 = true;
            this.shareUrl = res.data.data.JdUrl;
          });
        }
      }
    },
    //分享赚
    share() {
      let ob = JSON.parse(localStorage.getItem("jd-webapp"));
      if (ob == null) {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({
          name: "blank",
          query: {
            rotationList: this.rotationList,
            imgUrlArr: this.$route.query.imgUrlArr,
            goodsName: this.$route.query.goodsName, //商品名称
            mallName: this.$route.query.mallName,
            originalPrice: this.$route.query.originalPrice, //原价
            returnMoney: this.$route.query.returnMoney, //返利
            dataSource: this.$route.query.dataSource, //来源
            strVolume: this.$route.query.strVolume,
            discountPrice: this.$route.query.discountPrice,
            couponStartTime: this.$route.query.couponStartTime || "",
            couponEndTime: this.$route.query.couponEndTime || "",
            couponDiscount: this.$route.query.couponDiscount, //优惠券价值
            userType: this.$route.query.userType,
            jdCouponUrl: this.$route.query.jdCouponUrl, //京东优惠
            goodsUrl: this.$route.query.goodsUrl,
            goodsId: this.$route.query.goodsId, //商品 id
            url: this.$route.query.shareUrl || this.$route.query.goodsUrl, //商品跳转链接
            thumbnailUrl: this.$route.query.thumbnailUrl, //缩略图
            backPrice: this.$route.query.backPrice, //饭后价
          },
        });
      }
    },
    //点击商品
    homepage(x) {
      //是否收藏
      getstatus({
        goodsId: this.$route.query.goodsId,
        dataSource: this.$route.query.dataSource,
      }).then((res) => {
        if (res.data.data.isFavorite == true) {
          this.collectionShow = 1;
        } else {
          this.collectionShow = 0;
        }
      });

      this.artList = x;
      window.scroll(0, 0);
      this.isad = true;
      setTimeout(() => {
        this.isad = false;
      }, 1000);
      this.returnMoney = x.returnMoney;
      this.$router.push({
        name: "details",
        query: {
          imgUrlArr: x.imgUrlArr,
          goodsName: x.goodsName, //商品名称
          mallName: x.mallName,
          originalPrice: x.originalPrice, //原价
          returnMoney: x.returnMoney, //返利
          dataSource: x.dataSource, //来源
          strVolume: x.strVolume,
          discountPrice: x.discountPrice,
          couponStartTime: x.couponStartTime || "",
          couponEndTime: x.couponEndTime || "",
          couponDiscount: x.couponDiscount,
          userType: x.userType,
          jdCouponUrl: x.jdCouponUrl, //京东优惠
          goodsUrl: x.goodsUrl,
          goodsId: x.goodsId, //商品 id
          shareUrl: x.shareUrl,
          url: x.url, //商品跳转链接
          thumbnailUrl: x.thumbnailUrl, //缩略图
          backPrice: x.backPrice, //饭后价
          goodsTagList: JSON.stringify(x.goodsTagList) || null,
        },
      });
    },
    //滚动条事件
    lala() {
      let scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollHeight >= 10) {
        this.babyShow = true;
        this.xiding = true;
        if (
          scrollHeight >= 0 &&
          scrollHeight <= this.$refs.shop.offsetTop - 50
        ) {
          this.activeName = "1";
        } else if (scrollHeight >= this.$refs.shop.offsetTop) {
          this.activeName = "2";
        }
      } else {
        this.babyShow = false;
      }
      if (scrollHeight >= 500) {
        this.imgMao = false;
      } else {
        this.imgMao = false;
      }
    },
    //吸顶后点击
    clickTab(name) {
      if (this.activeName == "2") {
        this.$nextTick(() => {
          this.activeName = "2";
          window.scrollTo(0, this.$refs.shop.offsetTop - 45);
          this.$refs.tabszhi.resize();
        });
      } else if (this.activeName == "1") {
        window.scrollTo(0, 0);
        this.$refs.tabszhi.resize();
      }
    },
    // 收藏
    collection() {
      let ob = JSON.parse(localStorage.getItem("jd-webapp"));
      if (ob == null) {
        this.$router.push({ name: "register" });
      } else {
        if (this.collectionShow == 1) {
          getdelete(this.formData).then((res) => {
            Toast("取消收藏");
            this.collectionShow = 0;
          });
        } else {
          getGet().then((res) => {
            if (res.data.data.length == 20) {
              this.collectionShow = 0;
              Toast("最多收藏20个商品哦");
            } else {
              getput(this.formData).then((res) => {
                Toast("收藏成功");
                this.collectionShow = 1;
              });
            }
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.detalis {
  height: auto;
  position: relative;
  background: #f6f6f6;
  padding-bottom: 3rem;
  animation: bounce 0.25s forward;
  z-index: 10001;
}
.goto_left {
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  position: absolute;
  top: 15px;
  left: 12px;
  z-index: 10;
  img {
    width: 28%;
    height: 55%;
    margin-top: 6px;
    margin-left: 10px;
  }
}
::v-deep .van-nav-bar__left {
  width: 23.44rem !important;
  background: white !important;
}
::v-deep .van-swipe__track {
  width: 23.4375rem !important;
  height: 23.44rem !important;
  img {
    width: 100%;
    height: 100%;
  }
}
.title {
  width: 21.94rem;
  height: auto;
  padding: 0.7rem auto;
  margin: 0 auto;
  .icon {
    width: 0.88rem;
    height: 0.88rem;
    vertical-align: middle;
  }
}
.label {
  text-align: left;
  .van-tag {
    margin: 0.2rem 0 0.2rem 0.3rem;
    font-size: 10px;
  }
}
.price {
  width: 22rem;
  height: auto;
  margin: 0.5rem auto 0.5rem;
  color: #3f3f3f;
  .price_sb {
    color: red;
    font-size: 0.65rem;
    span {
      font-size: 1.15rem;
    }
    s {
      color: #3f3f3f;
    }
    .again {
      width: auto;
      height: 2rem;
      border: solid 1px;
      font-size: 0.8125rem;
      padding: 0.03rem 0.2rem;
    }
  }
  p:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
  }
}
.coupon {
  width: 21.94rem;
  height: 3.88rem;
  margin: 0.5rem auto;
  background: url("../../assets/券bg@2x.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  color: #ffe7cc;
  div {
    margin: 0.3rem 1rem 0;
  }
  .price_sb {
    width: 4rem;
    margin-top: 1.3rem;
    margin-right: 1rem;
  }
}
.shop {
  width: 100%;
  height: auto;
  display: flex;
  margin: 0.5rem 0;
  background: white;
  box-sizing: border-box;
  padding: 0.75rem;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 0.25rem;
  }
  div {
    margin: 0 0.25rem;
    p {
      margin: 0.25rem 0;
      span {
        font-size: 0.6875rem;
        color: #999;
        margin-left: 1rem;
      }
    }
  }
}
.back {
  width: 100%;
  height: 3.5rem;
  background: white;
  position: fixed;
  bottom: 0;
  .collectionss {
    width: 4rem;
    height: 1rem;
    position: relative;
    top: 1.2rem;
    text-align: center;
    color: #ff0c05;
    font-size: 18px;
  }

  .land {
    width: 18.8125rem;
    height: 2.75rem;
    border-radius: 1.38rem;
    color: white;
    border: none;
    position: fixed;
    bottom: 0.4rem;
    left: 4rem;
    display: flex;
    .van-button:nth-child(2) {
      width: 9.375rem;
      border-bottom-right-radius: 1.38rem;
      border-top-right-radius: 1.38rem;
      background: #fe0c05;
      border: none;
      font-size: 16px;
      color: #ffffff;
    }
    .van-button:nth-child(1) {
      width: 9.375rem;
      border-bottom-left-radius: 1.38rem;
      border-top-left-radius: 1.38rem;
      background: #ff9800;
      font-size: 16px;
      color: #ffffff;
      border: none;
    }
  }
}
.recommendP {
  margin: 0.75rem;
}
.recommend {
  width: auto;
  height: auto;
  margin: 0 0.75rem;
  background: white;
  overflow: auto;
  .recommendDiv {
    display: flex;
    div {
      width: 9.25rem;
      height: 9.25rem;
      margin: 0 0.4rem 4rem;
      flex-shrink: 0;
      p {
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
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.xiding {
  position: fixed;
  top: 0;
  z-index: 100;
}

.custom-indicator {
  position: absolute;
  right: 0.3125rem;
  bottom: 0.3125rem;
  padding: 0.25rem 0.625rem;
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.4rem;
  color: white;
}

.xiangqing {
  padding-bottom: 0.8rem;
  .xqingImg {
    width: 23.44rem;
    height: auto;
    padding-bottom: 3.5rem;
    img:last-child {
      margin-bottom: 2rem;
    }
  }
  p {
    width: 100%;
    height: auto;
    padding: 0.1rem 0;
    text-align: center;
    font-size: 0.625rem;
  }
}
//京东自营
.iconjd {
  width: 1.5rem;
  height: 0.88rem;
  vertical-align: middle;
  margin-left: 0.2rem;
}
.bootmbox {
  background: white;
  padding: 0.75rem 0 0;
}

.animation-fade {
  animation-name: fade;
  animation-duration: 1s;
  animation-timing-function: linear;
}
@keyframes fade {
  0% {
    right: 0;
      transform: translateX(100%);
  }
  25% {
    right: 100px;
      transform: translateX(100px);
  }
  50% {
   right: 100px;
      transform: translateX(100px);
  }
  75% {
   right: 100px;
      transform: translateX(100px);
  }
  100% {
   right: 100px;
      transform: translateX(100px);
  }
}
.collection {
  width: 3rem;
  height: 3rem;
  position: fixed;
  bottom: 4rem;
  right: 1.5rem;
  border-radius: 50%;
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
</style>