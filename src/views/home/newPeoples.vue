<template>
  <div>
    <p></p>
  </div>
</template>


<script>
import { YuanGoods } from "@/api/api.js";
export default {
  data() {
    return {
      formData: {
        page: 0,
      },
      list: [],
    };
  },
  mounted() {
    YuanGoods(this.formData).then((res) => {
      if (res.data.data.goodsList.length != 0) {
        if (res.data.data.isLastPage == true) {
          this.list = res.data.data.goodsList;
        } else {
          this.list = this.list.concat(res.data.data.goodsList);
        }
      } else {
      }
    });
  },
};
</script>