<template>
  <div id="colorMng_Tem">
    <view-container
      title="出库送货单管理"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
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
      <view-container title="成品布明细">
        <div class="btnList">
          <el-button type="primary" @click="add">{{
            this.$t("public.add")
          }}</el-button>
          <el-button type="danger" @click="del">{{
            this.$t("public.del")
          }}</el-button>
        </div>
        <div class="crudBox" style="margin-top: 5px">
          <avue-crud
            ref="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
            @on-load="getShipdetail"
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
import { mainCrud, noteCrud } from "./data";
import {
  getCodeSupply,
  add,
  update,
  get,
  getNote,
  delNote,
  updateNote,
  addNote,
} from "./api";
import choice from "@/components/proMng/index";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
// import XLSX from "xlsx";
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
      loading: false,
      formOp: mainCrud(this),
      form: {},
      crudOp: noteCrud(this),
      crud: [],
      page: {
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      choiceV: false,
      choiceTle: "选择成品布",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {
        cardType: 1,
        r_clothState_r: "||1||2||3",
        productNo: "^^%",
      },
      chooseData: {},
      oldData: {},
      lightDic: [],
      dlgWidth: "60%",
      codeSupplyNum: 0,
      refresh: false,
      code: getDIC("bas_companyCode"),
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      if (this.isAdd) {
        baseCodeSupplyEx({ code: "dye_deliveryNote" }).then((res) => {
          this.form = {
            outDate: this.$getNowTime("datetime"),
            outCode: res.data.data,
            applicant: this.$store.state.userOid,
          };
          this.wLoading = false;
        });
      } else {
        get({
          rows: 1,
          start: 1,
          orderId: this.detail.orderId,
        }).then((res) => {
          this.form = res.data.records[0] || this.detail;
          this.getShipdetail();
        });
      }
    },
    getShipdetail() {
      if (!this.form.orderId) {
        this.wLoading = false;
        return;
      }
      getNote({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        outOrderFk: this.form.orderId,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.crud = records.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length) this.$refs.crud.setCurrentRow(this.crud[0]);
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      });
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          const func = (item, index) => {
            if (!item.vatNo || !item.productNo) {
              return false;
            }
            return true;
          };
          if (!this.crud.every(func)) {
            this.$tip.warning("缸号/成品布编号不能为空!");
            done();
            return;
          }
          this.wLoading = true;
          try {
            if (this.form.orderId) {
              update(this.form)
                .then((res) => {
                  this.refresh = true;
                  this.saveNote();
                })
                .catch((err) => {
                  this.$tip.error("保存失败!" + err);
                });
            } else {
              add(this.form)
                .then((res) => {
                  baseCodeSupply({ code: "dye_deliveryNote" }).then(
                    (res) => {}
                  );
                  this.form.orderId = res.data.data;
                  this.refresh = true;
                  this.saveNote();
                })
                .catch((err) => {
                  this.$tip.error("保存失败!" + err);
                });
            }
            done();
          } catch (error) {
            this.wLoading = false;
          }
        } else {
          this.wLoading = false;
          done();
          this.$tip.error("请补充送货单信息!");
        }
      });
    },
    saveNote() {
      if (this.crud.length) {
        this.crud.forEach((item, i) => {
          if (item.dtlId) {
            updateNote(item).then((res) => {});
          } else {
            item.outOrderFk = this.form.orderId;
            addNote(item).then((res) => {
              item.orderId = res.data.data;
            });
          }
          if (i == this.crud.length - 1) {
            setTimeout(() => {
              this.wLoading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
        });
      } else {
        this.wLoading = false;
        this.$tip.success(this.$t("public.bccg"));
      }
    },
    add() {
      this.choiceV = true;
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.dtlId) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除成品编号为 【 " +
            this.chooseData.productNo +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          delNote(this.chooseData.dtlId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.chooseData.index - 1, 1);
                this.crud.forEach((item, i) => {
                  item.index = i + 1;
                });
                if (this.crud.length) {
                  this.$refs.crud.setCurrentRow(this.crud[0]);
                }
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
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    choiceData(val) {
      this.wLoading = true;
      if (val.length === 0) {
        this.choiceV = false;
        return;
      }
      this.crud = this.crud.concat(val);
      this.crud = this.$unique(this.crud, "productNo");
      this.crud.forEach((item, i) => {
        item.index = i + 1;
      });
      this.choiceV = false;
      setTimeout(() => {
        this.wLoading = false;
      }, 200);
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
#colorMng_Tem
  .formBox
    // height calc(100vh - 125px) !important
#colorMng_Dlg
  .el-dialog__header
    padding 0 !important
  .el-dialog__headerbtn
    top 3px
    font-size 18px
    font-weight bold
    z-index 9
  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close
    color #000
    font-size 24px
  .el-tag--mini
    height 24px
    padding 0 5px
    line-height 24px
    font-size 14px
  .el-select .el-tag__close.el-icon-close
    right -5px
    height 18px
    width 18px
    line-height 18px
  .avue-form .el-input--mini input
    height 35px !important
    line-height 35px
</style>