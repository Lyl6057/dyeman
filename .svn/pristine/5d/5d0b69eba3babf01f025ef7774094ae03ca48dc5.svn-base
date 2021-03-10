/*
 * @检验方法清单
 * Created by owt
 * on 2019-9-3 18:14:27.
 */
<template>
  <div id="ChectItom">
    <el-row>
      <el-col :span="24">
        <avue-form :option="formOption" v-model="form"></avue-form>
      </el-col>
      <el-col :span="24">
        <avue-crud
          ref="crud"
          :data="gridData"
          :option="gridOption"
          :page="page"
          @row-save="addData"
          @current-change="pageChange"
          @size-change="sizeChange"
          @row-update="update"
          @row-del="del"
          @select="fn_select"
          @on-load="handleList"
          @row-click="fn_selectUp"
        >
          <template slot="menuLeft">
            <el-button
              type="primary"
              size="mini"
              @click="handleList"
            >{{$t('ProWorkflowInfo.query')}}</el-button>
            <el-button type="primary" size="mini" @click="fn_update">编辑</el-button>
            <el-button type="primary" size="mini" @click="del">删除</el-button>
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
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      gridData: [],
      data: [],
      gridOption: {
        align: "center",
        menuAlign: "center",
        menuWidth: 150,
        labelWidth: 110,
        height: 400,
        selection: true,
        menu: false,
        highlightCurrentRow: true,
        column: [
          {
            // 引用关系ID
            label: this.$t("ProWorkflowInfo.yyid"),
            prop: "refId",
            display: false,
            hide: true
          },

          {
            // 详细信息ID
            label: this.$t("ProWorkflowInfo.xxxxid"),
            prop: "detailId"
          },
          {
            // 检查项ID
            label: this.$t("ProWorkflowInfo.jcxid"),
            prop: "checkId"
          }
        ]
      },
      form: {},
      formOption: {
        submitBtn: false,
        emptyBtn: false,
        label: this.$t("ProWorkflowInfo.cxtj"),
        card: false,
        labelWidth: 110,
        column: [
          {
            // 引用关系ID
            label: this.$t("ProWorkflowInfo.yyid"),
            prop: "refId",
            span: 8,
            display: false
          },
          {
            // 详细信息ID
            label: this.$t("ProWorkflowInfo.xxxxid"),
            prop: "detailId",
            span: 8
          },
          {
            // 检查项ID
            label: this.$t("ProWorkflowInfo.jcxid"),
            prop: "checkId",
            span: 8
          }
        ]
      },
      rowCode: "", //勾选选中ID
      upData: [] //选中数据编辑
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
        size: this.page.pageSize
      };
      this.$axios
        .post(
          "api/proScheduleChecItemList?page=" +
            data.current +
            "&rows=" +
            data.size
        )
        .then(res => {
          this.page.currentPage = res.data.current;
          this.page.pageSize = res.data.size;
          this.page.total = res.data.total;
        });
      let params = {};
      Object.keys(this.form).forEach(key => {
        // 左边为true,执行右边表达式
        this.form[key] && (params[key] = this.form[key]);
        // params[key] = this.form[key] ? this.form[key] : params[key];
      });

      this.$axios.get("/api/proScheduleChecItemList", { params }).then(res => {
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
    //新增
    addData(row, done) {
      let data = isDate(this.gridOption, row);
      this.$axios.put("/api/proScheduleChecItem", data).then(res => {
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
      this.rowCode = selection;
    },
    //点击当前行获取当前行数据
    fn_selectUp(row) {
      this.upData = row;
    },
    //点击编辑按钮弹出编辑弹框
    fn_update() {
      this.$refs.crud.rowEdit(this.upData);
    },
    //更新数据
    update(row, index, done, loading) {
      let data = isDate(this.gridOption, row);
      this.$axios.post("/api/proScheduleChecItem", data).then(res => {
        if (res.data.code == 0) {
          this.handleList();
          success("修改成功");
        } else {
          error("修改失败");
        }
      });
      done();
    },
    //删除
    del(row, index) {
      let Data = [];
      this.rowCode.forEach(item => {
        Data.push(item.refId);
      });
      //设置请求头为json格式
      const requParams = {
        headers: {
          "Content-Type": "application/json"
        },
        transformRequest(data) {
          return JSON.stringify(data);
        }
      };
      cofirm("此操作将永久删除该文件, 是否继续?", "提示", {})
        .then(() => {
          this.$axios({
            ...requParams,
            method: "delete",
            url: "api/proScheduleChecItem/batchesDel",
            data: Data
          }).then(res => {
            if (res.data.code == 200) {
              success("删除成功");
              this.handleList();
            } else {
              warning("删除失败");
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
  },
  created() {}
};
</script>

<style lang="stylus">
#ChectItom {
  .avue-form__group {
    margin-top: -20px;
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
