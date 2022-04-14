<!--
 * @Description: 入仓明细页面
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:18:51
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-14 16:30:50
-->
<template>
  <div id="whse-yarn-in-dtl-container">
    <view-container title="本厂余纱退纱" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button type="primary" @click="handleSave">{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="whseYarnInFormOp" v-model="whseYarnInFormData"></avue-form>
      </div>
      <el-row>
        <el-col :span="17">
          <view-container title="纱线入仓货位明细资料">
            <div class="btnList">
              <!-- <el-button type="primary">{{ this.$t("public.save") }}</el-button>
              <el-button type="warning">{{ this.$t("public.close") }}</el-button>-->
            </div>
            <div class="crudBox">
              <avue-crud
                ref="whseInDtlRef"
                :option="whseYarnInDtlCrudOp"
                :data="whseYarnInDtlDataList"
                @row-click="handleDtlRowClick"
              ></avue-crud>
            </div>
          </view-container>
        </el-col>
        <el-col :span="7">
          <view-container title="货位资料">
            <div class="btnList">
              <el-button type="primary">{{ this.$t("public.add") }}</el-button>
              <el-button type="danger">{{ this.$t("public.del") }}</el-button>
            </div>
            <div class="crudBox">
              <avue-crud
                ref="whseInDtlaRef"
                :option="whseYarnInDtlaCrudOp"
                :data="whseYarnInDtlaDataList"
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
  whseYarnInDtlaCrudOp
} from "./data";
import {
  fetchRetYarnNoticDataList,
  addWhseYarnInData,
  updateWhseYarnInData,
  batchSaveOrUpdateDtlDataList,
  batchSaveOrUpdateDtlaDataList,
  fetchWhseYarnInDtlAndDtlaData
} from "./api";
import { timeConversion } from "@/config/util";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import v1 from "uuid/v1";
export default {
  name: "whseInDtl",
  data() {
    return {
      loading: false,
      loadLabel: "正在数据请求...",
      whseYarnInFormOp: whseYarnInFormOp(this),
      whseYarnInFormData: {},
      whseYarnInDtlCrudOp: whseYarnInDtlCrudOp(this),
      whseYarnInDtlDataList: [],
      whseYarnInDtlaCrudOp: whseYarnInDtlaCrudOp(this),
      whseYarnInDtlaDataList: [],
      hasRefresh: false,

      dtlCurIdx: -1,
      dtlaCurIdx: -1
    };
  },
  watch: {
    dtlCurIdx: {
      handler(value) {
        if (value > -1) {
          this.dtlaCurIdx = -1;
          this.whseYarnInDtlaDataList = this.whseYarnInDtlDataList[
            value
          ].aChildren;
        }
      }
    }
  },
  methods: {
    // 获取纱线入仓明细数据
    getWhseYarnInData(whseYarnInData) {
      this.loading = true;
      this.whseYarnInFormData = whseYarnInData;

      fetchWhseYarnInDtlAndDtlaData({
        whseYarnInoid: whseYarnInData.whseYarninoid
      }).then(res => {
        this.whseYarnInDtlDataList = res.data.map(item => {
          return {
            whseYarninDtloid: item.whseYarninDtloid,
            whseYarninFk: item.whseYarninFk,
            inWeight: item.whseNum,
            yarnsId: item.yarnsId,
            batchNo: item.batchNo,
            weight: item.cartonWei,
            weightUnit: item.weightUnit,
            yarnsCard: item.yarnsCard,
            suppBatNo: item.batId,
            weaveJobCode: item.placeOrigin,
            remarks: item.colorName,
            aChildren: item.dtlaChildren
          };
        });
      }).finally(() => {
        this.loading = false;
      });
    },
    // 保存数据
    async handleSave() {
      this.loading = true;
      // 保存主数据
      let oid = this.whseYarnInFormData.whseYarninoid;
      if (oid) {
        await updateWhseYarnInData(this.whseYarnInFormData);
      } else {
        oid = await addWhseYarnInData(this.whseYarnInFormData).then(
          res => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "whse_in" });
      }
      Object.assign(this.whseYarnInFormData, { whseYarninoid: oid });
      // 保存明细数据
      await this.saveDtlData(oid);
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("保存成功");
    },
    // 保存明细数据
    saveDtlData(whseYarninOid) {
      let dtlaDataList = [];
      let dtlDataList = this.whseYarnInDtlDataList.map((item, index) => {
        // 明细数据
        let tDtlData = {
          whseYarninDtloid: item.whseYarninDtloid,
          whseYarninFk: whseYarninOid,
          whseNum: item.inWeight,
          seqQty: index + 1,
          yarnsId: item.yarnsId,
          batchNo: item.batchNo,
          cartonWei: item.weight,
          weight: item.inWeight,
          weightUnit: item.weightUnit,
          yarnsCard: item.yarnsCard,
          batId: item.suppBatNo,
          placeOrigin: item.weaveJobCode,
          colorName: item.remarks
        };
        // 货位数据
        item.aChildren.forEach(aItem => {
          dtlaDataList.push({
            whseYarninDtlaoid: aItem.whseYarninDtlaoid,
            whseYarninDtlFk: item.whseYarninDtloid,
            locationCode: aItem.locationCode,
            batId: item.batchNo,
            weight: aItem.weight,
            cartonNum: aItem.cartonNum,
            packSize: aItem.packSize
          });
        });
        return tDtlData;
      });
      let dataListReqs = [
        batchSaveOrUpdateDtlDataList(dtlDataList),
        batchSaveOrUpdateDtlaDataList(dtlaDataList)
      ];
      return Promise.all(dataListReqs);
    },
    // 明细点击事件
    handleDtlRowClick(row) {
      if (this.dtlCurIdx > -1) {
        this.whseYarnInDtlDataList[this.dtlCurIdx].$cellEdit = false;
      }
      this.dtlCurIdx = row.$index;
      row.$cellEdit = true;
    },
    // 货位码数据点击事件
    handleDtlaRowClick(row) {
      if (this.dtlaCurIdx > -1) {
        this.whseYarnInDtlaDataList[this.dtlaCurIdx].$cellEdit = false;
      }
      this.dtlaCurIdx = row.$index;
      row.$cellEdit = true;
    },
    // 关闭
    handleClose() {
      this.$emit("close", this.hasRefresh);
    },
    // 新增数据初始化
    initData(withDrawalNo) {
      this.createWhseYarnInData(withDrawalNo);
      this.extractData(withDrawalNo);
    },
    // 生成主表数据
    createWhseYarnInData(withDrawalNo) {
      this.whseYarnInFormData = {
        whseYarninoid: "",
        yinType: "4",
        stockState: "0",
        registerNo: withDrawalNo,
        finStatus: "0",
        yinStatus: "0",
        yinDate: timeConversion(new Date()),
        sysCreatedby: this.$store.state.userOid
      };
      baseCodeSupplyEx({ code: "whse_in" }).then(res => {
        this.whseYarnInFormData.yinId = res.data.data;
      });
    },
    // 数据抽取
    extractData(withDrawalNo) {
      this.loading = true;
      fetchRetYarnNoticDataList(withDrawalNo)
        .then(res => {
          this.whseYarnInDtlDataList = res.data.map(item => {
            let dtlOid = v1();
            item.whseYarninDtloid = dtlOid;
            item.aChildren = [
              {
                whseYarninDtlFk: dtlOid,
                whseYarninDtlaoid: v1(),
                weight: item.weight,
                packSize: item.packSize,
                cartonNum: item.cartonNumber
              }
            ];
            return item;
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
