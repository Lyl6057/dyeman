/*
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-30 11:59:34
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT, getDicNS } from "@/config";
import { num2ThousandthFormat } from "@/utils/tools"

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
        label: "箱數",
        prop: "cartonNum",
        cell: true,
        width: 100,
        align: "right",
        hide: _this.type != _this.$t("iaoMng.sx"),
        formatter(r,v){
          return num2ThousandthFormat(v,0)
        }
        // change: () => {
        //   _this.$refs["crud"].doLayout();
        // }
      },
      {
        label: _this.$t("energy.sl"),
        prop: "weight",
        cell: true,
        width: 100,
        align: "right",
        formatter(r,v){
          return num2ThousandthFormat(v)
        }
        // change: () => {
        //   _this.$refs["crud"].doLayout();
        // }
      },
      {
        label: _this.$t("whseField.hwm"), //"貨位碼",
        prop: "locationCode",
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicNS(
          "whseLocation?warehouseType=" +
            (_this.type == _this.$t("iaoMng.sx")
              ? "0"
              : _this.type == _this.$t("iaoMng.pb")
              ? "1"
              : _this.type == _this.$t("iaoMng.hgyl")
              ? "3"
              : _this.type == _this.$t("iaoMng.scfl")
              ? "5"
              : "4"),
          "locationCode",
          "locationCode"
        ),
        width: 180
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
