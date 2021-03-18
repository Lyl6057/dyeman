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
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
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
        label: "客户名称",
        prop: "custName",
        span: 6,
        placeholder: " ",
        type: "select",
        display: _this.hide === "2" ? true : false,
        dicData:
          getDicT('basCustomer', 'custName', 'custName')
      },


      {
        label: "财务状态",
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        display: _this.hide === "1" ? true : false,
        dicData:
          getDIC('whse_finStatus')
      },
    ],
  }
}
export function rsxkr2F(_this) {
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
        disabled: true,
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: true
      },
      {
        label: "入仓类型",
        prop: "yinType",
        cell: false,
        type: "select",
        dicData: getDIC('Whse_FinishedclothType'),
        span: 6,
        display: _this.hide === "2" ? false : true,
        disabled: true
      },
      {
        label: "客户名称",
        prop: "custName",
        span: 6,
        placeholder: " ",
        disabled: false,
        type: "select",
        display: _this.hide === "2" ? true : false,
        dicData:
          getDicT('basCustomer', 'custName', 'custName'),
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "custName";
          _this.choiceTarget = _this.form;
          _this.dlgWidth = "100%";
          _this.choiceTle = "选择客戶";
        }
      },
      {
        label: "客人通知单",
        prop: "custNotice",
        span: 6,
        placeholder: " ",
        disabled: false,
        display: _this.hide === "2" ? true : false,
      },

      {
        label: "检验状态",
        prop: "yinStatus",
        span: 6,
        placeholder: " ",

        type: "select",
        disabled: true,
        dicData:
          getDIC('whse_yinstatus')
      },
      {
        label: "備註",
        prop: "remarks",
        span: 18,
        placeholder: " ",
        disabled: false,
        display: _this.hide === "2" ? true : false,
      },
    ],
  }


}
export function rsxkr1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 230px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "成品布入仓主键OID",
        prop: "whseFinishedclothinoid",
        hide: true,
      },
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "创建日期",
        prop: "sysCreated",
        hide: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center",
      },

      {
        label: "记录删除标记",
        prop: "sysDeleted",
        hide: true,
      },
      {
        label: "入仓编号",
        prop: "yinId",
        cell: true,
        width: 160,
      },
      {
        label: "入仓类型",
        prop: "yinType",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC('Whse_FinishedclothType'),
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        cell: true,
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: 140,
        align: "center",
      },

      {
        label: "客户名稱",
        prop: "custName",
        cell: true,
        hide: _this.hide === "2" ? false : true,
        width: 280,
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "custName";
          // _this.choiceQ.purType = '5'
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = "选择客戶";
        },
      },
      {
        label: "客户代码",
        prop: "custCode",
        cell: false,
        width: 150,
        hide: true,
      },

      {
        label: "客人通知单",
        prop: "custNotice",
        cell: true,
        hide: _this.hide === "2" ? false : true,
        width: 120,
      },

      {
        label: "检验状态",
        prop: "yinStatus",
        cell: true,
        width: 110,
        hide: _this.hide != '2' ? false : true,
        type: "select",
        dicData: getDIC('whse_yinstatus'),
      },
      {
        label: "财务状态",
        prop: "finStatus",
        cell: true,
        width: 120,
        type: "select",
        hide: _this.hide === '1' ? false : true,
        dicData:
          getDIC('whse_finStatus'),
      },
      {
        label: "备注",
        prop: "remarks",
        cell: true,
        hide: _this.hide === '2' ? false : true,
        width: 250,
      },
      {
        label: "创建用户",
        prop: "sysCreatedby",
        hide: true,
      },
      {
        label: "授权用户",
        prop: "sysReplacement",
        hide: true,
      },
      {
        label: "所属岗位",
        prop: "sysPostn",
        hide: true,
      },
      {
        label: "所属部门",
        prop: "sysDivision",
        hide: true,
      },
      {
        label: "所属组织",
        prop: "sysOrg",
        hide: true,
      },
      {
        label: "最后修改用户",
        prop: "sysLastUpdBy",
        hide: true,
        width: 150,
      },
      {
        label: "最后修改日期",
        prop: "sysLastUpd",
        hide: true,
        type: "datetime",
        width: 180,
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        align: "center",
      },
    ],
  }

}
export function rsxkr2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.hide === '2' ? "calc(100vh - 310px)" : "calc(100vh - 265px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseFinishedclothinDtloid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum',
      },
      {
        label: " ",
        name: 'countingNo',
        type: 'sum',
      }
    ],
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center",

      },
      {
        label: "Whse_FinishedclothIn_dtlOID",
        prop: "whseFinishedclothinDtloid",
        hide: true,
      },
      {
        label: "缸号",
        prop: "batchNo",
        cell: _this.hide === '2' ? true : false,
        width: 230,
        // click: () => {
        //   if (_this.hide != 2) {
        //     _this.choiceV = !_this.choiceV;
        //     _this.choiceField = "batchNo";
        //     // _this.choiceQ.purType = '5'
        //     _this.oldData = _this.chooseData
        //     _this.choiceTarget = _this.oldData;
        //     _this.choiceTle = "成品布貨物包";
        //   }

        // },
      },
      {
        label: "布票号",
        prop: "fabticket",
        cell: true,
        width: 230,
      },
      {
        label: "疋数",
        prop: "countingNo",
        cell: true,
        width: 120,
        align: "right",
      },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 120,
        align: "right",
      },
      {
        label: "单位",
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        type: "select",
        dicData: getDIC("bas_matUnit")
      },
      {
        label: "货位码",
        prop: "locationCode",
        cell: true,
        width: 180,
        click: () => {
          _this.dlgWidth = "100%"
          _this.choiceV = !_this.choiceV
          _this.choiceField = "locationCode";
          _this.choiceTarget = _this.chooseData;
          _this.choiceTle = "選擇貨位";
        }
      },
      {
        label: "成品布入仓",
        prop: "whseFinishedclothinFk",
        hide: true,
        width: 100,

      },
    ],
  }

}

