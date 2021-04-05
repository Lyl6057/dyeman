<template>
  <div id="rcDetail">
    <view-container :title="datas.type.split('_')[0] + this.$t('iaoMng.rc')">
      <div class="btnList">
        <!-- <el-button type="primary" @click="getDetail">{{this.$t("public.query")}}</el-button> -->
        <el-button type="primary" @click="add">{{
          this.$t("public.add")
        }}</el-button>
        <el-button type="danger" @click="del">{{
          this.$t("public.del")
        }}</el-button>
        <el-button
          type="success"
          :disabled="changeList.length === 0"
          @click="save"
          >{{ this.$t("public.save") }}</el-button
        >
        <el-button type="warning" @click="getDetail">取消</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row class="crudBox">
        <el-col :span="Number(everyThing.dlgPp.split(':')[0])">
          <view-container :title="datas.type.split('_')[0] + '通知單'">
            <avue-crud
              ref="dlgcrud"
              :option="mxOp"
              v-loading="loading"
              :data="mx"
              :page.sync="page"
              @current-row-change="cellClick"
              @on-load="getDetail"
            >
              <!-- <template slot="yarnsIdType" slot-scope="{ item, value, label }">
                <span>{{ item.value }}</span>
              </template> -->
            </avue-crud>
          </view-container></el-col
        >
        <!-- <el-col :span="Number(everyThing.dlgPp.split(':')[1])">
          <view-container :title="datas.type.split('_')[0] + '明细'">
            <avue-crud
              ref="crud"
              v-loading="loading"
              :option="everyThing.dlgC2"
              :data="other"
            ></avue-crud> </view-container
        ></el-col> -->
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
    </view-container>
  </div>
</template>
<script>
import { rsxkr2C, rsxkr2F } from "./data";
import {
  getSxDetali,
  addSxDetali,
  updateSxDetali,
  delSxDetali,
} from "@/api/im/Wk/rc";
import choice from "@/components/choice";
export default {
  props: {
    datas: Object,
    detail: Object,
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
      formOp: rsxkr2F(this),
      mxOp: rsxkr2C(this),
      mx: [{ index: 1 }],
      other: [],
      form: {},
      oldData: {},
      chooseData: {},
      changeList: [],
      ruleV: false,
      choiceV: false,
      choiceTle: this.$t("iaoMng.xzlsdj"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
    };
  },
  watch: {},
  methods: {
    getDetail() {
      if (Object.keys(this.detail).length === 0 || !this.detail.whseYarninoid) {
        this.mx = [];
        return;
      }
      this.loading = true;
      this.oldData = {};
      this.changeList = [];
      this.chooseData = {};
      getSxDetali({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        whseYarninFk: this.detail.whseYarninoid,
      }).then((res) => {
        let records = res.data;
        this.page.total = records.total;
        this.mx = records.records;
        this.$refs.dlgcrud.setCurrentRow();
        if (this.mx.length === 0) {
          this.loading = false;
        }
        this.mx.forEach((item, index) => {
          item.yarnsName = item.yarnsId;
          item.index = index + 1;
          if (index === this.mx.length - 1) {
            this.loading = false;
          }
        });
      });
    },
    add() {
      if (this.mx.length > 0 && !this.mx[this.mx.length - 1].whseYarninDtloid) {
        return;
      }
      if (Object.keys(this.oldData).length > 0) {
        this.oldData.$cellEdit = false;
      }
      this.mx.push({
        index: this.mx.length + 1,
        $cellEdit: true,
        whseYarninFk: this.detail.whseYarninoid,
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
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseYarninDtloid) {
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
          delSxDetali(this.chooseData.whseYarninDtloid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.mx.splice(this.chooseData.index - 1, 1);
                this.getDetail();
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
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    save() {
      for (let i = 0; i < this.changeList.length; i++) {
        if (!this.changeList[i].yarnsId || !this.changeList[i].batchNo) {
          this.$tip.error("纱线系统编号/批号不能为空!");
          return;
        }
      }
      this.changeList.forEach((item, index) => {
        if (item.whseYarninDtloid) {
          updateSxDetali(item).then((res) => {});
        } else {
          addSxDetali(item).then((res) => {});
        }
      });
      this.getDetail();
      this.$tip.success(this.$t("public.bccg"));
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[2].click();
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      this.oldData.$cellEdit = false;
      this.choiceTarget.yarnsName = val.yarnsId;
      this.choiceTarget[this.choiceField] = val[this.choiceField];
      this.oldData.$cellEdit = true;
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
    this.getDetail();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#rcDetail {
}
</style>