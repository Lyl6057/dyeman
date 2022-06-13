<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-10 08:36:05
 * @Description:
-->
<template>
  <div id="runJob">
    <view-container
      title="染整生产运转单"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
    >
      <el-row class="btnList">
        <el-tooltip
          class="item"
          effect="dark"
          content="cập nhật"
          placement="top-start"
        >
          <el-button
            type="success"
            :disabled="!detail.runJobId"
            @click="handleRowDBLClick(detail)"
            >{{ this.$t("public.update") }}</el-button
          >
        </el-tooltip>

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
          content="xóa"
          placement="top-start"
        >
          <el-button
            type="danger"
            :disabled="!selectList.length"
            @click="del"
            >{{ this.$t("public.del") }}</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content=" in"
          placement="top-start"
        >
          <el-button
            type="primary"
            @click="print"
            :loading="wloading"
            :disabled="detail.auditState != 1"
            >打印</el-button
          >
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="copy"
          placement="top-start"
        >
          <el-button
            type="primary"
            :disabled="!detail.runJobId"
            @click="copyEvent"
            :loading="wloading"
            >复制</el-button
          >
        </el-tooltip>

        <!-- <el-button
          type="primary"
          @click="audit"
          :disabled="!selectList.length"
          :loading="wloading"
          >审核</el-button
        > -->
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
        <el-dropdown
          split-button
          type="primary"
          @click="splitVatNo('A')"
          :loading="wloading"
          :disabled="!detail.runJobId"
          style="margin-left: 10px"
        >
          拆缸
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="splitVatNo('A')"
              >A 改单拆缸</el-dropdown-item
            >
            <el-dropdown-item @click.native="splitVatNo('R')"
              >R 改染拆缸</el-dropdown-item
            >
            <el-dropdown-item @click.native="splitVatNo('W')"
              >W 废布拆缸</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          id="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          :row-style="rowStyle"
          @on-load="query"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
          @selection-change="selectionChange"
        >
        </avue-crud>
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
        <tem-dlg
          v-if="dialogVisible"
          ref="tem"
          :detail="detail"
          :isAdd="isAdd"
          :copyC="copyC"
          :isSplit="isSplit"
          :splitType="splitType"
          @close="dialogVisible = false"
          @print="print"
          @refresh="query"
        ></tem-dlg>
      </el-dialog>
      <el-dialog
        id="colorMng_Dlg"
        :visible.sync="pdfDlg"
        fullscreen
        width="100%"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="pdfClose"
      >
        <view-container title="打印預覽">
          <!-- <div class="btnList">
            <el-button type="warning" @click="pdfDlg = false">{{
              this.$t("public.close")
            }}</el-button>
            <el-button type="primary" @click="print2">打印</el-button>
          </div> -->
          <!--startprint-->
          <embed
            id="pdf"
            style="width: 100vw; height: calc(100vh - 80px)"
            :src="pdfUrl"
          />
          <!--endprint-->
        </view-container>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del, delDye, getDye, print } from "./api";
