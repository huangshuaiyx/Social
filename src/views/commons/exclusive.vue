<template>
  <div class="exclusive">
    <!-- 淘宝 -->
    <div class="taobao" v-if="$route.query.dataSource == 2  && $route.query.navigationName == '淘宝'">
      <div class="searchImg">
        <img src="../../assets/gongge/淘宝LOGO@2x.png" alt />
        <input type="text" name id :placeholder="sdsf" @click="Jump($route.query.dataSource)" />
        <img class="tubiao" src="../../assets/gongge/home_icon_search@2x.png" alt />
        <img class="tui" src="../../assets/gongge/退出icon白@2x.png" alt @click="$router.go(-1)" />
      </div>
      <van-tabs v-model="activeName" line-width="10px" title-active-color="#fff" @click="tab">
        <van-tab style="height:1rem" title="推荐" name="-1"></van-tab>
        <van-tab :title="x.catName" :name=" String(x.catId)" v-for="(x,i) of tabList" :key="i"></van-tab>
      </van-tabs>
    </div>
    <!-- 京东 -->
    <div class="jingdong" v-if="$route.query.dataSource == 3">
      <div class="searchImg">
        <img src="../../assets/gongge/京东LOGO@2x.png" alt />
        <input type="text" name id :placeholder="sdsf" @click="Jump($route.query.dataSource)" />
        <img class="tubiao" src="../../assets/gongge/home_icon_search@2x.png" alt />
        <img class="tui" src="../../assets/gongge/退出icon白@2x.png" alt @click="$router.go(-1)" />
      </div>
      <van-tabs v-model="activeName" line-width="10px" title-active-color="#fff" @click="tab">
        <van-tab style="height:1rem" title="推荐" name="-1"></van-tab>
        <van-tab :title="x.catName" :name=" String(x.catId)" v-for="(x,i) of tabList" :key="i"></van-tab>
      </van-tabs>
    </div>
    <!-- 拼多多 -->
    <div class="pinduoduo" v-if="$route.query.dataSource == 1">
      <div class="searchImg">
        <img src="../../assets/gongge/拼多多LOGO@2x.png" alt />
        <input type="text" name id :placeholder="sdsf" @click="Jump($route.query.dataSource)" />
        <img class="tubiao" src="../../assets/gongge/home_icon_search@2x.png" alt />
        <img class="tui" src="../../assets/gongge/退出icon白@2x.png" alt @click="$router.go(-1)" />
      </div>
      <van-tabs v-model="activeName" line-width="10px" title-active-color="#fff" @click="tab">
        <van-tab style="height:1rem" title="推荐" name="-1"></van-tab>
        <van-tab :title="x.catName" :name=" String(x.catId)" v-for="(x,i) of tabList" :key="i"></van-tab>
      </van-tabs>
    </div>
    <!-- 天猫 -->
    <div class="tianmao" v-if="$route.query.dataSource == 2 && $route.query.navigationName == '天猫'">
      <div class="searchImg">
        <img src="../../assets/gongge/天猫LOGO@2x.png" alt />
        <input type="text" name id :placeholder="sdsf" @click="Jump($route.query.dataSource)" />
        <img class="tubiao" src="../../assets/gongge/home_icon_search@2x.png" alt />
        <img class="tui" src="../../assets/gongge/退出icon白@2x.png" alt @click="$router.go(-1)" />
      </div>
      <van-tabs v-model="activeName" line-width="10px" title-active-color="#fff" @click="tab">
        <van-tab style="height:1rem" title="推荐" name="-1"></van-tab>
        <van-tab :title="x.catName" :name=" String(x.catId)" v-for="(x,i) of tabList" :key="i"></van-tab>
      </van-tabs>
    </div>
    <!-- 商品 -->
    <div class="two">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多啦~"
          @load="onLoad"
          :immediate-check="false"
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
  </div>
</template>

<script>
import {
  indexBarGoodsList, //page , navigationId , dataSource
  getDataSourceCat, //dataSource , owner
  getCatGoods, //page , sort , dataSource , catId
} from "@/api/api.js";

const owner_taobao = 0;
const owner_tianmao = 1;
const owner_jd_seif = 2;
const owner_jingdong = 3;

