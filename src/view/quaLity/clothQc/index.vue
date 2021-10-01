<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-01 19:24:21
 * @Description:
-->
<template>
  <div
    id="clothQc"
    :element-loading-text="$t('public.loading')"
    v-loading="wLoading"
  >
    <view-container title="QC验布">
      <el-row class="btnList">
        <!-- <el-button
          type="success"
          @click="setInWhse"
          :disabled="!selectList.length"
          >审核1</el-button
        > -->
        <el-button type="primary" @click="query">{{
          this.$t("public.query")
        }}</el-button>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row>
        <el-col :span="12">
          <view-container title="胚布信息">
            <el-row class="crudBox">
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
                @sort-change="sortChange"
              >
              </avue-crud>
            </el-row>
          </view-container>
        </el-col>
        <el-col :span="12">
          <view-container title="验布信息">
            <div class="btnList">
              <el-button type="success" @click="save">{{
                this.$t("public.save")
              }}</el-button>
              <el-button type="primary" @click="checkDlg = true"
                >选择验布项目</el-button
              >
            </div>
            <div style="height: calc(100vh - 275px); overflow: auto">
              <avue-form ref="form" :option="checkForm" v-model="checkQc">
              </avue-form>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
    <el-dialog
      title
      :visible.sync="checkDlg"
      id="qcItemDlg"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      v-if="checkDlg"
    >
      <view-container title="选择检验项目">
        <div class="btnList" style="height: 38px">
          <el-button type="success" @click="check">确定</el-button>
          <el-button type="warning" @click="checkDlg = false">{{
            this.$t("public.close")
          }}</el-button>
          <span style="margin-left: 10px; font-size: 16px">疵点类型:</span>
          <el-select
            v-model="qcType"
            multiple
            placeholder="请选择"
            style="width: 350px"
            @change="typeChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div
          class="formBox qc-check-item"
          style="height: calc(100vh - 120px); overflow: auto"
        >
          <avue-form ref="form" :option="qcForm" v-model="qcItem"> </avue-form>
        </div>
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import { mainForm, mainCrud } from "./data";
import {
  get,
  getQcRecord,
  getQcItem,
  updateQcRecord,
  addQcRecord,
} from "./api";
export default {
  name: "",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
        clothState: 1,
      },
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 50,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {},
      czsocket: "",
      weight: 0,
      changeList: [],
      wLoading: false,
      selectList: [],
      options: [],
      oldData: {},
      sort: {},
      checkSum: 0,
      checkForm: {
        submitBtn: false,
        emptyBtn: false,
        labelPosition: "top",
        labelWidth: 150,
        column: [],
      },
      checkQc: {},
      checkItem: [],
      dicArr: [
        {
          value: "A",
          label: "A",
        },
        {
          value: "B",
          label: "B",
        },
        {
          value: "C",
          label: "C",
        },
        {
          value: "D",
          label: "D",
        },
        {
          value: "E",
          label: "E",
        },
      ],
      checkDlg: false,
      qcType: [],
      qcForm: {
        submitBtn: false,
        emptyBtn: false,
        // labelPosition: "top",
        labelWidth: 250,
        group: [],
      },
      qcItem: {},
      options: [
        {
          label: "纱疵",
          value: 1,
        },
        {
          label: "织疵",
          value: 2,
        },
        {
          label: "染疵",
          value: 3,
        },
        {
          label: "结构",
          value: 4,
        },
      ],
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      let { prop, order } = this.sort;
      for (let key in this.form) {
        if (!this.form[key]) {
          delete this.form[key];
        }
      }
      order
        ? (this.form.sort = prop + (order == "descending" ? ",1" : ",0"))
        : (this.form.sort = "storeLoadCode,1");
      get(
        Object.assign(this.form, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: true,
          clothState: this.form.clothState || 1,
        })
      ).then((res) => {
        this.crud = res.data.records;
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[0]);
        }
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          item.eachNumber = Number(item.eachNumber);
        });
        this.page.total = res.data.total;
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      });
    },
    handleRowDBLClick(val) {
      this.detail = val;
    },
    cellClick(val) {
      this.detail = val;
      this.getQcItem(val);
    },
    getQcItem(val) {
      this.checkForm.column = [];
      this.$nextTick(() => {
        getQcRecord({ proClothNoteFk: val.noteId }).then((res) => {
          if (res.data.length) {
            let record = res.data[0];
            for (let key in record) {
              if (
                (key.indexOf("checkItem") != -1 || key == "remark") &&
                record[key]
              ) {
                let data = this.checkItem[key.replace(/[^0-9]/gi, "") - 1];
                this.checkForm.column.push({
                  prop: key,
                  label: data.itemName,
                  type: data.valueType == 1 ? "input" : "checkbox",
                  dicData: data.valueType == 1 ? [] : this.dicArr,
                  span: 12,
                });
                this.checkQc[key] = record[key];
              } else {
                this.checkQc[key] = "";
              }
            }
          }
        });
      });
    },
    save() {
      this.wLoading = true;
      if (Object.keys(this.checkQc).length > 0) {
        getQcRecord({
          proClothNoteFk: this.crud.noteId,
        }).then((note) => {
          if (note.data.length) {
            // update
            let data = note.data[0];
            for (let key in this.checkQc) {
              // if (this.qcItem[key]) {
              data[key] =
                this.checkQc[key] instanceof Array
                  ? this.checkQc[key].join(",")
                  : this.checkQc[key];
              // }
            }
            data.checkDate = this.$getNowTime("datetime");
            updateQcRecord(data).then((res) => {});
          } else {
            // add
            let data = {};
            for (let key in this.checkQc) {
              if (this.checkQc[key]) {
                data[key] =
                  this.checkQc[key] instanceof Array
                    ? this.checkQc[key].join(",")
                    : this.checkQc[key];
              }
            }
            data.proClothNoteFk = this.crud.noteId;
            data.checkDate = this.$getNowTime("datetime");
            addQcRecord(data).then((res) => {});
          }
        });
        setTimeout(() => {
          this.wLoading = false;
          this.$tip.success("保存成功!");
        }, 200);
      }
    },
    check() {
      // console.log(this.qcItem);
      // this.form.qcClothCheckItem = this.qcItem;
      // this.form.qcClothCheckItem = "";
      // this.checkForm.column = [];
      for (let key in this.qcItem) {
        if (
          this.qcItem[key] &&
          key.indexOf("$") == -1 &&
          key.indexOf("-all") == -1 &&
          !key in this.checkQc
        ) {
          // this.form.qcClothCheckItem +=
          //   key.split("-")[0] + ":" + this.qcItem[key] + ";";
          this.checkForm.column.push({
            label: key.split("-")[0],
            prop: key.split("-")[1],
            span: 12,
            type: key.split("-")[2] == "1" ? "input" : "checkbox",
            dicData: key.split("-")[2] == "1" ? [] : this.dicArr,
          });
          // this.checkQc[key.split("-")[1]] = this.qcItem[key];
        }
      }
      this.checkForm.column.push({
        label: "备注",
        prop: "remark",
        span: 24,
      });
      this.checkDlg = false;
    },
    sortChange(val) {
      this.sort = val;
      this.query();
    },
    selectionChange(list) {
      this.selectList = list;
    },
    typeChange() {
      getQcItem().then((res) => {
        res.data.sort((a, b) => a.sn - b.sn);
        res.data = res.data.filter(
          (a) => this.qcType.indexOf(a.checkType) != -1
        );
        let _this = this;
        this.qcItems = res.data;
        this.qcForm.group = [];
        this.qcForm.group[0] = {};
        this.qcForm.group[1] = {};
        this.qcForm.group[2] = {};
        this.qcForm.group[3] = {};
        this.qcType.forEach((item) => {
          this.qcForm.group[item - 1] = {
            icon: "el-icon-info",
            label:
              item == 1
                ? "纱疵"
                : item == 2
                ? "织疵"
                : item == 3
                ? "染疵"
                : "结构",
            prop: "basic" + item,
            // labelPosition: "top",
            column: [
              {
                label: "全选",
                prop: item - 1 + "-all",
                type: "switch",
                span: 6,
                dicData: [
                  {
                    value: false,
                    label: "",
                  },
                  {
                    value: true,
                    label: "",
                  },
                ],
                change: (val) => {
                  this.checkHandle(val);
                },
              },
            ],
          };
          this.qcItem[item - 1 + "-all"] = false;
        });
        res.data.forEach((item) => {
          this.qcForm.group[item.checkType - 1].column.push({
            label: item.itemName,
            prop:
              item.itemName +
              "-checkItem" +
              item.sn +
              "Value-" +
              item.valueType,
            span: 6,
            type: "switch",
            dicData: [
              {
                value: false,
                label: "",
              },
              {
                value: true,
                label: "",
              },
            ],
          });
          this.qcItem[
            item.itemName + "-checkItem" + item.sn + "Value-" + item.valueType
          ] = false;
        });
      });
    },
    checkHandle(val) {
      this.qcForm.group[val.column.prop.split("-")[0]].column.forEach(
        (item, index) => {
          if (index != 0) {
            this.qcItem[item.prop] = val.value;
          }
        }
      );
    },
  },
  updated() {},
  created() {},
  mounted() {
    this.qcType = [1, 2, 3, 4];
    this.typeChange();
    getQcItem().then((res) => {
      this.checkItem = res.data;
      this.checkItem.sort((a, b) => {
        return a.sn - b.sn;
      });
    });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#qcItemDlg {
  .avue-group__header, .el-collapse-item__header {
    margin-bottom: 0px;
    height: 35px;
    line-height: 35px;
    background: #eee;
    font-size: 24px;
  }

  .el-tag {
    font-size: 16px;
  }

  .avue-group .el-collapse-item__arrow {
    margin-top: 0;
  }
}

#clothQc {
  .avue-group .el-collapse-item__arrow {
    margin-top: 0;
  }

  .el-table {
    overflow: visible !important;
  }

  .el-tag--mini {
    display: none !important;
  }

  .el-radio-group {
    float: left;
  }

  .el-radio__label {
    font-size: 17px;
  }

  .el-radio__inner {
    width: 17px;
    height: 17px;
  }
}
</style>
