<template>
  <div id="rc">
    <view-container :title="data.type.split('_')[0]">
      <div class="btnList">
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
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
        <el-col :span="24">
          <view-container
            :title="data.type.split('_')[0] + this.$t('iaoMng.rc')"
          >
            <!-- <div class="btnList" style="margin-bottom: 2px">
          

             <el-button
                type="success"
                :disabled="changeList.length === 0"
                @click="save"
                >{{this.$t("public.save")}}</el-button
              > 
            </div> -->
            <avue-crud
              ref="crud"
              id="crud"
              :option="everyThing.mainC"
              :data="crud"
              :page.sync="page"
              v-loading="loading"
              @on-load="getData"
              @current-row-change="cellClick"
            ></avue-crud> </view-container
        ></el-col>
        <!-- <el-col :span="10">
          <view-container :title="data.type.split('_')[0] + $t('iaoMng.rcmx')">
            <tem-dlg
              ref="tem"
              :datas="data"
              :everyThing="everyThing"
              :hide="hide"
            ></tem-dlg></view-container
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
          :addList="addList"
          @getData="getData"
          @close="dialogVisible = false"
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
import {
  getScfl,
  getScflDetali,
  addScfl,
  updateScfl,
  delScfl,
} from "@/api/im/Wk/rc";
import { baseCodeSupplyEx } from "@/api/index";
import choice from "@/components/choice";
import { rsxkr1F, rsxkr1C, rsxkr2C, rsxkr2F } from "./data";
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
      choiceTle: "",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      isAdd: false,
      addList: [],
      tabs: "tabs1",
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      // this.crud = [];
      this.oldData = {};
      this.chooseData = {};

      this.everyThing = {
        mainF: rsxkr1F(this),
        mainC: rsxkr1C(this),
        dlgF1: rsxkr2F,
        dlgC1: rsxkr2C,
        dlgC2: {},
        dlgPp: "24:0",
      };

      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      getScfl(
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
          if (this.crud.length === 0) {
            this.loading = false;
          }
          this.crud.forEach((item, index) => {
            item.finStatus = String(item.finStatus);
            item.index = 1;
            item.factoryName = item.factoryId;
            item.custId = item.registerNo;
            this.$refs.crud.setCurrentRow();
            if (index === this.crud.length - 1) {
              // this.$refs.tem.mx = [];
              this.loading = false;
            }
          });
          console.log(this.crud);
          // this.$nextTick(() => {
          //   this.crud.forEach((item, index) => {
          //     this.$set(item, "custName", item.$custId);
          //   });
          // });
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
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseAccessoriesinoid) {
        this.crud.splice(this.chooseData.index - 1, 1);
        for (let i = 0; i < this.changeList.length; i++) {
          if (this.changeList[i].index === this.chooseData.index) {
            this.changeList.splice(i, 1);
            this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
            return;
          }
        }
      }
      this.$tip
        .cofirm("是否确定删除", this, {})
        .then(() => {
          delScfl(this.chooseData.whseAccessoriesinoid)
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
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    save() {
      for (let i = 0; i < this.changeList.length; i++) {
        if (!this.changeList[i].yinId || !this.changeList[i].purNo) {
          this.$tip.error("入仓编号/採購單號不能为空!");
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (item.finStatus === "null") {
          item.finStatus = "";
        }
        if (item.whseAccessoriesinoid) {
          updateScfl(item).then((res) => {});
        } else {
          addScfl(item).then((res) => {});
        }
      });
      this.getData();
      this.changeList = [];
      this.$tip.success(this.$t("public.bccg"));
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      if (this.choiceTle === "外厂輔料配料计划") {
        this.choiceTarget.factoryId = val.refCode;
        this.choiceTarget.factoryName = val.refCode;
      }
      if (
        this.choiceTle === this.$t("choicDlg.wjcgd") ||
        this.choiceTle === this.$t("choicDlg.scflcgd")
      ) {
        this.choiceTarget.purNo = val.poNo;
      }
      this.choiceTarget.custId = val.custNo;
      this.choiceTarget.custName = val.custNo;
      this.oldData.$cellEdit = true;
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
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