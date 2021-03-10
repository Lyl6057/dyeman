<template>
  <div id="colorMng">
    <view-container
      title="色号打办"
      element-loading-text="拼命加载中"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="primary" @click="update">修改</el-button>
        <el-button type="danger" @click="del">删除</el-button>
        <el-button type="primary" @click="query">查询</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <view-container title="色号打办记录">
        <div class="crudBox" style="margin-top: 5px">
          <avue-crud
            ref="crud"
            :option="crudOp"
            :data="crud"
            :page.sync="page"
            v-loading="loading"
            @on-load="query"
            @row-dblclick="handleRowDBLClick"
            @current-row-change="cellClick"
          ></avue-crud>
        </div>
      </view-container>
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
        <tem-dlg
          ref="tem"
          :detail="detail"
          :isAdd="isAdd"
          :code="code"
          @refresh="query"
          @close="dialogVisible = false"
          v-if="dialogVisible"
        ></tem-dlg>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud, popupCrud } from "./data";
import tem from "./tem";
import {
  getLdNotice,
  addLdNotice,
  updateLdNotice,
  delAllLdNotice,
} from "./api";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
export default {
  name: "",
  components: {
    temDlg: tem,
  },
  data() {
    return {
      loading: false,
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      wLoading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
      code: getDIC("bas_companyCode"), // 公司代号
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      getLdNotice(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      )
        .then((res) => {
          let records = res.data;
          this.page.total = records.total;
          this.crud = records.records;
          this.crud.forEach((item, index) => {
            item.index = index + 1;
            if (index === this.crud.length - 1) {
              this.$refs.crud.setCurrentRow();
              this.detail = {};
              this.loading = false;
            }
          });
          if (this.crud.length === 0) {
            this.loading = false;
          }
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },
    update() {
      if (Object.keys(this.detail).length === 0) {
        this.$tip.warning("请先选择要修改的数据!");
        return;
      }
      this.isAdd = false;
      this.dialogVisible = true;
    },
    del() {
      if (Object.keys(this.detail).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除编号为 【 " + this.detail.runNo + " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          delAllLdNotice(this.detail.salLdNoticeoid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.crud.splice(this.detail.index - 1, 1);
                this.query();
              } else {
                this.$tip.error("删除失败");
              }
            })
            .catch((err) => {
              this.$tip.error("删除失败!");
            });
        })
        .catch((err) => {
          this.$tip.warning("取消操作");
        });
    },
    handleRowDBLClick(row) {
      this.detail = row;
      this.isAdd = false;
      this.dialogVisible = true;
    },
    cellClick(row) {
      this.detail = row;
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#colorMng {
}
</style>