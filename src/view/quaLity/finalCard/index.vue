<!--
 * @Author: Lyl
 * @Date: 2021-08-07 07:57:44
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-16 14:42:42
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
        <!-- <el-row class="btnList"> -->
        <!-- <el-tooltip
            class="item"
            effect="dark"
            content="cập nhật"
            placement="top-start"
          >
            <el-button
              type="success"
              :disabled="!detail.cardId"
              @click="handleRowDBLClick(detail)"
              >{{ this.$t("public.update") }}</el-button
            >
          </el-tooltip> -->

        <!-- <el-tooltip
            class="item"
            effect="dark"
            content="thêm mới "
            placement="top-start"
          >
            <el-button type="primary" @click="add">{{
              this.$t("public.add")
            }}</el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="xóa"
            placement="top-start"
          >
            <el-button type="danger" :disabled="!detail.cardId" @click="del">{{
              this.$t("public.del")
            }}</el-button>
          </el-tooltip> -->
        <!-- <el-tooltip
            class="item"
            effect="dark"
            content=" in"
            placement="top-start"
          >
            <el-button
              type="primary"
              @click="print"
              :loading="wLoading"
              :disabled="!detail.cardId"
              >打印</el-button
            >
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="tìm kiếm"
            placement="top-start"
          >
            <el-button type="primary" @click="query">{{
              this.$t("public.query")
            }}</el-button>
          </el-tooltip> -->
        <!-- <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button> -->
        <!-- </el-row> -->
        <el-row>
          <el-col :span="16">
            <el-row class="formBox" style="margin-top: 15px">
              <avue-form ref="form" :option="crudOp" v-model="form"></avue-form>
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
                style="width: 70px; margin-right: 20px"
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
          <el-col :span="8">
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
                      <span> 净重: {{ item.netWeight }}</span>
                      <!-- <span>验布员工号: {{ item.clothChecker }}</span> -->
                    </div>
                  </el-tooltip>
                  <!-- <el-divider style="margin: 0"></el-divider> -->
                </div>
              </el-card>
            </view-container>
          </el-col>
        </el-row>

        <!-- <el-row class="crudBox">
          <avue-crud
            ref="crud"
            id="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
            @on-load="query"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
          ></avue-crud>
        </el-row> -->
        <!-- <el-dialog
          id="colorMng_Dlg"
          :visible.sync="dialogVisible"
          fullscreen
          width="100%"
          append-to-body
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <tem-dlg
            v-if="dialogVisible"
            ref="tem"
            :detail="detail"
            :isAdd="isAdd"
            @close="dialogVisible = false"
            @refresh="query"
          ></tem-dlg>
        </el-dialog> -->
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
      <el-tab-pane label="打印模板">
        <print-tem> </print-tem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del, print, getBleadye, getRevolve } from "./api";
