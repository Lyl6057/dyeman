/* 
 * @例外时间表
 * Created by Lyl 
 * on 2019-8-21 19:34:39.
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
              style="margin-right:110px"
              s
            >查 询</el-button>
          </template>
        </avue-form>
      </el-col>
      <el-col :span="24">
        <avue-crud
          :data="gridData"
          :option="gridOption"
          :page="page"
          @row-save="addData"
          @row-update="update"
          @row-del="del"
        ></avue-crud>
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
        total: 0
      },
      gridData: [],
      data: [],
      gridOption: {
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "例外ID",
            prop: "exceptionId"
          },
          {
            label: "日历ID",
            prop: "calId"
          },
          {
            label: "例外日期",
            prop: "exceptionDate"
          }
        ]
      },
      form: {},
      formOption: {
        submitBtn: false,
        emptyBtn: false,
        label: "查询条件",
        card: false,
        labelWidth: 110,
        gutter: 100,
        column: [
          {
            label: "例外ID",
            prop: "exceptionId"
          },
          {
            label: "日历ID",
            prop: "calId"
          },
          {
            label: "例外日期",
            prop: "exceptionDate"
          }
        ]
      },
      header: {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9"
        }
      }
    };
  },
  methods: {
    //查询
    handleList() {
      this.$axios
        .post("/api/proExceptionDayList", this.form, this.header)
        .then(res => {
          console.log(res);
          this.gridData = res.data;
        });
    },
    //新增
    addData(row, done) {
      this.loading = true;
      const data = row;
      const sedheader = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      this.$axios.put("/api/proExceptionDay", data, sedheader).then(res => {
        console.log(res);
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
    //更新数据
    update(row, index, done, loading) {
      const sedheader = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      const data = row;
      this.$axios.post("/api/proExceptionDay", data, sedheader).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.handleList();
          this.$message.success("修改成功");
        } else {
          this.$message.warning("修改失败");
        }
      });
      done();
    },
    //删除
    del(row, index) {
      const data = row.exceptionId;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete("/api/proExceptionDay?exceptionId=" + data, this.header)
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success("删除成功");
                this.handleList();
              } else {
                this.$message.warning("删除失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>