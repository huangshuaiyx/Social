
import authorization from './authorization/index.vue'
import purchase from './purchase/index.vue'


export default {
    install(Vue) {
        Vue.component('authorization', authorization)
        Vue.component('purchase', purchase)
    }
}