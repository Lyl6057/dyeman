/*
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-25 09:55:06
 * @Description:
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import VueParticles from "vue-particles";
import Sortable from "sortablejs";
import store from "./store";
import "./styles/index.styl";
import "./styles/iconfont/iconfont.js";
import "./styles/iconfont/iconfont.css";
import "./config/axios";
import "default-passive-events";
import echarts from "echarts"; // echarts
import i18n from "./lang"; // Internationalization
import Print from "vue-print-nb";
import vGanttChart from "v-gantt-chart";
import Directives from "./instruct/index";
import _ from "lodash";
// import Fragment from 'vue-fragment'
// Vue.use(Fragment.Plugin)
Vue.use(vGanttChart);
// Global instruction
Vue.use(Print);
Vue.use(Directives);
// 指令
import "./instruct/v-drap";
// import './styles/element-variables.scss'
import { success, error, warning, info, cofirm } from "./config/seal";
import {
  getDIC,
  getDicT,
  getNowTime,
  unique,
  toTableLow,
  preFixInt
} from "./config/index";
// import { http } from './config/api'
// import i18n from './lang' // Internationalization
import viewContainer from "./components/view-container/index";
import comNormal from "./components/normal";
// 注册全局容器
Vue.component("viewContainer", viewContainer);
Vue.component("comNormal", comNormal);
//粒子特效
// Vue.use(VueParticles);
// Vue.use(ElementUI);

Vue.prototype.$echarts = echarts; // echarts
Vue.config.productionTip = false;

Vue.prototype.$codeValue = getDIC;
Vue.prototype.$codeValueT = getDicT;
Vue.prototype.$getNowTime = getNowTime;
Vue.prototype.$unique = unique;
Vue.prototype.$sortable = Sortable;
Vue.prototype.$toTableLow = toTableLow;
Vue.prototype.$preFixInt = preFixInt;
Vue.prototype._ = _;

Vue.prototype.$tip = {
  success,
  error,
  warning,
  info,
  cofirm
}; // 添加 axios 到 vue原型链；
// Vue.prototype.$axios = axios
// Vue.prototype.$http = http
Vue.prototype.$http = axios; // 添加 axios 到 vue原型链；
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
  size: "mini"
});
Vue.use(Avue, {
  i18n: (key, value) => i18n.t(key, value),
  size: "mini"
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  i18n,
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
