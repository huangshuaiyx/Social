<template>
  <div class="earnings">
    <van-nav-bar title="提现明细" @click-left="$router.go(-1)">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
    </van-nav-bar>
    <!-- 明细 -->
    <div class="earningsmingxi" v-if="earning">
      <figure v-show="ok" v-for="(x,i) in list" :key="i">
        <p>
          <span>提现到支付宝</span>
          <br />
          <span class="timetext">{{x.payTime}}</span>
          <span class="timetext">流水号:{{x.orderId}}</span>
        </p>
        <figcaption>
          <p>
            <span class="number">-{{x.cashOutPrice}}</span>
            <br />
            <span class="timetext">{{x.orderStatus | getstatus}}</span>
          </p>
        </figcaption>
      </figure>
    </div>
    <div class="shibai" v-if="shibai">
      <img src="../../assets/png_none@2x.png" alt />
      <p>您还没有提现哦</p>
    </div>
  </div>
</template>


<script>
import { getCashOutDetail } from "@/api/api.js";
export default {
  data() {
    return {
      no: false,
      ok: true,
      page: 0,
      list: [],
      shibai: false,
      earning: false,
    };
  },
  created() {
    getCashOutDetail(null).then((res) => {
      if (res.data.data) {
        this.list = this.list.concat(res.data.data);
        if (this.list.length <= 1) {
          this.earning = false;
        } else {
          this.earning = true;
        }
      } else {
        this.earning = false;
        this.shibai = true;
      }
    });
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    // 退出
    tui() {
      this.$router.push({ name: "may" });
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
  margin: 1.56rem 0.75rem 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
}
.earningsmingxi p:nth-of-type(1) {
  font-size: 1rem;
}
.timetext {
  margin-top: 0.6rem;
  display: block;
  font-size: 0.88rem;
  color: #999999;
  width: 100%;
}
.number {
  font-size: 1.13rem;
  color: #56bd6f;
  font-weight: 600;
}
.shibai {
  width: 7.13rem;
  height: auto;
  color: #999999;
  font-size: 0.88rem;
  text-align: center;
  margin: 8.84rem auto 0;
}
.shibai img {
  width: 4.13rem;
  height: 3.56rem;
  margin-bottom: 1.25rem;
}
</style>