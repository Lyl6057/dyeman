/*
 * @Author: Lyl
 * @Date: 2021-04-08 19:30:35
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-08 19:32:18
 * @Description:
 */

export default [
  //能源管理
  {
    path: "/Meter",
    name: "仪表维护",

    component: resolve => require(["@/view/Energy/Meter/index.vue"], resolve)
  },
  {
    path: "/Consume",
    name: "能耗记录",
    component: resolve => require(["@/view/Energy/Consume/index.vue"], resolve)
  },
  {
    path: "/egReport",
    name: "能耗成本核算",
    component: resolve => require(["@/view/Energy/egReport/index.vue"], resolve)
  }
];