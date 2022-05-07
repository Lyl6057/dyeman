<template>
  <div id="rc">
    <el-tabs type="border-card" v-model="tabs">
      <el-tab-pane :label="data.type.split('_')[0] + '领用出仓'" name="tabs1">
        <div class="btnList">
          <el-button type="primary" @click="add" v-if="hide != '2'">{{
            this.$t("public.add")
          }}</el-button>
          <el-button
            type="success"
            :disabled="Object.keys(chooseData).length === 0"
            @click="handleRowDBLClick(chooseData)"
            >{{ this.$t("public.update") }}</el-button
          >
          <el-button
            type="danger"
            @click="del"
            :disabled="chooseData.stockState == '1'"
            >{{ this.$t("public.del") }}</el-button
          >
          <!-- <el-button
            type="warning"
            @click="ruleV = true"
            v-if="hide != '1' && hide != '2'"
            >編號規則配置</el-button
          > -->

          <el-button
            type="success"
            :disabled="Object.keys(chooseData).length === 0"
            @click="Audit(chooseData)"
            >{{ this.$t("public.audit") }}</el-button
          >
          <el-button
            type="primary"
            :disabled="Object.keys(chooseData).length === 0"
            @click="handleOpenRpt"
          >
            {{ this.$t("public.report") }}
          </el-button>
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
        <el-row class="crudBox">
          <el-col :span="24">
            <avue-crud
              ref="mainCrud"
              id="mainCrud"
              :option="crudOp"
              :data="crud"
              :page.sync="page"
              v-loading="loading"
              element-loading-text="正在拼命加载..."
              element-loading-spinner="el-icon-loading"
              @on-load="getData"
              @current-row-change="cellClick"
              @row-dblclick="handleRowDBLClick"
            ></avue-crud>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      id="wkRuleDlg"
      :visible.sync="ruleV"
      append-to-body
      :close-on-click-modal="false"
      v-if="ruleV"
    >
      <rule-dlg
        ref="rule"
        :rcType="'whse_Out_calico'"
        @close="ruleV = false"
      ></rule-dlg>
    </el-dialog>
    <el-dialog
      id="sxrcDlg"
      :visible.sync="temV"
      append-to-body
      fullscreen
      :close-on-click-modal="false"
      v-if="temV"
    >
      <temDlg
        ref="temDlg"
        :type="type"
        :attributeObj="attributeObj"
        :hide="hide"
        :detail="detail"
        :isAdd="isAdd"
        @close="temClose"
      ></temDlg>
    </el-dialog>
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      dlgWidth="60%"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import tem from "./tem";
import rule from "@/components/rule";
import choice from "@/components/choice";
import {
  getMaterial,
  addMaterial,
  updateMaterial,
  delMaterial,
} from "@/api/im/Wk/cc/pb";
import {
  getSx,
  addSx,
  updateSx,
  delSx,
  getSxCcDetali,
  addSxDetali,
  updateSxDetali,
  delSxDetali,
  getSxDtlb,
  addSxDtlb,
  updateSxDtlb,
  delSxDtlb,
} from "@/api/im/Wk/cc/sx";
import {
  getScfl,
  addScfl,
  updateScfl,
  delScfl,
  getScflDetali,
  addScflDetali,
  updateScflDetali,
  delScflDetali,
  getScflDtla,
  addScflDtla,
  updateScflDtla,
  delScflDtla,
} from "@/api/im/Wk/cc/scfl";
import {
  baseCodeSupply,
  baseCodeSupplyEx,
  getPurApplication,
  updatePurApp,
  fetchFineReportUrl,
} from "@/api/index";
import { rsxkr1F, rsxkr1C, rsxkr2C, rsxkr2F } from "./data";
import {
  getHgyl,
  addHgyl,
  delHgyl,
  updateHgyl,
  getHgylDtl,
  addHgylDtl,
  updateHgylDtl,
  delHgylDtl,
  getHgylDtla,
  addHgylDtla,
  updateHgylDtla,
  delHgylDtla,
} from "@/api/im/Wk/cc/hgyl";
import {
  getYl,
  addYl,
  delYl,
  updateYl,
  getYlDtl,
  addYlDtl,
  updateYlDtl,
  delYlDtl,
  getYlDtla,
  addYlDtla,
  updateYlDtla,
  delYlDtla,
} from "@/api/im/Wk/cc/yl";
import {
  getWj,
  addWj,
  delWj,
  updateWj,
  getWjDtl,
  addWjDtl,
  updateWjDtl,
  delWjDtl,
  getHardwareOutDtla,
  addHardwareOutDtla,
  updateHardwareOutDtla,
  delHardwareOutDtla,
} from "@/api/im/Wk/cc/wj";
import {
  getXz,
  addXz,
  delXz,
  updateXz,
  getXzDtl,
  addXzDtl,
  updateXzDtl,
  delXzDtl,
  getOfficeDtla,
  addOfficeDtla,
  updateOfficeDtla,
  delOfficeDtla,
} from "@/api/im/Wk/cc/xz";
import {
  getRl,
  addRl,
  delRl,
  updateRl,
  getRlDtl,
  addRlDtl,
  updateRlDtl,
  delRlDtl,
  getEnergDtla,
  addEnergDtla,
  updateEnergDtla,
  delEnergDtla,
} from "@/api/im/Wk/cc/rl";
import {
  fetchYarnValidOutWeight,
  fetchAccessoricesValidOutWeight,
  fetchChemicalValidOutWeight,
  fetchDyesalValidOutWeight,
  fetchHardwareValidOutWeight,
  fetchOfficeValidOutWeight,
  fetchEnergValidOutWeight,
} from "./api";
export default {
  name: "",
  components: {
    temDlg: tem,
    ruleDlg: rule,
    choice: choice,
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      data: JSON.parse(localStorage.getItem("imWk")),
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      hide: JSON.parse(localStorage.getItem("imWk")).type.split("_")[1],
      formOp: rsxkr1F(this),
      form: {},
      crudOp: rsxkr1C(this),
      crud: [],
      detail: {},
      attributeObj: {},
      oldData: {},
      chooseData: {},
      tabs: "tabs1",
      ruleV: false,
      temV: false,
      choiceV: false,
      choiceTle: this.$t("choicDlg.xzhyjh"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      isAdd: false,
      type: "",
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      let queryData = JSON.parse(JSON.stringify(this.form));
      queryData.retCode = "!^%" + (queryData.retCode || "");
      queryData.stockId = "!^%" + (queryData.retCode || "");
      queryData.r_retDate_r = "!^%" + (queryData.retDate || "");
      queryData.stockDate = queryData.retDate;
      // queryData.r_stockDate_r = queryData.r_retDate_r;
      this.attributeObj
        .get(
          Object.assign(queryData, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
            retType: "1", // 生产领用类型 = 1
          })
        )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;
          if (this.crud.length === 0) {
            this.loading = false;
          }
          this.crud.forEach((item, index) => {
            item.finStatus = String(item.finStatus);
            item.index = index + 1;
            item.retCode = item.retCode || item.stockId;
            item.retDate = item.stockDate || item.retDate;
            if (index === this.crud.length - 1) {
              setTimeout(() => {
                this.loading = false;
              }, 200);
            }
          });
          if (this.crud.length) {
            this.$refs.mainCrud.setCurrentRow(this.crud[0]);
          }
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    add() {
      let data = {
        index: this.crud.length + 1,
        $cellEdit: true,
        retType: this.hide,
        retCode: "",
        woOutno: "",
        stockState: "0",
        stockDate: this.$getNowTime("date") + " 00:00:00",
        retDate: this.$getNowTime("date") + " 00:00:00",
        stockType: "3",
      };
      baseCodeSupplyEx({ code: "whse_out" }).then((res) => {
        data.stockId = res.data.data;
        data.retCode = res.data.data;
        this.detail = data;
        this.temV = true;
        this.isAdd = true;
        return;
      });
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData[this.attributeObj.uuid[0]]) {
        this.crud.splice(this.chooseData.index - 1, 1);
        if (this.crud.length) {
          this.$refs.mainCrud.setCurrentRow(this.crud[0]);
        }
      }
      this.$tip
        .cofirm(
          "是否确定删除出仓编号为 【 " +
            (this.chooseData.retCode
              ? this.chooseData.retCode
              : this.chooseData.woOutno) +
            " 】的数据",
          this,
          {}
        )
        .then(() => {
          this.attributeObj
            .del(this.chooseData[this.attributeObj.uuid[0]])
            .then((res) => {
              if (res.data.code === 200) {
                getPurApplication({
                  applyCode: this.chooseData.appId,
                }).then((res) => {
                  if (res.data.length > 0) {
                    res.data[0].collectSucceed = 0;
                    updatePurApp(res.data[0]).then((ures) => {});
                  }
                });
                this.$tip.success(this.$t("public.sccg"));
                // this.crud.splice(this.chooseData.index - 1, 1);
                this.getData();
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
    Audit(val) {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要审核的数据!");
        return;
      }
      this.$tip
        .cofirm(
          "是否确定审核通过出仓编号为 【 " +
            this.chooseData.retCode +
            " 】的数据",
          this,
          {}
        )
        .then(() => {
          this.attributeObj
            .update(Object.assign(this.chooseData, { stockState: 1 }))
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("审核成功!");
                this.getData();
              } else {
                this.$tip.error("审核失败!");
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
    // 打开报表 获取fineReport的数据
    handleOpenRpt() {
      let queryData = {
        module: "WHSE",
        id: "WHSE_RETYANIN",
      };
      fetchFineReportUrl(queryData).then((res) => {
        if (res.data) {
          let url = res.data.url + "&retCode=" + this.chooseData.retCode;
          let oA = document.createElement("a");
          oA.href = url;
          oA.target = "_blank";
          oA.click();
        } else {
          this.$tip.warning("报表不存在");
        }
      });
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.oldData.$cellEdit = true;
      for (let key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    handleRowDBLClick(row) {
      this.detail = row;
      this.isAdd = false;
      this.temV = true;
    },
    cellClick(val) {
      this.detail = val;
      this.chooseData = val;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    temClose(val) {
      if (val) {
        this.getData();
      }
      this.temV = false;
    },
  },
  created() {
    this.type = this.data.type.split("_")[0];
    switch (this.type) {
      case this.$t("iaoMng.sx"):
        this.attributeObj = {
          get: getSx,
          add: addSx,
          del: delSx,
          update: updateSx,
          getDtla: getSxCcDetali,
          addDtla: addSxDetali,
          updateDtla: updateSxDetali,
          delDtla: delSxDetali,
          getDtlb: getSxDtlb,
          addDtlb: addSxDtlb,
          updateDtlb: updateSxDtlb,
          delDtlb: delSxDtlb,
          choiceTle: "选择纱线库存",
          validOutWeight: fetchYarnValidOutWeight,
          uuid: ["whseRetyarninoid", "whseRetyarninDtloid", "retyarninDtlaId"],
          applyCategory: 4,
        };
        break;
      case this.$t("iaoMng.scfl"):
        this.attributeObj = {
          get: getScfl,
          add: addScfl,
          del: delScfl,
          update: updateScfl,
          getDtla: getScflDetali,
          addDtla: addScflDetali,
          updateDtla: updateScflDetali,
          delDtla: delScflDetali,
          getDtlb: getScflDtla,
          addDtlb: addScflDtla,
          updateDtlb: updateScflDtla,
          delDtlb: delScflDtla,
          choiceTle: "选择生产辅料库存",
          validOutWeight: fetchAccessoricesValidOutWeight,
          uuid: ["whseAccessoriesoutoid", "whseAccessoriesoutDtloid", "dtlaId"],
          applyCategory: 3,
        };
        break;
      case this.$t("iaoMng.hgyl"):
        this.attributeObj = {
          get: getHgyl,
          add: addHgyl,
          del: delHgyl,
          update: updateHgyl,
          getDtla: getHgylDtl,
          addDtla: addHgylDtl,
          updateDtla: updateHgylDtl,
          delDtla: delHgylDtl,
          getDtlb: getHgylDtla,
          addDtlb: addHgylDtla,
          updateDtlb: updateHgylDtla,
          delDtlb: delHgylDtla,
          choiceTle: "选择化工原料库存",
          validOutWeight: fetchChemicalValidOutWeight,
          uuid: [
            "whseChemicalOutId",
            "whseChemicalOutdtlId",
            "whseChemicalOutDtlaId",
          ],
          applyCategory: 5,
        };
        break;
      case this.$t("iaoMng.yl"):
        this.attributeObj = {
          get: getYl,
          add: addYl,
          del: delYl,
          update: updateYl,
          getDtla: getYlDtl,
          addDtla: addYlDtl,
          updateDtla: updateYlDtl,
          delDtla: delYlDtl,
          getDtlb: getYlDtla,
          addDtlb: addYlDtla,
          updateDtlb: updateYlDtla,
          delDtlb: delYlDtla,
          choiceTle: "选择颜料库存",
          validOutWeight: fetchDyesalValidOutWeight,
          uuid: ["dyesalOutId", "energyOutDtlId", "dyesalOutDtl"],
          applyCategory: 8,
        };
        break;
      case this.$t("choicDlg.wj"):
        this.attributeObj = {
          get: getWj,
          add: addWj,
          del: delWj,
          update: updateWj,
          getDtla: getWjDtl,
          addDtla: addWjDtl,
          updateDtla: updateWjDtl,
          delDtla: delWjDtl,
          getDtlb: getHardwareOutDtla,
          addDtlb: addHardwareOutDtla,
          updateDtlb: updateHardwareOutDtla,
          delDtlb: delHardwareOutDtla,
          choiceTle: "选择五金用品库存",
          validOutWeight: fetchHardwareValidOutWeight,
          uuid: ["whseHardwareOutId", "whseHardwareOutDtlId", "dtlaId"],
          applyCategory: 1,
        };
        break;
      case this.$t("choicDlg.xz"):
        this.attributeObj = {
          get: getXz,
          add: addXz,
          del: delXz,
          update: updateXz,
          getDtla: getXzDtl,
          addDtla: addXzDtl,
          updateDtla: updateXzDtl,
          delDtla: delXzDtl,
          getDtlb: getOfficeDtla,
          addDtlb: addOfficeDtla,
          updateDtlb: updateOfficeDtla,
          delDtlb: delOfficeDtla,
          choiceTle: "选择行政用品库存",
          validOutWeight: fetchOfficeValidOutWeight,
          uuid: ["whseOfficeOutId", "officeOutDtlId", "dtlaId"],
          applyCategory: 2,
        };
        break;
      case this.$t("choicDlg.rl"):
        this.attributeObj = {
          get: getRl,
          add: addRl,
          del: delRl,
          update: updateRl,
          getDtla: getRlDtl,
          addDtla: addRlDtl,
          updateDtla: updateRlDtl,
          delDtla: delRlDtl,
          getDtlb: getEnergDtla,
          addDtlb: addEnergDtla,
          updateDtlb: updateEnergDtla,
          delDtlb: delEnergDtla,
          choiceTle: "选择能源库存",
          validOutWeight: fetchEnergValidOutWeight,
          uuid: ["whseOfficeOutId", "officeOutDtlId", "dtlaId"],
          applyCategory: 2,
        };
        break;
    }
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rc, #rcDetail {
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
    font-size: 16px !important;
    // font-weight: 600 !important;
    color: #000;
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
}
</style>