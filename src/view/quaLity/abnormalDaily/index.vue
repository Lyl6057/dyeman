<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:29
 * @LastEditors: PMP
 * @LastEditTime: 2022-7-16 7:40:38
 * @FilePath: \iot.vue\src\view\quaLity\abnormalDaily\index.vue
 * @Description: 
-->

<template>
  <div class="abnormalDaily">
    <view-container title="异常报告总表">
      <el-row class="btnList">
        <el-button type="success" @click="update"> {{this.$t("public.update")}} </el-button>
        <el-button type="primary" @click="add"> {{this.$t("public.add")}} </el-button>
        <el-button type="danger" @click="del"> {{this.$t("public.del")}} </el-button>
        <el-button type="primary" @click="query"> {{this.$t("public.query")}} </el-button>
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
          <template slot-scope="scope" slot="menu">
            <el-button type="primary" plain  @click="handleCreateAbnormal(scope)">异常报告</el-button>
            <el-button type="primary" plain  @click="handleCreateOrder(scope)">回修单</el-button>
          </template>
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
import { fetchQcCheckClothDayDetailByPage, removeQcCheckClothDayDetail, fetchQcClothBackRepairByPage, addQcClothBackRepair, updateQcClothBackRepair, createRepairPdf } from './api.js'
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
      detailId: {},
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
        checkDate: this.form.checkDate,
        dataSortRules: 'checkDate|desc,yind'
      }
      fetchQcCheckClothDayDetailByPage(params).then(async res => {
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
      this.$refs.qcCheckPlanTem.addAndcreateData(this.crud[this.curIdx - 1].detailId);
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
      removeQcCheckClothDayDetail(this.crud[idx].detailId).then(res =>{
        this.query();
        this.$tip.success("删除成功");
      }).finally(()=>{ this.loading = false });
    },
    rowClick(row) {
      this.curIdx = row.$index + 1;
    },
    handleRowDBLClick(row){
      this.curIdx = row.$index + 1;
      this.update()
    },
    temClose(hasRefresh){
      this.dialogVisible = false;
      hasRefresh && this.query();
    },
    handleCreateAbnormal({ row }){
      window.open(process.env.API_HOST + '/api/qcCheckClothDayDetail/qaDailyPdf?id=' + row.detailId);
    },
    async handleCreateOrder({ row }){
      this.wloading = true
      let detailRes =  await fetchQcClothBackRepairByPage({ dayDetailfFk: row.detailId})
      let params = {
          noticeDate: row.checkDate,
          dayDetailfFk: row.detailId,
          ...row
      }
      if(detailRes.data.total){ 
        await updateQcClothBackRepair(params)
        window.open(process.env.API_HOST + '/api/qcClothBackRepair/repairPdf?id=' + detailRes.data.records[0].repairId)
      }else{
        let addRes = await addQcClothBackRepair(params)
        window.open(process.env.API_HOST + '/api/qcClothBackRepair/repairPdf?id=' + addRes.data.data)
      }
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
.abnormalDaily {
  >>>.el-table__fixed-right {
    z-index: 99;
  }
}
</style>