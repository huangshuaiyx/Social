<template>
  <div id="editData">

    <div class="title" v-if="$i18n.locale == 'ar'">
      <div class="div_title">
        <div class="title-imgs" @click="save">
         {{ $t('editdata.Save') }}
        </div>
        <p>{{  $t("agree.prfile") }}</p>
        <img class="title-img title-imgar" src="../../assets/vip/return.png" alt="" @click="signout" />
      </div>
    </div>
    <div class="title" v-if="$i18n.locale != 'ar'">
      <div class="div_title">
        <img class="title-img" src="../../assets/vip/return.png" alt="" @click="signout" />
        <p>{{  $t("agree.prfile") }}</p>
        <div class="title-imgs" @click="save">
        {{ $t('editdata.Save') }}
        </div>
      </div>
    </div>

    <div class="left">

      <!-- 头像 -->
      <div class="sculpture">
        <p class="avatar-p2" @click="onCancelsavatared">
          <van-image :src="formData.face" fit="cover" radius="10">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
            <!-- <template v-slot:error>
              <van-image fit="cover" :src="require('../../assets/editData/default.png')" />
            </template> -->
          </van-image>
        </p>
      </div>
      <!-- 名字 -->
      <div class="nickname">
        <p>{{ this.$t("editdata.Nickname") }}</p>
        <p style="margin-top: 25px;">
          <input type="text" placeholder="Gender" v-model="formData.nickName" style="color:  rgba(255,255,255,1);" maxlength="20"/>
        </p>
      </div>
      <!-- 语言 -->
      <div class="language">
        <p>{{ this.$t("editdata.Language") }}</p>
        <div style="margin-top: 15px;" class="language_div">
          <p :class="formData.language == x.dictKey ? 'language_div_p1' : 'language_div_p'" v-for="(x, i) in lanList" :key="i"
            @click="languageClick(x, i)">
            {{ x.dictValue }}</p>
        </div>
      </div>
      <!-- 自我介绍   -->
      <div class="signature">
        <p>{{ this.$t("editdata.signature") }}</p>
        <p style="margin-top: 25px;">
          <van-field v-model="formData.selfIntroduction" rows="2" autosize label="" type="textarea" maxlength="200"
            placeholder="Introduce yourself" show-word-limit />
        </p>
      </div>
      <!-- 年龄   -->
      <div class="age" @click="Agebirthday">
        <p>{{ this.$t("editdata.Age") }}</p>
        <p class="age_p" style="margin-top: 25px;">{{ formData.age }}
          <img src="../../assets/editData/arrow.png" alt="">
        </p>
      </div>



      <!-- <div class="identity" @click="avtarClick">
        <p>My Avatar</p>
        <p>
          <span><img style="width: 40px;height: 40px;margin-top: 20px;" :src="formData.face" alt=""></span>
          <img src="../../assets/editData/arrow.png" />
        </p>
      </div>
      <div class="identity">
        <p>My ID</p>
        <p>
          <span style="color: rgba(102,102,102,0.5);">{{ formData.userCode }}</span>
        </p>
      </div>
      <div class="identity" @click="JumpName(formData.nickName)">
        <p>Nick name</p>
        <p>
          <span>{{ formData.nickName }}</span>
          <img src="../../assets/editData/arrow.png" />
        </p>
      </div>
      <div class="identity" @click="Agebirthday">
        <p>{{ this.$t("editdata.Age") }}</p>
        <p>
          <span>{{ formData.age }}</span>
          <img src="../../assets/editData/arrow.png" />
        </p>
      </div>
      <div class="identity" @click="regions(formData.region)">
        <p>Region</p>
        <p>
          <span>
            <img :src="formData.regionFlag" alt="" v-show="formData.regionFlag != null" />
            {{ formData.region }}
          </span>
          <img src="../../assets/editData/arrow.png" />
        </p>
      </div> -->

      <!-- Age 弹出框 -->
      <van-action-sheet v-model="showAge">
        <van-datetime-picker v-model="birthday" type="date" :title="$t('editdata.brith')" item-height="45px" :min-date="minDate"
          :max-date="maxDate" @confirm="birthdayok" @cancel="onCancel" :confirm-button-text="this.$t('editdata.Sure')"
          :cancel-button-text="this.$t('editdata.Cancel')"	/>
      </van-action-sheet>
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
  