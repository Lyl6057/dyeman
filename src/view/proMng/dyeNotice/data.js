/*
 * @Author: Lyl
 * @Date: 2021-01-30 10:55:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-15 19:04:27
 * @Description:
 */

import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 120,
    column: [
      {
        label: "指令编号",
        tip: "Mã vải",
        prop: "orderNo",
        span: 6,
        placeholder: " "
      },
      {
        label: "订单号",
        tip: "Số đơn hàng",
        prop: "po",
        span: 6,
        placeholder: " "
      },
      {
        label: "客户名称",
        tip: "Khách hàng",
        prop: "custCode",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: cust
        // dicData: getDicT("basCustomer", "custName", "custCode")
      },

      {
        label: "染布日期",
        tip: "Ngày bắt đầu nhận đơn",
        prop: "dyeDate",
        span: 6,
        placeholder: " ",
        type: "date",
        align: "center",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss"
      }
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

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelPosition: "right",
    labelWidth: 100,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "指令编号",
        tip: "指令编号(Số hướng dẫn)",
        prop: "orderNo",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        rules: [
          {
            required: true,
            message: "请输入指令编号",
            trigger: "blur"
          }
        ]
      },
      {
        label: "订单号",
        prop: "po",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        rules: [
          {
            required: true,
            message: "订单号(Số đơn hàng)",
            trigger: "blur"
          }
        ],
        tip: "订单号(Số đơn hàng)"
      },

      {
        label: "染布日期",
        tip: "染布日期(Nhuộm ngày)",
        prop: "dyeDate",
        width: 110,
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇染布日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "后整日期",
        tip: "后整日期(Sau khi toàn bộ ngày)",
        prop: "finishDate",
        sortable: true,
        width: 110,
        placeholder: " ",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " ",
        // sortable: true,
        rules: [
          {
            required: true,
            message: "请選擇后整日期",
            trigger: "blur"
          }
        ]
      },
      {
        label: "客户名称",
        tip: "客户名称(Khách hàng)",
        prop: "custName",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        type: "select",
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        dicData: cust,
        rules: [
          {
            required: true,
            message: "请输入客户名称",
            trigger: "blur"
          }
        ],
        change: val => {
          _this.$nextTick(() => {
            _this.form.custCode = _this.form.custName;
          });
        }
      },
      {
        label: "客户编号",
        prop: "custCode",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: false,
        sortable: true,
        rules: [
          {
            required: true,
            message: "请输入客户编号",
            trigger: "blur"
          }
        ],
        tip: "客户编号(Khách hàng số)"
      },
      {
        label: "接单日期",
        tip: "接单日期(Ngày đặt hàng)",
        prop: "issuedDate",
        width: 110,
        placeholder: " ",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " "
        // sortable: true,
      },
      {
        label: "交货日期",
        tip: "交货日期(Ngày giao hàng)",
        prop: "deliveDate",
        width: 110,
        placeholder: " ",
        span: 6,
        type: "date",
        align: "center",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        placeholder: " "
        // sortable: true,
      },

      {
        label: "布料编号",
        tip: "布料编号(Mã vải)",
        prop: "fabricCode",
        width: 140,
        span: 6,
        placeholder: " ",
        overHidden: true,
        rules: [
          {
            required: true,
            message: "布料编号(Mã vải)",
            trigger: "blur"
          }
        ]
      },

      {
        label: "接单人",
        prop: "issuedBy",
        width: 100,
        span: 6,
        tip: "接单人(Người lập)",
        placeholder: " "
      },
      {
        label: "确认人",
        tip: "确认人(Người xem xét)",
        prop: "cosnideredBy",
        width: 100,
        span: 6,
        placeholder: " "
      },
      {
        label: "审批人",
        tip: "审批人(Người xét duyệt)",
        prop: "approvalBy",
        width: 100,
        span: 6,
        placeholder: " "
      },
      {
        label: "生产地点",
        tip: "生产地点(Địa điểm sản xuất)",
        prop: "fabricLocation",
        width: 140,
        span: 6,
        placeholder: " ",
        overHidden: true
      },
      {
        label: "质量要求",
        tip: "质量要求(Yêu cầu chất lượng)",
        prop: "goodsQuality",
        width: 300,
        span: 6,
        placeholder: " ",
        overHidden: true
      },
      {
        label: "备注",
        tip: "备注(Từng dùng)",
        prop: "remark",
        width: 300,
        span: 12,
        placeholder: " ",
        overHidden: true
      },
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
      }
    ]
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

