<!--
 * @Author: Lyl
 * @Date: 2021-04-23 08:32:22
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-27 14:37:33
 * @Description: 
-->
<template>
  <div
    id="prowovenOutput"
    v-loading="loading"
    :element-loading-text="$t('public.loading')"
  >
    <view-container title="生产进度统计">
      <div class="btnList">
        <el-button type="success" @click="save">{{
          $t("public.save")
        }}</el-button>
        <el-button
          type="danger"
          @click="del"
          :disabled="Object.keys(chooseData).length == 0"
          >{{ $t("public.del") }}</el-button
        >
        <el-button type="primary" @click="query">{{
          $t("public.query")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox">
        <el-row>
          <el-col :span="24">
            <avue-crud
              ref="crud"
              :option="crudOp"
              :data="crud"
              @current-row-change="cellClick"
              :page.sync="page"
              @on-load="query"
            ></avue-crud
          ></el-col>
          <!-- <el-col :span="10">
            <avue-crud
              ref="crud"
              :option="crudOp1"
              :data="crud"
              :page.sync="page"
              @on-load="query"
            ></avue-crud>
          </el-col> -->
        </el-row>
      </div>
    </view-container>
    <el-tabs v-model="tab" type="border-card">
      <el-tab-pane label="产量统计" name="zzt" class="graphical1">
        <v-gantt-chart
          :startTime="startTime"
          :endTime="endTime"
          :datas="datas"
          :titleHeight="35"
          :cellHeight="40"
          :cellWidth="30"
          :scale="720"
          v-if="datas.length > 0"
        >
          <template v-slot:block="{ data }">
            <div
              class="gantBox"
              :class="data.shedule >= 100 ? 'finished' : 'unfinished'"
            >
              <el-popover
                placement="top-start"
                :title="data.name"
                width="200"
                trigger="click"
                :content="
                  '订单数量 ' +
                  data.num +
                  ', 完成 ' +
                  data.fnum +
                  ', ' +
                  data.shedule +
                  '%'
                "
              >
                <div slot="reference">{{ data.shedule + "%" }}</div>
              </el-popover>

              <!-- <span class="ganttLabel"
                >订单数量:{{ data.num }} 完成 {{ data.fnum }}</span -->
              <!-- > -->
            </div>
          </template>
          <template v-slot:left="{ data }">
            <!-- <div v-for="items of item" :key="items.index" style="color: #000"> -->
            <div>{{ data.name }}</div>

            <!-- </div> -->
          </template>
          <template v-slot:title>
            <!-- 你的表头组件 -->
            <div style="displa: flex">订单-颜色</div>
          </template>
        </v-gantt-chart>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      id="colorMng_Dlg"
      :visible.sync="dialogVisible"
      fullscreen
      width="100%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="dialogVisible"
    >
      <po-no @close="dialogVisible = false" @check="check"> </po-no>
    </el-dialog>
  </div>
</template>
<script>
import { timeConversion } from "@/config/util";
import { mainForm, mainCrud, mainCrud1 } from "./data";
import { get, add, del, update, getPoDtla, getPoColor } from "./api";
export default {
  name: "prowovenOutput",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      crudOp1: mainCrud1(this),
      crud1: [],
      loading: false,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      chooseData: {},
      oldData: {},
      dialogVisible: false,
      tab: "zzt",
      startTime: "2021-04-23 00:00:00", //时间轴开始时间
      endTime: "2021-05-26 00:00:00", //时间结束时间
      datas: [],
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      this.crudOp.column[4].hide = false;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      this.form.gatherDate
        ? (this.form.gatherDate = this.form.gatherDate + " 00:00:00")
        : "";
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      )
        .then((res) => {
          let resData = res.data;
          this.crud = resData.records;
          this.crud.sort((a, b) => {
            return Date.parse(a.gatherDate) - Date.parse(b.gatherDate);
          });
          this.page.total = resData.total;
          this.crud.forEach((item, i) => {
            item.custId = item.salPoFk;
            item.custContNo = item.salPoFk;
            item.poType = item.salPoFk;
            item.poDate = item.salPoFk;
            item.fabId = item.salPoDtlaFk;
            item.fabName = item.salPoDtlaFk;
            item.colorName = item.salPoColorFk;
            item.colorQty = item.salPoColorFk;
            item.realOutPut = item.realOutPut.toFixed(2);
            item.$cellEdit = true;
            item.index = i + 1;
          });
          setTimeout(() => {
            this.$nextTick(() => {
              this.crud.forEach((item, i) => {
                // item.custName = item.$custId;
                this.$set(item, "custName", item.$custId);
                // this.$set(item, "$poDate", item.$poDate.split(" ")[0]);
                // this.crudOp.column[4].hide = true;
                if (i == 0) {
                  this.startTime = item.$poDate;
                  this.endTime = item.gatherDate;
                } else if (this.startTime.valueOf() > item.$poDate.valueOf()) {
                  this.startTime = item.$poDate;
                } else if (this.endTime.valueOf() < item.gatherDate.valueOf()) {
                  this.endTime = item.gatherDate;
                }
                if (i == this.crud.length - 1) {
                  this.setEchats();
                }
              });
              if (this.crud.length == 0) {
                this.loading = false;
              }
            });
          }, 200);
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    setEchats() {
      this.endTime =
        timeConversion(
          new Date(this.endTime).valueOf() + 1000 * 24 * 60 * 60
        ).split(" ")[0] + " 23:59:59";
      this.startTime =
        timeConversion(
          new Date(this.startTime).valueOf() - 1000 * 24 * 60 * 60
        ).split(" ")[0] + " 00:00:00";
      this.datas = [];
      // this.crud = this.crud.concat(this.crud);
      this.crud.forEach((item, i) => {
        this.datas.push({
          name: item.poNo + "-" + item.$colorName,
          num: item.$colorQty,
          fnum: item.realOutPut,
          shedule: (
            (Number(item.realOutPut) / Number(item.$colorQty)) *
            100
          ).toFixed(2),
          gtArray: [
            //默认的需要渲染的数组
            {
              name: item.poNo, //非必须
              start: item.$poDate,
              end: item.gatherDate.split(" ")[0] + " 23:59:59",
            },
          ],
        });
      });
      this.loading = false;
    },
    cellClick(val) {
      // this.oldData.$cellEdit = false;
      // this.$set(val, "$cellEdit", true);
      // this.oldData = val;
      this.chooseData = val;
    },
    check(val) {
      // if (Object.keys(val).length > 0) {
      //   getPoDtla({ salPoFk: val.salPooid }).then((res) => {
      //     console.log(res);
      //     val.salPoDtlaoid = res.data.rows[0].salPoDtlaoid;
      //     getPoColor({ salPoDtlaFk: val.salPoDtlaoid }).then((color) => {
      //       console.log(color);
      //     });
      //   });
      //   // this.chooseData.
      // }
      // this.dialogVisible = false;
    },
    save() {
      for (let i = 0; i < this.crud.length; i++) {
        if (!this.crud[i].gatherDate || !this.crud[i].output) {
          this.$tip.error("日期和产量不能为空!");
          return;
        }
      }
      this.loading = true;
      try {
        this.crud.forEach((item, i) => {
          item.gatherDate = item.gatherDate + " 00:00:00";
          update(item).then((res) => {});
          if (i == this.crud.length - 1) {
            this.$tip.success("保存成功!");
            setTimeout(() => {
              this.query();
            }, 200);

            // this.loading = false;
          }
        });
      } catch (error) {
        this.$tip.error("保存失败!" + e);
        this.loading = false;
      }
    },
    del() {},
  },
  created() {},
  mounted() {
    this.query();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.el-popover {
  width: 230px !important;
}

#prowovenOutput {
  .gantBox {
    color: #5A565B;
    // background-color: rgb(191, 242, 254);
    margin-top: 7px;
    height: 25px;
    line-height: 25px;
    border-radius: 10px;
    cursor: pointer;
  }

  .ganttLabel {
    position: absolute;
    left: 101%;
    top: 7px;
    width: 200px;
    height: 25px;
    line-height: 25px;
    text-align: left;
  }

  .finished {
    background-color: #96EBAE;
  }

  .unfinished {
    background-color: #8EE8EE;
  }

  .el-table .cell {
    line-height: 29px !important;
  }

  .graphical1 {
    height: 320px;
  }

  // .gantt-blocks {
  // height: 100% !important;
  // }
  .gantt-container {
    width: 100% !important;
    // height: 325px !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #zzt {
  }

  .gantt-leftbar-item {
    color: #5A565B;
    font-size: 16px;
    line-height: 40px;
    height: 39px !important;
    border-bottom: 1px solid #eee;
  }

  .gantt-block-top-space {
    height: 0 !important;
  }
}
</style>