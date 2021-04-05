<template>
  <div id="rc">
    <el-tabs type="border-card" v-model="tabs">
      <el-tab-pane :label="data.type.split('_')[0] + '出库资料'" name="tabs1">
        <div class="btnList">
          <!-- <el-button type="warning" @click="getData">取消</el-button> -->
          <el-button type="primary" @click="add" v-if="hide != '2'">{{
            this.$t("public.add")
          }}</el-button>
          <el-button
            type="success"
            :disabled="Object.keys(chooseData).length === 0"
            @click="handleRowDBLClick(chooseData)"
            >{{ this.$t("public.update") }}</el-button
          >
          <el-button type="danger" @click="del">{{
            this.$t("public.del")
          }}</el-button>

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
      <el-tab-pane label="外厂辅料配料計劃" name="tabs2" v-if="hide === '2'">
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
        :rcType="'whse_out'"
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
import plan from "./plan";
import rule from "@/components/rule";
import choice from "@/components/choice";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import {
  getScfl,
  addScfl,
  updateScfl,
  delScfl,
  getRetsup,
  addRetsup,
  updateRetsup,
  delRetsup,
  getTra,
  addTra,
  updateTra,
  delTra,
  getRetmaterials,
  addRetmaterials,
  updateRetmaterials,
  delRetmaterials,
} from "@/api/im/Wk/cc/scfl";
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
        // func: getRetmaterials,
        // addF: addRetmaterials,
        // delF: delRetmaterials,
        // updateF: updateRetmaterials,
      };
      if (this.hide === "1") {
        // this.everyThing.mainC.column[13].label = "领用人";
        this.everyThing.func = getScfl;
        this.everyThing.addF = addScfl;
        this.everyThing.delF = delScfl;
        this.everyThing.updateF = updateScfl;
      }
      if (this.hide === "2") {
        // this.everyThing.mainC.column[13].label = "领用人";
        this.everyThing.func = getRetmaterials;
        this.everyThing.addF = addRetmaterials;
        this.everyThing.delF = delRetmaterials;
        this.everyThing.updateF = updateRetmaterials;
      }
      // 退供應商
      if (this.hide === "4" || this.hide === "3") {
        this.everyThing.func = getRetsup;
        this.everyThing.addF = addRetsup;
        this.everyThing.delF = delRetsup;
        this.everyThing.updateF = updateRetsup;
      }
      // 调仓
      if (this.hide === "5") {
        this.everyThing.func = getTra;
        this.everyThing.addF = addTra;
        this.everyThing.delF = delTra;
        this.everyThing.updateF = updateTra;
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
      // if (this.hide === "1") {
      let data = {
        index: this.crud.length + 1,
        $cellEdit: true,
        retType: this.hide,
        retCode: "",
        woOutno: "",
        stockDate: this.getNowTime(),
        retDate: this.getNowTime(),
        stockType: "1",
      };
      // if (this.hide != "1" && this.hide != "2") {
      baseCodeSupplyEx({ code: "whse_out" }).then((res) => {
        data.stockId = res.data.data;
        data.retCode = res.data.data;
        this.detail = data;
        this.temV = true;
        this.isAdd = true;
        return;
      });
      // }
      // if (
      //   this.crud.length > 0 &&
      //   !this.crud[this.crud.length - 1].whseMaterialoid &&
      //   !this.crud[this.crud.length - 1].whseCalicoselloutoid &&
      //   !this.crud[this.crud.length - 1].whseRetsuppcalicooid &&
      //   !this.crud[this.crud.length - 1].whseRetguestcalicooid &&
      //   !this.crud[this.crud.length - 1].whseTransfercalicooid
      // ) {
      //   return;
      // }
      // if (Object.keys(this.oldData).length > 0) {
      //   this.oldData.$cellEdit = false;
      // }
      // let data = {
      //   index: this.crud.length + 1,
      //   $cellEdit: true,
      //   retType: this.hide,
      //   retCode: "",
      //   woOutno: "",
      //   retDate: this.getNowTime(),
      //   woDate: this.getNowTime(),
      // };
      // // if (this.hide != "1" && this.hide != "2") {
      // baseCodeSupply({ code: "whse_out" }).then((res) => {
      //   data.woOutno = res.data.data;
      //   data.retCode = res.data.data;
      //   this.crud.push(data);
      //   this.$refs.mainCrud.setCurrentRow(this.crud[this.crud.length - 1]);
      //   this.iptChange(this.crud[this.crud.length - 1]);
      //   this.oldData = this.crud[this.crud.length - 1];
      //   this.$nextTick(() => {
      //     // 绑定 输入 事件
      //     let _this = this;
      //     document
      //       .getElementsByClassName("el-table__row")
      //       [_this.crud.length - 1].addEventListener(
      //         "input",
      //         function () {
      //           _this.iptChange(_this.oldData);
      //         },
      //         false
      //       );
      //   });
      // });
      // // }
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
      if (!this.chooseData.whseRetmaterialsoid) {
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
            (this.chooseData.stockId
              ? this.chooseData.stockId
              : this.chooseData.retCode) +
            " 】的数据",
          this,
          {}
        )
        .then(() => {
          this.everyThing
            .delF(
              this.hide === "1"
                ? this.chooseData.whseAccessoriesoutoid
                : this.hide == "4"
                ? this.chooseData.whseRetsuppaccessoriesoid
                : this.hide == "2"
                ? this.chooseData.whseRetmaterialsoid
                : this.hide == "5"
                ? this.chooseData.whseTransfercalicooid
                : this.chooseData.whseCalicoselloutoid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.chooseData.index - 1, 1);
                this.$refs.mainCrud.setCurrentRow();
                this.chooseData = {};
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
      // if (
      //   this.chooseData.whseCalicoselloutoid ||
      //   this.chooseData.whseMaterialoid ||
      //   this.chooseData.whseRetsuppcalicooid ||
      //   this.chooseData.whseRetguestcalicooid ||
      //   this.chooseData.whseTransfercalicooid
      // ) {
      this.detail = row;
      this.temV = true;
      this.isAdd = false;
      // } else {
      //   this.$tip.warning("请先保存该出仓数据!");
      // }
      // this.$refs.temDlg.detail = row;
      // this.$refs.temDlg.getDetail();
    },
    cellClick(val) {
      // this.oldData.$cellEdit = false;
      // this.$set(val, "$cellEdit", true);
      // this.oldData = val;
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
    temClose(val) {
      if (val) {
        this.getData();
      }
      this.temV = false;
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