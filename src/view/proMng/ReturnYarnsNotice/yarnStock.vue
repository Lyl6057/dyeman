<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-11 14:29:42
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-13 14:19:46
-->
<template>
  <div class="yarn-stock-container">
    <view-container title="纱线库存选择" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="handleSelect">选择</el-button>
        <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
         <el-button type="primary" @click="getDataList">{{ this.$t("public.query") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="yarnStockFormOp" v-model="yarnStockData"></avue-form>
      </div>
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="yarnStock" label="纱线库存数据">
          <div class="crudBox">
            <avue-crud
              ref="yarnStockCrudRef"
              :option="yarnStockCrudOp"
              :data="yarnStockDataList"
              :page.sync="page"
              v-loading="loading"
              @on-load="getDataList"
              @selection-change="handleSelectionChange"
            ></avue-crud>
          </div>
        </el-tab-pane>
      </el-tabs>
    </view-container>
  </div>
</template>
<script>
import { yarnStockFormOp, yarnStockCrudOp } from "./data";
import { fetchYarnStockDataList } from "./api";
export default {
  name: "yarnStockData",
  props: {
    targetName: {
      type: String,
      default: () => "retYain"
    }
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
      yarnStockData: {},
      yarnStockFormOp: yarnStockFormOp(this),
      yarnStockDataList: [],
      yarnStockCrudOp: yarnStockCrudOp(this),
      tabName: "yarnStock",
      selectList: []
    };
  },
  methods: {
    // 获取选中的值
    handleSelectionChange(rows) {
      this.selectList = rows;
    },
    getDataList() {
      let param =  {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          yarnsId: "%" + (this.yarnStockData.yarnId || ""),
          yarnsName: "%" + (this.yarnStockData.yarnName || ""),
        };
        this.loading = true;
      fetchYarnStockDataList(param).then(res => {
        this.page.total = res.data.total;
        this.yarnStockDataList = res.data.records;
      }).finally(() => {
          this.loading = false;
      });
    },
    //   选择
    handleSelect() {
      let selectList = this.selectList.map(item => {
        return {
          weaveJobCode: "",
          yarnsId: item.yarnsId,
          yarnsName: item.yarnsName,
          yarnsCard: item.yarnsCard,
          suppBatNo: item.batId,
          batchNo: item.batchNo,
          weightUnit: item.weightUnit
        };
      });
      this.$emit("selected", selectList);
      this.handleClose();
    },
    //   关闭
    handleClose() {
      this.$refs.yarnStockCrudRef.selectClear();
      this.$emit("close");
    }
  }
};
</script>