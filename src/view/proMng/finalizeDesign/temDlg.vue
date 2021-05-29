<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-28 16:41:49
 * @Description: 
-->
<template>
  <div id="ldOrderDlg">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '定型指令单'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          $t("public.save")
        }}</el-button>
        <el-button type="primary" @click="checkOrder">选择织造通知号</el-button>
        <el-button
          type="primary"
          @click="checkProcess"
          :disabled="!this.form.finishJobId"
          >生产工艺</el-button
        >
        <el-button
          type="primary"
          @click="checkFormula"
          :disabled="!this.form.finishJobId"
          >后整配方</el-button
        >
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
    </view-container>
    <el-dialog
      :visible.sync="visible"
      fullscreen
      append-to-body
      id="viewDlg"
      :element-loading-text="$t('public.loading')"
      v-loading="dlgLoading"
      v-if="visible"
    >
      <el-row>
        <el-col :span="24">
          <view-container :title="tabs">
            <div class="btnList">
              <el-button @click="saveOther" type="success">{{
                $t("public.save")
              }}</el-button>
              <el-button @click="add" type="primary">{{
                $t("public.add")
              }}</el-button>
              <el-button
                @click="del"
                type="danger"
                :disabled="Object.keys(chooseData).length == 0"
                >{{ $t("public.del") }}</el-button
              >
              <el-button @click="visible = false" type="warning">{{
                $t("public.close")
              }}</el-button>
            </div>
            <div class="crudBox">
              <avue-crud
                ref="crud"
                :option="crudOp"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
                @on-load="query"
                @row-dblclick="handleRowDBLClick"
                @current-row-change="cellClick"
              ></avue-crud>
            </div> </view-container
        ></el-col>
      </el-row>
    </el-dialog>
    <choice
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
import choice from "@/components/proMng/index";
import { mainCrud, dlgForm, dlgCrud, pfCrud, gyCrud } from "./data";
import {
  add,
  update,
  getPo,
  getPoDtla,
  getProcess,
  addProcess,
  updateProcess,
  delProcess,
  getFormula,
  addFormula,
  delFormula,
  updateFormula,
} from "./api";

