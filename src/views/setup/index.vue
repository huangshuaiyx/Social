<template>
  <div style="width:100%;height:100%;background:#f6f6f6">
    <!-- 头部 -->
    <van-nav-bar title="设置" @click-left="$router.go(-1)">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
    </van-nav-bar>
    <!-- 选项 -->
    <van-cell is-link title="常见问题" @click="help" />
    <van-cell is-link title="问题反馈" @click="feedback" />
    <van-cell is-link title="关于米橙省购" @click="$router.push({name:'about'})" />

    <div v-if="signs">
      <van-button
        type="primary"
        color="white"
        style="marginTop:0.8rem;border:solid 1px"
        @click="sign"
        block
      >退出登录</van-button>
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      close-on-click-action
      cancel-text="取消"
      description="您确定要退出登录"
      @cancel="onCancel"
      @select="onSelect"
    />
  </div>
</template>


<script>
let information = JSON.parse(localStorage.getItem("jd-webapp"));
let zhifubao = JSON.parse(localStorage.getItem("zf-webapp"));
export default {
  data() {
    return {
      signs: false,
      show: false,
      actions: [{ name: "确定", color: "red" }],
    };
  },
  mounted() {
    if (information) {
      this.signs = true;
    } else {
      this.signs = false;
    }
  },
  methods: {
    //取消退出登录
    onCancel() {},
    //退出登录
    onSelect() {
      window.localStorage.clear(); //清除本地
      this.$toast.success({
        message:'退出登录',
        onOpened: () => {
          // this.$router.push({ name: "may" }); //跳回首页
          location.href = location.origin + '/#/may'
          location.reload()
        }
      })
    },
    help() {
      window.location.href = "https://url.mc.cn//#/helpCenter?isH5=1";
    },
    feedback() {
      this.$router.push({ name: "feedback" });
    },
    sign() {
      this.show = true;
    },
  },
};
</script>


<style lang="scss" scoped>
::v-deep .van-button__text {
  color: red;
}
::v-deep van-button {
  border: solid 0.1rem;
}
</style>