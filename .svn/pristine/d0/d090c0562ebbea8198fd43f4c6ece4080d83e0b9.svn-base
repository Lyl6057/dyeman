<template>
  <div id="ekIndex">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane name="rc" label="入库">
        <span slot="label"
          ><i style="font-size: 20px" class="el-icon-s-home"></i> 入库</span
        >
        <div class="main tabs1">
          <el-row>
            <el-col :span="3">
              <avue-data-cardtext :option="rc.option1"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="rc.option2"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="rc.option3"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="rc.option5"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="rc.option7"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="rc.option4"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="rc.option6"></avue-data-cardtext
            ></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane name="cc" label="出库">
        <span slot="label"
          ><i style="font-size: 20px" class="el-icon-truck"></i> 出库</span
        >
        <div class="main">
          <el-row>
            <el-col :span="3">
              <avue-data-cardtext :option="cc.option1"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="cc.option2"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="cc.option3"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="cc.option4"></avue-data-cardtext
            ></el-col>
            <!-- <el-col :span="3">
              <avue-data-cardtext :option="cc.option7"></avue-data-cardtext
            ></el-col> -->
            <el-col :span="3">
              <avue-data-cardtext :option="cc.option5"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="cc.option6"></avue-data-cardtext
            ></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane name="tj" label="统计">
        <span slot="label"
          ><i style="font-size: 20px" class="el-icon-s-platform"></i>统计</span
        >
        <div class="countBox">
          <el-row>
            <el-card class="box-card"
              ><avue-data-icons :option="option1"></avue-data-icons
            ></el-card>
            <el-card class="box-card">
              <avue-data-tabs :option="option"></avue-data-tabs>
            </el-card>
          </el-row>
        </div>
      </el-tab-pane> -->
      <el-dialog
        id="wkDlg"
        :visible.sync="dialogVisible"
        fullscreen
        :before-close="handleClose"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        v-if="!kanban"
      >
        <router-view v-if="dialogVisible" class="dlgView"></router-view>
      </el-dialog>
      <el-dialog
        v-else
        id="kbDlg"
        :visible.sync="dialogVisible"
        fullscreen
        :before-close="handleClose"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <router-view v-if="dialogVisible" class="dlgView"></router-view>
      </el-dialog>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      dialogVisible: false,
      tabs: "rc",
      kanban: false,
      rc: {
        option1: {
          span: 24,
          data: [
            // level_1
            {
              title: "纱线入库",
              icon: "yx-icf-xian1",
              color: "#606266",
              // content: "",
            },

            // level_2
            {
              click: () => {
                this.toView("rc_sx", "客人来纱_1");
              },
              title: "客人来纱",
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // // content: "客人来纱看板",
            },

            // level_3
            {
              click: () => {
                this.toView("rc_cg", "紗線_2");
              },
              title: "紗線採購",
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // // content: "纱线采购入库看板",
            },

            // level_4
            {
              click: () => {
                this.toView("rc_sx", "本厂余纱退仓_4");
              },
              title: "本厂余纱退仓",
              icon: "el-icon-s-home",
              color: "#409EFF",
              // content: "本厂余纱退仓入库看板",
            },

            // level_5
            {
              click: () => {
                this.toView("rc_sx", "外发厂退纱_5");
              },
              title: "外发厂退纱",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发厂退纱入库看板",
            },

            // level_6
            {
              click: () => {
                this.toView("rc_sg", "紗線_6");
              },
              title: "申购纱线",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "申购纱线入库看板",
            },
            // {
            //   click: () => {
            //     this.toView("入仓看板");
            //   },
            //   title: "入库看板",
            //   icon: "yx-icf-taishidiannao",
            //   color: "#409EFF",
            //   // content: "入库看板",
            // },
            // {
            //   click: () => {
            //     this.toView("/gc_points");
            //   },
            //   title: "入库看板",
            //   icon: "el-icon-s-claim",
            //   color: "#409EFF",
            //   // content: "点数看板概要，此处------------为占位符",
            // },
            // {
            //   click: () => {
            //     this.toView("/gc_warehousing");
            //   },
            //   title: "入库看板",
            //   color: "#409EFF",
            //   icon: "el-icon-s-home",
            //   // content: "入库信息概要，此处------------为占位符",
            //   href: "#",
            //   date: "点击进入",
            // },
          ],
        },
        option2: {
          span: 24,
          data: [
            {
              title: "胚布入库",
              icon: "yx-icf-bupi",
              color: "#fff",
            },
            {
              click: () => {
                this.toView("rc_pb", "客人来胚_1");
              },
              title: "客人来胚",
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "客人来胚入仓看板",
            },
            {
              click: () => {
                this.toView("rc_cg", "胚布_2");
              },
              title: "胚布采购",
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // content: "采购入库看板",
            },
            {
              click: () => {
                this.toView("rc_pb", "本厂生产_6");
              },
              title: "本厂生产",
              icon: "el-icon-s-home",
              color: "#409EFF",
              // content: "本厂生产入库看板",
            },
            {
              click: () => {
                this.toView("rc_pb", "本厂胚布退仓_4");
              },
              title: "本厂胚布退仓",
              icon: "el-icon-s-home",
              color: "#409EFF",
              // content: "本厂胚布退仓入库看板",
            },
            {
              click: () => {
                this.toView("rc_pb", "外发加工回胚_7");
              },
              title: "外发加工回胚",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工回胚看板",
            },
            {
              click: () => {
                this.toView("rc_pb", "外发厂退胚_5");
              },
              title: "外发厂退胚",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发厂退胚入库看板",
            },
            {
              click: () => {
                this.toView(
                  "cc_package",
                  "胚布貨物包_whseCalicopackBarcodeoid"
                );
              },
              title: "胚布貨物包",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "胚布貨物包入库看板",
            },
          ],
        },
        option3: {
          span: 24,
          data: [
            {
              title: "成品布入库",
              icon: "yx-icf-bupi",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_cpb", "本厂生产_1");
              },
              title: "本厂生产",
              icon: "el-icon-s-home",
              color: "#409EFF",
              // content: "本厂生产入库看板",
            },
            {
              click: () => {
                this.toView("rc_cpb", "外发加工回仓_3");
              },
              title: "外发加工回仓",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工回仓入库看板",
            },

            {
              click: () => {
                this.toView("rc_cpb", "客人退回_2");
              },
              title: "客人退回",
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "客人退回入库看板",
            },
            {
              click: () => {
                this.toView(
                  "cc_package",
                  "成品布貨物包_whseFinishedclothpackBarcodeoid"
                );
              },
              title: "成品布貨物包",
              icon: "yx-icf-bupi",
              color: "#409EFF",
              // content: "成品布貨物包入库看板",
            },
          ],
        },
        option5: {
          span: 24,
          data: [
            {
              title: "化工原料入库",
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },

            {
              click: () => {
                this.toView("rc_rhl", "客人来料_1");
              },
              title: "客人来料",
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "客人来化工原料入库看板",
            },
            {
              click: () => {
                this.toView("rc_cg", "化工原料_2");
              },
              title: "采购入库",
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // content: "采购入库入库看板",
            },
            {
              click: () => {
                this.toView("rc_rhl", "外发厂退回_5");
              },
              title: "外发厂退回",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发厂化工原料退回看板",
            },
            {
              click: () => {
                // this.toView("rc_rhl", "申购_8");
                this.toView("rc_sg", "化工原料_4");
              },
              title: "申购化工原料",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "申购化工原料入库看板",
            },
          ],
        },
        option7: {
          span: 24,
          data: [
            {
              title: "颜料入库",
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_cg", "顏料_2");
              },
              title: "采购入库",
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // content: "采购入库入库看板",
            },
            {
              click: () => {
                this.toView("rc_sg", "颜料_4");
              },
              title: "申购颜料",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "申购颜料入库看板",
            },
          ],
        },
        option4: {
          span: 24,
          data: [
            {
              title: "生产辅料入库",
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_scfl", "客人来料_1");
              },
              title: "客人来料",
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "客人来生料入库看板",
            },
            {
              click: () => {
                this.toView("rc_cg", "生產輔料_2");
              },
              title: "采购入库",
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // content: "采购生产辅料入库看板",
            },
            {
              click: () => {
                this.toView("rc_scfl", "本厂余料回仓_4");
              },
              title: "本厂余料回仓",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "本厂余料回仓入库看板",
            },
            {
              click: () => {
                this.toView("rc_scfl", "外发厂余料回仓_6");
              },
              title: "外发余料回仓",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发余料回仓看板",
            },
            {
              click: () => {
                this.toView("rc_sg", "辅料_5");
              },
              title: "申购生产辅料",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "申购化工原料入库看板",
            },
          ],
        },
        option6: {
          span: 24,
          data: [
            {
              title: "五金/行政入库",
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_scfl", "五金/行政采购_11");
              },
              title: "采购入库",
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // content: "采购入库看板",
            },
            {
              click: () => {
                this.toView("rc_sg", "五金/行政_7");
              },
              title: "申购五金/行政",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "申购化工原料入库看板",
            },
          ],
        },
      },
      cc: {
        option1: {
          span: 24,
          data: [
            // level_1
            {
              title: "纱线出库",
              icon: "yx-icf-xian1",
              color: "#606266",
              // content: "",
            },

            // level_2
            {
              click: () => {
                this.toView("cc_sx", "生产领用_1");
              },
              title: "生产领用出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "生产领用出库看板",
            },

            // level_3
            {
              click: () => {
                this.toView("cc_sx", "外发加工_2");
              },
              title: "外发加工出库",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工出库看板",
            },

            // level_4
            {
              click: () => {
                this.toView("cc_sx", "退供应商纱_4");
              },
              title: "退供应商纱",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商纱出库看板",
            },

            // level_5
            {
              click: () => {
                this.toView("cc_sx", "退客人纱_3");
              },
              title: "退客人纱",
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "退客人纱出库看板",
            },

            // level_6
            {
              click: () => {
                this.toView("cc_sx", "纱线调仓_5");
              },
              title: "纱线调仓",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "纱线调仓出库看板",
            },
          ],
        },
        option2: {
          span: 24,
          data: [
            {
              title: "胚布出库",
              icon: "yx-icf-bupi",
              color: "#fff",
            },
            {
              click: () => {
                this.toView("cc_pb", "生产领用_1");
              },
              title: "生产领用出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "生产领用出库看板",
            },
            {
              click: () => {
                this.toView("cc_pb", "外发加工_2");
              },
              title: "外发加工出库",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工出库看板",
            },
            {
              click: () => {
                this.toView("cc_pb", "销售出库_6");
              },
              title: "销售出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "销售出库看板",
            },
            {
              click: () => {
                this.toView("cc_pb", "退供应商胚布_4");
              },
              title: "退供应商胚布",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商胚布出库看板",
            },
            {
              click: () => {
                this.toView("cc_pb", "退客人胚布_3");
              },
              title: "退客人胚布",
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "退客人胚布出库看板",
            },
            {
              click: () => {
                this.toView("cc_pb", "胚布调仓_5");
              },
              title: "胚布调仓",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "胚布调仓出库看板",
            },
          ],
        },
        option3: {
          span: 24,
          data: [
            {
              title: "成品布出库",
              icon: "yx-icf-bupi",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("cc_cpb", "销售出库_6");
              },
              title: "销售出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "销售出库看板",
            },
          ],
        },
        option4: {
          span: 24,
          data: [
            {
              title: "生产辅料出库",
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("cc_scfl", "生产领用_1");
              },
              title: "领用出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "领用出库看板",
            },
            {
              click: () => {
                this.toView("cc_scfl", "外发加工_2");
              },
              title: "外发加工出库",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工出库看板",
            },
            {
              click: () => {
                this.toView("cc_scfl", "退供应商_4");
              },
              title: "退供应商出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商出库看板",
            },
            {
              click: () => {
                this.toView("cc_scfl", "退客人_3");
              },
              title: "退客人出库",
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "退客人出库看板",
            },
            {
              click: () => {
                this.toView("cc_scfl", "调仓出库_5");
              },
              title: "调仓出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "调仓出库看板",
            },
          ],
        },
        option5: {
          span: 24,
          data: [
            {
              title: "化工原料出库",
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },

            {
              click: () => {
                this.toView("cc_hgyl", "退供应商_4");
              },
              title: "退供应商出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商出库看板",
            },
            {
              click: () => {
                this.toView("cc_hgyl", "外发加工_2");
              },
              title: "外发加工出库",
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工出库看板",
            },
            {
              click: () => {
                this.toView("cc_hgyl", "退客人_3");
              },
              title: "退客人出库",
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "退客人出库看板",
            },
            {
              click: () => {
                this.toView("cc_hgyl", "调仓_5");
              },
              title: "调仓出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "调仓出库看板",
            },
          ],
        },
        option7: {
          span: 24,
          data: [
            {
              title: "颜料出库",
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
          ],
        },
        option6: {
          span: 24,
          data: [
            {
              title: "五金/行政出库",
              icon: "el-icon-s-claim",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("cc_wjxz", "生产领用_1");
              },
              title: "领用出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "领用出库看板",
            },
            {
              click: () => {
                this.toView("cc_wjxz", "退供应商_4");
              },
              title: "退供应商出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商出库看板",
            },
            {
              click: () => {
                this.toView("cc_wjxz", "调仓出库_5");
              },
              title: "调仓出库",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "调仓出库看板",
            },
          ],
        },
      },
      option: {
        span: 6,
        data: [
          {
            click: () => {
              this.toView("count_warehouse");
              this.kanban = false;
            },
            title: "入仓统计",
            subtitle: "实时",
            count: "7,993",
            allcount: 18,
            text: "入仓次数",
            color: "rgb(27, 201, 142)",
            key: "入仓",
          },
          {
            click: () => {
              this.toView("count_warehouse");
              this.kanban = false;
            },
            title: "出仓统计",
            subtitle: "实时",
            count: "5,555",
            allcount: 10,
            text: "出仓次数",
            color: "#409EFF",
            key: "出仓",
          },
        ],
      },
      option1: {
        span: 4,
        data: [
          {
            click: function (item) {
              // alert(JSON.stringify(item));
            },
            title: "今日入仓",
            count: 12678,
            icon: "el-icon-s-home",
            // href: "https://avuejs.com",
            // target: "_blank",
          },
          {
            click: function (item) {
              // alert(JSON.stringify(item));
            },
            title: "今日出仓",
            count: 22139,
            icon: "el-icon-truck",
            //href: "https://avuejs.com",
            //target: "_blank",
          },
          {
            click: function (item) {
              //  alert(JSON.stringify(item));
            },
            title: "本月入仓",
            count: 35623,
            icon: "el-icon-info",
            // href: "https://avuejs.com",
            //target: "_blank",
          },
          {
            click: function (item) {
              //alert(JSON.stringify(item));
            },
            title: "本月出仓",
            count: 16826,
            icon: "el-icon-message",
            //  href: "https://avuejs.com",
            //  target: "_blank",
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    toView(val, type) {
      this.dialogVisible = true;
      type ? (this.kanban = false) : (this.kanban = true);

      let data = {
        type: type,
      };
      localStorage.setItem("imWk", JSON.stringify(data));
      this.$router.push({
        name: val,
        params: data,
      });

      // this.$router.push({
      //   path: val,
      //   query: data,
      // });
    },
    handleClose(done) {
      this.$router.push({
        path: "imWk",
      });
      localStorage.removeItem("imWk");
      done();
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#kbDlg {
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff !important;
    font-size: 24px;
  }

  // .el-dialog__body {
  // padding: 0 !important;
  // }
  .el-input__inner, .avue-form__group, .el-form-item__label {
    border: none !important;
    background: #021a3c;
    color: #fff;
  }

  .el-card__body {
    padding: 0 0px 0 0 !important;
  }

  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    border-right-color: #fff !important;
    border-left-color: #fff;
  }

  #points .el-tabs__item {
    border-right: 1px solid #606266;
  }

  .avue-form__group .el-input__suffix {
    display: none;
  }
}

