/**
 * Created by Administrator on 2018/1/15/015.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    head: sessionStorage.getItem('headpic')
  },
  mutations: {
    newHead (state, pic) {
      state.head = pic
    }
  }
})

export default store
