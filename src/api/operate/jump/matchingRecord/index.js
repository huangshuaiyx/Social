import request from '@/utils/request'

// 查询登录记录列表
export function getMatchRecord(data) {
  return request({
    url: '/operate/user/manager/getMatchRecord',
    method: 'post',
    data: data
  })
}
