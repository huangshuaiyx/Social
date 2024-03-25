<template>
  <div class="MyLeague">
    <!-- 头部 -->
    <van-nav-bar
      title="我的团员"
      class="hear"
      type="line"
      :border="false"
      @click-left="$router.go(-1)"
    >
      <template #left>
        <van-icon name="arrow-left" color="#333" size="20" />
      </template>
    </van-nav-bar>
    <div class="league">
      <p>
        <span>我的团员</span>
        <span @click="$router.push({ name: 'MyLeague' })">
          <van-button
            plain
            hairline
            type="info"
            round
            size="mini"
            color="#FE0C05"
            >邀新团员</van-button
          >
        </span>
      </p>
      <div>
        <figure @click="$router.push({ name: 'Leaguemembers' })">
          <span> {{ info.memberCount }}人</span>
          <figcaption>
            全部团员
            <img src="../../assets/leader/更多箭头@2x.png" alt />
          </figcaption>
        </figure>
        <figure>
          <span> {{ info.userAffiliateMemberCount }}人</span>
          <figcaption>
            直属团员
            <img src="../../assets/leader/更多箭头@2x.png" alt />
          </figcaption>
        </figure>
        <figure>
          <span> {{ info.userMemberCount }}人</span>
          <figcaption>
            加盟团员
            <img src="../../assets/leader/更多箭头@2x.png" alt />
          </figcaption>
        </figure>
      </div>
    </div>
    <div class="active">
      <p>
        <span>活跃情况</span>
        <img src="../../assets/leader/帮助icon@2x.png" alt />
      </p>
      <ul>
        <li ref="directlyunder" @click="directlyunder(1)">直属团员</li>
        <li>|</li>
        <li ref="indirect" @click="directlyunder(2)">加盟团员</li>
      </ul>
      <div>     
        <figure>
          <span v-if="num == 1">{{ xx.activeMemberNumAffiliate }}人</span>
          <span v-if="num == 2">{{ss.activeMemberNum}}人</span>
          <figcaption>今日新增</figcaption>
        </figure>
        <figure>
          <span v-if="num == 1">{{ xx.addMemberNumAffiliate }}人</span>
          <span v-if="num == 2">{{ ss.addMemberNum }}人</span>
          <figcaption>今日活跃</figcaption>
        </figure>
        <figure>
          <span v-if="num == 1">{{ xx.firstShoppingMemberNumAffiliate }}人</span>
          <span v-if="num == 2">{{ ss.firstShoppingMemberNum }}人</span>
          <figcaption>今日首购</figcaption>
        </figure>
        <figure>
          <span v-if="num == 1">{{ xx.historyOrderedMemberNumAffiliate }}人</span>
          <span v-if="num == 2">{{ ss.historyOrderedMemberNum }}人</span>
          <figcaption>今日下单</figcaption>
        </figure>
        <figure>
          <span v-if="num == 1">{{ xx.lossMemberCountAffiliate }}人</span>
          <span v-if="num == 2">{{ ss.lossMemberCount }}人</span>
          <figcaption>历史已下单</figcaption>
        </figure>
        <figure>
          <span v-if="num == 1">{{ xx.todayOrderedMemberNumAffiliate }}人</span>
          <span v-if="num == 2">{{ ss.todayOrderedMemberNum }}人</span>
          <figcaption>流失用户</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { info } from "@/api/api.js";
export default {
  data() {
    return {
      info: [],
      xx: {},
      ss: {},
      num:1
    };
  },
  mounted() {
    //默认选择直属团员
    this.$refs.directlyunder.style.color = "red";
    //我的团员信息
    info().then((res) => {
      this.info = res.data.data;
      this.xx = res.data.data.userAffiliateMemberDailyInfo;
    });
  },
  methods: {
    directlyunder(num) {
      if (num == 1) {
        this.num = 1
        this.$refs.directlyunder.style.color = "red";
        this.$refs.indirect.style.color = "black";
      } else if (num == 2) {
        this.num = 2
        this.$refs.directlyunder.style.color = "black";
        this.$refs.indirect.style.color = "red";
         this.ss = this.info.userMemberDailyInfo
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.MyLeague {
  width: 100%;
  height: 100%;
  background: #f0f1f2;
  .van-nav-bar {
    background: #f0f1f2;
  }
  .league {
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
        span {
          color: red;
        }
        figcaption {
          color: #999;
          font-size: 0.75rem;
          margin-top: 0.5rem;
          img {
            width: 0.625rem;
            height: 0.625rem;
          }
        }
      }
    }
  }
  .active {
    width: 21.9375rem;
    height: auto;
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
      img {
        width: 1rem;
        height: 1rem;
        vertical-align: middle;
      }
    }
    ul {
      display: flex;
      justify-content: space-around;
      margin: 1rem 0;
    }
    div {
      figure {
        width: 30%;
        margin: 0.75rem 0;
        figcaption {
          color: #999;
          font-size: 0.75rem;
          margin-top: 0.5rem;
          img {
            width: 0.625rem;
            height: 0.625rem;
          }
        }
      }
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      text-align: center;
    }
  }
}
</style>