export function itemCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 150px)",
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
        label: "工艺项目名称",
        prop: "finishItem",
        width: 160,
        span: 6,
        cell: true
      },
      {
        label: "工艺位置",
        prop: "finishPlace",
        width: 400,
        span: 6,
        cell: true,
        overHidden: true
      }
    ]
  };
}

export function colorCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 150px)",
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
        label: "L/D打办颜色色号",
        prop: "ldColorCode",
        width: 160,
        span: 6,
        cell: true
      },
      {
        label: "染布工艺类型",
        prop: "dyeingType",
        width: 160,
        span: 6,
        cell: true
      },
      {
        label: "数量(KG)",
        prop: "clothQuantity",
        width: 100,
        span: 6,
        type: "number",
        cell: true,
        placeholder: " "
      },
      {
        label: "完整幅宽",
        prop: "fullWidth",
        width: 100,
        span: 6,
        type: "number",
        cell: true,
        placeholder: " "
      },
      {
        label: "修边幅宽",
        prop: "cuttableWidth",
        width: 100,
        span: 6,
        type: "number",
        cell: true,
        placeholder: " "
      },
      {
        label: "克重(洗前)",
        prop: "weightBeforeWashing",
        width: 100,
        span: 6,
        type: "number",
        cell: true,
        placeholder: " "
      },
      {
        label: "克重(洗后)",
        prop: "weightAfterWashing",
        width: 100,
        span: 6,
        type: "number",
        cell: true,
        placeholder: " "
      },
      {
        label: "缩水率比例宽度(%)",
        prop: "stablityWashingWidth",
        width: 160,
        span: 6,
        type: "number",
        cell: true,
        placeholder: " "
      },
      {
        label: "缩水率比例长度(%)",
        prop: "stablityWashingLength",
        width: 160,
        span: 6,
        type: "number",
        cell: true,
        placeholder: " "
      },
      {
        label: "缩水率比例扭度(%)",
        prop: "stablityWashingSpirality",
        width: 160,
        span: 6,
        type: "number",
        cell: true,
        placeholder: " "
      }
    ]
  };
}

export function fabricCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 360px)",
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
        label: "布料用途类型",
        prop: "clothType",
        width: 180,
        span: 6,
        cell: true
      },
      {
        label: "布料代码",
        prop: "fabricCode",
        width: 180,
        span: 6,
        cell: true
      },
      {
        label: "布料构成",
        prop: "fabricConstruction",
        width: 450,
        span: 6,
        cell: true,
        placeholder: " "
      },

      {
        label: "纤维组成",
        prop: "fiberComposition",
        width: 450,
        span: 6,
        cell: true,
        placeholder: " "
      }
    ]
  };
}

export function testCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 360px)",
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
        label: "测试内容(中文)",
        prop: "testCnContent",
        span: 6,
        cell: true,
        width: 200
      },
      {
        label: "test items",
        prop: "testEnContent",
        span: 6,
        cell: true,
        width: 200
      },
      {
        label: "Kiểm tra nội dung",
        prop: "testVetContent",
        span: 6,
        cell: true,
        width: 250
      }
    ]
  };
}

export function standCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 360px)",
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
        label: "测试标准",
        prop: "testStandar",
        width: 180,
        span: 6,
        cell: true
      },
      {
        label: "测试方法(中文)",
        prop: "testMethodCn",
        width: 180,
        span: 6,
        cell: true
      },
      {
        label: "test method",
        prop: "testMethodEn",
        width: 180,
        span: 6,
        cell: true
      },
      {
        label: "Phương pháp kiểm tra",
        prop: "testMethodVet",
        width: 200,
        span: 6,
        cell: true
      }
    ]
  };
}

export function testItemCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 112px)",
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
        label: "测试项目名称",
        prop: "testItemName",
        width: 300,
        span: 6,
        cell: true
      },
      {
        label: "合格数据",
        prop: "testPassData",
        width: 300,
        span: 6,
        cell: true
      }
    ]
  };
}
