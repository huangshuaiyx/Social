<template>
  <div class="customerservice" :style="{'background': style.bg}">
    <Title :titlecen="titlecen"></Title>

    <div class="customerservice_text">
      Feel free to share any queries or recommendations you may have, and rest assured, we will endeavor to provide timely responses within our working hours. Your feedback is valuable to us!
    </div>
    <div class="nametext" :style="{'background': style.textareabg}">
      <textarea @focus="nametextinp" v-model="content" rows="10" maxlength="500"></textarea>
      <p>{{ content.length }}/500</p>
    </div>

    <div class="album">
      <div class="album-div">
        <p v-show="imageList == null ? 1 : imageList.length < 4" @click="album">
          <img class="img" src="../../../assets/public/add.png" />
        </p>
        <p v-for="(x, i) in imageList" :key="i">
          <van-image :src="x" fit="cover">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <img class="delImg" src="../../../assets/delImg.png" alt="" @click="delImgs(i)" />
        </p>
      </div>
    </div>

    <button :class="disabled == true ? 'button' : 'buttons'" @click="oK">
      Submit
    </button>
  </div>
</template>
<script>
import index from "./index.js";
export default index;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
