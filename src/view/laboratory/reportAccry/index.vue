<template >
  <div id="reportAccry">
    <el-row>
      <div class="queryForm">
        <el-tabs v-model="tabsName" type="border-card">
          <el-tab-pane label="检验报告附件" name="reportAccry">
            <el-row class="btnList">
              <el-button type="primary" @click="query">{{
                this.$t("public.query")
              }}</el-button>
              <el-button type="primary" @click.stop="uploadDlg1 = true"
                >上传</el-button
              >
              <el-button type="primary" @click.stop="download(checkData)"
                >下载</el-button
              >
              <el-button type="danger" @click="del(checkData)">{{
                this.$t("public.del")
              }}</el-button>
              <!-- <el-button type="primary" @click="editor(checkData)"
                >{{this.$t("public.update")}}</el-button
              > -->
              <el-button type="primary" @click="yulan(checkData)"
                >预览</el-button
              >
            </el-row>
            <el-row>
              <avue-form :option="queryOp" v-model="queryForm"></avue-form>
            </el-row>
            <avue-crud
              ref="crud"
              :data="crudData"
              :option="crudOp"
              @row-click="handleRowClick"
              v-model="crud"
              :page.sync="page"
              @on-load="getData"
            ></avue-crud>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-row>
    <el-row>
      <el-dialog
        :visible.sync="uploadDlg1"
        :close-on-click-modal="false"
        center
        width="90%"
        class="dialogS"
        append-to-body
        v-loading="loading"
      >
        <view-container title="上传附件">
          <div class="btnList">
            <el-button type="success" @click="submit">{{
              this.$t("public.save")
            }}</el-button>
            <el-button type="warning" @click="uploadDlg1 = false">{{
              $t("public.close")
            }}</el-button>
          </div>
          <avue-form :option="formOp" v-model="form"></avue-form>
        </view-container>
      </el-dialog>
      <el-dialog
        title="预览"
        :visible.sync="uploadDlg2"
        :close-on-click-modal="false"
        center
        width="80%"
        class="dialogS"
        destroy-on-close
        append-to-body
        top="1%"
      >
        <div v-html="yulanData"></div>
      </el-dialog>
      <form action id="myform">
        <input
          type="file"
          name="myFile"
          id="myFile"
          multiple
          @change="fileChange"
          style="display: none"
        />
      </form>
    </el-row>
  </div>
</template>

