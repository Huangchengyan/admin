import Vue from "vue"
import axios from "axios"
import {
  baseURL,
  contentType,
  debounce,
  invalidCode,
  noPermissionCode,
  requestTimeout,
  successCode,
  tokenName,
} from "@/config/settings"
import store from "@/store"
import qs from "qs"
import router from "@/router"
import { isArray } from "@/utils/validate"
let loadingInstance
/*
 * @description 判断当前url是否需要加loading
 * @param {*} config
 * @returns
 */
const needLoading = (config) => {
  let status = false
  debounce.forEach((item) => {
    if (Vue.prototype.$baseLodash.includes(config.url, item)) {
      status = true
    }
  })
  return status
}
/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case invalidCode:
      Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, "error")
      store.dispatch("user/resetAccessToken").catch(() => {})
      break
    case noPermissionCode:
      router.push({
        path: "/401"
      }).catch(() => {})
      break
    default:
      Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, "error")
      break
  }
}

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": contentType,
  }
})

instance.interceptors.request.use(
  (config) => {
    if (store.getters["user/accessToken"]) {
      config.headers['AuthHeader'] = store.getters["user/accessToken"]
    }
    if (needLoading(config)) {
      loadingInstance = Vue.prototype.$baseLoading()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  response => {
    if ( loadingInstance ) loadingInstance.close()
    const {status,data,config} = response
    const {code,msg} = data
    const codeVerificationArray = isArray(successCode) ? [...successCode] :[...[successCode]]
    if (response.headers.authheader) {
      return data
    } else {
      return data
    }
  },
  error => {
    if (loadingInstance) loadingInstance.close()
    const { response, message } = error
    if (error.response && error.response.data) {
      const {status, data } = response
      switch (status){
        case 401:
        Vue.prototype.$baseMessage('登录已过期，请重新登录', "error")
        store.dispatch("user/resetAccessToken").catch(() => {})
        router.push('/login')
          break
        default:
          break
      }
      return
    } else {
      let {message} = error
      if (message === "Network Error") {
        Vue.prototype.$baseMessage('请检查网络是否断开', "error")
        store.dispatch("user/resetAccessToken").catch(() => {})
        router.push('/login')
        return
      }
      if (message.includes("timeout")) {
        message = "后端接口请求超时"
      }
      if (message.includes("Request failed with status code")) {
        const code = message.substr(message.length - 3)
        message = "后端接口" + code + "异常"
      }
      Vue.prototype.$baseMessage(message || `后端接口未知异常`, "error")
      return Promise.reject(error)
    }
  }
)

export default instance
