<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:19:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-19 13:33:34
-->
<template>
  <div id="return-yarns-notice-container">
    <view-container title="退纱通知单" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="handleAdd">{{ this.$t("public.add") }}</el-button>
        <el-button type="success" @click="handleUpdate">{{ this.$t("public.update") }}</el-button>
        <el-button type="danger" :disabled="hasNotEdit" @click="handleDelete">{{ this.$t("public.del") }}</el-button>
        <el-button type="primary" @click="getDataList">{{ this.$t("public.query") }}</el-button>
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
          @row-click="handleCellClick"
          :cell-style="handleCellStyle"
        ></avue-crud>
      </div>
    </view-container>

    <!-- 明细 -->
    <el-dialog :visible.sync="dltDialogVisible" fullscreen append-to-body>
      <with-drawal-dtl
        ref="withDrawalDtlRef"
        :withDatalData="withDatalData"
        @dtlClose="handleDtlClose"
      ></with-drawal-dtl>
    </el-dialog>
  </div>
</template>

<script>
import { crudOp, queryFormOp } from "./data";
import { fetchWithDrawalListByPage, removeWithDrawalById } from "./api";
import WithDrawalDtl from "./withDrawalDtl.vue";
export default {
  name: "returnYarnsNotice",
  components: {
    "with-drawal-dtl": WithDrawalDtl
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
      form: {},
      crudOp: crudOp(this),
      crudDataList: [],

      withDatalData: {},
      curRowSelect: {},
      dltDialogVisible: false
    };
  },
  computed:{
    hasNotEdit(){
      return this.curRowSelect.isInStock
    }
  },
  methods: {
    handleCellStyle({row,column}){
      if(column.property == 'isInStock'){
        return {
          fontWeight: "bolder",
          color: row.isInStock ? "green" : "red"
        }
      }
    },
    //   关闭
    handleDtlClose(hasRefresh){
        this.dltDialogVisible = false;
        hasRefresh && this.getDataList();
    },
    //  删除
    handleDelete() {
      let { proYarnsWithdrawaloid, withdrawalNo } = this.curRowSelect;
      this.$tip
        .cofirm(`是否确认删除【${withdrawalNo}】退纱通知单数据`)
        .then(res => {
          this.loading = true;
          removeWithDrawalById(proYarnsWithdrawaloid)
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
    //  修改
    handleUpdate() {
      this.withDatalData = this.curRowSelect;
      this.dltDialogVisible = true;
    },
    async handleAdd() {
      this.withDatalData = {};
      this.dltDialogVisible = true;
      //   await this.$nextTick();
      //   this.$refs.withDrawalDtlRef.initData();
    },
    getDataList() {
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        withdrawalNo: "%" + (this.form.withdrawalNo || ""),
        happenDate: this.form.happenDate,
        weaveJobCode: "%" + (this.form.weaveJobCode || ""),
        typeOf: this.form.typeOf
      };
      this.loading = true;
      fetchWithDrawalListByPage(params)
        .then(res => {
          this.page.total = res.data.total;
          this.crudDataList = res.data.records;
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    handleRowDBLClick(row) {
      this.withDatalData = row;
      this.dltDialogVisible = true;
    },
    handleCellClick(row) {
      this.curRowSelect = row;
    }
  }
};
</script>