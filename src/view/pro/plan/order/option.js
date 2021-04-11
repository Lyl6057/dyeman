import i18n from '@/lang/index'
export const workerF = {
  submitBtn: false,
  emptyBtn: false,

  menuBtn: false,
  menu: false,
  column: [
    {
      labelWidth: 90,
      label: "订单编号",
      prop: "poNo",
      span: 4,
      placeholder: " ",
    },
    {
      labelWidth: 60,
      label: i18n.t('whseField.khmc'),
      prop: "cust",
      span: 4,
      placeholder: " ",
    },
    {
      labelWidth: 60,
      label: i18n.t("whseField.zl"),
      prop: "weight",
      span: 4,
      placeholder: " ",
    },
    {
      label: "日期起",
      labelWidth: 70,
      prop: "startDate",
      span: 4,
      placeholder: " ",
    },
    {
      label: "日期至",
      labelWidth: 70,
      prop: "endDate",
      span: 4,
      placeholder: " ",
    },
    {
      label: "日期至",
      labelWidth: 70,
      prop: "endDate1",
      span: 4,
      placeholder: " ",
    }, {
      label: "日期至",
      labelWidth: 70,
      prop: "endDat2",
      span: 4,
      placeholder: " ",
    },
  ]

}

// export const workerC = {
//   menu: false,
//   addBtn: false,
//   border: true,
//   highlightCurrentRow: true,
//   height: "calc(100vh - 402px)",
//   refreshBtn: false,
//   columnBtn: false,
//   page: true,
//   column: [
//     {
//       prop: "index",
//       label: "#",
//       width: 50,
//       align: "center",
//     },
//     {
//       label: "加工廠代號",
//       prop: "refCode",
//     },
//     {
//       label: i18n.t("whseField.wfjgc"),
//       prop: "refName",
//       type: "select",
//     },
//     {
//       label: "外厂配料计划编号",
//       prop: "retBatch",
//       width: 220
//     },
//     // {
//     //   label: i18n.t("whseField.scdh"),
//     //   prop: "prOn",
//     // },
//     {
//       label: i18n.t("whseField.sxbh"),
//       prop: "yarnsId",
//     },
//     {
//       label: i18n.t("whseField.sxmc"),
//       prop: "yarnsName",
//       width: 250
//     },
//     {
//       label: i18n.t("whseField.zl"),
//       prop: "weight",
//       align: "right"
//     },
//     // {
//     //   label: "單位",
//     //   prop: "weightUnit",
//     //   type: "select",
//     //   dicData: getDIC("Whse_Transfer_unit"),
//     // }
//   ]
// }