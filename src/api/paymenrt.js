import { requestPost,requestGet } from "../api/request";

// 用户迁移-获取转移目标(浏览器内)
export const getTarget = (params) => {
  return requestPost("/api/v1/ums/transfer/getTarget", params, {
    needLoading: true,
    jsonType: true,
    isNQS: true,
  });
};


// 查询商品布局
export const getProductlayout= params => {
  let formData = {
    appId: '300007' 
  }
  return requestGet(`https://s3.vchatgood.com/otovideochat/1001/${formData.appId}/h5/configurations.json`, params, {
    needLoading: false,
    jsonType: true,
    isNQS: true
  });
};