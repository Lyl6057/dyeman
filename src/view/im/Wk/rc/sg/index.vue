<template>
  <div id="rc">
    <el-tabs
      type="border-card"
      v-model="tabs"
      :element-loading-text="$t('public.loading')"
      v-loading="screenLoading"
    >
      <el-tab-pane
        :label="$t('iaoMng.sg') + data + this.$t('iaoMng.rc')"
        name="tabs1"
      >
        <div class="btnList">
          <el-button
            type="danger"
            @click="del"
            :disabled="chooseData.stockState == '1'"
            >{{ this.$t("public.del") }}</el-button
          >
          <!-- <el-button type="warning" @click="ruleV = true" v-if="hide != 8"
            >編號規則配置</el-button
          > -->
          <el-button type="success" @click="audit">审核</el-button>
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
            <view-container :title="$t('iaoMng.sgrkzl')">
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
      <el-tab-pane :label="$t('iaoMng.wrcshdzl')" name="tabs2">
        <plan
          ref="plan"
          v-if="plan"
          :data="data"
          @add="add"
          :everyThing="everyThing"
        ></plan>
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
import plan from "./plan";
import rule from "@/components/rule";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import { getUcmlUser } from "@/const/whse.js";
import {
  // 化工原料
  getRhl,
  delRhl,
  addRhl,
  updateRhl,
  getRhlDetali,
  addRhlDetali,
  updateRhlDetali,
  delRhlDetali,
  getRhlPh,
  addRhlPhDetali,
  updateRhlPhDetali,
  delRhlPhDetali,
  // 顏料
  getYl,
  delYl,
  addYl,
  updateYl,
  getYlDtla,
  addYlDtla,
  updateYlDtla,
  delYlDtla,
  getYlDtlb,
  addYlDtlb,
  updateYlDtlb,
  delYlDtlb,
  //  生产辅料
  getScfl,
  delScfl,
  updateScfl,
  addScfl,
  // 生产辅料
  getScflDetali,
  addScflDetali,
  updateScflDetali,
  delScflDetali,
  getScflLocList,
  addScflLoc,
  updateScflLoc,
  delScflLoc,
  // 紗線
  getSx,
  delSx,
  updateSx,
  addSx,
  getSxDetali,
  addSxDetali,
  updateSxDetali,
  delSxDetali,
  addSxDtla,
  getSxDtla,
  updateSxDtla,
  delSxDtla,
  //能源
  getRl,
  delRl,
  updateRl,
  addRl,
  getRlDetali,
  addRlDetali,
  updateRlDetali,
  delRlDetali,
  getRlLocList,
  addRlLoc,
  updateRlLoc,
  delRlLoc,
  // 五金
  getWj,
  addWj,
  updateWj,
  delWj,
  getWjDetali,
  addWjDetali,
  updateWjDetali,
  delWjDetali,
  getWjLocList,
  addWjLoc,
  updateWjLoc,
  delWjLoc,
  // 行政
  getXz,
  addXz,
  updateXz,
  delXz,
  getXzDetali,
  addXzDetali,
  updateXzDetali,
  delXzDetali,
  getXzLocList,
  addXzLoc,
  updateXzLoc,
  delXzLoc,
  // 设备
  getEqu,
  delEqu,
  updateEqu,
  addEqu,
  getEquDtla,
  addEquDtla,
  updateEquDtla,
  delEquDtla,
  getEquDtlb,
  addEquDtlb,
  updateEquDtlb,
  delEquDtlb,
} from "@/api/im/Wk/rc";
import choice from "@/components/choice";
import { rhl1F, rhl1C, rhl2C, rhl2F } from "./data";
import {
  getviPurchNostock,
  getVpnv,
  getVpnvi,
  getviPuryarnNostock, // 纱线
  getVpnvex, // 染化料分配
  getChemicalinAlloc,
  addChemicalinAlloc,
  getDyesainAlloc,
  addDyesainAlloc,
  // 五金/行政/辅料入仓分配
  getAccessoriesinAlloc,
  addAccessoriesinAlloc,
  // 纱线入仓分配
  getYarninAlloc,
  addYarninAlloc,
  getWhseEnergyInV2,
  getRlAlloc,
  addRlAlloc,
  // 五金
  getWhseHardwareUnin,
  // 行政
  getWhseOfficeUnin,
  getWhseEquInV2,
  fetchExamineVaild,
} from "./api";
export default {
  name: "",
  components: {
    temDlg: tem,
    plan: plan,
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
      this.screenLoading = true;
      this.everyThing = {
        mainF: rhl1F(this),
        mainC: rhl1C(this),
        code: "whse_in",
      };
      switch (this.data) {
        case this.$t("iaoMng.sx"):
          this.everyThing.get = getSx;
          this.everyThing.del = delSx;
          this.everyThing.update = updateSx;
          this.everyThing.add = addSx;
          this.everyThing.getPlan = getviPuryarnNostock;
          this.everyThing.getDetail = getSxDetali;
          this.everyThing.addDetail = addSxDetali;
          this.everyThing.updateDetail = updateSxDetali;
          this.everyThing.delDetail = delSxDetali;
          this.everyThing.getAlloc = getYarninAlloc;
          this.everyThing.addAlloc = addYarninAlloc;
          this.everyThing.getPh = getSxDtla;
          this.everyThing.addPh = addSxDtla;
          this.everyThing.updatePh = updateSxDtla;
          this.everyThing.delPh = delSxDtla;
          this.everyThing.batCode = "sx_in_whse";
          break;
        case this.$t("iaoMng.fl"):
          this.everyThing.get = getScfl;
          this.everyThing.del = delScfl;
          this.everyThing.update = updateScfl;
          this.everyThing.add = addScfl;
          this.everyThing.getPlan = getVpnv;
          this.everyThing.getDetail = getScflDetali;
          this.everyThing.addDetail = addScflDetali;
          this.everyThing.updateDetail = updateScflDetali;
          this.everyThing.delDetail = delScflDetali;
          this.everyThing.getPh = getScflLocList;
          this.everyThing.addPh = addScflLoc;
          this.everyThing.updatePh = updateScflLoc;
          this.everyThing.delPh = delScflLoc;
          this.everyThing.batCode = "scfl_in_whse";
          break;
        case this.$t("choicDlg.wj"):
          this.everyThing.get = getWj;
          this.everyThing.del = delWj;
          this.everyThing.update = updateWj;
          this.everyThing.add = addWj;
          this.everyThing.getPlan = getWhseHardwareUnin;
          this.everyThing.getDetail = getWjDetali;
          this.everyThing.addDetail = addWjDetali;
          this.everyThing.updateDetail = updateWjDetali;
          this.everyThing.delDetail = delWjDetali;
          this.everyThing.getPh = getWjLocList;
          this.everyThing.addPh = addWjLoc;
          this.everyThing.updatePh = updateWjLoc;
          this.everyThing.delPh = delWjLoc;
          this.everyThing.batCode = "wj_in_whse";
          break;
        case this.$t("choicDlg.xz"):
          this.everyThing.get = getXz;
          this.everyThing.del = delXz;
          this.everyThing.update = updateXz;
          this.everyThing.add = addXz;
          this.everyThing.getPlan = getWhseOfficeUnin;
          this.everyThing.getDetail = getXzDetali;
          this.everyThing.addDetail = addXzDetali;
          this.everyThing.updateDetail = updateXzDetali;
          this.everyThing.delDetail = delXzDetali;
          this.everyThing.getPh = getXzLocList;
          this.everyThing.addPh = addXzLoc;
          this.everyThing.updatePh = updateXzLoc;
          this.everyThing.delPh = delXzLoc;
          this.everyThing.batCode = "xz_in_whse";
          break;
        case this.$t("iaoMng.hgyl"):
          this.everyThing.get = getRhl;
          this.everyThing.del = delRhl;
          this.everyThing.update = updateRhl;
          this.everyThing.add = addRhl;
          this.everyThing.getPlan = getviPurchNostock;
          this.everyThing.getDetail = getRhlDetali;
          this.everyThing.addDetail = addRhlDetali;
          this.everyThing.updateDetail = updateRhlDetali;
          this.everyThing.delDetail = delRhlDetali;
          this.everyThing.getPh = getRhlPh;
          this.everyThing.addPh = addRhlPhDetali;
          this.everyThing.updatePh = updateRhlPhDetali;
          this.everyThing.delPh = delRhlPhDetali;
          this.everyThing.getAlloc = getChemicalinAlloc;
          this.everyThing.addAlloc = addChemicalinAlloc;
          this.everyThing.batCode = "hgyl_in_whse";
          break;
        case this.$t("iaoMng.yl"):
          this.everyThing.get = getYl;
          this.everyThing.del = delYl;
          this.everyThing.update = updateYl;
          this.everyThing.add = addYl;
          this.everyThing.getPlan = getVpnvex;
          this.everyThing.getDetail = getYlDtla;
          this.everyThing.addDetail = addYlDtla;
          this.everyThing.updateDetail = updateYlDtla;
          this.everyThing.delDetail = delYlDtla;
          this.everyThing.getPh = getYlDtlb;
          this.everyThing.addPh = addYlDtlb;
          this.everyThing.updatePh = updateYlDtlb;
          this.everyThing.delPh = delYlDtlb;
          this.everyThing.getAlloc = getDyesainAlloc;
          this.everyThing.batCode = "yl_in_whse";
          this.everyThing.addAlloc = addDyesainAlloc;
          break;
        case this.$t("iaoMng.sb"):
          this.everyThing.get = getEqu;
          this.everyThing.del = delEqu;
          this.everyThing.update = updateEqu;
          this.everyThing.add = addEqu;
          this.everyThing.getPlan = getWhseEquInV2;
          this.everyThing.getDetail = getEquDtla;
          this.everyThing.addDetail = addEquDtla;
          this.everyThing.updateDetail = updateEquDtla;
          this.everyThing.delDetail = delEquDtla;
          this.everyThing.getPh = getEquDtlb;
          this.everyThing.addPh = addEquDtlb;
          this.everyThing.updatePh = updateEquDtlb;
          this.everyThing.delPh = delEquDtlb;
          this.everyThing.batCode = "equ_in_whse";
          break;
        case this.$t("choicDlg.rl"):
          this.everyThing.getPlan = getWhseEnergyInV2;
          this.everyThing.get = getRl;
          this.everyThing.del = delRl;
          this.everyThing.update = updateRl;
          this.everyThing.add = addRl;
          this.everyThing.getDetail = getRlDetali;
          this.everyThing.addDetail = addRlDetali;
          this.everyThing.updateDetail = updateRlDetali;
          this.everyThing.delDetail = delRlDetali;
          this.everyThing.getPh = getRlLocList;
          this.everyThing.addPh = addRlLoc;
          this.everyThing.updatePh = updateRlLoc;
          this.everyThing.delPh = delRlLoc;
          this.everyThing.getAlloc = getRlAlloc;
          this.everyThing.addAlloc = addRlAlloc;
          this.everyThing.batCode = "rl_in_whse";
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
      if (this.form.yinDate != "" && this.form.yinDate != undefined) {
        this.form.yinDate += " 00:00:00";
      }
      let queryData = JSON.parse(JSON.stringify(this.form));
      queryData.yinId = "!^%" + (queryData.yinId ? queryData.yinId : "");
      queryData.purNo = "%" + (queryData.purNo ? queryData.purNo : "");
      queryData.deliNo = "%" + (queryData.deliNo ? queryData.deliNo : "");
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
          this.crud.forEach((item, index) => {
            item.suppId = item.purNo;
            item.finStatus = String(item.finStatus);
            item.index = index + 1;
            item.stockState += "";
            if (index === this.crud.length - 1) {
              setTimeout(() => {
                this.screenLoading = false;
              }, 200);
            }
          });
          if (this.crud.length === 0) {
            setTimeout(() => {
              this.screenLoading = false;
            }, 500);
          }
        })
        .catch((e) => {
          this.screenLoading = false;
        });
    },
    add(val) {
      this.screenLoading = true;
      let data = {
        index: this.crud.length + 1,
        $cellEdit: true,
        yinType: this.hide,
        yinId: "",
        yinDate: this.getNowTime(),
        yinStatus: "1",
        finStatus: "0",
        purNo: val[0].purNo,
        deliNo: val[0].deliNo,
        stockState: "0",
        sysCreated: this.$getNowTime("datetime"),
      };
      this.addList = val;
      baseCodeSupplyEx({ code: this.everyThing.code }).then((res) => {
        data.yinId = res.data.data;
        // getUcmlUser({ usrLogin: parent.userID }).then((Res) => {
        data.sysCreatedby = this.$store.state.userOid;
        this.handleRowDBLClick(data);
        this.screenLoading = false;
        this.isAdd = true;
        // });
      });
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (
        !this.chooseData.whseChemicalinoid &&
        !this.chooseData.whseAccessoriesinoid &&
        !this.chooseData.whseYarninoid &&
        !this.chooseData.whseDyesalinoid &&
        !this.chooseData.energyInId &&
        !this.chooseData.whseEquipmentInoid
      ) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
      }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle1") +
            this.chooseData.yinId +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.everyThing
            .del(
              this.data === this.$t("iaoMng.hgyl")
                ? this.chooseData.whseChemicalinoid
                : this.data === this.$t("iaoMng.yl")
                ? this.chooseData.whseDyesalinoid
                : this.data === this.$t("iaoMng.sx")
                ? this.chooseData.whseYarninoid
                : this.data === this.$t("choicDlg.rl")
                ? this.chooseData.energyInId
                : this.data === this.$t("iaoMng.sb")
                ? this.chooseData.whseEquipmentInoid
                : this.chooseData.whseAccessoriesinoid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.chooseData.index - 1, 1);
                this.chooseData = {};
                this.$refs.plan.getData();
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
    audit() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要审核的数据!");
        return;
      }
      this.$tip
        .cofirm(
          "是否确定审核通过入仓编号为 【 " +
            this.chooseData.yinId +
            " 】的数据",
          this,
          {}
        )
        .then(() => {
          if (this.data === this.$t("iaoMng.sx")) {
            fetchExamineVaild(this.chooseData.whseYarninoid)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$tip.success("审核成功!");
                  this.getData();
                } else {
                  this.$tip.error(res.data.msg);
                }
              })
              .catch((err) => {
                this.$tip.error(err);
              });
          } else {
            let params = {
              ...this.chooseData,
              stockState: "1",
              yinDate : this.chooseData.yinDate + ' 00:00:00',
            }
            this.everyThing
              .update(params)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$tip.success("审核成功!");
                  this.getData();
                } else {
                  this.$tip.error(res.data.msg);
                }
              })
              .catch((err) => {
                this.$tip.error(err);
              });
          }
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
      for (let key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
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
      this.$refs.plan.getData();
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
#rc, #rcDetail
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
    font-size 16px !important
    // font-weight: 600 !important;
    color #000
  // .avue-form__group {
  // background-color: #fff;
  // }

  // .el-table--mini td, .el-table--mini th {
  // padding: 2px 0 !important;
  // }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item
    margin-bottom 10px
</style>