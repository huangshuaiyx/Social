<template>
  <div class="about">
    <!-- 头部 -->
    <van-nav-bar title="关于米橙省购" @click-left="$router.go(-1)">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
      
    </van-nav-bar>

    <div class="ersf">
      <p class="lOGO">
        <img src="../../assets/关于省购LOGO@2x.png" alt />
      </p>
      <p class="logo_wenzi">
        <img src="../../assets/@3x.png" />
      </p>
      <p style="marginTop:0.5rem">1.1.0</p>
      <p style="marginTop:1rem">购得越多,省的越多</p>
    </div>
    <div class="yinsi">
      <a style="marginRight:0.7rem;color:red" href="https://url.mc.cn/jAvqEvaa" >隐私政策</a>
      |
      <a style="marginLeft:0.7rem;color:red" href="https://url.mc.cn/jAvqEvaa" >用户协议</a>
    <p style="marginTop:0.5rem;color:red;font-size:12px" @click="lianjie">www.mc.cn</p>

    </div>
  </div>
</template>


<script>
export default {
  methods: {
    lianjie() {
      window.location.href = "https://www.mc.cn/";
    },
    privacy(){
      this.$router.push({name:'privacy'})
    },
    help(){
      this.$router.push({name:'help'})
    }
  },
};
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  .ersf {
    width: auto;
    height: auto;
    text-align: center;
    margin: 8.0625rem auto 0;
    color: #d6d6d6;
    .lOGO {
      width: 5.5rem;
      height: 5.5rem;
      margin: 0.5rem auto;
      img {
        width: 100%;
        text-align: center;
      }
    }
    .logo_wenzi {
      width: 6.5rem;
      height: 1.5rem;
      margin: 1rem auto 0.3rem;
      img {
        width: 100%;
      }
    }
  }
  .yinsi {
    position: absolute;
    color: red;
    font-size: 12px;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>