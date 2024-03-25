import request from '@/utils/request'

// 添加
export function getProdsave(data) {
    return request({
        url: '/operate/provider/priority/save',
        method: 'post',
        data: data
    })
}

// 查询列表
export function getProdpage(data) {
    return request({
        url: '/operate/provider/priority/page',
        method: 'post',
        data: data
    })
}

// 移除列表
export function getProdremove(data) {
    return request({
        url: '/operate/provider/priority/remove',
        method: 'post',
        data: data
    })
}

// 查询策略信列表
export function getStrategyMessagePageList(data) {
    return request({
        url: '/operate/strategy/message/getStrategyMessagePageList',
        method: 'post',
        data: data
    })
}

// 策略信移除/添加
export function setPriority(data) {
    return request({
        url: '/operate/strategy/message/setPriority',
        method: 'post',
        data: data
    })
}