#wkRuleDlg {
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
    min-height: 5px !important;
    height: 5px !important;
  }

  .el-tabs__item {
    font-size: 18px;
    line-height: 30px;
    height: 30px;
  }
}

#wkDlg, #sxrcDlg, #kbDlg {
  // .el-table__fixed-body-wrapper {
  // top: 45px !important;
  // }

  // .el-input__inner {
  // border: none;
  // border-bottom: 1px solid #fff;
  // border-radius: 0;
  // font-size: 20px;
  // color: #fff;
  // cursor: auto;
  // background-color: rgb(2, 26, 60);
  // }

  // .el-form-item__label {
  // color: #fff;
  // font-size: 19px !important;
  // font-weight: bold;
  // }

  // .avue-group .el-collapse, .avue-group .el-collapse-item__wrap {
  // background-color: rgb(2, 26, 60);
  // }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
    // background-color: #fff;
  }

  .dlgView {
    height: 100%;
    width: 100%;
  }

  .avue-crud__menu {
    height: 32px !important;
    min-height: 32px !important;
    font-size: 18px;
    margin-bottom: 0 !important;
  }

  .avue-empty__desc {
    color: #000;
  }

  .el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0 !important;
    background-color: rgb(2, 26, 60);
    overflow: hidden;
  }

  .el-dialog__body {
    padding: 0 !important;
  }

  .el-dialog__header {
    padding: 0px;
    background-color: rgb(2, 26, 60);
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-dialog__headerbtn {
    font-size: 18px;
    top: 5px;
    z-index: 2020;
  }
}

