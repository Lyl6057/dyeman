<!--
 * @Author: Lyl
 * @Date: 2021-08-07 07:57:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-06 16:26:31
 * @Description: 
-->
<template>
  <div id="finalCard">
    <el-tabs
      type="border-card"
      v-loading="wLoading"
      element-loading-text="拼命加载中..."
    >
      <el-tab-pane label="布票打印" class="queryForm">
        <el-row>
          <el-col :span="18">
            <el-row class="formBox">
              <avue-form
                ref="form"
                :option="crudOp"
                v-model="form"
                style="height: calc(100vh - 165px); overflow: auto"
              >
                <template slot="weaveJobFk">
                  <el-select
                    v-model="form.weaveJobFk"
                    filterable
                    remote
                    reserve-keyword
                    clearable
                    default-first-option
                    placeholder="请输入织单号"
                    :remote-method="remoteMethod"
                    :loading="vatLoading"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.weaveJobId"
                      :label="item.weaveJobCode"
                      :value="item.weaveJobId"
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
                font-size: 22px;
              "
            >
              <el-button
                type="primary"
                @click="query"
                :disabled="!form.weaveJobFk"
                >查询</el-button
              >
              <el-button type="primary" :disabled="!form.vatNo" @click="preview"
                >预览</el-button
              >
              <el-button type="primary" :disabled="!form.vatNo" @click="print"
                >打印</el-button
              >

              <span style="margin-left: 5px">
                <span>张数</span>
                <el-input
                  v-model="sheetNum"
                  type="number"
                  max="3"
                  min="1"
                  maxlength="2"
                  style="width: 70px; margin: 0 5px"
                  @input="numberChange"
                  @change="numberChange"
                ></el-input>
                打印机状态:<span :style="{ color: dlgCtr ? 'green' : 'red' }">
                  {{ dlgCtr ? "已连接" : "未连接" }}</span
                >
              </span>
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
                      item.eachNumber +
                      ' 净重' +
                      item.netWeight
                    "
                    placement="top"
                  >
                    <div class="history">
                      <span>缸号: {{ item.vatNo }}</span>
                      <span>匹号: {{ item.eachNumber }}</span>
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
  getTem,
  getWeave,
  getLoom,
  getCheckItem,
} from "./api";
// import tem from "./temDlg";
import { webSocket } from "@/config/index.js";

