import { requestPost, requestGet, requestDelete, requestPut } from './request.js'


/********************************** 公共请求 *******************************************/
// 公共post/get
export const post = (url, formData) => {
    return requestPost(url, formData, { needLoading: true, jsonType: true, isNQS: true })
}
export const puts = (url, formData) => {
    return requestPut(url, formData, { needLoading: true, jsonType: true, isNQS: true })
}
export const get = (url, params) => {
    return requestGet(url, params, { needLoading: true, jsonType: true })
}
export const deletes = (url, params) => {
    return requestDelete(url, params, { needLoading: true, jsonType: true, isNQS: true })
}

/********************************** 登录注册 *******************************************/
// 获取验证码
export const getSms = formData => {
    return requestPost("https://test-usercenter.mc.cn/sms", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 登录
export const loginBySms = formData => {
    return requestPost("https://test-usercenter.mc.cn/login/loginBySms", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 注册 
export const registerBySms = formData => {
    return requestPost("https://test-usercenter.mc.cn/register/registerBySms", formData, { needLoading: true, jsonType: true, isNQS: true })
}
//获取个人信息
export const viewBaseInfo = formData => {
    return requestPost("https://test-usercenter.mc.cn/userInfo/viewBaseInfo", formData, { needLoading: true, jsonType: true, isNQS: true })
}
//修改个人信息
export const changeBaseInfo = formData => {
    return requestPost("https://test-usercenter.mc.cn/userInfo/changeBaseInfo", formData, { needLoading: true, jsonType: true, isNQS: true })
}
//修改头像
export const changeHeadIcon2 = formData => {
    return requestPost("https://test-usercenter.mc.cn/userInfo/changeHeadIcon2", formData, { needLoading: true, jsonType: true, isNQS: true })
}

/********************************** 获取banner图片 *******************************************/
// 获取banner图片
export const getBanner = formData => {
    return requestPost("/banner/list", formData, { needLoading: false, jsonType: true, isNQS: true })
}


/********************************** 其他 *******************************************/
// 获取用户收益 
export const getTotalPriceDetail = formData => {
    return requestPost("/user/getTotalPriceDetail", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 判断是否绑定淘宝
export const getRidAndSidByUserId = () => {
    return requestPost("/user/getRidAndSidByUserId", {}, { needLoading: true, jsonType: true, isNQS: true })
}
// 首页数据
export const getRecommendTbGoods = formData => {
    return requestPost("/tb/findTbHotGoods", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 绑定用户信息
export const createRId = formData => {
    return requestPost("/user/h5/createRId", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 创建推广位
export const createPId = () => {
    return requestPost("/user/createPId", {}, { needLoading: true, jsonType: true, isNQS: true })
}
// 导航栏及搜索推荐商品
export const getNavigationGoodsByKeyWords = formData => {
    return requestPost("/recommend/getNavigationGoodsByKeyWords", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 支付宝提现
export const withdrawPrice = formData => {
    return requestPost("/user/withdrawPrice", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 用户首次登陆送钱
export const saveUserFirstPrice = formData => {
    return requestPost("/user/saveUserFirstPrice", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 拼多多第三方链接
export const createPddExtensionUrl = formData => {
    return requestPost("/user/pddAuthorization", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 获取搜索下拉提示词
export const getKeyWordsByWords = formData => {
    return requestPost("/recommend/getKeyWordsByWords", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 
export const getHotWords = formData => {
    return requestPost("/recommend/getHotWords", formData, { needLoading: true, jsonType: true, isNQS: true })
}

// 获取用户金额
export const getUserOrderPrice = formData => {
    return requestPost("/user/v2/getUserOrderPrice", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 绑定支付宝验证码 
export const sendBindVerifyCode = formData => {
    return requestPost("/user/sendBindVerifyCode", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 用户绑定支付宝 
export const bindPayInfo = formData => {
    return requestPost("/user/bindPayInfo", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// // 用户订单 
export const userOrder = params => {
    return requestGet("/user/v2/userOrder/", params, { needLoading: true, jsonType: true })
}
// 查询绑定支付宝信息 
export const getBindPayInfo = formData => {
    return requestPost("/user/getBindPayInfo", formData, { needLoading: true, jsonType: true, isNQS: true })
}
// 获取导航栏 
export const getPddGoodsCat = formData => {
    return requestPost("/goods/v2/getGoodsCat", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 修改支付宝
export const updateBindPayInfo = formData => {
    return requestPost("/user/updateBindPayInfo", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 查寻商品\二级分类
export const getCatGoods = formData => {
    return requestPost("/goods/getCatGoods", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 查寻商品详情
export const getGoodsDetails = formData => {
    return requestPost("/goods/getGoodsDetails", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 商品收藏
export const getput = formData => {
    return requestPost("/favorites/put", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 查询收藏列表
export const getGet = formData => {
    return requestPost("/favorites/get", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 可能喜欢
export const getmayLike = formData => {
    return requestPost("/favorites/mayLike", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 查询收藏状态
export const getstatus = formData => {
    return requestPost("/favorites/status", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 取消收藏
export const getdelete = formData => {
    return requestPost("/favorites/delete", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 获取榜单排行
export const getRankingGoods = formData => {
    return requestPost("/goods/getRankingGoods", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 获取九宫格
export const indexBarGoodsList = formData => {
    return requestPost("/goods/indexBarGoodsList", formData, { needLoading: false, jsonType: true, isNQS: true })
}
//获取搜索相关
export const getsearch = (params) => {
    return requestGet('/goods/search/' + params.page, params, { needLoading: true, jsonType: true })
}
//获取热门搜索词
export const hotWords = (params) => {
    return requestGet('/goods/v2/hotWords', params, { needLoading: true, jsonType: true })
}
// 搜索无果推荐商品
export const noGoodsRecommend = formData => {
    return requestPost("/goods/noGoodsRecommend", formData, { needLoading: false, jsonType: true, isNQS: true })
}
//获取用户订单详情
//参数 拼接id
export const userOrders = (params) => {
    return requestGet('/user/userOrder/' + params.id, { needLoading: true, jsonType: true })
}
//首页爆款推荐
export const faddish = (params) => {
    return requestGet('/tb/faddish/' + params.pageNum, params, { needLoading: true, jsonType: true })
}
// 京东商品跳转
export const getJdGoodsRecommendUrl = formData => {
    return requestPost("/jd/getJdGoodsRecommendUrl", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 相似商品
export const similarGoodsRecommend = formData => {
    return requestPost("/goods/similarGoodsRecommend", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 意见反馈
export const feedback = formData => {
    return requestPost("/feedback", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 用户提现详情
export const getCashOutDetail = formData => {
    return requestPost("/user/getCashOutDetail", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 一元购详情页
export const oneYuanGoods = formData => {
    return requestPost("/activity/oneYuanGoods", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 分享赚
export const shareGoods = formData => {
    return requestPost("/goods/shareGoods", formData, { needLoading: false, jsonType: true, isNQS: true })
}
// 分享赚
export const getDataSourceCat = formData => {
    return requestPost("/goods/getDataSourceCat", formData, { needLoading: false, jsonType: true, isNQS: true })
}

/***************************************第三方 ***********************/
// 淘宝登录
export const loginByCode = formData => {
    return requestPost("/login/loginByCode", formData, { needLoading: false, jsonType: true, isNQS: true })
}
/*************************************其他 */
// 是否是新人
export const banners = () => {
    return requestGet("/activity/v2/banners", {}, { needLoading: true, jsonType: true, isNQS: true })
}
// 新人列表
export const YuanGoods = formData => {
    return requestPost("/activity/oneYuanGoods", formData, { needLoading: false, jsonType: true, isNQS: true })
}
//查询消息
export const messageNews = (params) => {
    return requestGet('/message/list', params, { needLoading: true, jsonType: true })
}
//删除消息
export const newsDelete = (params) => {
    return requestDelete('/message/remove/' + params.id)
}
// 未读消息数量
export const newsUnReadCount = () => {
    return requestGet("/message/unReadCount", {}, { needLoading: true, jsonType: true, isNQS: true })
}
//消息已读接口
export const readPut = formData => {
    return requestPut("/message/read", formData, { needLoading: false, jsonType: true, isNQS: true })
}
//运营活动-查询运营活动
export const getOperationalActivityList = (params) => {
    return requestGet('/operationalActivity/getOperationalActivityList', params, { needLoading: true, jsonType: true })
}
//吱吱
export const squeakGoods = (params) => {
    return requestGet('/squeakGoods/v2/' + params.startTime)
}
//赚赚
export const earnIndexMarket = (params) => {
    return requestGet('/market/earnIndexMarket', params, { needLoading: true, jsonType: true })
}
//个人中心(今日,昨日,本月,上月预估)
export const total = (params) => {
    return requestGet('/user/income/total', params, { needLoading: true, jsonType: true })
}

/***************** 营销分类************************/
export const incomeTotal = (params) => {
    return requestGet('/market/type', params, { needLoading: true, jsonType: true })
}
//商学院列表
export const shoppingSchool = (params) => {
    return requestGet('/market/shoppingSchool/list', params, { needLoading: true, jsonType: true })
}
// 营销素材列表
export const material = (params) => {
    return requestGet('/market/material', params, { needLoading: true, jsonType: true })
}
// 营销爆款列表
export const Marketing = (params) => {
    return requestGet('/market/goods', params, { needLoading: true, jsonType: true })
}
//营销爆款分类
export const marketModuleType = (params) => {
    return requestGet('/marketModuleType/' + params.marketType)
}
// 某个时间点的收益统计
export const appointTime = (params) => {
    return requestGet('/user/income/appointTime', params, { needLoading: true, jsonType: true })
}
// 月详细收益记录
export const monthDetail = (params) => {
    return requestGet('/user/income/monthDetail', params, { needLoading: true, jsonType: true })
}
// 年详细收益记录
export const yearDetail = (params) => {
    return requestGet('/user/income/yearDetail', params, { needLoading: true, jsonType: true })
}
// 年详细收益记录
export const platform = (params) => {
    return requestGet('/user/income/platform', params, { needLoading: true, jsonType: true })
}
// 个人中心(今日收益,本月收益))
export const month = (params) => {
    return requestGet('/user/income/month', params, { needLoading: true, jsonType: true })
}
/*****************************   任务   **********************************/

// 查询邀请海报列表
export const invitationPoster = (params) => {
    return requestGet('/task/invitationPoster', params, { needLoading: true, jsonType: true })
}
// 我的团员信息
export const info = (params) => {
    return requestGet('/member/info', params, { needLoading: true, jsonType: true })
}
// 团长中心
export const center = (params) => {
    return requestGet('/member/center', params, { needLoading: true, jsonType: true })
}
// 任务状态
export const status = (params) => {
    return requestGet('/task/daily/status', params, { needLoading: true, jsonType: true })
}