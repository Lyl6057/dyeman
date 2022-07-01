<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:36
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-01 14:11:12
-->
<template>
  <div id="whse-unIn-container">
    <div class="btnList">
      <el-button type="success" @click="handleCreateDtl">生成胚布入仓通知单</el-button>
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
import { unStoreCrudOp } from "./data"
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
    getDataList() {
        this.loading = true;
        this.curSelectCodes = []
        let params = {
            start: this.page.currentPage,
            rows: this.page.pageSize,
            filterFactory: true,
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
      
      let existCodeIdx = this.curSelectCodes.findIndex(code => code == itemData.storeLoadCode);

      if(existCodeIdx != -1){
         this.curSelectCodes.splice(existCodeIdx,1);
      }else{
        this.curSelectCodes.push(itemData.storeLoadCode);
      }

      let tCodeEnum = this.curSelectCodes.reduce((a,b) => Object.assign(a, {[b]: true} ) , {})
      this.crudDataList.forEach(item => {
          tCodeEnum[item.storeLoadCode] &&
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