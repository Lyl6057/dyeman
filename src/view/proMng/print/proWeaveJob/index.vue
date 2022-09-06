<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-06 09:54:01
 * @Description: 
-->
<template>
  <div id="pro-weave-job-container">
    <el-tabs v-model="tabName" type="border-card">
        <el-tab-pane name="print" label="織造通知單">
          <weave-job-list ref="weaveJobListRef" @refresh-unCreate="handleRefreshUnCreate" />
        </el-tab-pane>
        <el-tab-pane name="unCreate" label="待生成的織造通知單">
          <un-create-list  ref="unCreateListRef" @select-create="handleSelectCreate" />
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import UnCreateList from "./unCreateList.vue"
import WeaveJobList from "./weaveJobList.vue"
export default {
  name: "proWeaveJob",
  components:{
    UnCreateList,
    WeaveJobList
  },
  data(){
    return {
      tabName: "print",
    }
  },
  methods:{
    // 生产织单回调
    handleSelectCreate(rows){
      this.$refs.weaveJobListRef.dataExtract(rows);
    },
    // 刷新未生成数据
    handleRefreshUnCreate(){
      this.$refs.unCreateListRef.handleQuery();
    },
  }

};
</script>
<style lang='stylus'></style>