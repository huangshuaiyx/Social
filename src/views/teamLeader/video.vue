<template>
  <div class="video">
    <van-nav-bar title="了解米橙省购" @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#fff" />
      </template>
    </van-nav-bar>
    <video :src="$route.query.appLearningVideo" controls="controls"></video>
  </div>
</template>


<script>
export default {
    data () {
        return {
            
        }
    },
    mounted(){
   
    }
}
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
  height: 100%;
  background: #000;
  .van-nav-bar {
    background: #000;
    width: 100%;
    position: fixed;
    top: 0;
    ::v-deep .van-nav-bar__title {
      color: #fff;
    }
  }
  video {
    width: 100%;
    height: 100%;
  }
}
</style>