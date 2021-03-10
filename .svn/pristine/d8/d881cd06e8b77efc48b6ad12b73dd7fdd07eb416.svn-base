import { getDIC, getDicT, postDicT } from '@/config/index'
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
        type: "datetime", format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "採購單號",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        // type: "select",
        // placeholder: "請選擇採購單號",
        // click: () => {
        //   _this.choiceV = !_this.choiceV;
        //   _this.choiceField = "purNo";
        //   _this.choiceTarget = _this.form;
        //   _this.choiceTle = '採購單';
        // },
        display: _this.hide === '2' || _this.hide === '6' ? true : false,
      },
      {
        label: "纱线登记编号",
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        // type: "select",
        display: _this.hide === '1' ? true : false,
        // placeholder: "請選擇纱线登记编号",
        // click: () => {

        //   _this.choiceV = !_this.choiceV
        //   _this.choiceField = "registerNo"
        //   _this.choiceTarget = _this.form
        //   _this.choiceTle = '來紗登記'
        // },
      },

      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        // placeholder: "請選擇送货单号",
        display: _this.hide === '2' || _this.hide === '6' ? true : false,
        // type: "select",
        // click: () => {
        //   _this.choiceV = !_this.choiceV
        //   _this.choiceQ.deliType = 'yarns'
        //   _this.choiceField = "deliNo"
        //   _this.choiceTarget = _this.form
        //   _this.choiceTle = '送貨單'
        // },
      },
      //           {
      //   label: "创建日期",
      //   prop: "sysCreated",
      //   span: 8,
      //   placeholder: " ",
      //   disabled: true,
      //   type: "datetime",
      // },

      {
        label: "检验状态",
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_yinstatus')
      },

      // {
      //   label: "财务状态",
      //   prop: "finStatus",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   display: _this.hide != '4' && _this.hide != '5' ? true : false,
      //   dicData:
      //     getDIC('whse_finStatus')
      // },
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
        red: true,
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime", format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        disabled: true
      },
      {
        label: "入倉類型",
        prop: "yinType",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === '4' || _this.hide === '5',
        type: "select",
        dicData: getDIC('Whse_yinType'),

      },
      {
        label: "採購單號",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: _this.isAdd ? false : true,
        display: _this.hide === '2' || _this.hide === '6' ? true : false,
        click: () => {
          if (_this.isAdd) {
            _this.choiceField = "purNo"
            _this.dlgWidth = "100%";
            _this.choiceV = !_this.choiceV
            _this.choiceTarget = _this.form
            _this.choiceTle = '選擇紗線採購單'
          }
          if (_this.form.purNo === '' || _this.form.purNo === null) {
            _this.form.deliNo = ''
          }
        },
      },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === '2' || _this.hide === '6' ? true : false,
        disabled: _this.isAdd ? false : true,
        click: () => {
          if (!_this.form.purNo) {
            _this.$tip.error("请先选择采购单号!");
            return
          }
          if (_this.isAdd) {
            _this.choiceField = "deliNo"
            _this.choiceQ.deliType = 'yarns'
            _this.dlgWidth = "60%";
            _this.choiceV = !_this.choiceV
            _this.choiceTarget = _this.form
            _this.choiceTle = '選擇送貨單'
          }
        },
      },
      {
        label: "纱线登记编号",
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === '1' ? true : false,
        disabled: _this.isAdd ? false : true,
        click: () => {
          if (_this.isAdd) {
            _this.choiceField = "registerNo"
            _this.dlgWidth = "60%";
            _this.choiceV = !_this.choiceV
            _this.choiceTarget = _this.form
            _this.choiceTle = '選擇來紗登記'
          }
        },
        change: () => {
          _this.mx = []
        }
      },
      {
        label: "客戶名称",
        prop: "custName",
        span: 6,
        cell: false,
        display: _this.hide === '1' ? true : false,
        width: 100,
        disabled: true,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode"),
      },
      {
        label: "外发加工厂",
        prop: "factoryId",
        span: 6,
        placeholder: " ",
        display: _this.hide === '5' ? true : false,
        disabled: _this.isAdd ? false : true,
        type: "select",
        dicData: getDicT("vWhseRetyarninoutPlan", "refName", "refCode"),
        click: () => {
          if (_this.isAdd) {
            _this.choiceField = "factoryName"
            _this.choiceV = !_this.choiceV
            _this.dlgWidth = "100%"
            _this.choiceTarget = {}
            _this.choiceTle = '選擇外厂纱线配料计划'
          }
        },
      },
      {
        label: "加工指令單",
        prop: "instructId",
        span: 6,
        placeholder: " ",
        display: _this.hide === '5' ? true : false,
        disabled: _this.isAdd ? false : true,
        type: "select",
        dicData:
          getDicT('viWhseProcessinstruct', "instructId", "instructId"),
        change: () => {
          _this.mx = []
        }
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        display: _this.hide === '5' ? false : true,
        dicData:
          getDIC('whse_yinstatus'),
        disabled: true
      },
      {
        label: "财务状态",
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === '4',
        type: "select",
        dicData:
          getDIC('whse_finStatus'),
      },
      {
        label: "操作員",
        prop: "sysCreatedby",
        disabled: true,
        span: 6,
        type: "select",
        dicData:
          postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
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
    height: "calc(100vh - 232px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "纱线入仓OID",
        prop: "whseYarninoid",
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
        focus: (val) => {
          _this.iptChange(_this.chooseData);
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
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
        width: 200,
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
      },
      {
        label: "入倉類型",
        prop: "yinType",
        cell: false,
        width: 120,
        type: "select",
        dicData: getDIC('Whse_yinType'),
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        cell: true,
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        focus: (val) => {
          _this.iptChange(_this.chooseData);
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        width: 200,
        align: "center",
      },
      {
        label: "採購單號",
        prop: "purNo",
        cell: true,
        hide: _this.hide === '2' || _this.hide === '6' ? false : true,
        width: 220,
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        placeholder: "請選擇採購單號",
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "purNo";
          // _this.choiceQ.purType = '5'
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = '選擇紗線採購單';
        }
      },
      {
        label: "送貨單号",
        prop: "deliNo",
        cell: true,
        width: 180,
        type: "select",
        hide: _this.hide === '2' || _this.hide === '6' ? false : true,
        click: (val) => {
          if (!_this.chooseData.purNo) {
            _this.$tip.error("請先選擇採購單號！")
            return
          }
          _this.choiceV = !_this.choiceV
          _this.choiceQ.deliType = 'yarns'
          _this.choiceField = "deliNo"
          _this.oldData = _this.chooseData
          // _this.choiceQ.purNo = this.oldData.purNo
          _this.choiceTarget = _this.oldData
          _this.choiceTle = '選擇送貨單'
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        placeholder: "請選擇送貨單號"
      },
      {
        label: "纱线登记编号",
        prop: "registerNo",
        cell: true,
        width: 180,
        type: "select",
        placeholder: "請選擇纱线登记编号",
        hide: _this.hide === '1' ? false : true,
        click: () => {
          _this.choiceField = "registerNo"
          _this.choiceV = !_this.choiceV
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.oldData
          _this.choiceTle = '選擇來紗登記'
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
      },
      {
        label: "客戶編號",
        prop: "custId",
        cell: false,
        hide: _this.hide === '1' ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("salIncomingyarn", "custCode", "registerNo"),
      },
      {
        label: "客戶名称",
        prop: "custName",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode"),
        width: 200,
      },

      {
        label: "检验状态",
        prop: "yinStatus",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC('whse_yinstatus'),
        change: (val) => {

          _this.iptChange(_this.chooseData);

        },
      },

      {
        label: "外工厂代號",
        prop: "factoryId",
        cell: true,
        hide: _this.hide === "5" ? false : true,
        width: 150,
        placeholder: "请选择加工厂代號",

      },
      {
        label: "外工厂名稱",
        prop: "factoryName",
        cell: false,
        hide: _this.hide === "5" ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("vWhseRetyarninoutPlan", "refName", "refCode")
      },
      {
        label: "指令单",
        prop: "instructId",
        hide: true,
      },
      {
        label: "财务状态",
        prop: "finStatus",
        cell: true,
        width: 120,
        hide: _this.hide != '5' && _this.hide != '4' ? false : true,
        type: "select",
        dicData:
          getDIC('whse_finStatus'),
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "操作員",
        prop: "sysCreatedby",
        hide: false,
        width: 100,
        type: "select",
        dicData:
          postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
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
        focus: (val) => {
          _this.iptChange(_this.chooseData);
        },
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
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
    height: _this.hide === '4' ? "calc(100vh - 312px)" : "calc(100vh - 310px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseYarninDtloid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'cartonNum',
        type: 'sum',
      },
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },
      {
        label: " ",
        name: 'whseNum',
        type: 'sum'
      },
      {
        label: " ",
        name: 'cartonWei',
        type: 'sum'
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
        label: "纱线入仓明细OID",
        prop: "whseYarninDtloid",
        hide: true,
      },
      {
        label: "生產單號",
        prop: "poNo",
        cell: false,
        hide: _this.hide != '4' ? true : false,
        width: 150,
        placeholder: "請選擇生產單號",
        type: "select",
        dicData: getDicT("whseRetratyarnnotice", "poNo", "yarnsId"),
        // click: (val) => {
        //   _this.choiceV = !_this.choiceV
        //   _this.choiceField = "poNo";
        //   _this.oldData = _this.chooseData;
        //   _this.choiceTarget = _this.oldData;
        //   _this.choiceTle = "退紗通知單";
        // },
      },
      {
        label: "紗線系統編號",
        prop: "yarnsId",
        cell: false,
        width: 120,
        placeholder: "請選擇紗線系統編號",
        click: (val) => {
          // _this.choiceV = !_this.choiceV
          // _this.choiceField = "yarnsId";
          // _this.oldData = _this.chooseData;
          // _this.choiceTarget = _this.oldData;
          // _this.choiceTle = "紗線系統編號";
          // _this.iptChange(_this.chooseData);
        },
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "紗線名称",
        prop: "yarnsName",
        cell: false,
        width: 350,
        type: "select",
        dicData: getDicT("basYarnsData", "yarnsName", "yarnsId"),
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      // {
      //   label: "客戶編號",
      //   prop: "custId",
      //   cell: false,
      //   hide: _this.hide === "1" ? false : true,
      //   width: 100,
      //   // type: "select",
      //   // dicData: getDicT("salEmbryogenesis", "custCode", "registerNo"),
      // },
      {
        label: "纱批/批号",
        prop: "batchNo",
        cell: _this.hide != '5',
        width: 150,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },

      },

      // {
      //   label: "每箱锭数",
      //   prop: "everySpindle",
      //   cell: true,
      //   width: 120,
      //   align: "right",
      //   hide: _this.hide === '4' ? true : false,
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      // {
      //   label: "尾箱锭数",
      //   prop: "tailSpindle",
      //   cell: true,
      //   width: 120,
      //   hide: _this.hide === '4' ? true : false,
      //   align: "right",
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },

      {
        label: "纱牌",
        prop: "yarnsCard",
        cell: true,
        hide: _this.hide === '4' || _this.hide === '5' ? true : false,
        width: 180,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "产地",
        prop: "placeOrigin",
        cell: true,
        width: 150,
        hide: _this.hide === '4' || _this.hide === '5' ? true : false,
        type: "select",
        dicData: getDIC("Whse_Origin"),
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "箱数",
        prop: "cartonNum",
        cell: false,
        width: 100,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
        hide: _this.hide === '4' || _this.hide === '5' ? true : false
      },
      {
        label: _this.hide === '5' ? "发料重量" : "送货单重量",
        prop: "cartonWei",
        cell: false,
        width: 120,
        hide: _this.hide === '4' ? true : false,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: _this.hide === '5' ? "退回箱数" : "入倉箱數",
        prop: "whseNum",
        cell: true,
        hide: _this.hide === '4' ? true : false,
        width: 100,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "入倉重量",
        prop: "weight",
        cell: true,
        width: 100,

        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "单位",
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },


      {
        label: "纱线入仓_FK",
        prop: "whseYarninFk",
        hide: true,
      }
    ],
  }

}


