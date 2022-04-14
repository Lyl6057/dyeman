/*
 * @Author: Lyl
 * @Date: 2021-01-23 08:03:49
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-13 14:32:07
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index";
// import cs from '@/router/view/cs'
// import da from '@/router/view/da'
// import em from '@/router/view/em'
// import lv from '@/router/view/lv'
// import mto from '@/router/view/mto'
// import pro from "@/router/view/pro";
// import re from '@/router/view/re'
// import iq from '@/router/view/iq'
import whseMng from "@/router/view/im";
// import quaLity from "@/router/view/quaLity";
// import laboratory from "./view/laboratory";
// import proMng from "./view/proMng";
// import energy from "./view/energy";
Vue.use(Router);
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
  mode: "hash",
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: resolve => require(['@/page/login/index'], resolve),

    // },
    {
      //生产管理
      path: "/",
      name: "index",
      component: resolve => require(["@/page/index/index"], resolve),
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
        ...whseMng
        // ...quaLity
        // ...laboratory
        // ...proMng
        // ...energy
      ]
    },
    {
      path: "/404",
      name: "404",
      component: resolve => require(["@/page/index/404"], resolve)
    },
    {
      path: "/*",
      redirect: "/404"
    }
  ]
});

//当路由进入前
router.beforeEach((to, from, next) => {
  //to去哪里    from从哪来   next放行
  // document.title = to.meta.title
  handleTagViewAndKeeplive(to);
  next();
});

export default router;

/**
 * 处理面包屑
 * @params to 路由变化
 */
export function handleTagViewAndKeeplive(to) {
  if (to != null && to.meta.keepAlive) {
    // 判断要添加的 to 是否是公共路由
    // for (let i = 0; i < constantRoutes.length; i++) {
    //   if (constantRoutes[i].path === to.path) {
    //     return
    //   }
    // }
    // 判断是否为刷新操作，如果是刷新操作则从 sessionStorage 获取保存的 tagView 信息
    let tagViewOnSS = [];
    // JSON.parse(window.sessionStorage.getItem("tagView")) === null
    //   ? window.sessionStorage.setItem("tagView", "[]")
    //   : (tagViewOnSS = JSON.parse(window.sessionStorage.getItem("tagView")));
    if (store.getters.getTagView.length === 0 && tagViewOnSS.length !== 0) {
      store.commit("SET_TAG_VIEW", tagViewOnSS);
    } else {
      const t = {
        fullPath: to.fullPath,
        name: to.name,
        title: to.meta.name,
        icon: to.meta.icon,
        keepAlive: to.meta.keepAlive || false
      };
      if (t.name) {
        store.commit("ADD_TAG_VIEW", t);
      }
      // console.log(store.state.user.tagView);
    }

    // } else {
    //   addTagView(to)
    // }
  }
}
