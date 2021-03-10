<template>
  <div id="rc">
    <el-tabs
      type="border-card"
      v-model="tabs"
      element-loading-text="拼命加载中"
      v-loading="screenLoading"
    >
      <el-tab-pane :label="'採購' + data + '入庫'" name="tabs1">
        <div class="btnList">
          <el-button
            type="success"
            :disabled="Object.keys(chooseData).length === 0"
            @click="handleRowDBLClick(chooseData)"
            >修改</el-button
          >
          <el-button
            type="danger"
            @click="del"
            :disabled="Object.keys(chooseData).length === 0"
            >删除</el-button
          >

          <!-- <el-button type="warning" @click="ruleV = true" v-if="hide != 8"
            >編號規則配置</el-button
          > -->

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
            <view-container title="採購入庫資料">
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
      <el-tab-pane label="未入仓送货单资料" name="tabs2">
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
  //紗線
  getSx,
  addSx,
  updateSx,
  delSx,
  getSxDetali,
  addSxDetali,
  updateSxDetali,
  delSxDetali,
  getSxLoc,
  addSxLoc,
  updateSxLoc,
  delSxLoc,
  //紗線
  getPb,
  addPb,
  updatePb,
  delPb,
  getPbDetali,
  addPbDetali,
  updatePbDetali,
  delPbDetali,
  getPbPh,
  addPbPhDetali,
  updatePbPhDetali,
  delPbPhDetali,
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
  getRhlLoc,
  addRhlLoc,
  updateRhlLoc,
  delRhlLoc,
  // 顔料
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
  getYlLoc,
  addYlLoc,
  updateYlLoc,
  delYlLoc,
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
} from "@/api/im/Wk/rc";
import choice from "@/components/choice";
import { rhl1F, rhl1C, rhl2C, rhl2F, sx2C, pb2C, hgyl2C, yl2C } from "./data";
import {
  getvNostockinYarddeliData,
  getvNostockinCalicodeliData,
  getvNostockinChemicaldeliData,
  getvNostockinDyesadeliData,
  // ------------華麗的分割線
  getChemicalinAlloc,
  addChemicalinAlloc,
  // 五金/行政/辅料入仓分配
  getAccessoriesinAlloc,
  addAccessoriesinAlloc,
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
      choiceTle: "來紗登記",
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
        code: "whse_in",
      };
      switch (this.data) {
        case "紗線":
          this.everyThing.get = getSx;
          this.everyThing.del = delSx;
          this.everyThing.update = updateSx;
          this.everyThing.add = addSx;
          this.everyThing.getPlan = getvNostockinYarddeliData;
          this.everyThing.getDetail = getSxDetali;
          this.everyThing.addDetail = addSxDetali;
          this.everyThing.updateDetail = updateSxDetali;
          this.everyThing.delDetail = delSxDetali;
          // this.everyThing.getAlloc = getAccessoriesinAlloc;
          // this.everyThing.addAlloc = addAccessoriesinAlloc;
          this.everyThing.sx2C = sx2C(this);
          this.everyThing.getLoc = getSxLoc;
          this.everyThing.addLoc = addSxLoc;
          this.everyThing.delLoc = delSxLoc;
          this.everyThing.updateLoc = updateSxLoc;
          break;
        case "胚布":
          this.everyThing.get = getPb;
          this.everyThing.del = delPb;
          this.everyThing.update = updatePb;
          this.everyThing.add = addPb;
          this.everyThing.getPlan = getvNostockinCalicodeliData;
          this.everyThing.getDetail = getPbDetali;
          this.everyThing.addDetail = addPbDetali;
          this.everyThing.updateDetail = updatePbDetali;
          this.everyThing.delDetail = delPbDetali;
          this.everyThing.sx2C = pb2C(this);
          this.everyThing.getLoc = getPbPh;
          this.everyThing.addLoc = addPbPhDetali;
          this.everyThing.delLoc = delPbPhDetali;
          this.everyThing.updateLoc = updatePbPhDetali;
          break;
        case "五金/行政":
          this.everyThing.get = getScfl;
          this.everyThing.del = delScfl;
          this.everyThing.update = updateScfl;
          this.everyThing.add = addScfl;
          this.everyThing.getPlan = getVpnvi;
          this.everyThing.getDetail = getScflDetali;
          this.everyThing.addDetail = addScflDetali;
          this.everyThing.updateDetail = updateScflDetali;
          this.everyThing.delDetail = delScflDetali;
          this.everyThing.getLoc = getPbPh;
          this.everyThing.addLoc = addPbPhDetali;
          this.everyThing.delLoc = delPbPhDetali;
          this.everyThing.updateLoc = updatePbPhDetali;
          break;
        case "化工原料":
          this.everyThing.get = getRhl;
          this.everyThing.del = delRhl;
          this.everyThing.update = updateRhl;
          this.everyThing.add = addRhl;
          this.everyThing.getPlan = getvNostockinChemicaldeliData;
          this.everyThing.sx2C = hgyl2C(this);
          this.everyThing.getDetail = getRhlDetali;
          this.everyThing.addDetail = addRhlDetali;
          this.everyThing.updateDetail = updateRhlDetali;
          this.everyThing.delDetail = delRhlDetali;
          this.everyThing.getPh = getRhlPh;
          this.everyThing.addPh = addRhlPhDetali;
          this.everyThing.updatePh = updateRhlPhDetali;
          this.everyThing.delPh = delRhlPhDetali;
          this.everyThing.getLoc = getRhlLoc;
          this.everyThing.addLoc = addRhlLoc;
          this.everyThing.delLoc = delRhlLoc;
          this.everyThing.updateLoc = updateRhlLoc;
          break;
        case "顏料":
          this.everyThing.get = getYl;
          this.everyThing.del = delYl;
          this.everyThing.update = updateYl;
          this.everyThing.add = addYl;
          this.everyThing.sx2C = yl2C(this);
          this.everyThing.getPlan = getvNostockinDyesadeliData;
          this.everyThing.getDetail = getYlDtla;
          this.everyThing.addDetail = addYlDtla;
          this.everyThing.updateDetail = updateYlDtla;
          this.everyThing.delDetail = delYlDtla;
          this.everyThing.getPh = getYlDtlb;
          this.everyThing.addPh = addYlDtlb;
          this.everyThing.updatePh = updateYlDtlb;
          this.everyThing.delPh = delYlDtlb;
          this.everyThing.getLoc = getYlLoc;
          this.everyThing.addLoc = addYlLoc;
          this.everyThing.delLoc = delYlLoc;
          this.everyThing.updateLoc = updateYlLoc;
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
      this.everyThing
        .get(
          Object.assign(this.form, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
            yinType: this.hide,
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
            item.suppId = item.purNo;
            if (this.data === "顏料") {
              item.suppId = item.deliNo;
            }
            if (index === this.crud.length - 1) {
              // this.everyThing.mainC.column[7].hide = true;
              this.loading = false;
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
      };
      this.addList = val;
      baseCodeSupplyEx({ code: this.everyThing.code }).then((res) => {
        data.yinId = res.data.data;
        getUcmlUser({ usrLogin: parent.userID }).then((Res) => {
          data.sysCreatedby = Res.data.ucmlUseroid;
          this.handleRowDBLClick(data);
          this.screenLoading = false;
          this.isAdd = true;
        });
      });
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (
        !this.chooseData.whseYarninoid &&
        !this.chooseData.whseCalicoinoid &&
        !this.chooseData.whseChemicalinoid &&
        !this.chooseData.whseDyesalinoid
      ) {
        this.crud.splice(this.chooseData.index - 1, 1);
        this.chooseData = {};
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除入仓编号为 【 " + this.chooseData.yinId + " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          this.everyThing
            .del(
              this.data === "化工原料"
                ? this.chooseData.whseChemicalinoid
                : this.data === "紗線"
                ? this.chooseData.whseYarninoid
                : this.data === "胚布"
                ? this.chooseData.whseCalicoinoid
                : this.data === "顏料"
                ? this.chooseData.whseDyesalinoid
                : this.chooseData.whseAccessoriesinoid
            )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.crud.splice(this.chooseData.index - 1, 1);
                this.crud.forEach((item, index) => {
                  item.index = index + 1;
                });
                this.chooseData = {};
                this.$refs.plan.getData();
                if (this.crud.length > 0) {
                  this.$refs.crud.setCurrentRow(
                    this.crud[this.crud.length - 1]
                  );
                }
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
      if (this.choiceTle === "化工原料申购採購單") {
        this.choiceTarget.purNo = val.poNo;
        this.choiceTarget.suppId = val.suppId;
        this.choiceTarget.$suppId = val.suppId;
      }
      if (this.choiceTle === "外厂化工原料配料计划") {
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