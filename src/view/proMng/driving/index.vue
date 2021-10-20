<!--
 * @Author: Lyl
 * @Date: 2021-10-05 14:00:53
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-20 14:59:19
 * @Description: 
-->
<template>
  <div id="proCanvas">
    <view-container
      title="行车监控"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
    >
      <div id="content">
        <canvas id="main"></canvas>
      </div>
      <el-row>
        <el-col :span="24">
          <el-tabs v-model="tabs" type="border-card">
            <el-tab-pane label="载具日志表" name="zj">
              <avue-crud
                ref="crud"
                id="crud"
                :option="crudOp"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
              ></avue-crud
            ></el-tab-pane>
            <el-tab-pane label="任务管理" name="rw">
              <avue-crud
                ref="task"
                id="task"
                :option="taskOp"
                :data="task"
                :page.sync="page2"
                @on-load="initTask"
                @current-row-change="cellClick"
                ><template slot="menu">
                  <el-button size="small" type="text" @click="cancelTask"
                    >取消</el-button
                  >
                </template></avue-crud
              >
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!-- <el-col :span="8">
          <view-container title="载具物品清单">
            <avue-crud :option="billOp" :data="detail.list"></avue-crud>
          </view-container>
        </el-col> -->
      </el-row>
    </view-container>
    <div class="suspension_btn" id="suspension_btn" @click="handleClick">
      <!-- :style="{ right: drawer ? '17.5%' : '5px' }" -->
      <!-- <el-dropdown
        type="primary"
        @command="handleClick"
        trigger="click"
        placement="top"
      > -->
      <el-button
        type="primary"
        style="width: 50px; height: 50px; border-radius: 50%"
        v-if="!drawer"
      >
        <!-- 菜单 -->
        <i class="el-icon-menu" style="font-size: 24px"></i>
      </el-button>

      <i v-else class="el-icon-d-arrow-right"></i>
    </div>
    <el-drawer
      title="菜单"
      :visible.sync="drawer"
      direction="rtl"
      :modal="false"
      :modal-append-to-body="true"
      size="99%"
      :wrapperClosable="false"
      @close="drawerCloseBefore"
      id="driving"
    >
      <el-steps
        :space="200"
        :active="active"
        finish-status="success"
        direction="vertical"
        style="margin-left: 3px"
      >
        <el-step title="请选择起点">
          <template slot="description">
            <el-select v-model="form.start" @change="startChange">
              <el-option
                v-for="item in areaList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.value == form.end"
              >
              </el-option>
            </el-select>
            <el-popconfirm title="确定提交任务？" @onConfirm="save">
              <el-button slot="reference" type="primary" :disabled="!form.type"
                >提交</el-button
              >
            </el-popconfirm>
            <br />
            从地图上选择
            <el-switch
              v-model="sSwicth"
              active-color="#13ce66"
              inactive-color="#ccc"
              @change="sSwicth ? (eSwicth = false) : ''"
            >
            </el-switch>
          </template>
        </el-step>
        <el-step title="请选择终点">
          <template slot="description">
            <el-select v-model="form.end" @change="endChange">
              <!-- 不是出口，也没有东西 -->
              <el-option
                v-for="item in areaList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.value == form.start"
              >
              </el-option>
            </el-select>
            <br />
            从地图上选择
            <el-switch
              v-model="eSwicth"
              active-color="#13ce66"
              @change="eSwicth ? (sSwicth = false) : ''"
              inactive-color="#ccc"
            >
            </el-switch>
          </template>
        </el-step>
        <el-step title="请扫描缸号" v-if="form.start">
          <!--  :disabled="form.type == 2" -->
          <template slot="description">
            <!-- <el-select
              v-model="form.vatNo"
       
              filterable
              allow-create
              :disabled="form.type == 2"
            ></el-select> -->
            <el-input
              @keyup.enter.native="onSubmit"
              v-model="form.vatNo"
            ></el-input>
          </template>
        </el-step>
        <!-- 入仓才可以指定载具 -->
        <el-step title="请选择载具" v-if="form.start">
          <!--    :disabled="form.type == 2" -->
          <template slot="description">
            <el-select
              v-model="form.vehicle"
              multiple
              filterable
              allow-create
              default-first-option
              @change="vehicleChange"
            >
              <el-option
                v-for="item in storageList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-step>
      </el-steps>
    </el-drawer>
  </div>
