// import Vue from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import config from '../../settings/index'
// import router from '../router'
//
// Vue.use(VueAxios, axios)
//
// const regs = []
// Object.keys(config.apiUrls).forEach((key) => {
//   let reg = new RegExp(key)
//   regs.push({reg, value: config.apiUrls[key]})
// })
//
// Vue.axios.interceptors.request.use((config) => {
//   // 前端proxy
//   let url = config.url
//   for (let i = 0; i < regs.length; i++) {
//     let item = regs[i]
//     if (item.reg.test(url)) {
//       config.url = url.replace(item.reg, item.value)
//     }
//   }
//   config.headers.token = window.sessionStorage.getItem('apptoken')
//   return config
// }, (err) => {
//   console.log(err)
//   return Promise.reject(err)
// })
//
// Vue.axios.interceptors.response.use((res) => {
//   if (res && res.status === 200) {
//     res = res.data
//     if (!res || res.code === 301) {
//       window.sessionStorage.removeItem('apptoken')
//       router.replace('/login')
//     }
//   }
//   return res
// }, (err) => {
//   console.log(err)
//   return Promise.reject(err)
// })
