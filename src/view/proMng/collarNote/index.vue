<!--
 * @Author: Lyl
 * @Date: 2021-08-07 07:57:44
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-07 10:08:54
 * @Description: 
-->
<template>
  <div id="codeCard">
    <view-container title="收货台账" v-loading="wloading" element-loading-text="拼命加载中...">
      <el-row class="btnList">
        <el-tooltip class="item" effect="dark" content="Tra cứu" placement="bottom">
          <el-button type="primary" @click="query">查询</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Thêm mới" placement="bottom">
          <el-button type="success" @click="add">增加</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Chỉnh sửa" placement="bottom">
          <el-button type="warning" @click="edit" :disabled="!crud.length">修改</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Xóa" placement="bottom">
          <el-button type="danger" @click="del" :disabled="!crud.length">删除</el-button>
        </el-tooltip>

      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form" style="margin-top: 15px"></avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" id="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
          @on-load="query" @row-dblclick="edit" @current-row-change="cellClick"></avue-crud>
      </el-row>
      <el-dialog id="details" :visible.sync="dialogVisible" fullscreen append-to-body :close-on-click-modal="false">
        <item :detail="detail" :isAdd="isAdd" @close="() => dialogVisible = false" @refresh="query"
          v-if="dialogVisible" />
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import {
  get,
  post,
  put,
  remove
} from "./api";
import item from "./item";
export default {
  name: "",
  components: {
    item
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSizes: [20, 50, 100, 200, 500],
        pageSize: 50,
        currentPage: 1,
        total: 0,
      },
      wloading: false,
      detail: {},
      isAdd: false,
      loading: false,
      dialogVisible: false,
      curentRow: {},
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      // this.wloading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      let params = Object.assign(this.form, {
        rows: this.page.pageSize,
        start: this.page.currentPage,
      })
      get(params).then((res) => {
        this.crud = res.data.records;
        this.page.total = res.data.total;

        this.crud.sort((a, b) => {
          a.collarId < b.collarId
        })

        this.crud.map((e, i) => {
          e.index = i + 1;
        })
        setTimeout(() => {
          this.loading = false;
          this.wloading = false;
          this.$refs.crud.setCurrentRow(this.crud[0] || {});
          this.detail = res.data.records[0];
        }, 400);
      })
    },
    add() {
      this.isAdd = true;
      this.dialogVisible = true;
    },

    edit() {
      this.isAdd = false;
      this.dialogVisible = true;
    },
    del() {
      this.$tip.cofirm("您确定需要删除 【 " + this.detail.weaveJobCode + " 】, bạn có chắc xóa mã này không?").then(() => {
        remove(this.detail.collarId).then((res) => {
          if (res.data.code == 200) {
            // const index = this.crud.findIndex(e => e = this.detail);
            // if (index != -1) {
            //   this.crud.splice(index, 1);
            //   this.$refs.crud.setCurrentRow(this.crud[0] || {});
            // }
            this.query();
            this.$tip.success(res.data.msg);
          } else {
            this.$tip.error(res.data.msg);
          }
        })
      })

    },
    cellClick(val) {
      this.detail = val;
    }
  },

};
</script>
<style lang="stylus">

</style>