export default {
  data() {
    return {
      activeName: "", //二级分类
      value: "", //搜索
      sdsf: "顶顶顶", //input提示
      tabList: [], //二级数据
      list: [], //商品数据
      // 跳转淘宝相关
      show1: false,
      shareUrl: "",
      returnMoney: 0,
      imgType: "",
      // 绑定淘宝相关
      show: false,
      imgMao: false,
      // 下拉列表
      loading: false,
      finished: false,
      refreshing: false,
      formData: {
        page: 1,
        navigationId: this.$route.query.navigationId,
        itemId: this.$route.query.itemId,
        dataSource: this.$route.query.dataSource,
        owner: "",
        page: 0,
        sort: 0, //0排序,1返利,2销量,3返后价,4京东自营,5非京东,6天猫,7淘宝自营
        catId: this.$store.state.activename,
        navigationName: "推荐",
      },
    };
  },
  mounted() {
    this.onLoad();
    if (this.$route.query.dataSource == 1) {
      this.formData.owner = null;
    } else if (this.$route.query.dataSource == 2) {
      this.formData.owner = owner_taobao;
    } else if (this.$route.query.dataSource == 3) {
      this.formData.owner = owner_jingdong;
    } else if (this.$route.query.dataSource == 4) {
      this.formData.owner = owner_tianmao;
    }
    getDataSourceCat(this.formData).then((res) => {
      this.tabList = res.data.data.treeCat;
    });
    window.scrollTo(0, 0);
    this.$nextTick(() => {
      window.addEventListener("scroll", this.lala);
    });
  },
  methods: {
    //tab点击
    tab(name, title) {
      this.formData.navigationName = title;
      this.formData.page = 0;
      window.scrollTo(0, 0);
      this.$store.commit("activename", name);
      this.formData.catId = name;
      this.list = [];
      this.onLoad();
    },
    onLoad() {
      this.formData.page++;
      this.formData.catId = this.$store.state.activename;
      if (this.formData.navigationName == "推荐") {
        indexBarGoodsList(this.formData)
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
      } else if (this.formData.navigationName != "推荐") {
        if (this.$route.query.dataSource == 1) {
          //拼多多
          this.formData.sort = 0;
        } else if (this.$route.query.dataSource == 2) {
          //淘宝
          this.formData.sort = 7;
        } else if (this.$route.query.dataSource == 3) {
          //京东
          this.formData.sort = 0;
        } else if (this.$route.query.dataSource == 4) {
          //天猫
          this.formData.sort = 6;
        } else this.formData.sort = 7;
        getCatGoods(this.formData)
          .then((res) => {
            this.loading = false;
            this.refreshing = false;
            if (res.data.data.isLastPage != true) {
              this.list = this.list.concat(res.data.data.goodsList);
            } else {
              this.list = res.data.data.goodsList;
              this.finished = true;
            }
          })
          .catch((err) => {
            this.loading = false;
            this.refreshing = false;
          });
      }
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
    Jump(x) {
      this.$router.push({
        name: "seach",
        query: {
          tab: x,
        },
      });
    },
  },
};
</script>



<style lang="scss" scoped>
.exclusive {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .taobao {
    width: 100%;
    height: auto;
    background: linear-gradient(to top left, #fe5301, #fe8312);
    position: fixed;
    top: 0;
    z-index: 100;
    .searchImg {
      width: auto;
      height: auto;
      display: flex;
      padding: 0.75rem;
      position: relative;
      img:nth-child(1) {
        width: 3.75rem;
        height: 2.125rem;
      }
      input {
        width: 15.3125rem;
        height: 1.8rem;
        margin-left: 0.5rem;
        background: #fff;
        border-radius: 1rem;
        border: none;
        margin-top: 0.1rem;
        &::-webkit-input-placeholder {
          position: relative;
          left: 1.8rem;
          font-size: 14px;
          color: #c4c4c4;
        }
      }
      .tubiao {
        width: 0.875rem;
        height: 0.875rem;
        position: absolute;
        top: 1.3rem;
        left: 5.6rem;
      }
      .tui {
        width: 0.8625rem;
        height: 0.8625rem;
        margin-top: 0.6rem;
        margin-left: 1rem;
      }
    }
    ::v-deep .van-tabs {
      border: none;
      .van-tabs__wrap {
        .van-tabs__nav {
          background: linear-gradient(to top left, #fe5301, #fe8312);
          background-color: none;
        }
      }
      .van-tab {
        color: #fff;
        flex-basis: auto !important;
        margin: 0 0.3rem;
        opacity: 0.9;
      }
      .van-tabs__line {
        bottom: 1.2rem;
        background-color: #fff;
      }
    }
    ::v-deep .van-tabs__content {
      .van-tab__pane {
        display: none;
      }
    }
  }
  .jingdong {
    width: 100%;
    height: auto;
    background: linear-gradient(to top left, #f91f39, #f92d1a);
    position: fixed;
    top: 0;
    z-index: 100;
    .searchImg {
      width: auto;
      height: auto;
      display: flex;
      padding: 0.75rem;
      position: relative;
      img:nth-child(1) {
        width: 5.55rem;
        height: 2.125rem;
      }
      input {
        width: 15.3125rem;
        height: 1.8rem;
        margin-left: 0.5rem;
        background: #fff;
        border-radius: 1rem;
        border: none;
        margin-top: 0.1rem;
        &::-webkit-input-placeholder {
          position: relative;
          left: 1.8rem;
          font-size: 14px;
          color: #c4c4c4;
        }
      }
      .tubiao {
        width: 0.875rem;
        height: 0.875rem;
        position: absolute;
        top: 1.2rem;
        left: 7.4rem;
      }
      .tui {
        width: 0.8625rem;
        height: 0.8625rem;
        margin-top: 0.6rem;
        margin-left: 1rem;
      }
    }
    ::v-deep .van-tabs {
      border: none;
      .van-tabs__wrap {
        .van-tabs__nav {
          background: linear-gradient(to top left, #f91f39, #f92d1a);
          background-color: none;
        }
      }
      .van-tab {
        color: #fff;
        flex-basis: auto !important;
        margin: 0 0.3rem;
        opacity: 0.9;
      }
      .van-tabs__line {
        bottom: 1.2rem;
        background-color: #fff;
      }
    }
    ::v-deep .van-tabs__content {
      .van-tab__pane {
        display: none;
      }
    }
  }
  .pinduoduo {
    width: 100%;
    height: auto;
    background: #e02e24;
    position: fixed;
    top: 0;
    z-index: 100;
    .searchImg {
      width: auto;
      height: auto;
      display: flex;
      padding: 0.75rem;
      position: relative;
      img:nth-child(1) {
        width: 5.55rem;
        height: 2.125rem;
      }
      input {
        width: 15.3125rem;
        height: 1.8rem;
        margin-left: 0.5rem;
        background: #fff;
        border-radius: 1rem;
        border: none;
        margin-top: 0.1rem;
        &::-webkit-input-placeholder {
          position: relative;
          left: 2rem;
          top: 0.05rem;
          font-size: 14px;
          color: #c4c4c4;
        }
      }
      .tubiao {
        width: 0.875rem;
        height: 0.875rem;
        position: absolute;
        top: 1.3rem;
        left: 7.4rem;
      }
      .tui {
        width: 0.8625rem;
        height: 0.8625rem;
        margin-top: 0.6rem;
        margin-left: 1rem;
      }
    }
    ::v-deep .van-tabs {
      border: none;
      .van-tabs__wrap {
        .van-tabs__nav {
          background: #e02e24;
          background-color: none;
        }
      }
      .van-tab {
        color: #fff;
        flex-basis: auto !important;
        margin: 0 0.3rem;
        opacity: 0.9;
      }
      .van-tabs__line {
        bottom: 1.2rem;
        background-color: #fff;
      }
    }
    ::v-deep .van-tabs__content {
      .van-tab__pane {
        display: none;
      }
    }
  }
  .tianmao {
    width: 100%;
    height: auto;
    background: linear-gradient(to top left, #fe0037, #fe0065);
    position: fixed;
    top: 0;
    z-index: 100;
    .searchImg {
      width: auto;
      height: auto;
      display: flex;
      padding: 0.75rem;
      position: relative;
      img:nth-child(1) {
        width: 3rem;
        height: 2.125rem;
      }
      input {
        width: 16.3125rem;
        height: 1.8rem;
        margin-left: 0.5rem;
        background: #fff;
        border-radius: 1rem;
        border: none;
        margin-top: 0.1rem;
        &::-webkit-input-placeholder {
          position: relative;
          left: 1.8rem;
          font-size: 14px;
          color: #c4c4c4;
        }
      }
      .tubiao {
        width: 0.875rem;
        height: 0.875rem;
        position: absolute;
        top: 1.2rem;
        left: 4.8rem;
      }
      .tui {
        width: 0.8625rem;
        height: 0.8625rem;
        margin-top: 0.6rem;
        margin-left: 1rem;
      }
    }
    ::v-deep .van-tabs {
      border: none;
      .van-tabs__wrap {
        .van-tabs__nav {
          background: linear-gradient(to top left, #fe0037, #fe0065);
          background-color: none;
        }
      }
      .van-tab {
        color: #fff;
        flex-basis: auto !important;
        margin: 0 0.3rem;
        opacity: 0.9;
      }
      .van-tabs__line {
        bottom: 1.2rem;
        background-color: #fff;
      }
    }
    ::v-deep .van-tabs__content {
      .van-tab__pane {
        display: none;
      }
    }
  }
  ::v-deep .van-list {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    overflow: hidden;
  }
  .shop {
    margin-top: 6.5rem;
  }
  .two {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    padding-bottom: 3rem;
    margin-top: 6.5rem;
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

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}
</style>