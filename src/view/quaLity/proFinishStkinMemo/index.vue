<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:31
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-09-02 10:03:41
-->
<template>
  <div id="return-yarn-container">
    <el-tabs v-model="tabName" type="border-card">
      <el-tab-pane name="clothInStoreNotice" label="成品布入仓通知单">
        <whse-in ref="whseInRef"  @click-row="handleClickStkinMemoRow"></whse-in>
      </el-tab-pane>
      <el-tab-pane name="clothUnStore" label="已验布未入仓成品布资料">
        <whse-un-in ref="whseUnInRef"  @select="handleSelect"></whse-un-in>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      :visible.sync="dtlVisible"
      fullscreen
      append-to-body
      :modal-append-to-body="false"
    >
      <whse-in-dtl ref="whseInDtlRef"  @close="handleDtlClose"></whse-in-dtl>
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
      tabName: "clothInStoreNotice",
      dtlVisible: false,
      imWkData: {}
    };
  },
  created() {
  },
  watch: {
    tabName: {
      handler(value) {
        if (value == "clothUnStore") {
          this.$refs.whseUnInRef && this.$refs.whseUnInRef.getDataList();
        }
      }
    }
  },
  methods: {
    // 点击入仓数据
    async handleClickStkinMemoRow(row) {
      this.dtlVisible = true;
      await this.$nextTick();
      this.$refs.whseInDtlRef.getStkinMemoData(row);
    },
    // 退纱通知单回调选择
    async handleSelect(storeLoadCode) {
      this.tabName = "clothInStoreNotice";
      this.dtlVisible = true;
      await this.$nextTick();
      this.$refs.whseInDtlRef.addAndCreateData(storeLoadCode);
    },
    // 明细数据关闭
    handleDtlClose(hasRefresh) {
      this.dtlVisible = false;
      hasRefresh && this.$refs.whseInRef.getDataList();
    }
  }
};
</script>