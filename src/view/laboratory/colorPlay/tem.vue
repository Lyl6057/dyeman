<template>
  <div id="colorPlay_Tem">
    <view-container
      title="色号资料管理"
      :element-loading-text="$t('public.loading')"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="close">{{
          this.$t("public.close")
        }}</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row>
        <el-col :span="11">
          <view-container title="打办类型明细">
            <!-- <div class="btnList">
              <el-button type="primary" @click="processDlg = true"
                >工艺参数</el-button
              >
            </div> -->
            <div class="crudBox" style="margin-top: 5px">
              <avue-crud
                ref="crud"
                :option="crudOp"
                :data="crud"
                :page.sync="page"
                v-loading="loading"
                @on-load="query"
                @cell-click="cellClick"
              ></avue-crud>
            </div> </view-container
        ></el-col>
        <el-col :span="13" class="dtlTbs">
          <el-tabs type="border-card" v-model="tabs" @tab-click="tabClick">
            <el-tab-pane label="染色配方" name="rs"></el-tab-pane>
            <el-tab-pane label="定胚配方" name="dp"></el-tab-pane>
            <el-tab-pane label="定型配方" name="dx"></el-tab-pane>
            <el-tab-pane label="煮练配方" name="zl"></el-tab-pane>
            <el-tab-pane label="皂洗配方" name="zx"></el-tab-pane>
          </el-tabs>
          <div class="btnList">
            <el-button type="primary" @click="add">{{
              this.$t("public.add")
            }}</el-button>
            <el-button type="danger" @click="del">{{
              this.$t("public.del")
            }}</el-button>
            <el-button type="primary" @click="up">上移</el-button>
            <el-button type="primary" @click="down">下移</el-button>
            <el-button type="primary" @click="openPro">工艺参数</el-button>
          </div>
          <div class="crudBox" style="margin-top: 5px">
            <avue-crud
              ref="dtle"
              id="dtle"
              :option="dtleOp"
              :data="crudCheck[this.tabs]"
              :page.sync="dtlePage"
              v-loading="loading"
              @cell-click="cellDtleClick"
            ></avue-crud></div
        ></el-col>
      </el-row>
    </view-container>
    <el-dialog
      id="colorMng_Dlg"
      class="process_Dlg"
      :visible.sync="processDlg"
      width="70%"
      height="70%"
      append-to-body
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="processDlg"
    >
      <view-container :title="xTle" class="dtlTbs">
        <div class="btnList">
          <!-- <el-button type="success" @click="savePro">{{this.$t("public.save")}}</el-button> -->
          <el-button type="primary" @click="addPro">{{
            this.$t("public.add")
          }}</el-button>
          <el-button type="danger" @click="delPro">{{
            this.$t("public.del")
          }}</el-button>
          <el-button type="warning" @click="proClose">{{
            this.$t("public.close")
          }}</el-button>
        </div>
        <div class="crudBox" style="margin-top: 5px">
          <!--    :data="pro" -->
          <avue-crud
            ref="process"
            :option="proOp"
            :data="crudCheck[this.tabs + 's']"
            :page.sync="proPage"
            v-loading="proLoading"
            @cell-click="cellProClick"
          ></avue-crud>
        </div>
      </view-container>
    </el-dialog>
    <choice
      :choiceV="choiceV"
      :choiceTle="choiceTle"
      :choiceQ="choiceQ"
      :dlgWidth="dlgWidth"
      @choiceData="choiceData"
      @close="choiceV = false"
      v-if="choiceV"
    ></choice>
    <bas-dyestuff
      :showDlg="addDlg"
      dlgTle="选择染化料"
      @choiceData="choiceDyestuff"
      @close="addDlg = false"
    >
    </bas-dyestuff>
  </div>
