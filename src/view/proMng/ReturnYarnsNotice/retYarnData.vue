<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 10:07:01
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-13 14:24:19
-->
<template>
  <div class="ret-yarn-data-container">
    <view-container title="领纱单选择" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="handleSelect">选择</el-button>
        <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
        <el-button type="primary" @click="handleQuery">{{ this.$t("public.query") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="retYarnFormOp" v-model="retYarnData"></avue-form>
      </div>
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="retYarn" label="织单列表">
          <div class="crudBox">
            <avue-crud
              ref="retYarnCrudRef"
              :option="retYarnCrudOp"
              :data="retYarnDataList"
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
import { retYarnFormOp, retYarnCrudOp } from "./data";
import { fetchRetYarnDataByPage } from "./api";
export default {
  name: "retYarnData",
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
      retYarnData: {},
      retYarnFormOp: retYarnFormOp(this),
      retYarnDataList: [],
      retYarnCrudOp: retYarnCrudOp(this),
      tabName: "retYarn",
      selectList: []
    };
  },
  methods: {
    // 查询
    handleQuery(){
      this.page.currentPage = 1;
      this.getDataList();
    },
    // 获取选中的值
    handleSelectionChange(rows) {
      this.selectList = rows;
    },
    getDataList() {
      let param = Object.assign(
        {
          rows: this.page.pageSize,
          start: this.page.currentPage
        },
        this.retYarnData
      );
      this.loading = true;
      fetchRetYarnDataByPage(param).then(res => {
        this.page.total = res.data.total;
        this.retYarnDataList = res.data.records;
      }).finally(() => {
          this.loading = false;
      });
    },
    //   选择
    handleSelect() {
      let selectList = this.selectList.map(item => {
        return {
          weaveJobCode: item.weaveJobCode,
          yarnsId: item.yarnsId,
          yarnsName: item.yarnsName,
          yarnsCard: item.yarnBrand,
          suppBatNo: item.suppBatchNo,
          batchNo: item.batchNo,
          weightUnit: item.weightUnit
        };
      });
      this.$emit("selected", selectList);
      this.handleClose();
    },
    //   关闭
    handleClose() {
      this.$refs.retYarnCrudRef.selectClear();
      this.$emit("close");
    }
  }
};
</script>


