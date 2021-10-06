<!--
 * @Author: Lyl
 * @Date: 2021-10-05 14:00:53
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-06 19:03:14
 * @Description: 
-->
<template>
  <div id="proCanvas">
    <view-container
      title="标题"
      v-loading="wloading"
      element-loading-text="拼命加载中..."
    >
      <div id="content">
        <canvas id="main"></canvas>
      </div>
      <el-row>
        <el-col :span="16">
          <view-container title="载具日志表">
            <avue-crud
              ref="crud"
              id="crud"
              :option="crudOp"
              :data="crud"
              :page.sync="page"
              v-loading="loading"
              @current-row-change="cellClick"
            ></avue-crud>
          </view-container>
        </el-col>
        <el-col :span="8">
          <view-container title="载具物品清单">
            <avue-crud :option="billOp" :data="detail.list"></avue-crud>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import { get, getLog, getBill } from "./api.js";
import { mainCrud, billCrud } from "./data.js";
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
      billOp: billCrud(this),

      crudOp: mainCrud(this),
      crud: [],
      loading: false,
      detail: {},
    };
  },
  mounted() {
    get().then((res) => {
      res.data.forEach((item) => {
        this.list.push({
          x: item.mapX - 1,
          y: item.mapY - 1,
          code: item.matrixCode,
          width: this.Proportion * 0.8,
          height: this.Proportion * 0.8,
          border: false,
          selected: false,
          color: "#ccc",
          mapId: item.nodeId,
        });
      });
      this.init();
    });
  },
  methods: {
    init() {
      var canvas = document.getElementById("main");
      if (!canvas.getContext) return;
      var ctx = canvas.getContext("2d");
      var CANVAS_WIDTH = 32 * this.Proportion;
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
        } else {
          ctx.fillStyle = `#ccc`;
        }

        ctx.fillRect(
          item.x * this.Proportion + this.Proportion * 1.15,
          item.y * this.Proportion + this.Proportion * 1.15,
          this.Proportion * 0.7,
          this.Proportion * 0.7
        );
      });
      canvas.addEventListener("click", this.mousemove, {
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
        var w = e.clientX;
        var h = e.clientY;
        document.onmousemove = function (e1) {
          var l = w - e1.clientX;
          var t = h - e1.clientY;
          if (l > 0) {
            box.scrollLeft += 5;
          } else {
            box.scrollLeft -= 5;
          }
          if (t > 0) {
            box.scrollTop += 5;
          } else {
            box.scrollTop -= 5;
          }
        };
        canvas.onmouseup = function () {
          document.onmousemove = null;
        };
      };
    },
    cellClick(val) {
      this.detail = val;
      this.detail.list = [];
      getBill({ whsCarriageStorageLogFk: val.storageLogId }).then((res) => {
        res.data.forEach((item, i) => {
          item.index = i + 1;
          this.detail.list.push(item);
        });
      });
    },
    mousemove(e) {
      let box = document.getElementById("main");
      const maxH = box.clientHeight;
      const maxW = box.clientWidth;
      // 取得画布上被单击的点
      var clickX = Number(e.offsetX);
      var clickY = Number(e.offsetY);
      for (let i = 0; i < this.list.length; i++) {
        let data = this.list[i];
        if (
          (data.x + 1.15) * this.Proportion <= clickX &&
          clickX <= (data.x + 2) * this.Proportion &&
          (data.y + 1.15) * this.Proportion <= clickY &&
          clickY <= (data.y + 2) * this.Proportion
        ) {
          if (this.history) {
            this.history.selected = false;
          }
          this.list[i].selected = true;
          this.history = this.list[i];
          this.init();
          getLog({
            mapNodeId: this.history.mapId,
            rows: this.page.pageSize,
            page: this.page.currentPage,
          }).then((res) => {
            this.crud = res.data.records;
            this.page.total = res.data.total;
            this.crud.forEach((item, i) => {
              item.index = i + 1;
            });
            if (this.crud.length > 0) {
              this.$refs.crud.setCurrentRow(this.crud[0]);
            } else {
              this.detail = {};
            }
            this.drawToolTip(
              `坐标:${this.history.code}`,
              clickX + 150 > maxW ? clickX - 150 : clickX,
              clickY + 50 > maxH ? clickY - 40 : clickY
            );
            if (this.crud.length) {
              this.$nextTick(() => {
                this.drawToolTip(
                  `载具编号:${this.crud[0].$whsCarriageStorageFk}`,
                  clickX + 150 > maxW ? clickX - 150 : clickX,
                  clickY + 50 > maxH ? clickY - 10 : clickY + 30
                );
              });
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
          this.Proportion += 5;
        }
      } else {
        if (this.Proportion > 40) {
          this.Proportion -= 5;
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
      for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < cols; ++j) {
          this.drawRect(i, j, GRID_WIDTH, GRID_HEIGHT);
          if (i == 0 || j == 0) {
            this.drawText(i, j, GRID_WIDTH, GRID_HEIGHT); //增加坐标
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
      var y_axis = j + "";
      // console.log(x_axis, y_axis);
      if (x_axis == "0" && y_axis == "0") {
        return;
      }
      context.fillText(x_axis, i * this.Proportion + 20, 17); //绘制横坐标
      context.fillText(y_axis, 5, j * this.Proportion + 30); //绘制纵坐标
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
  },
};
</script>
<style lang='stylus'>
#proCanvas {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

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
    width: 99%;
    height: 300px;
    overflow: auto;
    margin: 5px auto;
    border: 1px solid #ccc;
  }
}
</style>
