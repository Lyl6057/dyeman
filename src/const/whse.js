import { getDIC, getDicT, postDicT, getXDicT, getDbDicT } from "@/config/index";
import axios from "axios";
import i18n from "../lang/index";
import store from "@/store/index"; // 多語言 store.state
import { num2ThousandthFormat } from "@/utils/tools"

const lang = store.state.lang;
let cust1 = getDicT("basCustomer", "custName", "custCode");
let cust2 = getDicT("basCustomer", "custCode", "custCode");
let supp = getDicT("basSupplier", "suppName", "suppId");
let purAttr = getDIC("sal_purAttr");
let calicoType = getDIC("bas_calicoType");
let chemicalClass = getDIC("bas_chemicalClass");
let yarnsFlag = getDIC("pur_yarnsFlag");
let yarnsPaytype = getDIC("pur_yarnsPaytype");
let yarnsCollected = getDIC("pur_yarnsCollected");
let basHardware = getDicT("basHardware", "topcategoryName", "basHardwareoid");
let basAdsupplies = getDicT(
  "basAdsupplies",
  "topcategoryName",
  "basAdsuppliesoid"
);
let matUnit = getDIC("bas_matUnit");
let basChemical = getXDicT("BasChemicalmatNew");
let basPigment = getXDicT("basPigment");
let basProductivesupplies = getXDicT("basProductivesuppliesnew");

// 纱线入库
export function getYarnin(params) {
  return axios({
    url: "/api/whseYarninDtl/v1.0/listByPage",
    method: "get",
    params: params
  });
}
let yarnin = getXDicT("whseYarnin/v1.0/list");
export const YarninF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.rcbh"),
      prop: "whseYarninFk",
      span: 6,
      type: "tree",
      dicData: yarnin,
      props: {
        label: "yinId",
        value: "whseYarninoid"
      }
    },
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      span: 6
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      span: 6,
      placeholder: " "
    }
  ]
};

export const YarninC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.rcbh"),
      prop: "whseYarninFk",
      cell: false,
      width: 150,
      type: "select",
      dicData: yarnin,
      props: {
        label: "yinId",
        value: "whseYarninoid"
      },
      placeholder: "請選擇入仓编号"
    },
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      cell: false,
      width: 120
    },
    {
      label: i18n.t("whseField.sxmc"),
      prop: "yarnsName",
      cell: false,
      // width: 350,
      type: "select",
      dicData: getDicT("basYarnsData", "yarnsName", "yarnsId"),
      overHidden: true
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      cell: false,
      width: 150
    },
    // {
    //   label: i18n.t("whseField.sp"),
    //   prop: "yarnsCard",
    //   cell: false,
    //   width: 180,
    // },
    {
      label: i18n.t("whseField.cd"),
      prop: "placeOrigin",
      cell: false,
      width: 100,
      type: "select",
      dicData: getDIC("Whse_Origin")
    },
    {
      label: i18n.t("whseField.xs"),
      prop: "cartonNum",
      cell: false,
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.rczl"),
      prop: "weight",
      cell: false,
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "weightUnit",
      cell: false,
      width: 100,
      type: "select",
      dicData: getDIC("bas_matUnit")
    }
  ]
};
// 加工指令單明細
export function getInstructDtl(params) {
  return axios({
    url: "/api/viWhseProcessinstructdtl/page",
    method: "get",
    params: params
  });
}
export const instructDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.zldbh"),
      prop: "instructId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      span: 6,
      placeholder: " "
    },

    {
      label: i18n.t("whseField.clbh"),
      prop: "materialId",
      span: 6,
      placeholder: " "
    }
  ]
};

export const instructDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.zldbh"),
      prop: "instructId",
      width: 120
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      width: 140
    },
    {
      label: i18n.t("whseField.clbh"),
      prop: "materialId",
      width: 140
    },
    {
      label: i18n.t("whseField.clmc"),
      prop: "materialName",
      width: 350
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "weightUnit",
      width: 100,
      type: "select",
      dicData: matUnit
    }
  ]
};

// 操作员
export function getUcmlUser(params) {
  return axios({
    url: "/api/ucmlUser",
    method: "get",
    params: params
  });
}

// 入仓分配
export function getSubscribe(params) {
  return axios({
    url: "/api/whseSubscribe/page",
    method: "get",
    params: params
  });
}

// 来纱登记
export function getIncoming(params) {
  return axios({
    url: "/api/salIncomingyarn/page",
    method: "get",
    params: params
  });
}
export const IncomingYarnF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.djbh2"),
      prop: "registerNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custCode",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.lsrq"),
      prop: "yarnDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};
export const IncomingYarnC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.djbh2"),
      prop: "registerNo"
    },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custCode",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.lsrq"),
      prop: "yarnDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};

// 来纱登记明細
export function getIncomingDtl(params) {
  return axios({
    url: "/api/salIncomingyarnDtl/page",
    method: "get",
    params: params
  });
}
export const IncomingYarnDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      span: 6,
      placeholder: " "
    }
  ]
};
export const IncomingYarnDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      width: 120
    },
    {
      label: i18n.t("whseField.sxmc"),
      prop: "yarnsName",
      width: 350
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      width: 140
    },
    {
      label: i18n.t("whseField.sp"),
      prop: "yarnsCard",
      width: 140
    },
    {
      label: i18n.t("whseField.cd"),
      prop: "placeOrigin",
      width: 120,
      type: "select",
      dicData: getDIC("Whse_Origin")
    },
    {
      label: i18n.t("whseField.xs"),
      prop: "carQty",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "weightUnit",
      width: 100,
      align: "right",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 来胚登记
export function getEmbryogenesis(params) {
  return axios({
    url: "/api/salEmbryogenesis/page",
    method: "get",
    params: params
  });
}
export const EmbryogenesisF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.djbh2"),
      prop: "registerNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custCode",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.llrq"),
      prop: "embryoDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};
export const EmbryogenesisC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.djbh2"),
      prop: "registerNo"
    },
    // {
    //   label: "客户编号",
    //   prop: "custCode",
    //   type: "select",
    //   dicData: cust2,
    // },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custCode",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.llrq"),
      prop: "embryoDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};

// 来胚登记明細
export function getEmbryogenesisDtl(params) {
  return axios({
    url: "/api/salEmbryogenesisDtl/page",
    method: "get",
    params: params
  });
}
export const EmbryogenesisDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.pbbh"),
      prop: "calicoId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.lb"),
      prop: "calicoType",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: calicoType
    }
  ]
};
export const EmbryogenesisDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "calicoId",
      width: 120
    },
    {
      label: i18n.t("whseField.pbmc"),
      prop: "clothName"
      // width: 350
    },
    {
      label: i18n.t("whseField.lb"),
      prop: "calicoType",
      width: 120,
      type: "select",
      dicData: calicoType
    },
    {
      label: i18n.t("whseField.ps"),
      prop: "countingNum",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.kz"),
      prop: "weight",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weights",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "weightUnit",
      width: 100,
      align: "right",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 来原料登记
export function getChemical(params) {
  return axios({
    url: "/api/pages",
    method: "get",
    params: params
  });
}
export const chemicalF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.djbh2"),
      prop: "registerNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custNo",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.llrq"),
      prop: "inDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};
export const chemicalC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.djbh2"),
      prop: "registerNo"
    },
    // {
    //   label: "客户编号",
    //   prop: "custCode",
    //   type: "select",
    //   dicData: cust2,
    // },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custNo",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.llrq"),
      prop: "inDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};

// 来原料登记明細
export function getChemicalDtl(params) {
  return axios({
    url: "/api/chemicalIncomaccDtl/page",
    method: "get",
    params: params
  });
}
export const chemicalDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.ylbh"),
      prop: "basChemicalmatFk",
      span: 6,
      placeholder: " ",
      type: "tree",
      props: {
        label: "bcCode",
        value: "basChemicalmatnewoid"
      },
      dicData: basChemical
    }
  ]
};
export const chemicalDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.ylbh"),
      prop: "basChemicalmatFk",
      width: 150,
      type: "select",
      props: {
        label: "bcCode",
        value: "basChemicalmatnewoid"
      },
      dicData: basChemical
    },
    {
      label: i18n.t("whseField.ylmc"),
      prop: "bcMatname",
      type: "select",
      props: {
        label:
          lang === "1"
            ? "cnnamelong"
            : lang === "2"
            ? "ennamelong"
            : "vinamelong",
        value: "basChemicalmatnewoid"
      },
      dicData: basChemical,
      width: 350
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "incomQty",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "chemicalQty",
      width: 100,
      align: "right",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 来顏料登记
export function getPigment(params) {
  return axios({
    url: "/api/pigmentIncomacc/page",
    method: "get",
    params: params
  });
}
export const pigmentF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.djbh2"),
      prop: "registerNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custNo",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.llrq"),
      prop: "inDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};
export const pigmentC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.djbh2"),
      prop: "registerNo"
    },
    // {
    //   label: "客户编号",
    //   prop: "custCode",
    //   type: "select",
    //   dicData: cust2,
    // },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custNo",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.llrq"),
      prop: "inDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};

