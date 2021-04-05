import {
  getDIC,
  getDicT,
  getXDicT,
  postDicT
} from '@/config'
let unit = getDIC("bas_matUnit")
export function rhl1F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [{
      label: _this.$t("whseField.rcbh"),
      prop: "yinId",
      span: 6,
      placeholder: " ",
    },
    {
      label: _this.$t("whseField.rcrq"),
      prop: "yinDate",
      span: 6,
      placeholder: " ",
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
    },

    {
      label: _this.$t("whseField.chdh"),
      prop: "purNo",
      span: 6,
      placeholder: " ",

    },
    {
      label: _this.$t("whseField.shdh"),
      prop: "deliNo",
      span: 6,
      placeholder: " ",
    },
    {
      label: _this.$t("whseField.jyzt"),
      prop: "yinStatus",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: getDIC('whse_yinstatus')
    },

    {
      label: _this.$t("whseField.cwzt"),
      prop: "finStatus",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: getDIC('whse_finStatus')
    },
    ],
  }
}
export function rhl2F(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [{
      label: _this.$t("whseField.rcbh"),
      prop: "yinId",
      span: 6,
      placeholder: " ",
      disabled: true,
    },
    {
      label: _this.$t("whseField.rcrq"),
      prop: "yinDate",
      span: 6,
      placeholder: " ",
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: _this.$t("whseField.chdh"),
      prop: "purNo",
      span: 6,
      placeholder: " ",
      disabled: true,
    },
    {
      label: _this.$t("whseField.shdh"),
      prop: "deliNo",
      span: 6,
      placeholder: " ",
      disabled: true,
    },
    {
      label: _this.$t("whseField.jyzt"),
      prop: "yinStatus",
      span: 6,
      placeholder: " ",
      type: "select",
      disabled: true,
      display: true,
      dicData: getDIC('whse_yinstatus')
    },
    {
      label: _this.$t("whseField.cwzt"),
      prop: "finStatus",
      span: 6,
      placeholder: " ",
      disabled: true,
      type: "select",
      dicData: getDIC('whse_finStatus'),
    },
    {
      label: _this.$t('whseField.czy'),
      prop: "sysCreatedby",
      display: true,
      disabled: true,
      span: 6,
      placeholder: " ",
      type: "select",
      hide: _this.hide === '6' ? false : true,
      dicData: postDicT('ucmlUserList', 'employeename', 'ucmlUseroid')
    },
    ],
  }


}
export function rhl1C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 278px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    column: [{
      label: "化工原料入仓OID",
      prop: "whseChemicalinoid",
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
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      align: "center",
    },
    {
      label: _this.$t("whseField.rcbh"),
      prop: "yinId",
      cell: false,
      width: 200,

    },
    {
      label: _this.$t("whseField.rclx"),
      prop: "yinType",
      cell: false,
      width: 100,
      type: "select",
      dicData: _this.data === _this.$t("iaoMng.hgyl") || _this.data === _this.$t("iaoMng.yl") ? getDIC('Whse_CalicoType') : _this.data === _this.$t("iaoMng.sx") ? getDIC('Whse_yinType') : getDIC('Whse_AccessoriesType'),

    },
    {
      label: _this.$t("whseField.rcrq"),
      prop: "yinDate",
      cell: false,
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: 120,
      align: "center",
    },
    {
      label: _this.$t("whseField.chdh"),
      prop: "purNo",
      cell: false,
      width: 180,

    },
    {
      label: _this.$t('whseField.gysbh'),
      prop: "suppId",
      cell: false,
      width: 110,
      type: "select",
      dicData: getDicT("purSinglepo", "suppId", "poNo"),
    },
    {
      label: _this.$t('whseField.gysmc'),
      prop: "$suppId",
      cell: false,
      width: 280,
      type: "select",
      dicData: getDicT("basSupplier", "suppName", "suppId",),

    },
    {
      label: _this.$t("whseField.shdh"),
      prop: "deliNo",
      cell: false,
      width: 180,


    },



    {
      label: _this.$t("whseField.jyzt"),
      prop: "yinStatus",
      cell: false,
      width: 120,
      type: "select",
      dicData: getDIC('whse_yinstatus'),

    },
    {
      label: _this.$t("whseField.cwzt"),
      prop: "finStatus",
      cell: false,
      width: 135,
      type: "select",
      dicData: getDIC('whse_finStatus'),

    },
    {
      label: _this.$t('whseField.czy'),
      prop: "sysCreatedby",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: postDicT('ucmlUserList', 'employeename', 'ucmlUseroid'),
      width: 120
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
      type: "date",
      width: 180,
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      align: "center",
    },
    ],
  }

}
// let Chemicalmat = getXDicT("basChemicalmat/v1.0/list");
export function rhl2C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 315px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlaoid",
    showSummary: true,
    sumColumnList: [{
      label: " ",
      name: 'weight',
      type: 'sum'
    },
    {
      label: " ",
      name: 'poQty',
      type: 'sum'
    },
    ],
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: _this.datas === _this.$t("iaoMng.hgyl") ? _this.$t("whseField.ylbh") : _this.$t('whseField.ylbh1'),
      prop: "chemicalId",
      cell: false,
      width: 180,
      hide: _this.datas === _this.$t("iaoMng.hgyl") || _this.datas === _this.$t("iaoMng.yl") ? false : true
    },
    {
      label: _this.datas === _this.$t("iaoMng.hgyl") ? _this.$t('whseField.ylmc') : _this.$t('whseField.ylmc1'),
      prop: "chemicalName",
      cell: false,
      width: 180,
      hide: _this.datas === _this.$t("iaoMng.hgyl") || _this.datas === _this.$t("iaoMng.yl") ? false : true
    },
    {
      label: _this.$t('whseField.clbh'),
      prop: "materialNum",
      cell: false,
      width: 180,
      hide: _this.datas === _this.$t("iaoMng.hgyl") && _this.datas != _this.$t("iaoMng.yl") && _this.datas != _this.$t("iaoMng.sx") ? false : true
    },
    {
      label: _this.$t('whseField.clmc'),
      prop: "chinName",
      cell: false,
      width: 180,
      hide: _this.datas != _this.$t("iaoMng.hgyl") && _this.datas != _this.$t("iaoMng.yl") && _this.datas != _this.$t("iaoMng.sx") ? false : true,
      type: "select",
      props: {
        label: "chinName",
        value: "hardwareId"
      }
      // dicData: getDicT("basHardwarearticles", "chinName", "hardwareId")
    },
    {
      label: _this.$t("whseField.sxbh"),
      prop: "yarnsId",
      cell: false,
      width: 180,
      hide: _this.datas != _this.$t("iaoMng.sx")
    },
    {
      label: "紗線名称",
      prop: "yarnsName",
      cell: false,
      width: 450,
      hide: _this.datas != _this.$t("iaoMng.sx"),
      type: "select",
      dicData: getDicT("basYarnsData", "yarnsName", "yarnsId")
    },
    {
      label: _this.$t('whseField.clzl'),
      prop: "materialType",
      cell: false,
      width: 180,
      hide: true
    },
    // {
    //   label: "化工原料英文名稱 ",
    //   prop: "bcMatengname",
    //   cell: false,
    //   width: 180,
    //   click: (val) => {
    //     _this.iptChange(_this.chooseData);
    //   },
    //   props: {
    //     label: "bcMatengname",
    //     value: "bcCode"
    //   },
    //   type: "select",
    //   dicData: Chemicalmat
    // },
    // {
    //   label: "色光",
    //   prop: "bcColor",
    //   cell: false,
    //   width: 100,
    //   click: (val) => {
    //     _this.iptChange(_this.chooseData);
    //   },
    //   props: {
    //     label: "bcColor",
    //     value: "bcCode"
    //   },
    //   type: "select",
    //   dicData: Chemicalmat
    // },
    // {
    //   label: "力份 ",
    //   prop: "bcForce",
    //   width: 100,
    //   props: {
    //     label: "bcForce",
    //     value: "bcCode"
    //   },
    //   type: "select",
    //   dicData: Chemicalmat
    // },
    // {
    //   label: _this.$t("whseField.scdh"),
    //   prop: "prodNo",
    //   cell: true,
    //   width: 150,
    //   click: (val) => {
    //     _this.iptChange(_this.chooseData);
    //   },
    // },
    // {
    //   label: _this.$t("whseField.mkh"),
    //   prop: "fabticket",
    //   cell: true,
    //   width: 150,
    //   click: (val) => {
    //     _this.iptChange(_this.chooseData);
    //   },
    // },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: false,
      width: 220,
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: false,
      width: 100,
      align: "right",
      hide: _this.datas === _this.$t("iaoMng.hgyl") || _this.datas === _this.$t("iaoMng.yl") || _this.datas === _this.$t("iaoMng.sx") ? false : true
    },
    {
      label: _this.$t('whseField.dw'),
      prop: "weightUnit",
      cell: false,
      width: 100,
      type: "select",
      dicData: unit,
      hide: _this.datas === _this.$t("iaoMng.hgyl") || _this.datas === _this.$t("iaoMng.yl") || _this.datas === _this.$t("iaoMng.sx") ? false : true
    },
    {
      label: _this.$t('energy.sl'),
      prop: "poQty",
      cell: false,
      width: 100,
      align: "right",
      hide: _this.datas != _this.$t("iaoMng.hgyl") && _this.datas != _this.$t("iaoMng.yl") && _this.datas != _this.$t("iaoMng.sx") ? false : true,

    },
    {
      label: _this.$t('whseField.dw'),
      prop: "unitQty",
      cell: false,
      width: 100,
      type: "select",
      dicData: unit,
      hide: _this.datas != _this.$t("iaoMng.hgyl") && _this.datas != _this.$t("iaoMng.yl") && _this.datas != _this.$t("iaoMng.sx") ? false : true,
    },
    ]
  }

}
export function rhl3C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(50vh - 198px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    roykey: "whseChemicalinDtlboid",
    showSummary: true,
    sumColumnList: [{
      label: " ",
      name: 'weight',
      type: 'sum'
    },],
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
      width: 220,
    },
    {
      label: _this.$t("whseField.cd"),
      prop: "origin",
      cell: true,
      width: 120,
      type: 'select',
      dicData: getDIC('Whse_Origin'),
    },
    {
      label: _this.$t("whseField.zl"),
      prop: "weight",
      cell: true,
      width: 120,
      align: "right",
    },
    {
      label: _this.$t('whseField.dw'),
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: unit,

    },
    ]
  }

}

