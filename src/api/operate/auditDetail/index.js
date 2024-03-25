import request from '@/utils/request'

// 提交审核参数
export function submitAuditResult(data) {
  return request({
    url: '/operate/data/review/submitAuditResult',
    method: 'post',
    data: data
  })
}
// 审核参数列表
export function getDataReview(data) {
  return request({
    url: '/operate/data/review/getDataReview',
    method: 'post',
    data: data
  })
}

// 用户修改资料审核
export function userDataAudit(data) {
  return request({
    url: '/operate/data/review/userDataAudit',
    method: 'post',
    data: data
  })
}



// 举报审批-详情
export function detailsd(data) {
  return request({
    url: '/operate/ums/report/details',
    method: 'post',
    data: data
  })
}

// 举报审批-审核
export function reportaudit(data) {
  return request({
    url: '/operate/ums/report/audit',
    method: 'post',
    data: data
  })
}

// 删号审批-详情
export function applydetails(data) {
  return request({
    url: '/operate/ums/account/delete/apply/details',
    method: 'post',
    data: data
  })
}


// 删号审批-审核
export function applyAudit(data) {
  return request({
    url: '/operate/ums/account/delete/apply/audit',
    method: 'post',
    data: data
  })
}

// 主播资料-审核
export function providerDataAudit(data) {
  return request({
    url: '/operate/data/review/providerDataAudit',
    method: 'post',
    data: data
  })
}

// 用户-昵称审核
export function nickNameSubmitAudit(data) {
  return request({
    url: '/operate/ums/data/review/nickNameSubmitAudit',
    method: 'post',
    data: data
  })
}

// 用户-头像审核
export function faceSubmitAudit(data) {
  return request({
    url: '/operate/ums/data/review/faceSubmitAudit',
    method: 'post',
    data: data
  })
}

// 用户-自我介绍审核
export function selfIntroductionSubmitAudit(data) {
  return request({
    url: '/operate/ums/data/review/selfIntroductionSubmitAudit',
    method: 'post',
    data: data
  })
}

// 用户-相册审核
export function albumSubmitAudit(data) {
  return request({
    url: '/operate/ums/data/review/albumSubmitAudit',
    method: 'post',
    data: data
  })
}

// 用户-视频审核
export function videoSubmitAudit(data) {
  return request({
    url: '/operate/ums/data/review/videoSubmitAudit',
    method: 'post',
    data: data
  })
}


// 主播-昵称审核
export function auditNickName(data) {
  return request({
    url: '/operate/provider/audit/auditNickName',
    method: 'post',
    data: data
  })
}

// 主播-审核自我介绍
export function auditSelfIntroduction(data) {
  return request({
    url: '/operate/provider/audit/auditSelfIntroduction',
    method: 'post',
    data: data
  })
}

// 主播-审核相册
export function auditAlbum(data) {
  return request({
    url: '/operate/provider/audit/auditAlbum',
    method: 'post',
    data: data
  })
}

// 主播-审核视频
export function auditVideo(data) {
  return request({
    url: '/operate/provider/audit/auditVideo',
    method: 'post',
    data: data
  })
}

// 主播-审核招呼语
export function auditCall(data) {
  return request({
    url: '/operate/provider/audit/auditCall',
    method: 'post',
    data: data
  })
}

// 主播-获取招呼语详情
export function getCallAuditDetails(data) {
  return request({
    url: '/operate/provider/audit/getCallAuditDetails',
    method: 'post',
    data: data
  })
}

// 删除用户（图片、视频）资源
export function delResource(data) {
  return request({
    url: '/operate/anchor/examine/delResource',
    method: 'post',
    data: data
  })
}