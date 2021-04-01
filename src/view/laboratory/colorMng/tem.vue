<template>
  <div id="colorMng_Tem">
    <view-container
      title="色号资料管理"
      element-loading-text="拼命加载中"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <!-- <view-container title="色号资料">
        <div class="crudBox" style="margin-top: 5px">
          <avue-crud
            ref="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
            @on-load="query"
          ></avue-crud>
        </div>
      </view-container> -->
    </view-container>
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      :dlgWidth="dlgWidth"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import { popupForm } from "./data";
import {
  getDepth,
  getCodeSupply,
  addLabTapcolor,
  updateLabTapcolor,
} from "./api";
import choice from "@/components/choice";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupply } from "@/api/index";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  components: {
    choice: choice,
  },
  data() {
    return {
      wLoading: false,
      formOp: popupForm(this),
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      minRows: 1,
      maxRows: 5,
      choiceV: false,
      choiceTle: "选择客戶",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      lightDic: [],
      dlgWidth: "60%",
      codeSupplyNum: 0,
      refresh: false,
      code: getDIC("bas_companyCode"),
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      if (this.isAdd) {
        getCodeSupply().then((res) => {
          this.codeSupplyNum = preFixInt(Number(res.data.maxSn) + 1, 6);
          this.form = {
            salColorfresh: "1",
            colorDate: this.getNowTime(),
            colorState: false,
            doubleFlag: false,
          };
          this.wLoading = false;
        });
      } else {
        this.form = this.detail;
        setTimeout(() => {
          this.lights();
          this.wLoading = false;
        }, 500);
      }
    },
    save() {
      if (this.form.colorNo === "" || this.form.colorDepth === "") {
        this.$tip.error("色号/颜色深度不能为空!");
        return;
      } else if (
        this.form.custColorBh === "" ||
        this.form.colorBh === "" ||
        this.form.colorChn === ""
      ) {
        this.$tip.error("客色号/颜色编号/颜色中文不能为空!");
        return;
      } else if (this.form.custCode === "" || this.form.colorDate === "") {
        this.$tip.error("客户/日期不能为空!");
        return;
      } else if (this.form.fabCode === "" || this.form.fabricDesc === "") {
        this.$tip.error("面料/面料中文描述不能为空!");
        return;
      } else if (
        this.form.colorLights === "" ||
        this.form.lapDyetype === "" ||
        this.form.colorStandard === ""
      ) {
        this.$tip.error("第一光源 /染色类别/对色标准不能为空!");
        return;
      } else if (this.form.recN0 === "") {
        this.$tip.error("档案编号不能为空!");
        return;
      }
      this.wLoading = true;
      this.refresh = true;
      if (this.form.labTapcoloroid) {
        // update
        updateLabTapcolor(this.form)
          .then((res) => {
            this.wLoading = false;
            this.$tip.success(this.$t("public.bccg"));
          })
          .catch((err) => {
            this.wLoading = false;
            this.$tip.error("保存失败!" + err);
          });
      } else {
        // add
        if (this.form.deputyLights.length > 0) {
          let data = "";
          this.form.deputyLights.forEach((item, i) => {
            if (i === this.form.deputyLights.length - 1) {
              data += item;
            } else {
              data += item + ",";
            }
          });
          this.form.deputyLights = data;
        }
        addLabTapcolor(this.form)
          .then((res) => {
            baseCodeSupply({ code: "color_num" }).then((res) => {});
            this.form.labTapcoloroid = res.data.data;
            this.wLoading = false;
            this.$tip.success(this.$t("public.bccg"));
          })
          .catch((err) => {
            this.wLoading = false;
            this.$tip.error("保存失败!" + err);
          });
      }
    },
    depth() {
      // 监听颜色深度变化
      this.$nextTick(() => {
        if (this.form.colorDepth === "") {
          this.form.colorNo = "";
          this.formOp.column[2].minRows = 0;
          this.form.dyeWeight = "";
          this.formOp.column[2].disabled = true;
          return;
        }
        this.formOp.column[2].disabled = false;
        switch (this.form.colorDepth) {
          case "TS":
            this.form.dyeWeight = 6;
            this.formOp.column[2].minRows = 6;
            this.formOp.column[2].maxRows = 100;
            break;
          case "ZS":
            this.form.dyeWeight = 2.5;
            this.formOp.column[2].minRows = 2.5;
            this.formOp.column[2].maxRows = 4;
            break;
          case "S":
            this.form.dyeWeight = 4;
            this.formOp.column[2].minRows = 4;
            this.formOp.column[2].maxRows = 6;
            break;
          case "Z":
            this.form.dyeWeight = 1.2;
            this.formOp.column[2].minRows = 1.2;
            this.formOp.column[2].maxRows = 2.5;
            break;
          case "Q":
            this.form.dyeWeight = 0;
            this.formOp.column[2].minRows = 0;
            this.formOp.column[2].maxRows = 1.2;
            break;
          default:
            this.form.dyeWeight = 0;
            this.formOp.column[2].minRows = 0;
            this.formOp.column[2].maxRows = 100;
            break;
        }
        getDepth({
          codeId: this.form.colorDepth,
          codeTableId: "bas_colorclTepth",
        }).then((res) => {
          this.form.colorNo =
            this.code[0].label + res.data[0].reserved1 + this.codeSupplyNum;
        });
      });
    },
    lights(val) {
      this.$nextTick(() => {
        if (this.form.colorLights != "" && this.form.colorLights != null) {
          this.$set(this.formOp.column[18], "disabled", false);
          // this.form.deputyLights = "";
          let data = JSON.parse(JSON.stringify(this.formOp.column[18].dicData));
          data.forEach((item, i) => {
            // this.$nextTick(() => {
            if (this.form.colorLights === item.value) {
              // this.$set(item, "disabled", true);
              item.disabled = true;
            } else {
              // this.$set(item, "disabled", false);
              item.disabled = false;
            }
            // });
            if (i === data.length - 1) {
              // this.formOp.column[18].dicData = data;
              this.$set(this.formOp.column[18], "dicData", data);
            }
          });
        } else {
          this.$set(this.form, "deputyLights", "");
          this.$set(this.formOp.column[18], "disabled", true);
        }
      });
      // else {
      //   console.log(this.form.deputyLights);
      //   if (this.form.deputyLights != "") {
      //     this.$nextTick(() => {
      //       this.form.deputyLights.forEach((items, j) => {
      //         this.formOp.column[15].dicData.forEach((item, i) => {
      //           if (items === item.value && !item.disabled) {
      //             this.$set(item, "disabled", true);
      //           }
      //           if (items != item.value && !item.disabled) {
      //             this.$set(item, "disabled", false);
      //           }
      //         });
      //       });
      //     });
      //   }
      // }
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      if (this.choiceTle === "选择客戶") {
        this.form.custCode = val.custCode;
        this.form.custName = val.custName;
      }
      if (this.choiceTle === "胚布編碼") {
        this.form.fabCode = val.calicoId;
        this.form.fabricDesc = val.gustCalicoName;
      }
      if (this.choiceTle === "选择色号信息") {
        this.form.colorBh = val.colorNo;
        this.form.colorChn = val.colorName;
      }
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
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
    height: calc(100vh - 125px) !important;
  }
}

#colorMng_Dlg {
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