export default [
  //监控运维
  // {
  //     path: "/mtoHome",
  //     name: "监控运维",
  //     component: resolve => require(["@/view/mto/index"], resolve)
  // },
  {
    path: "/mtoRt",
    name: "实时监控",
    component: resolve => require(["@/view/mto/Rt/index"], resolve),
    children: [
      { // 端口扫描
        path: "/portScan",
        name: "端口扫描",
        component: resolve => require(["@/view/mto/Rt/portScan/index"], resolve),
      },
    ]
  },
  {
    path: "/mtoOd",
    name: "在线调试",
    component: resolve => require(["@/view/mto/Od/index"], resolve)
  },
  //-------
  {
    path: "/mtoEk",
    name: "设备看板",
    component: resolve => require(["@/view/mto/Ek/index"], resolve),
    children: [
      // { // gc 胚布
      //   path: "/gc_points",
      //   name: "gc点数看板",
      //   component: resolve => require(["@/view/mto/Ek/grayCloth/points/index"], resolve),
      // },
      // {
      //   path: "/gc_warehousing",
      //   name: "gc入库看板",
      //   component: resolve => require(["@/view/mto/Ek/grayCloth/warehousing/index"], resolve),
      // },
      {
        path: "/gc_outbound",
        name: "gc出库看板",
        component: resolve => require(["@/view/mto/Ek/grayCloth/outbound/index"], resolve),
      },
      // ---- yarn 纱线
      {
        path: "/yarn_points",
        name: "yarn点数看板",
        component: resolve => require(["@/view/mto/Ek/yarn/points/index"], resolve),
      },
      {
        path: "/yarn_warehousing",
        name: "yarn入库看板",
        component: resolve => require(["@/view/mto/Ek/yarn/warehousing/index"], resolve),
      },
      {
        path: "/yarn_outbound",
        name: "yarn出库看板",
        component: resolve => require(["@/view/mto/Ek/yarn/outbound/index"], resolve),
      },
    ]
  },

  //-------
  {
    path: "/mtoEl",
    name: "设备日志",
    component: resolve => require(["@/view/mto/El/index"], resolve)
  },
  {
    path: "/mtoFu",
    name: "固件升级",
    component: resolve => require(["@/view/mto/Fu/index"], resolve)
  },
  {
    path: "/mtoRc",
    name: "远程配置",
    component: resolve => require(["@/view/mto/Rc/index"], resolve)
  }
];