// 来顏料登记明細
export function getPigmentDtl(params) {
  return axios({
    url: "/api/pigmentIncomaccDtl/page",
    method: "get",
    params: params
  });
}
export const pigmentDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.ylbh1"),
      prop: "chemicalIncomaccFk",
      span: 6,
      placeholder: " ",
      type: "tree",
      props: {
        label: "bcCode",
        value: "basPigmentnewoid"
      },
      dicData: basPigment
    }
  ]
};
export const pigmentDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.ylbh1"),
      prop: "basPigmentnewFk",
      width: 150,
      type: "select",
      props: {
        label: "bcCode",
        value: "basPigmentnewoid"
      },
      dicData: basPigment
    },
    {
      label: i18n.t("whseField.ylmc1"),
      prop: "cnnamelong",
      type: "select",
      props: {
        label:
          lang === "1"
            ? "cnnamelong"
            : lang === "2"
            ? "ennamelong"
            : "vinamelong",
        value: "basPigmentnewoid"
      },
      dicData: basPigment,
      width: 350
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "incomQty",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "chemicalQty",
      width: 100,
      align: "right",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 來輔料登记
export function getSalIncomacc(params) {
  return axios({
    url: "/api/salIncomacc/page",
    method: "get",
    params: params
  });
}
export const SalIncomaccF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.djbh2"),
      prop: "registerNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custNo",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.llrq"),
      prop: "embryoDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};
export const SalIncomaccC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.djbh2"),
      prop: "registerNo"
    },
    // {
    //   label: "客户编号",
    //   prop: "custNo",
    //   type: "select",
    //   dicData: cust2,
    // },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custNo",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.llrq"),
      prop: "inDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};

// 來輔料登记明细
export function getSalIncomaccDtl(params) {
  return axios({
    url: "/api/salIncomaccDtl/page",
    method: "get",
    params: params
  });
}
export const SalIncomaccDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.flbh"),
      prop: "basProductivesuppliesFk",
      span: 6,
      placeholder: " ",
      type: "tree",
      props: {
        label: "hardwareId",
        value: "basProductivesuppliesoid"
      },
      dicData: basProductivesupplies
    }
  ]
};
export const SalIncomaccDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.flbh"),
      prop: "basProductivesuppliesFk",
      width: 150,
      type: "select",
      props: {
        label: "hardwareId",
        value: "basProductivesuppliesnewoid"
      },
      dicData: basProductivesupplies
    },
    {
      label: i18n.t("whseField.flmc"),
      prop: "chinName",
      type: "select",
      props: {
        label:
          lang === "1"
            ? "cnnamelong"
            : lang === "2"
            ? "ennamelong"
            : "vinamelong",
        value: "basProductivesuppliesnewoid"
      },
      dicData: basProductivesupplies,
      width: 350
    },
    {
      label: i18n.t("energy.sl"),
      prop: "incomQty",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "qtyUnit",
      width: 100,
      align: "right",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 纱线系统编号
export function getBasYarnsData(params) {
  return axios({
    url: "/api/basYarnsData/page",
    method: "get",
    params: params
  });
}

export const BasYarnsDataF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: "系统编号",
      prop: "yarnsId",
      span: 6,
      placeholder: " ",
    },
    {
      label: "紗線名称",
      prop: "yarnsName",
      span: 6,
      placeholder: " ",
    },
    
    
  ]
};

export const BasYarnsDataC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      width: 130
    },
    {
      label: i18n.t("whseField.sxmc"),
      prop: "yarnsName",
      width: 500,
      overHidden: true
    },
    // {
    //   label: i18n.t("whseField.ph"),
    //   prop: "batchNo",
    //   width: 150
    // },
    {
      label: i18n.t("whseField.sp"),
      prop: "yarnsCard",
      width: 150
    },
    {
      label: i18n.t("whseField.sh"),
      prop: "colorNo",
      width: 140
    },
    {
      label: i18n.t("whseField.gn"),
      prop: "functions",
      type: "select",
      width: 200,
      multiple: true,
      dicData: getDIC("bas_yarnsFuntion")
    },
    {
      label: i18n.t("whseField.cd"),
      prop: "placeOrigin",
      type: "select",
      dicData: getDIC("Whse_Origin")
    },
    {
      label: i18n.t("whseField.fsfs"),
      prop: "spinningWay",
      width: 100,
      type: "select",
      dicData: getDIC("bas_spinningWay")
    },
    {
      label: i18n.t("whseField.pz"),
      prop: "yarnsKind",
      type: "select",
      dicData: getDIC("bas_yarnsKind")
    }
  ]
};

// 胚布編碼
export function getBasCalico(params) {
  return axios({
    url: "/api/basCalico/page",
    method: "get",
    params: params
  });
}

export const BasCalicoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    // {
    //   label: i18n.t("whseField.bh"),
    //   prop: "clothNo",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: getDicT("basEmbryoidcloth", 'basEmbryoidclothFk', 'clothNo')

    // },
    // {
    //   label: "名称",
    //   prop: "clothName",
    //   span: 8,
    //   placeholder: " ",

    // },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "calicoId",
      span: 8,
      placeholder: " "
      // type: "select",
      // dicData: getDIC("bas_yarnsKind"),
    },
    {
      label: i18n.t("whseField.lb"),
      prop: "calicoType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: calicoType
    }

    // {
    //   label: "胚布布类",
    //   prop: "basEmbryoidclothFk",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   // dicData: getDIC("bas_yarnsType"),
    // },
  ]
};

export const BasCalicoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 290px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "calicoId",
      width: 100
    },
    // {
    //   label: i18n.t("whseField.pbmc"),
    //   prop: "calicoSname",
    //   width: 380,
    //   // type: "select",
    //   // dicData: getDicT("basEmbryoidcloth", 'clothName', 'basEmbryoidclothoid')
    // },
    {
      label: i18n.t("whseField.pbmc"),
      prop: "calicoName",
      width: 700
      // type: "select",
      // dicData: getDicT("basEmbryoidcloth", 'clothName', 'basEmbryoidclothoid')
    },
    {
      label: i18n.t("whseField.krmlms"),
      prop: "gustCalicoName",
      width: 350
    },
    {
      label: i18n.t("whseField.krcfyq"),
      prop: "gustComponents",
      width: 200
    },
    {
      label: i18n.t("whseField.lb"),
      prop: "calicoType",
      type: "select",
      dicData: calicoType,
      width: 80
    },
    {
      label: i18n.t("whseField.jz"),
      prop: "machinetypeId",
      type: "select",
      dicData: getDIC("bas_calicoMachineType"),
      width: 120
    },
    {
      label: i18n.t("whseField.jg"),
      prop: "structureId",
      type: "select",
      dicData: getDIC("bas_calicoStructure"),
      width: 100
    },
    {
      label: i18n.t("whseField.blx"),
      prop: "fabricsDesc",
      type: "select",
      dicData: getDIC("bas_clothorg"),
      width: 100
    },
    {
      label: i18n.t("whseField.sc"),
      prop: "yarnLong",
      width: 80,
      align: "right"
    },
    {
      label: i18n.t("whseField.tj"),
      prop: "workDrum",
      width: 80,
      align: "right"
    },
    {
      label: i18n.t("whseField.zj"),
      prop: "fibreDesc",
      width: 80,
      align: "right"
      // dicData: getDIC("bas_yarnsFuntion")
    },
    {
      label: i18n.t("whseField.fk"),
      prop: "width",
      width: 80,
      align: "right"
    },
    {
      label: i18n.t("whseField.kz"),
      prop: "weight",
      width: 80,
      align: "right"
    },
    {
      label: i18n.t("whseField.xsff"),
      prop: "washMethod",
      width: 160
    }
  ]
};

// 化工原料
export function getBasChemicalmat(params) {
  return axios({
    url: "/api/basChemicalmat/v1.0/listByPage",
    method: "get",
    params: params
  });
}

