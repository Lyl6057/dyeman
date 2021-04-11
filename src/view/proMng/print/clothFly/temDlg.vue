<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-09 10:00:02
 * @Description: 
-->
<template>
  <div id="colorMng_Tem">
    <view-container
      title="布飞打印配置"
      :element-loading-text="$t('public.loading')"
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
import { getCodeSupply, addBf, printBf, getYarn } from "./api";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
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
      choiceTle: this.$t("choicDlg.xzkh"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      dlgWidth: "60%",
      codeSupplyNum: 0,
      previewData: {},
      printCtr: false,
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      id:
        process.env.API_HOST +
        "/api/proClothNote/preview?id=" +
        "021308a1-fe63-4336-b234-e8f661ee669e",
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      this.form = this.detail;
      baseCodeSupplyEx({ code: "cloth_fly" }).then((res) => {
        this.form.ps = (
          Number(this.form.amount) / Number(this.form.pz)
        ).toFixed(0);
        this.form.nowDate = this.$getNowTime("date");
        getYarn({
          proWeaveJobFk: this.form.weaveJobId,
        }).then((yarn) => {
          this.formOp.column[10].dicData = yarn.data;
          if (yarn.data.length > 1) {
            this.form.bph =
              this.form.custCode +
              res.data.data +
              "-" +
              this.$preFixInt(yarn.data.length, 2) +
              this.form.mathineCode;
          } else {
            this.form.bph =
              this.form.custCode + res.data.data + this.form.mathineCode;
          }
        });
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
              "是否确定打印生產单号为 【 " +
                this.detail.weaveJobCode +
                this.$t("iaoMng.delTle2"),
              this,
              {}
            )
            .then(() => {
              this.wLoading = true;
              let arr = [];
              let data = "";
              this.form.yarnThickness.forEach((item) => {
                data = data + item;
              });
              for (let i = 0; i < this.form.ps; i++) {
                arr.push({
                  breadth: this.form.breadth,
                  clothWeight: 100,
                  eachNumber: this.form.qsph + i,
                  fabricName: this.form.fabricDesc,
                  gramWeight: this.form.gramWeight,
                  isPrinted: false,
                  loomNo: this.form.mathineCode,
                  workNo: this.form.zjgh,
                  madeDate: this.$getNowTime("datetime"),
                  noteCode:
                    this.form.bph +
                    this.$preFixInt(Number(this.form.qsph) + i, 3),
                  poNo: this.form.salPoNo,
                  printedTime: this.$getNowTime("datetime"),
                  proBatchNumber: this.form.weaveJobCode, // 生产单号
                  proColor: this.form.colorName,
                  proName: this.form.weaveJobCode,
                  // schId: "231c92fe-4ba9-4bf1-ab9a-58076d7a4720",
                  // machineCode: "123",
                  // salPooid: "000E0106-0000-0000-0000-00001C19D962",
                  // tempId: "1",
                  // weightUnit: "KG",
                  // lenUnit: "KG",
                  // proSpec: "test",
                  // clothLength: 200,
                  customerName: this.form.custCode,
                  yarnThickness: data,
                  yarnBrand: this.form.yarnBrand,
                  yarnBatch: this.form.yarnBatch,
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
                console.log(arr);
                this.wLoading = false;
                // 打印操作
                // arr.forEach((item, i) => {
                //   printBf(item.noteId)
                //     .then((res) => {})
                //     .catch((err) => {
                //       this.$tip.warning("打印失败");
                //       this.wLoading = false;
                //     });
                //   if (i === arr.length - 1) {
                //     setTimeout(() => {
                //       this.printCtr = true;
                //       this.wLoading = false;
                //     }, 500);
                //   }
                // });
              });
            })
            .catch((err) => {
              console.log(err);
              this.$tip.warning(this.$t("public.qxcz"));
            });
          done();
        } else {
          this.$tip.error("请补充打印信息!");
          return;
        }
      });
    },
    print1() {
      const win = window.open("test", "打印");
      let newstr = document.getElementById("test").innerHTML;
      // console.log(newstr);
      win.document.write("<html><head><title></title>");
      win.document.write("</head><body >");
      win.document.write(newstr);

      win.document.write("</body></html>");
      win.document.write("<scr" + 'ipt type="text/javascript" >');

      // setTimeout(() => {
      //   win.print(true);
      //   // win.close();
      // }, 500);

      // let test = window.open(
      //   "http://192.168.0.91:91/api/proClothNote/preview?id=03b9e5ff-1c96-42b8-91be-ffb3fe2c9991",
      //   "_blank"
      // );
      // setTimeout(() => {
      //   test.print();
      // }, 1500);

      return;
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
      // return;
      // this.$refs.form.validate((valid, done) => {
      //   if (valid) {
      //     this.$tip
      //       .cofirm(
      //         "是否确定打印排单号为 【 " +
      //           this.detail.stepCode +
      //           this.$t("iaoMng.delTle2"),
      //         this,
      //         {}
      //       )
      //       .then(() => {
      //         this.wLoading = true;
      //         let arr = [];
      //         for (let i = 0; i < this.form.ps; i++) {
      //           arr.push({
      //             breadth: this.form.actualWidth,
      //             clothWeight: 100,
      //             eachNumber: this.form.qsph + i,
      //             fabricName: this.form.calicoType,
      //             gramWeight: this.form.weight,
      //             isPrinted: false,
      //             loomNo: this.form.equipmentCode,
      //             workNo: this.form.zjgh,
      //             madeDate: this.$getNowTime(),
      //             noteCode: this.form.bph + (this.form.qsph + i),
      //             poNo: this.form.poNo,
      //             printedTime: this.$getNowTime(),
      //             proBatchNumber: this.form.spi,
      //             proColor: this.form.colorName,
      //             proName: this.form.workName,
      //             schId: this.form.salSchId,
      //             // lenUnit: "1",
      //             machineCode: this.form.stepCode,
      //             // proSpec: "test",
      //             salPooid: this.form.salSchId,
      //             tempId: this.form.salSchId,
      //             weightUnit: this.form.workUnit,
      //             // clothLength: 200,
      //             // customerName: "test",
      //           });
      //         }
      //         let add = (item, i) => {
      //           return new Promise((resolve, reject) => {
      //             addBf(item)
      //               .then((res) => {
      //                 item.noteId = res.data.data;
      //                 resolve();
      //               })
      //               .catch((err) => {
      //                 this.$tip.warning("打印失败");
      //                 this.wLoading = false;
      //               });
      //           });
      //         };
      //         let promiseArr = arr.map((item, i) => {
      //           return add(item, i);
      //         });
      //         Promise.all(promiseArr).then((res) => {
      //           baseCodeSupply({ code: "cloth_fly" }).then((res) => {});
      //           arr.forEach((item, i) => {
      //             printBf(item.noteId)
      //               .then((res) => {})
      //               .catch((err) => {
      //                 this.$tip.warning("打印失败");
      //                 this.wLoading = false;
      //               });
      //             if (i === arr.length - 1) {
      //               setTimeout(() => {
      //                 this.printCtr = true;
      //                 this.wLoading = false;
      //               }, 500);
      //             }
      //           });
      //         });
      //       })
      //       .catch((err) => {
      //         this.$tip.warning(this.$t("public.qxcz"));
      //       });
      //     done();
      //   } else {
      //     this.$tip.error("请补充打印信息!");
      //     return;
      //   }
      // });
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