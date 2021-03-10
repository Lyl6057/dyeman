<template>
  <div id="rcDetail">
    <!-- <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div> -->
    <el-row class="">
      <div class="btnList" style="margin-bottom: 2px">
        <!-- <el-button type="primary" @click="getDetail">查询</el-button> -->
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="danger" @click="del">删除</el-button>
        <el-button type="success" @click="save">保存</el-button>
        <!-- <el-button type="warning" @click="getDetail">取消</el-button>
        <el-button type="warning" @click="close">关闭</el-button> -->
      </div>
      <avue-crud
        ref="dlgcrud"
        :option="mxOp"
        v-loading="loading"
        :data="mx"
        :page.sync="page"
        @current-row-change="cellClick"
      ></avue-crud>
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
          <el-button type="success" @click="check">選擇</el-button>
          <el-button type="primary" @click="getSxData">查询</el-button>
          <el-button type="warning" @click="sxclose">关闭</el-button>
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
            @on-load="getSxData"
            @selection-change="sxselectionChange"
          ></avue-crud>
        </div>
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F, sxForm, rsxkr3C } from "./data";
import { getSx, getSxDetali } from "@/api/im/Wk/rc";
import {
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
  },
  name: "",
  components: {},
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      detail: {},
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
      sxformOp: sxForm(),
      sxform: {},
      outform: {},
      outformOp: rsxkr2F(),
      outcrudOp: rsxkr2C(this),
      outcrud: [],
      sxcrud: [],
      sxpage: {},
      sxloading: false,
      sxcheckList: [],
      planData: {},
      func: {},
      dlgTle: "選擇紗線配料",
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.loading = true;
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
          console.log(this.mx);
          this.oldData = {};
          this.chooseData = {};
          this.$refs.dlgcrud.setCurrentRow();
          if (this.mx.length === 0) {
            this.loading = false;
          }
          this.mx.forEach((item, index) => {
            item.index = index + 1;
            if (this.hide === "3" || this.hide === "4" || this.hide === "5") {
              item.batchNo = item.whseYarninDtlFk;
              item.yarnsId = item.whseYarninDtlFk;
            }
            if (index === this.mx.length - 1) {
              this.mxOp.showSummary = true;
              this.loading = false;
            }
          });
        });
    },
    add() {
      if (Object.keys(this.detail).length === 0) {
        this.$tip.error("请先选择出库明细");
        return;
      } else if (
        !this.detail.whseRetyarninoid &&
        !this.detail.whseTransferoid &&
        !this.detail.whseRetreatoid
      ) {
        this.$tip.error("请先保存出库资料");
        return;
      }
      // if (Object.keys(this.oldData).length > 0) {
      //   this.oldData.$cellEdit = false;
      // }
      this.outcrudOp.column[2].hide = true;
      this.outcrudOp.column[3].hide = true;
      this.outcrudOp.column[4].hide = true;
      this.outcrudOp.column[5].hide = true;
      this.outcrudOp.column[6].hide = this.hide != "4";
      this.outcrudOp.selection = true;
      this.outcrudOp.showSummary = false;
      this.outcrudOp.height = "calc(100vh - 213px)";
      this.sxV = true;
    },
    del() {
      if (
        this.chooseData == null ||
        Object.keys(this.chooseData).length === 0
      ) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (
        !this.chooseData.whseRetyarninDtloid &&
        !this.chooseData.whseRetreatDtloid &&
        !this.chooseData.whseTransferDtloid
      ) {
        this.mx.splice(this.chooseData.index - 1, 1);
        this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
        return;
      }
      this.$tip
        .cofirm("是否确定删除", this, {})
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
                this.$tip.success("删除成功");
                this.mx.splice(this.chooseData.index - 1, 1);
                this.getDetail();
              } else {
                this.$tip.error("删除失败");
              }
            })
            .catch((err) => {
              this.$tip.error("删除失败!");
            });
        })
        .catch((err) => {
          this.$tip.warning("取消操作");
        });
    },
    cellClick(val) {
      this.oldData = val;
      this.chooseData = val;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[3].click();
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
      this.loading = true;
      let data = this.mx.concat(this.sxcheckList);
      if (data.length === 0) {
        this.loading = false;
      }
      data.forEach((item, index) => {
        if (
          !item.whseRetyarninDtloid &&
          !item.whseRetreatDtloid &&
          !item.whseTransferDtloid
        ) {
          item.whseRetyarninFk = this.detail.whseRetyarninoid;
          item.whseRetreatFk = this.detail.whseRetreatoid;
          item.whseTransferFk = this.detail.whseTransferoid;
          this.func.addDetail(item).then((res) => {});
        }
        if (index === data.length - 1) {
          this.getDetail();
          this.$tip.success("保存成功!");
        }
      });
      this.changeList = [];
    },
    sxclose() {
      this.outcrudOp.column[2].hide = this.hide === "1" ? false : true;
      this.outcrudOp.column[3].hide = this.hide === "1" ? false : true;
      this.outcrudOp.column[4].hide = this.hide === "2" ? false : true;
      this.outcrudOp.column[5].hide = this.hide === "2" ? false : true;
      this.outcrudOp.column[6].hide = true;
      this.outcrudOp.selection = false;
      this.outcrudOp.showSummary = true;
      this.outcrudOp.height = "calc(100vh - 300px)";
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
    this.form = this.detail;
    if (this.hide === "3" || this.hide === "4" || this.hide === "5") {
      this.mxOp = rsxkr3C(this);
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