export const BasChemicalmatF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    // {
    //   label: "配方类别",
    //   prop: "pfType",
    //   span: 6,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: [
    //     {
    //       value: 0,
    //       label: "化工原料"
    //     },
    //     {
    //       value: 1,
    //       label: "颜料"
    //     }
    //   ]
    // },
    {
      label: i18n.t("whseField.yjfl"),
      prop: "bcClass",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: chemicalClass
    },
    {
      label: i18n.t("whseField.bh"),
      prop: "bcCode",
      span: 6,
      placeholder: " "
      // type: "select",
      // dicData: getDIC("bas_yarnsKind"),
    },
    {
      label: i18n.t("whseField.ylmc"),
      prop: "bcMatname",
      span: 6,
      placeholder: " "
    }

    // {
    //   label: "胚布布类",
    //   prop: "basEmbryoidclothFk",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   // dicData: getDIC("bas_yarnsType"),
    // },
  ]
};

export const BasChemicalmatC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.bh"),
      prop: "bcCode"
    },
    {
      label: i18n.t("whseField.ylmc"),
      prop: "bcMatname"
    },
    {
      label: i18n.t("whseField.yjfl"),
      prop: "bcClass",
      type: "select",
      dicData: chemicalClass
    },
    {
      label: i18n.t("whseField.ywmc"),
      prop: "bcMatengname"
    },

    {
      label: i18n.t("whseField.sg"),
      prop: "bcColor"
    },
    {
      label: i18n.t("whseField.lf"),
      prop: "bcForce"
    }
    // {
    //   label: "成份描述",
    //   prop: "fibreDesc",
    //   width: 200,
    //   // dicData: getDIC("bas_yarnsFuntion")
    // },
  ]
};

// 生產輔料
export function getProductivesupplies(params) {
  return axios({
    url: "/api/basProductivesupplies/page",
    method: "get",
    params: params
  });
}

export const ProductivesuppliesF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.bh"),
      prop: "hardwareId",
      span: 8,
      placeholder: " "
      // type: "select",
      // dicData: getDIC("bas_yarnsKind"),
    },
    {
      label: i18n.t("whseField.scdl"),
      prop: "basProductionaccFk",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: getDicT(
        "basProductionacc",
        "topcategoryName",
        "basProductionaccoid"
      )
    },
    {
      label: i18n.t("whseField.zwmc"),
      prop: "chinName",
      span: 8,
      placeholder: " "
    },

    {
      label: i18n.t("whseField.xh"),
      prop: "model",
      span: 8,
      placeholder: " "
      // dicData: getDIC("bas_yarnsType"),
    }
  ]
};

export const ProductivesuppliesC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.bh"),
      prop: "hardwareId",
      width: 180
    },
    {
      label: i18n.t("whseField.scdl"),
      prop: "basProductionaccFk",
      type: "select",
      dicData: getDicT(
        "basProductionacc",
        "topcategoryName",
        "basProductionaccoid"
      )
    },
    {
      label: i18n.t("whseField.zwmc"),
      prop: "chinName",
      width: 120
    },
    {
      label: i18n.t("whseField.ywmc"),
      prop: "engName",
      width: 120
    },

    {
      label: i18n.t("whseField.gg"),
      prop: "itemspec"
    },

    {
      label: i18n.t("whseField.xh"),
      prop: "model"
    },
    {
      label: i18n.t("whseField.jldw"),
      prop: "msUnit",
      type: "select",
      dicData: matUnit
    },
    {
      label: i18n.t("whseField.kcdw"),
      prop: "skUnit",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 五金
export function getBasHardwarearticles(params) {
  return axios({
    url: "/api/basHardwarearticles/page",
    method: "get",
    params: params
  });
}

export const BasHardwarearticlesF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.bh"),
      prop: "hardwareId",
      span: 8,
      placeholder: " "
      // type: "select",
      // dicData: getDIC("bas_yarnsKind"),
    },
    {
      label: i18n.t("whseField.wjdl"),
      prop: "basHardwareFk",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: basHardware
    },
    {
      label: i18n.t("whseField.zwmc"),
      prop: "chinName",
      span: 8,
      placeholder: " "
    },

    {
      label: i18n.t("whseField.xh"),
      prop: "model",
      span: 8,
      placeholder: " "
      // dicData: getDIC("bas_yarnsType"),
    }
  ]
};

export const BasHardwarearticlesC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.bh"),
      prop: "hardwareId",
      width: 180
    },
    {
      label: i18n.t("whseField.wjdl"),
      prop: "basHardwareFk",
      type: "select",
      dicData: basHardware
    },
    {
      label: i18n.t("whseField.zwmc"),
      prop: "chinName",
      width: 120
    },
    {
      label: i18n.t("whseField.ywmc"),
      prop: "engName",
      width: 120
    },

    {
      label: i18n.t("whseField.gg"),
      prop: "itemspec"
    },

    {
      label: i18n.t("whseField.xh"),
      prop: "model"
    },
    {
      label: i18n.t("whseField.jldw"),
      prop: "msUnit",
      type: "select",
      dicData: matUnit
    },
    {
      label: i18n.t("whseField.kcdw"),
      prop: "skUnit",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 行政
export function getBasAdsuppliesarticles(params) {
  return axios({
    url: "/api/basAdsuppliesarticles/page",
    method: "get",
    params: params
  });
}

export const BasAdsuppliesarticlesF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.bh"),
      prop: "hardwareId",
      span: 8,
      placeholder: " "
      // type: "select",
      // dicData: getDIC("bas_yarnsKind"),
    },
    {
      label: i18n.t("whseField.xzdl"),
      prop: "basAdsuppliesFk",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: basAdsupplies
    },
    {
      label: i18n.t("whseField.zwmc"),
      prop: "chinName",
      span: 8,
      placeholder: " "
    },

    {
      label: i18n.t("whseField.xh"),
      prop: "model",
      span: 8,
      placeholder: " "
      // dicData: getDIC("bas_yarnsType"),
    }
  ]
};

export const BasAdsuppliesarticlesC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.bh"),
      prop: "hardwareId",
      width: 180
    },
    {
      label: i18n.t("whseField.xzdl"),
      prop: "basAdsuppliesFk",
      type: "select",
      dicData: basAdsupplies
    },
    {
      label: i18n.t("whseField.zwmc"),
      prop: "chinName",
      width: 120
    },
    {
      label: i18n.t("whseField.ywmc"),
      prop: "engName",
      width: 120
    },

    {
      label: i18n.t("whseField.gg"),
      prop: "itemspec"
    },

    {
      label: i18n.t("whseField.xh"),
      prop: "model",
      width: 180
    },
    {
      label: i18n.t("whseField.jldw"),
      prop: "msUnit",
      type: "select",
      dicData: matUnit
    },
    {
      label: i18n.t("whseField.kcdw"),
      prop: "skUnit",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 胚布貨物包
export function getWhseCalicoPackBarCode(params) {
  return axios({
    url: "/api/whseCalicopackBarcode/page",
    method: "get",
    params: params
  });
}
export function addWhseCalicoPackBarCode(params) {
  return axios({
    url: "/api/whseCalicopackBarcode",
    method: "post",
    params: params
  });
}
export function updateWhseCalicoPackBarCode(params) {
  return axios({
    url: "/api/whseCalicopackBarcode",
    method: "put",
    params: params
  });
}
export function delWhseCalicoPackBarCode(id) {
  return axios({
    url: "/api/whseCalicopackBarcode?whseCalicopackBarcodeoid=" + id,
    method: "delete"
  });
}

export const WhseCalicoPackBarCodeF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.hwbm"),
      prop: "barcode",
      placeholder: " ",
      span: 6
    },
    {
      label: i18n.t("whseField.scdh"),
      prop: "prodNo",
      span: 6,
      display: true,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.gh"),
      prop: "batchNo",
      span: 6,
      display: true,
      placeholder: " "
    }
  ]
};
export const WhseCalicoPackBarCodeC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.hwbm"),
      prop: "barcode",
      width: 200,
      hide: false
    },
    {
      label: i18n.t("whseField.gh"),
      prop: "batchNo",
      span: 8,
      width: 200,
      hide: false
    },
    {
      label: i18n.t("whseField.scdh"),
      prop: "prodNo",
      hide: false,
      width: 200
    },
    {
      label: i18n.t("whseField.ps"),
      prop: "countingNo",
      width: 100,
      align: "right",
      formatter(r,v){
        return num2ThousandthFormat(v, 0)
      }
    },

    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      width: 100,
      align: "right",
      formatter(r,v){
        return num2ThousandthFormat(v, 1)
      }
    },
    {
      label: i18n.t("whseField.zldw"),
      prop: "weightUnit",
      width: 100,
      type: "select",
      align: "center",
      dicData: matUnit
    },
    {
      label: i18n.t("whseField.mkh"),
      prop: "fabticket",
      width: 250
    }
  ]
};

