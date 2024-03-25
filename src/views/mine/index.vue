<template>
  <div id="mine" :class="isad?'animation-fade':''">
    <van-nav-bar title="个人信息" @click-left="personal">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
    </van-nav-bar>
    <van-cell is-link @click="show1 = true">
      <template #title>
        <span class="custom-title">头像</span>
      </template>
      <template #default>
        <van-uploader :after-read="getImg" result-type="dataUrl" preview-size="40px">
          <img :src="myimg" alt class="head" />
        </van-uploader>
      </template>
    </van-cell>
    <van-cell is-link @click="name">
      <template #title>
        <span class="custom-title">昵称</span>
      </template>
      <template #default>
        <span class="custom-title">{{nicheng?nicheng:'编辑昵称'}}</span>
      </template>
    </van-cell>
    <van-cell is-link title="性别" @click="show = true">
      <template #default>
        <span class="custom-title">{{sxe?sxe:''}}</span>
      </template>
    </van-cell>
    <van-cell is-link title="生日" @click="currentDatess = true">
      <template #default>
        <span class="custom-title">{{birthday | getTimems }}</span>
      </template>
    </van-cell>
    <van-cell is-link title="地区" @click="regionss = true">
      <template #default>
        <span class="custom-title">{{region}}</span>
      </template>
    </van-cell>
    <!-- 性别 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="sex"
    />
    <!-- 生日 -->
    <van-popup
      v-model="currentDatess"
      @click-overlay="clickOverlay"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :columns-order="['year', 'day  ', 'month']"
        :formatter="formatter"
        @confirm="confirms"
        @change="onchanges"
        @cancel="onCancels"
        :min-date="minDate"
        :max-date="maxDate"
        ref="mybirthday"
      />
    </van-popup>
    <!-- 地区 -->
    <van-popup v-model="regionss" position="bottom" :style="{ height: '30%' }">
      <van-area
        v-model="region"
        :area-list="areaList"
        :columns-num="2"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
        ref="myArea"
      />
    </van-popup>
    <van-cell is-link @click="binding">
      <template #title>
        <span class="custom-title">支付宝账号</span>
      </template>
      <template #default>
        <span class="custom-title">
          <p>{{erds?erds:''}}</p>
        </span>
      </template>
    </van-cell>
    <van-cell is-link>
      <template #title>
        <span class="custom-title">手机号</span>
      </template>
      <template #default>
        <span class="custom-title">{{shouji}}</span>
      </template>
    </van-cell>
    <!-- 空 p -->
    <p></p>
  </div>
</template>

