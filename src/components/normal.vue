<!--
 * @Author: Lyl
 * @Date: 2021-06-08 17:50:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 08:09:33
 * @Description: 
-->
<template>
  <div id="com-normal">
    <view-container
      :title="title + '管理'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button
          type="success"
          @click="handleRowDBLClick(chooseData)"
          :disabled="Object.keys(chooseData).length == 0"
          >{{ $t("public.update") }}</el-button
        >
        <el-button type="primary" @click="add">{{
          $t("public.add")
        }}</el-button>
        <el-button
          type="danger"
          @click="del"
          :disabled="Object.keys(chooseData).length == 0"
          >{{ $t("public.del") }}</el-button
        >
        <el-button type="primary" @click="query">{{
          $t("public.query")
        }}</el-button>
        <el-button v-if="canPrint" type="success" @click="print">{{
          $t("public.print")
        }}</el-button>
        <span>张数</span>
        <el-input
          v-model="sheetNum"
          type="number"
          max="8"
          min="1"
          @input="numberChange"
          @change="numberChange"
          style="width: 70px; margin: 0 5px"
        ></el-input>
               
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          @on-load="query"
          @current-row-change="cellClick"
          @row-dblclick="handleRowDBLClick"
          :page.sync="page"
        ></avue-crud>
      </div>
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
        <embed
          id="pdf"
          style="width: 100vw; height: calc(100vh - 80px)"
          :src="pdfUrl"
        />
      </view-container>
    </el-dialog>
    <el-dialog
      :visible.sync="visibleDlg"
      id="colorMng_Dlg"
      fullscreen
      width="100%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :element-loading-text="$t('public.loading')"
      v-loading="dLoading"
    >
      <view-container :title="title + '维护'">
        <div class="btnList">
          <el-button type="success" @click="save(dlgForm)">{{
            $t("public.save")
          }}</el-button>
          <el-button type="warning" @click="visibleDlg = false">{{
            $t("public.close")
          }}</el-button>
        </div>
        <div class="formBox" style="height: calc(100vh - 120px)">
          <avue-form
            ref="dlgForm"
            :option="crudOp"
            v-model="dlgForm"
          ></avue-form>
        </div>
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import { webSocket } from "@/config/index.js";
export default {
  name: "",
  props: {
    title: String,
    formOp: Object,
    crudOp: Object,
    api: Object,
    addParams: Object,
    sortObj: String,
    apiParams: Object,
    pdfUrl: String,
    canPrint: Boolean
  },
  data() {
    return {
      wLoading: false,
      form: {},
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      chooseData: {},
      oldData: {},
      visibleDlg: false,
      dlgForm: {},
      dLoading: false,
      pdfDlg:false,
      prsocket:null,
      sheetNum:1
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      this.form[this.apiParams.sort] = "!^%" + (this.form[this.apiParams.sort] ? this.form[this.apiParams.sort] : "");
      this.api
        .get(
          Object.assign(this.form, {
            rows: this.page.pageSize,
            start: this.page.currentPage,
          })
        )
        .then((res) => {
          let resData = res.data;
          this.crud = resData.records;
          this.page.total = resData.total;
          this.crud.forEach((item, i) => {
            item.index = i + 1;
          });
          if (this.crud.length > 0) {
            this.$refs.crud.setCurrentRow(this.crud[0]);
          }
          if (this.form[this.apiParams.sort].indexOf("!^%") != -1) {
            this.form[this.apiParams.sort] = this.form[this.apiParams.sort].split("!^%")[1] || "";
          }
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        })
        .catch((e) => {
          console.log(e);
          this.wLoading = false;
        });
    },
    save(val) {
      if (val[this.apiParams.save]) {
        this.api
          .update(val)
          .then((res) => {
            if (res.data.code == 200) {
              this.query();
              this.dLoading = false;
              this.$tip.success("保存成功!");
            }
          })
          .catch((e) => {
            this.$tip.error(e);
          });
      } else {
        this.api
          .add(val)
          .then((res) => {
            if (res.data.code == 200) {
              this.dlgForm.carriageStorageId = res.data.data;
              this.query();
              this.dLoading = false;
              this.$tip.success("保存成功!");
            }
          })
          .catch((e) => {
            this.$tip.error(e);
          });
      }
    },
    cellClick(val) {
      this.chooseData = JSON.parse(JSON.stringify(val));
    },
    handleRowDBLClick(val) {
      this.visibleDlg = true;
      this.chooseData = val;
      this.dlgForm = JSON.parse(JSON.stringify(val));
    },
    add() {
      this.visibleDlg = true;
      for (let key in this.dlgForm) {
        delete this.dlgForm[key];
      }
      this.dlgForm = this.addParams;
    },
    del() {
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle11") +
            this.chooseData[this.apiParams.delTle] +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          this.api
            .del(this.chooseData[this.apiParams.save])
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
    print(){
      this.wLoading = true
      if (this.prsocket.readyState == 3 || this.prsocket.readyState == 0) {
        this.setPrint()
        return;
      }
      if (this.chooseData[this.apiParams.save]) {
        for (let i = 0; i < this.sheetNum; i++) {
           this.prsocket.send(`${this.apiParams.printId}:` + this.chooseData[this.apiParams.save]);
           if(i == this.sheetNum - 1){
             this.$tip.success("已全部发送打印请求!");
           }
        }
        this.chooseData.printCount = Number( this.chooseData.printCount) +  Number(this.sheetNum)
        this.chooseData.printTime = this.$getNowTime("datetime");
        this.chooseData.printer = parent.userID
        let data = JSON.parse(JSON.stringify(this.chooseData))
        this.api
          .update(data)
          .then((res) => {
            if (res.data.code == 200) {
              this.query();
              this.wLoading = false;
            }
          })
          .catch((e) => {
            this.wLoading = false;
            this.$tip.error(e);
          });
      } else {
        this.wLoading = false
        this.$tip.error("请选择需要打印的载具!");
      }
   
      // this.pdfDlg = true;
      // this.pdfUrl =
      //   process.env.API_HOST +
      //   "/api/proBleadyeRunJob/createBleadyeRunJobPdf?id=" +
      //   this.detail.cardId;
    },
    numberChange() {
      if (this.sheetNum > 8) {
        this.sheetNum = 8;
      } else if (this.sheetNum < 1) {
        this.sheetNum = 1;
      }
    },
    setPrint(){
      this.prsocket = null;
      webSocket.setPrint(this);
      this.prsocket.onmessage = function (e) {};
      this.wLoading = false
      this.prsocket.onerror = function(e) {
         alert("称重服务离线，请打开称重应用!")
      } 
      
    }
  },
  created() {
     if(this.canPrint){
        this.setPrint()
     }

  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#com-normal {
}
</style>