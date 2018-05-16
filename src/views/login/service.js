import { post } from '@/service'

export const login = user => post('/login', user).then(res => res).catch(err => err)
