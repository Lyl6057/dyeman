/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:44
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-23 08:12:00
 * @Description:
 */
export default [
  //化验室
  {
    path: "/",
    name: "主页",
    redirect: "/colorMng"
  },
  {
    path: "/yarnReport",
    name: "纱线测试报告",
    component: resolve =>
      require(["@/view/laboratory/yarnReport/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/colorMng",
    name: "色号管理",
    component: resolve =>
      require(["@/view/laboratory/colorMng/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/colorPlay",
    name: "色号打办记录",
    component: resolve =>
      require(["@/view/laboratory/colorPlay/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  // {
  //   path: "/Arrange",
  //   name: "复办送板",
  //   component: resolve => require(["@/view/laboratory/Arrange/index"], resolve),
  //   children: [
  //     {
  //       path: "/ArranChild",
  //       name: "复办送板配方child",
  //       component: resolve => require(["@/view/Laboratory/Arrange/setLd"], resolve)
  //       //
  //     },
  //   ]
  // },
  {
    path: "/Big",
    name: "大货送板",
    component: resolve => require(["@/view/Laboratory/Big/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/BigChild",
    name: "大货送板配方child",
    component: resolve => require(["@/view/Laboratory/Big/setLd"], resolve),
    meta: {
      keepAlive: true
    }
    //
  },
  {
    path: "/Arran",
    name: "办布送板",
    component: resolve =>
      require(["@/view/Laboratory/Arrange/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/ArranChild",
    name: "办布送板配方child",
    component: resolve => require(["@/view/Laboratory/Arrange/setLd"], resolve),
    meta: {
      keepAlive: true
    }
    //
  },
  {
    path: "/FabricOrder",
    name: "成品布（订单）检测报告",
    component: resolve =>
      require(["@/view/Laboratory/FabricOrder/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/FabricProcess",
    name: "成品布（工序）检测报告",
    component: resolve =>
      require(["@/view/Laboratory/FabricProcess/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/dyeFabric",
    name: "胚布检测报告",
    component: resolve =>
      require(["@/view/Laboratory/dyeFabric/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/dyeStuff",
    name: "染化料检验报告",
    component: resolve =>
      require(["@/view/Laboratory/dyeStuff/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/dyeYarn",
    name: "纱线检验报告",
    component: resolve => require(["@/view/Laboratory/dyeYarn/index"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/reportAccry",
    name: "检验报告附件",
    component: resolve =>
      require(["@/view/Laboratory/reportAccry/index.vue"], resolve),
    meta: {
      keepAlive: true
    }
  }
];
