<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:23
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-15 10:41:21
-->
<template>
  <div id="return-yarn-in-container">
    <div class="btnList">
      <el-button type="danger" @click="handleDelete" :disabled="hasEdit">{{ this.$t("public.del") }}</el-button>
      <el-button type="success" @click="handleExamine" :disabled="hasEdit">审核</el-button>
      <el-button type="primary" @click="getDataList">{{ this.$t("public.query") }}</el-button>
      <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
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
import {  whseInCrudOp, whseInFormOp } from "./data"
import { fetchWhseYarnInDataListByPage,removeWhseYarnInData,updateWhseYarnInData } from "./api"
export default {
  name: "returnYarnIn",
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
      queryFormOp:whseInFormOp(this),
      queryForm:{},
      crudOp:whseInCrudOp(this),
      crudDataList:[],
      curSelectRow: {},
    };
  },
  computed:{
      hasEdit(){
          return this.curSelectRow.stockState != "0";
          // return false;
      }
  },
  methods: {
    getDataList() {
      this.loading = true;
      let { yinId, registerNo, yinDate } = this.queryForm;
      let params = {
        page: this.page.currentPage,
        rows: this.page.pageSize,
        yinType: this.imWkType, // 4 本厂 | 5 外厂
        yinId: "%" + (yinId || ""),
        registerNo: "%" + (registerNo || "")
      };
      if(yinDate && yinDate.length == 2){
        Object.assign(params,{
          yinSDate: yinDate[0],
          yinEDate: yinDate[1]
        })
      }
      fetchWhseYarnInDataListByPage(params).then(res => {
        this.page.total = res.data.total;
        this.crudDataList = res.data.records.map(item => {
          item.finStatus = item.finStatus.toString();
          return item
        });
      }).finally(() => {
        this.loading = false;
      })
    },
    async handleDelete(){
      let {whseYarninoid, yinId} = this.curSelectRow;
      if(!whseYarninoid) return this.$tip.warning("请选择数据");
      this.loading = true;
      let isComfirn = await this.$tip.cofirm(`是否确认删除编号【${yinId}】的数据`).then(res => true).catch(err => false);
      if(!isComfirn) return false;
      removeWhseYarnInData({id:whseYarninoid}).then(res => {
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
    // 审核
    handleExamine(){
      let row = this.curSelectRow || {};
      if(!row.whseYarninoid) return this.$tip.warning("请选择数据");
      let whseYarninData = Object.assign({},row,{stockState: "1"});
      this.loading = true;
      updateWhseYarnInData(whseYarninData).then(res => {
        this.$tip.success("审核成功");
        this.getDataList();
      }).finally(() => {
        this.loading = false;
      });
    },
    // 关闭
    handleClose(){
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    }
  }
};
</script>
<style lang="stylus">
  #return-yarn-in-container{
    .avue-crud__menu {
      min-height: 5px !important;
      height: 5px !important;
    }
  }

</style>