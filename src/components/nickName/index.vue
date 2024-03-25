<template>
  <div id="edit" :style="{ 'background': style.bg }">
    <div class="title" v-if="locale != 'ar'">
      <img class="title-img" src="../../assets/public/return.png" alt="" @click="goBack" />
      <p>{{ titlecen }}</p>
      <div class="title-imgs">
      </div>
    </div>
    <div class="title" v-else>
      <div class="title-imgs">
      </div>
      <p>{{ titlecen }}</p>
      <img class="title-img" src="../../assets/public/returnright.png" alt="" @click="goBack" />
    </div>

    <div class="left" v-if="locale != 'ar'">
      <!-- <input
        class="input"
        type="text"
        :value="text"
        @input="inputs"
        @focus="focuss"
        maxlength="30"
        :placeholder="this.$t('edit.placeholderName')"
      /> -->
      <textarea :style="{ 'background': style.textareabg }" class="input" @focus="focuss" v-model="text" rows="10"
        maxlength="30" @change="inputs" :placeholder="this.$t('edit.placeholderName')"></textarea>
    </div>
    <div class="right" v-else>
      <!-- <input
        class="input"
        type="text"
        :value="text"
        @input="inputs"
        @focus="focuss"
        :placeholder="this.$t('edit.placeholderName')"
      /> -->
      <textarea :style="{ 'background': style.textareabg }" class="input" @focus="focuss" v-model="text" rows="10"
        maxlength="30" @change="inputs" :placeholder="this.$t('edit.placeholderName')"></textarea>
    </div>

    <button :class="disabledname == false ? 'button' : 'buttons'" @click="oKtext(text)">
      {{ this.$t("edit.Sure") }}
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
