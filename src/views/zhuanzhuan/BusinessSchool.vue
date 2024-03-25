<template>
  <div class="BusinessSchool">
    <van-tabs v-model="active" line-width="20px" @change="changeOnclick">
      <van-tab
        v-for="(x, i) of merchantSchool"
        :key="i"
        :title="x.typeName"
      ></van-tab>
    </van-tabs>

    <div class="Business">
      <figure
        v-for="(x, i) of this.merchantSchoolList"
        :key="i"
        @click="BusinessOnclick(x)"
      >
        <img :src="x.imgUrl" alt="" />
        <figcaption>
          <p style="font-size: 14px; height: auto; color: #333">
            {{ x.title }}
          </p>
          <p style="margin-top: 0.7rem; font-size: 11px; color: #999">
            {{ x.createTime }}
          </p>
          <div class="bottomDiv">
            <p>阅读{{ x.readVolume }}万</p>
            <p>
              <img src="../../assets/zhuanzhuan/商学院赞icon@2x.png" alt="" />
              {{ x.likeVolume }}
            </p>
            <p>
              <img
                src="../../assets/zhuanzhuan/商学院分享13icon@2x.png"
                alt=""
              />
              {{ x.shareVolume }}
            </p>
          </div>
        </figcaption>
      </figure>
    </div>
  </div>
</template>


<script>
import { shoppingSchool } from "@/api/api.js";
export default {
  name: "BusinessSchool",
  data() {
    return {
      merchantSchool: [],
      merchantSchoolList: [],
      active: "",
      shoppingSchoolData: {
        pageNum: 0,
        typeId: 0,
      },
    };
  },
  mounted() {
    shoppingSchool(this.shoppingSchoolData).then((res) => {
      this.merchantSchool = res.data.data.typeArticleList;
      this.merchantSchoolList = res.data.data.typeArticleList[0].list; //默认新手必看
    });
  },
  methods: {
    //点击后触发
    changeOnclick(name) {
      this.merchantSchool.forEach((x, i) => {
        if (name == i) {
          this.merchantSchoolList = x.list;
        }
      });
    },
    BusinessOnclick(x) {
      this.$router.push({ name: "schoolList", query: { x: x.content ,title:x.title} });
    },
  },
};
</script>

<style lang="scss" scoped>
.BusinessSchool {
  width: 100%;
  height: 100%;
  .Business {
    height: 100%;
    figure {
      width: 94%;
      margin: 0.5rem auto;
      display: flex;
      justify-content: space-around;
      img {
        width: 8rem;
        height: 6rem;
        border-radius: 0.3rem;
      }
      figcaption {
        width: 80%;
        margin-left: 0.5rem;
        .bottomDiv {
          display: flex;
          justify-content: space-between;
          font-size: 0.625rem;
          color: #999;
          margin-top: 1rem;
          img {
            width: 0.825rem;
            height: 0.825rem;
          }
          span {
            margin: 0.5rem 0;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>