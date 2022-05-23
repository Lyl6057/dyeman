<!--
 * @Author: Lyl
 * @Date: 2022-04-25 14:03:51
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-23 07:54:59
 * @FilePath: \iot.vue\src\view\im\transferLoadQa\index.vue
 * @Description: 
-->
<template>
  <div class="transferLoad">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane label="手动验布出库" name="manual">
        <el-row class="btnList">
          <el-button type="primary" @click="query">{{this.$t("public.query")}}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
        </el-row>
        <div class="crudBox">
          <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" :element-loading-text="$t('public.loading')" v-loading="wloading" @cell-click="cellClick" @on-load="query">
            <template slot-scope="scope" slot="menu">
              <el-popover placement="left" width="160" trigger="click">
                <p>请选择验布口</p>
                <el-select v-model="exit" placeholder="请选择验布口">
                  <el-option v-for="item in outExit" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div style="text-align: left; margin-top: 10px">
                  <el-button type="primary" size="mini" @click="handleOutWhse(scope)">提交</el-button>
                </div>
                <el-button type="text" icon="el-icon-view" size="mini" slot="reference">验布</el-button>
              </el-popover>
              <el-popover placement="left" width="160" trigger="click">
                <p>请选择入库口</p>
                <el-select v-model="exit" placeholder="请选择入库口">
                  <el-option v-for="item in outExit" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div style="text-align: left; margin-top: 10px">
                  <el-button type="primary" size="mini" @click="handleInWhse(scope)">提交</el-button>
                </div>
                <el-button type="text" icon="el-icon-refresh-right" size="mini" slot="reference">回仓</el-button>
              </el-popover>
            </template>
          </avue-crud>
        </div>
      </el-tab-pane>
      <el-tab-pane label="QA验布计划看板" name="plan">
        <qc-plan></qc-plan>
      </el-tab-pane>
      <el-tab-pane label="任务管理" name="task">
        <el-row class="btnList">
          <el-button type="primary" @click="queryTask">{{this.$t("public.query")}}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="taskFormOp" v-model="taskForm">
          </avue-form>
        </el-row>
        <view-container title="任务信息">
          <el-row class="crudBox" style="margin-top: 5px">
            <avue-crud ref="task" :option="taskCrudOp" :page.sync="taskpage" :data="task" :element-loading-text="$t('public.loading')" v-loading="wloading" @on-load="queryTask" @current-row-change="cellClick"></avue-crud>
          </el-row>
        </view-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { formOp, crudOp, outExit, taskForm, taskCrud } from "./data";
import { fetchStockVehicleByPage, sendTask, getTask } from "./api";
import qcPlan from "./qcPlan";
export default {
  components: {
    qcPlan,
  },
  props: {},
  data() {
    return {
      wloading: false,
      crudOp: crudOp(this),
      crud: [],
      formOp: formOp(this),
      form: {
        type: 1,
      },
      page: {
        pageSizes: [10, 50, 100, 200, 500],
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      taskpage: {
        pageSizes: [10, 50, 100, 200, 500],
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      exit: "Q1",
      outExit,
      visible: true,
      detail: {},
      taskFormOp: taskForm(this),
      taskForm: {},
      taskCrudOp: taskCrud(this),
      task: [],
      tabs: "manual",
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    query() {
      this.wloading = true;
      this.crud = [];
      let query = JSON.parse(JSON.stringify(this.form));
      query.palletCode = "!^%" + (query.palletCode || "");
      query.vatNo = "%" + (query.vatNo || "");
      query.storageId = "%" + (query.storageId || "");
      fetchStockVehicleByPage(
        Object.assign(query, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.page.total = res.data.total;
        this.crud = res.data.records;
        this.crud.length === 0 && (this.wloading = false);
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          if (this.crud.length - 1 === i) {
            setTimeout(() => {
              this.wloading = false;
            }, 200);
          }
        });
      });
    },
    queryTask() {
      this.wloading = true;
      this.taskForm.barCode = this.taskForm.barCode
        ? (this.taskForm.barCode = "%" + this.taskForm.barCode)
        : "";
      this.taskForm.orderId = "!^";
      getTask(
        Object.assign(this.taskForm, {
          rows: this.taskpage.pageSize,
          start: this.taskpage.currentPage,
          page: this.taskpage.currentPage,
        })
      )
        .then((res) => {
          this.task = res.data.records;
          this.taskpage.total = res.data.total;
          if (this.task.length) {
            this.$refs.task.setCurrentRow(this.task[0]);
          }
          if (
            this.taskForm.barCode &&
            this.taskForm.barCode.indexOf("%") != -1
          ) {
            this.taskForm.barCode = this.taskForm.barCode.split("%")[1];
          }
        })
        .finally((res) => {
          setTimeout(() => {
            this.wloading = false;
          }, 200);
        });
    },
    cellClick(val) {
      this.detail = val;
    },
    handleOutWhse({ row }) {
      if (!row) {
        this.$tip.error("请先选择要出库的载具!");
        return;
      }
      if (!this.exit) {
        this.$tip.error("请先选择验布出口");
        return;
      }
      this.wloading = true;
      let taskParams = {
        barCode: row.palletCode, // 载具
        entrance: this.exit, // 验布出口
        isEmpty: 0,
        type: 2, //0原材料,1五金件,2成品
        orderType: 5, // 3 => 验布出库， 4 => 验布入库
      };
      alert("请求参数" + JSON.stringify(taskParams));
      console.info("sendParams", taskParams);
      sendTask(taskParams)
        .then((res) => {
          if (res.status === 200) {
            this.$tip.success("提交成功!");
          } else {
            this.$tip.error(res.msg);
          }
        })
        .finally((res) => {
          this.wloading = false;
        });
    },
    handleInWhse({ row }) {
      if (!row) {
        this.$tip.error("请先选择要出库的载具!");
        return;
      }
      if (!this.exit) {
        this.$tip.error("请先选择验布出口");
        return;
      }
      this.wloading = true;
      let taskParams = {
        barCode: row.palletCode, // 载具
        entrance: this.exit, // 验布出口
        isEmpty: false,
        type: 2, //0原材料,1五金件,2成品
        orderType: 3, // 3 => 验布出库， 4 => 验布入库
      };
      alert("请求参数" + JSON.stringify(taskParams));
      console.info("sendParams", taskParams);
      sendTask()
        .then((res) => {
          if (res.status === 200) {
            this.$tip.success("提交成功!");
          } else {
            this.$tip.error(res.msg);
          }
        })
        .finally(() => {
          this.wloading = false;
        });
    },
  },
};
</script>
<style lang="stylus" scoped>
>>>.el-tag--mini {
  display: none !important;
}

.transferLoad {
  >>>.el-table__fixed-right {
    z-index: 99;
  }

  >>>.el-icon-view {
    font-size: 16px;
  }
}
</style>