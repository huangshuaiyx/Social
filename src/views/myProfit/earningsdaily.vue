<template>
  <div class="earningsdaily" ref="earningsdaily">
    <van-nav-bar
      :title="title"
      @click-left="$router.go(-1)"
      :border="false"
      @click-right="currentDatess = true"
    >
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
      <template #right>
        <img src="../../assets/myprofit/日历icon@2x.png" style="width:18px;height:18px" alt />
      </template>
    </van-nav-bar>

    <div class="everylast" v-for="(x,i) of everysingleday" :key="i">
      <p class="everylastP">{{x.dayTimeStr || x.monthTimeStr}}</p>
      <div class="today">
        <p class="todayPone">
          <span>
            今日收益
            <a>¥</a>
            <a>{{x.totalIncome}}</a>
          </span>
        </p>
        <div class="todayDiv">
          <p>
            <span>¥{{x.selfPurchaseIncome}}</span>
            <br />
            <span class="todayDivspan">自购</span>
          </p>
          <p>
            <span>¥{{x.memberIncome}}</span>
            <br />
            <span class="todayDivspan">直属团员</span>
          </p>
          <p>
            <span>¥{{x.affiliateMemberIncome}}</span>
            <br />
            <span class="todayDivspan">加盟团员</span>
          </p>
          <p>
            <span>¥{{x.shareIncome}}</span>
            <br />
            <span class="todayDivspan">分享赚</span>
          </p>
        </div>
        <p class="todayPtwo">
          <span>本月有效订单总数</span>
          <span>
            {{x.effectiveOrderNum}}
            <img src="../../assets/myprofit/前进icon@2x.png" alt />
          </span>
        </p>
      </div>
    </div>

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
  </div>
</template>

<script>
import { appointTime, monthDetail, yearDetail } from "@/api/api.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      currentDatess: false, //生日隐藏
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(),
      oneDayL: [],
      everysingleday: [], //每一天日报
      title: "",
    };
  },
  mounted() {
    if (this.$route.query.type == 1) {
      this.title = "收益日报";
      this.$refs.earningsdaily.style.height = "auto";
      monthDetail().then((res) => {
        this.everysingleday = res.data.data;
      });
    } else {
      this.title = "收益月报";
      this.$refs.earningsdaily.style.height = "100%";
      yearDetail().then((res) => {
        this.everysingleday = res.data.data;
      });
    }
  },
  methods: {
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
      var date = new Date(birthdayDates);
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let D = date.getDate();
      appointTime({
        year: Y,
        month: M,
        day: D,
      }).then((res) => {
        if (res.data.code == 0) {
          this.oneDayL = res.data.data;
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
  },
};
</script>

<style lang="scss" scoped>
.earningsdaily {
  width: 100%;
  height: auto;
  background: #f0f1f3;
  padding: 3rem 0;
  .van-nav-bar {
    width: 100%;
    background: #f0f1f3;
    position: fixed;
    top: 0;
  }
  
  .everylast:nth-child(1) {
    margin-top: 5rem;
  }
  .everylast {
    .everylastP {
      margin: 1rem 1.5rem 0;
      font-size: 0.8125rem;
      color: #222;
    }
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
  }
}
</style>