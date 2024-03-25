<template>
  <div style="width:100%;marginTop:1.5rem">
    <div style="width:100%;height:auto;position:fixed;top:0;
      z-index: 100">
      <div class="title">
        <van-icon size="1.5rem" name="arrow-left" @click="arrowLeft()" />
        <form action="/">
          <van-search
            v-model="value"
            placeholder="粘贴淘宝商品标题 领优惠卷享返利"
            @input="search"
            @search="onSearch"
            shape="round"
            @focus="focus(value)"
            @blur="blur(value)"
          />
        </form>
      </div>
      <!-- 淘宝,京东,拼多多 -->
      <div style="marginTop:2.9rem;z-index: 1001;">
        <van-tabs
          type="line"
          v-model="activeName"
          line-width="1.5rem"
          line-height="0.1rem"
          @click="clickTab"
          :border="false"
        >
          <van-tab title="天猫淘宝" name="2"></van-tab>
          <van-tab title="京东" name="3"></van-tab>
          <van-tab title="拼多多" name="1"></van-tab>
        </van-tabs>

        <!-- 模糊搜索 -->
        <div class="vague" v-show="vague">
          <!-- <p @click="clickHistory(value+ x)" v-for="(x,i) of ssarr" :key="i">
            <span style="color:#999">{{value}}</span>
            {{x}}
          </p>-->
          <p @click="clickHistory( x)" v-for="(x,i) of ssarr" :key="i">{{x}}</p>
        </div>
      </div>
      <!-- 综合..淘宝  置顶 -->
      <div class="tabs" ref="tabsd">
        <van-tabs
          type="line"
          v-model="active"
          title-active-color="red"
          @click="clickTabs"
          line-width="0"
          :border="false"
          v-if="tabstwo"
        >
          <van-tab title="综合" name="0"></van-tab>
          <van-tab title="高返" name="1"></van-tab>
          <van-tab title="销量" name="2"></van-tab>
          <van-tab title="价格" name="3"></van-tab>
          <img class="img" v-if="active != 3" src="../../assets/icon_返后价默认@2x.png" alt />
          <img
            class="img"
            v-if="active == 3 && formData.sortType == 'desc'"
            src="../../assets/icon_返后价降序2@2x.png"
            alt
          />
          <img
            class="img"
            v-if="active == 3 && formData.sortType == 'asc'"
            src="../../assets/icon_price_rise@2x.png"
            alt
          />
        </van-tabs>
      </div>
      <!-- 综合..京东  置顶 -->
      <div class="tabs" ref="tabsdaf">
        <van-tabs
          type="line"
          v-model="activeaf"
          title-active-color="red"
          @click="clickTabaf"
          line-width="0"
          :border="false"
          v-if="tabstwosd"
        >
          <van-tab :title="title" name></van-tab>
          <img v-if="activeaf != ''" class="comprehensiveImg" src="../../assets/综合未选灰@2x.png" alt />
          <img v-if="activeaf == ''" class="comprehensiveImg" src="../../assets/综合默认@2x.png" alt />
          <van-tab title="高返" name="1"></van-tab>
          <van-tab title="销量" name="2"></van-tab>
          <van-tab title="价格" name="3"></van-tab>
          <img class="img" v-if="activeaf != 3" src="../../assets/icon_返后价默认@2x.png" alt />
          <img
            class="img"
            v-if="activeaf == 3 && formData.sortType == 'desc'"
            src="../../assets/icon_返后价降序2@2x.png"
            alt
          />
          <img
            class="img"
            v-if="activeaf == 3 && formData.sortType == 'asc'"
            src="../../assets/icon_price_rise@2x.png"
            alt
          />
        </van-tabs>
      </div>
      <!-- 综合..拼多多  置顶 -->
      <div class="tabs" ref="tabsdre">
        <van-tabs
          type="line"
          v-model="activere"
          title-active-color="red"
          @click="clickTabre"
          line-width="0"
          :border="false"
          v-if="tabstwos"
        >
          <van-tab title="综合" name="0"></van-tab>
          <van-tab title="高返" name="1"></van-tab>
          <van-tab title="销量" name="2"></van-tab>
          <van-tab title="价格" name="3"></van-tab>
          <img class="img" v-if="activere != 3" src="../../assets/icon_返后价默认@2x.png" alt />
          <img
            class="img"
            v-if="activere == 3 && formData.sortType == 'desc'"
            src="../../assets/icon_返后价降序2@2x.png"
            alt
          />
          <img
            class="img"
            v-if="activere == 3 && formData.sortType == 'asc'"
            src="../../assets/icon_price_rise@2x.png"
            alt
          />
        </van-tabs>
      </div>
    </div>
    <!-- 商品 -->
    <div class="shop" v-show="shop">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="true" offset="3000">
          <figure v-for="(x,i) of arrList" :key="i" @click="homepage(x)" ref="figure">
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
                <!-- 京东自营 -->
                <img class="iconjd" v-if="x.userType == 2 " src="../../assets/自营icon@3x.png" alt />
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
                  v-if="x.couponDiscountV2 && x.couponDiscountV2 != 0"
                >{{x.couponDiscountV2}}元券</span>
                <span class="good-teer">返{{x.returnMoneyV2}}元</span>
              </p>
              <p style="color:#fe0c05;font-size:0.69rem" class="goog-five">
                <span>
                  返后价 ¥
                  <span style="font-size:18px">
                {{x.discountPriceV2}}
                  </span>
                  <s style="color:#999">原价¥{{x.originalPrice}}</s>
                </span>
              </p>
              <p class="good-six" style="color:gray">
                <span>
                  {{x.shopName | ellips}}
                  <span>{{x.provcity}}</span>
                </span>
                <span class="sales">月销{{x.strVolume}}</span>
              </p>
            </figcaption>
          </figure>
        </van-list>
      </van-pull-refresh>
    </div>
    <p class="moreNo" v-show="more">没有更多啦~</p>
    <!-- 搜索无结果 -->
    <!-- <kong :data="child" v-if="show"></kong> -->
    <div v-if="kong">
      <router-view v-if="!$route.meta.keepkong"></router-view>
      <keep-alive>
        <router-view v-if="!$route.meta.keepkong"></router-view>
      </keep-alive>
    </div>
    <!-- 综合 -->
    <div class="mask">
      <div class="comprehensive" v-show="comprehensiveShow">
        <p @click="comprehensiveP(0)" ref="comprehensivePone">
          <span>综合</span>
          <span>
            <img
              ref="comprehensiveImgone"
              v-show="comprehensiveImgone"
              src="../../assets/综合选中@2x.png"
              alt
            />
          </span>
        </p>
        <p @click="comprehensiveP(1)" ref="comprehensivePtwo">
          <span>自营</span>
          <span>
            <img
              ref="comprehensiveImgtwo"
              v-show="comprehensiveImgtwo"
              src="../../assets/综合选中@2x.png"
              alt
            />
          </span>
        </p>
        <p @click="comprehensiveP(2)" ref="comprehensivePthree">
          <span>非自营</span>
          <span>
            <img
              ref="comprehensiveImgthree"
              v-show="comprehensiveImgthree"
              src="../../assets/综合选中@2x.png"
              alt
            />
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import {
  getsearch,
  getGoodsDetails,
  getCatGoods,
  getKeyWordsByWords,
  noGoodsRecommend,
} from "@/api/api.js";
import kong from "../search/kong";

