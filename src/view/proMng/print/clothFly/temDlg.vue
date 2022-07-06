<!--
 * @Author: Lyl
 * @Date: 2021-02-02 09:00:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-06 08:14:23
 * @Description: 
-->
<template>
  <div id="colorMng_Te1">
    <view-container
      title="織造通知單"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" :disabled="crud.length == 0" @click="save"
          >保存</el-button
        >
        <el-button type="primary" @click="add">生成</el-button>
        <!-- <el-button type="primary" @click="readd">重新布飞</el-button>  -->
        <el-button type="danger" @click="del">删除</el-button>
        <el-button
          type="success"
          @click="print"
          :disabled="selectData.length == 0"
          >打印</el-button
        >

        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-tabs v-model="tabs" type="border-card">
        <el-tab-pane name="bf" label="布飞信息">
          <div class="list-type">
            <el-radio-group v-model="listType" @change="getBf">
              <el-radio label="1">未打印</el-radio>
              <el-radio label="2">已打印</el-radio>
              <el-radio label="3">全部</el-radio>
            </el-radio-group>
            <span style="margin-left: 20px; font-size: 18px"> 布票号: </span>
            <el-input v-model="noteCode" style="width: 20%" @change="getBf"></el-input>
          </div>
          <avue-crud
            ref="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            @on-load="getBf"
            @selection-change="selectionChange"
          >
          </avue-crud>
        </el-tab-pane>
        <el-tab-pane name="dy" label="打印预览(仅供参考)">
          <pre-view
            ref="preview"
            :detail="crud"
            :form="form"
            v-if="crud.length > 0"
          ></pre-view>
        </el-tab-pane>
      </el-tabs>
    </view-container>
  </div>
