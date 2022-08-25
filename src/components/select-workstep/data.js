/*
 * @Author: Lyl
 * @Date: 2022-08-22 15:20:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-23 15:50:54
 * @FilePath: \iot.vue\src\components\select-workStep\data.js
 * @Description: 
 */
import axios from 'axios'

// 获取生产排期树状数据
export function fetchfetchBaseWorkStepTreeData(params){
  return axios({
    url: "/api/baseWorkStep/tree",
    method: "get",
    params: params
  });
}

export function fetchBaseWorkStepList(params){
  return axios({
    url: '/api/baseWorkStep',
    params: params,
    method: "get"
  })
}

export function baseStepFormOp(_this) {
  return {
    submitBtn: false,
    emptyBtn: false,
    labelWidth: 100,
    column: [
      {
        label: "编号",
        prop: "stepCode",
        span: 6,
        placeholder: " "
      },
      {
        label: "名称",
        prop: "stepName",
        span: 6,
        placeholder: " "
      }
    ]
  };
}

export function baseStepCrudOp(_this) {
  return {
    menu: false,
    addBtn: false,
    border: true,
    highlightCurrentRow: true,
    height: "calc(100vh - 205px)",
    refreshBtn: false,
    columnBtn: false,
    page: false,
    labelWidth: 130,
    selection: true,
    expandAll: false,
    expandLevel: 2,
    tree: true,
    rowKey: "stepId",
    column: [
      // {
      //   label: "编号",
      //   prop: "stepCode",
      //   span: 6,
      //   width: 120,
      //   placeholder: " "
      // },
      {
        label: "名称",
        prop: "stepName",
        span: 6,
        width: 550,
        placeholder: " ",
        overHidden: true
      },
      {
        label: "描述信息",
        prop: "stepDescribe",
        span: 6,
        width: 350,
        placeholder: " ",
        overHidden: true
      },
      {
        label: "标准公式",
        prop: "standardFormula",
        span: 6,
        width: 350,
        placeholder: " ",
        overHidden: true
      }
    ]
  };
}