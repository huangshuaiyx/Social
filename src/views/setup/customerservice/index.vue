<template>
    <div class="customerservice">
        <div class="title titlear" v-if="$i18n.locale == 'ar'">
            <p>{{ this.$t("customerservice.title") }}</p>
            <img class="title_img2" src="../../../assets/customer/setup.png" alt="">
            <img class="title_img1 title_img1ar" src="../../../assets/customer/return.png" alt="" @click="signout">
        </div>
        <div class="title" v-if="$i18n.locale != 'ar'">
            <img class="title_img1 " src="../../../assets/customer/return.png" alt="" @click="signout">
            <img class="title_img2" src="../../../assets/customer/setup.png" alt="">
            <p>{{ this.$t("customerservice.title") }}</p>
        </div>
        <div class="customerservice_text customerservice_textar" v-if="$i18n.locale == 'ar'">
            {{ this.$t("customerservice.topTxet1") }}
        </div>
        <div class="customerservice_text" v-if="$i18n.locale != 'ar'">
            {{ this.$t("customerservice.topTxet1") }}
        </div>
        <div class="nametext" v-if="$i18n.locale != 'ar'">
            <textarea @focus="nametextinp" v-model="content" rows="10" maxlength="500"></textarea>
            <p>{{ content.length }}/500</p>
        </div>
        <div class="nametextar" v-if="$i18n.locale == 'ar'">
            <textarea dir="rtl" @focus="nametextinp" v-model="content" rows="10" maxlength="500"></textarea>
            <p>500/{{ content.length }}</p>
        </div>

        <div class="album" v-if="$i18n.locale != 'ar'">
            <p class="album_p1" v-show="imageList == null ? 1 : imageList.length < 4" @click="album">
                <img class="img" src="../../../assets/report/repotAdd.png" />
            </p>
            <p class="album_p2" v-for="(x, i) in imageList" :key="i">
                <van-image :src="x" fit="cover" :radius="10">
                    <template v-slot:loading>
                        <img src="../../../assets/customer.png" alt="">
                    </template>
                </van-image>
                <img class="delImg" src="../../../assets/delImg.png" alt="" @click="delImgs(i)" />
            </p>
        </div>
        <div class="album" v-if="$i18n.locale == 'ar'">
            <p class="album_p2" v-for="(x, i) in imageList" :key="i">
                <van-image :src="x" fit="cover" :radius="10">
                    <template v-slot:loading>
                        <img src="../../../assets/customer.png" alt="">
                    </template>
                </van-image>
                <img class="delImg" src="../../../assets/delImg.png" alt="" @click="delImgs(i)" />
            </p>
            <p class="album_p1 album_ar" v-show="imageList == null ? 1 : imageList.length < 4" @click="album">
                <img class="img" src="../../../assets/report/repotAdd.png" />
            </p>
        </div>
        <button :class="disabled == true ? 'button' : 'buttons'" @click="oK">
            {{ this.$t("customerservice.topTxet2") }}
        </button>
    </div>
</template>
<script>
import index from "./index.js";
export default index;
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
