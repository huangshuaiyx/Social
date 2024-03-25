import request from '@/utils/request'

// 查询登录记录列表
export function getRechargeRecord(data) {
  return request({
    url: '/operate/user/manager/getRechargeRecord',
    method: 'post',
    data: data
  })
}
