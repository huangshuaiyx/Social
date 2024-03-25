<template>
  <div id="applyok">
    <div class="app">提现详情</div>
    <div class="apply">
      <img src="../../assets/png_tijiao@2x.png" alt />
    </div>
    <b>提现申请已提交</b>
    <van-cell-group>
      <van-cell title-class="left" value-class="right" title="提现金额" :value="value" />
      <van-cell title-class="left" value-class="right" title="提现到支付宝" :value="zhifubao" />
      <van-cell title-class="left" value-class="right" title="流水号" :value="$route.query.businessId" />
      <van-cell title-class="left" value-class="right" title="到账" value="请留意支付宝到账信息" />
    </van-cell-group>
    <van-button round type="info" color="#FE0C05" @click="$router.push({name:'tixian'})">完成</van-button>
  </div>
</template>

<script>
let ob = JSON.parse(localStorage.getItem("zf-webapp"));
export default {
  data() {
    return {
      value: "",
      zhifubao: "",
    };
  },
  mounted() {
    this.value = this.$route.query.value;
    this.zhifubao = ob.zhanghao;
  },
};
</script>


<style lang="scss" scoped>
#applyok {
  width: 100%;
  min-height: 100%;
  .app {
    padding: 0.5625rem 0;
    text-align: center;
  }
  p {
    width: 100%;
    text-align: right;
    padding: 1rem 2rem 0;
    box-sizing: border-box;
    color: #ff6303;
  }
  .apply {
    width: 100%;
    height: 2.62rem;
    margin-top: 3.94rem;
    img {
      display: block;
      margin: 0 auto;
      width: 2.62rem;
      height: 2.62rem;
    }
  }
  b {
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    margin-top: 1.75rem;
    display: block;
    margin-bottom: 6rem;
  }
  .left {
    color: #999;
    font-size: 1rem;
  }
  .right {
    color: #333;
    font-size: 1rem;
  }
  .van-button{
    width: 90%;
    margin: 0 0.75rem;
    position: absolute;
    bottom: 2rem;
  }
  .van-cell-group{
    font-size: 0.9375rem;
  }
}
</style>