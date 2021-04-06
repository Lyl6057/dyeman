<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-06 17:07:02
 * @Description: 
-->
<template>
  <div id="colorMng_Tem">
    <view-container
      :title="(isAdd ? '新增' : '修改') + '織造通知單'"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="print" :disabled="printCtr">{{
          $t("public.save")
        }}</el-button>
        <!-- <el-button type="primary" @click="setPreview">预览</el-button> -->
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <!-- <view-container title="打印预览(仅供参考)">
        <pre-view ref="preview" :detail="previewData"></pre-view>
      </view-container> -->
    </view-container>
    <el-dialog :visible.sync="visible" fullscreen append-to-body id="viewDlg">
      <view-container title="選擇訂單">
        <div class="btnList">
          <el-button @click="check" type="success">{{
            $t("public.choose")
          }}</el-button>
          <el-button @click="query" type="primary">{{
            $t("public.query")
          }}</el-button>
          <el-button @click="visible = false" type="warning">{{
            $t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-form
            ref="form"
            :option="dlgFormOp"
            v-model="dlgForm"
          ></avue-form>
        </div>
        <div class="crudBox">
          <avue-crud
            ref="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
            @on-load="query"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
          ></avue-crud>
        </div>
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import { mainCrud, dlgForm, dlgCrud } from "./data";
import { add, update, getPo } from "./api";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupplyEx } from "@/api/index";
import choice from "@/components/choice";
import preview from "./preview";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  components: {
    preView: preview,
    choice: choice,
  },
  data() {
    return {
      wLoading: false,
      formOp: mainCrud(this),
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      dlgWidth: "60%",
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
      visible: false,
      loading: false,
      crudOp: dlgCrud(this),
      crud: [],
      dlgFormOp: dlgForm(this),
      dlgForm: {},
    };
  },
  watch: {},
  methods: {
    getData() {
      if (this.isAdd) {
        this.$nextTick(() => {
          this.form.created = this.$store.state.userOid;
        });
      } else {
        this.wLoading = true;
        this.form = this.detail;
        baseCodeSupplyEx({ code: "cloth_fly" }).then((res) => {
          this.form.bph = res.data.data;
          // if (this.form.realEnd === "" || this.form.realEnd === null) {
          //   this.form.nowDate = this.form.planEnd.split(" ")[0];
          // } else {
          //   this.form.nowDate = this.form.realEnd.split(" ")[0];
          // }
          // this.form.nowDate = this.getNowTime();
          setTimeout(() => {
            this.wLoading = false;
          }, 500);
        });
      }
    },
    print() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          done();
        } else {
          this.$tip.error("请补充通知單信息!");
          return;
        }
      });
    },
    query() {
      this.loading = true;
      for (let key in this.dlgForm) {
        if (this.dlgForm[kety] === "") {
          delete this.dlgForm[kety];
        }
      }
      getPo(
        Object.assign(this.dlgForm, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data.rows;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    handleRowDBLClick(val) {},
    cellClick(val) {},
    check() {},
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    getNowTime() {
      const time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mi = time.getMinutes();
      let s = time.getSeconds();
      m = m < 10 ? `0${m}` : m;
      d = d < 10 ? `0${d}` : d;
      h = h < 10 ? `0${h}` : h;
      mi = mi < 10 ? `0${mi}` : mi;
      s = s < 10 ? `0${s}` : s;
      return `${y}-${m}-${d}`;
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#colorMng_Tem {
  .formBox {
    height: 100vh !important;
  }
}

#colorMng_Dlg {
  .is-fullscreen {
    overflow: hidden !important;
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    top: 3px;
    font-size: 18px;
    font-weight: bold;
    z-index: 9;
  }

  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-tag--mini {
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    font-size: 14px;
  }

  .el-select .el-tag__close.el-icon-close {
    right: -5px;
    height: 18px;
    width: 18px;
    line-height: 18px;
  }

  .avue-form .el-input--mini input {
    height: 35px !important;
    line-height: 35px;
  }
}
</style>