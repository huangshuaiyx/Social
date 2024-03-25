import request from '@/utils/request'
import axios from 'axios'
import { upbaseUrl } from "../../../../config/index"
// 统计任务
export function auditTaskStatistics(data) {
  return request({
    url: '/operate/order/audit/task/auditTaskStatistics',
    method: 'post',
    data: data
  })
}


// 配置数据
export function getOptionsConfigData(data) {
  return request({
    url: '/operate/order/audit/task/getOptionsConfigData',
    method: 'post',
    data: data
  })
}

// 审核任务详情
export function getTaskInfo(data) {
  return request({
    url: '/operate/order/audit/task/getTaskInfo',
    method: 'post',
    data: data
  })
}



// export function selectMoreDictDataByDictType(params) {
//   return axios.post(`${upbaseUrl}/sys/dictData/selectMoreDictDataByDictType`, params, {
//     // headers: {'Content-Type':'multipart/form-data'}
//   })
// }
/**封禁冻结原因 */
export function selectMoreDictDataByDictType(data) {
  return request({
    url: '/system/dict/data/type/selectMoreDictDataByDictType',
    method: 'post',
    data: data
  })
}

/**冻结 */
export function updateUserStatus(data) {
  return request({
    url: '/operate/user/manager/updateUserStatus',
    method: 'post',
    data: data
  })
}

/**获取下一个任务 */
export function getNextTask(data) {
  return request({
    url: '/operate/order/audit/task/getNextTask',
    method: 'post',
    data: data
  })
}

/**审核 */
export function auditHandle(data) {
  return request({
    url: '/operate/order/audit/task/auditHandle',
    method: 'post',
    data: data
  })
}

/**历史冻结,封禁记录 */
export function selectLogList(data) {
  return request({
    url: '/operate/provider/banLog/selectLogList',
    method: 'post',
    data: data
  })
}


export function updateAudit(data) {
  return request({
    url: '/operate/order/audit/task/updateAudit',
    method: 'post',
    data: data
  })
}


export function saved(data) {
  return request({
    url: '/operate/rtc/channel/recording/favorites/save',
    method: 'post',
    data: data
  })
}

//*设置视频标签

export function savesd(data) {
  return request({
    url: '/operate/rtc/channel/recording/tag/save',
    method: 'post',
    data: data
  })
}

//*设置视频标签

export function saveObtain(data) {
  return request({
    url: '/operate/rtc/channel/recording/tag/get',
    method: 'post',
    data: data
  })
}


//*1-获取审核任务等级列表

export function getAuditTaskLevel(data) {
  return request({
    url: '/operate/ums/audit/getAuditTaskLevel',
    method: 'post',
    data: data
  })
}

//*3-设置审核任务等级列表

export function settingAuditTaskLevel(data) {
  return request({
    url: '/operate/ums/audit/settingAuditTaskLevel',
    method: 'post',
    data: data
  })
}

//*设置审核任务等级分配

export function settingAuditTaskAssign(data) {
  return request({
    url: '/operate/ums/audit/settingAuditTaskAssign',
    method: 'post',
    data: data
  })
}

//*获取审核任务等级分配列表

export function getAuditTaskAssign(data) {
  return request({
    url: '/operate/ums/audit/getAuditTaskAssign',
    method: 'post',
    data: data
  })
}
//*7-获取审核任统计

export function getTaskStatistics(data) {
  return request({
    url: '/operate/ums/audit/getTaskStatistics',
    method: 'post',
    data: data
  })
}

//*7-获取审核任统计

export function receiveTask(data) {
  return request({
    url: '/operate/ums/audit/receiveTask',
    method: 'post',
    data: data
  })
}

/**获取下一个任务 */
export function getNextTaskd(data) {
  return request({
    url: '/operate/ums/audit/getNextTask',
    method: 'post',
    data: data
  })
}

/**字典数据 */
export function queryDictListByType(data) {
  return request({
    url: '/operate/sysData/selectMoreDictDataByDictType',
    method: 'post',
    data: data
  })
}

/**字典数据 */
export function batchAuditTask(data) {
  return request({
    url: '/operate/ums/audit/batchAuditTask',
    method: 'post',
    data: data
  })
}

// 测试
export const test = () => {
  return new Promise((resolve) => {
      resolve({
        "code": 200,
        "msg": "OK",
        "data": {
          "taskType": "3001",
          "taskList": [
          {}
          ]
        },
        "timestamp": "1672973941354"
      }
      )
  });
};
// 违规统计 查询列表
export const gettableListApi = (data) =>  {
    return request({
      url: '/operate/order/audit/task/getViolationList',
      method: 'post',
      data: data
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


