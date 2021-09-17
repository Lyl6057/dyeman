<!--
 * @Author: Lyl
 * @Date: 2021-08-07 07:57:44
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-05 11:12:18
 * @Description: 
-->
<template>
  <div id="codeCard">
    <el-row>
      <el-col :span="16">
        <view-container
          title="出缸/定型码卡"
          v-loading="wloading"
          element-loading-text="拼命加载中..."
        >
          <el-row class="formBox">
            <avue-form
              ref="form"
              :option="crudOp"
              v-model="form"
              style="margin-top: 15px"
            ></avue-form>
          </el-row>
          <el-row
            class="btnList"
            style="text-align: center; width: 98%; margin: 0 auto; height: 40px"
          >
            <span>张数</span>
            <el-input
              v-model="sheetNum"
              type="number"
              style="width: 70px; margin-right: 20px"
            ></el-input>
            <!-- <el-tooltip
          class="item"
          effect="dark"
          content="cập nhật"
          placement="top-start"
        > -->
            <el-button type="primary" @click="query" :disabled="!form.vatNo"
              >查询</el-button
            >
            <!-- </el-tooltip> -->
            <!-- <el-tooltip
          class="item"
          effect="dark"
          content="cập nhật"
          placement="top-start"
        > -->
            <el-button type="primary" :disabled="!form.vatNo" @click="print(1)"
              >出缸</el-button
            >
            <!-- </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="cập nhật"
          placement="top-start"
        > -->
            <el-button type="primary" :disabled="!form.vatNo" @click="print(2)"
              >定后</el-button
            >
            <!-- </el-tooltip> -->
            <!-- <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button> -->
          </el-row>
        </view-container></el-col
      >
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
                :content="'缸号' + item.vatNo + ' 重量' + item.sumWeight"
                placement="top"
              >
                <div class="history">
                  <span>缸号: {{ item.vatNo }}</span>
                  <span> 重量: {{ item.sumWeight }}</span>
                  <el-tag
                    style="float: right; margin-top: 14px; margin-right: 5px"
                    >{{ item.appState == 1 ? "出缸" : "定后" }}</el-tag
                  >
                  <!-- <span>验布员工号: {{ item.clothChecker }}</span> -->
                </div>
              </el-tooltip>
              <!-- <el-divider style="margin: 0"></el-divider> -->
            </div>
          </el-card>
        </view-container>
      </el-col>
    </el-row>

    <el-dialog
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
        :type="type"
        @close="dialogVisible = false"
        @refresh="query"
      ></tem-dlg>
    </el-dialog>
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
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { get, add, update, del, print, getJob, getWeave } from "./api";
import tem from "./temDlg";
import { webSocket } from "@/config/index.js";
export default {
  name: "",
  components: {
    temDlg: tem,
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      vatForm: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSizes: [20, 50, 100, 200, 500],
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      sheetNum: 1,
      loading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
      input: "",
      wloading: false,
      czsocket: {},
      pdfDlg: false,
      pdfUrl: "",
      type: this.$route.params.type,
      prsocket: null,
      tabs: "form",
      history: [],
    };
  },
  watch: {},
  created() {
    this.form.appDate = this.$getNowTime("date");
  },
  methods: {
    query() {
      this.wloading = true;
      this.detail = {};
      if (!this.form.vatNo) {
        this.wloading = false;
        this.$tip.warning("暂无数据");
        return;
      }
      getJob({
        // rows: this.page.pageSize,
        // start: this.page.currentPage,
        vatNo: this.form.vatNo,
      }).then((res) => {
        if (res.data.length > 0) {
          let val = res.data[0];
          this.form = res.data[0];
          this.form.vatNo = val.vatNo;
          this.form.custName = val.custName;
          this.form.colorName = val.colorName;
          this.form.colorNo = val.colorCode;
          this.form.custCode = val.custCode;
          this.form.fabricName = val.fabName;
          this.form.sumWeight = val.clothWeight;
          this.form.pidCount = val.pidCount;
          this.form.colorStandard = val.compVatNo;
          this.form.colorLights = val.compLightSource;
          this.form.custBatchNo = val.salPoNo;
          // getWeave({
          //   weaveJobCode: this.form.weaveJobCode,
          // }).then((weave) => {
          //   this.form.custBatchNo = weave.data[0].custPoNo;
          this.$tip.success("查询成功!");
          // });
        } else {
          this.form.vatNo = "";
          this.form.custName = "";
          this.form.colorName = "";
          this.form.colorNo = "";
          this.form.custCode = "";
          this.form.fabricName = "";
          this.form.pidCount = null;
          this.form.sumWeight = null;
          this.form.custBatchNo = "";
          this.$tip.warning("暂无数据!");
        }
        setTimeout(() => {
          this.wloading = false;
        }, 200);
      });
    },
    print(type) {
      this.$refs.form.validate((valid, done) => {
        if (valid) {
          try {
            this.$tip
              .cofirm(
                "是否确认打印缸号为 【" +
                  this.form.vatNo +
                  " 】的" +
                  (type == 1 ? "出缸" : "定后") +
                  "码卡",
                this,
                {}
              )
              .then(() => {
                get({
                  vatNo: this.form.vatNo,
                  appState: type,
                }).then((res) => {
                  if (res.data.length) {
                    // 更新数据
                    let data = JSON.parse(JSON.stringify(this.form));
                    data.cardId = res.data[0].cardId;
                    data.appState = res.data[0].appState;
                    if (data.appDate && data.appDate.indexOf(" ") < 0) {
                      data.appDate += " 00:00:00";
                    }
                    update(data).then((res) => {});
                    this.history.unshift(data);
                    this.history = this.$unique(this.history, "cardId");
                    // 发送打印请求
                    if (this.sheetNum) {
                      for (let i = 0; i < this.sheetNum; i++) {
                        setTimeout(() => {
                          this.prsocket.send("appColor:" + res.data[0].cardId);
                        }, 200);

                        if (i == this.sheetNum - 1) {
                          this.$tip.success("已发送全部打印请求!");
                          done();
                        }
                      }
                    } else {
                      this.prsocket.send("appColor:" + res.data[0].cardId);
                      this.$tip.success("已发送打印请求!");
                      done();
                    }
                  } else {
                    // 新增后再发送请求
                    let data = JSON.parse(JSON.stringify(this.form));
                    if (data.appDate && data.appDate.indexOf(" ") < 0) {
                      data.appDate += " 00:00:00";
                    }
                    data.custName = data.$custCodex;
                    data.appState = type;
                    add(data).then((res) => {
                      if (res.data.code == 200) {
                        data.cardId = res.data.data;
                        this.history.unshift(data);
                        this.history = this.$unique(this.history, "cardId");
                        this.prsocket.send("appColor:" + res.data.data);
                      }
                      done();
                    });
                  }
                });
              })
              .catch((err) => {
                done();
                this.$tip.warning(this.$t("public.qxcz"));
              });
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
    cellClick(val) {
      this.detail = val;
    },
    setCz() {
      webSocket.setPrint(this);
      let _this = this;
      _this.prsocket.onmessage = function (e) {};
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
    next();
  },
};
</script>
<style lang="stylus">
#codeCard {
  .el-tag {
    font-size: 16px;
  }

  .avue-form .el-input--mini input {
    height: 48px !important;
    line-height: 48px !important;
  }

  .el-input__inner, .el-form-item__label {
    font-size: 22px !important;
    line-height: 45px !important;
  }

  .el-button, .el-button--mini.is-round {
    padding: 8px 12px 8px 12px !important;
    font-size: 20px !important;
    margin-left: 20px;
  }

  .historText {
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