import request from '@/utils/request'

// 查询参数列表
export function queryAnchorExamineListByPage(data) {
  return request({
    url: '/operate/anchor/examine/queryAnchorExamineListByPage',
    method: 'post',
    data: data
  })
}

// 查询主播注册审核列表
export function selectRegisterApplyList(data) {
  return request({
    url: '/operate/provider/register/audit/apply/selectRegisterApplyList',
    method: 'post',
    data: data
  })
}

// 14-举报审批-列表
export function reportlist(data) {
  return request({
    url: '/operate/ums/report/list',
    method: 'post',
    data: data
  })
}

// 删号审批-列表
export function applylist(data) {
  return request({
    url: '/operate/ums/account/delete/apply/list',
    method: 'post',
    data: data
  })
}

// T test details 复审
// 获取列表数据getDataListApi
export const getListForReviewApi = (data) => {
    return request({
      url: '/operate/provider/assess/getListForReview',
      method: 'post',
      data: data
    })
  }
//   提交复核结果
export const submitReviewApi = (data) => {
  return request({
    url: '/operate/provider/assess/submitReview',
    method: 'post',
    data: data
  })
}
  
