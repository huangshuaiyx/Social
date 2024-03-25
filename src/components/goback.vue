<template>
  <div id="box">
    <div class="box-top">
      <img src="../assets/close.png" class="closeImg" alt="" @click="withdraw" />
      <div class="box-text">
        <p>Make video chat with friends worldwide!</p>
      </div>

      <div class="container">
        <div class="slider">
          <!-- <div class="box1">
            <img :src="faces[0].faceUrl != '' ? faces[0].faceUrl : require('../assets/public/defaultavatar.png')"
              alt="" />
          </div> -->
          <div class="box1">
            <img :src="faces[0].faceUrl != '' ? faces[0].faceUrl : require('../assets/public/defaultavatar.png')"
              alt="" />
          </div>
          <div class="box2">
            <img :src="faces[1].faceUrl != '' ? faces[1].faceUrl : require('../assets/public/defaultavatar.png')"
              alt="" />
          </div>
          <div class="box3">
            <img :src="faces[2].faceUrl != '' ? faces[2].faceUrl : require('../assets/public/defaultavatar.png')"
              alt="" />
          </div>
          <div class="box4">
            <img :src="faces[3].faceUrl != '' ? faces[3].faceUrl : require('../assets/public/defaultavatar.png')"
              alt="" />
          </div>
          <div class="box5">
            <img :src="faces[4].faceUrl != '' ? faces[4].faceUrl : require('../assets/public/defaultavatar.png')"
              alt="" />
          </div>
          <!-- <div class="box7">
            <img :src="faces[6].faceUrl != '' ? faces[6].faceUrl : require('../assets/public/defaultavatar.png')"
              alt="" />
          </div> -->
        </div>
      </div>
      <div class="box-button">
        <button @click="withdraw">Contiune top up</button>
        <div class="blacklistdiv-button" @click="cancel">
          <div class="main_in">Go back</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script  src="../utils/js/script.js"></script>

