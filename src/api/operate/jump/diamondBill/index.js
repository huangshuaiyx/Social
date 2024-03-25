import request from '@/utils/request'

// 查询登录记录列表
export function getDiamondBill(data) {
  return request({
    url: '/operate/user/manager/getDiamondBill',
    method: 'post',
    data: data
  })
}
