/*
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-30 12:03:13
 * @Description:
 */
import { getDIC,getDicNS } from "@/config";
import axios from "axios";

import { num2ThousandthFormat } from "@/utils/tools"

export function creatForm(_this) {
  return {
    submitBtn: true,
    emptyBtn: false,
    labelWidth: 100,
    menuSpan: 2,
    column: [
      {
        label: _this.$t("whseField.ph"), // "批號",
        prop: "batchNo",
        span: 6,
        rules: [
          {
            required: true,
            message: _this.$t("whseField.qsrph"), //"请输入批號",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("whseField.zps"), // "總疋數",
        prop: "num",
        span: 6,
        rules: [
          {
            required: true,
            message: _this.$t("whseField.qsrzps"), //"请输入總疋數",
            trigger: "blur"
          }
        ]
        // type: "number"
      },

      {
        label: _this.$t("whseField.bzzl"), //"標準重量",
        prop: "weight",
        span: 6,
        rules: [
          {
            required: true,
            message: _this.$t("whseField.qsrbzzl"), //"请输入重量",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("whseField.dw"), //"單位",
        prop: "weightUnit",
        span: 6,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        rules: [
          {
            required: true,
            message: _this.$t("whseField.qsrdw"), //"请输入單位",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("whseField.hwm"), //"貨位碼",
        prop: "locationCode",
        span: 6,
        cell: false,
        disabled: true,
        rules: [
          {
            required: true,
            message: _this.$t("whseField.qsrhwm"), //"请输入貨位碼",
            trigger: "blur"
          }
        ]
      }
    ]
  };
}
export function loc1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 276px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    showSummary: true,
    sumColumnList: [
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
        label: _this.$t("whseField.scdh"),
        prop: "weaveJobCode",
        cell: false,
        width: 120,
        placeholder: _this.$t("whseField.qxzscdh"), //"請選擇生產單號",
      },
      {
        label: _this.$t("whseField.krbph"), //"客人布票号",
        prop: "noteCode",
        cell: true,
        width: 160
      },
      // {
      //   label: _this.$t("whseField.ph"), //"批號",
      //   prop: "batchNo",
      //   cell: true,
      //   width: 140
      // },
      {
        label: _this.$t("whseField.ph2"), // "疋號",
        prop: "pidNo",
        cell: true,
        width: 70,
        align: "right",
        formatter(r,v){
          return num2ThousandthFormat(v,0)
        }
      },
      {
        label: _this.$t("whseField.zl"), // "重量",
        prop: "weight",
        cell: true,
        width: 80,
        align: "right",
        formatter(r,v){
          return num2ThousandthFormat(v)
        }
      },
      {
        label: _this.$t("whseField.dw"), // "單位",
        prop: "weightUnit",
        cell: true,
        width: 70,
        type: "select",
        dicData: getDIC("bas_matUnit")
      },
      
      {
        label: _this.$t("whseField.hwm"), //"貨位碼",
        prop: "locationCode",
        cell: true,
        width: 160,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type:"select",
        dicData: getDicNS("whseLocation?warehouseType=1","locationCode", "locationCode"),
        hide: !_this.loc,

        // click: () => {
        //   // if (_this.popup) {
        //   _this.choiceV = true;
        //   // }
        // }
      },
      
    ]
  };
}
export function creatOutForm(_this) {
  return {
    submitBtn: true,
    emptyBtn: false,
    labelWidth: 100,
    menuSpan: 2,
    column: [
      {
        label:
          _this.type == _this.$t("iaoMng.pb")
            ? _this.$t("whseField.ph")
            : _this.$t("whseField.gh"), // "批號",
        prop: "batchNo",
        span: 6
        // rules: [
        //   {
        //     required: true,
        //     message: "該信息不能為空", //"请输入批號",
        //     trigger: "blur"
        //   }
        // ]
      },
      {
        label: _this.$t("whseField.zps"), // "總疋數",
        prop: "num",
        span: 6,
        rules: [
          {
            required: true,
            message: _this.$t("whseField.qsrzps"), //"请输入總疋數",
            trigger: "blur"
          }
        ]
        // type: "number"
      },

      {
        label: _this.$t("whseField.bzzl"), //"標準重量",
        prop: "weight",
        span: 6,
        rules: [
          {
            required: true,
            message: _this.$t("whseField.qsrbzzl"), //"请输入重量",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("whseField.dw"), //"單位",
        prop: "weightUnit",
        span: 6,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        rules: [
          {
            required: true,
            message: _this.$t("whseField.qsrdw"), //"请输入單位",
            trigger: "blur"
          }
        ]
      },
      {
        label: _this.$t("whseField.bph"), //"布票号",
        prop: "custTicket",
        span: 6,
        cell: false,
        disabled: false
      }
    ]
  };
}
export function loc2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 234px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: "weight",
        type: "sum"
      },
      {
        label: " ",
        name: "woWeights",
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
        label:
          _this.type == _this.$t("iaoMng.pb")
            ? _this.$t("whseField.ph")
            : _this.$t("whseField.gh"), //"批號",
        prop: _this.type == _this.$t("iaoMng.pb") ? "batchNo" : "prodNo",
        cell: false,
        width: 180
      },
      {
        label: _this.$t("whseField.ph2"), // "疋號",
        prop: "countingNo",
        cell: false,
        width: 70,
        align: "right"
      },
      {
        label: _this.$t("whseField.zl"), // "重量",
        prop: _this.type == _this.$t("iaoMng.pb") ? "weight" : "woWeights",
        cell: false,
        width: 80,
        align: "right"
      },
      {
        label: _this.$t("whseField.dw"), // "單位",
        prop: _this.type == _this.$t("iaoMng.pb") ? "weightUnit" : "woUnit",
        cell: false,
        width: 70,
        type: "select",
        dicData: getDIC("bas_matUnit")
      },
      {
        label: _this.$t("whseField.bph"), //"客人布票号",
        prop: _this.type == _this.$t("iaoMng.pb") ? "custTicket" : "ticketNo",
        cell: false
        // width: 170
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
