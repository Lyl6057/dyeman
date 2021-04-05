/*
 * @Author: Lyl 
 * @Date: 2020-05-25 11:03:21 
 * @Last Modified by: Lyl
 * @Last Modified time: 2020-05-27 16:12:02
 */

<template>
  <div id="testItem">
    <el-row>
      <el-col :span="24" class="queryForm">
        <el-tabs type="border-card">
          <el-tab-pane label="检测项目基础定义">
            <div class="btnList">
              <el-button type="success" size="mini" @click="save">{{
                this.$t("public.save")
              }}</el-button>
              <el-button type="primary" size="mini" @click="addBtn">{{
                this.$t("public.add")
              }}</el-button>
              <el-button type="primary" size="mini" @click="handleList">{{
                this.$t("public.query")
              }}</el-button>

              <el-button type="primary" size="mini" @click="del">{{
                this.$t("public.del")
              }}</el-button>
            </div>
            <div>
              <avue-form :option="formOption" v-model="form"></avue-form>
            </div>

            <avue-crud
              ref="crud"
              :data="gridData"
              :option="gridOption"
              v-model="rowDate"
              :page.sync="page"
              @row-save="addData"
              @row-update="update"
              @on-load="handleList"
              @row-click="handleCurrentRowChange"
              :table-loading="loading"
            ></avue-crud>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Qs from "qs";