import tem from "./temDlg";
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
  name: "",
  components: {
    temDlg: tem,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {
        salPoNo: "",
        colorCode: "",
      },
      crudOp: mainCrud(this),
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
      isSplit: false,
      input: "",
      wloading: false,
      czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
      copyC: false,
      selectList: [],
      splitType: "A",
      hasFinied: 0
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "" && key != "auditState") {
          delete this.form[key];
        }
      }
      this.form.vatNo = "!^%" + (this.form.vatNo ? this.form.vatNo : "");
      this.form.weaveJobCode =
        "%" + (this.form.weaveJobCode ? this.form.weaveJobCode : "");

      this.form.salPoNo = "%" + (this.form.salPoNo ? this.form.salPoNo : "");

      // this.form.colorCode =
      //   "%" + (this.form.colorCode ? this.form.colorCode : "");

      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          pages: this.page.currentPage,
          delFlag: 0,
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });

        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        if (this.form.vatNo.indexOf("!^%") != -1) {
          this.form.vatNo = this.form.vatNo.split("!^%")[1] || "";
        }
        if (this.form.weaveJobCode.indexOf("%") != -1) {
          this.form.weaveJobCode = this.form.weaveJobCode.split("%")[1];
        }
        if (this.form.salPoNo.indexOf("%") != -1) {
          this.form.salPoNo = this.form.salPoNo.split("%").join("");
        }
        // if (this.form.colorCode.indexOf("%") != -1) {
        //   this.form.colorCode = this.form.colorCode.split("%").join("");
        // }
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    print() {
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeRunJob/createBleadyeRunJobPdf?id=" +
        this.detail.runJobId;
    },
    audit() {
      this.$tip
        .cofirm("是否确定通过审核选中的数据?", {})
        .then(() => {
          this.selectList.forEach((item, i) => {
            item.auditState = 1;
            update(item).then((res) => {
              if (i == this.selectList.length - 1) {
                this.$tip.success(this.$t("public.sccg"));
                this.query();
              }
            });
          });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    copyEvent() {
      this.isAdd = true;
      this.splitType = "A";
      this.copyC = true;
      this.isSplit = false;
      this.dialogVisible = true;
    },
    add() {
      this.isSplit = false;
      this.isAdd = true;
      this.copyC = false;
      this.dialogVisible = true;
    },
    splitVatNo(type) {
      this.splitType = type;
      this.isSplit = true;
      this.isAdd = true;
      this.copyC = true;
      this.dialogVisible = true;
    },
    del() {
      // if (parent.userID != this.detail.serviceOperator) {
      //   this.$tip.warning("当前用户没有权限删除该记录!");
      //   return;
      // }
      // if (this.detail.auditState) {
      //   this.$tip.warning("通过审核的数据不可删除,请联系主管取消审核!");
      //   return;
      // }
      this.$tip
        .cofirm("是否确定删除选中的数据?", this, {})
        .then(() => {
          this.wloading = true;
          this.selectList.forEach((item, i) => {
            del(item.runJobId).then((res) => {
              getDye({ vatNo: item.vatNo }).then((dye) => {
                if (dye.data.length) {
                  delDye(dye.data[0].bleadyeJobId).then((delDye) => {});
                }
                if (i == this.selectList.length - 1) {
                  setTimeout(() => {
                    this.$tip.success("删除成功!");
                    this.wloading = false;
                    this.query();
                  }, 200);
                }
              });
            });
          });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    rowStyle({ row, column, rowIndex }) {
      if (row.runState == "0") {
        return {
          backgroundColor: "#FBD295",
          // color:'#fff'
        };
      } else if (row.auditState === 0) {
        return {
          backgroundColor: "#F56C6C",
        };
      }
    },
    handleRowDBLClick(val) {
      this.isAdd = false;
      this.detail = val;
      this.dialogVisible = true;
    },
    cellClick(val) {
      this.detail = val;
    },
    selectionChange(val) {
      this.selectList = val;
    },
    pdfClose() {
      if (this.detail.runState == "1") {
        this.$tip
          .cofirm(
            "是否更新打印状态(có cập nhật trạng thái in mới không)?",
            this,
            {}
          )
          .then(() => {
            this.detail.printDate = this.$getNowTime("datetime");
            this.detail.modifiDate = this.detail.printDate;
            this.detail.runState = "3";
            update(this.detail).then((res) => {
              if (res.data.code == 200) {
                this.$tip.success("保存成功!");
                this.pdfDlg = false;
              } else {
                this.$tip.error(res.data.msg);
              }
            });
          })
          .catch(() => {
            this.pdfDlg = false;
          });
      }
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.crud.doLayout();
    });
  },
  created() {},
  mounted() {
    this.query();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#runJob
  .avue-crud__tip
    display none !important
    height 0px !important
  .avue-crud__menu
    height 35px !important
.el-dropdown-menu--mini .el-dropdown-menu__item
  font-size 15px !important
  line-height 28px !important
</style>
