<template>
    <div id="edit" :style="{'background': style.bg}">
        <Title :titlecen="titlecen"></Title>

        <div class="left" v-if="locale != 'ar'">
            <div class="nametext" :style="{'background': style.textareabg}">
                <textarea @focus="textareainp" v-model="signature" rows="10" maxlength="200" @change="textareas" :placeholder="this.$t('edit.placeholderSign')"></textarea>
                <p>{{ signature.length }}/200</p>
            </div>
        </div>
        <div class="right" v-else>
            <div class="nametext" :style="{'background': style.textareabg}">
                <textarea @focus="textareainp" v-model="signature" rows="10" maxlength="200" @change="textareas" :placeholder="this.$t('edit.placeholderSign')"></textarea>
                <p>{{ signature.length }}/200</p>
            </div>
        </div>

        <button :class="disabledsignature == false ? 'button' : 'buttons'" @click="oKsignature(signature)">
            {{ this.$t("edit.Sure") }}
        </button>
    </div>
</template>
  <script>
import index from './index.js'
export default index
  </script>
  
  <style lang="scss" scoped>
@import './index.scss';
</style>
  