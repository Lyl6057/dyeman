<!--
 * @Author: Lyl
 * @Date: 2022-05-24 16:08:51
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-31 14:39:16
 * @FilePath: \iot.vue\src\view\im\transferLoadQa\inWhse.vue
 * @Description: 
-->
<template>
  <div class="inWhse">
    <el-row class="btnList">
      <el-button type="primary" @click="query">{{this.$t("public.query")}}</el-button>
      <el-popover style="margin-left: 10px" placement="right" width="160" v-model="visible">
        <p>是否确定提交出任务吗？</p>
        <div>
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="handleInWhse">确定</el-button>
        </div>
        <el-button slot="reference" type="primary">提交</el-button>
      </el-popover>
    </el-row>
    <el-row class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
    </el-row>
    <div class="crudBox">
      <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" :element-loading-text="$t('public.loading')" v-loading="wloading" @cell-click="cellClick">
      </avue-crud>
    </div>
  </div>
</template>

<script>
import { fetchSelloutByPage } from "./api";
import { inWhseFormOp, inWhseCrudOp } from "./data";
import {
  addInFinishedWhse,
  addInFinishedDtla,
  addInFinishedDtlb,
  addStorageLog,
  updateFinished,
  sendTaskNoin,
  getInFinishedByPage,
} from "../whseInOutKB/api";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
export default {
  components: {},
  props: {},
  data() {
    return {
      wloading: false,
      crudOp: inWhseCrudOp(this),
      crud: [],
      formOp: inWhseFormOp(this),
      form: {
        type: 1,
      },
      page: {
        pageSizes: [10, 50, 100, 200, 500],
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      visible: false,
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    query() {
      let { code, entrance } = this.form;
      if (!code || !entrance) {
        this.$tip.warning("请补充载具编号和库口编号！");
        return;
      }
      this.wloading = true;
      this.crud = [];
      fetchSelloutByPage({
        rows: this.page.pageSize,
        start: this.page.currentPage,
        code,
        entrance,
      })
        .then((res) => {
          if (!res.data) {
            this.crud = [];
            return this.$tip.warning("暂无数据");
          }
          this.page.total = res.data.length;
          this.crud = res.data;
          this.crud.forEach((item, i) => {
            item.index = i + 1;
          });
        })
        .finally(() => {
          this.wloading = false;
        });
    },
    handleInWhse() {
      let { code, entrance, layer } = this.form;
      if (!code || !entrance || !this.crud.length) {
        this.$tip.warning("请先输入载具编号和库口!");
        return;
      }
      let orderType = entrance.indexOf("S") != -1 ? 6 : 4;
      // 生成入库记录
      this.wloading = true;
      let params = {
        barCode: code,
        createTime: this.$getNowTime("datetime"),
        entrance: entrance, // 入库口
        isEmpty: 0, // 是否为空
        orderType, // 出库/入库
        layer: layer,
        type: 2, // 物料类别
      };
      let list = this.crud;
      let weight = this.crud.reduce((pre, cur) => {
        return pre + Number(cur.woWeights);
      }, 0);
      try {
        sendTaskNoin(params).then((sendRes) => {
          if (sendRes.data.code) {
            this.$tip.error(sendRes.data.data);
            this.wloading = false;
            return;
          }
          if (sendRes.data == "返回异常") {
            this.$tip.error(sendRes.data);
            this.wloading = false;
            return;
          }
          baseCodeSupplyEx({ code: "whse_in" }).then((bat) => {
            baseCodeSupply({ code: "whse_in" }).then((bat) => {});
            let batchNo = bat.data.data;
            addInFinishedWhse({
              yinId: batchNo,
              yinDate: this.$getNowTime("datetime"),
              yinStatus: 1,
              yinType: 1,
              finStatus: 0,
              sysCreateBy: this.$store.state.userOid,
              stockState: 0,
              custCode: list[0].custCode || '',
            }).then((res) => {
              addStorageLog({
                whsCarriageStorageFk: code,
                useTime: this.$getNowTime("datatime"),
                useType: 2,
                businessType: 2,
                businessId: list[0].vatNo,
                deleteFlag: 0,
              }).then((log) => {
                addInFinishedDtla({
                  carriageStorageLogFk: log.data.data,
                  wmsTaskLogFk: sendRes.data,
                  whseFinishedclothinFk: res.data.data,
                  pidCount: list.length,
                  sumWeight: weight,
                  weightUnit: "KG",
                  storeLoadCode: code,
                  outFlag: 0,
                }).then((dtla) => {
                  list.forEach((item, i) => {
                    // item.forEach((dtlb, j) => {
                    addInFinishedDtlb({
                      pidNo: item.countingNo,
                      productDtlFk: dtla.data.data,
                      productNo: item.productNo,
                      vatNo: item.prodNo,
                      weight: item.woWeights,
                      weightUnit: item.woUnit,
                      productId: item.cardId || '',
                    }).then((dtlbRes) => {
                      if (i === list.length - 1) {
                        this.$tip.success("任务提交成功!");
                      }
                    });
                    // });
                  });
                }).finally(() =>{
                  this.visible = false
                  this.wloading = false;
                })
              });
            });
          });
        });
      } catch (error) {
        this.wloading = false;
        console.error(error);
      }
    },
    finishedAfter(list) {
    },
    cellClick(val) {
      this.detail = val;
    },
  },
};
</script>
<style lang="stylus" scoped></style>