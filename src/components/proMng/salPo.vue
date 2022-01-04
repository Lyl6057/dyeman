<template>
  <div id="choice">
    <el-dialog
      id="choiceDlg"
      :visible.sync="choiceV"
      :width="dlgWidth"
      top="10vh"
      :fullscreen="dlgWidth === '100%'"
      append-to-body
      :close-on-click-modal="false"
      :before-close="closeBefore"
      v-if="choiceV"
      :element-loading-text="$t('public.loading')"
      v-loading="loading"
    >
      <!-- <view-container :title="choiceTle"> -->
      <el-tabs type="border-card" v-model="tab">
        <el-tab-pane name="tab1" :label="choiceTle">
          <div class="btnList">
            <el-button type="primary" @click="choice">{{
              this.$t("public.choose")
            }}</el-button>
            <el-button
              type="primary"
              @click="query"
              v-if="choiceTle != $t('choicDlg.shdmx')"
              >{{ $t("public.query") }}</el-button
            >
            <el-button type="warning" @click="close">{{
              $t("public.close")
            }}</el-button>
          </div>
          <div class="formBox">
            <avue-form ref="form" :option="choiceF" v-model="form"></avue-form>
          </div>
          <el-row>
            <el-col :span="6">
              <el-tabs type="border-card" v-model="tab">
                <el-tab-pane name="tab1" label="订单号" v-loading="loading">
                  <avue-tree
                    ref="tree"
                    style="
                      padding: 5px;
                      height: calc(100vh - 260px) !important;
                      overflow: auto;
                    "
                    :option="treeOption"
                    node-key="sn"
                    :data="crud"
                    :highlight-current="true"
                    @node-click="nodeClick"
                   
                  ></avue-tree>
                </el-tab-pane> </el-tabs
            ></el-col>
            <el-col :span="18">
              <el-tabs type="border-card" v-model="tab">
                <el-tab-pane name="tab1" label="布料信息">
                  <avue-crud
                    id="proChoice"
                    ref="crud"
                    :option="choiceC"
                    :data="childrenList"
                    :page.sync="page"
                    v-loading="tbloading"
                    @row-dblclick="handleRowDBLClick"
                    @current-row-change="cellClick"
                    @selection-change="selectionChange"
                  >
                  </avue-crud>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
          <el-container> </el-container>
        </el-tab-pane>
      </el-tabs>
      <!-- </view-container> -->
    </el-dialog>
  </div>
