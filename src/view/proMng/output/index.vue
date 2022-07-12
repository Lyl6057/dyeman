<!--
 * @Author: Lyl
 * @Date: 2021-04-23 08:32:22
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-12 09:38:13
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
import { get } from "./api";
import { getYearAndMonthAndDay, getDay } from "@/config/util";
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
      immediate: true,
    }
  },
  methods: {
    // 赋值表格配置参数
    setCrudColProp(date){
      let [month,day] = this.getSelMonthDate(date);
      let column = mainCrud(this).column;
      new Array(day).fill(1).forEach((_,index) => {
        column.push({
          label: `${month}/${("0" + (index + 1)).slice(-2)}`,
          prop: (index + 1).toString()
        })
      })
      this.crudOp.column = column;
    },
    // 计算当前月份有多少天
    getSelMonthDate(date){
      let now = date ? new Date(date) : new Date();
      let year = now.getFullYear(),
          month = now.getMonth() + 1;
      let day = new Date(year,month,0).getDate();
      return [month, day]
    },
    // 查询
    handleQuery(){},
    // 
    getDataList(){

    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.queryParams.searchMonth = new Date();
    });
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