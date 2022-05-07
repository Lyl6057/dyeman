/*
 * @Author: Lyl
 * @Date: 2021-04-01 13:39:35
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-03 08:12:23
 * @Description:
 */

export function whseMng(_this) {
  return [
    {
      menuName: _this.$t("menuData.whseMng.positions"), // '仓库管理',
      index: "imWl",
      icon: "el-icon-edit-outline",
      name: "im"
      // children: [
      //   {
      //     menuName: _this.$t("menuData.whseMng.positions"), //'1.仓位管理'
      //     index: "/imWl"
      //   },
      //   {
      //     menuName: _this.$t("menuData.whseMng.inAndOut"),//'2.出入库管理',
      //     index: "/imWk"
      //   },
      //   {
      //     menuName: _this.$t("menuData.whseMng.inventory"),// '3.库存管理',
      //     index: "/imIty"
      //   },

      //   // {
      //   //   menuName: "手动操作",
      //   //   index: "/imHo"
      //   // },
      //   // {
      //   //   menuName: "安全库存",
      //   //   index: "/imSft"
      //   // },
      //   // {
      //   //   menuName: "采购需求生成",
      //   //   index: "/imDg"
      //   // }
      // ]
    },
    {
      menuName: _this.$t("menuData.whseMng.inAndOut"), // '仓库管理',
      index: "imWk",
      icon: "el-icon-s-order",
      name: "im"
    },
    {
      menuName: _this.$t("menuData.whseMng.inventory"), // '仓库管理',
      index: "imIty",
      icon: "el-icon-s-order",
      name: "im",
      children: [
        {
          menuName: "1.库存期初定义", //'1.仓位管理'
          index: "ityBasic"
        },
        {
          menuName: "2.库存查询", //'1.仓位管理'
          index: "inventory"
        },
        {
          menuName: "3.盘点清单",
          index: "inventorySnapshot"
        },
        {
          menuName: "4.在库载具",
          index: "stockVehicle"
        },
        {
          menuName: "5.库存整理",
          index: "seitLocation"
        }
        // {
        //   menuName: "2.生产运转出仓", //'2.生产运转'
        //   index: "/proRevolve"
        // }
        // {
        //   menuName: "2.仓库载具管理", //'1.仓位管理'
        //   index: "/whseVehicle"
        // },
      ]
    },
    {
      menuName: "四.仓库载具管理", // '仓库管理',
      index: "whseVehicle",
      icon: "el-icon-s-order",
      name: "whseVehicle"
      // children: [
      //   {
      //     menuName: "1.库存期初定义", //'1.仓位管理'
      //     index: "/ityBasic"
      //   },
      //   {
      //     menuName: "2.仓库载具管理", //'1.仓位管理'
      //     index: "/whseVehicle"
      //   },
      // ]
    },
    {
      menuName: "五.出入库看板", // '仓库管理',
      index: "whseInOutKB",
      icon: "el-icon-s-order",
      name: "whseInOutKB"
    },
    {
      menuName: "六.QA验布看板", // '仓库管理',
      index: "transferLoadQa",
      icon: "el-icon-s-order",
      name: "transferLoadQa"
    }
  ];
}
