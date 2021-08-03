<template>
  <div id="rc">
    <el-tabs type="border-card" v-model="tabs">
      <el-tab-pane :label="data.type.split('_')[0] + '出库'" name="tabs1">
        <div class="btnList">
          <!-- <el-button type="warning" @click="getData">取消</el-button> -->
          <!-- <el-button
            type="warning"
            @click="ruleV = true"
            v-if="hide != '1' && hide != '2'"
            >編號規則配置</el-button
          > -->
          <!-- <el-button type="success" @click="save">{{this.$t("public.save")}}</el-button> -->
          <el-button
            type="success"
            :disabled="Object.keys(chooseData).length === 0"
            @click="handleRowDBLClick(chooseData)"
            >{{ this.$t("public.update") }}</el-button
          >
          <el-button
            type="primary"
            @click="add"
            v-if="hide != '1' && hide != '2'"
            >{{ this.$t("public.add") }}</el-button
          >
          <el-button type="danger" @click="del">{{
            this.$t("public.del")
          }}</el-button>
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
          <view-container :title="data.type.split('_')[0] + '出库资料'">
            <avue-crud
              ref="mainCrud"
              id="crud"
              :option="everyThing.mainC"
              :data="crud"
              :page.sync="page"
              v-loading="loading"
              @on-load="getData"
              @current-row-change="cellClick"
              @row-dblclick="handleRowDBLClick"
            ></avue-crud>
          </view-container>
          <!-- <el-col :span="hide === '5' ? 12 : 14">
            <view-container :title="data.type.split('_')[0] + '出库明细'">
              <tem-dlg
                ref="tem"
                :datas="data"
                :everyThing="everyThing"
                :hide="hide"
              ></tem-dlg></view-container
          ></el-col> -->
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        label="未出倉紗線配料計劃"
        name="tabs2"
        v-if="hide === '1' || hide === '2'"
      >
        <tab-plan
          :hide="hide"
          @close="close"
          @add="add"
          :tle="data.type.split('_')[0]"
        ></tab-plan>
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
        :everyThing="everyThing"
        @close="dialogVisible = false"
        v-if="dialogVisible"
        @save2reset="getData"
      ></tem-dlg>
    </el-dialog>
  </div>
</template>
<script>
import tem from "./tem";
import plan from "./plan";
import { baseCodeSupplyEx } from "@/api/index";
import {
  getSx,
  addSx,
  updateSx,
  delSx,
  getSxRetreat,
  addSxRetreat,
  updateSxRetreat,
  delSxRetreat,
  getSxTransfer,
  addSxTransfer,
  updateSxTransfer,
  delSxTransfer,
} from "@/api/im/Wk/cc/sx.js";
import { rsxkr1F, rsxkr1C, rsxkr2C, rsxkr2F } from "./data";
export default {
  name: "",
  components: {
    temDlg: tem,
    tabPlan: plan,
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
        dlgF1: rsxkr2F(this),
        dlgC1: rsxkr2C(this),
        dlgC2: {},
        dlgPp: "24:0",
        func: getSx,
        addF: addSx,
        delF: delSx,
        updateF: updateSx,
      };
      if (this.hide === "3" || this.hide === "4") {
        this.everyThing.func = getSxRetreat;
        this.everyThing.addF = addSxRetreat;
        this.everyThing.delF = delSxRetreat;
        this.everyThing.updateF = updateSxRetreat;
      }
      if (this.hide === "5") {
        this.everyThing.func = getSxTransfer;
        this.everyThing.addF = addSxTransfer;
        this.everyThing.delF = delSxTransfer;
        this.everyThing.updateF = updateSxTransfer;
      }
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }

      if (this.form.retDate && this.form.retDate.indexOf(" ") == -1) {
        this.form.retDate += " 00:00:00";
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
          this.crud.sort((a, b) => {
            return (
              b.retCode.substring(b.retCode.length - 6) -
              a.retCode.substring(a.retCode.length - 6)
            );
          });
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
    add(val) {
      let data = {
        index: this.crud.length + 1,
        $cellEdit: true,
        retType: this.hide,
        retCode: "",
        retDate: this.$getNowTime(),
        batchNumber: val.retBatch,
        list: val,
        // yinStatus: "1",
        // finStatus: "0",
      };
      // data = Object.assign(data, val);
      baseCodeSupplyEx({ code: "whse_out" }).then((res) => {
        data.retCode = res.data.data;
        this.isAdd = true;
        this.detail = data;
        this.dialogVisible = true;
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
        !this.chooseData.whseRetyarninoid &&
        !this.chooseData.whseRetreatoid &&
        !this.chooseData.whseTransferoid
      ) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.mainCrud.setCurrentRow(this.crud[this.crud.length - 1]);
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除出仓编号为 【 " +
            this.chooseData.retCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.everyThing
            .delF(
              this.hide === "3" || this.hide === "4"
                ? this.chooseData.whseRetreatoid
                : this.hide === "5"
                ? this.chooseData.whseTransferoid
                : this.chooseData.whseRetyarninoid
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
    cellClick(val) {
      this.chooseData = val;
    },
    handleRowDBLClick(val) {
      this.isAdd = false;
      this.detail = val;
      this.dialogVisible = true;
    },
    save() {
      for (let i = 0; i < this.changeList.length; i++) {
        if (!this.changeList[i].retCode || !this.changeList[i].retDate) {
          this.$tip.error("出仓编号/日期不能为空!");
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (
          item.whseRetyarninoid ||
          item.whseRetreatoid ||
          item.whseTransferoid
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