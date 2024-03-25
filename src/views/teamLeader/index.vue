<template>
  <div class="teamLeader">
    <div class="teamLeader-hear">
      <van-nav-bar
        title="团长中心"
        left-text="返回"
        @click-left="$router.go(-1)"
        @click-right="$router.push({ name:'Officialtutor' })"
      >
        <template #left>
          <van-icon name="arrow-left" size="20" color="#fff" />
        </template>
        <template #right>
          <span style="color: #fff; opacity: 0.8">官方导师</span>
        </template>
      </van-nav-bar>
      <div class="teamLeader-portrait">
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
            class="img"
            v-if="this.Teamleader == 1"
            src="../../assets/leader/v1logo专.png"
            alt
          />
          <img
            class="img"
            v-if="this.Teamleader == 2"
            src="../../assets/leader/v2logo专.png"
            alt
          />
          <img
            class="img"
            v-if="this.Teamleader == 3"
            src="../../assets/leader/v3logo专.png"
            alt
          />
        </p>
        <p>还差2个任务晋升正是团长</p>
      </div>
    </div>
    <!-- 权益 -->
    <div class="interests">
      <figure @click="interests">
        <img src="../../assets/zhuanzhuan/V1_team_double_income@2x.png" alt />
        <figcaption>
          <p>收益加倍</p>
          <p>自购收益提高36%</p>
        </figcaption>
      </figure>
      <figure @click="interests">
        <img src="../../assets/zhuanzhuan/V1_team_data_operation@2x.png" alt />
        <figcaption>
          <p>收益加倍</p>
          <p>精细化数据运营</p>
        </figcaption>
      </figure>
      <figure @click="interests">
        <img src="../../assets/zhuanzhuan/V1_team_group_income@2x.png" alt />
        <figcaption>
          <p>收益加倍</p>
          <p>享额外收益</p>
        </figcaption>
      </figure>
    </div>
    <!-- 任务 -->
    <div class="task">
      <p>
        <span>完成以下任务晋升正式团长</span>
        <img @click="problem" src="../../assets/leader/帮助icon@2x.png" alt />
      </p>
      <figure v-for="(x, i) of tasksInfo" :key="i">
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
    <!-- 我的团员 -->
    <div class="Myleague">
      <p>
        <span>我的团员</span>
        <span @click="$router.push({ name: 'MyLeague' })">
          查看更多
          <img src="../../assets/leader/更多箭头@2x.png" alt />
        </span>
      </p>
      <div>
        <figure>
          {{ info.memberCount }}人
          <figcaption>全部团员</figcaption>
        </figure>
        <figure>
          {{ info.userAffiliateMemberCount }}人
          <figcaption>直属团员</figcaption>
        </figure>
        <figure>
          {{ info.userMemberCount }}人
          <figcaption>加盟团员</figcaption>
        </figure>
      </div>
    </div>
    <!-- 了解米橙 -->
    <div class="understand" @click="understand">
      <p>2分钟了解米橙省购</p>
      <img :src="appLearningInfo.appLearningBannar" alt="" />
      <img class="Playkey" src="../../assets/leader/播放键@2x.png" alt="" />
    </div>
  </div>
</template>
 
