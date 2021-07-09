export default [
  // 仓位管理
  {
    path: "/imWl",
    name: "仓位管理",
    component: resolve => require(["@/view/im/Wl/index"], resolve)
  },
  //库存管理
  // {
  //   path: "/imHo",
  //   name: "手动操作",
  //   component: resolve => require(["@/view/im/Ho/index"], resolve)
  // },
  //库存盘点
  // {
  //   path: "/imIty",
  //   name: "库存管理",
  //   component: resolve => require(["@/view/im/Ity/index"], resolve),
  //   children: [

  //   ]
  // },
  {
    path: "/ityBasic",
    name: "库存期初始化",
    component: resolve => require(["@/view/im/Ity/basic/index"], resolve)
  },
  {
    path: "/whseVehicle",
    name: "仓库载具管理",
    component: resolve => require(["@/view/im/Ity/vehicle/index"], resolve)
  },
  //仓库工作指引看板
  {
    path: "/imWk",
    name: "仓库工作指引看板",
    component: resolve => require(["@/view/im/Wk/index"], resolve),
    children: [
      // 申购入库
      {
        path: "/rc_sg",
        name: "rc_sg",
        component: resolve => require(["@/view/im/Wk/rc/sg/index"], resolve)
      },
      // 采购入库
      {
        path: "/rc_cg",
        name: "rc_cg",
        component: resolve => require(["@/view/im/Wk/rc/cg/index"], resolve)
      },
      // 手工入库
      {
        path: "/rc_manual",
        name: "rc_manual",
        component: resolve => require(["@/view/im/Wk/rc/manual/index"], resolve)
      },
      // 手工出库
      {
        path: "/cc_manual",
        name: "cc_manual",
        component: resolve => require(["@/view/im/Wk/cc/manual/index"], resolve)
      },
      {
        // gc 胚布
        path: "/gc_points",
        name: "gc点数看板",
        component: resolve =>
          require(["@/view/im/Wk/grayCloth/points/index"], resolve)
      },
      {
        path: "/rc_kanban",
        name: "入仓看板",
        component: resolve => require(["@/view/im/Wk/rc/kanban/index"], resolve)
      },
      // {
      //   path: "/gc_outbound",
      //   name: "gc出仓看板",
      //   component: resolve => require(["@/view/mto/Ek/grayCloth/outbound/index"], resolve),
      // },
      //  纱线入仓
      {
        path: "/rc_sx",
        name: "rc_sx",
        component: resolve => require(["@/view/im/Wk/rc/sx/index"], resolve)
      },
      //  胚布入仓
      {
        path: "/rc_pb",
        name: "rc_pb",
        component: resolve => require(["@/view/im/Wk/rc/pb/index"], resolve)
      },
      //  成品布入仓
      {
        path: "/rc_cpb",
        name: "rc_cpb",
        component: resolve => require(["@/view/im/Wk/rc/cpb/index"], resolve)
      },
      //  染化料入仓
      {
        path: "/rc_rhl",
        name: "rc_rhl",
        component: resolve => require(["@/view/im/Wk/rc/rhl/index"], resolve)
      },
      //  染化料入仓
      {
        path: "/rc_yl",
        name: "rc_yl",
        component: resolve => require(["@/view/im/Wk/rc/yl/index"], resolve)
      },
      //  生产辅料入仓
      {
        path: "/rc_scfl",
        name: "rc_scfl",
        component: resolve => require(["@/view/im/Wk/rc/scfl/index"], resolve)
      },

      //  纱线出仓
      {
        path: "/cc_sx",
        name: "cc_sx",
        component: resolve => require(["@/view/im/Wk/cc/sx/index"], resolve)
      },
      //  胚布出仓
      {
        path: "/cc_pb",
        name: "cc_pb",
        component: resolve => require(["@/view/im/Wk/cc/pb/index"], resolve)
      },
      //  成品布出仓
      {
        path: "/cc_cpb",
        name: "cc_cpb",
        component: resolve => require(["@/view/im/Wk/cc/cpb/index"], resolve)
      },
      //  化工原料出仓
      {
        path: "/cc_hgyl",
        name: "cc_hgyl",
        component: resolve => require(["@/view/im/Wk/cc/hgyl/index"], resolve)
      },
      // //  生产辅料出仓
      {
        path: "/cc_scfl",
        name: "cc_scfl",
        component: resolve => require(["@/view/im/Wk/cc/scfl/index"], resolve)
      },
      // 五金/行政
      {
        path: "/cc_wjxz",
        name: "cc_wjxz",
        component: resolve => require(["@/view/im/Wk/cc/wjxz/index"], resolve)
      },
      {
        path: "/cc_package",
        name: "cc_package",
        component: resolve => require(["@/view/im/Wk/rc/package"], resolve)
      },
      {
        path: "/count_warehouse",
        name: "count_warehouse",
        component: resolve =>
          require(["@/view/im/Wk/count/warehouse/index"], resolve)
      }
    ]
  },
  //手动操作
  {
    path: "/imHo",
    name: "手动操作",
    component: resolve => require(["@/view/im/Ho/index"], resolve)
  },
  //安全库存
  {
    path: "/imSft",
    name: "安全库存",
    component: resolve => require(["@/view/im/Sft/index"], resolve)
  },
  //手动操作
  {
    path: "/imDg",
    name: "采购需求生成",
    component: resolve => require(["@/view/im/Dg/index"], resolve)
  }
];
