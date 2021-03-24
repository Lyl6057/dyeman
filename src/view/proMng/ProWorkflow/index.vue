/* * @产能公式 * Created by Lyl * on 2019-11-9 17:50:43. */
<template>
  <div id="ProWorkflow">
    <el-row>
      <el-col class="queryForm">
        <el-tabs type="border-card" v-loading="loading">
          <el-tab-pane label="生产工序">
            <div class="btnList">
              <el-button type="success" size="mini" @click="save"
                >保存</el-button
              >
              <el-button type="primary" size="mini" @click="addBtn"
                >新增</el-button
              >
              <el-button type="danger" size="mini" @click="del">删除</el-button>
              <el-button type="primary" size="mini" @click="handleList"
                >查询</el-button
              >
            </div>
            <div :span="24">
              <avue-form :option="formOption" v-model="form"></avue-form>
            </div>
            <el-col :span="24">
              <avue-crud
                ref="crud"
                :data="gridData"
                :option="gridOption"
                :page="page"
                @on-load="handleList"
                @row-click="handleCurrentRowChange"
              >
                <!-- <template slot="menuLeft"></template>
            <template slot-scope="scope" slot="menuForm">
              <el-button
                type="primary"
                icon="el-icon-check"
                size="mini"
                @click="addData2(scope.row, scope.index)"
              >保存并新增</el-button>
            </template>-->
              </avue-crud>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var eqType = [],
  codeData = [],
  codeData2 = [];

