/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-26 15:20:11
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "生產單號",
        prop: "weaveJobCode",
        span: 6,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt"
      },
      {
        label: "生产单号",
        prop: "salPoNo",
        span: 6,
        placeholder: " ",
        tip: "MS đơn sản xuất bp Dệt"
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },
      {
        label: "客戶名稱",
        prop: "custCode",
        tip: "Khách hàng",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
      },
      // {
      //   label: "開機日期",
      //   prop: "startDate",
      //   span: 6,
      //   placeholder: " ",
      //   tip: "Sắp xếp ngày dệt"
      // },
      {
        label: "色號",
        prop: "colorCode",
        span: 6,
        placeholder: " ",
        tip: "color number"
      },
      // {
      //   label: "機號",
      //   prop: "mathineCode",
      //   span: 6,
      //   placeholder: " ",

      //   tip: "Mã số máy dệt"
      // },
      {
        label: "开单日期",
        prop: "startDate",
        width: 120,
        placeholder: " ",
        span: 6,
        type: "date",
        tip: "Ngày lên đơn",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " "
      },
      {
        label: "制單人",
        prop: "creator",
        span: 6,
        placeholder: " ",
        tip: "Lập đơn"
      }
      // {
      //   label: _this.$t('whseField.khmc'),
      //   prop: "colorBh",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   // dicData: getDicT("basCustomer", "custName", "custCode")
      // },
    ]
  };
}

