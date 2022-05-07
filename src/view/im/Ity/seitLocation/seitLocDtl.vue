<!--
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 09:16:40
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-07 09:07:49
-->
<template>
  <div class="whse-seit-location-dlt-container">
    <view-container title="货位整理记录维护" :element-loading-text="loadLabel" v-loading="loading">
      <div class="btnList">
        <el-button
          type="primary"
          @click="handleSave"
          :disabled="hasEdit"
        >{{ this.$t("public.save") }}</el-button>
        <el-button type="success" :disabled="hasEdit" @click="handleConfirm">确认整理</el-button>
        <el-button type="warning" @click="handleCloseDtl">{{ this.$t("public.close") }}</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="seitLocFormDataOp" v-model="seitLocFormData"></avue-form>
      </div>
      <el-row>
        <el-col :span="17">
          <view-container title="调整明细">
            <div class="btnList">
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
                <el-popover
                    placement="right"
                    width="300"
                    trigger="click">
                    <div>
                        <el-select v-model="locationCodeValue" filterable>
                            <el-option v-for="(item,index) in locCodeDictData" :label="item.label" :value="item.value" :key="index"></el-option>
                        </el-select>
                        <el-button type="primary" size="mini" @click="handleSetSameLoc" >确认</el-button>
                    </div>
                    <el-button  slot="reference" type="success" :disabled="hasEdit" >设置成统一货位码</el-button>
                </el-popover>
              </div>
            </div>
            <avue-crud
              ref="dtlCrudRef"
              :option="seitLocDtlaCrudOp"
              :data="seitLocDtlaDataList"
              v-loading="loading"
              @on-load="getDataList"
              @row-click="handleDtlaCellClick"
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
                @click="handleAddDtlb"
              >{{ this.$t("public.add") }}</el-button>
              <el-button
                type="danger"
                :disabled="hasEdit"
                @click="handleDelDtlb"
              >{{ this.$t("public.del") }}</el-button>
            </div>
            <avue-crud
              ref="dtlaCrudRef"
              :option="seitLocDtlbCrudOp"
              :data="seitLocDtlbDataList"
              @row-click="handlDtlbRowClick"
            ></avue-crud>
          </view-container>
        </el-col>
      </el-row>
      <inv-sel 
        ref="invSelRef"
        :matType="curMatTypeVal"
        @data-select="handleInvDataSelect"
        ></inv-sel>
    </view-container>
  </div>
