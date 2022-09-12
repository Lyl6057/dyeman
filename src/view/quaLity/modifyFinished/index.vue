<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-10 15:26:58
 * @Description:
-->
<template>
  <div id="modifyFinished" :element-loading-text="$t('public.loading')" v-loading="wloading">
    <el-tabs type="border-card" v-model="tabs">
      <el-tab-pane label="拆缸管理" name="first">
        <el-row class="btnList">
          <el-button type="success" @click="save">{{
              this.$t("public.save")
          }}</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="formOp" v-model="form">
            <template slot-scope="scope" slot="vatNo1">
              <el-select v-model="form.vatNo1" filterable remote reserve-keyword clearable default-first-option
                placeholder="请输入缸号" :remote-method="vatMethod" @change="vatChange">
                <el-option v-for="item in vatList" :key="item.vatNo" :label="item.vatNo" :value="item.vatNo"
                  :disabled="item.vatNo == form.vatNo2">
                </el-option>
              </el-select>
            </template>
            <template slot-scope="scope" slot="vatNo2">
              <el-select v-model="form.vatNo2" filterable remote reserve-keyword clearable default-first-option
                placeholder="请输入缸号" :remote-method="vatMethod" @change="vatChange">
                <el-option v-for="item in vatList" :key="item.vatNo" :label="item.vatNo" :value="item.vatNo"
                  :disabled="item.vatNo == form.vatNo1">
                </el-option>
              </el-select>
            </template>
          </avue-form>
        </el-row>
        <el-row class="crudBox">

          <el-transfer filterable v-model="checkData" filter-placeholder="关键字搜索" :data="finishedNotes" :props="{
            key: 'cardId',
            label: 'productNo',
          }" :titles="[form.vatNo1 || '拆缸缸号', form.vatNo2 || '目标缸号']" style="margin: 10px">
            <span slot-scope="{ option }">{{ option.vatNo }} - {{ option.pidNo }} -
              {{ option.netWeight + "KG" }}</span>
          </el-transfer>

        </el-row>
      </el-tab-pane>
      <el-tab-pane label="删除/恢复数据" name="second">
        <el-row class="btnList">
          <el-button type="primary" @click="query">{{
              this.$t("public.query")
          }}</el-button>
          <el-button :type="secondF.delFlag ? 'success' : 'danger'" @click="del" :disabled="!selectList.length">{{
              (secondF.delFlag)? "恢复" : "删除"
          }}</el-button>
          <el-button type="primary" @click="splitNote" v-if="!secondF.delFlag" :disabled="!detail.cardId">拆布</el-button>
        </el-row>
        <el-row class="formBox">
          <avue-form ref="form" :option="secondFOp" v-model="secondF">
          </avue-form>
        </el-row>
        <el-row class="crudBox">
          <avue-crud ref="secondcrud" :option="secondCOp" :data="secondC" :page.sync="secondPage" v-loading="tloading"
            @on-load="query" @cell-click="cellClick" @selection-change="selectionChange">
          </avue-crud>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog id="colorMng_Dlg" :visible.sync="splitDlg" width="80%" top="10vh" append-to-body
      :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container title="拆布预览" v-loading="splitLoading" :element-loading-text="$t('public.loading')">
        <div class="btnList">
          <el-popover placement="right" width="160" v-model="visible">
            <p>是否确定保存？</p>
            <div style="text-align: right">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="splitSubmit">确定</el-button>
            </div>
            <el-button type="success" slot="reference">{{
                this.$t("public.save")
            }}</el-button>
          </el-popover>

          <el-button type="warning" @click="splitDlg = false" style="margin-left: 10px">{{ this.$t("public.close") }}
          </el-button>
          <span class="btn-right-title"> 缸号： {{ detail.vatNo }}</span>
        </div>
        <el-row class="formBox">
          <avue-form ref="form" :option="splitOp" v-model="splitF"> </avue-form>
        </el-row>
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import { mainForm, mainCrud, secondForm, secondCrud, splitForm } from "./data";
import {
  get,
  getFinishList,
  updateFinished,
  getFinish,
  del,
  addFinished,
  updateFinishedRCV
} from "./api";
export default {
  name: "qcDeatilReport",
  components: {},
  data() {
    return {
      splitOp: splitForm(this),
      splitF: {},
      checkData: [],
      finishedNotes: [],
      vatList: [],
      formOp: mainForm(this),
      form: {},
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 100,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      wloading: false,
      loading: false,
      serachLoading: false,
      tloading: false,
      options: [],
      tabs: "first",
      selectList: [],
      secondFOp: secondForm(this),
      secondF: {
        delFlag: false,
      },
      secondCOp: secondCrud(this),
      secondC: [],
      secondPage: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      splitDlg: false,
      detail: {},
      visible: false,
      splitLoading: false,
    };
  },
  watch: {},
  methods: {
    vatChange() {
      this.wloading = true;
      if (!this.form.vatNo1) {
        this.vat2Change();
        return;
      }
      getFinishList({
        vatNo: this.form.vatNo1,
        cardType: 1,
        // delFlag: "",
      }).then((res) => {
        this.finishedNotes = res.data.sort((a, b) => {
          return a.productNo > b.productNo ? 1 : -1;
        });
        this.finishedNotes.forEach((item) => {
          item.disabled = item.whseVouch == 9 ? true : false
        })
        this.vat2Change();
      });
    },
    vat2Change() {
      this.$nextTick(() => {
        if (!this.form.vatNo2) {
          this.wloading = false;
          return;
        }
        getFinishList({
          vatNo: this.form.vatNo2,
          cardType: 1,
          // delFlag: "",
        }).then((res) => {
          this.checkData = [];
          this.finishedNotes = this.finishedNotes.concat(
            res.data.sort((a, b) => {
              return a.productNo > b.productNo ? 1 : -1;
            })
          );
          this.finishedNotes.forEach((item) => {
            item.disabled = item.whseVouch == 9 ? true : false
          })
          res.data.forEach((item, i) => {
            this.checkData.push(item.cardId);
          });
          this.wloading = false;
        });
      });
    },
    vatMethod(val) {
      get({
        vatNo: "!^%" + val,
        rows: 10,
        start: 1,
      }).then((res) => {
        this.vatList = res.data.records;
      });
    },
    save() {
      if (!this.form.vatNo1 || !this.form.vatNo2) {
        this.$tip.error("请补充缸号信息！");
        return;
      }
      this.wloading = true;
      this.finishedNotes.forEach((item, i) => {
        // 属于右侧缸号
        item.vatNo =
          this.checkData.indexOf(item.cardId) != -1
            ? this.form.vatNo2
            : this.form.vatNo1;
        updateFinished(item).then((res) => {
          if (i == this.finishedNotes.length - 1) {
            this.vatChange();
            this.wloading = false;
            this.$tip.success("保存成功！");
          }
        });
        this.wloading = false;
      });
    },
    query() {
      this.tloading = true;
      this.detail = {};
      let data = JSON.parse(JSON.stringify(this.secondF));
      let r_clothCheckTime_r = "";
      if (data.clothCheckTime && data.clothCheckTime.length) {
        r_clothCheckTime_r = `!%5E%5b${data.clothCheckTime[0]} 07:30:00~${data.clothCheckTime[1]} 07:30:00%5d`;
      } else {
        r_clothCheckTime_r = "!%5E";
      }
      data.vatNo = "%" + (data.vatNo ? data.vatNo : "");
      data.storeLoadCode = "%" + (data.storeLoadCode ? data.storeLoadCode : "");
      data.clothChecker = "%" + (data.clothChecker ? data.clothChecker : "");
      data.clothCheckTime = null;
      getFinish(
        Object.assign(data, {
          rows: this.secondPage.pageSize,
          start: this.secondPage.currentPage,
          isPrinted: true,
          // clothState: this.form.clothState,
          cardType: 1,
          // delFlag: false,
        }),
        r_clothCheckTime_r
      ).then((res) => {
        this.secondC = res.data.records;
        this.secondC.forEach((item, i) => {
          item.index = i + 1;
        });
        this.secondPage.total = res.data.total;
        if (!this.secondC.length) this.tloading = false;
        setTimeout(() => {
          this.$nextTick(() => {
            if (this.secondC.length) {
              this.$refs.secondcrud.setCurrentRow();
              this.tloading = false;
            }
          });
        }, 200);
      });
    },
    del() {
      if (this.secondF.delFlag) {
        // true 未已删除，则为恢复数据
        this.$tip.cofirm("是否确定恢复选中的数据?").then(() => {
          this.wLoading = true;
          this.selectList.forEach((item, i) => {
            item.delFlag = false;
            updateFinishedRCV(item).then((res) => {
              if (i == this.selectList.length - 1) {
                this.$tip.success("恢复成功！");
                this.query();
                setTimeout(() => {
                  this.wLoading = false;
                }, 200);
              }
            });
          });
        });
      } else {
        // false 未未删除，则删除数据
        this.$tip.cofirm("是否确定删除选中的数据?").then(() => {
          this.wLoading = true;
          this.selectList.forEach((item, i) => {
            item.delTime = this.$getNowTime("datetime");
            item.delUser = this.$store.state.userOid;
            del(item.cardId).then((res) => {
              if (i == this.selectList.length - 1) {
                this.$tip.success("删除成功！");
                this.query();
                setTimeout(() => {
                  this.wLoading = false;
                }, 200);
              }
            });
          });
        });
      }
    },
    cellClick(val) {
      this.detail = val;
    },
    selectionChange(val) {
      this.selectList = val;
    },
    splitNote() {
      this.splitLoading = true;
      getFinish({
        sourceCardId: this.detail.cardId,
      }).then((res) => {
        this.splitDlg = true;
        this.splitF = Object.assign(this.detail, {
          vatNoNew: this.detail.vatNo,
          pidNoNew: this.detail.pidNo + 100 + res.data.total,
          productNoNew:
            this.detail.vatNo + (this.detail.pidNo + 100 + res.data.total),
          netWeightNew: 0,
          netWeightNewLbs: 0,
        });
        this.splitLoading = false;
      });
    },
    splitSubmit() {
      if (!this.splitF.netWeightNew || !this.splitF.netWeight) {
        this.$tip.warning("重量不能为空!");
        return;
      }
      this.splitLoading = true;
      this.splitF.grossWeight -= this.splitF.netWeightNew;
      this.splitF.grossWeightLbs -= this.splitF.netWeightNewLbs;
      let oldYardLength = this.splitF.yardLength;
      this.splitF.yardLength =
        (this.splitF.netWeight /
          (this.splitF.netWeight + this.splitF.netWeightNew)) *
        oldYardLength;
      updateFinished(this.splitF).then((res) => { });
      let data = JSON.parse(JSON.stringify(this.splitF));
      data.sourceCardId = this.splitF.cardId;
      data.cardId = "";
      data.netWeight = data.netWeightNew;
      data.netWeightLbs = data.netWeightNewLbs;
      data.grossWeight =
        data.netWeight +
        (data.weightUnit == "KG" ? data.paperTube : data.paperTube / 2.2046);
      data.grossWeightLbs =
        data.netWeightLbs +
        (data.weightUnit == "KG" ? data.paperTube * 2.2046 : data.paperTube);
      data.yardLength =
        (data.netWeight / (this.splitF.netWeight + data.netWeight)) *
        oldYardLength;
      data.productNo = data.productNoNew;
      data.pidNo = data.pidNoNew;
      data.qcTakeOut = 0;
      addFinished(data).then((res) => {
        if (res.data.code == 200) {
          this.$tip.success("保存成功!");
        } else {
          this.$tip.error("保存成功!");
        }
        setTimeout(() => {
          this.query();
          this.visible = false;
          this.splitDlg = false;
          this.splitLoading = false;
        }, 200);
      });
    },
  },
  updated() { },
  created() { },
  mounted() { },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
>>>.avue-group--header {
  display: none;
}

.btn-right-title {
  font-size: 17px;
  margin-left: 1em;
}

#modifyFinished {
  .el-checkbox {
    margin-right: 0px;
  }

  .el-transfer-panel__list.is-filterable {
    height: calc(100vh - 300px) !important;
    text-align: left !important;
    text-indent: 1em !important;
  }

  .el-transfer-panel__body {
    height: calc(100vh - 270px) !important;
  }

  .el-transfer-panel {
    width: 450px;
  }

  .el-transfer-panel .el-checkbox__inner {
    height: 18px;
    width: 18px;
  }

  .el-transfer-panel__item.el-checkbox .el-checkbox__label {
    padding-left: 34px;
    line-height: 35px;
  }

  .el-transfer-panel__item {
    padding-left: 0;
    text-indent: 0.5em;
  }

  .el-transfer-panel .el-checkbox__inner::after {
    height: 8px;
    width: 4px;
    left: 6px;
  }

  .el-transfer-panel__filter .el-input__inner {
    font-size: 15px;
  }

  .el-transfer-panel__filter {
    margin: 5px;
  }

  .el-tag--mini {
    height: 28px !important;
    // padding: 0 5px;
    line-height: 28px !important;
    font-size: 14px;
  }

  .el-input--mini .el-input__inner {
    height: 33px;
    line-height: 33px;
  }
}
</style>
