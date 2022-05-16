<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:36
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-16 09:23:44
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
import { unStockSampleCrudOp, unStockSampleFormOp, dataPropEnum } from "./data"
import { fetchPurYarnForSampleDataListByPage } from "./api"
export default {
  name: "whseUnIn",
  props: {
    imWkType: {
      type: String | Number,
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
      queryFormOp: unStockSampleFormOp(this),
      queryForm: {},
      crudOp: unStockSampleCrudOp(this),
      crudDataList: [],
      curMaterForSampleNote:""
    };
  },
  methods: {
    // 生成入库单号
    handleCreateDtl(){
      if(!this.curMaterForSampleNote) return this.$tip.warning("请选择数据~");
      this.$emit("select",this.curMaterForSampleNote);
      this.$refs.whseUnInRef.selectClear();
    },
    getDataList() {
        this.loading = true;
        this.curMaterForSampleNote = ""
        let params = {
            page: this.page.currentPage,
            rows: this.page.pageSize,
        }
        Object.entries(this.queryForm).forEach(item => {
          if(item[1] == 0 || item[1]){
            params[item[0]] = "%" + item[1];
          }
        }) 
        fetchPurYarnForSampleDataListByPage(params,this.imWkType).then(res => {
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
      let { samNoteKey } = dataPropEnum[this.imWkType]
      this.$refs.whseUnInRef.selectClear();
      let samNote = itemData[samNoteKey];
      if (itemData && samNote != this.curMaterForSampleNote) {
        this.crudDataList.forEach(item => {
          item[samNoteKey] == samNote &&
            this.$refs.whseUnInRef.toggleRowSelection(item, true);
        });
        this.curMaterForSampleNote = samNote;
      } else {
        this.curMaterForSampleNote = "";
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