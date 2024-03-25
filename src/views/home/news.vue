<template>
  <div class="news">
    <div class="newsVan">
      <span @click="$router.go(-1)">
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </span>
      <span>
        消息中心
        <a v-if="this.readCount != 0 ">({{this.readCount}})</a>
      </span>
      <span @click="onClickRight">清除未读</span>
    </div>
    <!-- 消息 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false" finished-text="没有更多了">
        <van-swipe-cell right-width="2rem" v-for="(x,i) of newsList" :key="i">
          <!-- 未读小红点 -->
          <div class="reddian" v-if="x.isRead == false"></div>
          <template default>
            <figure class="notice" @click="cellClick(x)">
              <img v-if="x.icon != ''" :src="x.icon" alt />
              <img v-else src="../../assets/news/shop.png" alt />
              <figcaption>
                <p class="noticeP">
                  <span>{{x.title}}</span>
                  <span
                    style="font-size:13px;color:#999; font-weight: 500;"
                  >{{x.createTime | getTimes}}</span>
                </p>
                <p>{{x.content}}</p>
              </figcaption>
            </figure>
          </template>
          <template #right>
            <van-button
              square
              v-if="x.isRead == false"
              @click="read(x)"
              text="标记已读"
              type="danger"
              class="delete-button"
            />
            <van-button square @click="warning(x)" text="删除" type="warning" class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
    <div v-if="kong" class="kong">
      <img src="../../assets/news/消息空图@2x.png" alt />
      <p>暂时没有消息哦~</p>
    </div>
  </div>
</template>


<script>
import {
  messageNews, //查询消息
  newsDelete, //删除消息
  newsUnReadCount, //未读数量
  readPut, //点击已读
} from "@/api/api.js";
export default {
  data() {
    return {
      startId: 0, //传参
      newsList: [], //接受数据
      loading: false,
      finished: false,
      refreshing: false,
      formData: {
        id: "",
        type: "",
      },
      readCount: "", //未读消息
      kong: false,
    };
  },
  mounted() {
    this.onLoad();
    newsUnReadCount().then((res) => {
      this.readCount = res.data.data.unReadCount;
    });
  },
  methods: {
    //清除未读
    onClickRight() {
      this.formData.type = 0;
      readPut(this.formData).then((res) => {
        if (res.data.code == 0) {
          this.newsList = [];
          this.startId = 0;
          this.onLoad();
        }
      });
    },
    //标记已读
    read(x) {
      this.formData.id = x.id;
      this.formData.type = x.type;
      readPut(this.formData).then( (res) => {
        if (res.data.code == 0) {
          this.newsList = [];
          this.startId = 0;
          this.onLoad();
        }
      });
    },
    //删除
    warning(x) {
      newsDelete({ id: x.id }).then((res) => {
        if (res.data.code == 0) {
          window.location.reload();
        }
      });
    },
    //消息点击
    cellClick(x) {
      this.$router.push({
        name: "newsdetails",
        query: {
          title: x.title,
          content: x.content,
        },
      });
    },
    //上滑加载
    onLoad() {
      //查询消息
      messageNews({ startId: this.startId })
        .then((res) => {
          this.startId = res.data.data.startId;
          this.loading = false;
          this.refreshing = false;
          if (res.data.data.messageList != []) {
            if (res.data.data.isLastPage != true) {
              this.newsList = this.newsList.concat(res.data.data.messageList);
            }else{
                this.finished = true;
               this.newsList = this.newsList.concat(res.data.data.messageList);
            }
          } else {
           this.kong = true;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    onRefresh() {
      this.newsList = [];
      this.startId = 0;
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>


<style lang="scss" scoped>
.news {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  ::v-deep .van-nav-bar__text {
    font-size: 0.8125rem;
    color: black;
  }
  .van-nav-bar {
    background: #f6f6f6;
  }
  .newsVan {
    width: 96%;
    height: 1.7rem;
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 0.5rem 0;
    position: fixed;
    top: 0;
    z-index: 10;
    background: #f6f6f6;
  }
  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  .notice {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    img {
      width: 2.125rem;
      height: 2.125rem;
      vertical-align: middle;
      flex-shrink: 0;
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      border-radius: 0.2rem;
    }
    figcaption {
      width: 90%;
      padding: 0.3rem;
      .noticeP {
        justify-content: space-between;
        display: flex;
        color: #333;
        font-weight: 600;
        span {
          display: block;
        }
      }
      p {
        margin: 0.3rem;
        font-size: 0.8125rem;
        color: #999;
      }
    }
  }
  .reddian {
    width: 0.625rem;
    height: 0.625rem;
    background: red;
    border-radius: 50%;
    position: relative;
    left: 2.5rem;
    top: 0.5rem;
  }
  .van-pull-refresh {
    height: auto;
    margin-top: 3rem;
  }
  .kong {
    position: relative;
    top: 45%;
    img {
      width: 4.0625rem;
      height: 3.75rem;
    }
    font-size: 13px;
    color: #aeaeae;
    text-align: center;
  }
}
</style>