</template>
<script>
import {
  popupForm,
  popupCrud,
  dtleCrud,
  dtlexCrud,
  dtlfCrud,
  dtlixCrud,
} from "./data";
import {
  getDepth,
  getCodeSupply,
  getLdNoticeList,
  getLdNotice,
  addLdNotice,
  updateLdNotice,
  // 打办类型,
  getLdNoticeDtld,
  addLdNoticeDtld,
  updateLdNoticeDtld,
  delLdNoticeDtld,
  // 打办类型配方,
  getLdNoticeDtle,
  addLdNoticeDtle,
  updateLdNoticeDtle,
  delLdNoticeDtle,
  getBasChemicalmatList,
  getBasPigmentList,
  //  diyApi
  getLdNoticeDtl,
  addLdNoticeDtl,
  updateLdNoticeDtl,
  delLdNoticeDtl,
  getLdNoticeDtlx,
  addLdNoticeDtlx,
  updateLdNoticeDtlx,
  delLdNoticeDtlx,
} from "./api";
import bas_dyestuff from "@/components/bas_dyestuff/index";
import choice from "@/components/choice";
import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupply, getCodeValue } from "@/api/index";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
    code: Array,
  },
  components: {
    choice: choice,
    basDyestuff: bas_dyestuff,
  },
  data() {
    return {
      wLoading: false,
      loading: false,
      formOp: popupForm(this),
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      dtlePage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      crudOp: popupCrud(this),
      crud: [],
      dtleOp: dtleCrud(this),
      dtle: [],
      minRows: 1,
      maxRows: 5,
      choiceV: false,
      choiceTle: this.$t("choicDlg.xzkh"),
      choiceTarget: {},
      choiceField: "",
      choiceQ: {},
      lightDic: [],
      dlgWidth: "60%",
      codeSupplyNum: 0,
      refresh: false,
      // code: getDIC("bas_companyCode"), // 公司代号
      crudCheck: {},
      dlteCheck: {},
      version: 0,
      deled: false,
      addDlg: false,
      processDlg: false,
      proOp: dtlexCrud(this),
      pro: [],
      proPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      proCheck: {},
      proLoading: false,
      tabs: "rs",
      tName: "salLdNoticeDtle/pages",
      oidName: "labLdNoticeDtleoid",
      xName: "labLdNoticeDtlex/page",
      xTle: "染色工艺参数",
    };
  },
  watch: {},
  methods: {
    getData() {
      this.wLoading = true;
      if (this.isAdd) {
        getCodeSupply().then((res) => {
          this.codeSupplyNum = Number(res.data.data) + 1;
          this.form = {
            rundwownDate: this.getNowTime(),
            isCloth: false,
            colorRequest: 1,
            runcolorQty: 0,
            runNo: "LD-" + this.code[0].label + this.codeSupplyNum,
          };
          this.wLoading = false;
        });
      } else {
        this.form = this.detail;
        setTimeout(() => {
          this.query();
          this.wLoading = false;
        }, 500);
      }
    },
    query() {
      if (!this.isAdd && this.form.salLdNoticeoid) {
        this.loading = true;
        getLdNoticeDtld({
          rows: this.page.pageSize,
          start: this.page.currentPage,
          salLdNoticeFk: this.form.salLdNoticeoid,
        })
          .then((res) => {
            let records = res.data;
            this.page.total = records.total;
            this.crud = records.records;
            this.crud.sort((a, b) => {
              var a1 = a.typeNo.toLowerCase();
              var b1 = b.typeNo.toLowerCase();
              if (a1 < b1) return -1;
              if (a1 > b1) return 1;
              return 0;
            });
            this.crud.forEach((item, index) => {
              item.index = index + 1;
              if (!item.sendFlag) {
                item.sendDate = "";
              }
              item.$cellEdit = true;
              if (index === this.crud.length - 1) {
                this.$nextTick(() => {
                  this.$refs.crud.setCurrentRow(this.crud[0]);
                  this.cellClick(this.crud[0]);
                });

                this.loading = false;
              }
            });
            if (this.crud.length === 0) {
              this.loading = false;
            }
          })
          .catch((e) => {
            this.loading = false;
          });
      }
    },
    getFormula() {
      if (!this.isAdd) {
        this.loading = true;
        this.dtleOp.showSummary = false;
        getLdNoticeDtl(this.tName, {
          rows: this.dtlePage.pageSize,
          start: this.dtlePage.currentPage,
          salLdNoticeDtldFk: this.crudCheck.salLdNoticeDtldoid,
        })
          .then((res) => {
            let records = res.data;
            this.dtlePage.total = records.total;
            this.crudCheck[this.tabs] = records.records;
            this.crudCheck[this.tabs].sort((a, b) => {
              return a.lineNo - b.lineNo;
            });
            this.crudCheck[this.tabs].forEach((item, index) => {
              item.index = index;
              item.$cellEdit = true;
              if (index === this.crudCheck[this.tabs].length - 1) {
                this.dtleOp.showSummary = true;

                this.loading = false;
              }
            });
            if (this.crudCheck[this.tabs].length === 0) {
              this.loading = false;
            }
          })
          .catch((e) => {
            this.loading = false;
          });
      }
    },
    openPro() {
      if (Object.keys(this.crudCheck).length === 0) {
        this.$tip.warning("请先选择打办类型明细!");
        return;
      }
      if (!this.crudCheck[this.tabs + "s"]) {
        this.crudCheck[this.tabs + "s"] = [];
      }
      if (this.crudCheck[this.tabs + "s"].length === 0) {
        this.getProcess();
      }
      this.processDlg = true;
    },
    getProcess() {
      if (this.isAdd) {
        return;
      }
      this.proLoading = true;
      getLdNoticeDtlx(this.xName, {
        rows: this.proPage.pageSize,
        start: this.proPage.currentPage,
        salLdNoticeDtldFk: this.crudCheck.salLdNoticeDtldoid,
      })
        .then((res) => {
          let records = res.data;
          this.proPage.total = records.total;
          this.crudCheck[this.tabs + "s"] = records.records;
          // this.crudCheck[this.tabs + 's'].sort((a, b) => {
          //   return a.lineNo - b.lineNo;
          // });
          this.crudCheck[this.tabs + "s"].forEach((item, index) => {
            for (let key in item) {
              if (item[key] === null) {
                delete item[key];
              }
            }
            item.index = index + 1;
            item.$cellEdit = true;
            if (index === this.crudCheck[this.tabs + "s"].length - 1) {
              this.proLoading = false;
            }
          });
          if (this.crudCheck[this.tabs + "s"].length === 0) {
            this.proLoading = false;
          }
        })
        .catch((e) => {
          this.proLoading = false;
        });
    },
    save() {
      if (this.form.colorNo === "") {
        this.$tip.error("色号不能为空!");
        return;
      } else if (
        this.form.rundwownDate === "" ||
        this.form.handoverDate === ""
      ) {
        this.$tip.error("下办日期/交办日期不能为空!");
        return;
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (
          this.crud[i].sendFlag &&
          (this.crud[i].sendDate === null ||
            this.crud[i].sendDate === "" ||
            this.crud[i].sendDate === undefined)
        ) {
          this.$tip.error("交办日期不能为空!");
          return;
        }
        if (!this.crud[i][this.tabs]) {
          break;
        }
        // for (let j = 0; j < this.crud[i][this.tabs].length; j++) {
        //   if (!this.crud[i][this.tabs][j].formulaValue) {
        //     this.$tip.error("配方量不能为空!");
        //     return;
        //   }
        // }
      }
      this.wLoading = true;
      this.refresh = true;
      if (this.form.salLdNoticeoid) {
        updateLdNotice(this.form).then((res) => {
          if (this.crud.length === 0) {
            this.wLoading = false;
            this.$tip.success(this.$t("public.bccg"));
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              let list = [
                "rs",
                "dp",
                "dx",
                "zl",
                "zx",
                "rss",
                "dps",
                "dxs",
                "zls",
                "zxs",
              ];
              list.forEach((type) => {
                data[type] = [];
              });
              if (item.salLdNoticeDtldoid) {
                updateLdNoticeDtld(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.salLdNoticeFk = this.form.salLdNoticeoid;
                addLdNoticeDtld(data).then((res) => {
                  item.salLdNoticeDtldoid = res.data.data;
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.crud.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            for (let i = 0; i < this.crud.length; i++) {
              // let list = ["rs", "dp", "dx", "zl", "zx"];
              let list = [
                { type: "rs", name: "salLdNoticeDtle" },
                { type: "rss", name: "labLdNoticeDtlex" },
                { type: "dp", name: "labLdNoticeDtlf" },
                { type: "dps", name: "labLdNoticeDtlfx" },
                { type: "dx", name: "labLdNoticeDtlg" },
                { type: "dxs", name: "labLdNoticeDtlgx" },
                { type: "zl", name: "labLdNoticeDtlh" },
                { type: "zls", name: "labLdNoticeDtlhx" },
                { type: "zx", name: "labLdNoticeDtli" },
                { type: "zxs", name: "labLdNoticeDtlix" },
              ];
              list.forEach((type) => {
                if (this.crud[i][type.type]) {
                  this.crud[i][type.type].forEach((item) => {
                    if (!item.labLdNoticeDtleoid && !item[type.name + "oid"]) {
                      item.salLdNoticeDtldFk = this.crud[i].salLdNoticeDtldoid;
                      addLdNoticeDtl(type.name, item).then((res) => {
                        item.salLdNoticeDtleoid = res.data.data;
                      });
                    } else {
                      updateLdNoticeDtl(type.name, item).then((res) => {});
                    }
                  });
                }
              });

              if (i === this.crud.length - 1) {
                // this.getDetail();
                this.wLoading = false;
                this.deled = false;
                this.$tip.success(this.$t("public.bccg"));
              }
            }
          });
        });
      } else {
        this.form.labTapcolorFk = this.form.labTapcoloroid;
        addLdNotice(this.form).then((res) => {
          baseCodeSupply({ code: "ld_num" }).then((res) => {});
          if (this.crud.length === 0) {
            this.wLoading = false;
            this.$tip.success(this.$t("public.bccg"));
          }
          this.form.salLdNoticeoid = res.data.data;
          // this.$emit("getData");
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              let list = [
                "rs",
                "dp",
                "dx",
                "zl",
                "zx",
                "rss",
                "dps",
                "dxs",
                "zls",
                "zxs",
              ];
              list.forEach((type) => {
                data[type] = [];
              });

              if (item.salLdNoticeDtldoid) {
                updateLdNoticeDtld(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.salLdNoticeFk = this.form.salLdNoticeoid;
                addLdNoticeDtld(data).then((res) => {
                  item.salLdNoticeDtldoid = res.data.data;
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.crud.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            for (let i = 0; i < this.crud.length; i++) {
              let list = [
                { type: "rs", name: "salLdNoticeDtle" },
                { type: "rss", name: "labLdNoticeDtlex" },
                { type: "dp", name: "labLdNoticeDtlf" },
                { type: "dps", name: "labLdNoticeDtlfx" },
                { type: "dx", name: "labLdNoticeDtlg" },
                { type: "dxs", name: "labLdNoticeDtlgx" },
                { type: "zl", name: "labLdNoticeDtlh" },
                { type: "zls", name: "labLdNoticeDtlhx" },
                { type: "zx", name: "labLdNoticeDtli" },
                { type: "zxs", name: "labLdNoticeDtlix" },
              ];
              list.forEach((type) => {
                if (this.crud[i][type.type]) {
                  this.crud[i][type.type].forEach((item) => {
                    if (!item.labLdNoticeDtleoid && !item[type.name + "oid"]) {
                      item.salLdNoticeDtldFk = this.crud[i].salLdNoticeDtldoid;
                      addLdNoticeDtl(type.name, item).then((res) => {
                        item[type.name + "oid"] = res.data.data;
                      });
                    } else {
                      updateLdNoticeDtl(type.name, item).then((res) => {});
                    }
                  });
                }
              });
              if (i === this.crud.length - 1) {
                // this.getDetail();
                this.deled = false;
                this.wLoading = false;
                this.$tip.success(this.$t("public.bccg"));
              }
            }
          });
        });
      }
    },
    handleClose(done) {
      for (let i = 0; i < this.crudCheck[this.tabs + "s"].length; i++) {
        if (
          this.tabs === "rs" &&
          (!this.crudCheck[this.tabs + "s"][i].speed ||
            !this.crudCheck[this.tabs + "s"][i].temperature)
        ) {
          this.$tip.error("机速/温度不能为空!");
          return;
        }
        if (
          (this.tabs === "dp" || this.tabs === "dx") &&
          (!this.crudCheck[this.tabs + "s"][i].speed ||
            !this.crudCheck[this.tabs + "s"][i].temperature ||
            !this.crudCheck[this.tabs + "s"][i].fabWidth)
        ) {
          this.$tip.error("布封/机速/温度不能为空!");
          return;
        }
        if (
          (this.tabs === "zl" || this.tabs === "zx") &&
          (!this.crudCheck[this.tabs + "s"][i].speed ||
            !this.crudCheck[this.tabs + "s"][i].temperature)
        ) {
          this.$tip.error("机速/温度/浴比理论不能为空!");
          return;
        }
      }
      done();
    },
    savePro() {
      if (this.crudCheck[this.tabs + "s"].length === 0) {
        return;
      }
      for (let i = 0; i < this.crudCheck[this.tabs + "s"].length; i++) {
        if (
          this.tabs === "rs" &&
          (!this.crudCheck[this.tabs + "s"][i].speed ||
            !this.crudCheck[this.tabs + "s"][i].temperature)
        ) {
          this.$tip.error("机速/温度不能为空!");
          return;
        }
        if (
          (this.tabs === "dp" || this.tabs === "dx") &&
          (!this.crudCheck[this.tabs + "s"][i].speed ||
            !this.crudCheck[this.tabs + "s"][i].temperature ||
            !this.crudCheck[this.tabs + "s"][i].fabWidth)
        ) {
          this.$tip.error("布封/机速/温度不能为空!");
          return;
        }
        if (
          (this.tabs === "zl" || this.tabs === "zx") &&
          (!this.crudCheck[this.tabs + "s"][i].speed ||
            !this.crudCheck[this.tabs + "s"][i].temperature)
        ) {
          this.$tip.error("机速/温度/浴比理论不能为空!");
          return;
        }
      }
      this.proLoading = true;
      this.crudCheck[this.tabs + "s"].forEach((item, i) => {
        if (!item[this.oidName.split("oid")[0] + "xoid"]) {
          item.salLdNoticeDtldFk = this.crudCheck.salLdNoticeDtldoid;
          addLdNoticeDtlx(this.xName.split("/")[0], item).then((res) => {
            item[this.oidName.split("oid")[0] + "xoid"] = res.data.data;
          });
        } else {
          updateLdNoticeDtlx(this.xName.split("/")[0], item).then((res) => {});
        }
        if (i === this.crudCheck[this.tabs + "s"].length - 1) {
          // this.getDetail();
          this.proLoading = false;
          this.addPro();
          this.$tip.success(this.$t("public.bccg"));
        }
      });
    },
    colorQty() {
      if (!this.isAdd) {
        return;
      }
      this.$nextTick(() => {
        this.form.runcolorType = "";
        if (
          this.form.runcolorQty != "undefined" &&
          this.form.runcolorQty != 0 &&
          this.form.batch != "undefined" &&
          this.form.batch != 0
        ) {
          if (this.form.runcolorQty > this.crud.length) {
            let data = [];
            for (let i = 0; i < this.form.runcolorQty - this.crud.length; i++) {
              data.push({
                typeNo: String.fromCharCode(
                  this.version +
                    i -
                    1 +
                    (this.form.batch === 1 ? 2 : this.form.batch) +
                    64 +
                    this.crud.length
                ),
                $cellEdit: true,
              });
            }
            this.crud = this.crud.concat(data);
            this.crud.forEach((item, i) => {
              item.index = i + 1;
            });
            this.page.total = this.crud.length;
          }
          for (let i = 0; i < this.form.runcolorQty; i++) {
            this.form.runcolorType =
              this.form.runcolorType +
              String.fromCharCode(
                this.version -
                  1 +
                  i +
                  (this.form.batch === 1 ? 2 : this.form.batch) +
                  64
              ) +
              (i === this.form.runcolorQty - 1 ? "" : ",");
          }
          if (this.form.runcolorQty < this.crud.length) {
            for (let i = 0; i < this.crud.length - this.form.runcolorQty; i++) {
              this.crud.splice(this.crud.length - 1, 1);
            }
          }
        } else {
          this.form.runcolorType = "";
          this.crud = [];
          this.crudCheck = {};
          return;
        }
      });
    },
    up() {
      if (Object.keys(this.dlteCheck).length > 0) {
        if (this.dlteCheck.index === 0) {
          return;
        }
        this.deled = true;
        //在上一项插入该项
        this.crudCheck[this.tabs].splice(
          this.dlteCheck.index - 1,
          0,
          this.crudCheck[this.tabs][this.dlteCheck.index]
        );
        //删除后一项
        this.crudCheck[this.tabs].splice(this.dlteCheck.index + 1, 1);
        this.crudCheck[this.tabs].forEach((item, i) => {
          item.index = i;
          item.lineNo = i + 1;
        });
      } else {
        this.$tip.error("请选择要上移的数据!");
        return;
      }
    },
    down() {
      if (Object.keys(this.dlteCheck).length > 0) {
        if (this.dlteCheck.index === this.crudCheck[this.tabs].length - 1) {
          return;
        }
        this.deled = true;
        // 在下一项插入该项
        this.crudCheck[this.tabs].splice(
          this.dlteCheck.index + 2,
          0,
          this.crudCheck[this.tabs][this.dlteCheck.index]
        );
        // 删除前一项
        this.crudCheck[this.tabs].splice(this.dlteCheck.index, 1);
        this.crudCheck[this.tabs].forEach((item, i) => {
          item.index = i;
          item.lineNo = i + 1;
        });
      } else {
        this.$tip.error("请选择要下移的数据!");
        return;
      }
    },
    cellClick(val) {
      this.crudCheck = val;
      if (!this.crudCheck[this.tabs]) {
        this.crudCheck[this.tabs] = [];
      }
      if (this.crudCheck[this.tabs].length === 0) {
        this.getFormula();
      }
    },
    cellDtleClick(val) {
      this.dlteCheck = val;
    },
    cellProClick(val) {
      this.proCheck = val;
    },
    add() {
      if (Object.keys(this.crudCheck).length === 0) {
        this.$tip.warning("请先选择打办类型明细!");
        return;
      } else {
        if (this.tabs === "rs") {
          this.addDlg = true;
        } else {
          this.dlgWidth = "100%";
          this.choiceV = !this.choiceV;
          this.choiceTarget = this.form;
          this.choiceTle = this.$t("choicDlg.xzhgyl");
        }
      }
    },
    addPro() {
      // if (
      //   this.crudCheck[this.tabs + "s"].length > 0 &&
      //   this.crudCheck[this.tabs + "s"][
      //     this.crudCheck[this.tabs + "s"].length - 1
      //   ][this.oidName.split("oid")[0] + "xoid"] === undefined
      // ) {
      //   console.log(
      //     this.crudCheck[this.tabs + "s"][
      //       this.crudCheck[this.tabs + "s"].length - 1
      //     ][this.oidName.split("oid")[0] + "xoid"]
      //   );
      //   return;
      // }
      this.crudCheck[this.tabs + "s"].push({
        $cellEdit: true,
        index: this.crudCheck[this.tabs + "s"].length + 1,
        circulation: 1,
      });
      this.proPage.total++;
    },
    del() {
      if (Object.keys(this.dlteCheck).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.dlteCheck[this.oidName]) {
        this.crudCheck[this.tabs].splice(this.dlteCheck.index, 1);
        this.$refs.dtle.setCurrentRow();
        this.dlteCheck = {};
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除原料为 【 " +
            this.dlteCheck.$bcCode +
            this.$t("iaoMng.delTle2"),
          this,
          {}
        )
        .then(() => {
          delLdNoticeDtl(
            this.tName.split("/")[0],
            this.oidName,
            this.dlteCheck[this.oidName]
          )
            .then((res) => {
              if (res.data.code === 200) {
                this.deled = true;
                this.$tip.success(this.$t("public.sccg"));
                this.crudCheck[this.tabs].splice(this.dlteCheck.index, 1);
                this.dlteCheck = {};
                this.$refs.dtle.setCurrentRow();
                this.crudCheck[this.tabs].forEach((item, i) => {
                  item.lineNo = i + 1;
                  item.index = i;
                });
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    delPro() {
      if (Object.keys(this.proCheck).length === 0) {
        this.$tip.error(this.$t("public.delTle"));
        return;
      }
      if (!this.proCheck[[this.oidName.split("oid")[0] + "xoid"]]) {
        this.crudCheck[this.tabs + "s"].splice(this.proCheck.index - 1, 1);
        this.$refs.process.setCurrentRow();
        this.proCheck = {};
        this.proPage.total--;
        return;
      }
      this.$tip
        .cofirm("是否确定删除选中的工艺参数?", this, {})
        .then(() => {
          delLdNoticeDtlx(
            this.xName.split("/")[0],
            this.xName.split("/")[0] + "oid",
            this.proCheck[this.xName.split("/")[0] + "oid"]
          )
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success(this.$t("public.sccg"));
                this.crudCheck[this.tabs + "s"].splice(
                  this.proCheck.index - 1,
                  1
                );
                this.proCheck = {};
                this.proPage.total--;
                this.$refs.process.setCurrentRow();
              } else {
                this.$tip.error(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              this.$tip.error(this.$t("public.scsb"));
            });
        })
        .catch((err) => {
          this.$tip.warning(this.$t("public.qxcz"));
        });
    },
    tabClick() {
      switch (this.tabs) {
        case "rs":
          this.tName = "salLdNoticeDtle/pages";
          this.oidName = "labLdNoticeDtleoid";
          this.xName = "labLdNoticeDtlex/page";
          this.proOp = dtlexCrud();
          this.xTle = "染色工艺参数";
          break;
        case "dp":
          this.tName = "labLdNoticeDtlf/page";
          this.oidName = "labLdNoticeDtlfoid";
          this.xName = "labLdNoticeDtlfx/page";
          this.proOp = dtlfCrud();
          this.xTle = "定胚工艺参数";
          break;
        case "dx":
          this.tName = "labLdNoticeDtlg/page";
          this.oidName = "labLdNoticeDtlgoid";
          this.xName = "labLdNoticeDtlgx/page";
          this.xTle = "定型工艺参数";
          this.proOp = dtlfCrud();
          break;
        case "zl":
          this.tName = "labLdNoticeDtlh/page";
          this.oidName = "labLdNoticeDtlhoid";
          this.xName = "labLdNoticeDtlhx/page";
          this.xTle = "煮练工艺参数";
          this.proOp = dtlixCrud();
          break;
        case "zx":
          this.tName = "labLdNoticeDtli/page";
          this.oidName = "labLdNoticeDtlioid";
          this.xName = "labLdNoticeDtlix/page";
          this.xTle = "皂洗工艺参数";
          this.proOp = dtlixCrud();
          break;
        default:
          break;
      }
      this.$refs.dtle.setCurrentRow();
      this.dlteCheck = {};
      if (!this.crudCheck[this.tabs]) {
        this.crudCheck[this.tabs] = [];
        this.getFormula();
      }
    },
    close() {
      if (this.deled) {
        this.$tip
          .cofirm("是否保存当前配方行号顺序的数据?", this, {})
          .then(() => {
            this.save();
            if (this.refresh) {
              this.$emit("refresh");
              this.$emit("close");
            } else {
              this.$emit("close");
            }
          })
          .catch((err) => {
            if (this.refresh) {
              this.$emit("refresh");
              this.$emit("close");
            } else {
              this.$emit("close");
            }
          });
      } else {
        if (this.refresh) {
          this.$emit("refresh");
          this.$emit("close");
        } else {
          this.$emit("close");
        }
      }
    },
    proClose() {
      for (let i = 0; i < this.crudCheck[this.tabs + "s"].length; i++) {
        if (
          this.tabs === "rs" &&
          (!this.crudCheck[this.tabs + "s"][i].speed ||
            !this.crudCheck[this.tabs + "s"][i].temperature)
        ) {
          this.$tip.error("机速/温度不能为空!");
          return;
        }
        if (
          (this.tabs === "dp" || this.tabs === "dx") &&
          (!this.crudCheck[this.tabs + "s"][i].speed ||
            !this.crudCheck[this.tabs + "s"][i].temperature ||
            !this.crudCheck[this.tabs + "s"][i].fabWidth)
        ) {
          this.$tip.error("布封/机速/温度不能为空!");
          return;
        }
        if (
          (this.tabs === "zl" || this.tabs === "zx") &&
          (!this.crudCheck[this.tabs + "s"][i].speed ||
            !this.crudCheck[this.tabs + "s"][i].temperature)
        ) {
          this.$tip.error("机速/温度/浴比理论不能为空!");
          return;
        }
      }
      this.proCheck = {};
      this.processDlg = false;
    },
    choiceData(val) {
      if (Object.keys(val).length === 0) {
        this.choiceV = false;
        return;
      }
      // this.choiceTarget[this.choiceField] = val[this.choiceField];
      if (this.choiceTle === this.$t("choicDlg.xzshzl")) {
        this.form = Object.assign(this.form, val);
        this.form.labTapcolorFk = this.form.labTapcoloroid;
        getLdNoticeList({
          labTapcolorFk: this.form.labTapcolorFk,
        }).then((res) => {
          if (res.data.length > 0) {
            let data = res.data.sort((a, b) => {
              return a.batch - b.batch;
            });
            this.form.batch = Number(data[data.length - 1].batch) + 1;
            this.version = Number(data[data.length - 1].runcolorQty);
          } else {
            this.form.batch = 1;
          }
          this.formOp.column[13].disabled = false;
        });
      }
      if (this.choiceTle === this.$t("choicDlg.xzhgyl")) {
        val.forEach((item) => {
          item.bcCode = item.bcCode;
          item.chemicalClass = item.bcClass;
          item.batchNo = item.bcBatchnumber;
          item.prodPlace = item.bcMakeplace;
          item.formulaValue = 0;
          // if (item.bcClass === "01") {
          item.calculateClass = "%";
          // } else {
          //   item.calculateClass = "g/l";
          // }
        });
        this.crudCheck[this.tabs] = this.$unique(
          this.crudCheck[this.tabs].concat(val),
          "bcCode"
        );
        this.crudCheck[this.tabs].forEach((item, i) => {
          item.$cellEdit = true;
          item.lineNo = i + 1;
          item.index = i;
        });

        this.dtlePage.total = this.crudCheck[this.tabs].length;
        if (20 > this.dtlePage.total > 10) {
          this.dtlePage.pageSize = 20;
        } else if (this.dtlePage.total > 20) {
          this.dtlePage.pageSize = 50;
        }
      }

      for (let key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.choiceV = false;
    },
    choiceDyestuff(val) {
      if (Object.keys(val).length === 0) {
        this.addDlg = false;
        return;
      }
      // this.choiceTarget[this.choiceField] = val[this.choiceField];

      val.forEach((item) => {
        item.bcCode = item.bcCode;
        item.chemicalClass = item.bcClass;
        item.batchNo = item.bcBatchnumber;
        item.prodPlace = item.bcMakeplace;
        item.formulaValue = 0;
        if (item.basChemicalmatoid) {
          item.calculateClass = "%";
        } else {
          item.calculateClass = "g/l";
        }
      });
      this.crudCheck[this.tabs] = this.$unique(
        this.crudCheck[this.tabs].concat(val),
        "bcCode"
      );
      this.crudCheck[this.tabs].forEach((item, i) => {
        item.$cellEdit = true;
        item.lineNo = i + 1;
        item.index = i;
      });
      this.dtlePage.total = this.crudCheck[this.tabs].length;
      if (20 > this.dtlePage.total > 10) {
        this.dtlePage.pageSize = 20;
      } else if (this.dtlePage.total > 20) {
        this.dtlePage.pageSize = 50;
      }

      for (let key in val) {
        delete val[key];
      }
      for (let key in this.choiceQ) {
        delete this.choiceQ[key];
      }
      this.addDlg = false;
    },
    getNowTime() {
      const time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mi = time.getMinutes();
      let s = time.getSeconds();
      m = m < 10 ? `0${m}` : m;
      d = d < 10 ? `0${d}` : d;
      h = h < 10 ? `0${h}` : h;
      mi = mi < 10 ? `0${mi}` : mi;
      s = s < 10 ? `0${s}` : s;
      return `${y}-${m}-${d}`;
    },
  },
  created() {},
  mounted() {
    this.getData();
    getCodeValue("bas_chemicalClass").then((Res) => {
      let data = Res.data;
      getCodeValue("bas_PigmentClass").then((res) => {
        data = data.concat(res.data);
        this.dtleOp.column[2].dicData = data;
      });
    });
    getBasChemicalmatList().then((Res) => {
      let data = Res.data;
      getBasPigmentList().then((res) => {
        data = data.concat(res.data);
        this.dtleOp.column[1].dicData = data;
      });
    });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.process_Dlg
  .el-input-number__decrease, .el-input-number__increase
    display none !important
  .el-input-number.is-controls-right .el-input__inner
    padding-right 5px
#colorMng_Dlg
  .el-table--mini td
    padding 4px 0 !important
  .avue-crud .el-input--mini input
    height 26px
    line-height 26px
  .dtlTbs
    .el-tabs--border-card>.el-tabs__header
      border-bottom none !important
    .el-card.is-always-shadow
      -webkit-box-shadow none
      box-shadow none
    .el-tabs--border-card
      -webkit-box-shadow none
      box-shadow none
  .el-dialog__header
    padding 0 !important
  .el-dialog__headerbtn
    top 3px
    font-size 18px
    font-weight bold
    z-index 9
  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close
    color #000
    font-size 24px
  .el-tag--mini
    height 24px
    padding 0 5px
    line-height 24px
    font-size 14px
  .el-select .el-tag__close.el-icon-close
    right -5px
    height 18px
    width 18px
    line-height 18px
  .avue-form .el-input--mini input
    height 35px !important
    line-height 35px
  .el-dialog.is-fullscreen
    overflow hidden !important
</style>