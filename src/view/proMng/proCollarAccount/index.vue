<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:19:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-08 14:27:31
-->
<template>
  <div id="collar-account-container">
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="account" label="收货台账">
          <collar-account ref="collarAccountRef" @refresh-unCreate="handleRefreshUnCreate" />
        </el-tab-pane>
        <el-tab-pane name="unAccount" label="待收货台账">
          <un-create-list  ref="unCreateListRef" @select-create="handleSelectCreate" />
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import CollarAccount from "./collarAccount.vue"
import UnCreateList from "./unCreateList.vue"
export default {
  name: "collarAccountModel",
  components: {
    CollarAccount,
    UnCreateList,
  },
  data() {
    return {
      tabName: "account"
    };
  },

  methods: {
    // 抽取后
    handleRefreshUnCreate(){
      this.$refs.unCreateListRef.handleQuery();
    },
    handleSelectCreate(data){
      this.$refs.collarAccountRef.initAndExtractData(data)
    },
  }
};
</script>