import request from '@/utils/request'

// 查询补贴主播列表
export function getUserInfoByPageAndParams(data) {
  return request({
    url: '/operate/provider/incentives/page',
    method: 'post',
    data: data
  })
}
