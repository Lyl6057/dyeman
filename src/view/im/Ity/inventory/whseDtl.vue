<!--
 * @Description: 库存出入库明细
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-20 08:46:17
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-20 11:06:23
-->

<template>
  <div id="inventory-whse-dtl-container">
    <avue-crud
      ref="crud"
      :option="whseDtlCrudOp"
      :data="crudDataList"
      :page.sync="page"
      v-loading="loading"
      @on-load="() => whseType && getWhseDtlDataList()"
      :cell-style="handleCellStyle"
    ></avue-crud>
  </div>
</template>
<script>
import { fetchWhseDtlDataByYarns } from "./api";
import { whseDtlCrudOp } from "./data";
export default {
  name: "inventoryWhseDtl",
  data() {
    return {
      loading: false,
      whseDtlCrudOp: whseDtlCrudOp(this),
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      crudDataList: [],
      whseType: "",
      queryParams: {}
    };
  },
  methods: {
    //   初始化
    initData(type, params) {
      this.whseType = type;
      this.queryParams = params;
      this.page.currentPage = 1;
      this.page.total = 0;
      this.crudDataList = [];
      this.getWhseDtlDataList();
    },
    //   获取数据
    getWhseDtlDataList() {
      if (this.loading) return;
      this.loading = true;
      let queryParams = {
        rows: this.page.pageSize,
        start: this.page.currentPage,
        ...this.queryParams,
      };
      let fetchWhseDtlDataFn = null;
      switch (this.whseType) {
        case "SX":
          fetchWhseDtlDataFn = fetchWhseDtlDataByYarns;
          break;
        default:
          break;
      }
      fetchWhseDtlDataFn(queryParams)
        .then(res => {
          this.crudDataList = res.data.records;
          this.page.total = res.data.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 样式修改回调
    handleCellStyle({row,column}) {
        if(column.property !== 'whseStatus') return {};
        return {
            color: row.whseStatus == 'in' ? 'red': "green"
        }
    }
  }
};
</script>