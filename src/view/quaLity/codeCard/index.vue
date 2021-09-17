<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-11 15:18:33
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
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="outExcel">导出</el-button>
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
          <template slot="menu">
            <el-button size="small" type="primary" @click="weighing"
              >称重</el-button
            >
          </template></avue-crud
        >
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
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
} from "./api";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
export default {
  name: "",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
        clothState: 1,
      },
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {},
      czsocket: "",
      weight: 0,
      changeList: [],
      wLoading: false,
      selectList: [],
      options: [],
      oldData: {},
      sort: {},
      checkSum: 0,
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
      // order
      //   ? (this.form.sort = prop + (order == "descending" ? ",1" : ",0"))
      //   : (this.form.sort = "storeLoadCode,1");
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
          return a.vatNo > b.vatNo ? -1 : 1;
        });
        this.crud.forEach((item, i) => {
          // item.$cellEdit = true;
          item.index = i + 1;
        });
        this.page.total = res.data.total;
        setTimeout(() => {
          this.$refs.crud.setCurrentRow(this.crud[0] || {});
          this.wLoading = false;
        }, 200);
      });
    },
    handleRowDBLClick(val) {
      this.detail = val;
    },
    outExcel() {
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
      this.crud.forEach((item, i) => {
        update(item).then((res) => {
          if (i == this.crud.length - 1) {
            setTimeout(() => {
              this.wLoading = false;
              this.$tip.success(this.$t("public.save"));
            }, 200);
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
      this.oldData.$cellEdit = false;
      // val.$cellEdit = true;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.detail = val;
    },
    setCz() {
      webSocket.setCz(this);
      let _this = this;
      _this.czsocket.onmessage = function (e) {
        if (e.data.indexOf(":") != -1) {
          _this.detail.grossWeight = Number(e.data.split(":")[0]); //;
          _this.detail.weightUnit = e.data.split(":")[1];
        } else {
          _this.detail.grossWeight = Number(e.data);
        }
        _this.detail.netWeight = Number(
          _this.detail.grossWeight -
            Number(_this.detail.paperTube || 0) -
            Number(_this.detail.qcTakeOut || 0)
        ).toFixed(2);
      };
      _this.czsocket.onopen = function (event) {
        _this.$tip.success("称重应用连接成功!");
      };
    },
    calculateWeight() {},
    codeLength() {
      if (
        !this.detail.gramWeight ||
        !this.detail.breadth ||
        !this.detail.netWeight
      ) {
        return;
      }
      this.$nextTick(() => {
        let gramWeight = Number(this.detail.gramWeight.split("(")[0]) / 1000,
          breadth = (Number(this.detail.breadth.split("(")[0]) * 2.54) / 100;
        let weight = this.detail.netWeight;
        if (this.detail.weightUnit == "LBS") {
          weight = weight * 2.20462262;
        }
        // gramWeight 单位为 g/m , breadth 单位为 inch 需要 * 2.54 转换成cm / 100 转换成 m

        this.detail.yardLength = parseInt((weight / gramWeight) * breadth);
      });
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
