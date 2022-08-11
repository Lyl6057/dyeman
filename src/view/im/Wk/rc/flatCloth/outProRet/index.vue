<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:19:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-10 11:25:39
-->
<template>
  <div id="collar-account-container">
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="account" label="外发加工入仓">
          <whse-in-flat ref="whseInFlatRef" @refresh-unCreate="handleRefreshUnCreate"   />
        </el-tab-pane>
        <el-tab-pane name="unAccount" label="待入仓资料">
          <collar-account ref="collarAccountRef" @select-create="handleSelectCreate" />
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import CollarAccount from "./collarAccount.vue"
import WhseInFlat from "./whseIn.vue"
export default {
  name: "collarAccountModel",
  components: {
    CollarAccount,
    WhseInFlat
  },
  data() {
    return {
      tabName: "account"
    };
  },

  methods: {
    // 抽取后
    handleRefreshUnCreate(){
      this.$refs.collarAccountRef.handleQuery();
    },
    handleSelectCreate(row){
      this.$refs.whseInFlatRef.initAndExtractData(row)
    },
  }
};
</script>