import { post } from '@/service'

export default {
  login: user => post('/login', user).then(res => res).catch(err => err)
}
