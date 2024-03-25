<template>
  <div class="orderDetails">
    <van-nav-bar title="订单详情" @click-left="$router.go(-1)" :border="false">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="white" />
      </template>
    </van-nav-bar>
    <!-- 返利 -->
    <figure class="figure">
      <div>
        <p>
          返利 ¥
          <span style="font-size: 20px">{{ orderList.returnMoney }}</span>
        </p>
        <p>{{ orderList.timeText }}</p>
      </div>

      <figcaption>
        <img
          v-if="orderList.orderStatus == '3'"
          src="../../assets/orderetails/30天到账@3x.png"
          alt
        />
        <img
          v-if="orderList.orderStatus == '1'"
          src="../../assets/orderetails/待到账图.png"
          alt
        />
        <img
          v-if="orderList.orderStatus == '2'"
          src="../../assets/orderetails/返利失效@3x.png"
          alt
        />
        <img
          v-if="orderList.orderStatus == '4'"
          src="../../assets/orderetails/已到账图@3x.png"
          alt
        />
      </figcaption>
    </figure>
    <!-- 商品 -->
    <figure class="shop">
      <img :src="orderList.goodsThumbnailUrl" alt />
      <figcaption>
        <span class="omit">
          <!-- 淘宝图标 -->
          <img
            class="icon"
            v-if="orderList.dataSource == '2' && orderList.userType == '0'"
            src="../../assets/png_taobao@2x.png"
            alt
          />
          <!-- 拼多多图标 -->
          <img
            class="icon"
            v-if="orderList.dataSource == '1'"
            src="../../assets/png_pinduoduo@2x.png"
            alt
          />
          <!-- 饿了么 -->
          <img
            class="icon"
            v-if="orderList.dataSource == '2' && orderList.userType == '2'"
            src="../../assets/png_eleme@2x.png"
            alt
          />
          <!-- 京东图标 -->
          <img
            class="icon"
            v-if="orderList.dataSource == '3'"
            src="../../assets/png_jingdong@2x.png"
            alt
          />
          <!-- 天猫图标 -->
          <img
            class="icon"
            v-if="orderList.dataSource == '2' && orderList.userType == '1'"
            src="../../assets/png_tianmao@2x.png"
            alt
          />
          {{ orderList.goodsName }}
        </span>
        <p>
          实付:
          <span style="color: #2a2a2a">¥{{ orderList.orderAmount }}</span>
        </p>
      </figcaption>
    </figure>
    <!-- 已支付订单 -->
    <div class="zforder">
      <div>{{ orderList.orderStatus | getOrderStatus }}订单</div>
      <p class="fuzhi">
        <span>订单编号: {{ orderList.orderSn }}</span>
        <button
          class="tag-read"
          :data-clipboard-text="orderList.orderSn"
          @click="copys"
        >
          复制
        </button>
      </p>
      <p>支付时间: {{ this.$route.query.orderPayTime }}</p>
      <p v-if="receiving">
        收货时间: {{ Number(orderList.orderReceiveTime) | getTimes }}
      </p>
      <p v-if="invalid">
        失效时间: {{ Number(orderList.updateTime) | getTimes }}
      </p>
    </div>
    <!-- 客服 -->
    <div class="service">
      <div v-if="orderList.dataSource == '2'" @click="thirdParty">
        <img src="../../assets/orderetails/进入淘宝@2x.png" alt />进入淘宝
      </div>
      <div v-if="orderList.dataSource == '3'" @click="thirdParty">
        <img src="../../assets/orderetails/进入京东@2x.png" alt />进入京东
      </div>
      <div v-if="orderList.dataSource == '1'" @click="thirdParty">
        <img src="../../assets/orderetails/进入拼多多@2x.png" alt />进入拼多多
      </div>
      <div v-if="orderList.dataSource == '4'" @click="thirdParty">
        <img src="../../assets/orderetails/进入考拉@2x.png" alt />进入考拉
      </div>
      <div v-if="orderList.dataSource == '5'" @click="thirdParty">
        <img src="../../assets/orderetails/进入苏宁@2x.png" alt />进入苏宁
      </div>
      <div @click="$router.push({ name: 'fuli' })">
        <img src="../../assets/orderetails/客服微信@2x.png" alt />客服微信
      </div>
    </div>
    <div class="toase">
      此订单是{{
        orderList.dataSource | getdataSource
      }}订单，物流售后问题请进入{{ orderList.dataSource | getdataSource }}咨询。
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard"; //点击复制
import { Toast } from "vant";
import {
  userOrders,
  createPddExtensionUrl,
  getJdGoodsRecommendUrl,
} from "@/api/api.js";
export default {
  data() {
    return {
      orderList: [], //接收数据
      receiving: false, //收货时间
      invalid: false, //失效时间
      shareUrl: "",
    };
  },
  mounted() {
    userOrders({ id: this.$route.query.id }).then((res) => {
      this.orderList = res.data.data;
      if (res.data.data.orderStatus == 1) {
        this.receiving = true;
      } else if (res.data.data.orderStatus == 2) {
        this.receiving = false;
        this.invalid = true;
      }
    });
  },
  methods: {
    //粘贴复制
    copys(data) {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", (e) => {
        Toast("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        Toast("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    //进入第三方
    thirdParty() {
      //淘宝
      if (this.orderList.dataSource == "2") {
        if (this.orderList.userType == "1") {
          //天猫
          window.location.href = this.orderList.goodsData.shareUrl;
        } else if (this.orderList.userType == "2") {
          //饿了么
          window.location.href = this.orderList.goodsDetailUrl;
        } else if (this.orderList.userType == "0") {
          //淘宝
          window.location.href = this.orderList.goodsDetailUrl;
        }
      }
      //拼多多
      else if (this.orderList.dataSource == "1") {
        createPddExtensionUrl({
          goodsId: this.orderList.goodsId,
        }).then((res) => {
          window.location.href = res.data.data.url;
        });
        // 京东
      } else if (this.orderList.dataSource == "3") {
        getJdGoodsRecommendUrl({
          goodsUrl: this.orderList.goodsData.goodsUrl,
          couponUrl: this.orderList.goodsData.jdCouponUrl,
        }).then((res) => {
          window.location.href = res.data.data.JdUrl;
        });
        //考拉
      } else if (this.orderList.dataSource == "4") {
        //  window.location.href = this.orderList.goodsThumbnailUrl;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.orderDetails {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  // 头部
  .van-nav-bar {
    background: #ff6303;
    .van-icon {
      margin-left: -1rem;
    }
    .van-ellipsis {
      color: white;
    }
    ::v-deep .van-nav-bar__title {
      color: white;
    }
  }
  // 返利
  .figure {
    width: 100%;
    height: 6rem;
    padding: 0 0.5rem;
    background: #ff6303;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    justify-content: space-between;
    div {
      margin: auto 0;
      p {
        font-size: 0.8125rem;
        margin: 0 0 0.5rem;
      }
    }
    img {
      width: 4.25rem;
      height: 3.125rem;
      display: block;
      flex-shrink: 0;
      margin-top: 1.5rem;
    }
  }
  //商品
  .shop {
    width: 100%;
    height: 7.9375rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
    background: #fff;
    margin: 0.5rem 0 0;
    display: flex;
    img {
      width: 6rem;
      height: 6rem;
      border-radius: 0.3rem;
      margin: auto 0;
      flex-shrink: 0;
    }
    figcaption {
      width: 100%;
      margin: 0.7rem 0.5rem 0;
      font-size: 0.8125rem;
      color: #555;
      .omit {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        vertical-align: middle;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        font-size: 0.78rem;
        color: #333333;
        text-align: left;
        margin-top: 0.1rem;
        height: 3.4rem;

        .icon {
          width: 0.88rem;
          height: 0.88rem;
          vertical-align: middle;
        }
      }
      p {
        margin-top: 1.5rem;
      }
    }
  }
  //已支付订单
  .zforder {
    width: 100%;
    height: auto;
    padding: 0.2rem 0.5rem;
    margin: 0.5rem 0 0;
    background: #fff;
    box-sizing: border-box;
    div {
      margin: 0.75rem 0;
    }
    p {
      font-size: 0.8125rem;
      color: #999;
      margin: 0.75rem 0;
    }
    .fuzhi {
      width: 100%;
      display: flex;
      justify-content: space-between;
      span {
        width: auto;
        display: block;
        margin-right: 2rem;
      }
      button {
        border-radius: 0.5rem;
        border: none;
        padding: 0.1rem 0.3rem;
        font-size: 0.6875rem;
        color: #666;
      }
    }
  }
  //客服
  .service {
    width: 100%;
    height: 3.3125rem;
    background: #fff;
    display: flex;
    margin: 0.5rem 0 0;
    justify-content: space-around;
    line-height: 3.3125rem;
    img {
      width: 1.3125rem;
      height: 1.3125rem;
      vertical-align: middle;
      margin-right: 0.5rem;
    }
  }
  //提示
  .toase {
    height: 1.125rem;
    font-size: 0.8125rem;
    color: #aeaeae;
    text-align: center;
    padding: 0.5rem 0 0;
  }
}
</style>  