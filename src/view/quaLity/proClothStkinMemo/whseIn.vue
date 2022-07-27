<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:23
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-27 10:45:38
-->
<template>
  <div id="stkin-memo-container">
    <div class="btnList">
      <el-button type="danger" @click="handleDelete" :disabled="hasEdit">{{ this.$t("public.del") }}</el-button>
      <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
      <el-button type="primary" @click="handleExport">报表</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
    </div>
    <div class="crudBox">
      <avue-crud
        ref="crud"
        :option="crudOp"
        :data="crudDataList"
        :page.sync="page"
        v-loading="loading"
        @on-load="getDataList"
        @row-dblclick="handleRowDBLClick"
        @row-click="handleCellClick"
      ></avue-crud>
    </div>
  </div>
</template>
<script>
import {  stkinMemoCrudOp, stkinMemoQueryFormOp } from "./data"
import { fetchProClothStkinMemeByPage, delterStkinMemoData } from "./api"
import { fetchFineReportUrl } from "@/config/index"
export default {
  name: "stkinMemo",
  props:{
    imWkType:{
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      loading: false,
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      queryFormOp:stkinMemoQueryFormOp(this),
      queryForm:{},
      crudOp:stkinMemoCrudOp(this),
      crudDataList:[],
      curSelectRow: {},
    };
  },
  computed:{
      hasEdit(){
          return Boolean(this.curSelectRow.yinDate);
      }
  },
  methods: {
    // 导出报表
    handleExport(){
      let { proClothStkinMemooid }  = this.curSelectRow;
      if(!proClothStkinMemooid) return  this.$tip.warning("请选择通知单");
      let queryData = {
        module: "PRO",
        id: "PRO_STKIN_MEMO",
      };
      fetchFineReportUrl(queryData).then(res => {
        if (res.data) {
          let url = res.data.url;
          // 参数枚举
          url += "&stkinOid=" + proClothStkinMemooid
       
          let oA = document.createElement("a");
          oA.href = url;
          oA.target = "_blank";
          oA.click();
        } else {
          warning("报表不存在");
        }
      })

    },
    handleQuery(){
      this.page.currentPage = 1;
      this.getDataList()
    },
    getDataList() {
      this.loading = true;
      let { memoDate } = this.queryForm;
      let params = {
        start: this.page.currentPage,
        rows: this.page.pageSize,
        // dataSortRules: "memoDate|desc,memoNo|desc"
        dataSortRules: "sysCreated|desc"
      };
      if(memoDate && memoDate.length == 2){
        Object.assign(params,{
          memoDate_begin: memoDate[0],
          memoDate_end: memoDate[1]
        })
      }
      fetchProClothStkinMemeByPage(params).then(res => {
        this.page.total = res.data.total;
        this.crudDataList = res.data.records;
      }).finally(() => {
        this.loading = false;
      })
    },
    async handleDelete(){
      let {proClothStkinMemooid, memoNo} = this.curSelectRow;
      if(!proClothStkinMemooid) return this.$tip.warning("请选择数据");
      this.loading = true;
      let isComfirn = await this.$tip.cofirm(`是否确认删除编号【${memoNo}】的数据`).then(res => true).catch(err => false);
      if(!isComfirn) return false;
      delterStkinMemoData({id:proClothStkinMemooid}).then(res => {
        this.$tip.success("删除成功");
        this.getDataList();
      }).finally(() => {
        this.loading = false
      })
    },
    handleRowDBLClick(row) {
      this.$emit("click-row",row)
    },
    handleCellClick(row) {
      this.curSelectRow = row;
    },

  }
};
</script>
<style lang="stylus">
  #stkin-memo-container{
    .avue-crud__menu {
      min-height: 5px !important;
      height: 5px !important;
    }
  }

</style>