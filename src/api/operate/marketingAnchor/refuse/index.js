import request from '@/utils/request'

// 查询参数列表
export function getRefuseWordPageList(data) {
  return request({
    url: '/operate/refuse/word/getRefuseWordPageList',
    method: 'post',
    data: data
  })
}

// 添加
export function increaseRefuseWord(data) {
    return request({
      url: '/operate/refuse/word/increaseRefuseWord',
      method: 'post',
      data: data
    })
  }
  
  //修改
export function modifyRefuseWord(data) {
    return request({
      url: '/operate/refuse/word/modifyRefuseWord',
      method: 'post',
      data: data
    })
  }
  
// 查询参数列表
export function paged(data) {
  return request({
    url: '/operate/pay/config/page',
    method: 'post',
    data: data
  })
}

// 渠道列表
export function channelList(data) {
  return request({
    url: '/operate/pay/config/channelList',
    method: 'post',
    data: data
  })
}

// 支付配置开关
export function updateEnable(data) {
  return request({
    url: '/operate/pay/config/updateEnable',
    method: 'post',
    data: data
  })
}

/**批量 */
export function updateEnableBatch(data) {
  return request({
    url: '/operate/pay/config/updateEnableBatch',
    method: 'post',
    data: data
  })
}