<template>
  <div id="rcDetail">
    <view-container
      :title="datas.type.split('_')[0] + '资料'"
      v-loading="loading"
      element-loading-text="正在拼命加载..."
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
        <el-col :span="hide == '1' ? 16 : 24">
          <view-container :title="datas.type.split('_')[0] + '明细'">
            <div class="btnList" style="margin-bottom: 2px">
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
        <el-col :span="8" v-if="hide == '1'">
          <view-container :title="datas.type.split('_')[0] + '批号资料'">
            <div class="btnList" style="margin-bottom: 2px">
              <el-button
                type="primary"
                @click="addPh"
                v-if="canSave"
                :disabled="detail.stockState == '1'"
                >{{ this.$t("public.add") }}</el-button
              >
              <el-button
                type="danger"
                @click="delPh"
                v-if="canSave"
                :disabled="detail.stockState == '1'"
                >{{ this.$t("public.del") }}</el-button
              >
            </div>
            <avue-crud
              ref="dlgPhcrud"
              :option="rcOp"
              v-loading="rcloading"
              :data="chooseData.list"
              @current-row-change="cellPhClick"
            ></avue-crud>
          </view-container>
        </el-col>
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
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F, sxForm, rsxkr3C, rcpb3C, planCrud } from "./data";
import choice from "@/components/choice";
import proChoice from "@/components/proMng/index";
import {
  // 明细
  getYlDtl,
  addYlDtl,
  updateYlDtl,
  delYlDtl,
  getYlDtla,
  addYlDtla,
  updateYlDtla,
  delYlDtla,
} from "@/api/im/Wk/cc/yl";
import { baseCodeSupply, updatePurApp } from "@/api/index";
import { getLydmx, getSglydmx } from "../productionUse/api";
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
      sxformOp: sxForm(this),
      sxform: {},
      outform: {},
      outformOp: rsxkr2F(this),
      outcrudOp: rsxkr2C(this),
      outcrud: [],
      sxcrud: [],
      sxpage: {},
      rcOp: rcpb3C(this),
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
      choiceV: false,
      choiceTle: "选择订单胚布资料",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      saved: false,
      sysCreatedby: "",
      otherV: false,
      proChoiceV: false,
      proChoiceTle: "选择颜料入仓信息",
      proChoiceQ: {},
      purApp: {},
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.chooseData = {};
      this.loading = true;
      if (this.hide === "1") {
        this.func.getDetail = getYlDtl;
        this.func.delDetail = delYlDtl;
        this.func.updateDetail = updateYlDtl;
        this.func.addDetail = addYlDtl;
        this.func.getPhDetail = getYlDtla;
        this.func.delPhDetail = delYlDtla;
        this.func.updatePhDetail = updateYlDtla;
        this.func.addPhDetail = addYlDtla;
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
        this.loading = false;
        // this.form.retType = "1";
        if (this.hide === "4") {
          this.$nextTick(() => {
            this.$set(this.mxOp.column[3], "hide", true);
          });
        }
        if (this.hide === "1") {
          this.mxOp.column[3].hide = true;
          this.mxOp.column[5].hide = true;
          this.mxOp.column[8].hide = true;
          this.mxOp.column[10].hide = true;
          return;
        }
      }

      if (this.hide === "1") {
        this.mxOp.column[3].hide = false;
        this.mxOp.column[5].hide = false;
        this.mxOp.column[8].hide = false;
        this.mxOp.column[10].hide = false;
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
          whseDyesalOutFk: this.detail.dyesalOutId,
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
            this.loading = false;
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
                if (this.hide === "1") {
                  this.$set(this.mxOp.column[3], "hide", true);
                  this.$set(this.mxOp.column[5], "hide", true);
                  this.$set(this.mxOp.column[8], "hide", true);
                  this.$set(this.mxOp.column[10], "hide", true);
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
                this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
              });
              setTimeout(() => {
                this.loading = false;
              }, 200);
            }
          });
        });
    },
    getPhDetail(val) {
      if (this.chooseData.list.length) {
        this.$refs.dlgPhcrud.setCurrentRow(this.chooseData.list[0]);
        return;
      }
      if (
        val === null ||
        (!val.energyOutDtlId &&
          !val.whseCalicoselloutDtlaoid &&
          !val.whseChemicalOutdtlId)
      ) {
        this.chooseData.list = [];
        return;
      }
      this.rcloading = true;
      this.rcOp.showSummary = false;
      this.func
        .getPhDetail({
          dyesalOutDtlFk: val.energyOutDtlId,
        })
        .then((res) => {
          let records = res.data;
          this.chooseData.list = records;
          if (this.chooseData.list.length === 0) {
            this.rcloading = false;
          }
          if (this.chooseData.list.length) {
            this.$refs.dlgPhcrud.setCurrentRow(this.chooseData.list[0]);
          } else {
            this.$refs.dlgPhcrud.setCurrentRow();
          }
          this.chooseData.list.forEach((item, index) => {
            item.index = index + 1;
            item.$cellEdit = true;
            if (index === this.chooseData.list.length - 1) {
              this.rcOp.showSummary = true;
              this.choosePh = {};
              this.rcloading = false;
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
    addPh() {
      if (!this.chooseData || Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请先选择明细资料!");
        return;
      }
      if (this.hide == "1") {
        this.proChoiceQ.chemicalId = this.chooseData.materialId;
        this.proChoiceTle = "选择颜料库存";
        this.proChoiceV = true;
        return;
      }
      if (this.hide === "6") {
        //   this.choiceV = !this.choiceV;
        //   this.choiceField = "woOrderno";
        //   this.choiceQ.calicoId = this.chooseData.woMatno;
        //   this.oldData = this.chooseData;
        //   this.choiceTarget = this.oldData;
        //   this.choiceTle = this.$t("choicDlg.xzpbph");
      }
      // } else {
      this.outcrudOp = rcpb3C(this);
      this.sxformOp.column[0].display = false;
      this.sxformOp.column[1].display = false;
      this.sxformOp.column[2].display = false;
      this.sxformOp.column[6].display = this.hide === "6" ? true : false;
      this.sxformOp.column[7].display = false;
      this.sxformOp.column[8].display = true;
      this.outcrudOp.selection = true;
      this.outcrudOp.showSummary = false;
      this.outcrudOp.height = "calc(100vh - 213px)";
      this.isPh = true;
      this.sxV = true;
      // }
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

        this.mx.forEach((i, index) => {
          i.index = index + 1;
        });
        this.chooseData = {};
        if (this.mx.length) {
          this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
        }
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
    delPh() {
      if (this.choosePh == null || Object.keys(this.choosePh).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.choosePh.dyesalOutDtl) {
        this.chooseData.list.splice(this.choosePh.index - 1, 1);
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.dlgPhcrud.setCurrentRow();
        return;
      }

      let tip = "是否确定删除批号为 【" + this.choosePh.batchNo + " 】的数据？";

      this.$tip
        .cofirm(tip, this, {})
        .then(() => {
          this.loading = true;
          this.func
            .delPhDetail(this.choosePh.dyesalOutDtl)
            .then((res) => {
              if (res.data.code === 200) {
                this.chooseData.stockQty -= this.choosePh.weight;

                this.chooseData.list.splice(this.choosePh.index - 1, 1);
                this.chooseData.list.forEach((item, i) => {
                  item.index = i + 1;
                });
                this.choosePh = {};
                if (this.chooseData.list.length) {
                  this.$refs.dlgPhcrud.setCurrentRow();
                }
                this.$tip.success(this.$t("public.sccg"));
                // this.getPhDetail(this.chooseData);
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.loading = false;
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    cellClick(val) {
      this.chooseData = val;
      if (this.hide === "1") {
        if (!this.chooseData.list) {
          this.chooseData.list = [];
        }
        this.getPhDetail(val);
      }
    },
    cellPhClick(val) {
      this.choosePh = val;
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
    save1() {
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
        this.form.dyesalOutId ||
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
            if (
              item.energyOutDtlId ||
              item.whseRetsuppaccessoriesDtloid ||
              item.whseTraaccessoriesDtloid
            ) {
              // 更新
              this.func.updateDetail(item).then((res) => {});
            } else {
              // 新增
              item.whseDyesalOutFk = this.form.dyesalOutId;
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
          this.form.dyesalOutId = Res.data.data;
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
              item.whseDyesalOutFk = this.form.dyesalOutId;
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
          if (!this.mx[i].list) {
            break;
          }
          this.mx[i].stockQty = 0;
          for (let j = 0; j < this.mx[i].list.length; j++) {
            if (!this.mx[i].list[j].weight || this.mx[i].list[j].weight == 0) {
              this.$tip.error("数量不能为空!");
              return;
            }
            this.mx[i].stockQty += Number(this.mx[i].list[j].weight);
          }
          if (!this.mx[i].stockQty) {
            this.$tip.error("数量不能为空!");
            return;
          }
          if (this.mx[i].stockQty > this.mx[i].applyNum) {
            this.$tip.error("出仓数量不能超过领用数量!");
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
        this.form.dyesalOutId ||
        this.form.whseRetsuppaccessoriesoid ||
        this.form.whseTraaccessoriesoid
      ) {
        this.everyThing.updateF(this.form).then((res) => {
          if (this.mx.length === 0) {
            setTimeout(() => {
              this.loading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
            return;
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              if (
                data.energyOutDtlId ||
                data.whseRetsuppaccessoriesDtloid ||
                data.whseTraaccessoriesDtloid
              ) {
                this.func.updateDetail(data).then((res) => {
                  resolve();
                });
              } else {
                // 新增
                data.whseDyesalOutFk = this.form.dyesalOutId;
                data.whseRetsuppaccessoriesFk =
                  this.form.whseRetsuppaccessoriesoid;
                data.whseTraaccessoriesFk = this.form.whseTraaccessoriesoid;
                this.func.addDetail(data).then((res) => {
                  item.energyOutDtlId = res.data.data;
                  item.whseRetsuppaccessoriesDtloid = res.data.data;
                  item.whseTraaccessoriesDtloid = res.data.data;
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            for (let i = 0; i < this.mx.length; i++) {
              if (this.mx[i].list) {
                this.mx[i].list.forEach((item) => {
                  item.dyesalOutDtlFk = this.mx[i].energyOutDtlId;
                  if (!item.dyesalOutDtl) {
                    this.func.addPhDetail(item).then((res) => {
                      item.dyesalOutDtl = res.data.data;
                    });
                  } else {
                    this.func.updatePhDetail(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                setTimeout(() => {
                  this.loading = false;
                  this.$tip.success(this.$t("public.bccg"));
                }, 200);
              }
            }
          });
        });
      } else {
        this.everyThing.addF(this.form).then((res) => {
          baseCodeSupply({ code: "whse_out" }).then((res) => {});
          this.form.dyesalOutId = res.data.data;
          this.form.whseRetsuppaccessoriesoid = res.data.data;
          this.form.whseTraaccessoriesoid = res.data.data;
          if (this.form.stockType == 3) {
            updatePurApp(
              Object.assign(this.purApp, {
                collectSucceed: 1,
              })
            ).then((res) => {});
          } else if (this.form.stockType == 1) {
            // updateSglyd(
            //   Object.assign(this.purApp, {
            //     collectSucceed: 1,
            //   })
            // ).then(res);
          }

          if (this.mx.length === 0) {
            setTimeout(() => {
              this.loading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }

          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              if (
                data.energyOutDtlId ||
                data.whseRetsuppaccessoriesDtloid ||
                data.whseTraaccessoriesDtloid
              ) {
                this.func.updateDetail(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.whseDyesalOutFk = this.form.dyesalOutId;
                data.whseRetsuppaccessoriesFk =
                  this.form.whseRetsuppaccessoriesoid;
                item.whseTraaccessoriesFk = this.form.whseTraaccessoriesoid;
                data.func.addDetail(data).then((res) => {
                  item.energyOutDtlId = res.data.data;
                  item.whseRetsuppaccessoriesDtloid = res.data.data;
                  item.whseTraaccessoriesDtloid = res.data.data;
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.mx.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            for (let i = 0; i < this.mx.length; i++) {
              if (this.mx[i].list) {
                this.mx[i].list.forEach((item) => {
                  item.dyesalOutDtlFk = this.mx[i].energyOutDtlId;
                  if (!item.dyesalOutDtl) {
                    this.func.addPhDetail(item).then((res) => {
                      item.dyesalOutDtl = res.data.data;
                    });
                  } else {
                    this.func.updatePhDetail(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                setTimeout(() => {
                  this.loading = false;
                  this.$tip.success(this.$t("public.bccg"));
                }, 200);
              }
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
        this.purApp = val;
        getSglydmx({
          applyState: 3,
          collectSucceed: 0,
          purCategory: 8,
          purSingleFk: this.form.purSingleoid,
        }).then((res) => {
          let val = res.data;
          console.log(val);
          val.forEach((item, i) => {
            // item.$cellEdit = true;
            item.materialId = item.materialNum;
            item.materialName = item.chinName;
            item.company = item.company;
            item.stockUnit = item.company;
            item.bcColorprison = item.materialNum;
            item.bcColor = item.materialNum;
            item.bcClass = item.materialNum;
            item.bcForce = item.materialNum;
            item.applyNum = item.applyNum;
            item.weightUnit = item.company;
            item.stockQty = 0;
          });
          this.mx = this.mx.concat(val);
          this.page.total = this.mx.length;
          if (this.mx.length) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
          }
          this.mx.forEach((e, index) => {
            e.index = index + 1;
            if (index == this.mx.length - 1) {
              setTimeout(() => {
                this.loading = false;
              }, 200);
            }
          });
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzlyr")) {
        this.form.leader = val.perPersonoid;
      } else if (this.choiceTle === this.$t("choicDlg.xzsgdzl")) {
        this.tloading = true;
        if (this.hide === "1") {
          this.mxOp.column[3].hide = false;
          this.mxOp.column[5].hide = false;
          this.mxOp.column[8].hide = false;
          this.mxOp.column[10].hide = false;
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
                this.$set(this.mxOp.column[5], "hide", true);
                this.$set(this.mxOp.column[8], "hide", true);
                this.$set(this.mxOp.column[10], "hide", true);
                this.tloading = false;
              });
            }, 500);
          }
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzsqlydmx")) {
        this.tloading = true;
        if (this.hide === "1") {
          this.mxOp.column[3].hide = false;
          this.mxOp.column[5].hide = false;
          this.mxOp.column[8].hide = false;
          this.mxOp.column[10].hide = false;
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
          item.stockQty = 0;
        });
        this.mx = this.mx.concat(val);
        this.mx = this.unique(this.mx, "materialId");
        this.page.total = this.mx.length;
        this.mx.forEach((e, index) => {
          e.index = index + 1;
          if (index == this.mx.length - 1) {
            if (this.mx.length) {
              this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
            } else {
              this.$refs.dlgcrud.setCurrentRow();
            }
            setTimeout(() => {
              this.$nextTick(() => {
                this.$set(this.mxOp.column[3], "hide", true);
                this.$set(this.mxOp.column[5], "hide", true);
                this.$set(this.mxOp.column[8], "hide", true);
                this.$set(this.mxOp.column[10], "hide", true);
                this.tloading = false;
              });
            }, 500);
          }
        });
      } else if (this.choiceTle === "选择颜料入仓信息") {
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
        this.loading = true;
        this.form.appId = val.applyCode;
        this.form.purApplicationoid = val.purApplicationoid;
        this.purApp = val;
        getLydmx({
          purApplicationFk: this.form.purApplicationoid,
        }).then((res) => {
          if (res.data.length) {
            let val = res.data;
            val.forEach((item, i) => {
              item.$cellEdit = true;
              item.materialId = item.materielCode;
              item.materialName = item.materielName;
              item.yarnsId = item.materielCode;
              item.yarnsName = item.materielName;
              item.company = item.company;
              item.stockUnit = item.company;
              item.weightUnit = item.company;
              item.bcColorprison = item.materielCode;
              item.vitality = item.materielCode;
              item.bcClass = item.materielCode;
              item.dangerlevel = item.materielCode;
              item.bcForce = item.materielCode;
              item.weight = 0;
            });
            this.mx = this.mx.concat(val);
            this.mx = this.unique(this.mx, "materialId");
            this.page.total = this.mx.length;
            if (this.mx.length) {
              this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
            } else {
              this.$refs.dlgcrud.setCurrentRow();
            }
            this.mx.forEach((e, index) => {
              e.index = index + 1;
              if (index == this.mx.length - 1) {
                setTimeout(() => {
                  this.loading = false;
                }, 200);
              }
            });
          }
        });
      }
      this.choiceV = false;
    },
    changeRet(val) {
      this.mx = [];
      if (val === "1") {
        this.mxOp.column[13].hide = false;
        this.mxOp.column[13].label = "申购数量";
        this.mxOp.column[12].hide = true;
        this.formOp.column[3].label = "申购单";
        if (!this.isAdd) {
          return;
        }
        this.formOp.column[3].disabled = false;
      } else if (val === "2") {
        // 其他
        // this.mxOp.column[11].hide = true;
        // this.mxOp.column[12].hide = true;
        this.mxOp.column[13].label = "入仓数量";
        this.mxOp.column[12].label = "入仓单位";
        this.mxOp.column[12].label = this.$t("whseField.ph");
        this.mxOp.column[12].hide = false;
        this.formOp.column[3].disabled = true;
      } else {
        this.mxOp.column[13].hide = false;
        this.mxOp.column[13].label = "領用数量";
        this.mxOp.column[12].hide = true;
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
      this.loading = true;
      if (this.proChoiceTle === "选择颜料入仓信息") {
        if (this.hide === "1") {
          this.mxOp.column[3].hide = false;
          this.mxOp.column[5].hide = false;
          this.mxOp.column[8].hide = false;
          this.mxOp.column[10].hide = false;
        }
        val.forEach((item) => {
          item.$cellEdit = true;
          item.materialId = item.chemicalId;
          item.traCompany = item.weightUnit;
          item.materialName = item.$chemicalName;
          item.company = item.weightUnit;
          item.stockUnit = item.weightUnit;
          item.bcColorprison = item.chemicalId;
          item.model = item.chemicalId;
          item.bcColor = item.chemicalId;
          item.bcClass = item.chemicalId;
          item.bcForce = item.chemicalId;
          item.applyNum = item.weight;
          item.stockQty = item.weight;
          item.whseDyesainDtlaFk = item.whseDyesainDtlaoid;
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
                this.$set(this.mxOp.column[5], "hide", true);
                this.$set(this.mxOp.column[8], "hide", true);
                this.$set(this.mxOp.column[10], "hide", true);
                // this.tloading = false;
                this.loading = false;
              });
            }, 500);
          }
        });
      } else if (this.proChoiceTle === "选择颜料库存") {
        if (this.form.stockType == 2) {
          val.forEach((item, i) => {
            item.$cellEdit = true;
            item.list = [JSON.parse(JSON.stringify(item))];
            item.materialId = item.chemicalId;
            item.traCompany = item.weightUnit;
            item.materialName = item.$chemicalName;
            item.company = item.weightUnit;
            item.stockUnit = item.weightUnit;
            item.bcColorprison = item.chemicalId;
            item.model = item.chemicalId;
            item.bcColor = item.chemicalId;
            item.bcClass = item.chemicalId;
            item.bcForce = item.chemicalId;
            item.applyNum = item.weight;
            item.stockQty = item.weight;
            this.mx.push(item);
          });
          if (this.mx.length) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        } else {
          // let sum = 0;
          // this.chooseData.list.forEach((item, i) => {
          //   sum += item.weight;
          // });
          val.forEach((item, i) => {
            // item.weight = item.stock;
            item.$cellEdit = true;
            item.whseDyesainDtlbFk = item.whseDyesainDtlboid;
            this.chooseData.list.push(item);
          });
          // for (let i = 0; i < val.length; i++) {
          //   if (sum + val[i].stock <= this.chooseData.applyNum) {
          //     this.chooseData.list.push(val[i]);
          //     sum += val[i].stock;
          //   } else if (this.chooseData.applyNum - sum > 0) {
          //     val[i].weight = this.chooseData.applyNum - sum;
          //     sum += val[i].weight;
          //     this.chooseData.list.push(val[i]);
          //     break;
          //   }
          // }
          // this.chooseData.weight = sum;
          this.chooseData.list = this.unique(this.chooseData.list, "batchNo");
          this.chooseData.list.forEach((item, i) => {
            item.index = i + 1;
          });
        }
        this.loading = false;
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