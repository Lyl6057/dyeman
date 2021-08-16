/*
 * @Author: Lyl
 * @Date: 2021-04-08 19:27:38
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-16 13:57:51
 * @Description:
 */

//能源
export function energy(_this) {
  return [
    {
      menuName: _this.$t("caidan.nygl"),
      index: "nygl",
      icon: "el-icon-set-up",
      children: [
        {
          menuName: _this.$t("caidan.ybwh"),
          index: "Meter"
        },
        {
          menuName: _this.$t("caidan.nhjl"),
          index: "Consume"
        },
        {
          menuName: "能源成本核算",
          index: "egReport"
        }
      ]
    }
  ];
}
