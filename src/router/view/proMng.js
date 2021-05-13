/*
 * @Author: Lyl
 * @Date: 2021-01-29 14:14:56
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-13 13:31:41
 * @Description: 
 */
export default [
  // 生产管理 - 基础设定
  {
    path: '/ProWorkflowInfo',
    name: '生产工序',
    component: resolve => require(['@/view/proMng/ProWorkflow/index'], resolve)
  },
  {
    path: '/EquipmentType',
    name: 'Type',
    component: resolve => require(['@/view/proMng/EquipmentType/index'], resolve)
  },
  {
    path: '/ProWorkPackage',
    name: '生产工作包',
    component: resolve => require(['@/view/proMng/ProWorkPackage/index'], resolve)
  },
  //生产管理,
  {
    path: '/proSalSchedule',
    name: '生产排期',
    component: resolve => require(['@/view/pro/plan/order/index'], resolve)
  },
  {
    path: '/proScheduling',
    name: '生产排单',
    component: resolve => require(['@/view/proMng/Calculator/socket'], resolve)
  },
  // 报表
  {
    path: "/buffyPrints", // 布票打印記錄
    name: "buffyPrints",
    component: resolve => require(["@/view/proMng/buffyPrints/index"], resolve),
  },
  {
    path: "/clothFly", // 布票打印
    name: "clothFly",
    component: resolve => require(["@/view/proMng/print/clothFly/index"], resolve),
  },
  {
    path: "/output", // 生产日产量
    name: "生产日产量",
    component: resolve => require(["@/view/proMng/output/index"], resolve),
  },
  {
    path: "/outputSchedule", // 生产日产量
    name: "生产日产量",
    component: resolve => require(["@/view/proMng/outputSchedule/index"], resolve),
  },
  // // 染整工单
  {
    path: "/dyeing", // 染整工单
    name: "dyeing",
    component: resolve => require(["@/view/proMng/print/dyeing/index"], resolve),
  },
  {
    path: "/proWeaveJob", // 織造通知單打印
    name: "proWeaveJob",
    component: resolve => require(["@/view/proMng/print/proWeaveJob/index"], resolve),
  },
  {
    path: "/cropping", // 織造通知單打印
    name: "cropping",
    component: resolve => require(["@/view/proMng/cropping/index"], resolve),
  },
  {
    path: "/weaveRecord", // 織造通知單打印
    name: "weaveRecord",
    component: resolve => require(["@/view/proMng/WeaveJobRecord/index"], resolve),
  },
  {
    path: "/techCode", // 漂染工艺
    name: "techCode",
    component: resolve => require(["@/view/proMng/techCode/index"], resolve),
  },

  // {
  //   path: '/EquipmentSchedule',
  //   name: '设备排期',
  //   component: resolve => require(['@/view/proMng/EquipmentSchedule/index'], resolve)
  // },
]
