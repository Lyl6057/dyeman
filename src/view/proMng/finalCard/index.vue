<!--
 * @Author: Lyl
 * @Date: 2021-08-07 07:57:44
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-01 16:52:49
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
              <el-button type="primary" @click="query" :disabled="!form.vatNo"
                >查询</el-button
              >
              <el-button
                type="primary"
                :disabled="!form.vatNo"
                @click="print(1)"
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
    };
  },
  created() {
    // this.setCz();
    this.form.pidNo = 1;
    this.form.paperTube = 1;
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.form.printTem =
          this.crudOp.column[this.crudOp.column.length - 1].dicData[0].value;
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
          this.form.fabName = val.fabName;
          // this.form.netWeight = val.clothWeight;
          this.form.poNo = val.salPoNo;
          this.form.pidNo = 1;
          // this.form.weightUnit = "KG";
          getRevolve({
            vatNo: this.form.vatNo,
          }).then((res) => {
            this.form.styleNo = res.data[0].styleNo;
          });
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
        // this.crud.sort((a, b) => {
        //   return a.appDate > b.appDate ? -1 : 1;
        // });
        // this.crud.forEach((item, i) => {
        //   item.index = i + 1;
        // });

        // if (this.crud.length > 0) {
        //   this.$refs.crud.setCurrentRow(this.crud[0]);
        // }
        // this.page.total = res.data.total;
      });
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
              Object.keys(data).forEach((item) => {
                if (this.isEmpty(data[item])) {
                  delete data[item];
                }
              });
              if (res.data.length) {
                data.cardId = res.data[0].cardId;
                this.form.cardId = data.cardId;
                // 存在记录  更新 => 打印
                update(data).then((upRes) => {});
                this.history.unshift(data);
                this.history = this.$unique(this.history, "cardId");
                this.pdfDlg = true;
                this.pdfUrl =
                  process.env.API_HOST +
                  "/api/proFinalProductCard/cardPdf?cardId=" +
                  this.form.cardId +
                  "&tempId=" +
                  this.form.printTem;
              } else {
                // 不存在记录 新增 =>打印
                add(data).then((addRes) => {
                  this.form.cardId = addRes.data.data;
                  this.history.unshift(data);
                  this.history = this.$unique(this.history, "cardId");
                  this.pdfDlg = true;
                  this.pdfUrl =
                    process.env.API_HOST +
                    "/api/proFinalProductCard/cardPdf?cardId=" +
                    this.form.cardId +
                    "&tempId=" +
                    this.form.printTem;
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
          this.$tip.error("请补充批色码卡信息!");
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
          _this.form.grossWeight - Number(_this.form.paperTube)
        ).toFixed(2);
      };
      _this.czsocket.onopen = function (event) {
        setTimeout(() => {
          _this.time = setInterval(() => {
            _this.czsocket.send("weight");
          }, 1000);
        }, 200);
        _this.$tip.success("服务器连接成功!");
      };
    },
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      vm.setCz();
    });
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.time);
    next();
  },
};
</script>
<style lang="stylus">
#finalCard {
  .queryForm .avue-form .el-input--mini input {
    height: 48px !important;
    line-height: 48px !important;
  }

  .queryForm .el-input__inner, .el-form-item__label {
    font-size: 22px !important;
    line-height: 45px !important;
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