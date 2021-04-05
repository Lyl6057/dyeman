<template>
  <div id="rcDetail">
    <view-container
      :title="datas.type.split('_')[0] + '资料'"
      v-loading="outloading"
      element-loading-text="正在生成领料单..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <div class="btnList">
        <el-button type="success" @click="savePlan" v-if="canSave && isPlan">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="success" @click="save" v-if="!isPlan">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row>
        <el-col :span="hide === '4' || hide === '3' || hide === '5' ? 24 : 12">
          <view-container :title="datas.type.split('_')[0] + '明细'">
            <div class="btnList" style="margin-bottom: 2px">
              <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->
              <el-button type="primary" @click="add" v-if="canSave">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" @click="del" v-if="canSave">{{
                this.$t("public.del")
              }}</el-button>

              <!-- <el-button type="warning" @click="getDetail">取消</el-button>
       -->
            </div>
            <avue-crud
              ref="dlgcrud"
              :option="mxOp"
              v-loading="loading"
              :data="mx"
              :page.sync="page"
              @current-row-change="cellClick"
              @on-load="getDetail"
            ></avue-crud> </view-container
        ></el-col>
        <el-col :span="12" v-if="hide != '4' && hide != '3' && hide != '5'">
          <view-container :title="datas.type.split('_')[0] + '批号资料'">
            <div class="btnList" style="margin-bottom: 2px">
              <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->
              <el-button type="primary" @click="addPh" v-if="canSave">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" @click="delPh" v-if="canSave">{{
                this.$t("public.del")
              }}</el-button>
              <!-- <el-button type="success" @click="savePh" v-if="!isPlan"
                >{{this.$t("public.save")}}</el-button
              > -->
              <!-- <el-button type="warning" @click="getDetail">取消</el-button>
        <el-button type="warning" @click="close">{{this.$t("public.close")}}</el-button> -->
            </div>
            <avue-crud
              ref="dlgPhcrud"
              :option="rcOp"
              v-loading="rcloading"
              :data="chooseData.list"
              :page.sync="page"
              @current-row-change="cellPhClick"
            ></avue-crud>
          </view-container>
        </el-col>
      </el-row>

      <el-dialog
        id="sxPlanDlg"
        :visible.sync="sxV"
        append-to-body
        fullscreen
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="sxclose"
        v-if="sxV"
      >
        <view-container :title="dlgTle">
          <div class="btnList">
            <el-button type="success" @click="check">{{
              this.$t("public.choose")
            }}</el-button>
            <el-button type="primary" @click="getPbData">{{
              this.$t("public.query")
            }}</el-button>
            <el-button type="warning" @click="sxclose">{{
              this.$t("public.close")
            }}</el-button>
          </div>
          <div class="formBox">
            <avue-form
              ref="sxform"
              :option="sxformOp"
              v-model="sxform"
            ></avue-form>
          </div>
          <div class="crudBox">
            <avue-crud
              ref="sxcrud"
              id="sxcrud"
              :option="outcrudOp"
              :data="sxcrud"
              :page.sync="sxpage"
              v-loading="loading"
              @on-load="getPbData"
              @selection-change="sxselectionChange"
            ></avue-crud>
          </div>
        </view-container>
      </el-dialog>
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
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F, sxForm, rsxkr3C, rcpb3C } from "./data";
import choice from "@/components/choice";
import {} from "../../rc/pb/data"; // 入仓
import { getPb, getPbDetali, getPbDetaliList, getPbPh } from "@/api/im/Wk/rc";
import {
  getPbDetalis,
  addPbDetali,
  updatePbDetali,
  delPbDetali,
  getPhDetali,
  addPhDetali,
  delPhDetali,
  getMaterial,
  addMaterial,
  getPbOutPlan,
  getPbTransferDtl,
  addPbTransferDtl,
  updatePbTransferDtl,
  delPbTransferDtl,
  getEmbryogenesisDtl,
  getPbPlan,
  // 销售出库
  getCalicoselloutDtla,
  addCalicoselloutDtla,
  updateCalicoselloutDtla,
  delCalicoselloutDtla,
  getCalicoselloutDtlb,
  addCalicoselloutDtlb,
  delCalicoselloutDtlb,
  // 退供应商明细
  getRetsuppcalicoDtl,
  updateRetsuppcalicoDtl,
  addRetsuppcalicoDtl,
  delRetsuppcalicoDtl,
  // 退客人明细
  getRetguestcalicodtl,
  addRetguestcalicodtl,
  updateRetguestcalicodtl,
  delRetguestcalicodtl,
  // 调仓
  getTransfercalicoDtl,
  addTransfercalicoDtl,
  updateTransfercalicoDtl,
  delTransfercalicoDtl,
} from "@/api/im/Wk/cc/pb";
export default {
  props: {
    datas: Object,
    everyThing: Object,
    hide: String,
    detail: Object,
    isPlan: Boolean,
    PlanForm: Object,
  },
  name: "",
  components: {
    choice: choice,
  },
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
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
      sxV: false,
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
      outloading: false,
      choiceV: false,
      choiceTle: "选择订单胚布资料",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.loading = true;
      if (
        Object.keys(this.detail).length === 0 ||
        (!this.detail.whseCalicoselloutoid &&
          !this.detail.whseMaterialoid &&
          !this.detail.whseRetsuppcalicooid &&
          !this.detail.whseRetguestcalicooid &&
          !this.detail.whseTransfercalicooid)
      ) {
        this.mx = [];
        this.loading = false;
        return;
      }

      if (this.hide === "3") {
        this.func.getDetail = getRetguestcalicodtl;
        this.func.delDetail = delRetguestcalicodtl;
        this.func.updateDetail = updateRetguestcalicodtl;
        this.func.addDetail = addRetguestcalicodtl;
        this.mxOp.column[3].hide = false;
        // this.mxOp = rsxkr3C(this);
      } else if (this.hide === "4") {
        this.func.getDetail = getRetsuppcalicoDtl;
        this.func.updateDetail = updateRetsuppcalicoDtl;
        this.func.delDetail = delRetsuppcalicoDtl;
        this.func.addDetail = addRetsuppcalicoDtl;
        this.mxOp.column[3].hide = false;
        // this.mxOp = rsxkr3C(this);
      } else if (this.hide === "5") {
        this.func.getDetail = getTransfercalicoDtl;
        this.func.updateDetail = updateTransfercalicoDtl;
        this.func.delDetail = delTransfercalicoDtl;
        this.func.addDetail = addTransfercalicoDtl;
        // this.mxOp.column[3].hide = false;
      } else if (this.hide === "6") {
        this.func.getDetail = getCalicoselloutDtla;
        this.func.delDetail = delCalicoselloutDtla;
        this.func.addDetail = addCalicoselloutDtla;
        this.func.getPhDetail = getCalicoselloutDtlb;
        this.func.delPhDetail = delCalicoselloutDtlb;
        this.func.addPhDetail = addCalicoselloutDtlb;
        // this.mxOp = rsxkr3C(this);
      } else {
        this.func.getDetail = getPbDetalis;
        this.func.delDetail = delPbDetali;
        this.func.addDetail = addPbDetali;
        this.func.getPhDetail = getPhDetali;
        this.func.delPhDetail = delPhDetali;
        this.func.addPhDetail = addPhDetali;
      }
      this.func
        .getDetail({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseMaterialFk: this.detail.whseMaterialoid,
          whseRetsuppcalicoFk: this.detail.whseRetsuppcalicooid,
          whseTransfercalicoFk: this.detail.whseTransfercalicooid,
          whseCalicoselloutFk: this.detail.whseCalicoselloutoid,
          whseRetguestcalicoFk: this.detail.whseRetguestcalicooid,
        })
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.mx = records.records;
          if (this.mx.length === 0) {
            if (this.hide === "4" || this.hide === "3" || this.hide === "5") {
              this.mxOp.column[3].hide = true;
            }
            this.loading = false;
          }
          this.mx.forEach((item, index) => {
            item.index = index + 1;
            if (this.hide === "4" || this.hide === "3") {
              item.calicoId = item.whseCalicoinDtlaFk;
              item.batchNo = item.whseCalicoinDtlaFk;
              item.countingNo = item.whseCalicoinDtlaFk;
              item.weight = item.whseCalicoinDtlaFk;
              item.whseCalicoinFk = item.whseCalicoinDtlaFk;
            }
            if (this.hide === "5") {
              item.batchNo = item.whseCalicoinDtlaFk;
              item.countingNo = item.whseCalicoinDtlbFk;
              item.weight = item.whseCalicoinDtlbFk;
              item.prodNo = item.whseCalicoinDtlaFk;
              item.retCompany = item.traCompany;
            }
            if (index === this.mx.length - 1) {
              setTimeout(() => {
                if (this.hide != "4" && this.hide != "3" && this.hide != "5") {
                  this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
                } else {
                  this.mxOp.column[3].hide = true;
                  this.$refs.dlgcrud.setCurrentRow(this.chooseData);
                }
                this.loading = false;
              }, 500);
            }
          });
        });
    },
    getPhDetail(val) {
      if (
        val === null ||
        (!val.whseMaterialDlaoid && !val.whseCalicoselloutDtlaoid)
      ) {
        this.rcData = [];
        return;
      }
      this.rcloading = true;
      this.rcOp.showSummary = false;
      this.func
        .getPhDetail({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseMaterialDlaFk: val.whseMaterialDlaoid,
          whseCalicoselloutDtlaFk: val.whseCalicoselloutDtlaoid,
        })
        .then((res) => {
          let records = res.data;
          this.rcPage.total = records.total;
          this.rcData = records.records;
          if (this.rcData.length === 0) {
            this.rcloading = false;
          }
          this.rcData = this.rcData.sort((a, b) => {
            return b.countingNo - a.countingNo;
          });
          this.rcData.forEach((item, index) => {
            item.index = index + 1;
            if (this.hide === "6") {
              item.weight = item.woWeights;
              item.weightUnit = item.woUnit;
              item.custTicket = item.ticketNo;
            }

            if (index === this.rcData.length - 1) {
              this.$nextTick(() => {
                this.chooseData.list = this.rcData;
                // this.$set(this.chooseData, "list", this.rcData);
              });
              this.rcOp.showSummary = true;
              this.choosePh = {};
              this.rcloading = false;
            }
          });
        });
    },
    add() {
      if (this.hide === "6") {
        this.choiceV = !this.choiceV;
        this.choiceField = "woOrderno";
        this.oldData = this.chooseData;
        this.choiceTarget = this.oldData;
        this.choiceTle = "选择订单胚布资料";
      } else if (this.hide === "4" || this.hide === "3") {
        this.choiceV = !this.choiceV;
        this.choiceField = "woOrderno";
        this.oldData = this.chooseData;
        this.choiceTarget = this.oldData;
        this.choiceTle = this.$t("choicDlg.xzpbrc");
      } else if (this.hide === "5") {
        this.choiceV = !this.choiceV;
        this.choiceField = "woOrderno";
        this.oldData = this.chooseData;
        this.choiceTarget = this.oldData;
        this.choiceTle = this.$t("choicDlg.xzpbph");
      } else {
        this.outcrudOp = rsxkr2C(this);
        this.outcrudOp.column[2].hide = false;
        this.outcrudOp.column[3].hide = false;
        this.outcrudOp.column[3].width = 700;
        this.sxformOp.column[0].display = true;
        this.sxformOp.column[1].display = this.hide === "1" ? true : false;
        this.sxformOp.column[2].display = this.hide === "1" ? true : false;
        this.sxformOp.column[6].display = false;
        this.sxformOp.column[7].display = false;
        this.sxformOp.column[8].display = false;
        this.outcrudOp.selection = true;
        this.outcrudOp.showSummary = false;
        this.outcrudOp.height = "calc(100vh - 215px)";
        this.isPh = false;
        this.sxV = true;
      }
    },
    addPh() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请先选择明细资料!");
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
        !this.chooseData.whseMaterialDlaoid &&
        !this.chooseData.whseCalicoselloutDtlaoid &&
        !this.chooseData.whseRetsuppcalicodtloid &&
        !this.chooseData.whseRetguestcalicodtloid &&
        !this.chooseData.whseTransfercalicoDtloid
      ) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
        this.mx.forEach((i, index) => {
          i.index = index + 1;
        });
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除编号为【 " +
            (this.hide === "6"
              ? this.chooseData.woMatno
              : this.hide === "4" || this.hide === "3" || this.hide === "5"
              ? this.chooseData.$calicoId
              : this.chooseData.calicoId) +
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
                ? this.chooseData.whseRetsuppcalicodtloid
                : this.hide === "3"
                ? this.chooseData.whseRetguestcalicodtloid
                : this.hide === "5"
                ? this.chooseData.whseTransfercalicoDtloid
                : this.chooseData.whseMaterialDlaoid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
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
      if (
        !this.choosePh.whseMaterialDlboid &&
        !this.choosePh.whseCalicoselloutDtlboid &&
        !this.choosePh.whseTransferDtloid
      ) {
        this.chooseData.list.splice(this.choosePh.index - 1, 1);
        this.$refs.dlgPhcrud.setCurrentRow();
        return;
      }
      let tip = "";
      if (this.hide === "6") {
        tip =
          "是否确定删除生产单号为 【 " + this.choosePh.prodNo + " 】的数据？";
      } else {
        tip =
          "是否确定删除批号为 【" +
          this.choosePh.batchNo +
          " 】, 疋号为 【" +
          this.choosePh.countingNo +
          " 】的数据？";
      }
      this.$tip
        .cofirm(tip, this, {})
        .then(() => {
          this.func
            .delPhDetail(
              this.hide === "6"
                ? this.choosePh.whseCalicoselloutDtlboid
                : this.choosePh.whseMaterialDlboid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.rcData.splice(this.choosePh.index - 1, 1);
                this.getPhDetail(this.chooseData);
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
      if (this.hide === "4" || this.hide === "3" || this.hide === "5") {
        this.oldData.$cellEdit = false;
        this.$set(val, "$cellEdit", true);
        this.oldData = val;
        this.chooseData = val;
        return;
      }
      if (val === null) {
        return;
      }
      this.oldData = val;
      this.chooseData = val;
      if (!this.chooseData.list) {
        this.chooseData.list = [];
      }
      this.getPhDetail(val);
    },
    cellPhClick(val) {
      this.choosePh = val;
    },
    close() {
      this.$emit("close");
    },
    getPbData() {
      this.sxloading = true;
      this.sxcrud = [];
      if (this.isPh) {
        if (this.hide === "6") {
          this.chooseData.calicoId = this.chooseData.woMatno;
        }
        this.dlgTle = "胚布批号资料";
        getPbDetaliList({ calicoId: this.chooseData.calicoId }).then((res) => {
          this.sxform.calicoId = this.chooseData.calicoId;
          for (var key in this.sxform) {
            if (this.sxform[key] === "") {
              delete this.sxform[key];
            }
          }
          if (res.data.length === 0) {
            this.sxloading = false;
            return;
          }

          let getInfo = (item, i) => {
            return new Promise((resolve, reject) => {
              getPbPh(
                Object.assign(this.sxform, {
                  rows: this.sxpage.pageSize,
                  start: this.sxpage.currentPage,
                  whseCalicoinDtlaFk: item.whseCalicoinDtlaoid,
                })
              ).then((Res) => {
                resolve(Res.data.records, i);
              });
            });
          };
          let promiseArr = res.data.map((item, i) => {
            return getInfo(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            res.forEach((item, i) => {
              this.sxcrud = this.sxcrud.concat(item);
              if (i === res.length - 1) {
                if (this.sxcrud.length === 0) {
                  this.sxloading = false;
                }

                this.sxcrud.forEach((items, index) => {
                  items.index = index + 1;
                  items.prodNo = items.whseCalicoinDtlaFk;
                  if (index === this.sxcrud.length - 1) {
                    // this.sxpage.total = this.sxcrud.length;
                    this.sxloading = false;
                  }
                });
              }
            });
          });
        });
      } else {
        this.sxform.calicoId = "";
        let type = "";
        if (this.hide === "1") {
          this.func.getPlan = getPbPlan;
        } else if (this.hide === "2") {
          this.func.getPlan = getPbOutPlan;
        }
        this.dlgTle = "胚布明细";
        this.func
          .getPlan(
            Object.assign(this.form, {
              rows: this.page.pageSize,
              start: this.page.currentPage,
              // whseMaterialPlanoid: this.detail.whseMaterialPlanoid,
              retBatch: this.detail.retBatch,
            })
          )
          .then((Res) => {
            if (Res.data.records.length === 1) {
              this.planData = Res.data.records[0];
              this.sxform = this.planData;
              for (var key in this.sxform) {
                if (this.sxform[key] === "") {
                  delete this.sxform[key];
                }
              }
              getEmbryogenesisDtl(
                Object.assign(this.sxform, {
                  rows: this.sxpage.pageSize,
                  start: this.sxpage.currentPage,
                  // calicoId: this.planData.calicoId,
                })
              ).then((res) => {
                let records = res.data;
                this.sxpage.total = records.total;
                this.sxcrud = records.records;
                this.sxcrud = this.unique(this.sxcrud, "calicoId");
                if (this.sxcrud.length === 0) {
                  this.sxloading = false;
                }
                this.sxcrud.forEach((item, index) => {
                  item.index = index + 1;
                  // item.calicoName = item.calicoId;
                  // item.retBatch = this.planData.retBatch;
                  // item.equCode = this.planData.equCode;
                  // item.equName = this.planData.equName;
                  // item.yinId = item.whseCalicoinFk;
                  if (index === this.sxcrud.length - 1) {
                    this.sxloading = false;
                  }
                });
              });
            }
          });

        // });
      }
    },
    sxselectionChange(val) {
      // 选中纱线
      this.sxcheckList = val;
      this.changeList = this.sxcheckList;
    },
    check() {
      // 选择胚布
      if (this.isPh) {
        for (let i = 0; i < this.sxcheckList.length; i++) {
          for (let j = 0; j < this.chooseData.list.length; j++) {
            if (
              this.sxcheckList[i].custTicket ===
              this.chooseData.list[j].custTicket
            ) {
              this.sxcheckList[i].whseMaterialDlboid = this.chooseData.list[
                j
              ].whseMaterialDlboid;
              break;
            }
          }
        }
        // if (this.isPlan) {
        this.chooseData.list = this.unique(
          this.chooseData.list.concat(this.sxcheckList),
          "custTicket"
        );
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
          item.prodNo = item.$prodNo;
          item.prodNo = item.$prodNo;
          item.woWeights = item.weight;
          item.woUnit = item.weightUnit;
          item.ticketNo = item.custTicket;
        });
        // }
        // else {
        //   this.rcData = this.unique(
        //     this.rcData.concat(this.sxcheckList),
        //     "custTicket"
        //   );
        //   this.rcData.forEach((item, i) => {
        //     item.index = i + 1;
        //   });
        // }
      } else {
        for (let i = 0; i < this.sxcheckList.length; i++) {
          for (let j = 0; j < this.mx.length; j++) {
            if (this.sxcheckList[i].calicoId === this.mx[j].calicoId) {
              this.sxcheckList[i].whseMaterialDlaoid = this.mx[
                j
              ].whseMaterialDlaoid;
              break;
            }
          }
        }
        if (this.hide != "3" && this.hide != "4" && this.hide != "5") {
          this.mx = this.unique(this.mx.concat(this.sxcheckList), "calicoId");
          this.mx.forEach((item, index) => {
            item.index = index + 1;
          });
        } else {
          this.sxcheckList.forEach((item, i) => {
            item.whseMaterialFk = this.detail.whseMaterialoid;
            item.index = this.mx.length + 1;
          });

          this.mx = this.unique(
            this.mx.concat(this.sxcheckList),
            "whseCalicoinDtlaoid"
          );
        }
      }
      this.sxcheckList = [];
      this.sxclose();
    },
    save() {
      // console.log(this.mx);
      // return;
      if (this.mx.length === 0) {
        return;
      }
      this.loading = true;
      if (this.hide === "4" || this.hide === "3" || this.hide === "5") {
        for (let i = 0; i < this.mx.length; i++) {
          if (
            (this.hide === "3" || this.hide === "4") &&
            (!this.mx[i].retTotalweight || !this.mx[i].retTotalpi)
          ) {
            this.$tip.error("退回总疋数/退回总重量不能为空!");
            this.loading = false;
            return;
          }
          if (!this.mx[i].batchNo) {
            this.$tip.error(this.$t("iaoMng.saveTle4"));
            this.loading = false;
            return;
          }

          if (this.hide === "5" && !this.mx[i].traWeight) {
            this.$tip.error("调仓重量重量不能为空!");
            this.loading = false;
            return;
          }
        }
        this.mx.forEach((item, index) => {
          item.retCompany = item.weightUnit;
          item.traCompany = item.weightUnit;
          // item.whseCalicoinDtlaFk = item.whseCalicoinDtlaoid;
          item.whseCalicoinDtlbFk = item.whseCalicoinDtlboid;
          if (
            item.whseRetsuppcalicodtloid ||
            item.whseRetguestcalicodtloid ||
            item.whseTransfercalicoDtloid
          ) {
            // update
            this.func.updateDetail(item).then((res) => {
              if (index === this.mx.length - 1) {
                this.getDetail();
                this.$tip.success(this.$t("public.bccg"));
              }
            });
          } else {
            item.whseRetsuppcalicoFk = this.detail.whseRetsuppcalicooid;
            item.whseRetguestcalicoFk = this.detail.whseRetguestcalicooid;
            item.whseTransfercalicoFk = this.detail.whseTransfercalicooid;
            // add
            this.func.addDetail(item).then((res) => {
              if (index === this.mx.length - 1) {
                this.getDetail();
                this.$tip.success(this.$t("public.bccg"));
              }
            });
          }
        });
      } else {
        let addDtla = (item, i) => {
          return new Promise((resolve, reject) => {
            let data = JSON.parse(JSON.stringify(item));
            data.list = [];
            this.func.addDetail(data).then((res) => {
              item.whseCalicoselloutDtlaoid = res.data.data;
              item.whseMaterialDlaoid = res.data.data;
              resolve();
            });
          });
        };

        let promiseArr = this.mx.map((item, i) => {
          if (!item.whseMaterialDlaoid && !item.whseCalicoselloutDtlaoid) {
            item.whseMaterialFk = this.detail.whseMaterialoid;
            item.whseCalicoselloutFk = this.detail.whseCalicoselloutoid;
            return addDtla(item, i);
          }
        });

        Promise.all(promiseArr).then((res) => {
          for (let i = 0; i < this.mx.length; i++) {
            if (this.mx[i].list) {
              this.mx[i].list.forEach((item) => {
                if (!item.whseCalicoselloutDtlboid && this.hide === "6") {
                  item.whseCalicoselloutDtlaFk = this.mx[
                    i
                  ].whseCalicoselloutDtlaoid;
                  this.func.addPhDetail(item).then((res) => {});
                }
                if (
                  !item.whseMaterialDlboid &&
                  (this.hide === "1" || this.hide === "2")
                ) {
                  item.whseMaterialDlaFk = this.mx[i].whseMaterialDlaoid;
                  this.func.addPhDetail(item).then((res) => {});
                }
              });
            }
            if (i === this.mx.length - 1) {
              this.changeList = [];
              this.getDetail();
              this.$tip.success(this.$t("public.bccg"));
            }
          }
        });
      }

      // this.mx.forEach((item, index) => {
      //   if (!item.whseMaterialDlaoid && !item.whseCalicoselloutDtlaoid) {
      //     item.whseMaterialFk = this.detail.whseMaterialoid;
      //     item.whseCalicoselloutFk = this.detail.whseCalicoselloutoid;
      //   }
      //   if (index === this.mx.length - 1) {
      //     this.getDetail();
      //     this.$tip.success(this.$t("public.bccg"));
      //   }
      // });
      // this.changeList = [];
    },
    savePh() {
      return;
      if (this.rcData.length === 0) {
        return;
      }
      this.rcloading = true;
      this.rcData.forEach((item, index) => {
        if (!item.whseMaterialDlboid) {
          item.whseMaterialDlaFk = this.chooseData.whseMaterialDlaoid;
          this.func.addPhDetail(item).then((res) => {});
        }
        if (index === this.rcData.length - 1) {
          this.changeList = [];
          this.getPhDetail(this.chooseData);
          this.$tip.success(this.$t("public.bccg"));
        }
      });
    },
    // 生成领料计划
    savePlan() {
      if (this.form.retDate === "" || this.form.retCode === "") {
        this.$tip.error("请输入出仓编号/日期");
        return;
      }
      this.outloading = true;
      try {
        addMaterial(this.form).then((res) => {
          let addPb = (item, i) => {
            return new Promise((resolve, reject) => {
              addPbDetali({
                whseMaterialFk: res.data.data,
                calicoId: item.calicoId,
                clothName: item.clothName,
              }).then((Res) => {
                resolve({ oid: Res.data.data, index: i });
              });
            });
          };

          let promiseArr = this.mx.map((item, i) => {
            return addPb(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            if (res.length > 0) {
              res.forEach((item, i) => {
                if (
                  this.mx[item.index].list != undefined &&
                  this.mx[item.index].list.length > 0
                ) {
                  this.mx[item.index].list.forEach((mx, j) => {
                    addPhDetali(
                      Object.assign(mx, {
                        whseMaterialDlaFk: item.oid,
                      })
                    ).then((phRes) => {});
                  });
                }

                if (i === res.length - 1) {
                  // this.getDetail();
                  this.canSave = false;
                  this.outloading = false;
                  this.$emit("updateList");
                  this.$tip.success(this.$t("public.bccg"));
                }
              });
            } else {
              this.canSave = false;
              this.outloading = false;
              this.$emit("updateList");
              this.$tip.success(this.$t("public.bccg"));
            }
          });
        });
      } catch (error) {
        this.outloading = false;
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      // this.oldData.$cellEdit = false;
      if (this.choiceTle === "选择订单胚布资料") {
        let data = {
          woMatno: val.fabId,
          woMatname: val.fabName,
          woOrderno: val.$salPoFk,
          index: this.mx.length + 1,
        };
        this.mx.push(data);
        // this.changeList.push(data);
      } else if (
        this.choiceTle === this.$t("choicDlg.xzpbrc") ||
        this.choiceTle === this.$t("choicDlg.xzpbph")
      ) {
        // let data = {
        //   woMatno: val.fabId,
        //   woMatname: val.fabName,
        //   woOrderno: val.$salPoFk,
        //   index: this.mx.length + 1,
        // };
        if (val.length > 0) {
          val.forEach((item) => {
            item.retCompany = item.weightUnit;
          });
        }

        this.mx = this.mx.concat(val);
        // this.changeList.push(data);
      } else {
        this.chooseData.list = this.chooseData.list.concat(val);
        this.chooseData.list.forEach((e, index) => {
          e.index = index + 1;
          e.prodNo = e.$prodNo;
          e.woWeights = e.weight;
          e.woUnit = e.weightUnit;
          e.ticketNo = e.custTicket;
        });
      }
      // this.oldData.$cellEdit = true;
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    sxclose() {
      // this.outcrudOp.column[3].hide = true;
      // this.outcrudOp.column[4].hide = true;
      // this.outcrudOp.column[5].hide = true;
      this.outcrudOp.selection = false;
      this.outcrudOp.showSummary = true;
      this.outcrudOp.height = "calc(100vh - 288px)";
      this.sxcheckList = [];
      this.sxV = false;
    },
    unique(arr, val) {
      const res = new Map();
      return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
    },
  },
  created() {},
  mounted() {
    this.rcOp.height = "calc(100vh - 288px)";
    if (this.hide === "3" || this.hide === "4" || this.hide === "5") {
      this.mxOp = rsxkr3C(this);
    }
    if (this.hide === "6") {
      this.detail.retCode = this.detail.woOutno;
      this.detail.retDate = this.detail.woDate;
    }
    if (this.isPlan) {
      this.form = this.PlanForm;
    } else {
      this.form = this.detail;
    }
    // this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#sxPlanDlg {
  .el-dialog__header {
    padding: 0;
  }

  .el-card {
    border: none;
  }

  .el-dialog__body {
    padding: 0 !important;
  }

  .el-dialog__header {
    padding: 0px;
    background-color: rgb(2, 26, 60);
  }

  .formBox {
    margin-bottom: 0px;
  }

  // .el-button--mini, .el-button--small {
  // font-size: 16px;
  // }

  // .el-button--mini, .el-button--mini.is-round {
  // padding: 5px 10px;
  // }
  .avue-crud__menu {
    min-height: 5px !important;
    height: 5px !important;
  }

  .el-tabs__item {
    font-size: 18px;
    line-height: 30px;
    height: 30px;
  }

  .el-table__header-wrapper, .el-form-item__label, .el-input--mini {
    // font-size: 16px !important;
    // font-weight: 600 !important;
    // color: #000;
  }

  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    background-color: rgb(2, 26, 60);
  }

  // .avue-form__group {
  // background-color: #fff;
  // }

  // .el-table--mini td, .el-table--mini th {
  // padding: 2px 0 !important;
  // }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }

  .avue-crud__tip {
    display: none;
  }

  .el-dialog__header {
    padding: 0px;
  }

  .el-dialog__headerbtn {
    top: 5px;
    color: #000;
    font-size: 22px;
    z-index: 999;
  }
}

#rcDetail {
}
</style>