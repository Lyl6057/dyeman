import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
export function dlgForm(_this){
  return{
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column:[
      {
        formslot: true,
        labelslot: true,
        errorslot: true,
        rules: [
          {
            required: true,
            message: "请选择",
            trigger: "blur"
          }
        ],
        label: "织单编号",
        tip: "Mã đơn dệt",
        prop: "weaveJobCode",
        width: 150,
        span: 8,
      },
      {
        label: "颜色",
        tip: "Màu sắc",
        prop: "colorName",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请输入颜色",
            trigger: "blur"
          }
        ]
      },
      {
        label: "尺寸（inch）",
        tip: "Kích thước(Inch)",
        prop: "sizeInch",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请输入尺寸（inch）",
            trigger: "blur"
          }
        ]
      },
      {
        label: "尺寸（CM）",
        tip: "Kích thước(cm)",
        prop: "sizeCm",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请输入尺寸（CM）",
            trigger: "blur"
          }
        ]
      },
       {
        label: "净重",
        tip: "Khối lượng tịnh",
        prop: "nw",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请输入净重",
            trigger: "blur"
          }
        ]
      },
      {
        label: "毛重",
        tip: "Khối lượn thô",
        prop: "gw",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请输入毛重",
            trigger: "blur"
          }
        ]
      },
      {
        label: "数量（条）",
        tip: "Số lượng",
        prop: "amount",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请输入数量（条）",
            trigger: "blur"
          }
        ]
      },
      {
        label: "纱线描述",
        tip: "Mô tả sợ",
        prop: "yarnDesc",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " ",
        
      },
     
      {
        label: "打包数量",
        tip: "Số lượng đóng gói",
        prop: "packageCount",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " ",
        rules: [
          {
            required: true,
            message: "请输入打包数量",
            trigger: "blur"
          }
        ]
      }
    ]
  }
}

export function mainForm(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 150,
    column: [
      {
        label: "织单编号",
        prop: "weaveJobCode",
        span: 6,
        placeholder: ""
      },
      // {
      //   label: "数量（条）",
      //   tip: "Số lượng",
      //   prop: "amount",
      //   span: 6,
      //   placeholder: " "
      // },
      // {
      //   label: "颜色",
      //   tip: "Màu sắc",
      //   prop: "color_name",
      //   span: 6,
      //   placeholder: " "
      // },
      // {
      //   label: "纱线描述",
      //   tip: "Mô tả sợ",
      //   prop: "yarn_desc",
      //   span: 6,

      //   placeholder: " "
      // },
      // {
      //   label: "净重",
      //   tip: "Khối lượng tịnh",
      //   prop: "nw",
      //   span: 6,
      
      //   placeholder: " "
      // },
      // {
      //   label: "毛重",
      //   tip: "Khối lượn thô",
      //   prop: "gw",
      //   span: 6,
      
      //   placeholder: " "
      // },
      // {
      //   label: "打包数量",
      //   tip: "Số lượng đóng gói",
      //   prop: "package_count",
      //   span: 6,
     
      //   placeholder: " "
      // },
    
    ]
  };
}

export function mainCrud(_this) {
  return {
    menu: false,
    addBtn: true,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 235px)",
    refreshBtn: false,
    columnBtn: false,
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
        label: "织单编号",
        tip: "Mã đơn dệt",
        prop: "weaveJobCode",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "颜色",
        tip: "Màu sắc",
        prop: "colorName",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "尺寸（inch）",
        tip: "Kích thước(Inch)",
        prop: "sizeInch",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "尺寸（CM）",
        tip: "Kích thước(cm)",
        prop: "sizeCm",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
       {
        label: "净重",
        tip: "Khối lượng tịnh",
        prop: "nw",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "毛重",
        tip: "Khối lượn thô",
        prop: "gw",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "数量（条）",
        tip: "Số lượng",
        prop: "amount",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
      {
        label: "纱线描述",
        tip: "Mô tả sợ",
        prop: "yarnDesc",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      },
     
      {
        label: "打包数量",
        tip: "Số lượng đóng gói",
        prop: "packageCount",
        width: 150,
        span: 8,
        overHidden: true,
        placeholder: " "
      }
    ]
  };
}
