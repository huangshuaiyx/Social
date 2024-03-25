<template>
  <div class="jAvqEvaa">
    <van-nav-bar
      title="隐私政策"
      @click-left="$router.go(-1)"
      @click-right="$router.go(-1)"
    >
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
      <template #right>
        <van-icon size="1.5rem" name="cross" color="#000000" />
      </template>
    </van-nav-bar>
    <center style="height: 100%">
      <iframe
        src="https://url.mc.cn/jAvqEvaa"
        height="100%"
        width="100%"
        frameborder="0"
        scrolling="auto"
        id="iframe"
      ></iframe>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // window.location.href = 'https://url.mc.cn/jAvqEvaa'
    this.$nextTick(() => {
      let test = document.getElementById("iframe").contentWindow;
    });
  },
  methods: {
    hideImg(i) {},
  },
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
#ifrname {
  html {
    body {
      .useRule {
        padding: 0;
      }
    }
  }
}
</style>