/*
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-25 11:17:03
 * @Description:
 */
import Vue from "vue";
import VueX from "vuex";
import getters from "./getters";
import DIC from "./modules/dic";
import whse from "./modules/whse"
Vue.use(VueX);
const store = new VueX.Store({
  modules: {
    DIC,
    whse
  },
  state: {
    //要设置的全局访问的state对象,设置初始值
    isActive: false,
    left: 3,
    right: 21,
    phone: false,
    ldRecipeData: [],
    userOid: "",
    lang: "1",
    tagView: [],
    spowerClient:null,
    // 当前登录用户
    loginUser: "",
    // 是否是外发厂
    isOutFactory: false,
  },
  getters: {
    ...getters,
    //实时监听state值的变化
    getSpowerClient(state) {
      return state.spowerClient;
    },
    getActive(state) {
      return state.isActive;
    },
    getUser(state) {
      return state.userOid;
    },
    getLang(state) {
      return state.lang;
    },
    getTagView: state => {
      return state.tagView;
    },
    getLoginUser:  state => state.loginUser
  },
  mutations: {
    SET_IS_OUT_FACTORY(state, isOutFactory){
      state.isOutFactory = isOutFactory
    },
    SET_SPOWERCLIENT(state, value){
      state.spowerClient = value
    },
    setUser(state, value) {
      state.userOid = value;
    },
    SET_LOGIN_USER(state, value){
      state.loginUser = value;
    },
    setLang(state, value) {
      state.lang = value;
    },
    active(state, value) {
      state.isActive = value;
    },
    Left(state, value) {
      state.left = value;
    },
    Right(state, value) {
      state.right = value;
    },
    Phone(state, value) {
      state.phone = value;
    },
    ldRecipeData(state, value) {
      state.ldRecipeData = value;
    },
    ADD_TAG_VIEW: (state, payload) => {
      const size = state.tagView.length;
      // 首次进入或刷新页面时，当前路由不是根路由
      if (!size && payload.fullPath !== "/") {
        state.tagView.push(payload);
        return;
      }
      // 为了避免 tagView 重复添加。 构建一个以 fullPath 为标识的数组 t[]
      const t = [];
      for (let i = 0; i < size; i++) {
        t.push(state.tagView[i].fullPath);
      }
      if (t.indexOf(payload.fullPath) === -1) {
        state.tagView.push(payload);
      }
    },
    SET_TAG_VIEW: (state, payload) => {
      state.tagView = payload;
    },
    REMOVE_TAG_VIEW: (state, payload) => {
      switch (typeof payload) {
        case "undefined":
          state.tagView = [];
          window.sessionStorage.setItem("tagView", "[]");
          router.push("/");
          break;
          // case 'object':
          //   removeOneSide(state, payload)
          break;
        default:
          removeATagView(state, payload);
      }
    }
  },
  actions: {
    setSpowerClient(context, value){
      context.commit("SET_SPOWERCLIENT", value)
    },
    setUsers(context, value) {
      context.commit("setUser", value);
    },
    setLoginUser({commit}, value){
      commit("SET_LOGIN_USER",value)
    },
    setLangs(context, value) {
      context.commit("setLang", value);
    },
    isActive(context, value) {
      context.commit("active", value);
    },
    isLeft(context, value) {
      context.commit("Left", value);
    },
    isRight(context, value) {
      context.commit("Right", value);
    },
    isPhone(context, value) {
      context.commit("Phone", value);
    },
    isldRecipeData(context, value) {
      context.commit("ldRecipeData", value);
    }
  }
});

export default store;
