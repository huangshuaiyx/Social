<template>
  <div class="zhuanzhuan">
    <!-- 头部 -->
    <van-nav-bar
      title="赚赚"
      class="hear"
      type="line"
      :border="false"
      @click-right="clickRight"
    >
      <template #right>
        <span>联系导师</span>
      </template>
    </van-nav-bar>
    <div class="zhuanzhuanTop">
      <!-- 团员 -->
      <div class="leagueMember" v-if="leagueMember">
        <div
          class="leagueMember-hear"
          @click="$router.push({ name: 'teamLeader' })"
        >
          <p>
            <img :src="myimg" class="figureimg" alt v-show="heard" />
            <img
              v-show="heardimg"
              class="figureimg"
              src="../../assets/WechatIMG5@2x.png"
              alt
            />
            <span>{{ this.nameq }}</span>
            <img
              class="imghear"
              v-if="this.Teamleader == 1"
              src="../../assets/leader/v1logo专.png"
              alt
            />
            <img
              class="imghear"
              v-if="this.Teamleader == 2"
              src="../../assets/leader/v2logo专.png"
              alt
            />
            <img
              class="imghear"
              v-if="this.Teamleader == 3"
              src="../../assets/leader/v3logo专.png"
              alt
            />
          </p>
          <p>
            <img src="../../assets/个人中心-前进@2x.png" alt />
          </p>
        </div>
        <p style="margin-left: 0.75rem; font-size: 13px">
          升级至正式团长
          <span style="color: #999; font-size: 10px">(须满足以下条件)</span>
        </p>
        <figure class="figure" v-for="(x, i) of tasksInfo" :key="i">
          <img :src="x.icon" alt />
          <figcaption>
            <p>{{ x.title }}</p>
            <div class="div">
              <span v-bind:style="{ width: x.num + '%' }"></span>
              <span></span>
              <span>{{ x.num }}/{{ x.targetNum }}</span>
            </div>
          </figcaption>
          <van-button
            plain
            round
            hairline
            size="mini"
            type="info"
            color="#FE0C05"
            @click="button(x.command)"
            >{{ x.command }}</van-button
          >
        </figure>
      </div>
      <!-- 分类 -->
      <div class="classification">
        <figure @click="classification(1)">
          <img src="../../assets/zhuanzhuan/商学院icon@2x.png" alt />
          <figcaption>商学院</figcaption>
        </figure>
        <figure @click="classification(2)">
          <img src="../../assets/zhuanzhuan/营销爆款@2x.png" alt />
          <figcaption>营销吧爆款</figcaption>
        </figure>
        <figure @click="classification(3)">
          <img src="../../assets/zhuanzhuan/宣传素材@2x.png" alt />
          <figcaption>宣传素材</figcaption>
        </figure>
        <figure>
          <img src="../../assets/zhuanzhuan/平台规则@2x.png" alt />
          <figcaption>平台规则</figcaption>
        </figure>
      </div>
      <!-- 任务 -->
      <div class="task">
        <p style="margin-left: 0.5rem; font-size: 15px">每日任务</p>
        <div v-for="(x, i) of status" :key="i">
          <p>
            <span>{{ i + 1 }}</span>
            {{ x.title }}
          </p>
        </div>
      </div>
      <!-- 商学院 -->
      <div class="school">
        <div class="school-heard">
          <p>米橙学堂</p>
          <p @click="advanced">
            <span>进阶秘籍</span>
            <img src="../../assets/个人中心-前进@2x.png" alt />
          </p>
        </div>
        <figure
          class="school-list"
          v-for="(x, i) of this.zhuanzhuanList"
          :key="i"
        >
          <img class="school-listImg" :src="x.imgUrl" alt />
          <!-- <video :src="x.videoUrl"></video> -->
          <figcaption>
            <p class="title">{{ x.title }}</p>
            <div>
              <p>
                <span>阅读{{ x.readVolume }}</span>
                <span>
                  分享
                  {{ x.shareVolume }}
                </span>
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
      <!-- 营销爆款 -->
      <div class="money">
        <div class="money-heard">
          <p>今日营销爆款</p>
          <p>
            <span>更多</span>
            <img src="../../assets/个人中心-前进@2x.png" alt />
          </p>
        </div>
        <hr />
        <div class="squeak" v-for="(y, v) of marketGoods" :key="v">
          <div class="portrait">
            <div>
              <p class="photo" v-if="y.headPhoto == ''"></p>
              <p class="photo">
                <img :src="y.headPhoto" alt />
              </p>
              <p class="thotoName">
                <span>{{ y.userName }}</span>
                <br />
                <span style="color: #aaa; font-size: 12px"
                  >{{ y.timeAgo }} {{ y.provcity }}</span
                >
              </p>
            </div>
          </div>
          <!-- 商品名字介绍 -->
          <div class="shopName">
            <div ref="promoteDesc">
              {{ y.promoteDesc }}
            </div>
            <p @click="fulltext()">{{ sss ? "收起" : "全文" }}</p>
          </div>
          <!-- 第一种--自定义 -->
          <div class="imgg" v-if="y.marketType == 0">
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
          <div class="imgu" v-if="y.marketType == 1">
            <div v-for="(x, i) of y.zhizhiImg" :key="i">
              <img :src="x" alt v-if="i < 1" @click="imgOnclick(y, i)" />
            </div>
          </div>
          <!-- 第三种 2张-->
          <div class="imga" v-if="y.marketType == 2">
            <div v-for="(x, i) of y.zhizhiImg" :key="i">
              <img :src="x" alt v-if="i < 2" @click="imgOnclick(y, i)" />
            </div>
          </div>
          <!-- 第四种 3张 左一右二 -->
          <div class="imgs" v-if="y.marketType == 3">
            <img :src="y.zhizhiImg[0]" alt @click="imgOnclick(y, 1)" />
            <div class="imgsd">
              <div v-for="(x, i) of y.zhizhiImg" :key="i">
                <img :src="x" alt v-if="i < 2" @click="imgOnclick(y, i)" />
              </div>
            </div>
          </div>
          <!-- 第五种 3张 3列一行 -->
          <div class="imgn" v-if="y.marketType == 4">
            <div v-for="(x, i) of y.zhizhiImg" :key="i">
              <img :src="x" alt v-if="i < 3" @click="imgOnclick(y, i)" />
            </div>
          </div>
          <!-- 第六种 6张  3列二行 -->
          <div class="img" v-if="y.marketType == 5">
            <div v-for="(x, i) of y.zhizhiImg" :key="i">
              <img :src="x" alt v-if="i < 6" @click="imgOnclick(y, i)" />
            </div>
          </div>
          <!-- 第七种 9张 3列三行-->
          <div class="img" v-if="y.marketType == 6">
            <div v-for="(x, i) of y.zhizhiImg" :key="i">
              <img :src="x" alt v-if="i < 9" @click="imgOnclick(y, i)" />
            </div>
          </div>
          <!-- 第八种 3张 上一下二-->
          <div class="imgh" v-if="y.marketType == 7">
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
          <div class="imgi" v-if="y.marketType == 8">
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
          <div class="imgk" v-if="y.marketType == 9">
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
            <van-tag
              v-for="(x, i) of y.goodsTagList"
              :key="i"
              :color="`#${x.bgColor}`"
              :text-color="`#${x.fontColor}`"
              >{{ x.tagName }}</van-tag
            >
            <div>
              <p>
                <span
                  >¥{{
                    Number(
                      Number(y.originalPrice) -
                        Number(y.couponDiscount ? y.couponDiscount : 0) -
                        Number(y.returnMoney)
                    ).toFixed(2)
                  }}</span
                >
                <span>
                  原价¥
                  <s>{{ y.originalPrice }}</s>
                </span>
                <span>再返¥{{ y.returnMoney }}</span>
              </p>
              <p>
                <span>
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
                <span>月销{{ y.shareVolume }}</span>
              </p>
            </div>
          </div>
          <div class="preservation">
            <p>
              <img src="../../assets/zhuanzhuan/保存素材@2x.png" alt="" />
              保存素材
            </p>
            <p>
              <img src="../../assets/zhuanzhuan/复制文案@2x.png" alt="" />
              复制口令
            </p>
            <p>
              <img
                src="../../assets/zhuanzhuan/商学院分享13icon@2x.png"
                alt=""
              />
              {{ y.shareVolume }}
            </p>
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
                <!-- 淘宝图标 -->
                <img
                  class="icon"
                  v-if="dataSource == '2' && userType == '0'"
                  src="../../assets/png_taobao@2x.png"
                  alt
                />
                <!-- 拼多多图标 -->
                <img
                  class="icon"
                  v-if="dataSource == '1'"
                  src="../../assets/png_pinduoduo@2x.png"
                  alt
                />
                <!-- 京东图标 -->
                <img
                  class="icon"
                  v-if="dataSource == '3'"
                  src="../../assets/png_jingdong@2x.png"
                  alt
                />
                <!-- 天猫图标 -->
                <img
                  class="icon"
                  v-if="dataSource == '2' && userType == '1'"
                  src="../../assets/png_tianmao@2x.png"
                  alt
                />
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
                <s @click="collectionONclick(y)">原价¥{{ y.originalPrice }}</s>
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
      </div>
      <!-- 营销素材 -->
      <div class="material">
        <div class="material-heard">
          <p>今日营销素材</p>
          <p>
            <span>更多</span>
            <img src="../../assets/个人中心-前进@2x.png" alt />
          </p>
        </div>
        <hr />
        <div class="squeak" v-for="(x, i) of materialList" :key="i">
          <div class="portrait">
            <div>
              <p class="photo" v-if="x.headPhoto == ''"></p>
              <p class="photo">
                <img :src="x.headPhoto" alt />
              </p>
              <p class="thotoName">
                <span>{{ x.userName }}</span>
                <br />
                <span style="color: #aaa; font-size: 12px"
                  >{{ x.timeAgo }}
                </span>
              </p>
            </div>
          </div>
          <div class="material-img">
            <p>{{ x.content }}</p>
            <img :src="x.imgUrl" alt />
          </div>
          <div class="preservation">
            <p>
              <img src="../../assets/zhuanzhuan/保存素材@2x.png" alt="" />
              保存素材
            </p>
            <p>
              <img src="../../assets/zhuanzhuan/复制文案@2x.png" alt="" />
              复制
            </p>
            <p>
              <img
                src="../../assets/zhuanzhuan/商学院分享13icon@2x.png"
                alt=""
              />
              {{ x.shareVolume }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <p class="nomore">没有更多了</p>
  </div>
</template>

    <script>
let information = JSON.parse(localStorage.getItem("jd-webapp"));
import {
  earnIndexMarket,
  squeakGoods,
  status,
  viewBaseInfo,
  center,
} from "@/api/api.js";
import { ImagePreview } from "vant";
import { getPhoneType } from "@/utils/index.js";
let model = getPhoneType(); //手机类型
let instance;
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      zhuanzhuanList: [], //商学院
      marketGoods: [], //营销爆款
      materialList: [], //营销素材
      leagueMember: false,
      status: [],
      nickName: "", //名字
      shouji: "",
      nameq: "", //名字
      myimg: "../../assets/zuixin.png", //默认头像qqqqqqwerwe
      heardimg: false, //默认头像隐藏
      heard: true, //默认头像隐藏,
      tasksInfo: [], //团长任务
      sss: false, //点击全文
      Teamleader: "",
      collecTion: false, //收藏
      collectionShow: 1, //收藏
      thumbnailUrl: "", //缩略图
      formData: {
        goodsList: [
          {
            goodsId: "",
            dataSource: "",
          },
        ],
      }, //收藏传参
      dataSource: "", //类型
      goodsName: "", //名字
      originalPrice: "", //原价
      couponDiscount: "", //优惠券
      returnMoney: "", //返价
    };
  },
  mounted() {
    earnIndexMarket().then((res) => {
      this.zhuanzhuanList = res.data.data.shoppingSchoolArticleList.list; //商学院
      this.marketGoods = res.data.data.marketGoods.goodsList;
      this.materialList = res.data.data.marketMaterials.list;
      this.marketGoods.forEach((x, i) => {
        let str = JSON.parse(x.data);
        x.zhizhiImg = str.imgUrlArr; //图片
        x.originalPrice = str.originalPrice; //原价
        x.couponDiscount = str.couponDiscount; //优惠券
        x.returnMoney = str.returnMoney; //反价
        x.goodsName = str.goodsName; //优惠券
        x.userType = str.userType; //优惠券
        x.strVolume = str.strVolume; //优惠券
        x.couponStartTime = str.couponStartTime; //优惠券开始时间
        x.couponEndTime = str.couponEndTime; //优惠券结束时间
      });
    });
    //团长任务
    center().then((res) => {
      this.tasksInfo = res.data.data.tasksInfo;
      this.Teamleader = res.data.data.userLevelInfo.level;
    });
    //获取基本信息
    viewBaseInfo({
      token: this.$store.state.token,
      network: 0,
      apiVersion: "v4.0",
      system: "4",
      model: model,
      uid: "f86ba805761b4624b58c3ece03414fce",
      platformType: "4",
      device: "0",
      idfa: "00000000-0000-0000-0000-000000000000",
      operator: 0,
    }).then((res) => {
      // //隐藏中间4位
      this.shouji = `${
        res.data.data.mobile && res.data.data.mobile.substr(0, 3)
      }****${res.data.data.mobile && res.data.data.mobile.substr(7)}`;
      if (res.data.code == 0) {
        if (res.data.data.headPicUrl == "") {
          this.heardimg = true;
          this.heard = false;
        } else {
          this.myimg = res.data.data.headPicUrl;
        }
        if (res.data.data.nickName == "") {
          this.nameq = this.shouji || res.data.data.mobile;
        } else {
          this.nameq = res.data.data.nickName;
        }
      }
    }),
      status().then((res) => {
        this.status = res.data.data.dailyTaskList;
      });
    this.$nextTick(() => {
      if (information == null) {
        this.leagueMember = false;
      } else {
        this.leagueMember = true;
      }
    });
  },
  methods: {
    //点击图片
    imgOnclick(x, i) {
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
    },
    advanced() {
      this.$router.push({ name: "college" });
    },
    //官方导师
    clickRight() {
      if (information == null) {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ name: "Officialtutor" });
      }
    },
    // 任务
    task() {
      if (information == null) {
        this.$router.push({ name: "register" });
      } else {
      }
    },
    //分类
    classification(x) {
      this.$router.push({ name: "college", query: { num: x } });
    },
    //点击全文
    fulltext() {
      this.sss = !this.sss;
      console.log(this.sss);
      if (this.sss == false) {
        this.$refs.promoteDesc[0].style.heigth = "1rem";
      } else if (this.sss == true) {
        this.$refs.promoteDesc[0].style.heigth = "auto";
      }
    },
    //点击去邀请
    button(name) {
      if (name == "去邀请") {
        this.$router.push({ name: "Sharinginvitation" });
      } else if (name == "去查看") {
        this.$router.push({ name: "myProfit" });
      }
    },
    //跳转详情
    collectionONclick(x) {
      this.$router.push({
        name: "details",
        query: {
          imgUrlArr: this.collectionList.imgUrlArr,
          goodsName: this.collectionList.goodsName,
          mallName: this.collectionList.mallName,
          originalPrice: this.collectionList.originalPrice,
          returnMoney: this.collectionList.returnMoney,
          dataSource: this.collectionList.dataSource,
          strVolume: this.collectionList.strVolume,
          discountPrice: this.collectionList.discountPrice,
          couponStartTime: this.collectionList.couponStartTime || "",
          couponEndTime: this.collectionList.couponEndTime || "",
          couponDiscount: this.collectionList.couponDiscount,
          userType: this.collectionList.userType,
          jdCouponUrl: this.collectionList.jdCouponUrl,
          goodsUrl: this.collectionList.goodsUrl,
          goodsId: this.collectionList.goodsId,
          shareUrl: this.collectionList.shareUrl,
          provcity: this.collectionList.provcity,
          goodsTagList:
            JSON.stringify(this.collectionList.goodsTagList) || null,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.zhuanzhuan {
  width: 100%;
  height: auto;
  background: #f0f1f2;
  //头部
  .hear {
    width: 100%;
    height: 2.75rem;
    padding: 0 0.75rem;
    box-sizing: border-box;
    background: white;
    position: fixed;
    top: 0;
    z-index: 100;
  }
  .zhuanzhuanTop {
    width: 100%;
    height: auto;
    background: #f0f1f2;
    //分类
    .classification {
      width: 100%;
      height: 4.5rem;
      display: flex;
      justify-content: space-around;
      background: #fff;
      margin-top: 0.5rem;
      figure {
        font-size: 0.8125rem;
        color: #666;
        text-align: center;
        margin: auto 0;
        img {
          width: 2.1875rem;
          height: 2.1875rem;
        }
      }
    }
    //任务
    .task {
      width: 100%;
      height: auto;
      background: #fff;
      margin-top: 0.5rem;
      padding: 0.5rem 0;
      div {
        width: 95%;
        margin: 0.5rem auto;
        display: flex;
        justify-content: space-between;
        p:last-child {
          border: none;
        }
        p {
          width: 14rem;
          display: flex;
          border-bottom: solid 1px #999;
          span {
            display: block;
            width: 0.925rem;
            height: 0.925rem;
            background: red;
            text-align: center;
            line-height: 1rem;
            font-size: 0.5rem;
            margin-top: 0.1rem;
            color: #fff;
            border-radius: 0.2rem;
            margin-right: 0.2rem;
          }
          font-size: 0.75rem;
        }
        .van-button {
          width: 3.5rem;
          height: 1.5rem;
          font-size: 0.2rem;
          // transform: scale(0.7);
          .van-button__text {
            margin-top: -0.9rem;
            text-align: center;
          }
        }
      }
    }
    //商学院
    .school {
      width: 100%;
      height: auto;
      margin-top: 0.5rem;
      background: #fff;
      padding: 1rem 0;
      .school-heard {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
        p:nth-child(2) {
          color: #999;
          font-size: 12px;
          img {
            width: 12px;
            height: 12px;
            vertical-align: middle;
          }
        }
      }
      .school-list {
        padding: 0 0.75rem;
        display: flex;
        margin-top: 0.5rem;
        .school-listImg {
          width: 7.875rem;
          height: 6rem;
          border-radius: 0.3rem;
        }
        figcaption {
          width: 70%;
          height: auto;
          .title {
            margin-left: 0.5rem;
            font-size: 0.875rem;
          }
          p {
            width: 100%;
            height: 2.5rem;
          }
          div {
            margin-top: 1.8rem;
            p {
              display: flex;
              justify-content: space-between;
              margin-left: 0.5rem;
              font-size: 0.6875rem;
              color: #999;
              img {
                width: 0.8125rem;
                height: 0.8125rem;
              }
            }
          }
        }
      }
    }
    //营销爆款
    .money {
      width: 100%;
      height: auto;
      margin: 0.5rem 0;
      background: #fff;
      padding: 1rem 0;
      //头
      .money-heard {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
        p:nth-child(2) {
          color: #999;
          font-size: 12px;
          img {
            width: 12px;
            height: 12px;
            vertical-align: middle;
          }
        }
      }
      hr {
        width: 95%;
        margin: 0 auto;
      }
      .squeak {
        width: 100%;
        height: auto;
        background: #fff;
        margin: 0;
        border-radius: 0.2rem;
        position: relative;
        padding: 0.2rem 0.75rem;
        box-sizing: border-box;
        .portrait {
          width: 94%;
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0 0;
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
              height: 3rem;
              font-size: 0.9375rem;
              color: #c1272d;
              span {
                height: 1rem;
                padding: 0;
                margin: 0;
              }
            }
          }
          p {
            img {
              width: 0.9rem;
              height: 0.9rem;
            }
            span {
              font-size: 0.75rem;
            }
          }
        }
        //商品名字
        .shopName {
          width: 100%;
          margin: 0 0 0.5rem;
          div {
            font-size: 14px;
            color: #000;
            height: 1rem;
            border: solid 1px;
            overflow: hidden;
          }
          p {
            font-size: 0.8125rem;
            color: cadetblue;
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
              width: 10rem;
              img {
                width: 100%;
                height: 10rem;
                flex-shrink: 0;
                border-radius: 0.5rem;
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
              height: 10rem;
              border-radius: 0.5rem;
            }
          }
        }
        .imga {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          div {
            width: 50%;
            img {
              width: 10.125rem;
              height: 10rem;
              flex-shrink: 0;
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
              width: 50%;
              img {
                width: 100%;
                height: 10rem;
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
            }
          }
        }
        .imgn {
          width: 100%;
          img {
            width: 32%;
            height: 6.5rem;
            margin-left: 0.2rem;
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
          bottom: 7.2rem;
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
              width: auto;
              padding: 0.2rem 0;
              span:nth-child(1) {
                color: #ff0c05;
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
              width: 6.5rem;
              color: #999;
              font-size: 10px;
              padding: 0.2rem 0;
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
      .preservation {
        width: 95%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        img {
          width: 0.9125rem;
          height: 0.9125rem;
          vertical-align: middle;
        }
        font-size: 0.8125rem;
        vertical-align: middle;
      }
    }
    //营销素材
    .material {
      width: 100%;
      height: auto;
      margin-top: 0.5rem;
      background: #fff;
      margin-bottom: 5rem;
      //头
      .material-heard {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
        p:nth-child(2) {
          color: #999;
          font-size: 12px;
          img {
            width: 12px;
            height: 12px;
            vertical-align: middle;
          }
        }
      }
      hr {
        width: 95%;
        margin: 0 auto;
      }
      .squeak {
        width: 100%;
        height: auto;
        background: #fff;
        margin: 0;
        border-radius: 0.2rem;
        position: relative;
        padding: 0.2rem 0.75rem;
        box-sizing: border-box;
        .portrait {
          width: 94%;
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0 0;
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
              height: 3rem;
              font-size: 0.9375rem;
              color: #c1272d;
              span {
                height: 1rem;
                padding: 0;
                margin: 0;
              }
            }
          }
          p {
            img {
              width: 0.9rem;
              height: 0.9rem;
            }
            span {
              font-size: 0.75rem;
            }
          }
        }
        //商品名字
        .shopName {
          width: 100%;
          height: auto;
          margin: 0 0 0.5rem;
        }

        .imgNumber {
          width: 1.8rem;
          height: 1.3rem;
          background: #000;
          opacity: 0.4;
          position: absolute;
          bottom: 7.2rem;
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
              width: auto;
              padding: 0.2rem 0;
              span:nth-child(1) {
                color: #ff0c05;
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
              width: 6.5rem;
              color: #999;
              font-size: 10px;
              padding: 0.2rem 0;
              span:nth-child(2) {
                margin-left: 0.3rem;
              }
            }
          }
        }
        .material-img {
          width: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .preservation {
        width: 95%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        img {
          width: 0.9125rem;
          height: 0.9125rem;
          vertical-align: middle;
        }
        font-size: 0.8125rem;
        vertical-align: middle;
      }
    }
    //团员
    .leagueMember {
      width: 100%;
      background: #fff;
      padding: 3rem 0 0.5rem;
      margin-top: 0.5rem;
      .leagueMember-hear {
        display: flex;
        justify-content: space-between;
        padding: 0 0.75rem;
        p:nth-child(1) {
          display: flex;
          .figureimg {
            width: 2.75rem;
            height: 2.75rem;
            border-radius: 50%;
          }
          .imghear {
            width: 4.2rem;
            height: 1.25rem;
            margin-top: 0.9rem;
            margin-left: 0.5rem;
          }
          font-size: 0.9375rem;
          span {
            line-height: 3rem;
            color: #333;
          }
        }
        p:nth-child(2) {
          margin: auto 0;
          img {
            width: 0.8125rem;
            height: 0.8125rem;
          }
        }
      }
      .figure {
        display: flex;
        justify-content: space-between;
        font-size: 0.8125rem;
        margin: 1rem 0.75rem 0;
        figcaption {
          margin-left: -8rem;
          margin-top: 0.5rem;
          .div {
            display: flex;
            position: relative;
            top: 0.5rem;
            span:nth-child(1) {
              display: block;
              height: 0.25rem;
              background: red;
              z-index: 10;
              border-radius: 0.3rem;
            }
            span:nth-child(2) {
              display: block;
              width: 70%;
              height: 0.25rem;
              background: #ededed;
              position: absolute;
              top: 0;
              border-radius: 0.3rem;
            }
            span:nth-child(3) {
              position: absolute;
              top: -0.4rem;
              left: 6.2rem;
              font-size: 0.3rem;
              transform: scale(0.9);
            }
          }
        }
        img {
          width: 2.25rem;
          height: 2.25rem;
          margin-top: 0.5rem;
        }
        .van-button {
          margin-top: 0.8rem;
          width: auto;
        }
      }
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
    justify-content: space-between;
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
        // background: #ffaaaa;
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
        // padding: 0 0.2rem;
        border: solid 1px;
        .icon {
          width: 0.88rem;
          height: 0.88rem;
          vertical-align: middle;
        }
      }
      .returnPrice {
        margin-left: -10rem;
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
}
</style>