// 成品布貨物包
export function getWhseFinishedclothpackBarcode(params) {
  return axios({
    url: "/api/whseFinishedclothpackBarcode/page",
    method: "get",
    params: params
  });
}
export function addWhseFinishedclothpackBarcode(params) {
  return axios({
    url: "/api/whseFinishedclothpackBarcode",
    method: "post",
    params: params
  });
}
export function updateWhseFinishedclothpackBarcode(params) {
  return axios({
    url: "/api/whseFinishedclothpackBarcode",
    method: "put",
    params: params
  });
}
export function delWhseFinishedclothpackBarcode(id) {
  return axios({
    url:
      "/api/whseFinishedclothpackBarcode?whseFinishedclothpackBarcodeoid=" + id,
    method: "delete"
  });
}

// 胚布訂單
export function getSalPoDtlaList(params) {
  return axios({
    url: "/api/page",
    method: "get",
    params: params
  });
}

export const SalPoDtlaListF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("energy.ddh"),
      prop: "poNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "fabId",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("labour.zl"),
      prop: "fabFabrics",
      span: 8,
      placeholder: " "
    }
  ]
};

export const SalPoDtlaListC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("energy.ddh"),
      prop: "poNo",
      type: "select",
      width: 140,
      dicData: getDicT("salPoList", "poNo", "salPooid")
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "fabId",
      width: 120
    },

    {
      label: i18n.t("labour.pbmc"),
      prop: "fabYcount",
      width: 350
    },
    {
      label: i18n.t("whseField.zcf"),
      prop: "fabComponents",
      width: 280
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "fabFabrics",
      type: "select",
      dicData: getDIC("bas_clothorg")
    },
    {
      label: i18n.t("energy.sl"),
      prop: "fabQty",
      align: "right",
      width: 100
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "qtyUnit",
      width: 90
    }
  ]
};

// 紗線採購單
export function getPurYarnsPo(params) {
  return axios({
    url: "/api/purYarnspo/page",
    method: "get",
    params: params
  });
}
export const PurYarnsPoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: supp
      // dicData: cust2,
    },
    {
      label: i18n.t("whseField.cglx"),
      prop: "purType",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: purAttr
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag
    }
    // {
    //   label: i18n.t("whseField.fkfs"),
    //   prop: "payType",
    //   span: 6,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: yarnsPaytype,
    // },
  ]
};
export const PurYarnsPoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 208px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo",
      width: 180
    },
    {
      label: i18n.t("whseField.cglx"),
      prop: "purType",
      type: "select",
      dicData: purAttr,
      width: 120
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      type: "select",
      dicData: getDicT("basSupplier", "suppName", "suppId"),
      width: 240
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag,
      width: 120
    },
    {
      label: i18n.t("whseField.fkfs"),
      prop: "payType",
      type: "select",
      dicData: getDIC("Bas_PayType"),
      width: 120
    }
    // {
    //   label: i18n.t("whseField.sqbj"),
    //   prop: "collectedFlag",
    //   type: "select",
    //   dicData:yarnsCollected,
    // },
  ]
};

// 紗線採購單明細
export function getPurYarnsPoDtla(params) {
  return axios({
    url: "/api/purYarnspoDtla/page",
    method: "get",
    params: params
  });
}
export const PurYarnsPoDtlaF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: supp
      // dicData: cust2,
    },
    {
      label: i18n.t("whseField.cglx"),
      prop: "purType",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: purAttr
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag
    }
    // {
    //   label: i18n.t("whseField.fkfs"),
    //   prop: "payType",
    //   span: 6,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: yarnsPaytype,
    // },
  ]
};
export const PurYarnsPoDtlaC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 208px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo",
      width: 180
    },
    {
      label: i18n.t("whseField.cglx"),
      prop: "purType",
      type: "select",
      dicData: purAttr,
      width: 120
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      type: "select",
      dicData: getDicT("basSupplier", "suppName", "suppId"),
      width: 240
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag,
      width: 120
    },
    {
      label: i18n.t("whseField.fkfs"),
      prop: "payType",
      type: "select",
      dicData: getDIC("Bas_PayType"),
      width: 120
    }
    // {
    //   label: i18n.t("whseField.sqbj"),
    //   prop: "collectedFlag",
    //   type: "select",
    //   dicData:yarnsCollected,
    // },
  ]
};

// 胚布採購單
export function getPurCalicoPo(params) {
  return axios({
    url: "/api/purCalicopo/page",
    method: "get",
    params: params
  });
}
export const PurCalicoPoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: supp
      // dicData: cust2,
    },
    {
      label: i18n.t("whseField.cglx"),
      prop: "purType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: purAttr
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag
    },
    {
      label: i18n.t("whseField.fkfs"),
      prop: "payType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsPaytype
    }
  ]
};
export const PurCalicoPoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo"
    },
    {
      label: i18n.t("whseField.cglx"),
      prop: "purType",
      type: "select",
      dicData: purAttr
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      type: "select",
      dicData: supp
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag
    },
    {
      label: i18n.t("whseField.fkfs"),
      prop: "payType",
      type: "select",
      dicData: yarnsPaytype
    },
    {
      label: i18n.t("whseField.sqbj"),
      prop: "collectedFlag",
      type: "select",
      dicData: yarnsCollected
    }
  ]
};
export function purDelisingleDtla(params) {
  return axios({
    url: "/api/purDelisingleDtla",
    method: "get",
    params: params
  });
}
// 染化料採購單
export function getPurChemicalpo2(params) {
  return axios({
    url: "/api/purChemicalpo/page",
    method: "get",
    params: params
  });
}
export function getPurChemicalpo(params) {
  return axios({
    url: "/api/purSinglepo/purSinglepoDtl/page",
    method: "get",
    params: params
  });
}
export const PurChemicalpoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: supp
      // dicData: cust2,
    },
    // {
    //   label: i18n.t("whseField.cglx"),
    //   prop: "purType",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: purAttr,
    // },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag
    }
    // {
    //   label: i18n.t("whseField.fkfs"),
    //   prop: "payType",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: yarnsPaytype,
    // },
  ]
};
export const PurChemicalpoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo",
      width: 180
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      type: "select",
      dicData: supp,
      width: 300
    },
    {
      label: i18n.t("whseField.ddrq"),
      prop: "poDate",
      width: 180,
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      align: "center"
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag,
      width: 120
    },
    {
      label: i18n.t("whseField.fkfs"),
      prop: "payType",
      type: "select",
      width: 120,
      dicData: yarnsPaytype
    }
    // {
    //   label: i18n.t("whseField.sqbj"),
    //   prop: "collectedFlag",
    //   type: "select",
    //   width: 120,
    //   dicData:yarnsCollected,
    // },
  ]
};

// 生產輔料採購單
export function getPurMaterialspo(params) {
  return axios({
    url: "/api/purMaterialspo/page",
    method: "get",
    params: params
  });
}
export const PurMaterialspoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: supp
      // dicData: cust2,
    },
    {
      label: i18n.t("whseField.cglx"),
      prop: "purType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: purAttr
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag
    },
    {
      label: i18n.t("whseField.fkfs"),
      prop: "payType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsPaytype
    }
  ]
};
export const PurMaterialspoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo"
    },
    {
      label: i18n.t("whseField.cglx"),
      prop: "purType",
      type: "select",
      dicData: purAttr
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      type: "select",
      dicData: supp
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag
    },
    {
      label: i18n.t("whseField.fkfs"),
      prop: "payType",
      type: "select",
      dicData: yarnsPaytype
    },
    {
      label: i18n.t("whseField.sqbj"),
      prop: "collectedFlag",
      type: "select",
      dicData: yarnsCollected
    }
  ]
};

// 五金採購單
export function getPurHardwarepo(params) {
  return axios({
    url: "/api/purHardwarepo/page",
    method: "get",
    params: params
  });
}
export const PurHardwarepoF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: supp
      // dicData: cust2,
    },
    {
      label: i18n.t("whseField.cglx"),
      prop: "purType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: purAttr
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsFlag
    },
    {
      label: i18n.t("whseField.fkfs"),
      prop: "payType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: yarnsPaytype
    }
  ]
};
export const PurHardwarepoC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.chdh"),
      prop: "poNo"
    },
    {
      label: i18n.t("whseField.cglx"),
      prop: "purType",
      type: "select",
      dicData: purAttr
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      type: "select",
      dicData: supp
    },
    {
      label: i18n.t("whseField.ddzt"),
      prop: "poFlag",
      type: "select",
      dicData: yarnsFlag
    },
    {
      label: i18n.t("whseField.fkfs"),
      prop: "payType",
      type: "select",
      dicData: yarnsPaytype
    },
    {
      label: i18n.t("whseField.sqbj"),
      prop: "collectedFlag",
      type: "select",
      dicData: yarnsCollected
    }
  ]
};

