import request from '@/utils/request'
import axios from 'axios'

import { upbaseUrl } from "../../../../config/index"

// 查询服务者信息列表 和二类主播列表接口
export function getListForOperateApi(data) {
  return request({
    url: '/operate/provider/info/getListForOperate',
    method: 'post',
    data: data
  })
}

// 查询服务者信息列表 B类主播列表接口
export function getListForOperateB(data) {
  return request({
    url: '/operate/provider/info/getListForOperate',
    method: 'post',
    data: data
  })
}
// 查询服务者信息列表
export function getProviderInfoByPageAndParams(data) {
  return request({
    url: '/operate/user/manager/getUserInfoByPageAndParams',
    method: 'post',
    data: data
  })
}


// 查询补贴主播列表
export function pagesd(data) {
  return request({
    url: '/operate/provider/incentives/page',
    method: 'post',
    data: data
  })
}
// 补贴主播-搜索主播
export function searchProvider(data) {
  return request({
    url: '/operate/provider/incentives/searchProvider',
    method: 'post',
    data: data
  })
}

// 查询规格
export function queryDictListByType(data) {
  return request({
    url: '/operate/sysData/queryDictListByType',
    method: 'post',
    data: data
  })
}
//补贴主播详情
export function detail(data) {
  return request({
    url: '/operate/provider/incentives/detail',
    method: 'post',
    data: data
  })
}

// 保存主播补贴
export function save(data) {
  return request({
    url: '/operate/provider/incentives/save',
    method: 'post',
    data: data
  })
}

// 查询用户钱包列表
export function selectWalletListByPage(data) {
  return request({
    url: '/operate/wallet/manager/selectWalletListByPage',
    method: 'post',
    data: data
  })
}

// 撤销
export function cancel(data) {
  return request({
    url: '/operate/provider/incentives/cancel',
    method: 'post',
    data: data
  })
}

// 导入数据
export function importAddMoney(data) {
  return request({
    url: '/operate/wallet/manager/importAddMoney',
    method: 'post',
    data: data
  })
}

// 导出数据
export function exportProviderCall(data) {
  return request({
    url: '/operate/wallet/manager/exportProviderCall',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
// export function exportProviderCall(query) {
//   return request({
//     url: '/operate/wallet/manager/exportProviderCall',
//     method: 'get',
//     params: query
//   })
// }

// 补贴报表
export function pageForOperate(data) {
  return request({
    url: '/operate/rtcReport/pageForOperate',
    method: 'post',
    data: data
  })
}

// 视频录制
export function recordingPage(data) {
  return request({
    url: '/operate/rtc/channel/recording/page',
    method: 'post',
    data: data
  })
}
// 视频录制导出
export function recordingexcel(data) {
  return request({
    url: '/operate/rtc/channel/recording/excel',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}


// 增加/减少金币
export function addProviderBalance(data) {
  return request({
    url: '/operate/wallet/manager/addProviderBalance',
    method: 'post',
    data: data,
  })
}


// 2类营销主播列表
export function pageTowL(data) {
  return request({
    url: '/operate/provider/market/page',
    method: 'post',
    data: data,
  })
}

// 2类营销主播添加
export function saveadd(data) {
  return request({
    url: '/operate/provider/market/save',
    method: 'post',
    data: data,
  })
}

// 2类营销主播添加
export function cancelDete(data) {
  return request({
    url: '/operate/provider/market/cancel',
    method: 'post',
    data: data,
  })
}


// 评分卡
export function getStateSummaryForScoreCardApi(data) {
  return request({
    url: '/operate/nonauth/provider/state/getStateSummaryForScoreCard',
    method: 'post',
    headers: {
        isToken: false
      },
    data: data,
  })
}
// 主播等级人数(首页)
export function getStateSummary(data) {
  return request({
    url: '/operate/provider/state/getStateSummary',
    method: 'post',
    data: data,
  })
}
// 主播等级人数(首页)
export function getStateSummaryUsApi(data) {
  return request({
    url: '/operate/provider/state/getStateSummaryForUs',
    method: 'post',
    data: data,
  })
}
// 修改主播标签
export function editanchorlbelApi(data) {
  return request({
    url: '/operate/provider/state/getStateSummaryForUs',
    method: 'post',
    data: data,
  })
}

// 金币操作历史
// 获取列表数据
export function providerBillListListApi(data) {
    return request({
      url: '/operate/wallet/manager/providerBillList',
      method: 'post',
      data: data,
    })
  }
// 导出
export const exportXlsxApi = (data) =>  {
    return request({
      url: '/operate/ums/audit/batchAuditTask',
      method: 'post',
      data: data
    })
}


// 查询主播标签
export const getProviderTags = (data) => {
  return request({
    url: 'operate/provider/info/getProviderTag',
    method: 'post',
    data: data,
  })
}


// 修改主播标签
export const updateProviderTag = (data) => {
  return request({
    url: '/operate/provider/info/updateProviderTag',
    method: 'post',
    data: data,
  })
}
// 主播状态列表
export const getStateListForOperateApi = (data) => {
    return request({
      url: '/operate/provider/state/getStateListForOperate',
      method: 'post',
      data: data,
    })
  }
