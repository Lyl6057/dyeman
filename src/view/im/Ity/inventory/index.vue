<!--
 * @Author: Lyl
 * @Date: 2021-03-24 14:15:12
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-03-28 15:16:23
 * @Description: 
-->
<template>
  <div id="ityInventory">
    <view-container
      title="库存查询"
      :element-loading-text="loadLabel"
      v-loading="loading"
    >
      <div class="btnList">
        <el-button type="primary" @click="getData">{{
          this.$t("public.query")
        }}</el-button>
        <el-button
          type="primary"
          @click="outExcel"
          :disabled="form.type == 'CPB'"
          >导出</el-button
        >
        <el-button
          type="warning"
          :disabled="!form.type"
          @click="handleCreateInventory"
          >生成盘点清单</el-button
        >
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="getData"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>
<script>
import {
  getSx,
  getSxList,
  getRhl,
  getRll,
  getRhlList,
  getRllList,
  getCpb,
  getCpbList,
  fetchCheckHasExistByNow,
  createSnapshot2StockType
} from "./api";
import { getDIC, getDicT, getXDicT } from "@/config/index";
import { formOp, crudOp, formTemOp, finishedCrud, sxOp, } from "./data";
import XlsxTemplate from "xlsx-template";
import JSZipUtils from "jszip-utils";
import saveAs from "file-saver";
export default {
  name: "",
  components: {},
  data() {
    return {
      dialogVisible: false,
      loading: false,
      loadLabel: "拼命加载中",
      page: {
        pageSizes: [50, 100, 200, 500, 1000],
        pageSize: 200,
        currentPage: 1,
        total: 0,
      },
      formOp: formOp(this),
      form: {
        type: "SX",
      },
      crudOp: crudOp(this),
      crud: [],
      detail: {},
      chooseData: {},
      isAdd: false,
      allData: [],
      getFun: null,
      getList: null,
      chemicalData: getXDicT("BasChemicalmatNew"), // 化工原料
      pigmentData: getXDicT("basPigment"), // 颜料
      typeObj: {
        sort: null,
      },
    };
  },
  watch: {},
  methods: {
    //  生成盘点清单
    async handleCreateInventory(){
      let type = this.form.type;
      if(!type) return  this.$tip.warning("请选择生成的材料类型~");
      let params = {
          stockType: type
      }
      let hasExist = await fetchCheckHasExistByNow(params).then(res => res.data.data);
      console.log("has exist", hasExist)
      if(hasExist){
        this.$tip.cofirm("当天已存在库存快照,是否进行覆盖").then(res => {
          this.validAfterCreateSnapshot(params)
        })
      }else{
         this.validAfterCreateSnapshot(params)
      }
    },
    validAfterCreateSnapshot(params){
      this.loading = true;
      createSnapshot2StockType(params).then(res => {
        if(res.data.code == 200){
          this.$tip.success("生成成功~")
        }else{
          this.$tip.error(res.data.msg)
        }
      }).finally(_ => {
        this.loading = false;
      })
    },
    getData() {
      this.loading = true;
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      switch (this.form.type) {
        case "SX":
          this.getFun = getSx;
          this.getList = getSxList;
          this.crudOp = sxOp(this);
          // this.typeObj.sort = 'yarnsId'
          break;
        case "RHL":
          this.getFun = getRhl;
          this.getList = getRhlList;
          this.crudOp = crudOp(this);
          // this.typeObj.sort = 'chemicalId'
          break;
        case "RLL":
          this.getFun = getRll;
          this.getList = getRllList;
          this.crudOp = crudOp(this);
          // this.typeObj.sort = 'chemicalId'
          break;
        case "CPB":
          this.getFun = getCpb;
          this.getList = getCpbList;
          this.crudOp = finishedCrud(this);
          this.typeObj.sort = "productNo";
          this.form.productNo = "!^"; // 成品编号升序
          break;
        default:
          this.crud = [];
          this.loading = false;
          return;
      }
      let query = JSON.parse(JSON.stringify(this.form));
      query.yarnsId = "!^%" + (query.chemicalId || "");
      this.getFun(
        Object.assign(query, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((res) => {
        this.page.total = res.data.total;
        let group = this.$grouping(
          res.data.records,
          this.form.type == "SX"
            ? "yarnsId"
            : this.form.type == "CPB"
            ? "vatNo"
            : "chemicalId"
        );
        group.forEach((item, i) => {
          item.children.sort((a, b) => (a.batchNo > b.batchNo ? 1 : -1));
          item.index = i + 1;
          item.yarnsName = item.children[0].yarnsName;
          item.chemicalName = item.children[0].chemicalName;
          item.weightUnit = item.children[0].weightUnit;
          if (!item.weight) item.weight = 0;
          if (!item.stock) item.stock = 0;
          item.children.forEach((child, j) => {
            child.index = item.index + "-" + (j + 1);
            child.weight = child.weight ? child.weight.toFixed(2) : 0;
            child.stock = child.stock ? child.stock.toFixed(2) : 0;
            child.yarnsId = "";
            child.yarnsName = "";
            child.chemicalId = "";
            child.chemicalName = "";
            item.weight += Number(child.weight) || Number(child.stock);
          });
          item.weight = item.weight.toFixed(2);
          item.stock = item.weight;
        });
        this.crud = group;
        this.crud.length === 0 ? (this.loading = false) : "";
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          if (this.crud.length - 1 === i) {
            this.loading = false;
          }
        });
      });
    },
    async outExcel() {
      this.loading = true;
      try {
        //获得Excel模板的buffer对象
        const exlBuf = await JSZipUtils.getBinaryContent(
          "./static/xlxsTemplate/inventory.xlsx"
        );
        // Create a template
        var template = new XlsxTemplate(exlBuf);
        // Replacements take place on first sheet
        var sheetNumber = "Sheet1";
        // Set up some placeholder values matching the placeholders in the template
        let data = {
          chemicalId: "!^",
          yarnsId: "!^",
          productNo: "!^",
        };
        this.getList().then((res) => {
          this.crud = res.data;
          this.crud.sort((a, b) =>
            a[this.typeObj.sort] > b[this.typeObj.sort] ? -1 : 1
          );
          this.crud.forEach((item, i) => {
            item.chemicalId = item.chemicalId || item.yarnsId;
            item.chemicalName = item.chemicalName || item.yarnsName;
            item.stock = item.weight || item.stock;
            item.index = i + 1;
          });
          var values = {
            arr: this.crud,
          };
          this.$nextTick(() => {
            template.substitute(sheetNumber, values);
            // Get binary data.
            var out = template.generate({ type: "blob" });
            let _this = this;
            var fun1 = function () {
              return new Promise((resolve, reject) => {
                saveAs(out, _this.form.$type + "库存明细" + ".xlsx");
                resolve();
              });
            };
            fun1().then((res) => {
              setTimeout(() => {
                this.$tip.success("导出成功!");
                this.loading = false;
                this.getData();
              }, 1000);
            });
          });
        });
      } catch (e) {
        console.log(e);
      }

      // return;
      // this.crudOp.title = this.form.$type + "库存明细";
      // this.$refs.crud.rowExcel();
    },
    add() {
      this.isAdd = false;
      this.dialogVisible = true;
    },
    handleRowDBLClick(val) {
      this.isAdd = true;
      this.detail = this.chooseData;
      this.dialogVisible = true;
    },
    cellClick(val) {
      this.chooseData = val;
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.chooseData.whseMaterialopeningoid) {
        this.crud.splice(this.chooseData.index - 1, 1);
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
        }
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
      } else {
        this.$tip
          .cofirm(
            "是否确定删除材料編號为 【 " +
              this.chooseData.materialId +
              this.$t("iaoMng.delTle2"),
            this,
            {}
          )
          .then(() => {
            this.chooseData.openingQty = 0;
            this.chooseData.oldpooccupyqty = 0;
            // update(this.chooseData).then((res) => {
            //   if (res.data.code === 200) {
            //     updateStock({
            //       materialId: this.form.materialId,
            //       unitId: this.form.unitId,
            //     }).then((Rres) => {
            //       del(this.chooseData.whseMaterialopeningoid)
            //         .then((delRes) => {
            //           if (delRes.data.code === 200) {
            //             this.$tip.success(this.$t("public.sccg"));
            //             this.getData();
            //           } else {
            //             this.$tip.error(this.$t("public.scsb"));
            //           }
            //         })
            //         .catch((err) => {
            //           this.$tip.error(this.$t("public.scsb"));
            //         });
            //     });
            //   }
            // });
          })
          .catch((err) => {
            this.$tip.warning(this.$t("public.qxcz"));
          });
      }
    },
    temClose(val) {
      if (val) {
        this.getData();
      }
      this.dialogVisible = false;
    },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[0].click();
    },
  },
  created() {},
  updated() {
    if (this.crud.length) {
      this.$nextTick(() => {
        this.$refs["crud"].doLayout();
      });
    }
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#ityInventory
  .el-table__placeholder
    display none
  .el-dialog
    margin-top 0 !important
    height 100%
    margin 0 !important
    // background-color: rgb(2, 26, 60);
    overflow hidden !important
</style>