import { cofirm, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { Data_Width, label_Width, isDate, obj2hash } from "@/seal/gridOption"; //时间格式转化、表头宽度控制
export default {
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      isAdd: false, //判断是新增还是编辑
      gridData: [],
      data: [],
      gridOption: {
        align: "center",
        menuAlign: "center",
        menuWidth: 100, //最小值
        labelWidth: 110,
        dialogHeight: 150,
        delBtn: false,
        addBtn: false,
        menu: false,
        border: true,
        editBtn: true,
        height: "calc(100vh - 210px)",
        refreshBtn: false, //刷新按钮
        columnBtn: false, //显隐按钮
        addRowBtn: false,
        cellBtn: false,
        selection: false,
        highlightCurrentRow: true,
        rowKey: "keyCode",
        column: [
          {
            label: "id",
            prop: "checkItemId",
            hide: true,
            display: false,
          },
          {
            label: "#",
            prop: "index",
            width: 60,
            align: "center",
          },
          {
            label: "项目编号",
            prop: "checkItemCode",
            width: 140,
            cell: true,
          },
          {
            label: "项目名称",
            prop: "checkItemName",
            cell: true,
            rules: [
              {
                required: true,
                message: "请输入项目名称",
                trigger: "blur",
              },
            ],
            width: 160,
          },
          {
            label: "项目分类",
            prop: "checkCategory",
            width: 120,
            cell: true,
          },
          {
            label: "项目描述",
            prop: "checkIemDesc",
            width: 200,
            cell: true,
          },
        ],
      },
      form: {},
      formOption: {
        submitBtn: false,
        emptyBtn: false,
        card: false,
        menuBtn: false,
        labelWidth: 110,
        column: [
          {
            label: "项目编号",
            prop: "checkItemCode",
            span: 6,
          },
          {
            label: "项目名称",
            prop: "checkItemName",
            span: 6,
          },
          {
            label: "项目分类",
            prop: "checkCategory",
            span: 6,
          },
        ],
      },
      rowCode: [], //勾选选中的ID
      rowDate: {},
      checkData: {},
      oldData: {},
    };
  },
  methods: {
    //查询
    handleList({ currentPage, pageSize } = {}) {
      this.loading = true;
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      this.form.rows = this.page.pageSize;
      this.form.start = this.page.currentPage;
      let data = Qs.stringify(this.form);

      this.$http
        .get("/api/baseStandardCheckItem/v1.0/listByPage?" + data)
        .then((res) => {
          if (res.status == 200) {
            this.gridData = res.data.records;
            this.page.total = res.data.total;
            this.gridData.forEach((item, i) => {
              item.index = i + 1;
            });
            // if (this.checkData.checkItemId) {
            //   this.$nextTick(() => {
            //     document
            //       .getElementsByClassName("el-table__row")
            //       [this.checkData.$index].dispatchEvent(
            //         new MouseEvent("click")
            //       );
            //   });
            // }
            // setTimeout(() => {
            this.$refs.crud.setCurrentRow();
            // }, 100);
            this.gridOption = Data_Width(this.gridOption, this.gridData);
            setTimeout(() => {
              this.loading = false;
            }, 200);
          }
        })
        .catch((err) => {
          error("服务器错误");
          this.loading = false;
        });
    },
    addBtn() {
      this.gridData.push({
        index: this.gridData.length + 1,
      });
      this.$refs.crud.setCurrentRow(this.gridData[this.gridData.length - 1]);
      this.handleCurrentRowChange(this.gridData[this.gridData.length - 1]);
      // this.$refs.crud.rowAdd();
    },
    //新增
    addData(row, done) {
      for (let key in row) {
        if (row[key] == "") {
          delete row[key];
        }
      }
      let data = Qs.stringify(row);
      this.$http
        .post("/api/baseStandardCheckItem/v1.0/save?" + data)
        .then((res) => {
          if (res.data.code == 200) {
            success("新增成功");
            // setTimeout(() => {
            //   this.$refs.crud.setCurrentRow(1);
            // }, 100);
            this.handleList();
          } else {
            error("新增失败");
          }
        })
        .catch((err) => {
          error("err");
        });
      done();
    },
    //更新数据
    update(row, index, done, loading) {
      this.checkData = row;
      for (let key in row) {
        if (row[key] == "") {
          delete row[key];
        }
      }
      let data = Qs.stringify(row);
      this.$http
        .put("/api/baseStandardCheckItem/v1.0/updateById?" + data)
        .then((res) => {
          if (res.data.code == 200) {
            this.handleList();
            success("修改成功");
          } else {
            error("修改失败");
          }
        })
        .catch((err) => {
          error("服务器错误");
        });

      done();
      loading();
    },
    //删除
    del() {
      if (this.checkData.checkItemId) {
        cofirm("此操作将永久删除该文件, 是否继续?", "提示", {})
          .then(() => {
            this.$http
              .delete(
                "/api/baseStandardCheckItem/v1.0/removeById?id=" +
                  this.checkData.checkItemId
              )
              .then((res) => {
                if (res.data.code == 200) {
                  success(res.data.msg);
                  this.gridData.splice([this.checkData.$index], 1);
                  setTimeout(() => {
                    this.$refs.crud.setCurrentRow();
                    this.checkData = {};
                  }, 100);
                } else {
                  warning(this.$t("public.scsb"));
                }
              })
              .catch((err) => {
                error("服务器错误");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        warning("请选择删除的数据");
      }
    },
    pageChange(page) {
      this.page.currentPage = page;
      this.handleList();
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.handleList();
    },
    // 获取
    handleCurrentRowChange(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.checkData = val;
    },
    // 编辑
    edit() {
      console.log(this.checkData);
      if (!this.checkData.checkItemId) {
        warning("请点击要编辑的数据");
        return;
      }
      this.$refs.crud.rowEdit(this.checkData);
    },
    save() {
      for (let i = 0; i < this.gridData.length; i++) {
        if (
          this.gridData[i].checkItemCode == "" ||
          this.gridData[i].checkItemName == ""
        ) {
          error("项目编号/项目名称不能为空!");
          return;
        }
        if (
          this.gridData[i].checkCategory == "" ||
          this.gridData[i].checkIemDesc == ""
        ) {
          error("项目分类/项目描述不能为空!");
          return;
        }
      }

      this.loading = true;
      if (this.gridData.length == 0) {
        this.loading = false;
      }
      this.gridData.forEach((item, i) => {
        let data = Qs.stringify(item);
        if (item.checkItemId) {
          // update
          this.$http
            .put("/api/baseStandardCheckItem/v1.0/updateById?" + data)
            .then((res) => {});
        } else {
          this.$http
            .post("/api/baseStandardCheckItem/v1.0/save?" + data)
            .then((res) => {});
        }
        if (i === this.gridData.length - 1) {
          setTimeout(() => {
            this.handleList();
            success(this.$t("public.bccg"));
            this.loading = false;
          }, 200);
        }
      });
    },
  },
  created() {
    this.gridOption = label_Width(this.gridOption);
  },
};
</script>

<style lang="stylus">
#ProWorkflow {
}
</style>
