<template>
  <div style="width:100%;height:100%;
    overflow: hidden;
    box-sizing: border-box;">
    <div class="title">
      <van-icon size="1.5rem" name="arrow-left" @click="$router.push({name:'homepage'})" />
      <form action="/">
        <van-search
          v-model.trim="value"
          placeholder="粘贴商品标题 领优惠券享返利"
          @input="search"
          @search="onSearch"
          shape="round"
          ref="vanSearch"
          :autofocus="autofocus"
        />
      </form>
      <p @click="sousuo(value)">搜索</p>
    </div>

    <!-- 淘宝,拼多多 -->
    <div style="marginTop:3.5rem">
      <van-tabs
        v-model="activeName"
        line-width="1rem"
        type="line"
        @click="clickTab"
        :border="false"
      >
        <van-tab title="天猫淘宝" name="2"></van-tab>
        <van-tab title="京东" name="3"></van-tab>
        <van-tab title="拼多多" name="1"></van-tab>
      </van-tabs>
    </div>
    <!-- 历史记录 -->
    <div class="history" v-show="history">
      <div class="history_div">
        <span>历史</span>
        <span>
          <img src="../../assets/search_icon_deleteHist@2x.png" alt @click="delet" />
        </span>
      </div>
      <div class="history_text">
        <span class="history_span" @click="clickHistory(x)" v-for="(x,i) of souarr" :key="i">{{x}}</span>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="history" v-show="hot">
      <div class="history_div">
        <span>热门搜索</span>
      </div>
      <div class="history_text">
        <span
          :class="x.tagType == 3 || x.tagType == 1 ?'history_spans':'history_span'"
          @click="clickHistorys(x.hotKeyWords)"
          v-for="(x,i) of hotArr"
          :key="i"
        >
          <img v-if="x.tagType == 3 || x.tagType == 2" src="../../assets/search/火icon@2x.png" alt />
          {{x.hotKeyWords }}
        </span>
      </div>
    </div>
    <!-- 模糊搜索 -->
    <div class="vague" v-show="vague">
      <!-- <p @click="clickHistory(value+ x)" v-for="(x,i) of ssarr" :key="i">
        <span style="color:#999">{{value}}</span>
        {{x}}
      </p>-->
      <p @click="clickHistorysd(x)" v-for="(x,i) of ssarr" :key="i">{{x}}</p>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { getsearch, hotWords, getKeyWordsByWords } from "@/api/api.js";

