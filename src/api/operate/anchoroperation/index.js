import request from '@/utils/request'

// 查询参数列表
export function pageCoded(data) {
  return request({
    url: '/operate/agent/page',
    method: 'post',
    data: data
  })
}


// 修改
export function settingDirector(data) {
  return request({
    url: '/operate/agent/settingDirector',
    method: 'post',
    data: data
  })
}


// 更新主播评级配置
export function updateConfig(data) {
  return request({
    url: '/operate/provider/score/config/updateConfig',
    method: 'post',
    data: data
  })
}


// 主播评级配置列表
export function getConfigList(data) {
  return request({
    url: '/operate/provider/score/config/getConfigList',
    method: 'post',
    data: data
  })
}


// 主播评级配置修改记录
export function getModifyRecordList(data) {
  return request({
    url: '/operate/provider/score/config/getModifyRecordList',
    method: 'post',
    data: data
  })
}

