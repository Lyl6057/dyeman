<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-02 11:11:36
 * @Description: 
-->
<template>
  <div
    id="clothFlyScan"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container title="QC验布">
      <!-- <el-row class="btnList"> -->
      <!-- <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button> -->
      <!-- <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button> -->

      <!-- <el-button type="success" @click="print">打印</el-button> -->
      <!-- <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button> -->
      <!-- </el-row> -->
      <el-row class="formBox" style="margin-top: 5px">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <el-col :span="5">
          <view-container title="载具信息">
            <el-card
              class="border-card"
              style="height: calc(100vh - 320px); overflow: auto"
              id="history"
            >
              <div
                class="text item"
                v-for="item in Load"
                :key="item.noteId"
                style="border-bottom: 1px solid #eee"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    '布票号' +
                    item.noteCode +
                    ' 重量' +
                    item.clothWeight +
                    ' 载具编号' +
                    item.storeLoadCode
                  "
                  placement="top"
                >
                  <div class="history">
                    <span>布票号: {{ item.noteCode }}</span>
                    <span> 重量: {{ item.clothWeight }}</span>
                    <!-- <span>验布员工号: {{ item.clothChecker }}</span> -->
                  </div>
                </el-tooltip>
                <!-- <el-divider style="margin: 0"></el-divider> -->
              </div>
            </el-card>
          </view-container>
        </el-col>
        <el-col :span="14">
          <view-container title="胚布信息">
            <el-card
              class="box-card"
              style="height: calc(100vh - 320px); overflow: auto"
            >
              <!-- <div slot="header" class="clearfix">
              <span>布票信息</span>
            </div> -->
              <el-row class="text item">
                <el-col :span="10">生产单号: {{ crud.weaveJobCode }}</el-col>
                <el-col :span="14">布票号: {{ crud.noteCode }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">客户编号: {{ crud.customerName }}</el-col>
                <el-col :span="14">订单号: {{ crud.poNo }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="24">布类名称: {{ crud.fabricName }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">机号: {{ crud.loomNo }}</el-col>
                <el-col :span="14">顏色: {{ crud.proColor }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">匹號: {{ crud.eachNumber }}</el-col>
                <el-col :span="14">打印时间: {{ crud.printedTime }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">重量: {{ crud.clothWeight }}</el-col>
                <el-col :span="14">重量单位: {{ crud.weightUnit }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">QC扣减数量: {{ crud.qcTakeOut }}</el-col>
                <el-col :span="14">毛重: {{ crud.realWeight }}</el-col>
              </el-row>
              <el-row class="text item">
                <el-col :span="10">验布员工号: {{ crud.clothChecker }}</el-col>
                <el-col :span="14">值机工号: {{ crud.workNo }}</el-col>
              </el-row>

              <el-row class="text item">
                <el-col :span="10">载具编号: {{ crud.storeLoadCode }}</el-col>
                <el-col :span="14">存储位置: {{ crud.storeSiteCode }}</el-col>
              </el-row>

              <!-- <div class="btnBox">
                <el-button
                  type="success"
                  class="button"
                  :disabled="!crud.noteId"
                  @click="save"
                  >保存</el-button
                >
                <el-button
                  type="primary"
                  class="button"
                  @click="weighing"
                  :disabled="!crud.noteId"
                  >称重</el-button
                >
              </div> -->
            </el-card>
          </view-container>
        </el-col>
        <el-col :span="5">
          <view-container title="历史胚布">
            <el-card
              class="border-card"
              style="height: calc(100vh - 320px); overflow: auto"
              id="history"
            >
              <div
                class="text item"
                v-for="item in history"
                :key="item.noteId"
                style="border-bottom: 1px solid #eee"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    '布票号' +
                    item.noteCode +
                    ' 重量' +
                    item.clothWeight +
                    ' 验布员工号' +
                    item.clothChecker
                  "
                  placement="top"
                >
                  <div class="history">
                    <span>布票号: {{ item.noteCode }}</span>
                    <span> 重量: {{ item.clothWeight }}</span>
                    <!-- <span>验布员工号: {{ item.clothChecker }}</span> -->
                  </div>
                </el-tooltip>
                <!-- <el-divider style="margin: 0"></el-divider> -->
              </div>
            </el-card>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import { webSocket } from "@/config/index.js";
import { get, add, update, del, getWeave } from "./api";
export default {
  name: "",
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: {},
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      history: [],
      Load: [],
      loading: false,
      dialogVisible: false,
      detail: {},
      weight: 0,
      czsocket: {},
      changeList: [],
      wLoading: false,
      time: null,
    };
  },
  watch: {},
  methods: {
    query() {
      if (!this.form.noteCode) {
        this.$tip.warning("布票号不能为空!");
        return;
      }
      if (!this.form.clothCheckers) {
        this.form.noteCode = "";
        this.$tip.warning("请先扫描或输入员工条码!");
        return;
      }
      this.wLoading = true;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      get(this.form).then((res) => {
        if (res.data.length) {
          this.crud = res.data[0];
          if (this.form.clothCheckers) {
            this.crud.clothChecker = this.form.clothCheckers;
          }
          if (this.form.eachNumbers) {
            this.crud.clothWeight = this.form.eachNumbers;
          }
          if (this.form.workNos) {
            this.crud.workNo = this.form.workNos;
          }
          if (this.form.qcTakeOuts) {
            this.crud.qcTakeOut = this.form.qcTakeOuts;
          }
          if (this.form.storeLoadCodes) {
            this.crud.storeLoadCode = this.form.storeLoadCodes;
          }
          if (this.form.storeSiteCodes) {
            this.crud.storeSiteCode = this.form.storeSiteCodes;
          }
          if (this.crud.weaveJobFk) {
            getWeave({ weaveJobId: this.crud.weaveJobFk }).then((weave) => {
              this.crud.weaveJobCode = weave.data[0].weaveJobCode;
            });
          }
          this.save();
          // this.form.noteCode = "";
        } else {
          this.$tip.warning("暂无数据!");
          setTimeout(() => {
            this.wLoading = false;
            this.form.noteCode = "";
          }, 500);
        }
        // setTimeout(() => {
        //   this.wLoading = false;
        // }, 200);
      });
    },
    handleRowDBLClick(val) {
      this.detail = val;
      // this.print();
    },
    setCz() {
      webSocket.setCz(this);
      let _this = this;
      _this.czsocket.onmessage = function (e) {
        _this.form.eachNumbers = e.data;
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
    weighing() {
      if (this.czsocket.readyState == 3) {
        this.$tip.error("称重应用未启动，请启动后重新进入此页面!");
        return;
      }
      setTimeout(() => {
        this.crud.clothWeight = this.form.eachNumbers;
      }, 200);
    },
    save() {
      this.wLoading = true;
      this.crud.clothCheckTime = this.$getNowTime("datetime");
      this.crud.realWeight =
        Number(this.crud.clothWeight) + Number(this.crud.qcTakeOut);
      update(this.crud).then((res) => {
        if (res.data.code == 200) {
          setTimeout(() => {
            this.history.unshift(this.crud);
            this.history = this.$unique(this.history, "noteId");
            this.getLoad();
            setTimeout(() => {
              this.form.noteCode = "";
            }, 500);

            if (this.history.length >= 30) {
              this.history.pop();
            }
            // this.$nextTick(() => {
            //   const dom1 = document.getElementById("history");
            //   dom1.scrollTo(0, dom1.scrollHeight);
            // });
            // this.wLoading = false;
            this.$tip.success(this.$t("public.bccg"));
          }, 200);
        } else {
          this.wLoading = false;
          this.$tip.success(this.$t("public.bcsb"));
        }
      });
    },
    getLoad() {
      this.Load = [];
      if (!this.form.storeLoadCodes) {
        this.wLoading = false;
        // this.$tip.warning("载具不能为空!");
        return;
      }

      get({ storeLoadCode: this.form.storeLoadCodes }).then((res) => {
        this.wLoading = true;
        if (res.data.length) {
          this.Load = res.data;
        } else {
          // this.$tip.warning("暂无数据!");
          setTimeout(() => {
            this.form.noteCode = "";
          }, 500);
        }
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      });
    },
    cellClick(val) {
      this.detail = val;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
  },
  created() {},
  mounted() {
    this.setCz();
    let self = this;
    document.onkeydown = function (e) {
      let ev = document.all ? window.event : e;
      if (ev.keyCode === 13 && self.type === "bf") {
        self.query();
      } else if (ev.keyCode === 13 && self.type === "zj") {
        self.getLoad();
      }
    };
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  destroyed() {
    clearInterval(this.time);
  },
};
</script>
<style lang='stylus'>
.el-tooltip__popper {
  font-size: 18px !important;
}

#clothFlyScan {
  .history {
    // display: flex;
    // flex-direction: row;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    text-align: left;
    text-indent: 5px;

    span {
      margin: 5px;
    }
  }

  .el-divider--horizontal {
    margin: 0;
  }

  .el-form-item__label, .el-input__inner {
    font-size: 22px !important;
    line-height: 50px !important;
  }

  .el-tabs__item, .el-button {
    font-size: 18px !important;
  }

  .avue-form .el-input--mini input {
    height: 58px;
    line-height: 58px;
  }

  .el-card__header {
    padding: 8px 20px !important;
  }

  .btnBox {
    .el-button {
      margin: 0 20px;
      // width: 20%;
    }
  }

  .crudBox {
    height: 100vh;
  }

  .text {
    font-size: 22px;
    text-align: left;
    text-indent: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item {
    // margin-bottom: 18px;
    height: 48px;
    line-height: 48px;
  }

  .clearfix:before, .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }
}
</style>