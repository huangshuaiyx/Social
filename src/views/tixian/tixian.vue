<template>
  <div style="background:#f6f6f6;height:100%;box-sizing: border-box;width:100%">
    <van-nav-bar title="提现" @click-left="$router.go(-1)">
      <template #left>
        <van-icon size="1.5rem" name="arrow-left" color="#000000" />
      </template>
    </van-nav-bar>
    <!-- 提现金额 -->
    <div class="tixianone">
      <p style="font-size:0.82rem;opactiy:0.2">
        <span>可提现金额</span>
        <span @click="$router.push({name:'withdrawn'})">提现明细</span>
      </p>
      <p>¥{{Number(jine).toFixed(2)}}</p>
    </div>
    <!-- 提现到 -->
    <div class="tixianto">
      <figure>
        <p class="tixianFp">提现到</p>
        <figcaption>
          <p>
            <span>
              <img src="../../assets/提现支付宝icon@2x.png" alt />
            </span>
            <span v-if="show" style="marginLeft:0">您暂未绑定支付宝</span>
            <span class="span" v-if="showone">{{zhanghao}}({{(name)}})</span>
          </p>

          <p @click="bind">
            {{bang}}
            <span class="bangSpan">></span>
          </p>
        </figcaption>
      </figure>
    </div>
    <!-- 提现金额 -->
    <div class="tixianjine">
      <figure>
        <p style="color: #d6d6d6;font-size:0.72rem">提现金额</p>
        <figcaption>
          <p>
            <span>¥</span>
            <van-cell-group :border="false">
              <van-field
                v-model="value"
                type="number"
                placeholder="最低0.1元,最高1000元"
                @input="inputVal"
                label-align
                :clearable="true"
                step="0.01"
                maxlength="11"
                @clear = "clearw"
              />
            </van-cell-group>
          </p>
          <p @click="allWithdrawal(value)">全部提现</p>
        </figcaption>
      </figure>
    </div>
    <p v-if="chaochu" style="color:red;margin: 0.81rem;font-size:0.72rem">输入金额超出可提现金额</p>
    <!-- <p v-if="zuidi" style="color:red;margin: 0.81rem;font-size:0.72rem">提现金额不得少于5元</p> -->

    <van-button class="land" @click="land" type="primary" :disabled="disabled">确认提现</van-button>

    <!-- 注意事项 -->
    <div class="matter">
      <p>注意事项:</p>
      <p>1、单笔最高提现1000元。</p>
      <p>2、单日提现笔数不超过3笔。</p>
      <p>3、已失效订单(退货/退款)没有返利。</p>
      <p>
        4、如有疑问，请联系客服微信:
        <span class="tag-read" data-clipboard-text="mcshengo" @click="copy">mcshengo</span>。
      </p>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard"; //点击复制
import { withdrawPrice, getUserOrderPrice, getBindPayInfo } from "@/api/api.js";
import { Toast } from "vant";
let ob = JSON.parse(localStorage.getItem("jd-webapp"));
let obo = JSON.parse(localStorage.getItem("zf-webapp"));

