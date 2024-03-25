<template>
  <div class="like" style="overflow:auto">
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh" > -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多啦~"
      @load="onLoad"
      offset="200"
    >
      <div class="results">
        <img src="./../../assets/png_search_kong@2x.png" alt />
        <p>抱歉,没有找到相关商品哦~</p>
      </div>

      <div class="recommend">
            <span>为您推荐</span>
      </div>

      <div class="good">
        <figure v-for="(x, i) of arrList" :key="i" :title="x" @click="homepage(x)">
          <img class="good-one" :src="x.thumbnailUrl" alt />
          <figcaption>
            <span class="omit">
              <!-- 淘宝图标 -->
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
              <!-- 天猫图标 -->
              <img
                class="icon"
                v-if="x.dataSource == '2' && x.userType == '1'"
                src="../../assets/png_tianmao@2x.png"
                alt
              />
              {{ x.goodsName }}
            </span>
            <p class="good-for">
              <span class="good-two">{{ x.couponDiscount }}元券</span>
              <span class="good-teer">返{{ x.returnMoney }}元</span>
            </p>
            <p class="good-five" style="color: #fe0c05; font-size: 0.69rem;">
              返后价 ¥
              <span>
                           {{ Number(Number(x.originalPrice)-Number(x.couponDiscount?x.couponDiscount:0)-Number(x.returnMoney)).toFixed(2) }}

              </span>
            </p>
            <p class="good-six" style="color: gray;">
              <span>
                原价¥<s>{{ x.originalPrice }}</s>
              </span>
              <span class="sales">月销{{ x.strVolume }}</span>
            </p>
          </figcaption>
        </figure>
      </div>
    </van-list>
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
</template>


<script>
import { getGoodsDetails, noGoodsRecommend } from "@/api/api.js";
export default {
  name: "kong",
  props: {
    data: String, //接收父组件传过来的值，这是稍微高级一点的写法，也可以props:[' message']
  },
  data() {
    return {
      page: 0,
      arrList: [],
      loading: false,
      finished: false,
      refreshing: false,
      // 跳转淘宝相关
      show1: false,
      shareUrl: "",
      returnMoney: 0,
      imgType: "",
      show: false,
      imgMao: false,
      dataSource: 1 ,
      
    };
  },
  mounted() {
    this.dataSource =  this.$store.state.dataTypes
    window.addEventListener("scroll", this.lala);
  },
  methods: {
    child(name) {
    },
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
    },
    onLoad() {
      this.page++;
      noGoodsRecommend({
        page: this.page,
        dataSource: this.dataSource || 1,
      })
        .then((res) => {
          this.finished = false;
          if (res.data.code == 0) {
            if (res.data.data.goodsList.length != 0) {
              this.loading = false;
              this.arrList = this.arrList.concat(res.data.data.goodsList);
            } else {
              this.finished = true;
            }
          }
        })
        .catch((err) => {
          this.finished = false;
        });
    },
    onRefresh() {
      this.page = 0;
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    homepage(x) {
      this.returnMoney = x.returnMoney;
      this.$router.push({
        name: "details",
        query: {
          obj:x, //全部参数
          imgUrlArr: x.imgUrlArr,
          goodsName: x.goodsName,
          mallName: x.mallName,
          originalPrice: x.originalPrice,
          returnMoney: x.returnMoney,
          dataSource: x.dataSource,
         strVolume:x.strVolume,
          discountPrice: x.discountPrice,
          couponStartTime: x.couponStartTime || "",
          couponEndTime: x.couponEndTime || "",
          couponDiscount: x.couponDiscount,
          userType: x.userType,
          jdCouponUrl: x.jdCouponUrl,
          goodsUrl: x.goodsUrl,
          goodsId: x.goodsId,
          shareUrl:x.shareUrl
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.kong {
  width: 100%;
  border: solid 1px;
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
      padding: 0 0.2rem 0.2rem;
      .omit {
        display: -webkit-box ;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
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
      .good-for {
        width: 100%;
        display: flex;
        font-size: 0.63rem;
        color: white;
        margin-top: 0.5rem;
        span:nth-of-type(2) {
          margin-left: 0.6rem;
        }
        .good-two {
          width: 3rem;
          height: 1.13rem;
          background: url("../../assets/png_bg_quan@2x.png") 100% 100% no-repeat;
          background-size: 3rem 1.13rem;
          display: block;
          line-height: 1.13rem;
          text-align: center;
        }
        .good-teer {
          width: auto;
          padding: 0 0.2rem;
          height: 1.13rem;
          border-radius: 0.25rem;
          display: block;
          background: #fe7f02;
          line-height: 1.13rem;
        }
      }
      .good-five {
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: left;
        margin: 0.3rem 0;
      }
      .good-six {
        font-size: 0.69rem;
        text-align: left;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}

.like {
  width: 100%;
  height: 80%;
  background: #f6f6f6;
 .recommend {
    width: 60%;
    margin: 0.5rem auto;
    line-height: -0.2rem;
    font-size: 0.9rem;
    background: #f6f6f6;
    color: gray;
    span {
				display: flex;
				flex-direction: row;
			}
			span:before,
			span:after {
				content: "";
				flex: 1 1;
				border-bottom: 1px solid #969799;
				margin: auto 0.5rem;
			}
			
			img {
				height: 100px;
				width: 100px;
				border-radius: 50%;
			}
  }
  .results {
    width: 100%;
    height: auto;
    background: #f6f6f6;
    padding: 0.5rem;
    img {
      width: 4.88rem;
      height: 4.31rem;
      margin-left: 9.13rem;
      margin-top: 2.75rem;
    }

    p {
      text-align: center;
      color: #999999;
      font-size: 0.88rem;
      margin-top: 1.27rem;
    }
  }
}
</style>