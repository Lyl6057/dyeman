<!--
 * @Author: Lyl
 * @Date: 2021-02-25 09:10:26
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-05 18:59:08
 * @Description:  送檢單組件
-->

<template>
  <div id="insSheet">
    <el-dialog
      id="choiceDlg"
      :visible.sync="sheetV"
      fullscreen
      append-to-body
      :close-on-click-modal="false"
      v-if="sheetV"
    >
      <view-container :title="$t('choicDlg.sdsc') + tle + $t('choicDlg.sjd')">
        <div class="btnList">
          <el-button type="success" @click="save">{{
            this.$t("public.save")
          }}</el-button>
          <el-button type="warning" @click="close">{{
            this.$t("public.close")
          }}</el-button>
        </div>
        <div class="formBox">
          <avue-form ref="form" :option="sheetF" v-model="form"></avue-form>
        </div>
        <el-row class="crudBox">
          <el-col :span="tle === this.$t('iaoMng.sx') ? 24 : 12">
            <view-container :title="tle + $t('choicDlg.sjdmx')">
              <avue-crud
                style="margin-top: 3px"
                ref="crud"
                :option="sheetC"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
                @current-row-change="cellClick"
              >
              </avue-crud>
            </view-container>
          </el-col>
          <el-col :span="tle === this.$t('iaoMng.sx') ? 0 : 12">
            <view-container :title="tle + $t('choicDlg.sjdphmx')">
              <avue-crud
                style="margin-top: 3px"
                ref="dlta"
                :option="sheetDtla"
                :data="chooseData.loc"
                @current-row-change="dtlaCellClick"
              >
              </avue-crud>
            </view-container>
          </el-col>
        </el-row>
      </view-container>
    </el-dialog>
  </div>
