export default {
  // 判断是否绑定淘宝，有值说明绑定
  trelationId: state => state.trelationId,
  // 用户登录
  token: state => state.token,
  // 二级类目列表
  leimuList: state => state.leimuList,
  //分类列表
  bannerList: state => state.bannerList
}