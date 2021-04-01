<template >
  <div id="Standard">
    <div class="queryForm">
      <el-tabs v-model="tabsName" type="border-card" v-loading="loading">
        <el-tab-pane label="質量檢驗標準" name="reportAccry">
          <el-row class="btnList">
            <el-button type="primary" @click.stop="addBtn">{{
              this.$t("public.add")
            }}</el-button>
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="primary" @click="editorbtn">修改</el-button>
            <el-button type="danger" @click="del(rowCheckData)">{{
              this.$t("public.del")
            }}</el-button>
            <el-button type="primary" @click="openDlg">標準明細</el-button>
          </el-row>
          <el-row>
            <avue-form :option="queryOp" v-model="queryForm"></avue-form>
          </el-row>
          <el-row>
            <avue-crud
              ref="crud"
              :data="crudData"
              :option="crudOp"
              :page.sync="page"
              v-model="crud"
              @row-del="del"
              @row-click="rowCheck"
              @row-dblclick="openDlg"
            ></avue-crud>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title
      :visible.sync="editDlg"
      class="standardDlg"
      append-to-body
      width="70%"
      :close-on-click-modal="false"
      v-if="editDlg"
    >
      <view-container :title="dlgTle" v-loading="dlgloding">
        <div class="btnList">
          <el-button type="success" @click="add(editForm)">{{
            this.$t("public.save")
          }}</el-button>
          <el-button type="warning" @click="editDlg = false">{{
            this.$t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-form :option="crudOp" v-model="editForm"></avue-form>
        </div>
      </view-container>
    </el-dialog>
    <el-dialog
      title
      :visible.sync="dialogTableVisible"
      class="standardDlg"
      @close="closeDialg"
      fullscreen
      append-to-body
    >
      <standardDlog ref="StandardDlog" @closeDialg="closeDialg"></standardDlog>
    </el-dialog>
  </div>
</template>

<script>
import { cofirm2, success, warning, error } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { nowTime, timeConversion } from "@/seal/gridOption"; //引入封装的消息提示和弹框组件
import StandardDlog from "./StandardDlg";
export default {
  components: {
    standardDlog: StandardDlog,
  },
  data() {
    return {
      tabsName: "reportAccry",
      uploadDlg: false,
      crud: {},
      crudData: [],
      crudOp: {
        page: true,
        menuBtn: false,
        editBtn: true,
        addRowBtn: false,
        addBtn: false,
        cellBtn: false,
        refreshBtn: false,
        columnBtn: false,
        delBtn: true,
        border: true,
        menuWidth: 180,
        labelWidth: 120,
        dialogWidth: "80%",
        dialogHeight: "20%",
        menuPosition: "center",
        highlightCurrentRow: true,
        height: "calc(100vh - 205px)",
        menu: false,
        column: [
          {
            label: "標準Id",
            prop: "standardId",
            display: false,
            hide: true,
          },
          {
            label: "標準編碼",
            prop: "standarCode",
            display: false,
            hide: true,
          },
          {
            label: "標準名稱",
            prop: "standardName",
            span: 8,
            width: 120,
            cell: true,
          },
          {
            label: "標準說明",
            prop: "standarDesc",
            span: 16,
            width: 180,
            cell: true,
          },
          {
            label: "標準類型",
            prop: "standardType",
            span: 8,
            type: "select",
            dicData: [],
            width: 120,
            cell: true,
            props: {
              label: "codename",
              value: "codeid",
            },
          },

          {
            label: "客戶",
            prop: "customerId",
            display: true,
            hide: false,
            type: "select",
            cell: false,
            width: 220,
            dicData: [],
            placeholder: " ",
            props: {
              label: "custName",
              value: "basCustomeroid",
            },
            disabled: true,
            span: 8,
          },
        ],
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      form: {},
      formOp: {
        labelWidth: 120,
        column: [
          {
            label: "標準名稱",
            prop: "docTitle",
            span: 8,
          },
          {
            label: "標準編碼",
            prop: "checkFile",
            span: 12,
            click: () => {
              this.clickFlie();
            },
          },

          // {
          //   label: "文件地址",
          //   prop: "fileAddress",
          //   span: 6,
          //   disabled: true
          // },
        ],
      },
      queryOp: {
        labelWidth: 100,
        menuBtn: false,
        column: [
          {
            label: "標準名稱",
            prop: "standardName",
            span: 8,
          },
          // {
          //   label: "標準編碼",
          //   prop: "standarCode",
          //   span: 8,
          // },
          {
            label: "標準類型",
            prop: "standardType",
            span: 8,
            type: "select",
            dicData: [],
            props: {
              label: "codename",
              value: "codeid",
            },
          },
        ],
      },
      queryForm: {},
      rowCheckData: {},
      oldData: {},
      dialogTableVisible: false,
      Customer: [],
      editForm: {},
      editDlg: false,
      dlgTle: "",
      dlgloding: false,
      loading: true,
    };
  },
  computed: {},
  watch: {},
  methods: {
    query() {
      this.loading = true;
      let params = {};
      this.rowCheckData = {};
      Object.keys(this.queryForm).forEach((key) => {
        // 左边为true,执行右边表达式
        this.queryForm[key] && (params[key] = this.queryForm[key]);
      });
      params.rows = this.page.pageSize;
      params.start = this.page.currentPage;
      this.$http
        .get("/api/qcStandard/v1.0/listByPage", { params })
        .then((res) => {
          this.crudData = res.data.records;
          this.page.total = res.data.total;
          setTimeout(() => {
            this.loading = false;
          }, 200);
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
      this.$http
        .post("/api/codeValue?codeTableId=StandardType")
        .then((res) => {
          this.crudOp.column[4].dicData = res.data;
          this.queryOp.column[1].dicData = res.data;
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });

      this.$http
        .get("/api/basCustomer")
        .then((res) => {
          this.Customer = res.data;
          this.crudOp.column[5].dicData = res.data;
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    addBtn() {
      // this.$refs.crud.rowAdd();
      this.dlgTle = "新增";
      this.editForm = {};
      this.editDlg = true;
    },
    add(row) {
      if (row.standardName === "" || row.standarDesc === "") {
        error("標準名稱/说明不能为空!");
        return;
      }
      if (row.standardType === "") {
        error("標準類型不能为空!");
        return;
      }
      if (row.standardType === "3" && row.customerId === "") {
        error("客户不能为空!");
        return;
      }
      this.dlgloding = true;
      if (row.standardId) {
        // update
        this.$http
          .put(
            "/api/qcStandard/v1.0/updateById?standardName=" +
              row.standardName +
              "&standardType=" +
              row.standardType +
              "&standarDesc=" +
              row.standarDesc +
              "&standardId=" +
              row.standardId +
              "&customerId=" +
              row.customerId
          )
          .then((res) => {
            if (res.status == 200) {
              success("保存成功！");
              this.dlgloding = false;
              this.editForm = {};
              this.editDlg = false;
              this.query();
            } else {
              this.this.dlgloding = false;
              error("保存失败" + res);
            }
          });
      } else {
        //add
        this.$http
          .post(
            "/api/qcStandard/v1.0/inserts?standardName=" +
              row.standardName +
              "&standardType=" +
              row.standardType +
              "&standarDesc=" +
              row.standarDesc +
              "&customerId=" +
              row.customerId
          )
          .then((res) => {
            if (res.status == 200) {
              this.editForm = {};
              success("保存成功！");
              this.editDlg = false;
              this.dlgloding = false;
              this.query();
            } else {
              error("保存失败" + res);
              this.dlgloding = false;
            }
          });
      }
    },
    update(row, index, done, loading) {
      row.standardType == "3" ? "" : (row.customerId = "");
      this.$http
        .put(
          "/api/qcStandard/v1.0/updateById?standardName=" +
            row.standardName +
            "&standardType=" +
            row.standardType +
            "&standarDesc=" +
            row.standarDesc +
            "&standardId=" +
            row.standardId +
            "&customerId=" +
            row.customerId
        )
        .then((res) => {
          if (res.status == 200) {
            success("新增成功！");
            this.query();
          } else {
            error("新增失敗" + res);
          }
        });
      done();
      loading();
    },
    del(row) {
      if (Object.keys(row).length === 0) {
        warning("請先選擇要修改的数据");
        return;
      }
      cofirm2("确定删除选择数据", this, {})
        .then(() => {
          this.$http
            .delete("/api/qcStandard/v1.0/removeById?id=" + row.standardId)
            .then((res) => {
              if (res.data.code == 200) {
                this.query();
                success(this.$t("energy.sccg"));
              } else {
                warning(this.$t("energy.scsbai"));
              }
            })
            .catch((err) => {
              error(this.$t("energy.fwqcw"));
            });
        })
        .catch((err) => {
          error(this.$t("energy.yqxsc"));
        });
    },
    rowCheck(val) {
      this.rowCheckData = val;
    },
    closeDialg() {
      this.dialogTableVisible = false;
    },
    openDlg(row) {
      this.dialogTableVisible = true;
      setTimeout(() => {
        if (row.standardId) {
          this.$refs.StandardDlog.checkVariety(row);
          this.dialogTableVisible = true;
        } else {
          if (Object.keys(this.rowCheckData).length === 0) {
            warning("請先選擇標準");
          } else {
            this.$refs.StandardDlog.checkVariety(this.rowCheckData);
            this.dialogTableVisible = true;
          }
        }
      }, 200);
    },
    editorbtn() {
      if (Object.keys(this.rowCheckData).length === 0) {
        warning("請先選擇要修改的数据");
        return;
      } else {
        this.dlgTle = "修改";
        this.editForm = this.rowCheckData;
        this.editDlg = true;
        // this.$refs.crud.rowEdit(this.rowCheckData);
      }
    },
  },
  created() {
    this.query();
    this.crudOp.column[4].change = (row) => {
      if (row.value === "3") {
        this.crudOp.column[5].disabled = false;
      } else {
        this.editForm.customerId = "";
        this.crudOp.column[5].disabled = true;
      }
    };
  },
  mounted() {},
};
</script>

<style lang='stylus' >
.el-dialog__footer {
  text-align: center !important;
}

.standardDlg {
  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    z-index: 9;
  }
}

#Standard {
  .el-dialog__body {
    padding: 0 !important;
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    z-index: 9;
  }

  .el-table__body tr.current-row>td {
    background: #DCDFE6 !important;
  }

  .avue-crud__menu {
  }

  .box {
    padding: 5px;
    min-height: 500px;
  }

  .el-dialog__wrapper .el-input {
    text-align: left !important;
  }

  .avue-crud .el-input--mini input, .avue-form .el-input--mini input {
    height: 30px !important;
    width: 100% !important;
    line-height: 30px !important;
    margin-right: 24px;
  }

  .avue-group__item {
    padding-bottom: 0 !important;
  }

  .el-table th>.cell {
    font-size: 14px !important;
    font-weight: 700;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 8px !important;
  }
}
</style>