/*
 * @Author: Lyl
 * @Date: 2021-04-01 13:39:35
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-01 15:28:17
 * @Description:
 */


export function whseMng(_this) {
  return [
    {
      menuName: _this.$t("menuData.whseMng.positions"), // '仓库管理',
      index: "imWl",
      icon: "el-icon-edit-outline",
      name: "im",
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
      name: "im",
    },
    {
      menuName: _this.$t("menuData.whseMng.inventory"), // '仓库管理',
      index: "imIty",
      icon: "el-icon-s-order",
      name: "im",
      children: [
        {
          menuName: "1.库存期初定义", //'1.仓位管理'
          index: "/ityBasic"
        },
      ]
    }
  ]
}
