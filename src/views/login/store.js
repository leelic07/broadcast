import { login } from './service'
// import router from '@/router'
import { Message } from 'element-ui'

export default {
  state: {
    token: ''
  },
  actions: {
    login ({ commit }, user) {
      // if (user.username === 'admin' && user.password === '3m4c3n9J') {
      //   Message({
      //     showClose: true,
      //     type: 'success',
      //     message: '登录成功'
      //   })
      //   router.push('/broadcast')
      // } else {
      //   Message({
      //     showClose: true,
      //     type: 'error',
      //     message: '用户名或者密码不正确'
      //   })
      // }
      login(user).then(res => res.code === 200 && commit('login', user)).catch(err => console.log(err))
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
      } else {
        Message({
          type: 'error',
          message: '登录失败',
          showClose: true
        })
      }
    }
  },
  getters: {
    token: state => state.token
  }
}
