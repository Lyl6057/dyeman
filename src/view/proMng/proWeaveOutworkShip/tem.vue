<template>
  <div id="colorMng_Tem">
    <view-container
      title="外发加工送货单管理"
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
      <view-container title="胚布明细">
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
import choice from "@/components/choice";
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
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      choiceV: false,
      choiceTle: this.$t("choicDlg.xzkh"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
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
        //  baseCodeSupplyEx({ code: "dye_batch" }).then((res) => {
        this.form = {
          deliDate: this.$getNowTime("datetime"),
          isAudit: false,
        };
        this.wLoading = false;
        // });
      } else {
        get({
          rows: 1,
          start: 1,
          shipId: this.detail.shipId,
        }).then((res) => {
          if (res.data.records.length) {
            this.form = res.data.records[0];
          } else {
            this.form = this.detail;
          }
          this.getShipdetail();
        });
      }
    },
    getShipdetail() {
      if (!this.form.shipId) {
        return;
      }
      getNote({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        outworkShipFk: this.form.shipId,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.crud = records.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      });
    },
    save() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          let weight = 0;
          // 检查布票信息
          for (let i = 0; i < this.crud.length; i++) {
            weight += this.crud[i].rw;
            if (!this.crud[i].noteCode) {
              this.$tip.warning("布票号不能为空!");
              done();
              return;
            } else if (!this.crud[i].rw) {
              this.$tip.warning("布票实收重量不能为空!");
              done();
              return;
            }
          }
          this.wLoading = true;
          try {
            this.form.deliQty = weight;
            if (this.form.shipId) {
              // update
              update(this.form)
                .then((res) => {
                  this.refresh = true;
                  this.saveNote();
                })
                .catch((err) => {
                  this.$tip.error("保存失败!" + err);
                });
            } else {
              // update
              add(this.form)
                .then((res) => {
                  this.form.shipId = res.data.data;
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
          this.$tip.error("请补充报告信息!");
        }
      });
    },
    saveNote() {
      if (this.crud.length) {
        this.crud.forEach((item, i) => {
          if (item.noteId) {
            updateNote(item).then((res) => {});
          } else {
            item.outworkShipFk = this.form.shipId;
            addNote(item).then((res) => {
              item.noteId = res.data.data;
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
      this.crud.push({
        index: this.crud.length + 1,
      });
      this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.noteId) {
        this.$tip.success(this.$t("public.sccg"));
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
          "是否确定删除布票号为 【 " +
            this.chooseData.noteCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          delNote(this.chooseData.noteId)
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
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      if (this.choiceTle === this.$t("choicDlg.xzkh")) {
        this.form.custCode = val.custCode;
        this.form.custName = val.custName;
      }
      if (this.choiceTle === this.$t("choicDlg.pbbm")) {
        this.form.fabCode = val.calicoId;
        this.form.fabricDesc = val.gustCalicoName;
      }
      if (this.choiceTle === this.$t("choicDlg.xzshxx")) {
        this.form.colorBh = val.colorNo;
        this.form.colorChn = val.colorName;
      }
      for (let key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
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