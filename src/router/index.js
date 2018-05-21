import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/router'
import broadcast from '@/views/broadcast/router'

Vue.use(Router)

const router = new Router({
  routes: [
    ...login,
    ...broadcast
  ]
})

// 路由守护
router.beforeEach((to, from, next) => {
  const token = sessionStorage['token']
  if (to.path !== '/login') {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else next()
})

export default router