</template>
<script>
import { salPoC, salPoF, getSalPo } from "./data";
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
export default {
  name: "",
  components: {},
  props: {
    choiceV: Boolean,
    choiceTle: String,
    dlgWidth: String,
    choiceQ: Object,
  },
  data() {
    return {
      treeData: [
       
      ],
      treeOption: {
        defaultExpandAll: true,
        formOption: {
          labelWidth: 100,
          // column: [
          //   {
          //     label: "自定义项",
          //     prop: "test",
          //   },
          // ],
        },
        props: {
          // labelText: "标题",
          label: "poNo",
          value: "poNo",
          children: "children",
        },
      },
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [20, 50, 100, 500],
      },
      loading: false,
      tbloading: false,
      choiceC: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 250px)",
        refreshBtn: false,
        columnBtn: false,
        page: false,
        labelWidth: 130,
        column: [
          {
            label: "#",
            prop: "index",
            width: 50,
            align: "center",
            display: false,
          },
          // {
          //   label: "訂單號",
          //   prop: "poNo",
          //   width: 150,
          //   span: 6,
          //   sortable: true,
          //   overHidden: true,
          // },
          {
            label: "客户訂單號",
            prop: "custPoNo",
            width: 120,
            span: 6,
            overHidden: true,
            // sortable: true,
          },

          {
            label: "客户名稱",
            prop: "custBrandId",
            overHidden: true,
            width: 120,
            span: 6,
            type: "select",
            dicData: getDicT("basCustomer", "custName", "custCode"),
          },
          {
            label: "客款号",
            prop: "custStyleNo",
            width: 100,
            span: 6,
            overHidden: true,
            // sortable: true,
          },
          {
            label: "订单日期",
            prop: "poDate",
            width: 130,
            type: "date",
            align: "center",
            // sortable: true,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          {
            label: "订单类别",
            prop: "poType",
            width: 110,
            type: "select",
            dicData: getDIC("Sal_newPoType"),
          },

          {
            label: "订单狀態",
            prop: "poState",
            width: 110,
            type: "select",
            dicData: getDIC("sal_poStatus"),
          },
          {
            label: "BOM编号",
            prop: "bomId",
            width: 120,
            span: 6,
            sortable: true,
            overHidden: true,
          },
          {
            label: "客布编号",
            prop: "guestFabId",
            width: 120,
            span: 6,
            sortable: true,
            overHidden: true,
          },
          {
            label: "布名称",
            prop: "fabName",
            width: 150,
            span: 6,
            overHidden: true,
          },
          // {
          //   label: "布类型",
          //   prop: "clothtype",
          //   width: 150,
          //   span: 6,
          //   overHidden: true,
          // },
          {
            label: "成分",
            prop: "guestComponents",
            width: 150,
            span: 6,
            overHidden: true,
          },
          {
            label: "客色名",
            prop: "custColorName",
            width: 150,
            span: 6,
            overHidden: true,
          },
          {
            label: "客色号",
            prop: "custColorNo",
            width: 150,
            span: 6,
            overHidden: true,
          },
          {
            label: "颜色名称",
            prop: "colorName",
            width: 150,
            span: 6,
            overHidden: true,
          },
          {
            label: "季节",
            prop: "season",
            width: 120,
            span: 6,
            overHidden: true,
          },
          {
            label: "年度",
            prop: "year",
            width: 120,
            span: 6,
            overHidden: true,
          },
          {
            label: "后整项目",
            prop: "finishingitem",
            width: 150,
            span: 6,
            overHidden: true,
          },
          {
            label: "附加功能",
            prop: "addfunction",
            width: 150,
            span: 6,
            overHidden: true,
          },
          {
            label: "是否头缸",
            prop: "isFla",
            width: 100,
            span: 6,
            overHidden: true,
            type: "select",
            dicData: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
          },
          {
            label: "是否主布",
            prop: "ismainfab",
            width: 100,
            span: 6,
            overHidden: true,
            type: "select",
            dicData: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
          },
          {
            label: "克重信息",
            prop: "weightinfo",
            width: 150,
            span: 6,
            overHidden: true,
          },
          {
            label: "幅宽信息",
            prop: "widthinfo",
            width: 150,
            span: 6,
            overHidden: true,
          },
          {
            label: "缩水(直/横)",
            prop: "shrinkinfo",
            width: 120,
            span: 6,
            overHidden: true,
          },
          {
            label: "印染描述/附加描述",
            prop: "structureanddesc",
            width: 170,
            span: 6,
            overHidden: true,
          },
        ],
      },
      crud: [],
      choiceF: {},
      form: {},
      pick: {},
      getData: Function,
      tab: "tab1",
      chooseData: [],
      backups: [],
      detail: {
        sdc: [],
      },
      childrenList: [],
    };
  },
  watch: {},
  methods: {
    // 查询
    query() {
      this.loading = true;
      this.crud = [];
      this.childrenList = [];
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      for (let key in this.choiceQ) {
        if (this.choiceQ[key] === "") {
          delete this.choiceQ[key];
        }
      }

      this.form.vatNo = "!^%" + (this.form.vatNo ? this.form.vatNo : "");
      this.form.poNo = "!^%" + (this.form.poNo ? this.form.poNo : "");
      this.form.weaveJobCode =
        "%" + (this.form.weaveJobCode ? this.form.weaveJobCode : "");
      this.getData(
        Object.assign(this.form, this.choiceQ, {
          rows: this.page.pageSize,
          start: this.page.currentPage,
        })
      ).then((Res) => {
        let records = Res.data;
        this.page.total = records.total;
        this.crud = records.records;
        if (this.crud.length === 0) {
          this.loading = false;
        }
        this.crud.forEach((item, index) => {
          item.sn = index;
          // item.children = item.sdc;
          // item.children.forEach((items, indexs) => {
          //   items.sn = `${index}-${indexs}`;
          // });
          item.index = index + 1;
          item.clothWeight = item.clothWeight
            ? Number(item.clothWeight.toFixed(2))
            : 0;
          if (index === this.crud.length - 1) {
            setTimeout(() => {
              this.$refs.tree.setCurrentNode(this.crud[0]);//获取已经设置的资源后渲染
              this.nodeClick(this.crud[0])
              this.loading = false;
            }, 200);
          }
        });
        
        if(!this.crud.length){
          this.loading = false;
        }
        if (this.form.vatNo.indexOf("!^%") != -1) {
          this.form.vatNo = this.form.vatNo.split("!^%")[1] || "";
        }
        if (this.form.poNo.indexOf("!^%") != -1) {
          this.form.poNo = this.form.poNo.split("!^%")[1] || "";
        }
        if (this.form.weaveJobCode.indexOf("%") != -1) {
          this.form.weaveJobCode = this.form.weaveJobCode.split("%")[1] || "";
        }
      });
    },
    // 选择
    choice() {
      if (!this.pick.salNewbomDtlaFk || !this.pick.salNewpoDtlaoid) {
        this.$tip.error("请选择布料信息!");
        return;
      }
      this.$emit(
        "choiceData",
        this.chooseData.length > 0 ? this.chooseData : this.pick
      );
    },
    nodeClick(data) {
      this.tbloading = true;
      this.detail = data;
      this.childrenList = data.sdc;
      this.childrenList.sort((a, b) => (a.guestFabId > b.guestFabId ? 1 : -1));
      let poInfo = JSON.parse(JSON.stringify(data));
      poInfo.sdc = "";
      this.childrenList.forEach((item, index) => {
        item = Object.assign(item, poInfo);
        item.index = index + 1;
      });

      setTimeout(() => {
        this.tbloading = false;
      }, 500);
      // if (data.value == 0) {
      //   this.crud = [];
      // } else if (data.value == 1) {
      //   this.crud = [];
      // }
      // this.$message.success(JSON.stringify(data));
    },
    closeBefore(done) {
      for (var key in this.pick) {
        delete this.pick[key];
      }
      this.$emit("close");
    },
    close() {
      for (var key in this.pick) {
        delete this.pick[key];
      }
      this.$emit("close");
    },
    handleRowDBLClick(val) {
      // this.pick = val;
      // this.choice();
    },
    cellClick(val) {
      this.pick = val;
    },
    selectionChange(val) {
      this.chooseData = val;
    },
    filterList() {
      this.crud = JSON.parse(JSON.stringify(this.backups));
      this.$nextTick(() => {
        for (let key in this.form) {
          if (this.form[key]) {
            this.crud = this.crud.filter(
              (a) => (a[key] + "").indexOf(this.form[key]) != -1
            );
          }
        }
      });
    },
  },
  created() {
    switch (this.choiceTle) {
      case "选择订单资料":
        // this.choiceC = salPoC(this);
        this.choiceF = salPoF(this);
        this.getData = getSalPo;
        break;
      default:
        break;
    }
    this.query();
    this.$nextTick(() => {
        // tree 元素的ref   value 绑定的node-key
        this.$refs.tree.setCurrentKey(0);
    });
  },
  mounted() {},
  updated() {
    // this.$nextTick(() => {
    //   this.$refs["crud"].doLayout();
    // });
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#choiceDlg {
  .el-input-group__append {
    display: none !important;
  }

  .el-radio, .el-radio--medium.is-bordered .el-radio__label, .el-radio__label {
    font-size: 16px;
    height: 30px;
  }

  .el-dialog__body {
    padding: 0 !important;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }

  .el-dialog__header {
    padding: 0px;
  }

  .el-dialog__headerbtn {
    top: 5px;
    color: #000;
    font-size: 22px;
    z-index: 999;
  }

  .formBox {
    margin-bottom: 0px;
  }

  // .el-button--mini, .el-button--small {
  // font-size: 16px;
  // }

  // .el-button--mini, .el-button--mini.is-round {
  // padding: 5px 10px;
  // }
  .avue-crud__menu {
    min-height: 0 !important;
    height: 0 !important;
  }

  .el-tabs__item {
    font-size: 18px;
    line-height: 30px;
    height: 30px;
  }

  .el-tag--mini {
    display: none;
  }

  .el-dialog.is-fullscreen {
    overflow: hidden !important;
  }
}
</style>