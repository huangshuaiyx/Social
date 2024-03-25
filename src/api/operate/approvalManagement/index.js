import request from '@/utils/request'
//  注册审批记录 // 获取列表

export function getselectRegisterAuditListApi (data) {
    return request({
        url: '/operate/provider/register/audit/apply/selectRegisterAuditList',
        method: 'post',
        data: data
    })
}
// 操作不合格  注册审批记录 资料审批记录通用
export const isvideoReviewApi = (data) => {
    return request({
        url: '/operate/provider/audit/videoReview',
        method: 'post',
        data: data
    })
}

// 资料审批记录 // 获取列表
export function getselectAuditListApi (data) {
    return request({
        url: '/operate/provider/audit/selectAuditList',
        method: 'post',
        data: data
    })
}
// 服务者信息总览
export const getprovidersDataApi = (data) => {
    return request({
        url: '/operate/provider/info/getListForOperate',
        method: 'post',
        data: data
    })
}
// 导出服务者信息总览
export function exportXlsxApi (data) {
    return request({
        url: '/operate/provider/info/export',
        method: 'post',
        data: data,
        responseType: 'blob'
    })
}