import request from '@/utils/request'

// 查询参数列表
export function queryDataReviewList(data) {
  return request({
    url: '/operate/agora/monitor/getChannelList',
    method: 'post',
    data: data
  })
}


// 查询token参数列表
export function querygetRtcToken(data) {
    return request({
      url: '/operate/agora/monitor/getRtcToken',
      method: 'post',
      data: data
    })
  }
  

  // 查询appid参数列表
  export function getAgoraInfo(data) {
    return request({
      url: '/operate/agora/monitor/getAgoraInfo      ',
      method: 'post',
      data: data
    })
  }

  
  
  // 查询appid参数列表
export function getChannelUsers(data) {
  return request({
    url: '/operate/agora/monitor/getChannelUsers',
    method: 'post',
    data: data
  })
}

  // 查询角色
  export function getChannelUserINFO(data) {
    return request({
      url: '/operate/agora/monitor/getChannelUserINFO',
      method: 'post',
      data: data
    })
  }
  