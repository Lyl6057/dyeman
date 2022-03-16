/*
 * @Author: Yang 
 * @Date: 2022-03-15 11:01:27 
 * @Last Modified by: Yang
 * @Last Modified time: 2022-03-15 13:34:30
 */
// 工具

// 千分位转化
export function num2ThousandthFormat(number){
    const num = number.toFixed(2)
    const reg = /\d{1,3}(?=(\d{3})+$)/g
    const res = num.replace(/^(-?)(\d+)((\.\d+)?)$/, function(match, s1, s2, s3){
        return s1 + s2.replace(reg, '$&,') + s3
    })
    return res
}


