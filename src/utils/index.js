import { networkRequest, getPay, getLoading, networkRequestpay } from "../api/index"
import {
    showToast,
} from "vant";
import store from '../store/index';
// 滚动到顶部
export const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

// 获取手机型号
export const getPhoneType = () => {
    var u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        // 安卓手机
        return "Android";
    } else if (u.indexOf("iPhone") > -1) {
        // 苹果手机
        return "iPhone";
    } else if (u.indexOf("iPad") > -1) {
        // iPad
        return "iPad";
    } else if (u.indexOf("Windows Phone") > -1) {
        // winphone手机
        return "winphone";
    } else {
        return "other";
    }
};
// 身高
export const heightlist = () => {
    const arr = [];
    for (let i = 140; i <= 230; i++) {
        arr.push(`${i}`);
    }
    return arr;
};
// 体重
export const weightlist = () => {
    const arr = [];
    for (let i = 40; i <= 100; i++) {
        arr.push(`${i}`);
    }
    return arr;
};

// 拼接url
export const urlEncode = (param, key, encode) => {
    if (param == null) return "";
    var paramStr = "";
    var t = typeof param;
    if (t == "string" || t == "number" || t == "boolean") {
        paramStr +=
            "&" +
            key +
            "=" +
            (encode == null || encode ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k =
                key == null
                    ? i
                    : key + (param instanceof Array ? "[" + i + "]" : "." + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
};
// url获取参数
export function getQueryString (name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r =
        window.location.search.substr(1).match(reg) ||
        window.location.hash
            .substring(window.location.hash.search(/\?/) + 1)
            .match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
}

// 苹果支付购买vip下单
export function iphoneappPay (val, buryInfo) {
    console.log(val)
    networkRequest("v2/up/vipOrder/buyVipItem", {
        ...val
    }, (resd) => {
        // store.commit('GETPAYOVER', false)
        getLoading(false, res => { })
        console.log(resd, "支付");
        if (resd.code == 200) {
            getPay("apple", {
                orderID: resd.data.payOrderNo,
                sku: resd.data.bizItemId,
                type: 'vip'
            }, (res) => {
                console.log({ orderID: resd.data.body, sku: resd.data.bizItemId, }, '苹果参数', res, "苹果");
                if (res.code == 200) {
                    // if (![1, 2].includes(buryInfo.isclose)) {
                    //     close()
                    // }
                    store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1100003",
                        remark: { Pcode: buryInfo.Pcode, productId: val.productId, type: buryInfo.type },
                    });
                } else {
                    showToast(res.msg);
                    store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1100004",
                        err: { code: res.code, body: res.msg, Pcode: buryInfo.Pcode },
                    });
                }
            })
        } else {
            showToast(resd.msg);
        }
    })
    // networkRequestpay('https://socialcallback.akuragroup.com/api/v2/up/vipOrder/buyVipItem', 'buyVipItemcallblack', {
    //     ...val
    // })
}
// goge购买商品vip下单
export function googleappPay (val, buryInfo) {
    networkRequest("v2/up/vipOrder/buyVipItem", {
        ...val
    }, (resd) => {
        console.log(resd, "下单vip");
        // store.commit('GETPAYOVER', false)
        getLoading(false, res => { })
        if (resd.code == 200) {
            let skuType = "INAPP";
            if (val.subscribeType == 1) {
                skuType = "INAPP";
            } else {
                skuType = "SUBS";
            }
            getPay("google", {
                orderID: resd.data.payOrderNo,
                sku: resd.data.bizItemId,
                skuType: skuType,
                type: 'vip'
            }, (res) => {
                console.log(res, '谷歌回调');
                if (res.code == 200) {
                    store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1100003",
                        remark: { Pcode: buryInfo.Pcode, productId: val.productId, type: buryInfo.type },
                    });
                    // if (![1, 2].includes(buryInfo.isclose)) {
                    //     close()
                    // }
                } else {
                    if (res.msg != "") {
                        showToast(res.msg);
                    }
                    store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1100004",
                        err: { code: res.code, body: res.msg, Pcode: buryInfo.Pcode },
                    });
                }
            })
        } else {
            showToast(resd.msg);
        }
    })
}

// goge购买商品金币下单
export function googleappPaycoins (val, buryInfo) {
    console.log(val, 'val');
    networkRequest("v1/wallet/rechargeorder/unifiedorder", {
        ...val
    }, (resd) => {
        console.log(resd, "谷歌支付");
        // store.commit('GETPAYOVER', false)
        getLoading(false, res => { })
        if (resd.code == 200) {
            getPay("google", {
                orderID: resd.data.body,
                sku: resd.data.bizItemId,
                type: 'coins'
            }, (res) => {
                if (res.code == 200) {
                    // store.commit('GETPAYOVER', false)
                    // if (![1, 2].includes(buryInfo.isclose)) {
                    //     close()
                    // }
                    store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1100003",
                        remark: { Pcode: buryInfo.Pcode, productId: val.productId, type: buryInfo.type },
                    });
                } else {
                    if (res.msg != "") {
                        showToast(res.msg);
                    }
                    store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1100004",
                        err: { code: res.code, body: res.msg, Pcode: buryInfo.Pcode },
                    });
                }
            })
        } else {
            if (resd.msg != "") {
                showToast(resd.msg);
            }
        }
    })
}

//苹果支付购买商品金币下单
export function iphoneappPaycoins (val, buryInfo) {
    console.log(val)
    networkRequest("v1/wallet/rechargeorder/unifiedorder", {
        ...val
    }, (resd) => {
        console.log(resd, "支付");
        // store.commit('GETPAYOVER', false)
        getLoading(false, res => { })
        if (resd.code == 200) {
            getPay("apple", {
                orderID: resd.data.body,
                sku: resd.data.bizItemId,
                type: 'coins'
            }, (res) => {
                console.log(res, "苹果");
                if (res.code == 200) {
                    // if (![1, 2].includes(buryInfo.isclose)) {
                    //     close()
                    // }
                    store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1100003",
                        remark: { Pcode: buryInfo.Pcode, productId: val.productId, type: buryInfo.type },
                    });
                } else {
                    showToast(res.msg);
                    store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1100004",
                        err: { code: res.code, body: res.msg, Pcode: buryInfo.Pcode },
                    });
                }
            })
        } else {
            showToast(resd.msg);
        }
    }
    )
    // networkRequestpay("https://socialcallback.akuragroup.com/api/v1/wallet/rechargeorder/unifiedorder", 'walletcallblack', {
    //     ...val
    // })
}
