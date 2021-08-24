/*
 * @Author: Lyl
 * @Date: 2021-04-08 19:30:35
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-23 19:20:19
 * @Description:
 */

export default [
  //能源管理
  {
    path: "/",
    name: "主页",
    redirect: "/Meter"
  },
  {
    path: "/Meter",
    name: "仪表维护",

    component: resolve => require(["@/view/Energy/Meter/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/Consume",
    name: "能耗记录",
    component: resolve => require(["@/view/Energy/Consume/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/egReport",
    name: "能耗成本核算",
    component: resolve =>
      require(["@/view/Energy/egReport/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  }
];
