import base from './config/base'
import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import { handleResponse } from './config/handleResponse'
export let instance = axios.create(base)
// 代理服务器
export const agency = '/api/v1'
// 获取异步请求的url
const getUrl = (url) => `${agency}${url}`
// http request 拦截器
instance.interceptors.request.use(
  config => {
    sessionStorage['token'] && (config.headers.common['Authorization'] = sessionStorage['token'])// 每次发送请求是给请求头加上token
    // 加载loading遮罩层
    store.commit('showLoading')
    return config
  },
  error => Promise.reject(error)
)
// http response 拦截器
instance.interceptors.response.use(
  response => {
    // 隐藏loading遮罩层
    store.commit('hideLoading')
    return response
  },
  error => {
    // 隐藏loading遮罩层
    store.commit('hideLoading')
    return handleResponse(error)
  }
)
/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export const get = (url, params = {}) =>
  instance.get(getUrl(url), { params: params }).then(res => res.data).catch(err => err)
/**
 * 封装post请求
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
export const post = (url, data = {}, config = {}) =>
  instance.post(getUrl(url), data, config).then(res => res.data).catch(err => err)
/**
 * 封装post文件请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export const postFile = (url, data = {}) => {
  return instance.post(agency + url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data).catch(err => err)
}
/**
 * 封装patch文件请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export const patchFile = (url, data = {}) => {
  return instance.patch(agency + url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data).catch(err => err)
}
/**
 * 封装patch请求
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
export const patch = (url, data = {}, config = {}) =>
  instance.patch(getUrl(url), data, config).then(res => res.data).catch(err => err)
/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export const put = (url, data = {}) =>
  instance.put(getUrl(url), qs.stringify(data)).then(res => res.data).catch(err => err)
/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export const remove = (url, data = {}) =>
  instance.delete(getUrl(url), data).then(res => res.data).catch(err => err)
/**
 * 封装all请求
 * @param urls
 * @returns {Promise}
 */
export const all = (urls = []) =>
  axios.all(urls.map(url => instance.get(getUrl(url)))).then(axios.spread((...res) => res.map(res => res.data))).catch(err => err)
