/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:44
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-23 16:53:19
 * @Description:
 */
export default [
  //规则引擎
  {
    path: "/reUp",
    name: "上行规则",
    component: resolve => require(["@/view/re/Up/index"], resolve)
  },
  {
    path: "/reDown",
    name: "下行规则",
    component: resolve => require(["@/view/re/Down/index"], resolve)
  },
  {
    path: "/reWarn",
    name: "预警规则",
    component: resolve => require(["@/view/re/Warn/index"], resolve)
  },
  {
    path: "/reEvent",
    name: "事件规则",
    component: resolve => require(["@/view/re/Event/index"], resolve)
  }
];