export default {
  name: "",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        // realGramWeight: 0,
        // clothWidth: 0,
        // sideBreadthValue: 0,
        eachNumber: 1,
        netWeight: 0,
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
      // czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
      czsocket: {},
      time: null,
      history: [],
      prsocket: null,
      sheetNum: 1,
      commonTem: null,
      output: {},
      options: [],
      vatLoading: false,
      dlgCtr: true,
      spowerClient: null,
    };
  },
  created() {
    // this.setCz();
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.time);
  },
  destroyed() {
    clearInterval(this.time);
  },
  methods: {
    remoteMethod(val) {
      this.vatLoading = true;
      getWeave({ weaveJobCode: "!^%" + val, rows: 10, start: 1 }).then(
        (res) => {
          this.options = res.data.records;
          this.vatLoading = false;
        }
      );
    },
    query() {
      this.wLoading = true;
      this.detail = {};
      this.form.poNo = "";
      this.form.custPoNo = "";
      this.form.custCode = "";
      this.form.styleNo = "";
      this.form.mathineCode = "";
      this.form.colorName = "";
      this.form.custColorNo = "";
      this.form.factoryColorNo = "";
      this.form.contractNo = "";
      this.form.etNo = "";
      // 先查询成品码卡是否存在记录
      get({
        weaveJobFk: this.form.weaveJobFk,
        eachNumber: this.form.eachNumber,
      }).then((res) => {
        console.log(res);
        if (res.data.length) {
          // 存在记录
          this.form = res.data[0];
          // this.getTemForCust();
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        } else {
          // 不存在记录
          getWeave({
            weaveJobId: this.form.weaveJobFk,
            rows: 1,
            start: 1,
          }).then((res) => {
            if (res.data.records.length > 0) {
              this.form = res.data.records[0];
              this.form.eachNumber = 1;
              // this.form.weightUnit = "KG";
              // this.getTemForCust();
              getLoom({ proWeaveJobFk: this.form.weaveJobId }).then((loom) => {
                if (loom.data.length) {
                  let data = [];
                  loom.data.forEach((item) => {
                    data.push({
                      value: item.mathineCode,
                      label: item.mathineCode,
                    });
                  });
                  this.crudOp.group[0].column[7].dicData = data;
                  this.form.mathineCode = loom.data[0].mathineCode;
                  this.wLoading = false;
                } else {
                  this.wLoading = false;
                }
              });
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
              this.$tip.warning("暂无此织单信息!");
              this.wLoading = false;
            }
          });
        }
      });
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
                  eachNumber: this.form.eachNumber,
                  cardType: 1,
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
                    // update(data).then((upRes) => {
                    // this.history.unshift(data);
                    // this.history = this.$unique(this.history, "cardId");

                    this.pdfUrl =
                      process.env.API_HOST +
                      "/api/proFinalProductCard/cardPdf?cardId=" +
                      this.form.cardId;
                    this.pdfDlg = true;
                    // });
                  } else {
                    // 不存在记录 新增 =>打印
                    data.cardType = 1;
                    add(data).then((addRes) => {
                      if (addRes.data.code == 200) {
                        this.form.cardId = addRes.data.data;
                        // this.history.unshift(data);
                        // this.history = this.$unique(this.history, "cardId");
                        this.pdfUrl =
                          process.env.API_HOST +
                          "/api/proFinalProductCard/cardPdf?cardId=" +
                          this.form.cardId;
                        this.pdfDlg = true;
                      }
                    });
                  }
                  setTimeout(() => {
                    // this.form.eachNumber++;
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
    print() {
      if (this.prsocket.readyState == 3 || this.prsocket.readyState == 0) {
        this.$tip.error("打印服务离线，请启动服务!");
        return;
      }
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
                  eachNumber: this.form.eachNumber,
                  cardType: 1,
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
                    this.$tip
                      .cofirm(
                        `已存在码卡信息,是否修改净重【${res.data[0].netWeight}KG】为【${this.form.netWeight}KG】`,
                        this,
                        {}
                      )
                      .then(() => {
                        data.cardId = res.data[0].cardId;
                        this.form.cardId = data.cardId;
                        // 存在记录  更新 => 打印
                        update(data).then((upRes) => {
                          this.history.unshift(data);
                          this.history = this.$unique(this.history, "cardId");
                          if (this.history.length > 50) {
                            this.history.splice(0, 1);
                          }
                          if (this.sheetNum) {
                            for (let i = 0; i < this.sheetNum; i++) {
                              setTimeout(() => {
                                if (data.cardId) {
                                  this.prsocket.send(
                                    "finishCard:" + data.cardId
                                  );
                                } else {
                                  this.$tip.error(
                                    "数据错误,请重新查询后进行打印!"
                                  );
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
                              this.prsocket.send("finishCard:" + data.cardId);
                              this.$tip.success("已发送打印请求!");
                            } else {
                              this.$tip.error("数据错误,请重新查询后进行打印!");
                            }
                          }
                        });
                      })
                      .catch(() => {
                        this.form.eachNumber--;
                      });
                  } else {
                    // 不存在记录 新增 =>打印
                    data.cardId = "";
                    data.cardType = 1;
                    data.madeDate = this.$getNowTime("datetime");
                    add(data).then((addRes) => {
                      if (addRes.data.code == 200) {
                        this.form.cardId = addRes.data.data;
                        this.history.unshift(data);
                        this.history = this.$unique(this.history, "cardId");
                        if (this.history.length > 50) {
                          this.history.splice(0, 1);
                        }
                        if (this.sheetNum) {
                          for (let i = 0; i < this.sheetNum; i++) {
                            setTimeout(() => {
                              if (this.form.cardId) {
                                this.prsocket.send(
                                  "finishCard:" + this.form.cardId
                                );
                              } else {
                                this.$tip.error(
                                  "数据错误,请重新查询后进行打印!"
                                );
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
                            this.prsocket.send(
                              "finishCard:" + this.form.cardId
                            );
                          } else {
                            this.$tip.error("数据错误,请重新查询后进行打印!");
                          }
                          this.$tip.success("已发送打印请求!");
                        }
                      } else {
                        this.$tip.warning("新增数据失败!");
                      }
                    });
                  }
                  setTimeout(() => {
                    this.form.eachNumber++;
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
    isEmpty(obj) {
      if (
        obj === "undefined" ||
        typeof obj === "undefined" ||
        obj === null ||
        obj === "" ||
        obj === "NaN"
      ) {
        return true;
      } else {
        return false;
      }
    },
    setCz() {
      // this.czsocket = null;
      // this.prsocket = null;
      // webSocket.setClient(this);
      this.spowerClient = this.$store.state.spowerClient;
      let _this = this;
      _this.spowerClient.onmessage = function (e) {
        if (e.data.indexOf("scan") != -1) {
          _this.form.storeLoadCode = e.data.split("scan=")[1];
        } else if (e.data.indexOf("weight") != -1) {
          let data = e.data.split("weight=")[1];
          _this.form.netWeight = Number(data.split(":")[0]);
          _this.form.weightUnit = Number(data.split(":")[1]);
        }
      };
      console.log(this.spowerClient);
    },
    codeLength() {
      if (
        !this.form.realGramWeight ||
        !this.form.actualSideBreadth ||
        !this.form.netWeight ||
        this.form.realGramWeight == 0
      ) {
        return;
      }
      let gramWeight, breadth;
      // this.$nextTick(() => {
      if (this.form.gramWeightUnit == "Kg") {
        // 默认是 g
        gramWeight = Number(this.form.realGramWeight);
      } else {
        gramWeight = Number(this.form.realGramWeight / 1000);
      }

      if (this.form.widthUnit != "INCH") {
        // 默认是 inch
        breadth = Number(this.form.actualSideBreadth / 100);
      } else {
        breadth = Number((this.form.actualSideBreadth * 2.54) / 100);
      }

      let weight = this.form.netWeight;
      // if (this.form.weightUnit == "LBS") {
      //   weight = weight * 2.20462262;
      // }
      // gramWeight 单位为 g/m , breadth 单位为 inch 需要 * 2.54 转换成cm / 100 转换成 m
      this.form.yardLength = parseInt(
        Number(weight / gramWeight / breadth) * 1.0936
      );
      // });
    },
    numberChange() {
      if (this.sheetNum > 3) {
        this.sheetNum = 3;
      } else if (this.sheetNum < 1) {
        this.sheetNum = 1;
      }
    },
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      let self = vm;
      self.setCz();
      // vm.spowerClient = vm.$store.state.spowerClient
      // vm.spowerClient.onmessage = function (e){
      //   console.log(e);
      // }

      document.onkeydown = function (e) {
        let ev = document.all ? window.event : e;
        if (ev.keyCode === 13 && self.form.vatNo) {
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
    height 40px !important
    line-height 40px !important
  .el-form-item__label
    padding 0 5px 0 0 !important
    white-space nowrap !important
  .queryForm .el-input__inner, .el-form-item__label
    font-size 20px !important
    line-height 40px !important
  .queryForm .el-input__inner
    font-size 24px !important
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