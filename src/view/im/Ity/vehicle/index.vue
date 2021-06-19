<!--
 * @Author: Lyl
 * @Date: 2021-06-08 16:50:31
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-09 15:48:24
 * @Description: 
-->
<template>
  <div id="imVehicle">
    <com-normal
      ref="normal"
      title="仓库载具"
      :formOp="mainForm(this)"
      :crudOp="mainCrud(this)"
      :api="api"
      :apiParams="{
        sort: 'storageCode',
        delTle: 'storageCode',
        save: 'carriageStorageId',
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
