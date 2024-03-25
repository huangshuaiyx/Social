<template>
    <div class="contactcustomerservice" @click="downkeyboard">
        <div class="nametext">
            <textarea @blur="onblur" @focus="nametextinp" v-model="content" rows="10" maxlength="200" :placeholder="$t('customerservice.placeholderName')"></textarea>
            <div class="leng">{{ content.length }}/200</div>
        </div>
        <div class="album">
            <div class="album-div">
                <p v-show="imageList == null ? 1 : imageList.length < 1" @click.stop="album">
                    <img @dragstart.prevent class="img" src="@/assets/upload@2x.png" />
                </p>
                <!-- <div>{{ imageList }}</div> -->
                <p v-for="(x, i) in imageList" :key="i">
                    <van-image @dragstart.prevent :src="x" fit="cover">
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <img @dragstart.prevent class="delImg" src="@/assets/del.png" alt="" @click="delImgs(i)" />
                </p>
            </div>
        </div>
        <button :class="disabled == true ? 'button' : 'buttons'" @click="onoK">
            {{ t('customerservice.btnText') }}
        </button>
    </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { showToast } from "vant";
import { onBeforeMount, onMounted, ref, toRefs, watch, computed, reactive } from "vue";
import {
    chooseAndUpload,
    networkRequest,
    setTitleBar,
    close,
    JumpH5,
    nativeEnv,
    hidekeyboard
} from "@/api/index";
import { useStore } from 'vuex'
const store = useStore()
const { t, locale } = useI18n()
const CallBackName = store.state.unifyCallBackName
let content = ref('')
let disabled = ref(false)
let title = ref('')
let imageList = reactive([])
let time = new Date().getTime()
watch(content, (newval) => {
    if (newval) {
        if (newval.replace(/\s/g, "")) {
            disabled.value = true;
        }
    } else {
        disabled.value = false;
    }
})
onBeforeMount(() => {

    if (content.value) {
        disabled.value = true;
    } else {
        disabled.value = false;
    }
})
onMounted(() => {
    buryingpoint()
    appLanguages()
    setHeader()
})
const setHeader = () => {
    title = t('customerservice.toptitle')
    setTitleBar(title, 'FFFFFFFF', 'FF1D1F29', '', res => { });
}
const downkeyboard = () => {
    hidekeyboard()
}
const buryingpoint = () => {
    let totalTmie = new Date().getTime();
    let obj = {
        event: "HP1701000",
        type: "load",
        cost: time,
        totalCost: totalTmie,
    };
    store.dispatch("onStatistics", obj)
}
const nametextinp = () => {
    let obj = {
        event: "HE0007002",
        type: "click",
    };
    store.dispatch("onStatistics", obj);
    // btnshow.value = false
}
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
const onblur = () => {

}
const onoK = () => {
    window.preReClick(oK)
}
const oK = () => {
    if (content.value != "") {
        let obj = {
            event: "HE0007004",
            type: "click",
        };
        store.dispatch("onStatistics", obj)
        if (content.value.trim().length < 1) return
        networkRequest('v1/ums/feedback/save', {
            content: content.value,
            imageList: imageList.length > 0 ? imageList : null,
        }, (res) => {
            console.log(res, '意见fankui');
            if (res.code == 200) {
                showToast(res.msg);
                setTimeout(() => {
                    close();
                }, 2500)
            } else {
                showToast(res.msg);
            }
        })
    }
}
window.onResume = () => { }
const album = () => {
    let obj = {
        event: "HE0007003",
        type: "click",
    };
    store.dispatch("onStatistics", obj)
    chooseAndUpload("image", 1 - imageList.length, "false", '', '', '', (res) => {
        console.log(res, '上传照片');
        if (res.code == 200) {

            let types = Array.isArray(res.data);
            if (types == true) {
                res.data.map((x) => {
                    imageList.push(x);
                    console.log(imageList, 'imageList');
                });
            } else {
                imageList.push(res.data.fileUrl);
            }
        } else {
            showToast(res.msg);
        }
    })
}
// 删除图片
const delImgs = (t) => {
    imageList.splice(t, 1); //选中删除
    let obj = {
        event: "HE0007005",
        type: "click",
    };
    store.dispatch("onStatistics", obj);
}

</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
