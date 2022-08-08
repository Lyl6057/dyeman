
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
let bleadyeCode = getXDicT("proBleadyeTechCode");
let bleadyeCode1 = getXDicT("proBleadyeTechCode");
export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "织单编号",
        tip: "Mã đơn dệt",
        prop: "fmono",
        width: 150,
        span: 6,
      },
      {
        label: "工艺集合",
        prop: "fno",
        overHidden: true,
        width: 200,
        span: 6,
        placeholder: "請選擇缸號",
      },
    ]
  };
}

export function QueryForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "织单编号",
        tip: "Mã đơn dệt",
        prop: "vatNo",
        width: 150,
        span: 6,
      },
      {
        label: "織造生產單號",
        tip: "MS dệt sản xuất",
        prop: "weaveJobCode",
        width: 150,
        span: 6,
      },
      {
        label: "訂單編號",
        tip: "Mã số đơn hàng",
        prop: "salPoNo",
        width: 150,
        span: 6,
      },
    ]
  };
}

export function taskCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 280px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    selection: false,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "缸号",
        prop: "fmono",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: true,
        placeholder: "請選擇缸號",
        sortable: true,
      },
      {
        label: "色号",
        prop: "fcolorno",
        overHidden: true,
        width: 170,
        span: 6,
        disabled: true,
        placeholder: "請選擇缸號",
        sortable: true,
      },
      {
        label: "颜色名称",
        prop: "fcolorname",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: true,
        placeholder: "請選擇缸號",
        sortable: true,
      },
      {
        label: "工艺集合",
        prop: "fno",
        overHidden: true,
        width: 200,
        span: 6,
        disabled: true,
        placeholder: "請選擇缸號",
        sortable: true,
      },
      {
        label: "布类名称",
        prop: "fitemname",
        overHidden: true,
        width: 200,
        span: 6,
        disabled: true,
        placeholder: "請選擇缸號",
        sortable: true,
      },

      {
        label: "疋数",
        prop: "fqtyprice",
        overHidden: true,
        width: 100,
        span: 6,
        disabled: true,
        placeholder: "請選擇缸號",
        sortable: true,
      },
      {
        label: "重量(KG)",
        prop: "fweight",
        overHidden: true,
        width: 120,
        span: 6,
        disabled: true,
        placeholder: "請選擇缸號",
        sortable: true,
      },
      {
        label: "客户编号",
        prop: "fcustname",
        overHidden: true,
        width: 140,
        span: 6,
        disabled: true,
        placeholder: "請選擇缸號",
        sortable: true,
      },

      {
        label: "时间",
        prop: "fDate",
        overHidden: true,
        width: 200,
        span: 6,
        sortable: true,
      },

    ],
  };
}

