/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-13 15:08:23
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export const picTop = [{value:"━",label:"━"},{value:"V",label:"V"},{value:"U",label:"U"}],
picBottom = [{value:"━",label:"━"},{value:"Λ",label:"Λ"},{value:"Π",label:"Π"}]

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
        label: "訂單編號",
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
      {
        label: "開機日期",
        prop: "startDate",
        span: 6,
        type: "date",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        tip: "Sắp xếp ngày dệt"
      },
      {
        label: "色號",
        prop: "colorCode",
        span: 6,
        placeholder: " ",
        tip: "color number"
      },
      {
        label: "機號",
        prop: "mathineCode",
        span: 6,
        placeholder: " ",

        tip: "Mã số máy dệt"
      },
      {
        label: "制單人",
        prop: "creator",
        span: 6,
        placeholder: " ",
        tip: "Lập đơn"
      },
      {
        label: "审核状态",
        prop: "auditState",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: [
          {
            value: 0,
            label: "待审核"
          },
          {
            value: 1,
            label: "已审核"
          }
        ],
        change: () => {
          // _this.$nextTick(() => {
          //   _this.query();
          // });
        }
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
        label: "訂單編號",
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

export function mainCrud(_this, audit) {
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
        label: "生產單號",
        prop: "weaveJobCode",
        overHidden: true,
        width: 180,
        span: 6,
        tip: "MS đơn sản xuất bp Dệt",
        sortable: true,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        rules: [
          {
            required: true,
            message: "请输入生產單號",
            trigger: "blur"
          }
        ]
      },
      {
        label: "訂單編號",
        prop: "salPoNo",
        width: 180,
        span: 6,
        placeholder: " ",
        sortable: true,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        overHidden: true,
        // rules: [
        //   {
        //     required: true,
        //     message: "请選擇訂單編號",
        //     trigger: "blur"
        //   }
        // ]
        // click: () => {
        //   _this.visible = true
        // }
      },
      {
        label: "齐胚期",
        prop: "calicoDate",
        width: 130,
        span: 6,
        type: "date",
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇出胚布日期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇出胚布日期",
            trigger: "blur"
          }
        ],
        tip: "Kỳ hạn vải mộc"
      },
      {
        label: "成品交期",
        prop: "productDate",
        width: 120,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 6,
        type: "date",
        tip: "Kỳ hạn thành phẩm",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: "请選擇成品期",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇成品期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "营销单号",
        prop: "marketOrder",
        tip: "Mã số dệt bộ phận Sales",
        span: 6,
        width: 200,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "BOM编号",
        prop: "bomId",
        tip: "bom code",
        span: 6,
        width: 120,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        overHidden: true,
        placeholder: " ",
        click: () => {
          if (_this.detail.auditState) {
            return
          }
          _this.choiceQ.sortF = 'custId'
          _this.choiceQ.fuzzy = "brandId,guestFabId"
          _this.choiceTle = "选择BOM资料";
          _this.choiceV = true;
        }
      },
      
      {
        label: "客人訂單編號",
        prop: "custPoNo",
        span: 6,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        width: 120,
        placeholder: " ",
        tip: "Ckhách hàng PO",
        hide: true
      },

      {
        label: "客戶名稱",
        prop: "custCode",
        overHidden: true,
        width: 200,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust,
        tip: "Khách hàng",
        filterable: true,
        change: () => {
          // _this.$nextTick(() => {
          //   _this.form.custCode = _this.form.custName;
          // });
        }
      },
      {
        label: "開機日期",
        prop: "startDate",
        width: 120,
        type: "date",
        align: "center",
        tip: "Sắp xếp ngày dệt",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        placeholder: "请選擇開機日期",
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
        label: "顏色名稱",
        prop: "colorName",
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        tip: "Màu sắc",
        width: 180,
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
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        overHidden: true,
        tip: "Số màu"
        // row: true
      },

      {
        label: "布类代码",
        prop: "custFabricCode",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Fabric Code",
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        hide: true
      },
      
      {
        label: "合同数量",
        prop: "contractAmount",
        width: 100,
        placeholder: " ",
        span: 6,
        type: "number",
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        align: "left",
        tip: "Số lượng của hợp đồng"
      },
      {
        label: "織胚數量",
        prop: "amount",
        width: 100,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        placeholder: " ",
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
        placeholder: " ",
        span: 6,
        type: "number",
        align: "left",
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        tip: " Số lượng sợi "
      },
      {
        label: "季节",
        prop: "seasonCode",
        span: 6,
        width: 120,
        placeholder: " ",
        tip: "Mùa hàng",
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        hide: true
        // row: true
      },
      {
        label: "纤维成份比例",
        prop: "fiberComp",
        placeholder: " ",
        overHidden: true,
        width: 250,
        tip: "Tỷ lệ sơ sợi",
        span: 12,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        hide: true
      },
      
      

      {
        label: "布類描述",
        prop: "fabricDesc",
        overHidden: true,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
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

      {
        label: "克重",
        prop: "gramWeightValue",
        width: 120,
        minRows: 0,
        hide: true,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 4,
        // type: "number",
        // minRows: 0,
        placeholder: " ",
        tip: "Trọng lượng trước giặt"
      },
      {
        label: "单位",
        prop: "gramWeightUnit",
        labelWidth: 50,
        clearable: false,
        formslot: true,
        hide: true,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 2,
        type: "select",
        dicData: getDIC("sal_gramUnit"),
        placeholder: " ",
        defaultIndex: 1,
        tip: "Trọng lượng trước giặt"
      },
      {
        label: "+",
        prop: "gwMaxValue",
        labelWidth: 20,
        minRows: 0,
        hide: true,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 2,
        type: "number",
        placeholder: " ",
        tip: "Trọng lượng trước giặt"
      },
      {
        label: "-",
        prop: "gwMinValue",
        labelWidth: 20,
        hide: true,
        minRows: 0,
        type: "number",
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 2,
        // type: "number",
        placeholder: " ",
        tip: "Trọng lượng trước giặt"
      },

      {
        label: "单位",
        prop: "gmAcceptUnit",
        labelWidth: 50,
        hide: true,
        // clearable:false,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 2,
        type: "select",
        dicData: [
          {
            label: "%",
            value: "%"
          }
        ],
        placeholder: " ",
        defaultIndex: 1,
        tip: "Trọng lượng trước giặt"
      },
      {
        label: "門幅",
        prop: "breadthValue",
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        tip: "Thực dụng",
        width: 90,
        // minRows: 0,
        hide: true,
        span: 4,
        type: "number",
        placeholder: " "
      },
      {
        label: "单位",
        prop: "breadthUnit",
        labelWidth: 50,
        hide: true,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 2,
        clearable: false,
        type: "select",
        dicData: getDIC("sal_breadthUnit"),
        placeholder: " ",
        tip: "Trọng lượng trước giặt"
      },
      {
        label: "+",
        prop: "breadthUpper",
        labelWidth: 20,
        hide: true,
        minRows: 0,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 2,
        type: "number",
        placeholder: " ",
        tip: "Trọng lượng trước giặt"
      },
      {
        label: "-",
        prop: "breadthLower",
        labelWidth: 20,
        hide: true,
        minRows: 0,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 2,
        type: "number",
        placeholder: " ",
        tip: "Trọng lượng trước giặt"
      },
      {
        label: "单位",
        prop: "breadthAcceptUnit",
        labelWidth: 50,
        hide: true,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        span: 2,
        type: "select",
        dicData: [
          {
            label: "%",
            value: "%"
          }
        ],
        placeholder: " ",
        tip: "Trọng lượng trước giặt"
      },
      {
        label: "橫縮",
        prop: "horizonShrink",
        tip: "Co rút ngang",
        span: 6,
        hide: true,
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
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
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
        placeholder: " "
      },
      {
        label: "其他要求",
        prop: "otherRequire",
        tip: "Yêu cầu khác",
        placeholder: " ",
        hide: true,
        span: 12
      },
      {
        label: "织单状态",
        tip: "state",
        disabled: audit
          ? false
          : _this.detail.auditState && !_this.isAdd
          ? true
          : false,
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
      }
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
            label: "機號",
            prop: "mathineCode",
            span: 12,
            width: 180,
            tip: "Mã số máy dệt",
            placeholder: " ",
            overHidden: true,
            readonly: true,
            click: () => {
              if (_this.form.weaveJobId) {
                _this.tabs = "機號信息";
                _this.crudOp = machineCrud(_this);
                _this.visible = true;
              } else {
                _this.$tip.warning("请先保存织单信息!");
              }
            }
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
            span: 6
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
          {
            label: "輸送盤資料",
            tip: "Thông số đĩa dây Cu-roa",
            prop: "transPlate",
            hide: true,
            placeholder: " ",
            span: 12
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
      },
      {
        icon: "el-icon-s-help",
        label: "织单明细",
        prop: "weaveDtl",
      }
    ],
  };
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