export default {
  filters: {
    //超过x位显示...
    ellips: function (value) {
      if (!value) return "";
      if (value.length > 8) {
        return value.slice(0, 8);
      }
      return value;
    },
  },

  data() {
    return {
      comprehensiveShow: false, //综合
      comprehensiveImgone: false, //小分类 综合
      comprehensiveImgtwo: false, //小分类 自营
      comprehensiveImgthree: false, //小分类 非自营
      activeName: this.$route.query.name, //tab默认值
      active: 0,
      activeaf: 0,
      activere: 0,
      value: this.$route.query.history, //搜索默认值
      refreshing: false,
      finished: false,
      loading: false,
      arrList: [],
      formData: {
        keyWord: this.$route.query.history || "",
        sort: 0,
        sortType: "desc",
        dataSource: this.$route.query.name || 2,
        listId: "",
        source: 2,
        owner: "",
        page: 0,
        version: "1.1.5",
      },
      show: false,
      dataSource: this.$route.query.activeName,
      ssarr: [],
      vague: false, //模糊搜搜
      tabs: true, //二级tab 隐藏
      shop: true, //商品列表隐藏
      ziying: true, //京东自营
      imgMao: false,
      i: 0,
      chuanzhi: "",
      more: false, //没有更多 提示语
      kong: true,
      ziyings: false, //二级自营
      souarr: [],
      tabstwo: false, //获取焦点隐藏
      tabstwos: false,
      tabstwosd: false,
      title: "综合", //京东综合
    };
  },
  //销毁滚动
  beforeDestroy() {
    window.removeEventListener("scroll", this.lala);
  },
  mounted() {
    this.title = "综合";
    if (this.$route.query.name == 3) {
      //京东
      this.tabstwosd = true;
      this.tabstwos = false;
      this.tabstwo = false;
    }
    if (this.$route.query.name == 2) {
      //淘宝
      this.tabstwo = true;
      this.tabstwos = false;
      this.tabstwosd = false;
    }
    if (this.$route.query.name == 1) {
      //品多少
      this.tabstwos = true;
      this.tabstwo = false;
      this.tabstwosd = false;
    }
    window.addEventListener("scroll", this.lala);
  },
  methods: {
    //回顶部
    goTo() {
      window.scrollTo(0, 0);
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
      var scroll = scrollHeight - this.i;
      this.i = scrollHeight;
      if (scroll <= 1) {
        this.$refs.tabsd.style.position = "fixed";
        this.$refs.tabsd.style.top = "5.7rem";
        this.$refs.tabsd.style.width = "100%";
        // this.tabs = true;
      } else {
        this.$refs.tabsd.style.position = "fixed";
        this.$refs.tabsd.style.top = "0.2rem";
        this.$refs.tabsd.style.width = "100%";
        // this.tabs = true;
      }
      if (scroll <= 1) {
        this.$refs.tabsdre.style.position = "fixed";
        this.$refs.tabsdre.style.top = "5.7rem";
        this.$refs.tabsdre.style.width = "100%";
        // this.tabs = true;
      } else {
        this.$refs.tabsdre.style.position = "fixed";
        this.$refs.tabsdre.style.top = "0.2rem";
        this.$refs.tabsdre.style.width = "100%";
        // this.tabs = true;
      }
      if (scroll <= 1) {
        this.$refs.tabsdaf.style.position = "fixed";
        this.$refs.tabsdaf.style.top = "5.7rem";
        this.$refs.tabsdaf.style.width = "100%";
        // this.tabs = true;
      } else {
        this.$refs.tabsdaf.style.position = "fixed";
        this.$refs.tabsdaf.style.top = "0.2rem";
        this.$refs.tabsdaf.style.width = "100%";
        // this.tabs = true;
      }
    },
    //输入框内容变化
    search(val) {
      if (this.value == "") {
        this.$router.push({
          name: "seach",
          query: { tab: this.formData.dataSource },
        });
      } else {
        this.kong = false;
        this.tabstwo = false;
        getKeyWordsByWords({
          keyWords: val,
        }).then((res) => {
          if (res.data == {}) {
            this.$router.push({ name: "kong" });
          } else {
            this.ssarr = res.data.data;
          }
        });
      }
    },
    //获取焦点
    focus(val) {
      this.tabs = false;
      this.vague = true;
      this.shop = false;
      this.kong = false;
      this.tabstwo = false;
      this.tabstwos = false;
      this.tabstwosd = false;
      getKeyWordsByWords({
        keyWords: this.value,
      })
        .then((res) => {
          if (res.data == {}) {
            this.$router.push({ name: "kong" });
          } else {
            this.ssarr = res.data.data;
          }
          //搜索高亮
          // if (res.data == {}) {
          //   this.$router.push({ name: "kong" });
          // } else {
          //   let zz = "/" + this.value + "/g";
          //   let ssarr = res.data.data;
          //   for (let i = 0, len = ssarr.length; i < len; i += 1) {
          //     ssarr[i] = ssarr[i].replace(eval(zz), "");
          //   }
          //   this.ssarr = ssarr;
          // }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //失去焦点
    blur(val) {
      this.tabstwo = true;
    },
    //模糊搜索
    clickHistory(x) {
      let souarr = localStorage.getItem("souarr")
        ? JSON.parse(localStorage.getItem("souarr"))
        : [];
      souarr.unshift(x);
      localStorage.setItem("souarr", JSON.stringify(souarr));
      this.souarr = [...souarr];
      // getsearch(this.formData);
      this.tabs = true;
      this.vague = false;
      this.shop = true;
      this.value = x;
      this.$router.push({
        name: "shop",
        query: { history: x, name: this.activeName },
      });
      this.arrList = [];
      this.formData.source = 3;
      this.formData.page = 1;
      this.formData.keyWord = x;
      this.getDate(this.formData);
      window.location.reload()
    },
    //回车事件
    onSearch(val) {
      if (val == "") {
        Toast("请输入内容");
      } else {
        let souarr = localStorage.getItem("souarr")
          ? JSON.parse(localStorage.getItem("souarr"))
          : [];
        souarr.unshift(val);
        localStorage.setItem("souarr", JSON.stringify(souarr));
        // this.souarr = [...souarr];
        this.secondLevel = true;
        this.tabs = true;
        this.vague = false;
        this.shop = true;
        this.arrList = [];
        this.getDate(this.formData);
      }
    },
    //tabs一级
    clickTab(name, title) {
      window.scrollTo(0, 0);
      this.$store.commit("dataTypes", name);
      this.arrList = [];
      if (name == "3") {
        //京东
        this.tabstwosd = true;
        this.tabstwos = false;
        this.tabstwo = false;
      }
      if (name == "2") {
        //淘宝
        this.tabstwo = true;
        this.tabstwos = false;
        this.tabstwosd = false;
      }
      if (name == "1") {
        //拼多多
        this.tabstwos = true;
        this.tabstwo = false;
        this.tabstwosd = false;
      }
      this.formData.dataSource = name;
      this.formData.page = 1;
      this.formData.keyWord = this.value;
      this.finished = false;
      this.getDate(this.formData);
    },
    //tab二级 淘宝
    clickTabs(name, title) {
      this.arrList = [];
      this.formData.page = 1;
      this.formData.sort = name;
      this.active = name;
      window.scrollTo(0, 0);
      // 排序
      if (name == 3 && this.formData.sortType == "") {
        this.formData.sortType = "desc";
      } else if (name == 3 && this.formData.sortType == "desc") {
        this.formData.sortType = "asc";
      } else if (name == 3 && this.formData.sortType == "asc") {
        this.formData.sortType = "desc";
      }

      this.getDate(this.formData);
    },
    //tab二级 京东
    clickTabaf(name, title) {
      this.arrList = [];
      this.formData.page = 1;
      this.formData.sort = name;
      this.activeaf = name;
      window.scrollTo(0, 0);
      // 排序
      if (name == 3 && this.formData.sortType == "") {
        this.formData.sortType = "desc";
      } else if (name == 3 && this.formData.sortType == "desc") {
        this.formData.sortType = "asc";
      } else if (name == 3 && this.formData.sortType == "asc") {
        this.formData.sortType = "desc";
      }
      //综合
      if (name == "") {
        if (this.comprehensiveShow == false) {
          this.comprehensiveShow = true;
        } else if (this.comprehensiveShow == true) {
          this.comprehensiveShow = false;
        }
      } else {
        this.comprehensiveShow = false;
      }

      this.getDate(this.formData);
    },
    //tab二级 拼多多
    clickTabre(name, title) {
      this.arrList = [];
      this.formData.page = 1;
      this.formData.sort = name;
      this.activere = name;
      window.scrollTo(0, 0);
      // 排序
      if (name == 3 && this.formData.sortType == "") {
        this.formData.sortType = "desc";
      } else if (name == 3 && this.formData.sortType == "desc") {
        this.formData.sortType = "asc";
      } else if (name == 3 && this.formData.sortType == "asc") {
        this.formData.sortType = "desc";
      }
      this.getDate(this.formData);
    },
    //京东 综合
    comprehensiveP(x) {
      this.comprehensiveShow = true;
      let comprehensivePone = document.getElementById("1");
      if (x == 0) {
        this.$refs.comprehensivePone.style.color = "red";
        this.comprehensiveImgone = true;
        this.comprehensiveShow = false;
        this.title = "综合";
        this.formData.owner = 0;
        this.formData.sort = 0;
        this.formData.page = 1;
        this.arrList = [];
        this.getDate(this.formData);
      } else {
        this.$refs.comprehensivePone.style.color = "#000";
        this.comprehensiveImgone = false;
      }
      if (x == 1) {
        this.$refs.comprehensivePtwo.style.color = "red";
        this.comprehensiveImgtwo = true;
        this.comprehensiveShow = false;
        this.title = "自营";
        this.formData.owner = "g";
        this.formData.sort = 0;
        this.formData.page = 1;
        this.arrList = [];
        this.getDate(this.formData);
      } else {
        this.$refs.comprehensivePtwo.style.color = "#000";
        this.comprehensiveImgtwo = false;
      }
      if (x == 2) {
        this.$refs.comprehensivePthree.style.color = "red";
        this.comprehensiveImgthree = true;
        this.comprehensiveShow = false;
        this.title = "非自营";
        this.formData.owner = "p";
        this.formData.sort = 0;
        this.formData.page = 1;
        this.arrList = [];
        this.getDate(this.formData);
      } else {
        this.$refs.comprehensivePthree.style.color = "#000";
        this.comprehensiveImgthree = false;
      }
    },
    getDate(formData) {
      this.loading = false;
      getsearch(formData)
        .then((res) => {
          // this.listId = res.data.data.listId.goodsList
          //   ? res.data.data.listId.goodsList
          //   : ""; //拼多多传参
          this.loading = false;
          if (res.data.data.goodsList.length != 0) {
            //赋值数据
            this.arrList = this.arrList.concat(res.data.data.goodsList);
            //返回的数据没有 跳转没数据页面
            this.kong = false;
            this.finished = false;
            // if(res.data.data.isLastPage == false){
            //   this.more = true
            // }else{
            //   this.more = false
            // }
          } else {
            this.kong = true;
            this.finished = true;
            this.more = true;
            if (this.formData.page == 1) {
              this.more = false;
              this.$router.push({
                name: "kong",
                query: {
                  dataSource: this.formData.dataSource,
                  value: this.formData.keyWord,
                },
              });
            } else {
              this.kong = false;
            }
          }
        })
        .catch((err) => {
          this.loading = false;
          this.finished = true;
        });
    },
    // 上滑
    onLoad() {
      this.formData.page++;
      this.getDate(this.formData);
    },
    //下拉
    onRefresh() {
      this.formData.page = 1;
      this.arrList = [];
      // 清空列表数据
      this.finished = false;
      this.refreshing = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.getDate(this.formData);
    },
    //返回上一级
    arrowLeft() {
      this.$router.push({
        name: "seach",
        query: {
          tab: this.formData.dataSource,
        },
      });
    },
    //点击商品
    homepage(x) {
      this.returnMoney = x.returnMoneyV2;
      this.$router.push({
        name: "details",
        query: {
          obj: x, //全部参数
          imgUrlArr: x.imgUrlArr,
          goodsName: x.goodsName,
          mallName: x.mallName,
          originalPrice: x.originalPrice,
          returnMoney: x.returnMoneyV2,
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
          ziyings: this.ziyings,
          goodsTagList: JSON.stringify(x.goodsTagList) || null,
        },
      });
    },
  },
  //路由守卫
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
      this.formData.page = 1;
      this.formData.dataSource = this.$route.query.name;
      this.formData.keyWord = this.$route.query.history;
      this.value = this.$route.query.history;
      this.activeName = this.$route.query.name;
      this.active = 0;
      this.activeaf = 0;
      this.activere = 0;
      if (this.$route.query.name == 3) {
        //京东
        this.tabstwosd = true;
        this.tabstwos = false;
        this.tabstwo = false;
      }
      if (this.$route.query.name == 2) {
        //淘宝
        this.tabstwo = true;
        this.tabstwos = false;
        this.tabstwosd = false;
      }
      if (this.$route.query.name == 1) {
        //品多少
        this.tabstwos = true;
        this.tabstwo = false;
        this.tabstwosd = false;
      }
      this.getDate(this.formData);
    }
    this.$route.meta.isBack = false;
  },
};
</script>


<style lang="scss" scoped>
//历史记录
.history {
  width: 100%;
  padding: 1rem 0.75rem;
  box-sizing: border-box;
  .history_div {
    width: 100%;
    height: 1.3125rem;
    display: flex;
    justify-content: space-between;
    span {
      float: left;
      display: block;
    }
    img {
      float: right;

      display: block;
      width: 0.9375rem;
      height: 1rem;
    }
  }
  .history_text {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    span {
      color: #666666;
      font-size: 0.75rem;
      background: #f6f6f6;
      border-radius: 0.875rem;
      margin-left: 0.7rem;
      padding: 5px 12px;
      line-height: 1;
      margin: 0.5rem;
    }
  }
}
.vague {
  width: 100%;
  height: auto;
  padding: 0 1rem;
  box-sizing: border-box;
  position: relative;
  background: white;
  top: 1rem;
  z-index: 99999999;
  p {
    padding: 0.8125rem 0 0.75rem;
    font-size: 0.8125rem;
  }
}
//商品列表
.shop {
  width: 100%;
  height: auto;
  margin-top: 7.5rem;
  z-index: 100;
  padding: 0 0 1rem;
  ::v-deep .van-tabs__content {
    background: #f6f6f6;
  }
  figure {
    display: flex;
    padding: 0 0.7rem;
    margin-bottom: -0.9rem;
    margin-top: 1.5rem;
    figcaption {
      width: 60%;
      margin-left: 1rem;
      border-bottom: solid 0.01rem #f6f6f6;
      margin-top: 0.2rem;
    }
    .good-one {
      width: 8.25rem;
      height: 8.25rem;
      margin-left: 0;
      margin-top: 0.3rem;
      border-radius: 0.3rem;
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
    }
    .good-teer {
      width: auto;
      height: 1.13rem;
      padding: 0 0.1rem;
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
      margin: 0.5rem 0 0.1rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      span {
        width: auto;
      }
    }
    .good-six {
      font-size: 0.75rem;
      margin-top: 0.2rem;
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
//淘宝,京东
.tabs {
  position: absolute;
  top: 5.7;
  width: 100%;
  border-top: solid 1px #f6f6f6;
  ::v-deep.van-tabs__line {
    display: none;
  }
  ::v-deep .van-tab {
    flex: 0.5;
  }
  .img {
    width: 0.5rem;
    height: 0.9rem;
    position: absolute;
    top: 1rem;
    right: 0.65rem;
  }
  .comprehensiveImg {
    position: absolute;
    top: 1.2rem;
    left: 4.3rem;
  }
}
//京东自营
.iconjd {
  width: 1.5rem;
  height: 0.88rem;
  vertical-align: middle;
  margin-left: 0.2rem;
}
//标题
.title {
  position: relative;
  width: 100%;
  height: 2.9rem;
  font-size: 1rem;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 100;
  .van-icon {
    position: absolute;
    top: 0.8rem;
    left: 0.3rem;
    line-height: 1.8rem;
    padding-right: 0.5rem;
  }
  form {
    margin-left: 1rem;
  }
}
//没有更多啦~
.moreNo {
  width: 100%;
  text-align: center;
  margin: 0.5rem 0;
  font-size: 0.625rem;
  color: #999;
}
::v-deep .van-tabs {
  ::v-deep .van-tabs__wrap {
    border-radius: 0.75rem;
    ::v-deep.van-tabs__line {
      margin-bottom: 0.1rem;
    }
  }
}
::v-deep .van-list__finished-text {
  margin: 0 auto;
  font-size: 0.625rem;
}
::v-deep .van-list {
  padding: 0 0 1.2rem;
}
// //综合

.comprehensive {
  width: 100%;
  height: auto;
  background: #f0f1f2;
  position: absolute;
  top: 1rem;
  font-size: 0.8125rem;
  p {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem 1rem;
    img {
      width: 0.64375rem;
      height: 0.5rem;
    }
  }
}
</style>