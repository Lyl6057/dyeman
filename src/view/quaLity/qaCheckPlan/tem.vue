<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-05 11:29:51
 * @FilePath: \iot.vue\src\view\quaLity\qaCheckPlan\tem.vue
 * @Description: 
-->
<template>
  <div class="qcChcekPlanTem">
    <view-container
      title="QA查布计划表"
      element-loading-text="正在拼命加载中..."
      v-loading="loading"
    >
      <div class="btnList">
        <el-button type="success" @click="handleSave" :disabled="hasNotEdit">{{this.$t("public.save")}}</el-button>
        <el-button type="warning" @click="handleClose">{{this.$t("public.close")}}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="qcCheckPlanForm" :option="qcCheckPlanFormOp" v-model="qcCheckPlanFormData">
           <template  slot="vatNo">
              <el-select
                v-model="qcCheckPlanFormData.vatNo"
                filterable
                remote
                reserve-keyword
                clearable
                default-first-option
                placeholder="请输入缸号"
                :remote-method="remoteMethod"
                :loading="vatLoading"
                @change="vatChange"
              >
                <el-option
                  v-for="item in vatOptions"
                  :key="item.runJobId"
                  :label="item.vatNo"
                  :value="item.vatNo"
                >
                </el-option>
              </el-select>
            </template>
        </avue-form>
      </div>
      <view-container title="载具出库计划进度 ">
        <div class="btnList">
          <el-button type="primary" @click="handleStoreAdd">{{ this.$t("public.add") }}</el-button>
          <el-button type="danger" @click="handleStoreDel">{{ this.$t("public.del") }}</el-button>
        </div>
        <div class="crudBox">
          <avue-crud ref="qcCheckStorePlanCrud" :option="qcCheckStorePlanCrudOp" :data="qcCheckStorePlanList" @row-click="handleStoreRowClick"></avue-crud>
        </div>
      </view-container>
    </view-container>
  </div>
</template>

<script>
import { fetchQcCheckPlanByPage, fetchBleadyeRunJobByPage, fetchFinishedNote, removeQcCheckStoreData,
  addQcCheckPlanData, updateQcCheckPlanData, fetchQcCheckStorePlanByPage, addQcCheckStorePlanData, updateQcCheckStorePlanData} from './api.js'
