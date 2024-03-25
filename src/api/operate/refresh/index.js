import request from '@/utils/request'

// 查询用户信息列表
export function getProviderSortList(data) {
  return request({
    url: '/operate/provider/sort/getProviderSortList',
    method: 'post',
    data: data
  })
}
