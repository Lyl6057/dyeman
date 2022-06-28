<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-28 10:34:58
 * @Description:
-->
<template>
  <div
    id="qcDeatilReport"
    :element-loading-text="$t('public.loading')"
    v-loading="wloading"
  >
    <view-container title="运转单备布统计">
      <el-row class="btnList">
        <el-button type="primary" @click="handleQuery">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="handleExport">导出</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="queryParams"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crudDataList"
          :page.sync="page"
          v-loading="loading"
          @on-load="handleLoadData"
        >
        </avue-crud>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { fetchProBleadyeRunJobByPage, fetchFineReportUrl } from "./api";
export default {
  name: "qcDeatilReport",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      queryParams: {},
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
        id: "PRO_BLEADYE_RUN_SUMMARY",
      };
      fetchFineReportUrl(queryData).then((res) => {
        if (res.data) {
          let url = res.data.url;
          // 参数枚举
          let workDate = this.queryParams.workDate
          if(workDate && workDate.length == 2){
            url += `&workDate_begin=${workDate[0]}`;
            url += `&workDate_end=${workDate[1]}`;
          }
          
          // let paramsKeys = ['vatNo','weaveJobCode','salPoNo'];
          // paramsKeys.forEach(key => {
          //   url += `&${key}=${this.queryParams[key]}`;
          // })
          
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
      this.page.currentPage = 1;
      this.handleLoadData();
    },
    // 获取数据
    handleLoadData(){
      this.loading = true ;
     
      let params = {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          includeDtlCount: true,
          includeDtl: true,
          dataSortRules: "workDate|desc,vatNo|desc,weaveJobCode|desc"
      };
      let workDate = this.queryParams.workDate
      if(workDate && workDate.length == 2){
        params.workDate_begin = workDate[0];
        params.workDate_end = workDate[1];
      }
      
      fetchProBleadyeRunJobByPage(params).then(res => {
          this.page.total = res.data.total;
          
          this.crudDataList = res.data.records.map((item,index) => {
            if(item.children){
              item.id = index + 1;
              item.children.sort((a,b) => a.sn - b.sn).forEach((cItem,cIndex) => {
                cItem.id = `${index}-${cIndex}`;
                cItem.pidCount = cItem.sn
                // 属性值替换
                cItem.preCalicoWeight = cItem.clothWeight;
                cItem.clothWeight = ''
              })
            };
            return item;
          })
      }).finally(_ => {
          this.loading = false;
      })
    },
  },
  updated(){
    if(this.crudDataList && this.crudDataList.length){
      this.$nextTick(() => {
        this.$refs["crud"].doLayout();
        });
    }
  }
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
