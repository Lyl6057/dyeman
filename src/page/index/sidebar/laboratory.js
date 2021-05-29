/*
 * @Author: Lyl
 * @Date: 2021-04-01 14:06:19
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-27 09:06:54
 * @Description:
 */
export function laboratory(_this) {
  return [
    {
      menuName: '一.色号资料',
      index: "/colorMng",
      icon: "el-icon-s-order",
      name: "Laboratory",
    },
    {
      menuName: '二.色号打办记录',
      index: "/colorPlay",
      icon: "el-icon-s-order",
      name: "Laboratory",
    },
    {
      menuName: '三.' + _this.$t("menuData.Laboratory[3].name"),
      index: "/Arran",
      icon: "el-icon-s-order",
      name: "Laboratory",
    },
    {
      menuName: '四.成品检验报告',
      index: "FabricOrder",
      icon: "el-icon-s-order",
      name: "Laboratory",
    },
    {
      menuName: '五.工序检验报告',
      index: "FabricProcess",
      icon: "el-icon-s-order",
      name: "Laboratory",
    },
    {
      menuName: '六.胚布检验报告',
      index: "dyeFabric",
      icon: "el-icon-s-order",
      name: "Laboratory",
    },
    {
      menuName: '七.染化料检验报告',
      index: "dyeStuff",
      icon: "el-icon-s-order",
      name: "Laboratory",
    },
    {
      menuName: '八.纱线检验报告',
      index: "dyeYarn",
      icon: "el-icon-s-order",
      name: "Laboratory",
    },
    {
      menuName: '九.检验报告附件',
      index: "reportAccry",
      icon: "el-icon-s-order",
      name: "Laboratory",
    }
  ]
}