<template>
  <div id="rcDetail">
    <!-- <div class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </div> -->
    <el-row class="">
      <div class="btnList" style="margin-bottom: 2px">
        <!-- <el-button type="primary" @click="getDetail">查询</el-button> -->
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="danger" @click="del">删除</el-button>
        <el-button
          type="success"
          :disabled="changeList.length === 0"
          @click="save"
          >保存</el-button
        >
        <!-- <el-button type="warning" @click="getDetail">取消</el-button>
      <el-button type="warning" @click="close">关闭</el-button> -->
      </div>
      <avue-crud
        ref="dlgcrud"
        :option="mxOp"
        v-loading="loading"
        :data="mx"
        :page.sync="page"
        @current-row-change="cellClick"
        @on-load="getDetail"
      ></avue-crud>
    </el-row>

    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      dlgWidth="60%"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F } from "./data";
import choice from "@/components/choice";
import {
  getCpbDetali,
  addCpbDetali,
  updateCpbDetali,
  delCpbDetali,
} from "@/api/im/Wk/rc";
export default {
  props: {
    datas: Object,
    everyThing: Object,
    hide: String,
  },
  name: "",
  components: {
    choice: choice,
  },
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      detail: {},
      formOp: rsxkr2F(this),
      mxOp: rsxkr2C(this),
      mx: [{}],
      other: [],
      form: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      canLeave: false,
      choiceV: false,
      choiceTle: "",
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
    };
  },
  watch: {},
  methods: {
    getDetail() {
      this.loading = true;
      if (
        Object.keys(this.detail).length === 0 ||
        !this.detail.whseFinishedclothinoid
      ) {
        this.mx = [];
        this.mxOp.showSummary = false;
        this.loading = false;
        return;
      }

      this.oldData = {};

      this.chooseData = {};
      // this.mx = [];
      getCpbDetali({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        whseFinishedclothinFk: this.detail.whseFinishedclothinoid,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.changeList = [];
        this.$nextTick(() => {
          this.$refs.dlgcrud.setCurrentRow({});
          this.mxOp.showSummary = true;
        });

        this.mx = records.records;
        if (this.mx.length === 0) {
          this.loading = false;
        }
        this.mx.forEach((item, index) => {
          item.index = index + 1;
          if (index === this.mx.length - 1) {
            this.loading = false;
          }
        });
      });
    },
    add() {
      if (Object.keys(this.detail).length === 0) {
        this.$tip.error("请先选择入库资料");
        return;
      } else if (!this.detail.whseFinishedclothinoid) {
        this.$tip.error("请先保存入库资料");
        return;
      }
      if (
        this.mx.length > 0 &&
        !this.mx[this.mx.length - 1].whseFinishedclothinDtloid
      ) {
        return;
      }
      if (Object.keys(this.oldData).length > 0) {
        this.oldData.$cellEdit = false;
      }
      this.mx.push({
        index: this.mx.length + 1,
        $cellEdit: true,
        whseFinishedclothinFk: this.detail.whseFinishedclothinoid,
      });
      this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
      this.iptChange(this.mx[this.mx.length - 1]);
      this.oldData = this.mx[this.mx.length - 1];
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
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.chooseData.whseFinishedclothinDtloid) {
        this.mx.splice(this.chooseData.index - 1, 1);
        for (let i = 0; i < this.changeList.length; i++) {
          if (this.changeList[i].index === this.chooseData.index) {
            this.changeList.splice(i, 1);
            this.$refs.dlgcrud.setCurrentRow(this.mx[this.mx.length - 1]);
            return;
          }
        }
      }
      this.$tip
        .cofirm("是否确定删除", this, {})
        .then(() => {
          delCpbDetali(this.chooseData.whseFinishedclothinDtloid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.mx.splice(this.chooseData.index - 1, 1);
                this.getDetail();
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
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    save() {
      for (let i = 0; i < this.changeList.length; i++) {
        if (!this.changeList[i].batchNo || !this.changeList[i].countingNo) {
          this.$tip.error("缸号/疋数不能为空!");
          this.canLeave = true;
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (item.whseFinishedclothinDtloid) {
          updateCpbDetali(item).then((res) => {});
        } else {
          addCpbDetali(item).then((res) => {});
        }
      });
      this.changeList = [];
      this.getDetail();
      this.$tip.success("保存成功!");
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[3].click();
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.oldData.$cellEdit = true;
      if (this.choiceTle === "成品布貨物包") {
        this.choiceTarget.weight = val.weight;
        this.choiceTarget.weightUnit = val.weightUnit;
        this.choiceTarget.prodNo = val.prodNo;
        this.choiceTarget.fabticket = val.fabticket;
        this.choiceTarget.countingNo = val.countingNo;
      }
      for (var key in val) {
        delete val[key];
      }
      for (var key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
  },
  created() {},
  mounted() {
    this.form = this.detail;
    // this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail {
}
</style>