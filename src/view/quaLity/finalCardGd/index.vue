<!--
 * @Author: Lyl
 * @Date: 2021-08-07 07:57:44
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-29 16:44:20
 * @Description: 
-->
<template>
  <div id="finalCard">
    <el-tabs
      type="border-card"
      v-loading="wLoading"
      element-loading-text="拼命加载中..."
    >
      <el-tab-pane label="成品码卡" class="queryForm">
        <el-row>
          <el-col :span="18">
            <el-row class="formBox" style="margin-top: 15px">
              <avue-form ref="form" :option="crudOp" v-model="form">
                <template slot-scope="scope" slot="vatNo">
                  <el-select
                    v-model="form.vatNo"
                    filterable
                    remote
                    reserve-keyword
                    clearable
                    default-first-option
                    placeholder="请输入缸号"
                    :remote-method="remoteMethod"
                    :loading="vatLoading"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.vatNo"
                      :label="item.vatNo"
                      :value="item.vatNo"
                    >
                    </el-option>
                  </el-select>
                </template>
              </avue-form>
            </el-row>
            <el-row
              class="btnList"
              style="
                text-align: center;
                width: 98%;
                margin: 0 auto;
                height: 40px;
              "
            >
              <span>张数</span>
              <el-input
                v-model="sheetNum"
                type="number"
                max="3"
                min="1"
                style="width: 70px; margin-right: 20px"
                @input="numberChange"
                @change="numberChange"
              ></el-input>
              <el-button type="primary" @click="query" :disabled="!form.vatNo"
                >查询</el-button
              >
              <el-button type="primary" :disabled="!form.vatNo" @click="preview"
                >预览</el-button
              >
              <el-button type="primary" :disabled="!form.vatNo" @click="print"
                >打印</el-button
              >
            </el-row>
          </el-col>
          <el-col :span="6">
            <view-container title="历史记录">
              <el-card
                class="border-card"
                style="height: calc(100vh - 120px); overflow: auto"
                id="history"
              >
                <div
                  class="historyText"
                  v-for="item in history"
                  :key="item.noteId"
                  style="border-bottom: 1px solid #eee"
                >
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="
                      '缸号' +
                      item.vatNo +
                      '匹号' +
                      item.pidNo +
                      ' 净重' +
                      item.netWeight
                    "
                    placement="top"
                  >
                    <div class="history">
                      <span>缸号: {{ item.vatNo }}</span>
                      <span>匹号: {{ item.pidNo }}</span>
                      <span>净重: {{ item.netWeight }}</span>
                    </div>
                  </el-tooltip>
                </div>
              </el-card>
            </view-container>
          </el-col>
        </el-row>
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
      </el-tab-pane>
      <!-- <el-tab-pane label="打印模板">
        <print-tem @resetData="resetData"> </print-tem>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import {
  get,
  add,
  update,
  del,
  print,
  getBleadye,
  getRevolve,
  getBleadyeByPage,
  getRevolvePage,
  getTem,
  getWeave,
  getCheckItem,
} from "./api";
// import tem from "./temDlg";
import { webSocket } from "@/config/index.js";
// import printTem from "./printTem.vue";

