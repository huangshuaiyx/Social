import Vue from "vue";
import Vuex from "vuex";
import getters from './getters'
Vue.use(Vuex);
let userInfo = localStorage.getItem("jd-webapp") ? JSON.parse(localStorage.getItem("jd-webapp")) : {};
let zhifubao = localStorage.getItem("zf-webapp") ? JSON.parse(localStorage.getItem("zf-webapp")) : {};
//创建仓库
const store = new Vuex.Store({
    state: {
        shopCarArr: [],
        token: userInfo.token ? userInfo.token : "",
        userId: userInfo.userid ? userInfo.userid : "",
        username: userInfo.username ? userInfo.username : "",
        trelationId: userInfo.trelationId ? userInfo.trelationId : '',
        zhanghao:zhifubao.zhanghao ? zhifubao.zhanghao : "",
        name:zhifubao.name ? zhifubao.name:"",
        payAccountId:zhifubao.payAccountId ? zhifubao.payAccountId:"",
        paid:"" ,//已支付
        receivedgoods:"" ,//已收货
        // 二级类目列表
        leimuList: [],
        //商品分类
        bannerList:[],
        active:"",
        actives:"",
        dataSource:"",
        dataTypes:'',
        activename:'',
        position:'',
        offsetTop:'',
        scroll:''
    },
    actions: {},
    mutations: {
        // 改变二级类目列表
        CHANGE_LEIMULIST(state, data){
            state.leimuList = data
        },
        // 改变分类列表
        CHANGE_BANNERLIST(state, data){
            state.bannerList = data
        },
        // 改变分类列表
        SAVE_POSITION(state, position){
            state.position = position
        },
        //登录后改变 token userid username值
        loginchange(state, obj) {
            state.token = obj.token;
            state.userId = obj.userid;
            state.trelationId = obj.trelationId
            localStorage.setItem("jd-webapp", JSON.stringify(obj));
        },
        zhanghao(state,long){
            state.zhanghao=long.zhanghao;
            state.name=long.name;
            state.payAccountId = long.payAccountId
            localStorage.setItem("zf-webapp", JSON.stringify(long));
        },
        active(state,active){
            state.active = active
        },
        actives(state,actives){
            state.actives = actives
        },
        dataSource(state,dataSource){
            state.dataSource = dataSource
        },
        //搜索为空传参
        dataType(state,dataType){
            state.dataType = dataType
        },
        //搜索为空传参
        dataTypes(state,dataTypes){
            state.dataTypes = dataTypes
        },
        //首页tab
        activename(state,activename){
            state.activename = activename
        },
        //滚动条
        offsetTop(state,offsetTop){
                state.offsetTop = offsetTop
        },
        //滚动条
        scroll(state,scroll){
                state.scroll = scroll
        }
    },
    getters
})

//导出
export default store;