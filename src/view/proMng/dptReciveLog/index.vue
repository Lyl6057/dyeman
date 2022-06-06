<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-02 16:26:02
 * @Description: 
-->
<template>
  <div id="dptReciveLog">
    <el-tabs
      v-model="tabs"
      type="border-card"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
      @tab-click="tabChange"
    >
      <el-tab-pane name="rd" label="染单管理">
        <el-row class="btnList">
          <el-tooltip
            class="item"
            effect="dark"
            content="thêm mới "
            placement="top-start"
          >
            <el-button type="primary" @click="add">{{
              this.$t("public.add")
            }}</el-button>
          </el-tooltip>
          <el-button type="success" @click="flowVisible = true"
            >流程图</el-button
          >
          <el-tooltip
            class="item"
            effect="dark"
            content="tìm kiếm"
            placement="top-start"
          >
            <el-button type="primary" @click="query">{{
              this.$t("public.query")
            }}</el-button>
          </el-tooltip>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
        </el-row>
        <el-row class="crudBox">
          <el-col :span="6">
            <view-container
              title="缸号信息"
              v-loading="sloading"
              element-loading-text="拼命加载中..."
            >
              <avue-crud
                ref="crud"
                id="crud"
                :option="crudOp"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
                @on-load="query"
                @row-dblclick="handleRowDBLClick"
                @current-row-change="cellClick"
              >
              </avue-crud>
            </view-container>
          </el-col>
          <el-col :span="18">
            <view-container
              title="收单日志"
              v-loading="sloading"
              element-loading-text="拼命加载中..."
            >
              <avue-crud
                ref="jdCrud"
                id="jdCrud"
                :option="jdOp"
                :data="jd"
                v-loading="sloading"
              >
              </avue-crud>
            </view-container>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name="zd" label="织单管理">
        <el-row class="btnList">
          <el-tooltip
            class="item"
            effect="dark"
            content="thêm mới "
            placement="top-start"
          >
            <el-button type="primary" @click="add">{{
              this.$t("public.add")
            }}</el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="tìm kiếm"
            placement="top-start"
          >
            <el-button type="primary" @click="query">{{
              this.$t("public.query")
            }}</el-button>
          </el-tooltip>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
        </el-row>
        <el-row class="crudBox">
          <el-col :span="6">
            <view-container
              title="织单信息"
              v-loading="sloading"
              element-loading-text="拼命加载中..."
            >
              <avue-crud
                ref="crud"
                id="crud"
                :option="weaveCrudOp"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
                @on-load="query"
                @current-row-change="cellClick"
              >
              </avue-crud>
            </view-container>
          </el-col>
          <el-col :span="18">
            <view-container
              title="收单日志"
              v-loading="sloading"
              element-loading-text="拼命加载中..."
            >
              <avue-crud
                ref="jdCrud"
                id="jdCrud"
                :option="jdOp"
                :data="jd"
                v-loading="sloading"
              >
              </avue-crud>
            </view-container>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      id="colorMng_Dlg"
      :visible.sync="flowVisible"
      width="70%"
      top="5vh"
      append-to-body
    >
      <flow-chart-pro ref="flowchartpro" v-model="fk"></flow-chart-pro>
    </el-dialog>
    <el-dialog
      id="colorMng_Dlg"
      :visible.sync="dialogVisible"
      fullscreen
      width="70%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <tem-dlg
        v-if="dialogVisible"
        ref="tem"
        :detail="detail"
        :isAdd="isAdd"
        :userId="userId"
        :tabs="tabs"
        @close="dialogVisible = false"
        @refresh="query"
      ></tem-dlg>
    </el-dialog>
  </div>
