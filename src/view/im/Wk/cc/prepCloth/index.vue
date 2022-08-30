<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-08 17:19:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-29 10:58:45
-->
<template>
  <div id="collar-account-container">
      <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="account" label="备布单">
          <whse-out-prep ref="whseOutPrepRef" @refresh-unCreate="handleRefreshUnCreate"   />
        </el-tab-pane>
        <el-tab-pane name="unAccount" label="未有备布运转单列表">
          <un-create-list ref="unCreateListRef" @select-create="handleSelectCreate" />
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import UnCreateList from "./unCreateList.vue"
import WhseOutPrep from "./whseOut.vue"
export default {
  name: "prepClothModule",
  components: {
    UnCreateList,
    WhseOutPrep
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
    handleSelectCreate(row){
      this.$refs.whseOutPrepRef.initAndExtractData(row)
    },
  }
};
</script>