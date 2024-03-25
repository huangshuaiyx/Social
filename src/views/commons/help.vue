<template>
  <div class="jAvqEvaa">
    <van-nav-bar title="用户协议" @click-left="$router.go(-1)"  @click-right="$router.go(-1)">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
        <template #right>
        <van-icon size="1.5rem" name="cross" color="#000000" />
      </template>
    </van-nav-bar>
    <center style="height:100%">
      <iframe
        src="https://url.mc.cn/jAvqEvaa"
        height="100%"
        width="100%"
        id="frame_full"
        frameborder="0"
        scrolling="auto"
        class="ifrname"
      ></iframe>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>


<style lang="scss" scoped>
.jAvqEvaa {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.jAvqEvaa::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>