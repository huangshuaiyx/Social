import request from '@/utils/request'
import {upbaseUrl} from "../../../config/index"
import axios from 'axios'

// 查询参数列表
export function getStrategyMessagePageList(data) {
  return request({
    url: '/operate/strategy/message/getStrategyMessagePageList',
    method: 'post',
    data: data
  })
}

// 查看策略信
export function getStrategyMessageFullContent(data) {
  return request({
    url: '/operate/strategy/message/getStrategyMessageFullContent',
    method: 'post',
    data: data
  })
}

//修改
export function saveStrategyMessageFullContent(data) {
  return request({
    url: '/operate/strategy/message/saveStrategyMessageFullContent',
    method: 'post',
    data: data
  })
}



//添加
export function increaseStrategyMessageTemplate(data) {
  return request({
    url: '/operate/strategy/message/increaseStrategyMessageTemplate',
    method: 'post',
    data: data
  })
}

// 修改状态
export function modifyStrategyMessageTemplate(data) {
  return request({
    url: '/operate/strategy/message/modifyStrategyMessageTemplate',
    method: 'post',
    data: data
  })
}

export function uploadFile(params) {
  return axios.post(`${upbaseUrl}/third/resource/uploadFile`, params, {
    // headers: {'Content-Type':'multipart/form-data'}
  })
}