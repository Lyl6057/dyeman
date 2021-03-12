import { getDIC, getDicT, postDicT } from '@/config/index'

export function rcpb1F(_this) {
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
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === '2' ? true : false,
      },
      {
        label: "送货单号",
        prop: "deliNo",
        display: _this.hide === '2' ? true : false,
        span: 6,
        placeholder: " ",
      },
      {
        label: "来胚编号",
        prop: "registerNo",
        display: _this.hide === '1' ? true : false,
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
        label: "检验状态",
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_yinstatus')
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
        label: "财务状态",
        prop: "finStatus",
        span: 6,
        display: _this.hide === '1' || _this.hide === '2' ? true : false,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_finStatus')
      },
    ],
  }
}
export function rcpb2F(_this) {
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
      // {
      //   label: "入倉類型",
      //   prop: "yinType",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   dicData: getDIC('Whse_CalicoType'),
      //   // display: _this.hide === "6" || _this.hide === "4" ? true : false,
      //   disabled: true
      // },
      {
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        disabled: false, format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      },

      {
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide != '2' ? false : true,
      },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === '2' ? true : false,
      },
      {
        label: "来胚登記编号",
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "1" ? true : false,
        disabled: !_this.isAdd,
        click: (val) => {
          if (_this.isAdd) {
            _this.choiceV = !_this.choiceV
            _this.choiceField = "registerNo";
            _this.choiceTarget = _this.form;
            _this.dlgWidth = "60%";
            _this.choiceTle = "選擇來胚登記";
          }

        },
        change: () => {
          _this.mx = []
          _this.chooseData = {}
          _this.$nextTick(() => {
            if (_this.form.registerNo === '') {
              _this.form.custName = ""
            }
          })
        }
      },
      {
        label: "客戶名称",
        prop: "custName",
        cell: false,
        display: _this.hide === "1" ? true : false,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode"),
        span: 6,
        disabled: true
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
        label: "财务状态",
        prop: "finStatus",
        display: _this.hide === "2" ? true : false,
        span: 6,
        placeholder: " ",
        type: "select",
        dicData:
          getDIC('whse_finStatus'),
        disabled: true
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
export function rcpbDetailF(_this) {
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
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === '2' ? false : true,
      },
      {
        label: "纱线登记编号",
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      // {
      //   label: "检验状态",
      //   prop: "yinStatus",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   display: true,
      //   dicData:
      //     getDIC('whse_yinstatus')
      // },
      //           {
      //   label: "创建日期",
      //   prop: "sysCreated",
      //   span: 8,
      //   placeholder: " ",
      //   disabled: true,
      //   type: "datetime",
      // },
      {
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime",
        disabled: true, format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        disabled: true
      },
      // {
      //   label: "财务状态",
      //   prop: "finStatus",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true
      // },
    ],
  }


}
export function rcpb1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.hide === '1' || _this.hide === '2' ? 'calc(100vh - 275px)' : 'calc(100vh - 300px)',
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "胚布入仓OID",
        prop: "whseCalicoinoid",
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
        width: 200,
      },
      {
        label: "入仓类型",
        prop: "yinType",
        cell: false,
        width: 140,
        type: "select",
        dicData: getDIC('Whse_CalicoType'),
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        cell: true,
        type: "datetime",
        format: "yyyy-MM-dd",
        valueFormat: "yyyy-MM-dd",
        width: 190,
        align: "center",
      },
      {
        label: "採購單號",
        prop: "purNo",
        cell: true,
        hide: _this.hide === "2" ? false : true,
        width: 220,
        placeholder: "請選擇採購單號",
        click: () => {
          _this.choiceV = !_this.choiceV;
          _this.choiceField = "purNo";
          // _this.choiceQ.purType = '5'
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = '胚布採購單';
        },
      },
      {
        label: "送货单号",
        prop: "deliNo",
        cell: true,
        width: 180,
        hide: _this.hide === '2' ? false : true,
        click: (val) => {
          if (!_this.chooseData.purNo) {
            _this.$tip.error("請先選擇採購單號！")
            return
          }
          _this.choiceV = !_this.choiceV
          _this.choiceQ.deliType = 'calico'
          _this.choiceField = "deliNo"
          _this.oldData = _this.chooseData
          // _this.choiceQ.purNo = this.oldData.purNo
          _this.choiceTarget = _this.oldData
          _this.choiceTle = '送貨單'
        },
      },
      {
        label: "来胚编号",
        prop: "registerNo",
        cell: true,
        width: 180,
        hide: _this.hide === "1" ? false : true,

      },
      {
        label: "客戶編號",
        prop: "custId",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("salEmbryogenesis", "custCode", "registerNo"),
      },
      {
        label: "客戶名稱",
        prop: "custName",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode"),
        width: 280,
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        cell: true,
        width: 120,
        type: "select",
        dicData: getDIC('whse_yinstatus'),
      },

      {
        label: "加工厂代號",
        prop: "factoryId",
        cell: true,
        hide: _this.hide === "5" || _this.hide === "7" ? false : true,
        width: 150,
        placeholder: "请选择加工厂代號",
        click: () => {
          _this.choiceField = "factoryId"
          _this.choiceV = !_this.choiceV
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.oldData
          _this.choiceTle = '外厂胚布配料计划',
            _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "加工厂名稱",
        prop: "factoryName",
        cell: false,
        hide: _this.hide === "5" || _this.hide === "7" ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("vWhseMaterialoutPlan", "refName", "refCode")
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
        hide: _this.hide === '1' || _this.hide === '2' ? false : true,
        type: "select",
        dicData:
          getDIC('whse_finStatus'),
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
export function rcpb2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.hide === '1' || _this.hide === '2' ? 'calc(100vh - 310px)' : 'calc(100vh - 285px)',
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseCalicoinDtlaoid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'countingNo',
        type: 'sum',
      },
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },

    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "来胚入仓明细OID",
        prop: "whseCalicoinDtlaoid",
        hide: true,
      },
      {
        label: "生產單號",
        prop: "prodNo",
        cell: true,
        width: 280,
        hide: _this.hide === '6' || _this.hide === '4' || _this.hide === '7' ? false : true,
        placeholder: "請選擇生產單號",
        click: (val) => {
          _this.choiceV = !_this.choiceV
          _this.choiceField = "prodNo";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          if (_this.hide === '6' || _this.hide === '7') {
            _this.choiceTle = "胚布貨物包";
          }
          if (_this.hide === '4') {
            _this.choiceTle = "胚布訂單";
          }
        },
      },
      {
        label: "胚布編碼",
        prop: "calicoId",
        cell: false,
        width: 120,
        hide: _this.hide === '6' || _this.hide === '7' ? true : false,
        click: (val) => {
          _this.choiceV = !_this.choiceV
          _this.choiceField = "calicoId";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.choiceTle = "胚布編碼";
        },
      },
      {
        label: "胚布名称",
        prop: "clothName",
        cell: false,
        width: 450,
        hide: _this.hide === '6' || _this.hide === '7' ? true : false,
        click: (val) => {
        },
      },
      {
        label: "货位码",
        prop: "locationCode",
        hide: true,
      },

      {
        label: "客户编号",
        prop: "custId",
        cell: false,
        width: 150,
        hide: true,
        // type: "select",
        // click: (val) => {
        //   _this.choiceV = !_this.choiceV
        //   _this.choiceField = "custId";
        //   _this.oldData = _this.chooseData;
        //   _this.choiceTarget = _this.oldData;
        //   _this.choiceTle = "客戶編號";
        //   _this.iptChange(_this.chooseData);
        // },
      },
      {
        label: "码卡号",
        prop: "fabticket",
        cell: true,
        width: 140,
        hide: _this.hide === '6' || _this.hide === '4' ? true : false,
      },
      {
        label: "批号",
        prop: "batchNo",
        hide: _this.hide === '6' || _this.hide === '4' || _this.hide === '7' ? true : false,
        cell: true,
        width: 150,
        change: () => {
          _this.$nextTick(() => {
            _this.chooseData.loc.forEach((item, index) => {
              item.batchNo = _this.chooseData.batchNo
            })
          })

        }
      },
      {
        label: "疋數",
        prop: "countingNo",
        hide: _this.hide === '4' ? true : false,
        cell: _this.hide != '6' ? true : false,
        width: 100,
        align: "right",
      },

      {
        label: "来胚入仓_FK",
        prop: "whseCalicoinFk",
        hide: true,
      },


      {
        label: "重量",
        prop: "weight",
        hide: _this.hide === '4' || _this.hide === '7' ? true : false,
        cell: _this.hide != '6' ? true : false,
        width: 100,
        align: "right",

      },

      {
        label: "重量单位",
        prop: "weightUnit",
        hide: _this.hide === '4' || _this.hide === '7' ? true : false,
        cell: _this.hide != '6' ? true : false,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),

      }
    ]
  }

}
export function rcpb3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.hide === '1' || _this.hide === '2' ? 'calc(100vh - 315px)' : 'calc(100vh - 285px)',
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseCalicoinDtlbOid",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'weight',
        type: 'sum'
      },

    ],
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center"
      },
      {
        label: "来胚入仓批号资料OID",
        prop: " whseCalicoinDtlbOid",
        hide: true,
      },
      {
        label: "批号",
        prop: "batchNo",
        cell: true, width: 180,

        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      },
      {
        label: "疋号",
        prop: "countingNo",
        cell: true,
        width: 80,
        align: "right",
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      },
      {
        label: "重量",
        prop: "weight",
        cell: true,
        width: 100,
        align: "right",
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      },
      {
        label: "重量单位",
        prop: "weightUnit",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC("bas_matUnit"),
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      },
      {
        label: "客人布票号",
        prop: "custTicket",
        cell: true,
        width: 150,
        // click: (val) => {
        //   _this.iptPhChange(_this.choosePhData);
        // },
      }
    ]
  }

}

