<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:29
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-01 14:18:26
 * @FilePath: \iot.vue\src\view\quaLity\qaProductionCapacity\index.vue
 * @Description: 
-->

<template>
  <div class="qcCheckPlan">
    <view-container title="QA产能统计">
      <el-row class="btnList">
        <!-- <el-button type="success" @click="update"> {{this.$t("public.update")}} </el-button> -->
        <!-- <el-button type="primary" @click="add"> {{this.$t("public.add")}} </el-button> -->
        <!-- <el-button type="danger" @click="del"> {{this.$t("public.del")}} </el-button> -->
        <el-button type="primary" @click="query"> {{this.$t("public.query")}} </el-button>
        <!-- <el-button type="primary" @click="getLatestData">  </el-button> -->
        <el-dropdown size="small" split-button type="primary" style="margin-left: 10px" @command="getLatestData" @click="getLatestData(new Date().getMonth() + 1)">
          更新数据
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in 12" :key="item" :command="item">{{item + ' 月'}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown size="small" split-button type="primary" style="margin-left: 10px" @command="handleReport" @click="handleReport(new Date().getMonth() + 1)">
          报表
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in 12" :key="item" :command="item">{{item + ' 月'}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud 
          ref="crud" 
          :option="crudOp" 
          :data="crud" 
          :page.sync="page" 
          v-loading="loading"
          element-loading-text="正在拼命加载中..."
          @on-load="query" 
          @row-click="rowClick"
          @row-dblclick="handleRowDBLClick"
        >
        </avue-crud>
      </el-row>
    </view-container>
    <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body>
      <tem-dlg ref="qcCheckPlanTem" @refresh="query" @close="temClose"> </tem-dlg>
    </el-dialog>
  </div>
</template>

<script>
import temDlg from "./tem.vue";
import { fetchQaDayOutputByPage, removeQaDayOutputData, upadQareport } from './api.js'
import { mainForm, mainCrud } from "./data.js";
export default {
  components: {
    temDlg,
  },
  props: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      curIdx: null,
      wloading: false,
      loading: false,
      dialogVisible: false,
      outId: {},
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    query() {
      this.loading = true;
      let params = {
        vatNo: "%" + (this.form.vatNo || ''),
        dataSortRules: 'dayId|desc',
        dayId: "%" + (this.form.dayId || ''),
      }
      fetchQaDayOutputByPage(params).then(async res => {
        let { records, total } = res.data;
        this.crud = records;
        this.page.total = total;
        this.$refs.crud.setCurrentRow();
        await this.$nextTick();
        this.$refs["crud"].doLayout();
        this.curIdx = null;
      }).finally(() =>{
        setTimeout(() => {
          this.loading = false;
        }, 200);
      })
    },
    async update(){
      if(!this.curIdx){
        this.$tip.warning("请先选择要修改的数据!");
        return
      } 
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.qcCheckPlanTem.addAndcreateData(this.crud[this.curIdx - 1].outId);
    },
    async getLatestData(command){
      let dayId = new Date().getFullYear() + '' + (command < 10 ? '0' + command : command);
      let res =  await upadQareport({dayId});
      if (res.data.code == 200) {
        this.$tip.success("更新成功!");
        this.query()
      }else{
        this.$tip.error("更新失败!" + res.data.msg);
      }
    },
    async add() {
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.qcCheckPlanTem.addAndcreateData()
    },
    async del(){
      if (!this.curIdx) { return this.$tip.warning("请先选择要删除的数据!") }
      let idx = this.curIdx - 1;
      let cofResult = await this.$tip.cofirm("是否确定删除缸号为【 " +  this.crud[idx].vatNo  + " 】的数据?").then(() => {return true}).catch((e) => {return false});
      if(!cofResult) return false;
      this.loading = true;
      removeQaDayOutputData(this.crud[idx].outId).then(res =>{
        this.query();
        this.$tip.success("删除成功");
      }).finally(()=>{ this.loading = false });
    },
    rowClick(row) {
      this.curIdx = row.$index + 1;
    },
    handleRowDBLClick(row){
      this.curIdx = row.$index + 1;
      // this.update()
    },
    temClose(hasRefresh){
      this.dialogVisible = false;
      hasRefresh && this.query();
    },
    handleReport(command){
      let dayId = new Date().getFullYear() + '' + (command < 10 ? '0' + command : command);
      let name = encodeURI(
      "http:" +
        process.env.API_HOST.split(":")[1] +
        ":92/api/qaDayOutput/qareport?dayId=" + dayId
      );
      window.open(name);
      this.wloading = false;
      }
  },
};
</script>
<style lang="stylus" scoped>
.qcCheckPlan {
}
</style>