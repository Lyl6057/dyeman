/*
 * @Author: Lyl
 * @Date: 2021-04-01 14:08:13
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-10 14:14:12
 * @Description:
 */

export function quality(_this) {
  return [
    {
      menuName: "一.称重",
      index: "/weight",
      icon: "el-icon-set-up",
    },
    {
      menuName: "二.QC验布",
      index: "/scanWeight",
      icon: "el-icon-set-up",
    },
    {
      menuName: "三.审核入库",
      index: "/checkInWhse",
      icon: "el-icon-set-up",
    },
    {
      menuName: "四." + _this.$t("caidan.zlxmgl"),
      index: "/quaLity",
      icon: "el-icon-set-up",
    },
    {
      menuName: "五." + _this.$t("caidan.hysjc"),
      index: "/Laboratory",
      icon: "el-icon-set-up",
    },
    {
      menuName: "六." + _this.$t("caidan.psgl"),
      index: "/Color",
      icon: "el-icon-set-up",
    },
    {
      menuName: "七." + _this.$t("caidan.jctj"),
      index: "/Count",
      icon: "el-icon-set-up",
    },
    {
      menuName: "八.质量检验标准",
      index: "/Standard",
      icon: "el-icon-set-up",
    },
    {
      menuName: "九.检测项目基础定义",
      index: "/testItem",
      icon: "el-icon-set-up",
    }
  ]
}