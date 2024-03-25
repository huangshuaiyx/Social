import request from '@/utils/request'

// 查询参数列表
export function getTaskInfo(data) {
  return request({
    url: '/operate/order/audit/task/getTaskInfo',
    method: 'post',
    data: data
  })
}

//**封禁,冻结记录 */

export function selectLogList(data) {
  return request({
    url: '/operate/provider/banLog/selectLogList',
    method: 'post',
    data: data
  })
}


export function pageList(data) {
  return request({
    url: '/operate/order/audit/task/page',
    method: 'post',
    data: data
  })
}


//**2-根据dictType查询多个字典数据 */

export function selectMoreDictDataByDictType(data) {
  return request({
    url: '/operate/sysData/selectMoreDictDataByDictType',
    method: 'post',
    data: data
  })
}

//**1-修改数据字典值 */

export function updateDictValueByReq(data) {
  return request({
    url: '/operate/sysData/updateDictValueByReq',
    method: 'post',
    data: data
  })
}

//**黑名单-列表 */

export function selectList(data) {
  return request({
    url: '/operate/provider/ban/selectList',
    method: 'post',
    data: data
  })
}


//**黑名单-add */

export function insertBan(data) {
  return request({
    url: '/operate/provider/ban/insertBan',
    method: 'post',
    data: data
  })
}

//**黑名单-delete */

export function deleteBan(data) {
  return request({
    url: '/operate/provider/ban/deleteBan',
    method: 'post',
    data: data
  })
}


//*1-获取列表

export function getList(data) {
  return request({
    url: '/operate/provider/category/getList',
    method: 'post',
    data: data
  })
}
//*1-更新

export function update(data) {
  return request({
    url: '/operate/provider/category/update',
    method: 'post',
    data: data
  })
}





