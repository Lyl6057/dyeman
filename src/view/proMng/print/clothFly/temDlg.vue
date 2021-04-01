<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-01 15:24:47
 * @Description: 
-->
<template>
  <div id="colorMng_Tem">
    <view-container
      title="布飞打印配置"
      element-loading-text="拼命加载中"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="print" :disabled="printCtr"
          >打印</el-button
        >
        <el-button type="primary" @click="setPreview">预览</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <view-container title="打印预览(仅供参考)">
        <pre-view ref="preview" :detail="previewData"></pre-view>
      </view-container>
    </view-container>
  </div>
</template>
<script>
import { mainCrud } from "./data";
import { getCodeSupply, addBf, printBf } from "./api";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupplyEx } from "@/api/index";
import preview from "./preview";
export default {
  name: "",
  props: {
    detail: Object,
  },
  components: {
    preView: preview,
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
      choiceV: false,
      choiceTle: "选择客戶",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      dlgWidth: "60%",
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      this.form = this.detail;
      baseCodeSupplyEx({ code: "cloth_fly" }).then((res) => {
        this.form.bph = res.data.data;
        if (this.form.realEnd === "" || this.form.realEnd === null) {
          this.form.nowDate = this.form.planEnd.split(" ")[0];
        } else {
          this.form.nowDate = this.form.realEnd.split(" ")[0];
        }
        // this.form.nowDate = this.getNowTime();
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      });
    },
    setPreview() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          this.previewData = JSON.parse(JSON.stringify(this.form));
          done();
        } else {
          this.$tip.error("请补充打印信息!");
          return;
        }
      });
    },
    print() {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          this.$tip
            .cofirm(
              "是否确定打印排单号为 【 " + this.detail.stepCode + " 】 的数据?",
              this,
              {}
            )
            .then(() => {
              this.wLoading = true;
              let arr = [];
              for (let i = 0; i < this.form.ps; i++) {
                arr.push({
                  breadth: this.form.actualWidth,
                  clothWeight: 100,
                  eachNumber: this.form.qsph + i,
                  fabricName: this.form.calicoType,
                  gramWeight: this.form.weight,
                  isPrinted: false,
                  loomNo: this.form.equipmentCode,
                  workNo: this.form.zjgh,
                  madeDate: this.$getNowTime(),
                  noteCode: this.form.bph + (this.form.qsph + i),
                  poNo: this.form.poNo,
                  printedTime: this.$getNowTime(),
                  proBatchNumber: this.form.spi,
                  proColor: this.form.colorName,
                  proName: this.form.workName,
                  schId: this.form.salSchId,
                  // lenUnit: "1",
                  machineCode: this.form.stepCode,
                  // proSpec: "test",
                  salPooid: this.form.salSchId,
                  tempId: this.form.salSchId,
                  weightUnit: this.form.workUnit,
                  // clothLength: 200,
                  // customerName: "test",
                });
              }
              let add = (item, i) => {
                return new Promise((resolve, reject) => {
                  addBf(item)
                    .then((res) => {
                      item.noteId = res.data.data;
                      resolve();
                    })
                    .catch((err) => {
                      this.$tip.warning("打印失败");
                      this.wLoading = false;
                    });
                });
              };
              let promiseArr = arr.map((item, i) => {
                return add(item, i);
              });
              Promise.all(promiseArr).then((res) => {
                baseCodeSupply({ code: "cloth_fly" }).then((res) => {});
                arr.forEach((item, i) => {
                  printBf(item.noteId)
                    .then((res) => {})
                    .catch((err) => {
                      this.$tip.warning("打印失败");
                      this.wLoading = false;
                    });
                  if (i === arr.length - 1) {
                    setTimeout(() => {
                      this.printCtr = true;
                      this.wLoading = false;
                    }, 500);
                  }
                });
              });
            })
            .catch((err) => {
              this.$tip.warning(this.$t("public.qxcz"));
            });
          done();
        } else {
          this.$tip.error("请补充打印信息!");
          return;
        }
      });
    },
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
  // .formBox {
  // height: calc(100vh - 125px) !important;
  // }
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