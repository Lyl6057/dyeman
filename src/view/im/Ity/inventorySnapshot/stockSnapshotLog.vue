<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 10:53:56
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-30 14:48:23
-->
<template>
  <div id="ityInventoryList">
      <div class="btnList">
        <el-button type="primary" @click="getDataList">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="success" :disabled="hasOperate" @click="handleExport" >导出</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="queryFormOp" v-model="form"></avue-form>
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
          @row-click="cellClick"
        ></avue-crud>
      </div>
      <el-dialog :fullscreen='true' :visible.sync="dtlDialogVisible" :append-to-body="true" width="100%" :close-on-click-modal="false">
        <inv-dtl v-if='dtlDialogVisible' :hasOperate="false" ref="invDtlRef" @closeDialog='handleDtlCloseDialog' ></inv-dtl>
      </el-dialog>
  </div>
</template>
<script>
import {
    fetchInvSnapDataByPage,
    fetchUpdateInvSnapData,
    fetchFineReportUrl
} from "./api";
import { queryFormOp_log, crudOp_log } from "./data";
import InvDtl from "./InvDtl.vue"
export default {
  name: "",
  components: {
    "inv-dtl":InvDtl,
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      loadLabel: "拼命加载中",
      page: {
        pageSizes: [50, 100, 200, 500, 1000],
        pageSize: 200,
        currentPage: 1,
        total: 0,
      },
      queryFormOp: queryFormOp_log(this),
      form: {},
      crudOp: crudOp_log(this),
      crudDataList: [],
      editFormData: {},
      chooseData: {},
      dialogLoading: false,

      // 明细弹窗
      dtlDialogVisible: false,

    };
  },
  computed:{
      hasOperate(){
          return !this.chooseData.whseInventoryoid;
      }
  },
  created() {},
  updated() {
    if (this.crud && this.crud.length) {
      this.$nextTick(() => {
        this.$refs["crud"].doLayout();
      });
    }
  },
  methods: {
    handleDtlCloseDialog(isRefresh){
      this.dtlDialogVisible = false
      isRefresh && this.getDataList();
    },
    // 盘点明细录入
    async handeInvDtlEdit(){
      this.dtlDialogVisible = true;
      await this.$nextTick();
      this.$refs.invDtlRef.optionInit(this.chooseData);
    },
    // 导出
    handleExport(status){
        let { materialClass, inventoryNo  } = this.chooseData;
        let parmas = {
            module: "WHSE",
            id: "WHSE_INVENTORY_#",
        }
        fetchFineReportUrl(parmas).then(res => {
            let url = res.data.url;
            let type = materialClass.toLocaleLowerCase();
            if(status === 1){
              type += "_end"
            }
            url = url.replace("###",type);
            url += `&inventory_no=${inventoryNo}`;
            url += `&type=1`
            let oA = document.createElement('a');
            oA.target = "_blank";
            oA.href = url;
            oA.click();
        })
    },
    // 获取数据
    getDataList() {
      this.loading = true ;
      let params = Object.assign({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          snapshotType: 1,
      },this.form)
      fetchInvSnapDataByPage(params).then(res => {
          this.page.total = res.data.total;
          this.crudDataList = res.data.records
      }).finally(_ => {
          this.loading = false;
      })
    },
    
    // 关闭
    handleCloseDialog(){
        this.dialogVisible = false;
    },
    
    handleRowDBLClick(val) {
      this.handeInvDtlEdit();
    },
    cellClick(row) {
      this.chooseData = row;
    },

  },
  
};
</script>
<style lang='stylus'>
#ityInventoryList
  .el-table__placeholder
    display none
  .el-dialog
    margin-top 0 !important
    height 100%
    margin 0 !important
    // background-color: rgb(2, 26, 60);
    overflow hidden !important
</style>