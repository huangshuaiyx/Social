<template>
  <div id="editData" :style="{ 'background': styles.bg }">
    <Title :titlecen="this.$t('agree.prfile')"></Title>

    <div class="left">
      <div class="identity" @click="avtarClick">
        <p>{{ this.$t("editdata.avatar") }}</p>
        <p>
          <span><img style="width: 40px;height: 40px;margin-top: 10px;" :src="formData.face" alt=""></span>
          <img src="../../assets/editData/arrow.png" />
        </p>
      </div>
      <!-- ID -->
      <div class="identity">
        <p>{{ this.$t("editdata.ID") }}</p>
        <p>
          <span style="color: rgba(102,102,102,0.5);">{{ formData.userCode }}</span>
        </p>
      </div>
      <!-- Nickname -->
      <div class="identity" @click="JumpName(formData.nickName)" v-preventReClick="2000">
        <p>{{ this.$t("editdata.Nickname") }}</p>
        <p>
          <span>{{ formData.nickName }}</span>
          <img src="../../assets/editData/arrow.png" />
        </p>
      </div>

      <!-- Age -->
      <div class="identity" @click="Agebirthday">
        <p>{{ this.$t("editdata.Age") }}</p>
        <p>
          <span>{{ formData.age }}</span>
          <img src="../../assets/editData/arrow.png" />
        </p>
      </div>
      <!-- Region -->
      <div class="identity" @click="regions(formData.region)">
        <p>{{ this.$t("editdata.Region") }}</p>
        <p>
          <span>
            <img :src="formData.regionFlag" alt="" v-show="formData.regionFlag != null" />
            {{ formData.region }}
          </span>
          <img src="../../assets/editData/arrow.png" />
        </p>
      </div>

      <!-- Age 弹出框 -->
      <van-action-sheet v-model="showAge">
        <van-datetime-picker v-model="birthday" type="date" title="Date of Birth" item-height="45px" :min-date="minDate"
          :max-date="maxDate" @confirm="birthdayok" @cancel="onCancel" :confirm-button-text="this.$t('editdata.Sure')"
          :cancel-button-text="this.$t('editdata.Cancel')" />
      </van-action-sheet>
      <!-- Region 弹出框 -->
      <van-popup class="popup" position="bottom" v-model="showRegion">
        <div style="font-size: 17px;font-weight: 700;color: #222222;margin: 20px 0 0 0;text-align: center;width: 100%;">
          Country
        </div>
        <div class="region_popup"  @click="radioclick(areaForm.country)">
          <p>
            <img :src="areaForm.flag" alt="" />
            <span>{{ areaForm.country }}</span>
          </p>
          <img class="paymentmethodimg" src="../../assets/editData/Unselected.png" alt="" v-if="sueRadio == true"
            />
          <img class="paymentmethodimg" src="../../assets/editData/Selected.png" alt="" v-else
            />
        </div>
        <div class="botton_div">
          <div class="button" @click="showRegion = false">
            {{ this.$t("editdata.Cancel") }}
          </div>
          <div class="buttons" @click="Confirm">
            {{ this.$t("editdata.Sure") }}
          </div>
        </div>


      </van-popup>
    </div>
  </div>
</template>
<script>
import index from "./index.js";

export default index;
</script>
  
<style lang="scss" scoped>
@import "./index.scss";
</style>
  