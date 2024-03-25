<template>
    <div id="about">
        <div class="edition">
            <div class="edition_logo">
                <img src="../../../assets/appLogo.png" alt="" />
            </div>
            <p>{{ formData.appVersion }}</p>
            <p>
                <!-- {{ formData.appVersion }}.{{ formData.appVersion }} -->
                <!-- <span v-show="formData.environment">.</span> -->
                <!-- {{ formData.environment ? formData.environment : "" }} -->
            </p>
        </div>

        <div class="agreement">
            <p @click="serviceClick">{{ this.$t("about.service") }}</p>
            <p @click="PrivacyClick">{{ this.$t("about.Policy") }}</p>
        </div>
    </div>
</template>
  <script>
import index from './index.js'
export default index
  </script>
  
  <style lang="scss" scoped>
@import './index.scss';
</style>
  