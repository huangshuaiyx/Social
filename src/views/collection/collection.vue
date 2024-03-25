<template>
  <div id="box">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多啦~"
      @load="onLoad"
      :immediate-check="false"
      offset="3000"
    >
      <!-- 收藏夹 -->
      <van-nav-bar title="收藏" @click-left="$router.go(-1)" :border="false">
        <template #left>
          <van-icon size="1.5rem" name="arrow-left" color="#000000" />
        </template>
        <template #right>
          <p
            @click="administration"
            class="administration"
            ref="administration"
            v-show="flag == true"
          >
            {{ con }}
          </p>
          <p
            @click="administration"
            class="administration"
            ref="administration"
            v-show="flag == false"
          >
            {{ con }}
          </p>
        </template>
      </van-nav-bar>

      <!-- 收藏内容 -->
      <div class="collectionText">
        <div class="collectionKong" v-if="this.list.length == 0">
          <img src="../../assets/png_collect_kong@2x.png" alt />
          <p>唉呀,您还没有收藏商品哦~</p>
        </div>
        <div style="overflow: auto">
          <div ref="collectiontao" class="collectiontao">
            <figure
              v-for="(x, i) of list"
              :key="i"
              :title="x"
              @click="homepage(x, $event)"
              ref="figure"
            >
              <van-checkbox
                v-model="x.checked"
                v-show="checkboxShow"
                checked-color="red"
                @change="checkeds"
                class="checkbox"
                ref="checkbox"
              />
              <img class="good-one" :src="x.imgUrlArr[0]" alt />
              <figcaption>
                <span class="omit">
                  {{ x.goodsName }}
                </span>
                <!-- 券后价 -->
                <div class="aftercoupons">
                  <div class="aftercouponsDivOne">
                    <p class="pOne">
                      券后¥<b>{{ x.discountPrice }}</b>
                    </p>
                    <p class="pTwo">
                      原价¥<s>{{ x.discountPrice }}</s>
                    </p> 
                  </div>
                  <div class="aftercouponsDivTwo">
                    <p class="pThree">再返¥{{ x.returnMoney }}</p>
                    <p
                      v-if="x.couponDiscount ? x.couponDiscount : ''"
                      class="pFour"
                    >
                      {{ x.couponDiscount }}元券
                    </p>
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
                        v-if="x.dataSource == '3' && x.userType == 2"
                        >京东自营</a
                      >
                      <!-- 天猫图标 -->
                      <a
                        class="icon"
                        v-if="x.dataSource == '2' && x.userType == 1"
                        alt
                        >天猫</a
                      >
                    </span>
                    <span>月销{{ x.strVolume }}</span>
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </van-list>
    <!-- 取消收藏 -->
    <div class="cancel" v-show="cancel">
      <van-checkbox v-model="isAll" icon-size="24px" checked-color="red"
        >全选(共{{ this.lengths }}件)</van-checkbox
      >
      <p>
        已选{{ this.chu }}件
        <van-button
          round
          type="info"
          @click="sunmit"
          style="width: 92px; height: 32px; background: red; border: none"
          >删除</van-button
        >
      </p>
    </div>
  </div>
</template>

