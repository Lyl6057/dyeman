<template>
  <div id="imDg">
    <view-container title="采购物料需求">
      <div class="btnList">
        <!-- <el-button type="primary" @click="add" :disabled="loading"
          >{{this.$t("public.add")}}</el-button
        ><el-button type="primary" @click="update" :disabled="loading"
          >{{this.$t("public.update")}}</el-button
        ><el-button type="danger" @click="del" :disabled="loading"
          >{{ this.$t("public.del") }}</el-button
        >
        <el-button type="success" @click="sava" :disabled="loading"
          >{{this.$t("public.save")}}</el-button
        ><el-button type="info" @click="getData" :disabled="loading"
          >取消</el-button
        >
           </div> -->
        <el-button type="primary" @click="getData" :disabled="loading">{{
          this.$t("public.query")
        }}</el-button>
      </div>
      <div class="formBox" style="margin-top: 10px">
        <avue-form ref="form" v-model="form" :option="formOp"> </avue-form>
      </div>
      <el-card>
        <el-tabs type="border-card" v-model="tabs">
          <el-tab-pane label="纱线" name="sx"> </el-tab-pane>
          <el-tab-pane label="胚布" name="pb"> </el-tab-pane>
          <el-tab-pane label="染化料" name="rhl"> </el-tab-pane>
          <el-tab-pane label="生产辅料" name="scfl"> </el-tab-pane>
        </el-tabs>
        <div class="crudBox">
          <avue-crud
            v-loading="loading"
            ref="crud1"
            :data="crudData"
            :option="crudOp"
            @on-load="getData(tabs)"
            @selection-change="selectionChange"
          ></avue-crud>
        </div>
      </el-card>
    </view-container>
  </div>
</template>
<script>
import {
  sxForm,
  sxCrud,
  pbForm,
  pbCrud,
  cpbForm,
  cpbCrud,
  scflForm,
  scflCrud,
  rhlForm,
  rhlCrud,
} from "./data";
import { getSx, getPb, getCpb, getRhl, getScfl } from "@/api/im/Dg/index";
export default {
  name: "",
  data() {
    return {
      tabs: "sx",
      dialogVisible: false,
      loading: false,
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      locInfo: [],
      chooseData: {},
      oldData: {}, // 记录上一次点击编辑
      changeList: [], // 记录修改的对象
      form: {},
      formOp: sxForm,
      crudData: [
        {
          index: 1,
        },
      ],
      func: null,
      data: {
        sx: [],
        pb: [],
        cpb: [],
        rhl: [],
        scfl: [],
      },
      crudOp: sxCrud,
      selectionData: [],
      tle: "",
    };
  },
  watch: {
    tabs: {
      handler(newVal, oldVal) {
        this.selectionData = [];
        switch (newVal) {
          case "sx":
            // this.getData("Sx", getSx);
            this.formOp = sxForm;
            this.crudOp = sxCrud;
            this.func = getSx;
            this.tle = "纱线";
            break;
          case "pb":
            this.formOp = pbForm;
            this.crudOp = pbCrud;
            this.func = getPb;
            this.tle = "胚布";
            break;
          case "rhl":
            this.formOp = rhlForm;
            this.crudOp = rhlCrud;
            this.tle = "染化料";
            this.func = getRhl;
            break;
          default:
            this.formOp = scflForm;
            this.crudOp = scflCrud;
            this.func = getScfl;
            this.tle = "生产辅料";
        }
        this.getData(this.tabs);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getData(val) {
      this.loading = true;
      if (this.selectionData.length > 0) {
        this.selectionData = [];
        this.$refs.crud1.selectClear();
      }

      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      this.func(
        Object.assign(
          this.form
          // {
          //   page: this.page.currentPage,
          //   rows: this.page.pageSize,
          //   start: (this.page.currentPage - 1) * this.page.pageSize + 1,
          // }
        )
      )
        .then((res) => {
          res.data.rows.forEach((item, index) => {
            item.index = index + 1;
          });
          this.data[val] = res.data.rows;
          this.crudData = this.data[val];
          // this.page.total = res.data.total;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    add() {
      if (Object.keys(this.oldData).length > 0) {
        this.oldData.$cellEdit = false;
      }
      this.data.push({
        index: this.data.length + 1,
        $cellEdit: true,
      });
      this.oldData = this.data[this.data.length - 1];
      this.$nextTick(() => {
        // 绑定 输入 事件
        let _this = this;
        document
          .getElementsByClassName("el-table__row")
          [_this.data.length - 1].addEventListener(
            "input",
            function () {
              _this.iptChange(_this.oldData);
            },
            false
          );
      });
    },
    iptChange(val) {
      if (this.changeList.length === 0) {
        this.changeList.push(val);
      } else {
        for (let i = 0; i < this.changeList.length; i++) {
          if (val.index === this.changeList[i].index) {
            this.changeList[i] = val;
            return;
          }
          if (
            this.changeList.length - 1 === i &&
            this.changeList[i].index != val.index
          ) {
            this.changeList.push(val);
          }
        }
      }
    },
    update() {},
    del() {},
    sava() {
      this.oldData.$cellEdit = false;
    },
    cancel() {},
    query() {},
    preview() {
      this.dialogVisible = true;
    },
    selectionChange(val) {
      this.selectionData = val;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[1].click();
    },
    del(row, index) {
      const data = row.classifyId;
      cofirm("此操作将永久删除该文件, 是否继续?", "提示", {})
        .then(() => {
          this.$axios
            .delete("/api/iotEquipmentType?classifyId=" + data)
            .then((res) => {
              if (res.data.code == 0) {
                success(this.$t("public.sccg"));
                this.handleList();
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
    },
  },
  created() {},
  mounted() {
    // getCloth().then((res) => {
    //   pbCrud.column[8].dicData = res.data;
    //   this.locInfo = res.data;
    // });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#imDgDlg {
  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    background-color: rgb(2, 26, 60);
  }

  .el-dialog__body {
    padding: 0 !important;
    height: 99%;
    overflow: hidden;
  }

  .el-dialog__header {
    padding: 1px;
    background-color: rgb(2, 26, 60);
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
    font-size: 24px;
  }

  .el-dialog__headerbtn {
    font-size: 18px;
    top: 15px;
    z-index: 2020;
  }
}

#imDg {
  .crudBox {
    // margin-top: 5px !important;
  }

  .el-form-item--mini.el-form-item {
    margin-bottom: 8px !important;
  }

  .el-tag--mini {
    display: none;
  }
}
</style>