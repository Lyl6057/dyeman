<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-26 18:57:14
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
          type="success"
          @click="pass"
          :disabled="!selectList.length || this.form.clothState === 2"
          >审核</el-button
        >
        <!-- <el-button
          type="success"
          @click="setInWhse"
          :disabled="!selectList.length"
          >审核1</el-button
        > -->
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
          @sort-change="sortChange"
        >
          <template slot="menu">
            <el-button
              size="small"
              type="primary"
              @click="passOne"
              :disabled="this.form.clothState != '1'"
              >通过</el-button
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
          isPrinted: 1, // 已打印
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
          item.index = i + 1;
        });
        this.page.total = res.data.total;
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      });
    },
    handleRowDBLClick(val) {
      this.detail = val;
    },
    pass() {
      this.$tip
        .cofirm("是否确定通过审核选中的胚布,生成入库记录?", this, {})
        .then(() => {
          this.selectList.forEach((item, i) => {
            item.clothState = 2;
            update(item).then((res) => {
              if (i == this.selectList.length - 1) {
                this.setInWhse();
              }
            });
          });
        })
        .catch(() => {});
    },
    outExcel() {
      this.$refs.crud.rowExcel();
    },
    setInWhse() {
      baseCodeSupplyEx({ code: "whse_in" }).then((res) => {
        let data = {
          yinId: res.data.data,
          sysCreated: this.$getNowTime("datetime"),
          yinDate: this.$getNowTime("date"),
          yinType: 1,
          yinStatus: 0,
          sysCreatedby: this.$store.state.userOid,
          finStatus: 0,
        };
        addInWhse(data).then((inwhse) => {
          // baseCodeSupply({ code: "whse_in" }).then((res) => {});
          const inwhseId = inwhse.data.data;
          baseCodeSupplyEx({ code: "cpb_in_whse" }).then((pbIn) => {
            this.selectList.forEach((item, i) => {
              addInDtla({
                batchNo: item.vatNo,
                weight: item.netWeight,
                countingNo: item.pidNo,
                weightUnit: item.weightUnit,
                whseFinishedclothinFk: inwhseId,
                locationCode: item.storeSiteCode,
              }).then((dtla) => {});
              if (i == this.selectList.length - 1) {
                this.query();
                this.$tip.success("审核入仓成功!");
              }
            });
            baseCodeSupply({ code: "pb_in_whse" }).then((res) => {});
          });
        });
      });
    },
    passOne() {
      this.$tip
        .cofirm("是否确定通过审核选中的胚布?", this, {})
        .then(() => {
          this.detail.clothState = 2;
          update(this.detail)
            .then((res) => {
              if (res.data.code == 200) {
                this.query();
                this.$tip.success("审核成功!");
              } else {
                this.$tip.error("审核失败!");
              }
            })
            .catch((e) => {
              this.$tip.error("审核失败!" + e);
            });
        })
        .catch(() => {});
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
  created() {},
  mounted() {},
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
