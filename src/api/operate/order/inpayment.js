import request from '@/utils/request'

// 批量创建订单 导入exl文件
export const orderimportApi = (data) => {
    return request({
        url: '/operate/payOut/order/import',
        method: 'post',
        data: data
    })
}
// 获取exl生成代付订单列表
export const creatOrderListApi = (data) => {
    return request({
        url: '/operate/payOut/order/bulkCreate',
        method: 'post',
        data: data
    })
}
// 获取生成exl代付订单列表
export const getorderpageApi = (data) => {
    return request({
        url: '/operate/payOut/order/page',
        method: 'post',
        data: data
    })
}
// 查看订单详情
export const getOrderInfoApi = (data) => {
    return request({
        url: '/operate/payOut/order/get',
        method: 'post',
        data: data
    })
}
// 导出订单
export const orderexportApi = (data) => {
    return request({
        url: '/operate/payOut/order/export',
        method: 'post',
        data: data,
        responseType: 'blob'
    })
}