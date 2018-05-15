import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/router'
import broadcast from '@/views/broadcast/router'

Vue.use(Router)

export default new Router({
  routes: [
    ...login,
    ...broadcast
  ]
})
