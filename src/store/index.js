import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'
import { queryDictListByType, getNextTaskd,receiveTask } from "../api/operate/anchorReview/reviewList/index"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    formDataS: {},
    buttonPower: [],
    property: "",
    contextData: [],
    radio: 0,
    myInterId: null
  },
  mutations: {
    CHANNELDATA(state, params) {
      state.formDataS = params;
      console.log(state.formDataS)
    },
    setTest(state, data) {
      console.log(state.buttonPower, data, "vuex")
      state.buttonPower = data;//data是state存的值
    },
    property(state, data) {
      console.log(data)
      state.property = data;//data是state存的值
    },
    QUERYDICT(state, data) {
      state.contextData = data
      console.log(state.contextData, data)
    },
    RADIO(state, data) {
      state.radio = data
      console.log(state.contextData, data,"vuex")
    },
    MYTNTERVAL(state, data) {
      state.myInterId = data
      console.log(state.contextData, data,"vuex")
    },
  },
  actions: {
    // 多个字典数据
    queryDictListByType(context, x) {
      console.log(x);
      return new Promise((resolve, reject) => {
        queryDictListByType(x)
          .then(res => {
            resolve(res);
            if (res.code == 200) {
              console.log(res)
              commit("QUERYDICT", res.data);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    query(context, x) {
      console.log(x);
      return new Promise((resolve, reject) => {
        getNextTaskd(x)
          .then(res => {
            resolve(res);
            if (res.code == 200) {
              console.log(res)
              commit("setTest", res.data.taskList);
              commit("property", res.data.taskType);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    receiveTaskd(context, x) {
      return new Promise((resolve, reject) => {
        receiveTask(x).then(res => {
          console.log("接单", res.data, res.data == '未开启任何等级权限')
          if (res.code == 200) {
            if (res.data == "未开启任何等级权限") {
              // this.getTaskStatisticsd()
              clearInterval(myIntervald);
               let myIntervald = setInterval(() => {
                    this.receiveTaskd()
                    console.log("允许")
                }, 2000);
                
            } else {
              this.clearfn()
            }
          } else if (res.code == 405) {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
              this.receiveTaskd()
            }, 2000);
          }
        })
      })
    },

  },
  modules: {
    app,
    user,
    tagsView,
    permission,
    settings
  },
  getters
})

export default store