</template>
<script>
import {
  sxForm,
  sxCrud,
  pbCrud,
  pbDtlbCrud,
  hgylCrud,
  hgylDtlbCrud,
  ylCrud,
} from "./data";
import { getUcmlUser } from "@/const/whse.js";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import {
  getSx,
  addSx,
  updateSx,
  getSxDetali,
  addSxDetali,
  updateSxDetali,
  getPb,
  updatePb,
  addPb,
  getPbDla,
  updatePbDla,
  addPbDla,
  addPbDlb,
  getPbDlb,
  updatePbDlb,
  getHgyl,
  updateHgyl,
  addHgyl,
  getHgylDla,
  updateHgylDla,
  addHgylDla,
  addHgylDlb,
  getHgylDlb,
  updateHgylDlb,
} from "./api";
export default {
  name: "",
  props: {
    tle: String,
    sheetV: false,
    inForm: Object,
    inCrud: Array,
  },
  components: {},
  data() {
    return {
      oldData: {},
      chooseData: {},
      oldDtlaData: {},
      chooseDtlaData: {},
      sheetF: sxForm(this),
      form: {},
      sheetC: sxCrud(this),
      crud: [],
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      api: {},
      sheetDtla: {},
      dtla: [],
    };
  },
  watch: {},
  methods: {
    getData() {
      this.loading = true;
      switch (this.tle) {
        case this.$t("iaoMng.sx"):
          this.sheetF = sxForm(this);
          this.sheetC = sxCrud(this);
          this.api.get = getSx;
          this.api.update = updateSx;
          this.api.add = addSx;
          this.api.getD = getSxDetali;
          this.api.updateD = updateSxDetali;
          this.api.addD = addSxDetali;
          break;
        case this.$t("iaoMng.pb"):
          this.sheetF = sxForm(this);
          this.sheetC = pbCrud(this);
          this.sheetDtla = pbDtlbCrud(this);
          this.api.get = getPb;
          this.api.update = updatePb;
          this.api.add = addPb;
          this.api.getD = getPbDla;
          this.api.updateD = updatePbDla;
          this.api.addD = addPbDla;
          this.api.getDtlb = getPbDlb;
          this.api.updateDtlb = updatePbDlb;
          this.api.addDtlb = addPbDlb;
          break;
        case this.$t("iaoMng.hgyl"):
          this.sheetF = sxForm(this);
          this.sheetC = hgylCrud(this);
          this.sheetDtla = hgylDtlbCrud(this);
          this.api.get = getHgyl;
          this.api.update = updateHgyl;
          this.api.add = addHgyl;
          this.api.getD = getHgylDla;
          this.api.updateD = updateHgylDla;
          this.api.addD = addHgylDla;
          this.api.getDtlb = getHgylDlb;
          this.api.updateDtlb = updateHgylDlb;
          this.api.addDtlb = addHgylDlb;
          break;
        case this.$t("iaoMng.yl"):
          this.sheetF = sxForm(this);
          this.sheetC = ylCrud(this);
          this.sheetDtla = hgylDtlbCrud(this);
          this.api.get = getHgyl;
          this.api.update = updateHgyl;
          this.api.add = addHgyl;
          this.api.getD = getHgylDla;
          this.api.updateD = updateHgylDla;
          this.api.addD = addHgylDla;
          this.api.getDtlb = getHgylDlb;
          this.api.updateDtlb = updateHgylDlb;
          this.api.addDtlb = addHgylDlb;
          break;
        default:
          break;
      }
      //  先校验是否存在此送检单（出库）
      this.api
        .get({
          rows: 10,
          start: 1,
          batchNumber: this.inForm.yinId, // 紗線
          retBatch: this.inForm.yinId, // 胚布
          retType: "10",
        })
        .then((res) => {
          if (res.data.records.length === 0) {
            // 不存在
            this.form.batchNumber = this.inForm.yinId;
            this.form.retBatch = this.inForm.yinId;
            this.form.retType = "10";
            this.form.sysCreatedby = this.inForm.sysCreatedby;
            this.crud = JSON.parse(JSON.stringify(this.inCrud));
            if (this.tle === this.$t("iaoMng.sx")) {
              this.crud.forEach((i, index) => {
                // i.$cellEdit = true;
                // i.weight = Math.ceil(i.weight / 100);
                i.list = [];
                i.loc = [];
                i.weight = 1;
              });
            }
            if (this.tle === this.$t("iaoMng.pb")) {
              this.crud.forEach((i, index) => {
                i.loc.forEach((j, indexs) => {
                  // j.weight = Math.ceil(j.weight / 100);
                  j.weight = 1;
                });
              });
            }
            if (
              this.tle === this.$t("iaoMng.hgyl") ||
              this.tle === this.$t("iaoMng.yl")
            ) {
              this.crud.forEach((i, index) => {
                i.loc = i.list;
                i.loc.forEach((j, indexs) => {
                  // j.weight = Math.ceil(j.weight / 100);
                  j.weight = 1;
                });
              });
            }

            // getUcmlUser({ usrLogin: parent.userID }).then((Res) => {
            //   this.form.sysCreatedby = Res.data.ucmlUseroid;
            // });
            this.form.retDate = this.$getNowTime();
            baseCodeSupplyEx({ code: "whse_out" }).then((res) => {
              this.form.retCode = res.data.data;
            });
          } else {
            // 存在
            this.form = res.data.records[0];
            this.form.batchNumber = this.inForm.yinId;
            this.form.retBatch = this.inForm.yinId;
            // this.form.sysCreatedby = this.inForm.sysCreatedby;
            this.api
              .getD({
                whseRetyarninFk: this.form.whseRetyarninoid,
                whseMaterialFk: this.form.whseMaterialoid,
                whseChemicalFk: this.form.whseChemicaloid,
                rows: this.page.pageSize,
                start: this.page.currentPage,
              })
              .then((Res) => {
                let records = Res.data;
                this.page.total = records.total;
                this.crud = records.records;
                this.crud.forEach((item, index) => {
                  item.$cellEdit = true;
                  item.loc = [];
                  item.index = index + 1;
                  item.ennamelong = item.chemicalSname;
                  item.modeltype = item.chemicalId;
                  item.vitality = item.chemicalId;
                });
              });
          }
          setTimeout(() => {
            this.$refs.crud.setCurrentRow(this.crud[0]);
            this.loading = false;
            this.sheetDtla.showSummary = true;
          }, 200);
        });
    },
    getDtlb() {
      if (this.chooseData.loc.length != 0) {
        return;
      }
      // this.sheetDtla.showSummary = false;
      this.api
        .getDtlb({
          rows: 50,
          start: 1,
          whseMaterialDlaFk: this.chooseData.whseMaterialDlaoid,
          whseChemicalDlaFk: this.chooseData.whseChemicalDlaoid,
        })
        .then((res) => {
          let records = res.data;
          records.records.sort((a, b) => {
            return a.countingNo - b.countingNo;
          });
          records.records.forEach((item, i) => {
            item.index = i + 1;
            this.chooseData.loc.push(item);
            if (i === records.records.length - 1) {
              this.$nextTick(() => {
                this.sheetDtla.showSummary = true;
                this.$refs["dlta"].doLayout();
              });
            }
          });
        });
    },
    save() {
      if (!this.form.batchNumber) {
        this.$tip.error(this.$t("iaoMng.saveTle8"));
        return;
      }
      if (this.tle === this.$t("iaoMng.sx")) {
        for (let i = 0; i < this.crud.length; i++) {
          if (!this.crud[i].weight) {
            this.$tip.error(this.$t("iaoMng.saveTle9"));
            return;
          }
        }
      }
      if (this.tle === this.$t("iaoMng.pb")) {
        for (let i = 0; i < this.crud.length; i++) {
          if (this.crud[i].loc) {
            for (let j = 0; j < this.crud[i].loc.length; j++) {
              if (this.crud[i].loc[j].weight === "") {
                this.$tip.error(this.$t("iaoMng.saveTle9"));
                return;
              }
            }
          }
        }
      }
      this.loading = true;
      if (
        this.form.whseRetyarninoid ||
        this.form.whseMaterialoid ||
        this.form.whseChemicaloid
      ) {
        this.api.update(this.form).then((res) => {
          if (this.crud.length === 0) {
            setTimeout(() => {
              this.loading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              item.yarnsName = item.$yarnsName;
              item.chemicalName = item.chemicalName;
              item.chemicalSname = item.$ennamelong;
              let data = JSON.parse(JSON.stringify(item));
              data.loc = [];
              data.list = [];
              if (
                item.whseRetyarninDtloid ||
                item.whseMaterialDlaoid ||
                item.whseChemicalDlaoid
              ) {
                this.api.updateD(data).then((res) => {
                  resolve();
                });
              } else {
                data.whseRetyarninFk = this.form.whseRetyarninoid;
                data.whseMaterialFk = this.form.whseMaterialoid;
                data.whseChemicalFk = this.form.whseChemicaloid;
                this.api.addD(data).then((res) => {
                  item.whseRetyarninDtloid = res.data.data;
                  item.whseMaterialDlaoid = res.data.data;
                  item.whseChemicalDlaoid = res.data.data;
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.crud.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            this.crud.forEach((item, index) => {
              if (item.loc && item.loc.length > 0) {
                console.log(item.loc);
                item.loc.forEach((loc, index) => {
                  if (loc.whseMaterialDlboid || loc.whseChemicalDlboid) {
                    this.api.updateDtlb(loc).then((res) => {});
                  } else {
                    loc.whseMaterialDlaFk = item.whseMaterialDlaoid;
                    loc.whseChemicalDlaFk = item.whseChemicalDlaoid;
                    this.api.addDtlb(loc).then((res) => {
                      loc.whseMaterialDlboid = res.data.data;
                      loc.whseChemicalDlboid = res.data.data;
                    });
                  }
                });
              }
              if (index === this.crud.length - 1) {
                // this.getDetail();
                setTimeout(() => {
                  this.loading = false;
                  this.$tip.success(this.$t("public.bccg"));
                }, 200);
              }
            });
          });
        });
      } else {
        this.form.sysCreated = this.$getNowTime("datetime");
        this.api.add(this.form).then((res) => {
          if (this.crud.length === 0) {
            setTimeout(() => {
              this.loading = false;
              this.$tip.success(this.$t("public.bccg"));
            }, 200);
          }
          this.form.whseMaterialoid = res.data.data;
          this.form.whseRetyarninoid = res.data.data;
          this.form.whseChemicaloid = res.data.data;
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              item.yarnsName = item.$yarnsName;
              item.chemicalName = item.chemicalName;
              item.chemicalSname = item.$ennamelong;
              let data = JSON.parse(JSON.stringify(item));
              data.loc = [];
              data.list = [];
              if (
                item.whseRetyarninDtloid ||
                item.whseMaterialDlaoid ||
                item.whseChemicalDlaoid
              ) {
                this.api.updateD(data).then((res) => {
                  resolve();
                });
              } else {
                data.whseRetyarninFk = this.form.whseRetyarninoid;
                data.whseMaterialFk = this.form.whseMaterialoid;
                data.whseChemicalFk = this.form.whseChemicaloid;
                this.api.addD(data).then((res) => {
                  item.whseRetyarninDtloid = res.data.data;
                  item.whseMaterialDlaoid = res.data.data;
                  item.whseChemicalDlaoid = res.data.data;
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.crud.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            this.crud.forEach((item, index) => {
              if (item.loc && item.loc.length > 0) {
                item.loc.forEach((loc, index) => {
                  if (loc.whseMaterialDlboid || loc.whseChemicalDlboid) {
                    this.api.updateDtlb(loc).then((res) => {});
                  } else {
                    loc.whseMaterialDlaFk = item.whseMaterialDlaoid;
                    loc.whseChemicalDlaFk = item.whseChemicalDlaoid;
                    this.api.addDtlb(loc).then((res) => {
                      loc.whseMaterialDlboid = res.data.data;
                      loc.whseChemicalDlboid = res.data.data;
                    });
                  }
                });
              }
              if (index === this.crud.length - 1) {
                // this.getDetail();
                setTimeout(() => {
                  this.loading = false;
                  this.$tip.success(this.$t("public.bccg"));
                }, 200);
              }
            });
          });
        });
      }
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
      if (
        this.chooseData.whseMaterialDlaoid ||
        this.chooseData.whseChemicalDlaoid
      ) {
        this.getDtlb();
      }
    },
    dtlaCellClick(val) {
      this.oldDtlaData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldDtlaData = val;
      this.chooseDtlaData = val;
    },
    close() {
      // this.sheetV = false;
      this.$emit("close");
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#name {
}
</style>