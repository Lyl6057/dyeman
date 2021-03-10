<template>
  <div id="rc">
    <view-container :title="data.type.split('_')[0]">
      <div class="btnList">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button
          type="success"
          :disabled="Object.keys(detail).length === 0"
          @click="handleRowDBLClick(detail)"
          >修改</el-button
        >
        <el-button type="danger" @click="del">删除</el-button>

        <!-- <el-button type="warning" @click="ruleV = true">編號規則配置</el-button> -->
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
        <el-col :span="24">
          <view-container :title="data.type.split('_')[0] + '入库'">
            <avue-crud
              ref="crud"
              :option="everyThing.mainC"
              :data="crud"
              :page.sync="page"
              v-loading="loading"
              @on-load="getData"
              @row-dblclick="handleRowDBLClick"
              @current-row-change="cellClick"
            >
            </avue-crud> </view-container
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
          :everyThing="everyThing"
          :hide="hide"
          :isAdd="isAdd"
          @close="temClose"
        ></tem-dlg>
        <!-- <back-yarn
          v-else
          ref="backYarn"
          :datas="data"
          :detail="detail"
          :everyThing="everyThing"
          :hide="hide"
        ></back-yarn> -->
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
          :rcType="'whse_in'"
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
    </view-container>
  </div>
</template>
<script>
// import backYarn from "./backYarn";
import tem from "./tem";
import rule from "@/components/rule";
import choice from "@/components/choice";
import {
  getSx,
  getSxDetali,
  addSx,
  updateSx,
  delSx,
  getIncoming,
  getSxLoc,
  addSxLoc,
  updateSxLoc,
  delSxLoc,
} from "@/api/im/Wk/rc";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import { rsxkr1F, rsxkr1C, rsxkr2C, rsxkr2F } from "./data";
import BackYarn from "./backYarn.vue";
export default {
  name: "",
  components: {
    temDlg: tem,
    ruleDlg: rule,
    choice: choice,
    // backYarn: backYarn,
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
      ruleV: false,
      choiceV: false,
      choiceTle: "來紗登記",
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
      this.oldData = {};
      this.detail = {};
      this.chooseData = {};
      this.changeList = [];
      this.everyThing = {
        mainF: rsxkr1F(this),
        mainC: rsxkr1C(this),
        dlgF1: rsxkr2F,
        dlgC1: rsxkr2C,
        dlgC2: {},
        dlgPp: "24:0",
        fc: getSx,
        getLoc: getSxLoc,
        addLoc: addSxLoc,
        delLoc: delSxLoc,
        updateLoc: updateSxLoc,
      };

      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      getSx(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          yinType: JSON.parse(localStorage.getItem("imWk")).type.split("_")[1],
        })
      )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;
          this.crud.sort((a, b) => {
            return (
              b.yinId.substring(b.yinId.length - 6) -
              a.yinId.substring(a.yinId.length - 6)
            );
          });
          this.crud.forEach((item, index) => {
            item.finStatus = String(item.finStatus);
            item.index = index + 1;
            item.factoryName = item.factoryId;
            item.custId = item.registerNo;
            this.$nextTick(() => {
              this.$set(item, "custName", item.$custId);
              if (index === this.crud.length - 1) {
                this.everyThing.mainC.column[10].hide = true;
                this.loading = false;
              }
            });
          });
          if (this.crud.length === 0) {
            this.loading = false;
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
        yinType: this.hide,
        yinId: "",
        yinDate: this.$getNowTime(),
        yinStatus: "1",
        finStatus: "0",
      };
      baseCodeSupplyEx({ code: "whse_in" }).then((res) => {
        data.yinId = res.data.data;
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
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.chooseData.whseYarninoid) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除入仓编号为 【 " + this.chooseData.yinId + " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          delSx(this.chooseData.whseYarninoid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.crud.splice(this.chooseData.index - 1, 1);
                if (this.crud.length > 0) {
                  this.$refs.crud.setCurrentRow(
                    this.crud[this.crud.length - 1]
                  );
                }
                this.crud.forEach((item, index) => {
                  item.index = index + 1;
                });
                // this.getData();
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
      // this.oldData.$cellEdit = false;
      // this.$set(val, "$cellEdit", true);
      // this.oldData = val;
      this.detail = val;
      this.chooseData = val;
    },
    save() {
      for (let i = 0; i < this.changeList.length; i++) {
        // if (
        //   !this.changeList[i].yinId ||
        //   (!this.changeList[i].registerNo && this.hide === "1")
        // ) {
        //   this.$tip.error("入仓编号/紗線編號不能为空!");
        //   return;
        // }
        // if (
        //   !this.changeList[i].yinId ||
        //   (!this.changeList[i].purNo && this.hide === "2")
        // ) {
        //   this.$tip.error("入仓编号/採購單號不能为空!");
        //   return;
        // }
      }
      this.changeList.forEach((item, index) => {
        // item.finStatus = Number(item.finStatus);
        if (item.finStatus === "null") {
          item.finStatus = "";
        }
        if (item.whseYarninoid) {
          updateSx(item).then((res) => {});
        } else {
          addSx(item).then((res) => {
            item.whseYarninoid = res.data.data;
          });
        }
      });
      // this.getData();
      this.$tip.success("保存成功!");
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    handleRowDBLClick(val) {
      this.detail = val;
      this.isAdd = false;
      this.choiceV = false;
      this.dialogVisible = true;
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }

      // if (this.choiceTle === "採購單") {
      //   this.choiceQ.suppId = val.suppId;
      // }
      this.oldData.$cellEdit = false;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      if (this.choiceTle === "外厂纱线配料计划") {
        this.choiceTarget.factoryId = val.refCode;
        this.choiceTarget.factoryName = val.refCode;
      }

      this.oldData.$cellEdit = true;

      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    temClose(val) {
      if (val) {
        this.getData();
      }
      this.dialogVisible = false;
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