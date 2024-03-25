const public = {
    googlepays(val) {
        console.log(val, 'qweqwe')
        api.getPay({
            productId: val.productId,
            subscribeType: val.subscribeType,
            currency: val.currency,
            payChannelConfigId: val.payChannelConfigId,
            payChannelId: val.payChannelId,
            payChannelCode: val.payChannelCode,
        }).then((res) => {
            console.log(res)
            if (res.code == 200) {
                console.log(res)
            } else {
                if (res.msg != "" || res.code == 1000) {
                    Toast(res.msg);
                }
                networkRequest("v4", "/wallet/googlePay/inform", {
                    errorMsg: res.msg,
                    errorCode: res.code,
                });
            }
        });
    },
    // 埋点
    onStatistics(x) {
        api.networkRequest("/v2/trace/record/sendTraceRecord", {
            event: x.event,
            type: x.type,
            pgName: window.location.pathname,
            pgCode: window.location.pathname,
            bizId: x.bizId || '',
            cost: 0,
            totalCost: 0,
            err: JSON.stringify(x.err) || '',
            remark: JSON.stringify(x.remark) || '',
            userId: x.userId || '',
            activeTime: x.activeTime || 0,
            registerTime: x.registerTime || 0,
            dt: new Date().getTime(),
            tag: x.tag || '',
            extra: x.extra || '',
            resp: JSON.stringify(x.resp) || '',
        }, true).then(res => {
            console.log(res, x.event, '埋点')
        })
    },
    // 地址参数
    getQueryString(name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r =
            window.location.search.substr(1).match(reg) ||
            window.location.hash
                .substring(window.location.hash.search(/\?/) + 1)
                .match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
    },

    // 第三方下单
    placeOrder(val) {
        this.loading = true;
        api.networkRequest("/v3/wallet/rechargeorder/thirdPayUnifiedOrderByItemAmount", val).then((res) => {
            console.log(res, "下单");
            if (res.code == 200) {
                api.Jumpbrowser(res.data.outPaymentUrl);
            } else {
                Toast(res.msg);
            }
        });
    },
    // 下单Vip
    placeOrderVip(val) {
        this.loading = true;
        api.networkRequest("/v2/up/vipOrder/buyVipItem", val).then((res) => {
            console.log(res, "下单");
            if (res.code == 200) {
                api.Jumpbrowser(res.data.body);
            } else {
                Toast(res.msg);
            }
        });
    },
}