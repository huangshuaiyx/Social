<template>
  <div class="may">
    <!-- 头像 -->
    <div class="heard">
      <figure class="figure">
        <div>
          <img
            @click="$router.push({ path: '/mine' })"
            :src="myimg"
            class="figureimg"
            alt
            v-show="heard"
          />
          <img
            v-show="heardimg"
            @click="heardim"
            class="figureimg"
            src="../../assets/WechatIMG5@2x.png"
            alt
          />
        </div>

        <figcaption>
          <p style="font-size: 1.06rem; margintop: 1.5rem">
            <span @click="heardname">{{ nameq }}</span>
            <img
              @click="$router.push({ name: 'teamLeader' })"
              v-if="this.Teamleader == 1"
              src="../../assets/leader/v1logo专.png"
              alt
            />
            <img
              @click="$router.push({ name: 'teamLeader' })"
              v-if="this.Teamleader == 2"
            src="../../assets/leader/v2logo专.png"
              alt
            />
            <img
              @click="$router.push({ name: 'teamLeader' })"
              v-if="this.Teamleader == 3"
             src="../../assets/leader/v3logo专.png"
              alt
            />
          </p>
          <p class="wer">
            <span style="color: #333" v-if="this.$store.state.token != ''">
             
              的风格
            </span>
            <span style="color: #333" v-else @click="heardim">
              <span style="font-size: 0.85rem; opacity: 0.8">
                <a>登录米橙省购，省钱享返利！</a>
              </span>
            </span>
          </p>
        </figcaption>
         <img
          class="mayImgs"
          @click="xiaoxi"
          src="../../assets/消息黑icon@2x.png"
          alt
        />
        <img
          class="mayImg"
          @click="$router.push({ name: 'setup' })"
          src="../../assets/设置新icon@2x.png"
          alt
        />
       
        <div v-if="unReadCount != ''" class="num">{{ this.unReadCount }}</div>
      </figure>
      <div class="leader" @click="leader">
        <p>
          <span v-if="this.Teamleader == 2">升级到高级团长收益可加倍</span>
          <span v-if="this.Teamleader == 1 || this.Teamleader == 0">升级到正式团长(综合收益提升42%)</span>
        </p>
        <p>
          <img src="../../assets/个人中心-前进@2x.png" alt />
        </p>
      </div>
    </div>
    <!-- 累计收益 -->
    <div class="income">
      <div class="incomeShow">
        <p>我的收益</p>
        <p>
          <img src="../../assets/我的收益箭头@2x.png" alt />
        </p>
      </div>
      <div class="money">
        <div>
          <ul @click="profit(0)">
            <li>今日预估</li>
            <li class="moneyli">
              {{ revenue.today ? revenue.today : "0.00" }}
            </li>
          </ul>
        </div>
        <div>
          <ul @click="profit(1)">
            <li>昨日预估</li>
            <li class="moneyli">
              {{ revenue.yesterday ? revenue.yesterday : "0.00" }}
            </li>
          </ul>
        </div>
        <div>
          <ul @click="profit(2)">
            <li>本月预估</li>
            <li class="moneyli">
              {{ revenue.thisMonth ? revenue.thisMonth : "0.00" }}
            </li>
          </ul>
        </div>
        <div>
          <ul @click="profit(2)">
            <li>上月预估</li>
            <li class="moneyli">
              {{ revenue.lastMonth ? revenue.lastMonth : "0.00" }}
            </li>
          </ul>
        </div>
      </div> 
      <div class="title">
        <div class="tixian">
          <span style="font-size: 14px; opacity: 0.7">可提现金额</span>
          <span style="font-size: 20px">{{
            revenue.balance ? revenue.balance : "0.00"
          }}</span>
        </div>
        <div class="button" @click="Immediate">立即提现</div>
      </div>
    </div>
    <!--我的订单 -->
    <div class="order_box">
      <p class="title">我的订单</p>
      <div class="order">
       
        <p @click="userorder('soon')">
          <span icon="cart-o">
            <div class="iocnred" v-if="receive">{{ paid }}</div>
            <img src="../../assets/已支付.png" alt />
          </span>
          <br />
          <span style="color: #666">已支付</span>
        </p>
        <p @click="userorder('already')">
          <span>
            <div class="iocngreen" v-if="receiv">{{ receivedgoods }}</div>
            <img src="../../assets/已收货.png" alt />
          </span>
          <br />
          <span style="color: #666">已收货</span>
        </p>
        <p @click="userorder('invalid')">
          <span>
            <img src="../../assets/已失效.png" alt />
          </span>
          <br />
          <span style="color: #666">已失效</span>
        </p>
         <p @click="userorder('all')">
          <span>
            <img src="../../assets/全部订单.png" alt />
          </span>
          <br />
          <span style="color: #666">全部订单</span>
        </p>
      </div>
    </div>
    <!-- 常用工具 -->
    <div class="tool">
      <p>常用工具</p>
      <div>
        <figure @click="collection">
          <img src="../../assets/我的收藏.png" alt />
          <figcaption>我的收藏</figcaption>
        </figure>
        <figure @click="$router.push({ name: 'signin' })">
          <img src="../../assets/签到有礼.png" alt />
          <figcaption>签到有礼</figcaption>
        </figure>
        <figure @click="$router.push({ name: 'feedback' })">
          <img src="../../assets/意见反馈.png" alt />
          <figcaption>意见反馈</figcaption>
        </figure>
        <figure @click="$router.push({name:'Customerservicecenter'})">
          <img src="../../assets/客服中心.png" alt />
          <figcaption>客服中心</figcaption>
        </figure>
        <figure>
          <img src="../../assets/邀请好友.png" alt />
          <figcaption>邀请好友</figcaption>
        </figure>
      </div>
    </div>

    <!-- 淘宝授权 -->
    <authorization v-if="show" :show="show" @changeShow="(v) => (show = v)" />
    <!-- 前往购买 -->
    <purchase
      v-if="show1"
      :show="show1"
      @changeShow="(v) => (show1 = v)"
      :returnMoney="returnMoney"
      :shareUrl="shareUrl"
      :imgType="imgType"
    />
  </div>