export function dlgForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "生产单号",
        prop: "poNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "客戶名稱",
        prop: "custId",
        span: 6,
        placeholder: " ",
        type: "tree",
        dicData: cust
      },
      {
        label: "订单狀態",
        prop: "poStatus",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

let cust = getDicT("basCustomer", "custName", "custCode");

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    // labelPosition: 'top',
    page: true,
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
        label: "生產單號",
        prop: "weaveJobCode",
        overHidden: true,
        width: 180,
        span: 6,
        disabled: false,
        tip: "MS đơn sản xuất bp Dệt",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ]
      },
      {
        label: "加工厂",
        prop: "outFactoryId",
        tip: "Xưởng gia công",
        span: 6,
        width: 150,
        overHidden: true,
        type: "select",
        dicData: getDicT(
          "basProcessingUnit",
          "processingName",
          "basProcessingUnitoid"
        ),
        rules: [
          {
            required: true,
            message: "请選擇加工厂",
            trigger: "blur"
          }
        ]
      },
      {
        label: "加工单价",
        prop: "workPrice",
        tip: "Giá gia công",
        span: 6,
        width: 100,
        type: "number",
        align: "right",
        overHidden: true
      },
      {
        label: "含税",
        prop: "includeTaxe",
        tip: "Đã bao gồm thuế/bao gồm thuế",
        span: 6,
        width: 130,
        overHidden: true,
        type: "switch",
        dicData: [
          {
            value: false,
            label: "否"
          },
          {
            value: true,
            label: "是"
          }
        ]
      },
      {
        label: "开单日期",
        prop: "billDate",
        width: 120,
        span: 6,
        type: "date",
        tip: "Ngày lên đơn",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇开单日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇开单日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "胚布交期",
        prop: "calicoDate",
        width: 130,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇出胚布交期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇胚布交期",
            trigger: "blur"
          }
        ],
        tip: "Kỳ hạn vải mộc"
      },
      {
        label: "織胚數量",
        prop: "amount",
        width: 100,
        placeholder: "请输入織胚數量",
        span: 6,
        // rules: [
        //   {
        //     required: true,
        //     message: "请输入織胚數量",
        //     trigger: "blur"
        //   }
        // ],
        type: "number",
        align: "left",
        tip: "Số lượng vải mộc"
      },
      {
        label: "纱线数量",
        prop: "yarnAmount",
        width: 100,
        placeholder: "请输入纱线数量",
        span: 6,
        type: "number",
        align: "left",
        tip: " Số lượng sợi "
      },
      {
        label: "生产单号",
        prop: "salPoNo",
        width: 180,
        span: 6,
        placeholder: "请選擇生产单号",
        sortable: true,
        overHidden: true
        // rules: [
        //   {
        //     required: true,
        //     message: "请選擇生产单号",
        //     trigger: "blur"
        //   }
        // ]
        // click: () => {
        //   _this.visible = true
        // }
      },
      // {
      //   label: "营销单号",
      //   prop: "marketOrder",
      //   tip: "Mã số dệt bộ phận Sales",
      //   span: 6,
      //   width: 200,
      //   overHidden: true
      // },

      // {
      //   label: "客戶名稱",
      //   prop: "custName",
      //   overHidden: true,
      //   width: 200,
      //   span: 6,
      //   placeholder: "请選擇客戶名稱",
      //   type: "select",
      //   dicData: cust,
      //   tip: "Khách hàng",
      //   change: () => {
      //     _this.$nextTick(() => {
      //       _this.form.custCode = _this.form.custName;
      //     });
      //   }
      // },
      // {
      //   label: "客戶",
      //   prop: "custCode",
      //   overHidden: true,
      //   disabled: false,
      //   tip: "Khách hàng",
      //   width: 120,
      //   span: 6,
      //   type: "select",

      //   dicData: cust,
      //   filterable: true,
      //   allowCreate: true,
      //   defaultFirstOption: true,
      //   placeholder: "请選擇客戶"
      //   // rules: [
      //   //   {
      //   //     required: true,
      //   //     message: "请選擇客戶名稱",
      //   //     trigger: "blur"
      //   //   }
      //   // ]
      // },

      // {
      //   label: "開機日期",
      //   prop: "startDate",
      //   width: 120,
      //   type: "date",
      //   align: "center",
      //   tip: "Sắp xếp ngày dệt",
      //   format: "yyyy-MM-dd",
      //   valueFormat: "yyyy-MM-dd",
      //   placeholder: "请選擇開機日期",
      //   sortable: true,
      //   span: 6,
      //   rules: [
      //     {
      //       required: true,
      //       message: "请選擇開機日期",
      //       trigger: "blur"
      //     }
      //   ]
      // },

      // {
      //   label: "客户批号",
      //   prop: "custPoNo",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Ckhách hàng PO",
      //   hide: true
      // },
      {
        label: "顏色名稱",
        prop: "colorName",
        placeholder: " ",
        tip: "Màu sắc",
        width: 180,
        overHidden: true,
        span: 6,
        placeholder: "请選擇顏色名稱",
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
        label: "色號",
        prop: "colorCode",
        placeholder: " ",
        width: 150,
        span: 6,
        overHidden: true,
        tip: "Số màu"
        // row: true
      },
      {
        label: "季节",
        prop: "seasonCode",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Mùa hàng",
        hide: true
      },
      // {
      //   label: "纱牌",
      //   prop: "yarnBrand",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Nhà cung cấp sợi",
      //   hide: true
      // },
      // {
      //   label: "纱批",
      //   prop: "yarnBatchNo",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Lót sợi",
      //   hide: true
      // },
      // {
      //   label: "纱缸",
      //   prop: "yarnCylinder",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Lô sợi nhà máy",
      //   hide: true
      // },

      // {
      //   label: "合同数量",
      //   prop: "contractAmount",
      //   width: 100,
      //   placeholder: "请输入合同数量",
      //   span: 6,
      //   type: "number",
      //   align: "left",
      //   tip: "Số lượng của hợp đồng"
      // },

      {
        label: "布類描述",
        prop: "fabricDesc",
        placeholder: " ",
        overHidden: true,
        width: 250,
        span: 12,
        placeholder: "请選擇布類描述",
        rules: [
          {
            required: true,
            message: "请選擇布類描述",
            trigger: "blur"
          }
        ],
        tip: "Loại vải "
      },

      // {
      //   label: "布类代码",
      //   prop: "custFabricCode",
      //   span: 6,
      //   width: 120,
      //   placeholder: " ",
      //   tip: "Fabric Code",
      //   hide: true
      // },

      {
        label: "纤维成份比例",
        prop: "fiberComp",
        placeholder: " ",
        overHidden: true,
        width: 250,
        tip: "Tỷ lệ sơ sợi",
        span: 12,
        hide: true,
        placeholder: " "
      }
    ],
    // group: [
    //   {
    //     icon: "el-icon-toilet-paper",
    //     label: "织厂信息",
    //     prop: "group1",
    //     column: [
    //       {
    //         label: "胚布要求",
    //         prop: "calicoFabricRequire",
    //         placeholder: " ",
    //         overHidden: true,
    //         width: 250,
    //         hide: true,
    //         type: "switch",
    //         tip: "Yêu cầu khác",
    //         dicData: [
    //           {
    //             value: "开幅",
    //             label: "开幅(Xẻ biên)"
    //           },
    //           {
    //             value: "圆筒",
    //             label: "圆筒(Không xẻ biên)"
    //           }
    //         ],
    //         span: 6
    //       },
    //       {
    //         label: "抽針/圓筒",
    //         prop: "calicoShap",
    //         width: 90,
    //         span: 6,
    //         hide: true,
    //         placeholder: " ",
    //         type: "switch",
    //         dicData: [
    //           {
    //             value: "1",
    //             label: "抽針"
    //           },
    //           {
    //             value: "2",
    //             label: "圆筒"
    //           }
    //         ]
    //       },
    //       {
    //         label: "成品/洗後(克重)",
    //         prop: "gramWeight",
    //         width: 120,
    //         hide: true,
    //         span: 6,
    //         // type: "number",
    //         placeholder: " ",
    //         tip: "Trọng lượng trước giặt"
    //       },
    //       {
    //         label: "門幅",
    //         prop: "breadth",
    //         tip: "Thực dụng",
    //         width: 90,
    //         hide: true,
    //         span: 6,
    //         // type: "number",
    //         placeholder: " "
    //       },
    //       {
    //         label: "橫縮",
    //         prop: "horizonShrink",
    //         tip: "Co rút ngang",
    //         span: 6,
    //         hide: true,
    //         width: 80,
    //         placeholder: " "
    //       },
    //       {
    //         label: "直縮",
    //         prop: "verticalShrink",
    //         tip: "Co rút thẳng",
    //         width: 80,
    //         span: 6,
    //         hide: true,
    //         placeholder: " "
    //       },
    //       // {
    //       //   label: "機號",
    //       //   prop: "mathineCode",
    //       //   span: 12,
    //       //   width: 180,
    //       //   tip: "Mã số máy dệt",
    //       //   placeholder: " ",
    //       //   overHidden: true,
    //       //   readonly: true,
    //       //   click: () => {
    //       //     if (_this.form.weaveJobId) {
    //       //       _this.tabs = "機號信息";
    //       //       _this.crudOp = machineCrud(_this);
    //       //       _this.visible = true;
    //       //     } else {
    //       //       _this.$tip.warning("请先保存织单信息!");
    //       //     }
    //       //   }
    //       //   // rules: [
    //       //   //   {
    //       //   //     required: true,
    //       //   //     message: "请輸入機號",
    //       //   //     trigger: "blur"
    //       //   //   }
    //       //   // ]
    //       // },
    //       {
    //         label: "筒径(inch)",
    //         tip: "Khổ máy ",
    //         prop: "cylinderInch",
    //         width: 80,
    //         span: 6,
    //         hide: true,
    //         placeholder: " ",
    //         type: "number"
    //       },

    //       {
    //         label: "针距（G）",
    //         tip: "Số kim mỗi inch",
    //         prop: "guage",
    //         width: 80,
    //         span: 6,
    //         hide: true,
    //         placeholder: " ",
    //         type: "number"
    //       },

    //       {
    //         label: "針寸數",
    //         prop: "needleInch",
    //         tip: "Tổng số kim",
    //         width: 80,
    //         span: 6,
    //         hide: true,
    //         placeholder: " "
    //         // type: "number",
    //       },
    //       {
    //         label: "縂針數",
    //         tip: "縂針數",
    //         prop: "needleNumber",
    //         width: 80,
    //         placeholder: " ",
    //         type: "number",
    //         span: 6,
    //         hide: true
    //       },
    //       {
    //         label: "其他要求",
    //         prop: "otherRequire",
    //         tip: "Yêu cầu khác",
    //         placeholder: " ",
    //         hide: true,
    //         span: 12,
    //         placeholder: " "
    //       },
    //       {
    //         label: "紗長",
    //         tip: "Độ dài sợi",
    //         prop: "yarnLength",
    //         width: 80,
    //         placeholder: " ",
    //         span: 6,
    //         hide: true
    //       },
    //       // {
    //       //   label: "更改紗長",
    //       //   prop: "yarnLenghtChanged",
    //       //   tip: "Thay đổi độ dài sợi",
    //       //   width: 90,
    //       //   hide: true,
    //       //   placeholder: " ",
    //       //   span: 6,
    //       //   click: () => {
    //       //     if (!_this.form.weaveJobId) {
    //       //       _this.$tip.error("請先保存通知單信息!");
    //       //       return;
    //       //     }
    //       //     _this.crudOp = longCrud(_this);
    //       //     _this.visible = true;
    //       //     _this.tabs = "更改紗長";
    //       //   }
    //       // },
    //       // {
    //       //   label: "胚重(左)",
    //       //   prop: "calicoLeft",
    //       //   tip: "Trọng lượng vải mộc trái",
    //       //   width: 90,
    //       //   hide: true,
    //       //   span: 6,
    //       //   placeholder: " "
    //       // },
    //       {
    //         label: "胚重",
    //         prop: "calicoMiddle",
    //         tip: "Trọng lượng vải mộc giữa",
    //         width: 90,
    //         placeholder: " ",
    //         hide: true,
    //         span: 6
    //       },

    //       // {
    //       //   label: "胚重(右)",
    //       //   prop: "calicoRight",
    //       //   tip: "Trọng lượng vải mộc phải",
    //       //   width: 90,
    //       //   hide: true,
    //       //   placeholder: " ",
    //       //   span: 6
    //       // },
    //       {
    //         label: "成衣面",
    //         prop: "readyMadeFabric",
    //         tip: "Mặt thành vải",
    //         width: 120,
    //         hide: true,
    //         placeholder: " ",
    //         span: 6
    //       },
    //       {
    //         label: "落布封度",
    //         prop: "fallCloth",
    //         tip: "Độ lớn cuộn vải",
    //         span: 6,
    //         placeholder: " ",
    //         hide: true,
    //         width: 90
    //       },

    //       {
    //         label: "機速",
    //         prop: "mathineSpeed",
    //         tip: "Tốc độ máy",
    //         width: 90,
    //         hide: true,
    //         placeholder: " ",
    //         span: 6
    //       },

    //       {
    //         label: "筒口高度",
    //         tip: "Độ hở mâm trên dưới",
    //         prop: "cylinderHeight",
    //         span: 6,
    //         hide: true,
    //         placeholder: " ",
    //         width: 80
    //       },

    //       {
    //         label: "織機食位",
    //         prop: "weaveEnter",
    //         tip: "Vị trí kim dệt",
    //         width: 80,
    //         placeholder: " ",
    //         span: 6,
    //         hide: true
    //       },

    //       {
    //         label: "布架寬度",
    //         prop: "clothRackWidth",
    //         tip: "Khổ vải trên giá vải",
    //         placeholder: " ",
    //         hide: true,
    //         placeholder: " ",
    //         span: 6
    //       },

    //       {
    //         label: "循環(自動間)",
    //         tip: "Tuần hoàn (vải sọc tự động)",
    //         prop: "loopSpace",
    //         width: 90,
    //         hide: true,
    //         placeholder: " ",
    //         span: 6
    //       },

    //       {
    //         label: "布架資料",
    //         prop: "clothRackDesc",
    //         tip: "Thông số giá vải",
    //         hide: true,
    //         span: 6,
    //         placeholder: " "
    //       },
    //       // {
    //       //   label: "上機工藝",
    //       //   tip: "công nghệ lên máy",
    //       //   prop: "operatProcess",
    //       //   hide: true,
    //       //   span: 12,
    //       //   placeholder: " "
    //       // },
    //       {
    //         label: "輸送盤資料",
    //         tip: "Thông số đĩa dây Cu-roa",
    //         prop: "transPlate",
    //         hide: true,
    //         placeholder: " ",
    //         span: 12
    //       },
    //       {
    //         label: "工艺复核",
    //         tip: "Duyệt lại bảo trì máy",
    //         prop: "techReview",
    //         hide: true,
    //         span: 12,
    //         placeholder: " "
    //       },
    //       {
    //         label: "轉速/重量/匹",
    //         tip: "Số đường dệt/trọng lượng/cây",
    //         prop: "rotaSpeed",
    //         width: 90,
    //         hide: true,
    //         placeholder: " ",
    //         span: 6
    //       },

    //       // {
    //       //   label: "開單複核",
    //       //   prop: "reviewer",
    //       //   span: 6,
    //       //   hide: true,
    //       //   placeholder: " ",
    //       //   width: 90,
    //       // },

    //       // {
    //       //   label: "矯機人簽名",
    //       //   prop: "machineCalibration",
    //       //   width: 80,
    //       //   span: 6,
    //       //   placeholder: " ",
    //       //   hide: true,
    //       // },
    //       // {
    //       //   label: "最終評語",
    //       //   prop: "evaluateComment",
    //       //   hide: true,
    //       //   placeholder: " ",
    //       //   span: 12
    //       // },
    //       // {
    //       //   label: "機修復核人",
    //       //   prop: "machineMaintenance",
    //       //   placeholder: " ",
    //       //   hide: true,
    //       //   span: 6
    //       // },
    //       // {
    //       //   label: "質檢複核",
    //       //   prop: "qcReviewer",
    //       //   hide: true,
    //       //   placeholder: " ",
    //       //   span: 6
    //       // },
    //       // {
    //       //   label: "運轉複核",
    //       //   prop: "transfer",
    //       //   width: 90,
    //       //   hide: true,
    //       //   placeholder: " ",
    //       //   span: 6
    //       // },

    //       // {
    //       //   label: "評語簽名",
    //       //   prop: "appraiser",
    //       //   span: 6,
    //       //   hide: true,
    //       //   placeholder: " ",
    //       //   width: 80,
    //       // },
    //       {
    //         label: "創建日期",
    //         prop: "createTime",
    //         placeholder: " ",
    //         width: 90,
    //         hide: true,
    //         type: "datetime",
    //         format: "yyyy-MM-dd HH:mm:ss",
    //         valueFormat: "yyyy-MM-dd HH:mm:ss",
    //         span: 6,
    //         display: false
    //       },

    //       {
    //         label: "修改日期",
    //         prop: "upateTime",
    //         type: "datetime",
    //         format: "yyyy-MM-dd HH:mm:ss",
    //         valueFormat: "yyyy-MM-dd HH:mm:ss",
    //         span: 6,
    //         placeholder: " ",
    //         hide: true,
    //         display: false
    //       },
    //       {
    //         label: "织单状态",
    //         tip: "state",
    //         disabled: false,
    //         prop: "weaveState",
    //         type: "switch",
    //         dicData: [
    //           {
    //             label: "正常",
    //             value: 0
    //           },
    //           {
    //             label: "草稿",
    //             value: 1
    //           }
    //         ],
    //         hide: true,
    //         placeholder: " ",
    //         span: 6
    //       },

    //       {
    //         label: "製單人",
    //         prop: "creator",
    //         span: 6,
    //         hide: false,
    //         width: 100,
    //         tip: "Lập đơn",
    //         disabled: true,
    //         rules: [
    //           {
    //             required: true,
    //             message: "请输入制单人",
    //             trigger: "blur"
    //           }
    //         ]
    //         // type: "select",
    //         // dicData:
    //         //   postDicT('ucmlUser', 'employeename', 'ucmlUseroid')
    //       },
    //       {
    //         label: "",
    //         tip: "công nghệ lên máy",
    //         prop: "operatProcess",
    //         hide: true,
    //         span: 6,
    //         formslot: true,
    //         placeholder: " ",
    //         click: ()=>{
    //           if (!_this.form.weaveJobId) {
    //             this.$tip.warning("请先保存主表信息！")
    //             return
    //           }
    //           _this.gytDlg = true
    //         }
    //       },
    //     ]
    //   }
    // ] 
  };
}

