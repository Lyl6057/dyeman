<!--
 * @Author: Lyl
 * @Date: 2021-03-24 14:15:12
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-20 08:00:40
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
        <el-button type="primary" @click="outTransit">导出</el-button>
        <el-button
          type="warning"
          :disabled="!form.type"
          @click="handleCreateInventory"
          >生成盘点清单</el-button
        >
        <div style="display: inline; float: right; margin-right: 20px">
          <span>过滤空库存</span>
          <el-switch v-model="filterEmpty" @change="getData"> </el-switch>
        </div>
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
          @on-load="getData"
          @row-dblclick="handleRowDBLClick"
          @current-row-change="cellClick"
        ></avue-crud>
      </div>

      <el-drawer
        title="库存出入明细"
        :visible.sync="drawerVisible"
        append-to-body
      >
        <whse-dtl ref="whseDtlRef"></whse-dtl>
      </el-drawer>
    </view-container>
  </div>
</template>
<script>
import {
  getSx,
  getSxList,
  getRhl,
  getFl,
  getWj,
  getXz,
  getFlList,
  getWjList,
  getXzList,
  getRll,
  getRhlList,
  getRllList,
  getCpb,
  getCpbList,
  getNote,
  getNoteList,
  getEquipment,
  getEquipmentList,
  fetchCheckHasExistByNow,
  createSnapshot2StockType,
} from "./api";
import { getDIC, getDicT, getXDicT } from "@/config/index";
import {
  formOp,
  crudOp,
  formTemOp,
  finishedCrud,
  sxOp,
  noteCrud,
} from "./data";
import XlsxTemplate from "xlsx-template";
import JSZipUtils from "jszip-utils";
import saveAs from "file-saver";
import WhseDtl from "./whseDtl.vue";
import { fetchFineReportUrl } from "@/api/index";
export default {
  name: "",
  components: {
    "whse-dtl": WhseDtl,
  },
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
      type: "SX",
      drawerVisible: false,
      filterEmpty: true,
    };
  },
  watch: {},
  methods: {
    //  生成盘点清单
    async handleCreateInventory() {
      let type = this.form.type;
      if (!type) return this.$tip.warning("请选择生成的材料类型~");
      let params = {
        stockType: type,
      };
      let hasExist = await fetchCheckHasExistByNow(params).then(
        (res) => res.data.data
      );
      console.log("has exist", hasExist);
      if (hasExist) {
        this.$tip.cofirm("当天已存在库存快照,是否进行覆盖").then((res) => {
          this.validAfterCreateSnapshot(params);
        });
      } else {
        this.validAfterCreateSnapshot(params);
      }
    },
    validAfterCreateSnapshot(params) {
      this.loading = true;
      createSnapshot2StockType(params)
        .then((res) => {
          if (res.data.code == 200) {
            this.$tip.success("生成成功~");
          } else {
            this.$tip.error(res.data.msg);
          }
        })
        .finally((_) => {
          this.loading = false;
        });
    },
    getData() {
      this.loading = true;
      this.crud = [];
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      let query = JSON.parse(JSON.stringify(this.form));
      switch (this.form.type) {
        case "SX":
          this.getFun = getSx;
          this.getList = getSxList;
          this.crudOp = sxOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory.xlsx";
          break;
        case "RHL":
          this.getFun = getRhl;
          this.getList = getRhlList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory.xlsx";
          break;
        case "RLL":
          this.getFun = getRll;
          this.getList = getRllList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory.xlsx";
          break;
        case "CPB":
          this.getFun = getCpb;
          this.getList = getCpbList;
          this.crudOp = finishedCrud(this);
          this.typeObj.sort = "productNo";
          query.vatNo = "!^%"; // 成品编号升序
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory.xlsx";
          break;
        case "PB":
          this.getFun = getNote;
          this.getList = getNoteList;
          this.crudOp = noteCrud(this);
          this.typeObj.sort = "noteCode";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory_cloth.xlsx";
          break;
        case "FL":
          this.getFun = getFl;
          this.getList = getFlList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory.xlsx";
          break;
        case "WJ":
          this.getFun = getWj;
          this.getList = getWjList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory.xlsx";
          break;
        case "XZ":
          this.getFun = getXz;
          this.getList = getXzList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory.xlsx";
          break;
        case "SB":
          this.getFun = getEquipment;
          this.getList = getEquipmentList;
          this.crudOp = crudOp(this);
          this.typeObj.sort = "batchNo";
          this.typeObj.outAdr = "./static/xlxsTemplate/inventory.xlsx";
          break;
        default:
          this.crud = [];
          this.loading = false;
          return;
      }
      
      query.yarnsId = "!^%" + (query.chemicalId || "");
      query.batId = "!^%" + (query.batId || "");
      query.chemicalId = query.yarnsId;
      query.officeId = query.yarnsId;
      query.accessoriesId = query.yarnsId;
      query.yarnsName = "%" + (query.chemicalName || "");
      query.chemicalName = query.yarnsName;
      query.officeName = query.yarnsName;
      query.fabricName = query.yarnsName;
      query.accessoriesName = query.yarnsName;
      query.fabName = query.yarnsName;
      query.proName = "%" + (query.proName || "");
      query.vatNo = "!^%" + (query.vatNo || "");
      query.noteCode = "%" + (query.noteCode || "");
      query.storeLoadCode = "%" + (query.storeLoadCode || "");
      query.batchNo = "%" + (query.batchNo || "");
      this.getFun(
        Object.assign(query, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
          clothState: 2,
        })
      ).then((res) => {
        this.page.total = res.data.total;
        let data = this.filterEmpty
          ? res.data.records.filter((item) => {
              return item.weight || item.stock || item.clothWeight;
            })
          : res.data.records;
        let group = this.$grouping(
          data,
          this.form.type == "SX"
            ? "yarnsId"
            : this.form.type == "CPB"
            ? "vatNo"
            : this.form.type == "PB"
            ? "proName"
            : this.form.type == "RHL" || this.form.type == "RLL"
            ? "chemicalId"
            : this.form.type == "XZ"
            ? "officeId"
            :this.form.type == "SB"
            ? "equipmentId" : "accessoriesId"
        );
        group.forEach((item, i) => {
          item.children.sort((a, b) =>
            a[this.typeObj.sort] > b[this.typeObj.sort] ? 1 : -1
          );
          item.index = i + 1;
          item.yarnsName = item.children[0].yarnsName;
          item.chemicalId =
            item.children[0].accessoriesId ||
            item.children[0].chemicalId ||
            item.children[0].officeId|| item.children[0].equipmentId
          item.chemicalName =
            item.children[0].accessoriesName ||
            item.children[0].chemicalName ||
            item.children[0].officeName|| item.children[0].equipmentName
          item.weightUnit = item.children[0].weightUnit;
          item.proName = item.children[0].proName;
          item.clothWeight = 0;
          if (!item.weight) item.weight = 0;
          if (!item.stock) item.stock = 0;
          item.children.forEach((child, j) => {
            child.index = item.index + "-" + (j + 1);
            child.weight = child.weight ? child.weight.toFixed(2) : 0;
            child.stock = child.stock ? child.stock.toFixed(2) : 0;
            child.clothWeight = child.clothWeight
              ? child.clothWeight.toFixed(2)
              : 0;
            child.vatNo = "";
            child.yarnsId = "";
            child.yarnsName = "";
            child.chemicalId = "";
            child.chemicalName = "";
            child.proName = "";
            item.weight += Number(child.weight) || Number(child.stock);
            item.clothWeight += Number(child.clothWeight || 0);
          });
          item.weight = item.weight.toFixed(2);
          item.stock = item.weight;
          item.clothWeight = item.clothWeight.toFixed(2);
        });
        this.crud = group;
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
      }).finally(() =>{
        this.loading = false;
      })
    },
    outTransit() {
      switch (this.form.type) {
        case "CPB":
          this.handleOpenRpt("INVENTORY_PRODUCT_STOCK");
          break;
        case "PB":
          this.handleOpenRpt("INVENTORY_FINISHED_CLOTH");
          break;
        default:
          this.outExcel();
          return;
      }
    },
    // 打开报表 获取fineReport的数据
    handleOpenRpt(id) {
      let queryData = {
        module: "INV",
        id,
      };
      fetchFineReportUrl(queryData).then((res) => {
        if (res.data) {
          let url = res.data.url + "&clothState=2";
          let oA = document.createElement("a");
          oA.href = url;
          oA.target = "_blank";
          oA.click();
        } else {
          this.$tip.warning("报表不存在");
        }
      });
    },
    async outExcel() {
      this.loading = true;
      try {
        //获得Excel模板的buffer对象
        const exlBuf = await JSZipUtils.getBinaryContent(this.typeObj.outAdr);
        // Create a template
        var template = new XlsxTemplate(exlBuf);
        // Replacements take place on first sheet
        var sheetNumber = "Sheet1";
        // Set up some placeholder values matching the placeholders in the template
        this.getList().then((res) => {
          this.crud = res.data;
          this.crud.sort((a, b) =>
            a[this.typeObj.sort] > b[this.typeObj.sort] ? -1 : 1
          );
          this.crud.forEach((item, i) => {
            item.chemicalId =
              item.chemicalId ||
              item.yarnsId ||
              item.accessoriesId ||
              item.officeId||
              item.equipmentId;
            item.chemicalName =
              item.chemicalName ||
              item.yarnsName ||
              item.accessoriesName ||
              item.officeName || item.equipmentName
            item.stock = item.weight || item.stock;
            item.locationCode = item.locationCode || item.storageNo;
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
                
                this.getData();
              }, 1000);
            });
          });
        }).finally(() =>{
          this.loading = false;
        })
      } catch (e) {
        console.log(e);
      }
    },
    add() {
      this.isAdd = false;
      this.dialogVisible = true;
    },
    async handleRowDBLClick(row) {
      let idxs = row.index.toString().split("-");
      if (idxs.length == 1) return;
      let type = this.form.type;
      if (!["SX"].includes(type)) return;
      this.drawerVisible = true;
      await this.$nextTick();
      let params = {};
      switch (type) {
        case "SX":
          params = {
            yarnsId: this.crud[idxs[0] - 1].yarnsId,
            yarnsCard: row.yarnsCard,
            batchNo: row.batchNo,
            batId: row.batId,
            locationCode: row.locationCode,
          };
          break;
      }
      this.$refs.whseDtlRef.initData(type, params);
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
    this.$nextTick(() => {
      if (this.crud.length) {
        this.$refs["crud"].doLayout();
      }
    });
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#ityInventory {
  .el-table__placeholder {
    display: none;
  }

  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    // background-color: rgb(2, 26, 60);
    overflow: hidden !important;
  }
}
</style>