<!--
 * @Author: Lyl
 * @Date: 2022-01-12 15:39:08
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-14 10:18:07
 * @FilePath: \iot.vue\src\view\im\whseInOutKB\index.vue
 * @Description: 
-->
<template>
  <div
    class="whseInOutKB"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane label="出入库看板" name="kanban">
        <el-row class="btnList">
          <el-button type="success" @click="sendTask" :disabled="!crud.length"
            >提交任务</el-button
          >
          <!-- <el-button type="success" @click="submit">提交</el-button> -->
          <el-button type="primary" @click="query">{{
            this.$t("public.query")
          }}</el-button>
          <!-- <el-button
            type="primary"
            @click="dialogVisible = true"
            :disabled="!crud.length || form.type == 2"
            >修改载具</el-button
          > -->
          <el-button type="primary" @click="inVisible = true"
            >手工入库</el-button
          >
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
        </el-row>
        <view-container title="布笼物品信息">
          <el-row class="crudBox" style="margin-top: 5px">
            <avue-crud
              ref="crud"
              :option="crudOp"
              :page.sync="mainPage"
              :data="crud"
              v-loading="loading"
              @on-load="query"
              @row-dblclick="handleRowDBLClick"
            ></avue-crud>
          </el-row> </view-container
      ></el-tab-pane>
      <el-tab-pane label="任务管理" name="task">
        <el-row class="btnList">
          <el-button type="primary" @click="queryTask">{{
            this.$t("public.query")
          }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="taskFormOp" v-model="taskForm">
          </avue-form>
        </el-row>
        <view-container title="任务信息">
          <el-row class="crudBox" style="margin-top: 5px">
            <avue-crud
              ref="task"
              :option="taskCrudOp"
              :page.sync="page"
              :data="task"
              v-loading="loading"
              @on-load="queryTask"
              @current-row-change="cellClick"
            ></avue-crud>
          </el-row>
        </view-container>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      id="colorMng_Dlg"
      :visible.sync="dialogVisible"
      fullscreen
      width="70%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <updatenote-com
        v-if="dialogVisible"
        ref="tem"
        :noteList="crud"
        :noteType="tabs"
        @close="diaClose"
      ></updatenote-com>
    </el-dialog>
    <el-dialog
      id="colorMng_Dlg"
      :visible.sync="inVisible"
      fullscreen
      width="70%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <inwhse-com
        v-if="inVisible"
        ref="inwhse"
        :form="form"
        @close="inVisible = false"
      ></inwhse-com>
    </el-dialog>
  </div>
</template>

<script>
import {
  formOp,
  finishedCrud,
  clothCrud,
  taskForm,
  taskCrud,
  finishedStockOp,
} from "./data";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import {
  getInCloth,
  getIOutCloth,
  getInFinished,
  getOutFinished,
  updateNote,
  updateFinished,
  getInWhse,
  addInWhse,
  updateInWhse,
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
  getTask,
  addTask,
  updateTask,
  getInFinishedWhse,
  getFinalStock,
  addInFinishedDtlb,
  getOutFinishedWhse,
  updateOutFinishedWhse,
  sendTask,
  getTaskList,
  getStorageLog,
  updateStorageLog,
  getInDtla,
  updateInDtla,
  updateFinishedWhse,
  getInFinishedDtla,
  updateFinishedDtla,
} from "./api";
import { webSocket } from "@/config/index.js";
import updatenoteCom from "./updateNote.vue";
import inwhseCom from "./inWhse.vue";
export default {
  components: {
    updatenoteCom,
    inwhseCom,
  },
  props: {},
  data() {
    return {
      form: {
        type: 1,
        goodsType: 2,
        exit: "C",
        storageState: 1,
      },
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      mainPage: {
        pageSizes: [50, 100, 200, 500],
        pageSize: 500,
        currentPage: 1,
        total: 0,
      },
      formOp: formOp(this),
      crudOp: clothCrud(this),
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
      storageCode: "",
      sort: {},
      inExit: [
        {
          label: "A出入库口(7001扫码)",
          value: "A",
        },
        {
          label: "B出入库口",
          value: "B",
        },
        {
          label: "C出入库口(7002扫码)",
          value: "C",
        },
        {
          label: "D出入库口(7003扫码)",
          value: "D",
        },
        {
          label: "D1空笼暂存口",
          value: "D1",
        },
        {
          label: "F出入库口",
          value: "F",
        },
        {
          label: "G出入库口(7004扫码)",
          value: "G",
        },
      ],
      outExit: [
        {
          label: "A出入库口(7001扫码)",
          value: "A",
        },
        {
          label: "B出入库口",
          value: "B",
        },
        {
          label: "C出入库口(7002扫码)",
          value: "C",
        },
        {
          label: "D出入库口(7003扫码)",
          value: "D",
        },
        {
          label: "D1空笼暂存口",
          value: "D1",
        },
        {
          label: "E出库口",
          value: "E",
        },
        {
          label: "F出入库口",
          value: "F",
        },
        {
          label: "G出入库口(7004扫码)",
          value: "G",
        },
      ],
      taskFormOp: taskForm(this),
      taskForm: {},
      taskCrudOp: taskCrud(this),
      task: [],
      spowerClient: null,
      websocket: null,
      tabs: "kanban",
      taskChoose: {},
      idArr: [],
      inVisible: false,
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
    webSocket.setWebSoket(_this);
    _this.websocket.onmessage = function (data) {
      // console.log("websocketResult:", data);
      // let webResult = JSON.parse(data.data);
      // _this.$tip.success(
      //   `载具${data.storageCode}${
      //     data.orderType == 1 ? "入仓" : "出仓"
      //   }任务已完成!`
      // );
      // _this.finishTask(webResult);
      _this.queryTask();
    };
  },
  mounted() {},
  methods: {
    query() {
      if (!this.form.storeLoadCode && !this.form.vatNo) {
        this.$tip.error("请输入单号或者载具编号!");
        return;
      }
      if (!this.form.vatNo && !this.form.proName && this.form.type == 2) {
        this.$tip.error("单号不能为空!");
        return;
      }
      this.wLoading = true;
      if (this.form.goodsType == 1) {
        this.form.clothState = this.form.type;
        for (let key in this.form) {
          if (!this.form[key]) {
            delete this.form[key];
          }
        }
        if (this.form.type) {
          // 胚布入仓
          getInCloth({
            storeLoadCode: this.form.storeLoadCode,
            clothState: 1,
            page: this.mainPage.currentPage,
            rows: this.mainPage.pageSize,
            start: this.mainPage.currentPage,
          }).then((res) => {
            this.crud = res.data.records;
            this.mainPage.total = res.data.total;
            this.$set(this.form, "storageState", this.crud.length ? 0 : 1);
            this.crud.forEach((item, i) => {
              item.index = i + 1;
            });
            this.wLoading = false;
          });
        } else {
          // 胚布出仓
          getInCloth({
            storeLoadCode: this.form.storeLoadCode,
            clothState: 1,
            page: this.mainPage.currentPage,
            rows: this.mainPage.pageSize,
            start: this.mainPage.currentPage,
          }).then((res) => {
            this.crud = res.data.records;
            this.mainPage.total = res.data.total;
            this.$set(this.form, "storageState", this.crud.length ? 0 : 1);
            this.crud.forEach((item, i) => {
              item.index = i + 1;
            });
            this.wLoading = false;
          });
          this.$tip.error("待开发!");
        }
      } else {
        this.form.clothState = this.form.type;
        for (let key in this.form) {
          if (!this.form[key]) {
            delete this.form[key];
          }
        }
        if (this.form.type == 1) {
          //成品布入仓
          getInFinished({
            storeLoadCode: this.form.storeLoadCode,
            page: this.mainPage.currentPage,
            rows: this.mainPage.pageSize,
            start: this.mainPage.currentPage,
            vatNo: this.form.vatNo,
            cardType: 1,
            // clothState: 3,
          }).then((res) => {
            this.crud = res.data.records.sort((a, b) => {
              return a.productNo > b.productNo ? 1 : -1;
            });
            this.mainPage.total = res.data.total;
            this.$set(this.form, "storageState", this.crud.length ? 0 : 1);
            this.crud.forEach((item, i) => {
              item.index = i + 1;
            });
            setTimeout(() => {
              this.wLoading = false;
            }, 500);
          });
        } else {
          //成品布出仓
          getFinalStock(
            Object.assign({
              page: this.mainPage.currentPage,
              rows: this.mainPage.pageSize,
              start: this.mainPage.currentPage,
              vatNo: "!^%" + (this.form.vatNo || ""),
              palletCode: "%" + (this.form.storeLoadCode || ""),
              // clothState: 1,
              cardType: 1,
            })
          ).then((res) => {
            if (!res.data.records.length) {
              this.$tip.warning("暂无数据!");
              this.crud = [];
              this.wLoading = false;
              this.$set(this.form, "storageState", 0);
              return;
            }
            this.mainPage.total = res.data.total;
            this.crud = res.data.records;
            this.crud.forEach((item, i) => {
              item.storeLoadCode = item.palletCode;
              item.storeSiteCode = item.storageId;
              // item.pidNos = item.pidNos.replace(/^,/, "");
              item.index = i + 1;
            });
            this.$set(this.form, "storageState", 1);
            this.wLoading = false;
            // if (this.form.vatNo) {
            //   this.crud = [];
            //   let data = this.group(res.data, "storeLoadCode");
            //   data.forEach((item, i) => {
            //     getFinalStock({
            //       storeLoadCode: item.storeLoadCode,
            //       clothState: 1,
            //       cardType: 1,
            //       page: 1,
            //       rows: 9999,
            //       // vatNo: "%" + this.form.vatNo,
            //     }).then((loadRes) => {
            //       let vatList = loadRes.data;
            //       vatList = this.group(vatList, "vatNo");
            //       let vatData = [];
            //       vatList.forEach((vat, j) => {
            //         vat.data = vat.data.sort((a, b) => {
            //           return a.pidNo > b.pidNo ? 1 : -1;
            //         });
            //         let sumWeight = 0;
            //         vat.data.forEach((jk, k) => {
            //           jk.id = `${i + 1}-${j + 1}-${k + 1}`;
            //           jk.index = k + 1;
            //           jk.netWeight = jk.weight;
            //           sumWeight += jk.netWeight;
            //         });
            //         vatData.push({
            //           vatNo: vat.vatNo,
            //           children: vat.data,
            //           id: `${i + 1}-${j + 1}`,
            //           index: j + 1,
            //           netWeight: Number(sumWeight.toFixed(1)),
            //           weightUnit: vat.data[0].weightUnit,
            //           pidNo: vat.data.length,
            //         });
            //         // this.idArr.push(`${i + 1}-${j + 1}`);
            //       });
            //       this.crud.push({
            //         storeLoadCode: item.storeLoadCode,
            //         id: i + 1,
            //         children: vatData,
            //         index: i + 1,
            //       });
            //     });
            //   });
            //   setTimeout(() => {
            //     this.crud = this.crud.sort((a, b) => {
            //       return a.index > b.index ? 1 : -1;
            //     });
            //     this.$set(this.form, "storageState", this.crud.length ? 0 : 1);
            //     this.wLoading = false;
            //   }, 200);
            // } else {
            //   this.crud = res.data.records.sort((a, b) => {
            //     return a.productNo > b.productNo ? 1 : -1;
            //   });
            //   this.$set(this.form, "storageState", this.crud.length ? 0 : 1);
            //   this.$nextTick(() => {
            //     this.crud.forEach((item, i) => {
            //       item.index = i + 1;
            //       item.storeSiteCode = item.locationCode;
            //       this.$refs.crud.toggleRowSelection(item, true);
            //     });
            //   });
            //   setTimeout(() => {
            //     this.wLoading = false;
            //   }, 500);
            // }
          });
        }
      }
    },
    queryTask() {
      this.wLoading = true;
      this.taskForm.barCode = this.taskForm.barCode
        ? (this.taskForm.barCode = "%" + this.taskForm.barCode)
        : "";
      getTask(
        Object.assign(this.taskForm, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          page: this.page.currentPage,
        })
      ).then((res) => {
        this.task = res.data.records;
        this.page.total = res.data.total;
        if (this.task.length) {
          this.$refs.task.setCurrentRow(this.task[0]);
        }
        if (this.taskForm.barCode && this.taskForm.barCode.indexOf("%") != -1) {
          this.taskForm.barCode = this.taskForm.barCode.split("%")[1];
        }
        this.wLoading = false;
      });
    },
    updateStore() {
      if (!this.selectList.length) {
        return;
      }
      if (!this.storageCode) {
        this.$tip.error("请输入要修改的载具编号!");
        return;
      }
      this.$tip
        .cofirm(`是否确定修改选中数据的载具编号？`, this, {})
        .then(() => {
          this.wLoading = true;
          if (this.form.goodsType == 2) {
            // 成品布
            this.selectList.forEach((item, i) => {
              item.storeLoadCode = this.storageCode;
              updateFinished(item).then((res) => {
                if (i == this.selectList.length - 1) {
                  this.query();
                  // this.wLoading = false
                }
              });
            });
          } else {
            // 胚布
            this.selectList.forEach((item, i) => {
              item.storeLoadCode = this.storageCode;
              updateNote(item).then((res) => {
                if (i == this.selectList.length - 1) {
                  // this.wLoading = false
                  this.query();
                }
              });
            });
          }
        });
    },
    finishTask(webResult) {
      // console.log("webResult:", webResult);
      // if (!this.storageCode) {
      //   this.$tip.error("货位码不能为空！");
      //   return;
      // }
      // if (this.taskChoose.finishStatus) {
      //   this.$tip.warning("任务已完成！");
      //   return;
      // }
      // this.$tip.cofirm(`是否确定完成选中的任务?`, this, {}).then(() => {
      this.wLoading = true;
      getTaskList({ orderId: webResult.orderId }).then((taskInfo) => {
        console.log("任务信息", taskInfo);
        if (taskInfo.data.length) {
          //  有任务信息
          let data = taskInfo.data[0];
          // if (data.finishStatus == 0) {
          //   this.$tip.success("任务已完成!");
          //   return;
          // }
          // this.storageCode = "TEST01";
          // data.finishStatus = 1;
          // updateTask(data);
          // ).then((res) => {
          //   if (res.data.code == 200) {
          // 模拟完成任务回调
          // 1.修改胚布状态
          if (data.type == 1) {
            getInCloth({
              clothState: data.orderType + 3, // 4入仓中 5出仓中
              storeLoadCode: data.barCode,
            }).then((note) => {
              if (note.data.length) {
                note.data.forEach((item, i) => {
                  item.clothState = data.orderType + 1; // 2 入仓， 3 出仓
                  item.storeSiteCode = data.storageCode;
                  updateNote(item).then((res) => {
                    if (i == note.data.length - 1) {
                      // 生成入仓记录
                      this.setClothWhse(data.orderType, note.data);
                    }
                  });
                });
              } else {
                this.$tip.error("暂无该载具信息");
                this.wLoading = false;
              }
            });
          } else {
            getInFinished({
              clothState: data.orderType + 3, // 4入仓中 5出仓中
              storeLoadCode: data.barCode,
            }).then((note) => {
              // console.log("note",note.data);
              if (note.data.length) {
                note.data.forEach((item, i) => {
                  item.clothState = data.orderType + 1; // 2 入仓， 3 出仓
                  item.storeSiteCode = data.storageCode;
                  updateFinished(item).then((res) => {
                    if (i == note.data.length - 1) {
                      if (data.orderType == 2) {
                        // 修改出仓表
                        getOutFinishedWhse({
                          stockState: 2,
                          spNo: data.barCode,
                        }).then((res) => {
                          if (res.data.length) {
                            updateOutFinishedWhse({
                              whseFinclothselloutoid:
                                res.data[0].whseFinclothselloutoid,
                              stockState: 0,
                              spNo: "",
                            }).then((res) => {
                              this.wLoading = false;
                              this.$tip.success(
                                `载具${data.storageCode}${
                                  data.orderType == 1 ? "入仓" : "出仓"
                                }任务已完成!`
                              );
                              return;
                            });
                          } else {
                            this.wLoading = false;
                            this.$tip.success(
                              `载具${data.storageCode}${
                                data.orderType == 1 ? "入仓" : "出仓"
                              }任务已完成!`
                            );
                          }
                        });
                      } else {
                        // 修改入仓表
                        getInFinishedWhse({
                          stockState: 2,
                          remarks: data.barCode,
                        }).then((res) => {
                          if (res.data.length) {
                            updateFinishedWhse({
                              whseFinishedclothinoid:
                                res.data[0].whseFinishedclothinoid,
                              stockState: 0,
                              remarks: "",
                            }).then((updateRes) => {
                              // 修改出仓明细表
                              getInFinishedDtla({
                                whseFinishedclothinFk:
                                  res.data[0].whseFinishedclothinoid,
                              }).then((dtla) => {
                                if (dtla.data.length) {
                                  dtla.data.forEach((item, i) => {
                                    item.locationCode = data.storageCode;
                                    updateFinishedDtla(item).then(
                                      (updateDtla) => {
                                        if (i == dtla.data.length - 1) {
                                          this.wLoading = false;
                                          this.$tip.success(
                                            `载具${data.storageCode}${
                                              data.orderType == 1
                                                ? "入仓"
                                                : "出仓"
                                            }任务已完成!`
                                          );
                                        }
                                      }
                                    );
                                  });
                                } else {
                                  this.wLoading = false;
                                  this.$tip.success(
                                    `载具${data.storageCode}${
                                      data.orderType == 1 ? "入仓" : "出仓"
                                    }任务已完成!`
                                  );
                                }
                              });

                              // return;
                            });
                          }
                        });
                        // 生成入仓记录
                        // this.setFinishedWhse(data, note.data);
                      }
                    }
                  });
                });
              } else {
                this.$tip.success(
                  `载具${data.storageCode}${
                    data.type == 1 ? "入仓" : "出仓"
                  }任务已完成!`
                );
                this.wLoading = false;
              }
            });
          }
          // } else {
          // }
          // });
        } else {
          // 无任务信息
          this.$tip.error("无该任务信息!");
          this.wLoading = false;
        }
      });
      // });
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
          if (this.form.type == 2) {
            let list = this.group(this.selectList, "storeLoadCode");
            list.forEach((item, i) => {
              addTask({
                barCode: item.storeLoadCode,
                createTime: this.$getNowTime("datetime"),
                entrance: this.form.exit, // 入库口
                isEmpty: this.form.storageState, // 是否为空
                orderType: this.form.type, // 出库/入库
                type: this.form.goodsType, // 物料类别
                finishStatus: -1,
                storageCode: item.data[0].storeSiteCode,
              }).then((res) => {
                if (res.data.code == 200) {
                  this.successAfter(item.data);
                } else {
                  this.$tip.error("提交任务失败," + res.data.message + "!");
                  if (i == list.length - 1) {
                    this.wLoading = false;
                  }
                }
              });
              if (!list.length) {
                addTask({
                  barCode: this.form.storeLoadCode,
                  createTime: this.$getNowTime("datetime"),
                  entrance: this.form.exit, // 入库口
                  isEmpty: this.form.storageState, // 是否为空
                  orderType: this.form.type, // 出库/入库
                  type: this.form.goodsType, // 物料类别
                  finishStatus: -1,
                  // storageCode: item.data[0].storeSiteCode,
                }).then((res) => {
                  if (res.data.code == 200) {
                    this.wLoading = false;
                    this.$tip.success("任务提交成功!");
                    // this.successAfter(item.data);
                  } else {
                    this.$tip.error("提交任务失败," + res.data.msg + "!");
                    if (i == list.length - 1) {
                      this.wLoading = false;
                    }
                  }
                });
              }
            });
          } else {
            addTask({
              barCode:
                this.form.storeLoadCode || this.selectList[0].storeLoadCode,
              createTime: this.$getNowTime("datetime"),
              entrance: this.form.exit, // 入库口
              isEmpty: this.form.storageState, // 是否为空
              orderType: this.form.type, // 出库/入库
              type: this.form.goodsType, // 物料类别
              finishStatus: -1,
              // storageCode: this.selectList[0].storeSiteCode,
            }).then((res) => {
              if (res.data.code == 200) {
                this.successAfter(this.selectList);
              } else {
                this.wLoading = false;
                this.$tip.error("提交任务失败," + res.data.msg + "!");
              }
            });
          }
        })
        .catch(() => {});
    },
    sendTask() {
      if (!this.form.storeLoadCode) {
        this.$tip.error("载具编号不能为空!");
        return;
      }
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
          if (this.form.type == 2) {
            // getFinalStock({ storeLoadCode: this.form.storeLoadCode }).then(
            //   (res) => {
            // let list = this.group(this.selectList, "storeLoadCode");
            // list.forEach((item, i) => {
            sendTask({
              barCode: this.form.storeLoadCode,
              createTime: this.$getNowTime("datetime"),
              entrance: this.form.exit, // 入库口
              isEmpty: this.form.storageState, // 是否为空
              orderType: this.form.type, // 出库/入库
              type: this.form.goodsType, // 物料类别
              // finishStatus: 0,
              storageCode: this.form.storeLoadCode,
            }).then((sendRes) => {
              if (sendRes.data.code == 0) {
                this.$tip.success("任务提交成功!");
                this.query();
                this.queryTask();
                // this.successAfter(res.data);
              } else {
                this.$tip.error("任务提交失败," + sendRes.data.message + "!");
                this.wLoading = false;
              }
              // });
            });
            // });
            // if (!list.list) {
            //   this.$tip.success("任务提交成功!");
            //   this.queryTask();
            // }
          } else {
            sendTask({
              barCode: this.form.storeLoadCode,
              createTime: this.$getNowTime("datetime"),
              entrance: this.form.exit, // 入库口
              isEmpty: this.form.storageState, // 是否为空
              orderType: this.form.type, // 出库/入库
              type: this.form.goodsType, // 物料类别
              finishStatus: 0,
              // storageCode: this.selectList[0].storeSiteCode,
            }).then((res) => {
              if (res.data.code == 0) {
                this.$tip.success("任务提交成功!");
                this.query();
                this.queryTask();
                // this.successAfter();
              } else {
                this.wLoading = false;
                this.$tip.error("提交任务失败," + res.data.message + "!");
              }
            });
          }
        })
        .catch(() => {});
    },
    successAfter(outList) {
      if (this.form.goodsType == 1) {
        this.selectList.forEach((item, i) => {
          item.clothState = this.form.type == 1 ? 4 : 5; // 4 入仓中， 5 出仓中
          updateNote(item).then((res) => {
            if (i == this.selectList.length - 1) {
              // this.setClothWhse();
              this.$tip.success("任务提交成功!");
              this.query();
              this.queryTask();
            }
          });
        });
      } else {
        if (this.form.type == 2) {
          outList.forEach((item, i) => {
            // item.clothState = this.form.type == 1 ? 4 : 5;
            getInFinished({
              cardId: item.productId,
              productNo: item.productNo,
              cardType: 1,
              clothState: 2,
            }).then((res) => {
              if (res.data.length) {
                let data = res.data[0];
                data.clothState = this.form.type == 1 ? 4 : 5;
                updateFinished(data).then((res) => {
                  if (i == outList.length - 1) {
                    setTimeout(() => {
                      this.setFinishedWhse(this.form.type, outList);
                    }, 500);
                  }
                });
              } else {
                if (i == outList.length - 1) {
                  this.$tip.success("任务提交成功!");
                  this.query();
                  this.queryTask();
                }
              }
            });
            if (!outList.length) {
              this.$tip.success("任务提交成功!");
              this.query();
              this.queryTask();
            }
          });
        } else {
          getInFinished({
            clothState: this.form.type,
            storeLoadCode: this.form.storeLoadCode,
          }).then((cardList) => {
            // 查询载具库存
            cardList.data.forEach((item, i) => {
              // this.selectList.forEach((item, i) => {
              // item.clothState = this.form.type == 1 ? 4 : 5;
              // getInFinished({
              //   cardId: item.cardId,
              //   clothState: item.clothState,
              // }).then((res) => {
              // if (res.data.length) {
              // let data = res.data[0];
              item.clothState = this.form.type == 1 ? 4 : 5;
              updateFinished(item).then((res) => {
                if (i == cardList.data.length - 1) {
                  setTimeout(() => {
                    this.setFinishedWhse(
                      { orderType: this.form.type },
                      cardList.data
                    );
                  }, 200);
                }
              });
              // }
              // });
            });
          });
          if (!this.selectList.length) {
            this.$tip.success("任务提交成功!");
            this.query();
            this.queryTask();
          }
        }
      }
    },
    setClothWhse(type, noteList) {
      if (type == 1) {
        // 生成入库信息
        baseCodeSupplyEx({ code: "whse_in" }).then((res) => {
          let data = {
            yinId: res.data.data,
            sysCreated: this.$getNowTime("datetime"),
            yinDate: this.$getNowTime("date"),
            yinType: 6,
            yinStatus: 0,
            finStatus: 0,
            sysCreatedby: this.$store.state.userOid,
          };
          let list = this.group(noteList, "proName");
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
                  fabticket: this.taskChoose.barCode,
                  batchNo: pbIn.data.data,
                  locationCode: this.taskChoose.storageCode,
                }).then((dtla) => {
                  const dtlaId = dtla.data.data;
                  item.data.forEach((dtlb, b) => {
                    addInDtlb({
                      custTicket: dtlb.noteCode,
                      batchNo: pbIn.data.data,
                      countingNo: dtlb.eachNumber,
                      // locationCode: dtlb.storeSiteCode,
                      locationCode: this.taskChoose.storageCode,
                      weight: dtlb.clothWeight,
                      weightUnit: "KG",
                      whseCalicoinDtlaFk: dtlaId,
                    }).then((dtlb) => {});
                    if (b == item.data.length - 1 && i == list.length - 1) {
                      this.queryTask();
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
          let list = this.group(noteList, "proName");
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
                  fabticket: this.taskChoose.barCode,
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
                      this.queryTask();
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
    setFinishedWhse(data, noteList) {
      if (data.orderType == 1) {
        baseCodeSupplyEx({ code: "whse_in" }).then((res) => {
          let inData = {
            yinId: res.data.data,
            sysCreated: this.$getNowTime("datetime"),
            yinDate: this.$getNowTime("datetime"),
            yinType: 1,
            yinStatus: 0,
            sysCreatedby: this.$store.state.userOid,
            finStatus: 0,
            stockState: 2,
            remarks: noteList[0].storeLoadCode,
          };
          let list = this.group(noteList, "vatNo");
          addInFinishedWhse(inData).then((inwhse) => {
            baseCodeSupply({ code: "whse_in" }).then((res) => {});
            const inwhseId = inwhse.data.data;
            baseCodeSupplyEx({ code: "cpb_in_whse" }).then((pbIn) => {
              list.forEach((item, i) => {
                addInFinishedDtla({
                  vatNo: item.vatNo,
                  pidCount: item.data.length,
                  weightUnit: item.data[0].weightUnit,
                  whseFinishedclothinFk: inwhseId,
                  // locationCode: data.storageCode,
                  storeLoadCode: noteList[0].storeLoadCode,
                  fabticket: item.productNo,
                  sumWeight:
                    item.data[0].weightUnit == "KG"
                      ? Number(item.weight.toFixed(1))
                      : Number(item.weightLbs.toFixed(1)),
                }).then((dtla) => {
                  const dtlaId = dtla.data.data;
                  item.data.forEach((dtlb, b) => {
                    addInFinishedDtlb({
                      pidNo: dtlb.pidNo,
                      productDtlFk: dtlaId,
                      productNo: dtlb.productNo,
                      weight:
                        dtlb.weightUnit == "KG"
                          ? dtlb.netWeight
                          : dtlb.netWeightLbs,
                      weightUnit: dtlb.weightUnit,
                      productId: dtlb.cardId,
                      vatNo: dtlb.vatNo,
                    }).then((dtlb) => {});
                    if (b == item.data.length - 1 && i == list.length - 1) {
                      this.$tip.success("任务提交成功!");
                      this.$nextTick(() => {
                        setTimeout(() => {
                          this.query();
                          this.queryTask();
                        }, 500);
                      });
                    }
                  });
                });
              });
              baseCodeSupply({ code: "cpb_in_whse" }).then((res) => {});
            });
          });
        });
        /*  // 生成入库信息
        baseCodeSupplyEx({ code: "whse_in" }).then((res) => {
          let data = {
            yinId: res.data.data,
            sysCreated: this.$getNowTime("datetime"),
            yinDate: this.$getNowTime("date"),
            yinType: 1,
            yinStatus: 0,
            sysCreatedby: this.$store.state.userOid,
            finStatus: 0,
            // stockState: 2, // 待确认，等任务完成 => 0
            // registerNo: this.form.storeLoadCode,
          };
          addInFinishedWhse(data).then((inwhse) => {
            baseCodeSupply({ code: "whse_in" }).then((res) => {});
            const inwhseId = inwhse.data.data;
            baseCodeSupplyEx({ code: "cpb_in_whse" }).then((pbIn) => {
              noteList.forEach((item, i) => {
                addInFinishedDtla({
                  batchNo: item.vatNo,
                  weight: item.netWeight,
                  countingNo: item.pidNo,
                  weightUnit: item.weightUnit,
                  whseFinishedclothinFk: inwhseId,
                  locationCode: this.taskChoose.storageCode,
                  storeLoadCode: this.taskChoose.barCode,
                  fabticket: item.productNo,
                }).then((dtla) => {});
                if (i == noteList.length - 1) {
                  this.queryTask();
                  this.$tip.success("成品布入仓成功!");
                }
              });
              baseCodeSupply({ code: "cpb_in_whse" }).then((res) => {});
            });
          });
        }); */
      } else {
        // 删除载具使用日志
        // getStorageLog({
        //   businessId: noteList[0].vatNo,
        //   businessType: 2,
        //   useType: 2,
        //   whsCarriageStorageFk: noteList[0].storeLoadCode,
        // }).then((res) => {
        //   if (res.data.length) {
        //     updateStorageLog({
        //       storageLogId: res.data[0].storageLogId,
        //       deleteFlag: true,
        //       deleteTime: this.$getNowTime("datetime"),
        //     }).then((updateRes) => {});
        //   }
        // });
        // 生成出库信息
        baseCodeSupply({ code: "whse_out" }).then((res) => {
          let data = {
            woOutno: res.data.data,
            spNo: noteList[0].storeLoadCode,
            sysCreated: this.$getNowTime("datetime"),
            woDate: this.$getNowTime("date"),
            retType: 1,
            yinStatus: 0,
            sysCreatedby: this.$store.state.userOid,
            stockState: 2, // 待确认，即入仓中/出仓中
          };
          let list = this.group(noteList, "storeLoadCode");
          addOutFinishedWhse(data).then((inwhse) => {
            // baseCodeSupply({ code: "whse_out" }).then((res) => {});
            const outwhseId = inwhse.data.data;
            baseCodeSupplyEx({ code: "cpb_out_whse" }).then((pbIn) => {
              list.forEach((item, i) => {
                addOutFinishedDtla({
                  woOrderno: item.storeLoadCode,
                  whseFinclothselloutFk: outwhseId,
                  woMatname: item.fabName,
                }).then((dtla) => {
                  const dtlaId = dtla.data.data;
                  item.data.forEach((dtlb, b) => {
                    addOutFinishedDtlb({
                      prodNo: dtlb.vatNo,
                      ticketNo: dtlb.productNo,
                      batchNo: pbIn.data.data,
                      countingNo: dtlb.pidNo,
                      locationCode: dtlb.locationCode,
                      productNo: dtlb.productNo,
                      woWeights: dtlb.stockQty,
                      woUnit: dtlb.weightUnit,
                      whseFinclothselloutDtlaFk: dtlaId,
                    }).then((dtlb) => {});
                    if (b == item.data.length - 1 && i == list.length - 1) {
                      this.$tip.success("任务提交成功!");
                      this.$nextTick(() => {
                        setTimeout(() => {
                          this.query();
                          this.queryTask();
                        });
                      });

                      // this.queryTask();
                      // this.$tip.success("出库成功!");
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
        this.crudOp = clothCrud(this);
        this.formOp.column[4].display = this.form.type == 1 ? false : true;
      } else {
        this.crudOp =
          this.form.type == 1 ? finishedCrud(this) : finishedStockOp(this);
        this.formOp.column[4].display = false;
      }
    },
    typeChange(value) {
      if (value == 1) {
        this.formOp.column[2].dicData = this.inExit;
        this.form.exit = this.inExit[0].value;
        // _this.formOp.column[4].display = false;
        this.formOp.column[5].display = false;
        // _this.formOp.column[6].type = "";
        // _this.formOp.column[5].display = false;
        this.crud = [];
      } else {
        this.formOp.column[2].dicData = this.outExit;
        // _this.formOp.column[4].display =
        //   _this.form.goodsType == 1 ? true : false;
        this.formOp.column[5].display = this.form.goodsType == 1 ? false : true;
        // _this.formOp.column[6].type = "select";
        // _this.form.exit = outExit[0].value;
        this.form.exit = "C";
        // _this.formOp.column[5].display = true;
        this.crud = [];
      }
      this.$nextTick(() => {
        this.changeGoodsType(this.form.type);
      });
    },
    handleRowDBLClick(val) {
      this.$set(this.form, "storeLoadCode", val.storeLoadCode);
    },
    cellClick(val) {
      this.taskChoose = val;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {},
    summaryMethod({ columns, data }) {
      const sums = [];
      if (columns.length > 0 && this.form.type == 2) {
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
    diaClose() {
      this.dialogVisible = false;
      this.query();
    },
  },
  updated() {
    this.$nextTick(() => {
      if (this.crud.length) this.$refs["crud"].doLayout();
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
.avue-crud .el-tag--mini
  display none !important
</style>