import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Login from '../views/Login.vue'
import SignIn from '../views/Sign In.vue'
import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'
import Task from '../views/Home/task.vue'
import Search from '../views/Home/search.vue'
import AccountSetting from '../views/Home/AccountSetting.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
      hidden: true
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      component: SignIn,
      hidden: true
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      // hidden: true
      children: [
        {
          path: '/task',
          name: 'task',
          component: Task
        },
        {
          path: '/search',
          name: 'search',
          component: Search
        },
        {
          path: '/accountsetting',
          name: 'zhanghaoshezhi',
          component: AccountSetting
        }
      ]
    }
  ]
})
