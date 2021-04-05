<template>
  <div id="rc">
    <el-tabs type="border-card" v-model="tabs">
      <el-tab-pane :label="data.type.split('_')[0] + '出库资料'" name="tabs1">
        <div class="btnList">
          <!-- <el-button type="warning" @click="getData">取消</el-button> -->
          <el-button
            type="primary"
            @click="add"
            v-if="hide != '1' && hide != '2'"
            >{{ this.$t("public.add") }}</el-button
          >
          <el-button
            type="success"
            :disabled="Object.keys(chooseData).length === 0"
            @click="handleRowDBLClick(chooseData)"
            >{{ this.$t("public.update") }}</el-button
          >
          <el-button type="danger" @click="del">{{
            this.$t("public.del")
          }}</el-button>
          <el-button
            type="success"
            :disabled="changeList.length === 0"
            @click="save"
            >{{ this.$t("public.save") }}</el-button
          >
          <!-- <el-button
            type="warning"
            @click="ruleV = true"
            v-if="hide != '1' && hide != '2'"
            >編號規則配置</el-button
          > -->
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
            <!-- <view-container :title="data.type.split('_')[0] + '出库资料'"> -->
            <avue-crud
              ref="mainCrud"
              id="mainCrud"
              :option="everyThing.mainC"
              :data="crud"
              :page.sync="page"
              v-loading="loading"
              @on-load="getData"
              @current-row-change="cellClick"
              @row-dblclick="handleRowDBLClick"
            ></avue-crud>
            <!-- </view-container> -->
          </el-col>
          <!-- <el-col :span="hide === '1' ? 0 : 14" v-if="hide != '1'">
            <view-container :title="data.type.split('_')[0] + '出库明细'">
              <tem-dlg
                ref="tem"
                :datas="data"
                :everyThing="everyThing"
                :hide="hide"
                :isPlan="false"
              ></tem-dlg></view-container
          ></el-col> -->
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        :label="hide === '1' ? '本厂胚布配料計劃' : '外厂胚布配料計劃'"
        name="tabs2"
        v-if="hide === '1' || hide === '2'"
      >
        <tab-plan
          :hide="hide"
          :datas="data"
          :everyThing="everyThing"
          @close="close"
          :tle="data.type.split('_')[0]"
          @save2reset="getData"
        ></tab-plan>
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
        :datas="data"
        :everyThing="everyThing"
        :hide="hide"
        :detail="detail"
        :isAdd="isAdd"
        :isPlan="false"
        @close="temV = false"
        @updateList="getData"
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
import plan from "./plan";
import rule from "@/components/rule";
import choice from "@/components/choice";
import { baseCodeSupplyEx } from "@/api/index";
import {
  getMaterial,
  addMaterial,
  updateMaterial,
  delMaterial,
  getPbRetreat,
  addPbRetreat,
  updatePbRetreat,
  delPbRetreat,
  getPbTransfer,
  addPbTransfer,
  updatePbTransfer,
  delPbTransfer,
  // 销售
  getCalicosellout,
  addCalicosellout,
  updateCalicosellout,
  delCalicosellout,
  // 退供应商
  getRetsuppcalico,
  addRetsuppcalico,
  updateRetsuppcalico,
  delRetsuppcalico,
  // 退客人
  getRetguestcalico,
  addRetguestcalico,
  updateRetguestcalico,
  delRetguestcalico,
  // 调仓
  getTransfercalico,
  addTransfercalico,
  updateTransfercalico,
  delTransfercalico,
} from "@/api/im/Wk/cc/pb";
import { rsxkr1F, rsxkr1C, rsxkr2C, rsxkr2F } from "./data";
export default {
  name: "",
  components: {
    temDlg: tem,
    ruleDlg: rule,
    tabPlan: plan,
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
      formOp: {},
      form: {},
      crudOp: {},
      crud: [],
      detail: {},
      everyThing: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      tabs: "tabs1",
      ruleV: false,
      temV: false,
      choiceV: false,
      choiceTle: this.$t("choicDlg.xzhyjh"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      isAdd: false,
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      this.changeList = [];
      this.everyThing = {
        mainF: rsxkr1F(this),
        mainC: rsxkr1C(this),
        dlgF1: rsxkr2F,
        dlgC1: rsxkr2C(this),
        dlgC2: {},
        dlgPp: "24:0",
        func: getMaterial,
        addF: addMaterial,
        delF: delMaterial,
        updateF: updateMaterial,
      };
      if (this.hide === "4") {
        this.everyThing.func = getRetsuppcalico;
        this.everyThing.addF = addRetsuppcalico;
        this.everyThing.delF = delRetsuppcalico;
        this.everyThing.updateF = updateRetsuppcalico;
      }
      if (this.hide === "3") {
        this.everyThing.func = getRetguestcalico;
        this.everyThing.addF = addRetguestcalico;
        this.everyThing.delF = delRetguestcalico;
        this.everyThing.updateF = updateRetguestcalico;
      }
      if (this.hide === "5") {
        this.everyThing.func = getTransfercalico;
        this.everyThing.addF = addTransfercalico;
        this.everyThing.delF = delTransfercalico;
        this.everyThing.updateF = updateTransfercalico;
      }
      // 销售
      if (this.hide === "6") {
        this.everyThing.func = getCalicosellout;
        this.everyThing.addF = addCalicosellout;
        this.everyThing.delF = delCalicosellout;
        this.everyThing.updateF = updateCalicosellout;
      }
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      this.everyThing
        .func(
          Object.assign(this.form, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
            retType: JSON.parse(localStorage.getItem("imWk")).type.split(
              "_"
            )[1],
          })
        )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;
          if (this.crud.length === 0) {
            this.loading = false;
          }

          if (this.hide === "6") {
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
            // item.$cellEdit = false;
            if (index === this.crud.length - 1) {
              // this.$refs.mainCrud.setCurrentRow(this.crud[0]);
              setTimeout(() => {
                this.loading = false;
              }, 200);
            }
          });
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
        retDate: this.$getNowTime(),
        woDate: this.$getNowTime(),
        finStatus: "0",
      };
      // data = Object.assign(data, val);
      baseCodeSupplyEx({ code: "whse_out" }).then((res) => {
        data.retCode = res.data.data;
        data.woOutno = res.data.data;
        this.isAdd = true;
        this.detail = data;
        this.temV = true;
      });
    },
    iptChange(val) {
      if (this.changeList.length === 0) {
        this.changeList.push(val);
      } else {
        for (let i = 0; i < this.changeList.length; i++) {
          if (val.index === this.changeList[i].index) {
            this.changeList[i] = val;
            return;
          }
          if (
            this.changeList.length - 1 === i &&
            this.changeList[i].index != val.index
          ) {
            this.changeList.push(val);
          }
        }
      }
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (
        !this.chooseData.whseMaterialoid &&
        !this.chooseData.whseCalicoselloutoid &&
        !this.chooseData.whseRetsuppcalicooid &&
        !this.chooseData.whseRetguestcalicooid &&
        !this.chooseData.whseTransfercalicooid
      ) {
        this.crud.splice(this.chooseData.index - 1, 1);
        for (let i = 0; i < this.changeList.length; i++) {
          if (this.changeList[i].index === this.chooseData.index) {
            this.changeList.splice(i, 1);
            this.$refs.mainCrud.setCurrentRow(this.crud[this.crud.length - 1]);
            return;
          }
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
          this.everyThing
            .delF(
              this.hide === "1" || this.hide === "2"
                ? this.chooseData.whseMaterialoid
                : this.hide == "4"
                ? this.chooseData.whseRetsuppcalicooid
                : this.hide == "3"
                ? this.chooseData.whseRetguestcalicooid
                : this.hide == "5"
                ? this.chooseData.whseTransfercalicooid
                : this.chooseData.whseCalicoselloutoid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.chooseData.index - 1, 1);
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
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.oldData.$cellEdit = true;
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    handleRowDBLClick(row) {
      if (
        this.chooseData.whseCalicoselloutoid ||
        this.chooseData.whseMaterialoid ||
        this.chooseData.whseRetsuppcalicooid ||
        this.chooseData.whseRetguestcalicooid ||
        this.chooseData.whseTransfercalicooid
      ) {
        this.isAdd = false;
        this.detail = this.chooseData;
        this.temV = true;
      } else {
        this.$tip.warning("请先保存该出仓数据!");
      }
      // this.$refs.temDlg.detail = row;
      // this.$refs.temDlg.getDetail();
    },
    cellClick(val) {
      this.oldData = val;
      this.chooseData = val;
    },
    save() {
      // console.log(this.changeList);
      // return;
      for (let i = 0; i < this.changeList.length; i++) {
        if (
          this.hide != "6" &&
          this.hide != "5" &&
          (!this.changeList[i].retCode || !this.changeList[i].retDate)
        ) {
          this.$tip.error("出仓编号/日期不能为空!");
          return;
        }
        if (
          this.hide === "6" &&
          (!this.changeList[i].woOutno || !this.changeList[i].woDate)
        ) {
          this.$tip.error("出仓编号/日期不能为空!");
          return;
        }
        if (
          this.hide === "5" &&
          (!this.changeList[i].traIn || !this.changeList[i].traOut)
        ) {
          this.$tip.error("调出入仓不能为空!");
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (
          item.whseMaterialoid ||
          item.whseCalicoselloutoid ||
          item.whseRetsuppcalicooid ||
          item.whseRetguestcalicooid ||
          item.whseTransfercalicooid
        ) {
          this.everyThing.updateF(item).then((res) => {});
        } else {
          this.everyThing.addF(item).then((res) => {});
        }
      });
      this.getData();
      this.$tip.success(this.$t("public.bccg"));
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
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
  },
  created() {},
  mounted() {
    // this.getData();
  },
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