export default {
  data() {
    return {
      show: true,
      jine: "",
      showone: false,
      zhanghao: "",
      name: "",
      bang: "去绑定",
      value: "", //内容框的值
      chaochu: false, //超出提示
      disabled: true, //按钮是否禁用
      success: "",
    };
  },
  mounted() {
    //查询支付宝信息
    getBindPayInfo({
      userId: this.$store.state.userId && this.$store.state.userId,
    }).then((res) => {
      if (res.data.code == 0) {
        if (res.data.data.payInfoList != 0) {
          let str = res.data.data.payInfoList[0];
          this.show = false;
          this.showone = true;
          this.bang = "修改";
          this.zhanghao = str.payAccountInfo;
          this.name = str.payUsername;
        }
      } else {
        this.show = true;
        this.disabled = true;
        Toast(res.data.message);
      }
    });
    //获取提现金额
    getUserOrderPrice().then((res) => {
      this.jine = res.data.data.balance;
    });
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    // 退出
    tui() {
      this.$router.push({ name: "may" });
    },
    //确认提现
    land() {
      if (this.value < 0.1) {
        Toast("单笔最低提现0.1元");
      } else {
        if (obo != null) {
          withdrawPrice({
            price: Number(this.value),
            payAccountId: obo.payAccountId,
            userId: ob.userid,
          }).then((res) => {
            if (res.data.code == 0) {
              this.$router.push({
                name: "applyok",
                query: { value: this.value,businessId:res.data.data.businessId },
              });
            } else {
              Toast(res.data.message);
            }
          });
        } else {
          Toast("您未绑定支付宝");
        }
      }
    },
    // 点击修改支付宝
    bind() {
      if (this.bang == "修改") {
        this.$router.push({ name: "modify" });
      } else if (this.bang == "去绑定") {
        this.$router.push({ name: "zhifubao" });
      }
    },
    //全部提现
    allWithdrawal(value) {
      this.chaochu = false;
      this.value = this.jine;
      if (obo == null) {
        this.disabled = true;
        Toast("您未绑定支付宝");
      } else {
        getBindPayInfo({
          userId: this.$store.state.userId && this.$store.state.userId,
        }).then((res) => {
          if (res.data.code != 0) {
            this.disabled = true;
          } else {
            getUserOrderPrice().then((res) => {
              this.jine = res.data.data.balance;
              if (this.value < 0.1) {
                this.disabled = true;
              } else {
                this.disabled = false;
              }
            });
          }
        });
      }
    },
    //清除按钮
    clearw(e){
      this.disabled = true
    },
    //内容变化触发
    inputVal() {
      this.value = this.dealInputVal(this.value);
      let Money =  Number(this.value)
      if(this.value == ""){
        this.disabled = true
      }else{
        this.disabled = false
      }
      if (Money > 0 && Money <= 0.1) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
      if (Money > this.jine) {
        this.chaochu = true;
        this.disabled = true;
      } else {
        this.chaochu = false;
        this.disabled = false;
      }
    },
    dealInputVal(value) {
      value = value.replace(/^0*(0\.|[1-9])/, "$1");
      value = value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
      value = value.replace(/^\./g, ""); //验证第一个字符是数字而不是字符
      value = value.replace(/\.{1,}/g, "."); //只保留第一个.清除多余的
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      value = value.replace(/^(\-)*(\d*)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      value =
        value.indexOf(".") > 0
          ? value.split(".")[0].substring(0, 10) + "." + value.split(".")[1]
          : value.substring(0, 12);
      return value;
    },
    //粘贴复制
    copy(data) {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", (e) => {
        Toast("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        Toast("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sAll {
  display: flex;
  background: #f6f6f6;
}
h4 {
  margin-top: 0.4rem;
  margin-left: 2.3rem;
  font-size: 1.13rem;
  margin-top: 1.3rem;
}

.ok {
  width: 2.81rem;
  height: 2rem;
  border: solid 0.06rem #f0f0f0;
  border-radius: 1rem;
  margin: 0 0.72rem;
  background: #f0f0f0;
  margin-top: 1rem;
}
.ok img:nth-of-type(1) {
  width: 1rem;
  height: 1rem;
  margin-left: 0.81rem;
  margin-top: 0.2rem;
  vertical-align: sub;
}
.ok span {
  width: 1rem;
  height: 1rem;
  margin-top: 0.2rem;
}
.ok span:nth-of-type(2) {
  text-align: center;
  font-size: 1rem;
  font-weight: 300;
  margin-top: 1rem;
  margin-left: 0.2rem;
  color: #c2c2c2;
}
/* 提现 */
.tixianone {
  width: 100%;
  height: 8rem;
  background-image: linear-gradient(to right, #fe0c02, #ff6303);
  padding: 0;
}
.tixianone p:nth-child(1) {
  /* width: 7.69rem; */
  height: 1.38rem;
  font-size: 1rem;
  margin: -1rem 0.72rem 1.22rem;
  padding-top: 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  span:nth-child(2) {
    background: white;
    border-radius: 1rem;
    width: 4.2rem;
    text-align: center;
    line-height: 1.5rem;
    color: #ff6303;
  }
}
.tixianone p:nth-child(2) {
  width: 8.13rem;
  height: 1.13rem;
  color: white;
  font-size: 1.3rem;
  margin: 0 0.72rem 1.22rem;
}
/* 提现到 */
.tixianto {
  width: 100%;
  height: auto;
  margin: 0.72rem 0;
  padding: 0;
  border: solid 1px white;
  box-sizing: border-box;
  background: white;
}
.tixianto figure {
  margin: 0;
  padding: 0.5rem;
}
.tixianto figcaption {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  font-size: 0.88rem;
  width: 94%;
}
.tixianto img {
  width: 1.88rem;
  height: 1.88rem;
  vertical-align: middle;
}
.tixianFp {
  color: #d6d6d6;
  font-size: 0.72rem;
  padding: 0 0.75rem;
}
.tixianto figcaption p:nth-child(2) {
  color: #fe0c02;
  line-height: 2rem;
  display: flex;
  justify-content: space-around;
}
.bangSpan {
  color: #999;
  font-size: 1.3rem;
  position: relative;
  top: 0;
  display: block;
}
.tixianjine {
  width: 100%;
  height: auto;
  margin: 0.72rem 0 1.5rem;
  padding: 0;
  border: solid 1px white;
  box-sizing: border-box;
  background: white;
}
.tixianjine figure {
  margin: 0 0.72rem;
  padding: 0;
}
.tixianjine p {
  font-size: 1rem;
  margin: 0.5rem 0.5rem 0;
}
.tixianjine figcaption {
  display: flex;
  justify-content: space-between;
}
.tixianjine p {
  display: flex;
}
.tixianjine p span:nth-child(1) {
  font-size: 1rem;
  width: 0.94rem;
  height: 2.06rem;
  color: #333333;
  display: block;
  margin-top: 0.2rem;
}
.tixianjine input {
  width: 10.63rem;
  height: 2.06rem;
  border: none;
  font-size: 1rem;
}
.tixianjine p:nth-child(2) {
  font-size: 0.88rem;
  color: #fe0c02;
  margin-top: 0.2rem;
}
.van-cell {
  padding: 0;
}
.land {
  width: 90%;
  height: 2.72rem;
  background: #fe0c02;
  border-radius: 1.38rem;
  color: white;
  border: none;
  margin: 0 1.25rem 1rem;
}
.van-cell-group {
  width: 14rem;
  padding: 0 0.2rem;
}
//注意事项
.matter {
  width: 100%;
  height: auto;
  font-size: 0.72rem;
  padding: 2rem 1rem;
  box-sizing: border-box;
  color: #999;
  p {
    padding: 0.22rem 0;
    &:nth-of-type(1) {
      padding: 0.372rem 0 0.22rem 0;
    }
  }
  span {
    border-bottom: solid 1px;
    border-bottom-color: #666;
  }
}
</style>