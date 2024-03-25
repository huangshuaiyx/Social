import request from '@/utils/request'
import axios from 'axios'

import {upbaseUrl} from "../../../../config/index"
console.log(upbaseUrl,"接口api")

// 查询参数列表
export function popularByPage(data) {
  return request({
    url: '/operate/user/manager/popularByPage',
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



