<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-30 15:59:39
 * @FilePath: \iot.vue\src\view\quaLity\abnormalDaily\tem.vue
 * @Description: 
-->
<template>
  <div class="qcChcekPlanTem">
    <view-container title="QA产能统计管理" element-loading-text="正在拼命加载中..." v-loading="loading">
      <div class="btnList">
        <el-button type="success" @click="handleSave">{{this.$t("public.save")}}</el-button>
        <el-button type="warning" @click="handleClose">{{this.$t("public.close")}}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="qcCheckPlanForm" :option="qcCheckPlanFormOp" v-model="qcCheckPlanFormData">
          <template slot-scope="scope" slot="vatNo">
            <el-select v-model="qcCheckPlanFormData.vatNo" filterable remote reserve-keyword clearable default-first-option placeholder="请输入缸号" :remote-method="remoteMethod" :loading="vatLoading" @change="handleVatnoChange">
              <el-option v-for="item in options" :key="item.runJobId" :label="item.vatNo" :value="item.vatNo">
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </div>
    </view-container>
  </div>
</template>

<script>
import {
  fetchQcCheckClothDayDetailByPage, addQcCheckClothDayDetail, updateQcCheckClothDayDetail, getRunJobByPage, getFinishedNoteList,
} from "./api.js";
import { mainCrud, qcCheckStorePlanCrud } from "./data.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      vatLoading: false,
      qcCheckPlanFormOp: mainCrud(this),
      qcCheckPlanFormData: {},
      qcCheckStorePlanCrudOp: qcCheckStorePlanCrud(this),
      dtlCurIdx: null,
      vatOptions: [],
      hasRefresh: false,
      options: [],
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.remoteMethod("")
  },
  methods: {
    remoteMethod(val) {
      this.vatLoading = true;
      getRunJobByPage({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
        page: 1,
      }).then((res) => {
        this.options = res.data.records;
        this.$nextTick(() => {
          if (res.data.records.length == 1) {
            this.qcCheckPlanFormData.custId = res.data.records[0].custCode;
            this.qcCheckPlanFormData.fabName = res.data.records[0].fabName;
            this.qcCheckPlanFormData.colorName = res.data.records[0].colorName;
            this.getVatNoWeightAndSumpid(res.data.records[0].vatNo)
          }else{
            this.vatLoading = false;
          }
        });
      });
    },
    handleVatnoChange(vatNo) {
      this.loading = true
      getRunJobByPage({
        vatNo,
        rows: 10,
        start: 1,
        page: 1,
      }).then((vatRes) => {
        if (vatRes.data.records.length) {
          let data =  vatRes.data.records[0];
          this.qcCheckPlanFormData.salPo = data.salPoNo;
          this.qcCheckPlanFormData.deliveryDate = data.deliveDate;
          this.qcCheckPlanFormData.custId = data.custCode;
          this.qcCheckPlanFormData.fabName = data.fabName;
          this.qcCheckPlanFormData.colorName = data.colorName;
          this.getVatNoWeightAndSumpid(data.vatNo)
        }else{
          this.loading = false
        }
      })
    },
    getVatNoWeightAndSumpid(vatNo){
      getFinishedNoteList({vatNo: vatNo}).then( res =>{
        if (!res.data.length) {
          this.qcCheckPlanFormData.chkQty = 0
          this.qcCheckPlanFormData.checkPcount = 0
          this.vatLoading = false;
          this.loading = false
          return
        }
        this.qcCheckPlanFormData.chkQty = res.data.reduce((pre,cur) =>{
          return  pre + cur.grossWeightLbs
        }, 0)
        this.qcCheckPlanFormData.checkPcount = res.data.length
        this.vatLoading = false;
        this.loading = false
      })
    },
    async initData(detailId) {
      this.loading = true;
      fetchQcCheckClothDayDetailByPage({
        detailId,
      })
        .then(async (res) => {
          res.data.total && (this.qcCheckPlanFormData = res.data.records[0]);
          !res.data.total && this.handleClose();
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },
    addAndcreateData(detailId) {
      if (detailId) {
        return this.initData(detailId);
      }
      // 初始化新增数据
      this.qcCheckPlanFormData = {
        detailId: '',
        checkPcount: null,
        chkTrblPcount: null,
        chkQty: null,
        sumTrblQty: null,
        vatNo: '',
        custId: '',
        fabName: '',
        chargeDpt: '',
        problemDesc: '',
        solution: '',
        remark: '',
        qcConfirDate: this.$getNowTime("datetime")
      };
    },
    handleStoreRowClick(val) {
      this.dtlCurIdx = val.$index + 1;
    },
    handleSave() {
      this.$refs.qcCheckPlanForm.validate(async (valid, done) => {
        try {
          if (!valid) {
            this.$tip.error("请补充查布计划表信息!");
            return;
          }
          this.loading = true;
          let detailId = this.qcCheckPlanFormData.detailId;
          if (detailId) {
            await updateQcCheckClothDayDetail(this.qcCheckPlanFormData).then();
          } else {
            this.qcCheckPlanFormData.checkDate = this.$getNowTime("datetime")
            detailId = await addQcCheckClothDayDetail(this.qcCheckPlanFormData).then(
              (res) => {
                return res.data.data;
              }
            );
            this.qcCheckPlanFormData.detailId = detailId;
          }
          this.hasRefresh = true;
          await this.initData(detailId);
          this.$tip.success("保存成功!");
          setTimeout(() => {
            this.loading = false;
            done();
          }, 200);
        } catch (err) {
          done()
          this.loading = false;
          this.$tip.error(err);
        }
      });
    },
    handleClose() {
      this.$emit("close", this.hasRefresh);
      this.hasRefresh = false;
    },
  },
};
</script>
<style lang="stylus" scoped>
.qcChcekPlanTem {
}
</style>