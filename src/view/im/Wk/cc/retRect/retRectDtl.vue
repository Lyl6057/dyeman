<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 10:34:33
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-18 10:08:37
-->
<template>
  <div class="with-drawal-dlt-container">
    <view-container title="退纱通知单信息维护" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button
          type="primary"
          @click="handleSave"
          :disabled="hasEdit"
        >{{ this.$t("public.save") }}</el-button>
        <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="retReatFormOp" v-model="retReatFormData"></avue-form>
      </div>
      <el-row>
        <el-col :span="17">
          <view-container title="退纱通知单明细">
            <div class="btnList"></div>
            <avue-crud
              ref="dtlCrudRef"
              :option="dtlCrudOp"
              :data="dtlCrudDataList"
              :page.sync="page"
              v-loading="loading"
              @on-load="getDataList"
              @row-click="handleDtlCellClick"
              @selection-change="handleSelectionChange"
            ></avue-crud>
          </view-container>
        </el-col>
        <el-col :span="7">
          <view-container title="货位码明细">
            <div class="btnList">
              <el-button
                type="primary"
                :disabled="hasEdit"
                @click="handleAddDtla"
              >{{ this.$t("public.add") }}</el-button>
              <el-button
                type="danger"
                :disabled="hasEdit"
                @click="handleDelDtla"
              >{{ this.$t("public.del") }}</el-button>
            </div>
            <avue-crud
              ref="dtlaCrudRef"
              :option="retReatDtlaCrudOp"
              :data="dtlaCrudDataList"
              @row-click="handlDtlaRowClick"
            ></avue-crud>
          </view-container>
        </el-col>
      </el-row>
    </view-container>
  </div>
</template>

<script>
import { retReatFormOp, retReatDtlCrudOp, retReatDtlaCrudOp } from "./data";
import {
  addRetRectData,
  updateRetRectData,
  batchAddOrUpdateRetReatDtlData,
  fetchWhseYarninByRemeoNo,
  fetchRetReatDtlDataByOid,
  batchAddOrUpdateRetReatDtlaData,
  batchRemoveDtlaById
} from "./api";
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { timeConversion } from "@/config/util";

