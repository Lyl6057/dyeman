/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-08-12 09:26:17
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-12 10:27:23
 */



export function colDefCrudOp(_this) {
    return {
      height: "500px",
      page: false,
      menu: false,
      border: true,
      selection: true,
      column: [
        {
            prop: "codeId",
            label: "色系",
            align: "center",
            hide: true
          },
        {
          prop: "codeName",
          label: "色系",
          width: 150,
          align: "center"
        },
      
      ]
    }
  }