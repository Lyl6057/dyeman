<!--
 * @Author: Lyl
 * @Date: 2022-04-08 14:41:23
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-06 14:50:31
 * @FilePath: \iot.vue\src\view\im\whseInOutKB\inWhse.vue
 * @Description: 
-->

<template>
  <div class="whseInOut_updateNote">
    <view-container title="生成入库记录" :element-loading-text="$t('public.loading')" v-loading="loading">
      <div class="btnList">
        <el-popover placement="right" width="160" v-model="visible" style="margin: 0 8px">
          <p>请输入要新的载具编号</p>
          <el-input v-model="newLoad"></el-input>
          <div style="text-align: center; margin-top: 10px">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="sumbit">确定</el-button>
          </div>
          <el-button type="success" slot="reference">保存</el-button>
        </el-popover>
        <el-button type="danger" @click="del">删除</el-button>
        <el-button type="primary" @click="choiceHandle">选择货物</el-button>
        <el-button type="warning" @click="$emit('close')">关闭</el-button>
        <el-input v-model="scanIpt" style="width: 15%; margin-left: 2rem" placeholder="扫码请点此处" @change="scanChange">
        </el-input>
      </div>
      <div class="crudBox">
        <avue-crud ref="crud" :option="crudOp" :data="crud" @selection-change="selectionChange"></avue-crud>
      </div>
    </view-container>
    <el-dialog id="colorMng_Dlg" :visible.sync="verifyVisible" width="70%" top="8vh" append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false">
      <verify-submit :crudOp="crudOp" :crud="crud" :newLoad="newLoad" v-if="verifyVisible"
        @cancel="verifyVisible = false" @success="save">
      </verify-submit>
    </el-dialog>
    <pro-choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" marginTop="3vh" dlgWidth="80%"
      @choiceData="choiceData" @close="choiceV = false" v-if="choiceV"></pro-choice>

  </div>
</template>

