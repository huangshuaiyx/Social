import request from '@/utils/request'

// 查询登录记录列表
export function getLoginRecord(data) {
  return request({
    url: '/operate/user/manager/getLoginRecord',
    method: 'post',
    data: data
  })
}