export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  components: {
    choice: choice,
  },
  data() {
    return {
      wLoading: false,
      formOp: mainCrud(this),
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      dlgWidth: "60%",
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
      visible: false,
      loading: false,
      crudOp: dlgCrud(this),
      crud: [],
      dlgFormOp: dlgForm(this),
      dlgForm: {},
      chooseData: {},
      tabs: "選擇訂單",
      func: {},
      dlgLoading: false,
      dlgChoose: {},
      choiceV: false,
      choiceTle: "选择织造通知单",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      code: "",
      pfCrud: pfCrud(this),
      group: [],
      chooseDtlData: {},
    };
  },
  watch: {},
  methods: {
    getData() {
      if (this.isAdd) {
        setTimeout(() => {
          this.form.startJobDate = this.$getNowTime("date");
          // this.form.sendingSampleQuantity = undefined;
          // this.form.sampleQuantity = undefined;
          // this.form.sampleSize = undefined;
        }, 100);
      } else {
        this.wLoading = true;
        this.form = this.detail;
        for (let key in this.form) {
          if (
            key === "proShrinkHangDry" ||
            key === "proShrinkSafeDry" ||
            key === "proShrinkThrowDry" ||
            key === "mustPreshrunk"
          ) {
            continue;
          }
          if (this.form[key] == "undefined" || !this.form[key]) {
            delete this.form[key];
          }
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      }
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.wLoading = true;
            for (let key in this.form) {
              if (
                key === "proShrinkHangDry" ||
                key === "proShrinkSafeDry" ||
                key === "proShrinkThrowDry" ||
                key === "mustPreshrunk"
              ) {
                continue;
              }
              if (this.form[key] == "undefined" || !this.form[key]) {
                delete this.form[key];
              }
            }
            this.form.startJobDate = this.form.startJobDate + " 00:00:00";
            this.form.goodsDate
              ? (this.form.goodsDate = this.form.goodsDate + " 00:00:00")
              : "";
            this.form.printDate
              ? (this.form.printDate = this.form.printDate + " 00:00:00")
              : "";
            this.form.custName = this.form.$custCode;
            if (this.form.finishJobId) {
              // update
              this.form.upateTime = this.$getNowTime("datetime");
              update(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }
                setTimeout(() => {
                  this.wLoading = false;
                  this.$emit("refresh");
                  done();
                }, 200);
              });
            } else {
              // add
              this.form.createTime = this.$getNowTime("datetime");
              add(this.form).then((res) => {
                if (res.data.code == 200) {
                  this.form.finishJobId = res.data.data;
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }
                setTimeout(() => {
                  this.wLoading = false;
                  this.$emit("refresh");
                  done();
                }, 200);
              });
            }
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(this.$t("public.bcsb"));
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.error("请补充通知單信息!");
          return;
        }
      });
    },
    query() {
      if (this.tabs == "選擇訂單") {
        this.func.get = getPo;
      } else if (!this.form.finishJobId) {
        this.crud = [];
        return;
      } else if (this.tabs == "生产工艺") {
        this.func.get = getProcess;
        this.func.del = delProcess;
        this.func.add = addProcess;
        this.func.update = updateProcess;
        this.dlgForm.proFinishJobFk = this.form.finishJobId;
      } else if (this.tabs == "后整配方") {
        this.func.get = getFormula;
        this.func.del = delFormula;
        this.func.add = addFormula;
        this.func.update = updateFormula;
        this.dlgForm.proFinishJobFk = this.form.finishJobId;
      }
      this.loading = true;
      this.chooseData = {};

      for (let key in this.dlgForm) {
        if (this.dlgForm[key] === "") {
          delete this.dlgForm[key];
        }
      }
      this.func
        .get(
          Object.assign(this.dlgForm, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        )
        .then((res) => {
          this.crud = res.data.records;
          this.crud.forEach((item, i) => {
            item.$cellEdit = true;
            item.index = i + 1;
          });
          this.page.total = res.data.total;
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          this.loading = false;
        });
    },
    saveOther() {
      if (this.crud.length == 0) {
        return;
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (this.tabs == "生产工艺" && !this.crud[i].itemName) {
          this.$tip.error("生产工艺项目不能為空!");
          return;
        }
        if (
          this.tabs == "后整配方" &&
          !this.crud[i].materialCode &&
          !this.crud[i].useAmount
        ) {
          this.$tip.error("后整配方中的物料编号/数量不能为空!");
          return;
        }
      }
      this.dlgLoading = true;
      let addDtla = (item, i) => {
        return new Promise((resolve, reject) => {
          let data = JSON.parse(JSON.stringify(item));
          data.list = [];
          data.alloc = [];
          data.loc = [];
          if (item.jobItmeId || item.formulaId) {
            this.func.update(data).then((res) => {
              resolve();
            });
            // 修改
          } else {
            // 新增
            data.proFinishJobFk = this.form.finishJobId;
            this.func.add(data).then((res) => {
              item.jobItmeId = res.data.data;
              item.formulaId = res.data.data;
              resolve();
            });
          }
        });
      };
      let promiseArr = this.crud.map((item, i) => {
        return addDtla(item, i);
      });
      Promise.all(promiseArr).then((res) => {
        for (let i = 0; i < this.crud.length; i++) {
          if (i === this.crud.length - 1) {
            // this.getDetail();
            setTimeout(() => {
              this.dlgLoading = false;
              this.query();
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
        }
      });
    },
    checkOrder() {
      this.choiceTle = "选择织造通知单";
      this.choiceV = true;
    },
    checkProcess() {
      this.tabs = "生产工艺";
      this.crudOp = gyCrud(this);
      this.visible = true;
    },
    checkFormula() {
      this.tabs = "后整配方";
      this.crudOp = pfCrud(this);
      this.visible = true;
    },
    add() {
      // if (this.tabs != "用紗分組") {
      this.crud.push({
        index: this.crud.length + 1,
        $cellEdit: true,
      });
      this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
    },
    addDtl() {
      this.chooseData.list.push({
        $cellEdit: true,
      });
      this.$refs.pfCrud.setCurrentRow(
        this.chooseData.list[this.chooseData.list.length - 1]
      );
    },
    del() {
      if (!this.chooseData.jobItmeId && !this.chooseData.formulaId) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          this.func
            .del(
              this.tabs == "生产工艺"
                ? this.chooseData.jobItmeId
                : this.chooseData.formulaId
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.query();
                this.$tip.success(this.$t("public.sccg"));
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
    delDtl() {
      if (!this.chooseDtlData.noticeColorId) {
        this.chooseData.list.splice(this.chooseDtlData.index - 1, 1);
        // this.chooseDtlData = {};
        this.chooseData.list.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.chooseData.list.length > 0) {
          this.$refs.pfCrud.setCurrentRow(this.chooseData.list[0]);
        }
        return;
      }
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          delColor(this.chooseDtlData.noticeColorId)
            .then((res) => {
              if (res.data.code === 200) {
                // this.query();
                this.chooseData.list.splice(this.chooseDtlData.index - 1, 1);
                // this.chooseDtlData = {};
                this.chooseData.list.forEach((item, i) => {
                  item.index = i + 1;
                });
                if (this.chooseData.list.length > 0) {
                  this.$refs.pfCrud.setCurrentRow(this.chooseData.list[0]);
                }
                this.$tip.success(this.$t("public.sccg"));
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
    handleRowDBLClick(val) {
      this.chooseData = val;
      this.check();
      // this.visible = false;
    },
    cellClick(val) {
      this.chooseData = val;
      if (!this.chooseData.list) {
        this.chooseData.list = [];
      }

      if (
        this.tabs == "生产工艺" &&
        this.chooseData.list.length == 0 &&
        this.chooseData.compId
      ) {
        this.getYarnList();
      }
    },
    cellDtlClick(val) {
      this.chooseDtlData = val;
    },
    getYarnList() {
      getColor({
        star: 1,
        rows: 999,
        proLdNoticeFabricFk: this.chooseData.compId,
      }).then((res) => {
        let data = res.data.records;
        data.forEach((item, i) => {
          item.$cellEdit = true;
          item.index = i + 1;
          this.chooseData.list.push(Object.assign(item));
        });
        this.chooseData.list = res.data.records;
        if (this.chooseData.list.length > 0) {
          this.$refs.pfCrud.setCurrentRow(this.chooseData.list[0]);
        }
      });
    },
    check() {
      if (this.tabs === "選擇訂單") {
        this.wLoading = true;
        this.visible = false;
        this.form.orderNo = this.chooseData.poNo;
        this.form.po = this.chooseData.custPoNo;
        this.form.custCode = this.chooseData.custId;
        this.form.custName = this.chooseData.custId;
        this.form.issuedDate = this.chooseData.poDate;
        this.form.contractNo = this.chooseData.custContNo;
        getPoDtla({ salPoFk: this.chooseData.salPooid }).then((res) => {
          if (res.data.rows.length) {
            let poDtla = res.data.rows[0];
            this.form.fabricCode = poDtla.fabId;
            this.form.greigeFabricLocation = poDtla.fabName;
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.form.colorName = val.colorName;
      this.form.colorCode = val.colorCode;
      this.form.custCode = val.custCode;
      this.form.fabricName = val.fabricDesc;
      this.form.fabricCompone = val.fiberComp;
      this.form.weaveJobCode = val.weaveJobCode;
      this.form.tubeDiam = val.cylinderInch;
      this.form.needleDist = val.guage;
      this.form.yarnLength = val.yarnLength;
      this.form.yarnCard = val.yarnBrand;
      this.form.yarnNumber = val.yarnBatchNo;
      this.form.yarnCylinderNumber = val.yarnCylinder;
      this.form.breadth = Number(val.breadth.replace(/[^0-9]/gi, ""));
      this.form.gramWeight = val.gramWeight;
      this.form.proWeightAfter = val.gramWeight;
      this.form.proShrinkHorizontal = val.horizonShrink;
      this.form.proShrinkVertical = val.verticalShrink;
      this.choiceV = false;
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.el-tooltip__popper {
  font-size: 16px !important;
}

#ldOrderDlg {
  overflow: hidden;

  .avue-group__header {
    margin-bottom: 15px !important;
    // margin-top: -5px;
    height: 30px;
  }

  .formBox {
    height: calc(100vh - 75px) !important;
    overflow: auto;
  }

  .el-input-number__decrease, .el-input-number__increase {
    display: none;
  }

  .el-input-number .el-input__inner {
    text-align: left !important;
  }

  .el-input-number.is-controls-right .el-input__inner {
    padding-left: 5px !important;
  }
}

#colorMng_Dlg {
  .is-fullscreen {
    overflow: hidden !important;
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    top: 3px;
    font-size: 18px;
    font-weight: bold;
    z-index: 9;
  }

  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-tag--mini {
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    font-size: 14px;
  }

  .el-select .el-tag__close.el-icon-close {
    right: -5px;
    height: 18px;
    width: 18px;
    line-height: 18px;
  }

  .avue-form .el-input--mini input {
    height: 35px !important;
    line-height: 35px;
  }
}
</style>