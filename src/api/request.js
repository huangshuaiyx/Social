import http from './index.js'
import store from "@/store/index.js"
import qs from 'qs'

/**
 ** configs 参数说明
 * notNeedToken Boolean 不需要token
 * isNQS Boolean 不需要qs处理参数
 * jsonType Boolean 请求为jsonType 需要配置请求头
 * needLoading Boolean 是否需要加载动画
 */

/**get*/
export const requestGet = (url, params = {}, configs = {}) => {
  let headers = {
    'Content-Type': 'application/json; charset=UTF-8'
  }
  let needLoading = false
  if (!configs.jsonType) {
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  if (configs.needLoading) {
    needLoading = true
  }
  if (store.state.token) headers.token = store.state.token
  if (store.state.userId) headers.userId = store.state.userId
  return http.request({
    method: 'get',
    url,
    params,
    headers,
    needLoading
  })
}
/**detele*/
export const requestDelete = (url, params = {}, configs = {}) => {
  let headers = {
    'Content-Type': 'application/json; charset=UTF-8'
  }
  let needLoading = false
  if (!configs.jsonType) {
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  if (configs.needLoading) {
    needLoading = true
  }
  if (store.state.token) headers.token = store.state.token
  if (store.state.userId) headers.userId = store.state.userId
  return http.request({
    method: 'delete',
    url,
    params,
    headers,
    needLoading
  })
}

/**post*/
export const requestPost = (url, data = {}, configs = {}) => {
  let headers = {
    'Content-Type': 'application/json; charset=UTF-8'
  }
  let needLoading = false
  if (!configs.isNQS) {
    data = qs.stringify(data)
  }
  if (!configs.jsonType) {
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  if (configs.needLoading) {
    needLoading = true
  }
  if (store.state.token) headers.token = store.state.token
  if (store.state.userId) headers.userId = store.state.userId
  return http.request({
    method: 'post',
    url,
    data,
    headers,
    needLoading
  })
}

/**Put*/
export const requestPut = (url, data = {}, configs = {}) => {
  let headers = {
    'Content-Type': 'application/json; charset=UTF-8'
  }
  let needLoading = false
  if (!configs.isNQS) {
    data = qs.stringify(data)
  }
  if (!configs.jsonType) {
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  if (configs.needLoading) {
    needLoading = true
  }
  if (store.state.token) headers.token = store.state.token
  if (store.state.userId) headers.userId = store.state.userId
  return http.request({
    method: 'put',
    url,
    data,
    headers,
    needLoading
  })
}
