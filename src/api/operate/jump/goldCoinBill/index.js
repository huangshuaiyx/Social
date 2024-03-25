import request from '@/utils/request'

// 获取金币记录
export function getCoinBill(data) {
  return request({
    url: '/operate/user/manager/getCoinBill',
    method: 'post',
    data: data
  })
}