// 退紗通知單
export function getWhseRetratyarn(params) {
  return axios({
    url: "/api/whseRetratyarnnotice/page",
    method: "get",
    params: params
  });
}

export const WhseRetratyarnF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.scdh"),
      prop: "poNo",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      span: 6,
      placeholder: " "
    }
  ]
};

export const WhseRetratyarnC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 208px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.scdh"),
      prop: "poNo",
      width: 140
      // type: "select",
      // dicData: getDicT("whseRetratyarnnotice", "poNo", "yarnsId"),
    },
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      width: 140
    },
    {
      label: i18n.t("whseField.sxmc"),
      prop: "yarnsName",
      width: 500,
      type: "select",
      dicData: getDicT("basYarnsData", "yarnsName", "yarnsId")
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      width: 150
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      align: "right",
      width: 120
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "weightUnit",
      width: 100,
      type: "select",
      dicData: matUnit
    }
  ]
};

// 送貨單
export function getPurDelivery(params) {
  return axios({
    url: "/api/purDelivery/page",
    method: "get",
    params: params
  });
}
export const PurDeliveryF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.shdh"),
      prop: "deliNo",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: supp
      // dicData: cust2,
    },
    {
      label: i18n.t("whseField.shrq"),
      prop: "deliDate",
      span: 8,
      placeholder: " ",
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};
export const PurDeliveryC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.shdh"),
      prop: "deliNo"
    },
    // {
    //   label: "類型",
    //   prop: "deliType",
    //   type: "select",
    //   dicData: getDIC("pur_deliType"),
    // },
    {
      label: i18n.t("whseField.gysmc"),
      prop: "suppId",
      type: "select",
      dicData: supp
    },
    {
      label: i18n.t("whseField.shrq"),
      prop: "deliDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    }
  ]
};

// 送货单明细
export function getPurDeliveryDetail(params) {
  return axios({
    url: "/api/purDelisingleDtla/page",
    method: "get",
    params: params
  });
}
export const PurDeliveryDF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    // {
    //   label: i18n.t("whseField.shdh"),
    //   prop: "deliNo",
    //   span: 8,
    //   placeholder: " ",
    // },
    // {
    //   label: i18n.t("whseField.gysmc"),
    //   prop: "suppId",
    //   span: 8,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: supp,
    //   // dicData: cust2,
    // },
    // {
    //   label: i18n.t("whseField.shrq"),
    //   prop: "deliDate",
    //   span: 8,
    //   placeholder: " ",
    //   type: "datetime",
    //   format: "yyyy-MM-dd HH:mm:ss",
    //   valueFormat: "yyyy-MM-dd HH:mm:ss",
    // },
  ]
};
export const PurDeliveryDC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 445px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.chdh"),
      prop: "purNo",
      width: 200
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batId",
      width: 80
    },
    {
      label: i18n.t("whseField.clbh"),
      prop: "materialNum",
      width: 120,
      type: "select",
      dicData: getDicT("purSinglepoDtl", "materialNum", "purSinglepoDtloid")
    },
    {
      label: i18n.t("whseField.clmc"),
      prop: "chinName",
      width: 200,
      type: "select",
      dicData: getDicT("purSinglepoDtl", "chinName", "purSinglepoDtloid")
    },
    {
      label: i18n.t("energy.sl"),
      prop: "deliQty",
      align: "right",
      width: 120
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "deliUnit",
      width: 120
    },
    {
      label: i18n.t("whseField.shrq"),
      prop: "cmatDate",
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      width: 180
    }
  ]
};

// 选择客戶
export function getBasCustomer(params) {
  return axios({
    url: "/api/basCustomer/page",
    method: "get",
    params: params
  });
}

export const BasCustomerF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.khmc"),
      prop: "custName",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.khbh"),
      prop: "custCode",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.khlx"),
      prop: "custType",
      span: 8,
      placeholder: " ",
      type: "select",
      dicData: getDIC("bas_customer_type")
    }
  ]
};

export const BasCustomerC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 350px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custName",
      width: 280
    },
    {
      label: i18n.t("whseField.khbh"),
      prop: "custCode",
      type: "select"
    },
    {
      label: i18n.t("whseField.khlx"),
      prop: "custType",
      type: "select",
      dicData: getDIC("bas_customer_type")
    },
    {
      label: i18n.t("whseField.khzt"),
      prop: "state",
      type: "select",
      dicData: getDIC("bas_customer_state")
    },
    {
      label: i18n.t("whseField.yyzz"),
      prop: "busLicense"
    },
    {
      label: i18n.t("ProWorkflowInfo.bz"),
      prop: "remake",
      type: "select"
    }
  ]
};

// 外厂染化料配料计划
export function getWhseChemicalPlan(params) {
  return axios({
    url: "/api/vWhseChemicalPlan/page",
    method: "get",
    params: params
  });
}

export const WhseChemicalPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.wfcdh"),
      prop: "refCode",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.wfcmc"),
      prop: "refName",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.ylmc"),
      prop: "chemicalName",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      span: 6,
      placeholder: " "
    }
    // {
    //   label:i18n.t("whseField.scdh"),
    //   prop: "prOn",
    //   span: 8,
    //   placeholder: " ",
    // },
  ]
};

export const WhseChemicalPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.wfcdh"),
      prop: "refCode"
    },
    {
      label: i18n.t("whseField.wfcmc"),
      prop: "refName",
      type: "select"
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      width: 220
    },
    // {
    //   label:i18n.t("whseField.scdh"),
    //   prop: "prOn",
    // },
    {
      label: i18n.t("whseField.ylbh"),
      prop: "chemicalId"
    },
    {
      label: i18n.t("whseField.ylmc"),
      prop: "chemicalName"
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      align: "right"
    },
    {
      label: i18n.t("whseField.zldw"),
      prop: "weightUnit",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 外厂輔料配料计划
export function getWhseRetmaterialsPlan(params) {
  return axios({
    url: "/api/vWhseRetmaterialsPlan/page",
    method: "get",
    params: params
  });
}

export const WhseRetmaterialsPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.wfcdh"),
      prop: "refCode",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.wfcmc"),
      prop: "refName",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.flmc"),
      prop: "matName",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      span: 6,
      placeholder: " "
    }
    // {
    //   label:i18n.t("whseField.scdh"),
    //   prop: "prOn",
    //   span: 8,
    //   placeholder: " ",
    // },
  ]
};

export const WhseRetmaterialsPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.wfcdh"),
      prop: "refCode"
    },
    {
      label: i18n.t("whseField.wfcmc"),
      prop: "refName",
      type: "select"
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      width: 220
    },
    // {
    //   label:i18n.t("whseField.scdh"),
    //   prop: "prOn",
    // },
    {
      label: i18n.t("whseField.flbh"),
      prop: "matId"
    },
    {
      label: i18n.t("whseField.flmc"),
      prop: "matName"
    },
    {
      label: i18n.t("energy.sl"),
      prop: "qty",
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "qtyUnit",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 外厂胚布配料计划
export function getWhseMaterialoutPlan(params) {
  return axios({
    url: "/api/vWhseMaterialoutPlan/page",
    method: "get",
    params: params
  });
}

export const WhseMaterialoutPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.wfcdh"),
      prop: "refCode",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.wfcmc"),
      prop: "refName",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.pbmc"),
      prop: "clothName",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      span: 6,
      placeholder: " "
    }
    // {
    //   label:i18n.t("whseField.scdh"),
    //   prop: "prOn",
    //   span: 8,
    //   placeholder: " ",
    // },
  ]
};

export const WhseMaterialoutPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.wfcdh"),
      prop: "refCode",
      width: 120
    },
    {
      label: i18n.t("whseField.wfcmc"),
      prop: "refName",
      type: "select",
      width: 220
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      width: 150
    },
    // {
    //   label:i18n.t("whseField.scdh"),
    //   prop: "prOn",
    // },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "calicoId",
      width: 140
    },
    {
      label: i18n.t("whseField.pbmc"),
      prop: "clothName"
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      align: "right",
      width: 120
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "weightUnit",
      type: "select",
      dicData: matUnit,
      width: 120
    }
  ]
};
// 本厂胚布配料计划
export function getWhseMaterialPlan(params) {
  return axios({
    url: "/api/whseMaterialPlan/page",
    method: "get",
    params: params
  });
}

