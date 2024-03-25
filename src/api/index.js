// var dsBridge = require("dsbridge");

// // 获取客户端参数      
// export const getStorage = (key) => {
//     return new Promise((resolve) => {
//         dsBridge.call("call", `/getStorage?key=${key}`, (res) => {
//             resolve(res);
//         });
//     });
// };
// 拉黑通知客户端
export const addBlacklistSuccess = (value) => {
    window.flutterReq.call('addBlacklistSuccess', { toUserId: value })
}
// 取消拉黑通知客户端
export const removeBlacklistSuccess = (value) => {
    window.flutterReq.call('removeBlacklistSuccess', { toUserId: value })
}
// 钱包/vip页面调用用客户端 不需要处理结果
export const payOrderSupplement = () => {
    window.flutterReq.call('payOrderSupplement', {})
}
// 打开客户端loading
export const getLoading = (value, callbackName) => {
    console.log('执行loading', value);
    window.flutterReq.call('loading', { isShowLoading: value }, callbackName)
}
// 获取客户端时间
export const getClientStartTime = (callbackName) => {
    let obj = {
        ts: new Date().getTime()
    }
    window.flutterReq.call('getPointInfo', obj, callbackName)
}
// 关闭键盘
export const hidekeyboard = () => {
    window.flutterReq.call('hidekeyboard', {})
    return
    console.log(`social://hidekeyboard?&ts=${new Date().getTime()}`);
    window.location.href = `social://hidekeyboard?ts=${new Date().getTime()}`
}
// 更新金币
export const goupdateCoin = (coin, callbackName) => {
    let obj = {
        coin,
    }
    window.flutterReq.call('updateCoin', obj, callbackName)
    return
    console.log(`social://updateCoin?coin=${coin}&ts=${new Date().getTime()}`);
    window.location.href = `social://updateCoin?coin=${coin}&callbackName=${callbackName}&ts=${new Date().getTime()}`
}
// 获取客户端举报参数
export const getClientBizInfo = (callbackName) => {
    window.flutterReq.call('getClientBizInfo', { type: 'report_res_info' }, callbackName)
    return
    console.log(`social://getClientBizInfo?callbackName=${val}&type=report_res_info&ts=${new Date().getTime()}`);
    window.location.href = `social://getClientBizInfo?callbackName=${val}&type=report_res_info&ts=${new Date().getTime()}`
}
// // 全局设置顶部高度
// export const onsetTopHeight = (getStatusHeight) => {
//     window.location.href = `social://getStatusHeight?callbackName=${getStatusHeight}&ts=${new Date().getTime()}`
// }
// // 支付成功或回调路由
// export const onPaySuccess = () => {
//     return window.location.href = `social://onPaySuccess`
// }
// 钱包领取金币回调客户端方法
export const onGetFreeCoinSuccess = (callbackName) => {
    window.flutterReq.call('onGetFreeCoinSuccess', {}, callbackName)
    return
    window.location.href = `social://onGetFreeCoinSuccess?callbackName=${callbackName}&ts=${new Date().getTime()}`
}
// export const setStorage = (key, val, callbackName) => {
//     console.log(`social://setStorage?key=${key}&callbackName=${callbackName}&params=${JSON.stringify(val)}&ts=${new Date().getTime()}`);
//     window.location.href = `social://setStorage?key=${key}&callbackName=${callbackName}&value=${val}&ts=${new Date().getTime()}`

// }
// export const getStorage = (key, getnumcallbackName) => {
//     window.location.href = `social://getStorage?key=${key}&callbackName=${getnumcallbackName}&ts=${new Date().getTime()}`

// }
export const networkRequest = (url, params = {}, clickName, method = 'POST') => {
    let obj = {
        url: `/api/${url}`,
        method,
        params: JSON.stringify(params),
    }
    console.log(obj, '参数');
    window.flutterReq.call('request', obj, clickName)
    return
    console.log('执行', `social://request?url=api/${num}${url}&callbackName=${clickName}&method=POST&params=${JSON.stringify(
        params
    )}&ts=${new Date().getTime()}`);
    window.location.href = `social://request?url=api/${num}${url}&callbackName=${clickName}&method=POST&params=${JSON.stringify(
        params
    )}&ts=${new Date().getTime()}`;

}
// export const networkRequestpay = (url, clickName, params = {}) => {
//     console.log('执行', `social://request?url=${url}&callbackName=${clickName}&method=POST&params=${JSON.stringify(
//         params
//     )}&ts=${new Date().getTime()}`);
//     window.location.href = `social://request?url=${url}&callbackName=${clickName}&method=POST&params=${JSON.stringify(
//         params
//     )}&ts=${new Date().getTime()}`;

// }

