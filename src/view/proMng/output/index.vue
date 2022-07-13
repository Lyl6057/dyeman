<!--
 * @Author: Lyl
 * @Date: 2021-04-23 08:32:22
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-12 17:37:23
 * @Description: 
-->
<template>
  <div id="prowovenOutput" v-loading="loading" :element-loading-text="$t('public.loading')" >
    <view-container title="生产日产量">
      <el-form class="form-wrapper" :model="queryParams" inline size="medium">
        <el-form-item label="统计月份">
          <el-date-picker  v-model="queryParams.searchMonth" value-format="yyyy-MM"  type="month" placeholder="选择月"> </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery" > {{$t("public.query")}}</el-button>
          <el-button type="primary" @click="handleExport" > 报表</el-button>
        </el-form-item>
      </el-form>
     
      <div class="crudBox">
        <el-row>
          <el-col :span="24">
            <avue-crud
              ref="crud"
              :option="crudOp"
              :data="crudData"
              :page.sync="page"
              @on-load="getDataList"
            ></avue-crud>
          </el-col>
        </el-row>
      </div>
    </view-container>
    
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { fetchDayOutputData } from "./api";
import { fetchFineReportUrl } from "@/config/index"
export default {
  name: "prowovenOutput",
  components: {
  },
  data() {
    return {
      queryParams: {
        searchMonth: "",
      },
      crudOp: mainCrud(this),
      crudData: [],
      loading: false,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
    };
  },
  watch: {
    "queryParams.searchMonth":{
      handler(value){
        this.setCrudColProp(value);
      },
      immediate: false,
    }
  },
  methods: {
    // 导出报表
    handleExport(){
      let exportMonth = this.queryParams.searchMonth;
      let beginDate = exportMonth + "-01";
      let [ y, m, day ] = this.getSelMonthDate(beginDate);
      let timer = new Date(beginDate).getTime() + (day * 24 * 60 * 60 * 1000);
      let endDate = new Date(timer);
      console.log("end date",beginDate,timer, endDate)
      endDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-01`

      let queryData = {
        module: "PRO",
        id: "PRO_DAY_OUTPUT",
      };
      fetchFineReportUrl(queryData).then(res => {
        if (res.data) {
          let url = res.data.url;
          // 参数枚举
          url += "&exportMonth=" + exportMonth;
          url += "&beginDate=" + beginDate;
          url += "&endDate=" + endDate;
       
          let oA = document.createElement("a");
          oA.href = url;
          oA.target = "_blank";
          oA.click();
        } else {
          warning("报表不存在");
        }
      })
    },
    // 初始化
    async init(){
      await this.$nextTick();
      let [year, month] = this.getSelMonthDate();
      this.queryParams.searchMonth = `${year}-${month}`
      this.getDataList();
    },
    // 赋值表格配置参数
    setCrudColProp(date){
      let [year,month,day] = this.getSelMonthDate(date);
      let {column, sumColumnList} = mainCrud(this);
      month = ('0' + month).slice(-2)
      new Array(day).fill(1).forEach((_,index) => {
        let day = ("0" + (index + 1)).slice(-2)
        let prop =  `${year}-${month}-${day}`;
        column.push({
          label: `${month}/${day}`,
          prop: prop,
          align: "right",
          formatter(r,v){
            return v && Number(v).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g,",");
          }
        });
        // 合计
        sumColumnList.push({
          name: prop,
          type: "sum",
          label: " ",
        })
      })

      this.crudOp.sumColumnList = sumColumnList;
      this.crudOp.column = column;
      this.getDataList();
     
    },
    // 计算当前月份有多少天
    getSelMonthDate(date){
      let now = date ? new Date(date) : new Date();
      let year = now.getFullYear(),
          month = now.getMonth() + 1;
      let day = new Date(year,month,0).getDate();
      return [year,month, day]
    },
    // 查询
    handleQuery(){
      this.getDataList();
    },
    // 
    getDataList(){
      this.loading = true;
      let params = {
        month: this.queryParams.searchMonth
      }
      fetchDayOutputData(params).then(res => {
        let tData = {};
        res.data.forEach(item => {
          if(!tData[item.weaveJobCode]){
            tData[item.weaveJobCode] = {
              weaveJobCode: item.weaveJobCode,
              subSum: 0
            };
          }
          tData[item.weaveJobCode][item.outputDate] = item.weight;
          tData[item.weaveJobCode].subSum += +item.weight || 0
        });
        let targetData = Object.values(tData).map((item,index) => {
          item.index = index + 1;
          return item;
        });
        // targetData.sort((a,b) => a.weaveJobCode - b.weaveJobCode); 
        this.crudData = targetData;
        
      }).finally(() => {
        this.$nextTick(() => {
          this.$refs.crud && this.$refs.crud.doLayout();
        });
        this.loading = false;
      })
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.form-wrapper{
  display flex;
  justify-content flex-start;
  padding 10px 0 0 15px
}
</style>