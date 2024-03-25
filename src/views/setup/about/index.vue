<template>
    <div id="about" :style="{'background': style.bg}">
        <Title :titlecen="titlecen"></Title>

        <div class="edition">
            <div class="edition_logo">
                <img :src="formData.appLogo" alt="" />
            </div>
            <p>{{ formData.appName }}</p>
            <p>Make chat borderless</p>
            <p>
                {{ formData.verName }}.{{ formData.verCode }}
                <span v-show="formData.environment">.</span>
                {{ formData.environment ? formData.environment : "" }}
            </p>
        </div>

        <!-- <div class="agreement">
            <p @click="serviceClick">Terms of service</p>
            <p @click="PrivacyClick">Privacy Policy</p>
        </div> --> 
    </div>
</template>
  <script>
import index from './index.js'
export default index
  </script>
  
  <style lang="scss" scoped>
@import './index.scss';
</style>
  