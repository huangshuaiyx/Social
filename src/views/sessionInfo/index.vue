<!-- <style lang="scss" scoped>
.session {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    overflow: hidden;

    .sessiondialog {

        width: 100%;
        padding: 0px 38px;
        position: absolute;
        box-sizing: border-box;
        text-align: center;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .sessionInfo {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            background: url('../../assets/sessionInfobgc@2x.png') no-repeat center;
            background-size: 100%;

            .title {
                font-size: 17px;
                font-weight: normal;
                color: #FFFFFF;
                padding-top: 20px;
            }

            .img {
                width: 100%;
                display: block;

                .van-swipe-item-div {
                    margin-top: 26px;

                    img {
                        width: 130px;
                        height: 120px;
                    }
                }

                .van-swipe {
                    height: 210px;
                }

                .van-swipe-item {
                    height: 210px;
                }
            }

            .recharge {
                margin: 0 auto;
                width: 190px;
                height: 63px;
                line-height: 63px;
                font-size: 14px;
                color: #fff;
                font-weight: 600;
                background: url('../../assets/bugvip@2x.png') no-repeat center;
                background-size: 100% 100%;
            }

            .monry {
                color: #666;
                font-size: 14px;
                padding: 10px 0px;
            }
        }


    }
}
</style> -->
<!-- <template>
    <div
        class="session"
        @click="closeDialog"
    >
        <div class="sessiondialog">
            <div
                class="sessionInfo"
                @click.stop="sessionInfo"
            >
                <div class="title">Bacome VIP</div>
                <div class="img">
                    <van-swipe
                        indicator-color="#999DB9"
                        :autoplay="3000"
                    >
                        <van-swipe-item
                            v-for="(x, i) in data.equityList"
                            :key="i"
                        >
                            <div class="van-swipe-item-div">
                                <img
                                    :src="x.iconActive"
                                    alt=""
                                />
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <div
                    class="recharge"
                    @click.stop="recharge"
                >Recharge</div>
                <div class="monry">*$9.99/Month</div>
            </div>
        </div>
    </div>
</template> -->

<!-- <script setup>
import { googleappPay } from '@/utils/index'
import { close, JumpH5, networkRequest } from "@/api/index";
import { reactive, onBeforeMount,onMounted } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();

import { useStore } from 'vuex'
const store = useStore() -->
<!-- // 会话点击
// var dsBridge = require("dsbridge");

const data = reactive({
    equityList: [
        {
            iconActive: 'https://img0.baidu.com/it/u=3425868493,3104015061&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1684342800&t=cba44997b3c23f8aa355a12c9cf6a05a'
        }, {
            iconActive: 'https://img0.baidu.com/it/u=3425868493,3104015061&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1684342800&t=cba44997b3c23f8aa355a12c9cf6a05a'
        },
        {
            iconActive: 'https://img0.baidu.com/it/u=3425868493,3104015061&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1684342800&t=cba44997b3c23f8aa355a12c9cf6a05a'
        }, {
            iconActive: 'https://img0.baidu.com/it/u=3425868493,3104015061&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1684342800&t=cba44997b3c23f8aa355a12c9cf6a05a'
        }
    ],
    time: new Date().getTime()
}) -->
<!-- onBeforeMount(() => {
    let num = 'v1'
    let url = '/ums/info/umsInfoByVipPage'
    let params = {}
    networkRequest(num, url, params).then((res) => {
        if (res.code == 200) {
            data.equityList = res.data.menuTrees;
        }
    });
})
onMounted(()=>{
    let totalTmie = new Date().getTime()
        let obj = {
            event: "HP2300100",
            type: 'load',
            cost: data.time,
            totalCost: totalTmie,
        }
        store.dispatch("onStatistics",obj)
})
const closeDialog = () => {
    close()
}
const sessionInfo = () => {
    return
}
const recharge = () => {
    // dsBridge.call("nativeEnv")
    let num = 'v1'
    const url = '/url'
    const params = {}
    networkRequest(num, url, params).then((res) => {
        if (res.code == 200) {
            if (res.data.status = '1') {
                const value = {}
                let res = googleappPay(value)
                if (res.code == 200) {
                    close()
                }
            } else {
                JumpH5('/vip')
            }
        }
    });
    // JumpH5('./跳转vip页面渠道')
        let obj = {
            event: "HE0013001",
            type: 'click',
        }
        store.dispatch("onStatistics",obj)
}
</script> -->