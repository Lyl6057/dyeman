<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 10:53:56
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-07 14:39:58
-->
<template>
  <div id="ityInventoryList">
      <div class="btnList">
        <el-button type="success" :disabled="hasOperate" @click="handleEdit">{{
          this.$t("public.update")
        }}</el-button>
        <el-button type="primary" @click="getDataList">{{
          this.$t("public.query")
        }}</el-button>
        <el-dropdown>
        <span class="el-dropdown-link">
          <el-button type="primary" >导出<i class="el-icon-arrow-down el-icon--right"></i></el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><el-button type="success" :disabled="hasOperate" @click="handleExport(0)" >导出盘点清单</el-button></el-dropdown-item>
          <el-dropdown-item></el-dropdown-item>
          <el-dropdown-item><el-button type="danger" :disabled="hasOperate" @click="handleExport(1)" >导出盈亏清单</el-button></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        
        <el-button
          type="primary"
          :disabled="hasOperate"
          @click="handleStartCount"
          >启动盘点</el-button
        >
        <el-button
          type="warning"
          :disabled="hasOperate"
          @click="handeInvDtlEdit"
          >盘点明细录入</el-button
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
      <el-dialog :fullscreen='true' :visible.sync="dtlDialogVisible" :append-to-body="true" width="100%" :close-on-click-modal="false">
        <inv-dtl v-if='dtlDialogVisible' ref="invDtlRef" @closeDialog='handleDtlCloseDialog' snapshotType="0" ></inv-dtl>
      </el-dialog>
  </div>
</template>
<script>
import {
    fetchInvSnapDataByPage,
    fetchUpdateInvSnapData,
    fetchFineReportUrl
} from "./api";
import { queryFormOp, crudOp, editFormOp } from "./data";
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
      queryFormOp: queryFormOp(this),
      form: {},
      crudOp: crudOp(this),
      crudDataList: [],
      editFormData: {},
      editFormOp: editFormOp(this),
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
            url += `&type=0`
            let oA = document.createElement('a');
            oA.target = "_blank";
            oA.href = url;
            oA.click();
        })
    },
    // 启动盘点
    async handleStartCount(){
        let { inventoryDate, inventoryType, inventoryState } = this.chooseData;
        if(!inventoryDate) return this.$tip.warning("未填入盘点日期");
        if(!inventoryType) return this.$tip.warning("未填入盘点类型");
        if(inventoryState == 4){
          let isContinue = await this.$tip.cofirm("该数据已盘点结束，是否确认重新开启~").then(_ => true).catch(_ => false);
          if(!isContinue) return;
        }
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
          snapshotType: 0,
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
       this.editFormData = this.chooseData;
        this.dialogVisible = true;
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