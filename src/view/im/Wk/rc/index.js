import { getDIC, getDicT } from '@/config/index'
export function rsxkr1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 130,
    column: [
      {
        label: "入仓编号",
        prop: "yinId",
        span: 6,
        placeholder: " ",
      },
      {
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === '2' || _this.hide === '6' ? true : false,
      },
      {
        label: "纱线登记编号",
        prop: "registerNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_yinstatus')
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
      },
      {
        label: "财务状态",
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_finStatus')
      },
    ],
  }
}

export const IncomingYarnF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "登记编号",
      prop: "registerNo",
      span: 8,
      placeholder: " ",
    },
    {
      label: "客户",
      prop: "custCode",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: getDicT("basCustomer", "custCode", "custCode"),
    },
    {
      label: "来纱日期",
      prop: "yarnDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
  ]

}
export const IncomingYarnC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 402px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center",
    },
    {
      label: "登记编号",
      prop: "registerNo",
    },
    {
      label: "客户",
      prop: "custCode",
      type: "select",
      dicData: getDicT("basCustomer", "custCode", "custCode"),
    },
    {
      label: "来纱日期",
      prop: "yarnDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
    },
  ]

}

