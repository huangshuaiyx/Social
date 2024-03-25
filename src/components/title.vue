<template>
    <div>
        <div class="title" v-if="$i18n.locale != 'ar'">
            <img class="title-img" src="../assets/public/return.png" alt="" @click="goBack" />
            <p>{{ titlecen }}</p>
            <div class="title-imgs">
            </div>
        </div>
        <div class="title" v-else>
            <p>{{ titlecen }}</p>
            <div class="title-imgs">
            </div>
            <img class="title-img" src="../assets/public/returnright.png" alt="" @click="goBack" />
        </div>
    </div>
</template>

<script>
import { close, closeNative } from "../api/inedx"
import { getQueryString } from "../utils/index";

export default {
    props: { titlecen: String },
    data() {
        return {}
    },
    created() {
        this.$store.dispatch("appLanguages");
        this.$i18n.locale = this.$store.state.appLanguage;
    },
    methods: {
        goBack() {
            if (getQueryString("closeParentActivity") == "1") {
                closeNative(getQueryString("pcode"));
                setTimeout(() => {
                    close();
                }, 20);
            } else {
                close();
            }
        }
    }
}

</script>

<style lang="scss" scoped>
.title {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-around;
    padding-top: 40px;
    position: fixed;
    top: 0;
    left: 0;

    .title-img {
        width: 30px;
        height: 30px;
    }

    p {
        width: calc(100% - 120px);
        height: auto;
        text-align: center;
        line-height: 35px;
        // margin-left: (230px/2);
        font-size: 18px;
        font-family: Arial;
        font-weight: bold;
        color: #222;
    }

    .title-imgs {
        width: 30px;
        height: 30px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>