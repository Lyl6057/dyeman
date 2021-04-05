<template>
  <div id="outPlan">
    <div class="btnList">
      <!-- <el-button type="warning" @click="ruleV = true">編號規則配置</el-button> -->
      <el-button type="success" @click="outOrder">生成出庫單</el-button>
      <el-button type="primary" @click="getData">{{
        this.$t("public.query")
      }}</el-button>
      <el-button type="warning" @click="close">{{
        this.$t("public.close")
      }}</el-button>
    </div>
    <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div>
    <el-row class="crudBox" style="margin-top: -8px">
      <avue-crud
        ref="crud"
        id="crud"
        :option="crudOp"
        :data="crud"
        :page.sync="page"
        v-loading="loading"
        @on-load="getData"
        @current-row-change="cellClick"
      ></avue-crud>
    </el-row>
    <el-dialog
      id="sxPlanDlg"
      :visible.sync="planV"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      :before-close="planclose"
      v-if="planV"
    >
    </el-dialog>
  </div>
</template>
<script>
import {
  planCrud,
  PlanOutCrud,
  planForm,
  rsxkr2F,
  sxForm,
  rsxkr2C,
} from "./data";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import {
  getSxPlan,
  getSxOutPlan,
  getSxCcDetali,
  getSx,
  addSx,
  updateSx,
  addSxDetali,
  updateSxDetali,
} from "@/api/im/Wk/cc/sx";
import { getSxDetali } from "@/api/im/Wk/rc";
export default {
  name: "",
  components: {},
  props: {
    hide: String,
    tle: String,
  },
  data() {
    return {
      changeList: [],
      loading: false,
      sxloading: false,
      outloading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      outpage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      sxpage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      form: {},
      formOp: planForm(this),
      crudOp: planCrud(this),
      crud: [],
      outform: {},
      outformOp: rsxkr2F(this),
      outcrudOp: rsxkr2C(this),
      outcrud: [],
      sxform: {},
      sxformOp: sxForm(this),
      sxcrud: [{ index: 0 }],
      chooseData: {},
      planV: false,
      ruleV: false,
      sxV: false,
      sxcheck: {},
      sxcheckList: [],
      canSave: true,
      func: {},
    };
  },
  watch: {},
  methods: {
    getData() {
      if (this.hide === "1") {
        this.func.getPlan = getSxPlan;
        this.crudOp.column[2].label = "本厂配料计划编号";
        this.formOp.column[0].label = "本厂配料计划编号";
      } else {
        this.func.getPlan = getSxOutPlan;
        this.crudOp.column[2].label = "外厂配料计划编号";
        this.formOp.column[0].label = "外厂配料计划编号";
      }
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      this.func
        .getPlan(
          Object.assign(this.form, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;
          if (this.crud.length === 0) {
            this.loading = false;
          }
          if (Object.keys(this.chooseData).length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[this.chooseData.index - 1]);
          }
          this.crud.forEach((item, index) => {
            item.index = index + 1;
            if (index === this.crud.length - 1) {
              this.loading = false;
            }
          });
        });
    },
    getDetali() {
      // // 獲取領用單明細 == 領用出庫明細
      // this.outloading = true;
      // getSx({
      //   rows: this.outpage.pageSize,
      //   start: this.outpage.currentPage,
      //   batchNumber: this.chooseData.retBatch,
      // }).then((res) => {
      //   let data = res.data.records[0];
      //   if (data === undefined) {
      //     this.outpage.total = 0;
      //     this.outcrud = [];
      //     this.outloading = false;
      //     return;
      //   }
      //   getSxCcDetali(
      //     Object.assign({
      //       rows: this.outpage.pageSize,
      //       start: this.outpage.currentPage,
      //       whseRetyarninFk: data.whseRetyarninoid,
      //     })
      //   ).then((res) => {
      //     let records = res.data;
      //     this.outpage.total = records.total;
      //     this.outcrud = records.records;
      //     if (this.outcrud.length === 0) {
      //       this.outloading = false;
      //     }
      //     this.outcrud.forEach((item, index) => {
      //       item.index = index + 1;
      //       if (index === this.outcrud.length - 1) {
      //         this.outloading = false;
      //       }
      //     });
      //   });
      // });
    },
    getSxData() {
      this.sxloading = true;
      for (var key in this.sxform) {
        if (this.sxform[key] === "") {
          delete this.sxform[key];
        }
      }
      getSxDetali(
        Object.assign(this.sxform, {
          rows: this.sxpage.pageSize,
          start: this.sxpage.currentPage,
          yarnsId: this.outform.yarnsId,
          // yarnsName: this.outform.$yarnsName,
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
    },
    outOrder() {
      if (Object.keys(this.chooseData).length > 0) {
        // this.outform = this.chooseData;
        // this.outform.retType = this.hide;
        // this.outform.batchNumber = this.chooseData.retBatch;
        // this.outform.retDate = this.getNowTime();
        // baseCodeSupplyEx({ code: "whse_out" }).then((res) => {
        //   this.outform.retCode = res.data.data;
        // });
        // this.outcrudOp.height = "calc(100vh - 318px)";
        // this.outcrud.push(Object.assign(this.chooseData, { $cellEdit: true }));
        // this.outpage.total = this.outcrud.length;
        // // this.getDetali();
        // this.planV = true;
        this.$emit("add", this.chooseData);
      } else {
        this.$tip.error("請先選擇配料計劃資料!");
        return;
      }
    },
    sxselectionChange(val) {
      // 选中纱线
      this.sxcheckList = this.sxcheckList.concat(val);
    },
    check() {
      // 选择纱线
      let data = this.unique(this.sxcheckList, "whseYarninDtloid");
      this.outcrud = this.unique(this.outcrud.concat(data), "whseYarninDtloid");
      this.outcrud.forEach((item, index) => {
        item.index = index + 1;
        item.equId = this.outform.equId;
        item.equName = this.outform.equName;
        item.refCode = this.outform.refCode;
        item.refName = this.outform.refName;
      });
      this.sxclose();
    },
    planclose() {
      this.canSave = true;
      this.outcrud = [];
      this.planV = false;
    },
    sxclose() {
      this.outcrudOp.column[2].hide = this.hide === "1" ? false : true;
      this.outcrudOp.column[3].hide = this.hide === "1" ? false : true;
      this.outcrudOp.column[4].hide = this.hide === "2" ? false : true;
      this.outcrudOp.column[5].hide = this.hide === "2" ? false : true;
      this.outcrudOp.selection = false;
      this.outcrudOp.showSummary = true;
      this.outcrudOp.height = "calc(100vh - 329px)";
      this.sxV = false;
    },
    delDetail() {
      if (Object.keys(this.sxcheck).length > 0) {
        for (let i = 0; i < this.outcrud.length; i++) {
          if (this.outcrud[i].index === this.sxcheck.index) {
            this.outcrud.splice(i, 1);
            this.$refs.outcrud1.setCurrentRow(this.outcrud[0]);
            return;
          }
        }
      } else {
        this.$tip.error("請選擇明細資料!");
      }
    },
    add() {},
    // 單擊出庫單明細
    cellDetailClick(val) {
      this.sxcheck = val;
    },
    cellClick(val) {
      this.chooseData = val;
    },
    close() {
      this.$emit("close");
    },
    del() {},
    save() {
      this.outloading = true;
      if (this.outform.whseRetyarninoid) {
        updateSx(this.outform).then((res) => {
          if (this.outcrud.length === 0) {
            this.$tip.success("保存成功");
            this.canSave = false;
            this.$emit("save2reset");
            this.outloading = false;
          }
          this.outcrud.forEach((item, index) => {
            item.yarnsName = item.$yarnsName;
            if (item.whseRetyarninDtloid) {
              updateSxDetali(item).then((res) => {});
            } else {
              item.whseRetyarninFk = this.outform.whseRetyarninoid;
              addSxDetali(item).then((res) => {
                item.whseRetyarninDtloid = res.data.data;
              });
            }
            if (index === this.outcrud.length - 1) {
              this.$tip.success("保存成功");
              // this.canSave = false;
              this.$emit("save2reset");
              this.outloading = false;
            }
          });
        });
      } else {
        addSx(this.outform).then((res) => {
          this.outform.whseRetyarninoid = res.data.data;
          baseCodeSupplyEx({ code: "whse_out" }).then((res) => {});
          if (this.outcrud.length === 0) {
            this.$tip.success("保存成功");
            this.canSave = false;
            this.$emit("save2reset");
            this.outloading = false;
          }
          this.outcrud.forEach((item, index) => {
            item.yarnsName = item.$yarnsName;
            if (item.whseRetyarninDtloid) {
              updateSxDetali(item).then((res) => {});
            } else {
              item.whseRetyarninFk = this.outform.whseRetyarninoid;
              addSxDetali(item).then((res) => {
                item.whseRetyarninDtloid = res.data.data;
              });
            }
            if (index === this.outcrud.length - 1) {
              this.$tip.success("保存成功");
              // this.canSave = false;
              this.$emit("save2reset");
              this.outloading = false;
            }
          });
        });
      }
    },
    unique(arr, val) {
      const res = new Map();
      return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
    },
    getNowTime() {
      const time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mi = time.getMinutes();
      let s = time.getSeconds();
      m = m < 10 ? `0${m}` : m;
      d = d < 10 ? `0${d}` : d;
      h = h < 10 ? `0${h}` : h;
      mi = mi < 10 ? `0${mi}` : mi;
      s = s < 10 ? `0${s}` : s;
      return `${y}-${m}-${d} ${h}:${mi}:${s}`;
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      // // this.choiceTarget[this.choiceField] = val[this.choiceField];
      // this.oldData.$cellEdit = true;
      if (this.choiceTle === this.$t("choicDlg.xzbcsxpl")) {
        this.outcrud = this.$unique(this.outcrud.concat(val), "retBatch");
        this.page.total = this.outcrud.length;
        this.outcrud.forEach((item, i) => {
          item.index = i + 1;
          item.$cellEdit = true;
          if (i === this.outcrud.length - 1) {
            this.$refs.outcrud1.setCurrentRow(
              this.outcrud[this.outcrud.length - 1]
            );
          }
        });
      }
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
  },
  created() {},
  mounted() {
    this.outcrudOp = rsxkr2C(this);
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

#outPlan {
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
}
</style>