export function mainYJCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    // labelPosition: 'top',
    page: true,
    labelWidth: 130,
    column: [
      // {
      //   label: "#",
      //   prop: "index",
      //   width: 50,
      //   align: "center",
      //   display: false
      // },
      // {
      //   label: "生產單號",
      //   prop: "weaveJobCode",
      //   overHidden: true,
      //   width: 180,
      //   span: 6,
      //   disabled: false,
      //   tip: "MS đơn sản xuất bp Dệt",
      //   sortable: true,
      //   rules: [
      //     {
      //       required: true,
      //       message: "请输入生產單號",
      //       trigger: "blur"
      //     }
      //   ]
      // },
      // // {
      // //   label: "加工厂",
      // //   prop: "outFactoryId",
      // //   tip: "Xưởng gia công",
      // //   span: 6,
      // //   width: 150,
      // //   overHidden: true,
      // //   type: "select",
      // //   dicData: getDicT(
      // //     "basProcessingUnit",
      // //     "processingName",
      // //     "basProcessingUnitoid"
      // //   ),
      // //   rules: [
      // //     {
      // //       required: true,
      // //       message: "请選擇加工厂",
      // //       trigger: "blur"
      // //     }
      // //   ]
      // // },
      // // {
      // //   label: "加工单价",
      // //   prop: "workPrice",
      // //   tip: "Giá gia công",
      // //   span: 6,
      // //   width: 100,
      // //   type: "number",
      // //   align: "right",
      // //   overHidden: true
      // // },
      // // {
      // //   label: "含税",
      // //   prop: "includeTaxe",
      // //   tip: "Đã bao gồm thuế/bao gồm thuế",
      // //   span: 6,
      // //   width: 130,
      // //   overHidden: true,
      // //   type: "switch",
      // //   dicData: [
      // //     {
      // //       value: false,
      // //       label: "否"
      // //     },
      // //     {
      // //       value: true,
      // //       label: "是"
      // //     }
      // //   ]
      // // },
      // // {
      // //   label: "开单日期",
      // //   prop: "billDate",
      // //   width: 120,
      // //   span: 6,
      // //   type: "date",
      // //   tip: "Ngày lên đơn",
      // //   align: "center",
      // //   format: "yyyy-MM-dd",
      // //   valueFormat: "yyyy-MM-dd",
      // //   placeholder: "请選擇开单日期",
      // //   sortable: true,
      // //   rules: [
      // //     {
      // //       required: true,
      // //       message: "请選擇开单日期",
      // //       trigger: "blur"
      // //     }
      // //   ]
      // // },
      // // {
      // //   label: "胚布交期",
      // //   prop: "calicoDate",
      // //   width: 130,
      // //   span: 6,
      // //   type: "date",
      // //   align: "center",
      // //   format: "yyyy-MM-dd",
      // //   valueFormat: "yyyy-MM-dd",
      // //   placeholder: "请選擇出胚布交期",
      // //   sortable: true,
      // //   rules: [
      // //     {
      // //       required: true,
      // //       message: "请選擇胚布交期",
      // //       trigger: "blur"
      // //     }
      // //   ],
      // //   tip: "Kỳ hạn vải mộc"
      // // },
      // // {
      // //   label: "織胚數量",
      // //   prop: "amount",
      // //   width: 100,
      // //   placeholder: "请输入織胚數量",
      // //   span: 6,
      // //   // rules: [
      // //   //   {
      // //   //     required: true,
      // //   //     message: "请输入織胚數量",
      // //   //     trigger: "blur"
      // //   //   }
      // //   // ],
      // //   type: "number",
      // //   align: "left",
      // //   tip: "Số lượng vải mộc"
      // // },
      // // {
      // //   label: "纱线数量",
      // //   prop: "yarnAmount",
      // //   width: 100,
      // //   placeholder: "请输入纱线数量",
      // //   span: 6,
      // //   type: "number",
      // //   align: "left",
      // //   tip: " Số lượng sợi "
      // // },
      // // {
      // //   label: "生产单号",
      // //   prop: "salPoNo",
      // //   width: 180,
      // //   span: 6,
      // //   placeholder: "请選擇生产单号",
      // //   sortable: true,
      // //   overHidden: true
      // //   // rules: [
      // //   //   {
      // //   //     required: true,
      // //   //     message: "请選擇生产单号",
      // //   //     trigger: "blur"
      // //   //   }
      // //   // ]
      // //   // click: () => {
      // //   //   _this.visible = true
      // //   // }
      // // },
      // // // {
      // // //   label: "营销单号",
      // // //   prop: "marketOrder",
      // // //   tip: "Mã số dệt bộ phận Sales",
      // // //   span: 6,
      // // //   width: 200,
      // // //   overHidden: true
      // // // },

      // // // {
      // // //   label: "客戶名稱",
      // // //   prop: "custName",
      // // //   overHidden: true,
      // // //   width: 200,
      // // //   span: 6,
      // // //   placeholder: "请選擇客戶名稱",
      // // //   type: "select",
      // // //   dicData: cust,
      // // //   tip: "Khách hàng",
      // // //   change: () => {
      // // //     _this.$nextTick(() => {
      // // //       _this.form.custCode = _this.form.custName;
      // // //     });
      // // //   }
      // // // },
      // // // {
      // // //   label: "客戶",
      // // //   prop: "custCode",
      // // //   overHidden: true,
      // // //   disabled: false,
      // // //   tip: "Khách hàng",
      // // //   width: 120,
      // // //   span: 6,
      // // //   type: "select",

      // // //   dicData: cust,
      // // //   filterable: true,
      // // //   allowCreate: true,
      // // //   defaultFirstOption: true,
      // // //   placeholder: "请選擇客戶"
      // // //   // rules: [
      // // //   //   {
      // // //   //     required: true,
      // // //   //     message: "请選擇客戶名稱",
      // // //   //     trigger: "blur"
      // // //   //   }
      // // //   // ]
      // // // },

      // // // {
      // // //   label: "開機日期",
      // // //   prop: "startDate",
      // // //   width: 120,
      // // //   type: "date",
      // // //   align: "center",
      // // //   tip: "Sắp xếp ngày dệt",
      // // //   format: "yyyy-MM-dd",
      // // //   valueFormat: "yyyy-MM-dd",
      // // //   placeholder: "请選擇開機日期",
      // // //   sortable: true,
      // // //   span: 6,
      // // //   rules: [
      // // //     {
      // // //       required: true,
      // // //       message: "请選擇開機日期",
      // // //       trigger: "blur"
      // // //     }
      // // //   ]
      // // // },

      // // // {
      // // //   label: "客户批号",
      // // //   prop: "custPoNo",
      // // //   span: 6,
      // // //   width: 120,
      // // //   placeholder: " ",
      // // //   tip: "Ckhách hàng PO",
      // // //   hide: true
      // // // },
      // // {
      // //   label: "顏色名稱",
      // //   prop: "colorName",
      // //   placeholder: " ",
      // //   tip: "Màu sắc",
      // //   width: 180,
      // //   overHidden: true,
      // //   span: 6,
      // //   placeholder: "请選擇顏色名稱",
      // //   rules: [
      // //     {
      // //       required: true,
      // //       message: "请選擇顏色名稱",
      // //       trigger: "blur"
      // //     }
      // //   ],
      // //   overHidden: true
      // // },
      // // {
      // //   label: "色號",
      // //   prop: "colorCode",
      // //   placeholder: " ",
      // //   width: 150,
      // //   span: 6,
      // //   overHidden: true,
      // //   tip: "Số màu"
      // //   // row: true
      // // },
      // // {
      // //   label: "季节",
      // //   prop: "seasonCode",
      // //   span: 6,
      // //   width: 120,
      // //   placeholder: " ",
      // //   tip: "Mùa hàng",
      // //   hide: true
      // // },
      // // // {
      // // //   label: "纱牌",
      // // //   prop: "yarnBrand",
      // // //   span: 6,
      // // //   width: 120,
      // // //   placeholder: " ",
      // // //   tip: "Nhà cung cấp sợi",
      // // //   hide: true
      // // // },
      // // // {
      // // //   label: "纱批",
      // // //   prop: "yarnBatchNo",
      // // //   span: 6,
      // // //   width: 120,
      // // //   placeholder: " ",
      // // //   tip: "Lót sợi",
      // // //   hide: true
      // // // },
      // // // {
      // // //   label: "纱缸",
      // // //   prop: "yarnCylinder",
      // // //   span: 6,
      // // //   width: 120,
      // // //   placeholder: " ",
      // // //   tip: "Lô sợi nhà máy",
      // // //   hide: true
      // // // },

      // // // {
      // // //   label: "合同数量",
      // // //   prop: "contractAmount",
      // // //   width: 100,
      // // //   placeholder: "请输入合同数量",
      // // //   span: 6,
      // // //   type: "number",
      // // //   align: "left",
      // // //   tip: "Số lượng của hợp đồng"
      // // // },

      // // {
      // //   label: "布類描述",
      // //   prop: "fabricDesc",
      // //   placeholder: " ",
      // //   overHidden: true,
      // //   width: 250,
      // //   span: 12,
      // //   placeholder: "请選擇布類描述",
      // //   rules: [
      // //     {
      // //       required: true,
      // //       message: "请選擇布類描述",
      // //       trigger: "blur"
      // //     }
      // //   ],
      // //   tip: "Loại vải "
      // // },

      // // // {
      // // //   label: "布类代码",
      // // //   prop: "custFabricCode",
      // // //   span: 6,
      // // //   width: 120,
      // // //   placeholder: " ",
      // // //   tip: "Fabric Code",
      // // //   hide: true
      // // // },

      // // {
      // //   label: "纤维成份比例",
      // //   prop: "fiberComp",
      // //   placeholder: " ",
      // //   overHidden: true,
      // //   width: 250,
      // //   tip: "Tỷ lệ sơ sợi",
      // //   span: 12,
      // //   hide: true,
      // //   placeholder: " "
      // // }
    ],
    group: [
      {
        icon: "el-icon-toilet-paper",
        label: "织厂信息",
        prop: "group1",
        column: [
          {
            label: "胚布要求",
            prop: "calicoFabricRequire",
            placeholder: " ",
            overHidden: true,
            width: 250,
            hide: true,
            type: "switch",
            tip: "Yêu cầu khác",
            dicData: [
              {
                value: "开幅",
                label: "开幅(Xẻ biên)"
              },
              {
                value: "圆筒",
                label: "圆筒(Không xẻ biên)"
              }
            ],
            span: 6
          },
          {
            label: "抽針/圓筒",
            prop: "calicoShap",
            width: 90,
            span: 6,
            hide: true,
            placeholder: " ",
            type: "switch",
            dicData: [
              {
                value: "1",
                label: "抽針"
              },
              {
                value: "2",
                label: "圆筒"
              }
            ]
          },
          {
            label: "成品/洗後(克重)",
            prop: "gramWeight",
            width: 120,
            hide: true,
            span: 6,
            // type: "number",
            placeholder: " ",
            tip: "Trọng lượng trước giặt"
          },
          {
            label: "門幅(實用)",
            prop: "breadth",
            tip: "Thực dụng",
            width: 90,
            hide: true,
            span: 3,
            // type: "number",
            placeholder: " "
          },
          {
            label: "門幅(邊至邊)",
            prop: "sideBreadth",
            tip: "Thực dụng",
            width: 90,
            hide: true,
            span: 3,
            // type: "number",
            placeholder: " "
          },
          {
            label: "橫縮",
            prop: "horizonShrink",
            tip: "Co rút ngang",
            span: 6,
            hide: true,
            width: 80,
            placeholder: " "
          },
          {
            label: "直縮",
            prop: "verticalShrink",
            tip: "Co rút thẳng",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " "
          },
          // {
          //   label: "機號",
          //   prop: "mathineCode",
          //   span: 12,
          //   width: 180,
          //   tip: "Mã số máy dệt",
          //   placeholder: " ",
          //   overHidden: true,
          //   readonly: true,
          //   click: () => {
          //     if (_this.form.weaveJobId) {
          //       _this.tabs = "機號信息";
          //       _this.crudOp = machineCrud(_this);
          //       _this.visible = true;
          //     } else {
          //       _this.$tip.warning("请先保存织单信息!");
          //     }
          //   }
          //   // rules: [
          //   //   {
          //   //     required: true,
          //   //     message: "请輸入機號",
          //   //     trigger: "blur"
          //   //   }
          //   // ]
          // },
          {
            label: "筒径(inch)",
            tip: "Khổ máy ",
            prop: "cylinderInch",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " ",
            type: "number"
          },

          {
            label: "针距（G）",
            tip: "Số kim mỗi inch",
            prop: "guage",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " ",
            type: "number"
          },

          {
            label: "針寸數",
            prop: "needleInch",
            tip: "Tổng số kim",
            width: 80,
            span: 6,
            hide: true,
            placeholder: " "
            // type: "number",
          },
          {
            label: "縂針數",
            tip: "縂針數",
            prop: "needleNumber",
            width: 80,
            placeholder: " ",
            type: "number",
            span: 6,
            hide: true
          },
          {
            label: "其他要求",
            prop: "otherRequire",
            tip: "Yêu cầu khác",
            placeholder: " ",
            hide: true,
            span: 12,
            placeholder: " "
          },
          {
            label: "紗長",
            tip: "Độ dài sợi",
            prop: "yarnLength",
            width: 80,
            placeholder: " ",
            span: 6,
            hide: true
          },
          // {
          //   label: "更改紗長",
          //   prop: "yarnLenghtChanged",
          //   tip: "Thay đổi độ dài sợi",
          //   width: 90,
          //   hide: true,
          //   placeholder: " ",
          //   span: 6,
          //   click: () => {
          //     if (!_this.form.weaveJobId) {
          //       _this.$tip.error("請先保存通知單信息!");
          //       return;
          //     }
          //     _this.crudOp = longCrud(_this);
          //     _this.visible = true;
          //     _this.tabs = "更改紗長";
          //   }
          // },
          // {
          //   label: "胚重(左)",
          //   prop: "calicoLeft",
          //   tip: "Trọng lượng vải mộc trái",
          //   width: 90,
          //   hide: true,
          //   span: 6,
          //   placeholder: " "
          // },
          {
            label: "胚重",
            prop: "calicoMiddle",
            tip: "Trọng lượng vải mộc giữa",
            width: 90,
            placeholder: " ",
            hide: true,
            span: 6
          },

          // {
          //   label: "胚重(右)",
          //   prop: "calicoRight",
          //   tip: "Trọng lượng vải mộc phải",
          //   width: 90,
          //   hide: true,
          //   placeholder: " ",
          //   span: 6
          // },
          {
            label: "成衣面",
            prop: "readyMadeFabric",
            tip: "Mặt thành vải",
            width: 120,
            hide: true,
            placeholder: " ",
            span: 6
          },
          {
            label: "落布封度",
            prop: "fallCloth",
            tip: "Độ lớn cuộn vải",
            span: 6,
            placeholder: " ",
            hide: true,
            width: 90
          },

          {
            label: "機速",
            prop: "mathineSpeed",
            tip: "Tốc độ máy",
            width: 90,
            hide: true,
            placeholder: " ",
            span: 6
          },

          {
            label: "筒口高度",
            tip: "Độ hở mâm trên dưới",
            prop: "cylinderHeight",
            span: 6,
            hide: true,
            placeholder: " ",
            width: 80
          },

          {
            label: "織機食位",
            prop: "weaveEnter",
            tip: "Vị trí kim dệt",
            width: 80,
            placeholder: " ",
            span: 6,
            hide: true
          },

          {
            label: "布架寬度",
            prop: "clothRackWidth",
            tip: "Khổ vải trên giá vải",
            placeholder: " ",
            hide: true,
            placeholder: " ",
            span: 6
          },

          {
            label: "循環(自動間)",
            tip: "Tuần hoàn (vải sọc tự động)",
            prop: "loopSpace",
            width: 90,
            hide: true,
            placeholder: " ",
            span: 6
          },

          {
            label: "布架資料",
            prop: "clothRackDesc",
            tip: "Thông số giá vải",
            hide: true,
            span: 6,
            placeholder: " "
          },
          // {
          //   label: "上機工藝",
          //   tip: "công nghệ lên máy",
          //   prop: "operatProcess",
          //   hide: true,
          //   span: 12,
          //   placeholder: " "
          // },
          {
            label: "輸送盤資料",
            tip: "Thông số đĩa dây Cu-roa",
            prop: "transPlate",
            hide: true,
            placeholder: " ",
            span: 12
          },
          {
            label: "工艺复核",
            tip: "Duyệt lại bảo trì máy",
            prop: "techReview",
            hide: true,
            span: 12,
            placeholder: " "
          },
          {
            label: "轉速/重量/匹",
            tip: "Số đường dệt/trọng lượng/cây",
            prop: "rotaSpeed",
            width: 90,
            hide: true,
            placeholder: " ",
            span: 6
          },

          // {
          //   label: "開單複核",
          //   prop: "reviewer",
          //   span: 6,
          //   hide: true,
          //   placeholder: " ",
          //   width: 90,
          // },

          // {
          //   label: "矯機人簽名",
          //   prop: "machineCalibration",
          //   width: 80,
          //   span: 6,
          //   placeholder: " ",
          //   hide: true,
          // },
          // {
          //   label: "最終評語",
          //   prop: "evaluateComment",
          //   hide: true,
          //   placeholder: " ",
          //   span: 12
          // },
          // {
          //   label: "機修復核人",
          //   prop: "machineMaintenance",
          //   placeholder: " ",
          //   hide: true,
          //   span: 6
          // },
          // {
          //   label: "質檢複核",
          //   prop: "qcReviewer",
          //   hide: true,
          //   placeholder: " ",
          //   span: 6
          // },
          // {
          //   label: "運轉複核",
          //   prop: "transfer",
          //   width: 90,
          //   hide: true,
          //   placeholder: " ",
          //   span: 6
          // },

          // {
          //   label: "評語簽名",
          //   prop: "appraiser",
          //   span: 6,
          //   hide: true,
          //   placeholder: " ",
          //   width: 80,
          // },
          {
            label: "創建日期",
            prop: "createTime",
            placeholder: " ",
            width: 90,
            hide: true,
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            span: 6,
            display: false
          },

          {
            label: "修改日期",
            prop: "upateTime",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            span: 6,
            placeholder: " ",
            hide: true,
            display: false
          },
          {
            label: "织单状态",
            tip: "state",
            disabled: false,
            prop: "weaveState",
            type: "switch",
            dicData: [
              {
                label: "正常",
                value: 0
              },
              {
                label: "草稿",
                value: 1
              }
            ],
            hide: true,
            placeholder: " ",
            span: 6
          },

          {
            label: "製單人",
            prop: "creator",
            span: 6,
            hide: false,
            width: 100,
            tip: "Lập đơn",
            disabled: true,
            rules: [
              {
                required: true,
                message: "请输入制单人",
                trigger: "blur"
              }
            ]
            // type: "select",
            // dicData:
            //   postDicT('ucmlUser', 'employeename', 'ucmlUseroid')
          },
          {
            label: "",
            tip: "công nghệ lên máy",
            prop: "operatProcess",
            hide: true,
            span: 6,
            formslot: true,
            placeholder: " ",
            click: ()=>{
              if (!_this.form.weaveJobId) {
                this.$tip.warning("请先保存主表信息！")
                return
              }
              _this.gytDlg = true
            }
          },
        ]
      }
    ] 
  }
}