export default {
  // filters: {
  //   //超过x位显示...
  //   ellipsis: function (value) {
  //     if (!value) return "";
  //     if (value.length > 25) {
  //       return value.slice(0, 25) + "...";
  //     }
  //     return value;
  //   },
  // },
  data() {
    return {
      activeName: this.$route.query.tab, //tab默认值
      value: "", //搜索默认值
      history: true, //历史搜索
      hot: true, //热门搜索
      actives: 0, //综合,返利...
      souarr: [], //历史记录
      vague: false, //模糊搜索
      arrList: [],
      formData: {
        keyWord: "",
        sort: 0,
        sortType: "desc",
        dataSource: 2,
        listId: 1,
        source: 2,
        owner: "",
        page: 1,
      },
      hotArr: [], //热门搜搜
      ssarr: [], //模糊搜索
      autofocus: true,
    };
  },
  mounted() {
    this.activeName = this.$route.query.tab;
    //历史搜索
    let souarr = localStorage.getItem("souarr")
      ? JSON.parse(localStorage.getItem("souarr"))
      : [];
    this.souarr = [...souarr].slice(0, 8);
    unique(souarr);
    function unique(arr) {
      var ret = [];
      var hash = {};
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var key = typeof item + item;
        if (hash[key] !== 1) {
          ret.push(item);
          hash[key] = 1;
        }
      }
      localStorage.setItem("souarr", JSON.stringify(ret));
    }
    hotWords().then((res) => {
      this.hotArr = res.data.data.hotWordsList;
    });
    if (souarr == "") {
      this.history = false;
    }
    //禁止输入特殊字符
    this.value = this.value.replace(
      /[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
      ""
    );
  },
  methods: {
    //输入框内容变化
    search(value) {
      if (value) {
        this.history = false;
        this.hot = false;
        this.vague = true;
        getKeyWordsByWords({
          keyWords: this.value,
        })
          .then((res) => {
            if (res.data == {}) {
              this.$router.push({ name: "kong" });
            } else {
              this.ssarr = res.data.data;
            }
            //搜索高亮
            //   if (res.data == {}) {
            //     this.$router.push({ name: "kong" });
            //   } else {
            //     let zz = "/" + this.value + "/g";
            //     let ssarr = res.data.data;
            //     for (let i = 0, len = ssarr.length; i <script len; i += 1) {
            //       ssarr[i] = ssarr[i].replace(eval(zz), "");
            //     }
            //     this.ssarr = ssarr;
            //   }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this.history = true;
        this.hot = true;
        this.vague = false;
      }
    },
    //回车事件
    onSearch(value) {
      if (value == "") {
        Toast("搜索词不能为空");
        this.history = true;
        this.hot = true;
        this.vague = false;
      } else {
        let souarr = localStorage.getItem("souarr")
          ? JSON.parse(localStorage.getItem("souarr"))
          : [];
        souarr.unshift(value);
        // souarr.replace(" ", "");
        unique(souarr);
        function unique(arr) {
          var ret = [];
          var hash = {};
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var key = typeof item + item;
            if (hash[key] !== 1) {
              ret.push(item);
              hash[key] = 1;
            }
          }
          localStorage.setItem("souarr", JSON.stringify(ret));
        }
        this.souarr = [...souarr];
        this.$router.push({
          name: "shop",
          query: { history: value, name: this.activeName },
        });
      }
    },

    //点击搜索
    sousuo(val) {
      if (val == "") {
        Toast("搜索词不能为空");
        this.history = true;
        this.hot = true;
        this.vague = false;
      } else {
        let souarr = localStorage.getItem("souarr")
          ? JSON.parse(localStorage.getItem("souarr"))
          : [];
        souarr.unshift(val);
        unique(souarr);
        function unique(arr) {
          var ret = [];
          var hash = {};
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var key = typeof item + item;
            if (hash[key] !== 1) {
              ret.push(item);
              hash[key] = 1;
            }
          }
          localStorage.setItem("souarr", JSON.stringify(ret));
        }
        this.souarr = [...souarr];
        this.$router.push({
          name: "shop",
          query: { history: val, name: this.activeName },
        });
      }
    },
    //清除历史记录
    delet() {
      Dialog.confirm({
        message: "确认删除全部历史搜索记录",
        overlayStyle: {
          opacity: 0.6,
        },
      })
        .then(() => {
          localStorage.removeItem("souarr");
          this.history = false;
        })
        .catch(() => {});
    },
    clickTab(name) {
      this.formData.dataSource = name;
    },
    //历史搜索
    clickHistory(x) {
      let souarr = localStorage.getItem("souarr")
        ? JSON.parse(localStorage.getItem("souarr"))
        : [];
      souarr.unshift(x);
      unique(souarr);
      function unique(arr) {
        var ret = [];
        var hash = {};
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          var key = typeof item + item;
          if (hash[key] !== 1) {
            ret.push(item);
            hash[key] = 1;
          }
        }
        localStorage.setItem("souarr", JSON.stringify(ret));
      }
      this.formData.keyWord = x;
      this.formData.source = 3;
      getsearch(this.formData);
      this.$router.push({
        name: "shop",
        query: { history: x, name: this.activeName },
      });
    },
    //热门搜索
    clickHistorys(x) {
      this.formData.keyWord = x;
      this.formData.source = 4;
      let souarr = localStorage.getItem("souarr")
        ? JSON.parse(localStorage.getItem("souarr"))
        : [];
      souarr.unshift(x);
      unique(souarr);
      function unique(arr) {
        var ret = [];
        var hash = {};

        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          var key = typeof item + item;
          if (hash[key] !== 1) {
            ret.push(item);
            hash[key] = 1;
          }
        }
        localStorage.setItem("souarr", JSON.stringify(ret));
      }
      getsearch(this.formData);
      this.$router.push({
        name: "shop",
        query: { history: x, name: this.activeName },
      });
    },
    //模糊搜索
    clickHistorysd(x) {
      if (x == "") {
      } else {
        this.formData.keyWord = x;
        this.formData.source = 4;
        let souarr = localStorage.getItem("souarr")
          ? JSON.parse(localStorage.getItem("souarr"))
          : [];
        souarr.unshift(x);
        unique(souarr);
        function unique(arr) {
          var ret = [];
          var hash = {};

          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var key = typeof item + item;
            if (hash[key] !== 1) {
              ret.push(item);
              hash[key] = 1;
            }
          }
          localStorage.setItem("souarr", JSON.stringify(ret));
        }
        this.$router.push({
          name: "shop",
          query: { history: x, name: this.activeName },
        });
      }
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/shop" || from.path == "/homepage") {
      next((vm) => {
        vm.$refs.vanSearch.focus();
      });
    }
    next();
  },
};
</script>


<style lang="scss" scoped>
//历史记录
.history {
  width: 100%;
  padding: 1rem 0.75rem;
  box-sizing: border-box;
  .history_div {
    width: 100%;
    height: 1.3125rem;
    display: flex;
    justify-content: space-between;
    span {
      float: left;
      display: block;
    }
    img {
      float: right;
      display: block;
      width: 0.9375rem;
      height: 1rem;
    }
  }
  .history_text {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .history_span {
      color: #666666;
      font-size: 0.75rem;
      background: #f6f6f6;
      border-radius: 0.875rem;
      margin-left: 0.7rem;
      padding: 5px 12px;
      line-height: 1;
      margin: 0.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      img {
        width: 0.65rem;
        height: 0.75rem;
        margin-right: 0.5rem;
      }
    }
    .history_spans {
      color: #ff0c05;
      font-size: 0.75rem;
      background: #fff1f0;
      border-radius: 0.875rem;
      margin-left: 0.7rem;
      padding: 5px 12px;
      line-height: 1;
      margin: 0.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      img {
        width: 0.65rem;
        height: 0.75rem;
        margin-right: 0.5rem;
      }
    }
  }
}
.vague {
  width: 100%;
  height: auto;
  padding: 0 1rem;
  box-sizing: border-box;
  p {
    padding: 0.8125rem 0 0.75rem;
    font-size: 0.8125rem;
  }
}
//标题
.title {
  position: relative;
  width: 100%;
  height: 3.4rem;
  font-size: 1rem;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 100;

  .van-icon {
    position: absolute;
    top: 0.9rem;
    left: 0.3rem;
    line-height: 1.8rem;
    padding-right: 0.5rem;
    z-index: 10;
  }
  ::v-deep .van-search {
    width: 80%;
    position: absolute;
    left: 1.5rem;
    top: 0.7rem;
    padding: 0;
  }
  p {
    position: absolute;
    top: 1.2rem;
    right: 0.8rem;
  }
}
::v-deep .van-tabs__line {
  bottom: 1.25rem;
  width: 2rem;
}
</style>