export const WhseMaterialPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("ProWorkflowInfo.sbbh"),
      prop: "equCode",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("ProWorkflowInfo.szmc"),
      prop: "equName",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "calicoId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      span: 6,
      placeholder: " "
    }
    // {
    //   label:i18n.t("whseField.scdh"),
    //   prop: "prOn",
    //   span: 8,
    //   placeholder: " ",
    // },
  ]
};

export const WhseMaterialPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("ProWorkflowInfo.sbbh"),
      prop: "equCode",
      width: 120
    },
    {
      label: i18n.t("ProWorkflowInfo.szmc"),
      prop: "equName",
      width: 150
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      width: 220
    },
    {
      label: i18n.t("whseField.scdh"),
      prop: "prOn",
      width: 150
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "calicoId",
      width: 140
    },
    {
      label: i18n.t("whseField.pbmc"),
      prop: "clothName"
      // width: 250
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      align: "right",
      width: 140
    },
    {
      label: i18n.t("whseField.ph2"),
      prop: "countingNo",
      align: "right",
      width: 100
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      align: "right",
      width: 100
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "weightUnit",
      type: "select",
      dicData: matUnit
    }
  ]
};

// 外厂纱线配料计划
export function getWhseRetyarninoutPlan(params) {
  return axios({
    url: "/api/vWhseRetyarninoutPlan/page",
    method: "get",
    params: params
  });
}

export const WhseRetyarninoutPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.wfcdh"),
      prop: "refCode",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.wfcmc"),
      prop: "refName",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      span: 6,
      placeholder: " "
    }
    // {
    //   label:i18n.t("whseField.scdh"),
    //   prop: "prOn",
    //   span: 8,
    //   placeholder: " ",
    // },
  ]
};

export const WhseRetyarninoutPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.wfcdh"),
      prop: "refCode",
      width: 120
    },
    {
      label: i18n.t("whseField.wfcmc"),
      prop: "refName",
      width: 150
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      width: 220
    },
    {
      label: i18n.t("whseField.scdh"),
      prop: "prOn",
      width: 140
    },
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      width: 140
    },
    {
      label: i18n.t("whseField.sxmc"),
      prop: "yarnsName",
      width: 250
    },
    {
      label: i18n.t("whseField.ds"),
      prop: "everySpindle",
      align: "right",
      width: 100
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      align: "right",
      width: 100
    }
    // {
    //   label: i18n.t("whseField.dw"),
    //   prop: "weightUnit",
    //   type: "select",
    //   dicData:matUnit
    // }
  ]
};

// 本厂纱线配料计划
export function getWhseRetyarninPlan(params) {
  return axios({
    url: "/api/vWhseRetyarninPlan/page",
    method: "get",
    params: params
  });
}

export const WhseRetyarninPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("ProWorkflowInfo.sbbh"),
      prop: "equId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("ProWorkflowInfo.szmc"),
      prop: "equName",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      span: 6,
      placeholder: " "
    }
    // {
    //   label:i18n.t("whseField.scdh"),
    //   prop: "prOn",
    //   span: 8,
    //   placeholder: " ",
    // },
  ]
};

export const WhseRetyarninPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("ProWorkflowInfo.sbbh"),
      prop: "equId",
      width: 120
    },
    {
      label: i18n.t("ProWorkflowInfo.szmc"),
      prop: "equName",
      width: 150
    },
    {
      label: i18n.t("whseField.jhbh"),
      prop: "retBatch",
      width: 220
    },
    {
      label: i18n.t("whseField.scdh"),
      prop: "prOn",
      width: 150
    },
    {
      label: i18n.t("whseField.sxbh"),
      prop: "yarnsId",
      width: 140
    },
    {
      label: i18n.t("whseField.sxmc"),
      prop: "yarnsName"
      // width: 250
    },
    {
      label: i18n.t("whseField.ds"),
      prop: "everySpindle",
      align: "right",
      width: 100
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      align: "right",
      width: 100
    }
    // {
    //   label: i18n.t("whseField.dw"),
    //   prop: "weightUnit",
    //   type: "select",
    //   dicData:matUnit
    // }
  ]
};

// 货运计划
export function getshipPlan(params) {
  return axios({
    url: "/api/shipPlan/v2.0/listByPage",
    method: "get",
    params: params
  });
}

export const shipPlanF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("Shipping.hyjhbh"),
      prop: "spNo",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("Shipping.myfs"),
      prop: "tradeMode",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: getDIC("sal_tradeMode")
    },
    {
      label: i18n.t("Shipping.ysfs"),
      prop: "shipMode",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: getDIC("Bas_TranType")
    }
  ]
};

export const shipPlanC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("Shipping.hyjhbh"),
      prop: "spNo",
      width: 160
    },
    {
      label: i18n.t("Shipping.myfs"),
      prop: "tradeMode",
      type: "select",
      dicData: getDIC("sal_tradeMode"),
      width: 120
    },
    {
      label: i18n.t("Shipping.ysfs"),
      prop: "shipMode",
      width: 120,
      type: "select",
      dicData: getDIC("Bas_TranType")
    },
    {
      label: i18n.t("Shipping.bz"),
      prop: "spRemark",
      width: 260
    }
  ]
};

// 货运计划
export function getshipPlanDtl(params) {
  return axios({
    url: "/api/shipPlanDtl/v1.0/listByPage",
    method: "get",
    params: params
  });
}

export const shipPlanDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("Shipping.hyjhbh"),
      prop: "poNo",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("energy.ddh"),
      prop: "orderNo",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "fabId",
      span: 6,
      placeholder: " "
    }
  ]
};

export const shipPlanDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("Shipping.hyjhbh"),
      prop: "poNo",
      width: 180
    },
    {
      label: i18n.t("energy.ddh"),
      prop: "orderNo",
      width: 140
    },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custName",
      width: 180
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "fabId",
      width: 140,
      type: "select",
      dicData: getDicT("basCalico", "calicoId", "calicoName")
    },
    {
      label: i18n.t("whseField.pbmc"),
      prop: "fabName"
      // width: 600
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "qty",
      width: 100
    }
  ]
};

// 订单胚布资料
export function getOrderPb(params) {
  return axios({
    url: "/api/page",
    method: "get",
    params: params
  });
}

export const OrderPbF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("energy.ddh"),
      prop: "salPoFk",
      span: 6,
      placeholder: " ",
      type: "tree",
      dicData: postDicT("salPoList", "poNo", "salPooid")
      // typeslot: true,
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "fabId",
      span: 6,
      placeholder: " "
    }
  ]
};

export const OrderPbC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("energy.ddh"),
      prop: "salPoFk",
      type: "select",
      dicData: postDicT("salPoList", "poNo", "salPooid"),
      width: 140
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "fabId",
      width: 140
    },
    {
      label: i18n.t("whseField.blmc"),
      prop: "fabName"
      // width: 500
    },
    {
      label: i18n.t("Shipping.ys"),
      prop: "colorName",
      width: 120
    },
    {
      label: i18n.t("Shipping.sl"),
      prop: "fabQty",
      width: 120,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "qtyUnit",
      type: "select",
      width: 120,
      dicData: matUnit
    }
    // {
    //   label: "单价",
    //   prop: "unitPrice",
    //   width: 120,
    //   align: "right"
    // },
    // {
    //   label: "单价单位",
    //   prop: "priceUnit",
    //   type: "select",
    //   width: 120,
    //   dicData: matUnit
    // },
  ]
};

// 胚布疋号资料
export function getPbDltb(params) {
  return axios({
    url: "/api/whseCalicoinDtlb/v1.0/listByPage",
    method: "get",
    params: params
  });
}

export const PbDltbF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.scdh"),
      prop: "prodNo",
      span: 6,
      placeholder: " "
      // type: "tree",
      // dicData: postDicT("salPoList", "poNo", "salPooid"),
      // typeslot: true,
    },
    {
      label: i18n.t("whseField.krbph"),
      prop: "custTicket",
      span: 6,
      placeholder: " "
    }
  ]
};

