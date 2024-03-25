import request from '@/utils/request'

// 查询参数列表
export function selectSystemMessageList(data) {
  return request({
    url: '/operate/notice/system/message/selectSystemMessageList',
    method: 'post',
    data: data
  })
}

// 查询参数列表
export function sendBatchMsg(data) {
    return request({
      url: '/operate/notice/system/message/sendBatchMsg',
      method: 'post',
      data: data
    })
  }
  