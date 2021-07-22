<!--
 * @Author: Lyl
 * @Date: 2021-02-24 08:12:20
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-19 08:44:40
 * @Description: 
-->
<template>
  <div id="name">
    <div class="btnList">
      <el-button type="primary" @click="add">{{
        this.$t("public.add")
      }}</el-button>
      <el-button type="danger" @click="del">{{
        this.$t("public.del")
      }}</el-button>
      <el-button type="primary" @click="batchAdd">{{
        $t("choicDlg.plsc")
      }}</el-button>
    </div>

    <div class="crudBox">
      <avue-crud
        ref="crud"
        id="inwhse_ph"
        :option="loc1C"
        :data="inData.loc"
        :page.sync="page"
        v-loading="loading"
        @current-row-change="cellClick"
      >
      </avue-crud>
    </div>
    <el-dialog
      id="wkRuleDlg"
      :visible.sync="batchV"
      width="80%"
      append-to-body
      :close-on-click-modal="false"
      v-if="batchV"
    >
      <view-container :title="$t('choicDlg.plscph')">
        <div class="btnList">
          <el-button type="success" @click="batch">{{
            $t("public.sc")
          }}</el-button>
          <el-button type="warning" @click="batchV = false">{{
            $t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-form
            ref="creatForm"
            :option="formOp"
            v-model="creatForm"
          ></avue-form>
        </div>
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import choice from "@/components/choice";
import { loc2C, creatOutForm } from "./data";
export default {
  // 傳進來要新增刪除修改的值，不在此做保存操作，僅做顯示功能
  props: {
    inData: {},
    api: Object,
    form: Object,
    loc: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "pb",
    },
  },
  components: {
    choice: choice,
  },
  data() {
    return {
      loc1C: loc2C(this),
      crud: [],
      formOp: creatOutForm(this),
      creatForm: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      oldData: {},
      chooseData: {},
      oldPhData: {},
      batchV: false,
    };
  },
  watch: {
    inData() {
      this.creatForm.batchNo =
        this.type == this.$t("iaoMng.pb") ? this.inData.batchNo : "";
      if (this.inData.loc) {
        this.$refs.crud.setCurrentRow(this.inData.loc[0]);
        if (this.inData.loc.length === 0) {
          this.query();
        }
      }
    },
  },
  methods: {
    query() {
      if (
        !this.inData.whseMaterialDlaoid &&
        !this.inData.whseFinclothselloutDtlaoid
      ) {
        return; // 沒有通行證 不給請求數據
      }
      // 沒有貨位信息時重新請求數據
      this.loading = true;
      this.loc1C.showSummary = false;
      this.chooseData = {};
      this.api
        .getLoc({
          rows: 999,
          start: 1,
          whseMaterialDlaFk: this.inData.whseMaterialDlaoid,
          whseFinclothselloutDtlaFk: this.inData.whseFinclothselloutDtlaoid,
        })
        .then((res) => {
          let records = res.data;
          // this.page.total = records.total;
          this.inData.loc = records.records;
          if (this.inData.loc.length === 0) {
            this.loading = false;
          }
          this.inData.loc.sort((a, b) => {
            return a.countingNo - b.countingNo;
          });
          this.inData.loc.forEach((item, index) => {
            item.index = index + 1;
          });
          setTimeout(() => {
            this.loc1C.showSummary = true;

            this.loading = false;
          }, 200);
        });
    },
    add() {
      if (this.inData && Object.keys(this.inData).length != 0) {
        this.inData.loc.push({
          index: this.inData.loc.length + 1,
          batchNo:
            this.type == this.$t("iaoMng.pb")
              ? this.inData.batchNo || this.inData.loc.slice(-1)[0].batchNo
              : "",
          countingNo:
            this.inData.loc.length > 0
              ? Number(this.inData.loc.slice(-1)[0].countingNo) + 1
              : 1,
          weightUnit: this.inData.weiUnit
            ? this.inData.weiUnit
            : this.inData.loc.length != 0
            ? this.inData.loc.slice(-1)[0].weightUnit
            : "KG",
          woUnit: this.inData.weiUnit
            ? this.inData.weiUnit
            : this.inData.loc.length != 0
            ? this.inData.loc.slice(-1)[0].woUnit
            : "KG",

          custTicket: "",
        });
        this.$refs.crud.setCurrentRow(
          this.inData.loc[this.inData.loc.length - 1]
        );
        this.$nextTick(() => {
          this.$toTableLow(this, "inwhse_ph");
        });
      } else {
        this.$tip.error(this.$t("public.qxxzmx"));
      }
    },
    batchAdd() {
      if (this.inData && Object.keys(this.inData).length != 0) {
        this.batchV = true;
      } else {
        this.$tip.error(this.$t("public.qxxzmx"));
      }
    },
    del() {
      // return;
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (
        !this.chooseData.whseMaterialDlboid &&
        !this.chooseData.whseFinclothselloutDtlboid
      ) {
        this.inData.loc.splice(this.chooseData.index - 1, 1);
        this.$refs.crud.setCurrentRow(this.inData.loc[0] || {});
        this.inData.loc.forEach((item, i) => {
          item.index = i + 1;
        });
        return;
      }
      let data = "";
      if (this.type == this.$t("iaoMng.pb")) {
        data =
          this.$t("iaoMng.delTle8") +
          this.chooseData.batchNo +
          this.$t("iaoMng.delTle2");
      } else {
        data =
          this.$t("iaoMng.delTle9") +
          this.chooseData.prodNo +
          this.$t("iaoMng.delTle2");
      }
      this.$tip
        .cofirm(data, this, {})
        .then(() => {
          this.api
            .delLoc(
              this.type == this.$t("iaoMng.pb")
                ? this.chooseData.whseMaterialDlboid
                : this.chooseData.whseFinclothselloutDtlboid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.inData.loc.splice(this.chooseData.index - 1, 1);
                this.$refs.crud.setCurrentRow(this.inData.loc[0] || {});
                this.inData.loc.forEach((item, i) => {
                  item.index = i + 1;
                });
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    cellClick(val) {
      // 切換可編輯狀態
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    batch() {
      // 批量生成
      this.$refs.creatForm.validate((valid) => {
        // 验证
        if (valid) {
          // this.$emit("batch", this.creatForm);
          this.loading = true;
          let index = this.inData.loc.length;
          for (let i = 0; i < this.creatForm.num; i++) {
            this.inData.loc.push({
              index: index + i + 1,
              batchNo:
                this.type == this.$t("iaoMng.pb") ? this.inData.batchNo : "",
              countingNo: index + i + 1,
              weight: this.creatForm.weight,
              weightUnit: this.creatForm.weightUnit,
              custTicket: this.creatForm.custTicket,
            });
          }
          setTimeout(() => {
            if (this.crud.length > 0) {
              this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
            }

            this.loading = false;
            this.batchV = false;
          }, 200);
        }
      });
    },
  },
  mounted() {
    this.creatForm.weightUnit = "KG";
  },
};
</script>

<style lang='stylus' ></style>