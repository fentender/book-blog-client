import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'

//开启Mock服务进行测试,测试时使用
//import './mock/mock.js';

import './http/http.js';

//拦截请求


Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
