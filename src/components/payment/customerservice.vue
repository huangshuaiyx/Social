<template>
    <div class="bottom" @click="gokefu">
        <p class="walletCommodity-p">{{ t("customer.text") }}</p>
        <p class="walletCommodity-p2">
            {{ t('customer.textlogo') }} <img @dragstart.prevent src="../../assets/walletcommodity/service.png" alt="" />
        </p>
    </div>
</template>

<script setup>
import { onMounted, defineProps } from 'vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n()
import { useStore } from 'vuex'
const store = useStore()
import { JumpH5 } from "../../api/index";
const gokefu = () => {
    window.preReClick(kefu)
}
let props = defineProps({
    sourceType: {
        type: String,
        default: ""
    },
})
onMounted(() => {
    console.log(props.sourceType, 'sourceTypesourceType');
})
const kefu = () => {
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001001",
    })
    JumpH5(props.sourceType, "/contactcustomerservice");
}
</script>

<style lang="scss" scoped>
.bottom {
    width: 100%;
    height: 50px;
    background: #252834;
    position: fixed;
    bottom: 0;
    box-shadow: 0 0 12px 12px rgba(0, 0, 0, 0.1);

    .walletCommodity-p {
        width: 100%;
        font-size: 12px;
        font-family: PingFang SC-Bold, PingFang SC;
        color: #666666;
        text-align: center;
        margin-top: 7px;
        font-weight: 600;
    }

    .walletCommodity-p2 {
        width: 100%;
        font-size: 12px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #f57b19;
        text-align: center;
        margin-top: 7px;
        margin: 5px 0 10px;
        font-weight: 700;

        img {
            width: 20px;
            height: 20px;
            vertical-align: middle;
            margin-left: 3px;
        }
    }
}
</style>