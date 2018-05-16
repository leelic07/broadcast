import { login } from './service'
import router from '@/router'
import { Message } from 'element-ui'

export default {
  state: {
    token: ''
  },
  actions: {
    login ({ commit }, user) {
      login(user).then(res => commit('login', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    login (state, loginResult) {
      const token = loginResult.token
      const code = loginResult.code
      sessionStorage.setItem('token', token)
      state.token = token
      if (code === 200) {
        Message({
          type: 'success',
          message: '登录成功',
          showClose: true
        })
        router.push({
          path: '/broadcast'
        })
      } else {
        Message({
          type: 'error',
          message: '用户名或者密码不正确',
          showClose: true
        })
      }
    }
  },
  getters: {
    token: state => state.token
  }
}