<script>
import { invitationPoster, info, center, viewBaseInfo } from "@/api/api.js";
import { getPhoneType } from "@/utils/index.js";
let model = getPhoneType(); //手机类型
import { Dialog } from "vant";
export default {
  data() {
    return {
      health: "",
      myimg: "../../assets/zuixin.png", //默认头像qqqqqqwerwe
      heardimg: false, //默认头像隐藏
      heard: true, //默认头像隐藏
      tasksInfo: [],
      appLearningInfo: [],
      show: false,
      nickName: "",
      shouji: "", //手机号
      nameq: "", //名字
      Teamleader: "", //团员等级
      info: [], //我的团员
    };
  },
  methods: {
    interests() {},
    //点击视频
    understand() {
      this.$router.push({
        name: "video",
        query: {
          appLearningVideo: this.appLearningInfo.appLearningVideo,
        },
      });
    },
    //点击问题
    problem() {},
    //点击去邀请
    button(name) {
      if (name == "去邀请") {
        this.$router.push({ name: "Sharinginvitation" });
      } else if (name == "去查看") {
        this.$router.push({ name: "myProfit" });
      }
    },
  },

  mounted() {
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
      //查看团长等级
      center().then((res) => {
        this.tasksInfo = res.data.data.tasksInfo;
        this.promoteInfo = res.data.data.promoteInfo;
        this.appLearningInfo = res.data.data.appLearningInfo;
        this.Teamleader = res.data.data.userLevelInfo.level;
      });
    //我的团员信息
    info().then((res) => {
      this.info = res.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.teamLeader {
  background: #f0f1f2;
  height: auto;
  .teamLeader-hear {
    position: relative;
    height: 10rem;
    background: #232430;
    .van-nav-bar {
      background: #232430;
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 15;
      ::v-deep .van-nav-bar__title {
        color: #fff;
      }
    }
    .teamLeader-portrait {
      width: 21.9375rem;
      height: 9.5625rem;
      border-radius: 0.5rem;
      background: url("../../assets/leader/V1bg@2x.png") no-repeat
        center/contain;
      position: absolute;
      left: 0.75rem;
      top: 3.5rem;
      z-index: 10;
      p:nth-child(1) {
        display: flex;
        margin: 0.5rem 0.75rem;
        img:nth-child(1) {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
        }
        span {
          color: #813522;
          margin-top: 0.7rem;
          font-size: 0.9375rem;
          margin-left: 0.2rem;
        }
        .img {
          width: 4.375rem;
          height: 1.25rem;
          margin-top: 0.7rem;
        }
      }
      p:nth-child(2) {
        margin: 4rem 0.75rem 0;
        color: #984b39;
        font-size: 0.6875rem;
      }
      .figureimg {
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }
  //   权益
  .interests {
    width: 21.9375rem;
    margin: 4rem 0.75rem 0.5rem;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background: #fff;
    border-radius: 0.5rem;
    padding: 0.75rem 0;
    figure {
      width: 30%;
      text-align: center;
      margin: 0.2rem;
      img {
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 50%;
      }
      p:nth-child(1) {
        font-size: 0.875rem;
      }
      p:nth-child(2) {
        color: #bdbdbd;
        font-size: 0.6875rem;
      }
    }
  }
  // 任务
  .task {
    width: 21.9375rem;
    height: 11.0625rem;
    margin: 0 0.75rem;
    background: #fff;
    p {
      display: flex;
      justify-content: space-between;
      margin: 0 0.75rem;
      padding: 0.5rem 0;
      span {
        font-size: 0.875rem;
      }
      img {
        width: 0.875rem;
        height: 0.875rem;
        vertical-align: middle;
      }
    }
    figure {
      display: flex;
      justify-content: space-between;
      font-size: 0.8125rem;
      margin: 1rem 0.75rem 0;
      figcaption {
        margin-left: -6rem;
        .div {
          display: flex;
          position: relative;
          span:nth-child(1) {
            display: block;
            height: 0.625rem;
            background: red;
            z-index: 10;
            margin-left: 1rem;
            border-radius: 0.3rem;
          }
          span:nth-child(2) {
            display: block;
            width: 50%;
            height: 0.625rem;
            background: #ededed;
            position: absolute;
            top: 0;
            margin-left: 1rem;
            border-radius: 0.3rem;
          }
          span:nth-child(3) {
            position: absolute;
            top: -0.1rem;
            left: 6.2rem;
          }
        }
      }
      img {
        width: 2.25rem;
        height: 2.25rem;
        margin-top: 0.5rem;
      }
      .van-button {
        margin: 0.8rem 0 0;
      }
    }
  }
  //我的团员
  .Myleague {
    width: 21.9375rem;
    height: 7.5rem;
    margin: 0.75rem 0.75rem 0;
    background: #fff;
    p {
      display: flex;
      justify-content: space-between;
      margin: 0 0.75rem;
      padding: 0.5rem 0;
      span {
        font-size: 0.875rem;
      }
      span:nth-child(2) {
        font-size: 0.625rem;
        color: #999;
      }
      img {
        width: 0.875rem;
        height: 0.875rem;
        vertical-align: middle;
      }
    }
    div {
      display: flex;
      justify-content: space-between;
      figure {
        width: 30%;
        height: 40%;
        text-align: center;
        padding: 1.5rem 0 0;
        font-size: 0.9rem;
        figcaption {
          color: #999;
          font-size: 0.75rem;
        }
      }
    }
  }
  //了解米橙
  .understand {
    width: 21.9375rem;
    height: 11.875rem;
    margin: 0.75rem 0.75rem 0;
    background: #fff;
    position: relative;
    p {
      margin: 0 0.75rem;
      padding: 0.5rem 0;
    }
    img {
      width: 20.4375rem;
      height: 8.125rem;
      margin: 0 0.75rem;
      border-radius: 0.5rem;
    }
    .Playkey {
      position: absolute;
      width: 2.5rem;
      height: 2.5rem;
      top: 45%;
      left: 40%;
      z-index: 100;
    }
  }
  ::v-deep.van-dialog {
    .van-hairline--top {
      .van-button {
        border-radius: 50px;
        background: red;
        border: solid 1px;
      }
    }
  }
  // 遮罩层
  .van-overlay {
    z-index: 100;
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .block {
        width: 100%;
        height: 100%;
        background-color: #fff;
        video {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>    