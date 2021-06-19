/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:44
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-10 14:24:20
 * @Description: 
 */
export default [
  //品质管理
  {
    path: "/weight",
    name: "称重",
    component: resolve => require(["@/view/quaLity/weight/index"], resolve)
  },
  {
    path: "/scanWeight",
    name: "称重",
    component: resolve => require(["@/view/quaLity/scan/index"], resolve)
  },
  {
    path: "/checkInWhse",
    name: "审核入库",
    component: resolve => require(["@/view/quaLity/checkInWhse/index"], resolve)
  },
  {
    path: "/quaLity",
    name: "检查项定义",
    component: resolve => require(["@/view/quaLity/QuaLity/index"], resolve)
  },
  {
    path: "/Laboratory",
    name: "化验室报告",
    component: resolve => require(["@/view/quaLity/Laboratory/index"], resolve)
  },
  {
    path: "/Color",
    name: "批色管理",
    component: resolve => require(["@/view/quaLity/Color/index"], resolve)
  },
  {
    path: "/Count",
    name: "检测统计",
    component: resolve => require(["@/view/quaLity/Count/index"], resolve)
  },
  // {
  //   path: '/demo',
  //   name: '测试页面',
  //   component: resolve => require(['@/view/quaLity/demo/demo'], resolve)
  // }
  {
    path: "/Policy",
    name: "决策树",
    component: resolve => require(["@/view/quaLity/Policy/index"], resolve)
  },
  {
    path: "/Standard",
    name: "检验标准",
    component: resolve =>
      require(["@/view/quaLity/Standard/index.vue"], resolve)
  },
  {
    path: "/StandardDlg",
    name: "检验标准明細",
    component: resolve =>
      require(["@/view/quaLity/Standard/StandardDlg"], resolve)
  },
  {
    path: "/testItem",
    name: "检测项目基础定义",
    component: resolve =>
      require(["@/view/quaLity/testItem/index.vue"], resolve)
  }
];
