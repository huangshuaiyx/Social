import request from '@/utils/request'

export function sendAppRemoteControl(data) {
  return request({
    url: '/operate/app/manager/sendAppRemoteControl',
    method: 'post',
    data: data
  })
}

export function queryRedisCache(data) {
  return request({
    url: '/operate/app/manager/queryRedisCache',
    method: 'post',
    data: data
  })
}


export function delRedisCache(data) {
  return request({
    url: '/operate/app/manager/delRedisCache',
    method: 'post',
    data: data
  })
}

export function refreshToken(data) {
  return request({
    url: '/operate/pay/google/refreshToken',
    method: 'post',
    data: data
  })
}
//查询用户id
export function userinfo(data) {
  return request({
    url: '/operate/pay/wallet/info',
    method: 'post',
    data: data
  })
}
//更新用户数据
export function userupdate(data) {
  return request({
    url: '/operate/pay/wallet/update',
    method: 'post',
    data: data
  })
}

// 配置
export function userexecutor(data) {
  return request({
    url: '/operate/common/executor',
    method: 'post',
    data: data
  })
}