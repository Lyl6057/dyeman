<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:36
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-24 10:09:50
-->
<template>
  <div id="whse-unIn-container">
    <div class="btnList">
      <el-button type="success" @click="handleCreateDtl">生成成品布入仓通知单</el-button>
      <el-button type="primary" @click="handleQuery">查询</el-button>
    </div>
    <div class="formBox">
        <avue-form
          ref="form"
          :option="formOp"
          v-model="queryParams"
        ></avue-form>
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
import { unStoreCrudOp,unStoreFormOp } from "./data"
import { fetchUnStoreClothByPage } from "./api"
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
      formOp: unStoreFormOp(this),
      queryParams: {
        lastCheckTime: "",
      },
      crudOp: unStoreCrudOp(this),
      crudDataList: [],
      curSelectCodes: []
    };
  },
  methods: {
    // 生成入库单号
    handleCreateDtl(){
      if(!this.curSelectCodes.length) return this.$tip.warning("请选择数据~");
      this.$emit("select",this.curSelectCodes.join(","));
      this.$refs.whseUnInRef.selectClear();
    },
    handleQuery(){
      this.page.currentPage = 1;
      this.getDataList();
    },
    getDataList() {
        this.loading = true;
        this.curSelectCodes = []
        let { lastCheckTime, vatNo } = this.queryParams;

        let params = {
            start: this.page.currentPage,
            rows: this.page.pageSize,
            filterFactory: true,
            vatNo: vatNo ? "%"+ vatNo : ""
        }
        if(lastCheckTime && lastCheckTime.length == 2){
          params.lastCheckTime_begin = lastCheckTime[0] + " 07:30:00";
          let endDate = new Date(new Date(lastCheckTime[1]).getTime() + (24 * 60 * 60 * 1000));
          params.lastCheckTime_end = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()} 07:30:00`;
        }
        fetchUnStoreClothByPage(params).then(res => {
            this.page.total = res.data.total;
            this.crudDataList = res.data.records;
        }).finally(() => {
          this.loading = false;
        })

    },
    // 全选回调
    handleSelectAll(){
      this.$refs.whseUnInRef.selectClear();
      this.curSelectCodes = [];
    },
    // 选中回调
    handleSelect(rows, row){
      let itemData = row;
      this.$refs.whseUnInRef.selectClear();
      
      let existCodeIdx = this.curSelectCodes.findIndex(code => code == itemData.vatNo);

      if(existCodeIdx != -1){
         this.curSelectCodes.splice(existCodeIdx,1);
      }else{
        this.curSelectCodes.push(itemData.vatNo);
      }

      let tCodeEnum = this.curSelectCodes.reduce((a,b) => Object.assign(a, {[b]: true} ) , {})
      this.crudDataList.forEach(item => {
          tCodeEnum[item.vatNo] &&
          this.$refs.whseUnInRef.toggleRowSelection(item, true);
      });

    },
  }
};
</script>
<style lang="stylus">
  #whse-unIn-container{
    .avue-crud__menu {
      min-height: 5px !important;
      height: 5px !important;
    }
    .avue-crud__tip{
        display none !important
    }
  }
</style>