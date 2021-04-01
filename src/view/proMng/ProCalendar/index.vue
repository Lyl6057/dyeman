/* 
 * @工作日历
 * Created by Lyl 
 * on 2019-8-21 19:06:10.
 */
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <avue-form :option="formOption" v-model="form">
          <template slot="menuForm">
            <el-button
              type="primary"
              size="small"
              @click="handleList"
              style="margin-right: 110px"
              >{{ $t("ProWorkflowInfo.query") }}</el-button
            >
          </template>
        </avue-form>
      </el-col>
      <el-col :span="24">
        <avue-crud
          ref="crud"
          :data="gridData"
          :option="gridOption"
          :page="page"
          @row-save="addData"
          @row-update="update"
          @row-del="del"
          @row-dblclick="rowClick"
        >
          <template slot-scope="scope" slot="menuForm">
            <el-button
              type="primary"
              icon="el-icon-check"
              size="mini"
              @click="addData2(scope.row, scope.index)"
              >保存并新增</el-button
            >
          </template>
        </avue-crud>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      gridData: [],
      data: [],
      gridOption: {
        align: "center",
        menuAlign: "center",
        menuWidth: 125, //最小值
        labelWidth: 110,
        dialogHeight: 200,
        addBtn: true,
        editBtn: false,
        refreshBtn: false, //刷新按钮
        columnBtn: false, //显隐按钮
        addRowBtn: false,
        cellBtn: true,
        rowKey: "calId",
        column: [
          {
            // 日历ID
            label: this.$t("ProWorkflowInfo.calendar"),
            prop: "calId",
            cell: false,
            hide: true,
            addDisplay: false,
          },
          {
            label: this.$t("ProWorkflowInfo.rlbc"),
            prop: "calName",
            cell: true,
          },
          {
            // 序号
            label: this.$t("ProWorkflowInfo.xh"),
            prop: "calNum",
            cell: true,
          },
          {
            // // 日历编号
            label: this.$t("ProWorkflowInfo.rlbh"),
            prop: "calCode",
            cell: true,
          },
          {
            // 上班时间
            label: this.$t("ProWorkflowInfo.sbsj"),
            prop: "startWorkTime",
            cell: true,
          },
          {
            // 下班时间
            label: this.$t("ProWorkflowInfo.xbsj"),
            prop: "endWorkTime",
            cell: true,
          },
          {
            // 工作效率
            label: this.$t("ProWorkflowInfo.gzxl"),
            prop: "repeatZone",
            cell: true,
          },
        ],
      },
      form: {},
      formOption: {
        submitBtn: false,
        emptyBtn: false,
        // 查询条件
        label: this.$t("ProWorkflowInfo.cxtj"),
        card: false,
        labelWidth: 110,
        gutter: 100,
        column: [
          {
            // 日历ID
            label: this.$t("ProWorkflowInfo.calendar"),
            prop: "calId",
          },
          {
            // 日历班次
            label: this.$t("ProWorkflowInfo.rlbc"),
            prop: "calName",
          },
          {
            // 序号
            label: this.$t("ProWorkflowInfo.xh"),
            prop: "calNum",
          },
          {
            // // 日历编号
            label: this.$t("ProWorkflowInfo.rlbh"),
            prop: "calCode",
          },
          {
            // 上班时间
            label: this.$t("ProWorkflowInfo.sbsj"),
            prop: "startWorkTime",
          },
          {
            // 下班时间
            label: this.$t("ProWorkflowInfo.xbsj"),
            prop: "endWorkTime",
          },
          {
            // 工作效率
            label: this.$t("ProWorkflowInfo.gzxl"),
            prop: "repeatZone",
          },
        ],
      },
      header: {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9",
        },
      },
    };
  },
  methods: {
    //查询
    handleList() {
      this.$axios
        .post("/api/proCalendarList", this.form, this.header)
        .then((res) => {
          this.gridData = res.data;
        });
    },
    //新增
    addData(row, done) {
      this.loading = true;
      const data = row;
      const sedheader = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      this.$axios.put("/api/proCalendar", data, sedheader).then((res) => {
        if (res.data.code == 0) {
          this.$message.success("新增成功");
          this.handleList();
        } else {
          this.$message.warning("新增失败");
        }
      });
      this.loading = false;
      done();
    },
    //保存新增
    addData2(row, index) {
      this.$refs.crud.rowSave();
      this.$refs.crud.rowAdd();
    },
    //更新数据
    update(row, index, done, loading) {
      const sedheader = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const data = row;
      this.$axios.post("/api/proCalendar", data, sedheader).then((res) => {
        if (res.data.code == 0) {
          this.handleList();
          this.$message.success("修改成功");
        } else {
          this.$message.warning("修改失败");
        }
      });
      done();
      loading();
    },
    //删除
    del(row, index) {
      const data = row.calId;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("/api/proCalendar?calId=" + data, this.header)
            .then((res) => {
              if (res.data.code == 0) {
                this.$message.success(this.$t("public.sccg"));
                this.handleList();
              } else {
                this.$message.warning(this.$t("public.scsb"));
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //双击编辑
    rowClick(row, column, cell, event) {
      this.$refs.crud.rowCell(row, row.$index);
    },
  },
  created() {
    this.handleList();
  },
};
</script>

<style>
</style>