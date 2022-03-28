<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-26 09:57:57
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-03-28 15:40:50
-->
<template>
  <div id="ityInventoryList">
    <view-container
      title="盘点清单"
      :element-loading-text="loadLabel"
      v-loading="loading"
    >
      <div class="btnList">
        <el-button type="success" :disabled="hasOperate" @click="handleEdit">{{
          this.$t("public.update")
        }}</el-button>
        <el-button type="primary" @click="getDataList">{{
          this.$t("public.query")
        }}</el-button>
        <el-button
          type="primary"
          :disabled="hasOperate"
          @click="handleExport"
          >导出</el-button
        >
        <el-button
          type="primary"
          :disabled="hasOperate"
          @click="handleStartCount"
          >启动盘点</el-button
        >
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
      <el-dialog title="编辑" :visible.sync="dialogVisible" append-to-body width="600px" :close-on-click-modal="false" v-loading='dialogLoading' >
           <div class="btnList">
        <el-button type="success" @click="handleSave">{{
          this.$t("public.save")
        }}</el-button>
         <el-button type="warning" @click="handleCloseDialog">{{
          this.$t("public.close")
        }}</el-button>
       
      </div>
          <avue-form ref="editForm" :option="editFormOp" v-model="editFormData"></avue-form>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import {
    fetchInvSnapDataByPage,
    fetchUpdateInvSnapData,
    fetchFineReportUrl
} from "./api";
import { queryFormOp, crudOp, editFormOp } from "./data";
export default {
  name: "",
  components: {},
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
      queryFormOp: queryFormOp(this),
      form: {},
      crudOp: crudOp(this),
      crudDataList: [],
      editFormData: {},
      editFormOp: editFormOp(this),
      chooseData: {},
      dialogLoading: false,
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
    // 导出
    handleExport(){
        let { materialClass, inventoryNo  } = this.chooseData;
        let parmas = {
            module: "WHSE",
            id: "WHSE_INVENTORY_#",
        }
        fetchFineReportUrl(parmas).then(res => {
            let url = res.data.url;
            let type = materialClass.toLocaleLowerCase();
            url = url.replace("###",type);
            url += `&inventory_no=${inventoryNo}`;
            let oA = document.createElement('a');
            oA.target = "_blank";
            oA.href = url;
            oA.click();
        })
    },
    // 启动盘点
    handleStartCount(){
        let { inventoryDate, inventoryType } = this.chooseData;
        if(!inventoryDate) return this.$tip.warning("未填入盘点日期");
        if(!inventoryType) return this.$tip.warning("未填入盘点类型");
        let data = Object.assign({}, this.chooseData,{inventoryState: "2"});
        this.loading = true;
        fetchUpdateInvSnapData(data).then(res => {
            if(res.data.code == 200){
                this.$tip.success(res.data.msg);
                this.getDataList();
            }else{
                this.$tip.error(res.data.msg)
            }
        }).finally(_ => {
            this.loading = false;
        })
    },
    // 获取数据
    getDataList() {
      this.loading = true ;
      let params = Object.assign({
          rows: this.page.pageSize,
          start: this.page.currentPage,
      },this.form)
      fetchInvSnapDataByPage(params).then(res => {
          this.page.total = res.data.total;
          this.crudDataList = res.data.records
      }).finally(_ => {
          this.loading = false;
      })
    },
    // 保存
    handleSave(){
        console.log("data save", this.editFormData)
        this.dialogLoading = true;
        fetchUpdateInvSnapData(this.editFormData).then(res => {
            console.log("data res", res)
            if(res.data.code == 200){
                this.dialogVisible = false;
                this.$tip.success(res.data.msg);
                this.page.currentPage = 1;
                this.getDataList();
            }else{
                this.$tip.error(res.data.msg)
            }
        }).finally(_ => {
            this.dialogLoading = false;
        })
    },
    // 关闭
    handleCloseDialog(){
        this.dialogVisible = false;
    },
    // 编辑
    handleEdit(){
        this.handleRowDBLClick();
    },
    handleRowDBLClick(val) {
      this.editFormData = this.chooseData;
      this.dialogVisible = true;
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