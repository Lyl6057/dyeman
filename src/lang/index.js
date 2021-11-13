/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:44
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-12 11:21:17
 * @Description:
 */
import Vue from "vue";
import VueI18n from "vue-i18n";
import elementEnLocale from "element-ui/lib/locale/lang/en"; // element-ui lang
import elementZhLocale from "element-ui/lib/locale/lang/zh-TW"; // element-ui lang
import elementViLocale from "element-ui/lib/locale/lang/vi.js"; // element-ui lang
import enLocale from "./en";
import zhLocale from "./zh";
import viLocale from "./vi";
// import {
//   getStore
// } from '@/util/store'
import Avue from "@smallwei/avue/lib/avue.js";
Vue.use(VueI18n);
const messages = {
  2: {
    //英文
    ...enLocale,
    ...elementEnLocale,
    ...Avue.locale.en
  },
  1: {
    //繁体
    ...zhLocale,
    ...elementZhLocale,
    ...Avue.locale.zh
  },
  3: {
    //越南语
    ...viLocale,
    ...elementViLocale,
    ...Avue.locale.vn
  }
};
//解析cookie的语言
let lang;
document.cookie.split(";").forEach((item, index) => {
  if (item.includes("ucml_Language")) {
    lang = item.split("=")[1];
  }
});

//配置多语言
const i18n = new VueI18n({
  locale: lang || "1",
  messages,
  silentTranslationWarn: true
});

export default i18n;