export function unTaskCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 320px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 130,
    selection: true,
    column: [
      {
        label: "#",
        prop: "index",
        width: 50,
        align: "center",
        display: false
      },
      {
        label: "染缸機台號",
        tip: "Số bồn nhuộm chung",
        prop: "dyeMathine",
        overHidden: true,
        width: 100,
        span: 6,
        disabled: true,
        type: "select",
        dicData: [],
        formslot: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        placeholder: " "
      },

      {
        label: "缸號",
        prop: "vatNo",
        overHidden: true,
        tip: "Số lô nhuộm",
        width: 140,
        span: 6,
        disabled: true,
        placeholder: "請選擇缸號",
        sortable: true,

      },
      {
        label: "織造生產單號",
        tip: "MS dệt sản xuất",
        prop: "weaveJobCode",
        overHidden: true,
        width: 120,
        span: 6,
        placeholder: " ",
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
        tip: "Mã số đơn hàng",
        prop: "salPoNo",
        disabled: true,
        width: 120,
        span: 6,
        placeholder: " ",
        // sortable: true,
        overHidden: true
      },
      {
        label: "重量",
        tip: "Trọng lượng",
        prop: "clothWeight",
        width: 70,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "交貨地址",
        tip: "Địa chỉ giao hàng",
        prop: "address",
        overHidden: true,
        width: 150,
        disabled: true,
        span: 12,
        placeholder: " "
      },

      {
        label: "疋數",
        tip: "Cây",
        prop: "pidCount",
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        disabled: true,
        placeholder: " "
      },
      {
        label: "訂單數量(kg)",
        tip: " Số lượng đơn hàng",
        prop: "poAmountKg",
        width: 130,
        span: 6,
        type: "number",
        align: "right",
        disabled: true,
        placeholder: " ",
      },
      {
        label: "訂單數量(p)",
        prop: "poAmountLb",
        tip: " Số lượng đơn hàng",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " ",
        hide: true,
        disabled: true,
      },

      {
        label: "布類描述",
        prop: "fabName",
        tip: "Loại vải",
        placeholder: " ",
        overHidden: true,
        width: 200,
        span: 12,
        disabled: true,
      },
      {
        label: "紗線批號",
        tip: "Lô sợi nhà máy",
        prop: "yarnBatchNo",
        span: 6,
        width: 120,

        placeholder: " ",
        disabled: true,
        hide: true
      },
      {
        label: "紗牌紗批",
        tip: "Lót sợi",
        prop: "yarnNumber",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: true,
        hide: true
      },
      {
        label: "紗牌",
        prop: "yarnCard",
        tip: "Brand",
        span: 6,
        width: 120,
        placeholder: " ",
        disabled: true,
        hide: true
      },

      {
        label: "顏色名稱",
        tip: "Màu",
        prop: "colorName",
        width: 180,
        overHidden: true,
        span: 6,
        disabled: true,
      },
      {
        label: "色號",
        prop: "colorCode",
        tip: "Số màu",
        width: 150,
        span: 6,
        overHidden: true,
        disabled: true,
        placeholder: " "
      },
      {
        label: "幅寬",
        tip: "Khổ rộng vải mộc",
        prop: "breadth",
        width: 90,
        hide: true,
        span: 6,
        disabled: true,
        placeholder: " "
      },

      {
        label: "紗長",
        prop: "yarnLength",
        tip: "Sợi dài",
        span: 6,
        hide: true,
        placeholder: " ",
        disabled: true,
        width: 80
      },

      {
        label: "針距",
        prop: "needleDist",
        tip: "Khoảng cách kim",
        span: 6,
        hide: true,
        placeholder: " ",
        width: 80,
        disabled: true,
        type: "number"
      },
      {
        label: "筒徑",
        prop: "tubeDiam",
        tip: "kính thoi",
        span: 6,
        hide: true,
        disabled: true,
        placeholder: " ",
        width: 80,
        type: "number"
      },

      {
        label: "克重",
        prop: "gramWeight",
        tip: "Trọng lượng vải mộc",
        width: 120,
        disabled: true,
        hide: true,
        span: 6,
        placeholder: " "
      },

      {
        label: "顏色數量",
        prop: "poColorCount",
        tip: "Số lượng màu",
        disabled: true,
        width: 100,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "訂單總缸數",
        prop: "poVatCount",
        disabled: true,
        tip: "TC ? Bồn",
        width: 120,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },
      {
        label: "当前第幾缸",
        prop: "vatIndex",
        tip: "Thứ ? Bồn",
        width: 110,
        disabled: true,
        span: 6,
        type: "number",
        align: "right",
        placeholder: " "
      },

      {
        label: "对色标准/缸号",
        tip: "Tiêu chuẩn so màu/Số bồn nhuộm",
        prop: "compVatNo",
        width: 110,
        hide: true,
        placeholder: " ",
        disabled: true,
        span: 6
      },
      {
        label: "規格參考",
        prop: "specParam",
        tip: "Quy cách tham khảo",
        width: 120,
        hide: true,
        disabled: true,
        placeholder: " ",
        span: 12
      },
      {
        label: "稱料員",
        prop: "mateStockMan",
        tip: "Thợ cân",
        disabled: true,
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },
      {
        label: "值機員",
        prop: "operator",
        tip: "Công nhân đứng máy",
        width: 80,
        span: 6,
        hide: true,
        placeholder: " "
      },
    ],
  };
}

