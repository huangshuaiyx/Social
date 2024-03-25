import request from '@/utils/request'

// 查询参数列表
export function queryDataReviewList(data) {
  return request({
    url: '/operate/ums/call/audit/getCallList',
    method: 'post',
    data: data
  })
}

// 修改参数列表
export function submitReviewResult(data) {
  return request({
    url: '/operate/ums/call/audit/submitReviewResult',
    method: 'post',
    data: data
  })
}
