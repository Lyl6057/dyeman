<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-05 08:04:06
 * @Description:
-->
<template>
  <div id="checkInWhse" :element-loading-text="$t('public.loading')" v-loading="wLoading">
    <view-container title="胚布信息">
      <el-row class="btnList">
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="outExcel">导出</el-button>
        <span v-if="crud.length && weightSum > 0" style="float: right; margin-right: 10px">【 {{ crud[0].weaveJobCode }} 】织胚数量:{{ crud[0].amount }} KG,
          已织数量: {{ weightSum }} KG, 剩余数量:
          {{
            (crud[0].amount - weightSum > 0
              ? crud[0].amount - weightSum
              : 0
            ).toFixed(1)
          }}
          KG</span>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="query" @row-dblclick="handleRowDBLClick" @current-row-change="cellClick" :summary-method="summaryMethod" @selection-change="selectionChange" @sort-change="sortChange">
        </avue-crud>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import {
  get,
  update,
  getJob,
  addInWhse,
  addInDtla,
  addInDtlb,
} from "./api";
import { getNowWeight } from "../weight/api";
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
        pageSize: 50,
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
      weightSum: 0,
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      let r_clothCheckTime_r = "";
      if (this.form.clothCheckTime && this.form.clothCheckTime.length) {
        r_clothCheckTime_r = `!%5E%5b${this.form.clothCheckTime[0]} 07:30:00~${this.form.clothCheckTime[1]} 07:30:00%5d`;
      } else {
        r_clothCheckTime_r = "!%5E";
      }
      get(
        {
          weaveJobCode: "%" + (this.form.weaveJobCode || ""),
          noteCode: "%" + (this.form.noteCode || ""),
          storeLoadCode: this.form.storeLoadCode,
          outworkFlag: this.form.outworkFlag,
          eachNumber: this.form.eachNumber,
          rows: this.page.pageSize,
          start: this.page.currentPage,
          // isPrinted: true,
          clothState: this.form.clothState || 1,
          // 加上过滤厂
          filterFactory: true
        },
        r_clothCheckTime_r
      ).then((res) => {
        this.crud = res.data.records;
        if (this.crud.length > 0) {
          getNowWeight(this.crud[0].weaveJobCode).then((res) => {
            this.$nextTick(() => {
              if (res.data) {
                this.weightSum = res.data.clothWeight;
              } else {
                this.weightSum = 0;
              }
            });
          });
          getJob({
            weaveJobId: this.crud[0].weaveJobFk,
          }).then((weaveRes) => {
            if (weaveRes.data.records.length) {
              this.$set(
                this.crud[0],
                "amount",
                weaveRes.data.records[0].amount
              );
            }
          });
          this.$refs.crud.setCurrentRow(this.crud[0]);
        } else {
          this.$nextTick(() => {
            this.weightSum = 0;
          });
        }
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          item.eachNumber = Number(item.eachNumber);
        });
        this.page.total = res.data.total;
      }).finally((_) =>{ this.wLoading = false; })
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
          yinType: 6,
          yinStatus: 0,
          sysCreatedby: this.$store.state.userOid,
        };
        let list = this.group(this.selectList, "storeLoadCode");
        addInWhse(data).then((inwhse) => {
          baseCodeSupply({ code: "whse_in" }).then((res) => {});
          const inwhseId = inwhse.data.data;
          baseCodeSupplyEx({ code: "pb_in_whse" }).then((pbIn) => {
            list.forEach((item, i) => {
              addInDtla({
                // prodNo: item.weaveJobCode,
                weight: item.weight,
                countingNo: item.data.length,
                whseCalicoinFk: inwhseId,
                storeLoadCode: item.storeLoadCode,
                batchNo: pbIn.data.data,
                outFlag: 0
              }).then((dtla) => {
                const dtlaId = dtla.data.data;
                item.data.forEach((dtlb, b) => {
                  addInDtlb({
                    noteCode: dtlb.noteCode,
                    batchNo: pbIn.data.data,
                    pidNo: dtlb.eachNumber,
                    locationCode: dtlb.storeSiteCode,
                    weaveJobCode: dtlb.proName,
                    weight: dtlb.clothWeight,
                    weightUnit: "KG",
                    whseCalicoinDtlaFk: dtlaId,
                  }).then((dtlb) => {});
                  if (b == item.data.length - 1 && i == list.length - 1) {
                    this.query();
                    this.$tip.success("审核入仓成功!");
                  }
                });
              });
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
            weight: ai.clothWeight || ai.netWeight,
            weightLbs: ai.clothWeight || ai.netWeightLbs,
          });
          map[ai[type]] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj[type] == ai[type]) {
              dj.data.push(ai);
              dj.weight += ai.clothWeight || ai.netWeight;
              dj.weightLbs += ai.clothWeight || ai.netWeightLbs;
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
              num += Number(item.clothWeight);
            });
            sums[index] = "選中重量：" + num.toFixed(1);
            this.checkSum = num.toFixed(1);
          }
          if (index == 10) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.realWeight);
            });
            sums[index] = "毛重：" + num.toFixed(1);
          }
          if (index == 11) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.clothWeight);
            });
            sums[index] = "重量：" + num.toFixed(1);
          }
          if (index == 12) {
            let num = 0;
            this.crud.forEach((item) => {
              num += Number(item.qcTakeOut);
            });
            sums[index] = "扣减：" + num.toFixed(1);
          }
        });
      }
      return sums;
    },
  },
  updated() {
    this.$nextTick(() => {
      if(this.crud.length) this.$refs["crud"].doLayout();
    });
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#checkInWhse {
  .el-table {
    overflow: visible !important;
  }

  .el-tag--mini {
    display: none !important;
  }
}
</style>
