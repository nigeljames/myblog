import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import vueResource from 'vue-resource'
import moment from "moment"
import VueMomentJS from "vue-momentjs"
import socket from 'vue-socket.io'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });

Vue.use(store)
Vue.use(vueResource)
Vue.use(VueMomentJS, moment)
Vue.use(VueLodash, lodash)
Vue.use(socket, 'http://localhost:5000', store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})