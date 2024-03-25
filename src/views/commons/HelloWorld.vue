<template>
  <div class="base">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <footer>
      <figure
        @click="$router.push({ name: 'homepage' })"
        :style="$route.path == '/homepage'  ? 'color: #fe0c05' : 'color: #222222;opacity: 0.8;'"
      >
        <img
          v-if="$route.path == '/homepage' "
          src="../../assets/tab_icon_home_select@2x.png"
          alt
          
        />
        <img v-else src="../../assets/tab_icon_home_default@2x.png" alt class="baseImg"/>
        <figcaption>首页</figcaption>
      </figure>
      
      <figure
        @click="$router.push({ name: 'zhizhi' })"
        :style="$route.path == '/zhizhi' ? 'color: #fe0c05' : 'color: #222222;opacity: 0.8;'"
      >
        <img
          v-if="$route.path == '/zhizhi'"
          src="../../assets/tab_icon_zizi_select@2x.png"
          alt
           
        />
        <img v-else src="../../assets/tab_icon_zizi_default@2x.png" alt class="baseImg"/>
        <figcaption>好物圈</figcaption>
      </figure>

      <figure
        @click="$router.push({ name: 'zhuanzhuan' })"
        :style="$route.path == '/zhuanzhuan' ? 'color: #fe0c05' : 'color: #222222;opacity: 0.8;'"
      >
        <img v-if="$route.path == '/zhuanzhuan'" src="../../assets/tab_icon_zhuan_select@2x.png" alt />
        <img v-else src="../../assets/tab_icon_zhuan_default@2x.png" alt  class="baseImg"/>
        <figcaption>赚赚</figcaption>
      </figure>

      <figure
        @click="$router.push({ name: 'may' })"
        :style="$route.path == '/may' ? 'color: #fe0c05' : 'color: #222222;opacity: 0.8;'"
      >
        <img v-if="$route.path == '/may'" src="../../assets/tab_icon_mine_select@2x.png" alt  />
        <img v-else src="../../assets/tab_icon_mine_default@2x.png" alt class="baseImg" />
        <figcaption>我的</figcaption> 
      </figure>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
};
</script>


<style lang="scss" scoped>
.base {
  margin: 0;
  box-sizing: border-box;
  height: 100%;
  padding: 0;
  /* 底部 */
  footer {
    width: 100%;
    height: 3.3rem;
    position: fixed;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    bottom: 0;
    z-index: 100;
    display: flex;
    box-sizing: border-box;
    justify-content: space-around;
    background: #F0F1F3 ;
    figure {
      margin: 0;
      padding: 0;
      width: 3rem;
      padding: 0.2rem 0;
      text-align: center;
      margin-top: 0.38rem;
      font-size: 0.69rem;
      img {
        width: 1.33125rem;
        height: 1.33rem;
      }
      .baseImg{
        opacity: 0.8;
      }
    }
  }
}
</style>
 