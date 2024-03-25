//  准备引入 vuex
import { createStore } from 'vuex'
import { uponStatistics, nativeEnv, getClientStartTime } from '@/api/index'

import { useI18n } from 'vue-i18n'

const store = createStore({
    state: {
        name: "夏勇",
        appLanguage: "en", // 语言,
        unifyCallBackName: "onlyCodeCallBackName", // 伪协议返回固定code200,
        ispayloading: false,
    },
    mutations: {
        // 挑起谷歌支付的loading
        GETPAYOVER (state, value) {
            state.ispayloading = value
            console.log(value, 'loading');
        },
        // 语言
        SETAPPLANGUAGE (state, params) {
            state.appLanguage = params ? params : 'en';
        },
        // 语言查询
        appLanguages () {
            let languageValue = 'fr'

            const { locale: i18nLanguage } = useI18n()
            nativeEnv('nativeEnvcallblack')
            window.nativeEnvcallblack = (res) => {
                languageValue = "Ar"
                i18nLanguage.value = languageValue  // zh
            }
            setTimeout(() => {


                console.log(1);
            }, 2000);
        },
    },
    getters: {},
    actions: {
        onStatistics (context, x) {
            getClientStartTime((data) => {
                console.log(data, '埋点时间');
                let reques = data
                let time = reques.time
                let source = reques.source
                let cost = x.cost != undefined ? (x.totalCost - x.cost) : '';
                let totalCost = x.totalCost != undefined ? (x.totalCost - time) : '';
                let params = {
                    pgName: window.location.hash.split('?')[0].split('#/')[1],
                    pgCode: window.location.hash.split('?')[0].split('#/')[1],
                    bizId: x.bizId || '',
                    cost: cost || 0,
                    event: x.event,
                    type: x.type,
                    totalCost: totalCost || 0,
                    err: JSON.stringify(x.err) || '',
                    remark: JSON.stringify(x.remark) || '',
                    userId: x.userId || '',
                    activeTime: x.activeTime || 0,
                    registerTime: x.registerTime || 0,
                    dt: new Date().getTime(),
                    tag: x.tag || '',
                    extra: JSON.stringify({ source: source, ...x.remark }) || '',
                    resp: JSON.stringify(x.resp) || '',

                }
                uponStatistics(params, res => { })
            })



        },
        // 埋点
        // async onStatistics (context, x) {
        //     let time = dsBridge.call('pageLoadTime') ? dsBridge.call('pageLoadTime') : 0
        //     console.log('客户端进入h5的time', time);
        //     // let time = ''
        //     let cost =
        //         x.cost != undefined ? (x.totalCost - x.cost) : '';
        //     let totalCost =
        //         x.totalCost != undefined
        //             ? (x.totalCost - time)
        //             : '';
        //     console.log(
        //         x,
        //         {
        //             pgName: window.location.hash.split('?')[0].split('#/')[1],
        //             pgCode: window.location.hash.split('?')[0].split('#/')[1],
        //             bizId: x.bizId || '',
        //             cost: cost,
        //             totalCost: totalCost,
        //             err: x.err || '',
        //             remark: x.remark || '',
        //             userId: x.userId || '',
        //             activeTime: x.activeTime || '',
        //             registerTime: x.registerTime || '',
        //             dt: new Date().getTime(),
        //             tag: x.tag || '',
        //             extra: x.extra || '',
        //             resp: x.resp || '',
        //         },
        //         x.cost,
        //         cost
        //     );
        //     await
        //         dsBridge.call(
        //             "call",
        //             `/onStatistics?event=${x.event}&type=${x.type}&params=${JSON.stringify({
        //                 pgName: window.location.hash.split('?')[0].split('#/')[1],
        //                 pgCode: window.location.hash.split('?')[0].split('#/')[1],
        //                 bizId: x.bizId || '',
        //                 cost: cost || 0,
        //                 totalCost: totalCost || 0,
        //                 err: JSON.stringify(x.err) || '',
        //                 remark: JSON.stringify(x.remark) || '',
        //                 userId: x.userId || '',
        //                 activeTime: x.activeTime || 0,
        //                 registerTime: x.registerTime || 0,
        //                 dt: new Date().getTime(),
        //                 tag: x.tag || '',
        //                 extra: x.extra || '',
        //                 resp: JSON.stringify(x.resp) || '',
        //             }) || "{}"
        //             }`

        //             // &pgName=${window.location.hash}&pgCode=${window.location.hash}&bizId=${
        //             //   x.bizId || null
        //             // }&cost=${cost}&totalCost=${x.totalCost}&err=${x.err}&remark=${
        //             //   x.remark
        //             // }`,
        //             // (res) => {
        //             //   console.log(res);
        //             // }
        //         );
        // },
    },
    modules: {}
})
export default store