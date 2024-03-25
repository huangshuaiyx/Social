<template>
    <div class="avatar" :style="{ 'background': style.bg }">
        <div class="title" v-if="$i18n.locale != 'ar'">
            <img class="title-img" src="../../assets/public/return.png" alt="" @click="goBack" />
            <p>{{ this.$t("editdata.avatar") }}</p>
            <div class="title-imgs">
            </div>
        </div>
        <div class="title" v-else>
            <div class="title-imgs">
            </div>
            <p>{{ this.$t("editdata.avatar") }}</p>
            <img class="title-img" src="../../assets/public/returnright.png" alt="" @click="goBack" />
        </div>
        <div class="avatar_img">
            <van-image :src="formData.face" fit="cover" class="avatar_img_img" radius="15px">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
            <img class="avatar_img_imga" src="../../assets/editData/edit.png" alt="" @click="onCancelsavatared">
        </div>
        <div class="avatar_div">
            <img src="../../assets/editData/avtarone.png" alt="">
            <img src="../../assets/editData/avtartwo.png" alt="">
            <img src="../../assets/editData/avtarthree.png" alt="">
        </div>
        <p class="avatar_p">
            Please upload a
            <span>clear</span>
            and
            <span>beautiful</span>
            photo of
            <span>yourself</span>
        </p>
    </div>
</template>

<script>
import {
    close,
    networkRequest,
    chooseAndUpload,
    update,
    setTitleBar,
} from "../../api/inedx";
import { Toast } from "vant";

export default {
    data() {
        return {
            formData: {},
            titlecen: this.$t("editdata.avatar"),
            style: {}
        }
    },
    created() {
        let asd = require('../../JSON/public.json')
        this.style = asd
        update("reloadData");
        this.$store.dispatch("appLanguages");
        this.$i18n.locale = this.$store.state.appLanguage;
        setTitleBar("", false, false);
        this.editData();
    },
    methods: {
        editData() {
            networkRequest("v2", '/ums/info/getUserPersonalEdit').then((res) => {
                console.log(res)
                if (res.code == 200) {
                    this.formData = res.data;
                    console.log(this.formData);
                } else if (res.code == 40006) {
                    Toast.fail(res.msg);
                    setTimeout(() => {
                        close();
                    }, 1500);
                }
            });
        },
        onCancelsavatared() {
            chooseAndUpload("image", "1", "false", "true").then((res) => {
                console.log(res, '头像')
                if (res.code == 200) {
                    networkRequest("v2", '/ums/info/updateUmsInfo', {
                        face: res.data[0].fileUrl,
                    }).then((res) => {
                        if (res.code == 200) {
                            this.editData();
                        } else {
                            Toast.fail(res.msg);
                        }
                    });
                } else {
                    Toast(res.msg);
                }
            });
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}


</script>
  
<style lang="scss" scoped>
.avatar {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .avatar_img {
        width: 250px;
        height: 325px;
        margin: 80px auto 0;
        border-radius: 15px;
        position: relative;
        overflow: hidden;

        .avatar_img_imga {
            width: 35px;
            height: 35px;
            position: absolute;
            top: 0;
            right: 0;
        }

        .avatar_img_img {
            width: 100%;
            height: 100%;
            border-radius: 15px;
        }
    }

    .avatar_div {
        width: 250px;
        height: 94px;
        display: flex;
        margin: 12px auto 0;
        justify-content: space-around;

        img {
            width: 75px;
            height: 94px;
        }
    }

    .avatar_p {
        width: 100%;
        text-align: center;
        font-size: 12px;
        font-family: 'Arial-Regular, Arial';
        font-weight: 400;
        color: #222;
        margin-top: 20px;

        span {
            color: #FF63A0;
        }
    }

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
}
</style>
  