// 获取商品列表sku集合 google/apple
export const getGoodsListSkus = (params, callbackName) => {
    console.log(params, '获取谷歌商品');
    let obj = {
        skuList: params
    }
    window.flutterReq.call('getGoodsList', obj, callbackName)
    return
    console.log(`social://getGoodsList?skuList=${params}&callbackName=${clickName}&method=POST&ts=${new Date().getTime()}`);
    window.location.href = `social://getGoodsList?skuList=${params}&callbackName=${clickName}&method=POST&ts=${new Date().getTime()}`;
};
// 苹果恢复购买调用客户端协议
export const resumePurchase = () => {
    console.log('调用resumePurchase')
    window.flutterReq.call('resumePurchase', {})
}
// 支付 google/apple
export const getPay = (payType, params = {}, callbackName) => {
    let obj = {
        ...params,
        payType,
    }
    console.log(obj, '谷歌参数');
    window.flutterReq.call('pay', obj, callbackName)
    return
    console.log(`social://pay?payType=${payType}&params=${JSON.stringify(params)}&callbackName=${clickName}&ts=${new Date().getTime()}`);
    window.location.href = `social://pay?payType=${payType}&params=${JSON.stringify(params)}&callbackName=${clickName}&ts=${new Date().getTime()}`
};

// 关闭当前页面
export const close = () => {
    window.flutterReq.call('close', {})
    return
    console.log(`social://close?ts=${new Date().getTime()}`);
    window.location.href = `social://close?ts=${new Date().getTime()}`;
};
// 客户端匹配中调到金币页面特殊处理
export const gotoIndex = () => {
    window.flutterReq.call('gotoIndex', {})
    return
    console.log(`social://gotoIndex?ts=${new Date().getTime()}`);
    window.location.href = `social://gotoIndex?ts=${new Date().getTime()}`;

}

// 获取地址
// export const getLocation = () => {
//     return new Promise((resolve) => {
//         dsBridge.call("call", `/getLocation`, (res) => {
//             resolve(res);
//         });
//     });
// };
// // 获取首页弹窗参数
// export const getnewfree = () => {
//     return window.location.href = `social://getnewfree`
// }
export const interceptBack = () => {
    window.flutterReq.call('interceptBack', { isVip: 1 })
    return
    console.log('弹窗回调', `social://interceptBack`);
    window.location.href = `social://interceptBack?isVip=1&callbackName=${callbackName}&ts=${new Date().getTime()}`
}

// 选择图片/视频上传
export const chooseAndUpload = (
    mediaType,
    max,
    withShoot,
    type = false,
    widths = 1,
    heights = 1,
    callblack
) => {
    console.log(`social://chooseAndUpload?mediaType=${mediaType}&max=${max}&withShoot=${withShoot}&callbackName=${callblack}&enableCrop=${type}&cropRatioWidth=${widths}&cropRatioHeight=${heights}&ts=${new Date().getTime()}`);
    let obj = {
        mediaType,
        max,
        withShoot,
        enableCrop: type,
        cropRatioWidth: widths,
        cropRatioHeight: heights,
        callblack
    }
    window.flutterReq.call('chooseAndUpload', obj, callblack)
    return
    window.location.href = `social://chooseAndUpload?mediaType=${mediaType}&max=${max}&callbackName=${callblack}&withShoot=${withShoot}&enableCrop=${type}&cropRatioWidth=${widths}&cropRatioHeight=${heights}&ts=${new Date().getTime()}`
};
// 获取app信息
export const getAppInfo = (callblack) => {
    window.flutterReq.call('getAppInfo', {}, callblack)
    return
    window.location.href = `social://${val}?callbackName=${clickName}&ts=${new Date().getTime()}`
}
// 埋点
export const uponStatistics = (params, callbackName) => {
    window.flutterReq.call('uponStatistics', params, callbackName)
    console.log('埋点参数', params);
    return
    window.location.href = `social://uponStatistics?params=${JSON.stringify(val)}&callbackName=${callbackName}&ts=${new Date().getTime()}`
}

// 获取语言
export const nativeEnv = (callbackName) => {
    let obj = {
        ts: new Date().getTime(),

    }
    window.flutterReq.call('nativeEnv', obj, callbackName)
    return
    window.location.href = `social://nativeEnv?callbackName=${clickName}&ts=${new Date().getTime()}`
};

/** 跳转H5
 *
 * @param {*} url 参数  title标题  hideBack 返回 默认false有返回   titleBgColor 背景色 titleFgColor 前景色(包括返回按钮)
 * @returns
 */

export const JumpH5 = (source = '', url, isfullScreen, data, isClosePage, pageAnimType = 0, backIconType = 0, callbackName) => {
    let obj = {
        url: `${window.location.origin}/#${url}?windowType=${isfullScreen}&backIconType=${backIconType}&pageAnimType=${pageAnimType}&params=${data}`,
        source: source,
        isClosePage,
    }
    console.log(obj.url, 'url');
    window.flutterReq.call('activityView', obj, callbackName)
    return
    console.log(`social://activityView?url=${window.location.origin}/#${url}?windowType=${isfullScreen}&backIconType=${backIconType}&pageAnimType=${pageAnimType}&params=${params}&isClosePage=${isClosePage}&ts=${new Date().getTime()}`);
    window.location.href = `social://activityView?url=${window.location.origin}/#${url}?windowType=${isfullScreen}&backIconType=${backIconType}&pageAnimType=${pageAnimType}&params=${params}&isClosePage=${isClosePage}&ts=${new Date().getTime()}`
};

