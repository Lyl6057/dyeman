<!--
 * @Author: Yang 
 * @Date: 2022-03-11 16:45:01 
 * @Last Modified by: Yang
 * @Last Modified time: 2022-03-11 16:50:03
-->
<template>
  <div id="pro-rpt-container" :element-loading-text="$t('public.loading')" v-loading="wLoading">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleQuery">
      <el-tab-pane label="生产看板" name="first">
        <el-row class="btnList">
          <el-button type="primary" @click="handleQuery">{{
            this.$t("public.query")
          }}</el-button>
          <el-button type="warning" @click="handleOpenRpt">{{
            this.$t("public.sc")
          }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud 
            ref="crud" 
            :option="crudOp" 
            :data="dataList" 
            v-loading="loading" 
            :cell-class-name="handleCellClassName"
            @on-load="getReveiptSumData" >
            </avue-crud>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, } from "./data";
import { fetchFineReportUrl, fetchReveiptSumDataList } from "./api"
import { warning } from "@/seal/seal"
import { num2ThousandthFormat } from "@/utils/tools"
export default {
  name: "proRpt",
  data() {
    return {
      formOp: mainForm(this),
      wLoading: false,
      activeName: "first",
      form: {
        custId: "",
        posDate: "",
        poeDate: "",
      },
      dataList: [],
      loading: false,
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 200px)",
        refreshBtn: false,
        columnBtn: false,
        page: false,
        index: true,
        slot: true,
        // showSummary: true,
        // labelPosition: "top",
        labelWidth: 100,
        column: [],
      },
    };
  },
  computed: {
  },
  watch: {},
  created() {
    // this.getFineReportUrlById();
    this.init();
    this.getReveiptSumData();
  },
  methods: {
    // 初始化数据
    init(){
      // 起始月份设置缺省值 -- 默认半年前
      let targetTime = Date.now() - (180 * 24 * 60 * 60 *1000);
      let targetDate = new Date(targetTime);
      this.form.posDate = `${targetDate.getFullYear()}-${('0' + (targetDate.getMonth() + 1)).slice(-2)}`
    },
    // 单元格设置
    handleCellClassName({row,column,rowIndex, columnIndex}){
      return (row.poKind == 2 && columnIndex > 2) ? "cell-name_gray" : ""
    },
    // 合计
    handleSummaryMethod(row){
      if(row.columns.length == 0) return [];
      let suns = [];

      suns = row.columns.map((item,index) => {
        if(index == 0) return "小计"
        if(index == 1) return "-";
        if(index == 2) return "收单\n\t预订单";
        let computedNum = row.data.reduce((a,b) => {
          return a + (b[item.property] || 0)
        }, 0)
        return computedNum ? num2ThousandthFormat(computedNum) : "-"
      });
      return suns;
    },
    // 获取订单汇总数据
    getReveiptSumData() {
      this.loading = true
      fetchReveiptSumDataList(this.form).then(res => {
        if (res.data) {
          this.dataAnalysis(res.data);
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    // 初始化数据表头
    initCrudHeader(data){
      let column = [
        {
          label: "客户", prop: "custName", align: "left", overHidden: true, width: "200",
          formatter(row){
            return row.poKind == 2 ? '' : row.custName
          },
        },
        {label: "(kg)", prop: "colTypeName", align: "center", width: "80"},
        {
          label: "总计", prop: "poQtyTol", align: "center", width: "120",
          formatter(row){
            return row.poQtyTol ? num2ThousandthFormat(row.poQtyTol) : '-' ;
          }
        },
      ]
      let dateMap = {};
      for(let date in data){
        if(date == 'null') break;
        let tDates = date.split("-");
        if(!dateMap[tDates[0]]){
          dateMap[tDates[0]] = {
            year: tDates[0],
            months: []
          }
        }
        dateMap[tDates[0]].months.push(tDates[1]);
      }
      let datePropList = Object.values(dateMap);
      let typs = ["月小计",'1-10','11-20','21-月末'];
      let colLen = column.length;
      datePropList.forEach((item, pIdx) => {
        column.push({
          label: item.year,
          children: item.months.map((mItem,mIdx) => {
            return {
              label: mItem,
              align: "left",
              flag: "+",
              renderHeader: (h,row) =>  this.renderHeader(h,row.column,colLen + pIdx, mIdx),
              children: typs.map((tItem,tIndex) => {
                let tProp = `${item.year}-${mItem}-${tIndex + 1}`;
                return {
                  label: tItem,
                  prop: tProp,
                  align: "center",
                  width: "120",
                  hide: false,
                  formatter(row){
                    return row[tProp] ? num2ThousandthFormat(row[tProp]) : "-";
                  }
                }
              })
            }
          })
        })
      });
      this.crudOp.column = column;
    },
    // 自定义表头
    renderHeader(h,column,yIdx, mIdx){
        return h('div',[
          h('span',column.label),
          h('span', {
            on:{
              click:() => {
                this.handleHeaderClick(yIdx,mIdx)
              }
            },
            attrs: {
              class: column.children.length > 1 ? "el-icon-remove-outline" : "el-icon-circle-plus-outline"
            },
            style: {
              marginLeft: '10px',
              cursor: "pointer"
            },
          }, )
        ])
    },
    // 表头按钮点击（收缩功能）
    handleHeaderClick(yIdx,mIdx){
      this.crudOp.column[yIdx].children[mIdx].children.forEach((item,index) => {
        if(index == 0) return;
        item.hide = !item.hide;
      })
    },
    // 数据解析
    dataAnalysis(dataList) {
      // 存储日期
      let showDateMap = {};
      let custNameEnum = {};
      let resMap = dataList.reduce((target, item, index) => {
        showDateMap[item.poDate] = true;
        custNameEnum[item.custName] = index;
         // custName + poKind 
        let prop = `${item.custName}-${item.poKind}`;
        if (!target[prop]) {
          target[prop] = {
            id: index + 1, // 标识
            custName: item.custName,
            colTypeName: item.colTypeName,
            poQtyTol: item.poQtyTol,
            poKind: item.poKind,
          };
        };
        target[prop][`${item.poDate}-${item.typs}`] = item.poQty
        return target;
      }, {});
      // 初始化表头数据
      this.initCrudHeader(showDateMap);
      let resDataList = Object.values(resMap);
      // 数据排序
      // resDataList.sort((a,b) => {
      //   if(a.custName !== b.custName) return custNameEnum[a.custName] < custNameEnum[b.custName] ? -1 : 1
      //   else if(a.poKind !== b.poKind) return a.poKind < b. poKind ? -1 : 1 
      // });
      // 数据排序
      resDataList.sort((a,b) => a.poKind - b.poKind)
      // 将预订数作为订单的子级
      resDataList = Object.values(resDataList.reduce((target,item) => {
        if(!target[item.custName]){
          target[item.custName] = item;
        }else{
          target[item.custName].children = [item]
        }
        return target;
      }, {}))

      this.dataList = resDataList;
    },
    // 打开报表 获取fineReport的数据
    handleOpenRpt() {
      let queryData = {
        module: "PDT",
        id: "PDT_SALRECEIPT"
      }
      fetchFineReportUrl(queryData).then(res => {
        if (res.data) {
          // let url = "http://112.91.115.70:82/webroot/decision/view/report?viewlet=eWDFS%252FPDT%252FPDT_SALRECEIPT.cpt&__bypagesize__=false";
          let url = res.data.url;
          // 参数枚举
          let paramsEnum = {
            "custId": "CUSTID",
            "posDate": "POSDATE",
            "poeDate": "POEDATE"
          }
          for(let key in paramsEnum){
            if(this.form[key]){
              url += `&${paramsEnum[key]}=${this.form[key]}`
            }
          }
          let oA = document.createElement("a");
          oA.href = url;
          oA.target = "_blank";
          oA.click();
        } else {
          warning("报表不存在");
        }
      })
    },
    // 查询
    handleQuery() {
      //   this.form.CUSTNAME = "三盛制衣厂股份有限公司"
      this.getReveiptSumData();
    },
  }

};
</script>
<style lang='stylus'>
#pro-rpt-container {
  .el-table {
    overflow: visible !important;

    .cell-name_gray{
      background-color: #c1c1c1;
      
    }
  }

  .el-tag--mini {
    display: none !important;
  }

  .avue-crud__menu {
    height: 35px !important;
  }

  .avue-dialog .el-drawer__body {
    overflow: auto;
  }
}

.avue-crud__dialog .el-transfer-panel__body {
  height: 80% !important;
}
</style>
