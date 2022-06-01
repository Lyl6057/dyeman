<!--
 * @Description: 入仓明细页面
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-01 16:19:03
-->
<template>
  <div id="whse-yarn-in-dtl-container">
    <view-container :title="imWkName" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button
          type="primary"
          @click="handleSave"
          :disabled="hasNotEdit"
        >{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="whseYarnInFormOp" v-model="whseMaterInFormData"></avue-form>
      </div>
      <el-row>
        <el-col :span="17">
          <view-container :title="imWkName + '明细'">
            <div class="btnList">
              <!-- <el-button type="primary">{{ this.$t("public.save") }}</el-button>
              <el-button type="warning">{{ this.$t("public.close") }}</el-button>-->
            </div>
            <div class="crudBox">
              <avue-crud
                ref="whseInDtlRef"
                :option="whseYarnInDtlCrudOp"
                :data="whseMaterInDtlaDataList"
                @row-click="handleDtlRowClick"
              ></avue-crud>
            </div>
          </view-container>
        </el-col>
        <el-col :span="7">
          <view-container title="货位资料">
            <div class="btnList">
              <el-button
                type="primary"
                :disabled="hasNotEdit"
                @click="handleAddDtla"
              >{{ this.$t("public.add") }}</el-button>
              <el-button
                type="danger"
                :disabled="hasNotEdit"
                @click="handleDelDtla"
              >{{ this.$t("public.del") }}</el-button>
            </div>
            <div class="crudBox">
              <avue-crud
                ref="whseInDtlaRef"
                :option="whseYarnInDtlaCrudOp"
                :data="whseMaterInDtlbDataList"
                @row-click="handleDtlaRowClick"
              ></avue-crud>
            </div>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
  </div>
</template>
<script>
import {
  whseYarnInFormOp,
  whseYarnInDtlCrudOp,
  whseYarnInDtlaCrudOp,
  dataPropEnum
} from "./data";
import {
  fetchWhseInDataListBySamNote,
  addWhseYarnInData,
  updateWhseYarnInData,
  batchSaveOrUpdateDtlDataList,
  batchSaveOrUpdateDtlaDataList,
  fetchWhseYarnInDtlAndDtlaData,
  batchRemoveDtlaDataById
} from "./api";
import { timeConversion } from "@/config/util";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import v1 from "uuid/v1";
export default {
  name: "whseInDtl",
  props: {
    imWkType: {
      type: String | Number,
      default: () => ""
    },
    imWkName: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      loading: false,
      loadLabel: "正在数据请求...",
      whseYarnInFormOp: whseYarnInFormOp(this),
      whseMaterInFormData: {},
      whseYarnInDtlCrudOp: whseYarnInDtlCrudOp(this),
      whseMaterInDtlaDataList: [],
      whseYarnInDtlaCrudOp: whseYarnInDtlaCrudOp(this),
      whseMaterInDtlbDataList: [],
      hasRefresh: false,
      // 当前选中明细索引
      dtlCurIdx: -1,
      // 当前选中货位明细索引
      dtlaCurIdx: -1,

      // 货位明细删除oid集合
      dtlaDelOids: []
    };
  },
  watch: {
    dtlCurIdx: {
      handler(value, oValue) {
        if (oValue != -1 && this.dtlaCurIdx != -1) {
          this.whseMaterInDtlaDataList[oValue].dtlBChildren[
            this.dtlaCurIdx
          ].$cellEdit = false;
        }
        if (value != -1) {
          this.dtlaCurIdx = -1;
          this.whseMaterInDtlbDataList = this.whseMaterInDtlaDataList[
            value
          ].dtlBChildren;
        }
      }
    }
  },
  computed: {
    hasNotEdit() {
      return this.whseMaterInFormData.stockState == "1";
    }
  },
  methods: {
    // 新增货位数据
    handleAddDtla() {
      let { matDtlbOidKey } = dataPropEnum[this.imWkType]; 
      this.whseMaterInDtlbDataList.push({
        isAdd: true,
        [matDtlbOidKey]: v1()
      });
    },
    // 删除货位明细数据
    handleDelDtla() {
      let { matDtlbOidKey } = dataPropEnum[this.imWkType]; 
      if (this.dtlaCurIdx == -1) return this.$tip.warning("请选择数据");
      let delRow = this.whseMaterInDtlbDataList.splice(this.dtlaCurIdx, 1)[0];
      if (delRow && !delRow.isAdd) {
        this.dtlaDelOids.push(delRow[matDtlbOidKey]);
      }
    },
    // 初始化数据
    initData() {
      this.dtlCurIdx = -1;
      this.dtlaCurIdx = -1;
      this.dtlaDelOids = [];
      this.whseMaterInDtlbDataList = [];
    },
    // 获取料入仓明细数据
    getWhseYarnInData(whseMatInFormData) {
      let { matOidKey,matFkKey } = dataPropEnum[this.imWkType]; 
      this.loading = true;
      this.whseMaterInFormData = whseMatInFormData;
      this.initData();
      fetchWhseYarnInDtlAndDtlaData({
        [matFkKey]: whseMatInFormData[matOidKey]
      },this.imWkType)
        .then(res => {
          this.whseMaterInDtlaDataList = res.data;
          this.whseMaterInDtlbDataList = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 保存数据
    async handleSave() {
      this.loading = true;
      let { matOidKey } = dataPropEnum[this.imWkType]; 
      // 保存主数据
      let oid = this.whseMaterInFormData[matOidKey];
      if (oid) {
        await updateWhseYarnInData(this.whseMaterInFormData,this.imWkType);
      } else {
        oid = await addWhseYarnInData(this.whseMaterInFormData,this.imWkType).then(
          res => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "whse_in" });
      }
      Object.assign(this.whseMaterInFormData, { [matOidKey]: oid });
      // 保存明细数据
      await this.saveDtlData(oid);
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("保存成功");
    },
    // 保存明细数据
    saveDtlData(whseMatInOid) {
      let { matFkKey,matDtlbOidKey,matDtlaOidKey, matDtlaFkKey, matCodeKey, matNameKey } = dataPropEnum[this.imWkType];
      let dtlaDataList = [];
      let dtlDataList = this.whseMaterInDtlaDataList.map((item, index) => {
        let inWeight = 0;
        // 货位数据
        item.dtlBChildren.forEach(aItem => {
          inWeight += (aItem.weight || 0)
          dtlaDataList.push({
            [matDtlbOidKey]: aItem[matDtlbOidKey],
            [matDtlaFkKey]: item[matDtlaOidKey],
            storageNo: aItem.storageNo,
            batchNo: item.batchNo,
            weight: aItem.weight,
          });
        });
        // 明细数据
        let tDtlData = {
          [matDtlaOidKey]: item[matDtlaOidKey],
          [matFkKey]: whseMatInOid,
          [matCodeKey]: item[matCodeKey],
          [matNameKey]: item[matNameKey],
          seqQty: index + 1,
          batchNo: item.batchNo,
          weight: inWeight,
          weightUnit: item.weightUnit,
          batId: this.whseMaterInFormData.suppId,
          checkStatus: item.checkStatus,
        };
        return tDtlData;
      });
      
      let dataListReqs = [
        batchSaveOrUpdateDtlDataList(dtlDataList,this.imWkType),
        batchSaveOrUpdateDtlaDataList(dtlaDataList,this.imWkType)
      ];
      if (this.dtlaDelOids.length > 0) {
        dataListReqs.push(batchRemoveDtlaDataById(this.dtlaDelOids,this.imWkType));
      }
      return Promise.all(dataListReqs);
    },
    // 明细点击事件
    handleDtlRowClick(row) {
      if (!this.hasNotEdit) {
        if (this.dtlCurIdx > -1) {
          this.whseMaterInDtlaDataList[this.dtlCurIdx].$cellEdit = false;
        }
        row.$cellEdit = true;
      }
      this.dtlCurIdx = row.$index;
    },
    // 货位码数据点击事件
    handleDtlaRowClick(row) {
      if (!this.hasNotEdit) {
        if (this.dtlaCurIdx > -1) {
          this.whseMaterInDtlbDataList[this.dtlaCurIdx].$cellEdit = false;
        }
        row.$cellEdit = true;
      }
      this.dtlaCurIdx = row.$index;
    },
    // 关闭
    handleClose() {
      this.$emit("close", this.hasRefresh);
    },
    // 新增数据初始化
    addAndCreateData(materSampleNote) {
      this.initData();
      this.createWhseYarnInData(materSampleNote);
      this.extractData(materSampleNote);
    },
    // 生成主表数据
    createWhseYarnInData(materSampleNote) {
      let { matOidKey } = dataPropEnum[this.imWkType];
      this.whseMaterInFormData = {
        [matOidKey]: "",
        yinType: "1",
        stockState: "0",
        registerNo: materSampleNote,
        finStatus: "0",
        yinStatus: "1",
        yinDate: timeConversion(new Date()),
        sysCreatedby: this.$store.state.userOid
      };
      baseCodeSupplyEx({ code: "whse_in" }).then(res => {
        this.whseMaterInFormData.yinId = res.data.data;
      });
    },
    // 数据抽取
    extractData(samNote) {
      this.loading = true;
      fetchWhseInDataListBySamNote(samNote,this.imWkType)
        .then(res => {
          this.whseMaterInDtlaDataList = res.data.map(dtlaItem => {
            dtlaItem.checkStatus = "1";
            dtlaItem.dtlBChildren.forEach(dtlbItem => {
              dtlbItem.$cellEdit = false; 
            })
            return dtlaItem
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="stylus">
#whse-yarn-in-dtl-containe {
  .avue-crud__menu {
    min-height: 5px !important;
    height: 5px !important;
  }
}
</style>
