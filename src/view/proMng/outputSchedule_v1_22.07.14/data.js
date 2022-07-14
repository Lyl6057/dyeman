/*
 * @Author: Lyl
 * @Date: 2021-04-23 09:03:31
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-06 15:47:32
 * @Description:
 */
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
const DIC = {
  VAILD: [
  {
      label: '是',
      value: true
  }, {
      label: '否',
      value: false
  }],
}
export function mainForm(_this) {
  return {
    submitBtn: true,
    submitText: "查询",
    emptyBtn: false,
    labelWidth: 150,
    menuSpan: 6,
    menuPostion: "right",
    menuBtn: true,
    column: [
      {
        label: "织造生产单号",
        prop: "weaveJobCode",
        width: 220,
        overHidden: true,
        sortable: true,
        fixed: false,
        span: 8
      },
      {
        label: "是否外发单",
        placeholder:" ",
        width: 170,
        prop: "isWorkOut",
        type: "select",
        dicData: DIC.VAILD,
        span:4,
        mock:{
          type:'dic',
        },
    },
    ]
  };
}
let poData = getXDicT("salPo/list");
let poColor = getXDicT("salPoColor");
export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 585px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false,
        fixed: false
      },
      {
        label: "生产单号",
        prop: "weaveJobCode",
        width: 150,
        overHidden: true,
        sortable: true,
        fixed: false
      },
      {
        label: "是否外发单",
        prop: "isWorkOut",
        width: 110,
        overHidden: true,
        type: "select",
        dicData: [
          {
            label: "是",
            value: true
          },
          {
            label: "否",
            value: false
          }
        ]
      },
      {
        label: "总毛重",
        prop: "realWeight",
        disabled: false,
        overHidden: true,
        width: 120,
        placeholder: " ",
        span: 6,
        align: "right",
        cell: true
      },
      {
        label: "总净量",
        prop: "clothWeight",
        width: 100,
        overHidden: true,
        placeholder: " ",
        span: 6,
        align: "right",
      },
      {
        label: "已称重",
        prop: "clothWeight1",
        disabled: false,
        width: 100,
        overHidden: true,
        placeholder: " ",
        span: 6,
        align: "right",
      },
      {
        label: "已入仓",
        prop: "clothWeight2",
        disabled: false,
        width: 100,
        overHidden: true,
        placeholder: " ",
        span: 6,
        align: "right",
      },
      {
        label: "已出仓",
        prop: "clothWeight3",
        disabled: false,
        width: 100,
        overHidden: true,
        placeholder: " ",
        span: 6,
        align: "right",
      },
      {
        label: "QC扣减数量",
        prop: "qcTakeOut",
        disabled: false,
        overHidden: true,
        width: 120,
        placeholder: " ",
        span: 6,
        align: "right",
        cell: true
      },
      {
        label: "订单与生产差额",
        prop: "owed",
        disabled: false,
        overHidden: true,
        width: 150,
        placeholder: " ",
        span: 6,
        align: "right",
        cell: true
      },

    ]
  };
}