import { mainCrud,qcCheckStorePlanCrud } from './data.js'
export default {
  components: {},
  props: {
    planId: String
  },
  data() {
    return {
      loading: false,
      vatLoading: false,
      qcCheckPlanFormOp: mainCrud(this),
      qcCheckPlanFormData: {},
      qcCheckStorePlanCrudOp: qcCheckStorePlanCrud(this),
      qcCheckStorePlanList: [],
      dtlCurIdx: null,
      vatOptions: [],
      hasRefresh: false
    };
  },
  watch: {},
  computed: {
    hasNotEdit() {
      return this.qcCheckPlanFormData.stockState == "1";
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async initData(planId){
      this.loading = true;
      fetchQcCheckPlanByPage({
        planId
      }).then(async res =>{
        res.data.total && (this.qcCheckPlanFormData = res.data.records[0]);
        this.qcCheckStorePlanList = []
        let storeRes = await fetchQcCheckStorePlanByPage({qcCheckPlanFk: this.qcCheckPlanFormData.planId});
        if (storeRes.data.total) {
          this.qcCheckStorePlanList = storeRes.data.records.sort((a,b) => a.waitOutSn - b.waitOutSn).map((item => Object.assign(item,{$cellEdit: true})));
        }
        this.dtlCurIdx = null;
      }).finally(() =>{
        setTimeout(() => {
          this.loading = false;
        }, 200);
      })
    },
    addAndcreateData(planId){ 
      if (planId) { return this.initData(planId); }
      // 初始化新增数据
      let planDate, planStart, planEnd;
      planDate = planStart = planEnd = this.$getNowTime("datetime");
      this.qcCheckPlanFormData = {
        planDate,
        planStart,
        planEnd,
        storeCodes: '',
        sumPid: '',
        samplCount: 0,
        vatNo: ''
      };
      this.qcCheckStorePlanList = [];
    },
    async remoteMethod(val){
      this.vatLoading = true;
      fetchBleadyeRunJobByPage({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
        delFlag: false,
      }).then((res) => {
        this.vatOptions = res.data.records;
        this.vatLoading = false;
        this.$nextTick(() => {
          if (res.data.records.length == 1) {
            this.loading = true
            this.qcCheckPlanFormData.vatNo = res.data.records[0].vatNo;
            this.vatChange();
          }
        });
      });
    },
    vatChange(val) {
      fetchBleadyeRunJobByPage({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
      }).then(async (res) => {
        // 查询总疋数
        this.vatList = res.data.records;
        let params = { vatNo: this.qcCheckPlanFormData.vatNo };
        this.qcCheckPlanFormData.sumPid = await fetchFinishedNote(params).then(res => res.data.length);
      }).finally(() =>{
        setTimeout(() => {
          this.loading = false
        }, 200);
      })
    },
    handleStoreRowClick(val){
      this.dtlCurIdx = val.$index + 1;
    },   
    handleSave(){
      this.$refs.qcCheckPlanForm.validate(async(valid, done) =>{
        this.loading = true;
        try {
          if(!valid){
            this.$tip.error("请补充查布计划表信息!");
            return;
          }
          let planId = this.qcCheckPlanFormData.planId;
          if (planId) {
            updateQcCheckPlanData(this.qcCheckPlanFormData).then();
          }else{
            planId = await addQcCheckPlanData(this.qcCheckPlanFormData).then(res => { return res.data.data });
            this.qcCheckPlanFormData.planId = planId;
          }
          this.hasRefresh = true;
          await this.saveCheckStorePlan();
          await this.initData();
          this.$tip.success("保存成功!");
          setTimeout(() => {
            this.loading = false;
            done();
          }, 200);
        } catch (err) {
          this.loading = false;
          this.$tip.error(err);
        }
      })
    },
    async saveCheckStorePlan(){
      let proList = []
      this.qcCheckStorePlanList.forEach(item => {
        if (item.subPlanId) {
          proList.push(updateQcCheckStorePlanData(item))
        }else{
          item.qcCheckPlanFk = this.qcCheckPlanFormData.planId;
          proList.push(addQcCheckStorePlanData(item))
        }
      });
      return Promise.all(proList);
    },
    handleStoreAdd(){
      console.log("ss");
      this.qcCheckStorePlanList.push({
        waitOutSn: this.qcCheckStorePlanList.length + 1,
        outFlag: false,
        returnFlag: false,
        $cellEdit: true
      })
    },
    async handleStoreDel(){
      if (!this.dtlCurIdx) { return this.$tip.warning("请先选择要删除的数据!") }
      let idx = this.dtlCurIdx - 1;
      if (!this.qcCheckStorePlanList[idx].subPlanId) {
        this.qcCheckStorePlanList.splice(idx,1);
        this.dtlCurIdx = null;
        this.$refs.qcCheckStorePlanCrud.setCurrentRow();
        return;
      }
      let cofResult = await this.$tip.cofirm("是否确定删除布笼号为【 " +  this.qcCheckStorePlanList[idx].storeLoadCode  + " 】的数据?").then(() => {return true}).catch((e) => {return false});
      if(!cofResult) return false;
      this.loading = true;
      removeQcCheckStoreData(this.qcCheckStorePlanList[idx].subPlanId).then(res =>{
        let delRes = res.data;
        if (delRes.code != 200) {this.$tip.error("删除失败!" + res.data.msg); return;}
        this.qcCheckStorePlanList.splice(idx,1);
        this.$tip.success("删除成功");
        this.dtlCurIdx = null;
        this.$refs.qcCheckStorePlanCrud.setCurrentRow();
      }).finally(()=>{ this.loading = false });
    },
    handleClose(){
      this.$emit("close", this.hasRefresh);
      this.hasRefresh = false;
    }
  },
};
</script>
<style lang="stylus" scoped>
.qcChcekPlanTem {
}
</style>