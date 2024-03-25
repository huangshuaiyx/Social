import request from '@/utils/request'

// 查询参数列表
export function pageList(data) {
  return request({
    url: '/operate/im/sensitive/page',
    method: 'post',
    data: data
  })
}

// 添加
export function adds(data) {
  return request({
    url: '/operate/im/sensitive/add',
    method: 'post',
    data: data
  })
}



//删除 
export function deletes(data) {
  return request({
    url: '/operate/im/sensitive/delete',
    method: 'post',
    data: data
  })
}


// 查询会话列表 
export function selectImMessageSummaryList(data) {
  return request({
    url: '/operate/im/message/summary/selectImMessageSummaryList',
    method: 'post',
    data: data
  })
}


// -查询会话详情 
export function selectImMessageRecordByPartitionKey(data) {
  return request({
    url: '/operate/im/message/record/selectImMessageRecordByPartitionKey',
    method: 'post',
    data: data
  })
}


// -查询会话详情 
export function selectProviderConversaList(data) {
  return request({
    url: '/operate/im/message/summary/selectProviderConversaList',
    method: 'post',
    data: data
  })
}


// 4-主播处罚记录
export function selectPenaltyRecordList(data) {
  return request({
    url: '/operate/provider/penalty/record/selectPenaltyRecordList',
    method: 'post',
    data: data
  })
}

// 6-主播的率
export function getProviderRateSummary(data) {
  return request({
    url: '/operate/provider/rate/summary/getProviderRateSummary',
    method: 'post',
    data: data
  })
}


// 处罚主播
export function penalty(data) {
  return request({
    url: '/operate/provider/penalty/record/penalty',
    method: 'post',
    data: data
  })
}

// 封禁, 冻结 词典
export function selectMoreDictDataByDictType(data) {
  return request({
    url: '/system/dict/data/type/selectMoreDictDataByDictType',
    method: 'post',
    data: data
  })
}


// 封禁, 冻结 查字点
export function googleTranslateByList(data) {
  return request({
    url: '/operate/im/message/translate/googleTranslateByList',
    method: 'post',
    data: data
  })
}

// 9-最近50个会话列表详情
export function selectListDetailByPartitionKey(data) {
  return request({
    url: '/operate/im/message/record/selectListDetailByPartitionKey',
    method: 'post',
    data: data
  })
}

// 9-金币权限接口
export function getRewardPermission(data) {
  return request({
    url: '/operate/provider/reward/permission/getRewardPermission',
    method: 'post',
    data: data
  })
}

