<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: pmp
 * @LastEditTime: 2022-07-09 09:18:01
 * @Description:
-->
<template>
  <div id="clothFlyWeight" :element-loading-text="$t('public.loading')" v-loading="wLoading">
    <view-container title="成品码卡信息">
      <el-row class="btnList">
        <el-button type="primary" @click="dialogVisible = true" :disabled="!detail.cardId">{{ this.$t("public.update")
        }}</el-button>
        <el-button type="primary" @click="query">{{
            this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="print" :disabled="!selectList.length">打印</el-button>
        <el-button type="primary" @click="batchEdit" :disabled="!selectList.length">修改载具</el-button>
        <!-- <el-button type="danger" @click="del" :disabled="!selectList.length">{{
          this.$t("public.del")
        }}</el-button> -->
        <!-- <el-button type="primary" @click="outExcel1">导出</el-button> -->
        <!-- <el-button type="primary" @click="outExcel">导出明细表</el-button> -->
        <!-- <el-dropdown
          split-button
          type="primary"
          @click="outExcel(1)"
          style="margin-left: 10px"
        >
          导出QC明细
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="outExcel(1)"
              >公斤(KG)</el-dropdown-item
            >
            <el-dropdown-item @click.native="outExcel(0)"
              >磅(LBS)</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          split-button
          type="primary"
          @click="outQaExcel(1)"
          style="margin-left: 10px"
        >
          导出QA明细
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="outQaExcel(1)"
              >公斤(KG)</el-dropdown-item
            >
            <el-dropdown-item @click.native="outQaExcel(0)"
              >磅(LBS)</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown> -->
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query"
          @row-dblclick="handleRowDBLClick" @current-row-change="cellClick" @selection-change="selectionChange">
          <!--  @sort-change="sortChange" -->
          <!-- :summary-method="summaryMethod" -->
          <!-- <template slot="menu">
            <el-button size="small" type="primary" @click="weighing"
              >称重</el-button
            >
          </template> -->
        </avue-crud>
      </el-row>
      <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" width="70%" append-to-body
        :close-on-click-modal="false" :close-on-press-escape="false">
        <el-tabs type="border-card" v-model="tabs">
          <el-tab-pane label="修改" name="update">
            <div class="btnList">
              <el-button type="success" @click="save" :disabled="detail.clothState == 9 || detail.whseVouch == 9">{{
                  this.$t("public.save")
              }}</el-button>
              <el-button type="primary" @click="weighing">称重</el-button>
              <el-button type="warning" @click="dialogVisible = false">{{
                  this.$t("public.close")
              }}</el-button>
              <div style="float: right;margin-right: 17px;">
                电子秤读取： <el-switch v-model="useWeight" active-text="启用" inactive-text="停用"></el-switch>
              </div>
            </div>
            <div class="formBox">
              <avue-form ref="form" :option="dlgOp" v-model="detail"></avue-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="历史记录" name="history">
            <div class="btnList">
              <el-button type="primary" @click="recover">恢复</el-button>
              <el-button type="warning" @click="dialogVisible = false">{{
                  this.$t("public.close")
              }}</el-button>
            </div>
            <div class="formBox">
              <avue-crud ref="dlgCrud" :option="historyOp" :data="history" @current-row-change="historyCellClick"
                v-loading="loading" @selection-change="selectionChange" />
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- <view-container title="修改">
          
        </view-container> -->
      </el-dialog>
      <el-dialog id="normal_Dlg" title="请输入新的载具编号" :visible.sync="loadDialogVisible" width="30%" center append-to-body
        style="text-align: center">
        <el-input v-model="newLoad" placeholder="新载具编号(new vehicle number)"
          style="width: 50%; margin: 0 auto; text-align: center"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="loadDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="loadSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud, dlgForm, dlgCrud } from "./data";
import { webSocket } from "@/config/index.js";
import {
  get,
  add,
  update,
  del,
  getJob,
  updateNote,
  addInWhse,
  addInDtla,
  addInDtlb,
  getRevolve,
  getNotPage,
  getCodeHistory,
} from "./api";
import { getCheckItem } from "../finalCard/api";
import XlsxTemplate from "xlsx-template";
import JSZipUtils from "jszip-utils";
import saveAs from "file-saver";
export default {
  name: "",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
        clothState: "",
        // productNo: "",
      },
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 100,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      historyPage: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {
        weightUnit: "KG",
      },
      spowerClient: "",
      weight: 0,
      changeList: [],
      wLoading: false,
      selectList: [],
      options: [],
      oldData: {},
      sort: {},
      checkSum: 0,
      output: {},
      dlgOp: dlgForm(this),
      historyOp: dlgCrud(this),
      history: [],
      weightUnit: "KG",
      tabs: "update",
      historyCheck: {},
      loadDialogVisible: false,
      newLoad: "",
      weighData: {},
      useWeight: false
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      // let { prop, order } = this.sort;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      let data = JSON.parse(JSON.stringify(this.form));
      let r_clothCheckTime_r = "";
      if (data.clothCheckTime && data.clothCheckTime.length) {
        r_clothCheckTime_r = `!%5E%5b${data.clothCheckTime[0]} 07:30:00~${data.clothCheckTime[1]} 07:30:00%5d`;
      } else {
        r_clothCheckTime_r = "!%5E";
      }
      data.vatNo = "%" + (data.vatNo ? data.vatNo : "");
      data.storeLoadCode = "%" + (data.storeLoadCode ? data.storeLoadCode : "");
      data.clothChecker = "%" + (data.clothChecker ? data.clothChecker : "");
      data.clothCheckTime = null;
      get(
        Object.assign(data, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: true,
          // clothState: this.form.clothState,
          cardType: 1,
          delFlag: false,
        }),
        r_clothCheckTime_r
      ).then((res) => {
        this.crud = res.data.records;
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        this.crud.sort((a, b) => {
          return a.pidNo > b.pidNo ? 1 : -1;
        });
        this.crud.forEach((item, i) => {
          // item.$cellEdit = true;
          item.index = i + 1;
        });
        // this.form.vatNo = this.form.vatNo.replace(/[!^%]/g, "");
        // this.form.clothChecker = this.form.clothChecker.replace(/[!^%]/g, "");
        // this.form.storeLoadCode = this.form.storeLoadCode.replace(/[!^%]/g, "");
        this.page.total = res.data.total;
        // console.log(this.form);
        // if (this.form.productNo.indexOf("!^%") != -1) {
        //   this.form.productNo = this.form.productNo.split("!^%")[0] || "";
        // }
        setTimeout(() => {
          this.$refs.crud.setCurrentRow(this.crud[0] || {});
          this.wLoading = false;
        }, 200);
      });
    },
    handleRowDBLClick(val) {
      this.detail = val;
      this.weightUnit = val.weightUnit;
      this.dialogVisible = true;
    },
    outExcel1() {
      this.$refs.crud.rowExcel();
    },
    weighing() {
      if (!this.spowerClient || this.spowerClient.readyState == 3) {
        this.$tip.error("称重应用未启动，请启动后重新进入此页面!");
        return;
      } else {
        if (!this.weighData.weightUnit) {
          this.$tip.error("电子秤未连接!");
          return;
        }
        this.weighData.weightUnit == "KG" ? this.detail.netWeight = this.weighData.netWeight : this.detail.netWeightLbs = this.weighData.netWeightLbs;
      }
    },
    save() {
      if (!this.detail.netWeight || !this.detail.netWeightLbs) {
        this.$tip.error("重量不能为0!");
        this.wLoading = false;
        return;
      }
      this.wLoading = true;
      this.detail.productNo =
        this.detail.vatNo + this.$preFixInt(this.detail.pidNo, 3);
      update(this.detail).then((res) => {
        if (res.data.code == 200) {
          setTimeout(() => {
            this.dialogVisible = false;
            this.wLoading = false;
            this.query();
            this.$tip.success(this.$t("public.bccg"));
          }, 200);
        } else {
          this.wLoading = false;
          this.$tip.error(res.data.msg);
        }
      });
      // });
    },
    del() {
      this.$tip.cofirm("是否确定删除选中的数据?").then(() => {
        this.wLoading = true;
        this.selectList.forEach((item, i) => {
          del(item.cardId).then((res) => {
            if (i == this.selectList.length - 1) {
              this.$tip.success("删除成功！");
              this.query();
              setTimeout(() => {
                this.wLoading = false;
              }, 200);
            }
          });
        });
      });
    },
    recover() {
      this.$tip.cofirm("是否确定恢复到选中的数据?").then(() => {
        this.loading = true;
        this.detail.grossWeight = this.historyCheck.grossWeight;
        this.detail.grossWeightLbs = this.historyCheck.grossWeightLbs;
        this.detail.netWeight = this.historyCheck.netWeight;
        this.detail.netWeightLbs = this.historyCheck.netWeightLbs;
        this.detail.realGramWeight = this.historyCheck.realGramWeight;
        this.detail.actualSideBreadth = this.historyCheck.actualSideBreadth;
        this.detail.yardLength = this.historyCheck.yardLength;
        this.detail.clothChecker = this.historyCheck.clothChecker;
        update(this.detail).then((res) => {
          if (res.data.code == 200) {
            setTimeout(() => {
              this.dialogVisible = false;
              this.loading = false;
              this.query();
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          } else {
            this.wLoading = false;
            this.$tip.error(res.data.msg);
          }
        });
      });
    },
    group(arr, type) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai[type]]) {
          dest.push({
            [type]: ai[type],
            data: [ai],
          });
          map[ai[type]] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj[type] == ai[type]) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    cellClick(val) {
      this.detail = val;
      if (this.detail.weightUnit == "KG") {
        this.dlgOp.column[4].disabled = false;
        this.dlgOp.column[7].disabled = true;
      } else {
        this.dlgOp.column[4].disabled = true;
        this.dlgOp.column[7].disabled = false;
      }
      getCodeHistory({
        productCardFk: this.detail.cardId,
        // rows: this.historyPage.pageSize,
        // start: this.historyPage.currentPage,
        // pages: this.historyPage.currentPage,
      }).then((res) => {
        this.history = res.data.sort((a, b) => {
          return a.clothCheckTime > b.clothCheckTime ? -1 : 1;
        });
        // this.historyPage.total = res.data.total;
      });
    },
    historyCellClick(val) {
      this.historyCheck = val;
    },
    setCz() {
      this.spowerClient = this.$store.state.spowerClient;
      let _this = this;
      _this.spowerClient.onmessage = function (e) {
        let weight = e.data.indexOf(":") != -1 ? Number(e.data.replace(/[^\d.]/g, "")) : e.data;
        let unit = e.data.split(":")[1];
        _this.weighData.weightUnit = unit
        weight = Number((parseInt(Number(weight) * 10) / 10).toFixed(1));
        unit == "KG" ? _this.weighData.netWeight = weight : _this.weighData.netWeightLbs = weight;
        if (_this.useWeight) {
          _this.weighData.weightUnit == "KG" ? _this.detail.netWeight = _this.weighData.netWeight : _this.detail.netWeightLbs = _this.weighData.netWeightLbs;
        }
      };
    },
    codeLength() {
      if (
        !this.detail.realGramWeight ||
        !this.detail.actualSideBreadth ||
        !this.detail.netWeight ||
        this.detail.realGramWeight == 0
      ) {
        return;
      }
      let gramWeight, breadth;

      if (this.detail.gramWeightUnit == "Kg") {
        // 默认是 g
        gramWeight = Number(this.detail.realGramWeight);
      } else {
        gramWeight = Number(this.detail.realGramWeight / 1000);
      }

      if (this.detail.widthUnit != "INCH") {
        // 默认是 inch
        breadth = Number(this.detail.actualSideBreadth / 100);
      } else {
        breadth = Number((this.detail.actualSideBreadth * 2.54) / 100);
      }

      let weight = this.detail.netWeight;
      // gramWeight 单位为 g/m , breadth 单位为 inch 需要 * 2.54 转换成cm / 100 转换成 m
      this.detail.yardLength = parseInt(
        Number(weight / gramWeight / breadth) * 1.0936
      );
    },
    sortChange(val) {
      this.sort = val;
      this.query();
    },
    selectionChange(list) {
      this.selectList = list;
    },
    // summaryMethod({ columns, data }) {
    //   const sums = [];
    //   if (columns.length > 0) {
    //     columns.forEach((column, index) => {
    //       if (index == 0) {
    //         sums[index] = "合計";
    //       }
    //       if (index == 2) {
    //         let num = 0;
    //         this.selectList.forEach((item) => {
    //           num += Number(item.netWeight);
    //         });
    //         sums[index] = "選中重量：" + num.toFixed(1);
    //         this.checkSum = num.toFixed(1);
    //       }
    //     });
    //   }
    //   return sums;
    // },
    async outExcel(type) {
      if (!this.form.vatNo) {
        this.$tip.warning("请先输入缸号!");
        return;
      }
      this.wLoading = true;
      try {
        //获得Excel模板的buffer对象
        const exlBuf = await JSZipUtils.getBinaryContent(
          "./static/xlxsTemplate/finished_warehousing.xlsx"
        );
        // Create a template
        var template = new XlsxTemplate(exlBuf);
        // Replacements take place on first sheet
        var sheetNumber = "Sheet1";
        // 处理数据
        getRevolve({ vatNo: this.form.vatNo }).then((res) => {
          if (res.data.length) {
            this.output = res.data[0];
            this.output.sumWeight = type
              ? this.output.clothWeight
              : (this.output.clothWeight * 2.2046).toFixed(2);
            this.output.date = this.$getNowTime("date");
            this.output.type = type;
            getNotPage({ vatNo: this.form.vatNo, cardType: 1 }).then((list) => {
              let data = list.data.sort((a, b) => {
                return a.pidNo - b.pidNo;
              });
              if (!list.data.length) {
                this.$tip.warning("暂无此缸号数据!");
                this.wLoading = false;
                return;
              }
              let arr1 = [],
                arr2 = [],
                arr3 = [];
              this.output.unit = type ? "KG" : "LBS";
              this.output.weightKg = 0;
              this.output.weightLbs = 0;
              data = this.$unique(data, "pidNo");
              // const lineNum = Math.ceil(
              //   Number(data[data.length - 1].pidNo) / 3
              // ); // 行数
              const lineNum = 20;
              for (let i = 0; i < lineNum * 3; i++) {
                for (let j = 0; j <= data.length - 1; j++) {
                  data[j].weight = type
                    ? data[j].netWeight
                    : data[j].netWeightLbs;

                  if (i == data[j].pidNo - 1 && i < lineNum) {
                    // if (
                    //   data[j].storeLoadCode &&
                    //   load1.indexOf(data[j].storeLoadCode) == -1
                    // ) {
                    //   load1 += data[j].storeLoadCode + ",";
                    // }
                    // if (
                    //   data[j].storeSiteCode &&
                    //   h1.indexOf(data[j].storeSiteCode) == -1
                    // ) {
                    //   h1 += data[j].storeSiteCode + ",";
                    // }
                    arr1[i] = data[j];
                    break;
                  } else if (i == data[j].pidNo - 1 && i < lineNum * 2) {
                    // if (
                    //   data[j].storeLoadCode &&
                    //   load2.indexOf(data[j].storeLoadCode) == -1
                    // ) {
                    //   load2 += data[j].storeLoadCode + ",";
                    // }
                    // if (
                    //   data[j].storeSiteCode &&
                    //   h2.indexOf(data[j].storeSiteCode) == -1
                    // ) {
                    //   h2 += data[j].storeSiteCode + ",";
                    // }
                    arr2[i - lineNum] = data[j];
                    break;
                  } else if (i == data[j].pidNo - 1 && i < lineNum * 3) {
                    // if (
                    //   data[j].storeLoadCode &&
                    //   load3.indexOf(data[j].storeLoadCode) == -1
                    // ) {
                    //   load3 += data[j].storeLoadCode + ",";
                    // }
                    // if (
                    //   data[j].storeSiteCode &&
                    //   h3.indexOf(data[j].storeSiteCode) == -1
                    // ) {
                    //   h3 += data[j].storeSiteCode + ",";
                    // }
                    arr3[i - lineNum * 2] = data[j];
                    break;
                  }

                  if (j == data.length - 1) {
                    // 没有找到索引对应的数据，空数据
                    if (i < lineNum) {
                      arr1[i] = {
                        pidNo: i + 1,
                        weight: "",
                        yardLength: "",
                      };
                    } else if (i < lineNum * 2) {
                      arr2[i - lineNum] = {
                        pidNo: i + 1,
                        weight: "",
                        yardLength: "",
                      };
                    } else {
                      arr3[i - lineNum * 2] = {
                        pidNo: i + 1,
                        weight: "",
                        yardLength: "",
                      };
                    }
                  }
                }
              }
              data.forEach((item) => {
                this.output.weightKg += item.netWeight;
                this.output.weightLbs += item.netWeightLbs;
              });
              // data.forEach((item, index) => {
              //   this.output.weightKg += item.netWeight;
              //   this.output.weightLbs += item.netWeightLbs;
              //   item.weight = type ? item.netWeight : item.netWeightLbs;
              //   if (item.pidNo <= 20) {
              //     arr1.push(item);
              //   } else if (item.pidNo <= 40) {
              //     arr2.push(item);
              //   } else if (item.pidNo <= 60) {
              //     arr3.push(item);
              //   }
              // });
              this.output.num = data.length;
              this.output.weightKg = this.output.weightKg.toFixed(2);
              this.output.weightLbs = this.output.weightLbs.toFixed(2);
              this.output.loss =
                (
                  (this.output.weightKg / this.output.clothWeight - 1) *
                  100
                ).toFixed(2) + "%";
              let values = {
                output: this.output,
                arr1,
                arr2,
                arr3,
              };
              this.$nextTick(() => {
                template.substitute(sheetNumber, values);
                // Get binary data.
                var out = template.generate({ type: "blob" });
                let _this = this;
                let outE = function () {
                  return new Promise((resolve, reject) => {
                    let xlsxName =
                      "成品和胚布入仓明细表 " +
                      _this.output.custCode +
                      " bảng chi tiết nhập kho";
                    saveAs(out, xlsxName + ".xlsx");
                    resolve();
                  });
                };
                outE().then((res) => {
                  setTimeout(() => {
                    this.$tip.success("导出成功!");
                    this.wLoading = false;
                    // this.getData();
                  }, 1000);
                });
              });
            });
          } else {
            this.wLoading = false;
            this.$tip.warning("暂无此缸号数据!");
            return;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async outQaExcel(type) {
      if (!this.form.vatNo) {
        this.$tip.warning("请先输入缸号!");
        return;
      }
      // this.wLoading = true;
      try {
        //获得Excel模板的buffer对象
        const exlBuf = await JSZipUtils.getBinaryContent(
          "./static/xlxsTemplate/finished_qa_warehousing.xlsx"
        );
        // Create a template
        var template = new XlsxTemplate(exlBuf);
        // Replacements take place on first sheet
        var sheetNumber = "Sheet1";
        // 处理数据
        getRevolve({ vatNo: this.form.vatNo }).then((res) => {
          if (res.data.length) {
            this.output = res.data[0];
            this.output.sumWeight = type
              ? this.output.clothWeight
              : (this.output.clothWeight * 2.2046).toFixed(2);
            this.output.date = this.$getNowTime("date");
            this.output.type = type;
            getNotPage({ vatNo: this.form.vatNo, cardType: 1 }).then((list) => {
              let data = list.data.sort((a, b) => {
                return a.pidNo - b.pidNo;
              });
              if (!list.data.length) {
                this.$tip.warning("暂无此缸号数据!");
                this.wLoading = false;
                return;
              }
              let arr1 = [],
                arr2 = [],
                arr3 = [];
              this.output.unit = type ? "KG" : "LBS";
              this.output.weightKg = 0;
              this.output.weightLbs = 0;
              this.output.lengthSum = 0;
              this.output.pidSum = data.length;
              this.output.length1 = 0;
              this.output.length2 = 0;
              this.output.length3 = 0;
              let load1 = "",
                load2 = "",
                load3 = "",
                h1 = "",
                h2 = "",
                h3 = "";
              data = this.$unique(data, "pidNo");
              // const lineNum = Math.ceil(
              //   Number(data[data.length - 1].pidNo) / 3
              // ); // 行数
              const lineNum = 20;
              for (let i = 0; i < lineNum * 3; i++) {
                for (let j = 0; j <= data.length - 1; j++) {
                  data[j].weight = type
                    ? data[j].netWeight
                    : data[j].netWeightLbs;
                  if (i == data[j].pidNo - 1 && i < lineNum) {
                    if (
                      data[j].storeLoadCode &&
                      load1.indexOf(data[j].storeLoadCode) == -1
                    ) {
                      load1 += data[j].storeLoadCode + ",";
                    }
                    if (
                      data[j].storeSiteCode &&
                      h1.indexOf(data[j].storeSiteCode) == -1
                    ) {
                      h1 += data[j].storeSiteCode + ",";
                    }
                    arr1[i] = data[j];
                    this.output.length1++;
                    break;
                  } else if (i == data[j].pidNo - 1 && i < lineNum * 2) {
                    if (
                      data[j].storeLoadCode &&
                      load2.indexOf(data[j].storeLoadCode) == -1
                    ) {
                      load2 += data[j].storeLoadCode + ",";
                    }
                    if (
                      data[j].storeSiteCode &&
                      h2.indexOf(data[j].storeSiteCode) == -1
                    ) {
                      h2 += data[j].storeSiteCode + ",";
                    }
                    arr2[i - lineNum] = data[j];
                    this.output.length2++;
                    break;
                  } else if (i == data[j].pidNo - 1 && i < lineNum * 3) {
                    if (
                      data[j].storeLoadCode &&
                      load3.indexOf(data[j].storeLoadCode) == -1
                    ) {
                      load3 += data[j].storeLoadCode + ",";
                    }
                    if (
                      data[j].storeSiteCode &&
                      h3.indexOf(data[j].storeSiteCode) == -1
                    ) {
                      h3 += data[j].storeSiteCode + ",";
                    }
                    arr3[i - lineNum * 2] = data[j];
                    this.output.length3++;
                    break;
                  }

                  if (j == data.length - 1) {
                    // 没有找到索引对应的数据，空数据
                    if (i < lineNum) {
                      arr1[i] = {
                        pidNo: i + 1,
                        weight: "",
                        yardLength: "",
                      };
                    } else if (i < lineNum * 2) {
                      arr2[i - lineNum] = {
                        pidNo: i + 1,
                        weight: "",
                        yardLength: "",
                      };
                    } else {
                      arr3[i - lineNum * 2] = {
                        pidNo: i + 1,
                        weight: "",
                        yardLength: "",
                      };
                    }
                  }
                }
              }
              data.forEach((item) => {
                this.output.weightKg += item.netWeight;
                this.output.weightLbs += item.netWeightLbs;
                this.output.lengthSum += item.yardLength;
              });
              // data.forEach((item, index) => {
              //   this.output.weightKg += item.netWeight;
              //   this.output.weightLbs += item.netWeightLbs;
              //   this.output.lengthSum += item.yardLength;
              //   item.weight = type ? item.netWeight : item.netWeightLbs;
              //   // for (let i = 1; i <= 60; i++) {
              //   //   if (item.pidNo == i && i <= 20) {
              //   //     if (
              //   //       item.storeLoadCode &&
              //   //       load1.indexOf(item.storeLoadCode) == -1
              //   //     ) {
              //   //       load1 += item.storeLoadCode + ",";
              //   //     }
              //   //     if (
              //   //       item.storeSiteCode &&
              //   //       h1.indexOf(item.storeSiteCode) == -1
              //   //     ) {
              //   //       h1 += item.storeSiteCode + ",";
              //   //     }
              //   //     arr1.push(item);
              //   //     break;
              //   //   } else if (item.pidNo == i && i <= 40) {
              //   //     if (
              //   //       item.storeLoadCode &&
              //   //       load2.indexOf(item.storeLoadCode) == -1
              //   //     ) {
              //   //       load2 += item.storeLoadCode + ",";
              //   //     }
              //   //     if (
              //   //       item.storeSiteCode &&
              //   //       h2.indexOf(item.storeSiteCode) == -1
              //   //     ) {
              //   //       h2 += item.storeSiteCode + ",";
              //   //     }
              //   //     arr2.push(item);
              //   //     break;
              //   //   } else if (item.pidNo == i && i <= 60) {
              //   //     if (
              //   //       item.storeLoadCode &&
              //   //       load3.indexOf(item.storeLoadCode) == -1
              //   //     ) {
              //   //       load3 += item.storeLoadCode + ",";
              //   //     }
              //   //     if (
              //   //       item.storeSiteCode &&
              //   //       h3.indexOf(item.storeSiteCode) == -1
              //   //     ) {
              //   //       h3 += item.storeSiteCode + ",";
              //   //     }
              //   //     arr3.push(item);
              //   //     break;
              //   //   }
              //   // }
              //   if (item.pidNo <= 20) {
              //     if (
              //       item.storeLoadCode &&
              //       load1.indexOf(item.storeLoadCode) == -1
              //     ) {
              //       load1 += item.storeLoadCode + ",";
              //     }
              //     if (
              //       item.storeSiteCode &&
              //       h1.indexOf(item.storeSiteCode) == -1
              //     ) {
              //       h1 += item.storeSiteCode + ",";
              //     }
              //     // arr1.push(item);
              //   } else if (item.pidNo <= 40) {
              //     if (
              //       item.storeLoadCode &&
              //       load2.indexOf(item.storeLoadCode) == -1
              //     ) {
              //       load2 += item.storeLoadCode + ",";
              //     }
              //     if (
              //       item.storeSiteCode &&
              //       h2.indexOf(item.storeSiteCode) == -1
              //     ) {
              //       h2 += item.storeSiteCode + ",";
              //     }
              //     // arr2.push(item);
              //   } else if (item.pidNo <= 60) {
              //     if (
              //       item.storeLoadCode &&
              //       load3.indexOf(item.storeLoadCode) == -1
              //     ) {
              //       load3 += item.storeLoadCode + ",";
              //     }
              //     if (
              //       item.storeSiteCode &&
              //       h3.indexOf(item.storeSiteCode) == -1
              //     ) {
              //       h3 += item.storeSiteCode + ",";
              //     }
              //     // arr3.push(item);
              //   }
              // });
              this.output.load1 = load1.substr(0, load1.length - 1);
              this.output.load2 = load2.substr(0, load2.length - 1);
              this.output.load3 = load3.substr(0, load3.length - 1);
              this.output.h1 = h1.substr(0, h1.length - 1);
              this.output.h2 = h2.substr(0, h2.length - 1);
              this.output.h3 = h3.substr(0, h3.length - 1);

              this.output.num = data.length;
              this.output.weightKg = this.output.weightKg.toFixed(2);
              this.output.weightLbs = this.output.weightLbs.toFixed(2);
              this.output.loss =
                (
                  (this.output.weightKg / this.output.clothWeight - 1) *
                  100
                ).toFixed(2) + "%";
              let values = {
                output: this.output,
                arr1,
                arr2,
                arr3,
              };
              this.$nextTick(() => {
                template.substitute(sheetNumber, values);
                // Get binary data.
                var out = template.generate({ type: "blob" });
                let _this = this;
                let outE = function () {
                  return new Promise((resolve, reject) => {
                    let xlsxName =
                      "入仓明细表 " +
                      _this.output.custCode +
                      " bảng chi tiết nhập kho";
                    saveAs(out, xlsxName + ".xlsx");
                    resolve();
                  });
                };
                outE().then((res) => {
                  setTimeout(() => {
                    this.$tip.success("导出成功!");
                    this.wLoading = false;
                    // this.getData();
                  }, 1000);
                });
              });
            });
          } else {
            this.wLoading = false;
            this.$tip.warning("暂无此缸号数据!");
            return;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    batchEdit() {
      this.loadDialogVisible = true;
    },
    loadSubmit() {
      if (!this.newLoad) {
        this.$tip.error("新载具编号不能为空!");
        return;
      }
      if (!this.selectList.length) {
        this.$tip.error("请选择要修改的数据!");
        return;
      }
      this.wLoading = true;
      this.selectList.forEach((item, i) => {
        item.storeLoadCode = this.newLoad;
        updateNote(item).then((res) => {
          if (i == this.selectList.length - 1) {
            this.form.storeLoadCode = this.newLoad;
            this.query();
            this.loadDialogVisible = false;
            this.$tip.success("修改成功!");
          }
        });
      });
    },
    print() {
      if (!this.spowerClient || this.spowerClient.readyState == 3) {
        this.setCz();
        this.$tip.error("打印程序离线，请启动服务!");
        return;
      }
      this.selectList.forEach((item, i) => {
        this.spowerClient.send("print=finishCard:" + item.cardId);
        if (i == this.selectList.length - 1) {
          this.$tip.success("已发送全部打印请求!");
        }
      });
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["crud"].doLayout();
    });
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      vm.setCz();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.spowerClient = null;
    next();
  },
  created() { },
  mounted() {
    getCheckItem().then((res) => {
      let data = res.data.filter((item) => {
        return item.checkType != 2;
      });
      this.dlgOp.column[12].dicData = data;
    });
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
#clothFlyWeight
  .el-table
    overflow visible !important
  .el-tag--mini
    display none !important
#normal_Dlg
  .el-dialog__header
    padding 20px !important
    text-align center
  .el-dialog__body
    padding 10px !important
    text-align center
</style>
