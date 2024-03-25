<template>
  <div class="schollList">
    <!-- 头部 -->
    <van-nav-bar
      :title="$route.query.title"
      class="hear"
      type="line"
      :border="false"
      @click-left="$router.go(-1)"
    >
      <template #left>
        <van-icon color="#000" size="25px" name="arrow-left" />
      </template>
    </van-nav-bar>
    <div class="scholl" v-html="$route.query.x"></div>
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
.schollList {
  width: 100%;
  height: 100%;
  margin: 0.5rem 0;
  .scholl {
    ::v-deep .media-wrap {
      width: 100%;
    }
  }
}
</style>