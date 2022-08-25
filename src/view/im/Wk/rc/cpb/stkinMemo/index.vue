<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-06-29 17:18:58
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-24 13:45:02
-->
<template>
  <div id="whse-unIn-container" v-loading="loading">
    <div class="btnList">
        <el-button type="success" @click="handleCreateDtl">生成入仓明细</el-button>
       <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
       <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
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
    import {  stkinMemoUnWhseInCrudOp } from "./data"
    import { fetchUnWhseInByPage } from "./api"
    export default {
        name: "unWhseInStkinMemo",
        data(){
            return {
                loading: false,
                crudOp: stkinMemoUnWhseInCrudOp(this),
                crudDataList: [],
                page: {
                    pageSizes: [20, 50, 100, 200],
                    pageSize: 20,
                    currentPage: 1,
                    total: 0
                },
                // 选中的通知单
                curSelectMemoOid: ''
            }
        },
        methods: {
            handleQuery(){
                this.page.currentPage = 1;
                this.getDataList();
            },
            // 关闭
            handleClose(){
                document.getElementsByClassName("el-dialog__headerbtn")[0].click();
            },
            // 生成明细数据
            handleCreateDtl(){
                if(!this.curSelectMemoOid){
                    return  this.$tip.warning("请选择通知单");
                }
                let row = this.crudDataList.find(item => item.proFinishStkinMemooid == this.curSelectMemoOid)
                this.$emit("selected", row);
            },
            getDataList(){
                this.loading = true;
                let params = {
                    start: this.page.currentPage,
                    rows: this.page.pageSize,
                };
                fetchUnWhseInByPage(params).then(res => {
                    this.page.total = res.data.total;
                    this.crudDataList = res.data.records;
                    this.curSelectMemoOid = ""
                }).finally(() => {
                    this.loading = false;
                })
            },
            handleSelect(rows,row){
                let isSame = this.curSelectMemoOid == row.proFinishStkinMemooid;

                this.curSelectMemoOid = isSame ? "" : row.proFinishStkinMemooid 
                
                this.$refs.whseUnInRef.selectClear();

                this.$refs.whseUnInRef.toggleRowSelection(row, !isSame)
                
            },
            handleSelectAll(){
                this.$refs.whseUnInRef.selectClear();
                this.curSelectMemoOid = "";
            },
        }
    }

</script>
<style lang="stylus">
.avue-crud__tip{
    display none !important
}
</style> 