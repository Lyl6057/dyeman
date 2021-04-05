// 纱线
export const sxForm = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  column: [
    {
      label: "纱支位置",
      prop: "yarnSeat",
      span: 6,
    },
    {
      label: "纱线类别",
      prop: "yarnsType",
      span: 6,
    },
    {
      label: "色号",
      prop: "colorNo",
      span: 6,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      span: 6,
    },
    {
      label: _this.$t("whseField.cd"),
      prop: "placeOrigin",
      span: 6,
      type: 'select',
      dicData: getDIC("Whse_Origin")
    },
    {
      label: "纱支颜色",
      prop: "yarnColor",
      span: 6,
    },
  ]
}

export const sxCrud = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: '共',
      name: 'yarnUse',
      type: 'sum'
    }
  ],
  height: "calc(100vh - 395px)",
  column: [
    {
      label: "Sal_matrequire_dtlaOID",
      prop: "salMatrequireDtlaoid",
      width: 550,
      hide: true
    },
    {
      label: "#",
      prop: "index",
      cell: true,
      width: 50,
      align: "right"
    },
    // {
    //   label: "#",
    //   prop: "seq",
    //   cell: true,
    //   width: 50,
    // },
    {
      label: "纱支系统编号",
      prop: "yarnId",
      cell: true,
      width: 150,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "batchNo",
      cell: true,
      width: 180,
    },
    {
      label: "需求用量",
      prop: "yarnUse",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: "纱支位置",
      prop: "yarnSeat",
      cell: true,
      width: 100,
    },
    {
      label: "纱线类别",
      prop: "yarnsType",
      cell: true,
      width: 100,
    },
    {
      label: "纱线品种",
      prop: "yarnsKind",
      cell: true,
      width: 100,
    },
    {
      label: "等级",
      prop: "yarnsGrade",
      cell: true,
      width: 50,
    },
    {
      label: "亮度",
      prop: "yarnsBright",
      cell: true,
      width: 50,
    },
    {
      label: "纺纱方式",
      prop: "spinningWay",
      cell: true,
      width: 100,
    },
    {
      label: "功能",
      prop: "functions",
      cell: true,
      width: 100,
    },
    {
      label: "用途",
      prop: "yarnsUses",
      cell: true,
      width: 50,
    },
    {
      label: "色号",
      prop: "colorNo",
      cell: true,
      width: 100,
    },

    {
      label: "纱牌",
      prop: "yarnsCard",
      cell: true,
      width: 50,
    },
    {
      label: _this.$t("whseField.cd"),
      prop: "placeOrigin",
      cell: true,
      width: 50,
      type: 'select',
      dicData: getDIC("Whse_Origin")
    },
    {
      label: "纱长(CM/100G)",
      prop: "yarnLong",
      cell: true,
      width: 275,
    },
    {
      label: "路数(根数)",
      prop: "wayNum",
      cell: true,
      width: 150,
    },
    {
      label: "损耗(%)",
      prop: "wastageRate",
      cell: true,
      width: 125,
    },
    {
      label: "纱支颜色",
      prop: "yarnColor",
      cell: true,
      width: 100,
    },
    {
      label: "布料描述",
      prop: "fabYcount",
      cell: true,
      width: 300,
    },
    {
      label: "布料总成份",
      prop: "fabComponents",
      cell: true,
      width: 305,
    },
    {
      label: "布种",
      prop: "fabFabrics",
      cell: true,
      width: 50,
    },
    {
      label: "布料颜色",
      prop: "colorName",
      cell: true,
      width: 100,
    },
    {
      label: "用量单位",
      prop: "useUnit",
      cell: true,
      width: 100,
    },
    {
      label: "纱支描述",
      prop: "yarnDesc",
      cell: true,
      width: 350,
    },

    {
      label: "物料需求FK",
      prop: "salMatrequireFk",
      hide: true,
      width: 150,
    },
    {
      label: "订单布料明细FK",
      prop: "salPoDtlaFk",
      hide: true,
      width: 200,
    }
  ]

}


