/*
 * @Author: Yang 
 * @Date: 2022-03-15 11:01:27 
 * @Last Modified by: Yang
 * @Last Modified time: 2022-03-15 13:34:30
 */
// 工具

// 千分位转化
export function num2ThousandthFormat(v, decimal = 2){
    return  v && Number(v).toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g,",");
}