</template>
<script>
import flowChartPro from "@/components/flowChart2Pro/index.vue";
import { mainForm, mainCrud, dlgCrud, weavecrud, weaveForm } from "./data";
import {
  get,
  getWeave,
  add,
  update,
  del,
  getDtl,
  delDtl,
  getProcess,
  getLog,
  getRunJob,
  getLoginOrg,
  getDptWorkProcess,
} from "./api";
import tem from "./temDlg";
export default {
  name: "",
  components: {
    temDlg: tem,
    flowChartPro,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      jdOp: dlgCrud(this),
      jd: [],
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
      input: "",
      wloading: false,
      czsocket: {},
      activities: [],
      sloading: false,
      spowerClient: null,
      weaveCrudOp: weavecrud(this),
      weaveCrud: [],
      tabs: "rd",
      flowVisible: false,
      fk: "",
      userId: "",
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      // this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      this.form.weaveJobCode =
        "!^%" + (this.form.weaveJobCode ? this.form.weaveJobCode : "");
      let func = this.tabs == "rd" ? get : getWeave;
      func(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          page: this.page.currentPage,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        if (this.form.weaveJobCode.indexOf("!^%") != -1) {
          this.form.weaveJobCode = this.form.weaveJobCode.split("!^%")[1] || "";
        }
        this.page.total = res.data.total;
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
    },
    tabChange() {
      if (this.tabs == "rd") {
        this.formOp = mainForm();
      } else {
        this.formOp = weaveForm();
      }
      this.$nextTick(() => {
        this.query();
      });
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    handleRowDBLClick(val) {
      // this.detail = val;
      this.flowVisible = true;
    },
    cellClick(val) {
      this.sloading = true;
      this.fk = val.runJobId || val.weaveJobId;
      getLog({
        runJobId: val.runJobId || val.weaveJobId,
      }).then((res) => {
        this.jd = res.data;
        this.sloading = false;
        // this.detail = val;
      });
    },
  },
  created() {
    getLoginOrg({ account: parent.userID }).then((res) => {
      if (res.data) {
        getDptWorkProcess().then((dpt) => {
          for (let i = 0; i < dpt.data.length; i++) {
            if (dpt.data[i].orgNo.indexOf(res.data.orgno) != -1) {
              this.userId = dpt.data[i].dptCode;
              break;
            }
          }
        });
      }
    });
    this.spowerClient = this.$store.state.spowerClient;
    let _this = this;
    _this.spowerClient.onmessage = function (e) {
      if (e.data.indexOf("scan") != -1) {
        _this.$nextTick(() => {
          let scanData = e.data.split("scan=")[1];
          if (scanData.indexOf("WG") != -1) {
            _this.tabs = "zd";
            getWeave({
              weaveJobCode: scanData,
            }).then(async (res) => {
              _this.dialogVisible = true;
              await _this.$nextTick()
              // setTimeout(() => {
                if (res.data.records.length) {
                  _this.$refs.tem.remoteMethod(
                    res.data.records[0].weaveJobCode, _this.dialogVisible
                  );
                } else {
                  _this.$tip.error("暂无该织单信息!");
                }
              // }, 200);
            });
          } else {
            _this.tabs = "rd";
            getRunJob({
              vatNo: scanData,
            }).then(async (res) => {
              _this.dialogVisible = true;
              await _this.$nextTick()
              // setTimeout(() => {
                if (res.data.length) {
                  _this.$refs.tem.remoteMethod(res.data[0].vatNo, _this.dialogVisible);
                  // _this.detail.runJobFk = res.data[0].runJobId;
                } else {
                  _this.$tip.error("暂无该缸号信息!");
                }
              // }, 200);
            });
          }
        });
      }
    };
  },
  mounted() {
    getProcess().then((res) => {
      res.data = res.data.sort((a, b) => {
        return a.sn > b.sn ? 1 : -1;
      });
      res.data.forEach((item, i) => {
        this.activities.push({
          content: item.dptName,
          timestamp: "",
          size: "large",
          type: "info",
          // color: "#0bbd87",
        });
      });
    });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#dptReciveLog
  .el-timeline-item
    padding-bottom 10px
    font-size 16px
</style>