#ekIndex {
  height: 100%;
  width: 100%;

  .avue-data-cardText .item {
    padding: 10px 2px;
    margin: 10px 10px;
  }

  .avue-data-cardText .item-header a {
    margin-left: 2px;
  }

  .el-tabs--border-card {
    // background: rgb(0, 0, 0, 0);
    // border: none;
  }

  .main {
    min-width: 1000px;
    // width: 100%;
    height: calc(100vh - 80px);
    min-height: 500px;
    overflow: auto;
  }

  .item-header {
    color: #409EFF;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #pane-rc {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .el-icon-bell {
    display: none;
  }

  .item-footer {
    display: none;
  }

  .avue-data-cardText .item-content {
    margin-top: 10px;
    display: none;
  }

  .avue-data-cardText .el-col:nth-child(1) .item {
    background-color: #ccc;
    min-height: 20px;

    .item-header {
      cursor: default !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .item-footer {
      display: none;
    }

    a {
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 15px;
    }
  }
}

.avue-data-cardText .item-header a {
  font-size: 15px;
}

.countBox {
  width: 99% !important;
  margin: 2px auto;
  height: calc(100vh - 90px);
  min-height: 500px;
  overflow: auto;

  .el-card {
    margin-top: 5px;
  }

  .data-icons .item-info {
    font-size: 18px;
    line-height: 15px;

    span {
      font-size: 16px;
      font-weight: 700;
    }

    .count {
      font-size: 18px;
    }
  }

  .item-footer {
    display: block !important;
    text-align: left;
    color: #fff;

    p {
      font-size: 14px;
      color: #fff;
    }

    span {
      font-size: 16px;
      color: #fff;
    }
  }

  .item-header {
    color: #fff !important;
  }
}

.el-input.is-disabled .el-input__inner {
  color: #606266;
  // background-color: #fff;
}

.yx-icf-bupi:before {
  content: '\e71c';
}

.yx-icf-cailiaogongcheng:before {
  content: '\e61c';
}

.yx-icf-xian:before {
  content: '\e746';
}

.yx-icf-xian1:before {
  content: '\e747';
}

.yx-icf-buliao:before {
  content: '\e74b';
}

.yx-icf-taishidiannao:before {
  content: '\e608';
}

.yx-icf-diannao:before {
  content: '\e768';
}
</style>