</template>
<script>
import {
  get,
  getZone,
  getSensor,
  getLog,
  getBill,
  getStorage,
  getBleadyeJob,
  updateStorage,
  addLog,
  addBill,
  updateMap,
  postTask,
  getTask,
  cancelTask,
  getSensorLog,
} from "./api.js";
import { mainCrud, billCrud, taskCrud } from "./data.js";
import { webSocket } from "@/config/index.js";
export default {
  name: "",
  data() {
    return {
      wloading: false,
      list: [],
      history: null,
      Proportion: 50,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      page2: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      billOp: billCrud(this),
      crudOp: mainCrud(this),
      crud: [],
      loading: false,
      detail: {},
      drawer: true,
      drawerTle: "",
      active: 0,
      input1: "",
      form: {
        // type: 1,
      },
      menuType: [
        {
          label: "出库",
          value: 1,
        },
        {
          label: "入库",
          value: 2,
        },
        {
          label: "移货",
          value: 3,
        },
      ],
      options: [
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
      ],
      check3: false,
      check2: false,
      storageList: [],
      goods: [],
      taskOp: taskCrud(this),
      task: [],
      tabs: "zj",
      startList: [],
      endList: [],
      rk: [],
      sSwicth: false,
      eSwicth: false,
      areaList: [],
      drsocket: null,
      menuIcon: "",
    };
  },
  mounted() {
    this.getData();
    webSocket.setDriving(this);
    let _this = this;
    this.drsocket.onmessage = function (e) {
      _this.onmessage(JSON.parse(e.data));
    };
  },
  methods: {
    getData() {
      this.wloading = true;
      this.form = {};
      this.active = 0;
      this.goods = [];
      this.list = [];
      getZone({ areaId: "layer4" }).then((res) => {
        this.areaList = res.data;
        this.areaList.forEach((item) => {
          item.value = item.zoneCode;
          item.label = item.zoneName;
        });
      });
      getSensor().then((sen) => {
        get().then((res) => {
          res.data.forEach((item) => {
            if (item.nodeType == 3) {
              //出入口
              if (item.functionType == 1) {
                //出口
                this.endList.push(item.nodeId);
              } else {
                // 入口
                this.startList.push(item.nodeId);
              }
            }
            for (let i = 0; i < sen.data.length; i++) {
              if (sen.data[i].installPoint == item.nodeId) {
                for (let j = 0; j < this.areaList.length; j++) {
                  if (sen.data[i].zoneId == this.areaList[j].zoneId) {
                    // 位置
                    this.list.push({
                      x: item.mapX - 1,
                      y: 5 - item.mapY - 1,
                      code: item.matrixCode,
                      width: this.Proportion * 0.8,
                      height: this.Proportion * 0.8,
                      border: false,
                      selected: false,
                      color: "#ccc",
                      ...item,
                      value: item.nodeId,
                      label:
                        item.nodeType == 3 ? item.localNo : item.matrixCode,
                      sensorName: sen.data[i].sensorName,
                      sensorId: sen.data[i].sensorId,
                      zoneId: sen.data[i].zoneId,
                      zoneName: this.areaList[j].zoneName,
                      lastStoreCode: item.lastStoreCode,
                    });
                    break;
                  }
                }
              }
            }
          });
          // this.list.sort((a, b) => {
          //   return a.mapY > b.mapY ? 1 : -1;
          // });
          // this.list.sort((a, b) => {
          //   return a.mapX > b.mapX ? 1 : -1;
          // });

          this.init();
        });
      });

      getStorage({
        carriageType: "wet",
        storageState: 1, // 只获取空的载具
        useState: 1, // 正常
      }).then((res) => {
        res.data.forEach((item) => {
          item.label = item.storageCode;
          item.value = item.rfid;
        });
        this.storageList = res.data;
        setTimeout(() => {
          this.wloading = false;
        }, 200);
      });
    },
    initTask() {
      getTask(
        Object.assign({
          rows: this.page2.pageSize,
          page: this.page2.currentPage,
          // start: this.page2.pageSize * (this.page2.currentPage - 1) + 1,
        })
      ).then((res) => {
        this.detail = {};
        this.task = res.data.records;
        this.task.forEach((item, index) => {
          item.index = index + 1;
          item.carrierCode = "";
          item.taskdetails.forEach((detail, i) => {
            if (i == item.taskdetails.length - 1) {
              item.carrierCode += detail.carrierCode;
            } else {
              item.carrierCode += detail.carrierCode + ",";
            }
          });
        });
        if (this.task.length > 0) {
          this.$refs.task.setCurrentRow(this.task[0]);
        }
        // let index = 1;
        // res.data.records.forEach((item) => {

        // });
        this.page2.total = res.data.total;
        // this.task.forEach((item, i) => {
        //   item.index = i + 1;
        // });
      });
    },
    init() {
      var canvas = document.getElementById("main");
      if (!canvas.getContext) return;
      var ctx = canvas.getContext("2d");
      var CANVAS_WIDTH = 33 * this.Proportion;
      var CANVAS_HEIGHT = 5 * this.Proportion;
      canvas.setAttribute("width", CANVAS_WIDTH);
      canvas.setAttribute("height", CANVAS_HEIGHT);
      // canvas.onmousedown = this.canvasClick();
      var GRID_WIDTH = this.Proportion;
      var GRID_HEIGHT = this.Proportion;
      this.drawGrid(CANVAS_WIDTH, CANVAS_HEIGHT, GRID_WIDTH, GRID_HEIGHT);
      this.list.forEach((item) => {
        if (item.selected) {
          ctx.fillStyle = "#2F2F4F";
        } else if (item.nodeUsed) {
          ctx.fillStyle = "#409EFF";
        } else if (item.nodeType == "3") {
          ctx.fillStyle = "#F56C6C";
        } else {
          ctx.fillStyle = `#ccc`;
        }

        ctx.fillRect(
          (item.x + 1) * this.Proportion + this.Proportion * 1.15,
          item.y * this.Proportion + this.Proportion * 0.15,
          this.Proportion * 0.7,
          this.Proportion * 0.7
        );
        if (item.localNo) {
          ctx.fillStyle = "#fff";
          var fontSize = this.Proportion / 3.5;
          var font = fontSize + "px arial";
          ctx.font = font;
          ctx.fillText(
            item.localNo,
            (item.x + 2.18) * this.Proportion,
            (item.y == 0 ? 0.6 : item.y + 0.6) * this.Proportion
          ); //绘制横坐标
        }
      });
      canvas.addEventListener("click", this.mouseclick, {
        passive: false,
      });
      // canvas.addEventListener("DOMMouseScroll ", this.onmousewheels, false);
      var content = document.getElementById("content");
      content.addEventListener("mousewheel", this.onmousewheels, {
        passive: false,
      });
      // canvas.onmousewheel = this.onmousewheels;
      canvas.onmousedown = function (e) {
        let box = document.getElementById("content");
        let startX = e.offsetX;
        let startY = e.offsetY;
        document.onmousemove = function (e1) {
          let offsetX = e1.offsetX - startX;
          let offsetY = e1.offsetY - startY;
          // PS: 需要注意的是当鼠标向上移动时, 滚动条应该向下移动, 所以这里都是减去的移动距离
          box.scrollTop = box.scrollTop - offsetY;
          box.scrollLeft = box.scrollLeft - offsetX;
        };
        canvas.onmouseup = function () {
          document.onmousemove = null;
        };
        canvas.onmouseout = function () {
          document.onmousemove = null;
        };
      };
    },
    onmessage(data) {
      console.log("websocket返回的数据:", data);
      // 通过返回的logid 查找日志信息
      getSensorLog({ logId: data.logId }).then((res) => {
        let vehicle = res.data[0].carrierRfid; // 载具编号
        let logTime = res.data[0].logTime; // 日志时间
        //生成日志信息,通过 logTime 判断是否存在记录，避免多个客户端生成重复记录
        getLog({ useTime: logTime, rows: 10, page: 1 }).then((log) => {
          if (!log.data.records.length) {
            // 不存在记录，新增载具日志信息
            addLog({
              whsCarriageStorageFk: vehicle,
              useTime: logTime,
              businessType: 5,
              // businessId: this.form.bleadyeJobId,
              mapNodeId: data.nodeId,
            });
            updateStorage({
              carriageStorageId: vehicle,
              storageState: data.nodeUsed == "1" ? 2 : 1,
            }).then((res) => {});
            data.lastStoreCode = vehicle;
            updateMap(data).then((res) => {
              this.getData();
              this.initTask();
            });
          }
        });
      });

      //
    },
    cancelTask() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.detail.taskState == 99) {
            this.$tip.warning("该任务已完成,不可删除!");
            return;
          }
          this.$tip
            .cofirm("是否确定取消选中的任务?", this, {})
            .then(() => {
              this.wloading = true;
              cancelTask(this.detail.taskId).then((res) => {
                if (res.data.code == 200) {
                  this.$tip.success("取消成功!");
                  this.initTask();
                } else {
                  this.$tip.error("取消失败!");
                }
                setTimeout(() => {
                  this.wloading = false;
                }, 200);
              });
            })
            .catch((err) => {
              // this.$tip.warning(this.$t("public.qxcz"));
            });
        }, 200);
      });
    },
    save() {
      if (!this.form.start) {
        this.$tip.error("请选择起点!");
        return;
      }
      if (!this.form.end) {
        this.$tip.error("请选择终点!");
        return;
      }
      if (this.form.type == 1) {
        // 入库
        if (!this.form.vatNo) {
          this.$tip.error("请输入或扫描缸号!");
          return;
        }
        if (!this.form.vehicle.length) {
          this.$tip.error("请选择载具!");
          return;
        }
      }
      // // this.wloading = true;
      // this.task.push({
      //   // taskType: this.form.type,
      //   taskState: 1,
      //   storage: this.form.vehicle.toString(),
      //   start: this.form.start,
      //   end: this.form.end,
      //   index: this.task.length + 1,
      // }); // 添加任务
      this.sendTask();
    },
    sendTask() {
      // this.wloading = true;
      let taskdetails = [];
      this.form.vehicle.forEach((item) => {
        taskdetails.push({
          carrierCode: item,
          carrierRfid: item,
          anchorLocal: "",
          carrierState: 0,
          dispatchTaskFk: null,
          endTime: null,
          startTime: null,
          taskDetailId: null,
          updateTime: null,
        });
      });
      let ex = [
        {
          receiveTime: null,
          sendTime: null,
          taskEnd: this.form.end,
          taskId: null,
          taskStart: this.form.start,
          // taskState: 0,
          taskType: "carry",
          taskdetails,
          workpackageCode: this.form.vatNo,
        },
      ];
      // console.log(this.form);
      postTask(ex).then((res) => {
        // if (this.form.type == 1) {
        //   // 起点为出入口
        // }else{
        //   // 起点为暂存区
        // }
        if (res.data.CODE == "200") {
          this.$tip.success("发送成功!");
          this.initTask();
        } else {
          this.$tip.error("发送失败!");
        }
        setTimeout(() => {
          this.wloading = false;
        }, 200);
        // this.form.vehicle.forEach((item) => {

        // });
      });
    },
    onSubmit() {
      // 查询缸号信息
      getBleadyeJob({ vatNo: this.form.vatNo }).then((res) => {
        if (res.data.length) {
          this.form.bleadyeJobId = res.data[0].bleadyeJobId;
          this.form.vatNo = res.data[0].vatNo;
          if (this.active == 2) {
            this.active++;
          }
          this.$tip.success("查询成功!");
        } else {
          this.form.bleadyeJobId = "";
          this.form.vatNo = "";
          this.$tip.warning("暂无此缸号数据!");
        }
      });
    },
    cellClick(val) {
      this.detail = val;
      this.detail.list = [];
      // getBill({ whsCarriageStorageLogFk: val.storageLogId }).then((res) => {
      //   res.data.forEach((item, i) => {
      //     item.index = i + 1;
      //     this.detail.list.push(item);
      //   });
      // });
    },
    handleClick() {
      // this.drawerTle = val == "1" ? "入库" : val == "2" ? "出库" : "移动";
      let dom = document.getElementById("proCanvas");
      dom.style.width = "76%";
      dom.style.margin = "0";
      this.drawer = !this.drawer;
    },
    startChange(val) {
      // console.log(val);
      if (val.indexOf("IN") != -1 || val.indexOf("OUT") != -1) {
        // 起点为入口，扫描载具，物品
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
      if (this.active == 0) {
        this.active++;
      }
      this.$set(this.form, "vehicle", []);
      this.$set(this.form, "vatNo", "");
      // this.form.vehicle = [];
      // this.form.vatNo = "";
    },
    endChange(val) {
      if (this.active == 1) {
        this.active++;
      } else {
        this.active = 2;
      }
    },
    vehicleChange(val) {
      if (this.active == 3) {
        this.active++;
      }
    },
    mouseclick(e) {
      let box = document.getElementById("main");
      const maxH = box.clientHeight;
      const maxW = box.clientWidth;
      // 取得画布上被单击的点
      var clickX = Number(e.offsetX);
      var clickY = Number(e.offsetY);
      for (let i = 0; i < this.list.length; i++) {
        let data = this.list[i];
        if (
          (data.x + 2.15) * this.Proportion <= clickX &&
          clickX <= (data.x + 3) * this.Proportion &&
          (data.y + 0.15) * this.Proportion <= clickY &&
          clickY <= (data.y + 1) * this.Proportion
        ) {
          // if (this.check3 && this.drawer) {
          //   if (this.form.type == 2 || this.form.type == 3) {
          //     if (this.list[i].nodeUsed) {
          //       this.$tip.error("该坐标已存在载具,请重新选择!");
          //       return;
          //     }
          //     // if (this.list[i].nodeType != "2") {
          //     //   this.$tip.error("不能把出入口设为终点,请重新选择!");
          //     //   return;
          //     // }
          //     if (this.form.entrance == this.list[i].nodeId) {
          //       this.$tip.error("入口不能和终点一样,请重新选择!");
          //       return;
          //     }
          //     // 从地图选择坐标
          //     this.$set(this.form, "map2", this.list[i].nodeId);
          //     if (this.active == 2 || this.active == 3) {
          //       this.active++;
          //     }
          //     this.check3 = false;
          //   }
          //   if (this.form.type == 1) {
          //     if (!this.list[i].nodeUsed) {
          //       this.$tip.error("该坐标不存在载具,请重新选择!");
          //       return;
          //     }
          //     // 从地图选择坐标
          //     this.$set(this.form, "map2", this.list[i].nodeId);
          //     if (this.active == 2) {
          //       this.active++;
          //     }
          //     this.check3 = false;
          //   }
          // }
          // if (this.check2 && this.drawer && this.form.type == 3) {
          //   if (!this.list[i].nodeUsed) {
          //     this.$tip.error("该坐标不存在载具,请重新选择!");
          //     return;
          //   }
          //   if (this.list[i].nodeType != "2") {
          //     this.$tip.error("不能把出入口设为起点,请重新选择!");
          //     return;
          //   }
          //   // 从地图选择坐标
          //   this.$set(this.form, "map1", this.list[i].nodeId);
          //   if (this.active == 1) {
          //     this.active++;
          //   }
          //   this.check2 = false;
          // }

          // if (this.list[i].nodeType != "2") {
          //   return;
          // }

          if (this.sSwicth && this.drawer) {
            if (this.list[i].zoneId == this.form.end) {
              this.$tip.error("起点和终点不能相同,请重新选择!");
              return;
            }
            if (
              this.list[i].nodeUsed == 0 &&
              this.list[i].zoneId.indexOf("IN") == -1 &&
              this.list[i].zoneId.indexOf("OUT") == -1
            ) {
              this.$tip.error("该坐标不存在物品,请重新选择!");
              return;
            }
            // if (this.list[i].functionType == 1) {
            //   this.$tip.error("不能把出口设为起点,请重新选择!");
            //   return;
            // } else if (
            //   this.list[i].nodeUsed == 0 &&
            //   this.list[i].functionType != 2
            // ) {
            //   this.$tip.error("不能把空位置设为起点,请重新选择!");
            //   return;
            // }
            if (this.active == 0) {
              this.active++;
            } else {
              this.active = 1;
            }
            this.$set(this.form, "start", this.list[i].zoneId);
            this.startChange(this.list[i].zoneId);
          }
          if (this.eSwicth && this.drawer) {
            if (this.list[i].zoneId == this.form.start) {
              this.$tip.error("起点和终点不能相同,请重新选择!");
              return;
            }
            if (this.active == 1) {
              this.active++;
            } else {
              this.active = 2;
            }
            this.$set(this.form, "end", this.list[i].zoneId);
            this.endChange(this.list[i].nodeId);
          }
          if (this.history) {
            this.history.selected = false;
          }
          this.list[i].selected = true;
          this.history = this.list[i];
          this.init();
          if (this.history.nodeType == 3) {
            return;
          }
          getLog({
            mapNodeId: this.history.nodeId,
            rows: this.page.pageSize,
            page: this.page.currentPage,
          }).then((res) => {
            this.crud = res.data.records;
            this.page.total = res.data.total;
            this.crud.forEach((item, i) => {
              item.index = i + 1;
            });
            this.crud.sort((a, b) => {
              return a.useTime > b.useTime;
            });

            if (this.crud.length > 0) {
              this.$refs.crud.setCurrentRow(this.crud[0]);
            } else {
              this.detail = {};
            }
            this.drawToolTip(
              `坐标:${this.history.code}`,
              clickX + 200 > maxW ? clickX - 260 : clickX,
              clickY + 70 > maxH ? clickY : clickY + 40
            );
            this.drawToolTip(
              `区域:${this.history.zoneName}`,
              clickX + 200 > maxW ? clickX - 260 : clickX,
              clickY + 70 > maxH ? clickY - 30 : clickY + 10
            );
            if (this.history.nodeUsed == 1 && this.history.lastStoreCode) {
              this.$nextTick(() => {
                this.drawToolTip(
                  `载具:${this.history.lastStoreCode}`,
                  clickX + 200 > maxW ? clickX - 260 : clickX,
                  clickY + 70 > maxH ? clickY + 30 : clickY + 70
                );
                if (this.sSwicth && this.drawer) {
                  // this.form.vatNo = this.crud[0].$businessId;
                  this.form.vehicle = [];
                  this.form.vehicle.push(this.history.lastStoreCode);
                }
                this.sSwicth = false;
                this.eSwicth = false;
              });
            } else {
              this.sSwicth = false;
              this.eSwicth = false;
            }
          });

          return;
        }
      }
    },
    onmousewheels(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      } //禁止默认事件
      if (e.wheelDelta > 0) {
        if (this.Proportion < 100) {
          this.Proportion += 10;
        }
      } else {
        if (this.Proportion > 40) {
          this.Proportion -= 10;
        }
      }
      this.init();
    },
    drawToolTip(txtLoc, x, y) {
      var canvas = document.getElementById("main");
      var context = canvas.getContext("2d");
      context.save();
      var padding = 5;
      var font = "20px arial";
      context.font = font;
      context.textBaseline = "bottom";
      context.textBaseline = "center"; //文本基线是 em 方框的正中。
      context.fillStyle = "yellow";
      //绘制ToolTip背景
      var width = 200;
      var height = 25;
      // console.log(height);
      context.fillRect(
        x + 25,
        y - height,
        width + padding * 2,
        height + padding * 2
      );
      //绘制ToolTip文字
      context.fillStyle = "#000";
      context.fillText(txtLoc, x + padding + 25, y + padding, 200);
      context.restore();
    },
    //绘制网格
    drawGrid(CANVAS_WIDTH, CANVAS_HEIGHT, GRID_WIDTH, GRID_HEIGHT) {
      var rows = parseInt(CANVAS_WIDTH / GRID_WIDTH);
      var cols = parseInt(CANVAS_HEIGHT / GRID_HEIGHT);
      for (var i = 0; i < rows + 1; ++i) {
        for (var j = 0; j < cols + 1; ++j) {
          this.drawRect(i, j, GRID_WIDTH, GRID_HEIGHT);
          if (i == 0 || j == 0) {
            this.drawText(i, j + 1, GRID_WIDTH, GRID_HEIGHT); //增加坐标
          }
        }
      }
    },
    //绘制横坐标与纵坐标
    drawText(i, j, GRID_WIDTH, GRID_HEIGHT) {
      // if (i == j) {
      //   return;
      // }
      var drawing = document.getElementById("main");
      if (!drawing.getContext) return false;
      var context = drawing.getContext("2d");
      context.font = "normal 16px Arial";
      context.textAlign = "start";
      var x_axis = i + "";
      var y_axis = 5 - j + "";
      // console.log(x_axis, y_axis);
      if (x_axis == "0" && y_axis == "0") {
        return;
      }
      context.fillText(
        x_axis,
        (i + 1) * this.Proportion + 20,
        5 * this.Proportion - 18
      ); //绘制横坐标
      context.fillText(y_axis, 5, (j - 1) * this.Proportion + 30); //绘制纵坐标
    },
    //绘制边框
    drawRect(i, j, GRID_WIDTH, GRID_HEIGHT) {
      var drawing = document.getElementById("main");
      if (!drawing.getContext) return false;
      var context = drawing.getContext("2d");
      context.lineWidth = 1;
      context.strokeStyle = "lightgrey";
      context.strokeRect(
        i * this.Proportion,
        j * this.Proportion,
        GRID_WIDTH,
        GRID_HEIGHT
      );
    },
    drawerCloseBefore() {
      let dom = document.getElementById("proCanvas");
      dom.style.width = "100%";
      dom.style.margin = "0";
    },
  },
};
</script>
<style lang='stylus'>
#driving {
}

