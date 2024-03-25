import request from '@/utils/request'

// 查询参数列表
export function getTagPageList(data) {
  return request({
    url: '/operate/tag/getTagPageList',
    method: 'post',
    data: data
  })
}

// 添加
export function increaseTag(data) {
    return request({
      url: '/operate/tag/increaseTag',
      method: 'post',
      data: data
    })
  }
  
  //修改
export function modifyTag(data) {
    return request({
      url: '/operate/tag/modifyTag',
      method: 'post',
      data: data
    })
  }
  
  
   //删除 
 export function delTagAndUserRelation(data) {
  return request({
    url: '/operate/tag/delTagAndUserRelation',
    method: 'post',
    data: data
  })
}