<script>
//引入
import { Toast } from "vant";
import {
  changeHeadIcon2,
  changeBaseInfo,
  viewBaseInfo,
  getBindPayInfo,
} from "@/api/api.js";
import areaList from "../mine/js";
import { getPhoneType } from "@/utils/index.js";
//本地信息
let ob = JSON.parse(localStorage.getItem("jd-webapp")); //用户
let obo = JSON.parse(localStorage.getItem("zf-webapp")); //支付宝
//图片转base64
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "mine",
  data() {
    return {
      nicheng: "", //昵称
      sxe: "" || "女", //男女
      shouji: "", //手机号
      birthday: "", //生日
      region: "", //地区
      index: "", //性别下标
      myimg: "",
      erds: "未绑定", //支付宝
      currentDatess: false, //生日隐藏
      regionss: false, //地区隐藏
      show: false,
      show1: false,
      actions: [
        { name: "女", index: 0 },
        { name: "男", index: 1 },
      ],
      areaList,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(),
      img: require("../../assets/补icon/set_moren@3x.png"),
      isad: false, //动画
    };
  },
  created() {
    this.isad = true;
    let model = getPhoneType();
    //隐藏中间4位
    this.shouji = `${ob && ob.username.substr(0, 3)}****${
      ob && ob.username.substr(7)
    }`;
    //查询个人信息
    viewBaseInfo({
      token: this.$store.state.token && this.$store.state.token,
      network: 0,
      apiVersion: "v4.0",
      system: "4",
      model: model,
      uid: "f86ba805761b4624b58c3ece03414fce",
      platformType: "4",
      device: "0",
      idfa: "00000000-0000-0000-0000-000000000000",
      operator: 0,
    })
      .then((res) => {
        //名称
        if (res.data.data.nickName == "") {
          this.nameq = "编辑名称";
        } else {
          this.nicheng = res.data.data.nickName;
        }
        //性别
        if (res.data.data.sex == 1) {
          this.sxe = "男";
        } else if (res.data.data.sex == 0) {
          this.sxe = "女";
        }
        //头像
        if (res.data.data.headPicUrl == "") {
          this.myimg = this.img;
        } else {
          this.myimg = res.data.data.headPicUrl;
        }
        //生日
        if (res.data.data.birthday == "") {
          this.birthday = "";
        } else {
          this.birthday = res.data.data.birthday;
        }
        //地区
        if (res.data.data.area == "") {
          this.region = "未设置";
        } else {
          this.region = res.data.data.area;
        }
      })
      .catch((err) => {});
    //查询支付宝绑定信息
    if (obo == null) {
      this.erds = "未绑定";
    } else {
      this.erds = this.$store.state.zhanghao;
    }
  },
  methods: {
    // 获取图片
    getImg(file, detail) {
      let base = file.content.substring(file.content.indexOf(",") + 1);
      changeHeadIcon2({
        iconBase64: base,
        token: ob.token,
        userId: ob.userId,
      }).then((res) => {
        this.myimg = res.data.data.headPicUrl;
        Toast("修改成功");
      });
    },
    // 改变信息
    name() {
      this.$router.push({
        path: "/name",
        query: {
          name: this.nicheng,
        },
      });
    },
    //修改个人信息
    personal() {
      changeBaseInfo({
        nickName: this.nicheng,
        sex: this.index,
        token: ob.token,
      }).then((res) => {
        this.$router.push({ name: "may" });
      });
    },

    //男女
    sex(value) {
      this.sxe = value.name;
      this.index = value.index;
      changeBaseInfo({
        sex: value.index,
        token: ob.token,
      }).then((res) => {
        if (res.data.code == 0) {
          Toast("修改成功");
        } else {
          Toast("修改失败");
        }
      });
    },
    //生日
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
    //生日确认选中框
    confirms(value) {
      let birthdayDates = value.getTime();
      changeBaseInfo({
        birthday: birthdayDates,
        token: ob.token,
      }).then((res) => {
        if (res.data.code == 0) {
          this.currentDate = res.data.data.birthday;
          //查询个人信息
          let model = getPhoneType();
          viewBaseInfo({
            token: this.$store.state.token && this.$store.state.token,
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
            //生日
            if (res.data.data.birthday == "") {
              this.birthday = "";
            } else {
              this.birthday = res.data.data.birthday;
            }
          });
          Toast("修改成功");
        } else {
          Toast("修改失败");
        }
      });
      this.currentDatess = false;
    },
    clickOverlay() {},
    onchanges(picker, index, value) {
      let val = picker.getValues();
    },
    // 取消选中生日
    onCancels() {
      this.currentDatess = false;
    },
    //地区
    //value=0改变省，1改变市，2改变区
    onChange(picker, index, value) {
      let val = picker.getValues();
      let areaName = "";
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i == 0 ? "" : "/") + val[i].name;
      }
      this.carmodel = areaName;
    },
    //确定选择城市
    onConfirm(val) {
      this.region = val[0].name + " " + val[1].name;
      changeBaseInfo({
        area: val[0].name + " " + val[1].name,
        token: ob.token,
      }).then((res) => {
        if (res.data.code == 0) {
          Toast("修改成功");
        } else {
          Toast("修改失败");
        }
      });
      this.regionss = false; //关闭弹框
    },
    //取消选中城市
    onCancel() {
      this.regionss = false;
      this.$refs.myArea.reset(); // 重置城市列表
    },
    binding() {
      //判断支付宝
      if (this.erds == "未绑定") {
        this.$router.push({ name: "zhifubao" });
      } else {
        this.$router.push({ name: "modify" });
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
    },
  },
};
</script>

<style lang="scss" scoped>
#mine {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  .van-cell {
    display: flex;
    align-items: center;
    .van-cell__value {
      .van-uploader {
        ::v-deep .van-uploader__wrapper {
          .van-uploader__input-wrapper {
            img {
              display: block;
              width: 2.7rem;
              border-radius: 50%;
              height: 2.7rem;
            }
          }
        }
      }
    }
  }
  ::v-deep .van-cell__value--alone {
    text-align: center;
    ::v-deep .van-uploader {
      background: white;
      color: black;
    }
  }
  .van-cell:nth-child(7) {
    margin-top: 0.5rem;
  }
  .animation-fade {
    animation-name: fade;
    animation-duration: 1s;
    animation-timing-function: linear;
  }
  @keyframes fade {
    0% {
      right: 0;
      transform: translateX(100%);
    }
    25% {
      right: 100px;
      transform: translateX(50px);
    }
    50% {
      right: 100px;
      transform: translateX(50px);
    }
    75% {
      right: 100px;
      transform: translateX(100px);
    }
    100% {
      right: 100px;
      transform: translateX(100px);
    }
  }
}
</style>