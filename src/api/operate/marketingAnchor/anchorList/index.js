import request from '@/utils/request'
import axios from 'axios'

import {upbaseUrl} from "../../../../config/index"
console.log(upbaseUrl,"接口api")

// 查询参数列表
export function getMarketAnchorPageList(data) {
  return request({
    url: '/operate/market/anchor/getMarketAnchorPageList',
    method: 'post',
    data: data
  })
}

// 修改主播在线状态
export function modifyMarketAnchorOnlineStatus(data) {
  return request({
    url: '/operate/market/anchor/modifyMarketAnchorOnlineStatus',
    method: 'post',
    data: data
  })
}

//修改
export function getMarketAnchorInformation(data) {
  return request({
    url: '/operate/market/anchor/getMarketAnchorInformation',
    method: 'post',
    data: data
  })
}

//生成主播
export function createMarketAnchor(data) {
  return request({
    url: '/operate/market/anchor/createMarketAnchor',
    method: 'post',
    data: data
  })
}
// 单个上传
export function uploadImg(params) {
  return axios.post(`${upbaseUrl}/third/resource/uploadAndGetFileInformation`, params, {
    // headers: {'Content-Type':'multipart/form-data'}
  })
}
// 批量上传
export function AlluploadImg(params) {
  return axios.post(`${upbaseUrl}/third/resource/batchUploadAndGetFileInformation`, params, {
    // headers: {'Content-Type':'multipart/form-data'}
  })
}

//修改主播
export function modifyMarketAnchorInformation(data) {
  return request({
    url: '/operate/market/anchor/modifyMarketAnchorInformation',
    method: 'post',
    data: data
  })
}

//修改主播招呼语
export function modifyMarketAnchorCall(data) {
  return request({
    url: '/operate/market/anchor/modifyMarketAnchorCall',
    method: 'post',
    data: data
  })
}


// 修改标签
export function insertOperationTag(data) {
  return request({
    url: '/operate/tag/insertOperationTag',
    method: 'post',
    data: data
  })
}


// 删除资源
export function delResource(data) {
  return request({
    url: '/operate/anchor/examine/delResource',
    method: 'post',
    data: data
  })
}


// 相册
export function increaseMarketAnchorResource(data) {
  return request({
    url: '/operate/market/anchor/increaseMarketAnchorResource',
    method: 'post',
    data: data
  })
}
// 形象视频上传
export const uploadImageVideoApi = (data)=>{
    return request({
        url: '/operate/provider/info/uploadImageVideo',
        method: 'post',
        data: data
      })
}
// 删除用户标签
export function delTagAndUserRelation(data) {
  return request({
    url: '/operate/tag/delTagAndUserRelation',
    method: 'post',
    data: data
  })
}

// 批量新增
export function batchIncreaseMarketAnchorResource(data) {
  return request({
    url: '/operate/market/anchor/batchIncreaseMarketAnchorResource',
    method: 'post',
    data: data
  })
}
