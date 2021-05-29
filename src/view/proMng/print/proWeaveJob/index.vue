<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-29 08:42:19
 * @Description: 
-->
<template>
  <div id="clothFlyPrint">
    <view-container
      title="織造通知單打印"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
    >
      <el-row class="btnList">
        <el-button
          type="success"
          :disabled="!detail.weaveJobId"
          @click="handleRowDBLClick(detail)"
          >{{ this.$t("public.update") }}</el-button
        >
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="danger" :disabled="!detail.weaveJobId" @click="del">{{
          this.$t("public.del")
        }}</el-button>
        <el-button type="primary" @click="print" :loading="wloading"
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
          v-if="dialogVisible"
        ></tem-dlg>
      </el-dialog>
    </view-container>
    <el-dialog
      id="colorMng_Dlg"
      :visible.sync="pdfDlg"
      fullscreen
      width="100%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
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
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del, print } from "./api";
import XlsxTemplate from "xlsx-template";
import JSZipUtils from "jszip-utils";
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
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.crud.forEach((item, i) => {
          item.custName = item.custCode;
          item.amount = item.amount.toFixed(2);
          item.index = i + 1;
        });
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    print() {
      // this.$tip
      //   .cofirm(
      //     "是否確定打印生產單號為【 " +
      //       this.detail.weaveJobCode +
      //       this.$t("iaoMng.delTle2"),
      //     this,
      //     {}
      //   )
      //   .then(() => {
      //     print({
      //       id: this.detail.weaveJobId,
      //       weaveJobCode: this.detail.weaveJobCode,
      //     }).then((res) => {
      //       if (res.data.msg === "打印成功") {
      //         this.wloading = true;
      //         setTimeout(() => {
      //           this.wloading = false;
      //           this.$tip.success(res.data.msg);
      //         }, 2000);
      //       } else {
      //         this.wloading = true;
      //         setTimeout(() => {
      //           this.wloading = false;
      //           this.$tip.error(res.data.msg);
      //         }, 500);
      //       }
      //     });
      //   })
      //   .catch((err) => {
      //     this.$tip.warning(this.$t("public.qxcz"));
      //   });
      this.pdfDlg = true;
      this.pdfUrl =
        process.env.API_HOST +
        "/api/proWeaveJob/prinEntityPdf?id=" +
        this.detail.weaveJobId;
    },
    async print2() {
      console.log(this.input);
      return;
      try {
        //获得Excel模板的buffer对象

        const exlBuf = await JSZipUtils.getBinaryContent(
          "../../../../../static/zztzd.xlsx"
        );
        var template = new XlsxTemplate(exlBuf);
        var sheetNumber = "織造通知單";

        // Set up some placeholder values matching the placeholders in the template
        template.substitute(sheetNumber, this.detail);
        var out = template.generate({ type: "blob" });
        // let page = window.open("../../../../../static/test.pdf"); //这个url其实是这个接口的地址，参数什么的使用get方式将其带上。如果设置了代理，就在前面加上你的代理就行，如：我设置代理是用了'/api'；所以url=`/api/地址`
        setTimeout(() => {
          window.print("../../../../../static/test.pdf"); //这一步就是在新窗口调出打印机
        }, 500);
        // var fun1 = function () {
        //   return new Promise((resolve, reject) => {
        //     saveAs(out, "織造通知單.xlsx");
        //     resolve();
        //   });
        // };
        // fun1().then((res) => {
        //   console.log(res);
        // });
      } catch (error) {
        console.log(error);
      }
      // const html = window.document.getElementById("crud").innerHTML;
      // const win = window.open("", "打印", "height=1100,width=1100");
      // win.document.write("<html><head><title></title>");
      // win.document.write("</head><body >");
      // win.document.write(html);
      // win.document.write("</body></html>");
      // win.print();
    },
    tableToExcel() {
      (template =
        '<html><head><meta charset="UTF-8"></head><body><table  border="1">{table}</table></body></html>'),
        (base64 = function (s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        }),
        (format = function (s, c) {
          return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
          });
        });
      return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = {
          worksheet: name || "Worksheet",
          table: table.innerHTML,
        };
        window.location.href = uri + base64(format(template, ctx));
      };
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    del() {
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle7") +
            this.detail.weaveJobCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.weaveJobId)
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
  },
  created() {},
  mounted() {
    this.query();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#name {
}
</style>