export function backYarn(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 242px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseYarninDtloid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum'
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
        label: "whseRetratyarnnoticeoid",
        prop: "whseRetratyarnnoticeoid",
        hide: true,
      },
      {
        label: "生產單號",
        prop: "poNo",
        cell: true,
        width: 150,
        placeholder: "請選擇紗線系統編號",
        click: (val) => {
          _this.choiceV = !_this.choiceV
          _this.choiceField = "yarnsId";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = "紗線系統編號";
          _this.iptChange(_this.chooseData);
        },
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "紗線描述",
        prop: "yarnsName",
        cell: false,
        width: 350,
        type: "select",
        dicData: getDicT("basYarnsData", "yarnsName", "yarnsId"),
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "纱批/批号",
        prop: "batchNo",
        cell: true,
        width: 200,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },

      },
      {
        label: "箱数",
        prop: "cartonNum",
        cell: true,
        width: 120,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      // {
      //   label: "每箱锭数",
      //   prop: "everySpindle",
      //   cell: true,
      //   width: 120,
      //   align: "right",
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      // {
      //   label: "尾箱锭数",
      //   prop: "tailSpindle",
      //   cell: true,
      //   width: 120,
      //   align: "right",
      //   click: (val) => {
      //     _this.iptChange(_this.chooseData);
      //   },
      // },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 120,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "单位",
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "纱牌",
        prop: "yarnsCard",
        cell: true,
        width: 180,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "产地",
        prop: "placeOrigin",
        cell: true,
        width: 150,
        type: "select",
        dicData: getDIC("Whse_Origin"),
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "入仓数量",
        prop: "whseNum",
        cell: true,
        width: 120,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "客戶編號",
        prop: "custId",
        cell: true,
        width: 150,
        // type: "select",
        click: (val) => {
          _this.choiceV = !_this.choiceV
          _this.choiceField = "custId";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = "选择客戶";
          _this.iptChange(_this.chooseData);
        },
        placeholder: "請選擇客戶編號"
      },
      {
        label: "送货单重量",
        prop: "cartonWei",
        cell: true,
        width: 120,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "纱线入仓_FK",
        prop: "whseYarninFk",
        hide: true,
      }
    ],
  }

}

