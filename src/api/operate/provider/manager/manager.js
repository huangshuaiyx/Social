import request from '@/utils/request'

// 查询用户信息列表
export function getUserInfoByPageAndParams(data) {
  return request({
    url: '/operate/user/manager/getUserInfoByPageAndParams',
    method: 'post',
    data: data
  })
}

