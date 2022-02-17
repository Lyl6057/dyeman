<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-15 16:08:19
 * @Description:
-->
<template>
  <div
    id="clothFlyWeight"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container title="胚布信息">
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
        <span
          v-if="crud.length && weightSum > 0"
          style="float: right; margin-right: 10px"
          >【 {{ crud[0].weaveJobCode }} 】织胚数量:{{ crud[0].amount }},
          已织重量: {{ weightSum }}, 剩余重量:
          {{
            (crud[0].amount - weightSum > 0
              ? crud[0].amount - weightSum
              : 0
            ).toFixed(1)
          }}
          KG</span
        >
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
import { getNowWeight } from "../weight/api";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import qs from "qs";
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
      let { prop, order } = this.sort;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      let r_clothCheckTime_r = "";
      if (this.form.clothCheckTime && this.form.clothCheckTime.length) {
        r_clothCheckTime_r = `!%5E%5b${this.form.clothCheckTime[0]} 07:30:00~${this.form.clothCheckTime[1]} 07:30:00%5d`;
      } else {
        r_clothCheckTime_r = "!%5E";
      }
      // order
      //   ? (this.form.sort = prop + (order == "descending" ? ",1" : ",0"))
      //   : (this.form.sort = "storeLoadCode,1");
      // this.form.storeLoadCode = "%" + (this.form.storeLoadCode ? this.form.storeLoadCode : "");
      this.form.weaveJobCode =
        "%" + (this.form.weaveJobCode ? this.form.weaveJobCode : "");
      // this.form.clothCheckTime = "%" + (this.form.clothCheckTime ? this.form.clothCheckTime : "");
      this.form.noteCode = "%" + (this.form.noteCode ? this.form.noteCode : "");
      let data = JSON.parse(JSON.stringify(this.form));
      data.clothCheckTime = null;
      get(
        Object.assign(data, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: true,
          clothState: this.form.clothState || 1,
        }),
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
        //  if (this.form.storeLoadCode.indexOf("%") != -1) {
        //   this.form.storeLoadCode = this.form.storeLoadCode.split("%")[1] || "";
        // }
        // if (this.form.clothCheckTime.indexOf("%") != -1) {
        //   this.form.clothCheckTime = this.form.clothCheckTime.split("%")[1] || "";
        // }
        if (this.form.weaveJobCode.indexOf("%") != -1) {
          this.form.weaveJobCode = this.form.weaveJobCode.split("%")[1] || "";
        }
        if (this.form.noteCode.indexOf("%") != -1) {
          this.form.noteCode = this.form.noteCode.split("%")[1] || "";
        }
        this.$nextTick(() => {
          setTimeout(() => {
            this.wLoading = false;
          }, 500);
        });
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
                // this.query();
                // this.$tip.success("审核成功!");
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
        let list = this.group(this.selectList, "weaveJobCode");
        addInWhse(data).then((inwhse) => {
          baseCodeSupply({ code: "whse_in" }).then((res) => {});
          const inwhseId = inwhse.data.data;
          baseCodeSupplyEx({ code: "pb_in_whse" }).then((pbIn) => {
            list.forEach((item, i) => {
              addInDtla({
                prodNo: item.weaveJobCode,
                weight: this.checkSum,
                countingNo: item.data.length,
                whseCalicoinFk: inwhseId,
                fabticket: this.selectList[0].storeLoadCode,
                batchNo: pbIn.data.data,
              }).then((dtla) => {
                const dtlaId = dtla.data.data;
                item.data.forEach((dtlb, b) => {
                  addInDtlb({
                    custTicket: dtlb.noteCode,
                    batchNo: pbIn.data.data,
                    countingNo: dtlb.eachNumber,
                    locationCode: dtlb.storeSiteCode,
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
      this.$refs["crud"].doLayout();
    });
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#clothFlyWeight
  .el-table
    overflow visible !important
  .el-tag--mini
    display none !important
</style>