export function yarnCrud(_this, audit) {
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
        label: "用纱比例",
        prop: "yarnRatio",
        width: 100,
        span: 6,
        type: "number",
        minRows: 0,
        maxRows: 100,
        cell: true, // audit ? false : _this.detail.auditState ? false : true,
        placeholder: " ",
        change:({ value })=>{
          if (!value) {
            return
          }
          _this.chooseData.amount = Number((_this.form.amount * (value + _this.chooseData.lossRate) / 100).toFixed(1))
        }
      },
      {
        label: "纱损比例",
        prop: "lossRate",
        width: 120,
        align: "right",
        type: "number",
        span: 6,
        minRows: 0,
        maxRows: 20,
        placeholder: " ",
        cell: true,
        change:({ value })=>{
          if (!value) {
            return
          }
          _this.chooseData.amount = Number((_this.form.amount * (value + _this.chooseData.yarnRatio) / 100).toFixed(1)) 
        }
      },
      {
        label: "数量",
        prop: "amount",
        width: 120,
        align: "right",
        type: "number",
        span: 6,
        placeholder: " ",
        minRows: 0,
        cell: true //audit ? false : _this.detail.auditState ? false : true
      },
      {
        label: "实际数量",
        prop: "realAmount",
        width: 120,
        align: "right",
        type: "number",
        span: 6,
        placeholder: " ",
        cell: true,
        minRows: 0,
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
      },
      {
        label: "实测纱支",
        prop: "yarnActual",
        width: 120,
        // overHidden: true,
        placeholder: ' ',
        span: 6,
        cell: true //audit ? false : _this.detail.auditState ? false : true
      },
      {
        label: "纱长",
        prop: "yarnLength",
        width: 120,
        span: 6,
        align: "left",
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
      {
        label: "機號",
        prop: "mathineCode",
        width: 140,
        cell: true,
        filterable: true,
        type: "select",
        dicData: postDicT(
          "baseEquipmentList?categoryId=dev-3",
          "equipmentCode",
          "equipmentCode"
        ),
        span: 6
      },
      {
        label: "开机时间",
        prop: "recordTime",
        width: 160,
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



export function technologyForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 90,
    column: [
      {
        label: "单双面",
        prop: "levelNo",
        labelWidth: 80,
        span: 4,
        placeholder: " ",
        type: 'switch',
        clearable: false,
        dicData: [
          {
            value: 1,
            label:"单面"
          },
          {
            value: 2,
            label:"双面/罗纹"
          }
        ],
        change: ({value}) =>{
          _this.formOp.column[3].disabled = value == 1 ? true : false;
          _this.arrangementOp.column[0].hide = value == 1 ? true : false;
          if (value == 1) {
            _this.form.diskNum = 0;
          }
        }
      },
      {
        label: "排针列数",
        prop: "pinColumn",
        span: 4,
        placeholder: " ",
        type: 'number',
        align: 'right',
        minRows: 0,
        maxRows: 20,
        change: (val)=>{
          if(!val.value){
            _this.arrangement = []
            return
          }
          _this.pincolumnChange(val.value)
        }
      },
      {
        label: "循环路数",
        prop: "totalColumn",
        span: 4,
        placeholder: " ",
        type: 'number',
        align: 'right',
        minRows: 0,
        maxRows: 20,
        change: (val)=>{
          _this.cycleChange(val.value)
        }
      },
      {
        label: "上针列数",
        prop: "diskNum",
        span: 4,
        placeholder: " ",
        type: 'number',
        align: 'right',
        minRows: 0,
        maxRows: 12,
        disabled: false,
        change: (val)=>{
          _this.NumChange(val.value, 1)
        }
      },
      {
        label: "下针列数",
        prop: "syringeNum",
        span: 4,
        placeholder: " ",
        type: 'number',
        align: 'right',
        minRows: 0,
        maxRows: 12,
        change: (val)=>{
          _this.NumChange(val.value, 2)
        }
      },
      {
        label: "织针排列",
        prop: "needlePlaceType",
        span: 4,
        placeholder: " ",
        type: 'select',
        clearable: false,
        dicData: [
          {
            value: 0,
            label:"对位"
          },
          {
            value: 1,
            label:"错位"
          }
        ],
        minRows: 0,
        maxRows: 12,
      },
    ]
  };
}

