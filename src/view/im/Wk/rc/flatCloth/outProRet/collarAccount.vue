<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-08-08 17:19:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-11 09:52:58
-->
<template>
  <div class="in-whse_collar-account-container" :element-loading-text="loadLabel" v-loading="loading">
    <div class="btnList">
      <el-button type="success" @click="handleConfirmSelect">选择</el-button>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="queryFormOp" v-model="form"></avue-form>
    </div>
    <div class="crudBox">
      <avue-crud
        ref="crudRef"
        :option="crudOp"
        :data="crudDataList"
        :page.sync="page"
        v-loading="loading"
        @on-load="getDataList"
        @row-dblclick="handleRowDBLClick"
        @select="handleSelect"
        @select-all="handleSelectAll"
      ></avue-crud>
    </div>
  </div>
</template>

<script>
import { unCreateCrudOp, unCreateQueryFormOp } from "./data";
import { fetchProCollarAccDataByPage} from "./api";
export default {
  name: "fcCollarAccount",
  components: {
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
      queryFormOp: unCreateQueryFormOp(this),
      form: {},
      crudOp: unCreateCrudOp(this),
      crudDataList: [],

      // 选中Row
      curSelRow: null,
    };
  },
  methods: {
    // 关闭
    handleClose(){
        document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    // 选择数据回调
    handleConfirmSelect(){
      if(!this.curSelRow){
          return this.$tip.warning("请选择数据");
      }
      // this.$emit("select-create",this.selectRows);
      this.$emit("select-create",this.curSelRow);
    },
    handleSelect(rows, row){
      if(this.curSelRow){
        this.$refs.crudRef.toggleRowSelection(this.curSelRow,false);
      }
      this.curSelRow = row;
    },
    handleSelectAll(){
      this.curSelRow = null;
      this.$refs.crudRef.selectClear();
    },
    handleRowDBLClick(row) {
      this.collarAccountData = row;
    },
   
    handleQuery(){
      this.page.currentPage = 1;
      this.getDataList();
    },

    getDataList() {
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        stockState: "2",
        filterWhseIn: true,
        dataSortRules: "receiveDate|desc,receiveNo"
      };
      let props = ["receiveNo","deliveryNo"];
      props.forEach(key => {
        if(this.form[key]){
          params[key] = '%' + this.form[key]
        }
      })
      this.loading = true;
      fetchProCollarAccDataByPage(params)
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
  .in-whse_collar-account-container{
    .avue-crud__menu{
      display: none !important
    }
    .avue-crud__tip{
      display none !important
    }
  }
</style>