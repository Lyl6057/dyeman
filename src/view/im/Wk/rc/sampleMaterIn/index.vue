<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:31
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-17 16:08:17
-->
<template>
  <div id="return-yarn-container">
    <el-tabs v-model="tabName" type="border-card">
      <el-tab-pane name="whseIn" :label="imWkData.name">
        <whse-in ref="whseInRef" :imWkType="imWkData.type" @click-row="handleClickYarnInRow"></whse-in>
      </el-tab-pane>
      <el-tab-pane name="whseUnIn" :label="`未入仓样品通知单资料`">
        <whse-un-in ref="whseUnInRef"  :imWkType="imWkData.type"  @select="handleSelect"></whse-un-in>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      :visible.sync="whseYarnInDtlVisible"
      fullscreen
      append-to-body
      :modal-append-to-body="false"
    >
      <whse-in-dtl ref="whseInDtlRef"  :imWkType="imWkData.type" :imWkName="imWkData.name" @close="handleDtlClose"></whse-in-dtl>
    </el-dialog>
  </div>
</template>
<script>
import WhseIn from "./whseIn.vue";
import WhseUnIn from "./whseUnIn.vue";
import WhseInDtl from "./whseInDtl.vue";
export default {
  name: "returnYarn",
  components: {
    "whse-in": WhseIn,
    "whse-un-in": WhseUnIn,
    "whse-in-dtl": WhseInDtl
  },
  data() {
    return {
      tabName: "whseIn",
      whseYarnInDtlVisible: false,
      imWkData: {
        name: "样纱入仓",
        type: 1
      },
       imWkType: "3",
    };
  },
  created() {
    this.analysisimWkData();
  },
  watch: {
    tabName: {
      handler(value) {
        if (value == "whseUnIn") {
          this.$refs.whseUnInRef && this.$refs.whseUnInRef.getDataList();
        }
      }
    }
  },
  methods: {
    // 解析
    analysisimWkData() {
      let tImWkData = JSON.parse(localStorage.getItem("imWk") || {type: ""}).type.split("_")
      Object.assign(this.imWkData,{
        name: tImWkData[0],
        type: tImWkData[1]
      });
      this.imWkType = tImWkData[1]
    },
    // 点击入仓数据
    async handleClickYarnInRow(row) {
      this.whseYarnInDtlVisible = true;
      await this.$nextTick();
      this.$refs.whseInDtlRef.getWhseYarnInData(row);
    },
    // 退纱通知单回调选择
    async handleSelect(samNote) {
      (this.tabName = "whseIn"), (this.whseYarnInDtlVisible = true);
      await this.$nextTick();
      this.$refs.whseInDtlRef.addAndCreateData(samNote);
    },
    // 明细数据关闭
    handleDtlClose(hasRefresh) {
      this.whseYarnInDtlVisible = false;
      hasRefresh && this.$refs.whseInRef.getDataList();
    }
  }
};
</script>