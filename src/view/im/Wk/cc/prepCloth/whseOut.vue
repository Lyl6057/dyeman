<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:19:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-30 14:29:14
-->
<template>
  <div class="whse-in_flat-container" :element-loading-text="loadLabel" v-loading="loading">
    <div class="btnList">
      <el-button type="primary" @click="getDataList">{{ this.$t("public.query") }}</el-button>
      <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
      <el-button type="primary" :disabled="hasNotEdit" @click="handleFinishPrep">完成备布</el-button>
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

    <whse-out-dtl ref="whseOutDtlRef" :whseOutData="curRowSelect" @dtlClose="handleDtlClose" @save-success="handleSaveSuccess" />

  </div>
</template>

<script>
import { crudOp, queryFormOp } from "./data";
import { fetchWhsePreclothSheetByPage, removeWhseInFlatById, fetchFinishPrepCloth} from "./api";
import WhseOutDtl from "./whseOutDtl.vue"
export default {
  name: "whseInFlatCloth",
  components: {
      WhseOutDtl
  },
  data() {
    return {
      loadLabel: "加载中...",
      loading: false,
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      queryFormOp: queryFormOp(this),
      queryForm: {},
      crudOp: crudOp(this),
      crudDataList: [],

      curRowSelect: {},
    };
  },
  computed:{
    hasNotEdit(){
      return this.curRowSelect.preState == 2
    }
  },
  methods: {
    // 完成备布
    handleFinishPrep(){
      let { whsePreclothSheetoid, sheetNo, preState } = this.curRowSelect;
      if(preState == 2) return this.$tip.warning("数据已完成备布，无法操纵")
      this.$tip
        .cofirm(`是否对【${sheetNo}】备布单号进行操作`)
        .then(res => {
          this.loading = true;
          return fetchFinishPrepCloth(whsePreclothSheetoid)
        }).then(res => {
          if(res.data.data == true){
            this.$tip.success(res.data.msg)
            this.getDataList();
          }else{
            this.$tip.error(res.data.msg)
          }
        }).finally(() => {
          this.loading = false;
        })
    },
    //  关闭
    handleClose(){
        document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },

    //   确认抽取回调
    initAndExtractData(row){
        this.curRowSelect = row;
        this.$refs.whseOutDtlRef.extractDataByWeave(row);
    },
    // 明细关闭回调
    handleDtlClose(hasRefresh){
        hasRefresh && this.getDataList();
    },
    // 明细新增保存后
    handleSaveSuccess(){
      this.$emit("refresh-unCreate");
    },
    handleRowDBLClick(row) {
      this.curRowSelect = row;
      this.handleUpdate();
    },
    handleCellClick(row) {
      this.curRowSelect = row;
    },
    //  删除
    handleDelete() {
      let { whseFlatClothInoid, whseInNo, stockState } = this.curRowSelect;
      if(stockState == 2) return this.$tip.warning("数据已审核，无法操纵")
      this.$tip
        .cofirm(`是否确认删除【${whseInNo}】数据`)
        .then(res => {
          this.loading = true;
          removeWhseInFlatById(whseFlatClothInoid)
            .then(res => {
              if (res.data.code == 200) {
                this.$tip.success("删除成功");
                this.getDataList();
                this.$emit("refresh-unCreate")
              }else{
              }
            })
            .finally(() => {
              this.loading = false;
            });
        });
    },
    //  修改
    handleUpdate() {
      this.$refs.whseOutDtlRef.visible = true;
    },
    handleQuery(){
      this.page.currentPage = 1;
      this.getDataList();
    },

    getDataList() {
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        stockState: this.queryForm.stockState,
        whseInType: "1",
        dataSortRules: "workDate|desc,vatNo"
      };
      let props = ["weaveJobCode", "sheetNo", "vatNo",'preState'];
      props.forEach(key => {
        if(this.queryForm[key]){
          params[key] = '%' + this.queryForm[key]
        }
      })
      let whseInDate = this.queryForm.whseInDate
      if(whseInDate && whseInDate.length == 2){
          params.whseInDate_begin = whseInDate[0];
          params.whseInDate_end = whseInDate[1];
      }
      this.loading = true;
      fetchWhsePreclothSheetByPage(params)
        .then(res => {
          this.page.total = res.data.total;
          this.crudDataList = res.data.records;
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    
  }
};
</script>
<style lang="stylus">
  .whse-in_flat-container{
    .avue-crud__menu{
      display: none !important
    }
  }
</style>