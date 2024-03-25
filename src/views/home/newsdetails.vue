<template>
  <div class="newsdetails">
    <van-nav-bar :title="title" @click-left="$router.go(-1)" :border="false">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000" />
      </template>
    </van-nav-bar>
    <div class="cont">{{ this.$route.query.content }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.query.title,
    };
  },
  mounted() {},
};
</script>


<style lang="scss" scoped>
.newsdetails {
  width: 100%;
  height: 100%;
  .van-nav-bar {
    background: #f6f6f6;
  }
  .cont {
    margin: 1rem;
  }
}
</style>