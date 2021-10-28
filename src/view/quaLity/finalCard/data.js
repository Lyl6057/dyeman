/*
 * @Author: Lyl
 * @Date: 2021-08-07 07:58:01
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-25 11:08:02
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let matUnit = getDIC("bas_matUnit");
let cust = getXDicT("basCustomer");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "缸號",
        prop: "vatNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "成品编号",
        prop: "productNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "订单编号",
        prop: "salPoNo",
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
        props: {
          value: "custCode",
          label: "custName"
        }
      }
    ]
  };
}

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
      {
        label: "缸號",
        prop: "vatNo",
        tip: "Số lô nhuộm",
        // type: "select",
        // dicData: getDicT("proBleadyeJob", "vatNo", "vatNo", {}, "vatNo"),
        // filterable: true,
        // allowCreate: true,
        // defaultFirstOption: true,
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        placeholder: "請输入缸號",
        rules: [
          {
            required: true,
            message: "請输入缸號",
            trigger: "blur"
          }
        ],
        change: val => {
          _this.$nextTick(() => {
            _this.form.productNo =
              _this.form.vatNo + _this.$preFixInt(_this.form.pidNo, 3);
          });

          // if (val.value) {
          //   _this.$nextTick(() => {
          //     _this.query();
          //   });
          // }
        }
      },
      // {
      //   label: "成品编号",
      //   prop: "productNo",
      //   // tip: "Số lô nhuộm",
      //   overHidden: true,
      //   placeholder: " ",
      //   width: 140,
      //   span: 6
      // },
      {
        label: "订单编号",
        prop: "poNo",
        // tip: "Số lô nhuộm",
        overHidden: true,
        placeholder: " ",
        width: 140,
        span: 6
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
        }
      },
      {
        label: "客布代码",
        // tip: "Số màu",
        prop: "guestFabId",
        width: 150,
        span: 6,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "布类名称",
        // tip: "Tổng cộng(KG)",
        prop: "fabName",
        width: 100,
        span: 12,
        placeholder: " "
      },

      {
        label: "成份要求",
        // tip: "Tổng cộng(KG)",
        prop: "guestComponents",
        width: 100,
        span: 12,
        placeholder: " "
      },
      {
        label: "款号",
        // tip: "Số màu",
        prop: "styleNo",
        width: 150,
        span: 6,
        overHidden: true,
        placeholder: " "
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
        label: "客色号",
        // tip: "Màu",
        prop: "custColorNo",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 6,
        placeholder: " "
      },
      {
        label: "工厂色号",
        // tip: "Màu",
        prop: "factoryColorNo",
        placeholder: " ",
        width: 180,
        overHidden: true,
        span: 6,
        placeholder: " "
      },

      {
        label: "克重(洗前)",
        // tip: "Tổng cộng(KG)",
        prop: "gramWeight",
        width: 100,
        span: 6,
        // type: "number",
        align: "left",
        placeholder: " "
        // change: () => {
        // _this.codeLength();
        //  }
      },
      {
        label: "克重(洗后)",
        // tip: "Tổng cộng(KG)",
        prop: "afterWeightDsp",
        width: 100,
        span: 6,
        // type: "number",
        align: "left",
        placeholder: " "
        // change: () => {
        // _this.codeLength();
        //  }
      },
      {
        label: "实际克重",
        // tip: "Tổng cộng(KG)",
        prop: "realGramWeight",
        width: 100,
        span: 6,
        type: "number",
        align: "left",
        placeholder: " ",
        change: () => {
          _this.codeLength();
        }
      },
      {
        label: "克重单位",
        // tip: "Tổng cộng(KG)",
        prop: "gramWeightUnit",
        width: 100,
        span: 6,
        type: "select",
        // dicData: matUnit,
        dicData: [
          {
            label: "g/m²",
            value: "g"
          },
          {
            label: "Kg/m²",
            value: "Kg"
          }
        ],
        placeholder: " ",
        change: () => {
          _this.codeLength();
        }
      },
      {
        label: "幅宽",
        // tip: "Tổng cộng(KG)",
        prop: "breadth",
        width: 100,
        span: 6,
        // type: "number",
        align: "left",
        placeholder: " "
        // change: () => {
        //   _this.codeLength();
        // }
      },
      {
        label: "实际幅宽",
        // tip: "Tổng cộng(KG)",
        prop: "clothWidth",
        width: 100,
        span: 6,
        type: "number",
        align: "left",
        placeholder: " ",
        change: () => {
          _this.codeLength();
        }
      },
      {
        label: "幅宽单位",
        // tip: "Tổng cộng(KG)",
        prop: "widthUnit",
        width: 100,
        span: 6,
        type: "select",
        // dicData: matUnit,
        dicData: getDIC("sal_breadthUnit"),
        placeholder: " ",
        change: () => {
          _this.codeLength();
        }
      },
      {
        label: "码长",
        // tip: "Tổng cộng(KG)",
        prop: "yardLength",
        width: 100,
        span: 6,
        type: "number",
        align: "left",
        minRows: 0,
        placeholder: " "
      },
      {
        label: "浮重(KG)",
        // tip: "Tổng cộng(KG)",
        prop: "grossWeight",
        width: 100,
        span: 6,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " "
      },
      {
        label: "纸筒重量",
        // tip: "Tổng cộng(KG)",
        prop: "paperTube",
        width: 100,
        span: 6,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " "
      },
      {
        label: "QC扣减数",
        prop: "qcTakeOut",
        width: 160,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " ",
        type: "number",
        precision: 1
      },
      {
        label: "净重(KG)",
        // tip: "Tổng cộng(KG)",
        prop: "netWeight",
        width: 100,
        span: 6,
        precision: 1,
        type: "number",
        minRows: 0,
        align: "left",
        placeholder: " ",
        change: () => {
          _this.codeLength();
        }
      },
      {
        label: "浮重(磅)",
        // tip: "Tổng cộng(KG)",
        prop: "grossWeightLbs",
        width: 100,
        span: 6,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " "
      },
      {
        label: "净重(磅)",
        // tip: "Tổng cộng(KG)",
        prop: "netWeightLbs",
        width: 100,
        span: 6,
        minRows: 0,
        type: "number",
        precision: 1,
        align: "left",
        placeholder: " "
      },
      {
        label: "重量单位",
        // tip: "Tổng cộng(KG)",
        prop: "weightUnit",
        width: 100,
        span: 6,
        type: "select",
        // dicData: matUnit,
        dicData: [
          {
            label: "公斤",
            value: "KG"
          },
          {
            label: "磅",
            value: "LBS"
          }
        ],
        placeholder: " ",
        change: () => {
          _this.codeLength();
        }
      },

      // {
      //   label: "布封",
      //   // tip: "Tổng cộng(KG)",
      //   prop: "clothWidth",
      //   width: 100,
      //   span: 6,
      //   type: "number",
      //   align: "left",
      //   placeholder: " "
      // },
      // {
      //   label: "布封单位",
      //   // tip: "Tổng cộng(KG)",
      //   prop: "widthUnit",
      //   width: 100,
      //   span: 6,
      //   type: "select",
      //   dicData: getDIC("sal_breadthUnit"),
      //   placeholder: " "
      // },
      {
        label: "疋号",
        prop: "pidNo",
        width: 100,
        span: 6,
        type: "number",
        align: "left",
        minRows: 1,
        placeholder: " ",
        change: () => {
          _this.$nextTick(() => {
            _this.form.productNo =
              _this.form.vatNo + _this.$preFixInt(_this.form.pidNo, 3);
          });
        }
      },
      {
        label: "产地",
        prop: "originPlace",
        // tip: "Mã vải",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: false,
        type: "select",
        dicData: getDIC("bas_yarnorigin")
      },
      {
        label: "载具编号",
        prop: "storeLoadCode",
        width: 100,
        span: 6,
        align: "left",
        placeholder: " "
      },
      {
        label: "存储位置",
        prop: "storeSiteCode",
        width: 100,
        span: 6,
        placeholder: " ",
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDicT("whseLocation", "locationCode", "locationCode")
      },
      {
        label: "验布工号",
        prop: "clothChecker",
        span: 6,
        placeholder: " ",
        width: 180,
        sortable: true,
        overHidden: true
      },
      {
        label: "打印模板",
        // tip: "Tổng cộng(KG)",
        prop: "basePrintTemplateFk",
        width: 100,
        span: 6,
        type: "select",
        props: {
          label: "tempName",
          value: "tempId"
        },
        dicData: getXDicT("basePrintTemplate/list"),
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "請选择打印模板",
            trigger: "blur"
          }
        ]
      },
      {
        label: "备注",
        prop: "remark",
        width: 250,
        span: 12,
        placeholder: " ",
        // overHidden: true,
        cell: true,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: getDIC("QC_CLOTH_VISITING_REMOVE")
      }
    ]
  };
}

export function temForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "模板编号",
        prop: "tempCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "模板名称",
        prop: "tempName",
        span: 6,
        placeholder: " "
      },
      {
        label: "客戶",
        prop: "custCode",
        width: 180,
        span: 6,
        placeholder: " ",
        overHidden: true,
        type: "select",
        dicData: cust,
        props: {
          value: "custCode",
          label: "custName"
        }
      },
      {
        label: "订单编号",
        prop: "salPoNo",
        span: 6,
        width: 150,
        overHidden: true,
        // type: "textarea",
        placeholder: " "
      }
    ]
  };
}

export function temCrud(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 120,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "模板编号",
        prop: "tempCode",
        span: 6,
        width: 120,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "請输入模板编号",
            trigger: "blur"
          }
        ]
      },
      {
        label: "模板名称",
        prop: "tempName",
        span: 6,
        width: 300,
        placeholder: " ",
        overHidden: true,
        rules: [
          {
            required: true,
            message: "請输入模板名称",
            trigger: "blur"
          }
        ]
      },
      // {
      //   label: "模板内容",
      //   prop: "tempContent",
      //   span: 6,
      //   width: 250,
      //   overHidden: true,
      //   placeholder: " "
      // },

      // {
      //   label: "模板路径",
      //   prop: "tempPath",
      //   span: 6,
      //   width: 350,
      //   overHidden: true,
      //   display: false,
      //   placeholder: " "
      // },
      {
        label: "选择excel模板",
        prop: "excelName",
        width: 350,
        span: 6,
        placeholder: " ",
        formslot: true,
        // slot: true,
        hide: true

        // type: "select",
        // disabled: _this.isAdd ? false : true,
        // display: _this.isAdd ? true : false,
        // click: () => {
        //   _this.$refs.input.click();
        // }
      },

      {
        label: "客戶",
        prop: "custCode",
        width: 180,
        span: 6,
        placeholder: " ",
        overHidden: true,
        type: "select",
        dicData: cust,
        props: {
          value: "custCode",
          label: "custName"
        }
      },
      {
        label: "订单编号",
        prop: "salPoNo",
        span: 6,
        width: 150,
        overHidden: true,
        // type: "textarea",
        placeholder: " "
      },
      {
        label: "通用模板",
        prop: "isDefault",
        width: 120,
        span: 6,
        placeholder: " ",
        overHidden: true,
        type: "switch",
        display: false,
        dicData: [
          {
            label: "否",
            value: false
          },
          {
            label: "是",
            value: true
          }
        ]
      },
      {
        label: "模板说明",
        prop: "tempDescr",
        span: 6,
        width: 400,
        overHidden: true,
        // type: "textarea",
        placeholder: " "
      }
    ]
  };
}
