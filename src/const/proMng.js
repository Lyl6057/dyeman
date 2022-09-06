import { getDIC, getDicT, getXDicT, postDicT } from "@/config";

let proDptworkProcessList = getDicT("proDptworkProcess", "dptName", "dptCode", {}, "sn");

export function dispathReceiveForm(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 200px)",
    refreshBtn: false,
    columnBtn: false,
    page: true,
    labelWidth: 100,
    column: [
      {
        label: "收/发单",
        prop: "dispathReceive",
        span: 6,
        placeholder: " ",
        tipPlacement: "right",
        type: "select",
        clearable: false,
        tip: "nhận đơn / gửi đơn",
        disabled: !_this.typechangeable,
        rules: [
          {
            required: true,
            message: "請选择收/发单",
            trigger: "blur"
          }
        ],
        dicData: [
          {
            value: 1,
            label: "收单(nhận đơn)"
          },
          {
            value: 2,
            label: "发单(gửi đơn)"
          }
        ],
      },
      {
        label: "单号",
        prop: "runJobFk",
        span: 6,
        tip: "Số lô nhuộm",
        placeholder: " ",
        type: "select",
        tipPlacement: "right",
        formslot: true,
      },
      {
        label: "计划产量",
        prop: "planOutput",
        span: 6,
        type: "number",
        tip: "sản lượng kế hoạch",
        tipPlacement: "right",
        placeholder: " "
      },
      {
        label: "实际产量",
        prop: "realOutput",
        type: "number",
        span: 6,
        tipPlacement: "right",
        tip: "sản lượng thực tế",
        placeholder: " "
      },

      {
        label: "发单部门",
        prop: "sendProcessFk",
        tipPlacement: "right",
        span: 6,
        tip: "bộ phận gửi đơn",
        placeholder: " ",
        type: "select",
        dicData: proDptworkProcessList,
        rules: [
          {
            required: true,
            message: "請选择部门",
            trigger: "blur"
          }
        ],
        change: () =>{
          if(_this.dispathReceive == 2){
            _this.remoteMethodCX();
          }
         
        },
      },
      {
        label: "收单部门",
        prop: "dptworkProcessFk",
        span: 6,
        tip: "bộ phận nhận đơn",
        placeholder: " ",
        tipPlacement: "right",
        type: "select",
        dicData: proDptworkProcessList,
        rules: [
          {
            required: true,
            message: "請选择部门",
            trigger: "blur"
          }
        ],
        change: () =>{
          if(_this.dispathReceive == 1){
            _this.remoteMethodCX();
          }
         
        },
      },
      {
        label: "工序",
        prop: "stepId",
        type: "select",
        span: 6,
        tip: "quá trình",
        placeholder: " ",
        tipPlacement: "right",
        formslot: true
      },
      {
        label: "优先级",
        prop: "priorityId",
        tipPlacement: "right",
        span: 6,
        placeholder: " ",
        type: "select",
        dicData: getDIC("bas_PriorityId")
      },
      {
        label: "说明",
        prop: "acceptDesc",
        tipPlacement: "right",
        span: 24,
        tip: "remark",
        placeholder: " "
      }
    ]
  };
}