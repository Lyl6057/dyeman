/*
 * @Author: Lyl
 * @Date: 2021-08-07 07:58:01
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-24 10:50:14
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      // {
      //   label: "出缸/定型后",
      //   prop: "appState",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: [
      //     {
      //       value: "1",
      //       label: "出缸"
      //     },
      //     {
      //       value: "2",
      //       label: "定型后"
      //     }
      //   ]
      // },
      {
        label: "缸號",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "客戶",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        props: {
          value: "custCode",
          label: "custName"
        }
      },
      {
        label: "批色日期",
        prop: "appDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " "
      }
    ]
  };
}

let cust = getXDicT("basCustomer");

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 120,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      // {
      //   label: "出缸/定型后",
      //   prop: "appState",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   width: 150,
      //   dicData: [
      //     {
      //       value: 1,
      //       label: "出缸"
      //     },
      //     {
      //       value: 2,
      //       label: "定型后"
      //     }
      //   ],
      //   change: () => {
      //     _this.$nextTick(() => {
      //       if (_this.form.appState == "1") {
      //         _this.formOp.column[11].display = false;
      //       } else {
      //         _this.formOp.column[11].display = true;
      //       }
      //     });
      //   },
      //   rules: [
      //     {
      //       required: true,
      //       message: "請选择出缸/定型后",
      //       trigger: "blur"
      //     }
      //   ]
      // },
      {
        label: "缸號",
        prop: "vatNo",
        tip: "Số lô nhuộm",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        placeholder: "請选择缸號",
        rules: [
          {
            required: true,
            message: "請选择缸號",
            trigger: "blur"
          }
        ],
        click: () => {
          _this.choiceV = true;
        }
      },
      {
        label: "客戶名称",
        tip: "Khách hàng",
        prop: "custCode",
        overHidden: true,
        width: 200,
        span: 6,
        placeholder: " ",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        type: "select",
        dicData: cust,
        props: {
          value: "custCode",
          label: "custName"
        },
        change: () => {
          // _this.$nextTick(() => {
          //   if (_this.form.custName) {
          //     _this.form.custCode = _this.form.custName;
          //   }
          // });
        }
      },
      // {
      //   label: "客戶编号",
      //   tip: "Khách hàng",
      //   prop: "custCode",
      //   overHidden: true,
      //   width: 150,
      //   span: 6,
      //   placeholder: " "
      // },

      {
        label: "批色日期",
        prop: "appDate",
        width: 130,
        span: 6,
        tip: "Ngày lập đơn",
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇批色日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇批色日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "顏色名稱",
        tip: "Màu",
        prop: "colorName",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 6,
        placeholder: " "
      },
      {
        label: "色號",
        tip: "Số màu",
        prop: "colorNo",
        width: 150,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "客批号",
        prop: "custBatchNo",
        tip: "Mã vải",
        span: 6,
        width: 180,
        placeholder: " ",
        overHidden: true,
        disabled: false
      },
      {
        label: "布類",
        prop: "fabricName",
        placeholder: " ",
        tip: "Loại vải",
        overHidden: true,
        width: 250,
        span: 12,
        placeholder: " "
      },

      {
        label: "重量",
        tip: "Tổng cộng(KG)",
        prop: "sumWeight",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "疋數",
        prop: "pidCount",
        tip: "Cây",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
        row: _this.type == 1 ? false : true
      },
      // {
      //   label: "配方",
      //   prop: "formula",
      //   tip: "cách thức",
      //   width: 100,
      //   span: 12,
      //   placeholder: " ",
      //   display: _this.type == 1 ? false : true,
      //   hide: true,
      //   type: "textarea"
      // },
      {
        label: "评语",
        prop: "remark",
        tip: "Nhận xét",
        width: 100,
        span: 24,
        placeholder: " ",
        hide: true
        // type: "textarea"
      }
    ]
  };
}

export function pfCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 365px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "物料编码",
        prop: "materialCode",
        width: 140,
        overHidden: true,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "物料名称",
        prop: "materialName",
        width: 450,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "数量",
        prop: "useAmount",
        width: 120,
        type: "number",
        maxRows: 9999,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "浴比",
        prop: "waterRatio",
        width: 120,
        type: "number",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true,
        placeholder: " ",
        change: () => {
          _this.$nextTick(() => {
            _this.chooseData.waterAmount = Number(
              (_this.form.sumWeight * _this.chooseData.waterRatio).toFixed(2)
            );
          });
        }
      },

      {
        label: "水量",
        prop: "waterAmount",
        width: 120,
        type: "number",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "开稀比例",
        prop: "diluteRatio",
        width: 120,
        type: "number",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "输送数量",
        prop: "deliveryQuantity",
        width: 120,
        type: "number",
        minRows: 0,
        maxRows: 9999,
        span: 6,
        cell: true,
        placeholder: " "
      }
    ]
  };
}
