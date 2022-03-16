/*
 * @Author: Yang 
 * @Date: 2022-03-11 16:49:19 
 * @Last Modified by: Yang
 * @Last Modified time: 2022-03-15 16:52:33
 */
import {  getDicT } from "@/config";
let cust =  getDicT("basCustomer", "custName", "custCode");
export function mainForm(_this) {
    return {
      submitBtn: false,
      emptyBtn: false,
      labelWidth: 100,
      column: [
        {
            label: "客戶",
            prop: "custId",
            span: 6,
            placeholder: " ",
            type: "select",
            dicData: cust
        },
        {
            label: "起始月份",
            prop: "posDate",
            span: 6,
            placeholder: " ",
            type: "month",
            format:'yyyy-MM',
            valueFormat:'yyyy-MM',
        },
        {
            label: "结束月份",
            prop: "poeDate",
            span: 6,
            placeholder: " ",
            type: "month",
            format:'yyyy-MM',
            valueFormat:'yyyy-MM',
        },
      ]
    };
  }