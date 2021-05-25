/*
 * @Author: Lyl
 * @Date: 2021-04-01 14:08:13
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-25 08:59:59
 * @Description:
 */

export function quality(_this) {
  return [
    {
      menuName: "一.称重",
      index: "weight",
      icon: "el-icon-set-up",
    },
    {
      menuName: "二.扫码称重",
      index: "scanWeight",
      icon: "el-icon-set-up",
    },
    {
      menuName: "三." + _this.$t("caidan.zlxmgl"),
      index: "quaLity",
      icon: "el-icon-set-up",
    },
    {
      menuName: "四." + _this.$t("caidan.hysjc"),
      index: "/Laboratory",
      icon: "el-icon-set-up",
    },
    {
      menuName: "五." + _this.$t("caidan.psgl"),
      index: "/Color",
      icon: "el-icon-set-up",
    },
    {
      menuName: "六." + _this.$t("caidan.jctj"),
      index: "/Count",
      icon: "el-icon-set-up",
    },
    {
      menuName: "七.质量检验标准",
      index: "/Standard",
      icon: "el-icon-set-up",
    },
    {
      menuName: "八.检测项目基础定义",
      index: "/testItem",
      icon: "el-icon-set-up",
    }
  ]
}