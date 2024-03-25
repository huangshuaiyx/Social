<template>
  <div class="earnings" style="width:100%,height:100%">
    <van-nav-bar title="收益明细" @click-left="$router.go(-1)" :border="false">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
    </van-nav-bar>
    <!-- 明细 -->
    <div class="earningsmingxi">
      <van-tabs
        title-active-color="#FF6303"
        @click="onClick"
        line-width="30px"
        v-model="actiov"
        type="line"
        :border="false"
      >
        <van-tab :name="0" title="全部收益" class="searchtu"></van-tab>
        <van-tab :name="1" title="已到账" class="searchtu"></van-tab>
        <van-tab :name="2" title="即将到帐" class="searchtu">
          <van-notice-bar
            color="#FE0C05"
            background="#FFEBEA"
            :scrollable="false"
            :wrapable="true"
            >即将到账金额在确认收货30天后可提现</van-notice-bar
          >
        </van-tab>
      </van-tabs>
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <figure v-show="ok" v-for="(x, i) in list" :key="i">
          <p>
            <span>{{ x.text }}</span>
            <br />
            <span class="timetext">{{ x.payTime }}</span>
          </p>
          <figcaption>
            <p>
              <span class="number">+{{ x.returnPrice }}</span>
              <br />
              <span class="timetext">{{ x.status | getstatus }}</span>
            </p>
          </figcaption>
        </figure>
      </van-list>
    </div>
    <div class="shibai" v-if="noearnings">
      <img src="../../assets/png_none@2x.png" alt />
      <p>您还没有收益哦</p>
    </div>
  </div>
</template>

<script>
import { getTotalPriceDetail, getCashOutDetail } from "@/api/api.js";
export default {
  data() {
    return {
      no: false,
      ok: true,
      page: 0,
      list: [],
      loading: false,
      finished: false,
      status: this.$route.query.num,
      actiov: this.$route.query.num,
      noearnings: false, //没有收益
    };
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    // 退出
    tui() {
      this.$router.push({ name: "may" });
    },
    onClick(name) {
      this.list = [];
      this.page = 0;
      this.status = name;
      this.onLoad();
    },
    onLoad() {
      this.page++;
      getTotalPriceDetail({ status: this.status, page: this.page })
        .then((res) => {
          this.loading = false;
          if (res.data.data.priceList) {
            this.list = [...this.list, ...res.data.data.priceList];
            this.noearnings = false;
            this.finished = true;
          } else {
            if (this.list.length == 0) {
              this.finished = true;
              this.noearnings = true;
            } else {
              this.finished = true;
              this.noearnings = true;
            }
          }
        })
        .catch((err) => {
          this.loading = false;
          this.finished = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.sAll {
  display: flex;
}
h4 {
  margin-top: 0.4rem;
  margin-left: 2.3rem;
  font-size: 1.13rem;
  margin-top: 1.3rem;
}

.ok {
  width: 5.81rem;
  height: 2rem;
  border: solid 0.06rem #f0f0f0;
  border-radius: 1rem;
  margin: 0 0.75rem;
  background: #f0f0f0;
  margin-top: 1rem;
}
.ok img:nth-of-type(1) {
  width: 1rem;
  height: 1rem;
  margin-left: 0.81rem;
  margin-top: 0.5rem;
  vertical-align: sub;
}
.ok span {
  width: 1rem;
  height: 1rem;
  margin-top: 0.2rem;
}
.ok span:nth-of-type(2) {
  text-align: center;
  font-size: 1rem;
  font-weight: 300;
  margin-top: 1rem;
  margin-left: 0.5rem;
  color: #c2c2c2;
}
/* 明细 */
.earningsmingxi {
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
}
.earningsmingxi figure {
  margin: 0.5rem 0.75rem 0;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border: solid 1px white;
  border-bottom-color: #f6f6f6;
}
figure:first-child {
  border-top-color: #f6f6f6;
}
.earningsmingxi p:nth-of-type(1) {
  font-size: 1rem;
}
.timetext {
  margin-top: 0.5rem;
  display: block;
  font-size: 0.6rem;
  color: #999999;
}
.number {
  font-size: 1rem;
  color: red;
}
.shibai {
  width: 7.13rem;
  height: auto;
  color: #999999;
  font-size: 0.88rem;
  text-align: center;
  margin: 0 auto;
  position: absolute;
  top: 22rem;
  left: 50%;
  transform: translateX(-50%);
}
.shibai img {
  width: 4.13rem;
  height: 3.56rem;
  margin-bottom: 1.25rem;
}
::v-deep .van-notice-bar {
  font-size: 0.6875rem !important;
  line-height: 1.2rem;
  text-align: center;
}
::v-deep .van-notice-bar__content {
  padding-left: 20% !important;
}
</style>