export const pbForm = {
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      label: "布种",
      prop: "fabFabrics",
      span: 6,
    },
    {
      label: "颜色",
      prop: "colorName",
      span: 6,
    },
    {
      label: "客人色号",
      prop: "custColorNo",
      span: 6,
    },
    {
      label: "染厂色号",
      prop: "dyeColorNo",
      span: 6,
    },
    {
      label: "布料类型",
      prop: "fabType",
      span: 6,
    },
    {
      label: "加工类型",
      prop: "processType",
      span: 6,
    },

  ]

}
export const pbCrud = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: '共',
      name: 'fabQty',
      type: 'sum'
    }
  ],
  height: "calc(100vh - 235px)",
  column: [
    {
      label: "#",
      prop: "index",
      width: 50,
      align: "right"
    },
    {
      label: "Sal_matrequire_dtlcOID",
      prop: "salMatrequireDtlcoid",
      hide: true,
      width: 550,
    },
    {
      label: "布料纱支组合",
      prop: "fabYcount",
      hide: true,
      width: 150,
    },
    {
      label: "布料总成份",
      prop: "fabComponents",
      cell: true,
      width: 300,
    },
    {
      label: "布种",
      prop: "fabFabrics",
      cell: true,
      width: 80,
    },
    {
      label: "颜色",
      prop: "colorName",
      cell: true,
      width: 80,
    },
    {
      label: "颜色来源",
      prop: "colorSource",
      cell: true,
      width: 100,
    },
    {
      label: "客人色号",
      prop: "custColorNo",
      cell: true,
      width: 120,
    },
    {
      label: "染厂色号",
      prop: "dyeColorNo",
      cell: true,
      width: 100,
    },
    {
      label: _this.$t('energy.sl'),
      prop: "fabQty",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: "数量单位",
      prop: "qtyUnit",
      cell: true,
      width: 100,
    },
    {
      label: "单价",
      prop: "unitPrice",
      cell: true,
      width: 70,
      align: "right"
    },
    {
      label: "单价单位",
      prop: "priceUnit",
      cell: true,
      width: 100,
    },
    {
      label: "币种",
      prop: "currencyType",
      cell: true,
      width: 50,
    },
    {
      label: "针数",
      prop: "pinNumber",
      cell: true,
      width: 50,
      align: "right"
    },
    {
      label: "吋数",
      prop: "inchNumber",
      cell: true,
      width: 50,
      align: "right"
    },
    {
      label: "幅宽/布封",
      prop: "fabBreadth",
      cell: true,
      width: 125,
      align: "right"
    },
    {
      label: "布封单位",
      prop: "breadthUnit",
      cell: true,
      width: 100,
    },
    {
      label: "克重",
      prop: "gramWeight",
      cell: true,
      width: 50,
      align: "right"
    },
    {
      label: "横缩",
      prop: "lateralShrink",
      cell: true,
      width: 50,
      align: "right"
    },
    {
      label: "直缩",
      prop: "verticalShrink",
      cell: true,
      width: 50,
      align: "right"
    },
    {
      label: "扭度",
      prop: "twistDegrees",
      cell: true,
      align: "right",
      width: 50,
    },
    {
      label: "斜度",
      prop: "slopeDegrees",
      cell: true,
      width: 50,
      align: "right"
    },
    {
      label: "布料类型",
      prop: "fabType",
      cell: true,
      width: 100,
    },
    {
      label: "加工类型",
      prop: "processType",
      cell: true,
      width: 100,
    },
    {
      label: "胚布代号",
      prop: "calicoId",
      cell: true,
      width: 150,
    },
    {
      label: "胚布批号",
      prop: "calicoBatch",
      cell: true,
      width: 100,
    },
    {
      label: "物料需求_FK",
      prop: "salMatrequireFk",
      hide: true,
      width: 175,
    },
    {
      label: "订单布料明细_FK",
      prop: "salPoDtlaFk",
      hide: true,
      width: 225,
    }
  ]
}

