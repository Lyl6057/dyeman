<!--
 * @Author: Symbol_Yang
 * @Date: 2022-06-14 10:25:49
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-15 15:35:04
 * @Description:
-->
<template>
  <div
    id="pro-weave-job-summary-container"
    :element-loading-text="$t('public.loading')"
    v-loading="wloading"
  >
    <view-container title="织单用纱汇总表">
      <el-row class="btnList">
        <el-button type="primary" @click="handleQuery">{{
          this.$t("public.query")
        }}</el-button>
         <el-button type="primary" @click="handleExport">导出</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crudDataList"
          :page.sync="page"
          v-loading="loading"
          @on-load="handleQuery"
        >
        </avue-crud>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import {fetchFineReportUrl, fetchProBleadyeRunJobByPage } from "./api";
export default {
  name: "pro-weave-job-summary-container",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crudDataList: [],
      page: {
        currentPage: 1,
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      wloading: false,
      loading: false,
      serachLoading: false,
      options: [],
    };
  },
  watch: {},
  methods: {
    // 导出
    handleExport(){
      let queryData = {
        module: "PRO",
        id: "PRO_WEAVE_JOB_YARN",
      };
      fetchFineReportUrl(queryData).then((res) => {
        if (res.data) {
          let url = res.data.url;
          // 参数枚举
          let paramsKeys = ['weaveJobCode','salPoNo','yarnName','factoryYarnBatch'];
          paramsKeys.forEach(key => {
            url += `&${key}=${this.form[key]}`;
          })
          
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
    handleQuery(){
      this.loading = true ;
      let formData = this.formOp.column.reduce((a,b) => {
        let value = this.form[b.prop]
        if(value){
          a[b.prop] = "%" + value
        }
        return a;
      }, {})
      let params = Object.assign({
          rows: this.page.pageSize,
          start: this.page.currentPage,
      },formData)
      
      fetchProBleadyeRunJobByPage(params).then(res => {
          this.page.total = res.data.total;
          this.crudDataList = res.data.records
      }).finally(_ => {
          this.loading = false;
      })
    },
    
  },
};
</script>
<style lang='stylus'>
#clothFlyWeight
  .el-table
    overflow visible !important
  .el-tag--mini
    display none !important
#normal_Dlg
  .el-dialog__header
    padding 20px !important
    text-align center
  .el-dialog__body
    padding 10px !important
    text-align center
</style>
