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


      // {
      //   label: "客户名称",
      //   prop: "custName",
      //   span: 6,
      //   placeholder: " ",
      //   type: "select",
      //   display: _this.hide === "2" ? true : false,
      //   dicData:
      //     getDicT('basCustomer', 'custName', 'custName')
      // },
      {
        label: "入仓日期",
        prop: "yinDate",
        span: 6,
        placeholder: " ",
        type: "datetime", format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
      },
      {
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" || _this.hide === "11" ? true : false,
      },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === "2" || _this.hide === "11" ? true : false,
      },
      {
        label: "加工厂名稱",
        prop: "factoryId",
        span: 6,
        placeholder: " ",
        display: _this.hide === "6" ? true : false,
        type: "select",
        dicData: getDicT("vWhseChemicalPlan", "refName", "refCode")
      },
      {
        label: "来料登记编号",
        prop: "registerNo",
        span: 6,
        placeholder: " ",
        display: _this.hide === '1'
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        span: 6,
        placeholder: " ",
        display: _this.hide != "2" && _this.hide != "11" ? true : false,
        type: "select",
        dicData:
          getDIC('whse_yinstatus')
      },
      {
        label: "财务状态",
        prop: "finStatus",
        span: 6,
        placeholder: " ",
        type: "select",
        display: _this.hide != "2" && _this.hide != "11" && _this.hide != '6' ? true : false,
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
        type: "datetime", format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        disabled: true
      },

      {
        label: "采购单号",
        prop: "purNo",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "2" ? true : false,
      },
      {
        label: "送货单号",
        prop: "deliNo",
        span: 6,
        placeholder: " ",
        disabled: true,
      },
      {
        label: "外发厂",
        prop: "factoryId",
        span: 6,
        placeholder: " ",
        disabled: true,
        display: _this.hide === "4" ? true : false,
      },
      // {
      //   label: "客人通知单",
      //   prop: "custNotice",
      //   span: 6,
      //   placeholder: " ",
      //   disabled: true
      // },

    ],
  }


}
export function rsxkr1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [
      {
        label: "成品布入仓主键OID",
        prop: "whseAccessoriesinoid",
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
        change: (val) => {

          _this.iptChange(_this.chooseData);

        },
      },
      {
        label: "入仓类型",
        prop: "yinType",
        cell: false,
        width: 100,
        type: "select",
        dicData: getDIC('Whse_AccessoriesType'),
        change: (val) => {

          _this.iptChange(_this.chooseData);

        },
      },
      {
        label: "入仓日期",
        prop: "yinDate",
        cell: true,
        type: "datetime",
        format: "yyyy-MM-dd HH:mm:ss",
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        width: 190,
        align: "center",
      },
      {
        label: "来料登记编号",
        prop: "registerNo",
        cell: true,
        width: 180,
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
        placeholder: "請選擇来料编号",
        click: () => {
          _this.choiceField = "registerNo"
          _this.choiceV = !_this.choiceV
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.oldData
          _this.choiceTle = '來輔料登記'
        },
        hide: _this.hide === "1" ? false : true,
      },
      {
        label: "客戶編號",
        prop: "custId",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        width: 100,
        type: "select",
        dicData: getDicT("salIncomacc", "custNo", "registerNo"),
      },
      {
        label: "客戶名称",
        prop: "custName",
        cell: false,
        hide: _this.hide === "1" ? false : true,
        type: "select",
        dicData: getDicT("basCustomer", "custName", "custCode"),
        width: 150,
      },
      {
        label: "採購單號",
        prop: "purNo",
        cell: true,
        width: 180,
        hide: _this.hide === "2" || _this.hide === "11" ? false : true,
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
        click: (val) => {
          if (_this.data.type.split('_')[0] === '五金/行政采购') {
            _this.choiceTle = "五金採購單";

          } else {
            _this.choiceTle = "生產輔料採購單";
          }
          _this.choiceV = !_this.choiceV
          _this.choiceField = "purNo";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;

          _this.iptChange(_this.chooseData);
        },
      },

      {
        label: "送货单号",
        prop: "deliNo",
        hide: _this.hide === "2" || _this.hide === "11" ? false : true,
        cell: true,
        width: 160,
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
        click: (val) => {
          if (!_this.chooseData.purNo) {
            _this.$tip.error("請先選擇採購單號！")
            return
          }
          if (_this.data.type.split('_')[0] === '五金/行政采购') {
            _this.choiceQ.deliType = 'hardware'

          } else {
            _this.choiceQ.deliType = 'materials'
          }
          _this.choiceV = !_this.choiceV

          _this.choiceField = "deliNo"
          _this.oldData = _this.chooseData
          // _this.choiceQ.purNo = this.oldData.purNo
          _this.choiceTarget = _this.oldData
          _this.choiceTle = '送貨單'
        },
      },
      {
        label: "加工厂代號",
        prop: "factoryId",
        cell: true,
        hide: _this.hide === "6" ? false : true,
        width: 150,
        placeholder: "加工厂代號",
        click: () => {
          _this.choiceField = "factoryId"
          _this.choiceV = !_this.choiceV
          _this.oldData = _this.chooseData
          _this.choiceTarget = _this.oldData
          _this.choiceTle = '外厂輔料配料计划',
            _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "加工厂名稱",
        prop: "factoryName",
        cell: false,
        hide: _this.hide === "6" ? false : true,
        width: 150,
        type: "select",
        dicData: getDicT("vWhseChemicalPlan", "refName", "refCode")
      },
      {
        label: "检验状态",
        prop: "yinStatus",
        cell: true,
        width: 100,
        type: "select",
        dicData: getDIC('whse_yinstatus'),
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        click: () => {
          _this.iptChange(_this.chooseData);
        }
      },

      {
        label: "财务状态",
        prop: "finStatus",
        cell: true,
        width: 100,
        type: "select",
        dicData:
          getDIC('whse_finStatus'),
        change: (val) => {
          if (val.value === '') {
            _this.iptChange(_this.chooseData);
          }
        },
        click: () => {
          _this.iptChange(_this.chooseData);
        }
      },
      {
        label: "备注",
        prop: "remarks",
        cell: true,
        width: 180,
        hide: true,
        change: (val) => {
          _this.iptChange(_this.chooseData);
        },
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
    height: "calc(100vh - 290px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseAccessoriesinoidDtl",
    showSummary: true,
    sumColumnList: [
      {
        label: " ",
        name: 'poQty',
        type: 'sum'
      },
    ],
    column: [
      {
        prop: "index",
        label: "#",
        width: 50,
        align: "center",

      },
      {
        label: "whseAccessoriesinoidDtl",
        prop: "whseAccessoriesinoidDtl",
        hide: true,
      },
      {
        label: "材料编号",
        prop: "materialNum",
        cell: true,
        width: 160,
        placeholder: "請選擇材料编号",
        click: (val) => {
          if (_this.datas.type.split('_')[0] === "五金/行政采购") {
            _this.choiceTle = "五金";
          } else {
            _this.choiceTle = "生產輔料";
          }
          _this.choiceV = !_this.choiceV
          _this.choiceField = "materialNum";
          _this.oldData = _this.chooseData;
          _this.choiceTarget = _this.oldData;
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "材料类型",
        prop: "materialType",
        cell: false,
        width: 90,
      },
      // {
      //   label: "規格",
      //   prop: "itemspec",
      //   cell: true,
      //   width: 80,
      //   type: "select",
      //   dicData:
      //     getDicT("basProductivesupplies", "itemspec", "hardwareId")
      // },
      // {
      //   label: "型号",
      //   prop: "model",
      //   cell: true,
      //   width: 80,
      //   type: "select",
      //   dicData: getDicT("basProductivesupplies", "model", "hardwareId")
      // },
      {
        label: "批号",
        prop: "batchNo",
        cell: true,
        width: 150,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "数量",
        prop: "poQty",
        cell: true,
        width: 100,
        align: "right",
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
      },
      {
        label: "数量单位",
        prop: "unitQty",
        cell: true,
        width: 100,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
        type: "select",
        dicData: getDIC("bas_matUnit"),
      },

      {
        label: "客户编号",
        prop: "custId",
        cell: true,
        width: 120,
        click: (val) => {
          _this.iptChange(_this.chooseData);
        },
        hide: true
      },
      {
        label: "Whse_AccessoriesIn_FK",
        prop: "whseAccessoriesinFk",
        hide: true,
        width: 100,

      },
    ],
  }

}

