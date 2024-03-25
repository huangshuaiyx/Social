<template>
  <div class="box">
    <!--------------- 标题 ----------------->
    <div class="title">
      <van-icon size="1.5rem" name="arrow-left" @click="$router.go(-1)" />
      <span>省钱攻略</span>
    </div>
    <div class="courseeds"></div>
    <div class="course">
      <!-- 第一步 -->
      <div>
        <h4>第一步</h4>
        <img src="../../assets/一@2x.png" alt />
        <p>
          从淘宝(京东/拼多多)APP
          <span>拷贝商品标题或链接</span>
        </p>
      </div>
      <!-- 第二步 -->
      <div>
        <h4>第二步</h4>
        <img src="../../assets/二@2x.png" alt />
        <p>
          <span>打开米橙省购APP</span> 自动识别拷贝的内容，点击按钮进入找到相应商品
        </p>
      </div>
      <!-- 第三步 -->
      <div>
        <h4>第三步</h4>
        <img src="../../assets/三@2x.png" alt />

        <p>
          <span>点击立即领券</span> 或点击立即购买，领优惠券
          <span>下单成功</span>后，返回米橙省购APP即可
          <span>享返利</span>
        </p>
      </div>
      <!-- 第四步 -->
      <div>
        <h4>或直接搜索商品</h4>
        <img src="../../assets/四@2x.png" alt />
        <p>
          在米橙省购APP搜索框内
          <span>直接输入关键字</span>
          ，搜索淘宝、京东、拼多多三大平台商品
        </p>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  z-index: 1000;
  .title {
    position: relative;
    width: 100%;
    height: 2.8rem;
    font-size: 1rem;
    position: fixed;
    top: 0;
    z-index: 999;
    background: #fff;
    .van-icon {
      position: absolute;
      z-index: 9999;
      top: 0.8rem;
      left: 0.3rem;
    }
    span {
      line-height: 3rem;
      display: inline;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .courseeds {
      position: absolute;
      top: 2.8rem;
    width: 100%;
    height: 10rem;
    background: url("../../assets/教程bg@2x.png") 100% 10% no-repeat #ff6303;
    background-size: 100%;
  }
  .course {
    width: 100%;
    height: auto;
    position: absolute;
    background: linear-gradient(to right, #FF9535,#FF9535);
    top: 12.8rem;
    div:nth-child(1) {
      width: 21.9375rem;
      height: 21.75rem;
      margin: -1.8rem 0.75rem 0.75rem;
      background: white;
      border-radius: 0.5rem;
      position: relative;
      h4 {
        padding: 1rem 1rem 0;
        color: #fe0c05;
        font-size: 1.125rem;
        font-weight: 600;
      }
      img {
        width: 20rem;
        height: 17.1875rem;
      }
      p {
        width: 9.0625rem;
        height: 2.5625rem;
        position: absolute;
        font-size: 0.8125rem;
        top: 8rem;
        right: 1.5rem;
        line-height: 1.4rem;
        span {
          font-weight: 600;
          color: #fe0c05;
        }
      }
    }
    //二
    div:nth-child(2) {
      width: 21.9375rem;
      height: 21.75rem;
      margin: 0.75rem 0.75rem 0.75rem;
      background: white;
      border-radius: 0.5rem;
      position: relative;
      top: 0;
      h4 {
        padding: 1rem 1rem 0;
        color: #fe0c05;
        font-size: 1.125rem;
        font-weight: 600;
      }
      img {
        width: 20rem;
        height: 17.1875rem;
      }
      p {
        width: 9.0625rem;
        height: 2.5625rem;
        position: absolute;
        font-size: 0.8125rem;
        top: 7rem;
        left: 1rem;
        line-height: 1.4rem;
        span {
          font-weight: 600;
          color: #fe0c05;
        }
      }
    }
    //三
    div:nth-child(3) {
      width: 21.9375rem;
      height: 21.75rem;
      margin: 0.75rem 0.75rem 0.75rem;
      background: white;
      border-radius: 0.5rem;
      position: relative;
      h4 {
        padding: 1rem 1rem 0;
        color: #fe0c05;
        font-size: 1.125rem;
        font-weight: 600;
      }
      img {
        width: 20rem;
        height: 17.1875rem;
      }
      p {
        width: 9.625rem;
        height: 2.5625rem;
        position: absolute;
        font-size: 0.8125rem;
        top: 7rem;
        right: 1.5rem;
        line-height: 1.4rem;
        span {
          font-weight: 600;
          color: #fe0c05;
        }
      }
    }
    //四
    div:nth-child(4) {
      width: 21.9375rem;
      height: 21.75rem;
      margin: 0.75rem 0.75rem 0.75rem;
      background: white;
      border-radius: 0.5rem;
      position: relative;
      h4 {
        padding: 1rem 1rem 0;
        color: #fe0c05;
        font-size: 1.125rem;
        font-weight: 600;
      }
      img {
        width: 20rem;
        height: 17.1875rem;
      }
      p {
        width: 9.0625rem;
        height: 2.5625rem;
        position: absolute;
        font-size: 0.8125rem;
        top: 8rem;
        left: 0.7rem;
        line-height: 1.4rem;
        span {
          font-weight: 600;
          color: #fe0c05;
        }
      }
    }
  }
}
</style>