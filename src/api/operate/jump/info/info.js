import request from '@/utils/request'

// 查询用户信息列表
export function getBaseInfo(data) {
  return request({
    url: '/operate/user/manager/getBaseInfo',
    method: 'post',
    data: data
  })
}


// 查询用户信息列表
export function updateUserStatus(data) {
  return request({
    url: '/operate/user/manager/updateUserStatus',
    method: 'post',
    data: data
  })
}

// 修改初始分,运营分
export function modifyMarketAnchorInformation(data) {
  return request({
    url: '/operate/market/anchor/modifyMarketAnchorInformation',
    method: 'post',
    data: data
  })
}
// 设置用户头像
export function settingAvatarApi(data) {
    return request({
      url: '/operate/user/manager/settingAvatar',
      method: 'post',
      data: data,
    })
  }
// 设置用户私密资源
export function setPrivate(data) {
  return request({
    url: '/operate/anchor/examine/setPrivate',
    method: 'post',
    data: data,
  })
}
// 设置形象视频排序
export function setUpdateLifeSortApi(data) {
    return request({
      url: '/operate/anchor/examine/updateLifeSort',
      method: 'post',
      data: data,
    })
  }
// 32.修改营销主播等级
export function modifyMarketAnchorLevel(data) {
  return request({
    url: '/operate/market/anchor/modifyMarketAnchorLevel',
    method: 'post',
    data: data,
  })
}

// 32-重置主播等级
export function resetLevel(data) {
  return request({
    url: '/operate/user/manager/resetLevel',
    method: 'post',
    data: data,
  })
}
// 修改营销主播的状态
export const modifyMarketStatusApi = (data) => {
  return request({
    url: '/operate/provider/info/modifyMarketStatus',
    method: 'post',
    data: data,
  })
}
// 设置主播F等级 
export const setFLevelApi = (data) => {
    return request({
      url: '/operate/provider/info/setFLevel',
      method: 'post',
      data: data,
    })
  }
// 上传私密相册
export const uploadPrivacyAlbumApi = (data) => {
  return request({
    url: '/operate/provider/info/uploadPrivacyAlbum2',
    method: 'post',
    data: data,
  })
}
// 上传相册
export const uploadaddAlbumForOperateApi = (data) => {
    return request({
      url: '/operate/provider/audit/addAlbumForOperate',
      method: 'post',
      data: data,
    })
  }
// 上传营销视频
export const uploadMarketVideoApi = (data) => {
  return request({
    url: '/operate/provider/info/uploadMarketVideo',
    method: 'post',
    data: data,
  })
}
// 获取主播订单视频列表
export const getAuditedOrderVideoApi = (data) => {
  return request({
    url: '/operate/provider/info/getAuditedOrderVideo',
    method: 'post',
    data: data,
  })
}

// 获取主播B订单视频列表
export const getAuditedOrderVideoTypeB = (data) => {
  return request({
    url: '/operate/provider/info/getAuditedOrderVideoTypeB',
    method: 'post',
    data: data,
  })
}

// 修改主播个性签名
export const modifySelfIntroductionApi = (data) => {
    return request({
      url: '/operate/provider/info/modifySelfIntroduction',
      method: 'post',
      data: data,
    })
}
// 修改主播昵称
export const modifyNickNameApi = (data) => {
    return request({
      url: '/operate/provider/info/modifyNickName',
      method: 'post',
      data: data,
    })
}
// 获取语言列表
export const getqueryDictListForLanguageApi = (data) => {
    return request({
      url: '/operate/sysData/queryDictListForLanguage',
      method: 'post',
      data: data,
    })
}
// 修改主播语言
export const modifyLanguageApi = (data) => {
    return request({
      url: '/operate/provider/info/modifyLanguage',
      method: 'post',
      data: data,
    })
}

