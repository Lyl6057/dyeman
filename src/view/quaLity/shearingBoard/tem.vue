<!--
 * @Author: Lyl
 * @Date: 2022-05-03 16:29:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-28 09:03:27
 * @FilePath: \iot.vue\src\view\quaLity\shearingBoard\tem.vue
 * @Description: 
-->
<template>
  <div class="qcChcekPlanTem">
    <view-container title="QA剪办记录维护" element-loading-text="正在拼命加载中..." v-loading="loading">
      <div class="btnList">
        <el-button type="success" @click="handleSave">{{this.$t("public.save")}}</el-button>
        <el-button type="warning" @click="handleClose">{{this.$t("public.close")}}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="qcCheckPlanForm" :option="qcShearingBoardFormOp" v-model="qcShearingBoardData">
          <template slot-scope="scope" slot="productNo">
            <el-select v-model="qcShearingBoardData.productNo" filterable remote reserve-keyword clearable default-first-option placeholder="请输入成品编号" :remote-method="remoteMethod" :loading="vatLoading" @change="handleVatnoChange">
              <el-option v-for="item in options" :key="item.cardId" :label="item.productNo" :value="item.productNo">
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </div>
    </view-container>
  </div>
</template>

<script>
import { getLoginOrg } from "@/api/index";
import {
  fetchProFinalProductCardCutByPage,
  addProFinalProductCardCut,
  updateProFinalProductCardCut,
  getFinishedNoteByPage,
} from "./api.js";
import { crateDataForm, qcCheckStorePlanCrud } from "./data.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      vatLoading: false,
      qcShearingBoardFormOp: crateDataForm(this),
      qcShearingBoardData: {},
      dtlCurIdx: null,
      vatOptions: [],
      hasRefresh: false,
      options: [],
      cutDept: null,
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.remoteMethod("");
  },
  methods: {
    remoteMethod(val) {
      this.vatLoading = true;
      getFinishedNoteByPage({
        productNo: "!^%" + val,
        rows: 20,
        start: 1,
        page: 1,
        cardType: 1,
      }).then((res) => {
        this.options = res.data.records;
        this.vatLoading = false;
      });
    },
    handleVatnoChange(productNo) {
      this.loading = true;
      getFinishedNoteByPage({
        productNo,
        rows: 10,
        start: 1,
        page: 1,
        cardType: 1,
      }).then((vatRes) => {
        if (vatRes.data.records.length) {
          let data = vatRes.data.records[0];
          this.qcShearingBoardData.netWeight = data.netWeight;
          this.qcShearingBoardData.netWeightLbs = data.netWeightLbs;
          this.qcShearingBoardData.befcutYds = data.yardLength;
          this.qcShearingBoardData.proCardFk = data.cardId;
        }
        this.loading = false;
      });
    },
    async initData(cutId) {
      this.loading = true;
      fetchProFinalProductCardCutByPage({
        cutId,
      })
        .then(async (res) => {
          res.data.total && (this.qcShearingBoardData = res.data.records[0]);
          !res.data.total && this.handleClose();
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 200);
        });
    },
    async addAndcreateData(cutId) {
      this.loading = true;
      if (cutId) {
        return this.initData(cutId);
      }
      if (!this.cutDept) {
        await getLoginOrg({ account: parent.userID }).then((res) => {
          this.cutDept = res.data.orgname;
        });
      }
      // 初始化新增数据
      this.qcShearingBoardData = {
        cutId: "",
        productNo: "",
        cutDate: this.$getNowTime("date") + " 00:00:00",
        cutDept: this.cutDept,
        respDept: "",
        netWeight: 0,
        netWeightLbs: 0,
        cutSamWeight: 0,
        cutSamWeightLbs: 0,
        cutDefeWeight: 0,
        cutDefeWeightLbs: 0,
        befcutYds: 0,
        cutYds: 0,
        cutRemarks: "",
      };
      await this.$nextTick();
      this.loading = false;
    },
    handleStoreRowClick(val) {
      this.dtlCurIdx = val.$index + 1;
    },
    async calculateYardLength(id) {
      let res = await getFinishedNoteByPage({
        cardId: id,
        rows: 20,
        start: 1,
        page: 1,
      });
      let data = res.data.records[0];
      let {
        realGramWeight,
        actualSideBreadth,
        netWeight,
        gramWeightUnit,
        widthUnit,
      } = data;
      let gramWeight, breadth;
      if (!realGramWeight || !actualSideBreadth || !netWeight) {
        return;
      }
      gramWeight =
        gramWeightUnit == "Kg"
          ? Number(realGramWeight)
          : Number(realGramWeight / 1000);
      breadth =
        widthUnit == "INCH"
          ? Number((actualSideBreadth * 2.54) / 100)
          : Number(actualSideBreadth / 100);

      let yardLength = parseInt(
        Number(netWeight / gramWeight / breadth) * 1.0936
      );
      return yardLength;
    },
    handleSave() {
      this.$refs.qcCheckPlanForm.validate(async (valid, done) => {
        try {
          if (!valid) {
            this.$tip.error("请补充查布计划表信息!");
            return;
          }
          // this.loading = true;
          let cutId = this.qcShearingBoardData.cutId;
          // 计算码长
          let yardLength = await this.calculateYardLength(
            this.qcShearingBoardData.proCardFk
          );
          this.qcShearingBoardData.cutYds = yardLength
          if (cutId) {
            await updateProFinalProductCardCut(this.qcShearingBoardData).then();
          } else {
            this.qcShearingBoardData.saveTime = this.$getNowTime("datetime");
            cutId = await addProFinalProductCardCut(
              this.qcShearingBoardData
            ).then((res) => {
              return res.data.data;
            });
            this.qcShearingBoardData.cutId = cutId;
          }
          this.hasRefresh = true;
          await this.initData(cutId);
          this.$tip.success("保存成功!");
          setTimeout(() => {
            this.loading = false;
            done();
          }, 200);
        } catch (err) {
          done();
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