#proCanvas {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  width: 76%;

  .el-table__fixed-body-wrapper {
    top: 36px !important;
    height: calc(100vh - 550px) !important;
  }

  .el-popover {
    border: none !important;
  }

  .el-tag {
    font-size: 14px;
  }

  .el-drawer__header {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 18px;
  }

  .el-step__description {
    font-size: 16px;
    line-height: 30px;
  }

  .el-drawer {
    box-shadow: 1px 2px 5px #000 !important;
  }

  .el-drawer__wrapper {
    position: fixed;
    height: calc(100vh - 55px);
    width: 20% !important;
    top: 0 !important;
    right: 0 !important;
    left: initial !important;
    overflow: auto !important;
  }

  .el-drawer__body {
    height: calc(100vh - 55px);
    border-bottom: 1px solid #ccc;
    overflow: auto;
  }

  .el-dropdown-menu--mini .el-dropdown-menu__item {
    line-height: 40px;
    padding: 0 10px;
    font-size: 20px;
    border: 1px solid #eee;
  }

  .el-input {
    width: auto;
  }

  .suspension_btn {
    position: fixed;
    bottom: 50%;
    height: 50px;
    width: 50px;
    right: 2px;
    z-index: 9999;
    cursor: pointer;
    font-size: 26px;

    .el-dropdown {
      color: #fff;
      font-size: 17px;
      height: 50px;
      line-height: 50px;
      width: 50px;
      background: #409eff;
      border-radius: 50%;
      box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 20%);
    }
  }

  #main {
    background: #fff;
    margin: 10px;
    display: block;
    cursor: pointer;

    // border-top: 1px solid #ccc;
    // border-bottom: 1px solid #ccc;
    ::-webkit-scrollbar {
      width: 0 !important;
    }
  }

  #content {
    width: 100%;
    height: 300px;
    overflow: auto;
    margin: 0;
    border: 1px solid #ccc;
  }
}
</style>
