/*
 * @Author: Lyl
 * @Date: 2021-06-07 07:56:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-06 14:47:58
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
            label: "生產單號",
            prop: "weaveJobFk",
            width: 180,
            span: 12,
            tipPlacement: "right",
            disabled: false,
            sortable: true,
            overHidden: true,
            placeholder:" ",
            formslot: true,
            rules: [
              {
                required: true,
                message: "请输入生產單號",
                trigger: "blur"
              }
            ],
          },
          {
            label: "生产单号",
            prop: "salPoNo",
            disabled: true,
            tipPlacement: "right",
            overHidden: true,
            width: 180,
            span: 6,
            placeholder:" ",
            sortable: true,
            rules: [
              {
                required: true,
                message: "请選擇生产单号",
                trigger: "blur"
              }
            ]
            // click: () => {
            //   _this.visible = true
            // }
          },
          {
            label: "客戶編號",
            prop: "custCode",
            overHidden: true,
            tipPlacement: "right",
            disabled: true,
            width: 100,
            span: 6,
            placeholder:" ",
            // type: "select",
            // dicData: cust,
          },
          {
            label: "織單數量",
            prop: "amount",
            tipPlacement: "right",
            disabled: true,
            width: 100,
            placeholder:" ",
            span: 6,
            rules: [
              {
                required: true,
                message: "请输入織單數量",
                trigger: "blur"
              }
            ],
            align: "right"
          },
         
          {
            label: "顏色名稱",
            prop: "colorName",
            tipPlacement: "right",
            disabled: true,
            width: 180,
            span: 6,
            placeholder:" ",
            rules: [
              {
                required: true,
                message: "请選擇顏色名稱",
                trigger: "blur"
              }
            ],
            overHidden: true
          },
    
          {
            label: "布類描述",
            prop: "fabricDesc",
            overHidden: true,
            disabled: true,
            width: 250,
            span: 12,
            tipPlacement: "right",
            placeholder:" ",
            rules: [
              {
                required: true,
                message: "请選擇布類描述",
                trigger: "blur"
              }
            ]
          },
    
          // {
          //   label: "色號",
          //   disabled: true,
          //   prop: "colorCode",
          //   width: 150,
          //   span: 6
          // },
    
          
          // {
          //   label: "纱批",
          //   prop: "yarnBatch",
          //   width: 90,
          //   hide: true,
          //   align: "right",
          //   span: 6
          //   // rules: [{
          //   //   required: true,
          //   //   message: "请输入纱批",
          //   //   trigger: "blur"
          //   // }],
          // },
          {
            label: "開機日期",
            prop: "startDate",
            disabled: true,
            width: 120,
            type: "date",
            align: "center",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            tipPlacement: "right",
            placeholder:" ",
            sortable: true,
            span: 6,
            rules: [
              {
                required: true,
                message: "请選擇開機日期",
                trigger: "blur"
              }
            ]
          },
          {
            label: "機號",
            prop: "mathineCode",
            disabled: false,
            span: 6,
            tipPlacement: "right",
            // width: 120,
            placeholder: " ",
            type: "select",
            dicData: [],
            // dicData: getDicNS(
            //   `proWeaveJobUseMachine?weaveJobFk=${
            //     _this.form ? _this.form.weaveJobId : ""
            //   }`,
            //   "mathineCode",
            //   "mathineCode"
            // ),
            rules: [
              {
                required: true,
                message: "请輸入機號",
                trigger: "blur"
              }
            ],
            overHidden: true,
            change: () => {
              // _this.$nextTick(() => {
              //   _this.form.bph = _this.form.mathineCode;
              //   _this.getBf();
              // });
            }
          },
          // {
          //   label: "布票號编码",
          //   prop: "bph",
          //   span: 6,
          //   hide: true,
          //   placeholder: " ",
          //   disabled: true
          // },
          {
            label: "紗支",
            prop: "fiberComp",
            tipPlacement: "right",
            disabled: true,
            width: 90,
            hide: true,
            placeholder: " ",
            span: 12,
            overHidden: true
          },
          // {
          //   label: "平均匹重",
          //   prop: "pz",
          //   width: 90,
          //   align: "right",
          //   placeholder: " ",
          //   hide: true,
          //   span: 6,
          //   rules: [
          //     {
          //       required: true,
          //       message: "请输入平均匹重",
          //       trigger: "blur"
          //     }
          //   ],
          //   change: () => {
          //     _this.$nextTick(() => {
          //       _this.form.ps = Math.ceil(_this.form.amount / _this.form.pz);
          //     });
          //   }
          // },
          // {
          //   label: "用紗分組",
          //   disabled: false,
          //   prop: "proWeaveJobGroupFk",
          //   width: 120,
          //   type: "select",
          //   dicData: [],
          //   props: {
          //     value: "groupId",
          //     label: "groupName"
          //   },
          //   span: 6,
          //   hide: true,
          //   placeholder: " ",
          //   change: val => {
          //     // _this.getYarn(val.value);
          //   }
          // },
          
          // {
          //   label: "起始疋号",
          //   prop: "qsph",
          //   width: 90,
          //   align: "right",
          //   placeholder: " ",
          //   // type: "number",
          //   hide: true,
          //   span: 6,
          //   rules: [
          //     {
          //       required: true,
          //       message: "请输入起始疋号",
          //       trigger: "blur"
          //     }
          //   ]
          // },
          // {
          //   label: "匹数",
          //   prop: "ps",
          //   width: 90,
          //   align: "right",
          //   placeholder: " ",
          //   // type: "number",
          //   hide: true,
          //   span: 6,
          //   rules: [
          //     {
          //       required: true,
          //       message: "请输入匹数",
          //       trigger: "blur"
          //     }
          //   ]
          // },
          
        ]
      },
      {
        icon: "el-icon-tickets",
        label: "要求:",
        prop: "group3",
        column: [
          // {
          //   label: "克重洗前B/W",
          //   tip: "Trọng lượng trước giặt",
          //   prop: "gramWeight",
          //   // width: 100,
          //   tipPlacement: "right",
          //   span: 6,
          //   // type: "number",
          //   align: "left",
          //   disabled: true,
          //   placeholder: " "
          //   // change: () => {
          //   // _this.codeLength();
          //   //  }
          // },
          // {
          //   label: "克重洗后A/W",
          //   disabled: true,
          //   tip: "Trọng lượng sau giặt",
          //   prop: "afterWeightDsp",
          //   // width: 100,
          //   tipPlacement: "right",
          //   span: 6,
          //   // type: "number",
          //   align: "left",
          //   placeholder: " "
          //   // change: () => {
          //   // _this.codeLength();
          //   //  }
          // },
          {
            label: "幅宽",
            prop: "breadthValue",
            width: 90,
            disabled: true,
            tipPlacement: "right",
            align: "right",
            placeholder:" ",
            span: 6,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入幅宽",
                trigger: "blur"
              }
            ]
          },
          {
            label: "克重",
            prop: "gramWeightValue",
            width: 90,
            overHidden: true,
            align: "right",
            disabled: true,
            placeholder:" ",
            hide: true,
            span: 6,
            rules: [
              {
                required: true,
                message: "请输入克重",
                trigger: "blur"
              }
            ]
          },
          {
            label: "幅宽单位",
            tip: "Đơn vị khổ rộng",
            tipPlacement: "right",
            prop: "breadthUnit",
            width: 100,
            span: 6,
            type: "select",
            disabled:true,
            // dicData: matUnit,
            dicData: getDIC("sal_breadthUnit"),
            placeholder: " ",
            change: () => {
              _this.$nextTick(() => {
                _this.codeLength();
              });
            },
            
          },
          
          // {
          //   label: "克重单位",
          //   tip: "Đơn vị trọng lượng",
          //   prop: "gramWeightUnit",
          //   width: 100,
          //   span: 6,
          //   type: "select",
          //   tipPlacement: "right",
          //   // dicData: matUnit,
          //   dicData: [
          //     {
          //       label: "g/m²",
          //       value: "g"
          //     }
          //     // {
          //     //   label: "Kg/m²",
          //     //   value: "Kg"
          //     // }
          //   ],
          //   placeholder: " ",
          //   // change: () => {
          //   //   _this.$nextTick(() => {
          //   //     _this.codeLength();
          //   //   });
          //   // }
          // },
          
          

        ]
      },
      {
        icon: "el-icon-toilet-paper",
        label: "胚布信息:",
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
          // {
          //   label: "净重(LBS)",
          //   tip: "trọng lượng tịnh(LBS)",
          //   prop: "netWeightLbs",
          //   width: 100,
          //   tipPlacement: "right",
          //   span: 6,
          //   minRows: 0,
          //   type: "number",
          //   precision: 1,
          //   align: "left",
          //   // rules: [
          //   //   {
          //   //     required: true,
          //   //     message: "請输入净重",
          //   //     trigger: "blur"
          //   //   }
          //   // ],
          //   placeholder: " "
          // },
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
          // {
          //   label: "QC扣减数",
          //   tip: "trọng lượng QC cắt giảm",
          //   prop: "qcTakeOut",
          //   tipPlacement: "right",
          //   width: 160,
          //   align: "right",
          //   span: 6,
          //   cell: true,
          //   placeholder: " ",
          //   type: "number",
          //   precision: 1
          // },
          {
            label: "毛重(KG)",
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
          // {
          //   label: "浮重(LBS)",
          //   tip: "trọng lượng bì(LBS)",
          //   prop: "grossWeightLbs",
          //   tipPlacement: "right",
          //   width: 100,
          //   span: 6,
          //   minRows: 0,
          //   type: "number",
          //   precision: 1,
          //   align: "left",
          //   placeholder: " ",
          //   change: () => {}
          // },

          // {
          //   label: "计码克重",
          //   tipPlacement: "right",
          //   tip: "Trọng lượng thực tế",
          //   prop: "realGramWeight",
          //   width: 100,
          //   span: 6,
          //   type: "number",
          //   align: "left",
          //   placeholder: " ",
          //   change: val => {
          //     if (val.value) {
          //       _this.$nextTick(() => {
          //         _this.codeLength();
          //       });
          //     }
          //   }
          // },
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

          // {
          //   label: "计码边至边(幅宽)",
          //   tip: "Khổ rộng vải mộc",
          //   prop: "actualSideBreadth", //clothWidth
          //   width: 100,
          //   span: 6,
          //   tipPlacement: "right",
          //   type: "number",
          //   align: "left",
          //   placeholder: " ",
          //   change: val => {
          //     if (val.value) {
          //       _this.$nextTick(() => {
          //         _this.codeLength();
          //         if (_this.form.widthUnit != "INCH") {
          //           _this.form.actualBreadth = val.value - 5;
          //         } else {
          //           _this.form.actualBreadth = val.value - 2;
          //         }
          //       });
          //     }
          //   }
          // },
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
            label: "米长",
            tip: "Chiều dài sợi",
            prop: "clothLengthValue",
            tipPlacement: "right",
            width: 100,
            span: 6,
            type: "number",
            align: "left",
            minRows: 0,
            placeholder: " "
          },
          {
            label: "产值",
            prop: "measureWage",
            span: 6,
            placeholder: " ",
            align: "right",
            cell: false,
            overHidden: true,
            // sortable: true,
            type: "number",
            width: 100
          },
          {
            label: "疋号",
            prop: "eachNumber",
            width: 100,
            span: 6,
            type: "number",
            tip: "Số cây",
            align: "left",
            tipPlacement: "right",
            minRows: 0,
            placeholder: " ",
            change: () => {
              // _this.$nextTick(() => {
              //   _this.form.productNo =
              //     _this.form.vatNo + _this.$preFixInt(_this.form.eachNumber, 3);
              // });
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
            label: "值机工号",
            prop: "workNo",
            placeholder: " ",
            width: 90,
            hide: true,
            span: 6,
            tipPlacement: "right",
            rules: [{
              required: true,
              message: "请输入值机工号",
              trigger: "blur"
            }],
          },
          {
            label: "验布工号",
            tip: "Số thẻ người kiểm tra",
            placeholder: " ",
            tipPlacement: "right",
            prop: "clothChecker",
            span: 6,
            hide: true,
            rules: [
              {
                required: true,
                message: "請输入验布工号",
                trigger: "blur"
              }
            ],
          },
          // {
          //   label: "验布工号",
          //   prop: "clothChecker",
          //   tip: "Số thẻ người kiểm tra",
          //   span: 6,
          //   placeholder: " ",
          //   tipPlacement: "right",
          //   width: 160,
          //   sortable: true,
          //   rules: [
          //     {
          //       required: true,
          //       message: "請输入验布工号",
          //       trigger: "blur"
          //     }
          //   ],
          //   overHidden: true
          // },
          // {
          //   label: "打印模板",
          //   // tip: "Tổng cộng(KG)",
          //   prop: "basePrintTemplateFk",
          //   tip: "In mẫu",
          //   tipPlacement: "right",
          //   width: 100,
          //   span: 12,
          //   type: "select",
          //   // props: {
          //   //   label: "tempTitle",
          //   //   value: "tempId"
          //   // },
          //   dicData: getDicT("basePrintTemplate/list", "tempTitle", "tempId", {
          //     isUsed: 1
          //   }),
          //   placeholder: " ",
          //   rules: [
          //     {
          //       required: true,
          //       message: "請选择打印模板",
          //       trigger: "blur"
          //     }
          //   ]
          // },
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
