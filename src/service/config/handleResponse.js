import { Message } from 'element-ui'

export const handleResponse = (error) => {
  const message = (message, type = 'error', showClose = true) => Message({type, message, showClose})
  const status = error.response ? error.response.status : 'undefined'
  switch (status) {
    case 504:
      message('确定服务器启动')
      break
    case 404:
      message('找不到服务器资源')
      break
    case 403:
      message('当前用户未授权')
      break
    case 'undefined':
      message('服务端未响应，请求超时')
      break
    default:
      message(error.message)
  }
  return Promise.reject(error)
}
