<template>
  <div id="rcDetail">
    <view-container
      :title="datas.type.split('_')[0] + '出库资料'"
      v-loading="loading"
      element-loading-text="正在拼命加載中..."
      element-loading-spinner="el-icon-loading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
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
        <el-col :span="16">
          <view-container :title="datas.type.split('_')[0] + '出库明细'">
            <div
              class="btnList"
              style="margin-bottom: 2px"
              v-if="!isPlan && hide != '2'"
            >
              <el-button type="primary" @click="add" v-if="canSave">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="danger" @click="del" v-if="canSave">{{
                this.$t("public.del")
              }}</el-button>
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
        <el-col :span="8">
          <view-container title="生产领用批号资料">
            <div class="btnList" style="margin-bottom: 2px">
              <el-button
                type="primary"
                @click="dtlaAdd"
                v-if="canSave"
                :disabled="detail.stockState == '1'"
                >{{ this.$t("public.add") }}</el-button
              >
              <el-button
                type="danger"
                @click="dtlaDel"
                v-if="canSave"
                :disabled="detail.stockState == '1'"
                >{{ this.$t("public.del") }}</el-button
              >
            </div>
            <avue-crud
              ref="dlgPhcrud"
              :option="dtlaOp"
              v-loading="dtlaloading"
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
    <bas-dyestuff
      :showDlg="otherV"
      :dlgTle="this.$t('whseField.xzwjxzyp')"
      @choiceData="choiceDyestuff"
      @close="otherV = false"
    >
    </bas-dyestuff>
  </div>
