<template>
  <div id="rcDetail">
    <view-container
      :title="type + '生产领用资料'"
      v-loading="outloading"
      element-loading-text="正在拼命加载..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
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
        <el-col :span="16">
          <view-container :title="type + '生产领用明细'">
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
              v-loading="loading"
              :data="mx"
              :page.sync="page"
              @current-row-change="cellClick"
              @on-load="getDetail"
            ></avue-crud> </view-container
        ></el-col>
        <el-col :span="8">
          <view-container :title="type + '生产领用批号资料'">
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
              :page.sync="page"
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
import { rsxkr2C, rsxkr2F, sxForm, rsxkr3C, rcpb3C } from "./data";
import choice from "@/components/choice";
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
import { baseCodeSupply, updatePurApp } from "@/api/index";
import {
  getHgylDtl,
  addHgylDtl,
  delHgylDtl,
  updateHgylDtl,
  getLyHgylDtlb,
  addLyHgylDtlb,
  delLyHgylDtlb,
  updateLyHgylDtlb,
} from "@/api/im/Wk/cc/hgyl";
import proChoice from "@/components/proMng/index";
import { getLydmx, getSglydmx, updateSglyd, getHgylStock } from "./api";
export default {
  props: {
    type: String,
    attributeObj: Object,
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
      saved: false,
      sysCreatedby: "",
      proChoiceV: false,
      proChoiceTle: "选择纱线库存",
      proChoiceQ: {},
      purApp: {},
      oldphData: {},
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.loading = true;
      if (this.isAdd) {
        this.form = this.detail;
        this.loading = false;
        return;
      }
      if (
        Object.keys(this.detail).length === 0 ||
        (!this.detail.whseCalicoselloutoid &&
          !this.detail.whseRetyarninoid &&
          !this.detail.whseRetsuppcalicooid &&
          !this.detail.whseRetguestcalicooid &&
          !this.detail.whseTransfercalicooid &&
          !this.detail.whseChemicalOutId)
      ) {
        this.mx = [];
        this.loading = false;
        return;
      }

      this.loading = true;
      this.form = this.detail;
      // this.form.appId = this.detail.appId;
      if (Object.keys(this.detail).length === 0) {
        this.mx = [];
        this.loading = false;
        return;
      }
      this.attributeObj
        .getDtla({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseMaterialFk: this.detail.whseMaterialoid,
          whseRetsuppcalicoFk: this.detail.whseRetsuppcalicooid,
          whseTransfercalicoFk: this.detail.whseTransfercalicooid,
          whseCalicoselloutFk: this.detail.whseCalicoselloutoid,
          whseRetguestcalicoFk: this.detail.whseRetguestcalicooid,
          whseChemicalOutFk: this.detail.whseChemicalOutId,
          whseRetyarninFk: this.detail.whseRetyarninoid,
          yarnsId: "!^",
        })
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.mx = records.records;
          this.mx.forEach((item, index) => {
            item.$cellEdit = true;
            item.index = index + 1;
            item.applyNum = item.applyNum.toFixed(2);
            item.weight = item.weight.toFixed(2);
            if (index === this.mx.length - 1) {
              setTimeout(() => {
                if (this.mx.length > 0) {
                  this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
                }
                this.loading = false;
              }, 200);
            }
          });
          if (!this.mx.length) this.loading = false;
        });
    },
    getPhDetail(val) {
      if (this.chooseData.list.length) {
        this.$refs.dlgPhcrud.setCurrentRow(this.chooseData.list[0]);
        return;
      }
      if (
        val === null ||
        (!val.whseMaterialDlaoid &&
          !val.whseCalicoselloutDtlaoid &&
          !val.whseRetyarninDtloid)
      ) {
        this.chooseData.list = [];
        return;
      }
      this.rcloading = true;
      this.rcOp.showSummary = false;
      this.attributeObj
        .getDtlb({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          retyarninDtlFk: val.whseRetyarninDtloid,
        })
        .then((res) => {
          let records = res.data;
          this.rcPage.total = records.total;
          this.chooseData.list = records.records;
          if (this.chooseData.list.length === 0) {
            this.rcloading = false;
          }
          this.chooseData.list = this.chooseData.list.sort((a, b) => {
            return b.batchNo - a.batchNo;
          });
          if (this.chooseData.list.length) {
            this.$refs.dlgPhcrud.setCurrentRow(this.chooseData.list[0]);
          }
          this.chooseData.list.forEach((item, index) => {
            item.weightUnit = this.chooseData.weightUnit;
            item.weight = item.weight.toFixed(2);
            // item.$cellEdit = true;
            item.index = index + 1;
            if (index === this.chooseData.list.length - 1) {
              this.rcOp.showSummary = true;
              this.choosePh = {};
              this.rcloading = false;
            }
          });
        });
    },
    add() {
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
        this.proChoiceQ.yarnsId = "";
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
    },
    addPh() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请先选择明细资料!");
        return;
      }
      // this.chooseData.list.push({
      //   index: this.chooseData.list.length + 1,
      //   $cellEdit: true,
      // });
      // if (this.hide == "1") {
      this.proChoiceQ.yarnsId = this.chooseData.yarnsId;
      this.proChoiceQ.batchNo = this.chooseData.batchNo;
      this.proChoiceTle = "选择纱线库存";
      this.proChoiceV = true;
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
      if (!this.chooseData.whseRetyarninDtloid) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
        this.mx.forEach((i, index) => {
          i.index = index + 1;
        });
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除编号为【 " + this.chooseData.yarnsId + " 】的数据?",
          this,
          {}
        )
        .then(() => {
          this.attributeObj
            .delDtla(this.chooseData.whseRetyarninDtloid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                // if (this.chooseData.list.length) {
                //   this.chooseData.list.forEach((item, i) => {
                //     this.attributeObj
                //       .delPhDetail(item.whseChemicalDlboid)
                //       .then((dtlb) => {
                //         if (i == this.chooseData.list.length - 1) {
                //           this.mx.splice(this.chooseData.index - 1, 1);
                //           this.chooseData = {};
                //           if (this.mx.length) {
                //             this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
                //           }
                //           this.mx.forEach((item, i) => {
                //             item.index = i + 1;
                //           });
                //         }
                //       });
                //   });
                // } else {
                this.mx.splice(this.chooseData.index - 1, 1);
                this.chooseData = {};
                if (this.mx.length) {
                  this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
                } else {
                  this.$refs.dlgcrud.setCurrentRow();
                }
                this.mx.forEach((item, i) => {
                  item.index = i + 1;
                });
                // }
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
        !this.choosePh.whseTransferDtloid &&
        !this.choosePh.retyarninDtlaId &&
        !this.choosePh.whseChemicalDlboid
      ) {
        this.chooseData.list.splice(this.choosePh.index - 1, 1);
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.dlgPhcrud.setCurrentRow();
        return;
      }

      let tip = "";
      // if (this.hide === "6") {
      //   tip =
      //     "是否确定删除生产单号为 【 " + this.choosePh.prodNo + " 】的数据？";
      // } else {
      tip = "是否确定删除批号为 【" + this.choosePh.batchNo + " 】的数据？";
      // }
      this.$tip
        .cofirm(tip, this, {})
        .then(() => {
          this.outloading = true;
          this.attributeObj
            .delDtlb(this.choosePh.retyarninDtlaId)
            .then((res) => {
              if (res.data.code === 200) {
                this.attributeObj
                  .updateDtla({
                    whseChemicalOutdtlId: this.chooseData.whseChemicalOutdtlId,
                    weight: this.chooseData.weight - this.choosePh.weight,
                  })
                  .then((res) => {
                    this.chooseData.weight -= this.choosePh.weight;

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
                  });
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
              this.outloading = false;
            })
            .catch((err) => {
              this.outloading = false;
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.outloading = false;
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
      this.oldphData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldphData = val;
      this.choosePh = val;
    },
    close() {
      this.$emit("close", this.saved);
    },
    save() {
      if (this.form.retCode == "" || this.form.retDate == null) {
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
        this.mx[i].weight = 0;
        for (let j = 0; j < this.mx[i].list.length; j++) {
          if (!this.mx[i].list[j].weight || this.mx[i].list[j].weight == 0) {
            this.$tip.error("数量不能为空!");
            return;
          }
          this.mx[i].weight += Number(this.mx[i].list[j].weight);
        }
        if (!this.mx[i].weight) {
          this.$tip.error("数量不能为空!");
          return;
        }
        // if (
        //   this.mx[i].weight >
        //   this.mx[i].applyNum + (this.mx[i].debitQty || 0)
        // ) {
        //   this.$tip.error("出仓数量不能超过领用数量!");
        //   return;
        // }
        this.mx[i].debitQty =
          this.mx[i].weight > this.mx[i].applyNum
            ? Number((this.mx[i].weight - this.mx[i].applyNum).toFixed(2))
            : 0;
      }
      this.outloading = true;
      this.modified = true;
      if (this.form.yinDate != "" && this.form.yinDate != undefined) {
        this.form.yinDate += " 00:00:00";
      }
      this.saved = true;
      if (
        this.form.whseChemicalinoid ||
        this.form.whseAccessoriesinoid ||
        this.form.whseRetyarninoid ||
        this.form.whseDyesalinoid
      ) {
        this.attributeObj.update(this.form).then((res) => {
          if (this.mx.length === 0) {
            setTimeout(() => {
              this.outloading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              if (
                item.whseChemicalinDtlaoid ||
                item.whseAccessoriesDtloid ||
                item.whseRetyarninDtloid ||
                item.whseDyesainDtlaoid
              ) {
                this.attributeObj.updateDtla(data).then((res) => {
                  resolve();
                });
              } else {
                // 新增
                data.whseChemicalinFk = this.detail.whseChemicalinoid;
                data.whseAccessoriesinFk = this.detail.whseAccessoriesinoid;
                data.whseRetyarninFk = this.detail.whseRetyarninoid;
                data.whseDyesalinFk = this.detail.whseDyesalinoid;
                this.attributeObj.addDtla(data).then((res) => {
                  item.whseChemicalinDtlaoid = res.data.data;
                  item.whseAccessoriesDtloid = res.data.data;
                  item.whseRetyarninDtloid = res.data.data;
                  item.whseDyesainDtlaoid = res.data.data;
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
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseAccessoriesDtlFk = this.mx[i].whseAccessoriesDtloid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  item.retyarninDtlFk = this.mx[i].whseRetyarninDtloid;
                  // if (
                  //   this.datas === this.$t("iaoMng.hgyl") ||
                  //   this.datas === this.$t("iaoMng.yl")
                  // ) {
                  if (!item.retyarninDtlaId) {
                    this.attributeObj.addDtlb(item).then((res) => {
                      item.whseChemicalinDtlboid = res.data.data;
                      item.whseDyesainDtlboid = res.data.data;
                      item.retyarninDtlaId = res.data.data;
                    });
                  } else {
                    this.attributeObj.updateDtlb(item).then((res) => {});
                  }
                  // }
                });
              }
              if (i === this.mx.length - 1) {
                setTimeout(() => {
                  this.outloading = false;
                  this.$tip.success(this.$t("public.bccg"));
                }, 200);
              }
            }
          });
        });
      } else {
        this.attributeObj.add(this.form).then((res) => {
          if (this.form.stockType == 3) {
            updatePurApp(
              Object.assign(this.purApp, {
                collectSucceed: 1,
              })
            ).then((res) => {});
          } else if (this.form.stockType == 1) {
            updateSglyd(
              Object.assign(this.purApp, {
                collectSucceed: 1,
              })
            ).then(res);
          }

          if (this.mx.length === 0) {
            setTimeout(() => {
              this.outloading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
          baseCodeSupply({ code: "whse_out" }).then((res) => {});
          this.form.whseChemicalinoid = res.data.data;
          this.form.whseAccessoriesinoid = res.data.data;
          this.form.whseRetyarninoid = res.data.data;
          this.form.whseDyesalinoid = res.data.data;
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.alloc = [];
              if (
                item.whseChemicalinDtlaoid ||
                item.whseAccessoriesDtloid ||
                item.whseRetyarninDtloid ||
                item.whseDyesainDtlaoid
              ) {
                resolve();
                // 修改
              } else {
                // 新增
                data.whseChemicalinFk = this.form.whseChemicalinoid;
                data.whseAccessoriesinFk = this.form.whseAccessoriesinoid;
                data.whseRetyarninFk = this.form.whseRetyarninoid;
                data.whseDyesalinFk = this.form.whseDyesalinoid;
                this.attributeObj.addDtla(data).then((res) => {
                  item.whseChemicalinDtlaoid = res.data.data;
                  item.whseAccessoriesDtloid = res.data.data;
                  item.whseRetyarninDtloid = res.data.data;
                  item.whseDyesainDtlaoid = res.data.data;
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
                  item.whseChemicalinDtlaFk = this.mx[i].whseChemicalinDtlaoid;
                  item.whseAccessoriesDtlFk = this.mx[i].whseAccessoriesDtloid;
                  item.whseDyesainDtlaFk = this.mx[i].whseDyesainDtlaoid;
                  item.retyarninDtlFk = this.mx[i].whseRetyarninDtloid;
                  if (!item.retyarninDtlaId) {
                    this.attributeObj.addDtlb(item).then((res) => {
                      item.whseChemicalinDtlboid = res.data.data;
                      item.whseDyesainDtlboid = res.data.data;
                      item.retyarninDtlaId = res.data.data;
                    });
                  } else {
                    this.attributeObj.updateDtlb(item).then((res) => {});
                  }
                });
              }
              if (i === this.mx.length - 1) {
                setTimeout(() => {
                  this.outloading = false;
                  this.$tip.success(this.$t("public.bccg"));
                }, 200);
              }
            }
          });
        });
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      // this.oldData.$cellEdit = false;
      if (this.choiceTle === this.$t("choicDlg.xzsgd")) {
        this.form.appId = val.appId;
        this.form.purSingleoid = val.purSingleoid;
        this.purApp = val;
        getSglydmx({
          applyState: 3,
          collectSucceed: 0,
          purCategory: 4,
          purSingleFk: this.form.purSingleoid,
        }).then((res) => {
          let val = res.data;
          val.forEach((item, i) => {
            // item.$cellEdit = true;
            item.yarnsId = item.materialNum;
            item.yarnsName = item.chinName;
            item.yarnBrand = item.yarnsCard;
            item.weightUnit = item.company;
            item.weight = 0;
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
      } else if (this.choiceTle === this.$t("choicDlg.xzsgdzl")) {
        this.loading = true;
        val.forEach((item, i) => {
          item.$cellEdit = true;
          item.materialId = item.materialNum;
          item.materialName = item.chinName;
          item.yarnsId = item.materialNum;
          item.yarnsName = item.chinName;
          item.yarnBrand = item.yarnsCard;
          item.company = item.company;
          item.stockUnit = item.company;
        });
        this.mx = this.mx.concat(val);
        // this.mx = this.unique(this.mx, "materialId");
        this.page.total = this.mx.length;
        this.mx.forEach((e, index) => {
          e.index = index + 1;
        });
        setTimeout(() => {
          this.loading = false;
        }, 200);
      } else if (this.choiceTle === this.$t("choicDlg.xzsqlyd")) {
        this.loading = true;
        this.form.appId = val.applyCode;
        this.form.purApplicationoid = val.purApplicationoid;
        this.purApp = val;
        let stockList = [];
        // getHgylStock().then((res) => {
        //   stockList = res.data;
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
              item.weight = 0; // item.applyNum;
              item.suppBatchNo = item.batId;
              item.weaveJobCode = item.weaveNo;
              item.yarnBrand = item.yarnsCard;
              item.list = []; // [JSON.parse(JSON.stringify(item))];
              // item.list.forEach((item, i) => {
              //   item.weight = item.applyNum;
              //   item.$cellEdit = true;
              //   item.index = i + 1;
              // });
            });
            this.mx = this.mx.concat(val);
            // this.mx = this.unique(this.mx, "materielCode");
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
          }
        });
      } else if (this.choiceTle === this.$t("choicDlg.xzsqlydmx")) {
        this.loading = true;
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
          item.suppBatchNo = item.batId;
          item.weaveJobCode = item.weaveNo;
          item.yarnBrand = item.yarnsCard;
        });
        this.mx = this.mx.concat(val);
        this.mx = this.unique(this.mx, "yarnsId");
        this.page.total = this.mx.length;
        this.mx.forEach((e, index) => {
          e.index = index + 1;
          if (index == this.mx.length - 1) {
            setTimeout(() => {
              this.loading = false;
            }, 200);
          }
        });
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
      // for (var key in val) {
      //   delete val[key];
      // }
      // for (var key in this.choiceQ) {
      //   delete this.choiceQ[key];
      // }
      this.choiceV = false;
    },
    proChoiceData(val) {
      if (Object.keys(val).length === 0 || val.length === 0 || val === null) {
        this.proChoiceV = false;
        return;
      }
      this.outloading = true;
      if (this.proChoiceTle === "选择化工原料入仓信息") {
        if (this.hide === "1") {
          this.mxOp.column[3].hide = false;
          // this.mxOp.column[5].hide = false;
          this.mxOp.column[6].hide = false;
          this.mxOp.column[9].hide = false;
        }
        val.forEach((item) => {
          item.$cellEdit = true;
          item.materialId = item.chemicalId;
          item.materialName = item.$chemicalName;
          item.company = item.weightUnit;
          item.stockUnit = item.weightUnit;
          item.bcColorprison = item.chemicalId;
          item.vitality = item.chemicalId;
          item.bcClass = item.chemicalId;
          item.dangerlevel = item.chemicalId;
          item.bcForce = item.chemicalId;
          item.applyNum = item.weight;
          item.model = item.chemicalId;
          item.weight = item.weight;
          item.whseChemicalinFk = item.whseChemicalinDtlaoid;
        });
        this.mx = this.mx.concat(val);
        this.mx = this.unique(this.mx, "batchNo");
        this.page.total = this.mx.length;
        this.$nextTick(() => {
          this.mx.forEach((e, index) => {
            e.index = index + 1;
            if (index == this.mx.length - 1) {
              setTimeout(() => {
                this.$nextTick(() => {
                  this.$set(this.mxOp.column[3], "hide", true);
                  // this.$set(this.mxOp.column[5], "hide", true);
                  this.$set(this.mxOp.column[6], "hide", true);
                  this.$set(this.mxOp.column[9], "hide", true);
                  this.loading = false;
                });
              }, 500);
            }
          });
        });
      } else if (this.proChoiceTle === "选择化工原料库存") {
        let sum = 0;
        this.chooseData.list.forEach((item, i) => {
          sum += item.weight;
        });
        val.forEach((item, i) => {
          item.weight = item.stock;
          item.$cellEdit = true;
        });
        for (let i = 0; i < val.length; i++) {
          if (sum + val[i].stock <= this.chooseData.applyNum) {
            this.chooseData.list.push(val[i]);
            sum += val[i].stock;
          } else if (this.chooseData.applyNum - sum > 0) {
            val[i].weight = this.chooseData.applyNum - sum;
            sum += val[i].weight;
            this.chooseData.list.push(val[i]);
            break;
          }
        }
        this.chooseData.weight = sum;
        this.chooseData.list = this.unique(this.chooseData.list, "batchNo");
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
      } else if (this.proChoiceTle === "选择纱线库存") {
        if (this.form.stockType == 2) {
          val.forEach((item, i) => {
            item.$cellEdit = true;
            item.whseYarninDtlaFk = item.whseYarninDtlaoid;
            item.list = [JSON.parse(JSON.stringify(item))];
            item.applyNum = item.weight;
            this.mx.push(item);
          });
          if (this.mx.length) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        } else {
          let sum = 0;
          this.chooseData.list.forEach((item, i) => {
            sum += Number(item.weight);
          });
          val.forEach((item, i) => {
            // item.weight = item.stock;
            item.whseYarninDtlaFk = item.whseYarninDtlaoid;
            item.$cellEdit = true;
          });
          for (let i = 0; i < val.length; i++) {
            if (sum + val[i].weight <= this.chooseData.applyNum) {
              this.chooseData.list.push(val[i]);
              sum += Number(val[i].weight);
            } else if (this.chooseData.applyNum - sum > 0) {
              val[i].weight = this.chooseData.applyNum - sum;
              sum += Number(val[i].weight);
              this.chooseData.list.push(val[i]);
              break;
            }
          }
          // console.log(sum);
          this.chooseData.weight = Number(sum);
          // this.chooseData.list = this.unique(this.chooseData.list, "batchNo");
          this.chooseData.list.forEach((item, i) => {
            item.index = i + 1;
          });
        }
      }
      setTimeout(() => {
        this.outloading = false;
      }, 200);
      this.proChoiceV = false;
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
    changeRet(val) {
      this.mx = [];
      if (val === "1") {
        // this.mxOp.column[4].hide = true;
        this.mxOp.column[7].hide = false;
        this.mxOp.column[7].label = "申领数量";
        this.formOp.column[4].label = "申购单";
        if (!this.isAdd) {
          return;
        }
        // this.formOp.column[7].disabled = false;
      } else if (val === "2") {
        // 其他
        // this.mxOp.column[4].hide = false;
        // this.mxOp.column[4].label = this.$t("whseField.ph");
        this.mxOp.column[7].hide = false;
        this.mxOp.column[7].label = "入仓数量";
        this.formOp.column[4].disabled = true;
      } else {
        // this.mxOp.column[4].hide = true;
        this.mxOp.column[7].hide = false;
        this.mxOp.column[7].label = "申领数量";
        if (!this.isAdd) {
          return;
        }
        this.formOp.column[4].disabled = false;
        this.formOp.column[4].label = "申购领用单";
      }
      this.form.appId = "";
    },
    unique(arr, val) {
      const res = new Map();
      return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
    },
  },
  created() {},
  mounted() {
    this.form.sysCreatedby = this.$store.state.userOid;
    this.form = this.detail;
  },
  updated() {
    this.$nextTick(() => {
      if (this.mx.length) {
        this.$refs["dlgcrud"].doLayout();
      }
      if (this.chooseData.list) {
        this.$refs["dlgPhcrud"].doLayout();
      }
    });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.el-table
  overflow visible !important
.el-card__body
  padding 20px 20px 50px 20px
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