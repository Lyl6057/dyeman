/*
 * @Author: Lyl
 * @Date: 2021-04-01 14:08:13
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-01 15:32:55
 * @Description:
 */

export function quality(_this) {
  return [
    {
      menuName: "一." + _this.$t("caidan.zlxmgl"),
      index: "quaLity",
      icon: "el-icon-set-up",

    },
    {
      menuName: "二." + _this.$t("caidan.hysjc"),
      index: "/Laboratory",
      icon: "el-icon-set-up",
    },
    {
      menuName: "三." + _this.$t("caidan.psgl"),
      index: "/Color",
      icon: "el-icon-set-up",
    },
    {
      menuName: "四." + _this.$t("caidan.jctj"),
      index: "/Count",
      icon: "el-icon-set-up",
    },
    {
      menuName: "五.质量检验标准",
      index: "/Standard",
      icon: "el-icon-set-up",
    },
    {
      menuName: "六.检测项目基础定义",
      index: "/testItem",
      icon: "el-icon-set-up",
    }
  ]
}