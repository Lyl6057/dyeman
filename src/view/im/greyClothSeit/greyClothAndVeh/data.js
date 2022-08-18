/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-08-16 10:26:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-17 18:12:13
 */
/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-08-16 10:26:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-16 14:04:45
 */


// 表格公共配置
const mainCrudOpCommon = {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 285px)",
    refreshBtn: false,
    columnBtn: false,
    showOverflowTooltip: true,
    excelBtn: true,
    showSummary: false,
    tree: true,
    rowKey: "index",
    index: true,
    page: true,
  }
  
// 查询表单
export function queryFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 100,
        column: [{
                label: "织单号",
                prop: "weaveJobCode",
                span: 5,
                placeholder: " ",
            },
            {
                label: "整理日期",
                prop: "organizeDate",
                span: 6,
                placeholder: " ",
                type: "daterange",
            },
            {
                label: "布票号",
                prop: "noteCode",
                span: 5,
                placeholder: " ",
            },
        ]
    };
}

export function mainCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        column: [{
            label: "布票号",
            prop: "noteCode",
            width: 180
          },
          {
            label: "整理日期",
            prop: "organizeDate",
            width: 120,
            align: "center",
          },
          {
            label: "原载具编号",
            prop: "vehicleNoOld",
            width: 160
          },
          {
            label: "新载具编号",
            prop: "vehicleNoNew",
            width: 160
          },
        ]
    }
}


// 新增表单维护
export function addFormOp(_this){
    return {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 80,
        column: [{
                label: "来源",
                prop: "origin",
                span: 24,
                type: "radio",
                dicData: [
                    {label: "按织单号", value: 1},
                    {label: "按载具编号", value: 2},
                    {label: "按仓内码", value: 3, disabled: true},
                    {label: "按布票号", value: 4},
                ],
                placeholder: " ",
                change: _this.handleTypeChange
            },
            {
                label: "单号",
                prop: "code",
                span: 6,
                placeholder: " ",
            },
            {
                label: "整理日期",
                prop: "organizeDate",
                span: 4,
                labelWidth: 100,
                type: "date",
                valueFormat: "yyyy-MM-dd",
                placeholder: " ",
            },
        ]
    };
}

export function dtlCrudOp(_this){
    return {
        ...mainCrudOpCommon,
        page: false,
        column: [{
            label: "布票号",
            prop: "noteCode",
            width: 180
          },
          {
            label: "原载具编号",
            prop: "vehicleNoOld",
            width: 160
          },
          {
            label: "新载具编号",
            prop: "vehicleNoNew",
            width: 160,
            cell: true,
          },
          {
              label: "",
              prop: "operate",
              slot: true,
              width: 180
          }
        ]
    }
}

