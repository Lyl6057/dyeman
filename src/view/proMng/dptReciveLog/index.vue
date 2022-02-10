<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-07 18:36:47
 * @Description: 
-->
<template>
  <div id="dptReciveLog">
    <view-container
      title="收单管理"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
    >
      <el-row class="btnList">
        <!-- <el-tooltip
          class="item"
          effect="dark"
          content="cập nhật"
          placement="top-start"
        >
          <el-button
            type="success"
            :disabled="!detail.bleadyeCodeId"
            @click="handleRowDBLClick(detail)"
            >{{ this.$t("public.update") }}</el-button
          >
        </el-tooltip> -->
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
        <!-- <el-tooltip
          class="item"
          effect="dark"
          content="xóa"
          placement="top-start"
        >
          <el-button
            type="danger"
            :disabled="!detail.bleadyeCodeId"
            @click="del"
            >{{ this.$t("public.del") }}</el-button
          >
        </el-tooltip> -->
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

        <!-- <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button> -->
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <el-col :span="12">
          <view-container
            title="已存在收单缸号"
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
        <el-col :span="12">
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
            <!-- <el-timeline
              style="
                margin-top: 10px;
                height: calc(100vh - 239px);
                overflow: auto;
                text-align: left;
                word-wrap: break-word;
                word-break: normal;
              "
            >
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
              >
                <span
                  style="
                    font-size: 18px;
                    font-weight: 600;
                    margin: 2px 0;
                    color: #409eff;
                  "
                  >{{ activity.content }}</span
                >
                <br />
                <span style="line-height: 25px">
                  {{ activity.acceptStaff }} 提交于 {{ activity.timestamp }}
                </span>
                <br />

                <span style="font-size: 15px; color: #606266">{{
                  activity.desc
                }}</span>
              </el-timeline-item>
            </el-timeline> -->
            <!-- <el-timeline
              style="
                margin-top: 10px;
                height: calc(100vh - 236px);
                overflow: auto;
              "
            >
              <el-timeline-item
                v-for="(item, index) in activities"
                :key="index"
                :timestamp="item.timestamp"
                placement="top"
              >
                <h4>{{ item.dptName }}</h4>
                <p>{{ item.acceptStaff }} 提交于 {{ item.timestamp }}</p>
              </el-timeline-item>
            </el-timeline> -->
          </view-container>
        </el-col>
      </el-row>
      <el-dialog
        id="colorMng_Dlg"
        :visible.sync="dialogVisible"
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
          @close="dialogVisible = false"
          @refresh="query"
        ></tem-dlg>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud, dlgCrud } from "./data";
import {
  get,
  add,
  update,
  del,
  getDtl,
  delDtl,
  getProcess,
  getLog,
  getRunJob,
} from "./api";
import tem from "./temDlg";
export default {
  name: "",
  components: {
    temDlg: tem,
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
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      // this.form.bleadyeCode =
      //   "!^%" + (this.form.bleadyeCode ? this.form.bleadyeCode : "");
      // this.form.bleadyeName =
      //   "%" + (this.form.bleadyeName ? this.form.bleadyeName : "");
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data.records;
        // this.crud = this.crud.sort((a, b) => {
        //   return a.bleadyeCode > b.bleadyeCode ? 1 : -1;
        // });
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        // if (this.form.bleadyeCode.indexOf("!^%") != -1) {
        //   this.form.bleadyeCode = this.form.bleadyeCode.split("!^%")[1] || "";
        // }
        // if (this.form.bleadyeName.indexOf("%") != -1) {
        //   this.form.bleadyeName = this.form.bleadyeName.split("%")[1] || "";
        // }
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    print() {
      this.$tip
        .cofirm(
          "是否確定打印生產單號為【 " +
            this.detail.weaveJobCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          print({ weaveJobCode: this.detail.weaveJobCode }).then((res) => {
            if (res.data.msg === "打印成功") {
              this.wloading = true;
              setTimeout(() => {
                this.wloading = false;
                this.$tip.success(res.data.msg);
              }, 2000);
            } else {
              this.wloading = true;
              setTimeout(() => {
                this.wloading = false;
                this.$tip.error(res.data.msg);
              }, 500);
            }
          });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    del() {
      this.$tip
        .cofirm("是否确定删除選中的數據?", this, {})
        .then(() => {
          del(this.detail.bleadyeCodeId)
            .then((res) => {
              if (res.data.code === 200) {
                getDtl(
                  Object.assign({
                    proBleadyeTechCodeFk: this.detail.bleadyeCode,
                    rows: 999,
                    start: 1,
                  })
                ).then((res) => {
                  res.data.records.forEach((item, i) => {
                    delDtl(item.codeItemIt).then((res) => {});
                  });
                });
                setTimeout(() => {
                  this.$tip.success(this.$t("public.sccg"));
                  this.query();
                }, 200);
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
    handleRowDBLClick(val) {
      // this.detail = val;
    },
    cellClick(val) {
      this.sloading = true;
      getLog({
        runJobId: val.runJobId,
      }).then((res) => {
        this.jd = res.data;
        this.sloading = false;
        // this.detail = val;
      });
    },
  },
  created() {
    this.spowerClient = this.$store.state.spowerClient;
    let _this = this;
    _this.spowerClient.onmessage = function (e) {
      if (e.data.indexOf("scan") != -1) {
        _this.$nextTick(() => {
          let scanData = e.data.split("scan=")[1];
          getRunJob({
            vatNo: scanData,
          }).then((res) => {
            _this.dialogVisible = true;
            setTimeout(() => {
              if (res.data.length) {
                _this.$refs.tem.remoteMethod(res.data[0].vatNo);
                // _this.detail.runJobFk = res.data[0].runJobId;
              } else {
                _this.$tip.error("暂无该缸号信息!");
              }
            }, 200);
          });
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