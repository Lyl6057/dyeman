<!--
 * @Description: 入仓明细页面
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-20 11:07:19
-->
<template>
  <div id="whse-yarn-in-dtl-container">
    <view-container
      :title="imWkName"
      :element-loading-text="loadLabel"
      v-loading="loading"
    >
      <div class="btnList">
        <el-button type="primary" @click="handleSave" :disabled="hasNotEdit">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="handleClose">{{
          this.$t("public.close")
        }}</el-button>
      </div>
      <div class="formBox">
        <avue-form
          ref="form"
          :option="whseMaterInFormOp"
          v-model="whseMaterInFormData"
        ></avue-form>
      </div>
      <el-row>
        <el-col :span="17">
          <view-container :title="imWkName + '明细资料'">
            <div class="btnList">
              <!-- <el-button type="primary">{{ this.$t("public.save") }}</el-button>
              <el-button type="warning">{{ this.$t("public.close") }}</el-button>-->
            </div>
            <div class="crudBox">
              <avue-crud
                ref="whseInDtlRef"
                :option="whseMaterInDtlCrudOp"
                :data="whseMaterInDtlDataList"
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
                >{{ this.$t("public.add") }}</el-button
              >
              <el-button
                type="danger"
                :disabled="hasNotEdit"
                @click="handleDelDtla"
                >{{ this.$t("public.del") }}</el-button
              >
            </div>
            <div class="crudBox">
              <avue-crud
                ref="whseInDtlaRef"
                :option="whseMaterInDtlaCrudOp"
                :data="whseMaterInDtlaDataList"
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
  whseMaterInFormOp,
  whseMaterInDtlCrudOp,
  whseMaterInDtlaCrudOp,
  dataPropEnum
} from "./data";
import {
  fetchRetMaterNoticDataList,
  addWhseMaterInData,
  updateWhseMaterInData,
  batchSaveOrUpdateDtlDataList,
  batchSaveOrUpdateDtlaDataList,
  fetchWhseMaterInDtlAndDtlaData,
  batchRemoveDtlaDataById,
} from "./api";
import { timeConversion } from "@/config/util";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import v1 from "uuid/v1";
export default {
  name: "whseInDtl",
  props: {
    imWkType: {
      type: String,
      default: () => "",
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
      whseMaterInFormOp: whseMaterInFormOp(this),
      whseMaterInFormData: {},
      whseMaterInDtlCrudOp: whseMaterInDtlCrudOp(this),
      whseMaterInDtlDataList: [],
      whseMaterInDtlaCrudOp: whseMaterInDtlaCrudOp(this),
      whseMaterInDtlaDataList: [],
      hasRefresh: false,
      // 当前选中明细索引
      dtlCurIdx: -1,
      // 当前选中货位明细索引
      dtlaCurIdx: -1,

      // 货位明细删除oid集合
      dtlaDelOids: [],
    };
  },
  watch: {
    dtlCurIdx: {
      handler(value, oValue) {
        if (oValue != -1 && this.dtlaCurIdx != -1) {
          this.whseMaterInDtlDataList[oValue].dtlBChildren[
            this.dtlaCurIdx
          ].$cellEdit = false;
        }
        if (value != -1) {
          this.dtlaCurIdx = -1;
          this.whseMaterInDtlaDataList =
            this.whseMaterInDtlDataList[value].dtlBChildren;
        }
      },
    },
  },
  computed: {
    hasNotEdit() {
      return this.whseMaterInFormData.stockState == "1";
    },
  },
  methods: {
    // 新增货位数据
    handleAddDtla() {
      let { materDtlbOidKey } = dataPropEnum[this.imWkType];
      this.whseMaterInDtlaDataList.push({
        isAdd: true,
        [materDtlbOidKey]: v1(),
      });
    },
    // 删除货位明细数据
    handleDelDtla() {
      if (this.dtlaCurIdx == -1) return this.$tip.warning("请选择数据");
      let { materDtlbOidKey } = dataPropEnum[this.imWkType];
      let delRow = this.whseMaterInDtlaDataList.splice(this.dtlaCurIdx, 1)[0];
      if (delRow && !delRow.isAdd) {
        this.dtlaDelOids.push(delRow[materDtlbOidKey]);
      }
    },
    // 初始化数据
    initData() {
      this.dtlCurIdx = -1;
      this.dtlaCurIdx = -1;
      this.dtlaDelOids = [];
    },
    // 获取物料入仓明细数据
    getWhseMaterInData(whseMaterInData) {
      let { materFkKey,materOidKey } = dataPropEnum[this.imWkType];
      this.loading = true;
      this.whseMaterInFormData = whseMaterInData;
      this.initData();
      fetchWhseMaterInDtlAndDtlaData({
        [materFkKey]: whseMaterInData[materOidKey],
      },this.imWkType)
        .then((res) => {
          this.whseMaterInDtlDataList = res.data;
          this.whseMaterInDtlaDataList = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 保存数据
    async handleSave() {
      let { materFkKey,materOidKey } = dataPropEnum[this.imWkType];
      this.loading = true;
      // 保存主数据
      let oid = this.whseMaterInFormData[materOidKey];
      if (oid) {
        await updateWhseMaterInData(this.whseMaterInFormData,this.imWkType);
      } else {
        oid = await addWhseMaterInData(this.whseMaterInFormData,this.imWkType).then(
          (res) => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "whse_in" });
      }
      Object.assign(this.whseMaterInFormData, { [materOidKey]: oid });
      // 保存明细数据
      await this.saveDtlData(oid);
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("保存成功");
    },
    // 保存明细数据
    saveDtlData(whseMaterInOid) {
      let { materFkKey,materDtlaOidKey,materDtlaFKKey,materDtlbOidKey,materIdKey,materNameKey,weightKey,weightUnitKey } = dataPropEnum[this.imWkType];
      let dtlaDataList = [];
      let dtlDataList = this.whseMaterInDtlDataList.map((item, index) => {
        let inWeight = 0;
        // 货位数据
        item.dtlBChildren.forEach((aItem) => {
          inWeight += aItem.weight || 0;
          dtlaDataList.push({
            [materDtlbOidKey]: aItem[materDtlbOidKey],
            [materDtlaFKKey]: item[materDtlaOidKey],
            storageNo: aItem.storageNo,
            weight: aItem.weight,
            batchNo: item.batchNo,
            weightUnit: item.weightUnit,
          });
        });
        // 明细数据
        let tDtlData = {
          [materDtlaOidKey]: item[materDtlaOidKey],
          [materFkKey]: whseMaterInOid,
          [weightKey]: inWeight,
          seqQty: index + 1,
          [materIdKey]: item[materIdKey],
          [materNameKey]: item[materNameKey],
          batchNo: item.batchNo,
          [weightUnitKey]: item[weightUnitKey],
        };
        return tDtlData;
      });

      let dataListReqs = [
        batchSaveOrUpdateDtlDataList(dtlDataList,this.imWkType),
        batchSaveOrUpdateDtlaDataList(dtlaDataList,this.imWkType),
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
          this.whseMaterInDtlDataList[this.dtlCurIdx].$cellEdit = false;
        }
        row.$cellEdit = true;
      }
      this.dtlCurIdx = row.$index;
    },
    // 货位码数据点击事件
    handleDtlaRowClick(row) {
      if (!this.hasNotEdit) {
        if (this.dtlaCurIdx > -1) {
          this.whseMaterInDtlaDataList[this.dtlaCurIdx].$cellEdit = false;
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
    addAndCreateData(withDrawalNo) {
      this.initData();
      this.createWhseMaterInData(withDrawalNo);
      this.extractData(withDrawalNo);
    },
    // 生成主表数据
    createWhseMaterInData(withDrawalNo) {
      let { materOidKey } = dataPropEnum[this.imWkType];
      this.whseMaterInFormData = {
        [materOidKey]: "",
        yinType: "5",
        stockState: "0",
        registerNo: withDrawalNo,
        finStatus: "0",
        yinStatus: "1",
        yinDate: timeConversion(new Date()),
        sysCreatedby: this.$store.state.userOid,
      };
      baseCodeSupplyEx({ code: "whse_in" }).then((res) => {
        this.whseMaterInFormData.yinId = res.data.data;
      });
    },
    // 数据抽取
    extractData(withDrawalNo) {
      this.loading = true;
      fetchRetMaterNoticDataList(withDrawalNo,this.imWkType)
        .then((res) => {
          let { materDtlaOidKey,materDtlaFKKey,materDtlbOidKey,weightKey } = dataPropEnum[this.imWkType];
          this.whseMaterInDtlDataList = res.data.map((item) => {
            let dtlOid = v1();
            item[materDtlaOidKey] = dtlOid;
            item.retWeight = item[weightKey];
            item.dtlBChildren = [
              {
                [materDtlaFKKey]: dtlOid,
                [materDtlbOidKey]: v1(),
                weight: item[weightKey],
                storageNo: "",
                weightUnit: item.weightUnit,
                storageNo: item.storageNo
              },
            ];
            return item;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="stylus">
#whse-yarn-in-dtl-containe
  .avue-crud__menu
    min-height 5px !important
    height 5px !important
</style>