export const JumpH5external = (url, type) => {
    return dsBridge.call("call", `${url}&windowType=${type}`);
};
export const JumpH5externalData = (url, type) => {
    return dsBridge.call("call", `${url}?windowType=${type}`);
};
// 跳转浏览器
export const outerBrowser = (url, isClosePage, callbackName) => {
    let obj = {
        url,
        isClosePage
    }
    window.flutterReq.call('outerBrowser', obj, callbackName)
    return
    console.log(`social://outerBrowser?url=${encodeURIComponent(url)}&isClosePage=${isClosePage}&ts=${new Date().getTime()}`);
    window.location.href = `social://outerBrowser?url=${encodeURIComponent(url)}&isClosePage=${isClosePage}&ts=${new Date().getTime()}`
};
// 设置客户端当前页面标题
export const setTitleBar = (title, fgColor, bgColor, titleBarType = '', callbackName, backIconType = 0, interceptBack = false, type = false,) => {
    let obj = {
        title,
        fgColor,
        bgColor,
        titleBarType,
        backIconType,
        hideBack: type,
        interceptBack,
        ts: new Date().getTime()
    }
    window.flutterReq.call('setTitleBar', obj, callbackName)
    return
    console.log(`social://setTitleBar?title=${title}&callbackName=${callbackName}&fgColor=${fgColor}&bgColor=${bgColor}&titleBarType=${titleBarType}&backIconType=${backIconType}&hideBack=${type}&interceptBack=${interceptBack}&ts=${new Date().getTime()}`);
    window.location.href = `social://setTitleBar?title=${title}&callbackName=${callbackName}&fgColor=${fgColor}&bgColor=${bgColor}&backIconType=${backIconType}&titleBarType=${titleBarType}&hideBack=${type}&interceptBack=${interceptBack}&ts=${new Date().getTime()}`
};

// 刷新H5
export const update = (type) => {
    return dsBridge.call("call", `/update?type=${type}`);
};
// 跳转类型
export const jumpnative = (type, callbackName) => {
    window.flutterReq.call('jumpNative', { type: type }, callbackName)
    return
    console.log(`social://jumpNative?type=${type}&ts=${new Date().getTime()}`);
    // tyep: 1 跳转到匹配
    return window.location.href = `social://jumpNative?type=${type}&ts=${new Date().getTime()}`
}
// 缓存数据到客户端
// export const setStorage = (key, val) => {
//     return dsBridge.call(
//         "call",
//         `/setStorage?key=${key}&value=${JSON.stringify(val)}`
//     );
// };
// 是否刷新上一页
export const markNeedUpdate = (type) => {
    return dsBridge.call("call", `/markNeedUpdate?type=${type}`);
};

// H5关闭指定原生页面
export const closeNative = (type) => {
    return dsBridge.call("call", `/closeNative?pcode=${type}`);
};

// 回跳app(带参)
/**
 *
 * @param {*} id  // 版本id
 * @param {*} url  // 从外部回来需要打开的H5
 * @param {*} closeUrls // 字符串用“,”号拼接地址
 * @returns
 * url=${encodeURIComponent(
    window.location.origin + "#" + url
  )}&closeUrls=${encodeURIComponent(closeUrls)}
 */
export const socialApp = (id, url = "") => {
    return `social${id}://main/web?url=${encodeURIComponent(url)}&ts=${new Date().getTime()}`;
};
// 回跳app(不带参)
/**
 *
 * @param {*} id  // 版本id
 * @returns
 * url=${encodeURIComponent(
    window.location.origin + "#" + url
  )}&closeUrls=${encodeURIComponent(closeUrls)}
 */
export const socialAppNo = (id) => {
    return `social${id}://main/web`;
};

//  跳转原生页面
export const goNatived = (pageCode, params = "{}") => {
    console.log(pageCode, params);
    return dsBridge.call(
        "call",
        `/goNative?pageCode=${pageCode}&params=${encodeURIComponent(
            JSON.stringify(params)
        )}`
    );
};

// // //  获取用户信息-getUserInfo
// export const getUserInfos = (callbackName) => {
//     console.log(`social://getUserInfo?callbackName=${callbackName}`);
//     window.location.href = `social://getUserInfo?callbackName=${callbackName}`
// };
// 匹配状态-setMatchStatus
export const setMatchStatus = (status) => {
    console.log(status, "吊起来了");
    return dsBridge.call("call", `/setMatchStatus?status=${status}`);
};
// 匹配状态-setMatchStatus
export const switchTabd = (pageCode) => {
    console.log("跳转匹配页");
    return dsBridge.call("call", `/switchTab?pageCode=${pageCode}`);
};

// 通知客户端 1:关闭倒计时页面
export const notice = (type) => {
    return dsBridge.call("call", `/notice?type=${type}`);
};

