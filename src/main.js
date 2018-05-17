// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import './assets/style/index.styl'
import filters from '@/filter'

Vue.use(ElementUI)
Vue.config.productionTip = false
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.prototype.$_baseURL = 'http://10.93.1.100:8080'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
