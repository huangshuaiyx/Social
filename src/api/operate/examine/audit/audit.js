import request from '@/utils/request'

// 查询审核主播信息
export function getProviderUserInfo(data) {
  return request({
    url: '/operate/anchor/examine/getProviderUserInfo',
    method: 'post',
    data: data
  })
}

// 提交审核结果
export function submitAudit(data) {
  return request({
    url: '/operate/anchor/examine/submitAudit',
    method: 'post',
    data: data
  })
}

// 删除照片
export function delResource(data) {
  return request({
    url: '/operate/anchor/examine/delResource',
    method: 'post',
    data: data
  })
}
// 删除照片-招呼语
export function selectRegisterApplyDetail(data) {
  return request({
    url: '/operate/provider/register/audit/apply/selectRegisterApplyDetail',
    method: 'post',
    data: data
  })
}

// 主播注册审核
export function registerAudit(data) {
  return request({
    url: '/operate/provider/register/audit/registerAudit',
    method: 'post',
    data: data
  })
}

// 主播注册审核
export function deleteAuditResource(data) {
  return request({
    url: '/operate/data/review/deleteAuditResource',
    method: 'post',
    data: data
  })
}


// 1-查询主播视频列表
export function getVideoList(data) {
  return request({
    url: '/operate/rpc/provider/res/getVideoList',
    method: 'post',
    data: data
  })
}
// -更新主播视频
export function updateVideo(data) {
  return request({
    url: '/operate/rpc/provider/res/updateVideo',
    method: 'post',
    data: data
  })
}

// -查询主播视频详情
export function getVideoDetails(data) {
  return request({
    url: '/operate/rpc/provider/res/getVideoDetails',
    method: 'post',
    data: data
  })
}


// -审核相册
export function albumAudit(data) {
  return request({
    url: '/operate/provider/register/audit/albumAudit',
    method: 'post',
    data: data
  })
}
// 获取一审结果/operate/provider/register/audit/apply/getRegisterAuditResult
export function getRegisterAuditResultApi(data) {
    return request({
      url: '/operate/provider/register/audit/apply/getRegisterAuditResult',
      method: 'post',
      data: data
    })
  }

