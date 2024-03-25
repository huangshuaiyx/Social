import request from '@/utils/request'

// 查询视频列表
export function getLearnListApi (data) {
    return request({
        url: '/operate/provider/learn/page',
        method: 'post',
        data: data
    })
}
// 删除列表视频
export function delLearnVideoListApi (data) {
    return request({
        url: '/operate/provider/learn/delete',
        method: 'post',
        data: data
    })
}
// 新增列表视频
export function addLearnVideoListApi (data) {
    return request({
        url: '/operate/provider/learn/uploadLearnVideo',
        method: 'post',
        data: data
    })
}
