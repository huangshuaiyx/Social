<template>
  <div class="college">
    <div class="college-hear">
      <p @click="$router.push({name:'zhuanzhuan'})">
        <img src="../../assets/3333.png" alt />
      </p>
      <van-tabs
        v-model="activeName"
        line-width="0"
        title-active-color="#fff"
        title-inactive-color="red"
        @change="vanChange"
        background="#fff"
      >
        <van-tab
          v-for="(x, i) of marketingList"
          :key="i"
          :title="x.marketName"
          :name="x.id"
        ></van-tab>
      </van-tabs>
      <p>
        <img src="../../assets/zhuanzhuan/搜索icon@2x.png" alt />
      </p>
    </div>
    <!-- <BusinessSchool></BusinessSchool> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { incomeTotal, shoppingSchool, material } from "@/api/api.js";
import BusinessSchool from "../zhuanzhuan/BusinessSchool";
export default {
  data() {
    return {
      activeName: this.$route.query.num,
      marketingList: [], //营销分类
    };
  },
  components:{
    // BusinessSchool,
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (newV) {
         if (newV.query.num == "1") {
        this.$router.push({ name: "BusinessSchool" });
      }else if(newV.query.num == "2"){
        this.$router.push({name:'Marketingboom'})
      }else if(newV.query.num == "3"){
        this.$router.push({name:'Marketingmaterials'})
      }
      },
    },
  },
  mounted() {
    incomeTotal().then((res) => {
      this.marketingList = res.data.data.list;
    });
    
  },
  methods: {
    vanChange(name) {
      if (name == "1") {
        this.$router.push({ name: "BusinessSchool" });
      }else if(name == "2"){
        this.$router.push({name:'Marketingboom'})
      }else if(name == "3"){
        this.$router.push({name:'Marketingmaterials'})
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.college {
  width: 100%;
  .college-hear {
    width: 95%;
    display: flex;
    margin: 0 0.75rem;
    justify-content: space-between;
    p {
      margin-top: 0.7rem;
      img {
        width: 1.2rem;
        height: 1.3rem;
      }
    }
    ::v-deep .van-tabs {
      width: 70%;
      height: auto;
      margin-top: 0.5rem;
      padding: 0;
      border-radius: 30%;
      .van-tabs__wrap {
        border: solid 1px red;
        border-radius: 50px;
        height: 1.875rem;
        .van-tab--active {
          background: red;
           border-radius: 20px;
        }
      }
    }
  }
}
</style>