export function codeItemCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
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
        label: "物料编号",
        prop: "mateCode",
        width: 100,
        span: 6,
        placeholder: " ",
      },
      {
        label: "物料名稱",
        prop: "mateName",
        width: 200,
        span: 6,
        placeholder: " "
      },
      {
        label: "物料批次",
        prop: "mateBatchNo",
        width: 100,
        span: 6,
        placeholder: " "
      },
      {
        label: "配方用量",
        prop: "formulaAmount",
        width: 90,
        type: "number",
        align: 'center',
        span: 6,
        placeholder: " ",
        
      },
      {
        label: "材料度量",
        prop: "measureType",
        width: 90,
        span: 6,
        placeholder: " ",
        type: "select",
        align: "center",
        dicData: [
          {
            label: "%",
            value: "%"
          },
          {
            label: "X%",
            value: "X%"
          },
          {
            label: "g/L",
            value: "g/L"
          }
        ]
      },
      {
        label: "材料用量",
        prop: "useAmount",
        width: 90,
        type: "number",
        span: 6,
        placeholder: " "
      },
      {
        label: "單位",
        prop: "formulaUnit",
        width: 80,
        span: 6,
        align: "center",
        type: "select",
        dicData: [
          {
            label: "KG",
            value: "KG"
          },
          {
            label: "g",
            value: "g"
          },
          {
            label: "L",
            value: "L"
          }
        ],
        placeholder: " ",
      },
      {
        label: "工藝類型",
        prop: "bleadyeType",
        width: 90,
        span: 6,
        placeholder: " ",
        align: "center",
        // slot: true,
        type: "select",
        dicData: [
          {
            label: "增加助剂",
            value: "add_chemicalmat"
          },
          {
            label: "增加颜料",
            value: "add_pigment"
          },
          {
            label: "运行",
            value: "run"
          }
        ]
      },
      {
        label: "溫度",
        prop: "runTemp",
        width: 80,
        type: "number",
        span: 6,
        placeholder: " "
      },
      {
        label: "時間(分鐘)",
        prop: "runTime",
        width: 100,
        type: "number",
        span: 6,
        placeholder: " "
      },
      {
        label: "開稀比例",
        prop: "dilutionRate",
        width: 90,
        type: "number",
        span: 6,
        placeholder: " "
      },
      {
        label: "輸送數量",
        prop: "deliveryQuantity",
        width: 120,
        type: "number",
        span: 6,
        placeholder: " "
      }
    ]
  };
}



export function techargueCrud(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 148px)",
    refreshBtn: false,
    columnBtn: false,
    selection: true,
    page: true,
    labelWidth: 130,
    column: [
      {
        label: "#",
        prop: "sn",
        width: 60,
        cell: true,
        align: "center",
        display: false
      },
      {
        label: "工艺代碼",
        prop: "proBleadyeTechCodeFk",
        width: 90,
        span: 6,
        props: {
          label: "bleadyeCode",
          value: "bleadyeCodeId"
        },
        type: "select",
        dicData: bleadyeCode
      },
      {
        label: "工艺代碼",
        prop: "proBleadyeTechCodeFk",
        width: 150,
        span: 6,
        props: {
          label: "bleadyeName",
          value: "bleadyeCodeId"
        },
        type: "select",
        dicData: bleadyeCode
      },
      {
        label: "浴比",
        prop: "liquorRatio",
        width: 60,
        cell: true,
        type: "number",
        align: "right",
        span: 6,
       
      },
      {
        label: "总水量",
        prop: "totalWater",
        width: 80,
        cell: true,
        span: 6,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
        
      },
      {
        label: "布含水量(%)",
        prop: "wetClothWater",
        width: 110,
        cell: true,
        span: 6,
        type: "number",
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
       
      },
      {
        label: "副缸外加水量",
        prop: "shotgunWater",
        width: 120,
        cell: true,
        type: "number",
        span: 6,
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        placeholder: " ",
        
      },
      {
        label: "停机水量",
        prop: "haltWater",
        width: 85,
        cell: true,
        type: "number",
        span: 6,
        align: "right",
        formatter(r, v) {
          return v && Number(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
       
      }
    ]
  };
}