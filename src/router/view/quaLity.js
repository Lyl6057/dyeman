/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:44
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-01 09:27:14
 * @Description:
 */
export default [
  //品质管理
  {
    path: "/",
    name: "主页",
    redirect: "/scanWeight"
  },
  // {
  //   path: "/test",
  //   name: "test",
  //   component: resolve => require(["@/view/quaLity/test/index"], resolve),
  //   meta: {
  //     keepAlive: true
  //   }
  // },
  
  {
    path: "/qaProductionCapacity",
    name: "QA产能统计",
    component: resolve =>
      require(["@/view/quaLity/qaProductionCapacity/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/qaCheckPlan",
    name: "QA计划进度",
    component: resolve =>
      require(["@/view/quaLity/qaCheckPlan/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/modifyFinished",
    name: "拆缸",
    component: resolve =>
      require(["@/view/quaLity/modifyFinished/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  
  {
    path: "/qcDetailReportByExcel",
    name: "Excel成品明细报表",
    component: resolve =>
      require(["@/view/quaLity/qcDetailReportByExcel/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/qcDetailReport",
    name: "成品明细报表",
    component: resolve =>
      require(["@/view/quaLity/qcDetailReport/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/qcTestReport",
    name: "qc验布报告",
    component: resolve => require(["@/view/quaLity/qcReport/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/finishedQc",
    name: "成品验布",
    component: resolve => require(["@/view/quaLity/finishedQc/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/noteCode",
    name: "布票打印",
    component: resolve => require(["@/view/quaLity/noteCode/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/weight",
    name: "胚布台账",
    component: resolve => require(["@/view/quaLity/weight/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/scanWeight",
    name: "胚布称重",
    component: resolve => require(["@/view/quaLity/scan/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/checkInWhse",
    name: "胚布审核入库",
    component: resolve =>
      require(["@/view/quaLity/checkInWhse/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/clothQc",
    name: "QC验布",
    component: resolve => require(["@/view/quaLity/clothQc/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/qualityMng",
    name: "品质项目管理",
    component: resolve => require(["@/view/quaLity/QuaLity/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/Laboratory",
    name: "化验室报告",
    component: resolve => require(["@/view/quaLity/Laboratory/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/Color",
    name: "批色管理",
    component: resolve => require(["@/view/quaLity/Color/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/Count",
    name: "检测统计",
    component: resolve => require(["@/view/quaLity/Count/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: '/demo',
  //   name: '测试页面',
  //   component: resolve => require(['@/view/quaLity/demo/demo'], resolve)
  // }
  {
    path: "/Policy",
    name: "决策树",
    component: resolve => require(["@/view/quaLity/Policy/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/Standard",
    name: "检验标准",
    component: resolve =>
      require(["@/view/quaLity/Standard/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/StandardDlg",
    name: "检验标准明細",
    component: resolve =>
      require(["@/view/quaLity/Standard/StandardDlg"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/testItem",
    name: "检测项目基础定义",
    component: resolve =>
      require(["@/view/quaLity/testItem/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/finishedCodeCard",
    name: "成品台账",
    component: resolve =>
      require(["@/view/quaLity/codeCard/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/finishedCheck",
    name: "成品审核入库",
    component: resolve =>
      require(["@/view/quaLity/finishedCheck/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/finalCard",
    name: "成品码卡",
    component: resolve => require(["@/view/quaLity/finalCard/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/codeCardQa",
    name: "QA成品码卡打印",
    component: resolve => require(["@/view/quaLity/codeCardQa/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/MarkMng",
    name: "唛头打印",
    component: resolve => require(["@/view/quaLity/MarkMng/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/shipmentCodeCard",
    name: "送板码卡打印",
    component: resolve =>
      require(["@/view/quaLity/finalCardGd/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/qcProBleadyeRunJob",
    name: "运转单备布统计",
    component: resolve =>
      require(["@/view/quaLity/qcProBleadyeRunJob/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/qcAbnormalDaily",
    name: "异常报告总表",
    component: resolve =>
      require(["@/view/quaLity/abnormalDaily/index"], resolve),
    meta: {
      keepAlive: true
    }
  }
];