export function dlgCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 195px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    rowKey: "salPooid",
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "訂單號",
        prop: "poNo",
        width: 150,
        span: 6,
        sortable: true
      },
      {
        label: "客人名稱",
        prop: "custId",
        overHidden: true,
        width: 250,
        span: 6,
        type: "select",
        dicData: cust
      },
      {
        label: "订单日期",
        prop: "poDate",
        width: 130,
        type: "date",
        align: "center",
        sortable: true,
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd"
      },
      {
        label: "订单类别",
        prop: "poType",
        width: 110,
        type: "select",
        dicData: getDIC("sal_poType")
      },

      {
        label: "订单狀態",
        prop: "poStatus",
        width: 110,
        type: "select",
        dicData: getDIC("Status")
      }
    ]
  };
}

export function longCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        label: "纱长",
        prop: "yarnLength",
        width: 120,
        span: 6,
        align: "right",
        cell: true
      },
      {
        label: "時間",
        prop: "signDate",
        type: "datetime",
        width: 200,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center",
        cell: true
      }
    ]
  };
}

export function yarnCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 135px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 80,
        align: "center",
        display: false,
        cell: true, //audit ? false : _this.detail.auditState ? false : true,
        placeholder: " "
      },
      {
        label: "纱线编号",
        prop: "yarnCode",
        width: 120,
        span: 6,
        cell: false // audit ? false : _this.detail.auditState ? false : true
      },
      {
        label: "纱线名称",
        prop: "yarnName",
        width: 300,
        overHidden: true,
        span: 6,
        cell: false //audit ? false : _this.detail.auditState ? false : true
      },
      {
        label: "纱牌",
        prop: "yarnBrand",
        width: 150,
        span: 6,
        cell: false, // audit ? false : _this.detail.auditState ? false : true,
        type: "select",
        dicData: getDIC("bas_yarnBrand"),
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        placeholder: " "
      },
      {
        label: "供应商批号",
        prop: "yarnBatch",
        width: 120,
        span: 6,
        cell: false,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "本厂纱批号",
        prop: "factoryYarnBatch",
        width: 120,
        span: 6,
        cell: false,
        placeholder: " "
      },
      {
        label: "实测纱支",
        prop: "yarnActual",
        width: 120,
        // overHidden: true,
        span: 6,
        cell: true //audit ? false : _this.detail.auditState ? false : true
      },
      {
        label: "用纱比例",
        prop: "yarnRatio",
        width: 100,
        span: 6,
        type: "number",
        cell: true, // audit ? false : _this.detail.auditState ? false : true,
        placeholder: " "
      },

      {
        label: "纱长",
        prop: "yarnLength",
        width: 120,
        span: 6,
        align: "right",
        cell: true,
        placeholder: " "
      },
      {
        label: "变更纱长",
        prop: "yarnLengthChanged",
        width: 120,
        span: 6,
        align: "right",
        cell: true, // audit ? false : _this.detail.auditState ? false : true,
        placeholder: " "
      },
      {
        label: "输送张力",
        prop: "lineTension",
        width: 120,
        cell: true, //audit ? false : _this.detail.auditState ? false : true,
        align: "right",
        span: 6,
        placeholder: " "
      },
      {
        label: "数量",
        prop: "amount",
        width: 120,
        align: "right",
        span: 6,
        placeholder: " ",
        cell: true //audit ? false : _this.detail.auditState ? false : true
      },
      {
        label: "单位",
        prop: "unit",
        width: 100,
        span: 6,
        cell: true, // audit ? false : _this.detail.auditState ? false : true,
        placeholder: " ",
        type: "select",
        dicData: getDIC("bas_matUnit")
      }
    ]
  };
}