<script>
import { cofirm2, success, warning, error } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { nowTime, timeConversion } from "@/seal/gridOption"; //引入封装的消息提示和弹框组件
export default {
  components: {},
  data() {
    return {
      tabsName: "reportAccry",
      uploadDlg1: false,
      uploadDlg2: false,
      crud: {},
      crudData: [],
      crudOp: {
        page: true,
        menu: true,
        addBtn: false,
        editBtn: false,
        refreshBtn: false,
        columnBtn: false,
        delBtn: false,
        menuWidth: 180,
        menu: false,
        height: "calc(100vh - 245px)",
        labelWidth: 150,
        dialogWidth: "90%",
        dialogHeight: "80%",
        border: true,
        highlightCurrentRow: true,
        menuBtn: false,
        column: [
          {
            label: "#",
            prop: "index",
            width: 50,
            align: "center",
          },
          {
            label: "附件Id",
            prop: "docId",
            hide: true,
            display: true,
          },
          {
            label: "检验报告Id",
            prop: "examineId",
            hide: true,
          },
          {
            label: "附件标题",
            prop: "docTitle",
            width: 120,
          },
          {
            label: "文件地址",
            prop: "fileAddress",
            width: 450,
          },
          {
            label: "文件大小",
            prop: "fileSize",
            width: 120,
            align: "right",
          },
          {
            label: "文件拓展名",
            prop: "fileExten",
            width: 120,
          },
          {
            label: "上传时间",
            prop: "uploadTime",
            width: 180,
            align: "center",
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
            label: "附件标题",
            prop: "docTitle",
            span: 8,
            rules: [
              {
                required: true,
                message: "请输入附件标题",
                trigger: "blur",
              },
            ],
          },
          {
            label: "选择文件",
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
            label: "附件标题",
            prop: "docTitle",
            span: 8,
          },
          {
            label: "文件拓展名",
            prop: "fileExten",
            span: 8,
          },
        ],
      },
      queryForm: {},
      checkData: {},
      yulanData: "",
      loading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    getData() {
      this.$http
        .get(
          "/api/labOutwardDoc/page?rows=" +
            this.page.pageSize +
            "&page=" +
            this.page.currentPage
        )
        .then((res) => {
          let recard = res.data;
          this.crudData = recard.records;
          this.crudData.forEach((item, i) => {
            item.index = i + 1;
          });
          this.$refs.crud.setCurrentRow();
          this.page.total = recard.total;
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    query() {
      let params = {};
      Object.keys(this.queryForm).forEach((key) => {
        // 左边为true,执行右边表达式
        this.queryForm[key] && (params[key] = this.queryForm[key]);
      });

      this.$http
        .get("/api/labOutwardDoc", { params })
        .then((res) => {
          this.crudData = res.data;
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    handleRowClick(row) {
      this.checkData = row;
    },
    download(val) {
      if (val.docId) {
        const urlPath = process.env.API_HOST;
        window.open(urlPath + "labOutwardDoc/download/" + val.docId);
      } else {
        warning("请点击要下载的数据");
      }
    },
    editor(val) {
      if (val.docId) {
        this.$refs.crud.rowEdit(val);
      } else {
        warning("请点击要修改的数据");
      }
    },
    yulan(val) {
      if (val.docId) {
        if (val.fileExten == "doc" || val.fileExten == "docx") {
          this.$http
            .get(
              "/api/labOutwardDoc/prwWord/" +
                val.docId +
                "?type=" +
                val.fileExten
            )
            .then((res) => {
              this.uploadDlg2 = true;
              this.yulanData = res.data;
            });
        } else {
          warning("暂不支持此类型文件预览");
        }
      } else {
        warning("请点击要预览的数据");
      }
    },
    del(row) {
      if (!row.docId) {
        warning("请点击要删除的数据");
        return;
      }
      cofirm2("确定删除此附件信息", this, {})
        .then(() => {
          this.$http
            .delete("/api/labOutwardDoc?docId=" + row.docId)
            .then((res) => {
              if (res.data.code == 200) {
                this.getData();
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
    clickFlie() {
      document.getElementById("myFile").click();
    },
    fileChange() {
      this.form.checkFile = document.getElementById("myFile").files[0].name;
    },
    submit() {
      if (this.form.docTitle === "") {
        error("请输入附件标题!");
        return;
      }
      let form = new FormData(document.getElementById("myform"));

      for (var value of form.values()) {
        if (value.size === 0) {
          error("请选择要上传的附件!");
          return;
        }
      }
      this.loading = true;
      form.append("docTitle", this.form.docTitle);
      this.$http
        .post("/api/labOutwardDoc", form)
        .then((res) => {
          if (res.data.code == 200) {
            this.getData();
            this.uploadDlg1 = false;
            this.loading = false;
            success("上传成功！");
          } else {
            this.loading = false;
            error("上传失败！");
          }
        })
        .catch((err) => {
          this.loading = false;
          error("上传失败！");
        });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang='stylus'>
#reportAccry {
  .box {
    padding: 5px;
    min-height: 500px;
  }

  .avue-form__group {
    margin-left: 0px;
  }

  .el-dialog__header {
    padding: 10px 20px 5px;
  }

  .avue-form {
    padding-top: 0px !important;
  }

  .el-dialog__body {
    padding: 30px 10px !important;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 8px !important;
  }
}
</style>