/*
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-04 14:54:18
 * @Description: 
 */
import Vue from 'vue'
import VueX from 'vuex'
import getters from './getters'
import DIC from "./modules/dic"

Vue.use(VueX)
const store = new VueX.Store({
  modules: {
    DIC
  },
  state: {
    //要设置的全局访问的state对象,设置初始值
    isActive: false,
    left: 3,
    right: 21,
    phone: false,
    ldRecipeData: [],
    userOid: ""
  },
  getters: {
    //实时监听state值的变化
    getActive(state) {
      return state.isActive
    },
    getUser(state) {
      return state.userOid
    }
  },
  mutations: {
    setUser(state, value) {
      state.userOid = value
    },
    active(state, value) {
      state.isActive = value
    },
    Left(state, value) {
      state.left = value
    },
    Right(state, value) {
      state.right = value
    },
    Phone(state, value) {
      state.phone = value
    },
    ldRecipeData(state, value) {
      state.ldRecipeData = value
    }
  },
  actions: {
    setUsers(context, value) {
      context.commit('setUser', value)
    },
    isActive(context, value) {
      context.commit('active', value)
    },
    isLeft(context, value) {
      context.commit('Left', value)
    },
    isRight(context, value) {
      context.commit('Right', value)
    },
    isPhone(context, value) {
      context.commit('Phone', value)
    },
    isldRecipeData(context, value) {
      context.commit('ldRecipeData', value)
    }
  }
})

export default store
