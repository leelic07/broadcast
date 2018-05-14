import router from '@/router'
import { Message } from 'element-ui'

export default {
  state: {
    user: {}
  },
  mutations: {
    login: (state, user) => {
      if (user.username === 'admin' && user.password === '3m4c3n9J') {
        Message({
          showClose: true,
          type: 'success',
          message: '登录成功'
        })
        router.push('/broadcast')
      } else {
        Message({
          showClose: true,
          type: 'error',
          message: '用户名或者密码不正确'
        })
      }
    }
  }
}
