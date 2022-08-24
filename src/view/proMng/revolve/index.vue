<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-23 09:58:31
 * @Description:
-->
<template>
  <div id="runJob">
    <view-container title="染整生产运转单" v-loading="wloading" element-loading-text="拼命加载中...">
      <el-row class="btnList">
        <el-tooltip class="item" effect="dark" content="cập nhật" placement="top-start">
          <el-button type="success" :disabled="!detail.runJobId" @click="handleRowDBLClick(detail)">{{ this.$t("public.update") }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="thêm mới " placement="top-start">
          <el-button type="primary" @click="add">{{
            this.$t("public.add")
          }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="xóa" placement="top-start">
          <el-button type="danger" :disabled="!selectList.length" @click="del">{{ this.$t("public.del") }}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content=" in" placement="top-start">
          <el-button type="primary" @click="print" :loading="wloading" :disabled="detail.auditState != 1">打印</el-button>
        </el-tooltip>
        <el-button type="primary" @click="exhaustPrint" :loading="wloading">排缸咭</el-button>
        <el-tooltip class="item" effect="dark" content="copy" placement="top-start">
          <el-button type="warning" :disabled="!detail.runJobId" @click="copyEvent" :loading="wloading">复制</el-button>
        </el-tooltip>

        <el-dropdown split-button type="warning" @click="splitVatNo('A')" :loading="wloading" :disabled="!detail.runJobId" style="margin: 0 10px">
          拆缸
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="splitVatNo('A')">A 改单拆缸</el-dropdown-item>
            <el-dropdown-item @click.native="splitVatNo('R')">R 改染拆缸</el-dropdown-item>
            <el-dropdown-item @click.native="splitVatNo('W')">W 废布拆缸</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" @click="handleOpenSchedule">排期</el-button>
        <el-tooltip class="item" effect="dark" content="tìm kiếm" placement="top-start">
          <el-button type="primary" @click="query">{{  this.$t("public.query") }}</el-button>
        </el-tooltip>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" id="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" :row-style="rowStyle" @on-load="query" @row-dblclick="handleRowDBLClick" @current-row-change="cellClick" @selection-change="selectionChange">
        </avue-crud>
      </el-row>
      <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" fullscreen width="100%" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
        <tem-dlg v-if="dialogVisible" ref="tem" :detail="detail" :isAdd="isAdd" :copyC="copyC" :isSplit="isSplit" :splitType="splitType" @close="dialogVisible = false" @refresh="query"></tem-dlg>
      </el-dialog>
      <el-dialog id="colorMng_Dlg" :visible.sync="pdfDlg" fullscreen width="100%" append-to-body :close-on-click-modal="false" :close-on-press-escape="false" @close="pdfClose">
        <view-container title="打印預覽">
          <embed id="pdf" style="width: 100vw; height: calc(100vh - 80px)" :src="pdfUrl" />
        </view-container>
      </el-dialog>
    </view-container>
    <!-- 排期工序 -->
    <schedule-detail ref="scheduleDetail" :scheduleType="2" :runJobInfo="detail"></schedule-detail>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, update, del, delDye, getDye } from "./api";
import tem from "./temDlg";
import scheduleDetail from "./schedule-detail.vue";
export default {
  name: "runJob",
  components: {
    temDlg: tem,
    scheduleDetail
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
      isExhaust: false,
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
      hasFinied: 0,
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
      let params = {
        vatNo: "%" + (this.form.vatNo || ""),
        weaveJobCode: "%" + (this.form.weaveJobCode || ""),
        salPoNo: "%" + (this.form.salPoNo || ""),
        colorCode: "%" + (this.form.colorCode || ""),
        serviceOperator: "%" + (this.form.serviceOperator || ""),
        fabName: "%" + (this.form.fabName || ""),
      };
      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          pages: this.page.currentPage,
          workDate: this.form.workDate,
          custCode: this.form.custCode,
          jobType: 2,
          delFlag: 0,
          dataSortRules: "workDate|desc,vatNo",
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        this.crud.length > 0 && this.$refs.crud.setCurrentRow(this.crud[0]);

        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    async handleOpenSchedule(){
      this.loading = true;
      this.$refs.scheduleDetail.dialogVisible = true;
      await this.$nextTick();
      this.$refs.scheduleDetail.handleQuery(); // 初始化排期信息
      this.loading = false;
    },
    exhaustPrint() {
      this.pdfDlg = true;
      this.isExhaust = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proBleadyeRunJob/smallCard?id=" +
        this.detail.runJobId;
    },
    print() {
      this.pdfDlg = true;
      this.isExhaust = false;
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
      if (this.detail.runState == "1" && !this.isExhaust) {
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
#runJob {
  .avue-crud__tip {
    display: none !important;
    height: 0px !important;
  }

  .avue-crud__menu {
    height: 35px !important;
  }
}

.el-dropdown-menu--mini .el-dropdown-menu__item {
  font-size: 15px !important;
  line-height: 28px !important;
}
</style>
