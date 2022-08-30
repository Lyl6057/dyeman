export default [
  // 仓位管理
  {
    path: "/",
    name: "主页",
    redirect: "/imWl"
  },
  {
    path: "/transferLoadQa",
    name: "松布/验布出库",
    component: resolve => require(["@/view/im/transferLoadQa/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/stockVehicle",
    name: "在库载具",
    component: resolve =>
      require(["@/view/im/ity/stockVehicle/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/imWl",
    name: "仓位管理",
    component: resolve => require(["@/view/im/Wl/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/whseInOutKB",
    name: "出入库看板",
    component: resolve => require(["@/view/im/whseInOutKB/index"], resolve),
    meta: {
      keepAlive: true
    }
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
    path: "/proRevolve",
    name: "生产备布",
    component: resolve => require(["@/view/im/Ity/proRevolve/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/ityBasic",
    name: "库存期初始化",
    component: resolve => require(["@/view/im/Ity/basic/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/inventory",
    name: "库存查询",
    component: resolve => require(["@/view/im/Ity/inventory/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/inventorySnapshot",
    name: "盘点清单",
    component: resolve =>
      require(["@/view/im/Ity/inventorySnapshot/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/seitLocation",
    name: "库存整理",
    component: resolve =>
      require(["@/view/im/Ity/seitLocation/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/greyClothVehSeit",
    name: "胚布载具整理",
    component: resolve => require(["@/view/im/greyClothSeit/greyClothAndVeh/index"], resolve),
    meta: {
      keepAlive: true
    },
  },
  {
    path: "/vehLocSeit",
    name: "载具货位整理",
    component: resolve => require(["@/view/im/greyClothSeit/vehAndLoc/index"], resolve),
    meta: {
      keepAlive: true
    },
  },
  {
    path: "/whseVehicle",
    name: "仓库载具管理",
    component: resolve => require(["@/view/im/Ity/vehicle/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  //仓库工作指引看板
  {
    path: "/imWk",
    name: "出入库管理",
    component: resolve => require(["@/view/im/Wk/index"], resolve),
    meta: {
      keepAlive: false
    },
    children: [
      {
        path: "/cc_prepCloth",
        name: "cc_prepCloth",
        component: resolve => require(["@/view/im/Wk/cc/prepCloth/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 申购入库
      {
        path: "/rc_sg",
        name: "rc_sg",
        component: resolve => require(["@/view/im/Wk/rc/sg/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 采购入库
      {
        path: "/rc_cg",
        name: "rc_cg",
        component: resolve => require(["@/view/im/Wk/rc/cg/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 手工入库
      {
        path: "/rc_manual",
        name: "rc_manual",
        component: resolve =>
          require(["@/view/im/Wk/rc/manual/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 手工出库
      {
        path: "/cc_manual",
        name: "cc_manual",
        component: resolve =>
          require(["@/view/im/Wk/cc/manual/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      {
        // gc 胚布
        path: "/gc_points",
        name: "gc点数看板",
        component: resolve =>
          require(["@/view/im/Wk/grayCloth/points/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      {
        path: "/rc_kanban",
        name: "入仓看板",
        component: resolve =>
          require(["@/view/im/Wk/rc/kanban/index"], resolve),
        meta: {
          keepAlive: false
        }
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
        component: resolve => require(["@/view/im/Wk/rc/sx/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 本厂退纱
      {
        path: "/fac_ret_yarn_in",
        name: "facRetYarnIn",
        component: resolve =>
          require(["@/view/im/Wk/rc/returnYarn/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 样纱入仓
      {
        path: "/sample_yarn_in",
        name: "sampleYarnIn",
        component: resolve =>
          require(["@/view/im/Wk/rc/sampleYarnIn/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      //  胚布入仓
      {
        path: "/rc_pb",
        name: "rc_pb",
        component: resolve => require(["@/view/im/Wk/rc/pb/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      //  成品布入仓
      {
        path: "/rc_cpb",
        name: "rc_cpb",
        component: resolve => require(["@/view/im/Wk/rc/cpb/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 外发退纱入仓 （化工原料|染料）
      {
        path: "/ret_mat",
        name: "ret_mat",
        component: resolve => require(["@/view/im/Wk/rc/returnMater/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 样品入仓
      {
        path: "/sam_mat",
        name: "sam_mat",
        component: resolve => require(["@/view/im/Wk/rc/sampleMaterIn/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      //  染化料入仓
      {
        path: "/rc_rhl",
        name: "rc_rhl",
        component: resolve => require(["@/view/im/Wk/rc/rhl/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      //  染化料入仓
      {
        path: "/rc_yl",
        name: "rc_yl",
        component: resolve => require(["@/view/im/Wk/rc/yl/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      //  生产辅料入仓
      {
        path: "/rc_scfl",
        name: "rc_scfl",
        component: resolve => require(["@/view/im/Wk/rc/scfl/index"], resolve),
        meta: {
          keepAlive: false
        }
      },

      //  纱线出仓
      {
        path: "/cc_sx",
        name: "cc_sx",
        component: resolve => require(["@/view/im/Wk/cc/sx/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 退供应商纱出仓
      {
        path: "/cc_ret_reat",
        name: "cc_ret_reat",
        component: resolve =>
          require(["@/view/im/Wk/cc/retRect/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      //  胚布出仓
      {
        path: "/cc_pb",
        name: "cc_pb",
        component: resolve => require(["@/view/im/Wk/cc/pb/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      //  成品布出仓
      {
        path: "/cc_cpb",
        name: "cc_cpb",
        component: resolve => require(["@/view/im/Wk/cc/cpb/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      //  化工原料出仓
      {
        path: "/cc_hgyl",
        name: "cc_hgyl",
        component: resolve => require(["@/view/im/Wk/cc/hgyl/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
       //  辅料|化工|行政|五金|染料退供应商出仓
      {
        path: "/ret_supp",
        name: "ret_supp",
        component: resolve => require(["@/view/im/Wk/cc/retSupp/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // //  生产辅料出仓
      {
        path: "/cc_scfl",
        name: "cc_scfl",
        component: resolve => require(["@/view/im/Wk/cc/scfl/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 行政
      {
        path: "/cc_wj",
        name: "cc_wj",
        component: resolve => require(["@/view/im/Wk/cc/wj/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 行政
      {
        path: "/cc_xz",
        name: "cc_xz",
        component: resolve => require(["@/view/im/Wk/cc/xz/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 颜料
      {
        path: "/cc_yl",
        name: "cc_yl",
        component: resolve => require(["@/view/im/Wk/cc/yl/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 能源
      {
        path: "/cc_rl",
        name: "cc_rl",
        component: resolve => require(["@/view/im/Wk/cc/rl/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 生产领用出库
      {
        path: "/cc_productionUse",
        name: "cc_productionUse",
        component: resolve =>
          require(["@/view/im/Wk/cc/productionUse/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      {
        path: "/cc_package",
        name: "cc_package",
        component: resolve => require(["@/view/im/Wk/rc/package"], resolve),
        meta: {
          keepAlive: false
        }
      },
      {
        path: "/count_warehouse",
        name: "count_warehouse",
        component: resolve =>
          require(["@/view/im/Wk/count/warehouse/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
      // 扁机
      {
        path: "/fc_outProRet",
        name: "fc_outProRet",
        component: resolve =>
          require(["@/view/im/Wk/rc/flatCloth/outProRet/index"], resolve),
        meta: {
          keepAlive: false
        }
      },
    ]
  },
  //手动操作
  {
    path: "/imHo",
    name: "手动操作",
    component: resolve => require(["@/view/im/Ho/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  //安全库存
  {
    path: "/imSft",
    name: "安全库存",
    component: resolve => require(["@/view/im/Sft/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  //手动操作
  {
    path: "/imDg",
    name: "采购需求生成",
    component: resolve => require(["@/view/im/Dg/index"], resolve),
    meta: {
      keepAlive: true
    }
  }
];
