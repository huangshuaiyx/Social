import request from '@/utils/request'

// 查询视频记录列表
export function getVideoRecord(data) {
  return request({
    url: '/operate/user/manager/getVideoRecord',
    method: 'post',
    data: data
  })
}