export function arrangementCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 460px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "针盘针(上针)",
        prop: "prop1",
        span: 6,
        placeholder: " ",
        type: 'number',
        align: 'right',
        hide: false,
        minRows: 0,
        maxRows: 12,
        cell: true,
        width: 140
      },
      {
        label: "针筒针(下针)",
        prop: "prop2",
        span: 6,
        placeholder: " ",
        type: 'number',
        align: 'right',
        minRows: 0,
        maxRows: 12,
        cell: true,
        width: 140
      },
    ]
  };
}

export function technologyCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 460px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "名称",
        prop: "prop1",
        span: 6,
        width: 140,
        placeholder: " ",
        type: 'number',
        align: 'center'
      },
      {
        label: "路数",
        prop: "prop2",
        width: 110,
        span: 6,
        placeholder: " ",
        type: 'number',
        align: 'center'
      },
    ]
  };
}

export function fabricCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 540px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    column: [
      {
        label: "纱线名称",
        prop: "prop1",
        span: 6,
        width: 400,
        overHidden: true,
        placeholder: " ",
        align: 'center'
      },
    ]
  };
}

//  Symbol_Yang 2022.07.09
// 待生产
export function unCreateFormOp(_this){
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column:[
      {
        prop: 'custId',
        label: "客户",
        type: "select",
        dicData: cust,
        span: 4
      },
      {
        prop: 'poNo',
        label: "生产通知单",
        dicData: [],
        span: 4
      },
      {
        prop: 'exDate',
        label: "货期",
        type: "daterange",
        valueFormat: "yyyy-MM-dd",
        span: 6
      }
    ]
  }
}