export default {
  name: "",
  components: {
    // temDlg: tem,
    // printTem,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {
        realGramWeight: 0,
        clothWidth: 0,
        sideBreadthValue: 0,
        netWeight: 1,
        yardLength: 1
      },
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
      wLoading: false,
      pdfDlg: false,
      pdfUrl: "",
      time: null,
      history: [],
      spowerClient: null,
      sheetNum: 1,
      commonTem: null,
      output: {},
      options: [],
      vatLoading: false,
    };
  },
  created() {
  },
  mounted() {
    getCheckItem().then((res) => {
      let data = res.data.filter((item) => {
        return item.checkType != 2;
      });
      this.crudOp.column[this.crudOp.column.length - 1].dicData = data;
    });
    this.$nextTick(() => {
      setTimeout(() => {
        this.form.originPlace = "06";
        this.form.qcTakeOut = 0;
        this.form.pidNo = 1;
        this.form.paperTube = 0;
        this.form.grossWeight = 1;
        this.form.grossWeightLbs = 1;
        this.form.netWeightLbs = 1;
        this.form.widthUnit = "INCH";
        this.form.gramWeightUnit = "g";
        this.form.weightUnit = "KG";
        getTem({ isDefault: 1 }).then((res) => {
          if (res.data.length) {
            this.form.basePrintTemplateFk = res.data[0].tempId;
            this.commonTem = res.data[0].tempId;
          }
        });
      }, 200);
    });
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  destroyed() {
    clearInterval(this.time);
  },
  methods: {
    numberChange() {
      if (this.sheetNum > 3) {
        this.sheetNum = 3;
      } else if (this.sheetNum < 1) {
        this.sheetNum = 1;
      }
    },
    remoteMethod(val) {
      this.vatLoading = true;
      getRevolvePage({ vatNo: "!^%" + val }).then((res) => {
        this.options = res.data.records;
        this.vatLoading = false;
      });
    },
    query() {
      this.wLoading = true;
      this.detail = {};
      // 先查询成品码卡是否存在记录
      get({ vatNo: this.form.vatNo, pidNo: this.form.pidNo, cardType: 2 }).then(
        (res) => {
          if (res.data.length) {
            // 存在记录
            this.form = res.data[0];
            this.getTemForCust();
            setTimeout(() => {
              this.wLoading = false;
            }, 200);
          } else {
            // 不存在记录
            getRevolve({
              vatNo: this.form.vatNo,
            }).then((res) => {
              if (res.data.length > 0) {
                let val = res.data[0];
                this.form.custCode = val.custCode;
                this.form.colorName = val.colorName;
                this.form.colorNo = val.colorCode;
                this.form.custBatchNo = val.yarnBatchNo;
                this.form.fabricName = val.fabName;
                this.form.etNo = val.etSn;
                // 洗前
                this.form.gramWeight = val.gramWeightBefor;
                this.form.styleNo = val.styleNo;
                this.form.custPoNo = val.custPoNo;
                this.form.contractNo = val.contractNo;
                this.form.fabricCode = val.fabricCode;
                this.form.custColorNo = val.custColorNo;
                this.form.factoryColorNo = val.colorCode;
                this.form.gramWeightValue = this.form.gramWeight
                  ? Number(this.form.gramWeight.match(/\d+/g) ? this.form.gramWeight.match(/\d+/g)[0] : 0)
                  : "";

                // 洗后
                this.form.afterWeightDsp = val.gramWeightAfter;
                this.form.afterWeightValue = this.form.gramWeightAfter
                  ? Number(this.form.gramWeightAfter.match(/\d+/g)[0])
                  : "";
                this.form.realGramWeight =
                  this.form.gramWeightValue || this.form.afterWeightValue || 0;
                this.form.actualGramWeight = this.form.realGramWeight;

                this.form.breadth = val.breadthActual || val.breadth;
                this.form.breadthValue = this.form.breadth
                  ? Number(this.form.breadth.match(/\d+/g) ? this.form.breadth.match(/\d+/g)[0] : 0)
                  : 0;
                this.form.clothWidth = this.form.breadthValue;
                this.form.sideBreadth = this.form.breadthBorder || "";
                // this.sideBreadthValue = this.form.sideBreadth
                this.form.sideBreadthValue =
                  typeof this.form.breadthBorder === "number"
                    ? Number(this.form.breadthBorder || 0)
                    : this.form.breadthBorder
                    ? Number(this.form.breadthBorder.match(/\d+/g)[0])
                    : 0;
                if (!this.form.sideBreadthValue) {
                  if (this.form.widthUnit == "INCH") {
                    this.form.sideBreadthValue = this.form.clothWidth + 2;
                  } else {
                    this.form.sideBreadthValue = this.form.clothWidth + 5;
                  }
                }
                // this.form.sideBreadth.indexOf("(") != -1
                //   ? Number(this.form.breadthBorder.match(/\d+/g)[0]) || 0
                //   : Number(this.form.breadthBorder || 0);

                this.form.actualSideBreadth = this.form.breadthValue;

                this.form.fabName = val.fabName;
                this.form.guestComponents = val.fabElements;
                // this.form.netWeight = val.clothWeight;
                this.form.poNo = val.salPoNo;

                this.form.pidNo = 1;
                this.form.productNo =
                  val.vatNo + this.$preFixInt(this.form.pidNo, 3);
              } else {
                this.form.poNo = "";
                this.form.custCode = "";
                this.form.fabName = "";
                this.form.guestFabId = "";
                this.form.guestComponents = "";
                this.form.styleNo = "";
                this.form.colorName = "";
                this.form.gramWeight = "";
                this.form.breadth = "";
                this.form.yardLength = "";
                this.form.grossWeight = "";
                this.form.qcTakeOut = "";
                this.form.netWeight = "";
                this.$tip.warning("暂无此缸号信息!");
              }
              setTimeout(() => {
                this.wLoading = false;
              }, 200);
            });
          }
        }
      );
    },
    getTemForCust() {
      getTem({ custCode: this.form.custCode }).then((res) => {
        if (res.data.length) {
          if (this.form.poNo) {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].salPoNo == this.form.poNo) {
                this.form.basePrintTemplateFk = res.data[i].tempId;
                return;
              }
              if (
                i == res.data.length - 1 &&
                res.data[i].salPoNo != this.form.poNo
              ) {
                this.form.basePrintTemplateFk = res.data[0].tempId;
                return;
              }
            }
          } else {
            this.form.basePrintTemplateFk = res.data[0].tempId;
          }
        } else {
          this.form.basePrintTemplateFk = this.commonTem;
        }
      });
    },
    resetData(data) {
      this.crudOp.column[this.crudOp.column.length - 2].dicData = data;
    },
    preview() {
      if (!this.form.netWeight) {
        this.$tip.error("成品重量不能为0!");
        return;
      }
      getBleadye({ vatNo: this.form.vatNo }).then((dye) => {
        if (!dye.data.length) {
          this.$tip.error("暂无此缸号数据!");
        } else {
          this.wLoading = true;
          this.$refs.form.validate((valid, done) => {
            if (valid) {
              try {
                // 查询是否存在成品码卡记录
                get({
                  vatNo: this.form.vatNo,
                  pidNo: this.form.pidNo,
                  cardType: 2,
                }).then((res) => {
                  let data = JSON.parse(JSON.stringify(this.form));
                  data.custName = data.$custCode;
                  // data.printCount = this.sheetNum;
                  data.clothCheckTime = this.$getNowTime("datetime");
                  Object.keys(data).forEach((item) => {
                    if (this.isEmpty(data[item])) {
                      delete data[item];
                    }
                  });
                  if (res.data.length) {
                    data.cardId = res.data[0].cardId;
                    this.form.cardId = data.cardId;
                    // 存在记录  更新 => 打印
                    update(data).then((upRes) => {
                      // this.history.unshift(data);
                      // this.history = this.$unique(this.history, "cardId");

                      this.pdfUrl =
                        process.env.API_HOST +
                        "/api/proFinalProductCard/cardPdf?cardId=" +
                        this.form.cardId;
                      this.pdfDlg = true;
                    });
                  } else {
                    // 不存在记录 新增 =>打印
                    data.cardType = 2;
                    data.productNo =
                      data.vatNo + this.$preFixInt(data.pidNo, 3);
                    add(data).then((addRes) => {
                      this.form.cardId = addRes.data.data;
                      // this.history.unshift(data);
                      // this.history = this.$unique(this.history, "cardId");
                      this.pdfUrl =
                        process.env.API_HOST +
                        "/api/proFinalProductCard/cardPdf?cardId=" +
                        this.form.cardId;
                      this.pdfDlg = true;
                    });
                  }
                  setTimeout(() => {
                    // this.form.pidNo++;
                    this.wLoading = false;
                    done();
                  }, 200);
                });
                done();
                //   });
                // }
              } catch (error) {
                console.log(error);
                this.wLoading = false;
                this.$tip.error(this.$t("public.bcsb"));
                done();
              }
            } else {
              this.wLoading = false;
              this.$tip.error("请补充码卡信息!");
            }
          });
        }
      });
    },
    print() {
      if (!this.spowerClient || this.spowerClient.readyState == 3) {
        this.$tip.error("打印服务离线，请启动服务!");
        this.spowerClient = this.$store.state.spowerClient;
        return;
      }
      if (!this.form.netWeight) {
        this.$tip.error("成品重量不能为0!");
        return;
      }
      getRevolve({ vatNo: this.form.vatNo }).then((dye) => {
        if (!dye.data.length) {
          this.$tip.error("暂无此缸号数据!");
        } else {
          this.wLoading = true;
          this.$refs.form.validate((valid, done) => {
            if (valid) {
              try {
                // 查询是否存在成品码卡记录
                get({
                  vatNo: this.form.vatNo,
                  pidNo: this.form.pidNo,
                  cardType: 2,
                }).then((res) => {
                  let data = JSON.parse(JSON.stringify(this.form));
                  data.custName = data.$custCode;
                  data.printCount = this.sheetNum;
                  data.clothCheckTime = this.$getNowTime("datetime");
                  data.printedTime = this.$getNowTime("datetime");
                  data.clothState = 1;
                  data.isPrinted = true;
                  Object.keys(data).forEach((item) => {
                    if (this.isEmpty(data[item])) {
                      delete data[item];
                    }
                  });
                  if (res.data.length) {
                    data.cardId = res.data[0].cardId;
                    this.form.cardId = data.cardId;
                    // 存在记录  更新 => 打印
                    update(data).then((upRes) => {
                      this.history.unshift(data);
                      this.history = this.$unique(this.history, "cardId");
                      if (this.sheetNum) {
                        for (let i = 0; i < this.sheetNum; i++) {
                          setTimeout(() => {
                            if (data.cardId) {
                              this.spowerClient.send("print=finishCard:" + data.cardId);
                            } else {
                              this.$tip.error("数据错误,请重新查询后进行打印!");
                              this.wLoading = false;
                              return;
                            }
                            if (i == this.sheetNum - 1) {
                              this.$tip.success("已发送全部打印请求!");
                            }
                          }, 200);
                        }
                      } else {
                        if (data.cardId) {
                          this.spowerClient.send("print=finishCard:" + data.cardId);
                          this.$tip.success("已发送打印请求!");
                        } else {
                          this.$tip.error("数据错误,请重新查询后进行打印!");
                        }
                      }
                    });
                  } else {
                    // 不存在记录 新增 =>打印
                    data.cardId = "";
                    data.madeDate = this.$getNowTime("datetime");
                    data.cardType = 2;
                    data.productNo =
                      data.vatNo + this.$preFixInt(data.pidNo, 3);
                    add(data).then((addRes) => {
                      this.form.cardId = addRes.data.data;
                      this.history.unshift(data);
                      this.history = this.$unique(this.history, "cardId");
                      if (this.sheetNum) {
                        for (let i = 0; i < this.sheetNum; i++) {
                          setTimeout(() => {
                            if (this.form.cardId) {
                              this.spowerClient.send(
                                "print=finishCard:" + this.form.cardId
                              );
                            } else {
                              this.$tip.error("数据错误,请重新查询后进行打印!");
                              this.wLoading = false;
                              return;
                            }
                            if (i == this.sheetNum - 1) {
                              this.$tip.success("已发送全部打印请求!");
                            }
                          }, 200);
                        }
                      } else {
                        if (this.form.cardId) {
                          this.spowerClient.send("print=finishCard:" + this.form.cardId);
                        } else {
                          this.$tip.error("数据错误,请重新查询后进行打印!");
                        }
                        this.$tip.success("已发送打印请求!");
                      }
                    });
                  }
                  setTimeout(() => {
                    // this.form.pidNo++;
                    this.wLoading = false;
                    done();
                  }, 200);
                });
                done();
                //   });
                // }
              } catch (error) {
                console.log(error);
                this.wLoading = false;
                this.$tip.error(this.$t("public.bcsb"));
                done();
              }
            } else {
              this.wLoading = false;
              this.$tip.error("请补充码卡信息!");
            }
          });
        }
      });

      // this.pdfDlg = true;
      // this.pdfUrl =
      //   process.env.API_HOST +
      //   "/api/proBleadyeRunJob/createBleadyeRunJobPdf?id=" +
      //   this.detail.cardId;
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    del() {
      // if (parent.userID != this.detail.serviceOperator) {
      //   this.$tip.warning("当前用户没有权限删除该记录!");
      //   return;
      // }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle9") +
            this.detail.vatNo +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.cardId)
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
      this.isAdd = false;
      this.detail = val;
      this.dialogVisible = true;
    },
    isEmpty(obj) {
      if (
        obj === "undefined" ||
        typeof obj === "undefined" ||
        obj === null ||
        obj === "" ||
        obj === NaN
      ) {
        return true;
      } else {
        return false;
      }
    },
    cellClick(val) {
      this.detail = val;
    },
    setCz() {
      this.spowerClient = this.$store.state.spowerClient;
    },
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      vm.setCz();
      let self = vm;
      document.onkeydown = function (e) {
        let ev = document.all ? window.event : e;
        if (ev.keyCode === 13) {
          setTimeout(() => {
            self.query();
          }, 200);
        }
      };
    });
  },
  beforeRouteLeave(to, from, next) {
    document.onkeydown = null;
    clearInterval(this.time);
    next();
  },
};
</script>
<style lang="stylus">
#finalCard
  .queryForm .avue-form .el-input--mini input
    height 42px !important
    line-height 42px !important
  .queryForm .el-input__inner, .el-form-item__label
    font-size 20px !important
    line-height 42px !important
  .queryForm .el-button, .el-button--mini.is-round
    padding 8px 12px 8px 12px !important
    font-size 20px !important
    margin-left 20px
  .historyText
    font-size 22px
    text-align left
    // text-indent: 1em;
    margin-left 10px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    height 46px
    line-height 46px
  .item
    // margin-bottom: 18px;
</style>