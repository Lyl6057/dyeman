/*
 * @Author: Lyl
 * @Date: 2021-01-23 08:03:49
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-10 16:21:40
 * @Description: 
 */
import Vue from 'vue'
import Router from 'vue-router'
// import cs from '@/router/view/cs'
// import da from '@/router/view/da'
// import em from '@/router/view/em'
// import lv from '@/router/view/lv'
// import mto from '@/router/view/mto'
// import pro from '@/router/view/pro'
// import re from '@/router/view/re'
// import iq from '@/router/view/iq'
import im from '@/router/view/im'
import quaLity from '@/router/view/quaLity'
import laboratory from './view/laboratory'
import proMng from './view/proMng'
Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: "hash",
  routes: [

    // {
    //   path: '/',
    //   name: 'login',
    //   component: resolve => require(['@/page/login/index'], resolve),

    // },
    {
      //生产管理
      path: '/',
      name: 'index',
      component: resolve => require(['@/page/index/index'], resolve),
      children: [
        // {
        //   path: '/home',
        //   name: '主页',
        //   component: resolve => require(['@/view/index'], resolve)
        // },
        // ...cs,
        // ...da,
        // ...em,
        // ...lv,
        // ...mto,
        // ...pro,
        // ...re,
        // ...iq,
        ...im,
        ...quaLity,
        ...laboratory,
        ...proMng
      ]
    },

  ]
})