</template>
<script>
import bas_dyestuff from "@/components/bas_dyestuff/index";
import { dtlaCrud, rsxkr2C, rsxkr2F, rsxkr3C } from "./data";
import choice from "@/components/choice";
import { getPb, getPbDetali, getPbDetaliList, getPbPh } from "@/api/im/Wk/rc";
import {
  // 明细
  getScflDetali,
  addScflDetali,
  updateScflDetali,
  delScflDetali,
  // 退供应商
  getRetsupDtl,
  addRetsupDtl,
  updateRetsupDtl,
  delRetsupDtl,
  // 调仓
  getTraDtl,
  addTraDtl,
  updateTraDtl,
  delTraDtl,
} from "@/api/im/Wk/cc/scfl";
import {
  // 明细
  addRetmaterialsDtl,
  updateRetmaterialsDtl,
  delRetmaterialsDtl,
  getRetmaterialsDtl,
} from "@/api/im/Wk/cc/scfl";
import { getUcmlUser } from "@/const/whse.js";
import { baseCodeSupply, getSglydmx } from "@/api/index";
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
    basDyestuff: bas_dyestuff,
  },
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      formOp: rsxkr2F(this),
      mxOp: rsxkr2C(this),
      mx: [],
      form: {},
      oldData: {},
      chooseData: {},
      func: {},
      dlgTle: "選擇紗線配料",
      choosePh: {},
      canSave: true,
      choiceV: false,
      choiceTle: "选择订单胚布资料",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      saved: false,
      sysCreatedby: "",
      otherV: false,
      purApp: {},
      dtlaOp: dtlaCrud(this),
      dtlaloading: false,
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.chooseData = {};
      if (this.hide === "1") {
        this.func.getDetail = getScflDetali;
        this.func.delDetail = delScflDetali;
        this.func.updateDetail = updateScflDetali;
        this.func.addDetail = addScflDetali;
      }
      if (this.hide === "2") {
        this.func.getDetail = getRetmaterialsDtl;
        this.func.delDetail = delRetmaterialsDtl;
        this.func.updateDetail = updateRetmaterialsDtl;
        this.func.addDetail = addRetmaterialsDtl;
      } else if (this.hide === "4" || this.hide === "3") {
        this.func.getDetail = getRetsupDtl;
        this.func.delDetail = delRetsupDtl;
        this.func.updateDetail = updateRetsupDtl;
        this.func.addDetail = addRetsupDtl;
      } else if (this.hide === "5") {
        this.func.getDetail = getTraDtl;
        this.func.delDetail = delTraDtl;
        this.func.updateDetail = updateTraDtl;
        this.func.addDetail = addTraDtl;
      }
      if (this.isPlan) {
        this.loading = true;
        this.form = this.detail;
        this.detail.index = 1;
        this.mx.push(this.detail);
        this.page.total = 1;
        setTimeout(() => {
          this.loading = false;
        }, 200);
        return;
      }
      if (this.isAdd) {
        this.form = this.detail;
        if (this.hide === "4" || this.hide === "3") {
          this.$nextTick(() => {
            this.$set(this.mxOp.column[3], "hide", true);
          });
        }
        return;
      }
      this.loading = true;
      this.form = this.detail;
      this.form.appId = this.detail.appId;
      if (Object.keys(this.detail).length === 0) {
        this.mx = [];
        this.loading = false;
        return;
      }
      this.func
        .getDetail({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseRetmaterialsFk: this.detail.whseRetmaterialsoid,
          whseRetsuppaccessoriesFk: this.detail.whseRetsuppaccessoriesoid,
          whseTransferaccessoriesFk: this.detail.whseTransferaccessoriesoid,
        })
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.mx = records.records;
          if (this.mx.length === 0) {
            if (this.hide === "4" || this.hide === "3") {
              this.$set(this.mxOp.column[3], "hide", true);
            }
            this.loading = false;
          }
          this.mx.forEach((item, index) => {
            item.$cellEdit = true;
            item.index = index + 1;
            item.hardwareId = item.materialId;
            if (this.hide === "4" || this.hide === "5" || this.hide === "3") {
              item.materialNum = item.whseAccessoriesDtlFk;
              item.batchNo = item.whseAccessoriesDtlFk;
              item.poQty = item.whseAccessoriesDtlFk;
              item.whseAccessoriesinFk = item.whseAccessoriesDtlFk;
            }
            if (index === this.mx.length - 1) {
              setTimeout(() => {
                this.$nextTick(() => {
                  this.$refs.dlgcrud.setCurrentRow();
                  if (this.hide === "4" || this.hide === "3") {
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
                this.loading = false;
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
          this.otherV = true;
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
      } else if (this.hide === "4" || this.hide === "5" || this.hide === "3") {
        this.choiceV = !this.choiceV;
        this.choiceField = "woOrderno";
        this.oldData = this.chooseData;
        this.choiceTarget = this.oldData;
        this.choiceTle = this.$t("choicDlg.xzflrc");
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
        !this.chooseData.whseAccessoriesoutDtloid &&
        !this.chooseData.whseRetsuppaccessoriesDtloid &&
        !this.chooseData.whseTraaccessoriesDtloid
      ) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.dlgcrud.setCurrentRow();
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
                ? this.chooseData.whseRetsuppaccessoriesDtloid
                : this.hide === "5"
                ? this.chooseData.whseTraaccessoriesDtloid
                : this.chooseData.whseAccessoriesoutDtloid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
                this.$refs.dlgcrud.setCurrentRow();
                this.mx.forEach((item, i) => {
                  item.index = i + 1;
                });
                // this.getDetail();
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
    dtlaAdd() {},
    dtlaDel() {},
    close() {
      this.$emit("close", this.saved);
    },
    choiceDyestuff(val) {
      if (val.length === 0) {
        this.otherV = false;
        return;
      }
      val.forEach((item, i) => {
        item.matId = item.bcCode;
        item.matName = item.cnnamelong;
        // item.topcategoryName = item.$basAdsuppliesFk || item.$basHardwareFk;
        // item.seccategoryName =
        //   item.$basAdsuppliesDtlaFk || item.$basHardwareDtlaFk;
        item.qtyUnit = item.bcUnit;
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
        // if (this.form.leader == "") {
        //   this.$tip.error("领用人不能为空!");
        //   return;
        // }
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
      if (this.hide === "4" || this.hide === "3") {
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
      if (this.hide === "2") {
        if (this.form.retCode == "" || this.form.retDate == null) {
          this.$tip.error("出仓编号/日期不能为空!");
          return;
        }
        if (this.form.batchNumber == "") {
          this.$tip.error("配料單號不能为空!");
          return;
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
        this.form.whseAccessoriesoutoid ||
        this.form.whseRetsuppaccessoriesoid ||
        this.form.whseTraaccessoriesoid ||
        this.form.whseRetmaterialsoid
      ) {
        this.everyThing.updateF(this.form).then((Res) => {
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
            return;
          }
          this.mx.forEach((item, i) => {
            if (
              item.whseAccessoriesoutDtloid ||
              item.whseRetsuppaccessoriesDtloid ||
              item.whseTraaccessoriesDtloid ||
              item.whseRetmaterialsDtloid
            ) {
              // 更新
              this.func.updateDetail(item).then((res) => {});
            } else {
              // 新增
              item.whseAccessoriesoutFk = this.form.whseAccessoriesoutoid;
              item.whseRetsuppaccessoriesFk =
                this.form.whseRetsuppaccessoriesoid;
              item.whseTraaccessoriesFk = this.form.whseTraaccessoriesoid;
              item.whseRetmaterialsFk = this.form.whseRetmaterialsoid;
              this.func.addDetail(item).then((res) => {
                item.whseAccessoriesoutDtloid = res.data.data;
                item.whseRetsuppaccessoriesDtloid = res.data.data;
                item.whseTraaccessoriesDtloid = res.data.data;
                item.whseRetmaterialsDtloid = res.data.data;
              });
            }
            if (i === this.mx.length - 1) {
              this.loading = false;
              this.$tip.success(this.$t("public.bccg"));
            }
          });
          this.$emit("updateList");
        });
      } else {
        this.everyThing.addF(this.form).then((Res) => {
          baseCodeSupply({ code: "whse_out" }).then((res) => {});
          this.form.whseAccessoriesoutoid = Res.data.data;
          this.form.whseRetsuppaccessoriesoid = Res.data.data;
          this.form.whseTraaccessoriesoid = Res.data.data;
          this.form.whseRetmaterialsoid = Res.data.data;
          if (this.mx.length === 0) {
            this.loading = false;
            this.$tip.success(this.$t("public.bccg"));
            return;
          }
          this.mx.forEach((item, i) => {
            if (
              item.whseAccessoriesoutDtloid ||
              item.whseRetsuppaccessoriesDtloid ||
              item.whseTraaccessoriesDtloid ||
              item.whseRetmaterialsDtloid
            ) {
              // 更新
              this.func.updateDetail(item).then((res) => {});
            } else {
              // 新增
              item.whseAccessoriesoutFk = this.form.whseAccessoriesoutoid;
              item.whseRetsuppaccessoriesFk =
                this.form.whseRetsuppaccessoriesoid;
              item.whseTraaccessoriesFk = this.form.whseTraaccessoriesoid;
              item.whseRetmaterialsFk = this.form.whseRetmaterialsoid;
              this.func.addDetail(item).then((res) => {
                item.whseAccessoriesoutDtloid = res.data.data;
                item.whseRetsuppaccessoriesDtloid = res.data.data;
                item.whseTraaccessoriesDtloid = res.data.data;
                item.whseRetmaterialsDtloid = res.data.data;
              });
            }
            if (i === this.mx.length - 1) {
              this.loading = false;
              this.$tip.success(this.$t("public.bccg"));
            }
          });
          this.$emit("updateList");
        });
      }
    },
    cellPhClick(val) {
      this.oldphData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldphData = val;
      this.choosePh = val;
    },
    choiceData(val) {
      if (Object.keys(val).length === 0 || val.length === 0 || val === null) {
        this.choiceV = false;
        return;
      }
      // this.loading = true;
      if (this.choiceTle === this.$t("choicDlg.xzsgd")) {
        // this.form.appId = val.appId;
        // this.form.purSingleoid = val.purSingleoid;
        this.form.appId = val.appId;
        this.form.purSingleoid = val.purSingleoid;
        this.purApp = val;
      } else if (this.choiceTle === this.$t("choicDlg.xzlyr")) {
        this.form.leader = val.perPersonoid;
      } else if (this.choiceTle === this.$t("choicDlg.xzsgdzl")) {
        val.forEach((item, i) => {
          item.$cellEdit = true;
          item.materialId = item.materialNum;
          item.materialName = item.chinName;
          item.company = item.company;
          item.stockUnit = item.company;
        });
        this.mx = this.mx.concat(val);
        this.mx = this.unique(this.mx, "materialId");
        this.page.total = this.mx.length;
        this.mx.forEach((e, index) => {
          e.index = index + 1;
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzsqlydmx")) {
        val.forEach((item, i) => {
          item.$cellEdit = true;
          item.materialId = item.materielCode;
          item.materialName = item.materielName;
          item.company = item.company;
          item.stockUnit = item.company;
        });
        this.mx = this.mx.concat(val);
        this.mx = this.unique(this.mx, "materielCode");
        this.page.total = this.mx.length;
        this.mx.forEach((e, index) => {
          e.index = index + 1;
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzflrc")) {
        if (val.length > 0) {
          val.forEach((item) => {
            item.$cellEdit = true;
            item.retCompany = item.unitQty;
            item.traCompany = item.unitQty;
            item.materialName = item.$materialName;
            item.retQty = item.poQty;
            item.model = item.$model;
            item.itemspec = item.$itemspec;
            item.whseAccessoriesinFk = item.whseAccessoriesinoid;
            item.whseAccessoriesDtlFk = item.whseAccessoriesDtloid;
            item.index = this.mx.length + 1;
          });
        }

        this.mx = this.mx.concat(val);
        this.mx = this.unique(this.mx, "whseAccessoriesDtlFk");
      } else if (this.choiceTle === this.$t("choicDlg.xzsqlyd")) {
        this.form.appId = val.applyCode;
        this.form.purApplicationoid = val.purApplicationoid;
        this.purApp = val;
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
      // for (var key in val) {
      //   delete val[key];
      // }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    changeRet(val) {
      // if (!this.isAdd) {
      //   return;
      // }
      this.mx = [];
      if (val === "1") {
        this.mxOp.column[6].hide = false;
        this.mxOp.column[6].label = "申购数量";
        this.mxOp.column[7].hide = false;
        this.mxOp.column[7].label = "申购单位";
        this.formOp.column[3].label = "申购单";
        if (!this.isAdd) {
          return;
        }
        this.formOp.column[3].disabled = false;
        this.form.appId = "";
      } else if (val === "2") {
        // 其他
        this.mxOp.column[6].hide = true;
        this.mxOp.column[7].hide = true;
        this.formOp.column[3].disabled = true;
        this.form.appId = "";
      } else {
        this.mxOp.column[6].hide = false;
        this.mxOp.column[6].label = "領用数量";
        this.mxOp.column[7].hide = false;
        this.mxOp.column[7].label = "領用单位";
        this.formOp.column[3].disabled = false;
        this.formOp.column[3].label = "申购领用单";
        this.form.appId = "";
      }
    },
    unique(arr, val) {
      const res = new Map();
      return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
    },
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
    getUcmlUser({ usrLogin: parent.userID }).then((Res) => {
      this.sysCreatedby = Res.data.ucmlUseroid;
    });
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

  .el-dialog.is-fullscreen {
    overflow: hidden;
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
</style>