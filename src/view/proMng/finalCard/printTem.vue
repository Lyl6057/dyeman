<!--
 * @Author: Lyl
 * @Date: 2021-08-18 08:51:58
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-31 13:43:38
 * @Description: 
-->
<template>
  <div
    calss="finalCardPrintTem"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <el-row class="btnList">
      <el-tooltip
        class="item"
        effect="dark"
        content="cập nhật"
        placement="top-start"
      >
        <el-button
          type="success"
          :disabled="!dlgform.tempId"
          @click="handleRowDBLClick(dlgform)"
          >{{ this.$t("public.update") }}</el-button
        >
      </el-tooltip>

      <el-tooltip
        class="item"
        effect="dark"
        content="thêm mới "
        placement="top-start"
      >
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="xóa"
        placement="top-start"
      >
        <el-button type="danger" :disabled="!dlgform.tempId" @click="del">{{
          this.$t("public.del")
        }}</el-button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="tìm kiếm"
        placement="top-start"
      >
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
      </el-tooltip>
    </el-row>
    <el-row class="formBox">
      <avue-form
        ref="form"
        :option="formOp"
        v-model="form"
        :upload-after="uploadAfter"
      >
      </avue-form>
    </el-row>
    <el-row class="crudBox">
      <avue-crud
        ref="temCrud"
        id="temCrud"
        :option="crudOp"
        :data="crud"
        :page.sync="page"
        v-loading="loading"
        @on-load="query"
        @row-dblclick="handleRowDBLClick"
        @current-row-change="cellClick"
      ></avue-crud>
    </el-row>
    <input
      id="input"
      ref="input"
      type="file"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      style="display: none"
      @change="fileChange"
    />
    <el-dialog
      id="colorMng_Dlg"
      :visible.sync="dialogVisible"
      width="80%"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="dialogVisible"
    >
      <view-container title="模板维护">
        <div class="btnList">
          <el-tooltip
            class="item"
            effect="dark"
            content="Bảo tồn"
            placement="top-start"
          >
            <el-button type="success" @click="save" :loading="wLoading">{{
              $t("public.save")
            }}</el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="đóng"
            placement="top-start"
          >
            <el-button type="warning" @click="dialogVisible = false">{{
              this.$t("public.close")
            }}</el-button>
          </el-tooltip>
        </div>

        <el-row class="formBox">
          <div>
            <avue-form
              ref="dlgform"
              :option="crudOp"
              v-model="dlgform"
              style="margin-top: 5px"
            >
              <template slot-scope="scope" slot="excelName">
                <el-button type="primary" @click="$refs.input.click()"
                  >上传</el-button
                >
              </template></avue-form
            >
          </div>
        </el-row>
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import { temForm, temCrud } from "./data";
import { getTem, addTem, updateTem, delTem, print, upload } from "./api";
export default {
  name: "",
  data() {
    return {
      formOp: temForm(this),
      form: {},
      crudOp: temCrud(this),
      crud: [],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      dialogVisible: false,
      detail: {},
      dlgform: {},
      isAdd: false,
      wLoading: false,
      mbfile: null,
    };
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      this.loading = true;
      this.detail = {};
      for (let key in this.form) {
        if (this.form[key] == "") {
          delete this.form[key];
        }
      }
      getTem(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.crud = res.data;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });

        if (this.crud.length > 0) {
          this.$refs.temCrud.setCurrentRow(this.crud[0]);
        }
        this.page.total = res.data.length;
        this.loading = false;
        this.wLoading = false;
      });
    },
    save() {
      this.wLoading = true;
      this.$refs.dlgform.validate((valid, done) => {
        if (valid) {
          try {
            let data = JSON.parse(JSON.stringify(this.dlgform));
            if (this.isAdd) {
              this.uploadMb(done);
            } else if (data.tempId) {
              updateTem(data).then((res) => {
                if (res.data.code == 200) {
                  this.query();
                  this.$tip.success(this.$t("public.bccg"));
                } else {
                  this.$tip.error(this.$t("public.bcsb"));
                }

                done();
                this.dialogVisible = false;
                this.wLoading = false;
              });
            }

            // if (data.tempId) {

            // } else {
            //   addTem(data).then((res) => {
            //     if (res.data.code == 200) {
            //       this.dlgform.tempId = res.data.data;
            //       this.uploadMb(done);
            //     } else {
            //       this.$tip.error(this.$t("public.bcsb"));
            //       this.wLoading = false;
            //     }
            //     done();
            //   });
            // }
          } catch (error) {
            console.log(error);
            this.wLoading = false;
            this.$tip.error(this.$t("public.bcsb"));
            done();
          }
        } else {
          this.wLoading = false;
          this.$tip.error("请补充模板信息!");
        }
      });
    },
    uploadMb(done) {
      if (this.dlgform.excelName && this.mbfile != null) {
        let formData = new FormData();
        formData.append("tempCode", this.dlgform.tempCode);
        formData.append("file", this.mbfile);
        upload(formData).then((res) => {
          if (res.data.code == 200) {
            this.mbfile = "";
            setTimeout(() => {
              this.query();
              this.dialogVisible = false;
              // this.wLoading = false;
              done();
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          } else {
            // this.dialogVisible = false;
            this.wLoading = false;
            // this.query();
            done();
            this.$tip.error(res.data.msg);
          }
        });
      } else {
        this.$tip.warning("请选择要上传的模板");
        this.wLoading = false;
        // this.query();
        // this.dialogVisible = false;
        done();
        // this.$tip.success(this.$t("public.bccg"));
      }
    },
    add() {
      this.dlgform = {};
      this.isAdd = true;
      this.crudOp.column[6].display = true;
      this.dialogVisible = true;
    },
    del() {
      // if (parent.userID != this.detail.serviceOperator) {
      //   this.$tip.warning("当前用户没有权限删除该记录!");
      //   return;
      // }
      this.$tip
        .cofirm(
          this.$t("iaoMng.delTle9") +
            this.dlgform.tempCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          delTem(this.dlgform.tempId)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
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
    handleRowDBLClick(val) {
      this.isAdd = false;
      this.dlgform = val;
      this.crudOp.column[6].display = false;
      this.dialogVisible = true;
    },
    cellClick(val) {
      this.dlgform = val;
    },
    fileChange(e) {
      let file = document.getElementById("input").files[0];
      if (!file) {
        return;
      }
      this.mbfile = file;
      this.dlgform.excelName = file.name;
      this.dlgform.tempName = file.name;
    },
    uploadAfter(e) {
      console.log(e);
    },
  },
};
</script>
<style >
.finalCardPrintTem {
}
</style>