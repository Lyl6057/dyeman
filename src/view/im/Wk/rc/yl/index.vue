<template>
  <div id="rc">
    <el-tabs type="border-card" v-model="tabs">
      <el-tab-pane :label="data.type.split('_')[0] + '入库'" name="tabs1">
        <div class="btnList">
          <el-button
            v-if="hide != '8' && hide != '2'"
            type="primary"
            @click="add"
            >{{ this.$t("public.add") }}</el-button
          >
          <el-button
            type="success"
            :disabled="Object.keys(chooseData).length === 0"
            @click="handleRowDBLClick(chooseData)"
            >修改</el-button
          >
          <el-button type="danger" @click="del">{{
            this.$t("public.del")
          }}</el-button>
          <el-button type="primary" @click="getData">查询</el-button>
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
            <view-container :title="data.type.split('_')[0] + '入库资料'">
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
      <el-tab-pane v-if="hide === '8'" label="未生成入库送货单" name="tabs2">
        <plan @add="add"></plan>
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
  </div>
</template>
<script>
import tem from "./tem";
import plan from "./plan";
import rule from "@/components/rule";
import { baseCodeSupplyEx } from "@/api/index";
import { getUcmlUser } from "@/const/whse.js";
import { getYl, delYl } from "@/api/im/Wk/rc";
import choice from "@/components/choice";
import { rhl1F, rhl1C, rhl2C, rhl2F } from "./data";
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
      addList: [],
      tabs: "tabs1",
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      this.oldData = {};
      this.everyThing = {
        mainF: rhl1F(this),
        mainC: rhl1C(this),
        dlgF1: rhl2F(this),
        dlgC1: rhl2C,
        dlgC2: {},
        dlgPp: "24:0",
        fc: getYl,
      };
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      getYl(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          yinType: JSON.parse(localStorage.getItem("imWk")).type.split("_")[1],
        })
      )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.changeList = [];
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
            // item.custCode = item.registerNo;
            item.custId = item.registerNo;
            item.suppId = item.purNo;
            if (index === this.crud.length - 1) {
              setTimeout(() => {
                if (this.hide === "1") {
                  this.$nextTick(() => {
                    this.crud.forEach((item, i) => {
                      this.$set(item, "custName", item.$custId);
                    });
                  });
                }
                this.everyThing.mainC.column[7].hide = true;
                this.loading = false;
              }, 200);
            }
          });
          if (this.crud.length === 0) {
            // this.everyThing.mainC.column[7].hide = true;
            this.loading = false;
          }
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    add(val) {
      if (this.hide === "11" || this.hide === "2") {
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
        };
        this.addList = val;
        baseCodeSupplyEx({ code: "whse_in" }).then((res) => {
          data.yinId = res.data.data;
          getUcmlUser({ usrLogin: parent.userID }).then((Res) => {
            data.sysCreatedby = Res.data.ucmlUseroid;
            this.handleRowDBLClick(data);
            this.isAdd = true;
          });
        });
      } else {
        let data = {
          index: this.crud.length + 1,
          $cellEdit: true,
          yinType: this.hide,
          yinId: "",
          yinDate: this.getNowTime(),
          yinStatus: "1",
          finStatus: "0",
        };
        baseCodeSupplyEx({ code: "whse_in" }).then((res) => {
          data.yinId = res.data.data;
          getUcmlUser({ usrLogin: parent.userID }).then((Res) => {
            data.sysCreatedby = Res.data.ucmlUseroid;
            this.handleRowDBLClick(data);
            this.isAdd = true;
          });
        });
      }
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.chooseData.whseDyesalinoid) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.changeList.splice(i, 1);
        if (this.crud.length > 0) {
          this.crud.forEach((item, index) => {
            item.index = index + 1;
          });
          this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
        }
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除入仓编号为 【 " + this.chooseData.yinId + " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          delYl(this.chooseData.whseDyesalinoid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.chooseData.index - 1, 1);
                if (this.crud.length > 0) {
                  this.crud.forEach((item, index) => {
                    item.index = index + 1;
                  });
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
      // this.oldData.$cellEdit = false;
      // this.$set(val, "$cellEdit", true);
      // this.oldData = val;
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
      if (this.choiceTle === "染化料申购採購單") {
        this.choiceTarget.purNo = val.poNo;
        this.choiceTarget.suppId = val.suppId;
        this.choiceTarget.$suppId = val.suppId;
      }
      if (this.choiceTle === "外厂染化料配料计划") {
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
      // if (!val.whseChemicalinoid) {
      //   this.$tip.warning("请先保存入库信息!");
      //   return;
      // }
      this.isAdd = false;
      this.detail = val;
      this.dialogVisible = true;
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