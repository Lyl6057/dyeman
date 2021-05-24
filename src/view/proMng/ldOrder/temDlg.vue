<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-21 08:56:44
 * @Description: 
-->
<template>
  <div id="ldOrderDlg">
    <view-container
      :title="(isAdd ? '新增' : '修改') + 'LD通知单'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          $t("public.save")
        }}</el-button>
        <el-button type="primary" @click="checkOrder">选择订单号</el-button>
        <el-button
          type="primary"
          @click="checkYarn"
          :disabled="!this.form.ldNoticeId"
          >LD通知单组成</el-button
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
        <el-col :span="tabs == 'LD通知单组成' ? 13 : 24">
          <view-container :title="tabs">
            <div class="btnList">
              <el-button
                @click="check"
                type="success"
                v-if="tabs == '選擇訂單'"
                >{{ $t("public.choose") }}</el-button
              >
              <el-button
                @click="saveOther"
                type="success"
                v-if="tabs != '選擇訂單'"
                >{{ $t("public.save") }}</el-button
              >
              <el-button
                @click="add"
                type="primary"
                v-if="tabs != '選擇訂單'"
                >{{ $t("public.add") }}</el-button
              >
              <el-button
                @click="del"
                type="danger"
                v-if="tabs != '選擇訂單'"
                :disabled="Object.keys(chooseData).length == 0"
                >{{ $t("public.del") }}</el-button
              >
              <el-button
                @click="query"
                type="primary"
                v-if="tabs == '選擇訂單'"
                >{{ $t("public.query") }}</el-button
              >
              <el-button @click="visible = false" type="warning">{{
                $t("public.close")
              }}</el-button>
            </div>
            <div class="formBox">
              <avue-form
                v-if="tabs == '選擇訂單'"
                ref="dlgform"
                :option="dlgFormOp"
                v-model="dlgForm"
              ></avue-form>
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
        <el-col :span="11" v-if="tabs == 'LD通知单组成'">
          <view-container title="通知单颜色">
            <div class="btnList">
              <el-button
                @click="addDtl"
                type="primary"
                :disabled="Object.keys(chooseData).length == 0"
                >{{ $t("public.add") }}</el-button
              >
              <el-button
                @click="delDtl"
                type="danger"
                :disabled="Object.keys(chooseDtlData).length == 0"
                >{{ $t("public.del") }}</el-button
              >
            </div>
            <div class="formBox"></div>
            <div class="crudBox">
              <avue-crud
                ref="colorCrud"
                :option="colorCrud"
                :data="chooseData.list"
                @on-load="query"
                @current-row-change="cellDtlClick"
              ></avue-crud>
            </div>
          </view-container>
        </el-col>
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
import choice from "@/components/choice";
import { mainCrud, dlgForm, dlgCrud, colorCrud, compCrud } from "./data";
import {
  add,
  update,
  getPo,
  getPoDtla,
  getComp,
  addComp,
  updateComp,
  delComp,
  getColor,
  addColor,
  delColor,
  updateColor,
} from "./api";
import preview from "./preview";

export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  components: {
    preView: preview,
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
      choiceTle: this.$t("choicDlg.xzsx"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      code: "",
      colorCrud: colorCrud(this),
      group: [],
      chooseDtlData: {},
    };
  },
  watch: {},
  methods: {
    getData() {
      if (this.isAdd) {
        setTimeout(() => {
          this.form.startDate = this.$getNowTime("date");
          this.form.sendingSampleQuantity = undefined;
          this.form.sampleQuantity = undefined;
          this.form.sampleSize = undefined;
        }, 100);
      } else {
        this.wLoading = true;
        this.form = this.detail;
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
              if (this.form[key] == "undefined") {
                this.form[key] = "";
              }
            }
            this.form.startDate = this.form.startDate + " 00:00:00";
            this.form.issuedDate = this.form.issuedDate + " 00:00:00";
            this.form.custDeliveDate
              ? (this.form.custDeliveDate =
                  this.form.custDeliveDate + " 00:00:00")
              : "";
            this.form.ldFinishDate
              ? (this.form.ldFinishDate = this.form.ldFinishDate + " 00:00:00")
              : "";
            this.form.custName = this.form.$custName;
            if (this.form.ldNoticeId) {
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
                  this.form.ldNoticeId = res.data.data;
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
      } else if (!this.form.ldNoticeId) {
        this.crud = [];
        return;
      } else if (this.tabs == "LD通知单组成") {
        this.func.get = getComp;
        this.func.del = delComp;
        this.func.add = addComp;
        this.func.update = updateComp;
        this.dlgForm.proLdNoticeFk = this.form.ldNoticeId;
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
          if (this.tabs == "選擇訂單") {
            this.crud = res.data.rows;
          } else {
            this.crud = res.data.records;
          }
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
        if (
          this.tabs == "LD通知单组成" &&
          !this.crud[i].compType &&
          !this.crud[i].fabricDisc
        ) {
          this.$tip.error(
            "类型(loại)/布料描述(Vải mô tả)不能為空(Không có sản phẩm nào)!"
          );
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
          if (item.compId) {
            this.func.update(data).then((res) => {
              resolve();
            });
            // 修改
          } else {
            // 新增
            data.proLdNoticeFk = this.form.ldNoticeId;
            this.func.add(data).then((res) => {
              item.compId = res.data.data;
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
          if (this.crud[i].list && this.crud[i].list.length > 0) {
            this.crud[i].list.forEach((item) => {
              item.proLdNoticeFabricFk = this.crud[i].compId;
              if (!item.noticeColorId) {
                addColor(item).then((res) => {
                  item.noticeColorId = res.data.data;
                });
              } else {
                updateColor(item).then((res) => {});
              }
            });
          }
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
      this.tabs = "選擇訂單";
      this.crudOp = dlgCrud(this);
      this.visible = true;
    },
    checkYarn() {
      this.tabs = "LD通知单组成";
      this.crudOp = compCrud(this);
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
      this.$refs.colorCrud.setCurrentRow(
        this.chooseData.list[this.chooseData.list.length - 1]
      );
    },
    del() {
      if (!this.chooseData.compId) {
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
            .del(this.chooseData.compId)
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
          this.$refs.colorCrud.setCurrentRow(this.chooseData.list[0]);
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
                  this.$refs.colorCrud.setCurrentRow(this.chooseData.list[0]);
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
        this.tabs == "LD通知单组成" &&
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
          this.$refs.colorCrud.setCurrentRow(this.chooseData.list[0]);
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
      if (val.length === 0) {
        this.choiceV = false;
        return;
      }
      val.forEach((item, i) => {
        this.chooseData.list.push({
          yarnCode: item.yarnsId,
          yarnName: item.yarnsName,
          yarnBatch: item.batchNo,
          yarnBrand: item.yarnsCard,
          unit: "KG",
          $cellEdit: true,
        });
      });
      // this.crud.forEach((item, i) => {
      //   item.index = i + 1;
      // });
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
#ldOrderDlg {
  overflow: hidden;

  // .el-form-item__label {
  // font-size: 14px !important;
  // }

  // .avue-form .el-input--mini input {
  // height: 40px !important;
  // line-height: 40px;
  // }

  // .el-form-item--mini .el-form-item__label {
  // line-height: 20px;
  // }
  .formBox {
    height: 100vh !important;
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