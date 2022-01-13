<!--
 * @Author: Lyl
 * @Date: 2022-01-12 15:39:08
 * @LastEditors: Lyl
 * @LastEditTime: 2022-01-13 16:47:08
 * @FilePath: \iot.vue\src\view\im\whseInOutKB\index.vue
 * @Description: 
-->
<template>
  <div
    class="whseInOutKB"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container title="出入库看板">
      <el-row class="btnList">
        <el-button type="success" @click="submit" :disabled="!selectList.length"
          >提交</el-button
        >
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <view-container title="布笼物品信息">
        <el-row class="crudBox" style="margin-top: 5px">
          <avue-crud
            ref="crud"
            :option="crudOp"
            :data="crud"
            v-loading="loading"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
            @selection-change="selectionChange"
          ></avue-crud>
        </el-row>
      </view-container>
    </view-container>
  </div>
</template>

<script>
import { formOp, finishedCrud, clothCrud } from "./data";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import {
  getInCloth,
  getIOutCloth,
  getInFinished,
  getOutFinished,
  updateNote,
  updateFinished,
  addInWhse,
  addInDtla,
  addInDtlb,
  addOutWhse,
  addOutDtla,
  addOutDtlb,
  addInFinishedWhse,
  addInFinishedDtla,
  addOutFinishedWhse,
  addOutFinishedDtla,
  addOutFinishedDtlb,
} from "./api";
import { webSocket } from "@/config/index.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      form: {
        type: 1,
        goodsType: 1,
        exit: "in1",
        storageState: 0,
      },
      formOp: formOp(this),
      crudOp: finishedCrud(this),
      crud: [],
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
      inExit: [
        {
          label: "入口1",
          value: "in1",
        },
        {
          label: "入口2",
          value: "in2",
        },
        {
          label: "入口3",
          value: "in3",
        },
      ],
      outExit: [
        {
          label: "出口1",
          value: "out1",
        },
        {
          label: "出口2",
          value: "out2",
        },
        {
          label: "出口3",
          value: "out3",
        },
      ],
      spowerClient: null,
    };
  },
  watch: {},
  computed: {},
  created() {
    this.spowerClient = this.$store.state.spowerClient;
    let _this = this;
    _this.spowerClient.onmessage = function (e) {
      if (e.data.indexOf("scan") != -1) {
        _this.$nextTick(() => {
          _this.form.storeLoadCode = e.data.split("scan=")[1];
          _this.query();
        });
      } else if (e.data.indexOf("weight") != -1) {
        let data = e.data.split("weight=")[1];
        _this.form.netWeight = Number(data.split(":")[0]);
        _this.form.weightUnit = Number(data.split(":")[1]);
      }
    };
  },
  mounted() {},
  methods: {
    query() {
      this.wLoading = true;
      if (this.form.goodsType == 1) {
        // 胚布入仓
        getInCloth({
          storeLoadCode: this.form.storeLoadCode,
          clothState: this.form.type,
        }).then((res) => {
          this.crud = res.data.sort((a, b) => {
            return a.noteCode > b.noteCode ? 1 : -1;
          });
          this.crud.forEach((item, i) => {
            item.index = i + 1;
          });
          this.form.storageState = this.crud.length ? 1 : 0;
          this.wLoading = false;
        });
      } else {
        //成品布入仓
        getInFinished({
          storeLoadCode: this.form.storeLoadCode,
          clothState: this.form.type,
          cardType: 1,
        }).then((res) => {
          this.crud = res.data.sort((a, b) => {
            return a.productNo > b.productNo ? 1 : -1;
          });
          this.crud.forEach((item, i) => {
            item.index = i + 1;
          });
          this.form.storageState = this.crud.length ? 1 : 0;
          this.wLoading = false;
        });
      }
    },
    submit() {
      this.$tip
        .cofirm(
          `是否确定提交选中的${
            this.form.goodsType == 1 ? "胚布" : "成品布"
          }, 生成${this.form.type == 1 ? "入" : "出"}库记录？`,
          this,
          {}
        )
        .then(() => {
          this.wLoading = true;
          if (this.form.goodsType == 1) {
            this.selectList.forEach((item, i) => {
              item.clothState = this.form.type + 1;
              updateNote(item).then((res) => {
                if (i == this.selectList.length - 1) {
                  this.setClothWhse();
                }
              });
            });
          } else {
            this.selectList.forEach((item, i) => {
              item.clothState = this.form.type + 1;
              updateFinished(item).then((res) => {
                if (i == this.selectList.length - 1) {
                  this.setFinishedWhse();
                }
              });
            });
          }
        })
        .catch(() => {});
    },
    setClothWhse() {
      if (this.form.type == 1) {
        // 生成入库信息
        baseCodeSupplyEx({ code: "whse_in" }).then((res) => {
          let data = {
            yinId: res.data.data,
            sysCreated: this.$getNowTime("datetime"),
            yinDate: this.$getNowTime("date"),
            yinType: 6,
            yinStatus: 0,
            sysCreatedby: this.$store.state.userOid,
          };
          let list = this.group(this.selectList, "proName");
          addInWhse(data).then((inwhse) => {
            baseCodeSupply({ code: "whse_in" }).then((res) => {});
            const inwhseId = inwhse.data.data;
            baseCodeSupplyEx({ code: "pb_in_whse" }).then((pbIn) => {
              list.forEach((item, i) => {
                addInDtla({
                  prodNo: item.proName,
                  weight: Number(item.weight.toFixed(1)),
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
                      this.$tip.success("入库成功!");
                    }
                  });
                });
              });
              baseCodeSupply({ code: "pb_in_whse" }).then((res) => {});
            });
          });
        });
      } else {
        // 生成出库信息
        baseCodeSupplyEx({ code: "whse_out" }).then((res) => {
          let data = {
            retCode: res.data.data,
            sysCreated: this.$getNowTime("datetime"),
            retDate: this.$getNowTime("datetime"),
            retType: 1,
            yinStatus: 0,
            sysCreatedby: this.$store.state.userOid,
          };
          let list = this.group(this.selectList, "proName");
          addOutWhse(data).then((inwhse) => {
            baseCodeSupply({ code: "whse_out" }).then((res) => {});
            const outwhseId = inwhse.data.data;
            baseCodeSupplyEx({ code: "pb_out_whse" }).then((pbIn) => {
              list.forEach((item, i) => {
                addOutDtla({
                  calicoId: item.proName,
                  weight: Number(item.weight.toFixed(1)),
                  countingNo: item.data.length,
                  whseMaterialFk: outwhseId,
                  fabticket: this.selectList[0].storeLoadCode,
                  batchNo: pbIn.data.data,
                }).then((dtla) => {
                  const dtlaId = dtla.data.data;
                  item.data.forEach((dtlb, b) => {
                    addOutDtlb({
                      custTicket: dtlb.noteCode,
                      batchNo: pbIn.data.data,
                      countingNo: dtlb.eachNumber,
                      locationCode: dtlb.storeSiteCode,
                      weight: dtlb.clothWeight,
                      weightUnit: "KG",
                      whseMaterialDlaFk: dtlaId,
                    }).then((dtlb) => {});
                    if (b == item.data.length - 1 && i == list.length - 1) {
                      this.query();
                      this.$tip.success("出库成功!");
                    }
                  });
                });
              });
              baseCodeSupply({ code: "pb_out_whse" }).then((res) => {});
            });
          });
        });
      }
    },
    setFinishedWhse() {
      if (this.form.type == 1) {
        // 生成入库信息
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
          addInFinishedWhse(data).then((inwhse) => {
            baseCodeSupply({ code: "whse_in" }).then((res) => {});
            const inwhseId = inwhse.data.data;
            baseCodeSupplyEx({ code: "cpb_in_whse" }).then((pbIn) => {
              this.selectList.forEach((item, i) => {
                addInFinishedDtla({
                  batchNo: item.vatNo,
                  weight: item.netWeight,
                  countingNo: item.pidNo,
                  weightUnit: item.weightUnit,
                  whseFinishedclothinFk: inwhseId,
                  locationCode: item.storeSiteCode,
                  fabticket: item.productNo,
                }).then((dtla) => {});
                if (i == this.selectList.length - 1) {
                  this.query();
                  this.$tip.success("成品布入仓成功!");
                }
              });
              baseCodeSupply({ code: "cpb_in_whse" }).then((res) => {});
            });
          });
        });
      } else {
        // 生成出库信息
        baseCodeSupplyEx({ code: "whse_out" }).then((res) => {
          let data = {
            woOutno: res.data.data,
            sysCreated: this.$getNowTime("datetime"),
            woDate: this.$getNowTime("date"),
            retType: 1,
            yinStatus: 0,
            sysCreatedby: this.$store.state.userOid,
          };
          let list = this.group(this.selectList, "poNo");
          addOutFinishedWhse(data).then((inwhse) => {
            baseCodeSupply({ code: "whse_out" }).then((res) => {});
            const outwhseId = inwhse.data.data;
            baseCodeSupplyEx({ code: "cpb_out_whse" }).then((pbIn) => {
              list.forEach((item, i) => {
                addOutFinishedDtla({
                  woOrderno: item.poNo,
                  whseFinclothselloutFk: outwhseId,
                  woMatname: item.fabName,
                }).then((dtla) => {
                  const dtlaId = dtla.data.data;
                  item.data.forEach((dtlb, b) => {
                    addOutFinishedDtlb({
                      prodNo: dtlb.vatNo,
                      batchNo: pbIn.data.data,
                      countingNo: dtlb.pidNo,
                      locationCode: dtlb.storeSiteCode,
                      ticketNo: dtlb.productNo,
                      woWeights: dtlb.netWeight,
                      woUnit: dtlb.weightUnit,
                      whseFinclothselloutDtlaFk: dtlaId,
                    }).then((dtlb) => {});
                    if (b == item.data.length - 1 && i == list.length - 1) {
                      this.query();
                      this.$tip.success("出库成功!");
                    }
                  });
                });
              });
              baseCodeSupply({ code: "cpb_out_whse" }).then((res) => {});
            });
          });
        });
      }
    },
    changeGoodsType(val) {
      this.crud = [];
      if (val == 1) {
        this.$nextTick(() => {
          this.crudOp = clothCrud(this);
        });
      } else {
        this.crudOp = finishedCrud(this);
      }
    },
    handleRowDBLClick(val) {},
    cellClick(val) {},
    summaryMethod() {},
    selectionChange(val) {
      this.selectList = val;
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
            weight: ai.clothWeight,
          });
          map[ai[type]] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj[type] == ai[type]) {
              dj.data.push(ai);
              dj.weight += ai.clothWeight;
              break;
            }
          }
        }
      }
      return dest;
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["crud"].doLayout();
    });
  },
};
</script>
<style lang="stylus">
.whseInOutKB
  width 100%
  height 100vh
  color #fff
  // background-color rgb(2, 26, 60)
  // border 2px solid #fff
.el-tag--mini
  display none !important
</style>