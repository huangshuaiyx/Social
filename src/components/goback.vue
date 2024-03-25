<template>
  <div id="box">
    <div class="box-top">
      <img class="box-img" src="../assets/retention/top.png" alt="">
      <img class="box_close" src="../assets/retention/close.png" alt="" @click="withdraw">
      <div class="box-text">
        <p>{{ $t('goback.content') }}</p>
      </div>
      <div class="box-bg">
        <!-- <van-image v-for="(x, i) in faces" :key="i" :src="x.faceUrl" fit="cover"
          :error-icon="require('../assets/public/defaultavatar.png')"
          :loading-icon="require('../assets/public/defaultavatar.png')" round>
          <template v-slot:loading> </template>
        </van-image> -->
        <div class="box_bg_div">
          <img :src="faces[0].faceUrl != '' ? faces[0].faceUrl : require('../assets/public/defaultavatar.png')" alt="">
        </div>
        <div class="box_bg_div">
          <img :src="faces[1].faceUrl != '' ? faces[1].faceUrl : require('../assets/public/defaultavatar.png')" alt="">
        </div>
        <div class="box_bg_div">
          <img :src="faces[2].faceUrl != '' ? faces[2].faceUrl : require('../assets/public/defaultavatar.png')" alt="">
        </div>
      </div>
      <div class="box-button">
        <button @click="withdraw">{{ $t('goback.Cancel') }}</button>
        <button @click="cancel">{{ $t('goback.Continue') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { close, closeNative, networkRequest } from "../api/inedx";
import { getQueryString } from "../utils/index";
export default {
  data() {
    return {
      faces: [{ faceUrl: "" }, { faceUrl: "" }, { faceUrl: "" }]
    };
  },
  mounted() {
    setTimeout(() => {
      this.obtainavata()
    }, 200);
  },
  methods: {
    cancel() {
      this.$store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001006",
      });
      if (getQueryString("closeParentActivity") == "1") {
        closeNative(getQueryString("pcode"));
        setTimeout(() => {
          close();
        }, 20);
      } else {
        close();
      }
    },
    withdraw() {
      this.$store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001007",
      });
      this.$emit("property", JSON.stringify(false));
    },
    obtainavata() {
      networkRequest("v1", "/provider/info/recommendList", {
        "pageCode": "P1204000",
        "size": 50
      }).then(res => {
        console.log(res, "头像")
        let art = res
        function getRandomNumbers() {
          while (art.length < 3) {
            art.push({ faceUrl: "" });
          }
          return art;
        }
        console.log(art, '妆后的数据')
        this.faces = getRandomNumbers()
      })
    }
  },
};
</script>

<style lang="scss" scoped>
#box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba($color: #000, $alpha: 0.5);
  z-index: 2002;
  display: flex;
  justify-content: center;
  align-items: center;

  .box-top {
    width: 290px;
    height: 290px;
    background: #211837;
    border-radius: 20px 20px 20px 20px;
    z-index: 100;
    position: relative;

    .box_close {
      width: 23px;
      height: 23px;
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .box-text {
      width: 100%;
      height: 17px;
      font-size: 15px;
      font-family: Arial-Bold, Arial;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 17px;
      text-align: center;
      margin-top: 12px;
    }

    .box-button {
      width: 90%;
      height: auto;
      overflow: hidden;
      display: flex;
      justify-content: space-around;
      margin: 0 auto;

      button:nth-child(1) {
        width: 110px;
        height: 43px;
        background: rgba($color: #2C2441, $alpha: 0.6);
        background-size: cover;
        border-radius: 25px;
        font-size: 15px;
        font-family: Arial;
        font-weight: 700;
        color: #fff;
        border: none;
      }

      button:nth-child(2) {
        width: 110px;
        height: 43px;
        border-radius: 25px;
        font-size: 15px;
        font-family: Arial;
        color: #fff;
        border: none;
        font-weight: 700;
        background: linear-gradient(90deg, #37FCEB 0%, #1B5CF4 100%);
      }
    }

    .box-img {
      width: 75px;
      height: 75px;
      margin-top: 16px;
      margin-left: 50%;
      transform: translateX(-50%);
    }

    .box-bg {
      width: 221px;
      height: auto;
      background-size: cover;
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
      position: relative;

      .box_bg_div:nth-child(1) {
        width: 55px;
        height: 55px;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .box_bg_div:nth-child(2) {
        width: 55px;
        height: 55px;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .box_bg_div:nth-child(3) {
        width: 55px;
        height: 55px;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }

  .box-top1 {
    width: 290px;
    height: 304px;
    background: linear-gradient(180deg, #8128F5 0%, #4543E5 59%, #211287 100%);
    border-radius: 20px 20px 20px 20px;
    z-index: 100;
    position: relative;

    .box-text {
      font-family: Arial;
      font-weight: bold;
      color: #fff;
      margin: 38px auto 0;
      text-align: center;
      line-height: 21px;
      font-size: 18px;
    }

    .box-button {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-around;
      margin: 15px 0 0 0;
      overflow: hidden;

      button:nth-child(1) {
        width: 110px;
        height: 43px;
        background: linear-gradient(270deg, #36BBF0 0%, #7F66FF 100%);
        border-radius: 15px 15px 15px 15px;
        border: 2px solid #efefef;
        border-radius: 25px;
        font-size: 15px;
        font-family: Arial;
        font-weight: 700;
        color: #fff;
        margin-left: 15px;
        border: none;
      }

      button:nth-child(2) {
        width: 110px;
        height: 43px;
        background: none;
        border-radius: 15px 15px 15px 15px;
        border-radius: 25px;
        font-size: 15px;
        font-family: Arial;
        font-weight: 700;
        color: #fff;
        border: none;
        margin-right: 15px;
      }
    }

    .box-img {
      width: 23px;
      height: 23px;
      position: absolute;
      top: 12px;
      right: 15px;
    }

    .box-bg {
      width: 251px;
      height: 104px;
      background-size: cover;
      margin: 26px auto 0;
      display: flex;
      justify-content: flex-start;
      position: relative;

      .van-image:nth-child(1) {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background: #36BBF0;
        position: absolute;
        top: 15px;
        left: 32px;

        /deep/.van-icon__image {
          width: 100%;
          height: 100%;
        }
      }

      .van-image:nth-child(2) {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background: #36BBF0;
        position: absolute;
        top: 15px;
        left: 92px;

        /deep/.van-icon__image {
          width: 100%;
          height: 100%;
        }
      }

      .van-image:nth-child(3) {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background: #36BBF0;
        position: absolute;
        top: 15px;
        left: 152px;

        /deep/.van-icon__image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
