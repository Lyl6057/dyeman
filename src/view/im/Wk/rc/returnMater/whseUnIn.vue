<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:36
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-11 10:39:25
-->
<template>
  <div id="whse-unIn-container">
    <div class="btnList">
      <el-button type="success" @click="handleCreateDtl">生成入仓单</el-button>
      <el-button type="primary" @click="getDataList">{{ this.$t("public.query") }}</el-button>
      <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="queryFormOp" v-model="queryForm"></avue-form>
    </div>
    <div class="crudBox">
      <avue-crud
        ref="whseUnInRef"
        :option="crudOp"
        :data="crudDataList"
        :page.sync="page"
        v-loading="loading"
        @on-load="getDataList"
        @select="handleSelect"
        @select-all="handleSelectAll"
      ></avue-crud>
    </div>
  </div>
</template>
<script>
import { retMatNoticCrudOp } from "./data"
import { fetchRetMaterNoticDataListByPage } from "./api"
export default {
  name: "whseUnIn",
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
      queryFormOp: {},
      queryForm: {},
      crudOp: retMatNoticCrudOp(this),
      crudDataList: [],
      curSelectWithDrawalNo:""
    };
  },
  methods: {
    // 生成入库单号
    handleCreateDtl(){
      if(!this.curSelectWithDrawalNo) return this.$tip.warning("请选择数据~");
      this.$emit("select",this.curSelectWithDrawalNo);
      this.$refs.whseUnInRef.selectClear();
    },
    getDataList() {
        this.loading = true;
        this.curSelectWithDrawalNo = ""
        let params = {
            page: this.page.currentPage,
            rows: this.page.pageSize,
        }
        fetchRetMaterNoticDataListByPage(params).then(res => {
            this.page.total = res.data.total;
            this.crudDataList = res.data.records;
        }).finally(() => {
          this.loading = false;
        })

    },
    // 全选回调
    handleSelectAll(){
      this.$refs.whseUnInRef.selectClear();
    },
    // 选中回调
    handleSelect(rows, row){
      let itemData = row;
      this.$refs.whseUnInRef.selectClear();
      if (itemData && itemData.withdrawalNo != this.curSelectWithDrawalNo) {
        let withdrawalNo = itemData.withdrawalNo;
        this.crudDataList.forEach(item => {
          item.withdrawalNo == withdrawalNo &&
            this.$refs.whseUnInRef.toggleRowSelection(item, true);
        });
        this.curSelectWithDrawalNo = itemData.withdrawalNo;
      } else {
        this.curSelectWithDrawalNo = "";
      }
    },
    // 审核
    handleExamine() {},
    // 关闭
    handleClose() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    }
  }
};
</script>
<style lang="stylus">
  #whse-unIn-container{
    .avue-crud__menu {
      min-height: 5px !important;
      height: 5px !important;
    }
  }
</style>