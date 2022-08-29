<!--
 * @Author: Lyl
 * @Date: 2022-08-22 15:20:20
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-29 10:43:56
 * @FilePath: \iot.vue\src\components\select-workstep\index.vue
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
          <el-table ref="selectWorkStepCrud" height="calc(100vh - 175px)" @select="handleTableSelect" :stripe="true"  tooltip-effect="dark"  style="width: 99%;margin: 0 auto" row-key="stepId" border  :data="selectWorkStepCrudData" @selection-change="handleSelectionChange"  :tree-props="{children: 'nodes'}">
            <el-table-column type="selection"  width="55" > </el-table-column>
            <el-table-column prop="stepSn" label="序号" width="80" align="center"> </el-table-column>
            <el-table-column prop="stepName" label="工序名称"> </el-table-column>
            <el-table-column  prop="stepDescribe"  label="描述"> </el-table-column>
            <el-table-column prop="standardFormula" label="标准公式"> </el-table-column>
          </el-table>
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
      let res = await fetchfetchBaseWorkStepTreeData({ parentId: this.stepId });
      this.crudLoading = true;
      // let stepList = await fetchBaseWorkStepList( Object.assign(this.selectWorkStepFormData, { pareantId: this.stepId }));
      this.selectWorkStepCrudData = res.data[4].nodes[1].nodes // stepList.data;
      // this.selectWorkStepCrudData.forEach((item) =>{
      //   item.children = item.nodes
      // })
      await this.$nextTick();
      setTimeout(() => {
          this.crudLoading = false;
          this.wLoading = false;
      }, 200);
    },
    async handleTableSelect(list,row) {
      let isSelect = list.filter(a => a.stepId == row.stepId); // 勾选 or 取消
      let pareantDatas = list.filter(a => { return a.pareantId == row.pareantId && a.stepId != row.stepId}); // 判断是否存在父级的其他子级
      await this.selectWorkStepCrudData.forEach((item) =>{
        if(item.stepId == row.pareantId) {
          this.$nextTick(() =>{
            this.selectList.push(item);
          })
          this.$refs.selectWorkStepCrud.toggleRowSelection(item, isSelect.length ? true : pareantDatas.length ? true : false);
        }
      })
      // 控制子级
      this.$nextTick(() =>{
        if (row.nodes.length) {
          row.nodes.forEach((item, i) =>{
            this.$refs.selectWorkStepCrud.toggleRowSelection(item, isSelect.length ? true : false);
          })
        }
      })
    },
    handleCheckStep() {
      this.$emit("handleCheckStep", this.selectList);
      this.dialogVisible = false;
    },
    handleSelectionChange(list) {
      this.selectList = list;
    },
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