export function groupCrudOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 50,
        align: "center"
      },
      {
        label: "批次分組名稱",
        prop: "groupName",
        width: 120,
        span: 6,
        cell: true
      },
      {
        label: "更換批次時間",
        prop: "changeBatchTime",
        width: 180,
        span: 6,
        cell: true,
        type: "date",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      }
    ]
  };
}

export function calicoCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        label: "重量",
        prop: "weight",
        width: 120,
        align: "right",
        span: 6,
        cell: true
      },

      {
        label: "门幅",
        prop: "breadth",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "间距（WPI)",
        prop: "wpiSpace",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      },
      {
        label: "间距（CPI）",
        prop: "cpiSpace",
        width: 120,
        align: "right",
        span: 6,
        cell: true,
        placeholder: " "
      }
    ]
  };
}

export function strainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
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
        label: "輸送張力",
        prop: "lineTension",
        width: 120,
        cell: true,
        align: "right",
        span: 6
      }
    ]
  };
}
export function machineCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      // {
      //   label: "機號",
      //   prop: "mathineCode",
      //   width: 140,
      //   cell: true,
      //   filterable: true,
      //   type: "select",
      //   dicData: postDicT(
      //     "baseEquipmentList?categoryId=dev-3",
      //     "equipmentCode",
      //     "equipmentCode"
      //   ),
      //   span: 6
      // },
      {
        label: "记录人",
        prop: "userName",
        width: 140,
        cell: false,
        span: 6
      },
      {
        label: "记录时间",
        prop: "recordTime",
        width: 160,
        cell: false,
        span: 6,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      }
    ]
  };
}

// --- Yang 2022.06.25

// 织胚明细数据
export function meaveEmbyroDtlCrud(_this){
  return {
    height: "calc(100vh - 148px)",
    page: false,
    menu: false,  
    border: true,
    showHeader: false,
    column: [
      {
        prop: "key",
        label: "第一列",
        width: 150,
        align: "center"
      },
      {
        prop: "prop_1",
        label: "第二列",
        width: 150,
        cell: true,
        placeholder: " "
      }
    ]
  }
}

// 设备
export function machineInfoCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "$index",
        width: 50,
        align: "center",
        display: false,
        formatter(row,col,value){
          return Number(value) + 1
        },
      },
      {
        label: "機號",
        prop: "mathineCode",
        width: 140,
        cell: true,
        filterable: true,
        type: "select",
        dicData: [],
        span: 6
      },
      {
        label: "开机时间",
        prop: "recordTime",
        width: 180,
        cell: true,
        span: 6,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      },
      {
        label: "记录人",
        prop: "userName",
        width: 140,
        cell: false,
        span: 6
      },
    ]
  };
}