<template>
  <div id="ekIndex">
    <el-tabs v-model="tabs" type="border-card">
      <el-tab-pane name="rc" :label="$t('iaoMng.rcgl')">
        <span slot="label"
          ><i style="font-size: 24px" class="el-icon-s-home"></i>
          {{ $t("iaoMng.rcgl") }}</span
        >
        <div class="main tabs1">
          <dataCardTextMenu :dataArr="arrList" model="h"></dataCardTextMenu>
        </div>
      </el-tab-pane>
      <el-tab-pane name="cc" :label="$t('iaoMng.ccgl')">
        <span slot="label"
          ><i style="font-size: 24px" class="el-icon-truck"></i>
          {{ $t("iaoMng.ccgl") }}</span
        >
        <div class="main tabs2">
          <dataCardTextMenu :dataArr="outList" model="h"></dataCardTextMenu>
        </div>
      </el-tab-pane>
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
import dataCardTextMenu from "@/components/dataCardTextMenu/index";
import { fetchUnOutStockCountData, fetchUnInStockCountData } from "@/api/im/Wk/index"
export default {
  name: "",
  components: {
    dataCardTextMenu,
  },
  data() {
    return {
      dialogVisible: false,
      tabs: "rc",
      kanban: false,
      arrList: [
        {
          id: "1",
          label: "纱线",
          name: "SX",
          span: 3,
          data: [
            {
              click: () => {},
              id: "1-1",
              title: this.$t("iaoMng.sxrc"),
              icon: "yx-icf-xian1",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "1-2",
              click: () => {
                this.toView("sampleYarnIn", this.$t("iaoMng.ysrc") + "_1","SX");
              },
              title: this.$t("iaoMng.ysrc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "samCount",
              badge:"",
            },
            {
              id: "1-3",
              click: () => {
                this.toView("rc_cg", this.$t("iaoMng.sx") + "_2","SX");
              },
              title: this.$t("iaoMng.sxcg"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              badgeKey: "purCount",
              badge:"",
            },
            {
              id: "1-4",
              click: () => {
                this.toView("facRetYarnIn", this.$t("iaoMng.ystc") + "_4","SX");
              },
              title: this.$t("iaoMng.ystc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              badgeKey: "innerWithCount",
              badge:"",
            },
            {
              id: "1-5",
              click: () => {
                this.toView("facRetYarnIn", this.$t("iaoMng.wfts") + "_5","SX");
              },
              title: this.$t("iaoMng.wfts"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              badgeKey: "outsideWithCount",
              badge:"",
            },
            {
              id: "1-6",
              click: () => {
                this.toView("rc_sg", this.$t("iaoMng.sx") + "_6","SX");
              },
              title: this.$t("iaoMng.sgsx"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "appleCount",
              badge: ''
            },

            {
              id: "1-7",
              click: () => {
                this.toView("rc_manual", this.$t("iaoMng.sx") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        {
          id: "2",
          label: "胚布",
          name: "PB",
          span: 3,
          data: [
            {
              id: "2-1",
              click: () => {},
              title: this.$t("iaoMng.pbrc"),
              icon: "yx-icf-bupi",
              color: "#000",
              bgColor: "#ccc",
            },
            {
              id: "2-2",
              click: () => {
                this.toView("rc_pb", this.$t("iaoMng.krlp") + "_1","PB");
              },
              title: this.$t("iaoMng.krlp"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
            },
            {
              id: "2-3",
              click: () => {
                this.toView("rc_cg", this.$t("iaoMng.pb") + "_2","PB");
              },
              title: this.$t("iaoMng.pbcg"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
            },
            {
              id: "2-4",
              click: () => {
                this.toView("rc_pb", this.$t("iaoMng.bcsc") + "_6","PB");
              },
              title: this.$t("iaoMng.bcsc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
            },
            {
              id: "2-5",
              click: () => {
                this.toView("rc_pb", this.$t("iaoMng.pbtc") + "_4","PB");
              },
              title: this.$t("iaoMng.pbtc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
            },
            {
              id: "2-6",
              click: () => {
                this.toView("rc_pb", this.$t("iaoMng.jghp") + "_7","PB");
              },
              title: this.$t("iaoMng.jghp"),
              icon: "el-icon-s-home",
              color: "#409EFF",
            },
            {
              id: "2-7",
              click: () => {
                this.toView("rc_pb", this.$t("iaoMng.wftp") + "_5","PB");
              },
              title: this.$t("iaoMng.wftp"),
              icon: "el-icon-s-home",
              color: "#409EFF",
            },
            {
              id: "2-8",
              click: () => {
                this.toView(
                  "cc_package",
                  this.$t("iaoMng.pbhwb") + "_whseCalicopackBarcodeoid",
                  "PB"
                );
              },
              title: this.$t("iaoMng.pbhwb"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
            },
            {
              id: "2-9",
              click: () => {
                this.toView("rc_manual", this.$t("iaoMng.pb") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        {
          id: "3",
          label: "成品布",
          name: "CPB",
          span: 3,
          data: [
            {
              click: () => {},
              id: "3-1",
              title: this.$t("iaoMng.cpbrc"),
              icon: "yx-icf-bupi",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "3-2",
              click: () => {
                this.toView("rc_cpb", this.$t("iaoMng.bcsc") + "_1","CPB");
              },
              title: this.$t("iaoMng.bcsc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
            },
            {
              id: "3-3",
              click: () => {
                this.toView("rc_cpb", this.$t("iaoMng.wfjghc") + "_3","CPB");
              },
              title: this.$t("iaoMng.wfjghc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
            },

            {
              id: "3-4",
              click: () => {
                this.toView("rc_cpb", this.$t("iaoMng.krth") + "_2","CPB");
              },
              title: this.$t("iaoMng.krth"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
            },
            {
              id: "3-5",
              click: () => {
                this.toView(
                  "cc_package",
                  this.$t("iaoMng.cpbhwb") + "_whseFinishedclothpackBarcodeoid",
                  "CPB"
                );
              },
              title: this.$t("iaoMng.cpbhwb"),
              icon: "yx-icf-bupi",
              color: "#409EFF",
            },
            {
              id: "3-6",
              click: () => {
                this.toView("rc_manual", "成品布" + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        {
          id: "4",
          label: "化工原料",
          name: "RHL",
          span: 3,
          data: [
            {
              click: () => {},
              title: this.$t("iaoMng.hgylrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
              bgColor: "#ccc",
            },

            {
              click: () => {
                // this.toView("rc_rhl", this.$t("iaoMng.krlhgyl") + "_1");
                this.toView("sam_mat", this.$t("iaoMng.hgylyprc") + "_3","RHL");
              },
              // title: this.$t("iaoMng.krlhgyl"),
              title: this.$t("iaoMng.yprc"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              badgeKey: "samCount",
              badge: "",
            },
            {
              click: () => {
                this.toView("rc_cg", this.$t("iaoMng.hgyl") + "_2","RHL");
              },
              title: this.$t("iaoMng.ylcg1"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              badgeKey: "purCount",
              badge: "",
            },
            {
              click: () => {
                // this.toView("rc_rhl", this.$t("iaoMng.wfcth") + "_5");
                this.toView("ret_mat", this.$t("iaoMng.hgylylfc") + "_3","RHL");
              },
              title: this.$t("iaoMng.ylfc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              badgeKey: "outsideWithCount",
              badge: "",
            },
            {
              click: () => {
                // this.toView("rc_rhl", "申购_8");
                this.toView("rc_sg", this.$t("iaoMng.hgyl") + "_4","RHL");
              },
              title: this.$t("iaoMng.sghgyl"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "appleCount",
              badge: "",
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
        {
          id: "5",
          label: "染料",
          name: "RLL",
          span: 3,
          data: [
            {
              click: () => {},
              id: "5-1",
              title: this.$t("iaoMng.ylrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "5-2",
              click: () => {
                // this.toView("rc_yl", this.$t("iaoMng.krlyl") + "_1");
                this.toView("sam_mat", this.$t("iaoMng.ylyprc") + "_4","RLL");
              },
              title: this.$t("iaoMng.yprc"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              badgeKey: "samCount",
              badge: "",
            },
            {
              id: "5-3",
              click: () => {
                this.toView("rc_cg", this.$t("iaoMng.yl") + "_2","RLL");
              },
              title: this.$t("iaoMng.ylcg"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              badgeKey: "purCount",
              badge: "",
            },
            {
              id: "5-4",
              click: () => {
                // this.toView("rc_yl", this.$t("iaoMng.wfcth") + "_5");
                this.toView("ret_mat", this.$t("iaoMng.rlylfc") + "_4","RLL");
              },
              title: this.$t("iaoMng.ylfc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              badgeKey: "outsideWithCount",
              badge: "",
            },
            {
              id: "5-5",
              click: () => {
                this.toView("rc_sg", this.$t("iaoMng.yl") + "_4","RLL");
              },
              title: this.$t("iaoMng.sgyl"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "appleCount",
              badge: "",
            },
            {
              id: "5-6",
              click: () => {
                this.toView("rc_manual", this.$t("iaoMng.yl") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        {
          id: "6",
          label: "生产辅料",
          name: "FL",
          span: 3,
          data: [
            {
              id: "6-1",
              click: () => {},
              title: this.$t("iaoMng.scflrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "6-2",
              click: () => {
                this.toView("rc_scfl", this.$t("iaoMng.krlfl") + "_1","FL");
              },
              title: this.$t("iaoMng.krlfl"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              badgeKey: "samCount",
              badge: "",
              // content: "客人来生料入库看板",
            },
            {
              id: "6-3",
              click: () => {
                // this.toView("rc_cg", this.$t("iaoMng.scfl") + "_2","FL");
              },
              title: this.$t("iaoMng.scflcg"),
              icon: "el-icon-shopping-cart-2",
              color: "#409EFF",
              badgeKey: "purCount",
              badge: "",
              // content: "采购生产辅料入库看板",
            },
            {
              id: "6-4",
              click: () => {
                // this.toView("rc_scfl", this.$t("iaoMng.wfcylhc") + "_6");
                this.toView("ret_mat", this.$t("iaoMng.scflylfc") + "_5","FL");
              },
              // title: this.$t("iaoMng.wfcylhc"),
              title: this.$t("iaoMng.ylfc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              badgeKey: "outsideWithCount",
              badge: "",
              // content: "外发余料回仓看板",
            },
            {
              id: "6-5",
              click: () => {
                this.toView("rc_sg", this.$t("iaoMng.fl") + "_5","FL");
              },
              title: this.$t("iaoMng.sgscfl"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "appleCount",
              badge: "",
              // content: "申购化工原料入库看板",
            },
            {
              id: "6-6",
              click: () => {
                this.toView("rc_manual", this.$t("choicDlg.scfl") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },

        {
          id: "8",
          lael: "五金用品",
          name: "WJ|XZ",
          span: 3,
          data: [
            {
              id: "8-1",
              click: () => {},
              title: this.$t("iaoMng.wjrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "8-2",
              name: "WJ",
              click: () => {
                this.toView("rc_sg", this.$t("choicDlg.wj") + "_7",'WJ');
              },
              title: "五金申购",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "appleCount",
              badge: "",
            },
             {
              id: "8-3",
              click: () => {
                this.toView("rc_manual", this.$t("choicDlg.wj") + "_0",'WJ');
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              click: () => {},
              label: "行政用品",
              name: "XZ",
              id: "8-4",
              title: this.$t("iaoMng.xzrc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "8-5",
              name: "XZ",
              click: () => {
                this.toView("rc_sg", this.$t("choicDlg.xz") + "_7","XZ");
              },
              title: "行政申购",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "appleCount",
              badge: "",
            },
            {
              id: "8-6",
              click: () => {
                this.toView("rc_manual", this.$t("choicDlg.xz") + "_0","XZ");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        {
          id: "9",
          label: "能源",
          name: "ENG|EQU",
          span: 3,
          data: [
            {
              id: "9-1",
              click: () => {},
              title: this.$t("iaoMng.rlrc"),
              icon: "el-icon-sunny",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "9-2",
              name: "ENG",
              click: () => {
                this.toView("rc_sg", this.$t("choicDlg.rl") + "_6","ENG");
              },
              title: "能源申购",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "appleCount",
              badge: "",
            },
            {
              id: "9-3",
              click: () => {
                this.toView("rc_manual", this.$t("choicDlg.rl") + "_0");
              },
              title: this.$t("iaoMng.sgrc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              click: () => {},
              id: "9-4",
              label: "设备",
              name: "EQU",
              title: this.$t("iaoMng.sbrc"),
              icon: "el-icon-s-platform",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "9-5",
              click: () => {
                this.toView("rc_sg", this.$t("iaoMng.sb") + "_7","EQU");
              },
              name: "EQU",
              title: "设备申购",
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "appleCount",
              badge: "",
            },
          ],
        },
      ],
      outList: [
        {
          id: "1",
          label: "纱线",
          name: "SX",
          span: 3,
          data: [
            {
              id: "1-1",
              click: () => {},
              title: this.$t("iaoMng.sxcc"),
              icon: "yx-icf-xian1",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "1-2",
              click: () => {
                this.toView("cc_productionUse", this.$t("iaoMng.sx") + "_1", "SX");
              },
              title: this.$t("iaoMng.sclycc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              date: "1天前",
              badgeKey: "applyCount",
              badge: ""
              // content: "生产领用出库看板",
            },
            {
              id: "1-3",
              click: () => {
                this.toView("cc_sx", this.$t("iaoMng.wfjgscc") + "_2", "SX");
              },
              title: this.$t("iaoMng.wfjgscc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              badgeKey: "outsideCount",
              badge: ""
              // content: "外发加工出库看板",
            },
            {
              id: "1-4",
              click: () => {
                // this.toView("cc_sx", this.$t("iaoMng.tgysscc") + "_4");
                this.toView("cc_ret_reat", this.$t("iaoMng.tgysscc") + "_4", "SX");
              },
              title: this.$t("iaoMng.tgysscc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "memoCount",
              badge: ""
              // content: "退供应商纱出库看板",
            },
            {
              id: "1-5",
              click: () => {
                this.toView("cc_sx", this.$t("iaoMng.tkrscc") + "_3");
              },
              title: this.$t("iaoMng.tkrscc"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "退客人纱出库看板",
            },
            {
              id: "1-6",
              click: () => {
                this.toView("cc_sx", this.$t("iaoMng.sxdc") + "_5");
              },
              title: this.$t("iaoMng.sxdc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "纱线调仓出库看板",
            },
            {
              id: "1-7",
              click: () => {
                this.toView("cc_manual", this.$t("iaoMng.sx") + "_0");
              },
              title: this.$t("iaoMng.sgcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        {
          id: "2",
          label: "胚布",
          span: 3,
          data: [
            {
              id: "2-1",
              click: () => {},
              title: this.$t("iaoMng.pbcc"), //"胚布出库",
              icon: "yx-icf-bupi",
              color: "#000",
              bgColor: "#ccc",
            },
            {
              id: "2-2",
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.sclypbcc") + "_1");
              },
              title: this.$t("iaoMng.sclypbcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "生产领用出库看板",
            },
            {
              id: "2-3",
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.wfjgpbcc") + "_2");
              },
              title: this.$t("iaoMng.wfjgpbcc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              // content: "外发加工出库看板",
            },
            {
              id: "2-4",
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.xspbcc") + "_6");
              },
              title: this.$t("iaoMng.xspbcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "销售出库看板",
            },
            {
              id: "2-5",
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.tgyspbcc") + "_4");
              },
              title: this.$t("iaoMng.tgyspbcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "退供应商胚布出库看板",
            },
            {
              id: "2-6",
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.tkrpbcc") + "_3");
              },
              title: this.$t("iaoMng.tkrpbcc"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "退客人胚布出库看板",
            },
            {
              id: "2-7",
              click: () => {
                this.toView("cc_pb", this.$t("iaoMng.pbdc") + "_5");
              },
              title: this.$t("iaoMng.pbdc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "胚布调仓出库看板",
            },
            {
              id: "2-8",
              click: () => {
                this.toView("cc_manual", this.$t("iaoMng.pb") + "_0");
              },
              title: this.$t("iaoMng.sgcc"), //"手工出仓",
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              id: "2-9",
              click: () => {
                this.$router.push("proRevolve");
              },
              title: this.$t("iaoMng.bbcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        {
          id: "3",
          label: "成品布",
          span: 3,
          data: [
            {
              id: "3-1",
              click: () => {},
              title: this.$t("iaoMng.cpbcc"),
              icon: "yx-icf-bupi",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "3-2",
              click: () => {
                this.toView("cc_cpb", this.$t("iaoMng.cpbxxcc") + "_6");
              },
              title: this.$t("iaoMng.cpbxxcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "销售出库看板",
            },
            {
              id: "3-3",
              click: () => {
                this.toView("cc_manual", this.$t("whseField.cpb") + "_0");
              },
              title: this.$t("iaoMng.sgcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              id: "3-4",
              click: () => {
                this.toView("cc_manual", this.$t("whseField.cpb") + "_0");
              },
              title: "检验出仓",
              icon: "el-icon-s-claim",
              color: "#409EFF",
            },
          ],
        },
        {
          id: "4",
          label: "辅料",
          name: "FL",
          span: 3,
          data: [
            {
              id: "4-1",
              click: () => {},
              title: this.$t("iaoMng.scflcc"), //"生产辅料出库",
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "4-2",
              click: () => {
                // this.toView("cc_scfl", "生产领用_1");
                // this.toView("cc_scfl", this.$t("iaoMng.sclyflcc") + "_1");
                this.toView("cc_productionUse", this.$t("iaoMng.scfl") + "_1", "FL");
              },
              title: this.$t("iaoMng.sclyflcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "applyCount",
              badge: ""
              // content: "领用出库看板",
            },
            {
              id: "4-3",
              click: () => {
                this.toView("cc_scfl", this.$t("iaoMng.wfjgflcc") + "_2", "FL");
              },
              title: this.$t("iaoMng.wfjgflcc"),
              icon: "el-icon-s-home",
              color: "#409EFF",
              badgeKey: "outsideCount",
              badge: ""
              // content: "外发加工出库看板",
            },
            {
              id: "4-7",
              click: () => {
                // this.toView("cc_scfl", this.$t("iaoMng.tgysflcc") + "_4");
                this.toView("ret_supp", this.$t("iaoMng.tgysflcc") + "_3", "FL");
              },
              title: this.$t("iaoMng.tgysflcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "memoCount",
              badge: ""
              // content: "退供应商出库看板",
            },
            {
              id: "4-4",
              click: () => {
                this.toView("cc_scfl", this.$t("iaoMng.tkrflcc") + "_3");
              },
              title: this.$t("iaoMng.tkrflcc"),
              icon: "el-icon-user-solid",
              color: "#409EFF",
              // content: "退客人出库看板",
            },
            {
              id: "4-5",
              click: () => {
                this.toView("cc_scfl", this.$t("iaoMng.fldc") + "_5");
              },
              title: this.$t("iaoMng.fldc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "调仓出库看板",
            },
            {
              id: "4-6",
              click: () => {
                this.toView("cc_manual", this.$t("iaoMng.scfl") + "_0");
              },
              title: this.$t("iaoMng.sgcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        {
          id: "5",
          label: "化工原料",
          name: "HRL",
          span: 3,
          data: [
            {
              click: () => {},
              id: "5-1",
              title: this.$t("iaoMng.hgylcc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "5-2",
              click: () => {
                // this.toView("cc_hgyl", this.$t("iaoMng.sclyhgylcc") + "_1");
                this.toView("cc_productionUse", this.$t("iaoMng.hgyl") + "_1", "HRL");
              },
              title: this.$t("iaoMng.sclyhgylcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "applyCount",
              badge: ""
              // content: "领用出库看板",
            },
            {
              id: "5-3",
              click: () => {
                // this.toView("cc_scfl", this.$t("iaoMng.tgysflcc") + "_4");
                this.toView("ret_supp", this.$t("iaoMng.tgyshgylcc") + "_5", "HRL");
              },
              title: this.$t("iaoMng.tgyshgylcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "memoCount",
              badge: ""
              // content: "退供应商出库看板",
            },
          ],
        },
        {
          id: "6",
          label: "染料",
          name: "RLL",
          span: 3,
          data: [
            {
              id: "6-1",
              click: () => {},
              title: this.$t("iaoMng.ylcc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "6-2",
              click: () => {
                this.toView("cc_yl", this.$t("iaoMng.sclyylcc") + "_1");
                this.toView("cc_productionUse", this.$t("iaoMng.yl") + "_1", "RLL");
              },
              title: this.$t("iaoMng.sclyylcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "applyCount",
              badge: ""
              // content: "领用出库看板",
            },
            {
              id: "6-3",
              click: () => {
                // this.toView("cc_scfl", this.$t("iaoMng.tgysflcc") + "_4");
                this.toView("ret_supp", this.$t("iaoMng.tgysylcc") + "_8", "RLL");
              },
              title: this.$t("iaoMng.tgysylcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "memoCount",
              badge: ""
              // content: "退供应商出库看板",
            },
          ],
        },
        {
          id: "7",
          label: "五金",
          name: "WJ|XZ",
          span: 3,
          data: [
            {
              click: () => {},
              name: "WJ",
              id: "7-1",
              title: this.$t("iaoMng.wjcc"), //"五金出库",
              icon: "el-icon-s-claim",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "7-2",
              name: "WJ",
              click: () => {
                // this.toView("cc_wj", this.$t("iaoMng.sclywjcc") + "_1");
                this.toView("cc_productionUse", this.$t("choicDlg.wj") + "_1", "WJ");
              },
              title: this.$t("iaoMng.sclywjcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "applyCount",
              badge: ""
              // content: "领用出库看板",
            },
            {
              id: "7-3",
              name: "WJ",
              click: () => {
                // this.toView("cc_wj", this.$t("iaoMng.tgyswjcc") + "_4");
                this.toView("ret_supp", this.$t("iaoMng.tgyswjcc") + "_1", "WJ");
              },
              title: this.$t("iaoMng.tgyswjcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "memoCount",
              badge: ""
              // content: "退供应商出库看板",
            },
            {
              id: "7-4",
              name: "WJ",
              click: () => {
                this.toView("cc_wj", this.$t("iaoMng.wjtc") + "_5");
              },
              title: this.$t("iaoMng.wjtc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "调仓出库看板",
            },
            {
              id: "7-5",
              name: "WJ",
              click: () => {
                this.toView("cc_manual", this.$t("choicDlg.wj") + "_0");
              },
              title: this.$t("iaoMng.sgcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
            {
              click: () => {},
              id: "7-6",
              label: "行政",
              title: this.$t("iaoMng.xzcc"),
              icon: "el-icon-s-claim",
              color: "#606266",
              bgColor: "#ccc",
            },
            {
              id: "7-7",
              name: "XZ",
              click: () => {
                // this.toView("cc_xz", this.$t("iaoMng.sclyxzcc") + "_1");
                this.toView("cc_productionUse", this.$t("choicDlg.xz") + "_1", "XZ");
              },
              title: this.$t("iaoMng.sclyxzcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "applyCount",
              badge: ""
              // content: "领用出库看板",
            },
            {
              id: "7-8",
              name: "XZ",
              click: () => {
                // this.toView("cc_xz", this.$t("iaoMng.tgysxzcc") + "_4");
                this.toView("ret_supp", this.$t("iaoMng.tgysxzcc") + "_2", "XZ");
              },
              title: this.$t("iaoMng.tgysxzcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "memoCount",
              badge: ""
              // content: "退供应商出库看板",
            },
            {
              id: "7-9",
              name: "XZ",
              click: () => {
                this.toView("cc_xz", this.$t("iaoMng.xzdc") + "_5");
              },
              title: this.$t("iaoMng.xzdc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              // content: "调仓出库看板",
            },
            {
              id: "7-10",
              name: "XZ",
              click: () => {
                this.toView("cc_manual", this.$t("choicDlg.xz") + "_0");
              },
              title: this.$t("iaoMng.sgcc"),
              icon: "el-icon-thumb",
              color: "#409EFF",
            },
          ],
        },
        {
          id: "8",
          label: "能源",
          name: "ENG|EQU",
          span: 3,
          data: [
            {
              click: () => {},
              id: "8-1",
              title: this.$t("iaoMng.rlcc"),
              icon: "yx-icf-cailiaogongcheng",
              color: "#606266",
              bgColor: "#ccc",
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
              id: "8-2",
              click: () => {
                this.toView("cc_rl", this.$t("iaoMng.sclyrhcc") + "_1", "ENG");
              },
              title: this.$t("iaoMng.sclyrhcc"),
              icon: "el-icon-s-claim",
              color: "#409EFF",
              badgeKey: "applyCount",
              badge: ""
              // content: "领用出库看板",
            },
          ],
        },
      ],
      // 当前操作列
      curWhseType: "",
    };
  },


  methods: {
    // 获取未入仓统计数据
    getUnInStockCountData(refreshAll = false){
      let types = [];
      if(refreshAll){
        types = ["SX","HRL","RLL", "FL", "WJ", "XZ", "ENG","EQU"];
      }else{
        this.curWhseType && types.push(this.curWhseType);
      }
      if(types.length == 0) return;
      types = types.join(",");
      fetchUnInStockCountData(types).then(res => {
        return res.data;
      }).then(resData => {
        resData.forEach(countItem => {
          let existMut = ["WJ","XZ","ENG","EQU"].includes(countItem.type);
          let whseInMenuItem = this.arrList.find(menuIten => (menuIten.name || "").includes(countItem.type));
          if(whseInMenuItem){
            let tDataList = whseInMenuItem.data;
            if(existMut){
              tDataList = tDataList.filter(cItem => cItem.name == countItem.type);
            }
            tDataList.forEach(cItem => {
              cItem.badge = countItem[cItem.badgeKey] || ""
            })
          }
        })
      })
    },
    // 获取未出仓统计数据
    getUnOutStockCountData(refreshAll = false){
      let types = [];
      if(refreshAll){
        types = ["SX","HRL","RLL", "FL", "WJ", "XZ", "ENG"];
      }else{
        this.curWhseType && types.push(this.curWhseType);
      }
      if(types.length == 0) return;
      types = types.join(",");
      fetchUnOutStockCountData(types).then(res => {
        return res.data;
      }).then(resData => {
        resData.forEach(countItem => {
          let existMut = ["WJ","XZ"].includes(countItem.type);
          let whseOutMenuItem = this.outList.find(menuIten => (menuIten.name || "").includes(countItem.type));
          if(whseOutMenuItem){
            let tDataList = whseOutMenuItem.data;
            if(existMut){
              tDataList = tDataList.filter(cItem => cItem.name == countItem.type);
            } 
            tDataList.forEach(cItem => {
              cItem.badge = countItem[cItem.badgeKey] || ""
            })
          }
        })
      })
    },
    toView(val, type, whseType) {
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
      this.curWhseType = whseType;
    },
    handleClose(done) {
      this.$router.push({
        path: "imWk",
      });
      localStorage.removeItem("imWk");
      this.refreshCountData();
      done();
    },
    refreshCountData(){
      switch(this.tabs){
        case "rc": 
          this.getUnInStockCountData();
          break;
        case "cc" :
          this.getUnOutStockCountData();
          break;
        default:; break;
      }
    },
  },
  
  created() {
    this.getUnInStockCountData(true);
    this.getUnOutStockCountData(true);
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
.whse-menuCard {
  width: 92%;
  height: 50px;
  line-height: 50px;
  border-radius: 5px !important;
  margin: 0.5em auto;
  text-align: left;
  text-indent: 5px;

  i {
    font-size: 21px;
  }

  span {
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-weight: bold;
  }
}

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
    // background-color: rgb(2, 26, 60);
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
    margin: 10px 5px;
  }

  .avue-data-cardText .item-header a {
    margin-left: 2px;
  }

  .el-tabs--border-card {
    // background: rgb(0, 0, 0, 0);
    // border: none;
  }

  .main {
    // min-width: 1000px;
    width: 100%;
    height: calc(100vh - 115px);
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

  .avue-data-cardText .el-col:nth-child(1) .item, .tabs1 .el-col:nth-child(7) .avue-data-cardText .el-col:nth-child(4) .item, .tabs1 .el-col:nth-child(8) .avue-data-cardText .el-col:nth-child(4) .item, .tabs2 .el-col:nth-child(7) .avue-data-cardText .el-col:nth-child(6) .item {
    background-color: #ccc;
    min-height: 20px;

    .item-header {
      cursor: default !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      i {
        font-size: 24px;
      }
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