import request from '@/utils/request'

// 查询参数列表
export function queryDataReviewList(data) {
  return request({
    url: '/operate/ums/call/audit/getCallList',
    method: 'post',
    data: data
  })
}