</template>
<script>
import v1 from "uuid/v1"
import {
  seitLocFormDataOp,
  seitLocDtlaCrudOp,
  seitLocDtlbCrudOp,
  getLocCodeDictData
} from "./data";
import { matTypeEnum } from "@/components/InventorySelect/data"
import { baseCodeSupplyEx, baseCodeSupply } from "@/api/index";
import { saveSeitLocData, updateSeitLocData, batchSaveOrUpdateDtla,batchSaveOrUpdateDtlb, batchRemoveDtla, batchRemoveDtlb, fetchDtlDataListByOid, fetchValidOutWeight,fetchLocationConfirm } from "./api"
import { timeConversion } from "@/config/util";
import InvSel from "@/components/InventorySelect";
export default {
  name: "seitLocationDtl",
  components: {
    InvSel: InvSel
  },
  data() {
    return {
      loadLabel: "加载中...",
      loading: false,
      seitLocFormDataOp: seitLocFormDataOp(this),
      seitLocFormData: {},
      seitLocDtlaCrudOp: seitLocDtlaCrudOp(this),
      seitLocDtlaDataList: [],
      seitLocDtlbCrudOp: seitLocDtlbCrudOp(this),
      seitLocDtlbDataList: [],
      // 是否刷新
      isRefresh: false,
      curClickDtla: {},  
      dtlaDelOids: [],
      curClickDtlb: {},  
      dtlbDelOids: [],

    //   统一货位码值
        locationCodeValue: "",
        locCodeDictData: [],
    //   当前类型
        curMatTypeVal: "0"
    };
  },
  computed: {
    hasEdit() {
      return this.seitLocFormData.seitlocationState == "2";
    }
  },
  watch: {
      "seitLocFormData.materialType":{
          handler(val){
            if(!val) return
            this.curMatTypeVal = val;
            this.seitLocDtlaCrudOp = seitLocDtlaCrudOp(this);
            this.seitLocDtlbCrudOp = seitLocDtlbCrudOp(this);
            this.locCodeDictData = getLocCodeDictData(val);
          },
          immediate: true
      }
  },
  methods: {
    // 确认整理
    async handleConfirm() {
        // 出库量检验
        let vaildRes = await this.confrimValid();
        if (!vaildRes) return;

        this.loading = true;
        fetchLocationConfirm(this.curMatTypeVal, this.seitLocFormData.whseSeitlocationoid).then(res => {
            if(res.data.code == 200){
                this.$tip.success("整理货位成功");
                this.seitLocFormData.seitlocationState = "2";
            }
        }).finally(() => {
            this.loading = false;
        })
        
    },
    // 确认前检验
    async confrimValid() {
      let dataList = this.seitLocDtlaDataList.map(aItem => {
          let  validData = {}
          if(this.curMatTypeVal == "0"){
              validData = {
                yarnsId: aItem.materialId,
                yarnsCard: aItem.materialBrand,
                batchNo: aItem.batchNo,
                batId: aItem.suppBatId,
                weight: aItem.dtlBChildren.reduce((a,b) => a + Number(b.weight), 0),
                locationCode: aItem.sourceLocation
              }
          }else{
              validData = {
                matCode: aItem.materialId,
                batchNo: aItem.batchNo,
                retQty: aItem.dtlBChildren.reduce((a,b) => a + Number(b.weight), 0),
                locationCode: aItem.sourceLocation
              }
          }
          return validData;
      });
      let validRes = await fetchValidOutWeight(dataList, matTypeEnum[this.curMatTypeVal].stockTableName).then(res => res.data);
      if (!validRes.data.status) {
        validRes.data.resultList.forEach((item, index) => {
          let matCodeKey = this.curMatTypeVal == "0" ? 'yarnsId': "matCode";      
          let locCodeKey = this.curMatTypeVal == "0" ? 'locationName': "storageNo";      
          let notifyData = {
              title: "提示",
              dangerouslyUseHTMLString: true,
              message: `材料编号<strong>${item[matCodeKey]}</strong>的<strong>${item[locCodeKey]}</strong>货运位剩余库存数为<span style="color:red; font-size: 16px">${item.realStock.toFixed(2)}</span>;`,
              type: "warning",
              position: 'top-left'
            }
          setTimeout(() =>this.$notify(notifyData), 100 * index);
        });
      }
      return validRes.data.status;
    },
    // 新增初始化
    initData(){
        this.isRefresh = false;
        this.curClickDtla = {};
        this.dtlaDelOids = [];
        this.curClickDtlb = {};
        this.dtlbDelOids = [];
        this.seitLocDtlaDataList = [];
        this.seitLocDtlbDataList = [];
        this.getSeitLocationNo();
    },
    // 获取货位整理编号
    getSeitLocationNo(){
        baseCodeSupplyEx({code: "whse_seit_loc"}).then(res => {
            this.seitLocFormData = {
                whseSeitlocationoid: "",
                seitlocationNo: res.data.data,
                seitlocationDate: timeConversion(new Date()),
                seitlocationState: "1"
            };
        })
    },
    //   库存选择回调
    handleInvDataSelect(rows){
        let {materialIdKey,materialNameKey,locationCodeKey,weightKey} = matTypeEnum[this.curMatTypeVal]
        let tarDataList =  rows.map(item => {
            return {
                isAdd: true,
                whseSeitlocationDtlaoid: v1(),
                materialId: item[materialIdKey],
                materialName: item[materialNameKey],
                materialBrand: item.yarnsCard,
                suppBatId: item.batId,
                batchNo: item.batchNo,
                sourceLocation: item[locationCodeKey],
                weightUnit: item.weightUnit,
                weight: item[weightKey],
                // 货位明细数据
                dtlBChildren: [
                    {
                        whseSeitlocationDtlboid: v1(),
                        isAdd: true,
                        $cellEdit: true,
                        weight: item[weightKey],
                        destLocation: ""
                    }
                ]
            }
        });
        this.seitLocDtlaDataList.push(...tarDataList);
        this.seitLocDtlbDataList = this.seitLocDtlaDataList[0].dtlBChildren;
    },
    // 保存
    async handleSave() {
        let validRes = await this.validAfter2Save();
        if(!validRes) return;
        let { whseSeitlocationoid } = this.seitLocFormData;
        this.loading = true;
        if(whseSeitlocationoid){
            await updateSeitLocData(this.seitLocFormData);
        }else{
           whseSeitlocationoid = await saveSeitLocData(this.seitLocFormData).then(res => res.data.data);
           Object.assign(this.seitLocFormData,{whseSeitlocationoid})
           baseCodeSupply({code: "whse_seit_loc"});
        };

        let dtlaDataList = [];
        let dtlbDataList = [];
        this.seitLocDtlaDataList.forEach(dtlaItem => {
            dtlaDataList.push(Object.assign({},dtlaItem,{
                whseSeitlocationFk: whseSeitlocationoid,
                dtlBChildren:null
            }));
            dtlaItem.dtlBChildren.forEach(dtlbItem => {
                dtlbDataList.push(Object.assign(dtlbItem,{
                    whseSeitlocationDtlaFk: dtlaItem.whseSeitlocationDtlaoid
                }))
            })
        })
        let reqArr = [
            batchSaveOrUpdateDtla(dtlaDataList),
            batchSaveOrUpdateDtlb(dtlbDataList),
        ];
        if(this.dtlaDelOids.length > 0){
            reqArr.push(batchRemoveDtla(this.dtlaDelOids))
        }
        if(this.dtlbDelOids.length > 0){
            reqArr.push(batchRemoveDtlb(this.dtlbDelOids))
        }

        Promise.all(reqArr).then(res => {
            this.$tip.success("保存成功");
            this.isRefresh = true;
        }).finally(() => {
            this.loading = false;
        })

    },
    // 保存前检验
    async validAfter2Save(){
        if(this.seitLocDtlaDataList.length <= 0){
            this.$tip.warning("不能保存明细数据为空的整理单");
            return false;
        }
        let hasDtlbData = this.seitLocDtlaDataList.every(item => {
            return item.dtlBChildren.length > 0 && item.dtlBChildren.every(dtlbItem => {
                return dtlbItem.destLocation && dtlbItem.weight && dtlbItem.weight > 0
            })
        });
        if(!hasDtlbData){
            this.$tip.warning("存在货位数据为空或库存数量有误，请检查!");
            return false;
        }

        let vaildValue = await this.confrimValid();
        return vaildValue
    },
       // 设置赋值
    setSeitLocData(row){
        this.seitLocFormData = row;
        this.getDataList();
    },
    // 获取数据
    getDataList() {
        this.loading = true;
        fetchDtlDataListByOid(this.seitLocFormData.whseSeitlocationoid).then(res => {
            this.seitLocDtlaDataList = res.data.map(item => {
                item.dtlBChildren.forEach(dtlbItem => {
                    dtlbItem.$cellEdit = !this.hasEdit;
                })
                return item
            });
            if(this.seitLocDtlaDataList.length > 0){
                this.seitLocDtlbDataList = this.seitLocDtlaDataList[0].dtlBChildren
            }else{
                this.seitLocDtlbDataList = [];
            }
        }).finally(() => {
            this.loading = false;
        })
    },
    handleCloseDtl() {
      this.$emit("close", this.isRefresh);
    },
    // 明细选择
    handleSelectionChange() {},
    // 明细点击
    handleDtlaCellClick(row) {
        this.curClickDtla = row;
        this.seitLocDtlbDataList = row.dtlBChildren;
    },
    // 新货位点击
    handlDtlbRowClick(row) {
        this.curClickDtlb = row;
    },

    // 明细新增
    handleAddDtla() {
        if(!this.seitLocFormData.materialType){
            return this.$tip.warning("请选择材料类型");
        }
        // 获取待过滤数据
        this.$refs.invSelRef.filterIds = this.seitLocDtlaDataList.map(item => {
           return {
                materialId: item.materialId,
                yarnsCard: item.materialBrand,
                batchNo: item.batchNo,
                batId: item.suppBatId,
                locationCode: item.sourceLocation
           } 
        });
        this.$refs.invSelRef.invSelDiaVisible = true;
        
    },
    // 明细删除
    handleDelDtla() {
        let { whseSeitlocationDtlaoid, isAdd } = this.curClickDtla;
        if(!whseSeitlocationDtlaoid) return this.$tip.warning("请选择数据");
        if(!isAdd) this.dtlaDelOids.push(whseSeitlocationDtlaoid);
        let idx = this.seitLocDtlaDataList.findIndex(item => item.whseSeitlocationDtlaoid == whseSeitlocationDtlaoid);
        this.seitLocDtlaDataList.splice(idx,1);
    },
    // 货位新增
    handleAddDtlb() {
        this.seitLocDtlbDataList.push({
            whseSeitlocationDtlboid: v1(),
            destLocation: "",
            isAdd: true,
            $cellEdit: true
        })
    },
    // 货位删除
    handleDelDtlb() {
        let { whseSeitlocationDtlboid, isAdd } = this.curClickDtlb;
        if(!whseSeitlocationDtlboid) return this.$tip.warning("请选择数据");
        if(!isAdd) this.dtlbDelOids.push(whseSeitlocationDtlboid);
        let idx = this.seitLocDtlbDataList.findIndex(item => item.whseSeitlocationDtlboid == whseSeitlocationDtlboid);
        this.seitLocDtlbDataList.splice(idx,1);
    },
    // 设置成统一新货位
    handleSetSameLoc() {
        let descLocCode = this.locationCodeValue;
        if(!descLocCode) return this.$tip.warning("请选择货位码");
        this.$tip.cofirm("是否确认一键赋值货位码").then(_ => {
            this.seitLocDtlaDataList.forEach(aItem => {
                aItem.dtlBChildren.forEach(bItem => {
                    bItem.destLocation = descLocCode
                })
            })
        })
    }
  }
};
</script>