/*
 * @Author: Lyl
 * @Date: 2021-01-29 14:14:56
 * @LastEditors: Lyl
 * @LastEditTime: 2022-01-10 13:18:09
 * @Description:
 */
export default [
  // 生产管理 - 基础设定
  {
    path: "/",
    name: "主页",
    redirect: "/ProWorkflowInfo"
  },
  {
    path: "/ProWorkflowInfo",
    name: "生产工序",
    component: resolve => require(["@/view/proMng/ProWorkflow/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/gantt",
    name: "gantt",
    component: resolve => require(["@/view/proMng/gantt/index"], resolve),
    meta: {
      keepAlive: false
    }
  },
  {
    path: "/EquipmentType",
    name: "生产设备",
    component: resolve =>
      require(["@/view/proMng/EquipmentType/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/ProWorkPackage",
    name: "生产工作包",
    component: resolve =>
      require(["@/view/proMng/ProWorkPackage/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  //生产管理,
  {
    path: "/proSalSchedule",
    name: "生产排期",
    component: resolve => require(["@/view/proMng/orderSchedule/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proScheduling",
    name: "生产排单",
    component: resolve => require(["@/view/proMng/Calculator/socket"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/ldOrder",
    name: "LD通知單",
    component: resolve => require(["@/view/proMng/ldOrder/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/dyeNotice",
    name: "染整通知單",
    component: resolve => require(["@/view/proMng/dyeNotice/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/finalizeDesign",
    name: "定型指令单",
    component: resolve =>
      require(["@/view/proMng/finalizeDesign/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/afterArrange",
    name: "后整指令单",
    component: resolve =>
      require(["@/view/proMng/afterArrange/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: `/codeCard`,
    name: "出缸/定后码卡",
    component: resolve => require(["@/view/proMng/codeCard/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: `/codeCard/:type`,
  //   name: "定型批色",
  //   component: resolve => require(["@/view/proMng/codeCard/index"], resolve),
  //   meta: {
  //     keepAlive: true
  //   }
  // },

  // 报表
  {
    path: "/buffyPrints", // 布票打印記錄
    name: "布票打印記錄",
    component: resolve => require(["@/view/proMng/buffyPrints/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/clothFly", // 布票打印
    name: "布票打印",
    component: resolve =>
      require(["@/view/proMng/print/clothFly/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/output", // 生产日产量
    name: "生产日产量",
    component: resolve => require(["@/view/proMng/output/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/outputSchedule", // 生产日产量
    name: "生产进度",
    component: resolve =>
      require(["@/view/proMng/outputSchedule/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // // 染整工单
  {
    path: "/dyeing", // 染整工单
    name: "染整工单",
    component: resolve =>
      require(["@/view/proMng/print/dyeing/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proWeaveJob", // 織造通知單打印
    name: "織造通知單",
    component: resolve =>
      require(["@/view/proMng/print/proWeaveJob/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proOutWeaveJob", // 外发織造通知單打印
    name: "外发織造通知單",
    component: resolve =>
      require(["@/view/proMng/print/proOutWeaveJob/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/yarnBatch", // 纱缸查织单
    name: "纱缸查织单",
    component: resolve => require(["@/view/proMng/yarnBatch/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: "/cropping", // 織造通知單打印
  //   name: "cropping",
  //   component: resolve => require(["@/view/proMng/cropping/index"], resolve)
  // },
  // {
  //   path: "/weaveRecord", // 織造通知單打印
  //   name: "weaveRecord",
  //   component: resolve =>
  //     require(["@/view/proMng/WeaveJobRecord/index"], resolve)
  // },
  {
    path: "/techCode", // 漂染工艺
    name: "漂染工艺",
    component: resolve => require(["@/view/proMng/techCode/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/revolve", // 染整生产运转单
    name: "生产运转单",
    component: resolve => require(["@/view/proMng/revolve/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/ldDrawDesign",
    name: "LD打样",
    component: resolve =>
      require(["@/view/proMng/ldDrawDesign/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/colorSend",
    name: "批色送办",
    component: resolve => require(["@/view/proMng/colorSend/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/colorRepair",
    name: "批色回修单",
    component: resolve => require(["@/view/proMng/colorRepair/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/proDriving",
    name: "行车监控",
    component: resolve => require(["@/view/proMng/driving/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/orderReview",
    name: "工单审核",
    component: resolve => require(["@/view/proMng/orderReview/index"], resolve),
    meta: {
      keepAlive: true
    }
  }
  // {
  //   path: '/EquipmentSchedule',
  //   name: '设备排期',
  //   component: resolve => require(['@/view/proMng/EquipmentSchedule/index'], resolve)
  // },
];
