<!--
 * @Author: Lyl
 * @Date: 2021-03-24 14:15:12
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-06 09:07:25
 * @Description: 
-->
<template>
  <div id="ityInventory">
    <view-container title="库存查询" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="getData">{{
            this.$t("public.query")
        }}</el-button>
        <el-button type="primary" @click="outTransit">导出</el-button>
        <el-button type="warning" :disabled="!form.type" @click="handleCreateInventory">生成盘点清单</el-button>
        <div style="display: inline; float: right; margin-right: 1.25rem">
          <span>过滤空库存</span>
          <el-switch v-model="filterEmpty" @change="getData"> </el-switch>
        </div>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row>
        <el-col :span="14" :element-loading-text="loadLabel" v-loading="loading">
          <view-container title="材料信息" >
              <avue-crud ref="materialsCrud" :option="crudOp" :data="crud" :page.sync="page" @on-load="getData"
                 @current-row-change="cellClick"></avue-crud>
          </view-container>
        </el-col>
        <!-- <el-col :span="10" v-if="form.type == 'WJ'">
          <view-container title="库存信息">
            <avue-crud ref="crudWjDlt" :option="wjDltOp" :data="wjDlt">
              <template slot="yinType" slot-scope="scope">
                <div style="margin-top: -0.1875rem;">
                  <el-tag :type="(scope.row.yinType == '入仓') ? 'success' : 'danger'" size="medium">
                    {{ scope.row.yinType }}</el-tag>
                </div>
              </template>
              <template slot="poqty" slot-scope="scope">
                <div style="color: #008000;" v-if="(scope.row.yinType == '入仓')">+{{ scope.row.poqty }}</div>
                <div style="color: #f20;" v-else>-{{ scope.row.poqty }}</div>
              </template>
            </avue-crud>
            <div style="padding: .4375rem;">
              剩余数量:{{chooseData.stock}} 
            </div>
          </view-container>
        </el-col> -->
        <el-col :span="10">
          <view-container title="库存信息">
            <avue-crud ref="materialsItyCrud" @row-dblclick="handleRowDBLClick" :option="materialsItyOp" :data="chooseData.nodes"></avue-crud>
          </view-container>
        </el-col>
      </el-row>
      <el-drawer title="库存出入明细" :visible.sync="drawerVisible" append-to-body>
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
  getViewHardwareStockDetails
} from "./api";
import { getXDicT } from "@/config/index";
import {
  formOp,
  crudOp,
  finishedCrud,
  sxOp,
  noteCrud,
  wjDetailcrudOp,
  materialsItyCrudOp
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
      wjDltOp: wjDetailcrudOp(this),
      wjDlt: [],
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
      outData: [],
      materialsItyOp: {},
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
      this.wjDlt=[];
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      let query = JSON.parse(JSON.stringify(this.form));
      this.materialsItyOp = materialsItyCrudOp(this);
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
      query.yarnsCard = "!^%" + (query.yarnsCard || "");
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
      query.proName = "!^%" + (query.proName || "");
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
        this.outData = data;
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
                    : this.form.type == "SB"
                      ? "equipmentId" : "accessoriesId", "nodes"
        );
        // if (this.form.type == "WJ") {
        //   this.crud = data;
        //   this.crud.forEach((item, i) => {
        //     item.index = i + 1;
        //     item.chemicalIds = item.accessoriesId;
        //     item.chemicalNames = item.accessoriesName;
        //   });
        //   return;
        // }
        group.forEach((item, i) => {
          item.nodes.sort((a, b) =>
            a[this.typeObj.sort] > b[this.typeObj.sort] ? -1 : 1
          );
          item.index = i + 1;
          item.yarnsName = item.nodes[0].yarnsName;
          item.chemicalIds =
            item.nodes[0].accessoriesId ||
            item.nodes[0].chemicalId ||
            item.nodes[0].officeId || item.nodes[0].equipmentId || item.nodes[0].yarnsId
          item.chemicalNames =
            item.nodes[0].accessoriesName ||
            item.nodes[0].chemicalName ||
            item.nodes[0].officeName || item.nodes[0].equipmentName || item.nodes[0].yarnsName
          item.weightUnit = item.nodes[0].weightUnit;
          item.proName = item.nodes[0].proName;
          item.clothWeight = 0;
          item.customerName = item.nodes[0].customerName;
          item.fabricName = item.nodes[0].fabricName;
          item.custCode = item.nodes[0].custCode;
          item.fabName = item.nodes[0].fabName;
          item.colorCode = item.nodes[0].colorCode;
          item.colorName = item.nodes[0].colorName;
          if (!item.weight) item.weight = 0;
          if (!item.stock) item.stock = 0;
          item.nodes.forEach((child, j) => {
            child.index = item.index + "-" + (j + 1);
            child.weight = child.weight ? child.weight.toFixed(2) : 0;
            child.stock = child.stock ? child.stock.toFixed(2) : 0;
            child.clothWeight = child.clothWeight
              ? child.clothWeight.toFixed(2)
              : 0;
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
      }).finally(() => {
        if(this.crud.length) this.$refs.materialsCrud.setCurrentRow(this.crud[0]);
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
        var template = new XlsxTemplate(exlBuf);
        var sheetNumber = "Sheet1";
        let data = [];
        // if (this.form.type == "WJ") {
        //   data = this.crud;
        // }else{
          this.crud.forEach((item, i) => {
            item.nodes.forEach((node) =>{
              node.$weightUnit = item.$weightUnit;
            })
            data = data.concat(JSON.parse(JSON.stringify(item.nodes)));
          });
        // }
        data.forEach((item, i) => {
          item.$yinStatus =  item.yinStatus == '1' ?  "合格" : " 不合格",
          item.$weightUnit =   item.$weightUnit || item.weightUnit,
          item.chemicalId =
            item.accessoriesId ||
            item.chemicalId ||
            item.officeId || item.equipmentId || item.yarnsId
          item.chemicalName =
            item.accessoriesName ||
            item.chemicalName ||
            item.officeName || item.equipmentName || item.yarnsName
          item.stock = item.weight || item.stock;
          item.locationCode = item.locationCode || item.storageNo ;
          item.index = i + 1;
        });
        var values = {
          arr: data,
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
              data = null;
              this.$tip.success("导出成功!");
              this.loading = false
            }, 500);
          });
          // });
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
      let type = this.form.type;
      if (!["SX", "RHL", "RLL", "WJ", "FL", "SB"].includes(type)) return;
      this.drawerVisible = true;
      await this.$nextTick();
      let params = {};
      switch (type) {
        case "SX":
          params = {
            yarnsId: row.yarnsId,
            yarnsCard: row.yarnsCard,
            batchNo: row.batchNo,
            batId: row.batId,
            locationCode: row.locationCode,
          };
          break;
        case "RHL":
          params = {
            materialId: row.chemicalId,
            batchNo: row.batchNo,
            storageNo: row.storageNo,
          };
          break;
        case "RLL":
          params = {
            materialId: row.chemicalId,
            batchNo: row.batchNo,
            storageNo: row.storageNo,
          };
          break;
        case "WJ":
          params = {
            materialId: row.accessoriesId,
            batchNo: row.batchNo,
            storageNo: row.storageNo,
          };
          break;
        case "FL":
          params = {
            materialId: row.chemicalId,
            batchNo: row.batchNo,
            storageNo: row.storageNo,
          };
          break;
        case "SB":
          params = {
            materialId: row.chemicalId,
            storageNo: row.storageNo,
            batchNo: row.batchNo
          }
          break;
      }
      this.$refs.whseDtlRef.initData(type, params);
    },
    cellClick(val) {
      this.chooseData = val;
      // if (this.form.type == "WJ") {
      //   let param = {
      //     batchNo: val.batchNo,
      //     materialNum: val.accessoriesId
      //   };
      //   getViewHardwareStockDetails(param).then((res) => {
      //     this.wjDlt = res.data;
      //     this.wjDlt.map((e, i) => {
      //       e.index = i + 1;
      //     })
      //   })
      // }
    },
  },
  created() {
   
  },
  updated() {
    this.$nextTick(() => {
      if (this.crud.length) {
        this.$refs["materialsCrud"].doLayout();
        this.$refs["materialsItyCrud"].doLayout();
      }
    });
  },
  mounted() { },
  beforeDestroy() { },
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