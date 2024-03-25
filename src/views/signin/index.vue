<template>
  <div class="OrangeJuice">
    <div class="Juice">
      <van-nav-bar title="领橙汁" @click-left="$router.go(-1)" :border="false">
        <template #left>
          <van-icon name="arrow-left" size="20" color="#fff" />
        </template>
        <template #right color="#fff"> 查看规则 </template>
      </van-nav-bar>
      <img class="myjuice" src="../../assets/signin/我的橙汁@2x.png" alt="" />
      <p class="maMl">
        <span>55ml</span>
        <br />
        <span class="maMlspan"
          >我的橙汁<img
            src="../../assets/signin/我的橙汁_前进icon@2x.png"
            alt=""
        /></span>
      </p>
      <img
        class="myLeft"
        src="../../assets/signin/左边橙汁装饰@2x.png"
        alt=""
      />
      <img
        class="myRight"
        src="../../assets/signin/右边橙汁装饰@2x.png"
        alt=""
      />
      <img
        class="myTopRight"
        src="../../assets/signin/右边上面橙汁装饰@2x.png"
        alt=""
      />
      <img
        class="myTopcenter"
        src="../../assets/signin/中间橙汁装饰@2x.png"
        alt=""
      />
    </div>
    <div class="calendar">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.OrangeJuice {
  width: 100%;
  height: 100%;
  .Juice {
    width: 100%;
    height: 20rem;
    background: url("../../assets/signin/我的橙汁背景@2x.png") no-repeat
      center/100%;
    .van-nav-bar {
      background: url("../../assets/signin/我的橙汁背景@2x.png") 100% 10%
        no-repeat;
      color: #fff;
      ::v-deep.van-nav-bar__title {
        color: #fff;
      }
    }
    .myjuice {
      width: 6.25rem;
      height: 6rem;
      position: absolute;
      top: 3.5rem;
      left: 23%;
    }
    .maMl {
      width: 5.75rem;
      height: auto;
      position: absolute;
      top: 4.5rem;
      left: 52%;
      span:nth-child(1) {
        font-size: 2rem;
        color: #fff;
        font-weight: 600;
      }
      .maMlspan {
        font-size: 1.1rem;
        color: #fff;
      }
      img {
        width: 0.825rem;
        height: 0.825rem;
      }
    }
    .myLeft {
      width: 3.1125rem;
      height: 2.25625rem;
      position: absolute;
      top: 7rem;
      left: 8%;
    }
    .myRight {
      width: 2.66875rem;
      height: 1.8125rem;
      position: absolute;
      top: 8.2rem;
      left: 75%;
    }
    .myTopRight {
      width: 1.44375rem;
      height: 1.15625rem;
      position: absolute;
      top: 3.5rem;
      left: 75%;
    }
    .myTopcenter {
      width: 1.4875rem;
      height: 1.39375rem;
      position: absolute;
      top: 3rem;
      left: 42%;
    }
  }
  .calendar{
      width: 21.9375rem;
      height: 22.0625rem;
      background: #fff;
      border: solid 1px;
      position: absolute;
      top: 10.5rem;
      left: 3%;
  }
}
</style>