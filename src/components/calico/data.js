/*
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-10 17:08:39
 * @Description: 
 */
import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
import axios from 'axios';

export function creatForm(_this) {
  return {
    submitBtn: true,
    emptyBtn: false,
    labelWidth: 100,
    menuSpan: 2,
    column: [
      {
        label: "批號",
        prop: "batchNo",
        span: 6,
        rules: [{
          required: true,
          message: "请输入批號",
          trigger: "blur"
        }]
      },
      {
        label: "總疋數",
        prop: "num",
        span: 6,
        rules: [{
          required: true,
          message: "请输入總疋數",
          trigger: "blur"
        }],
        // type: "number"
      },

      {
        label: "標準重量",
        prop: "weight",
        span: 6,
        rules: [{
          required: true,
          message: "请输入重量",
          trigger: "blur"
        }]

      },
      {
        label: "單位",
        prop: "weightUnit",
        span: 6,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        rules: [{
          required: true,
          message: "请输入單位",
          trigger: "blur"
        }]
      },
      {
        label: "貨位碼",
        prop: "locationCode",
        span: 6,
        cell: false,
        disabled: true,
        rules: [{
          required: true,
          message: "请输入貨位碼",
          trigger: "blur"
        }]
      },
    ],
  }
}
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
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },
    ],
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: "批號",
      prop: "batchNo",
      cell: true,
      width: 140,
    },
    {
      label: "疋號",
      prop: "countingNo",
      cell: true,
      width: 80,
      align: "right",
    },
    {
      label: "重量",
      prop: "weight",
      cell: true,
      width: 80,
      align: "right",
    },
    {
      label: "單位",
      prop: "weightUnit",
      cell: true,
      width: 80,
      type: "select",
      dicData: getDIC("bas_matUnit"),
    },
    {
      label: "客人布票号",
      prop: "custTicket",
      cell: true,
      width: 120,
    },
    {
      label: "貨位碼",
      prop: "locationCode",
      cell: true,
      width: 160,
      click: () => {
        _this.choiceV = true;
      }
    },
    ],
  }

}


// ---- 纱线
export function getSx(params) {
  return axios({
    url: '/api/whseYarnin/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addSx(params) {
  return axios({
    url: '/api/whseYarnin/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateSx(params) {
  return axios({
    url: '/api/whseYarnin/v1.0/updateById',
    method: 'put',
    params: params
  })
}
export function delSx(id) {
  return axios({
    url: '/api/whseYarnin/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}