</template>
<script>
import { mainCrud, bfCrud } from "./data";
import { webSocket } from "@/config/index.js";
import {
  addBf,
  printBf,
  getYarn,
  getBf,
  getNote,
  addNote,
  delNote,
  updateNote,
  getGroup,
  getJh,
} from "./api";
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
        pageSizes: [50, 100, 200 ,500 ,1000],
        pageSize: 100,
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
      spowerClient: "",
      tabs: "bf",
      crudOp: bfCrud(this),
      crud: [],
      selectData: [],
      id:
        process.env.API_HOST +
        "/api/proClothNote/preview?id=" +
        "021308a1-fe63-4336-b234-e8f661ee669e",
      yarnList: [],
      listType: "3",
      allData: [],
      jh: "",
      options: [],
      noteCode: null
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      this.form = this.detail;
      this.form.ps = (Number(this.form.amount) / Number(this.form.pz)).toFixed(
        0
      );
      this.form.nowDate = this.$getNowTime("date");
      getJh({ proWeaveJobFk: this.form.weaveJobId }).then((res) => {
        res.data.forEach((item) => {
          this.formOp.column[10].dicData.push({
            value: item.mathineCode,
            label: item.mathineCode,
          });
        });
        if (res.data.length > 0) {
          this.form.mathineCode = res.data[0].mathineCode;
        }
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
    getYarn(val) {
      // this.wLoading = true;
      this.form.yarnThickness = "";
      this.form.yarnBatch = "";
      this.form.yarnBrand = "";
      this.form.yarnThicknessH = "";
      this.form.yarnBatchH = "";
      this.form.yarnBrandH = "";
      getYarn({
        proWeaveJobGroupFk: val,
      }).then((yarn) => {
        // this.formOp.column[14].dicData = yarn.data;
        yarn.data.forEach((item) => {
          this.form.yarnThickness += item.yarnName + "  ";
          this.form.yarnThicknessH += item.yarnName + "<br />";
          if (item.yarnBatch) {
            this.form.yarnBatch += item.yarnBatch + "  ";
            this.form.yarnBatchH += item.yarnBatch + "<br />";
          }
          if (item.yarnBrand) {
            this.form.yarnBrand += item.yarnBrand + "  ";
            this.form.yarnBrandH += item.yarnBrand + "<br />";
          }
        });
        let data = this.yarnList
          .filter((item) => {
            return item.groupId == this.form.proWeaveJobGroupFk;
          })
          .map((item) => {
            return item;
          });
        if (data.length == 0) {
          return;
        }
        if (Number(data[0].sn) === 1) {
          this.form.bph = this.form.mathineCode;
        } else {
          this.form.bph =
            "-" +
            this.$preFixInt(Number(data[0].sn), 2) +
            this.form.mathineCode;
        }
      });
    },
    readd() {
      if (this.form.ps == 0) {
        this.$tip.error("匹数不能为0");
        return;
      }
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          this.$tip
            .cofirm("是否确定重新生成布飞信息?")
            .then(() => {
              this.wLoading = true;
              let areList = [];
              let del = (item, i) => {
                return new Promise((resolve, reject) => {
                  if (item.clothWeight && item.clothWeight > 0) {
                    resolve();
                    areList.push(Number(item.eachNumber));
                  } else {
                    delNote(item.noteId)
                      .then((res) => {
                        resolve();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                });
              };
              let promiseArr = this.allData.map((item, i) => {
                return del(item, i);
              });
              Promise.all(promiseArr).then((res) => {
                // baseCodeSupply({ code: "cloth_fly" }).then((res) => {});
                // 打印操作
                let arr = [];
                let data = "";
                for (let i = 0; i < this.form.ps; i++) {
                  if (areList.indexOf(i + 1) < 0) {
                    arr.push({
                      breadth: this.form.breadth,
                      clothWeight: "",
                      weightUnit: "KG",
                      eachNumber: Number(this.form.qsph) + i,
                      fabricName: this.form.fabricDesc,
                      gramWeight: this.form.gramWeight,
                      loomNo: this.form.mathineCode,
                      workNo: this.form.zjgh,
                      madeDate: this.$getNowTime("datetime"),
                      proWeaveJobGroupFk: this.form.proWeaveJobGroupFk,
                      noteCode:
                        this.form.bph +
                        this.$preFixInt(Number(this.form.qsph) + i, 3),
                      poNo: this.form.salPoNo,
                      // printedTime: this.$getNowTime("datetime"),
                      proBatchNumber: this.form.weaveJobCode, // 生产单号
                      proColor: this.form.colorName,
                      proName: this.form.weaveJobCode,
                      clothChecker: this.form.clothChecker,
                      // schId: "231c92fe-4ba9-4bf1-ab9a-58076d7a4720",
                      machineCode: this.form.mathineCode,
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
                        this.listType = "3";
                        this.getBf();
                        done();
                        this.wLoading = false;
                      }, 200);
                    }
                  });
                  if (arr.length == 0) {
                    this.$tip.success("生成成功!");
                    this.listType = "3";
                    this.getBf();
                    done();
                    this.wLoading = false;
                  }
                }, 200);
              });
            })
            .catch((err) => {
              // console.log(err);
              this.wLoading = false;
              done();
              this.$tip.warning(this.$t("public.qxcz"));
            });
        } else {
          this.$tip.error("请补充布飞信息!");
          return;
        }
      });
    },
    add() {
      if (this.form.ps == 0) {
        this.$tip.error("匹数不能为0");
        return;
      }
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
                  clothWeight: "",
                  weightUnit: "KG",
                  eachNumber: Number(this.form.qsph) + i,
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
                  clothChecker: this.form.clothChecker,
                  // schId: "231c92fe-4ba9-4bf1-ab9a-58076d7a4720",
                  machineCode: this.form.mathineCode,
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
                  proWeaveJobGroupFk: this.form.proWeaveJobGroupFk,
                  weaveJobFk: this.form.weaveJobId,
                });
              }
              setTimeout(() => {
                arr.forEach((item, i) => {
                  item.weaveJobFk = this.detail.weaveJobId;
                  addBf(item)
                    .then((res) => {
                      // item.noteId = res.data.data;
                      // if (res.data.code != 200) {
                      //   this.$tip.err(res.data.msg);
                      // }
                    })
                    .catch((err) => {
                      this.$tip.warning("生成失败!");
                      this.wLoading = false;
                    });
                  if (i == arr.length - 1) {
                    setTimeout(() => {
                      this.$tip.success("新增成功!");
                      this.getBf();
                      done();
                    }, 200);
                  }
                });
              }, 200);
            })
            .catch((err) => {
              // console.log(err);
              this.wLoading = false;
              done();
              this.$tip.warning(this.$t("public.qxcz"));
            });
        } else {
          this.$tip.error("请补充布飞信息!");
          return;
        }
      });
    },
    del() {
      this.$tip.cofirm("是否确定删除选中的布飞信息?").then(() => {
        this.wLoading = true;
        this.selectData.forEach((item, i) => {
          delNote(item.noteId).then((res) => {
            if (i == this.selectData.length - 1) {
              this.getBf();
              this.wLoading = false;
              this.$tip.success("删除成功!");
            }
          });
        });
      });
    },
    getBf() {
      this.wLoading = true;
      let query = {};
      if (this.listType == "1") {
        query.isPrinted = false;
      } else if (this.listType == "2") {
        query.isPrinted = true;
      } else {
        delete query["isPrinted"];
      }
      if (this.form.mathineCode) {
        query.machineCode = this.form.mathineCode;
      } else {
        delete query["machineCode"];
      }
      getNote(
        Object.assign(query, {
          weaveJobFk: this.detail.weaveJobId,
          // proWeaveJobGroupFk: this.form.proWeaveJobGroupFk,
          rows: this.page.pageSize,
          start: this.page.currentPage,
          noteCode: '^^%' + (this.noteCode || '') 
        })
      ).then((res) => {
        this.crud = res.data.records;
        this.page.total = res.data.total
        this.crud.forEach((item) => {
          item.$cellEdit = true;
        });
        if (this.listType == "3") {
          this.allData = res.data.records;
          if (this.options.length <= 1) {
            this.group(this.allData, "machineCode");
          }
          if (this.allData.length > 0) {
            this.form.zjgh = this.allData[0].workNo;
            this.form.ps = this.allData.length;
            this.form.qsph = this.allData[0].eachNumber;
          }
        }
      }).finally(async () =>{
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
          
      })
    },
    print() {
      if (!this.spowerClient || this.spowerClient.readyState == 3) {
        this.setCz()
        this.$tip.error("打印应用未启动，请打开后重新进入此页面!");
        return;
      }
      if (this.crud.length > 0) {
        this.$tip
          .cofirm("是否确定打印生成的布飞", {})
          .then(() => {
            this.wLoading = true;
            // 打印操作
            this.selectData.forEach((item, i) => {
              this.spowerClient.send("print=noteId:" + item.noteId);
              if (!item.isPrinted) {
                item.isPrinted = true;
                item.clothState = 0;
                item.printedTime = this.$getNowTime("datetime");
                updateNote(item).then((res) => {});
              }

              if (i === this.selectData.length - 1) {
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
    save() {
      this.wLoading = true;
      this.crud.forEach((item, i) => {
        updateNote(item).then((res) => {
          if (i == this.crud.length - 1) {
            setTimeout(() => {
              this.wLoading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
        });
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
    group(arr, type) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai[type]]) {
          dest.push({
            value: ai[type],
            label: ai[type],
            // data: [ai],
          });
          map[ai[type]] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj[type] == ai[type]) {
              // dj.data.push(ai);
              break;
            }
          }
        }
      }
      dest.sort((a, b) => {
        return a.value > b.value ? 1 : -1;
      });
      this.options = dest;
      // return dest;
    },
    setCz() {
      this.spowerClient = this.$store.state.spowerClient;
    },
    selectionChange(val) {
      this.selectData = val;
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
#colorMng_Te1
  // .el-table__fixed-body-wrapper {
  // top: 35px !important;
  // }
.list-type
  margin 8px 0 0 15px
  font-size 24px
  .el-radio__inner
    width 18px
    height 18px
#colorMng_Dlg
  .is-fullscreen
    overflow hidden !important
  .el-dialog__header
    padding 0 !important
  .el-dialog__headerbtn
    top 3px
    font-size 18px
    font-weight bold
    z-index 9
  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close
    color #000
    font-size 24px
  .el-tag--mini
    height 24px
    padding 0 5px
    line-height 24px
    font-size 14px
  .el-select .el-tag__close.el-icon-close
    right -5px
    height 18px
    width 18px
    line-height 18px
  .avue-form .el-input--mini input
    height 35px !important
    line-height 35px
</style>