// 数字千分位转化
function num2Thousadth(num,decimal){
  let reg = /\B(?=(\d{3})+(?!\d))/g
  return (+num || 0).toFixed(decimal).replace(reg,",")
}


export function unCreateCrudOp(_this){
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 274px)",
    refreshBtn: false,
    columnBtn: false,
    labelWidth: 130,
    selection: true,
    column:[
      {
        prop: 'poNo',
        label: "生产通知单号",
        width: 130,
      },
      {
        prop: 'custName',
        label: "客户",
        width: 100,
        overHidden: true
      },
      {
        prop: 'exDate',
        label: "货期",
        width: 100,
      },
      {
        prop: 'fabCode',
        label: "布料编号",
        width: 100,
      },
      {
        prop: 'fabName',
        label: "布料名称",
        width: 200,
        overHidden: true
      },
      {
        prop: 'fabConst',
        label: "布料成分",
        width: 200,
        overHidden: true
      },
      {
        prop: 'colorChnName',
        label: "颜色",
        width: 100,
        formatter(r,v){
          return `${v} (${r.colorEngName})`
        },
        overHidden: true
      },
      {
        prop: 'colorNo',
        label: "本厂色号",
        width: 100,
        align: "center",
      },
      {
        prop: 'colorDept',
        label: "颜色深度",
        width: 100,
        align: "center",
      },
      {
        prop: 'poQtyKg',
        label: "数量(kg)",
        width: 100,
        align: "right",
        formatter(r,v){
          return num2Thousadth(v,1)
        },
      },
      {
        prop: 'dyeClass',
        label: "染色类别",
        width: 100
      },
      {
        prop: 'weavePoQty',
        label: "已排织单数量(kg)",
        width: 100,
        align: "right",
        formatter(r,v){
          return num2Thousadth(v,1)
        },
      },
      {
        prop: 'nuWeavePoQty',
        label: "未排织单数量(kg)",
        width: 100,
        formatter(r,v){
          let value = r.poQtyKg - r.weavePoQty
          return num2Thousadth(value,1) 
        },
        align: "right"
      },
      {
        prop: 'fabWeight11',
        label: "克重(GM2)",
        width: 100,
        align: "right"
      },
      {
        prop: 'fabWidth21',
        label: "幅宽",
        width: 70,
        align: "right"
      },
      {
        prop: 'shrinkHorizontal',
        label: "横缩",
        width: 70,
      },
      {
        prop: 'shrinkVertical',
        label: "直缩",
        width: 70,
      }
    ]
  }
}

// 织单明细
export function weaveDtlCrudOp(_this){
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 515px)",
    refreshBtn: false,
    columnBtn: false,
    labelWidth: 130,
    page: false,
    column: [
      {
        prop: "poNo",
        label: "生产通知单号",
        width: 120
      },
      {
        prop: "fabCode",
        label: "布类代码",
        width: 120
      },
      {
        prop: "fabName",
        label: "布料名称",
      },
      {
        prop: "fabConst",
        label: "布类成份",
      },
      {
        prop: "colorChnName",
        label: "颜色中文名称",
        width: 120
      },
      {
        prop: "colorEngName",
        label: "颜色英文名称",
        width: 150
      },
      {
        prop: "weavePoQty",
        label: "排织数量(kg)",
        cell: true,
        align: 'right',
        type: "number",
        width: 120,
        change(){
          _this.reComputed()
        }
      }
    ]
  }
}