import { fetchList } from "./data";
import Qs from "qs";
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
import { cofirm, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { Data_Width, label_Width, isDate } from "@/seal/gridOption"; //时间格式转化、表头宽度控制
export default {
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      isAdd: false, //判断是新增还是编辑
      gridData: [],
      data: [],
      gridOption: {
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
        column: [
          {
            prop: "index",
            label: "#",
            width: 60,
            align: "center",
          },
          {
            // 关键词
            label: this.$t("ProWorkflowInfo.gjc"),
            prop: "keyCode",
            // type: "select",
            // dicData: getDicT("basProductionDtlcList","procedureName","procedureId"),
            width: 100,
            // change: row => {
            //   this.rowDate.keyName = row.value;
            //   console.log(row);
            // },
            disabled: true,
          },
          // {
          //   // 关键词
          //   label: this.$t("ProWorkflowInfo.gjcmc"),
          //   prop: "keyName",
          //   cell: true
          // },
          {
            // 工序名称
            label: this.$t("ProWorkflowInfo.gxmc"),
            prop: "keyName",
            type: "select",
            cell: true,
            dicData: getDicT(
              "basProductionDtlcList",
              "procedureName",
              "procedureId"
            ),
            change: (row) => {
              this.keyNameChange();
            },
            width: 160,
          },
          {
            // 设备型号
            label: this.$t("ProWorkflowInfo.sbxh"),
            prop: "equModel",
            type: "select",
            dicData: postDicT(
              "baseEquipmentCategoryList",
              "categoryCode",
              "categoryId"
            ),
            cell: true,
            width: 200,
          },
          {
            // 公式
            label: this.$t("ProWorkflowInfo.gs"),
            prop: "formula",
            cell: true,
            width: 300,
          },

          {
            // 关键词描述
            label: this.$t("ProWorkflowInfo.gjcms"),
            prop: "keyDesc",
            cell: true,
            width: 220,
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
            label: this.$t("ProWorkflowInfo.gjc"),
            prop: "keyCode",
            span: 6,
          },
          {
            label: this.$t("ProWorkflowInfo.sbxh"),
            prop: "equModel",
            span: 6,
            dicData: eqType,
            type: "select",
          },
          {
            label: this.$t("ProWorkflowInfo.gs"),
            prop: "formula",
            span: 6,
          },
          // {
          //   label: this.$t("ProWorkflowInfo.gjcmc"),
          //   prop: "keyName",
          //   span: 8
          // }
          // {
          //   label: this.$t("ProWorkflowInfo.gjcms"),
          //   prop: "keyDesc",
          //   span: 8
          // }
        ],
      },
      testData: [],
      rowCode: [], //勾选选中的ID
      rowDate: {},
      checkData: {},
      oldData: {},
      loading: false,
    };
  },
  methods: {
    //查询
    handleList({ currentPage, pageSize } = {}) {
      this.loading = true;
      //分页
      this.$http
        .get("/api/formulaAndProductionDtlcList", {
          params: Object.assign(
            {
              current: currentPage || this.page.currentPage,
              size: pageSize || this.page.pageSize,
            },
            this.form
          ),
        })
        .then((res) => {
          //procedureName basProductionDtlc
          let { records, total } = res.data;
          this.gridData = records;
          this.gridData.forEach((item, i) => {
            item.index = i + 1;
            item.keyName = item.keyCode;
          });
          this.checkData = {};
          this.$refs.crud.setCurrentRow();
          this.page.total = total;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          error("服务器错误" + err);
        });
    },
    save() {
      for (let i = 0; i < this.gridData.length; i++) {
        if (
          this.gridData[i].keyName === "" ||
          !this.gridData[i].keyName ||
          this.gridData[i].equModel === "" ||
          !this.gridData[i].equModel ||
          this.gridData[i].formula === "" ||
          !this.gridData[i].formula
        ) {
          error(
            this.$t("ProWorkflowInfo.gxmc") +
              "/" +
              this.$t("ProWorkflowInfo.sbxh") +
              "/" +
              this.$t("ProWorkflowInfo.gs") +
              "不能为空!"
          );
          return;
        }
      }
      this.loading = true;
      this.gridData.forEach((item, i) => {
        item.keyName = item.$keyName;
        let data = Qs.stringify(item);
        if (item.isAdd) {
          // add
          this.$http
            .put("/api/baseStandarFormulaKey?" + data)
            .then((res) => {});
        } else {
          this.$http
            .post("/api/baseStandarFormulaKey?" + data)
            .then((res) => {});
        }
        if (i === this.gridData.length - 1) {
          success("保存成功!");
          this.loading = false;
          this.handleList();
        }
      });
      if (this.gridData.length === 0) {
        this.loading = false;
        return;
      }
    },
    addBtn() {
      // this.$refs.crud.rowAdd();
      this.gridData.push({ index: this.gridData.length + 1, isAdd: true });
      this.$refs.crud.setCurrentRow(this.gridData[this.gridData.length - 1]);
      this.handleCurrentRowChange(this.gridData[this.gridData.length - 1]);
    },
    //删除
    del() {
      if (this.checkData.isAdd) {
        this.gridData.splice([this.checkData.$index], 1);
        this.$refs.crud.setCurrentRow();
        this.checkData = {};
        return;
      }
      if (this.checkData.keyCode) {
        cofirm("此操作将永久删除该数据, 是否继续?", "提示", {})
          .then(() => {
            this.$http
              .delete(
                "/api/baseStandarFormulaKey?keyCode=" + this.checkData.keyCode
              )
              .then((res) => {
                if (res.data.code == 200) {
                  success(res.data.msg);
                  // this.gridData.splice([this.checkData.$index], 1);
                  // setTimeout(() => {
                  this.handleList();
                  //   this.$refs.crud.setCurrentRow();
                  // }, 100);
                } else {
                  warning("删除失败");
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
    //双击编辑
    rowClick(row, column, cell, event) {
      this.$refs.crud.rowCell(row, row.$index);
    },
    keyNameChange() {
      if (this.checkData.isAdd) {
        this.loading = true;
        this.$nextTick(() => {
          this.$http
            .get("/api/baseStandarFormulaKey?keyCode=" + this.checkData.keyName)
            .then((res) => {
              if (res.data === "") {
                this.$set(this.checkData, "keyCode", this.checkData.keyName);
              } else {
                this.checkData.keyName = "";
                error("已存在此工序!");
              }
              this.loading = false;
            });
        });
      }
    },
    // 获取
    handleCurrentRowChange(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.checkData = val;
      this.$nextTick(() => {
        if (this.checkData.isAdd) {
          this.gridOption.column[2].cell = true;
        } else {
          this.gridOption.column[2].cell = false;
        }
      });
    },
  },
  created() {},
};
</script>

<style lang="stylus">
#ProWorkflow {
}
</style>
