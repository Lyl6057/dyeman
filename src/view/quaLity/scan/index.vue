<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-06 15:10:52
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
      <!-- </el-row> -->
      <el-row class="formBox" style="margin-top: 5px">
        <avue-form ref="form" :option="formOp" v-model="form">
          <template slot-scope="scope" slot="qcClothCheckItem">
            <el-button
              type="primary"
              @click="qcDlg = true"
              style="margin-top: 10px"
              >选择检验项目</el-button
            >
          </template>
        </avue-form>
      </el-row>
      <el-row class="crudBox">
        <el-col :span="5">
          <view-container title="载具信息">
            <el-card
              class="border-card"
              style="
                height: calc(100vh - 400px);
                overflow: auto;
                margin-bottom: 50px;
              "
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
              <div
                style="
                  height: 45px;
                  line-height: 45px;
                  position: absolute;
                  bottom: 0;
                  background: #fff;
                  left: 0;
                  width: 100%;
                  font-size: 18px;
                  font-weight: 700;
                "
              >
                共:{{ Load.length }} 疋，总: {{ clothSum }} KG
              </div>
            </el-card>
          </view-container>
        </el-col>
        <el-col :span="14">
          <el-tabs type="border-card" v-model="tabs">
            <el-tab-pane name="pb" label="胚布信息">
              <div style="height: calc(100vh - 350px); overflow: auto">
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
                  <el-col :span="10"
                    >验布员工号: {{ crud.clothChecker }}</el-col
                  >
                  <el-col :span="14">值机工号: {{ crud.workNo }}</el-col>
                </el-row>

                <el-row class="text item">
                  <el-col :span="10">载具编号: {{ crud.storeLoadCode }}</el-col>
                  <el-col :span="14">存储位置: {{ crud.storeSiteCode }}</el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane name="qc" label="验布项目">
              <div style="height: calc(100vh - 350px); overflow: auto">
                <avue-form
                  ref="form"
                  :option="checkForm"
                  v-model="checkQc"
                  style="margin-top: 10px"
                >
                </avue-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="5">
          <view-container title="历史胚布">
            <el-card
              class="border-card"
              style="height: calc(100vh - 350px); overflow: auto"
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
        <el-dialog
          title
          :visible.sync="qcDlg"
          id="qcItemDlg"
          fullscreen
          append-to-body
          :close-on-click-modal="false"
          v-if="qcDlg"
        >
          <view-container title="选择检验项目">
            <div class="btnList" style="height: 38px">
              <el-button type="success" @click="check">确定</el-button>
              <el-button type="warning" @click="qcDlg = false">{{
                this.$t("public.close")
              }}</el-button>
              <span style="margin-left: 10px; font-size: 16px">疵点类型:</span>
              <el-select
                v-model="qcType"
                multiple
                placeholder="请选择"
                style="width: 350px"
                @change="typeChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div
              class="formBox qc-check-item"
              style="height: calc(100vh - 120px); overflow: auto"
            >
              <avue-form ref="form" :option="qcForm" v-model="qcItem">
              </avue-form>
            </div>
          </view-container>
        </el-dialog>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm } from "./data";