</template>

<script>
let information = JSON.parse(localStorage.getItem("jd-webapp"));
import { getPhoneType } from "@/utils/index.js";
import {
  viewBaseInfo, //查看用户信息
  getUserOrderPrice, //查看用户金额
  getBindPayInfo, //绑定支付宝信息
  userOrder, //查看订单
  getTotalPriceDetail, //新用户
  newsUnReadCount, //查询未读数量
  total, //本月,上月预估
  center, //查看是否是团长
} from "@/api/api.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      unReadCount: "",
      nameq: "",
      nameww: "",
      myimg: "../../assets/WechatIMG5@2x.png", //默认头像qqqqqqwerwe
      zhifubao: false,
      zhifubaoXX: false, //支付宝是否显示
      heardimg: false, //默认头像隐藏
      heard: true, //默认头像隐藏
      revenue: [],
      page: 0, //请求页数
      list: [],
      loading: false,
      finished: false,
      show1: false,
      shareUrl: "",
      returnMoney: 0,
      imgType: "",
      // 绑定淘宝相关
      show: false,
      token: this.$store.state.token && this.$store.state.token,
      // 已支付表单数据
      formData: {
        timestamp: 0,
        dataSource: 0,
        orderStatus: 3,
      },
      // 已收货表单数据
      formdata: {
        timestamp: 0,
        dataSource: 0,
        orderStatus: 1,
      },
      paid: "", //已支付数量
      receivedgoods: "", //已收货数量
      receiv: false, //隐藏提示红心
      receive: false,
      shouji: "",
      imgMao: false,
      status: 0,
      Teamleader:'' //团长等级
    };
  },

  created() {
    //查询未读消息数量
    if (this.$store.state.token == "") {
      this.readCount = false;
    } else {
      newsUnReadCount().then((res) => {
        if (res.data.data.unReadCount == "") {
          this.readCount = false;
        } else {
          if (res.data.data.unReadCount > 99) {
            this.unReadCount = "--";
          } else {
            this.unReadCount = res.data.data.unReadCount;
          }
          this.readCount = true;
        }
      });
    }

    if (this.$store.state.token == "") {
      this.nameq = "点击登录";
      this.heardimg = true;
      this.heard = false;
      this.zhifubao = false;
    } else {
      let model = getPhoneType();
      //隐藏中间4位
      this.shouji = `${information && information.username.substr(0, 3)}****${
        information && information.username.substr(7)
      }`;
      //收益详情
      total().then((res) => {
        this.revenue = res.data.data;
      });

      //获取基本信息
      viewBaseInfo({
        token: this.token,
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
          if (res.data.code == 0) {
            if (res.data.data.nickName == "") {
              this.nameq = this.shouji || res.data.data.mobile;
            } else {
              this.nameq = res.data.data.nickName;
            }
            if (res.data.data.headPicUrl == "") {
              this.heardimg = true;
              this.heard = false;
            } else {
              this.myimg = res.data.data.headPicUrl;
            }
          } else if (res.data.code != 0) {
            this.nameq = "点击登录";
            this.heardimg = true;
            this.heard = false;
            this.zhifubao = false;
          }
        })
        .catch((err) => {});
      //查询已支付订单
      userOrder(this.formData).then((res) => {
        if (res.data.code == 0) {
          if (res.data.message == "暂无订单") {
            this.receive = false;
          } else {
            this.receive = true;
            this.paid = res.data.data.orderList.length;
          }
        }
      });
      //查询已收货订单
      userOrder(this.formdata).then((res) => {
        if (res.data.code == 0) {
          if (res.data.message == "暂无订单") {
            this.receiv = false;
          } else {
            this.receiv = true;
            this.receivedgoods = res.data.data.orderList.length;
          }
        }
      });
      //查询绑定支付宝信息
      getBindPayInfo({
        userId: this.$store.state.userId && this.$store.state.userId,
      }).then((res) => {
        if (res.data.code == 0) {
          // //隐藏中间4位
          // this.shouji = `${
          //   res.data.data.mobile && res.data.data.mobile.substr(0, 3)
          // }****${res.data.data.mobile && res.data.data.mobile.substr(7)}`;
          if (res.data.data.payInfoList != 0) {
            let str = res.data.data.payInfoList[0];
            this.zhifubao = false;
            this.zhifubaoXX = true;
            this.nameww = str.payAccountInfo;
            let long = {
              zhanghao: str.payAccountInfo,
              name: str.payUsername,
              payAccountId: str.payAccountId,
            };
            this.$store.commit("zhanghao", long);
          } else {
            this.zhifubao = true;
            this.zhifubaoXX = false;
          }
        } else if (res.data.code != 0) {
          this.zhifubao = true;
          this.zhifubaoXX = false;
        }
      });
      //查看团长等级
      center().then(res=>{
        this.Teamleader = res.data.data.userLevelInfo.level
      })
      this.$nextTick(() => {
        window.addEventListener("scroll", this.lala);
      });
    }
  },
  mounted() {
    //新用户
    if (information != null) {
      getTotalPriceDetail({
        userId: this.$store.state.userId && this.$store.state.userId,
        token: this.$store.state.token && this.$store.state.token,
      });
    }
  },
  methods: {
    //收藏
    collection(){
        if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ name: "collection" });
      }
    },
    //消息
    xiaoxi() {
      if (this.$store.state.token != "") {
        this.$router.push({ name: "news" });
      } else {
        this.$router.push({ name: "register" });
      }
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
    earnings() {
      this.$router.push({ name: "earnings" });
    },
    //提现
    tixian() {
      this.$router.push({
        name: "tixian",
        params: { much: this.revenue.totalPrice },
      });
    },
    userorder(type) {
      if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ path: "/ordersAll", query: { type } });
      }
    },
    //提现
    profit(num) {
      if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ name: "myProfit", query: { num: num } });
      }
    },
    // 已提现
    withdrawn() {
      if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ name: "withdrawn" });
      }
    },
    //点击头像
    heardim() {
      if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ path: "/mine" });
      }
    },
    //进入团长
    leader() {
      if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ name: 'teamLeader' })
      }
    },
    // 编辑名称
    heardname() {
      if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ path: "/mine" });
      }
    },
    //点击绑定
    rightoff() {
      if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ path: "/zhifubao" });
      }
    },
    //立即体现按钮
    Immediate() {
      if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ path: "/tixian" });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/details") {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  activated() {
    if (!this.$route.meta.isBack) {
      this.list = [];
      this.page = 1;
      this.keyWords = "新品";
      if (this.$store.state.token != "") {
        let model = getPhoneType(); //手机类型
        // //隐藏中间4位
        // this.shouji = `${information && information.username.substr(0, 3)}****${
        //   information && information.username.substr(7)
        // }`;
        //收益详情
        total().then((res) => {
          this.revenue = res.data.data;
        });
        //查询已支付订单
        userOrder(this.formData).then((res) => {
          if (res.data.code == 0) {
            if (res.data.message == "暂无订单") {
              this.receive = false;
            } else {
              this.receive = true;
              this.paid = res.data.data.orderList.length;
            }
          }
        });
        //查询已收货订单
        userOrder(this.formdata).then((res) => {
          if (res.data.code == 0) {
            if (res.data.message == "暂无订单") {
              this.receiv = false;
            } else {
              this.receiv = true;
              this.receivedgoods = res.data.data.orderList.length;
            }
          }
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
        })
          .then((res) => {
            if (res.data.code == 0) {
              // //隐藏中间4位
              // this.shouji = `${
              //   res.data.data.mobile && res.data.data.mobile.substr(0, 3)
              // }****${res.data.data.mobile && res.data.data.mobile.substr(7)}`;
              if (res.data.data.nickName == "") {
                this.nameq = this.shouji || res.data.data.mobile;
              } else {
                this.nameq = res.data.data.nickName;
              }
              if (res.data.data.headPicUrl == "") {
                this.heardimg = true;
                this.heard = false;
              } else {
                this.heardimg = false;
                this.heard = true;
                this.myimg = res.data.data.headPicUrl;
              }
            } else if (res.data.code != 0) {
              this.nameq = "点击登录";
              this.heardimg = true;
              this.heard = false;
              this.zhifubao = false;
            }
          })
          .catch((err) => {});

        //查询绑定支付宝信息
        getBindPayInfo({
          userId: this.$store.state.userId && this.$store.state.userId,
        }).then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.payInfoList != 0) {
              let str = res.data.data.payInfoList[0];
              let long = {
                zhanghao: str.payAccountInfo,
                name: str.payUsername,
                payAccountId: str.payAccountId,
              };
              this.$store.commit("zhanghao", long);
              this.zhifubao = false;
              this.zhifubaoXX = true;
              this.nameww = str.payAccountInfo;
            } else {
              this.zhifubao = true;
              this.zhifubaoXX = false;
            }
          } else if (res.data.code != 0) {
            this.zhifubao = true;
            this.zhifubaoXX = false;
          }
        });
      }
      this.$route.meta.isBack = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.may {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  list-style: none;
  background: #f0f1f3;
  position: relative;
  .heard {
    width: 100%;
    height: 8.6rem;
    background: #fff;
    figure {
      display: flex;
      margin: 0 auto;
      .figureimg {
        width: 3.375rem;
        height: 3.375rem;
        margin-top: 0.7rem;
        margin-left: 0.75rem;
        border-radius: 50%;
        flex-shrink: 0;
      }
      figcaption {
        margin-top: -0.3rem;
        img {
          width: 4.3125rem;
          height: 1.25rem;
        }
        p:nth-of-type(1) {
          font-size: 1.13rem;
          margin-left: 0.5rem;
          margin-top: 1.13rem;
          color: #333;
          font-weight: 500;
        }
        .wer {
          width: 100%;
          opacity: 0.8;
          font-weight: 200;
          font-size: 0.78rem;
          margin-left: 0.5rem;
          color: #333;
        }
      }
      .mayImg {
        width: 1.5rem;
        height: 1.5rem;
        flex-shrink: 0;
        display: block;
        position: absolute;
        top: 0.74rem;
        right: 1.625rem;
      }
      .mayImgs {
        width: 1.5rem;
        height: 1.5rem;
        flex-shrink: 0;
        display: block;
        position: absolute;
        top: 0.75rem;
        right: 3.96875rem;
      }
      .num {
        width: 1.25rem;
        height: 0.9375rem;
        border-radius: 0.6rem;
        position: absolute;
        top: 0.5rem;
        right: 3.5rem;
        background: #ff0c05;
        color: #fff;
        font-size: 0.625rem;
        text-align: center;
        line-height: 1rem;
      }
    }
  }

  /* 收益 */
  .income {
    width: 21.94rem;
    height: 10.1875rem;
    background: url("../../assets/我的收益bg@2x.png") no-repeat center/100%;
    margin: 0.75rem auto 0;
    border-radius: 0.4rem;
    color: #ffe1b0;
    .incomeShow {
      display: flex;
      justify-content: space-between;
      font-size: 0.8125rem;
      margin: 0.5rem 0.9rem;
      padding: 1rem 0 0;
      p:nth-child(1) {
        font-size: 0.875rem;
        color: #ffe1b0;
        opacity: 0.9;
      }
      p:nth-child(2) {
        img {
          width: 0.75rem;
          height: 0.75rem;
          margin-top: 0.2rem;
        }
      }
    }
    .title {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0 0;
      font-size: 0.8rem;
      .tixian {
        margin-left: 0.8rem;
        span {
          font-size: 1.2rem;
          margin-left: 0.1rem;
        }
        i {
          font-style: normal;
          font-size: 0.9rem;
        }
      }
      .button {
        width: 4.2rem;
        padding: 0.3rem;
        background: url("../../assets/提现按钮bg@2x.png") 100% 40% no-repeat;
        border-radius: 0.875rem;
        text-align: center;
        color: #e00000;
        margin-right: 0.75rem;
      }
    }
    .money {
      margin-top: 1.2rem;
      margin-bottom: 0.8rem;
      width: 100%;
      height: 3rem;
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      div {
        flex: 1;
        &:last-of-type {
          border: 0;
        }
        ul {
          height: 3rem;
          width: 100%;
          color: #ffe1b0;
          li {
            width: 100%;
            text-align: center;
            &:nth-of-type(1) {
              font-size: 0.75rem;
              opacity: 0.7;
              margin-bottom: 0.5rem;
            }
            &:nth-of-type(2) {
              margin-top: 0.1rem;
              font-size: 0.75rem;
            }
          }
        }
      }
    }
  }
  //我的订单
  .order_box {
    margin: 0.4rem 0.75rem 0;
    box-sizing: border-box;
    padding: 0.5rem 0;
    border-radius: 0.4rem;
    background: #fff;
    position: relative;
    .title {
      width: 4.5rem;
      height: 1.3rem;
      margin-left: 1rem;
      font-size: 0.88rem;
      padding: 0.5rem 0;
    }
    .order {
      width: 100%;
      display: flex;
      justify-content: space-around;
      font-size: 0.8rem;
      text-align: center;
      padding: 1.5rem 0 1rem;
      border-top: solid 1px #f3f3f3;
      img {
        width: 1.46rem;
        height: 1.5rem;
      }
      .iocnred {
        width: 0.9375rem;
        height: 0.9375rem;
        background: red;
        border-radius: 50%;
        position: absolute;
        top: 3.4rem;
        left: 8.8rem;
        color: white;
        text-align: center;
        line-height: 15px;
        font-size: 0.625rem;
      }
      .iocngreen {
        width: 0.9375rem;
        height: 0.9375rem;
        background: red;
        border-radius: 50%;
        position: absolute;
        top: 3.4rem;
        left: 14rem;
        color: white;
        text-align: center;
        line-height: 15px;
        font-size: 0.625rem;
      }
    }
  }
  //常用工具
  .tool {
    width: 21.94rem;
    height: auto;
    background: #fff;
    margin: 0.75rem auto 0;
    border-radius: 0.4rem;
    p {
      margin: 0 0.75rem;
      padding: 0.5rem 0 1rem;
      font-size: 0.875rem;
    }
    div {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      figure {
        width: 22%;
        padding: 0.5rem 0;
        img {
          width: 1.5rem;
          height: 1.5rem;
        }
        font-size: 0.75rem;
        color: #333;
        text-align: center;
      }
    }
  }
  //团员
  .leader {
    width: 93%;
    height: auto;
    margin: 2rem 0.75rem 0;
    background: linear-gradient(to left, #ffefdd, #ffe1c0);
    display: flex;
    justify-content: space-between;
    padding: 0.7rem 0.5rem;
    box-sizing: border-box;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    p:nth-child(1) {
      img {
        width: 1.125rem;
        height: 1.125rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.8125rem;
        color: #333;
        vertical-align: middle;
      }
    }
    p:nth-child(2) {
      img {
        width: 0.75rem;
        height: 0.75rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.75rem;
        vertical-align: middle;
      }
    }
  }
  .good {
    width: 100%;
    height: auto;
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 0.3rem;
    margin-top: -0.7rem;
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
          display: -webkit-box !important;
          overflow: hidden;
          text-overflow: ellipsis;
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
            background: url("../../assets/png_bg_quan@2x.png") 100% 100%
              no-repeat;
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
          span {
            font-size: 1.125rem;
          }
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
}
</style>