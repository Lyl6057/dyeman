<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-17 16:03:56
 * @Description: 
-->
<template>
  <div id="finalizeDesign">
    <view-container
      title="唛头打印"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
    >
      <el-row class="btnList">
        <el-button
          type="success"
          :disabled="!detail.markId"
          @click="handleRowDBLClick(detail)"
          >{{ this.$t("public.update") }}</el-button
        >
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="danger" :disabled="!detail.markId" @click="del">{{
          this.$t("public.del")
        }}</el-button>
        <el-button
          type="primary"
          @click="print"
          :loading="wloading"
          :disabled="!detail.markId"
          >打印</el-button
        >
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>

        <!-- <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button> -->
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
          @on-load="query"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
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
        v-if="dialogVisible"
      >
        <tem-dlg
          ref="tem"
          :detail="detail"
          :isAdd="isAdd"
          @close="dialogVisible = false"
          @refresh="query"
          @print="print"
          v-if="dialogVisible"
        ></tem-dlg>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del } from "./api";
import { webSocket } from "@/config/index.js";
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
      pdfDlg: false,
      pdfUrl: "",
      prsocket: null,
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
      // this.form.vatNo = "!^%" + (this.form.vatNo ? this.form.vatNo : "");
      // this.form.markNo = "%" + (this.form.markNo ? this.form.markNo : "");
      // this.form.poNo = "%" + (this.form.poNo ? this.form.poNo : "");
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      )
        .then((res) => {
          this.crud = res.data.records;
          this.crud.forEach((item, i) => {
            // item.custName = item.custCode;
            item.index = i + 1;
          });
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          this.page.total = res.data.total;
          // if (this.form.vatNo.indexOf("!^%") != -1) {
          //   this.form.vatNo = this.form.vatNo.split("!^%")[1] || "";
          // }
          // if (this.form.markNo.indexOf("%") != -1) {
          //   this.form.markNo = this.form.markNo.split("!^%")[1] || "";
          // }
          // if (this.form.poNo.indexOf("%") != -1) {
          //   this.form.poNo = this.form.poNo.split("!^%")[1] || "";
          // }
          this.loading = false;
        })
        .catch((e) => {
          this.$tip.error(e);
          this.loading = false;
          console.log(e);
        });
    },
    print() {
      if (this.prsocket == null || this.prsocket.readyState == 3) {
        this.$tip.error("打印应用未启动，请打开后重新进入此页面!");
        return;
      }
      this.wLoading = true;
      if (this.detail.markCount) {
        for (let i = 0; i < this.detail.markCount; i++) {
          this.prsocket.send("shipMark:" + this.detail.markId);
        }
      } else {
        this.prsocket.send("shipMark:" + this.detail.markId);
      }

      setTimeout(() => {
        this.wLoading = false;
        this.$tip.success("已发送打印请求!");
      }, 200);
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    del() {
      this.$tip
        .cofirm(
          "是否删除缸号为【 " + this.detail.vatNo + this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.markId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.query();
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
      this.dialogVisible = true;
      this.isAdd = false;
      this.detail = val;
      // this.print();
    },
    cellClick(val) {
      this.detail = val;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
    setPrint() {
      webSocket.setPrint(this);
    },
  },
  created() {},
  mounted() {
    this.query();
  },
  beforeDestroy() {},
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      vm.setPrint();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.prsocket = null;
    next();
  },
};
</script>
<style lang='stylus'>
#finalizeDesign {
}
</style>