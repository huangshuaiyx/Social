/* eslint-disable vue/return-in-computed-property */
<template>
  <div id="purchase">
    <!-- 跳转淘宝 -->
    <van-popup
      class="go"
      :value="show"
      @input="(v) => $emit('changeShow', v)"
      round
      :close-on-click-overlay="false"
    >
      <div>
        <img class="img" src="../../assets/sglogo1024圆角.png" alt />
        <ul ref="loading">
          <li :class="index == 0 ? 'active' : ''"></li>
          <li :class="index == 1 ? 'active' : ''"></li>
          <li :class="index == 2 ? 'active' : ''"></li>
          <li :class="index == 3 ? 'active' : ''"></li>
        </ul>
        <img
          v-if="imgType == 'tb'"
          class="img"
          src="../../assets/pop_img_taobao@2x.png"
          alt
        />
        <img
          v-if="imgType == 'jd'"
          class="img"
          src="../../assets/pop_img_jingdong@2x.png"
          alt
        />
        <img
          v-if="imgType == 'pdd'"
          class="img"
          src="../../assets/pop_img_pinduoduo@2x.png"
          alt
        />
      </div>
      <p>正在打开{{ getAppName }}</p>
      <p>购买成功后返现{{ returnMoney }}元</p>
      <img
        class="popupimg"
        @click="popupimg"
        src="../../assets/删除icon@2x.png"
        alt
      />
    </van-popup>
  </div>
</template>
<script>
/**
 组件参数说明 
 
// 控制显示隐藏，show
v-if="show" 
:show="show"
@changeShow="v => show = v"

// 返现金额 returnMoney
:returnMoney="returnMoney"

// 分享链接 shareUrl
:shareUrl="shareUrl"

// 弹窗图片显示类型 imgType = tb | pdd | jd
:imgType="imgType"
 */
export default {
  name: "purchase",
  props: {
    // 显示隐藏
    show: {
      type: Boolean,
      default: false,
    },
    // 返现金额
    returnMoney: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | String,
      default: 0,
    },
    // 跳转url
    shareUrl: {
      type: String,
      default: "",
    },
    // 显示app图片
    imgType: {
      type: String,
      default: "tb",
    },
  },
  computed: {
    // 获取app名称
    getAppName() {
      switch (this.imgType) {
        case "tb":
          return "淘宝";
        case "pdd":
          return "拼多多";
        case "jd":
          return "京东";
      }
    },
  },
  data() {
    return {
      isGo: true,
      index: 0,
      money: false,
    };
  },
  mounted() {
    if (this.returnMoney == 0) {
      this.money = false;
    } else {
      this.money = true;
    }
    this.$nextTick(() => {
      setInterval(() => {
        this.index += 1;
        if (this.index == 4) {
          this.index = 0;
        }
      }, 400);
    });
    setTimeout(() => {
      if (this.isGo) {
        this.$emit("changeShow", false);
        window.location.href = this.shareUrl;
      }
    }, 2500);
  },
  methods: {
    popupimg() {
      this.isGo = false;
      this.$emit("changeShow", false);
    },
  },
};
</script>
<style lang="scss" scoped>
#purchase {
  .go {
    width: 17.19rem;
    height: 12.56rem;
    div {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 3rem;
      .img {
        width: 3rem;
        height: 3rem;
      }
      ul {
        width: 5rem;
        height: 1.2rem;
        margin-top: 1rem;
        li {
          width: 13%;
          height: 100%;
          float: left;
          margin-left: 0.5rem;
          transition: all 0.3s;
          background: url("../../assets/pop_img_arrow0@2x.png") no-repeat
            center/100%;
          &.active {
            background: url("../../assets/pop_img_arrow1@2x.png") no-repeat
              center/100%;
          }
        }
      }
    }
    p {
      width: 100%;
      text-align: center;
      margin-top: 0.5rem;
    }
    .popupimg {
      position: absolute;
      top: 0.3rem;
      right: 0.3rem;
    }
  }
}
</style>