export function rhl4C(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: _this.datas === _this.$t("iaoMng.yl") || _this.datas === _this.$t("iaoMng.hgyl") ? "calc(50vh - 198px)" : "calc(100vh - 278px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    showSummary: true,
    sumColumnList: [{
      label: " ",
      name: 'applyNum',
      type: 'sum'
    },],
    column: [{
      label: "#",
      prop: "index",
      width: 50,
      align: "center"
    },
    {
      label: _this.$t("whseField.sgdh"),
      prop: "appId",
      cell: true,
      width: 220,
    },
    {
      label: _this.$t("whseField.fpsl"),
      prop: "applyNum",
      cell: true,
      width: 120,
      align: "right",
    },
    ]
  }

}
export function planForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [{
      label: _this.$t("whseField.chdh"),
      prop: "purNo",
      span: 6,
      placeholder: " ",
    },
    // {
    //   label: "供应商",
    //   prop: "suppId",
    //   span: 6,
    //   placeholder: " ",
    // },
    {
      label: _this.$t("whseField.shdh"),
      prop: "deliNo",
      span: 6,
      placeholder: " ",
    },
    {
      label: _this.$t('whseField.clbh'),
      prop: "materialNum",
      span: 6,
      placeholder: " ",
    },
    ],
  }
}
export function planCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 203px)",
    refreshBtn: false,
    columnBtn: false,
    selection: true,
    page: true,
    column: [{
      label: "#",
      prop: "index",
      width: 40,
      align: "center",
    },
    {
      label: _this.$t("whseField.chdh"),
      prop: "purNo",
      cell: false,
      width: 180,
    },
    // {
    //   label: "供應商",
    //   prop: "suppId",
    //   cell: false,
    //   width: 120,
    //   type: "select",
    //   dicData: getDicT("purSinglepo", "suppName", "suppId")
    // },
    {
      label: _this.$t("whseField.shdh"),
      prop: "deliNo",
      cell: false,
      width: 180,
    },
    {
      label: _this.$t('whseField.shrq'),
      prop: "deliDate",
      type: "date",
      width: 120,
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      align: "center",
    },
    {
      label: _this.$t('whseField.clbh'),
      prop: "materialNum",
      cell: false,
      width: 140,
    },
    {
      label: _this.$t('whseField.clmc'),
      prop: "chinName",
      cell: false,
      width: 160,
      overHidden: true
    },
    {
      label: _this.$t("whseField.xh"),
      prop: "model",
      cell: false,
      width: 170,
      hide: _this.data === _this.$t("iaoMng.sx")
    },
    {
      label: _this.$t('whseField.gg'),
      prop: "itemSpec",
      cell: false,
      width: 150,
      hide: _this.data === _this.$t("iaoMng.sx")
    },
    {
      label: _this.data === _this.$t("iaoMng.hgyl") || _this.data === _this.$t("iaoMng.sx") ? _this.$t("whseField.zl") : _this.$t('energy.sl'),
      prop: "deliQty",
      cell: false,
      width: 80,
      align: "right"
    },
    {
      label: _this.$t('whseField.dw'),
      prop: "deliUnit",
      cell: false,
      width: 60,
      type: "select",
      dicData: unit
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batNo",
      cell: false,
      width: 220,
    },
    ],
  }

}
