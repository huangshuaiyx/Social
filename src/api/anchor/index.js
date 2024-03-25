import request from '@/utils/request'

// 获取Host in us/Recommend join/Recommend removal/Never recommend列表
export function getrecommendListApi (data) {
    return request({
        url: '/operate/provider/recommend/list',
        method: 'post',
        data: data
    })
}
// 操作加入
export function joinListApi (data) {
    return request({
        url: '/operate/provider/recommend/join',
        method: 'post',
        data: data
    })
}
// 操作移除
export function removerecommendApi (data) {
    return request({
        url: '/operate/provider/recommend/remove',
        method: 'post',
        data: data
    })
}
// 操作移除永不推荐
export function neverRecommendApi (data) {
    return request({
        url: '/operate/provider/recommend/neverRecommend',
        method: 'post',
        data: data
    })
}
// 搜索全局主播操作加入
export function searchalljoinListApi (data) {
    return request({
        url: 'operate/provider/recommend/search',
        method: 'post',
        data: data
    })
}
// 主播收入模块

// 获取private收入表
export const getprivatedatalistApi = (data) => {
    return request({
        url: '/operate/sysData/selectMoreDictDataByDictType',
        method: 'post',
        data: data
    })
}
// 更新private 收入表
export const submitbatchInsertUpdateDictValueByReApi = (data) => {
    return request({
        url: '/operate/sysData/batchInsertUpdateDictValueByReq',
        method: 'post',
        data: data
    })
}
// mmhost 主播操作进度
// 获取进度list
export const getmarketmatchListApi = (data) => {
    return request({
        url: "/operate/provider/market/match/list",
        method: "post",
        data
    })
}
// 删除主播
export const removemarketmatchApi = (data) => {
    return request({
        url: "/operate/provider/market/match/remove",
        method: "post",
        data
    })
}
// 增加主播
export const addmarketmatchApi = (data) => {
    return request({
        url: "/operate/provider/market/match/add",
        method: "post",
        data
    })
}
// 修改主播
export const updatemarketmatchApi = (data) => {
    return request({
        url: "/operate/provider/market/match/update",
        method: "post",
        data
    })
}
// love call 接口 获取列表
export const getloveCallListApi = (data) => {
    return request({
        url: "/operate/provider/white/list/loveCallList",
        method: "post",
        data
    })
}
// 新增
export const addLoveCallApi = (data) => {
    return request({
        url: "/operate/provider/white/list/addLoveCall",
        method: "post",
        data
    })
}
// 删除
export const removeLoveCallApi = (data) => {
    return request({
        url: "/operate/provider/white/list/removeLoveCall",
        method: "post",
        data
    })
}
// 优先匹配 页面
// 获取匹配列表数据
export const getqueryDictListByTypeApi = (data) => {
    return request({
        url: "/operate/sysData/queryDictListByType",
        method: "post",
        data
    })
}
// 新增匹配国家
export const addqueryDictListByTypeApi = (data) => {
    return request({
        url: "/operate/sysData/add",
        method: "post",
        data
    })
}
// 更新匹配国家
export const updatequeryDictListByTypeApi = (data) => {
    return request({
        url: "/operate/sysData/update",
        method: "post",
        data
    })
}

// 自动任务主播等级配置页面请求 获取配置
export const getAutoSetConfigApi = (data) => {
    return request({
        url: "/operate/provider/recommend/getAutoSetConfig",
        method: "post",
        data
    })
}
// 修改等级
export const setAutoConfigApi = (data) => {
    return request({
        url: "/operate/provider/recommend/setAutoConfig",
        method: "post",
        data
    })
}