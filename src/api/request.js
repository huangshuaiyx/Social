import http from "./index.js";
import qs from "qs";
/**
 *  * configs 参数说明
 * notNeedToken Boolean 不需要token
 * isNQS Boolean 不需要qs处理参数
 * jsonType Boolean 请求为jsonType 需要配置请求头
 * needLoading Boolean 是否需要加载动画
 */
/**post**/
export const requestPost = (url, data = {}, configs = {}) => {
  let cloData = typeof data == "string" ? data : { ...data };
  let headers = {
    "Content-Type": "application/json; charset=UTF-8",
  };
  let needLoading = false;
  if (!configs.jsonType) {
    headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
  }
  if (cloData.headers) {
    headers = { ...headers, ...cloData.headers };
  }
  if (configs.needLoading) {
    needLoading = true;
  }
  delete cloData.headers;
  if (!configs.isNQS) {
    cloData = qs.stringify(cloData);
  }
  return http.request({
    method: "post",
    url,
    data: cloData,
    headers,
    needLoading,
  });
};
/**get*/
export const requestGet = (url, params = {}, configs = {}) => {
  let cloParams = { ...params };
  let headers = {
    "Content-Type": "application/json; charset=UTF-8"
  };
  let needLoading = false;
  if (!configs.jsonType) {
    headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    };
  }
  if (params.headers) {
    headers = { ...headers, ...params.headers };
  }
  if (configs.needLoading) {
    needLoading = true;
  }
  delete cloParams.headers;
  return http.request({
    method: "get",
    url,
    params: cloParams,
    headers,
    needLoading
  });
};
