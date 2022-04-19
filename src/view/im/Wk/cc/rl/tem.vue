<template>
  <div id="rcDetail">
    <view-container
      :title="datas.type.split('_')[0] + '资料'"
      v-loading="loading"
      element-loading-text="正在拼命保存中..."
      element-loading-spinner="el-icon-loading"
    >
      <div class="btnList">
        <el-button
          type="success"
          @click="save"
          :disabled="detail.stockState == '1'"
          >{{ this.$t("public.save") }}</el-button
        >
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row>
        <el-col :span="24">
          <view-container :title="datas.type.split('_')[0] + '明细'">
            <div class="btnList" style="margin-bottom: 2px">
              <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->
              <el-button
                type="primary"
                @click="add"
                v-if="canSave"
                :disabled="detail.stockState == '1'"
                >{{ this.$t("public.add") }}</el-button
              >
              <el-button
                type="danger"
                @click="del"
                v-if="canSave"
                :disabled="detail.stockState == '1'"
                >{{ this.$t("public.del") }}</el-button
              >

              <!-- <el-button type="warning" @click="getDetail">取消</el-button>
       -->
            </div>
            <avue-crud
              ref="dlgcrud"
              :option="mxOp"
              v-loading="tloading"
              :data="mx"
              :page.sync="page"
              @current-row-change="cellClick"
              @on-load="getDetail"
            ></avue-crud> </view-container
        ></el-col>
      </el-row>
    </view-container>
    <choice
      ref="choice"
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      dlgWidth="100%"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
    <pro-choice
      ref="proChoice"
      :choiceV="proChoiceV"
      :choiceTle="proChoiceTle"
      :choiceQ="proChoiceQ"
      dlgWidth="100%"
      @choiceData="proChoiceData"
      @close="proChoiceV = false"
      v-if="proChoiceV"
    ></pro-choice>
    <!-- <bas-dyestuff
      :showDlg="otherV"
      :dlgTle="this.$t('whseField.xzwjxzyp')"
      @choiceData="choiceDyestuff"
      @close="otherV = false"
    >
    </bas-dyestuff> -->
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F, rsxkr3C, planCrud } from "./data";
import choice from "@/components/choice";
import proChoice from "@/components/proMng/index";
import {
  // 明细
  getRlDtl,
  addRlDtl,
  updateRlDtl,
  delRlDtl,
} from "@/api/im/Wk/cc/rl";
import { baseCodeSupply, updatePurApp } from "@/api/index";
export default {
  props: {
    datas: Object,
    everyThing: Object,
    hide: String,
    detail: Object,
    isPlan: Boolean,
    PlanForm: Object,
    isAdd: Boolean,
  },
  name: "",
  components: {
    choice: choice,
    proChoice: proChoice,
  },
  data() {
    return {
      loading: false,
      tloading: false,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [20, 50, 100, 200, 500],
      },
      rcPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      formOp: rsxkr2F(this),
      mxOp: rsxkr2C(this),
      mx: [],
      other: [],
      form: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      canLeave: false,
      ruleV: false,
      sxform: {},
      outform: {},
      outformOp: rsxkr2F(this),
      outcrudOp: rsxkr2C(this),
      outcrud: [],
      sxcrud: [],
      sxpage: {},
      rcData: [],
      sxloading: false,
      rcloading: false,
      sxcheckList: [],
      planData: {},
      func: {},
      dlgTle: "選擇紗線配料",
      choosePh: {},
      isPh: false,
      canSave: true,
      outloading: false,
      choiceV: false,
      choiceTle: "选择订单胚布资料",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      saved: false,
      sysCreatedby: "",
      otherV: false,
      proChoiceV: false,
      proChoiceTle: "选择能源入仓信息",
      proChoiceQ: {},
      purApp: {},
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.chooseData = {};
      if (this.hide === "1") {
        this.func.getDetail = getRlDtl;
        this.func.delDetail = delRlDtl;
        this.func.updateDetail = updateRlDtl;
        this.func.addDetail = addRlDtl;
        // this.mxOp = rsxkr3C(this);
      }
      //  else if (this.hide === "4") {
      //   this.func.getDetail = getRetsupDtl;
      //   this.func.delDetail = delRetsupDtl;
      //   this.func.updateDetail = updateRetsupDtl;
      //   this.func.addDetail = addRetsupDtl;
      // } else if (this.hide === "5") {
      //   this.func.getDetail = getTraDtl;
      //   this.func.delDetail = delTraDtl;
      //   this.func.updateDetail = updateTraDtl;
      //   this.func.addDetail = addTraDtl;
      // }
      if (this.isAdd) {
        this.form = this.detail;
        // this.form.retType = "1";
        if (this.hide === "4") {
          this.$nextTick(() => {
            this.$set(this.mxOp.column[3], "hide", true);
          });
        }
        if (this.hide === "1") {
          this.mxOp.column[3].hide = true;
          // this.mxOp.column[5].hide = true;
          // this.mxOp.column[8].hide = true;
          return;
        }
      }
      this.tloading = true;
      if (this.hide === "1") {
        this.mxOp.column[3].hide = false;
        // this.mxOp.column[5].hide = false;
        // this.mxOp.column[8].hide = false;
      }
      this.form = this.detail;
      this.form.appId = this.detail.appId;
      if (Object.keys(this.detail).length === 0) {
        this.mx = [];
        this.tloading = false;
        return;
      }
      this.func
        .getDetail({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseEnergyOutFk: this.detail.energyOutId,
          whseRetsuppaccessoriesFk: this.detail.whseRetsuppaccessoriesoid,
          whseTraaccessoriesFk: this.detail.whseTraaccessoriesoid,
        })
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.mx = records.records;
          if (this.mx.length === 0) {
            if (this.hide === "4") {
              this.$set(this.mxOp.column[3], "hide", true);
            }

            this.tloading = false;
          }
          this.mx.forEach((item, index) => {
            item.$cellEdit = true;
            item.index = index + 1;
            item.hardwareId = item.materialId;
            if (this.hide === "1") {
              item.bcClass = item.materialId;
              item.bcForce = item.materialId;
              item.bcColor = item.materialId;
              item.bcColorprison = item.materialId;
              item.model = item.materialId;
            }
            if (this.hide === "4" || this.hide === "5") {
              item.materialNum = item.whseAccessoriesDtlFk;
              item.batchNo = item.whseAccessoriesDtlFk;
              item.poQty = item.whseAccessoriesDtlFk;
              item.whseAccessoriesinFk = item.whseAccessoriesDtlFk;
            }
            if (index === this.mx.length - 1) {
              this.$nextTick(() => {
                this.$refs.dlgcrud.setCurrentRow();
                if (this.hide === "1") {
                  this.$set(this.mxOp.column[3], "hide", true);
                  // this.$set(this.mxOp.column[5], "hide", true);
                  // this.$set(this.mxOp.column[8], "hide", true);
                }
                if (this.hide === "4") {
                  this.$set(this.mxOp.column[3], "hide", true);
                  this.mx.forEach((item, index) => {
                    item.materialName = item.$materialNum;
                    item.model = item.$materialNum;
                    item.itemspec = item.$materialNum;
                  });
                }
                if (this.hide === "5") {
                  this.mx.forEach((item, index) => {
                    this.$set(item, "materialName", item.$materialNum);
                    // item.materialName = item.$materialNum;
                  });
                }
              });
              setTimeout(() => {
                this.tloading = false;
              }, 200);
            }
          });
        });
    },
    add() {
      if (this.hide === "1") {
        if (this.form.stockType === "1") {
          if (!this.form.appId) {
            this.$tip.warning("请先选择申购单!");
            return;
          }
          if (!this.isAdd) {
            this.$http
              .get("/api/purSingle?appId=" + this.form.appId)
              .then((res) => {
                this.choiceV = !this.choiceV;
                this.choiceQ.purSingleFk = res.data[0].purSingleoid;
                this.choiceTle = this.$t("choicDlg.xzsgdzl");
              });
          } else {
            this.choiceV = !this.choiceV;
            this.choiceQ.purSingleFk = this.form.purSingleoid;
            this.choiceTle = this.$t("choicDlg.xzsgdzl");
          }
        } else if (this.form.stockType === "2") {
          this.proChoiceV = true;
        } else {
          if (!this.form.appId) {
            this.$tip.warning("请先选择申请领用单!");
            return;
          }
          if (!this.isAdd) {
            this.$http
              .get("/api/purApplication?applyCode=" + this.form.appId)
              .then((res) => {
                this.choiceV = !this.choiceV;
                this.choiceQ.purApplicationFk = res.data[0].purApplicationoid;
                this.choiceTle = this.$t("choicDlg.xzsqlydmx");
              });
          } else {
            this.choiceV = !this.choiceV;
            this.choiceQ.purApplicationFk = this.form.purApplicationoid;
            this.choiceTle = this.$t("choicDlg.xzsqlydmx");
          }
        }
      } else if (this.hide === "4" || this.hide === "5") {
        this.choiceV = !this.choiceV;
        this.choiceField = "woOrderno";
        this.oldData = this.chooseData;
        this.choiceTarget = this.oldData;
        this.choiceTle = this.$t("choicDlg.xzwjxzrc");
      }
    },
    del() {
      if (
        this.chooseData == null ||
        Object.keys(this.chooseData).length === 0
      ) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (
        !this.chooseData.energyOutDtlId &&
        !this.chooseData.whseRetsuppaccessoriesDtloid &&
        !this.chooseData.whseTraaccessoriesDtloid
      ) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.dlgcrud.setCurrentRow();
        this.mx.forEach((i, index) => {
          i.index = index + 1;
        });
        this.page.total = this.mx.length;
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除编号为【 " +
            (this.hide === "6"
              ? this.chooseData.woMatno
              : this.hide === "4" || this.hide === "3" || this.hide === "5"
              ? this.chooseData.$materialNum
              : this.chooseData.materialId) +
            " 】的数据?",
          this,
          {}
        )
        .then(() => {
          this.func
            .delDetail(
              this.hide === "6"
                ? this.chooseData.whseCalicoselloutDtlaoid
                : this.hide === "4"
                ? this.chooseData.whseRetsuppaccessoriesDtloid
                : this.hide === "3"
                ? this.chooseData.whseRetguestcalicodtloid
                : this.hide === "5"
                ? this.chooseData.whseTraaccessoriesDtloid
                : this.chooseData.energyOutDtlId
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
                this.chooseData = {};
                // this.$refs.dlgcrud.setCurrentRow();
                // this.mx.forEach((item, i) => {
                //   item.index = i + 1;
                // });
                // this.page.total = this.mx.length;
                this.getDetail();
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
      this.chooseData = val;
    },
    close() {
      this.$emit("close", this.saved);
    },
    choiceDyestuff(val) {
      if (val.length === 0) {
        this.otherV = false;
        return;
      }
      val.forEach((item, i) => {
        item.materialId = item.hardwareId;
        item.materialName = item.chinName;
        item.topcategoryName = item.$basAdsuppliesFk || item.$basHardwareFk;
        item.seccategoryName =
          item.$basAdsuppliesDtlaFk || item.$basHardwareDtlaFk;
        item.stockUnit = item.msUnit;
      });
      this.mx = this.$unique(this.mx.concat(val), "hardwareId");
      // this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.mx.forEach((item, i) => {
        item.$cellEdit = true;
        item.index = i + 1;
      });
      this.page.total = this.mx.length;
      for (var key in val) {
        delete val[key];
      }
      this.otherV = false;
    },
    save() {
      if (this.hide === "1") {
        if (this.form.stockId == "" || this.form.stockDate == null) {
          this.$tip.error("出仓编号/日期不能为空!");
          return;
        }
        if (this.form.stockType == "1" && this.form.appId == "") {
          this.$tip.error("申购单不能为空!");
          return;
        } else if (this.form.stockType == "3" && this.form.appId == "") {
          this.$tip.error("申购领用单不能为空!");
          return;
        }
        for (let i = 0; i < this.mx.length; i++) {
          if (!this.mx[i].stockQty || !this.mx[i].stockUnit) {
            this.$tip.error("出货数量/单位不能为空!");
            this.loading = false;
            return;
          }
        }
      }
      if (this.hide === "4") {
        if (this.form.retCode == "" || this.form.retDate == null) {
          this.$tip.error("出仓编号/日期不能为空!");
          return;
        }
        for (let i = 0; i < this.mx.length; i++) {
          if (!this.mx[i].retQty) {
            this.$tip.error("退回數量不能为空!");
            this.loading = false;
            return;
          }
        }
      }
      if (this.hide === "5") {
        if (this.form.retCode == "" || this.form.retDate == null) {
          this.$tip.error("出仓编号/日期不能为空!");
          return;
        }
        if (this.form.traIn == "" || this.form.traOut == "") {
          this.$tip.error("调出仓/调入仓不能为空!");
          return;
        }
        if (this.form.traIn == this.form.traOut) {
          this.$tip.error("调出仓/调入仓不能相同!");
          return;
        }
        for (let i = 0; i < this.mx.length; i++) {
          if (!this.mx[i].traWeight) {
            this.$tip.error("调仓數量不能为空!");
            this.loading = false;
            return;
          }
        }
      }
      this.loading = true;
      this.saved = true;
      this.form.sysCreatedby = this.sysCreatedby;
      if (
        this.form.energyOutId ||
        this.form.whseRetsuppaccessoriesoid ||
        this.form.whseTraaccessoriesoid
      ) {
        this.everyThing.updateF(this.form).then((Res) => {
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
            return;
          }
          this.mx.forEach((item, i) => {
            item.model = item.$model;
            item.itemspec = item.$itemspec;
            if (
              item.energyOutDtlId ||
              item.whseRetsuppaccessoriesDtloid ||
              item.whseTraaccessoriesDtloid
            ) {
              // 更新
              this.func.updateDetail(item).then((res) => {});
            } else {
              // 新增
              item.whseEnergyOutFk = this.form.energyOutId;
              item.whseRetsuppaccessoriesFk =
                this.form.whseRetsuppaccessoriesoid;
              item.whseTraaccessoriesFk = this.form.whseTraaccessoriesoid;
              // if (this.form.stockType === "3") {
              //   item.appId = item.applyCode;
              // }
              this.func.addDetail(item).then((res) => {
                item.energyOutDtlId = res.data.data;
                item.whseRetsuppaccessoriesDtloid = res.data.data;
                item.whseTraaccessoriesDtloid = res.data.data;
              });
            }
            if (i === this.mx.length - 1) {
              this.loading = false;
              this.$tip.success(this.$t("public.bccg"));
            }
          });
        });
      } else {
        // if (this.form.stockType === "3") {
        //   this.form.appId = this.form.applyCode;
        // }
        this.everyThing.addF(this.form).then((Res) => {
          baseCodeSupply({ code: "whse_out" }).then((res) => {});
          updatePurApp(
            Object.assign(this.purApp, {
              collectSucceed: 1,
            })
          ).then((res) => {});
          this.form.energyOutId = Res.data.data;
          this.form.whseRetsuppaccessoriesoid = Res.data.data;
          this.form.whseTraaccessoriesoid = Res.data.data;
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
            return;
          }
          this.mx.forEach((item, i) => {
            if (
              item.energyOutDtlId ||
              item.whseRetsuppaccessoriesDtloid ||
              item.whseTraaccessoriesDtloid
            ) {
              // 更新
              this.func.updateDetail(item).then((res) => {});
            } else {
              // 新增
              item.whseEnergyOutFk = this.form.energyOutId;
              item.whseRetsuppaccessoriesFk =
                this.form.whseRetsuppaccessoriesoid;
              item.whseTraaccessoriesFk = this.form.whseTraaccessoriesoid;

              this.func.addDetail(item).then((res) => {
                item.energyOutDtlId = res.data.data;
                item.whseRetsuppaccessoriesDtloid = res.data.data;
                item.whseTraaccessoriesDtloid = res.data.data;
              });
            }
            if (i === this.mx.length - 1) {
              this.loading = false;
              this.$tip.success(this.$t("public.bccg"));
            }
          });
        });
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0 || val.length === 0 || val === null) {
        this.choiceV = false;
        return;
      }
      if (this.choiceTle === this.$t("choicDlg.xzsgd")) {
        this.form.appId = val.appId;
        this.form.purSingleoid = val.purSingleoid;
      } else if (this.choiceTle === this.$t("choicDlg.xzlyr")) {
        this.form.leader = val.perPersonoid;
      } else if (this.choiceTle === this.$t("choicDlg.xzsgdzl")) {
        this.tloading = true;
        if (this.hide === "1") {
          this.mxOp.column[3].hide = false;
          // this.mxOp.column[5].hide = false;
          // this.mxOp.column[8].hide = false;
        }
        val.forEach((item, i) => {
          item.$cellEdit = true;
          item.materialId = item.materialNum;
          item.materialName = item.chinName;
          item.company = item.company;
          item.stockUnit = item.company;
          item.bcColorprison = item.materialNum;
          item.bcColor = item.materialNum;
          item.bcClass = item.materialNum;
          item.bcForce = item.materialNum;
          item.stockQty = item.applyNum;
        });
        this.mx = this.mx.concat(val);
        // this.mx = this.unique(this.mx, "materialId");
        this.page.total = this.mx.length;
        this.mx.forEach((e, index) => {
          e.index = index + 1;
          if (index == this.mx.length - 1) {
            setTimeout(() => {
              this.$nextTick(() => {
                this.$set(this.mxOp.column[3], "hide", true);
                // this.$set(this.mxOp.column[5], "hide", true);
                // this.$set(this.mxOp.column[8], "hide", true);
                this.tloading = false;
              });
            }, 500);
          }
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzsqlydmx")) {
        this.tloading = true;
        if (this.hide === "1") {
          this.mxOp.column[3].hide = false;
          // this.mxOp.column[5].hide = false;
          // this.mxOp.column[8].hide = false;
        }
        val.forEach((item, i) => {
          item.$cellEdit = true;
          item.materialId = item.materielCode;
          item.materialName = item.materielName;
          item.company = item.company;
          item.stockUnit = item.company;
          item.bcColorprison = item.materielCode;
          item.bcColor = item.materielCode;
          item.bcClass = item.materielCode;
          item.bcForce = item.materielCode;
          item.stockQty = item.applyNum;
        });
        this.mx = this.mx.concat(val);
        // this.mx = this.unique(this.mx, "materielCode");
        this.page.total = this.mx.length;
        this.mx.forEach((e, index) => {
          e.index = index + 1;
          if (index == this.mx.length - 1) {
            setTimeout(() => {
              this.$nextTick(() => {
                this.$set(this.mxOp.column[3], "hide", true);
                // this.$set(this.mxOp.column[5], "hide", true);
                // this.$set(this.mxOp.column[8], "hide", true);
                this.tloading = false;
              });
            }, 500);
          }
        });
      } else if (this.choiceTle === "选择颜料入仓信息") {
        console.log(val);
        val.forEach((item) => {
          item.$cellEdit = true;
          item.retCompany = item.unitQty;
          item.traCompany = item.unitQty;
          item.materialName = item.$materialName;
          item.model = item.$model;
          item.itemspec = item.$itemspec;
          item.whseAccessoriesinFk = item.whseAccessoriesinoid;
          item.whseAccessoriesDtlFk = item.whseAccessoriesDtloid;
          item.stockQty = item.weight;
        });
        this.mx = this.mx.concat(val);
        this.mx = this.unique(this.mx, "batchNo");
        // this.changeList.push(data);
      } else if (this.choiceTle === this.$t("choicDlg.xzsqlyd")) {
        this.form.appId = val.applyCode;
        this.form.purApplicationoid = val.purApplicationoid;
        this.purApp = val;
        // this.chooseData.list = this.chooseData.list.concat(val);
        // this.chooseData.list.forEach((e, index) => {
        //   e.index = index + 1;
        //   e.prodNo = e.$prodNo;
        //   e.woWeights = e.weight;
        //   e.woUnit = e.weightUnit;
        //   e.ticketNo = e.custTicket;
        // });
      }
      // for (var key in val) {
      //   delete val[key];
      // }
      // for (var key in this.choiceQ) {
      //   delete this.choiceQ[key];
      // }
      this.choiceV = false;
    },
    changeRet(val) {
      this.mx = [];
      if (val === "1") {
        this.mxOp.column[8].hide = false;
        this.mxOp.column[8].label = "申购数量";
        this.mxOp.column[7].hide = true;
        this.formOp.column[3].label = "申购单";
        if (!this.isAdd) {
          return;
        }
        this.formOp.column[3].disabled = false;
      } else if (val === "2") {
        // 其他
        // this.mxOp.column[11].hide = true;
        // this.mxOp.column[12].hide = true;
        this.mxOp.column[8].label = "入仓数量";
        this.mxOp.column[7].label = "入仓单位";
        this.mxOp.column[7].label = this.$t("whseField.ph");
        this.mxOp.column[7].hide = false;
        this.formOp.column[3].disabled = true;
      } else {
        this.mxOp.column[8].hide = false;
        this.mxOp.column[8].label = "領用数量";
        this.mxOp.column[7].hide = true;
        if (!this.isAdd) {
          return;
        }
        this.formOp.column[3].disabled = false;
        this.formOp.column[3].label = "申购领用单";
      }
      this.form.appId = "";
    },
    proChoiceData(val) {
      if (Object.keys(val).length === 0 || val.length === 0 || val === null) {
        this.proChoiceV = false;
        return;
      }
      this.tloading = true;
      if (this.proChoiceTle === "选择能源入仓信息") {
        if (this.hide === "1") {
          this.mxOp.column[3].hide = false;
          // this.mxOp.column[5].hide = false;
          // this.mxOp.column[8].hide = false;
        }
        val.forEach((item) => {
          item.$cellEdit = true;
          item.materialId = item.materialNum;
          item.traCompany = item.unitQty;
          item.materialName = item.$materialName;
          item.company = item.unitQty;
          item.stockUnit = item.unitQty;
          item.bcColorprison = item.materialNum;
          item.model = item.materialNum;
          item.bcClass = item.materialNum;
          item.itemspec = item.materialNum;
          item.bcForce = item.materialNum;
          item.applyNum = item.poQty;
          item.stockQty = item.poQty;
          item.whseEnergyDtlFk = item.energyDtloid;
        });
        this.mx = this.mx.concat(val);
        this.mx = this.unique(this.mx, "batchNo");
        this.page.total = this.mx.length;
        this.mx.forEach((e, index) => {
          e.index = index + 1;
          if (index == this.mx.length - 1) {
            setTimeout(() => {
              this.$nextTick(() => {
                this.$set(this.mxOp.column[3], "hide", true);
                // this.$set(this.mxOp.column[5], "hide", true);
                // this.$set(this.mxOp.column[8], "hide", true);
                this.tloading = false;
              });
            }, 500);
          }
        });
      }
      // for (var key in val) {
      //   delete val[key];
      // }
      // for (var key in this.choiceQ) {
      //   delete this.choiceQ[key];
      // }
      this.proChoiceV = false;
      // this.tloading = false;
    },
    unique(arr, val) {
      const res = new Map();
      return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
    },
  },
  updated() {
    // this.$nextTick(() => {
    //   this.$refs["dlgcrud"].doLayout();
    // });
  },
  created() {},
  mounted() {
    if (this.hide === "3" || this.hide === "4" || this.hide === "5") {
      this.mxOp = rsxkr3C(this);
    }
    if (this.hide === "6") {
      this.detail.retCode = this.detail.woOutno;
      this.detail.retDate = this.detail.woDate;
    }
    this.sysCreatedby = this.$store.state.userOid;
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#sxPlanDlg
  .el-dialog__header
    padding 0
  .el-card
    border none
  .el-dialog__body
    padding 0 !important
  .el-dialog__header
    padding 0px
    background-color rgb(2, 26, 60)
  .formBox
    margin-bottom 0px
  // .el-button--mini, .el-button--small {
  // font-size: 16px;
  // }

  // .el-button--mini, .el-button--mini.is-round {
  // padding: 5px 10px;
  // }
  .avue-crud__menu
    min-height 5px !important
    height 5px !important
  .el-tabs__item
    font-size 18px
    line-height 30px
    height 30px
  .el-table__header-wrapper, .el-form-item__label, .el-input--mini
    // font-size: 16px !important;
    // font-weight: 600 !important;
    // color: #000;
  .el-dialog
    margin-top 0 !important
    height 100%
    margin 0 !important
    background-color rgb(2, 26, 60)
  // .avue-form__group {
  // background-color: #fff;
  // }

  // .el-table--mini td, .el-table--mini th {
  // padding: 2px 0 !important;
  // }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item
    margin-bottom 10px
  .avue-crud__tip
    display none
  .el-dialog__header
    padding 0px
  .el-dialog__headerbtn
    top 5px
    color #000
    font-size 22px
    z-index 999
</style>