<script>
import { close } from "../api/inedx";
import { getQueryString } from "../utils/index";
import { closeNative, networkRequest } from "../api/inedx";
export default {
  data() {
    return {
      faces: [{ faceUrl: "" },{ faceUrl: "" },{ faceUrl: "" },{ faceUrl: "" },{ faceUrl: "" },{ faceUrl: "" },{ faceUrl: "" }],
      randomNumbers: [],
    };
  },
  mounted() {
    this.obtainavata();
    setInterval(() => {
      this.rotate();
    }, 2000);

    // function getRandomNumbers() {
    //   var numbers = [];
    //   while (numbers.length < 7) {
    //     var randomNumber = Math.floor(Math.random() * this.faces.length) + 1;
    //     if (!numbers.includes(randomNumber)) {
    //       numbers.push(randomNumber);
    //     }
    //   }
    //   return numbers;
    // }
    // this.randomNumbers = getRandomNumbers();
    // // console.log(this.randomNumbers)
    //       let rand = this.getRand();
    //       while (rand.length < 7) {
    //         rand.push({ faceUrl: "" });
    //       }
    //       this.faces = rand
    // console.log(faces[6].faceUrl,'asdasd')

  },
  methods: {
    getRand() {
            while (this.faces.length < 7) {
              this.faces.push({ faceUrl: "" });
            }
            return this.faces;
          },
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
        pageCode: "P1204000",
        size: 50,
      }).then((res) => {
        if (res.code == 200) {
        let art = res.data
          function getRandomNumbers() {
            while (art.length < 7) {
              art.push({ faceUrl: "" });
            }
            return art;
          }
          this.faces = getRandomNumbers()
        }

      });
    },
    rotate() {
      let lastChild = $(".slider div:last-child").clone();
      /*$('#test').html(lastChild)*/
      $(".slider div").removeClass("firstSlide");
      $(".slider div:last-child").remove();
      $(".slider").prepend(lastChild);
      $(lastChild).addClass("firstSlide");
    },
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
    height: 350px;
    background: linear-gradient(135deg, #E233FA 0%, #5137FC 49%, #34D0FF 100%);

    background-size: cover;
    border-radius: 25px;
    z-index: 100;
    position: relative;
    overflow: hidden;

    .closeImg {
      width: 23px;
      height: 23px;
      position: absolute;
      top: 12px;
      right: 15px;
    }

    .box-text {
      width: 237px;
      height: 17px;
      font-size: 16px;
      font-family: "Arial-Bold, Arial";
      font-weight: 700;
      color: #fff;
      line-height: 20px;
      text-align: center;
      margin-top: 38px;
      margin-left: 50%;
      transform: translateX(-50%);
    }

    .box-button {
      width: 100%;
      height: auto;
      overflow: hidden;

      button:nth-child(1) {
        width: 240px;
        height: 43px;
        background: #222;
        border-radius: 25px;
        font-size: 15px;
        font-family: Arial;
        font-weight: 700;
        color: #fff;
        margin-left: 50%;
        transform: translateX(-50%);
        border: none;
        margin-top: 15px;
      }

      .blacklistdiv-button {
        width: 240px;
        height: 43px;
        box-sizing: border-box;
        padding: 2px;
        border-radius: 25px;
        line-height: 29px;
        text-align: center;
        font-size: 12px;
        color: #222222;
        margin-left: 50%;
        transform: translateX(-50%);
        border: 2px solid rgba(255,255,255,0.5);
        margin-top: 15px;



        .main_in {
          width: 100%;
          height: 100%;
          border-radius: 25px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 40px;
        }
      }
    }
  }

  .container {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }

  .slider {
    height: 110px;
    width: 100%;
    display: flex;
    perspective: 1000px;
    position: relative;
    align-items: center;
    // left: 50%;
    // transform: translateX(-48%);
  }

  .box1 {
    background: url("../assets/public/defaultavatar.png") no-repeat;
    background-size: cover;
    background-position: center center;

    img {
      width: 80px;
      height: 80px;
    }

    .van-image {
      width: 80px;
      height: 80px;
    }
  }

  .box2 {
    background: url("../assets/public/defaultavatar.png") no-repeat;
    background-size: cover;
    background-position: center center;

    img {
      width: 80px;
      height: 80px;
    }

    .van-image {
      width: 80px;
      height: 80px;
    }
  }

  .box3 {
    background: url("../assets/public/defaultavatar.png") no-repeat;
    background-size: cover;
    background-position: center center;

    img {
      width: 80px;
      height: 80px;
    }

    .van-image {
      width: 80px;
      height: 80px;
    }
  }

  .box4 {
    background: url("../assets/public/defaultavatar.png") no-repeat;
    background-size: cover;
    background-position: center center;

    img {
      width: 80px;
      height: 80px;
    }

    .van-image {
      width: 80px;
      height: 80px;
    }
  }

  .box5 {
    background: url("../assets/public/defaultavatar.png") no-repeat;
    background-size: cover;
    background-position: center center;

    img {
      width: 80px;
      height: 80px;
    }

    .van-image {
      width: 80px;
      height: 80px;
    }
  }

  .box6 {
    background: url("../assets/public/defaultavatar.png") no-repeat;
    background-size: cover;
    background-position: center center;

    img {
      width: 80px;
      height: 80px;
    }

    .van-image {
      width: 80px;
      height: 80px;
    }
  }

  .box7 {
    background: url("../assets/public/defaultavatar.png") no-repeat;
    background-size: cover;
    background-position: center center;

    img {
      width: 80px;
      height: 80px;
    }

    .van-image {
      width: 80px;
      height: 80px;
    }
  }

  .slider [class*="box"] {
    overflow: hidden;
    border-radius: 20px;
    transition: all 1.5s cubic-bezier(0.5, 0.5, 0.4, 0.5);
    position: absolute;
  }

  .slider [class*="box"]:nth-child(5),
  .slider [class*="box"]:nth-child(1) {
    width: 80px;
    height: 80px;
    transform: scale(0.6) translate(-50%, -50%);
    top: 30%;
    z-index: 1;
    border-radius: 50%;
    border: solid 2px #fff;
  }

  .slider [class*="box"]:nth-child(2),
  .slider [class*="box"]:nth-child(4) {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transform: scale(0.8) translate(-50%, -50%);
    top: 35%;
    z-index: 2;
    border: solid 2px #fff;
  }

  .slider [class*="box"]:nth-child(3) {
    width: 80px;
    height: 80px;
    color: #fff;
    transform: scale(1) translate(-50%, -50%);
    top: 45%;
    z-index: 4;
    border-radius: 50%;
    border: solid 2px #fff;
  }

  .slider [class*="box"]:nth-child(1) {
    left: 7%;
  }

  .slider [class*="box"]:nth-child(2) {
    left: 27%;
  }

  .slider [class*="box"]:nth-child(3) {
    left: 50%;
  }

  .slider [class*="box"]:nth-child(4) {
    left: 69%;
  }

  .slider [class*="box"]:nth-child(5) {
    left: 80%;
  }

  .slider [class*="box"]:nth-child(6) {
    left: 80%;
  }

  .slider [class*="box"]:nth-child(7) {
    left: 85%;
  }

  .slider .firstSlide {
    /* -webkit-animation:  firstChild 1s; */
    // animation: firstChild 1s;
  }

  /*Animation for buyers landing page slider*/
  @-webkit-keyframes firstChild {
    0% {
      left: 100%;
      transform: scale(0.2) translate(-50%, -50%);
    }

    100% {
      left: -13%;
      transform: scale(0.2) translate(-50%, -50%);
    }
  }

  @keyframes firstChild {
    0% {
      left: 100%;
      transform: scale(0.2) translate(-50%, -50%);
    }

    100% {
      left: -13%;
      transform: scale(0.2) translate(-50%, -50%);
    }
  }
}
</style>
