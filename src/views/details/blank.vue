<template>
  <div class="blank">
    <van-nav-bar title="创建分享" @click-left="$router.go(-1)">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
    </van-nav-bar>
    <!-- 图片 -->
    <div class="img">
      <p>二维码素材</p>
      <div class="div">
        <div v-for="(x,i) of this.imgArr" :key="i">
          <viewer>
            <img :src="x" alt @click="clickiMG(x,i)" />
          </viewer>
          <van-radio-group v-model="radio" checked-color="red" @change="clickRadio">
            <van-radio :name="i"></van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
    <!-- 文案 -->
    <div class="copywriting">
      <p>
        <span>分享文案</span>
        <button class="tag-read" :data-clipboard-text="shareList" @click="copys">复制</button>
      </p>
      <div v-html="shareList"></div>
      <p v-if="this.tpwd != ''">{{this.tpwd}}</p>
    </div>
    <!-- 分享 -->
    <div class="share">
      <div @click="show = true">
        <img src="../../assets/share/复制文案@2x.png" alt />
        <p>预览海报</p>
      </div>
      <div>
        <img src="../../assets/share/微信登录@2x.png" alt />
        <p>微信</p>
      </div>
      <div>
        <img src="../../assets/share/朋友圈@2x.png" alt />
        <p>朋友圈</p>
      </div>

      <div @click="preservation">
        <img src="../../assets/share/保存图片@2x.png" alt />
        <p>保存海报</p>
      </div>
    </div>

    <!-- 二维码推广图 -->
    <van-overlay :show="show">
      <div class="wrapper" @click="show = false">
        <div class="block">
          <div>
            <span class="omit">
              <!-- 淘宝图标 -->
              <img
                class="icon"
                v-if="this.$route.query.dataSource == '2' && this.$route.query.userType != '1'"
                src="../../assets/png_taobao@2x.png"
                alt
              />
              <!-- 拼多多图标 -->
              <img
                class="icon"
                v-if="this.$route.query.dataSource == '1'"
                src="../../assets/png_pinduoduo@2x.png"
                alt
              />
              <!-- 京东图标 -->
              <img
                class="icon"
                v-if="this.$route.query.dataSource == '3'"
                src="../../assets/png_jingdong@2x.png"
                alt
              />
              <!-- 天猫图标 -->
              <img
                class="icon"
                v-if="this.$route.query.dataSource == '2' && this.$route.query.userType == '1'"
                src="../../assets/png_tianmao@2x.png"
                alt
              />
              {{ this.$route.query.goodsName }}
            </span>
            <div class="Price">
              <div>
                <span style="color:#FE0C05;font-size:15px">¥</span>
                <span>
                  {{(
                  Number(this.$route.query.originalPrice)-Number(this.$route.query.couponDiscount)-Number(this.$route.query.returnMoney)).toFixed(2)}}
                </span>
                <s>¥{{this.$route.query.originalPrice}}</s>
              </div>
              <p v-if="this.$route.query.couponDiscount?this.$route.query.couponDiscount:''">
                <span>¥</span>
                <span>{{this.$route.query.couponDiscount}}</span>
              </p>
            </div>
            <img class="img" :src="this.browse" alt />
          </div>
          <div class="logoErweima">
            <img src="../../assets/share/LOGO@2x.png" alt />
            <div id="qrCode" ref="qrCodeDiv"></div>
          </div>
        </div>
      </div>
    </van-overlay>
    <div class="blocks" ref="capture">
      <div>
        <span class="omit">
          <!-- 淘宝图标 -->
          <img
            class="icon"
            v-if="this.$route.query.dataSource == '2' && this.$route.query.userType != '1'"
            src="../../assets/png_taobao@2x.png"
            alt
          />
          <!-- 拼多多图标 -->
          <img
            class="icon"
            v-if="this.$route.query.dataSource == '1'"
            src="../../assets/png_pinduoduo@2x.png"
            alt
          />
          <!-- 京东图标 -->
          <img
            class="icon"
            v-if="this.$route.query.dataSource == '3'"
            src="../../assets/png_jingdong@2x.png"
            alt
          />
          <!-- 天猫图标 -->
          <img
            class="icon"
            v-if="this.$route.query.dataSource == '2' && this.$route.query.userType == '1'"
            src="../../assets/png_tianmao@2x.png"
            alt
          />
          {{ this.$route.query.goodsName }}
        </span>
        <div class="Price">
          <div>
            <span style="color:#FE0C05;font-size:15px">¥</span>
            <span>
              {{(
              Number(this.$route.query.originalPrice)-Number(this.$route.query.couponDiscount)-Number(this.$route.query.returnMoney)).toFixed(2)}}
            </span>
            <s>¥{{this.$route.query.originalPrice}}</s>
          </div>
          <p v-if="this.$route.query.couponDiscount?this.$route.query.couponDiscount:''">
            <span>¥</span>
            <span>{{this.$route.query.couponDiscount}}</span>
          </p>
        </div>
        <img class="img" :src="this.browse" alt />
      </div>
      <div class="logoErweima">
        <img src="../../assets/share/LOGO@2x.png" alt />
        <div id="qrCode" ref="qrCodeDivsd"></div>
      </div>
    </div>
    <!-- <img :src="img" alt=""> --> 
  </div>
