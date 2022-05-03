<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-03 18:30:19
 * @FilePath: \iot.vue\src\view\quaLity\qaCheckPlan\tem.vue
 * @Description: 
-->
<template>
  <div class="qcChcekPlanTem">
    <view-container
      title="本厂余纱退纱"
      element-loading-text="正在拼命加载中..."
      v-loading="loading"
    >
      <div class="btnList">
        <el-button type="primary" @click="handleSave" :disabled="hasNotEdit">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="handleClose">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form
          ref="form"
          :option="qcCheckPlanFormOp"
          v-model="qcCheckPlanFormData"
        ></avue-form>
      </div>
      <view-container title="纱线入仓货位明细资料">
            <div class="btnList">
              <!-- <el-button type="primary">{{ this.$t("public.save") }}</el-button>
              <el-button type="warning">{{ this.$t("public.close") }}</el-button>-->
            </div>
            <div class="crudBox">
              <avue-crud
                ref="whseInDtlRef"
                :option="whseYarnInDtlCrudOp"
                :data="whseYarnInDtlDataList"
                @row-click="handleDtlRowClick"
              ></avue-crud>
            </div>
          </view-container>
    </view-container>
  </div>
</template>

<script>
import { fetchQcCheckPlanByPage} from './api'
export default {
  components: {},
  props: {
    planId:String
  },
  data() {
    return {
      loading: false,
      qcCheckPlanFormOp:{},
      qcCheckPlanFormData:{}
    };
  },
  watch: {},
  computed: {},
  created() {
    this.initData();
    
  },
  mounted() {
    
  },
  methods: {
    initData(){
      this.loading = true;
      !this.planId && this.addAndcreateData()
      fetchQcCheckPlanByPage().then(res =>{
      }).finally(() =>{

      })
    },
    addAndcreateData(){

    },
    handleSave(){

    },
    handleClose(){
      this.$emit("close", this.hasRefresh);
    }
  },
};
</script>
<style lang="stylus" scoped>
.qcChcekPlanTem {
}
</style>