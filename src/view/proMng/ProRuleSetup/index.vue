/* * @排单逻辑设置 * Created by owt * on 2019-8-31 18:08:06. */
<template>
  <div id="Setup">
    <el-row>
      <el-col :span="24" class="headForm">
        <avue-form :option="formOption" v-model="form"></avue-form>
      </el-col>
      <el-col :span="24" class="centent-Crud">
        <avue-crud
          ref="crud"
          :data="gridData"
          :option="gridOption"
          :page="page"
          @select="fn_select"
          @row-save="addData"
          @row-update="update"
          @current-change="pageChange"
          @size-change="sizeChange"
          @row-del="del"
          @row-click="fn_clickUP"
        >
          <template slot="menuLeft">
            <el-button type="primary" size="mini" @click="handleList">{{
              $t("ProWorkflowInfo.query")
            }}</el-button>
            <el-button type="primary" size="mini" @click="fn_update"
              >编辑</el-button
            >
            <el-button type="primary" size="mini" @click="del">{{
              this.$t("public.del")
            }}</el-button>
          </template>
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
import { cofirm, success, error } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { Data_Width, label_Width, isDate } from "@/seal/gridOption"; //时间格式转化、表头宽度控制
export default {
  data() {
    return {
      page: {
        pageSize: 20,
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
        menu: false,
        selection: true,
        refreshBtn: false, //刷新按钮
        columnBtn: false, //显隐按钮
        addRowBtn: false,
        highlightCurrentRow: true,
        rowKey: "setupId",
        column: [
          {
            label: "设置ID",
            prop: "setupId",
            hide: true,
            display: false,
          },
          {
            // 设置名称
            label: this.$t("ProWorkflowInfo.sjmc"),
            prop: "setupName",
            cell: true,
          },
          {
            // 设置编号
            label: this.$t("ProWorkflowInfo.sjbh"),
            prop: "setupCode",
            cell: true,
          },
          {
            // 设置分类
            label: this.$t("ProWorkflowInfo.sjfl"),
            prop: "setupCategory",
            cell: true,
          },
          {
            // 设置描述
            label: this.$t("ProWorkflowInfo.szms"),
            prop: "setupDecs",
            cell: true,
          },
          {
            // 设置表达式
            label: this.$t("ProWorkflowInfo.bds"),
            prop: "setupFormula",
            cell: true,
          },
        ],
      },
      form: {},
      formOption: {
        submitBtn: false,
        emptyBtn: false,
        label: this.$t("ProWorkflowInfo.cxtj"),
        card: false,
        labelWidth: 110,
        column: [
          // {
          //   label: "设置ID",
          //   prop: "setupId",
          //   span: 8
          // },
          {
            // 设置名称
            label: this.$t("ProWorkflowInfo.sjmc"),
            prop: "setupName",
            span: 8,
          },
          {
            // 设置编号
            label: this.$t("ProWorkflowInfo.sjbh"),
            prop: "setupCode",
            span: 8,
          },
          {
            // 设置分类
            label: this.$t("ProWorkflowInfo.sjfl"),
            prop: "setupCategory",
            span: 8,
          },
          // {
          //   label: "设置描述",
          //   prop: "setupDecs",
          //   span: 8
          // },
          // {
          //   label: "设置表达式",
          //   prop: "setupFormula",
          //   span: 8
          // }
        ],
      },
      rowCode: "", //勾选选中ID
      upData: [], //选中数据编辑
    };
  },
  methods: {
    //查询
    handleList() {
      // 获取分页和数据记录条数
      let data = {
        data,
        //开始列
        current: this.page.currentPage,
        //数量
        size: this.page.pageSize,
      };
      this.$axios
        .post(
          "/api/proRuleSetupList?page=" + data.current + "&rows=" + data.size
        )
        .then((res) => {
          this.page.currentPage = res.data.current;
          this.page.pageSize = res.data.size;
          this.page.total = res.data.total;
        });

      let params = {};
      Object.keys(this.form).forEach((key) => {
        // 左边为true,执行右边表达式
        this.form[key] && (params[key] = this.form[key]);
      });
      // 获取和输入筛选数据
      this.$axios.get("/api/proRuleSetupList", { params }).then((res) => {
        console.log(res);
        this.gridData = res.data;
        this.gridOption = Data_Width(this.gridOption, this.gridData);
      });
    },
    pageChange(page) {
      this.page.currentPage = page;
      this.handleList();
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.handleList();
    },
    //保存新增
    addData2(row, index) {
      this.$refs.crud.rowSave();
      this.$refs.crud.rowAdd();
    },
    //新增
    addData(row, done) {
      let data = isDate(this.gridOption, row);
      this.$axios.put("/api/proRuleSetup", data).then((res) => {
        if (res.data.code == 0) {
          success("新增成功");
          this.handleList();
        } else {
          error("新增失败");
        }
      });
      done();
    },
    //勾选选中回调
    fn_select(selection, row) {
      // this.rowCode = row.setupId;
      this.rowCode = selection;
    },
    //点击当前行获取当前行数据
    fn_clickUP(row) {
      this.upData = row;
    },
    //点击编辑按钮
    fn_update() {
      this.$refs.crud.rowEdit(this.upData);
    },
    //更新数据
    update(row, index, done, loading) {
      let data = isDate(this.gridOption, row);
      this.$axios.post("/api/proRuleSetup", data).then((res) => {
        if (res.data.code == 0) {
          this.handleList();
          success("修改成功");
        } else {
          error("修改失败");
        }
      });
      done();
      loading();
    },
    //删除
    del() {
      const Data = [];
      this.rowCode.forEach((item) => {
        Data.push(item.setupId);
      });
      //设置请求格式为json格式
      const requParams = {
        headers: {
          "Content-Type": "application/json",
        },
        transformRequest(data) {
          return JSON.stringify(data);
        },
      };
      cofirm("此操作将永久删除该文件, 是否继续?", "提示", {})
        .then(() => {
          this.$axios({
            ...requParams,
            method: "delete",
            url: "/api/proRuleSetup/batchesDel",
            data: Data,
          }).then((res) => {
            if (res.data.code == 200) {
              success(this.$t("public.sccg"));
              this.handleList();
            } else {
              warning(this.$t("public.scsb"));
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
    this.gridOption = label_Width(this.gridOption);
  },
};
</script>

<style lang="stylus">
#Setup {
  .el-table__body-wrapper {
    overflow: auto !important;
    height: calc(100vh - 490px) !important;
  }

  .el-table__fixed, .el-table__fixed-body-wrapper {
    height: calc(100vh - 510px);
    overflow-x: hidden;
    padding-bottom: 104px;
  }

  .avue-crud__pagination {
    margin-top: -5px;
  }

  .avue-group__item {
    margin: 0 5px;
    padding-bottom: 0;
  }

  .avue-crud__menu {
    margin: -20px 0 -10px;
  }
}
</style>