</template>
 
<script>
import Clipboard from "clipboard"; //点击复制
import { Toast } from "vant";
import { shareGoods } from "@/api/api.js";
import QRCode from "qrcodejs2"; //生成二维码
import html2canvas from "html2canvas"; //生成图片
import axios from "axios";
import { ImagePreview } from "vant"; //图片预览

export default {
  //组件注册
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      imgArr: [],
      shareList: "",
      show: false,
      radio: "1",
      browse: "", //海报图
      tpwd: "", //淘宝..天猫 链接
      img:''
    };
  },
  mounted() {
    localStorage.setItem("objShare", this.$route.query.obj);
    this.imgArr = this.$route.query.rotationList;
    shareGoods(this.$route.query).then((res) => {
      let art = res.data.data.goodsInfo;
      this.shareList = art.replace(/\n/g, "<br/>");
      this.tpwd = res.data.data.tpwd; //淘宝天猫
      //生成二维码
      new QRCode(this.$refs.qrCodeDiv, {
        text: res.data.data.url,
        width: 80,
        height: 80,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      });
      //生成二维码
      new QRCode(this.$refs.qrCodeDivsd, {
        text: res.data.data.url,
        width: 80,
        height: 80,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      });
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
    //单选框
    clickRadio(name) {
      let art = this.imgArr;
      art.forEach((x, i) => {
        if (name == i) {
          this.browse = x;
        }
      });
    },
    //保存海报
    preservation() {
      html2canvas(this.$refs.capture, { useCORS: true }).then((canvas) => {
        // this.$refs.addImage.append(canvas) // 这个我没有加，看其他的文章有，但是我加上会有其他的问题，就取消了
        let link = document.createElement("a"); // 创建a标签
        link.href = canvas.toDataURL(); // 是canvas对象的一种方法，用于将canvas对象转换为base64位编码
        link.setAttribute("download", "图片canvas.png"); // 利用了a标签的download 来下载 canvas图片
        link.style.display = "none"; //将图片隐藏起来
        document.body.appendChild(link); //插入到其中
        link.click();
        this.img = link.href
      });
    },
    //点击图片预览
    clickiMG(x, i) {
      ImagePreview({
        images: this.$route.query.rotationList,
        startPosition: i,
        closeable: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.blank {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  // box-sizing: border-box;
  .img {
    width: 100%;
    padding: 0.5rem 0;
    background: white;
    overflow: hidden;
    p {
      margin: 0 1rem;
      font-size: 15px;
      color: #333333;
    }
    .div {
      width: 100%;
      height: auto;
      display: flex;
      overflow: auto;
      div {
        img {
          width: 5rem;
          height: 5rem;
          padding: 0.75rem 0.75rem 0;
        }
        .van-radio-group {
          position: relative;
          top: -5rem;
          left: 4.2rem;
        }
      }
    }
    //去除overflow滚动条
    .div::-webkit-scrollbar {
      display: none;
    }
  }
  //文案
  .copywriting {
    width: 100%;
    height: auto;
    padding: 0.75rem 0.75rem 1rem;
    background: #fff;
    box-sizing: border-box;
    font-size: 12px;
    color: #555555;
    p:nth-child(1) {
      font-size: 15px;
      color: #333333;
      margin: 0.5rem 0;
      display: flex;
      justify-content: space-between;
    }
    button {
      width: 3.75rem;
      height: 1.375rem;
      border: solid 0.5px #fe0c05;
      background: #fff;
      font-size: 0.6875rem;
      border-radius: 0.6875rem;
      color: #fe0c05;
      opacity: 0.85;
    }
    p:nth-child(2) {
      font-size: 12px;
      color: #555555;
      margin: 1.4375rem 0 0.3rem;
      height: 5rem;
      width: 100%;
      border: solid 1px;
    }
    .contentBox,
    .contentBox p {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }
  }
  //f分享
  .share {
    width: 100%;
    height: auto;
    padding: 1rem 0;
    display: flex;
    justify-content: space-around;
    text-align: center;
    position: absolute;
    bottom: 0;
    background: #f6f6f6;
    font-size: 12px;
    color: #333333;
    img {
      width: 2.75rem;
      height: 2.75rem;
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      width: 85%;
      height: auto;
      background-color: #fff;
      padding: 0.75rem;
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
        .icon {
          width: 0.88rem;
          height: 0.88rem;
          vertical-align: middle;
        }
      }
      .Price {
        display: flex;
        justify-content: space-between;
        margin: 0.5rem 0;
        div {
          span {
            color: #fe0c05;
            font-size: 1.5rem;
          }
          s {
            font-size: 0.9375rem;
            color: #999;
          }
        }
        p {
          width: 7.625rem;
          height: 2.125rem;
          background: url("../../assets/share/png_bg_quan2@2x.png") no-repeat
            center/100%;
          line-height: 2rem;
          color: #fff;
          span:nth-child(1) {
            margin-left: 1.6rem;
            font-size: 0.625rem;
            margin-right: 0.1rem;
          }
        }
        .img {
          width: 21.9375rem;
          height: 21.9375rem;
        }
      }
      .logoErweima {
        display: flex;
        justify-content: space-between;
        img {
          width: 9.5rem;
          height: 2.8rem;
          margin: auto 0;
        }
        div {
          width: 5.625rem;
          height: 5.625rem;
          background: url("../../assets/share/二维码框@2x.png") no-repeat
            center/100%;
          padding-left: 0.65rem;
          padding-top: 0.65rem;
        }
      }
    }
  }
  .blocks {
    width: 85%;
    height: auto;
    background-color: #fff;
    padding: 0.75rem;
    position: fixed;
    top: -100rem;
    div {
      .omit {
        .icon {
          width: 0.88rem;
          height: 0.88rem;
          vertical-align: middle;
        }
      }
      .Price {
        display: flex;
        justify-content: space-between;
        margin: 0.5rem 0;
        div {
          span {
            color: #fe0c05;
            font-size: 1.5rem;
          }
          s {
            font-size: 0.9375rem;
            color: #999;
          }
        }
        p {
          width: 7.625rem;
          height: 2.125rem;
          background: url("../../assets/share/png_bg_quan2@2x.png") no-repeat
            center/100%;
          line-height: 2rem;
          color: #fff;
          span:nth-child(1) {
            margin-left: 1.6rem;
            font-size: 0.625rem;
            margin-right: 0.1rem;
          }
        }
        .img {
          width: 21.9375rem;
          height: 21.9375rem;
        }
      }
    }
    .logoErweima {
      display: flex;
      justify-content: space-between;
      img {
        width: 9.5rem;
        height: 2.8rem;
        margin: auto 0;
      }
      div {
        width: 5.625rem;
        height: 5.625rem;
        background: url("../../assets/share/二维码框@2x.png") no-repeat
          center/100%;
        padding-left: 0.65rem;
        padding-top: 0.65rem;
      }
    }
  }
}
</style>