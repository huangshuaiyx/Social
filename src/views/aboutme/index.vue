<template>
    <div id="aboutme">
        <div class="edition">
            <div>
                <img @dragstart.prevent :src="data.formData.app_logo" alt="" />
            </div>
            <p>{{ data.formData.app_name }}</p>
            <p>
                {{ data.formData.version }}
                <!-- <span>.</span>{{ data.formData.verCode }}
                <span v-show="data.formData.environment">.</span>
                {{ data.formData.environment ? data.formData.environment : "" }} -->
            </p>
        </div>
        <div class="btnagreement">
            <div class="agreement" @click="policy">
                <div>{{ t('privacyPolicy.text') }}</div>
                <img @dragstart.prevent src="@/assets/upright@2x.png" alt="" />
            </div>
            <div class="agreement" @click="user">
                <div>{{ t('UserAgreement.text') }}</div>
                <img @dragstart.prevent src="@/assets/upright@2x.png" alt="" />
            </div>
        </div>
        <!-- <div class="company">
            <p>Copyright C 2022-2023 {{ data.formData.appName }}.All Right Reserved</p>
        </div> -->
    </div>
</template>
<script setup>
import { reactive, onBeforeMount, onMounted } from 'vue';
import { JumpH5, setTitleBar, getAppInfo, nativeEnv } from '@/api/index';
// import { useRouter } from "vue-router";
// const router = useRouter();
import { useStore } from 'vuex'
const store = useStore()
import { useI18n } from "vue-i18n";
const { locale } = useI18n()
const { t } = useI18n()
let data = reactive({
    formData: {},
    time: new Date().getTime(),
    title: ""
})
onBeforeMount(() => {

})

onMounted(() => {
    buryingpoint()
    appLanguages()
    setHeader()
    getAppInfos()
})
// 语言查询
const appLanguages = () => {
    nativeEnv((res) => {
        if (res.code == 200) {
            if (['en', 'fr', 'ar', 'hi', 'pt', 'es'].includes(res.data)) {
                locale.value = res.data
                console.log('语言', res);
                localStorage.setItem("lang", res.data);
            } else {
                locale.value = 'en'
                localStorage.setItem("lang", 'en');
            }
        }
    })
}
const setHeader = () => {
    data.title = t('about.title')
    setTitleBar(data.title, 'FFFFFFFF', 'FF1D1F29', '', (res) => { })
}
const getAppInfos = () => {
    getAppInfo((res) => {
        console.log(res, '关于');
        data.formData = res
    })
}
// 埋点
const buryingpoint = () => {
    let totalTmie = new Date().getTime()
    let obj = {
        event: "HP1901000",
        type: 'load',
        cost: data.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const policy = () => {
    JumpH5('aboutme', '/privacy',)
}
const user = () => {
    JumpH5('aboutme', '/useragreement',)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
