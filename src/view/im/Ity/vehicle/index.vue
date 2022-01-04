<!--
 * @Author: Lyl
 * @Date: 2021-06-08 16:50:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-03 16:22:22
 * @Description: 
-->
<template>
  <div id="imVehicle">
    <com-normal
      ref="normal"
      title="仓库载具"
      :formOp="mainForm(this)"
      :crudOp="mainCrud(this)"
      :canPrint="true"
      :api="api"
      :apiParams="{
        sort: 'storageCode',
        delTle: 'storageCode',
        save: 'carriageStorageId',
        printId: 'storageCode',
      }"
      sortObj="storageCode"
      :addParams="{
        carriageType: '1',
        storageState: '1',
        isAvailable: true,
        currentWeight: 0,
      }"
    ></com-normal>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del } from "./api";
export default {
  name: "",
  components: {},
  data() {
    return {
      wLoading: false,
      formOp: {},
      form: {},
      mainForm,
      mainCrud,
      api: {
        get,
        del,
        update,
        add,
      },
    };
  },
  watch: {},
  methods: {
    add() {},
    del() {},
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#imCarriage {
}
</style>
