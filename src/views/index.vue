<template>
  <div id="index">
    <van-grid :gutter="15" :column-num="3" clickable>
      <van-grid-item v-for="value in pageRouter" :key="value.name" :to="value.path">
        <p>{{ value.meta.title }}</p>
      </van-grid-item>
    </van-grid>

  </div>
</template>

<script>
import { pageRouter } from "../router/page";
// import { Grid, GridItem } from "vant";
export default {
  // components: {
  //   [Grid.name]: Grid,
  //   [GridItem.name]: GridItem,
  // },
  name: "index",
  data() {
    return { pageRouter };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
#index {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .van-grid {
    .van-grid-item {
      /deep/ .van-grid-item__content {
        p {
          font-size: 11px;
          text-align: center;
        }
      }
    }
  }
}
</style>
