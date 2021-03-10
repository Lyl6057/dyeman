export default [
  //产品管理
  {
    path: "/proInfo",
    name: "产品信息",
    component: resolve => require(["@/view/pro/Info/index"], resolve),
    children: [
      { // 端口扫描
        path: "/proSystem",
        name: "系统注册信息",
        component: resolve => require(["@/view/pro/info/system/index"], resolve),
      },
      { // 设备分类
        path: "/proEqClassify",
        name: "设备分类1",
        component: resolve => require(["@/view/pro/info/eqClassify/index"], resolve),
      },
      { // 设备管理
        path: "/proEquipment",
        name: "设备管理",
        component: resolve => require(["@/view/pro/info/equipment/index"], resolve),
      },
      { // 设备监控信息
        path: "/proEmInfo",
        name: "设备监控信息",
        component: resolve => require(["@/view/pro/info/emInfo/index"], resolve),
      },
      { // 设备管理
        path: "/proRuleCode",
        name: "规则引擎代码",
        component: resolve => require(["@/view/pro/info/ruleCode/index"], resolve),
      },
      { // 设备管理
        path: "/proOrderclassify",
        name: "指令分类",
        component: resolve => require(["@/view/pro/info/orderclassify/index"], resolve),
      },
      { // 设备管理
        path: "/proOrderDefine",
        name: "指令定义",
        component: resolve => require(["@/view/pro/info/orderDefine/index"], resolve),
      }
    ]
  },
  {
    path: "/proMq",
    name: "消息队列主题",
    component: resolve => require(["@/view/pro/Mq/index"], resolve)
  },
  {
    path: "/proFd",
    name: "功能定义",
    component: resolve => require(["@/view/pro/Fd/index"], resolve)
  },
  {
    path: "/proSs",
    name: "服务订阅",
    component: resolve => require(["@/view/pro/Ss/index"], resolve)
  },
  {
    path: "/proPlan",
    name: "生产计划",
    component: resolve => require(["@/view/pro/plan/index"], resolve),
    children: [
      {
        path: "/proOrder",
        name: "proOrder",
        component: resolve => require(["@/view/pro/plan/order/index"], resolve),
      },
    ]
  },
];
