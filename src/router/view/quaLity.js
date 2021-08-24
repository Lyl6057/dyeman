/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:44
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-23 19:13:08
 * @Description:
 */
export default [
  //品质管理
  {
    path: "/",
    name: "主页",
    redirect: "/weight"
  },
  {
    path: "/weight",
    name: "称重",
    component: resolve => require(["@/view/quaLity/weight/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/scanWeight",
    name: "QC验布",
    component: resolve => require(["@/view/quaLity/scan/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/checkInWhse",
    name: "审核入库",
    component: resolve =>
      require(["@/view/quaLity/checkInWhse/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/quaLity",
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
  }
];