import tem from "./temDlg";
import { webSocket } from "@/config/index.js";
import printTem from "./printTem.vue";
export default {
  name: "",
  components: {
    temDlg: tem,
    printTem,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
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
      czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
      czsocket: null,
      time: null,
      history: [],
      prsocket: null,
      sheetNum: 1,
    };
  },
  created() {
    // this.setCz();
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.form.originPlace = "06";
        this.form.qcTakeOut = 0;
        this.form.pidNo = 1;
        this.form.paperTube = 1;
        this.form.widthUnit = "INCH";
        this.form.gramWeightUnit = "g";
        this.form.basePrintTemplateFk =
          this.crudOp.column[this.crudOp.column.length - 2].dicData[0].value;
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
    query() {
      this.wLoading = true;
      this.detail = {};
      // for (let key in this.form) {
      //   if (this.form[key] == "") {
      //     delete this.form[key];
      //   }
      // }
      // if (this.form.appDate && this.form.appDate.indexOf(" ") < 0) {
      //   this.form.appDate += " 00:00:00";
      // }
      // 先查询成品码卡是否存在记录
      get({ vatNo: this.form.vatNo, pidNo: this.form.pidNo }).then((res) => {
        if (res.data.length) {
          // 存在记录
          this.form = res.data[0];
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        } else {
          // 不存在记录
          getBleadye({
            vatNo: this.form.vatNo,
          }).then((res) => {
            if (res.data.length > 0) {
              let val = res.data[0];
              this.form.custCode = val.custCode;
              this.form.colorName = val.colorName;
              this.form.colorNo = val.colorCode;
              this.form.custBatchNo = val.yarnBatchNo;
              this.form.fabricName = val.fabName;
              this.form.gramWeight = val.gramWeight;
              this.form.breadth = val.breadth;
              this.form.realGramWeight = Number(
                this.form.gramWeight.split("(")[0]
              );
              this.form.clothWidth = Number(this.form.breadth.split("(")[0]);
              this.form.fabName = val.fabName;
              this.form.guestComponents = val.fabElements;
              // this.form.netWeight = val.clothWeight;
              this.form.poNo = val.salPoNo;
              // this.form.pidNo = 1;
              this.form.productNo =
                val.vatNo + this.$preFixInt(this.form.pidNo, 3);
              // this.form.weightUnit = "KG";
              getRevolve({
                vatNo: this.form.vatNo,
              }).then((res) => {
                this.form.styleNo = res.data[0].styleNo;
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
              this.$tip.warning("暂无此缸号信息!");
            }
            setTimeout(() => {
              this.wLoading = false;
            }, 200);
          });
        }
      });
    },
    preview() {
      this.wLoading = true;
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            // 查询是否存在成品码卡记录
            get({
              vatNo: this.form.vatNo,
              pidNo: this.form.pidNo,
            }).then((res) => {
              let data = JSON.parse(JSON.stringify(this.form));
              data.custName = data.$custCode;
              // data.printCount = this.sheetNum;
              // data.clothCheckTime = this.$getNowTime("datetime");
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

            // if (data.cardId) {
            //   // update
            //   data.upateTime = this.$getNowTime("datetime");
            //   update(data).then((res) => {
            //     if (res.data.code == 200) {
            //       setTimeout(() => {
            //         this.wLoading = false;
            //         this.$emit("refresh");
            //         this.$tip.success(this.$t("public.bccg"));
            //         done();
            //       }, 200);
            //     } else {
            //       this.wLoading = false;
            //       done();
            //       this.$tip.error(this.$t("public.bcsb"));
            //     }
            //   });
            // } else {
            //   // add
            //   data.createTime = this.$getNowTime("datetime");
            //   add(data).then((res) => {
            //     if (res.data.code == 200) {
            //       this.$tip.success(this.$t("public.bccg"));
            //       this.wLoading = false;
            //       this.$emit("refresh");
            //       this.form.cardId = res.data.data;
            //       this.detail.cardId = res.data.data;
            //     } else {
            //       this.$tip.error(this.$t("public.bcsb"));
            //       this.wLoading = false;
            //     }
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
          this.$tip.error("请补充缸号/打印模板信息!");
        }
      });
      // this.pdfDlg = true;
      // this.pdfUrl =
      //   process.env.API_HOST +
      //   "/api/proBleadyeRunJob/createBleadyeRunJobPdf?id=" +
      //   this.detail.cardId;
    },
    print() {
      this.wLoading = true;
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            // 查询是否存在成品码卡记录
            get({
              vatNo: this.form.vatNo,
              pidNo: this.form.pidNo,
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
                        this.prsocket.send("finishCard:" + data.cardId);
                      }, 200);

                      if (i == this.sheetNum - 1) {
                        this.$tip.success("已发送全部打印请求!");
                      }
                    }
                  } else {
                    this.prsocket.send("finishCard:" + data.cardId);
                    this.$tip.success("已发送打印请求!");
                  }
                });
              } else {
                // 不存在记录 新增 =>打印
                add(data).then((addRes) => {
                  this.form.cardId = addRes.data.data;
                  this.history.unshift(data);
                  this.history = this.$unique(this.history, "cardId");
                  if (this.sheetNum) {
                    for (let i = 0; i < this.sheetNum; i++) {
                      setTimeout(() => {
                        this.prsocket.send("finishCard:" + this.form.cardId);
                      }, 200);

                      if (i == this.sheetNum - 1) {
                        this.$tip.success("已发送全部打印请求!");
                      }
                    }
                  } else {
                    this.prsocket.send("finishCard:" + this.form.cardId);
                    this.$tip.success("已发送打印请求!");
                  }
                });
              }
              setTimeout(() => {
                this.form.pidNo++;
                this.wLoading = false;
                done();
              }, 200);
            });

            // if (data.cardId) {
            //   // update
            //   data.upateTime = this.$getNowTime("datetime");
            //   update(data).then((res) => {
            //     if (res.data.code == 200) {
            //       setTimeout(() => {
            //         this.wLoading = false;
            //         this.$emit("refresh");
            //         this.$tip.success(this.$t("public.bccg"));
            //         done();
            //       }, 200);
            //     } else {
            //       this.wLoading = false;
            //       done();
            //       this.$tip.error(this.$t("public.bcsb"));
            //     }
            //   });
            // } else {
            //   // add
            //   data.createTime = this.$getNowTime("datetime");
            //   add(data).then((res) => {
            //     if (res.data.code == 200) {
            //       this.$tip.success(this.$t("public.bccg"));
            //       this.wLoading = false;
            //       this.$emit("refresh");
            //       this.form.cardId = res.data.data;
            //       this.detail.cardId = res.data.data;
            //     } else {
            //       this.$tip.error(this.$t("public.bcsb"));
            //       this.wLoading = false;
            //     }
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
          this.$tip.error("请补充缸号/打印模板信息!");
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
        obj === ""
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
      webSocket.setCz(this);
      let _this = this;
      _this.czsocket.onmessage = function (e) {
        if (e.data.indexOf(":") != -1) {
          _this.form.grossWeight = Number(e.data.split(":")[0]); //;
          _this.form.weightUnit = e.data.split(":")[1];
        } else {
          _this.form.grossWeight = Number(e.data);
        }
        _this.form.netWeight = Number(
          _this.form.grossWeight -
            Number(_this.form.paperTube || 0) -
            Number(_this.form.qcTakeOut)
        ).toFixed(2);
        _this.codeLength();
      };
      _this.czsocket.onopen = function (event) {
        setTimeout(() => {
          _this.time = setInterval(() => {
            _this.czsocket.send("weight");
          }, 1000);
        }, 200);
        _this.$tip.success("服务器连接成功!");
      };
      webSocket.setPrint(this);
      _this.prsocket.onmessage = function (e) {};
    },
    codeLength() {
      if (!this.form.gramWeight || !this.form.breadth || !this.form.netWeight) {
        return;
      }
      let gramWeight, breadth;
      this.$nextTick(() => {
        if (this.form.gramWeightUnit == "Kg") {
          // 默认是 g
          gramWeight = Number(this.form.realGramWeight);
        } else {
          gramWeight = Number(this.form.realGramWeight / 1000);
        }

        if (this.form.widthUnit == "INCH") {
          // 默认是 inch
          breadth = Number(this.form.clothWidth);
        } else {
          breadth = Number(this.form.clothWidth * 2.54);
        }

        let weight = this.form.netWeight;
        if (this.form.weightUnit == "LBS") {
          weight = weight * 2.20462262;
        }
        // gramWeight 单位为 g/m , breadth 单位为 inch 需要 * 2.54 转换成cm / 100 转换成 m

        this.form.yardLength = parseInt((weight / gramWeight) * breadth);
      });
    },
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      vm.setCz();
      let self = vm;
      document.onkeydown = function (e) {
        let ev = document.all ? window.event : e;
        if (ev.keyCode === 13) {
          self.query();
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
#finalCard {
  .queryForm .avue-form .el-input--mini input {
    height: 42px !important;
    line-height: 42px !important;
  }

  .queryForm .el-input__inner, .el-form-item__label {
    font-size: 20px !important;
    line-height: 42px !important;
  }

  .queryForm .el-button, .el-button--mini.is-round {
    padding: 8px 12px 8px 12px !important;
    font-size: 20px !important;
    margin-left: 20px;
  }

  .historyText {
    font-size: 22px;
    text-align: left;
    // text-indent: 1em;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 46px;
    line-height: 46px;
  }

  .item {
    // margin-bottom: 18px;
  }
}
</style>