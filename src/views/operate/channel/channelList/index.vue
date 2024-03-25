<template>
  <div id="list">
    <div
      v-for="(x, i) in list"
      :key="i"
      @click="button(x)"
      @mouseover="mouseOver(i)"
      @mouseleave="mouseLeave"
      :class="indexs == i ? 'dic' : 'div'"
      v-loading="loading"
    >
      <img src="../../../../assets/images/bj.png" alt="" />
      <p>房间号</p>
      <p>{{ x.channel_name }}</p>
    </div>

    <el-empty v-show="list.length == 0">
      <el-button type="primary" @click="shua">刷新</el-button>
    </el-empty>
  </div>
</template>

<script>
import {
  queryDataReviewList,
  querygetRtcToken,
  getAgoraInfo,
  getChannelUsers,
} from "@/api/operate/channel/index";
export default {
  data() {
    return {
      list: [],
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNo: 0,
        pageSize: 100,
      },
      // 查询token
      tokens: {
        channelName: "",
        uid: 0,
      },
      // 弹框
      dialogTableVisible: false,
      // 索引
      indexs: -1,
      // appid
      appid: "",
    };
  },
  mounted() {
    this.queryDataReviewList();
    getAgoraInfo().then((res) => {
      console.log(res, "appid");
      this.appid = res.data.data.agoraId;
    });
  },
  methods: {
    button(x) {
      console.log(x);
      this.tokens.channelName = x.channel_name;
      querygetRtcToken(this.tokens).then((res) => {
        console.log(res, "十大");
        if (res.code == 200) {
          localStorage.setItem(
            "value",
            JSON.stringify({
              token: res.data.token,
              channel: x.channel_name,
              appid: this.appid,
            })
          );
          location.href = `${window.location.origin}/#/operate/channel/videosd`;
        }
      });
    },
    queryDataReviewList() {
      this.loading = true;
      queryDataReviewList(this.queryParams).then((response) => {
        if (response.code == 200) {
          this.list = response.data.data.channels;
          this.loading = false;
        }
      });
    },
    // 移入
    mouseOver(i) {
      this.indexs = i;
    },
    // 移出
    mouseLeave() {
      this.indexs = -1;
    },
    // 刷新
    shua() {
      this.queryDataReviewList();
    },
  },
};
</script>


<style lang="scss" scoped>
#list {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  background: #fff;
  flex-wrap: wrap;
  padding-top: 10px;
  overflow: hidden;
  .div {
    width: 280px;
    height: 205px;
    margin-left: 25px;
    margin-top: 25px;
    border-radius: 5px;
    background: #f5f4fa;
    color: #000;
    img {
      width: 100%;
      height: 140px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    button {
      width: 160px;
      height: 40px;
      margin: 5px;
    }
    p {
      margin: 5px;
    }
  }
  .dic {
    width: 280px;
    height: 205px;
    margin-left: 25px;
    margin-top: 25px;
    border-radius: 5px;
    background: #f5f4fa;
    color: #000;
    transition: all 0.5s ease-out;
    img {
      width: 100%;
      height: 140px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    button {
      width: 160px;
      height: 40px;
      margin: 5px;
    }
    p {
      margin: 5px;
    }
  }

  .dic:hover {
    transform: scale(1.1);
  }
}

.el-empty {
  width: 100%;
  height: 100%;
}
.pagination-container {
  position: fixed;
  right: 40px;
  bottom: 30px;
}

</style>