import axios from 'axios'
// 携带token
import {
  getToken,
  removeToken
} from '@/utils/token.js'
import router from '@/router/index.js'
import {
  Message
} from 'element-ui'

console.log('getToken:', getToken())
// 创建副本
const instance = axios.create({
  // 基地址
  baseURL: process.env.VUE_APP_BASEURL,
  // 跨域携带cookie
  withCredentials: true
})

// 拦截器
instance.interceptors.request.use(config => {
    // 设置token
    if (getToken()) {
      console.log('是否有token', getToken())
      config.headers.token = getToken()
    }
    return config
  },
  error => Promise.reject(error)
)
instance.interceptors.response.use(response => {
    // 路由导航守卫 无token或无效token，跳转登录页
    if (response.data.code === 206) {
      Message.warning(response.data.message)
      // 移除token
      removeToken()
      // 跳转登录页
      router.push('/login')
    }
    return response.data
  },
  error => Promise.reject(error)
)

// 暴露axios对象
export default instance
