<template>
  <div class="orderdetails">
    <van-nav-bar title="订单明细" @click-left="$router.go(-1)" :border="false">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
    </van-nav-bar>
    <div class="orderdetailsDivone">
      <p>
        本月有效订单总数
        <span style="marginLeft:0.5rem">{{orderCount}}</span>
      </p>
      <p>{{timeDate}}</p>
    </div>
    <div class="orderdetailsDivtwo">
      <h4>订单收益</h4>
      <ul class="orderdetailsUi">
        <li>平台</li>
        <li>有效订单数</li>
        <li>收益</li>
      </ul>
      <ul v-for="(x,i) of platformData" :key="i">
        <li>{{x.platform}}</li>
        <li>{{x.orderCount}}</li>
        <li>¥{{x.returnMoney}}</li>
      </ul>

      <ul>
        <li>今日总收益</li>
        <li>{{orderCount}}</li>
        <li>¥{{returnMoneyTotal}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
     
import { platform } from "@/api/api.js";
export default {
  data() {
    return {
      platformData:[], //订单收益
      orderCount:'', //有效订单总数
      returnMoneyTotal:'', //总收益
      timeDate:"" //当月时间
    };
  },
  created(){
      var date = new Date();
    let Y = date.getFullYear()+'年';
    let M =
      date.getMonth()+1 + "月";
    let D = date.getDate();
    this.timeDate = Y+M
  },
  mounted() {
    var date = new Date();
    let Y = date.getFullYear();
    let M =
      date.getMonth()+1 ;
    let D = date.getDate();
    platform({
      year:Y,
      month:M,
      day:D
    }).then(res=>{
     this.platformData = res.data.data.incomeList
     this.orderCount = res.data.data.orderCount
     this.returnMoneyTotal = res.data.data.returnMoneyTotal
    })
  }
};
</script>


<style lang="scss" scoped>
.orderdetails {
  width: 100%;
  height: 100%;
  background: #f0f1f3;
  padding: 1rem 0;
  .van-nav-bar {
    width: 100%;
    background: #f0f1f3;
    position: fixed;
    top: 0;
  }
  .orderdetailsDivone {
    width: 88%;
    height: auto;
    background: #fff;
    margin: 3rem auto 0;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    font-size: 0.875rem;
  }
  .orderdetailsDivtwo {
    width: 88%;
    height: auto;
    background: #fff;
    margin: 0.75rem auto 0;
    padding: 0.75rem;
    h4 {
      margin-left: 0.7rem;
    }
    .orderdetailsUi {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      color: #666;
      font-size: 0.875rem;
      padding: 0.75rem 0.7rem;
      li {
        width: 5rem;
      }
    }
    ul {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      color: #333;
      font-size: 0.875rem;
      padding: 0.75rem 0.7rem;
      border-radius: 0.5rem;
      li:nth-child(1) {
        width: 5rem;
        height: auto;
        text-align: left;
      }
      li:nth-child(2) {
        width: 5rem;
        height: auto;
        text-align: center;
      }
      li:nth-child(3) {
        width: 5rem;
        height: auto;
        text-align: center;
      }
    }
  }
}
</style>