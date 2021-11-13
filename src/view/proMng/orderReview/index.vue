<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-09 18:58:15
 * @Description:
-->
<template>
  <div
    id="clothFlyWeight"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <el-tabs v-model="activeName" type="border-card" @tab-click="query">
      <el-tab-pane label="运转单" name="first">
        <el-row class="btnList">
          <!-- <el-button
            type="success"
            @click="pass"
            v-if="form.auditState === 0"
            :disabled="!selectList.length"
            >审核</el-button
          >
          <el-button
            type="success"
            @click="unpass"
            v-if="form.auditState === 1"
            :disabled="!selectList.length"
            >取消审核</el-button
          > -->
          <el-button
            type="primary"
            @click="handleRowDBLClick(detail)"
            :disabled="!detail.runJobId && !detail.weaveJobId"
            >查看</el-button
          >
          <el-button type="primary" @click="query">{{
            this.$t("public.query")
          }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud
            ref="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
            @on-load="query"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
            @selection-change="selectionChange"
          ></avue-crud>
        </el-row>
        <el-dialog
          id="colorMng_Dlg"
          :visible.sync="dialogVisible"
          fullscreen
          width="100%"
          append-to-body
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <revolve
            v-if="dialogVisible && activeName == 'first'"
            ref="tem"
            :detail="detail"
            :isAdd="false"
            :copyC="false"
            :audit="true"
            @close="dialogVisible = false"
            @refresh="query"
          ></revolve>
          <weave
            ref="tem"
            :detail="detail"
            :isAdd="false"
            :copyC="false"
            :audit="true"
            @close="dialogVisible = false"
            v-if="dialogVisible && activeName == 'two'"
            @refresh="query"
          ></weave>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="织单" name="two">
        <el-row class="btnList">
          <el-button
            type="success"
            @click="pass"
            v-if="wform.auditState === 0"
            :disabled="!wselectList.length"
            >审核</el-button
          >
          <el-button
            type="success"
            @click="unpass"
            v-if="wform.auditState === 1"
            :disabled="!wselectList.length"
            >取消审核</el-button
          >
          <el-button
            type="primary"
            @click="handleRowDBLClick(detail)"
            :disabled="!detail.runJobId && !detail.weaveJobId"
            >查看</el-button
          >
          <el-button type="primary" @click="query">{{
            this.$t("public.query")
          }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="wformOp" v-model="wform"> </avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud
            ref="wcrud"
            :option="wcrudOp"
            :data="wcrud"
            :page.sync="wpage"
            v-loading="loading"
            @on-load="query"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
            @selection-change="selectionChange"
          ></avue-crud>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, mainCrud, mainWForm, mainWCrud } from "./data";
import { webSocket } from "@/config/index.js";
import { get, update, getW, updateW } from "./api";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import revolve from "../revolve/temDlg.vue";
import weave from "../print/proWeaveJob/temDlg.vue";
export default {
  name: "",
  components: {
    revolve,
    weave,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
        clothState: 1,
        vatNo: "",
        weaveJobCode: "",
      },
      wformOp: mainWForm(this),
      wform: {},
      wcrudOp: mainWCrud(this),
      wcrud: [],
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      wpage: {
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {},
      czsocket: "",
      weight: 0,
      changeList: [],
      wLoading: false,
      selectList: [],
      wselectList: [],
      options: [],
      oldData: {},
      sort: {},
      checkSum: 0,
      activeName: "first",
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      this.detail = {};
      if (this.activeName == "first") {
        // for (let key in this.form) {
        //   if (!this.form[key] && key != "auditState") {
        //     delete this.form[key];
        //   }
        // }
        if (this.form.vatNo.indexOf("%") == -1) {
          this.form.vatNo = "!^%" + (this.form.vatNo ? this.form.vatNo : "");
        }
        if (this.form.weaveJobCode.indexOf("%") == -1) {
          this.form.weaveJobCode =
            "%" + (this.form.weaveJobCode ? this.form.weaveJobCode : "");
        }
        if (this.form.salPoNo.indexOf("%") == -1) {
          this.form.salPoNo =
            "%" + (this.form.salPoNo ? this.form.salPoNo : "");
        }
        get(
          Object.assign(this.form, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
            isWorkOut: 0,
            runState: 1,
          })
        ).then((res) => {
          this.crud = res.data.records;
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          // this.crud.sort((a, b) => {
          //   return a.vatNo > b.vatNo ? -1 : 1;
          // });
          this.crud.forEach((item, i) => {
            item.index = i + 1;
          });
          this.page.total = res.data.total;
          if (this.form.vatNo.indexOf("!^%") != -1) {
            this.form.vatNo = this.form.vatNo.split("!^%").join("");
          }
          if (this.form.weaveJobCode.indexOf("%") != -1) {
            this.form.weaveJobCode = this.form.weaveJobCode.split("%").join("");
          }
          if (this.form.salPoNo.indexOf("%") != -1) {
            this.form.salPoNo = this.form.salPoNo.split("%").join("");
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      } else {
        for (let key in this.wform) {
          if (!this.wform[key] && key != "auditState") {
            delete this.wform[key];
          }
        }
        this.wform.weaveJobCode =
          "!^%" + (this.wform.weaveJobCode ? this.wform.weaveJobCode : "");
        getW(
          Object.assign(this.wform, {
            rows: this.wpage.pageSize,
            start: this.wpage.currentPage,
            isWorkOut: 0,
          })
        ).then((res) => {
          this.wcrud = res.data.records;
          if (this.wcrud.length > 0) {
            this.$refs.wcrud.setCurrentRow(this.wcrud[0]);
          }
          // this.wcrud.sort((a, b) => {
          //   return a.weaveCode > b.weaveCode ? -1 : 1;
          // });
          this.wcrud.forEach((item, i) => {
            item.custName = item.custCode;
            item.index = i + 1;
          });
          this.wpage.total = res.data.total;
          if (this.wform.weaveJobCode.indexOf("!^%") != -1) {
            this.wform.weaveJobCode =
              this.wform.weaveJobCode.split("!^%")[1] || "";
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        });
      }
    },
    handleRowDBLClick(val) {
      this.detail = val;
      this.dialogVisible = true;
    },
    pass() {
      this.$tip
        .cofirm("是否确定通过审核选中的数据?")
        .then(() => {
          this.wLoading = true;
          if (this.activeName == "first") {
            this.selectList.forEach((item, i) => {
              item.auditState = 1;
              item.modifiDate = this.$getNowTime("datetime");
              update(item).then((res) => {
                if (i == this.selectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success("审核成功!");
                  this.query();
                }
              });
            });
          } else {
            this.wselectList.forEach((item, i) => {
              item.auditState = 1;
              item.upateTime = this.$getNowTime("datetime");
              updateW(item).then((res) => {
                if (i == this.wselectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success("审核成功!");
                  this.query();
                }
              });
            });
          }
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    unpass() {
      this.$tip
        .cofirm("是否确定取消审核选中的数据?")
        .then(() => {
          this.wLoading = true;
          if (this.activeName == "first") {
            this.selectList.forEach((item, i) => {
              item.auditState = 0;
              update(item).then((res) => {
                if (i == this.selectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success("取消审核成功!");
                  this.query();
                }
              });
            });
          } else {
            this.wselectList.forEach((item, i) => {
              item.auditState = 0;
              updateW(item).then((res) => {
                if (i == this.wselectList.length - 1) {
                  this.wLoading = false;
                  this.$tip.success("取消审核成功!");
                  this.query();
                }
              });
            });
          }
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    cellClick(val) {
      this.detail = val;
    },
    selectionChange(list) {
      if (this.activeName == "first") {
        this.selectList = list;
      } else {
        this.wselectList = list;
      }
    },
  },
  updated() {},
  created() {
    this.form.auditState = 0;
    this.wform.auditState = 0;
  },
  mounted() {
    // this.$nextTick(() => {
    // setTimeout(() => {
    // this.detail = {};
    // }, 200);
    // });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#clothFlyWeight {
  .el-table {
    overflow: visible !important;
  }

  .el-tag--mini {
    display: none !important;
  }

  .avue-crud__menu {
    height: 35px !important;
  }

  .avue-dialog .el-drawer__body {
    overflow: auto;
  }
}

.avue-crud__dialog .el-transfer-panel__body {
  height: 86% !important;
}
</style>
