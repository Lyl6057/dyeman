<!--value
 * @Author: Lyl
 * @Date: 2022-05-24 16:08:51
 * @LastEditors: PMP
 * @LastEditTime: 2022-07-23 14:39:16
 * @FilePath: \iot.vue\src\view\im\transferLoadQa\inWhse.vue
 * @Description: 
-->
<template>
  <div class="inWhse">
    <el-dialog id="Dlg" :visible.sync="dialogVisiable" width="100%" fullscreen append-to-body
      :close-on-click-modal="false">
      <view-container title="成品码卡信息">
        <div class="btnList">
          <el-button type="success" :disable="!selectList.length" @click="saveDetail">{{
              $t("public.save")
          }}</el-button>
          <el-button type="danger" @click="deleteDlg">删除</el-button>
          <el-button type="primary" @click="queryDlg" :disabled="Dlgloading">{{
              $t("public.query")
          }}</el-button>
          <el-button type="warning" @click="dialogVisiable = false">{{
              $t("public.close")
          }}</el-button>
        </div>
        <el-row class="formBox">
          <avue-form ref="formdlg" :option="formDlgOp" v-model="formDlg"> </avue-form>
        </el-row>
        <div class="formBox">
          <el-row>
            <el-col :span="11">
              <view-container title="可选择成品">
                <avue-crud ref="crudPreDlg" :option="crudOpDlg" :data="crudPreDlg" :page.sync="pageDlgPrePB"
                  @selection-change="selectionChangePre" v-loading="Dlgloading">
                </avue-crud>
              </view-container>
            </el-col>
            <el-col :span="2" style="justify-content: center;align-items: center; ">
              <el-row style="flex:1;justify-content: center;align-content: center;padding:17px">
                <el-button type="primary" @click="movetoLeft" style="margin-left:7px">{{ '<<<' }} </el-button>
                    <el-button type="primary" @click="movetoRight" style="">{{ '>>>' }}</el-button>
              </el-row>
            </el-col>
            <el-col :span="11">
              <view-container title="已选择成品">
                <avue-crud ref="crudDlg" :option="crudOpDlg" :data="crudDlg" :page.sync="pageDlgPB"
                  :element-loading-text="$t('public.loading')" @selection-change="selectionChange">
                </avue-crud>
              </view-container>
            </el-col>
          </el-row>
        </div>
      </view-container>
    </el-dialog>
    <el-row class="btnList">
      <el-button type="primary" @click="query">{{ this.$t("public.query") }}</el-button>
      <el-popover style="margin-left: 10px" placement="right" width="160" v-model="visiblePB">
        <p>是否确定提交出任务吗？</p>
        <div>
          <el-button size="mini" type="text" @click="visiblePB = false">取消</el-button>
          <el-button type="primary" size="mini" @click="handleInWhseTest">确定</el-button>
        </div>
        <el-button slot="reference" type="success">提交</el-button>
      </el-popover>

      <el-button type="warning" @click="handCheck()" style="margin-left: 10px" :disabled="!crud.length">更改成品</el-button>

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
import { fetchSelloutByPage, fetchPBSellout, getWayIOState } from "./api";
import { inWhseFormOp, inWhseCrudOp, dlgCrud, inWhseCrudPBOp, inWhseFormDlgOp } from "./data";
import { get } from "../../quaLity/codeCard/api"
import { sendTestTaskNoin } from "../whseInOutKB/api"
export default {
  components: {},
  props: {},
  data() {
    return {
      testdata: [],
      wloading: false,
      crudOp: inWhseCrudOp(this),
      crudOpPB: inWhseCrudPBOp(this),
      crudOpDlg: dlgCrud(this),
      crud: [],
      crudPB: [],
      crudDlg: [],
      crudPreDlg: [],
      formOp: inWhseFormOp(this),
      formDlgOp: inWhseFormDlgOp(this),
      form: {
        type: 1,
      },
      formDlg: {},
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
      pageDlgPB: {
        pageSizes: [10, 50, 100, 200, 500],
        pageSize: 100,
        currentPage: 1,
        total: 0,
      },
      pageDlg: {
        pageSizes: [10, 50, 100, 200, 500],
        pageSize: 100,
        currentPage: 1,
        total: 0,
      },
      pageDlgPrePB: {
        pageSizes: [10, 50, 100, 200, 500],
        pageSize: 1000,
        currentPage: 1,
        total: 0,
      },
      selectList: [],
      selectListPre: [],
      clothType: false,// false : 成品 true：胚布
      visible: false,
      visiblePB: false,
      dialogVisiable: false,
      Dlgloading: false,
      data: [],
      transfer: [1, 4],
      canSave: false
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
      if (entrance.slice(0, 1) == "Q" || entrance.slice(0, 1) == "S") {
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
          this.canSave = true;
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
            this.canSave = true;
            //console.log(this.crudPB)
          })
      }
    },
    deleteDlg() {
      this.crudPreDlg = [];
    },
    queryDlg() {
      this.Dlgloading = true;
      get(
        Object.assign({
          vatNo: this.formDlg.vatNo
        }, {
          rows: this.pageDlgPrePB.pageSize,
          start: this.pageDlgPrePB.currentPage,
          isPrinted: true,
          cardType: 1,
          delFlag: false,
        })
      ).then((res) => {
        if (this.crudPreDlg.length > 0) {
          this.$refs.crudPreDlg.setCurrentRow(this.crud[0]);
        }
        res.data.records.map((e) => {
          this.crudPreDlg.push(e);
        })
        this.crudPreDlg.sort((a, b) => {
          return a.pidNo > b.pidNo ? 1 : -1;
        });
        this.crudPreDlg.forEach((item, i) => {
          // item.$cellEdit = true;
          item.index = i + 1;
        });
        this.crudPreDlg.total = this.crudPreDlg.total + this.pagePB.total;
        setTimeout(() => {
          this.$refs.crudPreDlg.setCurrentRow(this.crud[0] || {});
          this.Dlgloading = false;
        }, 200);
      });
    },
    movetoLeft() {
      let array = [];
      if (this.selectList.length > 0) {
        this.selectList.map((e) => {
          this.crudPreDlg.push(e);
        })
      }
      this.crudDlg.map((e) => {
        let index = this.selectList.findIndex(item => item.productNo == e.productNo);
        if (index == -1) {
          array.push(e)
        }
      })
      this.crudDlg = array;
      this.pageDlgPrePB.total = this.crudPreDlg.length;
      this.pageDlgPB.total = this.crudDlg.length;
    },
    movetoRight() {
      let array = [];
      if (this.selectListPre.length > 0) {
        this.selectListPre.map((e) => {
          if (this.crudDlg.findIndex(item => item == e) != -1) {
            this.$tip.warning("这个成品编号您已经选过了， Bạn đã chọn qua mã này rồi!");
          } else {
            this.crudDlg.push(e);
          }
        })
        this.crudPreDlg.map((e) => {
          let index = this.selectListPre.findIndex(item => item.productNo == e.productNo);
          if (index == -1) {
            array.push(e)
          }
        })
        this.crudPreDlg = array;
        this.pageDlgPrePB.total = this.crudPreDlg.length;
        this.pageDlgPB.total = this.crudDlg.length;
      }
    },
    saveDetail() {
      this.$tip.cofirm("您确定需要改下成品吗？").then(() => {
        this.crud = [];
        this.crudDlg.map((e) => {
          this.crud.push({
            countingNo: e.pidNo,
            productId: e.cardId,
            prodNo: e.vatNo,
            productNo: e.productNo,
            storeLoadCode: this.form.code,
            woUnit: e.weightUnit,
            woWeights: e.netWeight,
            woWeightsLbs: e.netWeightLbs,
          })
        });
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
        this.dialogVisiable = false;
        this.$tip.success("操作成功！")
      })

    },
    handleInWhseTest() {
      // console.log(this.canSave);
      // this.$tip.warning("测试功能正在开发...!");
      // return;
      // let { code, entrance, layer } = this.form;
      // let PBType = entrance.indexOf("S") != -1 ? true : false;
      // let length = PBType ? this.crudPB.length : this.crud.length;
      // if (!code || !entrance || !length) {
      //   this.$tip.warning("请先输入载具编号和库口!");
      //   return;
      // }
      // this.visiblePB = false;
      // let orderType = PBType ? 6 : 4;
      // // 生成入库记录
      // let list = PBType ? this.crudPB : this.crud;

      //  if (PBType) {
      //     wcdList.push({
      //       noteCode: e.noteCode,
      //       pidNo: e.countingNo,
      //       weaveJobCode: e.weaveJobCode,
      //       weight: e.woWeights,
      //       weightUnit: e.woUnit,
      //       whseCalicoinDtlaFk: e.whseCalicoOutDtlaFk,
      //       whseCalicoinDtlboid: e.outDtlbId,
      //     })
      let { code, entrance, layer } = this.form;
      let length = this.crud.length;
      if (!code || !entrance || !length) {
        this.$tip.warning("请先输入载具编号和库口!");
        return;
      }
      if (!this.canSave) {
        this.$tip.warning("您需要先查询然后才能提交， Bạn vui lòng tra cứu lại để thực hiện thao tác này!");
        return;
      }
      this.visiblePB = false;
      let orderType = 4;
      // 生成入库记录
      let list = this.crud;
      this.wloading = true;
      let data = {
        barCode: code,
        createTime: this.$getNowTime("datetime"),
        entrance: entrance, // 入库口
        isEmpty: 0, // 是否为空
        orderType, // 出库/入库
        layer: layer,
        type: 2, // 物料类别 S=0 Q=2
      };
      const wcdList = [];
      const wfiList = [];
      list.map((e) => {

        wfiList.push({
          pidNo: e.countingNo,
          productNo: e.productNo,
          vatNo: e.prodNo,
          weight: e.woWeights,
          weightLbs: e.woWeightsLbs,
          weightUnit: e.woUnit,
        })

      })
      // let params = PBType ?
      //   Object.assign(data, { wcd: wcdList }) :
      //   Object.assign(data, { wfi: wfiList });
      let params = Object.assign(data, { wfi: wfiList });
      try {
        this.wloading = false;
        sendTestTaskNoin(params).then((res) => {
          this.wloading = false;
          if (res.data.code == 200) {
            this.$tip.success(res.data.msg);
          } else {
            this.$tip.error(res.data.msg);
          }
        })
        this.wloading = false;
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
    selectionChange(list) {
      this.selectList = list;
    },
    selectionChangePre(list) {
      this.selectListPre = list;
    },
    handCheck() {
      this.wloading = true;
      this.pageDlgPB.total = this.crud.length;
      this.crudDlg = [];
      this.crudPreDlg = [];
      this.crud.map((e, i) => {
        this.crudDlg.push({
          pidNo: e.countingNo,
          cardId: e.productId,
          vatNo: e.prodNo,
          productNo: e.productNo,
          weightUnit: e.woUnit,
          netWeight: e.woWeights,
          netWeightLbs: e.woWeightsLbs,
        })
      })
      setTimeout(() => {
        this.dialogVisiable = true;
        this.wloading = false;
      }, 500);
    },
    changeState() {
      this.canSave = false;
    },
     setLayer() {
      if (this.form.entrance == null) {
        this.form.layer = 1
      } else {
        this.form.layer = (
          this.form.entrance.slice(0, 1) == "Q" || 
          this.form.entrance.slice(0, 1) == "S" ||
          this.form.entrance.slice(0, 1) == "Y"
          ) ? 1 : 2;
      }
    }
  },
};
</script>
<style lang="stylus" scoped></style>