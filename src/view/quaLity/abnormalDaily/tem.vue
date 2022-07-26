<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-07 08:19:22
 * @FilePath: \iot.vue\src\view\quaLity\abnormalDaily\tem.vue
 * @Description: 
-->
<template>
  <div class="qcChcekPlanTem">
    <view-container title="QA产能统计管理" element-loading-text="正在拼命加载中..." v-loading="loading">
      <div class="btnList">
        <el-tooltip class="item" effect="dark" content="Lưu lại" placement="bottom">
          <el-button type="success" @click="handleSave">{{ this.$t("public.save") }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="In báo cáo bất thường" placement="bottom">
          <el-button type="primary" @click="handleCreateAbnormal()" :disabled="!id">打印异常报告</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="In đơn sửa chữa" placement="bottom">
          <el-button type="primary" @click="handleCreateOrder()" :disabled="!id">打印回修单</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Thoát" placement="bottom">
          <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
        </el-tooltip>

      </div>
      <div class="formBox">
        <avue-form ref="qcCheckPlanForm" :option="qcCheckPlanFormOp" v-model="qcCheckPlanFormData">
          <template slot-scope="scope" slot="vatNo">
            <el-select v-model="qcCheckPlanFormData.vatNo" filterable remote reserve-keyword clearable
              default-first-option placeholder="请输入缸号" :remote-method="remoteMethod" :loading="vatLoading"
              @change="handleVatnoChange">
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
  fetchQcCheckClothDayDetailByPage,
  addQcCheckClothDayDetail,
  updateQcCheckClothDayDetail,
  getRunJobByPage,
  getFinishedNoteList,
  fetchQcClothBackRepairByPage,
  updateQcClothBackRepair,
  addQcClothBackRepair
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
      id: "",
    };
  },
  watch: {},
  computed: {},
  created() { },
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
          } else {
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
          let data = vatRes.data.records[0];
          this.qcCheckPlanFormData.salPo = data.salPoNo;
          this.qcCheckPlanFormData.deliveryDate = data.deliveDate;
          this.qcCheckPlanFormData.custId = data.custCode;
          this.qcCheckPlanFormData.fabName = data.fabName;
          this.qcCheckPlanFormData.colorName = data.colorName;
          this.getVatNoWeightAndSumpid(data.vatNo)
        } else {
          this.loading = false
        }
      })
    },
    getVatNoWeightAndSumpid(vatNo) {
      getFinishedNoteList({ vatNo: vatNo }).then(res => {
        if (!res.data.length) {
          this.qcCheckPlanFormData.chkQty = 0
          this.qcCheckPlanFormData.checkPcount = 0
          this.vatLoading = false;
          this.loading = false
          return
        }
        this.qcCheckPlanFormData.chkQty = res.data.reduce((pre, cur) => {
          return pre + cur.grossWeightLbs
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
          this.id = res.data.records[0].detailId
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
        qcChecker: parent.userID,
        qcConfirDate: this.$getNowTime("datetime")
      };
      this.id=""
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
    handleCreateAbnormal() {
      window.open(process.env.API_HOST + '/api/qcCheckClothDayDetail/qaDailyPdf?id=' + this.qcCheckPlanFormData.detailId); //row.detailId
    },
    async handleCreateOrder() {
      this.wloading = true
      let detailRes = await fetchQcClothBackRepairByPage({ dayDetailfFk: this.qcCheckPlanFormData.detailId })
      let params = {
        dayDetailfFk: this.qcCheckPlanFormData.detailId,
        ...this.qcCheckPlanFormData
      }
      if (detailRes.data.total) {
        await updateQcClothBackRepair(params)
        window.open(process.env.API_HOST + '/api/qcClothBackRepair/repairPdf?id=' + detailRes.data.records[0].repairId)
      } else {
        let addRes = await addQcClothBackRepair(params)
        window.open(process.env.API_HOST + '/api/qcClothBackRepair/repairPdf?id=' + addRes.data.data)
      }
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