<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-13 13:47:23
 * @Description: 
-->
<template>
  <div id="colorMng_Tem">
    <view-container
      title="織造通知單"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="print" :disabled="printCtr"
          >打印</el-button
        >
        <el-button type="primary" @click="setPreview">预览</el-button>
        <el-button type="primary" @click="add">生成布飞信息</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-tabs v-model="tabs" type="border-card">
        <el-tab-pane name="bf" label="布飞信息">
          <avue-crud ref="crud" :option="crudOp" :data="crud"></avue-crud>
        </el-tab-pane>
        <el-tab-pane name="dy" label="打印预览(仅供参考)">
          <pre-view ref="preview" :detail="previewData"></pre-view>
        </el-tab-pane>
      </el-tabs>
    </view-container>
  </div>
</template>
<script>
import { mainCrud, bfCrud } from "./data";
import { webSocket } from "@/config/index.js";
import {
  getCodeSupply,
  addBf,
  printBf,
  getYarn,
  getBf,
  getNote,
  addNote,
  delNote,
  updateNote,
} from "./api";
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
      czsocket: "",
      tabs: "bf",
      crudOp: bfCrud(this),
      crud: [],
      id:
        process.env.API_HOST +
        "/api/proClothNote/preview?id=" +
        "021308a1-fe63-4336-b234-e8f661ee669e",
    };
  },
  watch: {},
  methods: {
    getData() {
      getBf().then((res) => {});
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
          // if (yarn.data.length > 1) {
          //   this.form.bph =
          //     this.form.custCode +
          //     res.data.data +
          //     "-" +
          //     this.$preFixInt(yarn.data.length, 2) +
          //     this.form.mathineCode;
          // } else {yarn.data
          yarn.data.forEach((item) => {
            this.form.yarnThickness.push(item.yarnName);
          });
          this.form.bph =
            this.form.custCode + res.data.data + this.form.mathineCode;
          // }
        });
        setTimeout(() => {
          this.wLoading = false;
        }, 500);
      });
      this.getBf();
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
    add() {
      if (this.form.ps == 0) {
        this.$tip.error("匹数不能为0");
        return;
      }
      if (this.crud.length == 0) {
        this.$refs.form.validate((valid, done) => {
          if (valid) {
            this.$tip
              .cofirm("是否确定生成布飞信息?")
              .then(() => {
                this.wLoading = true;
                let arr = [];
                let data = "";
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
                    // printedTime: this.$getNowTime("datetime"),
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
                setTimeout(() => {
                  arr.forEach((item, i) => {
                    item.weaveJobFk = this.detail.weaveJobId;
                    addBf(item)
                      .then((res) => {
                        // item.noteId = res.data.data;
                      })
                      .catch((err) => {
                        this.$tip.warning("生成失败!");
                        this.wLoading = false;
                      });
                    if (i == arr.length - 1) {
                      setTimeout(() => {
                        this.$tip.success("新增成功!");
                        this.getBf();
                      }, 200);
                    }
                  });
                }, 200);
              })
              .catch((err) => {
                // console.log(err);
                this.$tip.warning(this.$t("public.qxcz"));
              });
          } else {
            this.$tip.error("请补充布飞信息!");
            return;
          }
        });
      } else {
        this.$refs.form.validate((valid, done) => {
          if (valid) {
            this.$tip
              .cofirm("是否确定重新生成布飞信息?")
              .then(() => {
                this.wLoading = true;
                let del = (item, i) => {
                  return new Promise((resolve, reject) => {
                    delNote(item.noteId)
                      .then((res) => {
                        resolve();
                      })
                      .catch((err) => {
                        this.$tip.warning("打印失败");
                        this.wLoading = false;
                      });
                  });
                };
                let promiseArr = this.crud.map((item, i) => {
                  return del(item, i);
                });
                Promise.all(promiseArr).then((res) => {
                  // baseCodeSupply({ code: "cloth_fly" }).then((res) => {});
                  // 打印操作
                  let arr = [];
                  let data = "";
                  for (let i = 0; i < this.form.ps; i++) {
                    arr.push({
                      breadth: this.form.breadth,
                      clothWeight: 100,
                      eachNumber: this.form.qsph + i,
                      fabricName: this.form.fabricDesc,
                      gramWeight: this.form.gramWeight,
                      loomNo: this.form.mathineCode,
                      workNo: this.form.zjgh,
                      madeDate: this.$getNowTime("datetime"),
                      noteCode:
                        this.form.bph +
                        this.$preFixInt(Number(this.form.qsph) + i, 3),
                      poNo: this.form.salPoNo,
                      // printedTime: this.$getNowTime("datetime"),
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
                      isPrinted: false,
                      customerName: this.form.custCode,
                      yarnThickness: data,
                      yarnBrand: this.form.yarnBrand,
                      yarnBatch: this.form.yarnBatch,
                    });
                  }
                  setTimeout(() => {
                    arr.forEach((item, i) => {
                      item.weaveJobFk = this.detail.weaveJobId;
                      addBf(item)
                        .then((res) => {
                          // item.noteId = res.data.data;
                        })
                        .catch((err) => {
                          // this.$tip.warning("生成失败!");
                          // this.wLoading = false;
                        });
                      if (i == arr.length - 1) {
                        setTimeout(() => {
                          this.$tip.success("生成成功!");
                          this.getBf();
                          done();
                        }, 200);
                      }
                    });
                    if (arr.length == 0) {
                      this.$tip.success("生成成功!");
                      this.getBf();
                      done();
                    }
                  }, 200);
                });
              })
              .catch((err) => {
                // console.log(err);
                done();
                this.$tip.warning(this.$t("public.qxcz"));
              });
          } else {
            this.$tip.error("请补充布飞信息!");
            return;
          }
        });
      }
    },
    getBf() {
      this.wLoading = true;
      getNote({
        weaveJobFk: this.detail.weaveJobId,
        rows: 999,
        start: 1,
      }).then((res) => {
        this.crud = res.data.records;
        if (this.crud.length > 0) {
          this.form.zjgh = this.crud[0].workNo;
        }
        this.crud.sort((a, b) => {
          return a.eachNumber - b.eachNumber;
        });
        this.wLoading = false;
      });
    },
    print() {
      if (this.czsocket.readyState == 3) {
        this.$tip.error("打印应用未启动，请打开后重新进入此页面!");
        return;
      }
      if (this.crud.length > 0) {
        this.$tip
          .cofirm("是否确定打印生成的布飞", {})
          .then(() => {
            this.wLoading = true;
            // 打印操作
            this.crud.forEach((item, i) => {
              this.czsocket.send(item.noteId);
              // this.$tip.success(
              //   "已发送布飞【 " + item.noteCode + " 】的打印请求!"
              // );
              item.isPrinted = true;
              item.printedTime = this.$getNowTime("datetime");
              updateNote(item).then((res) => {});
              if (i === this.crud.length - 1) {
                setTimeout(() => {
                  // this.printCtr = true;
                  this.$tip.success("已发送全部打印请求!");
                  this.wLoading = false;
                  this.getBf();
                }, 1500);
              }
            });
          })
          .catch((err) => {
            // console.log(err);
            this.$tip.warning(this.$t("public.qxcz"));
          });
      } else {
        this.$tip.error("请先生成布飞信息!");
        return;
      }
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
    setCz() {
      webSocket.setPrint(this);
      let _this = this;
      _this.czsocket.onmessage = function (e) {
        console.log(e);
      };
    },
  },
  created() {},
  mounted() {
    this.getData();
    this.setCz(this);
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