import v1 from "uuid/v1";
export default {
  name: "withDrawalDtl",
  components: {},
  props: {},
  data() {
    return {
      loadLabel: "加载中...",
      loading: false,
      retReatFormOp: retReatFormOp(this),
      retReatFormData: {},
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
      dtlCrudOp: retReatDtlCrudOp(this),
      dtlCrudDataList: [],

      // 货位码数据
      retReatDtlaCrudOp: retReatDtlaCrudOp(this),
      dtlaCrudDataList: [],

      retYarnDialogVisible: false,
      //   选择项
      selectList: [],
      //   待删除oid数组
      delOidList: [],
      //  数据获取源  织单表 retYarn ； 库存表 yarnStock
      targetData: null,
      //  是否刷新
      hasRefresh: false,

      // 当前点击明细索引
      dtlCurRowIdx: -1,
      // 当前点击或货位数
      dtlaCurRowIdx: -1,
      // 货运位数据删除id集合
      dtlaDelOids: []
    };
  },
  computed: {
    hasEdit() {
      return this.retReatFormData.retState == "1";
    }
  },
  methods: {
    // 新增货位数据
    handleAddDtla() {
      this.dtlaCrudDataList.push({
        whseRetreatDtlaoid: v1(),
        retWeight: 0,
        retPcs: 0,
        packSize: "",
        locationCode: "",
        isAdd: true
      });
    },
    // 删除货位数据
    handleDelDtla() {
      let { whseRetreatDtlaoid, isAdd } =
        this.dtlaCrudDataList[this.dtlaCurRowIdx] || {};
      if (!whseRetreatDtlaoid) return this.$tip.warning("请选择数据");
      if (!isAdd && whseRetreatDtlaoid) {
        this.dtlaDelOids.push(whseRetreatDtlaoid);
      }
      this.dtlaCrudDataList.splice(this.dtlaCurRowIdx, 1);
      this.dtlaCurRowIdx = -1;
    },
    // 初始化基础数据
    initBaseData() {
      this.dtlCurRowIdx = -1;
      this.dtlaCurRowIdx = -1;
      this.dtlaDelOids = [];
    },
    // 明细数据点击
    handleDtlCellClick(row) {
      if (this.dtlCurRowIdx > -1 && this.dtlaCurRowIdx > -1) {
        this.dtlCrudDataList[this.dtlCurRowIdx].retreatDtlaList[
          this.dtlaCurRowIdx
        ].$cellEdit = false;
      }
      this.dtlCurRowIdx = row.$index;
      this.dtlaCrudDataList = row.retreatDtlaList;
    },
    // 货位码明细数据点击
    handlDtlaRowClick(row) {
      if (!this.hasNotEdit) {
        if (this.dtlaCurIdx > -1) {
          this.dtlCrudDataList[this.dtlaCurRowIdx].$cellEdit = false;
        }
        row.$cellEdit = true;
      }
      this.dtlaCurRowIdx = row.$index;
    },
    // 初始化数据
    initData(remeoNo) {
      this.retReatFormData = {
        retCode: "",
        retDate: timeConversion(new Date()),
        sysCreatedby: this.$store.state.userOid,
        retMemo: remeoNo,
        retState: "0"
      };
      this.dtlCrudDataList = [];
      this.delOidList = [];
      this.selectList = [];
      this.createNo();
      this.getDtlDataByRemeoNo(remeoNo);
    },
    // 生成编号
    createNo() {
      baseCodeSupplyEx({ code: "whse_out" }).then(res => {
        Object.assign(this.retReatFormData, {
          retCode: res.data.data
          //   whseRetreatoid: v1()
        });
      });
    },
    // 通过通知单号获取明细数据
    getDtlDataByRemeoNo(remeoNo) {
      this.initBaseData();
      this.loading = true;
      fetchWhseYarninByRemeoNo(remeoNo)
        .then(res => {
          this.dtlCrudDataList = res.data.map(item => {
            item.whseRetreatDtloid = v1();
            // item.$cellEdit = true;
            item.isAdd = false;
            return item;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 获取数据
    setRetReatData(withDatalData) {
      this.retReatFormData = withDatalData;
      this.getWithDrawalDtlDataList(withDatalData.whseRetreatoid);
    },
    getWithDrawalDtlDataList(oid) {
      this.initBaseData();
      this.loading = true;
      fetchRetReatDtlDataByOid({ whseRetreatFk: oid })
        .then(res => {
          this.dtlCrudDataList = res.data.map(item => {
            item.$cellEdit = this.retReatFormData.retState == "0";
            item.isAdd = false;
            return item;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //   删除明细
    handleDtlDelete() {
      if (this.selectList.length == 0) return this.$tip.warning("请选择删除项");
      this.selectList.forEach(item => {
        if (!item.isAdd) {
          this.delOidList.push(item.proYarnsWithdrawalDtloid);
        }
        let tarIdx = this.dtlCrudDataList.findIndex(
          cItem =>
            cItem.proYarnsWithdrawalDtloid == item.proYarnsWithdrawalDtloid
        );
        this.dtlCrudDataList.splice(tarIdx, 1);
      });
    },
    //   明细选择
    handleSelectionChange(rows) {
      this.selectList = rows;
    },

    // 保存
    async handleSave() {
      if (!this.saveValid()) return;
      this.loading = true;
      let oid = this.retReatFormData.whseRetreatoid;
      if (oid) {
        await updateRetRectData(this.retReatFormData);
      } else {
        oid = await addRetRectData(this.retReatFormData).then(
          res => res.data.data
        );
        // 流水号递增
        baseCodeSupply({ code: "whse_out" });
      }
      Object.assign(this.retReatFormData, { whseRetreatoid: oid });

      let dtlaDataList = [];
      let dataList = this.dtlCrudDataList.map(item => {
        // 货运位数据
        item.retreatDtlaList.forEach(dtlaItem => {
          dtlaDataList.push(Object.assign(dtlaItem,{
            whseRetreatDtlFk: item.whseRetreatDtloid,
          }))
        });

        return {
          whseRetreatDtloid: item.whseRetreatDtloid,
          retWeight: item.retWeight,
          whseRetreatFk: oid,
          whseYarninDtlFk: item.whseYarninDtloid,
          retPcsNum: item.retPcsNum
        };
      });
      let reqList = [
        batchAddOrUpdateRetReatDtlData(dataList),
        batchAddOrUpdateRetReatDtlaData(dtlaDataList)
      ];
      if (this.dtlaDelOids.length > 0) {
        reqList.push(batchRemoveDtlaById(this.dtlaDelOids));
      }
      await Promise.all(reqList);
      this.loading = false;
      this.hasRefresh = true;
      this.$tip.success("操作成功");
    },
    // 保存校验
    saveValid() {
      // 检验条件
      return true;
    },
    //
    handleCloseDtl() {
      this.$emit("close", this.hasRefresh);
    },
    getDataList() {}
  }
};
</script>


