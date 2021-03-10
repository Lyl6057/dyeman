export default [
  //盘盈盘亏
  {
    path: "/iqPal",
    name: "盘盈盘亏",
    component: resolve => require(["@/view/iq/Pal/index"], resolve)
  },
  //库存查询
  {
    path: "/iqGq",
    name: "货位查询",
    component: resolve => require(["@/view/iq/Gq/index"], resolve)
  },

  //分类库存查询
  {
    path: "/iqIq",
    name: "分类库存查询",
    component: resolve => require(["@/view/iq/Iq/index"], resolve)
  },
  //分类库存查询
  {
    path: "/iqOq",
    name: "订单库存查询",
    component: resolve => require(["@/view/iq/Oq/index"], resolve)
  },
];
