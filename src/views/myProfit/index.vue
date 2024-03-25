<template>
  <div class="myProfit">
    <van-nav-bar title="我的收益" @click-left="$router.go(-1)" :border="false">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
    </van-nav-bar>
    <!-- 累计收益 -->
    <div class="cumulative">
      <p class="cumulativePone">累计收益</p>
      <p class="cumulativePtwo">
        ¥
        <a>{{cumulative.totalPrice?cumulative.totalPrice:'0.00'}}</a>
      </p>
      <div class="cumulativeDiv">
        <p  @click="profit(1)">
          <span>{{cumulative.unexpiredPrice?cumulative.unexpiredPrice:'0.00'}}</span>
          <br />
          <span class="cumulativeSpantwo">已到账</span>
        </p>
        <p @click="withdrawn(3)">
          <span>{{cumulative.cashOutOver?cumulative.cashOutOver:'0.00'}}</span>
          <br />
          <span class="cumulativeSpantwo">已提现</span>
        </p>
        <p  @click="profit(2)">
          <span>{{cumulative.waitPrice? cumulative.waitPrice:'0.00'}}</span>
          <br />
          <span class="cumulativeSpantwo">即将到帐</span>
        </p>
      </div>
    </div>
    <!-- 今日收益 -->
    <div class="today">
      <p class="todayPone">
        <span>
          今日收益
          <a>¥</a>
          <a>{{today.totalIncome}}</a>
        </span>
        <span @click="$router.push({name:'earningsdaily',query:{type:1}})">
          查看更多
          <img src="../../assets/myprofit/前进icon@2x.png" alt />
        </span>
      </p>
      <div class="todayDiv">
         <p>
          <span>¥{{today.selfPurchaseIncome}}</span>
          <br />
          <span class="todayDivspan">自购</span>
        </p>
        <p>
          <span>¥{{today.shareIncome}} </span>
          <br />
          <span class="todayDivspan">直属团员</span>
        </p>
        <p>
          <span> ¥{{today.affiliateMemberIncome}}</span>
          <br />
          <span class="todayDivspan">加盟团员</span>
        </p>
        <p>
          <span> ¥{{today.shareIncome}} </span>
          <br />
          <span class="todayDivspan">分享赚</span>
        </p>
      </div>
      <p class="todayPtwo">
        <span>今日有效订单总数</span>
        <span @click="$router.push({name:'orderdetailss',query:{type:0}})">
          {{today.effectiveOrderNum}}
          <img src="../../assets/myprofit/前进icon@2x.png" alt />
        </span>
      </p>
    </div>
    <!-- 本月收益 -->
    <div class="thismonth">
      <p class="thismonthPone">
        <span>
          本月收益
          <a>¥</a>
          <a>{{thisMonth.totalIncome}}</a>
        </span>
        <span @click="$router.push({name:'earningsdaily'})">
          查看更多
          <img src="../../assets/myprofit/前进icon@2x.png" alt />
        </span>
      </p>
      <div class="thismonthDiv">
        <p>
          <span>¥{{thisMonth.selfPurchaseIncome}}</span>
          <br />
          <span class="todayDivspan">自购</span>
        </p>
        <p>
          <span>¥{{thisMonth.shareIncome}} </span>
          <br />
          <span class="todayDivspan">直属团员</span>
        </p>
        <p>
          <span> ¥{{thisMonth.affiliateMemberIncome}}</span>
          <br />
          <span class="todayDivspan">加盟团员</span>
        </p>
        <p>
          <span> ¥{{thisMonth.shareIncome}} </span>
          <br />
          <span class="todayDivspan">分享赚</span>
        </p>
      </div>
      <p class="thismonthPtwo">
        <span>本月有效订单总数</span>
        <span @click="$router.push({name:'orderdetailss'})">
          {{thisMonth.effectiveOrderNum}}
          <img src="../../assets/myprofit/前进icon@2x.png" alt />
        </span>
      </p>
    </div>
  </div>
</template>

