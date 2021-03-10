<template>
  <div id="rc">
    <view-container :title="data.type.split('_')[0]">
      <div class="btnList">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button
          type="success"
          :disabled="Object.keys(chooseData).length === 0"
          @click="handleRowDBLClick(chooseData)"
          >修改</el-button
        >
        <el-button type="danger" @click="del">删除</el-button>

        <!-- <el-button type="warning" @click="ruleV = true">編號規則配置</el-button> -->
        <!-- <el-button type="warning" @click="getData">取消</el-button> -->
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
          @close="temClose"
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
import tem from "./tem";
import rule from "@/components/rule";
import choice from "@/components/choice";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import { getPb, getPbDetali, addPb, updatePb, delPb } from "@/api/im/Wk/rc";
import { rcpb1F, rcpb1C, rcpb2C, rcpb2F } from "./data";
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
      choiceTle: "來胚布登記",
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
      this.chooseData = {};
      this.changeList = [];
      this.everyThing = {
        mainF: rcpb1F(this),
        mainC: rcpb1C(this),
        dlgF1: rcpb2F(this),
        dlgC1: rcpb2C,
        dlgC2: {},
        dlgPp: "24:0",
        fc: getPb,
      };
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      getPb(
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
            item.custId = item.registerNo;
            item.factoryName = item.factoryId;

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
      if (!this.chooseData.whseCalicoinoid) {
        this.crud.splice(this.chooseData.index - 1, 1);
        for (let i = 0; i < this.changeList.length; i++) {
          if (this.changeList[i].index === this.chooseData.index) {
            this.changeList.splice(i, 1);
            this.$refs.crud.setCurrentRow(
              this.crud[this.crud.length - 1] || {}
            );
            return;
          }
        }
      }
      this.$tip
        .cofirm(
          "是否确定删除入仓编号为 【 " + this.chooseData.yinId + " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          delPb(this.chooseData.whseCalicoinoid)
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
      // this.oldData.$cellEdit = false;
      // this.$set(val, "$cellEdit", true);
      // this.oldData = val;
      this.chooseData = val;
    },
    save() {
      for (let i = 0; i < this.changeList.length; i++) {
        if (!this.changeList[i].yinId) {
          this.$tip.error("入仓编号不能为空!");
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (item.finStatus === "null") {
          item.finStatus = "";
        }
        if (item.whseCalicoinoid) {
          updatePb(item).then((res) => {});
        } else {
          addPb(item).then((res) => {});
        }
      });
      this.getData();
      this.$tip.success("保存成功!");
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    handleRowDBLClick(val) {
      this.detail = val;
      this.isAdd = false;
      if (!this.detail.whseCalicoinoid) {
        this.$tip.warning("请先保存入仓资料!");
        return;
      }
      this.dialogVisible = true;
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.choiceTarget.custId = val.custCode;
      this.choiceTarget.custName = val.custCode;
      if (this.choiceTle === "外厂胚布配料计划") {
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