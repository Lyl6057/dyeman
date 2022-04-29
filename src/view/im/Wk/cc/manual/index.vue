<template>
  <div id="rc">
    <el-tabs
      type="border-card"
      v-model="tabs"
      :element-loading-text="$t('public.loading')"
      v-loading="screenLoading"
    >
      <el-tab-pane :label="data + '手工' + this.$t('iaoMng.cc')" name="tabs1">
        <div class="btnList">
          <el-button type="primary" @click="add">{{
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
            :disabled="Object.keys(chooseData).length === 0"
            >{{ this.$t("public.del") }}</el-button
          >

          <!-- <el-button type="warning" @click="ruleV = true" v-if="hide != 8"
            >編號規則配置</el-button
          > -->

          <!-- <el-button type="warning" @click="getData">取消</el-button> -->
          <el-button type="primary" @click="getData">{{
            this.$t("public.query")
          }}</el-button>
          <el-button type="warning" @click="close">{{
            this.$t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-form
            ref="form"
            :option="everyThing.mainF"
            v-model="form"
          ></avue-form>
        </div>
        <el-row class="crudBox">
          <el-col :span="24">
            <view-container :title="data + '出倉資料'">
              <avue-crud
                ref="crud"
                :option="everyThing.mainC"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
                @on-load="getData"
                @row-dblclick="handleRowDBLClick"
                @current-row-change="cellClick"
              ></avue-crud> </view-container
          ></el-col>
          <!-- <el-col :span="10">
          <view-container :title="data.type.split('_')[0] + '明细'">
            <avue-crud
              ref="crud"
              :option="crudOp"
              :data="crud"
            ></avue-crud> </view-container
        ></el-col> -->
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      id="sxrcDlg"
      :visible.sync="dialogVisible"
      width="100%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="dialogVisible"
    >
      <tem-dlg
        ref="tem"
        :datas="data"
        :detail="detail"
        :hide="hide"
        :isAdd="isAdd"
        :addList="addList"
        :everyThing="everyThing"
        @getData="refresh"
        @close="dialogVisible = false"
        v-if="dialogVisible"
      ></tem-dlg>
    </el-dialog>
    <el-dialog
      id="wkRuleDlg"
      :visible.sync="ruleV"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
      v-if="ruleV"
    >
      <rule-dlg
        ref="rule"
        :rcType="everyThing.code"
        @close="ruleV = false"
      ></rule-dlg>
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
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import {
  getSx,
  addSx,
  updateSx,
  delSx,
  getSxCcDetali,
  addSxDetali,
  updateSxDetali,
  delSxDetali,
} from "@/api/im/Wk/cc/sx";
import {
  getMaterial,
  addMaterial,
  updateMaterial,
  delMaterial,
  getPbDetalis,
  addPbDetali,
  updatePbDetali,
  delPbDetali,
  getPhDetali,
  addPhDetali,
  updatePhDetali,
  delPhDetali,
} from "@/api/im/Wk/cc/pb";
import {
  getFinclothsellout,
  addFinclothsellout,
  updateFinclothsellout,
  delFinclothsellout,
  getFinclothselloutDtla,
  addFinclothselloutDtla,
  updateFinclothselloutDtla,
  delFinclothselloutDtla,
  getFinclothselloutDtlbList,
  addFinclothselloutDtlb,
  updateFinclothselloutDtlb,
  delFinclothselloutDtlb,
} from "@/api/im/Wk/cc/cpb";
import {
  getHgyl,
  addHgyl,
  updateHgyl,
  delHgyl,
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
  getScfl,
  addScfl,
  updateScfl,
  delScfl,
  getScflDetali,
  addScflDetali,
  updateScflDetali,
  delScflDetali,
} from "@/api/im/Wk/cc/scfl";
import {
  getYl,
  addYl,
  updateYl,
  delYl,
  getYlDtl,
  addYlDtl,
  updateYlDtl,
  delYlDtl,
} from "@/api/im/Wk/cc/yl";
import {
  getWj,
  addWj,
  updateWj,
  delWj,
  getWjDtl,
  addWjDtl,
  updateWjDtl,
  delWjDtl,
} from "@/api/im/Wk/cc/wj";

import {
  getXz,
  addXz,
  updateXz,
  delXz,
  getXzDtl,
  addXzDtl,
  updateXzDtl,
  delXzDtl,
} from "@/api/im/Wk/cc/xz";

import {
  //  能源
  getRl,
  delRl,
  updateRl,
  addRl,
  getRlDtl,
  addRlDtl,
  updateRlDtl,
  delRlDtl,
} from "@/api/im/Wk/cc/rl";
import choice from "@/components/choice";
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
import {
  rhl1F,
  rhl1C,
  rhl2C,
  rhl2F,
  sx2C,
  pb2C,
  hgyl2C,
  yl2C,
  cpb2C,
  yjxz2C,
} from "./data";
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
      data: JSON.parse(localStorage.getItem("imWk")).type.split("_")[0],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      hide: JSON.parse(localStorage.getItem("imWk")).type.split("_")[1],
      formOp: {},
      form: {},
      crudOp: {},
      crud: [],
      detail: {},
      everyThing: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      ruleV: false,
      choiceV: false,
      choiceTle: this.$t("iaoMng.xzlsdj"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      isAdd: false,
      addList: [],
      tabs: "tabs1",
      code: "",
      plan: false,
      screenLoading: false,
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      this.everyThing = {
        mainF: rhl1F(this),
        mainC: rhl1C(this),
        code: "whse_out",
      };
      switch (this.data) {
        case this.$t("iaoMng.sx"):
          this.everyThing.get = getSx;
          this.everyThing.del = delSx;
          this.everyThing.update = updateSx;
          this.everyThing.add = addSx;
          this.everyThing.getDetail = getSxCcDetali;
          this.everyThing.addDetail = addSxDetali;
          this.everyThing.updateDetail = updateSxDetali;
          this.everyThing.delDetail = delSxDetali;
          this.everyThing.sx2C = sx2C(this);
          this.everyThing.batchCode = "sx_out_whse";
          break;
        case this.$t("iaoMng.pb"):
          this.everyThing.get = getMaterial;
          this.everyThing.del = delMaterial;
          this.everyThing.update = updateMaterial;
          this.everyThing.add = addMaterial;
          this.everyThing.getDetail = getPbDetalis;
          this.everyThing.addDetail = addPbDetali;
          this.everyThing.updateDetail = updatePbDetali;
          this.everyThing.delDetail = delPbDetali;
          this.everyThing.sx2C = pb2C(this);
          this.everyThing.getLoc = getPhDetali;
          this.everyThing.addLoc = addPhDetali;
          this.everyThing.delLoc = delPhDetali;
          this.everyThing.updateLoc = updatePhDetali;
          this.everyThing.batchCode = "pb_out_whse";
          break;
        case "成品布":
          this.everyThing.get = getFinclothsellout;
          this.everyThing.del = delFinclothsellout;
          this.everyThing.update = updateFinclothsellout;
          this.everyThing.add = addFinclothsellout;
          this.everyThing.getDetail = getFinclothselloutDtla;
          this.everyThing.addDetail = addFinclothselloutDtla;
          this.everyThing.updateDetail = updateFinclothselloutDtla;
          this.everyThing.delDetail = delFinclothselloutDtla;
          this.everyThing.getLoc = getFinclothselloutDtlbList;
          this.everyThing.addLoc = addFinclothselloutDtlb;
          this.everyThing.delLoc = delFinclothselloutDtlb;
          this.everyThing.updateLoc = updateFinclothselloutDtlb;
          this.everyThing.getPh = getFinclothselloutDtlbList;
          this.everyThing.addPh = addFinclothselloutDtlb;
          this.everyThing.updatePh = updateFinclothselloutDtlb;
          this.everyThing.delPh = delFinclothselloutDtlb;
          this.everyThing.sx2C = cpb2C(this);
          this.everyThing.batchCode = "cpb_out_whse";
          break;
        case this.$t("choicDlg.wj"):
          this.everyThing.get = getWj;
          this.everyThing.del = delWj;
          this.everyThing.update = updateWj;
          this.everyThing.sx2C = yjxz2C(this);
          this.everyThing.add = addWj;
          this.everyThing.getDetail = getWjDtl;
          this.everyThing.addDetail = addWjDtl;
          this.everyThing.updateDetail = updateWjDtl;
          this.everyThing.delDetail = delWjDtl;
          break;
        case this.$t("choicDlg.xz"):
          this.everyThing.get = getXz;
          this.everyThing.del = delXz;
          this.everyThing.update = updateXz;
          this.everyThing.add = addXz;
          this.everyThing.sx2C = yjxz2C(this);
          this.everyThing.getDetail = getXzDtl;
          this.everyThing.addDetail = addXzDtl;
          this.everyThing.updateDetail = updateXzDtl;
          this.everyThing.delDetail = delXzDtl;
          break;
        case this.$t("choicDlg.rl"):
          this.everyThing.get = getRl;
          this.everyThing.del = delRl;
          this.everyThing.update = updateRl;
          this.everyThing.add = addRl;
          this.everyThing.sx2C = yjxz2C(this);
          this.everyThing.getDetail = getRlDtl;
          this.everyThing.addDetail = addRlDtl;
          this.everyThing.updateDetail = updateRlDtl;
          this.everyThing.delDetail = delRlDtl;
          break;
        case this.$t("choicDlg.scfl"):
          this.everyThing.get = getScfl;
          this.everyThing.del = delScfl;
          this.everyThing.update = updateScfl;
          this.everyThing.sx2C = yjxz2C(this);
          this.everyThing.add = addScfl;
          this.everyThing.getDetail = getScflDetali;
          this.everyThing.addDetail = addScflDetali;
          this.everyThing.updateDetail = updateScflDetali;
          this.everyThing.delDetail = delScflDetali;
          break;
        case this.$t("iaoMng.hgyl"):
          this.everyThing.get = getHgyl;
          this.everyThing.del = delHgyl;
          this.everyThing.update = updateHgyl;
          this.everyThing.add = addHgyl;
          this.everyThing.sx2C = hgyl2C(this);
          this.everyThing.getDetail = getHgylDtl;
          this.everyThing.addDetail = addHgylDtl;
          this.everyThing.updateDetail = updateHgylDtl;
          this.everyThing.delDetail = delHgylDtl;
          this.everyThing.getPh = getHgylDtla;
          this.everyThing.addPh = addHgylDtla;
          this.everyThing.updatePh = updateHgylDtla;
          this.everyThing.delPh = delHgylDtla;
          // this.everyThing.getLoc = getRhlLoc;
          // this.everyThing.addLoc = addRhlLoc;
          // this.everyThing.delLoc = delRhlLoc;
          // this.everyThing.updateLoc = updateRhlLoc;
          this.everyThing.batchCode = "hgyl_out_whse";
          break;
        case this.$t("iaoMng.yl"):
          this.everyThing.get = getYl;
          this.everyThing.del = delYl;
          this.everyThing.update = updateYl;
          this.everyThing.add = addYl;
          this.everyThing.sx2C = yl2C(this);
          this.everyThing.getDetail = getYlDtl;
          this.everyThing.addDetail = addYlDtl;
          this.everyThing.updateDetail = updateYlDtl;
          this.everyThing.delDetail = delYlDtl;
          this.everyThing.batchCode = "yl_out_whse";
          break;
        default:
          break;
      }
      this.plan = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      let queryData = JSON.parse(JSON.stringify(this.form));
      if (queryData.retDate != "" && queryData.retDate != undefined) {
        queryData.retDate += " 00:00:00";
      }
      if (queryData.stockDate != "" && queryData.stockDate != undefined) {
        queryData.stockDate += " 00:00:00";
      }
      if (queryData.woDate != "" && queryData.woDate != undefined) {
        queryData.woDate += " 00:00:00";
      }
      queryData.stockId = "!^%" + (queryData.stockId ? queryData.stockId : "");
      queryData.retCode = "!^%" + (queryData.retCode ? queryData.retCode : "");
      queryData.woOutno = "!^%" + (queryData.woOutno ? queryData.woOutno : "");
      this.everyThing
        .get(
          Object.assign(queryData, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
            yinType: this.hide,
          })
        )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;
          if (this.data == "成品布") {
            this.crud.sort((a, b) => {
              return (
                b.woOutno.substring(b.woOutno.length - 6) -
                a.woOutno.substring(a.woOutno.length - 6)
              );
            });
          } else {
            this.crud.sort((a, b) => {
              return (
                b.retCode.substring(b.retCode.length - 6) -
                a.retCode.substring(a.retCode.length - 6)
              );
            });
          }
          this.crud.forEach((item, index) => {
            item.finStatus = String(item.finStatus);
            item.index = index + 1;
            // item.retCode = item.stockId;
            // item.retDate = item.stockDate;
            if (index === this.crud.length - 1) {
              setTimeout(() => {
                this.loading = false;
              }, 200);
            }
          });

          if (this.crud.length === 0) {
            setTimeout(() => {
              this.loading = false;
            }, 200);
          }
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    add() {
      this.screenLoading = true;
      let data = {
        index: this.crud.length + 1,
        $cellEdit: true,
        retType: "0",
        woOutno: "",
        woDate: this.getNowTime(),
        retCode: "",
        retDate: this.getNowTime(),
        stockId: "",
        stockDate: this.getNowTime(),
      };
      baseCodeSupplyEx({ code: this.everyThing.code }).then((res) => {
        data.retCode = res.data.data;
        data.woOutno = res.data.data;
        data.stockId = res.data.data;
        this.detail = data;
        this.screenLoading = false;
        this.isAdd = true;
        this.dialogVisible = true;
      });
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (
        !this.chooseData.whseFinclothselloutoid &&
        !this.chooseData.whseRetyarninoid &&
        !this.chooseData.whseMaterialoid &&
        !this.chooseData.whseRetsuppchemicaloid &&
        !this.chooseData.dyesalOutId &&
        !this.chooseData.whseAccessoriesoutoid &&
        !this.chooseData.energyOutId &&
        !this.chooseData.whseHardwareOutId &&
        !this.chooseData.whseOfficeOutId
      ) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        return;
      }
      this.$tip
        .cofirm("是否確定刪除選中的數據?", {})
        .then(() => {
          this.everyThing
            .del(
              this.data === this.$t("iaoMng.hgyl")
                ? this.chooseData.whseRetsuppchemicaloid
                : this.data === this.$t("iaoMng.sx")
                ? this.chooseData.whseRetyarninoid
                : this.data === this.$t("iaoMng.pb")
                ? this.chooseData.whseMaterialoid
                : this.data === this.$t("iaoMng.yl")
                ? this.chooseData.dyesalOutId
                : this.data === "成品布"
                ? this.chooseData.whseFinclothselloutoid
                : this.data === this.$t("choicDlg.rl")
                ? this.chooseData.energyOutId
                : this.data === this.$t("choicDlg.wj")
                ? this.chooseData.whseHardwareOutId
                : this.data === this.$t("choicDlg.xz")
                ? this.chooseData.whseOfficeOutId
                : this.chooseData.whseAccessoriesoutoid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.chooseData.index - 1, 1);
                this.crud.forEach((item, index) => {
                  item.index = index + 1;
                });
                this.page.total = this.crud.length;
                this.chooseData = {};
                if (this.crud.length > 0) {
                  this.$refs.crud.setCurrentRow(
                    this.crud[this.crud.length - 1]
                  );
                }
                // this.getData();
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
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      if (this.choiceTle === this.$t("iaoMng.hgylsgcgd")) {
        this.choiceTarget.purNo = val.poNo;
        this.choiceTarget.suppId = val.suppId;
        this.choiceTarget.$suppId = val.suppId;
      }
      if (this.choiceTle === this.$t("choicDlg.xzwfylpl")) {
        this.choiceTarget.factoryId = val.refCode;
        this.choiceTarget.factoryName = val.refCode;
      }
      this.choiceTarget.custId = val.custCode;
      this.choiceTarget.custName = val.custCode;
      this.oldData.$cellEdit = true;
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    handleRowDBLClick(val) {
      this.isAdd = false;
      this.detail = val;
      this.dialogVisible = true;
    },
    refresh() {
      this.getData();
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
      return `${y}-${m}-${d}`;
    },
  },
  created() {},
  mounted() {
    // console.log(JSON.parse(localStorage.getItem('imWk')).type.split("_")[1] === "1");
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rc, #rcDetail {
  .formBox {
    margin-bottom: 0px;
  }

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