// 生产辅料
export const scflForm = {
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      label: "辅料名称",
      prop: "matName",
      span: 6,
    },
    {
      label: "英文名称",
      prop: "matEngname",
      span: 6,
    },
    {
      label: _this.$t('whseField.gg'),
      prop: "matItemspec",
      span: 6,
    },
    {
      label: _this.$t("whseField.xh"),
      prop: "matModel",
      span: 6,
    },
  ]
}
export const scflCrud = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: '共',
      name: 'matUse',
      type: 'sum'
    }
  ],
  height: "calc(100vh - 235px)",
  column: [
    {
      label: "Sal_matrequire_dtldOID",
      prop: "salMatrequireDtldoid",
      hide: true,
      width: 550,
    },
    {
      label: "#",
      prop: "index",
      width: 50,
      align: "right"
    },
    {
      label: "#",
      prop: "matSeq",
      hide: true,
      width: 50,
    },
    {
      label: _this.$t("whseField.flbh"),
      prop: "matId",
      cell: true,
      width: 200,
    },
    {
      label: "辅料名称",
      prop: "matName",
      cell: true,
      width: 180,
    },
    {
      label: "英文名称",
      prop: "matEngname",
      cell: true,
      width: 150,
    },
    {
      label: _this.$t('whseField.gg'),
      prop: "matItemspec",
      cell: true,
      width: 100,
    },
    {
      label: _this.$t("whseField.xh"),
      prop: "matModel",
      cell: true,
      width: 120,
    },
    {
      label: "需求用量",
      prop: "matUse",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: "用量单位",
      prop: "useUnit",
      cell: true,
      width: 100,
    },
    {
      label: "物料需求_FK",
      prop: "salMatrequireFk",
      hide: true,
      width: 175,
    }
  ]
}

// 染化料
export const rhlForm = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 120,
  column: [
    {
      label: "编码",
      prop: "bcCode",
      span: 6,
    },
    {
      label: "原料名称",
      prop: "bcMatname",
      span: 6,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "bcBatchnumber",
      span: 6,
    },
  ]
}
export const rhlCrud = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  showSummary: true,
  sumColumnList: [
    {
      label: '共',
      name: 'cmatUse',
      type: 'sum'
    }
  ],
  column: [
    {
      label: "Sal_matrequire_dtlbOID",
      prop: "salMatrequireDtlboid",
      hide: true,
      width: 550,
    },
    {
      label: "#",
      prop: "index",
      width: 50,
      align: "right"
    },
    {
      label: "编码",
      prop: "bcCode",
      cell: true,
      width: 150,
    },
    {
      label: _this.$t("whseField.ph"),
      prop: "bcBatchnumber",
      cell: true,
      width: 150,
    },
    {
      label: "原料名称",
      prop: "bcMatname",
      cell: true,
      width: 150,
    },
    {
      label: "需求用量",
      prop: "cmatUse",
      cell: true,
      width: 100,
      align: "right"
    },
    {
      label: "用量单位",
      prop: "useUnit",
      cell: true,
      width: 100,
    },
    {
      label: _this.$t("whseField.sg"),//,
      prop: "bcColor",
      cell: true,
      width: 80,
    },
    {
      label: "力份",
      prop: "bcForce",
      cell: true,
      width: 80,
    },

    {
      label: _this.$t("whseField.cd"),
      prop: "bcMakeplace",
      cell: true,
      width: 100,
      type: 'select',
      dicData: getDIC("Whse_Origin")
    },
    {
      label: "色牢度",
      prop: "bcColorprison",
      cell: true,
      width: 75,
    },
    {
      label: "环保等级",
      prop: "bcEnvironmentlevel",
      cell: true,
      width: 100,
    },
    {
      label: "毒性",
      prop: "bcToxicity",
      cell: true,
      width: 80,
    },
    {
      label: "危险等级",
      prop: "bcDangerlevel",
      cell: true,
      width: 100,
    },
    {
      label: "应急处理",
      prop: "bcEmergency",
      cell: true,
      width: 150,
    },
    {
      label: "消防",
      prop: "bcFirecontrol",
      cell: true,
      width: 80,
    },
    {
      label: "储存要求",
      prop: "bcStorage",
      cell: true,
      width: 100,
    },
    {
      label: _this.$t("energy.bz"),
      prop: "bcDesc",
      cell: true,
      width: 150,
    },
    {
      label: "一级分类",
      prop: "bcClass",
      cell: true,
      width: 100,
    },
    {
      label: "原料英文名称",
      prop: "bcMatengname",
      cell: true,
      width: 150,
    },

    {
      label: "化工二级分类",
      prop: "basChemicalsecondFk",
      hide: true,
      width: 150,
    },
    {
      label: "化工三级分类",
      prop: "basChemicalthreeFk",
      hide: true,
      width: 150,
    },
    {
      label: "化工四级分类",
      prop: "basChemicalfourFk",
      hide: true,
      width: 150,
    },
    {
      label: "物料需求_FK",
      prop: "salMatrequireFk",
      hide: true,
      width: 175,
    }
  ]


}



