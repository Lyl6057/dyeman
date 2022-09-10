<!--
 * @Author: Lyl
 * @Date: 2021-01-30 10:05:32
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-10 15:03:04
 * @Description:
-->
<template>
  <div id="codeCard" :element-loading-text="$t('public.loading')" v-loading="wLoading">
    <view-container title="成品码卡信息">
      <el-row class="btnList">
        <el-button type="primary" @click="dialogVisible = true" :disabled="!detail.cardId">{{ this.$t("public.update")
        }}</el-button>
        <el-button type="primary" @click="query">{{
            this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="print" :disabled="!selectList.length">打印</el-button>
        <el-button type="primary" @click="batchEdit" :disabled="!selectList.length">修改载具</el-button>
        <el-select v-model="printType" placeholder="打印模板">
          <el-option label="SPOWER 通用模板" value="1" />
          <el-option label="KANE TOP 定制码卡" value="2" />
        </el-select>
      </el-row>
      <el-row class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
      </el-row>
      <el-row class="crudBox">
        <avue-crud ref="crud" 
          :option="crudOp" 
          :data="crud" 
          :page.sync="page" 
          v-loading="loading" 
          @on-load="query"
          @row-dblclick="handleRowDBLClick" 
          @current-row-change="cellClick" 
          @selection-change="selectionChange">
        </avue-crud>
      </el-row>
      <el-dialog id="colorMng_Dlg" :visible.sync="dialogVisible" width="70%" append-to-body
        :close-on-click-modal="false" :close-on-press-escape="false">
        <el-tabs type="border-card" v-model="tabs" v-loading="historyLoading">
          <el-tab-pane label="修改" name="update">
            <div class="btnList">
              <el-button type="success" @click="save" :disabled="detail.clothState == 9 || detail.whseVouch == 9">{{
                  this.$t("public.save")
              }}</el-button>
              <el-button type="primary" @click="weighing">称重</el-button>
              <el-button type="warning" @click="dialogVisible = false">{{
                  this.$t("public.close")
              }}</el-button>
              <div style="float: right;margin-right: 17px;">
                电子秤读取： <el-switch v-model="useWeight" active-text="启用" inactive-text="停用"></el-switch>
              </div>
            </div>
            <div class="formBox">
              <avue-form ref="form" :option="dlgOp" v-model="detail"></avue-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="历史记录" name="history">
            <div class="btnList">
              <el-button type="primary" @click="recover">恢复</el-button>
              <el-button type="warning" @click="dialogVisible = false">{{
                  this.$t("public.close")
              }}</el-button>
            </div>
            <div class="formBox">
              <avue-crud ref="dlgCrud" :option="historyOp" :data="history" @current-row-change="historyCellClick"/>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
      <el-dialog id="normal_Dlg" title="请输入新的载具编号" :visible.sync="loadDialogVisible" width="30%" center append-to-body
        style="text-align: center">
        <el-input v-model="newLoad" placeholder="新载具编号(new vehicle number)"
          style="width: 50%; margin: 0 auto; text-align: center"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="loadDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="loadSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { mainForm, mainCrud, dlgForm, dlgCrud } from "./data";
import {
  get,
  update,
  del,
  updateNote,
  getCodeHistory,
} from "./api";
import { getCheckItem } from "../finalCard/api";
export default {
  name: "",
  components: {},
  data() {
    return {
      formOp: mainForm(this),
      form: {
        weaveJobFk: "",
        clothState: "",
        // productNo: "",
      },
      crudOp: mainCrud(this),
      crud: [],
      page: {
        pageSize: 100,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      historyPage: {
        pageSize: 20,
        pageSizes: [20, 50, 100, 200, 500],
        total: 0,
      },
      loading: false,
      eloading: false,
      dialogVisible: false,
      detail: {
        weightUnit: "KG",
      },
      printType: '1',
      spowerClient: "",
      weight: 0,
      changeList: [],
      wLoading: false,
      selectList: [],
      options: [],
      oldData: {},
      sort: {},
      checkSum: 0,
      output: {},
      dlgOp: dlgForm(this),
      historyOp: dlgCrud(this),
      history: [],
      weightUnit: "KG",
      tabs: "update",
      historyCheck: {},
      loadDialogVisible: false,
      newLoad: "",
      weighData: {},
      useWeight: false,
      historyLoading: false
    };
  },
  watch: {},
  methods: {
    query() {
      this.wLoading = true;
      this.crud = [];
      let r_clothCheckTime_r = "";
      if (this.form.clothCheckTime && this.form.clothCheckTime.length) {
        r_clothCheckTime_r = `!%5E%5b${this.form.clothCheckTime[0]} 07:30:00~${this.form.clothCheckTime[1]} 07:30:00%5d`;
      } else {
        r_clothCheckTime_r = "!%5E";
      }
      let params = {
        vatNo: "%" + (this.form.vatNo || ''),
        storeLoadCode: "%" + (this.form.storeLoadCode || ''),
        clothChecker: "%" + (this.form.clothChecker || ''),
        custCode: this.form.custCode || '',
        pidNo: this.form.pidNo || '',
        clothState: this.form.clothState || '',
      }
      get(
        Object.assign(params, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          isPrinted: true,
          cardType: 1,
          delFlag: false,
        }),
        r_clothCheckTime_r
      ).then((res) => {
        this.crud = res.data.records;
        this.page.total = res.data.total;
      }).finally(async (_) =>{
        setTimeout(() => {
          this.wLoading = false;
        }, 200);
      })
    },
    async handleRowDBLClick(val) {
      this.historyLoading = true;
      this.detail = val;
      this.dialogVisible = true;
      this.weightUnit = val.weightUnit;
      if (this.detail.weightUnit == "KG") {
        this.dlgOp.column[4].disabled = false;
        this.dlgOp.column[7].disabled = true;
      } else {
        this.dlgOp.column[4].disabled = true;
        this.dlgOp.column[7].disabled = false;
      }
      if (this.detail.cardId != null) {
        this.historyLoading = true;
        getCodeHistory({
          productCardFk: this.detail.cardId,
        }).then((res) => {
          this.history = res.data.sort((a, b) => {
            return a.clothCheckTime > b.clothCheckTime ? -1 : 1;
          });
        }).finally((_) =>{
          
        })
      }
      await this.$nextTick();
      setTimeout(() => {
        this.historyLoading = false;
      }, 200);
    },

    weighing() {
      if (!this.spowerClient || this.spowerClient.readyState == 3) {
        this.$tip.error("称重应用未启动，请启动后重新进入此页面!");
        return;
      } else {
        if (!this.weighData.weightUnit) {
          this.$tip.error("电子秤未连接!");
          return;
        }
        this.weighData.weightUnit == "KG" ? this.detail.netWeight = this.weighData.netWeight : this.detail.netWeightLbs = this.weighData.netWeightLbs;
      }
    },
    save() {
      if (!this.detail.netWeight || !this.detail.netWeightLbs) {
        this.$tip.error("重量不能为0!");
        this.wLoading = false;
        return;
      }
      this.wLoading = true;
      this.detail.productNo =
        this.detail.vatNo + this.$preFixInt(this.detail.pidNo, 3);
      update(this.detail).then(async (res) => {
        if (res.data.code == 200) {
            await this.query();
            this.wLoading = false;
            this.dialogVisible = false;
            this.$tip.success(this.$t("public.bccg"));
        } else {
          this.wLoading = false;
          this.$tip.error(res.data.msg);
        }
      });
      // });
    },
    del() {
      this.$tip.cofirm("是否确定删除选中的数据?").then(() => {
        this.wLoading = true;
        this.selectList.forEach((item, i) => {
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
    },
    recover() {
      this.$tip.cofirm("是否确定恢复到选中的数据?").then(() => {
        this.loading = true;
        this.detail.grossWeight = this.historyCheck.grossWeight;
        this.detail.grossWeightLbs = this.historyCheck.grossWeightLbs;
        this.detail.netWeight = this.historyCheck.netWeight;
        this.detail.netWeightLbs = this.historyCheck.netWeightLbs;
        this.detail.realGramWeight = this.historyCheck.realGramWeight;
        this.detail.actualSideBreadth = this.historyCheck.actualSideBreadth;
        this.detail.yardLength = this.historyCheck.yardLength;
        this.detail.clothChecker = this.historyCheck.clothChecker;
        update(this.detail).then((res) => {
          if (res.data.code == 200) {
            setTimeout(() => {
              this.dialogVisible = false;
              this.loading = false;
              this.query();
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          } else {
            this.wLoading = false;
            this.$tip.error(res.data.msg);
          }
        });
      });
    },
    cellClick(val) {
      this.detail = val;
     
    },
    historyCellClick(val) {
      this.historyCheck = val;
    },
    setCz() {
      this.spowerClient = this.$store.state.spowerClient;
      let _this = this;
      _this.spowerClient.onmessage = function (e) {
        let weight = e.data.indexOf(":") != -1 ? Number(e.data.replace(/[^\d.]/g, "")) : e.data;
        let unit = e.data.split(":")[1];
        _this.weighData.weightUnit = unit
        weight = Number((parseInt(Number(weight) * 10) / 10).toFixed(1));
        unit == "KG" ? _this.weighData.netWeight = weight : _this.weighData.netWeightLbs = weight;
        if (_this.useWeight) {
          _this.weighData.weightUnit == "KG" ? _this.detail.netWeight = _this.weighData.netWeight : _this.detail.netWeightLbs = _this.weighData.netWeightLbs;
        }
      };
    },
    codeLength() {
      if (
        !this.detail.realGramWeight ||
        !this.detail.actualSideBreadth ||
        !this.detail.netWeight ||
        this.detail.realGramWeight == 0
      ) {
        return;
      }
      let gramWeight, breadth;

      if (this.detail.gramWeightUnit == "Kg") {
        // 默认是 g
        gramWeight = Number(this.detail.realGramWeight);
      } else {
        gramWeight = Number(this.detail.realGramWeight / 1000);
      }

      if (this.detail.widthUnit != "INCH") {
        // 默认是 inch
        breadth = Number(this.detail.actualSideBreadth / 100);
      } else {
        breadth = Number((this.detail.actualSideBreadth * 2.54) / 100);
      }

      let weight = this.detail.netWeight;
      // gramWeight 单位为 g/m , breadth 单位为 inch 需要 * 2.54 转换成cm / 100 转换成 m
      this.detail.yardLength = parseInt(
        Number(weight / gramWeight / breadth) * 1.0936
      );
    },
    
    selectionChange(list) {
      this.selectList = list;
    },

    batchEdit() {
      this.loadDialogVisible = true;
    },
    
    loadSubmit() {
      if (!this.newLoad) {
        this.$tip.error("新载具编号不能为空!");
        return;
      }
      if (!this.selectList.length) {
        this.$tip.error("请选择要修改的数据!");
        return;
      }
      this.wLoading = true;
      this.selectList.forEach((item, i) => {
        item.storeLoadCode = this.newLoad;
        updateNote(item).then((res) => {
          if (i == this.selectList.length - 1) {
            this.form.storeLoadCode = this.newLoad;
            this.query();
            this.loadDialogVisible = false;
            this.$tip.success("修改成功!");
          }
        });
      });
    },
    print() {
      if (!this.spowerClient || this.spowerClient.readyState == 3) {
        this.setCz();
        this.$tip.error("打印程序离线，请启动服务!");
        return;
      }
      this.selectList.forEach((item, i) => {
        if (this.printType == 1) {
          this.spowerClient.send("print=finishCard:" + item.cardId);
        } else {
          this.spowerClient.send("print= finishCardCustomer:" + item.cardId);
        }
        if (i == this.selectList.length - 1) {
          this.$tip.success("已发送全部打印请求!");
        }
      });
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["crud"].doLayout();
    });
  },
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      vm.setCz();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.spowerClient = null;
    next();
  },
  created() { },
  mounted() {
    getCheckItem().then((res) => {
      let data = res.data.filter((item) => {
        return item.checkType != 2;
      });
      this.dlgOp.column[this.dlgOp.column.length - 1].dicData = data;
    });
  },
  beforeDestroy() { },
};
</script>
<style lang='stylus'>
#codeCard
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
