<template>
  <div class="zhizhi">
    <!-- 头部 -->
    <van-nav-bar title="好物圈" class="hear" type="line" :border="false">
      <template #right>
        <img
          style="width: 20px; height: 20px"
          src="../../assets/zhizhi/消息黑icon@2x.png"
          alt
        />
      </template>
    </van-nav-bar>
    <div v-if="readCount" class="num">{{ this.unReadCount }}</div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :immediate-check="false"
        offset="3000"
      >
        <div class="zhizhi">
          <div class="squeak" v-for="(y, v) of zhizhiList" :key="v">
            <van-overlay :show="show" @click="show = false">
              <div class="wrapper" @click.stop>
                <div class="block" />
              </div>
            </van-overlay>
            <div class="portrait">
              <div>
                <p class="photo" v-if="y.headPhoto == ''"></p>
                <p class="photo">
                  <img :src="y.headPhoto" alt />
                </p>
                <p class="thotoName">
                  <span>{{ y.userName }}</span>
                  <span class="thotoImg">
                    <img
                      v-if="y.star == 1"
                      src="../../assets/zhizhi/1星导购师@2x.png"
                      alt
                    />
                    <img
                      v-if="y.star == 2"
                      src="../../assets/zhizhi/2星导购师@2x.png"
                      alt
                    />
                    <img
                      v-if="y.star == 3"
                      src="../../assets/zhizhi/3星导购师@2x.png"
                      alt
                    />
                    <img
                      v-if="y.star == 4"
                      src="../../assets/zhizhi/4星导购师@2x.png"
                      alt
                    />
                    <img
                      v-if="y.star == 5"
                      src="../../assets/zhizhi/5星导购师@2x.png"
                      alt
                    />
                  </span>
                  <br />
                  <span style="color: #aaa; font-size: 12px"
                    >{{ y.timeAgo }} {{ y.provcity }}</span
                  >
                </p>
              </div>
              <p @click="show = false">
                <img
                  style="width: 18px; height: 18px"
                  src="../../assets/zhizhi/更多icon@2x.png"
                  alt
                />
              </p>
            </div>
            <!-- 商品名字介绍 -->
            <div class="shopName">
              <p ref="full">
                {{ y.promoteDesc }}
              </p>
              <span v-show="cancel == true" @click="full(v)">{{ con }}</span>
              <span v-show="cancel == false" @click="full(v)">{{ con }}</span>
            </div>
            <!-- 第一种--自定义 -->
            <div class="imgg" v-if="y.showWay == 0">
              <div v-for="(x, i) of y.zhizhiImg" :key="i">
                <img
                  :src="x"
                  v-if="i >= 6 || i < 3"
                  alt
                  @click="imgOnclick(y, i)"
                />
              </div>
            </div>
            <!-- 第二种--1张 -->
            <div class="imgu" v-if="y.showWay == 1">
              <div v-for="(x, i) of y.zhizhiImg" :key="i">
                <img :src="x" alt v-if="i < 1" @click="imgOnclick(y, i)" />
              </div>
            </div>
            <!-- 第三种 2张-->
            <div class="imga" v-if="y.showWay == 2">
              <div v-for="(x, i) of y.zhizhiImg" :key="i">
                <img :src="x" alt v-if="i < 2" @click="imgOnclick(y, i)" />
              </div>
            </div>
            <!-- 第四种 3张 左一右二 -->
            <div class="imgs" v-if="y.showWay == 3">
              <img :src="y.zhizhiImg[0]" alt @click="imgOnclick(y, 1)" />
              <div class="imgsd">
                <div v-for="(x, i) of y.zhizhiImg" :key="i">
                  <img :src="x" alt v-if="i < 2" @click="imgOnclick(y, i)" />
                </div>
              </div>
            </div>
            <!-- 第五种 3张 3列一行 -->
            <div class="imgn" v-if="y.showWay == 4">
              <div v-for="(x, i) of y.zhizhiImg" :key="i">
                <img :src="x" alt v-if="i < 3" @click="imgOnclick(y, i)" />
              </div>
            </div>
            <!-- 第六种 6张  3列二行 -->
            <div class="img" v-if="y.showWay == 5">
              <div v-for="(x, i) of y.zhizhiImg" :key="i">
                <img :src="x" alt v-if="i < 6" @click="imgOnclick(y, i)" />
              </div>
            </div>
            <!-- 第七种 9张 3列三行-->
            <div class="img" v-if="y.showWay == 6">
              <div v-for="(x, i) of y.zhizhiImg" :key="i">
                <img :src="x" alt v-if="i < 9" @click="imgOnclick(y, i)" />
              </div>
            </div>
            <!-- 第八种 3张 上一下二-->
            <div class="imgh" v-if="y.showWay == 7">
              <img :src="y.zhizhiImg[0]" alt @click="imgOnclick(y, 1)" />
              <div>
                <div v-for="(x, i) of y.zhizhiImg" :key="i">
                  <img
                    :src="x"
                    alt
                    v-if="i >= 2 && i < 4"
                    @click="imgOnclick(y, i)"
                  />
                </div>
              </div>
            </div>
            <!-- 第九种 6张 两列两行 -->
            <div class="imgi" v-if="y.showWay == 8">
              <div>
                <div v-for="(x, i) of y.zhizhiImg" :key="i">
                  <img
                    :src="x"
                    v-if="i < Number(y.showWayColumns) * Number(y.showWayRows)"
                    alt
                    @click="imgOnclick(y, i)"
                  />
                </div>
              </div>
            </div>
            <!-- 第十种 9张 -->
            <div class="imgk" v-if="y.showWay == 9">
              <img
                v-for="(x, i) of y.zhizhiImg"
                :key="i"
                :src="x"
                alt
                @click="imgOnclick(y, i)"
              />
            </div>
            <!-- 图片数量 -->
            <div class="imgNumber">+ {{ y.zhizhiImg.length }}</div>
            <!-- 商品 标签 -->
            <div class="label" @click="label(y)">
              <p>{{ y.goodsName }}</p>
              <div>
                <van-tag
                  v-for="(y, i) of y.goodsTagList"
                  :key="i"
                  :color="`#${y.bgColor}`"
                  :text-color="`#${y.fontColor}`"
                  >{{ y.tagName }}</van-tag
                >
              </div>
              <div>
                <p>
                  券后价¥
                  <span>{{
                    Number(
                      Number(y.originalPrice) - Number(y.couponDiscountV2)
                    ).toFixed(1)
                  }}</span>
                  <span>
                    原价¥
                    <s>{{ y.originalPrice }}</s>
                  </span>
                  <span>再返¥{{ y.returnMoney }}</span>
                </p>
                <p>
                  <span class="omit">
                    <!-- 淘宝图标 -->
                    <a
                      class="icon"
                      v-if="y.dataSource == '2' && y.userType != '1'"
                      alt
                      >淘宝</a
                    >
                    <!-- 拼多多图标 -->
                    <a class="icon" v-if="y.dataSource == '1'">拼多多</a>
                    <!-- 京东图标 -->
                    <a class="icon" v-if="y.dataSource == '3'">京东</a>
                    <!-- 天猫图标 -->
                    <a
                      class="icon"
                      v-if="y.dataSource == '2' && y.userType == '1'"
                      alt
                      >天猫</a
                    >
                  </span>
                  <span>月销{{ y.strVolume }}</span>
                </p>
              </div>
            </div>
            <!-- 收藏 -->
            <div class="collection" v-show="collecTion">
              <img
                @click="collectionONclick(y)"
                class="collectionImg"
                :src="thumbnailUrl"
                alt
              />
              <div>
                <p class="omits" @click="collectionONclick(y)">
                  {{ goodsName }}
                </p>
                <div class="returnPrice">
                  <span @click="collectionONclick(y)">
                    ¥
                    <a>{{
                      Number(
                        Number(originalPrice) -
                          Number(couponDiscount ? couponDiscount : 0)
                      ).toFixed(1)
                    }}</a>
                  </span>
                  <s @click="collectionONclick()">原价¥{{ y.originalPrice }}</s>
                  <span
                    class="smallImg"
                    @click="shoucang(y)"
                    v-if="collectionShow"
                  >
                    <img src="../../assets/zhizhi/icon_小已收藏@2x.png" alt />
                  </span>
                  <span class="smallImg" @click="shoucang(y)" v-else>
                    <img src="../../assets/zhizhi/icon_小收藏@2x.png" alt />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p class="noMore">没有更多了~</p>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  squeakGoods,
  getput,
  getdelete,
  getGet,
  getstatus,
  newsUnReadCount,
} from "@/api/api.js";
import { ImagePreview } from "vant";
import qs from "qs";
import { Toast } from "vant";
let instance;
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      unReadCount: "", //消息数量
      zhizhiList: [], //接受
      thumbnailUrl: "", //缩略图
      dataSource: "", //类型
      goodsId: "", //userid
      goodsName: "", //名字
      originalPrice: "", //原价
      couponDiscount: "", //优惠券
      returnMoney: "", //返价
      collecTion: false, //收藏
      collectionShow: 1, //收藏
      sss: false, //展开收起的开关
      formData: {
        goodsList: [
          {
            goodsId: "",
            dataSource: "",
          },
        ],
      }, //收藏传参
      startTime: "0", //时间
      loading: false,
      finished: false,
      refreshing: false,
      show: false,
      readCount: false,
      collectionList: [],
      con: "全文",
      cancel: false, //全文/收起
      discountPrice: "",
    };
  },
  methods: {
    //消息
    xiaoxi() {
      if (this.$store.state.token != "") {
        this.$router.push({ name: "news" });
      } else {
        this.$router.push({ name: "register" });
      }
    },
    baseinput() {},
    //点击图片
    imgOnclick(x, i) {
      console.log(x);
      //是否收藏
      getstatus({
        goodsId: x.goodsId,
        dataSource: x.dataSource,
      }).then((res) => {
        if (res.data.data.isFavorite == true) {
          this.collectionShow = 1;
        } else {
          this.collectionShow = 0;
        }
      });
      this.collectionList = x;
      this.collecTion = true;
      let that = this;
      instance = ImagePreview({
        images: x.zhizhiImg,
        startPosition: i,
        closeable: true,
        onClose() {
          that.collecTion = false;
        },
      });
      this.thumbnailUrl = x.thumbnailUrl;
      this.dataSource = x.dataSource;
      this.goodsName = x.goodsName;
      this.originalPrice = x.originalPrice;
      this.couponDiscount = x.couponDiscount;
      this.returnMoney = x.returnMoney;
      this.userType = x.userType;
      this.goodsId = x.goodsId;
    },
    //跳转详情
    collectionONclick(x) {
      let str = JSON.parse(this.collectionList.data);
      this.discountPrice = str.discountPrice;
      console.log(this.collectionList);
      console.log(x);
      this.$router.push({
        name: "details",
        query: {
          imgUrlArr: str.zhizhiImg,
          goodsName: str.goodsName,
          mallName: str.mallName,
          originalPrice: str.originalPrice,
          returnMoney:str.returnMoney,
          dataSource: str.dataSource,
          strVolume: str.strVolume,
          discountPrice: this.discountPrice,
          couponStartTime: str.couponStartTime || "",
          couponEndTime: str.couponEndTime || "",
          couponDiscount: str.couponDiscount,
          userType: str.userType,
          jdCouponUrl: str.jdCouponUrl,
          goodsUrl: str.goodsUrl,
          goodsId: str.goodsId,
          shareUrl: str.shareUrl,
          provcity: str.provcity,
          goodsTagList: JSON.stringify(str.goodsTagList) || null,
        },
      });
    },
    // 收藏
    shoucang(x) {
      console.log(x);
      this.formData.goodsList[0].dataSource = this.dataSource;
      this.formData.goodsList[0].goodsId = this.goodsId;
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
    //商品-标签-价格
    label(x) {
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
    onLoad() {
      squeakGoods({ startTime: this.startTime }).then((res) => {
        this.loading = false;
        this.refreshing = false;
        if (res.data.code == 0) {
          if (res.data.data.isLastPage != true) {
            this.zhizhiList = res.data.data.goodsList;
            this.startTime = this.zhizhiList[
              this.zhizhiList.length - 1
            ].promoteTimeLong;
            this.zhizhiList.forEach((x, i) => {
              let str = JSON.parse(x.data);
              x.zhizhiImg = str.imgUrlArr; //图片
              x.originalPrice = str.originalPrice; //原价
              x.couponDiscount = str.couponDiscount; //优惠券
              x.returnMoney = str.returnMoney; //反价
              x.goodsName = str.goodsName; //商品名字
              x.userType = str.userType; //天猫...
              x.strVolume = str.strVolume; //月售
              x.couponStartTime = str.couponStartTime; //优惠券开始时间
              x.couponEndTime = str.couponEndTime; //优惠券结束时间
            });
          } else {
            this.zhizhiList = this.zhizhiList.concat(res.data.data.goodsList);
            this.startTime = this.zhizhiList[
              this.zhizhiList.length - 1
            ].promoteTimeLong;
            this.zhizhiList.forEach((x, i) => {
              let str = JSON.parse(x.data);
              x.zhizhiImg = str.imgUrlArr; //图片
              x.originalPrice = str.originalPrice; //原价
              x.couponDiscount = str.couponDiscount; //优惠券
              x.returnMoney = str.returnMoney; //反价
              x.goodsName = str.goodsName; //商品名字
              x.userType = str.userType; //天猫...
              x.strVolume = str.strVolume; //月售
              x.couponStartTime = str.couponStartTime; //优惠券开始时间
              x.couponEndTime = str.couponEndTime; //优惠券结束时间
            });
            this.finished = true;
          }
        } else {
          this.finished = true;
        }
      });
    },
    onRefresh() {
      this.startTime = 0;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    //全文
   full(v) {
      this.$refs.full.forEach((x, i) => {
        console.log(x)
         x.cancel = false;
        if (i == v) {
          x.cancel = true;
        }
        if (x.cancel == true) {
            x.style.height = "auto";
            this.con = "收起";
          } else if (x.cancel == false) {
            x.style.height = "1rem";
            this.con = "全文";
          }
      });
    },
  },
  mounted() {
    this.onLoad();
    if (this.$store.state.token == "") {
      this.readCount = false;
    } else {
      //查询未读消息数量
      newsUnReadCount().then((res) => {
        if (res.data.data.unReadCount == "") {
          this.readCount = false;
        } else {
          if (res.data.data.unReadCount > 99) {
            this.unReadCount = "99+";
          } else {
            this.unReadCount = res.data.data.unReadCount;
          }
          this.readCount = true;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.zhizhi {
  width: 100%;
  height: 100%;
  background: #f0f1f2;
  /* 标题 */
  .hear {
    width: 100%;
    height: 2.75rem;
    padding: 0 0.75rem;
    box-sizing: border-box;
    background: white;
    position: fixed;
    top: 0;
    z-index: 100;
    .xiaoxi {
      width: 1.35rem;
      height: 1.5rem;
      position: relative;
      top: 0.4rem;
      right: -0.8rem;
    }
    /* 搜索框 */
    input {
      width: 19.7rem;
      height: 2.15rem;
      border: solid 1px;
      border-radius: 1.13rem;
      border: solid 0.1rem #fe0c05;
      margin: 0.56rem auto 0;
      background: url("../../assets/zhizhi.png") 4% 50% no-repeat #f0f1f2;
      background-size: 1rem 1rem;
    }
    input::-webkit-input-placeholder {
      position: relative;
      left: 2.13rem;
      font-size: 0.75rem;
    }
    .divinputP {
      width: 19.0625rem;
      height: 1.4375rem;
      position: absolute;
      top: 1.2rem;
      left: 3rem;
      font-size: 0.875rem;
      color: #c4c4c4;
      span {
        width: auto;
        img {
          width: 0.875rem;
          height: 0.875rem;
          border-radius: 0.165625rem;
          border: solid 0.7px white;
          margin-left: 0.1rem;
          vertical-align: middle;
        }
      }
    }
  }
  .zhizhi {
    width: 100%;
    height: auto;
    margin-top: 2.5rem;
    &:last-child {
      margin-bottom: 4rem;
    }
    background: #f0f1f2;
    .squeak {
      width: 100%;
      height: auto;
      background: #fff;
      margin: 0.75rem 0;
      border-radius: 0.2rem;
      position: relative;
      padding: 0.5rem 0.75rem;
      box-sizing: border-box;
      .portrait {
        width: 94%;
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        div {
          display: flex;
          .photo {
            width: 2rem;
            height: 2rem;
            display: block;
            background: #ffdbb3;
            border-radius: 50%;
            margin-right: 0.5rem;
          }
          .photo {
            width: 2rem;
            height: 2rem;
            img {
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
            }
          }
          .thotoName {
            height: 2.5rem;
            font-size: 0.9375rem;
            color: #c1272d;
            span {
              height: 1rem;
              padding: 0;
              margin: 0;
            }
            .thotoImg {
              img {
                width: 4.125rem;
                height: 0.9375rem;
                margin-left: 0.2rem;
              }
            }
          }
        }
      }
      //商品名字
      .shopName {
        width: 100%;
        height: auto;
        p {
          height: 1rem;
          padding: 0.3rem 0;
          overflow: hidden;
          font-size: 14px;
          color: #000;
        }
      }
      .img {
        margin: 0.75rem 0;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        img {
          width: 6.8rem;
          height: 6.8rem;
          margin: 0.3rem 0 0 0.4rem;
          flex-shrink: 0;
        }
      }
      .imgs {
        width: 100%;
        display: flex;
        border-radius: 0.5rem;
        img {
          width: 14rem;
          height: 14rem;
        }
        .imgsd {
          width: 7.5rem;
          div {
            width: 6.9rem;
            height: auto;
            margin-left: 0.5rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .imgh {
        border-radius: 0.5rem;
        width: 100%;
        img {
          width: 100%;
          height: 18rem;
          border-radius: 0.5rem;
        }
        div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          div {
            width: 10.8rem;
            img {
              width: 100%;
              height: 10rem;
              flex-shrink: 0;
              border-radius: 0.3rem;
            }
          }
        }
      }
      .imgu {
        border-radius: 0.5rem;
        width: 100%;
        div {
          img {
            width: 100%;
            height: 20rem;
            border-radius: 0.3rem;
          }
        }
      }
      .imga {
        display: flex;
        width: 100%;
        div {
          width: 50%;
          margin: 0 0.4rem;
          img {
            width: 10.125rem;
            height: 10rem;
            flex-shrink: 0;
            border-radius: 0.3rem;
          }
        }
      }
      .imgi {
        height: auto;
        width: 100%;
        div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          div {
            width: 48.5%;
            img {
              width: 100%;
              height: 10rem;
              margin: 0.3rem 0;
              border-radius: 0.3rem;
            }
          }
        }
      }
      .imgg {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        width: 100%;
        div {
          width: 32%;
          margin-left: 0.2rem;
          img {
            width: 100%;
            height: 6.5rem;
            // margin-left: 0.2rem;
            border-radius: 0.3rem;
          }
        }
      }
      .imgn {
        width: 100%;
        display: flex;
        div {
          flex-shrink: 0;
          width: 32%;
          height: 6.5rem;
          margin: 0 0.15rem;
          img {
            width: 100%;
            height: 100%;
            border-radius: 0.3rem;
          }
        }
      }
      .imgk {
        width: 100%;
        img {
          width: 32%;
          height: 6.5rem;
          margin-left: 0.2rem;
        }
      }
      .imgNumber {
        width: 1.8rem;
        height: 1.3rem;
        background: #000;
        opacity: 0.4;
        position: absolute;
        bottom: 6.5rem;
        right: 1.3rem;
        color: #fff;
        font-size: 0.625rem;
        line-height: 1.5rem;
        text-align: center;
        border-bottom-right-radius: 0.3rem;
        border-top-left-radius: 0.3rem;
      }
      .label {
        width: 96%;
        height: auto;
        padding: 0.5rem;
        background: #f6f6f8;
        margin: 0.5rem 0;
        p:nth-child(1) {
          font-size: 0.875rem;
          display: -webkit-box !important;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          color: #333333;
          font-size: 0.89rem;
          margin-top: 0.3rem;
        }
        p:nth-child(2) {
          display: flex;
          .van-tag {
            border-radius: 1rem;
            padding: 0.1rem 0.5rem;
            font-size: 0.625rem;
            margin-left: 0.5rem;
          }
        }

        div {
          display: flex;
          justify-content: space-between;
          p:nth-child(1) {
            padding: 0.2rem 0;
            color: #ff0c05;
            font-size: 0.75rem;
            span:nth-child(1) {
              color: #ff0c05;
              font-size: 1.2rem;
            }
            span:nth-child(2) {
              color: #999;
              font-size: 0.625rem;
              margin-left: 0.2rem;
            }
            span:nth-child(3) {
              color: #ff0c05;
              font-size: 0.6875rem;
              border: solid 1px;
              margin-left: 0.2rem;
              padding: 0 0.2rem;
            }
          }
          p:nth-child(2) {
            width: auto;
            color: #999;
            font-size: 10px;
            padding: 0.2rem 0;
            margin-top: 0.6rem;
            span:nth-child(2) {
              margin-left: 0.3rem;
            }
          }
        }
      }
      // .omit {
      //   display: -webkit-box !important;
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      //   word-break: break-all;
      //   -webkit-box-orient: vertical;
      //   -webkit-line-clamp: 2;
      //   color: #333333;
      //   font-size: 0.89rem;
      //   margin-top: 0.3rem;
      //   .icon {
      //     width: 0.88rem;
      //     height: 0.88rem;
      //     vertical-align: middle;
      //   }
      // }
    }
    //没有更多了...
    .noMore {
      text-align: center;
      font-size: 0.625rem;
      color: #999;
      padding: 0.5rem 0;
    }
  }
  //收藏
  .collection {
    width: 17.0625rem;
    height: 3.5rem;
    background: #ffffff;
    position: fixed;
    bottom: 2rem;
    left: 0.5rem;
    z-index: 10000;
    border-radius: 0.375rem;
    display: flex;
    .collectionImg {
      width: 2.75rem;
      height: 2.75rem;
      margin: 0.3rem;
    }
    div {
      .smallImg {
        width: 1.875rem;
        height: 1.875rem;
        position: absolute;
        bottom: 0;
        right: 0;
        border-bottom-right-radius: 0.375rem;
        img {
          width: 0.75rem;
          height: 0.75rem;
          margin-top: 0.5rem;
          margin-left: 0.5rem;
        }
      }
      .omits {
        display: -webkit-box !important;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        color: #333333;
        font-size: 0.89rem;
        margin-top: 0.3rem;
        padding: 0 0.2rem;
        .icon {
          width: 0.88rem;
          height: 0.88rem;
          vertical-align: middle;
        }
      }
      .returnPrice {
        span:nth-child(1) {
          font-size: 0.75rem;
          color: #fe0c05;
          padding: 0 0.2rem;
          a {
            font-size: 1.2rem;
          }
        }
        span:nth-child(2) {
          font-size: 1rem;
          color: #fe0c05;
        }
        s {
          font-size: 0.5rem;
          color: #999;
          margin-left: 0.5rem;
        }
      }
    }
  }
  //弹出框
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      width: 120px;
      height: 120px;
      background-color: #fff;
    }
  }
  .num {
    width: 0.9375rem;
    height: 0.9375rem;
    border-radius: 0.6rem;
    position: fixed;
    top: 0.2rem;
    left: 93%;
    background: #fe0c05;
    color: #fff;
    font-size: 0.625rem;
    text-align: center;
    line-height: 1rem;
    z-index: 1000;
  }
}
</style>