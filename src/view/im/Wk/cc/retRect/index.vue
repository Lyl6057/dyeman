<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 09:03:40
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-13 10:04:28
-->
<template>
  <div id="ret-reat-container">
    <view-container title="退供应商纱出仓" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="handleAdd">{{ this.$t("public.add") }}</el-button>
        <el-button type="success" @click="handleUpdate" :disabled="hasEdit" >{{ this.$t("public.update") }}</el-button>
        <el-button type="danger" @click="handleDelete" :disabled="hasEdit">{{ this.$t("public.del") }}</el-button>
        <el-button type="primary" @click="getDataList">{{ this.$t("public.query") }}</el-button>
        <el-button type="success" @click="handleExamine" :disabled="hasEdit" >审核</el-button>
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
    </view-container>

    <!-- 明细 -->
    <el-dialog :visible.sync="dltDialogVisible" fullscreen append-to-body>
      <component
        ref="dtlRef"
        :is="targetData"
        @selected="handlePurReturnMemoSelect"
        @close="handleDtlClose"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import { crudOp, queryFormOp } from "./data";
import { fetchRetRectDataByPage, removeRetRectById, updateRetRectData } from "./api";
import RetRectDtl from "./retRectDtl.vue";
import PurReturnMemo from "./purReturnMemo.vue";
export default {
  name: "returnYarnsNotice",
  components: {
    "ret-rect-dtl": RetRectDtl,
    "pur-return-meno": PurReturnMemo
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
      dltDialogVisible: false,

      targetData: PurReturnMemo
    };
  },
  computed:{
    hasEdit(){
      let {whseRetreatoid, retState} = this.curRowSelect;
      return !Boolean(whseRetreatoid) || retState == '1'
    }
  },
  methods: {
    // 关闭
    handleClose(){
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    // 审核
    async handleExamine(){
      if(!this.curRowSelect.whseRetreatoid) return this.$tip.warning("请选择数据");
      let isComfirm =  await this.$tip.cofirm(`是否确认审核出仓编号为【${this.curRowSelect.retCode}】的数据项`).then(res => true).catch(err => false);
      if(!isComfirm) return ;
      let retReatData = Object.assign(this.curRowSelect,{retState: "1"});
      this.loading = true;
      updateRetRectData(retReatData).then(res => {
          this.$tip.success("审核成功");
          this.page.currentPage = 1;
          this.getDataList();
      }).finally(() => {
        this.loading = false;
      })
      
    },
    // 选中回调
    async handlePurReturnMemoSelect(remeoNo){
        this.targetData = RetRectDtl;
        this.dltDialogVisible = true;
        await this.$nextTick();
        this.$refs.dtlRef.initData(remeoNo)
    },
    //   关闭
    handleDtlClose(hasRefresh) {
      this.dltDialogVisible = false;
      hasRefresh && this.getDataList();
    },
    //  删除
    handleDelete() {
      let { whseRetreatoid, retCode } = this.curRowSelect;
      if(!whseRetreatoid) return this.$tip.warning("请选择数据")
      this.$tip
        .cofirm(`是否确认删除【${retCode}】退纱通知单数据`)
        .then(res => {
          this.loading = true;
          removeRetRectById(whseRetreatoid)
            .then(res => {
              if (res.data.code == 200) {
                this.$tip.success("删除成功");
                this.getDataList();
              }
            })
            .finally(() => {
              this.loading = false;
            });
        });
    },
    handleRowDBLClick(row) {
      this.handleUpdate();
    },
    handleCellClick(row) {
      this.curRowSelect = row;
    },
    //  修改
    async handleUpdate() {
      this.targetData = RetRectDtl;
      this.dltDialogVisible = true;
      await this.$nextTick();
      this.$refs.dtlRef.setRetReatData(this.curRowSelect)
    },
    // 新增
    async handleAdd() {
      this.targetData = PurReturnMemo;
      this.dltDialogVisible = true;
    },
    getDataList() {
      let {retMemo, retState,retCode,retDate} = this.queryForm;
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        retMemo: "%" + (retMemo || ""),
        retState: retState,
        retCode: "%" + (retCode || ""),
      };
      if(retDate && retDate.length == 2 ){
        params.retSDate = retDate[0];
        params.retEDate = retDate[1];
      }
      this.loading = true;
      fetchRetRectDataByPage(params)
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