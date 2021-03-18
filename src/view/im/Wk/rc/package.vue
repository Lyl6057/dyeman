<template>
  <div id="rcPackage">
    <view-container :title="data.type.split('_')[0]">
      <div class="btnList">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="danger" @click="del">删除</el-button>
        <el-button
          type="success"
          :disabled="changeList.length === 0"
          @click="save"
          >保存</el-button
        >
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="warning" @click="close">关闭</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          id="crud"
          v-loading="loading"
          :option="crudOp"
          :page.sync="page"
          :data="crud"
          @on-load="query"
          @current-row-change="cellClick"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>
<script>
import {
  WhseCalicoPackBarCodeF,
  WhseCalicoPackBarCodeC,
  getWhseCalicoPackBarCode,
  addWhseCalicoPackBarCode,
  delWhseCalicoPackBarCode,
  updateWhseCalicoPackBarCode,
  getWhseFinishedclothpackBarcode,
  addWhseFinishedclothpackBarcode,
  updateWhseFinishedclothpackBarcode,
  delWhseFinishedclothpackBarcode,
} from "@/const/whse";
export default {
  name: "",
  components: {},
  data() {
    return {
      data: JSON.parse(localStorage.getItem("imWk")),
      formOp: Object,
      crudOp: Object,
      form: {},
      crud: [],
      changeList: [],
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      oldData: {},
      chooseData: {},
      getData: Function,
      addData: Function,
      delData: Function,
      update: Function,
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      this.oldData = {};
      this.chooseData = {};
      this.changeList = [];
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      this.getData(
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
            let _this = this;
            _this.$nextTick(() => {
              document
                .getElementsByClassName("el-table__row")
                [index].addEventListener(
                  "click",
                  function () {
                    _this.iptChange(item);
                  },
                  false
                );
              if (index === this.crud.length - 1) {
                this.$refs.crud.setCurrentRow({});
                _this.loading = false;
              }
            });
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
      if (
        this.crud.length > 0 &&
        !this.crud[this.crud.length - 1][this.data.type.split("_")[1]]
      ) {
        return;
      }
      if (Object.keys(this.oldData).length > 0) {
        this.oldData.$cellEdit = false;
      }
      let data = {
        index: this.crud.length + 1,
        $cellEdit: true,
      };
      this.crud.push(data);
      this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
      this.iptChange(this.crud[this.crud.length - 1]);
      this.oldData = this.crud[this.crud.length - 1];
      this.$nextTick(() => {
        // 绑定 输入 事件
        let _this = this;
        document
          .getElementsByClassName("el-table__row")
          [_this.crud.length - 1].addEventListener(
            "input",
            function () {
              _this.iptChange(_this.oldData);
            },
            false
          );
      });
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.chooseData[this.data.type.split("_")[1]]) {
        this.crud.splice(this.chooseData.index - 1, 1);
        for (let i = 0; i < this.changeList.length; i++) {
          if (this.changeList[i].index === this.chooseData.index) {
            this.changeList.splice(i, 1);
            this.$refs.crud.setCurrentRow(
              this.crud[this.crud.length - 1] || {}
            );
            return;
          }
        }
      }
      this.$tip
        .cofirm(
          this.chooseData.prodNo === undefined
            ? "是否确定删除缸號為 【 " + this.chooseData.batchNo + " 】 的数据?"
            : "是否确定删除生產單號為 【 " +
                this.chooseData.prodNo +
                " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          this.delData(this.chooseData[this.data.type.split("_")[1]])
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.crud.splice(this.chooseData.index - 1, 1);
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
    save() {
      for (let i = 0; i < this.changeList.length; i++) {
        if (
          (!this.changeList[i].barcode || !this.changeList[i].prodNo) &&
          this.data.type.split("_")[0] === "胚布貨物包"
        ) {
          this.$tip.error("生产单号/货物包码不能为空!");
          return;
        }
        if (
          (!this.changeList[i].barcode || !this.changeList[i].batchNo) &&
          this.data.type.split("_")[0] === "成品布貨物包"
        ) {
          this.$tip.error("缸號/货物包码不能为空!");
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (item[this.data.type.split("_")[1]]) {
          this.update(item).then((res) => {});
        } else {
          this.addData(item).then((res) => {});
        }
      });
      this.query();
      this.$tip.success("保存成功!");
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
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
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
  },
  created() {
    switch (this.data.type.split("_")[0]) {
      case "胚布貨物包":
        this.crudOp = JSON.parse(JSON.stringify(WhseCalicoPackBarCodeC));
        this.formOp = WhseCalicoPackBarCodeF;
        this.getData = getWhseCalicoPackBarCode;
        this.addData = addWhseCalicoPackBarCode;
        this.delData = delWhseCalicoPackBarCode;
        this.update = updateWhseCalicoPackBarCode;
        this.formOp.column[1].display = true;
        this.formOp.column[2].display = false;
        this.crudOp.column[3].hide = false;
        this.crudOp.column[2].hide = true;
        break;
      case "成品布貨物包":
        //  Finishedcloth
        this.crudOp = JSON.parse(JSON.stringify(WhseCalicoPackBarCodeC));
        this.formOp = WhseCalicoPackBarCodeF;
        this.getData = getWhseFinishedclothpackBarcode;
        this.addData = addWhseFinishedclothpackBarcode;
        this.delData = delWhseFinishedclothpackBarcode;
        this.update = updateWhseFinishedclothpackBarcode;
        this.formOp.column[1].display = false;
        this.formOp.column[2].display = true;
        this.crudOp.column[2].hide = false;
        this.crudOp.column[3].hide = true;
        break;
      default:
        break;
    }
    this.crudOp.height = "calc(100vh - 192px)";
    this.crudOp.selection = false;
    // this.crudOp.column[1].hide = false;
    // this.formOp.column[0].display = true;
    this.crudOp.column.forEach((item, index) => {
      if (index != 0) {
        item.cell = true;
      }
    });
  },
  mounted() {},
  beforeDestroy() {
    // this.crudOp.height = " calc(100vh - 457px)";
  },
};
</script>
<style lang='stylus'>
#rcPackage {
  .avue-crud__menu {
    height: 0 !important;
    min-height: 0 !important;
    font-size: 18px;
    margin-bottom: 0 !important;
  }
}
</style>