<script>
import { inWhseFinishedCrud, inWhseNoteCrud } from "./data";
import proChoice from "@/components/proMng/index";
import {
  addInFinishedWhse,
  addInFinishedDtla,
  addInFinishedDtlb,
  addStorageLog,
  updateFinished,
  sendTaskNoin,
  getInFinishedByPage,
  addInWhse,
  addInDtla,
  addInDtlb,
  updateNote,
  getInCloth,
  sendTestTaskNoin
} from "./api";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import verifySubmit from "./verifySubmit.vue";
export default {
  components: {
    proChoice,
    verifySubmit,
  },
  props: {
    form: Object,
    test: Boolean
  },
  data() {
    return {
      crudOp: inWhseFinishedCrud(this),
      crud: [],
      loading: false,
      visible: false,
      newLoad: "",
      choiceV: false,
      choiceTle: "选择成品布信息",
      choiceQ: {
        r_clothState_r: "||1||2||3",
        cardType: 1,
        sortF: "productNo",
        fuzzy: "vatNo,note,proName,storeLoadCode,loomNo",
      },
      selectList: [],
      verifyVisible: false,
      scanIpt: "",
    };
  },
  watch: {},
  updated() {
    this.$nextTick(() => {
      if (this.crud.length) this.$refs["crud"].doLayout();
    });
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    initData() {
      this.crudOp =
        this.form.goodsType == 1
          ? inWhseNoteCrud(this)
          : inWhseFinishedCrud(this);
      this.choiceQ.sortF = this.form.goodsType == 1 ? "noteCode" : "productNo";
    },
    save(list) {
      // 生成入库记录
      this.loading = true;
      let type = this.form.goodsType;
      if (!list) {
        // 入空布笼
        sendTaskNoin({
          barCode: this.newLoad,
          createTime: this.$getNowTime("datetime"),
          entrance: this.form.exit, // 入库口
          isEmpty: 1, // 是否为空
          orderType: 1, // 出库/入库
          layer: this.form.layer,
          type: this.form.goodsType, // 物料类别
          // storageCode: list[0].storeLoadCode,
        })
          .then((sendRes) => {
            if (sendRes.data.code) {
              this.$tip.error(sendRes.data.data);
              this.loading = false;
              return;
            }
            if (sendRes.data == "返回异常") {
              this.$tip.error(sendRes.data);
              this.loading = false;
            }
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        if (this.test) {
          try {
            let wfi = [];
            list.map((e) => {
              wfi.push({
                pidNo: e.pidNo,
                productId: e.cardId,
                productNo: e.productNo,
                vatNo: e.vatNo,
                weight: e.netWeight,
                weightLbs: e.netWeightLbs,
                weightUnit: e.weightUnit,
              })
            })
            sendTestTaskNoin({
              barCode: this.newLoad,
              createTime: this.$getNowTime("datetime"),
              entrance: this.form.exit, // 入库口
              isEmpty: 1, // 是否为空
              orderType: 1, // 出库/入库
              layer: this.form.layer,
              type: this.form.goodsType, // 物料类别
              wfi: wfi
            }).then((res) => {
              this.loading = false;
              if (res.data.code == 200) {
                this.$tip.success(res.data.msg);
                this.verifyVisible = false;
              } else {
                this.loading = false;
                this.$tip.error(res.data.msg);
              }
            })
          } catch (error) {
            this.loading = false;
            this.$tip.error(error);
          }
        } else {
          try {
            sendTaskNoin({
              barCode: list[0].storeLoadCode,
              createTime: this.$getNowTime("datetime"),
              entrance: this.form.exit, // 入库口
              isEmpty: 0, // 是否为空
              orderType: 1, // 出库/入库
              layer: this.form.layer,
              type: this.form.goodsType, // 物料类别
              // storageCode: list[0].storeLoadCode,
            }).then((sendRes) => {
              if (sendRes.data.code) {
                this.$tip.error(sendRes.data.data);
                this.loading = false;
                return;
              }
              if (sendRes.data == "返回异常") {
                this.$tip.error(sendRes.data);
                this.loading = false;
                return;
              }
              baseCodeSupplyEx({ code: "whse_in" }).then((bat) => {
                baseCodeSupply({ code: "whse_in" }).then((bat) => {});
                let addList = this.group(list, "storeLoadCode");
                let batchNo = bat.data.data;
                if (type == 1) {
                  addInWhse({
                    yinId: batchNo,
                    yinDate: this.$getNowTime("datetime"),
                    yinStatus: 1,
                    yinType: 6, // 生产入仓
                    finStatus: 0,
                    sysCreateBy: this.$store.state.userOid,
                    sysCreated: this.$getNowTime("datetime"),
                    stockState: 0,
                  }).then((res) => {
                    addList.forEach((item, i) => {
                      addStorageLog({
                        whsCarriageStorageFk: item.storeLoadCode,
                        useTime: this.$getNowTime("datatime"),
                        useType: 2,
                        businessType: 1,
                        businessId: item.data[0].proName,
                        deleteFlag: 0,
                      }).then((log) => {
                        addInDtla({
                          carriageStorageLogFk: log.data.data,
                          iotWmsTaskLogFk: sendRes.data,
                          whseCalicoinFk: res.data.data,
                          countingNo: item.data.length,
                          weight: item.weight || item.netWeight,
                          weightUnit: "KG",
                          storeLoadCode: item.storeLoadCode,
                          outFlag: 0,
                        }).then((dtla) => {
                          item.data.forEach((dtlb, j) => {
                            addInDtlb({
                              outFlag: 0,
                              pidNo: dtlb.eachNumber,
                              weight: dtlb.clothWeight || dtlb.realWeight,
                              weightUnit: "KG",
                              whseCalicoinDtlaFk: dtla.data.data,
                              noteCode: dtlb.noteCode,
                              weaveJobCode: dtlb.proName,
                            }).then((dtlbRes) => {
                              if (
                                j == item.data.length - 1 &&
                                i == addList.length - 1
                              ) {
                                this.finishedAfter(list);
                              }
                            });
                          });
                        });
                      });
                    });
                  });
                } else {
                  addInFinishedWhse({
                    yinId: batchNo,
                    yinDate: this.$getNowTime("datetime"),
                    yinStatus: 1,
                    yinType: 1,
                    finStatus: 0,
                    sysCreateBy: this.$store.state.userOid,
                    sysCreated: this.$getNowTime("datetime"),
                    stockState: 0,
                    custCode: list[0].custCode,
                  }).then((res) => {
                    addList.forEach((item, i) => {
                      addStorageLog({
                        whsCarriageStorageFk: item.storeLoadCode,
                        useTime: this.$getNowTime("datatime"),
                        useType: 2,
                        businessType: 2,
                        businessId: item.data[0].vatNo,
                        deleteFlag: 0,
                      }).then((log) => {
                        addInFinishedDtla({
                          carriageStorageLogFk: log.data.data,
                          wmsTaskLogFk: sendRes.data,
                          whseFinishedclothinFk: res.data.data,
                          pidCount: item.data.length,
                          sumWeight: item.weight,
                          weightUnit: "KG",
                          storeLoadCode: item.storeLoadCode,
                          outFlag: 0,
                        }).then((dtla) => {
                          item.data.forEach((dtlb, j) => {
                            addInFinishedDtlb({
                              pidNo: dtlb.pidNo,
                              productDtlFk: dtla.data.data,
                              productNo: dtlb.productNo,
                              vatNo: dtlb.vatNo,
                              weight:
                                dtlb.weightUnit == "KG"
                                  ? dtlb.netWeight
                                  : dtlb.netWeightLbs,
                              weightUnit: dtlb.weightUnit,
                              productId: dtlb.cardId,
                            }).then((dtlbRes) => {
                              if (
                                j == item.data.length - 1 &&
                                i == addList.length - 1
                              ) {
                                this.finishedAfter(list);
                              }
                            });
                          });
                        });
                      });
                    });
                  });
                }
              });
            });
          } catch (error) {
            this.loading = false;
            console.error(error);
          }
        }
      }
    },
    finishedAfter(list) {
      list.forEach((item, i) => {
        item.clothState = 2;
        if (this.form.goodsType == 2) {
          updateFinished(item).then((res) => {
            if (i == list.length - 1) {
              setTimeout(() => {
                this.$emit("close");
                this.loading = false;
                this.$tip.success("任务提交成功!");
              }, 200);
            }
          });
        } else {
          updateNote(item).then((res) => {
            if (i == list.length - 1) {
              setTimeout(() => {
                this.$emit("close");
                this.loading = false;
                this.$tip.success("任务提交成功!");
              }, 200);
            }
          });
        }
      });
    },
    sumbit() {
      this.crud.map((item) => (item.storeLoadCode = this.newLoad));
      this.verifyVisible = true;
    },
    choiceData(val) {
      if (!val.length) {
        this.choiceV = false;
        return;
      }
      this.loading = true;
      this.crud = this.$unique(
        this.crud.concat(val),
        this.form.goodsType == 1 ? "noteCode" : "productNo"
      );
      this.crud.sort((a, b) =>
        a[this.form.goodsType == 1 ? "noteCode" : "productNo"] >
          b[this.form.goodsType == 1 ? "noteCode" : "productNo"]
          ? 1
          : -1
      );
      this.crud.forEach((item, i) => {
        item.storeLoadCode = "";
        item.index = i + 1;
      });
      this.choiceV = false;
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    choiceHandle() {
      this.choiceTle =
        this.form.goodsType == 1 ? "选择胚布信息" : "选择成品布信息";
      this.choiceV = true;
    },
    scanChange() {
      if(this.form.goodsType == 1){
        getInCloth({
          noteCode: this.scanIpt,
        }).then((res) => {
          if (res.data.records) {
            let note = res.data.records[0];
            note.storeLoadCode = "";
            note.index = this.crud.length + 1;
            this.crud.push(note);
            this.crud = this.$unique(this.crud, "noteCode");
            this.scanIpt = "";
          } else {
            this.$tip.warning("暂无数据!");
          }
        })
      }else{
        getInFinishedByPage({
          cardType: 1,
          productNo: this.scanIpt,
          r_clothState_r: "||1||3",
        }).then((res) => {
          if (res.data.records) {
            let note = res.data.records[0];
            note.storeLoadCode = "";
            note.index = this.crud.length + 1;
            this.crud.push(note);
            this.crud = this.$unique(this.crud, "cardId");
            this.scanIpt = "";
          } else {
            this.$tip.warning("暂无数据!");
          }
        });
      }

    },
    del() {
      this.selectList.forEach((item, i) => {
        this.crud.splice(item.$index - i, 1);
      });
      this.$refs.crud.toggleSelection();
      this.crud.forEach((item, i) => {
        item.index = i + 1;
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
    selectionChange(val) {
      this.selectList = val;
    },
  },
};
</script>
<style lang="stylus" scoped></style>