<template>
  <div id="colorMng">
    <view-container
      title="外发加工送货单"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="primary" @click="update">{{
          this.$t("public.update")
        }}</el-button>
        <el-button type="danger" @click="del">{{
          this.$t("public.del")
        }}</el-button>
        <el-button type="primary" @click="audit">审核</el-button>
        <el-button type="primary" @click="importExcel">导入excel</el-button>
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <view-container title="外发加工送货单资料">
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
            @selection-change="selectionChange"
          ></avue-crud>
        </div>
      </view-container>
      <form action id="myform">
        <input
          type="file"
          name="myFile"
          id="myFile"
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          style="display: none"
          @change="fileChange"
        />
      </form>

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
          @refresh="query"
          @close="dialogVisible = false"
          v-if="dialogVisible"
        ></tem-dlg>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import tem from "./tem";
import { get, del, uploadXlxs, auditOne } from "./api";
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
        pageSizes: [20,50,100,200,500],
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      wLoading: false,
      dialogVisible: false,
      detail: {},
      isAdd: false,
      selectList: []
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      // for (var key in this.form) {
      //   if (this.form[key] === "") {
      //     delete this.form[key];
      //   }
      // }
      this.form.weaveJobCode = "!^%" + (this.form.weaveJobCode || "");
      this.form.deliCode = "%" + (this.form.deliCode || "");
      get(
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
              setTimeout(() => {
                this.wLoading = false;
              }, 200);
            }
          });
          this.form.weaveJobCode = this.form.weaveJobCode.replace(/[!^%]/g, "");
          this.form.deliCode = this.form.deliCode.replace(/[!^%]/g, "");
          if (this.crud.length === 0) {
            this.wLoading = false;
          }
        })
        .catch((e) => {
          this.wLoading = false;
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
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除单号为 【 " +
            this.detail.weaveJobCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          del(this.detail.shipId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crud.splice(this.detail.index - 1, 1);
                this.query();
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    selectionChange(val){
      this.selectList = val
    },
    audit() {
      if (this.selectList.length === 0) {
        this.$tip.error("请选择要审核的数据!");
        return;
      }
      this.$tip
        .cofirm(
          "是否确定通过审核?",
          this,
          {}
        )
        .then(() => {
          this.wLoading = true
          this.selectList.forEach((item,i) =>{
            auditOne(item.shipId).then((res) => {
              if(this.selectList.length - 1 == i){
                this.$tip.success(this.$t("public.bccg"))
                this.query()
              }
            })
          })
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    importExcel() {
      document.getElementById("myFile").click();
    },
    fileChange(ev) {
      this.wLoading = true;
      let file = document.getElementById("myFile").files[0];
      let formData = new FormData();
      formData.append("file", file);
      uploadXlxs(formData)
        .then((res) => {
          this.query();
          setTimeout(() => {
            this.$tip.success(res.data);
          }, 200);
        })
        .catch((e) => {
          this.wLoading = false;
          this.$tip.error("上传失败!" + e);
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
.el-tag--mini{
  display: none
}
</style>