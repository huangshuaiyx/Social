<template>
  <div class="leaguemembers">
    <van-nav-bar title="团员明细" left-text="返回" @click-left="$router.go(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#333" />
      </template>
      <template #right>
        <img src="../../assets/leader/右搜索icon@2x.png" alt />
      </template>
    </van-nav-bar>

    <van-tabs v-model="activeName" line-width="20px" title-active-color="red">
      <van-tab title="全部团员" name="a"></van-tab>
      <van-tab title="直属团员" name="b"></van-tab>
      <van-tab title="加盟团员" name="c"></van-tab>
    </van-tabs>

    <van-tabs
      class="tab"
      v-model="activeName"
      line-width="20px"
      title-active-color="red"
      @change="onChange"
    >
      <van-tab title="注册时间" name="a"></van-tab>
      <img class="img" src="../../assets/icon_返后价默认@2x.png" alt />
      <img class="img" src="../../assets/icon_返后价降序2@2x.png" alt />
      <img class="img" src="../../assets/icon_price_rise@2x.png" alt />
      <van-tab title="有效团员" name="b"></van-tab>
      <van-tab title="筛选" name="c"></van-tab>
      <img class="screen" src="../../assets/leader/筛选icon@2x.png" alt />
    </van-tabs>
    <!-- 右侧弹出框 -->
    <van-popup v-model="show" position="right" :style="{ height: '100%' , width :'80%'}">
      <p>是否有效</p>
      <ul>
        <li>全部</li>
        <li>有效</li>
        <li>无效</li>
      </ul>
      <p>最后登录时间</p>
      <ul>
        <li>今天</li>
        <li>近7天</li>
        <li>近30天</li>
        <li>30天前</li>
      </ul>
      <p>近30天收益</p>
      <ul>
        <li>0-100元</li>
        <li>100-300元</li>
        <li>300元以上</li>
      </ul>
      <p>有效团员数</p>
      <ul>
        <li>1-49位</li>
        <li>50-149位</li>
        <li>150位以上</li>
      </ul>
      <div class="popup">
        <van-button plain round hairline type="info" color="red">重置</van-button>
        <van-button round color="red" type="primary">确定</van-button>
      </div>
    </van-popup>
    <!-- 团员 -->
    <div class="member">
      <div>
        <p>
          <img src="../../assets/消息黑icon@2x.png" alt />
          <span>无效</span>
          <span>科研课题按</span>
          <img class="img" src="../../assets/leader/编辑昵称icon@2x.png" alt />
        </p>
        <p>
          <button>联系ta</button>
        </p>
      </div>
      <p>
        <span>13245679852</span>
        <span>2020年08月20日注册</span>
      </p>
      <p>上级邀请人 12378454855</p>
      <figure>
        团员0
        <figcaption>有效团员0</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      activeName: "a",
    };
  },
  methods: {
    onChange(name) {
      if (name == "c") {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.leaguemembers {
  width: 100%;
  height: 100%;
  background: #f0f1f2;
  .van-nav-bar {
    .van-nav-bar__right {
      img {
        width: 1rem;
        height: 1rem;
      }
    }
  }
  .tab {
    position: relative;
    .img {
      width: 0.4rem;
      height: 0.8rem;
      position: absolute;
      top: 1rem;
      left: 5.9rem;
    }
    .screen {
      width: 0.625rem;
      height: 0.6875rem;
      position: absolute;
      top: 1.1rem;
      right: 2rem;
    }
  }
  p {
    font-size: 13px;
    color: #666666;
    margin: 0.75rem 0.5rem;
  }
  ul {
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 25%;
      height: auto;
      padding: 0.5rem 0;
      text-align: center;
      margin: 0.75rem;
      font-size: 0.8125rem;
      background: #f6f6f6;
      color: #666666;
    }
  }
  .popup {
    position: absolute;
    bottom: 1rem;
    display: flex;
    margin: 0 0.75rem;
    .van-button:nth-child(1) {
      width: 8rem;
    }

    .van-button:nth-child(2) {
      width: 8rem;
      margin-left: 1.5rem;
    }
  }
  .member {
    width: 94%;
    margin: 0.75rem;
    height: auto;
    border: solid 1px;
    padding: 0.5rem 0;
    div {
      display: flex;
      justify-content: space-between;
      height: auto;
      p:nth-child(1) {
        img {
          width: 2rem;
          height: 2rem;
        }
        span:nth-child(1) {
          width: 1.8125rem;
          height: 1rem;
          border: solid 1px;
          display: block;
        }
        .img {
          width: 0.75rem;
          height: 0.75rem;
        }
      }
    }
    figure {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>