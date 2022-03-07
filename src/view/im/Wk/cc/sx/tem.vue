<template>
  <div id="rcDetail">
    <view-container
      :title="datas.type.split('_')[0] + '出庫單'"
      v-loading="loading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          $t("public.save")
        }}</el-button>
        <el-button type="primary" @click="add">{{
          $t("public.add")
        }}</el-button>
        <el-button
          type="danger"
          @click="del"
          :disabled="Object.keys(chooseData).length === 0"
          >{{ $t("public.del") }}</el-button
        >
        <el-button type="warning" @click="close">{{
          $t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <view-container :title="datas.type.split('_')[0] + '出庫單明細'">
        <div class="crudBox" style="margin-top: 2px">
          <avue-crud
            ref="dlgcrud"
            id="mx"
            :option="mxOp"
            :data="mx"
            :page.sync="page"
            @on-load="getDetail"
            @current-row-change="cellClick"
          ></avue-crud>
        </div>
      </view-container>
    </view-container>
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      :dlgWidth="dlgWidth"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F, sxForm, rsxkr3C } from "./data";
import { getSx, getSxDetali } from "@/api/im/Wk/rc";
import { baseCodeSupply } from "@/api/index";
import choice from "@/components/choice";
import {
  updateSx,
  addSx,
  getSxCcDetali,
  addSxDetali,
  updateSxDetali,
  delSxDetali,
  getSxPlan,
  getSxOutPlan,
  getSxRetreatDtl,
  addSxRetreatDtl,
  updateSxRetreatDtl,
  delSxRetreatDtl,
  getSxTransferDtl,
  addSxTransferDtl,
  updateSxTransferDtl,
  delSxTransferDtl,
} from "@/api/im/Wk/cc/sx";
export default {
  props: {
    datas: Object,
    everyThing: Object,
    hide: String,
    detail: Object,
    isAdd: Boolean,
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
      // form: {},
      // formOp: rsxkr2F(this),
      // mxOp: rsxkr2C(this),
      // mx: [],
      sxcrud: [],
      sxpage: {},
      sxloading: false,
      sxcheckList: [],
      planData: {},
      func: {},
      dlgTle: "選擇紗線配料",
      saved: false,
      choiceV: false,
      choiceTle: this.$t("iaoMng.xzlsdj"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      dlgWidth: "60%",
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.loading = true;
      this.func.getDetail = getSxCcDetali;
      this.func.delDetail = delSxDetali;
      this.func.addDetail = addSxDetali;
      this.func.updateDetail = updateSxDetali;
      if (this.hide === "3" || this.hide === "4") {
        this.func.getDetail = getSxRetreatDtl;
        this.func.delDetail = delSxRetreatDtl;
        this.func.addDetail = addSxRetreatDtl;
        this.func.updateDetail = updateSxRetreatDtl;
        this.mxOp = rsxkr3C(this);
      }
      if (this.hide === "5") {
        this.func.getDetail = getSxTransferDtl;
        this.func.delDetail = delSxTransferDtl;
        this.func.addDetail = addSxTransferDtl;
        this.func.updateDetail = updateSxTransferDtl;
        this.mxOp = rsxkr3C(this);
      }
      if (this.isAdd) {
        if (this.hide === "2") {
          this.detail.list.index = 1;
          this.mx.push(Object.assign(this.detail.list, { $cellEdit: true }));
          this.page.total = this.mx.length;
        }
        if (
          this.hide === "3" ||
          this.hide === "4" ||
          this.hide === "5" ||
          this.hide === "1"
        ) {
          this.mxOp.column[2].hide = true;
        }
        // this.$refs.dlgcrud.setCurrentRow();
        this.loading = false;
        return;
      }
      if (
        Object.keys(this.detail).length === 0 ||
        (!this.detail.whseRetyarninoid &&
          !this.detail.whseRetreatoid &&
          !this.detail.whseTransferoid)
      ) {
        this.mx = [];
        this.mxOp.showSummary = false;
        this.loading = false;
        return;
      }

      this.func
        .getDetail({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          whseRetyarninFk: this.detail.whseRetyarninoid,
          whseRetreatFk: this.detail.whseRetreatoid,
          whseTransferFk: this.detail.whseTransferoid,
        })
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.mx = records.records;
          this.oldData = {};
          this.chooseData = {};

          if (this.mx.length === 0) {
            if (this.hide === "3" || this.hide === "4" || this.hide === "5") {
              this.$set(this.mxOp.column[2], "hide", true);
            }
            this.loading = false;
            return;
          }
          this.$refs.dlgcrud.setCurrentRow(this.mx[0]);
          this.mx.forEach((item, index) => {
            item.index = index + 1;
            if (this.hide === "3" || this.hide === "4" || this.hide === "5") {
              item.batchNo = item.whseYarninDtlFk;
              item.yarnsId = item.whseYarninDtlFk;
              item.weight = item.whseYarninDtlFk;
            }
            if (index === this.mx.length - 1) {
              this.mxOp.showSummary = true;
              this.$nextTick(() => {
                if (
                  this.hide === "3" ||
                  this.hide === "4" ||
                  this.hide === "5"
                ) {
                  this.mx.forEach((items, indexs) => {
                    this.$set(items, "whseYarninFk", items.$whseYarninDtlFk);
                    this.$set(items, "yarnsName", items.$yarnsId);
                    //  items.whseYarninFk = items.$whseYarninDtlFk;
                    //   items.yarnsName = items.$yarnsId;
                    if (indexs === this.mx.length - 1) {
                      // this.mxOp.column[2].hide = true;
                      this.$set(this.mxOp.column[2], "hide", true);
                      setTimeout(() => {
                        this.mxOp.showSummary = true;
                        this.loading = false;
                      }, 200);
                    }
                  });
                } else {
                  setTimeout(() => {
                    this.mxOp.showSummary = true;
                    this.loading = false;
                  }, 200);
                }
              });
            }
          });
        });
    },
    add() {
      if (this.hide === "1") {
        this.choiceV = !this.choiceV;
        this.choiceQ.retBatch = this.form.batchNumber;
        // this.choiceTarget = this.chooseData;
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("choicDlg.xzbcsxpl");
      } else if (this.hide === "2") {
        this.choiceV = !this.choiceV;
        this.choiceQ.retBatch = this.form.batchNumber;
        // this.choiceTarget = this.chooseData;
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("choicDlg.sxwc");
      } else if (this.hide === "4" || this.hide === "3" || this.hide === "5") {
        this.choiceV = !this.choiceV;
        // this.choiceQ.retBatch = this.form.batchNumber;
        // this.choiceTarget = this.chooseData;
        this.dlgWidth = "100%";
        this.choiceTle = this.$t("choicDlg.xzsxrc");
      }
      // if (Object.keys(this.detail).length === 0) {
      //   this.$tip.error("请先选择出库明细");
      //   return;
      // } else if (
      //   !this.detail.whseRetyarninoid &&
      //   !this.detail.whseTransferoid &&
      //   !this.detail.whseRetreatoid
      // ) {
      //   this.$tip.error("请先保存出库资料");
      //   return;
      // }
      // // if (Object.keys(this.oldData).length > 0) {
      // //   this.oldData.$cellEdit = false;
      // // }
      // this.mxOp.column[2].hide = true;
      // this.mxOp.column[3].hide = true;
      // this.mxOp.column[4].hide = true;
      // this.mxOp.column[5].hide = true;
      // this.mxOp.column[6].hide = this.hide != "4";
      // this.mxOp.selection = true;
      // this.mxOp.showSummary = false;
      // this.mxOp.height = "calc(100vh - 213px)";
      // this.sxV = true;
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
        !this.chooseData.whseRetyarninDtloid &&
        !this.chooseData.whseRetreatDtloid &&
        !this.chooseData.whseTransferDtloid
      ) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.mx.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除批号为 【 " +
            (this.hide === "3" || this.hide === "4" || this.hide === "5"
              ? this.chooseData.$batchNo
              : this.chooseData.batchNo) +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.func
            .delDetail(
              this.hide === "3" || this.hide === "4"
                ? this.chooseData.whseRetreatDtloid
                : this.hide === "5"
                ? this.chooseData.whseTransferDtloid
                : this.chooseData.whseRetyarninDtloid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
                this.mx.forEach((item, i) => {
                  item.index = i + 1;
                });
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
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    close() {
      this.$emit("close", this.saved);
    },
    getSxData() {
      this.sxloading = true;
      let type = "";
      if (this.hide === "1") {
        this.func.getPlan = getSxPlan;
        this.dlgTle = "選擇紗線配料";
      } else if (this.hide === "2") {
        this.func.getPlan = getSxOutPlan;
        this.dlgTle = "選擇紗線配料";
      } else {
        this.sxcrud = [];
        if (this.hide === "4") {
          this.dlgTle = "選擇采购入库";
          type = "2";
        } else if (this.hide === "3") {
          this.dlgTle = "選擇客人来纱";
          type = "1";
        } else {
          this.dlgTle = "選擇入仓信息";
          getSxDetali(
            Object.assign({
              rows: this.sxpage.pageSize,
              start: this.sxpage.currentPage,
            })
          ).then((res) => {
            let records = res.data;
            this.sxpage.total = records.total;
            this.sxcrud = records.records;
            this.sxcrud.forEach((items, index) => {
              items.index = index + 1;
              items.yarnsName = items.yarnsId;
              if (index === this.sxcrud.length - 1) {
                this.sxloading = false;
                return;
              }
            });
          });
          return;
        }
        getSx({
          rows: 10,
          start: 1,
          yinType: type, // 采购
        }).then((Res) => {
          for (let i = 0; i < Res.data.records.length; i++) {
            getSxDetali(
              Object.assign({
                rows: this.sxpage.pageSize,
                start: this.sxpage.currentPage,
                whseYarninFk: Res.data.records[i].whseYarninoid,
              })
            ).then((res) => {
              let records = res.data;
              this.sxpage.total = records.total;
              for (let k = 0; k < records.records.length; k++) {
                records.records[k].yinId = Res.data.records[i].yinId;
                if (k === records.records.length - 1) {
                  this.sxcrud = this.sxcrud.concat(records.records);
                  this.sxcrud.forEach((items, index) => {
                    items.index = index + 1;
                    items.yarnsName = items.yarnsId;
                    // if (index === this.sxcrud.length - 1) {
                    //   this.sxloading = false;
                    //   return;
                    // }
                  });
                  if (i === Res.data.records.length - 1) {
                    // if (this.sxcrud.length === 0) {
                    this.sxloading = false;
                    //   return;
                    // }
                  }
                }
              }
            });
          }
        });

        return;
      }
      this.func
        .getPlan(
          Object.assign(this.form, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
            retBatch: this.detail.batchNumber,
          })
        )
        .then((Res) => {
          if (Res.data.records.length === 1) {
            this.planData = Res.data.records[0];
          }
          for (var key in this.sxform) {
            if (this.sxform[key] === "") {
              delete this.sxform[key];
            }
          }
          getSxDetali(
            Object.assign(this.sxform, {
              rows: this.sxpage.pageSize,
              start: this.sxpage.currentPage,
              yarnsId: this.planData.yarnsId,
            })
          ).then((res) => {
            let records = res.data;
            this.sxpage.total = records.total;
            this.sxcrud = records.records;
            if (this.sxcrud.length === 0) {
              this.sxloading = false;
            }
            this.sxcrud.forEach((item, index) => {
              item.index = index + 1;
              item.yarnsName = item.yarnsId;
              // setTimeout(() => {
              //   if (item.$yarnsName === item.yarnsName) {
              //     this.$set(item, "yarnsName", "");
              //   }
              // }, 200);
              if (index === this.sxcrud.length - 1) {
                this.sxloading = false;
              }
            });
          });
        });
    },
    sxselectionChange(val) {
      // 选中纱线
      this.sxcheckList = val;
      this.changeList = this.sxcheckList;
    },
    check() {
      // 选择纱线
      if (this.hide != "3" && this.hide != "4" && this.hide != "5") {
        this.mx = this.unique(this.mx.concat(this.sxcheckList), "batchNo");
        this.mx.forEach((item, index) => {
          // item.index = index + 1;
          item.equId = this.planData.equId;
          item.equName = this.planData.equName;
          item.refCode = this.planData.refCode;
          item.refName = this.planData.refName;
        });
      } else {
        this.sxcheckList.forEach((item, i) => {
          item.retWeight = item.weight;
          item.retCompany = item.weightUnit;
          item.traWeight = item.weight;
          item.traCompany = item.weightUnit;
          item.whseYarninDtlFk = item.whseYarninDtloid;
          item.index = this.mx.length + 1;
        });
        this.mx = this.unique(
          this.mx.concat(this.sxcheckList),
          "whseYarninDtlFk"
        );
      }

      this.sxclose();
    },
    save() {
      this.outloading = true;
      if ((this.hide === "1" || this.hide === "2") && !this.form.batchNumber) {
        this.$tip.error("出库资料中配料单号不能为空!");
        return;
      }
      if (this.hide === "5" && (!this.form.traOut || !this.form.traIn)) {
        this.$tip.error("出库资料中調出入倉不能为空!");
        return;
      }
      for (let i = 0; i < this.mx.length; i++) {
        if (this.hide === "3" || this.hide === "4") {
          if (!this.mx[i].retWeight || !this.mx[i].retCompany) {
            this.$tip.error("出库明细的退回重量/单位不能为空!");
            return;
          }
        } else if (this.hide === "5") {
          if (!this.mx[i].traWeight || !this.mx[i].traCompany) {
            this.$tip.error("出库明细的調倉重量/单位不能为空!");
            return;
          }
        } else {
          if (!this.mx[i].weight || !this.mx[i].weightUnit) {
            this.$tip.error("出库明细的重量/单位不能为空!");
            return;
          }
        }
      }
      this.form.list = null;
      this.form.retDate += " 00:00:00";
      if (
        this.form.whseRetyarninoid ||
        this.form.whseRetreatoid ||
        this.form.whseTransferoid
      ) {
        this.everyThing.updateF(this.form).then((res) => {
          if (this.mx.length === 0) {
            this.$tip.success("保存成功");
            this.canSave = false;
            this.$emit("save2reset");
            this.outloading = false;
          }
          this.mx.forEach((item, index) => {
            item.yarnsName = item.$yarnsName;
            if (
              item.whseRetyarninDtloid ||
              item.whseRetreatDtloid ||
              item.whseTransferDtloid
            ) {
              this.func.updateDetail(item).then((res) => {});
            } else {
              item.whseRetyarninFk = this.form.whseRetyarninoid;
              item.whseRetreatFk = this.form.whseRetreatoid;
              item.whseTransferFk = this.form.whseTransferoid;
              item.whseYarninDtlFk = item.whseYarninDtloid;
              this.func.addDetail(item).then((res) => {
                item.whseRetyarninDtloid = res.data.data;
                item.whseRetreatDtloid = res.data.data;
                item.whseTransferDtloid = res.data.data;
              });
            }
            if (index === this.mx.length - 1) {
              this.$tip.success("保存成功");
              // this.canSave = false;
              this.$emit("save2reset");
              this.outloading = false;
            }
          });
        });
      } else {
        this.everyThing.addF(this.form).then((res) => {
          this.form.whseRetyarninoid = res.data.data;
          this.form.whseRetreatoid = res.data.data;
          this.form.whseTransferoid = res.data.data;
          // baseCodeSupply({ code: "whse_out" }).then((res) => {});
          if (this.mx.length === 0) {
            this.$tip.success("保存成功");
            this.canSave = false;
            this.$emit("save2reset");
            this.outloading = false;
          }
          this.mx.forEach((item, index) => {
            item.yarnsName = item.$yarnsName;
            if (
              item.whseRetyarninDtloid ||
              item.whseRetreatDtloid ||
              item.whseTransferDtloid
            ) {
              this.func.updateDetail(item).then((res) => {});
            } else {
              item.whseRetyarninFk = this.form.whseRetyarninoid;
              item.whseRetreatFk = this.form.whseRetreatoid;
              item.whseTransferFk = this.form.whseTransferoid;
              item.whseYarninDtlFk = item.whseYarninDtloid;
              this.func.addDetail(item).then((res) => {
                item.whseRetyarninDtloid = res.data.data;
                item.whseRetreatDtloid = res.data.data;
                item.whseTransferDtloid = res.data.data;
              });
            }
            if (index === this.mx.length - 1) {
              this.$tip.success("保存成功");
              // this.canSave = false;
              this.$emit("save2reset");
              this.outloading = false;
            }
          });
        });
      }
    },
    sxclose() {
      this.mxOp.column[2].hide = this.hide === "1" ? false : true;
      this.mxOp.column[3].hide = this.hide === "1" ? false : true;
      this.mxOp.column[4].hide = this.hide === "2" ? false : true;
      this.mxOp.column[5].hide = this.hide === "2" ? false : true;
      this.mxOp.column[6].hide = true;
      this.mxOp.selection = false;
      this.mxOp.showSummary = true;
      this.mxOp.height = "calc(100vh - 300px)";
      this.sxcheckList = [];
      this.sxV = false;
    },
    unique(arr, val) {
      const res = new Map();
      return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      // // this.choiceTarget[this.choiceField] = val[this.choiceField];
      // this.oldData.$cellEdit = true;
      if (this.choiceTle === this.$t("choicDlg.xzbcsxpl")) {
        this.mx = this.$unique(this.mx.concat(val), "batchNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          item.$cellEdit = true;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === this.$t("choicDlg.sxwc")) {
        this.mx = this.$unique(this.mx.concat(val), "batchNo");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          item.$cellEdit = true;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      if (this.choiceTle === this.$t("choicDlg.xzsxrc")) {
        val.forEach((item, i) => {
          item.yarnsName = item.yarnsId;
        });
        this.mx = this.$unique(this.mx.concat(val), "$whseYarninFk");
        this.page.total = this.mx.length;
        this.mx.forEach((item, i) => {
          item.index = i + 1;
          // item.yarnsName = item.yarnsId;
          item.retCompany = item.weightUnit;
          item.retWeight = item.weight;
          // item.$cellEdit = true;
          if (i === this.mx.length - 1) {
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
          }
        });
      }
      for (var key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
  },
  updated() {
    setTimeout(() => {
      this.$nextTick(() => {
        this.$refs["dlgcrud"].doLayout();
      });
    }, 200);
  },
  created() {},
  mounted() {
    this.form = this.detail;
    this.form.sysCreatedby = this.$store.state.userOid;
    // this.getDetail();
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