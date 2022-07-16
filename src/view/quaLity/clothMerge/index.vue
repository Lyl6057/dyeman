<!--
 * @Author: PMP
 * @Date: 2022-07-13 12:55:12
 * @LastEditors: 
 * @LastEditTime: 
 * @Description:
-->
<template>
  <div id="clothMerge" :element-loading-text="$t('public.loading')" v-loading="wLoading">
    <view-container title="成品布合并">
      <el-row class="btnList">
        <el-tooltip class="item" effect="dark" content="Tạo mới" placement="bottom">
          <el-button type="success" @click="handcreate">新增</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Chỉnh sửa" placement="bottom">
          <el-button type="warning" @click="handEdit" :disabled="!crud.length">修改</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Xóa" placement="bottom">
          <el-button type="danger" @click="handledelete" :disabled="!crud.length">删除</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Tra cứu" placement="bottom">
          <el-button type="primary" @click="query">查询</el-button>
        </el-tooltip>
      </el-row>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form">
        </avue-form>
      </div>
      <el-row class="crudBox">
        <el-col :span="24">
          <avue-crud :data="crud" :option="crudOp" @on-load="query" @row-dblclick="handleRowDBLClick"
            @row-click="handleCellClick" v-loading="loading" element-loading-text="正在拼命加载中..." :page.sync="page">
          </avue-crud>
        </el-col>
      </el-row>
    </view-container>
    <el-dialog :visible.sync="detailVisible" append-to-body width="70%" center style="text-align: center">
      <view-container title="合并之前" style="{height:100px}">
        <avue-crud :data="crudDetail" :option="crudOpDetail"></avue-crud>
        <view-container title="合并之后">
          <avue-crud :data="crudMain" :option="crudRecord"> </avue-crud>
        </view-container>
      </view-container>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body center>
      <add ref="createMarge" v-bind:edit="editMarge" @refresh="query" @close="temClose" v-if="dialogVisible"> </add>
    </el-dialog>
  </div>
</template>
<script>
import { mainForm, mainCrud, detailCrud, recordCrud } from "./data";
import {
  getMargePage,
  deleteMarge,
  getMargeDetaildtl,
} from "./api";
import add from "./add.vue";
import { warning } from '@/seal/seal';
export default {
  name: "",
  components: {
    add
  },
  data() {
    return {
      formOp: mainForm(this),
      form: {
      },
      crudOp: mainCrud(this),
      crudOpDetail: detailCrud(this),
      crudRecord: recordCrud(this),
      crud: [],
      crudAdd: [],
      crudDetail: [],
      crudMain: [],
      page: {
        pageSize: 100,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {
        weightUnit: "KG",
      },
      spowerClient: "",
      wLoading: false,
      options: [],
      loadDialogVisible: false,
      detailVisible: false,
      editMarge: '',
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        } else {
          this.form[key] = this.form[key].trim()
        }
      }
      let data = JSON.parse(JSON.stringify(this.form));
      const param = {
        start: this.page.currentPage || 1,
        rows: this.page.pageSize
      };
      getMargePage(Object.assign(data, param)).then((res) => {
        this.crud = res.data.records
        this.page.total = res.data.total;
        this.crud.sort(function (a, b) {
          var c = new Date(a.mergeDate);
          var d = new Date(b.mergeDate);
          return d - c;
        });
      })
      setTimeout(() => {
        this.loading = false;
      }, 400);
    },
    handledelete() {
      if (this.curSelectRow == undefined) return;
      this.$tip.cofirm("您确定需要删除合并 【" + this.curSelectRow.productNo + "】 吗? Bạn chắc chắc xóa mã này không?").then(() => {
        deleteMarge(this.curSelectRow.mergeId).then((res) => {
          if (res.data.code == 200) {
            this.$tip.success("删除成功！ Xóa thành công");
            this.query();
          } else {
            this.$tip.error("操作发生问题！Lỗi , xin vui lòng thử lại");
            console.error(res.data)
          }
        })
      }).catch(() => { });
    },
    queryDetail(mergeFk) {
      getMargeDetaildtl(mergeFk).then((res) => {
        this.crudDetail = res.data;
      })
    },
    handcreate() {
      this.editMarge = null
      this.dialogVisible = true;
    },
    handEdit() {
      if (this.curSelectRow == undefined) return;
      this.editMarge = this.curSelectRow;
      this.dialogVisible = true;
    },
    handleRowDBLClick(val) {
      this.crudMain = [val];
      this.queryDetail(val.mergeId)
      this.detailVisible = true;
    },
    handleCellClick(row) {
      this.curSelectRow = row;
    },
    temClose(hasRefresh) {
      this.dialogVisible = false;
      hasRefresh && this.query();
    }
  },
  updated() { },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      // vm.setCz();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.spowerClient = null;
    next();
  },
  created() {

  },
  mounted() {
    this.query();
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
.demo-input-label {
    display: inline-block;
    width: 130px;
  }
#clothFlyWeight
  .el-table
    overflow visible !important
  .el-tag--mini
    display none !important
#normal_Dlg
  .el-dialog__header
    padding 20px !important
    text-align center
  .el-dialog__body
    padding 10px !important
    text-align center
</style>