import { webSocket } from "@/config/index.js";
import {
  get,
  add,
  update,
  del,
  getWeave,
  getQcItem,
  getQcRecord,
  addQcRecord,
  updateQcRecord,
} from "./api";
export default {
  name: "",
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      // crudOp: mainCrud(this),
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
      qcDlg: false,
      checkAll: false,
      qcItem: {},
      qcItems: [],
      isIndeterminate: true,
      qcForm: {
        submitBtn: false,
        emptyBtn: false,
        // labelPosition: "top",
        labelWidth: 250,
        group: [],
      },
      qcType: [],
      options: [
        {
          label: "纱疵",
          value: 1,
        },
        {
          label: "织疵",
          value: 2,
        },
        {
          label: "染疵",
          value: 3,
        },
        {
          label: "结构",
          value: 4,
        },
      ],
      tabs: "pb",
      checkForm: {
        submitBtn: false,
        emptyBtn: false,
        labelPosition: "top",
        labelWidth: 150,
        column: [],
      },
      checkQc: {},
      dicArr: [
        {
          value: "A",
          label: "A",
        },
        {
          value: "B",
          label: "B",
        },
        {
          value: "C",
          label: "C",
        },
        {
          value: "D",
          label: "D",
        },
        {
          value: "E",
          label: "E",
        },
      ],
      clothSum: 0,
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
      if (!this.form.storeLoadCodes) {
        this.form.noteCode = "";
        this.$tip.warning("请先扫描或输入载具编号!");
        return;
      }
      // if (
      //   this.Load.length &&
      //   this.clothSum >= 1000 &&
      //   this.form.storeLoadCodes == this.Load[0].storeLoadCode
      // ) {
      //   this.$tip.error("该载具超重，请重新选择载具!");
      //   return;
      // }
      // this.wLoading = true;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      get(this.form).then((res) => {
        if (res.data.length) {
          this.crud = res.data[0];
          if (this.crud.clothState && this.crud.clothState != "1") {
            this.$tip.error("此胚布已入库,请重新确认!");
            this.wLoading = false;
            return;
          }
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
          if (Object.keys(this.checkQc).length > 0) {
            getQcRecord({
              proClothNoteFk: this.crud.noteId,
            }).then((note) => {
              if (note.data.length) {
                // update
                let data = note.data[0];
                for (let key in this.checkQc) {
                  // if (this.qcItem[key]) {
                  data[key] =
                    this.checkQc[key] instanceof Array
                      ? this.checkQc[key].join(",")
                      : this.checkQc[key];
                  // }
                }
                data.checkDate = this.$getNowTime("datetime");
                updateQcRecord(data).then((res) => {});
              } else {
                // add
                let data = {};
                for (let key in this.checkQc) {
                  if (this.checkQc[key]) {
                    data[key] =
                      this.checkQc[key] instanceof Array
                        ? this.checkQc[key].join(",")
                        : this.checkQc[key];
                  }
                }
                data.proClothNoteFk = this.crud.noteId;
                data.checkDate = this.$getNowTime("datetime");
                addQcRecord(data).then((res) => {});
              }
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
      this.crud.clothState = "1";
      update(this.crud).then((res) => {
        if (res.data.code == 200) {
          setTimeout(() => {
            this.history.unshift(this.crud);
            this.history = this.$unique(this.history, "noteId");
            this.getLoad();
            setTimeout(() => {
              this.form.noteCode = "";
            }, 500);
            for (let key in this.checkQc) {
              this.checkQc[key] = "";
            }
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

      get({ storeLoadCode: this.form.storeLoadCodes, clothState: 1 }).then(
        (res) => {
          this.wLoading = true;
          if (res.data.length) {
            this.Load = res.data;
            this.clothSum = 0;
            this.Load.forEach((item) => {
              this.clothSum += item.clothWeight;
            });
            this.clothSum = this.clothSum.toFixed(2);
            setTimeout(() => {
              this.wLoading = false;
            }, 200);
          } else {
            // this.$tip.warning("暂无数据!");
            setTimeout(() => {
              this.form.noteCode = "";
              this.wLoading = false;
            }, 500);
          }
        }
      );
    },
    check() {
      // console.log(this.qcItem);
      // this.form.qcClothCheckItem = this.qcItem;
      // this.form.qcClothCheckItem = "";
      this.checkForm.column = [];

      for (let key in this.qcItem) {
        if (
          this.qcItem[key] &&
          key.indexOf("$") == -1 &&
          key.indexOf("-all") == -1
        ) {
          // this.form.qcClothCheckItem +=
          //   key.split("-")[0] + ":" + this.qcItem[key] + ";";
          this.checkForm.column.push({
            label: key.split("-")[0],
            prop: key.split("-")[1],
            span: 12,
            type: key.split("-")[2] == "1" ? "input" : "checkbox",
            dicData: key.split("-")[2] == "1" ? [] : this.dicArr,
          });
          // this.checkQc[key.split("-")[1]] = this.qcItem[key];
        }
      }
      this.checkForm.column.push({
        label: "备注",
        prop: "remark",
        span: 24,
      });
      this.tabs = "qc";
      this.qcDlg = false;
    },
    cellClick(val) {
      this.detail = val;
    },
    checkHandle(val) {
      this.qcForm.group[val.column.prop.split("-")[0]].column.forEach(
        (item, index) => {
          if (index != 0) {
            this.qcItem[item.prop] = val.value;
          }
        }
      );
    },
    typeChange() {
      getQcItem().then((res) => {
        res.data.sort((a, b) => a.sn - b.sn);
        res.data = res.data.filter(
          (a) => this.qcType.indexOf(a.checkType) != -1
        );
        let _this = this;
        this.qcItems = res.data;
        this.qcForm.group = [];
        this.qcForm.group[0] = {};
        this.qcForm.group[1] = {};
        this.qcForm.group[2] = {};
        this.qcForm.group[3] = {};
        this.qcType.forEach((item) => {
          this.qcForm.group[item - 1] = {
            icon: "el-icon-info",
            label:
              item == 1
                ? "纱疵"
                : item == 2
                ? "织疵"
                : item == 3
                ? "染疵"
                : "结构",
            prop: "basic" + item,
            // labelPosition: "top",
            column: [
              {
                label: "全选",
                prop: item - 1 + "-all",
                type: "switch",
                span: 6,
                dicData: [
                  {
                    value: false,
                    label: "",
                  },
                  {
                    value: true,
                    label: "",
                  },
                ],
                change: (val) => {
                  this.checkHandle(val);
                },
              },
            ],
          };
          this.qcItem[item - 1 + "-all"] = false;
        });
        res.data.forEach((item) => {
          this.qcForm.group[item.checkType - 1].column.push({
            label: item.itemName,
            prop:
              item.itemName +
              "-checkItem" +
              item.sn +
              "Value-" +
              item.valueType,
            span: 6,
            type: "switch",
            dicData: [
              {
                value: false,
                label: "",
              },
              {
                value: true,
                label: "",
              },
            ],
          });
          this.qcItem[
            item.itemName + "-checkItem" + item.sn + "Value-" + item.valueType
          ] = false;
        });
      });
    },
  },
  created() {},
  mounted() {
    this.setCz();
    this.qcType = [1, 2, 3, 4];
    this.typeChange();
    // this.formOp.column[7].dicData = this.qcItems;
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

.el-tag {
  font-size: 16px !important;
}

.el-radio__label {
  font-size: 17px;
}

#qcItemDlg {
  .avue-group__header, .el-collapse-item__header {
    margin-bottom: 0px;
    height: 35px;
    line-height: 35px;
    background: #eee;
    font-size: 24px;
  }

  .avue-group .el-collapse-item__arrow {
    margin-top: 0;
  }
}

// .qc-check-item .el-checkbox {
// width: 25%;
// margin: 3px 0;
// overflow: hidden;
// }
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

  .el-checkbox-group {
    text-align: left;
  }

  .el-divider--horizontal {
    margin: 0;
  }

  .formBox .el-form-item__label, .formBox .el-input__inner {
    font-size: 22px !important;
    line-height: 50px !important;
  }

  .el-tabs__item, .el-button {
    font-size: 18px !important;
  }

  .formBox .avue-form .el-input--mini input {
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
    height: 46px;
    line-height: 46px;
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