export const PbDltbC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.scdh"),
      prop: "prodNo",
      cell: true,
      width: 140,
      type: "select"
      // dicData: getDicT(
      //   "whseCalicoinDtla/v1.0/list",
      //   "prodNo",
      //   "whseCalicoinDtlaoid"
      // )
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      width: 150
    },
    {
      label: i18n.t("whseField.ph2"),
      prop: "countingNo",
      cell: true,
      width: 80,
      align: "right"
      // click: (val) => {
      //  window.vm.iptPhChange(_this.choosePhData);
      // },
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      cell: true,
      width: 100,
      align: "right"
      // click: (val) => {
      //  window.vm.iptPhChange(_this.choosePhData);
      // },
    },
    {
      label: i18n.t("whseField.zldw"),
      prop: "weightUnit",
      cell: true,
      width: 100,
      type: "select",
      dicData: matUnit
      // click: (val) => {
      //  window.vm.iptPhChange(_this.choosePhData);
      // },
    },
    {
      label: i18n.t("whseField.krbph"),
      prop: "custTicket",
      cell: true,
      width: 150
      // click: (val) => {
      //  window.vm.iptPhChange(_this.choosePhData);
      // },
    }
  ]
};

// 胚布入仓明细
export function getPbDetali(params) {
  return axios({
    url: "/api/whseCalicoinDtla/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export const PbDetaliF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.pbbh"),
      prop: "calicoId",
      span: 8,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      span: 8,
      placeholder: " "
    }
  ]
};

export const PbDetaliC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.rcbh"),
      prop: "$whseCalicoinFk",
      cell: true,
      width: 150,
      type: "select"
      // dicData: getDicT("whseCalicoin/v1.0/list", "yinId", "whseCalicoinoid")
    },
    {
      label: "入仓编号2",
      prop: "whseCalicoinFk",
      cell: false,
      width: 150,
      type: "select",
      hide: false,
      props: {
        label: "whseCalicoinFk",
        value: "whseCalicoinDtlaoid"
      }
      // dicData: getXDicT("whseCalicoinDtla/v1.0/list")
    },
    {
      label: i18n.t("whseField.pbbh"),
      prop: "calicoId",
      width: 120
    },
    {
      label: i18n.t("whseField.pbmc"),
      prop: "clothName"
      // width: 450,
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      width: 150
    },
    {
      label: i18n.t("whseField.ps"),
      prop: "countingNo",
      width: 80,
      align: "right"
    },
    {
      label: i18n.t("whseField.zl"),
      prop: "weight",
      width: 80,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "weightUnit",
      width: 80,
      type: "select",
      dicData: matUnit
    }
  ]
};

// 生产辅料入仓明细
export function getScflDtla(params) {
  return axios({
    url: "/api/whseAccessoriesDtl/page",
    method: "get",
    params: params
  });
}
// 五金/行政入仓明细
export function getCalicoinDtla(params) {
  return axios({
    url: "/api/whseAccessoriesDtl/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export const calicoinDtlaF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    // {
    //   label: i18n.t("whseField.clzl"),
    //   prop: "materialType",
    //   span: 6,
    //   type: "select",
    //   dicData: getDIC("pur_category")
    // },
    {
      label: i18n.t("whseField.clbh"),
      prop: "materialNum",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      span: 6,
      placeholder: " "
    }
  ]
};
let basWjxz = getDbDicT("basHardwarearticles", "basAdsuppliesarticles");
export const calicoinDtlaC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.rcbh"),
      prop: "whseAccessoriesInFk",
      cell: true,
      width: 140,
      type: "select",
      dicData: getDicT("whseAccessoriesIn", "yinId", "whseAccessoriesinoid")
    },
    // {
    //   label: i18n.t("whseField.clzl"),
    //   prop: "materialType",
    //   width: 100,
    //   type: "select",
    //   dicData: getDIC("pur_category")
    // },
    {
      label: i18n.t("whseField.clbh"),
      prop: "materialNum",
      width: 140
    },

    {
      label: i18n.t("whseField.clmc"),
      prop: "materialName",
      width: 150,
      type: "select",
      props: {
        label: "chinName",
        value: "hardwareId"
      },
      cell: false,
      dicData: basWjxz
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      width: 150
    },
    {
      label: i18n.t("whseField.xh"),
      prop: "model",
      width: 180,
      type: "select",
      props: {
        label: "model",
        value: "hardwareId"
      },
      dicData: basWjxz
    },
    {
      label: i18n.t("whseField.gg"),
      prop: "itemspec",
      width: 160,
      type: "select",
      props: {
        label: "itemspec",
        value: "hardwareId"
      },
      dicData: basWjxz
    },
    {
      label: i18n.t("Shipping.sl"),
      prop: "poQty",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "unitQty",
      width: 100,
      type: "select",
      dicData: matUnit
    }
  ]
};
let basScfl = getXDicT("basProductivesupplies");
export const scflDtlaC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.rcbh"),
      prop: "whseAccessoriesInFk",
      cell: false,
      width: 140,
      type: "select",
      dicData: getDicT("whseAccessoriesIn", "yinId", "whseAccessoriesinoid")
    },
    // {
    //   label: i18n.t("whseField.clzl"),
    //   prop: "materialType",
    //   width: 100,
    //   type: "select",
    //   dicData: getDIC("pur_category")
    // },
    {
      label: i18n.t("whseField.clbh"),
      prop: "materialNum",
      width: 140
    },

    {
      label: i18n.t("whseField.clmc"),
      prop: "materialName",
      width: 150,
      type: "select",
      props: {
        label: "chinName",
        value: "hardwareId"
      },
      cell: false,
      dicData: basScfl
    },
    {
      label: i18n.t("whseField.ph"),
      prop: "batchNo",
      width: 150
    },
    {
      label: i18n.t("whseField.xh"),
      prop: "model",
      width: 180,
      type: "select",
      props: {
        label: "model",
        value: "hardwareId"
      },
      dicData: basScfl
    },
    {
      label: i18n.t("whseField.gg"),
      prop: "itemspec",
      width: 160,
      type: "select",
      props: {
        label: "itemspec",
        value: "hardwareId"
      },
      dicData: basScfl
    },
    {
      label: i18n.t("Shipping.sl"),
      prop: "poQty",
      width: 100,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "unitQty",
      width: 100,
      type: "select",
      dicData: matUnit
    }
  ]
};

// 选择人员
export function getPersonList(params) {
  return axios({
    url: "/api/perPersonList",
    method: "get",
    params: params
  });
}
export const PersonF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("basesalary.ygbh"),
      prop: "perId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("basesalary.ygxm"),
      prop: "perName",
      span: 6,
      placeholder: " "
    }
  ]
};

export const PersonC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("basesalary.ygbh"),
      prop: "perId",
      cell: true,
      width: 120
    },
    {
      label: i18n.t("basesalary.ygxm"),
      prop: "perName",
      cell: false,
      width: 120
    },
    {
      label: i18n.t("whseField.ywmc"),
      prop: "perEname",
      width: 120
    },
    {
      label: i18n.t("whseField.rzrq"),
      prop: "entryDate",
      width: 190,
      type: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },

    {
      label: i18n.t("whseField.lxr"),
      prop: "contactPerson",
      width: 150
    },
    {
      label: i18n.t("whseField.lxdh"),
      prop: "call",
      width: 120
    }
  ]
};

// 申购单
export function getSingle(params) {
  return axios({
    url: "/api/purSingle/PurSingleByPage",
    method: "get",
    params: params
  });
}
export const SingleF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.sqbh"),
      prop: "appId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.sqbm"),
      prop: "appDep",
      span: 6,
      placeholder: " "
    }
    // {
    //   label: i18n.t("whseField.sqdzt"),
    //   prop: "purState",
    //   span: 6,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: getDIC("pur_state")
    // },
  ]
};

export const SingleC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  // selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.sqbh"),
      prop: "appId",
      width: 180
    },
    {
      label: i18n.t("whseField.sqbm"),
      prop: "appDep",
      width: 150,
      overHidden: true
    },
    {
      label: i18n.t("whseField.sqrq"),
      prop: "appDate",
      width: 160,
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd"
    },
    {
      label: i18n.t("whseField.sqlb"),
      prop: "purCategory",
      width: 120,
      type: "select",
      dicData: getDIC("pur_category")
    },
    {
      label: i18n.t("whseField.sqdzt"),
      prop: "purState",
      width: 120,
      type: "select",
      dicData: getDIC("pur_state")
    }
  ]
};

