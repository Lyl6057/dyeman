<!--
 * @Author: Lyl
 * @Date: 2022-08-31 08:20:31
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-31 10:23:42
 * @FilePath: \iot.vue\src\view\proMng\print\proWeaveJob\useYarns.vue
 * @Description: 
-->
<template>
  <div class="useYarns">
    <el-dialog :visible.sync="visible" fullscreen append-to-body :element-loading-text="$t('public.loading')" v-loading="wLoading">
        <view-container title="织单用纱明细">
          <el-row class="btnList">
            <el-tooltip class="item" effect="dark" content="Bảo tồn" placement="top-start">
              <el-button @click="handleSave" type="success">{{ $t("public.save") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
              <el-button @click="handleAdd" type="primary">{{ $t("public.add") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
              <el-button @click="handleDel" type="danger">{{ $t("public.del") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="đóng" placement="top-start">
              <el-button @click="visible = false" type="warning">{{  $t("public.close") }}</el-button>
            </el-tooltip>
          </el-row>
          <avue-crud 
            ref="useYarnsCrud" 
            v-loading="useLoading"
            :option="useYarnsCrudOp" 
            :data="useYarnsCrudData" 
            :page.sync="page" 
            @current-row-change="handleCellClick">
          </avue-crud>
        </view-container>
        <view-container title="纱线实际分配信息">
          <el-row class="btnList">
            <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
              <el-button @click="handleAdd" type="primary">{{ $t("public.add") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
              <el-button @click="handleDel" type="danger">{{ $t("public.del") }}</el-button>
            </el-tooltip>
          </el-row>
          <avue-crud 
            ref="weaveJobyarnallotCrud" 
            v-loading="allotLoading" 
            :option="weaveJobyarnallotCrudOp" 
            :data="rowSelectData.weaveJobyarnallotCrudData" 
            @current-row-change="handleAllotCellClick">
          </avue-crud>
        </view-container>
    </el-dialog>
    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="choiceData"
      @close="choiceV = false" v-if="choiceV"></choice>
  </div>
</template>

<script>
import { yarnCrud, weaveJobyarnallotCrud } from "./data"
import { getYarn, addYarn, updateYarn, delYarn, fetchProWeaveJobYarnallotData, CeateProWeaveJobYarnallotData, updateProWeaveJobYarnallotData, delProWeaveJobYarnallotData } from "./api"
export default {
  components: {},
  props: {
    weaveJobInfo: {}
  },
  data() {
    return {
      visible: false,
      wLoading: true,
      useLoading: false,
      allotLoading: false,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      useYarnsCrudOp: yarnCrud(this),
      useYarnsCrudData: [],
      weaveJobyarnallotCrudOp: weaveJobyarnallotCrud(this),
      weaveJobyarnallotCrudData: [],
      rowSelectData: {},
      allotRowSelectData: {},
      addSgin: 0,
      choiceV: false,
      choiceTle: "选择纱线库存",
      choiceQ: {}
    };
  },
  watch: {
    rowSelectData(n,o){
      n.$cellEdit = true;
      o.$cellEdit = false;
    },
    allotRowSelectData(n,o){
      n.$cellEdit = true;
      o.$cellEdit = false;
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async initData() {
      this.useLoading = true;
      let params = {
        proWeaveJobFk: this.weaveJobInfo.weaveJobId,
        rows: this.page.pageSize,
        start: this.page.currentPage,
      }
      let yarnsData = await getYarn(params);
      this.useYarnsCrudData = yarnsData.data.records;
      this.page.total = yarnsData.data.total;
      this.useYarnsCrudData.length && this.$refs.useYarnsCrud.setCurrentRow();
      this.useLoading = false;
      this.wLoading = false;
    },
    async fetchYarnAllotData() {
      this.allotLoading = true;
      let allotData = await fetchProWeaveJobYarnallotData();
      this.rowSelectData.weaveJobyarnallotCrudData = allotData.data
      this.allotLoading = false;
    },

    handleSave() {

    },

    handleAdd(sgin) {
      this.addSgin = sgin; // 新增类型标记
      this.choiceV = true;
    },

    handleDel() {

    },

    handleCellClick(row) {
      this.rowSelectData = row;

    },
    handleAllotCellClick(row) {
      this.allotRowSelectData = row;
    },
    choiceData(list) {

    }
  },
};
</script>
<style lang="stylus" scoped>
.useYarns{

}
</style>