<script>
var ob = JSON.parse(localStorage.getItem("jd-webapp"));
import {
  getGet,
  getmayLike,
  getGoodsDetails,
  getstatus,
  getdelete,
} from "@/api/api.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      page: 0,
      pageSize: 20,
      list: [],
      likelist: [],
      checked: false, //复选框状态
      checkboxShow: false, //隐藏
      cancel: false, //取消收藏
      con: "管理",
      flag: true, //单位切换开关
      allCheck: false,
      lengths: "", //共件数
      chu: 0, //选中多少件
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
  created() {
    this.onLoad(this.page);
    this.list = [];
    window.addEventListener("scroll", this.lala);
    getGet().then((res) => {
      this.lengths = res.data.data.length;
      if (res.data.code == 0) {
        if (res.data.data != 0) {
          this.list = res.data.data.map((v) => {
            return {
              goodsId: v.goodsId,
              imgUrlArr: v.imgUrlArr,
              dataSource: v.dataSource,
              userType: v.userType,
              goodsName: v.goodsName,
              couponDiscount: v.couponDiscount,
              returnMoney: v.returnMoney,
              discountPrice: v.discountPrice,
              originalPrice: v.originalPrice,
              strVolume: v.strVolume,
              couponEndTime: v.couponEndTime,
              couponStartTime: v.couponStartTime,
              checked: false,
            };
          });
        }
      }
    });
  },
  computed: {
    isAll: {
      get: function () {
        for (let i = 0, len = this.list.length; i < len; i += 1) {
          if (!this.list[i].checked) {
            return false;
          }
        }
        return true;
      },
      set: function (v) {
        for (let i = 0, len = this.list.length; i < len; i += 1) {
          this.list[i].checked = v;
        }
      },
    },
  },
  methods: {
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

      if (scrollHeight >= 0) {
        getGet().then((res) => {
          this.lengths = res.data.data.length;
          if (res.data.code == 0) {
            if (res.data.data != 0) {
              this.list = res.data.data.map((v) => {
                return {
                  goodsId: v.goodsId,
                  imgUrlArr: v.imgUrlArr,
                  dataSource: v.dataSource,
                  userType: v.userType,
                  goodsName: v.goodsName,
                  couponDiscount: v.couponDiscount,
                  returnMoney: v.returnMoney,
                  discountPrice: v.discountPrice,
                  originalPrice: v.originalPrice,
                  strVolume: v.strVolume,
                  couponEndTime: v.couponEndTime,
                  couponStartTime: v.couponStartTime,
                  checked: false,
                };
              });
            }
          }
        });
      } else {
        getGet().then((res) => {
          this.lengths = res.data.data.length;
          if (res.data.code == 0) {
            if (res.data.data != 0) {
              this.list = res.data.data.map((v) => {
                return {
                  goodsId: v.goodsId,
                  imgUrlArr: v.imgUrlArr,
                  dataSource: v.dataSource,
                  userType: v.userType,
                  goodsName: v.goodsName,
                  couponDiscount: v.couponDiscount,
                  returnMoney: v.returnMoney,
                  discountPrice: v.discountPrice,
                  originalPrice: v.originalPrice,
                  strVolume: v.strVolume,
                  couponEndTime: v.couponEndTime,
                  couponStartTime: v.couponStartTime,
                  checked: false,
                };
              });
            }
          }
        });
      }
    },
    onLoad() {
      this.page++;
      getmayLike({ page: this.page })
        .then((res) => {
          this.loading = false;
          this.refreshing = false;
          if (res.data.data.isLastPage == false) {
            if (this.page == 1) {
              this.likelist = res.data.data.goodsList;
            } else {
              this.likelist = this.likelist.concat(res.data.data.goodsList);
            }
          } else if (res.data.data.isLastPage == true) {
            this.finished = true;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    // 管理点击商品
    homepage(x, e) {
      this.returnMoney = x.returnMoney;
      if (this.$refs.administration.innerHTML == "管理") {
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
      } else {
        x.checked = !x.checked;
      }
    },
    // 首页点击商品
    homepages(x, e) {
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
        },
      });
    },
    //管理状态
    administration() {
      var ob = JSON.parse(localStorage.getItem("jd-webapp"));
      if (ob == null) {
        this.$router.push({ name: "register" });
      } else {
        this.flag = !this.flag;
        if (this.flag == false) {
          getGet().then((res) => {
            if (res.data.data.length != 0) {
              this.con = "完成";
              this.lengths = res.data.data.length;
              this.$refs.collectiontao.style.marginLeft = "0.3rem";
              this.$refs.collectiontao.style.margin = "0";
              this.$refs.collectiontao.style.padding = "0";
              this.checkboxShow = true;
              document.documentElement.scrollTop = 0;
              this.cancel = true;
              this.list = res.data.data.map((v) => {
                return {
                  goodsId: v.goodsId,
                  imgUrlArr: v.imgUrlArr,
                  dataSource: v.dataSource,
                  userType: v.userType,
                  goodsName: v.goodsName,
                  couponDiscount: v.couponDiscount,
                  returnMoney: v.returnMoney,
                  discountPrice: v.discountPrice,
                  originalPrice: v.originalPrice,
                  strVolume: v.strVolume,
                  couponEndTime: v.couponEndTime,
                  couponStartTime: v.couponStartTime,
                  checked: false,
                };
              });
            } else {
              Toast("您还没有收藏商品");
            }
          });
        } else if (this.flag == true) {
          this.con = "管理";
          this.$refs.collectiontao.style.marginLeft = 0;
          this.checkboxShow = false;
          this.cancel = false;
        }
      }
    },
    //取消收藏
    sunmit() {
      let goodsList = this.list.filter((v) => v.checked == true);
      if (goodsList) {
        getdelete({ goodsList }).then((res) => {
          if (goodsList.length != 0) {
            getGet().then((res) => {
              this.con = "管理";
              this.$refs.collectiontao.style.width = "100%";
              this.checkboxShow = false;
              this.cancel = false;
              this.list = res.data.data.map((v) => {
                return {
                  goodsId: v.goodsId,
                  imgUrlArr: v.imgUrlArr,
                  dataSource: v.dataSource,
                  userType: v.userType,
                  goodsName: v.goodsName,
                  couponDiscount: v.couponDiscount,
                  returnMoney: v.returnMoney,
                  discountPrice: v.discountPrice,
                  originalPrice: v.originalPrice,
                  strVolume: v.strVolume,
                  couponEndTime: v.couponEndTime,
                  couponStartTime: v.couponStartTime,
                  checked: false,
                };
              });
            });
            Toast("已取消所选收藏");
          } else {
            Toast("您还没有选择商品哦");
          }
        });
      }
    },
    //选择框
    checkeds(checked) {
      if (checked == true) {
        this.chu += 1;
      } else if (checked == false) {
        this.chu -= 1;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/details") {
      to.meta.isBack = true;
      let scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop;
      next((vm) => {
        if (scrollHeight >= 0) {
          getGet().then((res) => {
            if (res.data.code == 0) {
              if (res.data.data != 0) {
                vm.list = res.data.data.map((v) => {
                  return {
                    goodsId: v.goodsId,
                    imgUrlArr: v.imgUrlArr,
                    dataSource: v.dataSource,
                    userType: v.userType,
                    goodsName: v.goodsName,
                    couponDiscount: v.couponDiscount,
                    returnMoney: v.returnMoney,
                    discountPrice: v.discountPrice,
                    originalPrice: v.originalPrice,
                    strVolume: v.strVolume,
                    couponEndTime: v.couponEndTime,
                    couponStartTime: v.couponStartTime,
                    checked: false,
                  };
                });
              }
            }
          });
        }
      });
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      this.page = 0;
      this.onLoad();
      this.list = [];

      getGet().then((res) => {
        this.lengths = res.data.data.length;
        if (res.data.code == 0) {
          if (res.data.data != 0) {
            this.list = res.data.data.map((v) => {
              return {
                goodsId: v.goodsId,
                imgUrlArr: v.imgUrlArr,
                dataSource: v.dataSource,
                userType: v.userType,
                goodsName: v.goodsName,
                couponDiscount: v.couponDiscount,
                returnMoney: v.returnMoney,
                discountPrice: v.discountPrice,
                originalPrice: v.originalPrice,
                strVolume: v.strVolume,
                couponEndTime: v.couponEndTime,
                couponStartTime: v.couponStartTime,
                checked: false,
              };
            });
          }
        }
      });
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
#box {
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 2.5rem;
  .van-nav-bar {
    width: 100%;
    position: fixed;
    top: 0;
    p {
      width: 3rem;
    }
  }
  // .one-one {
  //   width: 100%;
  //   height: 2.75rem;
  //   border: solid 1px;
  //   box-sizing: border-box;
  //   background: #f3f3f3;
  //   z-index: 1000;
  //   h1 {
  //     font-size: 1.13rem;
  //     margin-top: 0.5rem;
  //     float: left;
  //     margin-left: 10.8rem;
  //   }
  //   p {
  //     width: 2.5rem;
  //     height: 1.38rem;
  //     float: right;
  //     font-size: 1rem;
  //     margin-top: 0.5rem;
  //   }
  // }
  // 收藏内容
  .collectionText {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    margin-top: 2rem;
    margin-bottom: 2.4rem;
    .collectionKong {
      width: 100%;
      height: 5rem;
      text-align: center;
      padding: 5rem 0 3rem;
      img {
        width: 4.25rem;
        height: 3.70625rem;
      }
      p {
        font-size: 0.8125rem;
        color: #aeaeae;
      }
    }
    //有内容
    .collectiontao {
      width: 100%;
      height: auto;
      overflow: hidden;
      background: white;
      flex-wrap: wrap;
      display: flex;

      figure {
        border-radius: 0.3rem;
        width: 95%;
        display: flex;
        margin-top: 0.325rem;
        padding: 0.5rem 0.75rem 0.2rem;
        overflow: hidden;
        .checkbox {
          width: 4rem;
          padding: 0 0.3rem;
        }
        .good-one {
          width: 8.25rem;
          height: 8.25rem;
          margin-left: 0;
          border-radius: 0.3rem;
          display: block;
          flex-shrink: 0;
        }
        &:last-child {
          figcaption {
            border: none;
          }
        }
        figcaption {
          margin-left: 0.5rem;
          border-bottom: solid 0.01rem #666;
          padding-bottom: 0.2rem;
          .omit {
            display: -webkit-box !important;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            font-size: 0.78rem;
            color: #333333;
            margin-top: 0.3rem;
            .icon {
              width: 0.88rem;
              height: 0.88rem;
              vertical-align: middle;
            }
          }
          //券后价
          .aftercoupons {
            width: 100%;
            display: flex;
            margin-top: 1.9rem;
            .aftercouponsDivOne {
              font-size: 0.6rem;
              .pOne {
                color: red;
                b {
                  font-size: 1.2rem;
                }
              }
              .pTwo {
                margin-top: 0.5rem;
                color: #999;
              }
            }
            .aftercouponsDivTwo {
              margin-left: 1rem;
              font-size: 0.5rem;
              .pThree {
                padding: 0.02rem 0.7rem;
                border: solid 1px red;
                color: red;
              }
              .pFour {
                padding: 0.1rem 0.5rem;
                background: url("../../assets/券png@2x.png") no-repeat
                  center/100%;
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
        }
      }
    }
  }

  //取消收藏
  .cancel {
    z-index: 100;
    width: 100%;
    height: 3rem;
    display: flex;
    position: fixed;
    bottom: 0;
    justify-content: space-around;
    background: white;
    p {
      line-height: 3rem;
    }
  }
}
//可能喜欢
.like {
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
      .omit {
        display: -webkit-box !important;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        font-size: 0.78rem;
        color: #333333;
        text-align: left;
        margin-top: 0.3rem;
        .icon {
          width: 0.88rem;
          height: 0.88rem;
          vertical-align: middle;
        }
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
            b {
              font-size: 1.2rem;
            }
          }
          .pTwo {
            margin-top: 0.5rem;
            color: #999;
          }
        }
        .aftercouponsDivTwo {
          margin-left: 1rem;
          font-size: 0.5rem;
          .pThree {
            padding: 0.02rem 0.7rem;
            border: solid 1px red;
            color: red;
          }
          .pFour {
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
    }
  }
}
//收藏管理
.administration {
  width: 2rem;
  height: 2rem;
  padding: 0.3rem 0;
  margin-top: 0.5rem;
}
::v-deep .van-list__finished-text {
  margin: 0 auto;
  font-size: 0.625rem;
}
</style>