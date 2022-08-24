<!--
 * @Author: Lyl
 * @Date: 2022-08-22 15:20:20
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-24 09:13:05
 * @FilePath: \iot.vue\src\components\select-workStep\index.vue
 * @Description: 
-->
<template>
  <div class="select-workstep">
    <el-dialog append-to-body fullscreen  :visible.sync="dialogVisible" :element-loading-text="$t('public.loading')" v-loading="wLoading"  width="100%" :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container title="生产工序信息">
        <div class="btnList">
          <el-tooltip effect="dark" content="chọn" placement="top-start">
            <el-button type="success" @click="handleCheckStep" :loading="wLoading">选择</el-button>
          </el-tooltip>
           <el-tooltip effect="dark" content="tìm kiếm" placement="top-start">
            <el-button type="primary" @click="handleQuery" :loading="wLoading">{{ this.$t("public.query") }}</el-button>
          </el-tooltip>
           <el-tooltip effect="dark" content="đóng" placement="top-start">
            <el-button type="warning" @click="dialogVisible = false">{{ this.$t("public.close") }}</el-button>
          </el-tooltip>
        </div>
        <div class="formBox">
          <avue-form ref="selectWorkStepForm" :option="selectWorkStepFormOp" v-model="selectWorkStepFormData"> </avue-form>
        </div>
        <div class="crudBox">
          <!-- <el-table height="calc(100vh - 175px)" :stripe="true"  tooltip-effect="dark"  style="width: 99%;margin: 0 auto" row-key="stepId" border  :data="selectWorkStepCrudData" @selection-change="handleSelectionChange" :tree-props="{children: 'nodes'}">
            <el-table-column type="selection"  width="55" @change="test"> </el-table-column>
            <el-table-column prop="stepSn" label="序号" width="80" align="center"> </el-table-column>
            <el-table-column prop="stepName" label="工序名称">
            </el-table-column>
            <el-table-column  prop="stepDescribe"  label="描述">
            </el-table-column>
            <el-table-column prop="standardFormula" label="标准公式">
            </el-table-column>
          </el-table> -->
          <avue-crud ref="selectWorkStepCrud" 
            v-loading="crudLoading" 
            :option="selectWorkStepCrudOp"
            :data="selectWorkStepCrudData" 
            @selection-change="handleSelectionChange"> 
          </avue-crud>
        </div>
      </view-container>
    </el-dialog>
  </div>
</template>

<script>
import { fetchBaseWorkStepList, fetchfetchBaseWorkStepTreeData, baseStepCrudOp, baseStepFormOp } from './data';
export default {
  components: {},
  props: {
    stepId: "",  // 生产步骤父级id
  },
  data() {
    return {
      dialogVisible: false,
      crudLoading: true,
      wLoading: true,
      selectWorkStepFormOp: baseStepFormOp(this),
      selectWorkStepFormData: {},
      selectWorkStepCrudOp: baseStepCrudOp(this),
      selectWorkStepCrudData: [],
      selectList: []
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async handleQuery() {
      // let res = await fetchfetchBaseWorkStepTreeData({ parentId: this.stepId });
      this.crudLoading = true;
      let stepList = await fetchBaseWorkStepList( Object.assign(this.selectWorkStepFormData, { pareantId: this.stepId }));
      this.selectWorkStepCrudData = stepList.data // res.data[4].nodes[1].nodes //;
      // this.selectWorkStepCrudData.forEach((item) =>{
      //   item.children = item.nodes
      // })
      this.crudLoading = false;
      this.wLoading = false;
    },
    test(val) {
      console.log(val);
    },
    handleCheckStep() {
      this.$emit("handleCheckStep", this.selectList);
      this.dialogVisible = false;
    },
    handleSelectionChange(list) {
      console.log(list);
      this.selectList = list;
    },
    workStepHasSelect(row, index) {
      return row.nodes.length > 0 ? 0 : 1
    }
  },
};
</script>
<style lang="stylus" scoped>
>>>.el-table-column--selection {
  text-align: center
}
>>>.avue-crud__tip{
  margin: 7px 0 3px 0
}
>>>.el-tag--mini{
  height: 25px;
}
.select-workstep{}
</style>