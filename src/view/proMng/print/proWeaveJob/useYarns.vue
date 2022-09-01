<!--
 * @Author: Lyl
 * @Date: 2022-08-31 08:20:31
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-01 10:15:30
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
              <el-button @click="handleAdd(0)" type="primary">{{ $t("public.add") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
              <el-button @click="handleDelUseYarn" type="danger">{{ $t("public.del") }}</el-button>
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
              <el-button @click="handleAdd(1)" type="primary">{{ $t("public.add") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
              <el-button @click="handleDelYarnAllot" type="danger">{{ $t("public.del") }}</el-button>
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
import choice from "@/components/proMng/index";
import { yarnCrud, weaveJobyarnallotCrud } from "./data"
import { getYarn, addYarn, updateYarn, delYarn, fetchProWeaveJobYarnallotData, CreateProWeaveJobYarnallotData, updateProWeaveJobYarnallotData, removeProWeaveJobYarnallotData } from "./api"
export default {
  components: {
    choice
  },
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
      rowSelectData: null,
      allotRowSelectData: null,
      addSgin: 0, // 0 用纱明细 1实际用纱
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
      this.rowSelectData = {};
      this.useYarnsCrudData = [];
      let params = {
        proWeaveJobFk: this.weaveJobInfo.weaveJobId,
        rows: this.page.pageSize,
        start: this.page.currentPage,
      }
      let yarnsData = await getYarn(params);
      this.useYarnsCrudData = yarnsData.data.records.sort((a,b) => a.sn - b.sn);
      this.page.total = yarnsData.data.total;
      this.useYarnsCrudData.length && this.$refs.useYarnsCrud.setCurrentRow();
      this.useLoading = false;
      this.wLoading = false;
    },
    async fetchYarnAllotData() {
      this.allotLoading = true;
      let allotData = await fetchProWeaveJobYarnallotData();
      this.rowSelectData.weaveJobyarnallotCrudData = allotData.data;
      this.allotLoading = false;
    },
    async handleSave() {
      this.wLoading = true;
      let validRes = await this.saveValid();
      if(!validRes) return;
      this.useYarnsCrudData.forEach(async (item) =>{
        if(item.useYarnId){
          await updateYarn(item);
          await item.weaveJobyarnallotCrudData.forEach((allot) =>{
            if(allot.detailId){
              updateProWeaveJobYarnallotData(item);
            }else{}
          })
        }
      })
    },
    saveValid() {
      this.useYarnsCrudData.forEach((item,i) =>{
        if(!item.amount){
          this.$tip.warning("纱线数量不能为空!")
          return false;
        }
      })
      return true
    },
    handleAdd(sgin) {
      this.addSgin = sgin; // 新增类型标记
      if (this.addSgin && !this.rowSelectData.sn) {
        this.$tip.warning("请先选择用纱资料!")
        return;
      }
      this.choiceV = true;
    },
    handleDelUseYarn() {
      this.$tip.cofirm("是否确定删除纱线编号为" + this.rowSelectData.yarnCode +"的數據?", this, {})
        .then(async () => {
          this.wLoading = true;
          if (!this.rowSelectData.useYarnId) {
            this.$tip.success(this.$t("public.sccg"));
          }else{
            await delYarn(this.rowSelectData.useYarnId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
          }
          this.useYarnsCrudData.splice(this.rowSelectData.sn - 1, 1);
          this.useYarnsCrudData.forEach((item,i) =>{
            item.sn = i + 1;
          })
          this.useYarnsCrudData.length && this.$refs.useYarnsCrud.setCurrentRow();
          this.wLoading = false;
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    handleDelYarnAllot(){
      this.$tip.cofirm("是否确定删除纱批为" + this.allotRowSelectData.factoryYarnBatch +"的數據?", this, {})
        .then(async () => {
          this.wLoading = true;
          if (!this.allotRowSelectData.detailId) {
            this.$tip.success(this.$t("public.sccg"));
          }else{
            await removeProWeaveJobYarnallotData(this.allotRowSelectData.detailId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
          }
          this.rowSelectData.weaveJobyarnallotCrudData.splice(this.allotRowSelectData.sn - 1, 1);
          this.rowSelectData.weaveJobyarnallotCrudData.forEach((item,i) =>{
            item.sn = i + 1;
          })
          this.rowSelectData.weaveJobyarnallotCrudData.length && this.$refs.weaveJobyarnallotCrud.setCurrentRow();
          this.wLoading = false;
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    handleCellClick(row) {
      this.rowSelectData = row;
      !this.rowSelectData.weaveJobyarnallotCrudData && (this.rowSelectData.weaveJobyarnallotCrudData = []);
    },
    handleAllotCellClick(row) {
      this.allotRowSelectData = row;
    },
    choiceData(list) {
      this.wLoading = true;
      if(this.addSgin) {
        list.forEach((item) => {
          this.rowSelectData.weaveJobyarnallotCrudData.push({
            sn:  this.rowSelectData.weaveJobyarnallotCrudData.length + 1,
            yarnCode: item.yarnsId,
            yarnName: item.yarnsName,
            yarnBatch: item.batId,
            yarnBrand: item.yarnsCard,
            factoryYarnBatch: item.batchNo,
            realAmount: 0
          });
        });
      }else{
        list.forEach((item) => {
          this.useYarnsCrudData.push({
            sn: this.useYarnsCrudData.length + 1,
            yarnCode: item.yarnsId,
            yarnName: item.yarnsName,
            yarnBatch: item.batId,
            yarnBrand: item.yarnsCard,
            factoryYarnBatch: item.batchNo,
            amount: 0,
            realAmount: 0,
            lossRate: 0,
            yarnRatio: 0,
            unit: item.weightUnit
          });
        });
      }
      setTimeout(() => {
        this.choiceV = false;
        this.wLoading = false;
      }, 200);
    }
  },
};
</script>
<style lang="stylus" scoped>
.useYarns{

}
</style>