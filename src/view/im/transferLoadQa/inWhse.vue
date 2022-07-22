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
    <el-dialog id="Dlg" :visible.sync="dialogVisiable" width="60%" append-to-body :close-on-click-modal="false">
      <view-container title="成品码卡信息">
        <div class="btnList">
          <el-button type="warning" @click="dialogVisiable = false">{{
              $t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-crud ref="crudDlg" :option="crudOpDlg" :data="crudDlg" :page.sync="pageDlg"
            :element-loading-text="$t('public.loading')" v-loading="Dlgloading">
          </avue-crud>
        </div>
      </view-container>
    </el-dialog>

    <el-row class="btnList">
      <el-button type="primary" @click="query">{{ this.$t("public.query") }}</el-button>

      <el-popover style="margin-left: 10px" placement="right" width="160" v-model="visible">
        <p>是否确定提交出任务吗？</p>
        <div>
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="handleInWhse">确定</el-button>
        </div>
        <el-button slot="reference" type="primary">提交</el-button>
      </el-popover>
      <el-popover style="margin-left: 10px" placement="right" width="160" v-model="visiblePB">
        <p>是否确定提交出任务吗？</p>
        <div>
          <el-button size="mini" type="text" @click="visiblePB = false">取消</el-button>
          <el-button type="primary" size="mini" @click="handleInWhseTest">确定</el-button>
        </div>
        <el-button slot="reference" type="warning">测试提交</el-button>
      </el-popover>

      <el-button type="success" @click="handCheck()" style="margin-left: 10px" :disable="!crud.length">跟读</el-button>
    </el-row>
    <el-row class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"> </avue-form>
    </el-row>
    <div class="crudBox">
      <template v-if="clothType">
        <avue-crud ref="crud" :option="crudOpPB" :data="crudPB" :page.sync="pagePB"
          :element-loading-text="$t('public.loading')" v-loading="wloading" @cell-click="cellClick">
        </avue-crud>
      </template>
      <template v-else>
        <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page"
          :element-loading-text="$t('public.loading')" v-loading="wloading" @cell-click="cellClick">
        </avue-crud>
      </template>

    </div>
  </div>
</template>

<script>
import { fetchSelloutByPage, fetchPBSellout } from "./api";
import { inWhseFormOp, inWhseCrudOp, dlgCrud, inWhseCrudPBOp } from "./data";
import { get } from "../../quaLity/codeCard/api"
import {
  addInFinishedWhse,
  addInFinishedDtla,
  addInFinishedDtlb,
  addStorageLog,
  updateFinished,
  sendTaskNoin,
  getInFinishedByPage,
} from "../whseInOutKB/api";
import { sendTestTaskNoin } from "../whseInOutKB/api"
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
export default {
  components: {},
  props: {},
  data() {
    return {
      wloading: false,
      crudOp: inWhseCrudOp(this),
      crudOpPB: inWhseCrudPBOp(this),
      crudOpDlg: dlgCrud(this),
      crud: [],
      crudPB: [],
      crudDlg: [],
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
      pagePB: {
        pageSizes: [10, 50, 100, 200, 500],
        pageSize: 100,
        currentPage: 1,
        total: 0,
      },
      pageDlg: {
        pageSizes: [10, 50, 100, 200, 500],
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      clothType: false,// false : 成品 true：胚布
      visible: false,
      visiblePB: false,
      dialogVisiable: false,
      Dlgloading: false
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  methods: {
    query() {
      let { code, entrance } = this.form;
      if (!code || !entrance) {
        this.$tip.warning("请补充载具编号和库口编号！");
        return;
      }
      this.wloading = true;
      this.crud = [];
      if (entrance.slice(0, 1) == "Q") {
        this.clothType = false;
        fetchSelloutByPage({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          code,
          entrance,
        }).then((res) => {
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
      } else {
        this.clothType = true;
        this.wloading = false;
        fetchPBSellout({ code, entrance })
          .then((res) => {

            this.crudPB = res.data;
            this.pagePB.total = res.data.length;
            console.log(this.crudPB)
          })
      }
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
            baseCodeSupply({ code: "whse_in" }).then((bat) => { });
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
                }).finally(() => {
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

    handleInWhseTest() {
      this.$tip.warning("测试功能正在开发...!");
      return;
      let { code, entrance, layer } = this.form;
      let PBType = entrance.indexOf("S") != -1 ? true : false;
      let length = PBType ? this.crudPB.length : this.crud.length;
      if (!code || !entrance || !length) {
        this.$tip.warning("请先输入载具编号和库口!");
        return;
      }
      let orderType = PBType ? 6 : 4;
      // 生成入库记录
      let list = PBType ? this.crudPB : this.crud;
      console.log(this.crud)
      this.wloading = true;
      let data = {
        barCode: code,
        createTime: this.$getNowTime("datetime"),
        entrance: entrance, // 入库口
        isEmpty: 0, // 是否为空
        orderType, // 出库/入库
        layer: layer,
        type: PBType ? 0 : 2, // 物料类别 S=0 Q=2
      };
      const wcdList = [];
      const wfiList = [];
      list.map((e) => {
        if (PBType) {
          wcdList.push({
            noteCode: e.noteCode,
            pidNo: e.countingNo,
            weaveJobCode: e.weaveJobCode,
            weight: e.woWeights,
            weightUnit: e.woUnit,
            whseCalicoinDtlaFk: e.whseCalicoOutDtlaFk,
            whseCalicoinDtlboid: e.outDtlbId,
          })
        } else {
          wfiList.push({
            pidNo: e.storeLoadCode,
            productId: e.cardId,
            productNo: e.productNo,
            vatNo: e.prodNo,
            weight: e.woWeights,
            weightLbs: e.woWeightsLbs,
            weightUnit: e.woUnit,
          })
        }
      })
      let params = PBType ?
        Object.assign(data, { wcd: wcdList }) :
        Object.assign(data, { wfi: wfiList });
      try {
        sendTestTaskNoin(params).then((res) => {
          setInterval(() => {
            this.wloading = false;
            if (res.data.code == 200) {
              this.$tip.success(res.data.msg);
            } else {
              this.$tip.error(res.data.msg);
            }
          }, 300);
        })
      } catch (error) {
        this.wloading = false;
        this.$tip.error(error);
        console.error(error);
      }
    },
    finishedAfter(list) {
    },
    cellClick(val) {
      this.detail = val;
    },
    handCheck() {
      this.pageDlg.total = 0;
      let listVatNo = []
      this.crud.map((e) => {
        if (listVatNo.length == 0) {
          listVatNo.push({ vatNo: e.prodNo })
        } else {
          if (listVatNo.findIndex(item => item.vatNo == e.prodNo) == -1) {
            listVatNo.push({ vatNo: e.prodNo })
          }
        }
      })
      listVatNo.map((e) => {
        this.queryCloth(e.vatNo);
      })
      this.dialogVisiable = true
    },
    queryCloth(vatno) {
      get(
        Object.assign({
          clothChecker: '%',
          storeLoadCode: '%',
          vatNo: vatno,
          rows: 200,
          start: 1,
          isPrinted: true,
          cardType: 1,
          delFlag: false,
        })
      ).then((res) => {
        console.log(res)
        this.crudDlg = res.data.records;
        if (this.crudDlg.length > 0) {
          this.$refs.crudDlg.setCurrentRow(this.crudDlg[0]);
        }
        this.crudDlg.sort((a, b) => {
          return a.pidNo > b.pidNo ? 1 : -1;
        });
        this.pageDlg.total = this.pageDlg.total + res.data.total;
      });
    }
  },
};
</script>
<style lang="stylus" scoped></style>