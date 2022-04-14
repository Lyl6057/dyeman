<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 14:44:01
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-13 08:18:44
-->
<template>
  <view-container title="退货（纱）通知单" :element-loading-text="loadLabel" v-loading="loading">
    <div class="btnList">
      <el-button type="primary" @click="handleSelect">退纱出仓</el-button>
      <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
    </div>
    <div class="crudBox">
      <avue-crud
        ref="purReturnMemoCrudRef"
        :option="retReatCrudOp"
        :data="crudDataList"
        :page.sync="page"
        v-loading="loading"
        @on-load="getDataList"
        @select="handleSelection"
        @select-all="handleSelectAll"
      ></avue-crud>
    </div>
  </view-container>
</template>
<script>
import { retReatCrudOp } from "./data";
import { fetchPurReturnMemoDataByPage } from "./api";
export default {
  name: "purReturnMemo",
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
      retReatCrudOp: retReatCrudOp(this),
      crudDataList: [],
      curSelRowRemeoNo: ""
    };
  },
  methods: {
    //   退纱出仓
    handleSelect() {
        if(!this.curSelRowRemeoNo) return this.$tip.warning("请选择通知单数据");
        this.$emit("selected",this.curSelRowRemeoNo);
    },
    getDataList() {
      let params = {
        rows: this.page.pageSize,
        start: this.page.currentPage
      };
      this.loading = true;
      fetchPurReturnMemoDataByPage(params)
        .then(res => {
          this.page.total = res.data.total;
          this.crudDataList = res.data.records;
          if (this.curSelRowRemeoNo) {
            this.crudDataList.forEach(item => {
              item.remeoNo == this.curSelRowRemeoNo &&
                this.$refs.purReturnMemoCrudRef.toggleRowSelection(item, true);
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSelection(rows, row) {
      console.log("enter selection change", rows, row);

      let itemData = row;
      this.$refs.purReturnMemoCrudRef.selectClear();
      if (itemData && itemData.remeoNo != this.curSelRowRemeoNo) {
        console.log("enter if");
        let remeoNo = itemData.remeoNo;
        this.crudDataList.forEach(item => {
          item.remeoNo == remeoNo &&
            this.$refs.purReturnMemoCrudRef.toggleRowSelection(item, true);
        });
        this.curSelRowRemeoNo = itemData.remeoNo;
      } else {
        this.curSelRowRemeoNo = "";
      }
    },
    handleSelectAll() {
      this.$refs.purReturnMemoCrudRef.selectClear();
    },
    //   关闭
    handleClose() {
      this.$emit("close");
    }
  }
};
</script>



