import { get } from '@/service'

export const getRecordings = () => get('/recordings').then(res => res).catch(err => err)
