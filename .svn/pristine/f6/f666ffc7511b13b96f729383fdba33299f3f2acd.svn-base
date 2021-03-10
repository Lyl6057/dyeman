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
          <el-button type="primary" @click="getData">查询</el-button>
          <el-button type="warning" @click="close">关闭</el-button>
        </div>
        <div class="formBox">
          <avue-form
            ref="form"
            :option="everyThing.mainF"
            v-model="form"
          ></avue-form>
        </div>
        <el-row class="crudBox">
          <el-col :span="hide === '5' ? 12 : 10">
            <view-container :title="data.type.split('_')[0] + '出库资料'">
              <div class="btnList" style="margin-bottom: 2px">
                <el-button
                  type="primary"
                  @click="add"
                  v-if="hide != '1' && hide != '2'"
                  >新增</el-button
                >
                <el-button type="danger" @click="del">删除</el-button>
                <el-button
                  type="success"
                  :disabled="changeList.length === 0"
                  @click="save"
                  >保存</el-button
                >
              </div>
              <avue-crud
                ref="mainCrud"
                id="crud"
                :option="everyThing.mainC"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
                @on-load="getData"
                @current-row-change="cellClick"
              ></avue-crud> </view-container
          ></el-col>
          <el-col :span="hide === '5' ? 12 : 14">
            <view-container :title="data.type.split('_')[0] + '出库明细'">
              <tem-dlg
                ref="tem"
                :datas="data"
                :everyThing="everyThing"
                :hide="hide"
              ></tem-dlg></view-container
          ></el-col>
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
  </div>
</template>
<script>
import tem from "./tem";
import plan from "./plan";
import rule from "@/components/rule";
import { baseCodeSupply } from "@/api/index";
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
    ruleDlg: rule,
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
      if (
        this.crud.length > 0 &&
        !this.crud[this.crud.length - 1].whseRetyarninoid &&
        !this.crud[this.crud.length - 1].whseRetreatoid &&
        !this.crud[this.crud.length - 1].whseTransferoid
      ) {
        return;
      }
      if (Object.keys(this.oldData).length > 0) {
        this.oldData.$cellEdit = false;
      }
      let data = {
        index: this.crud.length + 1,
        $cellEdit: true,
        retType: this.hide,
        retCode: "",
        retDate: this.getNowTime(),
      };
      baseCodeSupply({ code: "whse_out" }).then((res) => {
        data.retCode = res.data.data;
      });
      this.crud.push(data);
      this.$refs.mainCrud.setCurrentRow(this.crud[this.crud.length - 1]);
      this.iptChange(this.crud[this.crud.length - 1]);
      this.oldData = this.crud[this.crud.length - 1];
      this.$nextTick(() => {
        // 绑定 输入 事件
        let _this = this;
        document
          .getElementsByClassName("el-table__row")
          [_this.crud.length - 1].addEventListener(
            "input",
            function () {
              _this.iptChange(_this.oldData);
            },
            false
          );
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
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (
        !this.chooseData.whseRetyarninoid &&
        !this.chooseData.whseRetreatoid &&
        !this.chooseData.whseTransferoid
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
        .cofirm("是否确定删除", this, {})
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
                this.$tip.success("删除成功");
                this.crud.splice(this.chooseData.index - 1, 1);
                this.getData();
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
      if (this.$refs.tem.changeList.length > 0) {
        this.$tip
          .cofirm("是否保存当前选择的纱线配料资料?", this, {})
          .then(() => {
            this.$refs.tem.save();
            this.$nextTick(() => {
              this.$refs.mainCrud.setCurrentRow(this.oldData);
            });
          })
          .catch((err) => {
            this.oldData.$cellEdit = false;
            this.$set(val, "$cellEdit", true);
            this.oldData = val;
            this.chooseData = val;
            this.$refs.tem.detail = val;
            this.$refs.tem.changeList = [];
            this.$refs.tem.getDetail();
          });
      } else {
        this.oldData.$cellEdit = false;
        this.$set(val, "$cellEdit", true);
        this.oldData = val;
        this.chooseData = val;
        this.$refs.tem.detail = val;
        this.$refs.tem.getDetail();
      }
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
      this.$tip.success("保存成功!");
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