/*
 * @Author: Lyl
 * @Date: 2021-01-29 14:14:56
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-02 08:14:47
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
    path: "/buffyPrints",
    name: "buffyPrints",
    component: resolve => require(["@/view/proMng/buffyPrints/index"], resolve),
  },
  {
    path: "/clothFly",
    name: "clothFly",
    component: resolve => require(["@/view/proMng/print/clothFly/index"], resolve),
  },
  // {
  //   path: '/EquipmentSchedule',
  //   name: '设备排期',
  //   component: resolve => require(['@/view/proMng/EquipmentSchedule/index'], resolve)
  // },
  // // {
  // //   path: '/ProWorkflowInfo',
  // //   name: '生产工序',
  // //   component: resolve => require(['@/view/proMng/ProWorkflow/index'], resolve)
  // // },

  // {
  //   path: '/ProExceptionDay',
  //   name: '例外时间表',
  //   component: resolve => require(['@/view/proMng/ProExceptionDay/index'], resolve)
  // },
  // {
  //   path: '/ProCalendar',
  //   name: '工作日历',
  //   component: resolve => require(['@/view/proMng/ProCalendar/index'], resolve)
  // },
  // {
  //   path: '/ProScheduleChecItem',
  //   name: '检验方法清单',
  //   component: resolve => require(['@/view/proMng/ProScheduleChecItem/index'], resolve)
  // }, {
  //   path: '/ProWorkOrder',
  //   name: '生产工作指令单',
  //   component: resolve => require(['@/view/proMng/ProWorkOrder/index'], resolve)
  // },


  // {
  //   path: '/ProRuleSetup',
  //   name: '生产排单逻辑',
  //   component: resolve => require(['@/view/proMng/ProRuleSetup/index'], resolve)
  // },
  // {
  //   path: '/print',
  //   name: '打印',
  //   component: resolve => require(['@/view/proMng/print/index'], resolve),
  //   children: [
  //     // 申购入库

  //   ]
  // }
]
