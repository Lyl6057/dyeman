<template>
  <div id="ekIndex">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane name="rc" :label="$t('iaoMng.rcgl')">
        <span slot="label"
          ><i style="font-size: 24px" class="el-icon-s-home"></i>
          {{ $t("iaoMng.rcgl") }}</span
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
            <!-- <el-col :span="3">
              <avue-data-cardtext :option="rc.option6"></avue-data-cardtext
            ></el-col> -->
            <el-col :span="3">
              <avue-data-cardtext :option="rc.wj"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="rc.rl"></avue-data-cardtext
            ></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane name="cc" :label="$t('iaoMng.ccgl')">
        <span slot="label"
          ><i style="font-size: 24px" class="el-icon-truck"></i>
          {{ $t("iaoMng.ccgl") }}</span
        >
        <div class="main tabs2">
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
              <avue-data-cardtext :option="cc.option5"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="cc.option7"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="cc.option4"></avue-data-cardtext
            ></el-col>

            <el-col :span="3">
              <avue-data-cardtext :option="cc.wj"></avue-data-cardtext
            ></el-col>
            <el-col :span="3">
              <avue-data-cardtext :option="cc.rl"></avue-data-cardtext
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
              title: this.$t("iaoMng.sxrc"),
              icon: "yx-icf-xian1",
              color: "#606266",
              // content: "",
            },

            // level_2
            {
              click: () => {
                this.toView("rc_sx", this.$t("iaoMng.krls") + "_1");
              },
              title: this.$t("iaoMng.krls"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // // content: "客人来纱看板",
            },

            // level_3
            {
              click: () => {
                this.toView("rc_cg", this.$t("iaoMng.sx") + "_2");
              },
              title: this.$t("iaoMng.sxcg"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // // content: "纱线采购入库看板",
            },

            // level_4
            {
              click: () => {
                this.toView("rc_sx", this.$t("iaoMng.ystc") + "_4");
              },
              title: this.$t("iaoMng.ystc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              // content: "本厂余纱退仓入库看板",
            },

            // level_5
            {
              click: () => {
                this.toView("rc_sx", this.$t("iaoMng.wfts") + "_5");
              },
              title: this.$t("iaoMng.wfts"),
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发厂退纱入库看板",
            },

            // level_6
            {
              click: () => {
                this.toView("rc_sg", this.$t("iaoMng.sx") + "_6");
              },
              title: this.$t("iaoMng.sgsx"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "申购纱线入库看板",
            },
            {
              click: () => {
                this.toView("rc_manual", this.$t("iaoMng.sx") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
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
              title: this.$t("iaoMng.pbrc"),
              icon: "yx-icf-bupi",
              color: "#fff",
            },
            {
              click: () => {
                this.toView("rc_pb", this.$t("iaoMng.krlp") + "_1");
              },
              title: this.$t("iaoMng.krlp"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "客人来胚入仓看板",
            },
            {
              click: () => {
                this.toView("rc_cg", this.$t("iaoMng.pb") + "_2");
              },
              title: this.$t("iaoMng.pbcg"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // content: "采购入库看板",
            },
            {
              click: () => {
                this.toView("rc_pb", this.$t("iaoMng.bcsc") + "_6");
              },
              title: this.$t("iaoMng.bcsc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              // content: "本厂生产入库看板",
            },
            {
              click: () => {
                this.toView("rc_pb", this.$t("iaoMng.pbtc") + "_4");
              },
              title: this.$t("iaoMng.pbtc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              // content: "本厂胚布退仓入库看板",
            },
            {
              click: () => {
                this.toView("rc_pb", this.$t("iaoMng.jghp") + "_7");
              },
              title: this.$t("iaoMng.jghp"),
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工回胚看板",
            },
            {
              click: () => {
                this.toView("rc_pb", this.$t("iaoMng.wftp") + "_5");
              },
              title: this.$t("iaoMng.wftp"),
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发厂退胚入库看板",
            },
            {
              click: () => {
                this.toView(
                  "cc_package",
                  this.$t("iaoMng.pbhwb") + "_whseCalicopackBarcodeoid"
                );
              },
              title: this.$t("iaoMng.pbhwb"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "胚布貨物包入库看板",
            },
            {
              click: () => {
                this.toView("rc_manual", this.$t("iaoMng.pb") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        option3: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.cpbrc"),
              icon: "yx-icf-bupi",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_cpb", this.$t("iaoMng.bcsc") + "_1");
              },
              title: this.$t("iaoMng.bcsc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              // content: "本厂生产入库看板",
            },
            {
              click: () => {
                this.toView("rc_cpb", this.$t("iaoMng.wfjghc") + "_3");
              },
              title: this.$t("iaoMng.wfjghc"),
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工回仓入库看板",
            },

            {
              click: () => {
                this.toView("rc_cpb", this.$t("iaoMng.krth") + "_2");
              },
              title: this.$t("iaoMng.krth"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "客人退回入库看板",
            },
            {
              click: () => {
                this.toView(
                  "cc_package",
                  this.$t("iaoMng.cpbhwb") + "_whseFinishedclothpackBarcodeoid"
                );
              },
              title: this.$t("iaoMng.cpbhwb"),
              icon: "yx-icf-bupi",
              color: "#409EFF",
              // content: "成品布貨物包入库看板",
            },
            {
              click: () => {
                this.toView("rc_manual", "成品布" + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        option5: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.hgylrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },

            {
              click: () => {
                this.toView("rc_rhl", this.$t("iaoMng.krlhgyl") + "_1");
              },
              title: this.$t("iaoMng.krlhgyl"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "客人来化工原料入库看板",
            },
            {
              click: () => {
                this.toView("rc_cg", this.$t("iaoMng.hgyl") + "_2");
              },
              title: this.$t("iaoMng.ylcg1"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // content: "采购入库入库看板",
            },
            {
              click: () => {
                this.toView("rc_rhl", this.$t("iaoMng.wfcth") + "_5");
              },
              title: this.$t("iaoMng.wfcth"),
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发厂化工原料退回看板",
            },
            {
              click: () => {
                // this.toView("rc_rhl", "申购_8");
                this.toView("rc_sg", this.$t("iaoMng.hgyl") + "_4");
              },
              title: this.$t("iaoMng.sghgyl"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "申购化工原料入库看板",
            },
            {
              click: () => {
                this.toView("rc_manual", this.$t("iaoMng.hgyl") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        option7: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.ylrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_yl", this.$t("iaoMng.krlyl") + "_1");
              },
              title: this.$t("iaoMng.krlyl"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "客人来化工原料入库看板",
            },
            {
              click: () => {
                this.toView("rc_cg", this.$t("iaoMng.yl") + "_2");
              },
              title: this.$t("iaoMng.ylcg"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // content: "采购入库入库看板",
            },
            {
              click: () => {
                this.toView("rc_yl", this.$t("iaoMng.wfcth") + "_5");
              },
              title: this.$t("iaoMng.wfcth"),
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发厂化工原料退回看板",
            },
            {
              click: () => {
                this.toView("rc_sg", this.$t("iaoMng.yl") + "_4");
              },
              title: this.$t("iaoMng.sgyl"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "申购颜料入库看板",
            },
            {
              click: () => {
                this.toView("rc_manual", this.$t("iaoMng.yl") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        option4: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.scflrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_scfl", this.$t("iaoMng.krlfl") + "_1");
              },
              title: this.$t("iaoMng.krlfl"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "客人来生料入库看板",
            },
            {
              click: () => {
                this.toView("rc_cg", this.$t("iaoMng.scfl") + "_2");
              },
              title: this.$t("iaoMng.scflcg"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // content: "采购生产辅料入库看板",
            },
            // {
            //   click: () => {
            //     this.toView("rc_scfl", "本厂余料回仓_4");
            //   },
            //   title: "本厂余料回仓",
            //   icon: "el-icon-s-home",
            //   color: "#ccc",
            //   // content: "本厂余料回仓入库看板",
            // },
            {
              click: () => {
                this.toView("rc_scfl", this.$t("iaoMng.wfcylhc") + "_6");
              },
              title: this.$t("iaoMng.wfcylhc"),
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发余料回仓看板",
            },
            {
              click: () => {
                this.toView("rc_sg", this.$t("iaoMng.fl") + "_5");
              },
              title: this.$t("iaoMng.sgscfl"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "申购化工原料入库看板",
            },
            {
              click: () => {
                this.toView("rc_manual", this.$t("choicDlg.scfl") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        option6: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.wjxzrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_scfl", this.$t("iaoMng.wjxz") + "_11");
              },
              title: this.$t("iaoMng.wjxzcg"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              // content: "采购入库看板",
            },
            {
              click: () => {
                this.toView("rc_sg", this.$t("iaoMng.wjxz") + "_7");
              },
              title: this.$t("iaoMng.sgwjzx"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "申购化工原料入库看板",
            },
            {
              click: () => {
                this.toView("rc_manual", this.$t("choicDlg.scfl") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        wj: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.wjrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_manual", this.$t("choicDlg.wj") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              click: () => {
                this.toView("rc_sg", this.$t("choicDlg.wj") + "_7");
              },
              title: "五金申购",
              icon: "el-icon-s-claim",
              color: "#409EFF",
            },
            {
              title: this.$t("iaoMng.xzrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_manual", this.$t("choicDlg.xz") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              click: () => {
                this.toView("rc_sg", this.$t("choicDlg.xz") + "_7");
              },
              title: "行政申购",
              icon: "el-icon-s-claim",
              color: "#409EFF",
            },
          ],
        },
        rl: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.rlrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("rc_manual", this.$t("choicDlg.rl") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              click: () => {
                this.toView("rc_sg", this.$t("choicDlg.rl") + "_6");
              },
              title: "能源申购",
              icon: "el-icon-s-claim",
              color: "#409EFF",
            },
            {
              title: this.$t("iaoMng.sbrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            // {
            //   click: () => {
            //     this.toView("rc_manual", this.$t("choicDlg.rl") + "_0");
            //   },
            //   title: this.$t("iaoMng.sgrc"),
            //   icon: "el-icon-thumb",
            //   color: "#409EFF",
            // },
            {
              click: () => {
                this.toView("rc_sg", this.$t("iaoMng.sb") + "_7");
              },
              title: "设备申购",
              icon: "el-icon-s-claim",
              color: "#409EFF",
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
              title: this.$t("iaoMng.sxcc"),
              icon: "yx-icf-xian1",
              color: "#606266",
              // content: "",
            },

            // level_2
            {
              click: () => {
                this.toView("cc_productionUse", this.$t("iaoMng.sx") + "_1");
              },
              title: this.$t("iaoMng.sclycc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "生产领用出库看板",
            },

            // level_3
            {
              click: () => {
                this.toView("cc_sx", this.$t("iaoMng.wfjgscc") + "_2");
              },
              title: this.$t("iaoMng.wfjgscc"),
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工出库看板",
            },

            // level_4
            {
              click: () => {
                this.toView("cc_sx", this.$t("iaoMng.tgysscc") + "_4");
              },
              title: this.$t("iaoMng.tgysscc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商纱出库看板",
            },

            // level_5
            {
              click: () => {
                this.toView("cc_sx", this.$t("iaoMng.tkrscc") + "_3");
              },
              title: this.$t("iaoMng.tkrscc"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "退客人纱出库看板",
            },

            // level_6
            {
              click: () => {
                this.toView("cc_sx", this.$t("iaoMng.sxdc") + "_5");
              },
              title: this.$t("iaoMng.sxdc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "纱线调仓出库看板",
            },
            {
              click: () => {
                this.toView("cc_manual", this.$t("iaoMng.sx") + "_0");
              },
              title: this.$t("iaoMng.sgcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        option2: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.pbcc"), //"胚布出库",
              icon: "yx-icf-bupi",
              color: "#fff",
            },
            {
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.sclypbcc") + "_1");
              },
              title: this.$t("iaoMng.sclypbcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "生产领用出库看板",
            },
            {
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.wfjgpbcc") + "_2");
              },
              title: this.$t("iaoMng.wfjgpbcc"),
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工出库看板",
            },
            {
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.xspbcc") + "_6");
              },
              title: this.$t("iaoMng.xspbcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "销售出库看板",
            },
            {
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.tgyspbcc") + "_4");
              },
              title: this.$t("iaoMng.tgyspbcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商胚布出库看板",
            },
            {
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.tkrpbcc") + "_3");
              },
              title: this.$t("iaoMng.tkrpbcc"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "退客人胚布出库看板",
            },
            {
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.pbdc") + "_5");
              },
              title: this.$t("iaoMng.pbdc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "胚布调仓出库看板",
            },
            {
              click: () => {
                this.toView("cc_manual", this.$t("iaoMng.pb") + "_0");
              },
              title: this.$t("iaoMng.sgcc"), //"手工出仓",
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              click: () => {
                this.$router.push("proRevolve");
              },
              title: this.$t("iaoMng.bbcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        option3: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.cpbcc"),
              icon: "yx-icf-bupi",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("cc_cpb", this.$t("iaoMng.cpbxxcc") + "_6");
              },
              title: this.$t("iaoMng.cpbxxcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "销售出库看板",
            },
            {
              click: () => {
                this.toView("cc_manual", this.$t("whseField.cpb") + "_0");
              },
              title: this.$t("iaoMng.sgcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              click: () => {
                this.toView("cc_manual", this.$t("whseField.cpb") + "_0");
              },
              title: "检验出仓",
              icon: "el-icon-s-claim",
              color: "#409EFF",
            },
          ],
        },
        option4: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.scflcc"), //"生产辅料出库",
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                // this.toView("cc_scfl", "生产领用_1");
                this.toView("cc_scfl", this.$t("iaoMng.sclyflcc") + "_1");
              },
              title: this.$t("iaoMng.sclyflcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "领用出库看板",
            },
            {
              click: () => {
                this.toView("cc_scfl", this.$t("iaoMng.wfjgflcc") + "_2");
              },
              title: this.$t("iaoMng.wfjgflcc"),
              icon: "el-icon-s-home",
              color: "#ccc",
              // content: "外发加工出库看板",
            },
            {
              click: () => {
                this.toView("cc_scfl", this.$t("iaoMng.tgysflcc") + "_4");
              },
              title: this.$t("iaoMng.tgysflcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商出库看板",
            },
            {
              click: () => {
                this.toView("cc_scfl", this.$t("iaoMng.tkrflcc") + "_3");
              },
              title: this.$t("iaoMng.tkrflcc"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "退客人出库看板",
            },
            {
              click: () => {
                this.toView("cc_scfl", this.$t("iaoMng.fldc") + "_5");
              },
              title: this.$t("iaoMng.fldc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "调仓出库看板",
            },
            {
              click: () => {
                this.toView("cc_manual", this.$t("iaoMng.scfl") + "_0");
              },
              title: this.$t("iaoMng.sgcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        option5: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.hgylcc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("cc_hgyl", this.$t("iaoMng.sclyhgylcc") + "_1");
              },
              title: this.$t("iaoMng.sclyhgylcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "领用出库看板",
            },
            // {
            //   click: () => {
            //     this.toView("cc_hgyl", "退供应商_4");
            //   },
            //   title: "退供应商出库",
            //   icon: "el-icon-s-claim",
            //   color: "#409EFF",
            //   // content: "退供应商出库看板",
            // },
            // {
            //   click: () => {
            //     this.toView("cc_hgyl", "外发加工_2");
            //   },
            //   title: "外发加工出库",
            //   icon: "el-icon-s-home",
            //   color: "#ccc",
            //   // content: "外发加工出库看板",
            // },
            // {
            //   click: () => {
            //     this.toView("cc_hgyl", "退客人_3");
            //   },
            //   title: "退客人出库",
            //   icon: "el-icon-user-solid",
            //   color: "#409EFF",
            //   // content: "退客人出库看板",
            // },
            // {
            //   click: () => {
            //     this.toView("cc_hgyl", "调仓_5");
            //   },
            //   title: "调仓出库",
            //   icon: "el-icon-s-claim",
            //   color: "#409EFF",
            //   // content: "调仓出库看板",
            // },
            // {
            //   click: () => {
            //     this.toView("cc_manual", this.$t("iaoMng.hgyl") + "_0");
            //   },
            //   title:this.$t("iaoMng.sgcc"),
            //   icon: "el-icon-thumb",
            //   color: "#409EFF",
            // },
          ],
        },
        option7: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.ylcc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("cc_yl", this.$t("iaoMng.sclyylcc") + "_1");
              },
              title: this.$t("iaoMng.sclyylcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "领用出库看板",
            },
            // {
            //   click: () => {
            //     this.toView("cc_manual", this.$t("iaoMng.yl") + "_0");
            //   },
            //   title: this.$t("iaoMng.sgcc"),
            //   icon: "el-icon-thumb",
            //   color: "#409EFF",
            // },
          ],
        },
        wj: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.wjcc"), //"五金出库",
              icon: "el-icon-s-claim",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("cc_wj", this.$t("iaoMng.sclywjcc") + "_1");
              },
              title: this.$t("iaoMng.sclywjcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "领用出库看板",
            },
            {
              click: () => {
                this.toView("cc_wj", this.$t("iaoMng.tgyswjcc") + "_4");
              },
              title: this.$t("iaoMng.tgyswjcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商出库看板",
            },
            {
              click: () => {
                this.toView("cc_wj", this.$t("iaoMng.wjtc") + "_5");
              },
              title: this.$t("iaoMng.wjtc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "调仓出库看板",
            },
            {
              click: () => {
                this.toView("cc_manual", this.$t("choicDlg.wj") + "_0");
              },
              title: this.$t("iaoMng.sgcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              title: this.$t("iaoMng.xzcc"),
              icon: "el-icon-s-claim",
              color: "#606266",
            },
            {
              click: () => {
                this.toView("cc_xz", this.$t("iaoMng.sclyxzcc") + "_1");
              },
              title: this.$t("iaoMng.sclyxzcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "领用出库看板",
            },
            {
              click: () => {
                this.toView("cc_xz", this.$t("iaoMng.tgysxzcc") + "_4");
              },
              title: this.$t("iaoMng.tgysxzcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商出库看板",
            },
            {
              click: () => {
                this.toView("cc_xz", this.$t("iaoMng.xzdc") + "_5");
              },
              title: this.$t("iaoMng.xzdc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "调仓出库看板",
            },
            {
              click: () => {
                this.toView("cc_manual", this.$t("choicDlg.xz") + "_0");
              },
              title: this.$t("iaoMng.sgcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        rl: {
          span: 24,
          data: [
            {
              title: this.$t("iaoMng.rlcc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
            },
            // {
            //   click: () => {
            //     this.toView("cc_manual", this.$t("choicDlg.rl") + "_0");
            //   },
            //   title:this.$t("iaoMng.sgcc"),
            //   icon: "el-icon-thumb",
            //   color: "#409EFF",
            // },
            {
              click: () => {
                this.toView("cc_rl", this.$t("iaoMng.sclyrhcc") + "_1");
              },
              title: this.$t("iaoMng.sclyrhcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "领用出库看板",
            },
          ],
        },
        xz: {
          span: 24,
          data: [],
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
      type ? (this.kanban = false) : (this.kanban = true);

      let data = {
        type: type,
      };
      localStorage.setItem("imWk", JSON.stringify(data));
      this.$router.push({
        name: val,
        params: data,
      });
      this.dialogVisible = true;

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
#kbDlg
  .el-dialog__headerbtn .el-dialog__close
    color #fff !important
    font-size 24px
  // .el-dialog__body {
  // padding: 0 !important;
  // }
  .el-input__inner, .avue-form__group, .el-form-item__label
    border none !important
    background #021a3c
    color #fff
  .el-card__body
    padding 0 0px 0 0 !important
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active
    border-right-color #fff !important
    border-left-color #fff
  #points .el-tabs__item
    border-right 1px solid #606266
  .avue-form__group .el-input__suffix
    display none
#wkRuleDlg
  .el-radio, .el-radio--medium.is-bordered .el-radio__label, .el-radio__label
    font-size 16px
    height 30px
  .el-dialog__body
    padding 0 !important
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item
    margin-bottom 10px
  .el-dialog__header
    padding 0px
  .el-dialog__headerbtn
    top 5px
    color #000
    font-size 22px
    z-index 999
  .formBox
    margin-bottom 0px
  // .el-button--mini, .el-button--small {
  // font-size: 16px;
  // }

  // .el-button--mini, .el-button--mini.is-round {
  // padding: 5px 10px;
  // }
  .avue-crud__menu
    min-height 5px !important
    height 5px !important
  .el-tabs__item
    font-size 18px
    line-height 30px
    height 30px
#wkDlg, #sxrcDlg, #kbDlg
  .el-input.is-disabled .el-input__inner
    color #606266
    // background-color: #fff;
  .dlgView
    height 100%
    width 100%
  .avue-crud__menu
    height 32px !important
    min-height 32px !important
    font-size 18px
    margin-bottom 0 !important
  .avue-empty__desc
    color #000
  .el-dialog
    margin-top 0 !important
    height 100%
    margin 0 !important
    // background-color: rgb(2, 26, 60);
    overflow hidden
  .el-dialog__body
    padding 0 !important
  .el-dialog__header
    padding 0px
    background-color rgb(2, 26, 60)
  .el-dialog__headerbtn .el-dialog__close
    color #000
    font-size 24px
  .el-dialog__headerbtn
    font-size 18px
    top 5px
    z-index 2020
#ekIndex
  height 100%
  width 100%
  .avue-data-cardText .item
    padding 10px 2px
    margin 10px 5px
  .avue-data-cardText .item-header a
    margin-left 2px
  .el-tabs--border-card
    // background: rgb(0, 0, 0, 0);
    // border: none;
  .main
    // min-width: 1000px;
    width 100%
    height calc(100vh - 115px)
    min-height 500px
    overflow auto
  .item-header
    color #409EFF
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  #pane-rc
    width 100%
    height 100%
    overflow auto
  .el-icon-bell
    display none
  .item-footer
    display none
  .avue-data-cardText .item-content
    margin-top 10px
    display none
  .avue-data-cardText .el-col:nth-child(1) .item, .tabs1 .el-col:nth-child(7) .avue-data-cardText .el-col:nth-child(4) .item, .tabs1 .el-col:nth-child(8) .avue-data-cardText .el-col:nth-child(4) .item, .tabs2 .el-col:nth-child(7) .avue-data-cardText .el-col:nth-child(6) .item
    background-color #ccc
    min-height 20px
    .item-header
      cursor default !important
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      i
        font-size 24px
    .item-footer
      display none
    a
      color #000
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      font-size 15px
.avue-data-cardText .item-header a
  font-size 15px
.countBox
  width 99% !important
  margin 2px auto
  height calc(100vh - 90px)
  min-height 500px
  overflow auto
  .el-card
    margin-top 5px
  .data-icons .item-info
    font-size 18px
    line-height 15px
    span
      font-size 16px
      font-weight 700
    .count
      font-size 18px
  .item-footer
    display block !important
    text-align left
    color #fff
    p
      font-size 14px
      color #fff
    span
      font-size 16px
      color #fff
  .item-header
    color #fff !important
.el-input.is-disabled .el-input__inner
  color #606266
  // background-color: #fff;
.yx-icf-bupi:before
  content '\e71c'
.yx-icf-cailiaogongcheng:before
  content '\e61c'
.yx-icf-xian:before
  content '\e746'
.yx-icf-xian1:before
  content '\e747'
.yx-icf-buliao:before
  content '\e74b'
.yx-icf-taishidiannao:before
  content '\e608'
.yx-icf-diannao:before
  content '\e768'
</style>