<script>
let information = JSON.parse(localStorage.getItem("jd-webapp"));
import { getUserOrderPrice ,month} from "@/api/api.js"
export default {
  data () {
    return {
         today:{}, //今日收益
         thisMonth:{}, //本月收益
         cumulative:{}, //累计收益 
    }
  },
  mounted(){
    getUserOrderPrice().then(res=>{
      this.cumulative = res.data.data
    })
    
    month().then(res=>{
      this.today = res.data.data.today
      this.thisMonth = res.data.data.thisMonth
    })
    
  },
  methods:{
       // 已提现
    withdrawn() {
      if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ name: "withdrawn" });
      }
    },
    //提现
    profit(num) {
      if (this.$store.getters.token == "") {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({ name: "earnings", query: { num: num } });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.myProfit {
  width: 100%;
  height: 100%;
  background: #f0f1f3;
   .van-nav-bar {
    background: #f0f1f3;
  }
  //累计收益
  .cumulative {
    width: 21.9375rem;
    height: 9.5625rem;
    margin: 0 auto;
    border-radius: 0.5rem;
    background: url("../../assets/myprofit/卡片@2x.png") no-repeat center/100%;
    .cumulativePone {
      font-size: 0.75rem;
      padding: 1.125rem 0 0 1rem;
      color: #fff;
      opacity: 0.8;
    }
    .cumulativePtwo {
      padding: 0.2rem 0 0 1rem;
      color: #fff;
      font-size: 0.875rem;
      a {
        font-size: 1.375rem;
      }
    }
    .cumulativeDiv {
      width: 100%;
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-top: 1.4375rem;
      p {
        span:nth-child(1) {
          font-size: 1rem;
          color: #fff;
        }
        .cumulativeSpantwo {
          font-size: 0.75rem;
          color: #fff;
          opacity: 0.8;
          margin-top: 0.25rem;
        }
      }
    }
  }
  //今日收益
  .today {
    width: 21.9375rem;
    height: 9.5625rem;
    margin: 0.75rem auto 0;
    border-radius: 0.5rem;
    background: #fff;
    .todayPone {
      display: flex;
      justify-content: space-between;
      padding: 1.1875rem 0.75rem;
      font-size: 0.75rem;
      color: #666;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
      a:nth-child(2) {
        font-size: 0.9375rem;
        color: #ff0c05;
      }
    }
    .todayDiv {
      display: flex;
      justify-content: space-around;
      padding: 0.5rem 0;
      text-align: center;
      p {
        span:nth-child(1) {
          font-size: 0.9375rem;
          color: #555;
        }
        .todayDivspan {
          font-size: 0.75rem;
          color: #999;
        }
      }
    }
    .todayPtwo {
      display: flex;
      justify-content: space-between;
      padding: 0 0.75rem;
      font-size: 0.75rem;
      margin: 1rem 0;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
      span:nth-of-type(1) {
        color: #555;
      }
    }
  }
  //本月收益
  .thismonth {
    width: 21.9375rem;
    height: 9.5625rem;
    margin: 0.75rem auto;
    border-radius: 0.5rem;
    background: #fff;
    .thismonthPone{
      display: flex;
      justify-content: space-between;
      padding: 1.1875rem 0.75rem;
      font-size: 0.75rem;
      color: #666;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
      a:nth-child(2) {
        font-size: 0.9375rem;
        color: #ff0c05;
      }
    }
    .thismonthDiv {
      display: flex;
      justify-content: space-around;
      padding: 0.5rem 0;
      text-align: center;
      p {
        span:nth-child(1) {
          font-size: 0.9375rem;
          color: #555;
        }
        .todayDivspan {
          font-size: 0.75rem;
          color: #999;
        }
      }
    }
    .thismonthPtwo {
      display: flex;
      justify-content: space-between;
      padding: 0 0.75rem;
      font-size: 0.75rem;
      margin: 1rem 0;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
      span:nth-of-type(1) {
        color: #555;
      }
    }
  }
}
</style>


