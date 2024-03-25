import CountDown from "../../components/countDown.vue";
// import SvgaComponent from "../../components/svga.vue";
import { getQueryString } from "../../utils/index";
import { notice, JumpH5, networkRequest, getPay } from "../../api/inedx";
import { Toast } from 'vant'
import SVGA from "svgaplayerweb";
export default {
    name: "floatingwindow",
    components: {
        CountDown,
        // SvgaComponent,
    },

    data() {
        return {
            // imageUrl:
            //   "https://woshimiimage.mvoicer.com/image/item/img/1560828651416.svga",
            imageUrl:
                "https://s3.vchatgood.com/otovideochat/app/recharge_backlight2.svga",
            moneyList: {
                name: null,
                currency: null,
                subscribeType: null,
                productId: null,
                price: null,
                jumpType: 1,
                itemType: 1,
                source: "",
                subSource: "",
                bizId: "",
                providerId: "",
                ext: "",
                orderType: "",
                closeParentActivity: "",
                payChannelConfigId: "",
                payChannelCode: "",
            },
            countdownShow: false,
            formData: {},
            time: null,
        };
    },
    created() {
        this.time = new Date().getTime()
    },
    mounted() {
        let totalTmie = new Date().getTime()
        let obj = {
            event: "HP2100100",
            type: 'load',
            cost: this.time,
            totalCost: totalTmie,
        }
        this.$store.dispatch("onStatistics", obj)
        let that = this;
        this.initMachineSVGA();
        this.moneyList.name = getQueryString("name");
        this.moneyList.currency = getQueryString("currency");
        this.moneyList.subscribeType = getQueryString("subscribeType");
        this.moneyList.productId = getQueryString("productId");
        this.moneyList.price = getQueryString("price") || 0;
        this.moneyList.jumpType = getQueryString("jumpType");
        this.moneyList.itemType = getQueryString("itemType");
        this.moneyList.pcode = getQueryString("pcode");
        this.moneyList.closeParentActivity = getQueryString("closeParentActivity");
        this.moneyList.payChannelConfigId = getQueryString("payChannelConfigId");
        this.moneyList.payChannelCode = getQueryString("payChannelCode");
        this.moneyList.source = getQueryString("source")
        this.moneyList.subSource = getQueryString("subSource")
        this.moneyList.bizId = getQueryString("bizId")
        this.moneyList.ext = getQueryString("ext")
        this.moneyList.providerId = getQueryString("providerId")
        this.moneyList.orderType = getQueryString("itemType") == 1 ? 'recharge' : 'vip'
        console.log(this.moneyList)
        this.dsBridge.register("notify", function (resolve) {
            let asd = JSON.parse(resolve);
            that.formData = asd.data
            console.log(asd, asd.notifyId == "ROOM_COUNT_DOWN");
            if (asd.notifyId == "ROOM_COUNT_DOWN") {
                that.countdownShow = true;
            }
        });
        networkRequest("v1", "/wallet/payOrder/source/save", this.moneyList)
    },

    methods: {
        placeClick() {
            console.log(this.moneyList.jumpType)
            this.payClick(
                this.moneyList.jumpType,
                {
                    ...this.moneyList
                },
                this.moneyList.itemType,
                'HP1401000'
            );
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0010001",
                remark: { productId: this.moneyList.productId },
            });
        },
        maskCkick() {
            notice(1)
        },
        initMachineSVGA() {
            var mycanvas = document.getElementById("demoCanvas");
            // 修改容器大小
            mycanvas.style.width = 150 + "px";
            mycanvas.style.height = 150 + "px";
            let player = new SVGA.Player("#demoCanvas");
            let parser = new SVGA.Parser("#demoCanvas");
            // this.imageUrl 定义一个参数接收url
            parser.load(this.imageUrl, function (videoItem) {
                player.setVideoItem(videoItem);
                player.startAnimation();
            });
        },

    },
};
