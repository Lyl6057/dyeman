<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-02-03 17:26:50
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
        <el-button type="success" @click="print">打印</el-button>
        <el-button type="primary" @click="setPreview">预览</el-button>
        <el-button type="warning" @click="close">关闭</el-button>
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
import { getCodeSupply } from "./api";
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
      code: getDIC("bas_companyCode"),
      previewData: {},
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
            this.$tip.success("保存成功!");
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
            this.$tip.success("保存成功!");
          })
          .catch((err) => {
            this.wLoading = false;
            this.$tip.error("保存失败!" + err);
          });
      }
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
              // delLabTapcolor(this.detail.labTapcoloroid)
              //   .then((res) => {
              //     if (res.data.code === 200) {
              //       this.$tip.success("删除成功");
              //       this.crud.splice(this.detail.index - 1, 1);
              //       this.query();
              //     } else {
              //       this.$tip.error("删除失败");
              //     }
              //   })
              //   .catch((err) => {
              //     this.$tip.error("删除失败!");
              //   });

              setTimeout(() => {
                this.wLoading = false;
              }, 500);
            })
            .catch((err) => {
              this.$tip.warning("取消操作");
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