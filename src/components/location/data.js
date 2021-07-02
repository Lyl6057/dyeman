/*
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-02 10:08:40
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
import axios from "axios";
export function loc1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 275px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    showSummary: false,
    sumColumnList: [
      {
        label: " ",
        name: "cartonNum",
        type: "sum"
      },
      {
        label: " ",
        name: "weight",
        type: "sum"
      }
    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: _this.$t("whseField.hwm"), //"貨位碼",
        prop: "locationCode",
        cell: true,
        width: 180
      },
      {
        label: "箱數",
        prop: "cartonNum",
        cell: true,
        width: 100,
        align: "right",
        hide: _this.type != _this.$t("iaoMng.sx")
        // change: () => {
        //   _this.$refs["crud"].doLayout();
        // }
      },
      {
        label: _this.$t("energy.sl"),
        prop: "weight",
        cell: true,
        width: 100,
        align: "right"
        // change: () => {
        //   _this.$refs["crud"].doLayout();
        // }
      }
    ]
  };
}

// ---- 纱线
export function getSx(params) {
  return axios({
    url: "/api/whseYarnin/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addSx(params) {
  return axios({
    url: "/api/whseYarnin/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateSx(params) {
  return axios({
    url: "/api/whseYarnin/v1.0/updateById",
    method: "put",
    params: params
  });
}
export function delSx(id) {
  return axios({
    url: "/api/whseYarnin/v1.0/removeById?id=" + id,
    method: "delete"
  });
}
