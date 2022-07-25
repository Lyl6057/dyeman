/*
 * @Author: Lyl
 * @Date: 2021-06-07 07:56:01
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-29 13:54:06
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
    group: [
      {
        icon: "el-icon-tickets",
        label: "PO信息:",
        prop: "group1",
        column: [
          {
            label: "缸號",
            prop: "vatNo",
            tip: "Số lô nhuộm",
            tipPlacement: "right",
            // type: "select",
            // dicData: getDicT("proBleadyeJob", "vatNo", "vatNo", {}, "vatNo"),
            // filterable: true,
            // allowCreate: true,
            // defaultFirstOption: true,
            overHidden: true,
            width: 140,
            span: 12,
            disabled: false,
            sortable: true,
            placeholder: "請输入缸號",
            type: "select",
            formslot: true,
            rules: [
              {
                required: true,
                message: "請输入缸號",
                trigger: "blur"
              }
            ],
            change: val => {
              _this.$nextTick(() => {
                if (val.value) {
                  _this.queryVat(val.value);
                }
              });
            }
          },
          {
            label: "订单编号",
            prop: "poNo",
            tipPlacement: "right",
            tip: "SỐ P.O",
            overHidden: true,
            placeholder: " ",
            disabled: true,
            width: 140,
            readonly: true,
            span: 6
          },
          {
            label: "客人订单号",
            prop: "custPoNo",
            tip: "PO khách hàng",
            overHidden: true,
            tipPlacement: "right",
            placeholder: " ",
            disabled: true,
            width: 140,
            readonly: true,
            span: 6
          },
          {
            label: "客戶名称",
            tip: "Khách hàng",
            prop: "custCode",
            readonly: true,
            overHidden: true,
            tipPlacement: "right",
            width: 200,
            span: 6,
            placeholder: " ",
            filterable: true,
            allowCreate: true,
            disabled: true,
            defaultFirstOption: true,
            type: "select",
            dicData: cust,
            props: {
              value: "custCode",
              label: "custName"
            }
          },
          {
            label: "款号",
            tip: "#STLYLE NO",
            prop: "styleNo",
            tipPlacement: "right",
            width: 150,
            span: 6,
            readonly: true,
            disabled: true,
            overHidden: true,
            placeholder: " "
          },
          {
            label: "顏色名稱",
            tip: "Màu",
            readonly: true,
            tipPlacement: "right",
            prop: "colorName",
            placeholder: " ",
            width: 160,
            overHidden: true,
            span: 6,
            disabled: true
          },
          {
            label: "客色号",
            tip: "Số màu",
            readonly: true,
            tipPlacement: "right",
            prop: "custColorNo",
            placeholder: " ",
            width: 160,
            overHidden: true,
            span: 6,
            disabled: true
          },
          {
            label: "工厂色号",
            readonly: true,
            tip: "Số màu nhà máy",
            tipPlacement: "right",
            prop: "factoryColorNo",
            placeholder: " ",
            width: 160,
            disabled: true,
            overHidden: true,
            span: 6
          },
          {
            label: "合同号",
            prop: "contractNo",
            readonly: true,
            tipPlacement: "right",
            tip: "Số hợp đồng",
            span: 6,
            width: 120,
            placeholder: " ",
            disabled: true
          },
          {
            label: "ET号",
            prop: "etNo",
            tip: "mã ET",
            span: 6,
            readonly: true,
            tipPlacement: "right",
            width: 120,
            placeholder: " ",
            disabled: true
          },
          {
            label: "产地",
            prop: "originPlace",
            tip: "xưởng sản xuất",
            tipPlacement: "right",
            span: 6,
            width: 120,
            placeholder: " ",
            disabled: true,
            type: "select",
            dicData: getDIC("bas_yarnorigin")
          }
        ]
      },
      {
        icon: "el-icon-tickets",
        label: "要求:",
        prop: "group3",
        column: [
          {
            label: "克重洗前B/W",
            tip: "Trọng lượng trước giặt",
            prop: "gramWeight",
            tipPlacement: "right",
            span: 6,
            align: "left",
            disabled: true,
            placeholder: " "
          },
          {
            label: "克重洗后A/W",
            disabled: true,
            tip: "Trọng lượng sau giặt",
            prop: "afterWeightDsp",
            tipPlacement: "right",
            span: 6,
            align: "left",
            placeholder: " "
          },
          {
            label: "幅宽",
            tip: "Khổ rộng vải mộc",
            prop: "breadthValue",
            tipPlacement: "right",
            disabled: true,
            width: 100,
            span: 6,
            type: "number",
            align: "left",
            placeholder: " ",
            change: val => {
              _this.$nextTick(() => {
                if (_this.form.widthUnit == "INCH") {
                  _this.form.sideBreadthValue = val.value + 2;
                } else {
                  _this.form.sideBreadthValue = val.value + 5;
                }
              });
            }
          },
          {
            label: "边至边",
            prop: "sideBreadthValue",
            tipPlacement: "right",
            disabled: true,
            width: 100,
            span: 6,
            type: "number",
            align: "left",
            placeholder: " "
          }
        ]
      },
      {
        icon: "el-icon-toilet-paper",
        label: "码卡信息:",
        prop: "group2",
        column: [
          {
            label: "净重(KG)",
            tip: "trọng lượng tịnh(KG)",
            prop: "netWeight",
            width: 100,
            span: 6,
            precision: 1,
            tipPlacement: "right",
            type: "number",
            minRows: 0,
            align: "left",
            placeholder: " ",
            rules: [
              {
                required: true,
                message: "請输入净重",
                trigger: "blur"
              }
            ],
            change: () => {
              _this.$nextTick(() => {
                _this.codeLength();
              });
            }
          },
          {
            label: "净重(LBS)",
            tip: "trọng lượng tịnh(LBS)",
            prop: "netWeightLbs",
            width: 100,
            tipPlacement: "right",
            span: 6,
            minRows: 0,
            type: "number",
            precision: 1,
            align: "left",
            placeholder: " "
          },
          {
            label: "纸筒重量",
            tip: "Trọng lượng thoi giấy",
            prop: "paperTube",
            tipPlacement: "right",
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
            tip: "trọng lượng QC cắt giảm",
            prop: "qcTakeOut",
            tipPlacement: "right",
            width: 160,
            align: "right",
            span: 6,
            cell: true,
            placeholder: " ",
            type: "number",
            precision: 1
          },
          {
            label: "浮重(KG)",
            tip: "Trọng lượng bì(KG)",
            prop: "grossWeight",
            width: 100,
            tipPlacement: "right",
            span: 6,
            minRows: 0,
            type: "number",
            precision: 1,
            align: "left",
            placeholder: " "
          },
          {
            label: "浮重(LBS)",
            tip: "trọng lượng bì(LBS)",
            prop: "grossWeightLbs",
            tipPlacement: "right",
            width: 100,
            span: 6,
            minRows: 0,
            type: "number",
            precision: 1,
            align: "left",
            placeholder: " ",
            change: () => {}
          },

          {
            label: "计码克重",
            tipPlacement: "right",
            tip: "Trọng lượng thực tế",
            prop: "realGramWeight",
            width: 100,
            span: 6,
            type: "number",
            align: "left",
            placeholder: " ",
            change: val => {
              if (val.value) {
                _this.$nextTick(() => {
                  _this.codeLength();
                });
              }
            }
          },
          // {
          //   label: "实用克重",
          //   // tip: "Trọng lượng thực tế",
          //   prop: "actualGramWeight",
          //   width: 100,
          //   span: 6,
          //   type: "number",
          //   align: "left",
          //   placeholder: " "
          //   // change: () => {
          //   //   _this.$nextTick(() => {
          //   //     _this.codeLength();
          //   //   });
          //   // }
          // },

          {
            label: "计码边至边(幅宽)",
            tip: "Khổ rộng vải mộc",
            prop: "actualSideBreadth", //clothWidth
            width: 100,
            span: 6,
            tipPlacement: "right",
            type: "number",
            align: "left",
            placeholder: " ",
            change: val => {
              if (val.value) {
                _this.$nextTick(() => {
                  _this.codeLength();
                  if (_this.form.widthUnit != "INCH") {
                    _this.form.actualBreadth = val.value - 5;
                  } else {
                    _this.form.actualBreadth = val.value - 2;
                  }
                });
              }
            }
          },
          // {
          //   label: "实用边至边",
          //   // tip: "Khổ rộng vải mộc",
          //   prop: "actualBreadth",
          //   width: 100,
          //   span: 6,
          //   type: "number",
          //   align: "left",
          //   placeholder: " "
          // },
          {
            label: "重量单位",
            tip: "đơn vị trọng lượng",
            prop: "weightUnit",
            width: 100,
            span: 6,
            tipPlacement: "right",
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
            rules: [
              {
                required: true,
                message: "請输入模板编号",
                trigger: "blur"
              }
            ],
            placeholder: " ",
            change: () => {
              // _this.grossWeight=(_this.weightUnit=="KG")?0.4:0.9;
              // console.log((_this.weightUnit=="KG")?0.4:0.9)
              _this.changeUnit();
              _this.$nextTick(() => {
                _this.codeLength();
              });
            }
          },
          {
            label: "幅宽单位",
            tip: "Đơn vị khổ rộng",
            tipPlacement: "right",
            prop: "widthUnit",
            width: 100,
            span: 6,
            type: "select",
            // dicData: matUnit,
            dicData: getDIC("sal_breadthUnit"),
            placeholder: " ",
            change: () => {
              _this.$nextTick(() => {
                _this.codeLength();
              });
            },
            rules: [
              {
                required: true,
                message: "請输入模板编号",
                trigger: "blur"
              }
            ]
          },
          {
            label: "克重单位",
            tip: "Đơn vị trọng lượng",
            prop: "gramWeightUnit",
            width: 100,
            span: 6,
            type: "select",
            tipPlacement: "right",
            // dicData: matUnit,
            dicData: [
              {
                label: "g/m²",
                value: "g"
              }
              // {
              //   label: "Kg/m²",
              //   value: "Kg"
              // }
            ],
            rules: [
              {
                required: true,
                message: "請输入模板编号",
                trigger: "blur"
              }
            ],
            placeholder: " ",
            change: () => {
              _this.$nextTick(() => {
                _this.codeLength();
              });
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
            label: "码长",
            tip: "Chiều dài sợi",
            prop: "yardLength",
            tipPlacement: "right",
            width: 100,
            span: 6,
            type: "number",
            align: "left",
            minRows: 0,
            placeholder: " "
          },
          {
            label: "疋号",
            prop: "pidNo",
            width: 100,
            span: 6,
            type: "number",
            tip: "Số cây",
            align: "left",
            tipPlacement: "right",
            minRows: 0,
            placeholder: " ",
            change: () => {
              _this.$nextTick(() => {
                _this.form.productNo =
                  _this.form.vatNo + _this.$preFixInt(_this.form.pidNo, 3);
              });
            }
          },

          {
            label: "载具编号",
            prop: "storeLoadCode",
            tipPlacement: "right",
            tip: "Mã lồng thép",
            width: 100,
            span: 6,
            align: "left",
            // type: "select",
            // filterable: true,
            // dicData: getDicT(
            //   "whsCarriageStorage",
            //   "storageCode",
            //   "carriageStorageId"
            // ),
            placeholder: " ",
            rules: [
              {
                required: true,
                message: "請输入载具编号",
                trigger: "blur"
              }
            ]
          },
          {
            label: "存储位置",
            prop: "storeSiteCode",
            tip: "Vị trí lưu trữ",
            width: 100,
            tipPlacement: "right",
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
            tip: "Số thẻ người kiểm tra",
            span: 6,
            placeholder: " ",
            tipPlacement: "right",
            width: 160,
            sortable: true,
            rules: [
              {
                required: true,
                message: "請输入验布工号",
                trigger: "blur"
              }
            ],
            overHidden: true
          },
          {
            label: "打印模板",
            // tip: "Tổng cộng(KG)",
            prop: "printTemplate", //basePrintTemplateFk
            tip: "In mẫu",
            tipPlacement: "right",
            width: 100,
            span: 12,
            type: "select",
            // props: {
            //   label: "tempTitle",
            //   value: "tempId"
            // },
            dicData: [
              {
                value: 0,
                label: 'SPOWER 通用模板',
              },
              {
                value: 1,
                label:"KANE TOP 定制码卡",
              },
            ],
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
            tipPlacement: "right",
            tip: "ghi chú",
            span: 12,
            placeholder: " ",
            // overHidden: true,
            cell: true,
            type: "select",
            filterable: true,
            allowCreate: true,
            defaultFirstOption: true,
            props: {
              label: "itemName",
              value: "itemName"
            },
            // dicData: getDicT("qcClothCheckItem", "itemName", "itemName")
            dicData: []
          }
        ]
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
        label: "模板标题",
        prop: "tempTitle",
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
        width: 160,
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
        width: 100,
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
        label: "模板标题",
        prop: "tempTitle",
        span: 6,
        placeholder: " ",
        width: 160
      },
      {
        label: "模板名称",
        prop: "tempName",
        span: 6,
        width: 300,
        disabled: true,
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
        width: 140,
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
        width: 120,
        overHidden: true,
        // type: "textarea",
        placeholder: " "
      },
      {
        label: "通用模板",
        prop: "isDefault",
        width: 100,
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
        // width: 400,
        overHidden: true,
        // type: "textarea",
        placeholder: " "
      }
    ]
  };
}
