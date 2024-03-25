<template>
  <div class="ordersAll">
    <van-nav-bar :title="title" @click-left="$router.go(-1)" type="line" :border="false">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
      <template #right>
        <span @click="help">
          <img v-if="helps" style="width:1.5rem" src="../../assets/常见问题icon@3x.png" alt />
        </span>
      </template>
    </van-nav-bar>
    <!-- 淘宝 拼多多 -->
    <van-tabs
      v-model="formData.dataSource"
      title-active-color="#FF6303"
      @click="onClick"
      line-width="30px"
      type="line"
      :border="false"
    >
      <van-tab name="0" title="全部" class="searchtu"></van-tab>
      <van-tab name="2" title="淘宝" class="searchtu"></van-tab>
      <van-tab name="3" title="京东" class="searchtu"></van-tab>
      <van-tab name="1" title="拼多多" class="searchtu"></van-tab>
    </van-tabs>
    <van-notice-bar
      class="orderTips"
      color="#FE0C05"
      v-if="loadorder"
      background="#FFEBEA"
      :scrollable="false"
      :wrapable="true"
    >
      订单量较大，状态更新可能延时，请耐心等待。超过2个小时还未显示订单，请
      <u style="color:#FE0C05" @click="show = true">联系客服</u>。
    </van-notice-bar>
    <van-notice-bar
      class="orderTip"
      color="#FE0C05"
      v-if="orderyi"
      background="#FFEBEA"
      :scrollable="false"
      :wrapable="true"
    >仅展示已确认收货但返利未到账的订单数据。</van-notice-bar>
    <div class="tao" style="overflow-y:auto">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="tblist.length != 0 ? '没有更多啦~': ''"
        @load="onLoad"
      >
        <figure v-for="(x,i) of tblist" :key="i" @click="orderClick(x)">
          <p class="number">
            <span>订单编号：{{x.orderSn}}</span>
            <van-tag
              round
              type="primary"
              :color="tabs(x.orderStatus)"
            >{{x.orderStatus | getOrderStatus}}</van-tag>
          </p>
          <figcaption>
            <div class="morentu">
              <!-- 商品图片默认 -->
              <div v-if="x.goodsThumbnailUrl == ''"></div>
              <!-- 商品图片 -->
              <img
                v-if="x.isGift == 0"
                style="display:block;width:6rem;height:6rem;flex-shrink: 0;"
                :src="x.goodsThumbnailUrl"
                alt
              />
              <!-- 赠品默认图 -->
              <img
                v-else
                style="display:block;width:6rem;height:6rem;"
                src="../../assets/赠品默认图@2x.png"
                alt
              />
              <!-- 显示赠品标志 -->
              <img v-if="x.isGift == 1" src="../../assets/赠品icon@2x.png" class="imgzeng" alt />
            </div>
            <div style="margin-left: 0.5rem;;height:6rem">
              <span class="omit">
                <!-- 淘宝图标 -->
                <img
                  class="icon"
                  v-if="x.dataSource == '2' && x.userType == '0'"
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
                <!-- 饿了么 -->
                <img
                  class="icon"
                  v-if="x.dataSource == '2' && x.userType == '2'"
                  src="../../assets/png_eleme@2x.png"
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
                  <!-- 考拉 -->
                <img class="icon" v-if="x.dataSource == 4" src="../../assets/png_kaola@3x.png" alt />
                  <!-- 苏宁 -->
                <img
                  class="icon"
                  v-if="x.dataSource == '5'"
                  src="../../assets/png_suNing@3x.png"
                  alt
                />
                {{x.goodsName}}
              </span>
              <p class="ptwo">
                <span>实付:¥{{x.orderAmount}}</span>
                <span>返利:¥{{x.returnMoney}}</span>
              </p>
              <p class="pthree">支付时间：{{x.orderPayTime}}</p>
            </div>
          </figcaption>
        </figure>
        <van-empty description="暂无相关订单" v-if="noorder">
          <img src="../../assets/png_OrderNone@2x.png" alt slot="image" />
        </van-empty>
      </van-list>
    </div>

    <!-- 二维码 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click="show = false">
        <figure class="block">
          <div>
            <img class="block_img" src="../../assets/省购客服二维码@2x.png" alt />
            <p>长按保存客服微信二维码</p>
          </div>
          <figcaption>
            <div class="jump">
              <img src="../../assets/icon_cancel jump@2x.png" alt />
            </div>
          </figcaption>
        </figure>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { userOrder } from "@/api/api.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      noorder: false, //暂无订单
      tblist: [],
      pddlist: [],
      loading: false,
      finished: false,
      loadorder: true, //订单隐藏
      orderyi: false,
      // 题目
      title: "",
      // 表单数据
      formData: {
        timestamp: 0,
        dataSource: 0,
        orderStatus: 0,
      },
      show: false,
      helps: true, //帮助图标
      moren: false, //没有头像
    };
  },
  mounted() {
    // 订单状态 0未付款 1已收货  2失效订单 3已支付
    if (this.$route.query.type == "all") {
      this.formData.orderStatus = 0;
      this.title = "全部订单";
      this.loadorder = true;
      this.orderyi = false;
      this.helps = true;
    } else if (this.$route.query.type == "soon") {
      this.formData.orderStatus = 3;
      this.title = "已支付";
      this.loadorder = false;
      this.orderyi = false;
      this.helps = false;
    } else if (this.$route.query.type == "already") {
      this.formData.orderStatus = 1;
      this.title = "已收货";
      this.loadorder = false;
      this.orderyi = true;
      this.helps = false;
    } else {
      this.formData.orderStatus = 2;
      this.title = "已失效";
      this.loadorder = false;
      this.orderyi = false;
      this.helps = false;
    }
  },
  methods: {
    onClick(name, title) {
      if (title == "全部") {
        this.loadorder = true;
        this.orderyi = true;
        if (this.$route.query.type == "all") {
          this.orderyi = false;
        } else if (this.$route.query.type == "already") {
          this.loadorder = false;
        } else {
          this.loadorder = false;
          this.orderyi = false;
        }
      } else {
        this.loadorder = false;
        this.orderyi = false;
      }
      this.tblist = [];
      this.formData.timestamp = 0;
      this.formData.dataSource = name;
      this.onLoad();
    },
    //帮助
    help() {
      // window.location.href = "https://url.mc.cn//#/helpCenter?isH5=1";
      Toast('不能用')
    },
    tabs(val) {
      switch (val) {
        case 0:
          return "red";
        case 1:
          return "red";
        case 2:
          return "#555";
        case 3:
          return "red";
      }
    },
    //上滑
    onLoad() {
      userOrder(this.formData)
        .then((res) => {
          this.loading = false;
          this.formData.timestamp = res.data.data.timestamp
            ? res.data.data.timestamp
            : 0;
          if (res.data.data.orderList) {
            if (res.data.data.isLastPage == false) {
              this.tblist = this.tblist.concat(res.data.data.orderList);
            } else {
              this.tblist = this.tblist.concat(res.data.data.orderList);
              this.finished = true;
              this.noorder = false;
            }
          } else {
            this.finished = true;
            this.noorder = true;
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    customer() {
      this.show = true;
    },
    //订单点击
    orderClick(x) {
      if (x.isGift == 0) {
        this.$router.push({
          name: "orderDetails",
          query: {
            id: x.id,
            title: x.orderStatus,
            orderStatus: x.orderStatus,
            orderPayTime: x.orderPayTime,
          },
        });
      } else if (x.isGift == 1) {
        Toast("赠品不可点击哦");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ordersAll {
  width: 100%;
  height: 100%;
  position: relative;
  .van-tabs {
    ::v-deep .van-tabs__line {
      width: 1.875rem;
      background: #ff6303;
    }
  }
  .tao {
    background: #f6f6f6;
    height: calc(100% - 5.75rem);
    .van-list {
      .van-empty {
        .van-empty__image {
          img {
            display: block;
            width: 5rem;
            height: 5rem;
            margin: 5.5rem auto 0;
          }
        }
      }
    }

    figure {
      width: 21.9375rem;
      height: auto;
      justify-content: space-around;
      margin: 0.75rem auto;
      font-size: 0.875rem;
      color: #333333;
      background: white;
      box-sizing: border-box;
      border-radius: 0.5rem;
      padding: 0.3rem;
      figcaption {
        position: relative;
        .imgzeng {
          position: absolute;
          top: 0.5rem;
          left: 0;
          width: 1.6875rem;
          height: 0.8125rem;
          display: block;
        }
      }
      img {
        border-radius: 0.25rem;
        flex-shrink: 0;
      }
      .number {
        display: flex;
        justify-content: space-between;
        color: #999999;
        font-size: 0.69rem;
        margin: 0.75rem 0 -0.8rem;
        padding: 0.5rem 0.75rem;
        border-bottom: solid 0.01rem #f6f6f6;
      }

      .pthree {
        color: #999999;
        font-size: 0.69rem;
        margin-top: 0.1rem;
      }
      figcaption {
        display: flex;
        margin: 0.85rem auto 0;
        font-size: 0.8125rem;
        padding: 0.3rem 0;
        width: 20.5rem;
        .morentu {
          width: 6rem;
          height: 6rem;
          border-radius: 0.2rem;
          background: #f6f6f6;
          margin-top: 0.2rem;
        }
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
          // padding: 0.2rem 0;
          width: 14rem;

          .icon {
            width: 0.88rem;
            height: 0.88rem;
            vertical-align: middle;
          }
        }
        .ptwo {
          width: 11rem;
          display: flex;
          justify-content: space-between;
          margin-top: 0.1rem;
          span {
            width: auto;
          }
          span:nth-of-type(2) {
            color: red;
          }
        }
      }
    }
  }
}
::v-deep .van-notice-bar {
  font-size: 0.6875rem !important;
  line-height: 1.2rem;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 17.4375rem;
  height: 19.3125rem;
  background-color: #fff;
  border-radius: 0.75rem;
  .block_img {
    width: 14.4375rem;
    height: 14.4375rem;
    display: block;
    margin: 1.5rem auto 0.75rem;
  }
  p {
    font-size: 0.875rem;
    color: #999;
    text-align: center;
  }
  figcaption {
    width: 100%;
    .jump {
      width: 2.25rem;
      height: 2.25rem;
      margin: 5rem auto 0;
      img {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
      }
    }
  }
}
::v-deep .van-notice-bar__content {
  margin: 0 auto;
}
</style>