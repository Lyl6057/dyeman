<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-13 09:50:43
 * @Description:
-->
<template>
  <div
    id="clothFlyWeight"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container title="成品码卡信息">
      <el-row class="btnList">
        <el-button
          type="primary"
          @click="dialogVisible = true"
          :disabled="!detail.cardId"
          >{{ this.$t("public.update") }}</el-button
        >
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
        <!-- <el-button type="primary" @click="outExcel1">导出</el-button> -->
        <!-- <el-button type="primary" @click="outExcel">导出明细表</el-button> -->
        <el-dropdown
          split-button
          type="primary"
          @click="outExcel(1)"
          style="margin-left: 10px"
        >
          导出明细
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="outExcel(1)"
              >公斤(KG)</el-dropdown-item
            >
            <el-dropdown-item @click.native="outExcel(0)"
              >磅(LBS)</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="query"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
          :summary-method="summaryMethod"
          @selection-change="selectionChange"
        >
          <!--  @sort-change="sortChange" -->
          <!-- <template slot="menu">
            <el-button size="small" type="primary" @click="weighing"
              >称重</el-button
            >
          </template> -->
        </avue-crud>
      </el-row>
      <el-dialog
        id="colorMng_Dlg"
        :visible.sync="dialogVisible"
        width="70%"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <view-container title="修改">
          <div class="btnList">
            <el-button
              type="success"
              @click="save"
              :disabled="form.clothState == 3"
              >{{ this.$t("public.save") }}</el-button
            >
            <el-button type="primary" @click="weighing">称重</el-button>
            <el-button type="warning" @click="dialogVisible = false">{{
              this.$t("public.close")
            }}</el-button>
          </div>
          <div class="formBox">
            <avue-form ref="form" :option="dlgOp" v-model="detail"></avue-form>
          </div>
        </view-container>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud, dlgForm } from "./data";
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
        clothState: 1,
        // productNo: "",
      },
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {
        weightUnit: "KG",
      },
      czsocket: "",
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
      weightUnit: "KG",
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
      this.form.vatNo = "!^%" + (this.form.vatNo ? this.form.vatNo : "");
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: true,
          clothState: this.form.clothState || 1,
        })
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
        if (this.form.vatNo.indexOf("!^%") != -1) {
          this.form.vatNo = this.form.vatNo.split("!^%")[1] || "";
        }
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
      if (this.czsocket.readyState == 3) {
        this.$tip.error("称重应用未启动，请启动后重新进入此页面!");
        return;
      } else {
        this.czsocket.send("weight");
      }
      // setTimeout(() => {
      //   this.detail.clothWeight = this.weight;
      // }, 200);
    },
    save() {
      this.wLoading = true;
      // this.crud.forEach((item, i) => {
      update(this.detail).then((res) => {
        // if (i == this.crud.length - 1) {
        setTimeout(() => {
          this.dialogVisible = false;
          this.wLoading = false;
          this.query();
          this.$tip.success(this.$t("public.save"));
        }, 200);
        // }
      });
      // });
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

      // this.weightUnit = val.weightUnit;
      // this.oldData.$cellEdit = false;
      // val.$cellEdit = true;
      // this.$set(val, "$cellEdit", true);
      // this.oldData = val;
      // this.detail = val;
    },
    setCz() {
      webSocket.setCz(this);
      let _this = this;
      _this.czsocket.onmessage = function (e) {
        if (e.data.indexOf(":") != -1) {
          let data = e.data.split(":");
          _this.detail.weightUnit = data[1];
          data[0] = Number((parseInt(Number(data[0]) * 10) / 10).toFixed(1));
          if (_this.detail.weightUnit == "KG") {
            _this.detail.netWeight = Number(data[0]); //;
            // _this.detail.netWeightLbs = _this.detail.netWeight * 2.2046;

            // _this.detail.grossWeight =
            //   _this.detail.netWeight +
            //   Number(_this.detail.paperTube || 0) +
            //   Number(_this.detail.qcTakeOut || 0);
            // _this.detail.grossWeightLbs = _this.detail.grossWeight * 2.2046;
          } else {
            _this.detail.netWeightLbs = Number(data[0]); //;
            // _this.detail.netWeight = _this.detail.netWeightLbs / 2.2046;

            // _this.detail.grossWeightLbs =
            //   _this.detail.netWeightLbs +
            //   Number(_this.detail.paperTube || 0) +
            //   Number(_this.detail.qcTakeOut || 0);
            // _this.detail.grossWeight = _this.detail.grossWeightLbs / 2.2046;
          }
        } else {
          _this.detail.netWeight = Number(e.data);
        }
      };
      _this.czsocket.onopen = function (event) {
        _this.$tip.success("称重应用连接成功!");
      };
    },
    calculateWeight() {},
    codeLength() {
      if (
        !this.detail.realGramWeight ||
        !this.detail.clothWidth ||
        !this.detail.netWeight
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
        breadth = Number(this.detail.clothWidth / 100);
      } else {
        breadth = Number((this.detail.clothWidth * 2.54) / 100);
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
    summaryMethod({ columns, data }) {
      const sums = [];
      if (columns.length > 0) {
        columns.forEach((column, index) => {
          if (index == 0) {
            sums[index] = "合計";
          }
          if (index == 2) {
            let num = 0;
            this.selectList.forEach((item) => {
              num += Number(item.netWeight);
            });
            sums[index] = "選中重量：" + num.toFixed(1);
            this.checkSum = num.toFixed(1);
          }
        });
      }
      return sums;
    },
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
            getNotPage({ vatNo: this.form.vatNo }).then((list) => {
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
              data.forEach((item, index) => {
                this.output.weightKg += item.netWeight;
                this.output.weightLbs += item.netWeightLbs;
                item.weight = type ? item.netWeight : item.netWeightLbs;
                if (item.pidNo <= 20) {
                  arr1.push(item);
                } else if (item.pidNo <= 40) {
                  arr2.push(item);
                } else if (item.pidNo <= 60) {
                  arr3.push(item);
                }
              });
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
    this.czsocket = null;
    next();
  },
  created() {},
  mounted() {
    this.setCz();
    getCheckItem().then((res) => {
      let data = res.data.filter((item) => {
        return item.checkType != 2;
      });
      this.dlgOp.column[12].dicData = data;
    });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#clothFlyWeight {
  .el-table {
    overflow: visible !important;
  }

  .el-tag--mini {
    display: none !important;
  }
}
</style>