// 申购单明细
export function getSingleDtl(params) {
  return axios({
    url: "/api/purSingleDtl/page",
    method: "get",
    params: params
  });
}
export const SingleDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: []
};
export const SingleDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 150px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.clbh"),
      prop: "materialNum",
      width: 120
    },
    {
      label: i18n.t("whseField.clmc"),
      prop: "chinName",
      width: 250,
      overHidden: true
    },
    {
      label: i18n.t("energy.sl"),
      prop: "applyNum",
      width: 80,
      align: "right"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "company",
      width: 80,
      type: "select",
      dicData: matUnit,
      overHidden: true
    },
    {
      label: i18n.t("whseField.xqrq"),
      prop: "demandDate",
      width: 100,
      type: "datetime",
      align: "center",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd"
    },
    {
      label: i18n.t("whseField.xh"),
      prop: "model",
      // width: 300,
      type: "select"
    },
    {
      label: i18n.t("whseField.gg"),
      prop: "itemspec",
      width: 200,
      type: "select"
    },
    {
      label: i18n.t("whseField.yjfl"),
      prop: "topcategoryName",
      width: 100,
      type: "select"
    },
    {
      label: i18n.t("whseField.ejfl"),
      prop: "seccategoryName",
      width: 100,
      type: "select"
    },
    {
      label: i18n.t("whseField.sjfl"),
      prop: "thirdcategoryName",
      width: 100,
      type: "select"
    },
    {
      label: i18n.t("whseField.ytbz"),
      prop: "purposeRemarks",
      width: 200
    }
  ]
};

// 色号信息(颜色)
export function getSalColor(params) {
  return axios({
    url: "/api/basColor /v1.0/listByPage",
    method: "get",
    params: params
  });
}
export const SalColorF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.sh"),
      prop: "colorNo",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.ysmc"),
      prop: "colorName",
      span: 6,
      placeholder: " "
    }
  ]
};
export const SalColorC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 390px)",
  refreshBtn: false,
  columnBtn: false,
  selection: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.sh"),
      prop: "colorNo",
      width: 150
    },
    {
      label: i18n.t("whseField.ysmc"),
      prop: "colorName",
      width: 200
    }
    // {
    //   label: "品牌",
    //   prop: "basBrandFk",
    //   width: 220,
    //   type: "select",
    //   dicData: getDicT("basCustomer", "custName", "basCustomeroid")
    // },
  ]
};

// 色号资料
export function getTapcolor(params) {
  return axios({
    url: "/api/labTapcolor/page",
    method: "get",
    params: params
  });
}
export const TapcolorF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.khmc"),
      prop: "custCode",
      span: 6,
      placeholder: " ",
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.sh"),
      prop: "colorBh",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.ysmc"),
      prop: "colorChn",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.sh"),
      prop: "colorNo",
      span: 6,
      placeholder: " "
    }
  ]
};
export const TapcolorC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.sh"),
      prop: "colorNo",
      width: 130
    },
    {
      label: i18n.t("whseField.khmc"),
      prop: "custCode",
      width: 220,
      type: "select",
      dicData: cust1
    },
    {
      label: i18n.t("whseField.sh"),
      prop: "colorBh",
      width: 140
    },
    {
      label: i18n.t("whseField.ysmc"),
      prop: "colorChn",
      width: 120
    },
    {
      label: i18n.t("whseField.ysly"),
      prop: "colorSource",
      width: 100,
      type: "select",
      dicData: getDIC("sal_colorSource")
    },
    {
      label: i18n.t("whseField.ksh"),
      prop: "custColorBh",
      width: 130
    },
    {
      label: i18n.t("whseField.mlbh"),
      prop: "fabCode",
      width: 110
    },
    {
      label: i18n.t("whseField.ml"),
      prop: "fabricDesc",
      width: 400
    },
    {
      label: i18n.t("whseField.mlly"),
      prop: "fabSource",
      width: 120,
      type: "select",
      dicData: getDIC("LAP_FABSOURCE")
    },
    {
      label: i18n.t("whseField.rslb"),
      prop: "lapDyetype",
      width: 120,
      type: "select",
      dicData: getDIC("LAP_DYETYPE")
    },
    {
      label: i18n.t("whseField.sfsr"),
      prop: "doubleFlag",
      width: 100,
      type: "select",
      dicData: [
        {
          value: true,
          label: "是"
        },
        {
          value: false,
          label: "否"
        }
      ]
    }
  ]
};

// 申请领用单
export function getPurApplication(params) {
  return axios({
    url: "/api/purApplication/page",
    method: "get",
    params: params
  });
}

export const purApplicationF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    // {
    //   label: i18n.t("whseField.sqlb"),
    //   prop: "applyCategory",
    //   span: 6,
    //   placeholder: " ",
    //   type: "select",
    //   dicData: getDIC("pur_category"),

    // },
    {
      label: i18n.t("whseField.sqbh"),
      prop: "applyCode",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.sqbm"),
      prop: "applyDepartment",
      span: 6,
      placeholder: " "
    }
  ]
};
export const purApplicationC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: false,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseField.sqbh"),
      prop: "applyCode",
      width: 140
    },
    {
      label: i18n.t("whseField.sqbm"),
      prop: "applyDepartment",
      width: 180,
      overHidden: true
    },
    {
      label: i18n.t("whseField.sqr"),
      prop: "applyPeople",
      width: 140
    },
    {
      label: i18n.t("whseField.sqrq"),
      prop: "applyDate",
      type: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: 140
    },
    {
      label: i18n.t("whseField.sqlb"),
      prop: "applyCategory",
      width: 100,
      type: "select",
      dicData: getDIC("pur_category")
    },
    {
      label: i18n.t("whseField.sqdzt"),
      prop: "applyState",
      width: 120,
      type: "select",
      dicData: getDIC("pur_state")
    }
  ]
};

// 申请领用单明细
export function getPurApplicationDtl(params) {
  return axios({
    url: "/api/purApplicationDtl/page",
    method: "get",
    params: params
  });
}
export const purApplicationDtlF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseField.clbh"),
      prop: "materielCode",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseField.clmc"),
      prop: "materielName",
      span: 6,
      placeholder: " "
    }
  ]
};
export const purApplicationDtlC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 195px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: "生产织单号",
      prop: "weaveNo",
      width: 120,
      overHidden: true
    },
    {
      label: i18n.t("whseField.clbh"),
      prop: "materielCode",
      width: 140
    },
    {
      label: i18n.t("whseField.clmc"),
      prop: "materielName",
      width: 300,
      overHidden: true
    },
    {
      label: i18n.t("whseField.slsl"),
      prop: "applyNum",
      width: 100,
      precision: 2
      // type: "number"
    },
    {
      label: i18n.t("whseField.dw"),
      prop: "company",
      width: 100,
      type: "select",
      dicData: matUnit
    },
    {
      label: "品牌",
      prop: "yarnsCard",
      width: 120,
      overHidden: true
    },
    {
      label: "供应商批号",
      prop: "batId",
      width: 140,
      overHidden: true
    },
    {
      label: "本厂批号",
      prop: "batchNo",
      width: 140,
      overHidden: true
    },
    {
      label: i18n.t("whseField.ytbz"),
      prop: "purposeRemarks",
      width: 140
    },

    {
      label: i18n.t("whseField.xh"),
      prop: "model",
      width: 180
    },
    {
      label: i18n.t("whseField.gg"),
      prop: "ItemSpec",
      width: 180
    }
  ]
};

// 選擇貨位
export function getLoc(params) {
  return axios({
    url: "/api/whseLocation/page",
    method: "get",
    params: params
  });
}
export const locF = {
  submitBtn: false,
  emptyBtn: false,
  labelWidth: 130,
  menuBtn: false,
  menu: false,
  column: [
    {
      label: i18n.t("whseMng.ckdh"),
      prop: "warehouseId",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseMng.ckmc"),
      prop: "warehouseName",
      span: 6,
      placeholder: " "
    },
    {
      label: i18n.t("whseMng.qwm"),
      prop: "areaCode",
      span: 6,
      placeholder: " "
    }
  ]
};
export const locC = {
  menu: false,
  addBtn: false,
  border: true,
  highlightCurrentRow: true,
  height: "calc(100vh - 200px)",
  refreshBtn: false,
  columnBtn: false,
  selection: true,
  page: true,
  column: [
    {
      prop: "index",
      label: "#",
      width: 50,
      align: "center"
    },
    {
      label: i18n.t("whseMng.ckdh"),
      prop: "warehouseId",
      width: 140
    },
    {
      label: i18n.t("whseMng.ckmc"),
      prop: "warehouseName",
      width: 140,
      type: "select",
      // props: {
      //   label: "warehouseId",
      //   value: "whseWarehouseoid"
      // },
      dicData: getDicT("whseWarehouse", "warehouseName", "warehouseId")
    },
    {
      label: i18n.t("whseMng.qwm"),
      prop: "areaCode",
      width: 100,
      type: "select",
      dicData: getDicT("whseShelves")
    },
    {
      label: i18n.t("whseMng.hwm"),
      prop: "locationCode",
      width: 160
    }
  ]
};
