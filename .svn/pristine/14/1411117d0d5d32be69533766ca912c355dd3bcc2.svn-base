<template>
  <!-- 胚布 -->

  <div style="overflow: auto" id="FabricOrder">
    <el-row class="queryForm">
      <el-tabs type="border-card">
        <el-tab-pane label="胚布检验报告">
          <!-- 下拉选择 -->
          <el-row>
            <ql-Head ref="qlHead" @checkVariety="checkVariety"></ql-Head>
          </el-row>
          <!-- 按钮 -->
          <el-row class="btnList" v-if="btnCtr">
            <el-col :span="24">
              <el-button type="primary" v-if="!isCell" @click="Editor">{{
                $t("energy.bj")
              }}</el-button>
              <el-button
                type="primary"
                v-else
                :disabled="!canSave"
                @click="Update"
                >{{ $t("energy.bc") }}</el-button
              >
              <el-button type="primary" :disabled="!isCell" @click="Cancel">{{
                $t("energy.qx")
              }}</el-button>
            </el-col>
          </el-row>
          <div
            v-loading="loading"
            :element-loading-text="$t('proReport.jzz')"
          >
            <!-- 按钮 -->
            <!-- 质量检查项目 -->
            <el-row class="Quality">
              <el-col :span="12">
                <div class="tbBox">
                  <el-container class="rowBox">
                    <el-header class="headBox">
                      <el-row class="rowHead">
                        <el-col :span="4" style="border: none">
                          <div
                            style="
                              width: 98.5%;
                              border-right: 1px solid #c0c4cc;
                            "
                          >
                            {{ $t("energy.jczl") }}
                          </div>
                        </el-col>
                        <el-col :span="20">
                          <el-row>
                            <el-col :span="6" style="border: none">
                              <div
                                style="
                                  width: 98.8%;
                                  border-right: 1px solid #c0c4cc;
                                "
                              >
                                {{ $t("energy.jcxm") }}
                              </div>
                            </el-col>
                            <el-col :span="18" class="inbox">
                              <el-row>
                                <el-col :span="8" style="border: none">
                                  <div
                                    style="
                                      width: 98.9%;
                                      border-right: 1px solid #c0c4cc;
                                    "
                                  >
                                    {{ $t("energy.ckff") }}
                                  </div>
                                </el-col>
                                <el-col :span="8" style="border: none">
                                  <div
                                    style="
                                      width: 98.5%;
                                      border-right: 1px solid #c0c4cc;
                                    "
                                  >
                                    {{ $t("energy.gg") }}
                                  </div>
                                </el-col>
                                <el-col
                                  :span="8"
                                  style="border-right: 2px solid #c0c4cc"
                                >
                                  <span>{{ $t("energy.jsbz") }}</span>
                                </el-col>
                              </el-row>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </el-header>
                    <el-main class="mainBox" ref="mainBox1">
                      <el-row v-if="tbData.length > 0">
                        <el-col :span="4">
                          <div class="pzStyle" :style="pzStyle[0]">
                            <el-popover
                              placement="top-start"
                              width="100"
                              trigger="click"
                              :content="checkPz[0]"
                            >
                              <span slot="reference">{{ checkPz[0] }}</span>
                            </el-popover>
                          </div>
                        </el-col>
                        <el-col
                          :span="20"
                          style="
                            border-top: 1px solid #c0c4cc;
                            margin-top: -1px;
                          "
                        >
                          <el-row
                            class="content"
                            v-for="(item, index) of tbData"
                            :key="index"
                          >
                            <el-col
                              :span="6"
                              :style="item.tbStyle"
                              class="xmStyle"
                            >
                              <el-row>
                                <div class="tbLabel">
                                  <el-popover
                                    placement="top-start"
                                    width="200"
                                    trigger="click"
                                    :content="item.itemName"
                                  >
                                    <span slot="reference">{{
                                      item.itemName
                                    }}</span>
                                  </el-popover>
                                </div>
                              </el-row>
                            </el-col>
                            <!-- 参考方法 -->
                            <el-col :span="18">
                              <el-row>
                                <div
                                  v-if="item.labCheckStandard.length > 0"
                                  v-for="(
                                    items, indexs
                                  ) in item.labCheckStandard"
                                  class="contentDiv"
                                  :key="indexs"
                                >
                                  <el-row v-if="items.standName">
                                    <el-col
                                      :span="8"
                                      :style="items.ckStyle"
                                      class="ffStyle"
                                    >
                                      <div class="tbLabel">
                                        <el-popover
                                          placement="top-start"
                                          width="200"
                                          trigger="click"
                                          :content="items.standName"
                                        >
                                          <span slot="reference">{{
                                            items.standName
                                          }}</span>
                                        </el-popover>
                                      </div>
                                    </el-col>
                                    <el-col
                                      :span="16"
                                      v-for="(
                                        data, indexs
                                      ) of items.labCheckScopeRange"
                                      :key="indexs"
                                      v-if="items.labCheckScopeRange.length > 0"
                                    >
                                      <el-row>
                                        <el-col
                                          :span="12"
                                          v-if="data.scopeName"
                                        >
                                          <div class="contentList">
                                            <div class="cdiv">
                                              <el-popover
                                                placement="top-start"
                                                width="200"
                                                trigger="click"
                                                :content="data.scopeName"
                                              >
                                                <span slot="reference">{{
                                                  data.scopeName
                                                }}</span>
                                              </el-popover>
                                            </div>
                                          </div>
                                        </el-col>
                                        <el-col
                                          v-else
                                          :span="12"
                                          class="nullStyle"
                                          style="
                                            border-right: 1px solid #c0c4cc;
                                          "
                                          >/</el-col
                                        >
                                        <el-col
                                          :span="12"
                                          v-if="data.rangeAccept"
                                        >
                                          <div class="contentList">
                                            <div class="cdiv">
                                              <el-popover
                                                placement="top-end"
                                                width="200"
                                                trigger="click"
                                                :content="data.rangeAccept"
                                              >
                                                <span slot="reference">{{
                                                  data.rangeAccept
                                                }}</span>
                                              </el-popover>
                                            </div>
                                          </div>
                                        </el-col>
                                        <el-col
                                          v-else
                                          :span="12"
                                          class="nullStyle"
                                          style="
                                            border-right: 1px solid #c0c4cc;
                                          "
                                          >/</el-col
                                        >
                                      </el-row>
                                    </el-col>
                                    <el-col
                                      :span="16"
                                      v-if="
                                        items.labCheckScopeRange.length == 0
                                      "
                                    >
                                      <el-row>
                                        <el-col
                                          :span="12"
                                          style="
                                            height: 50px;
                                            line-height: 50px;
                                            border-right: 1px solid #c0c4cc;
                                          "
                                          >/</el-col
                                        >
                                        <el-col
                                          :span="12"
                                          style="
                                            height: 50px;
                                            line-height: 50px;
                                            border-right: 1px solid #c0c4cc;
                                          "
                                          >/</el-col
                                        >
                                      </el-row>
                                    </el-col>
                                  </el-row>
                                </div>
                                <div
                                  v-if="item.labCheckStandard.length == 0"
                                  style="
                                    height: 50px;
                                    line-height: 50px;
                                    border-right: 1px solid #26a7e0;
                                  "
                                >
                                  <el-row
                                    style="border-right: 1px solid #c0c4cc"
                                  >
                                    <div>/</div>
                                  </el-row>
                                </div>
                              </el-row>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                      <el-row
                        v-else
                        style="
                          border-bottom: 1px solid #c0c4cc;
                          margin-top: -0.5px;
                        "
                      >
                        <el-col :span="4">
                          <div class="pzStyle" style="border-bottom: none">
                            <el-popover
                              placement="top-start"
                              width="100"
                              trigger="click"
                              :content="checkPz[0]"
                            >
                              <span slot="reference">{{ checkPz[0] }}</span>
                            </el-popover>
                          </div>
                        </el-col>
                        <el-col :span="20" class="nullData">
                          <el-row style="border-right: 1px solid #26a7e0">
                            <div style="border-right: 1px solid #c0c4cc">/</div>
                          </el-row>
                        </el-col>
                      </el-row>
                    </el-main>
                  </el-container>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="tbBox1">
                  <el-container class="rowBox">
                    <el-header class="headBox">
                      <el-row
                        class="rowHead"
                        style="border-left: none; border-right: none"
                      >
                        <el-col :span="24">
                          <el-row>
                            <el-col :span="24" class="inbox">
                              <el-row>
                                <el-col :span="24" style="border-left: none">
                                  <el-row>
                                    <el-col :span="4">
                                      <span>{{ $t("proReport.sm") }}</span>
                                    </el-col>
                                    <el-col :span="4">
                                      <div>{{ $t("proReport.csjg") }}</div>
                                    </el-col>
                                    <el-col :span="4">
                                      <div>{{ $t("proReport.pp") }}</div>
                                    </el-col>
                                    <el-col :span="4" style="border: none">
                                      <div
                                        style="
                                          width: 100.2%;
                                          border-right: 1px solid #c0c4cc;
                                        "
                                      >
                                        {{ $t("proReport.clyj") }}
                                      </div>
                                    </el-col>
                                    <el-col :span="4" style="border: none">
                                      <div
                                        style="
                                          width: 100.2%;
                                          border-right: 1px solid #c0c4cc;
                                        "
                                      >
                                        {{ $t("proReport.sxsb") }}
                                      </div>
                                    </el-col>
                                    <el-col
                                      :span="4"
                                      style="border-right: 1px solid #c0c4cc"
                                    >
                                      <span>{{ $t("proReport.bz") }}</span>
                                    </el-col>
                                  </el-row>
                                </el-col>
                              </el-row>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </el-header>
                    <el-main class="mainBox" ref="mainBox2">
                      <el-row
                        style="border-top: 1px #ccc solid; margin-top: -1px"
                      >
                        <el-col
                          :span="24"
                          :style="pzStyle"
                          v-if="tbData.length > 0"
                        >
                          <el-row
                            class="content"
                            v-for="(item, index) of tbData"
                            :key="index"
                          >
                            <!-- 参考方法 -->
                            <el-col :span="24">
                              <div
                                v-if="item.labCheckStandard.length > 0"
                                v-for="(items, indexs) in item.labCheckStandard"
                                class="contentDiv"
                                :key="indexs"
                              >
                                <div
                                  v-for="(data, i) of items.labCheckScopeRange"
                                  v-if="items.labCheckScopeRange.length > 0"
                                  :key="i"
                                >
                                  <el-row>
                                    <el-col :span="4">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-input
                                            v-model="data.testData"
                                            :placeholder="$t('proReport.qsrsm')"
                                            @input="iptChange(data)"
                                            clearable
                                            v-show="!realOnly"
                                          ></el-input>
                                          <div
                                            class="tbLabel"
                                            v-if="data.testData != ''"
                                          >
                                            <el-popover
                                              placement="top-start"
                                              width="200"
                                              trigger="click"
                                              :content="data.testData"
                                            >
                                              <span slot="reference">{{
                                                data.testData
                                              }}</span>
                                            </el-popover>
                                          </div>
                                          <div
                                            class="tbLabel"
                                            v-if="
                                              data.testData == null ||
                                              data.testData == ''
                                            "
                                          >
                                            /
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                    <el-col :span="4">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-input
                                            v-model="data.testResult"
                                            :placeholder="
                                              $t('proReport.qsrcsjg')
                                            "
                                            @input="iptChange(data)"
                                            clearable
                                            v-show="!realOnly"
                                          ></el-input>
                                          <div
                                            class="tbLabel"
                                            v-if="data.testResult != ''"
                                          >
                                            <el-popover
                                              placement="top-start"
                                              width="200"
                                              trigger="click"
                                              :content="data.testResult"
                                            >
                                              <span slot="reference">{{
                                                data.testResult
                                              }}</span>
                                            </el-popover>
                                          </div>
                                          <div
                                            class="tbLabel"
                                            v-if="
                                              data.testResult == null ||
                                              data.testResult == ''
                                            "
                                          >
                                            /
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                    <el-col :span="4">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-input
                                            v-model="data.judgeVerdict"
                                            :placeholder="$t('proReport.qsrpp')"
                                            @input="iptChange(data)"
                                            maxlength="20"
                                            v-show="!realOnly"
                                            clearable
                                          ></el-input>
                                          <div
                                            class="tbLabel"
                                            v-if="data.judgeVerdict != ''"
                                          >
                                            <el-popover
                                              placement="top-start"
                                              width="200"
                                              trigger="click"
                                              :content="data.judgeVerdict"
                                            >
                                              <span slot="reference">{{
                                                data.judgeVerdict
                                              }}</span>
                                            </el-popover>
                                          </div>
                                          <div
                                            class="tbLabel"
                                            v-if="
                                              data.judgeVerdict == null ||
                                              data.judgeVerdict == ''
                                            "
                                          >
                                            /
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                    <el-col :span="4">
                                      <div
                                        class="contentList"
                                        style="width: 100.1%"
                                      >
                                        <div class="cdiv">
                                          <el-input
                                            v-model="data.handleSuggest"
                                            :placeholder="
                                              $t('proReport.qsrclyj')
                                            "
                                            @input="iptChange(data)"
                                            clearable
                                            v-show="!realOnly"
                                          ></el-input>
                                          <div
                                            class="tbLabel"
                                            v-if="data.handleSuggest != ''"
                                          >
                                            <el-popover
                                              placement="top-start"
                                              width="200"
                                              trigger="click"
                                              :content="data.handleSuggest"
                                            >
                                              <span slot="reference">{{
                                                data.handleSuggest
                                              }}</span>
                                            </el-popover>
                                          </div>
                                          <div
                                            class="tbLabel"
                                            v-if="
                                              data.handleSuggest == null ||
                                              data.handleSuggest == ''
                                            "
                                          >
                                            /
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                    <el-col :span="4">
                                      <div
                                        class="contentList"
                                        style="width: 100.1%"
                                      >
                                        <div class="cdiv">
                                          <el-input
                                            v-model="data.supportEquipment"
                                            :placeholder="
                                              $t('proReport.qsrsxsb')
                                            "
                                            @input="iptChange(data)"
                                            clearable
                                            v-show="!realOnly"
                                          ></el-input>
                                          <div
                                            class="tbLabel"
                                            v-if="data.supportEquipment != ''"
                                          >
                                            <el-popover
                                              placement="top-start"
                                              width="200"
                                              trigger="click"
                                              :content="data.supportEquipment"
                                            >
                                              <span slot="reference">{{
                                                data.supportEquipment
                                              }}</span>
                                            </el-popover>
                                          </div>
                                          <div
                                            class="tbLabel"
                                            v-if="
                                              data.supportEquipment == null ||
                                              data.supportEquipment == ''
                                            "
                                          >
                                            /
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                    <el-col :span="4">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-input
                                            v-model="data.itemDesc"
                                            :placeholder="$t('proReport.qsrbz')"
                                            @input="iptChange(data)"
                                            clearable
                                            v-show="!realOnly"
                                          ></el-input>
                                          <div
                                            class="tbLabel"
                                            v-if="data.itemDesc != ''"
                                          >
                                            <el-popover
                                              placement="top-start"
                                              width="200"
                                              trigger="click"
                                              :content="data.itemDesc"
                                            >
                                              <span slot="reference">{{
                                                data.itemDesc
                                              }}</span>
                                            </el-popover>
                                          </div>
                                          <div
                                            class="tbLabel"
                                            v-if="
                                              data.itemDesc == null ||
                                              data.itemDesc == ''
                                            "
                                          >
                                            /
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                  </el-row>
                                </div>
                                <div
                                  v-if="items.labCheckScopeRange.length == 0"
                                >
                                  <el-row>
                                    <el-col :span="24">
                                      <div class="contentList">
                                        <div class="cdiv">/</div>
                                      </div>
                                    </el-col>
                                  </el-row>
                                </div>
                              </div>
                              <div v-if="item.labCheckStandard.length === 0">
                                <el-row>
                                  <el-col
                                    :span="24"
                                    style="border-right: 1px solid #ccc"
                                  >
                                    <el-row class="labDiv">
                                      <el-col :span="24">/</el-col>
                                    </el-row>
                                  </el-col>
                                </el-row>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                        <el-col
                          :span="24"
                          v-else
                          style="
                            border-bottom: 1px solid #c0c4cc;
                            border-right: 1px solid #c0c4cc;
                            margin-top: -0.5px;
                          "
                        >
                          <div style="height: 50px; line-height: 50px">/</div>
                        </el-col>
                      </el-row>
                    </el-main>
                  </el-container>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
import { cofirm, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { Data_Width, label_Width, isDate } from "@/seal/gridOption";
import qlHead from "./head";
export default {
  components: { qlHead: qlHead },
  data() {
    return {
      tbData: [],
      tbDatas: [],
      tbStyle: [],
      ckStyle: [],
      checkPz: [],
      pzStyle: [],
      pzAdd: false,
      isCell: false,
      canSave: false,
      itemDialog: false,
      loading: false,
      realOnly: true,
      isCell: false,
      canSave: false,
      changeData: [],
      btnCtr: false,
    };
  },
  methods: {
    //检查种类下拉选择
    checkVariety(kind) {
      this.loading = true;
      this.tbData = [];
      this.pzStyle = [];
      // let data = [];
      // for (let index = 0; index < this.$refs.qlHead.kindData.length; index++) {
      //   for (let indexs = 0; indexs < this.$refs.qlHead.kind.length; indexs++) {
      //     if (
      //       this.$refs.qlHead.kind[indexs] ==
      //       this.$refs.qlHead.kindData[index].kindOid
      //     ) {
      //       let item = {
      //         kindOid: this.$refs.qlHead.kind[indexs],
      //         kindName: this.$refs.qlHead.kindData[index].kindName
      //       };
      //       data.push(item);
      //       break;
      //     }
      //   }
      // }
      this.btnCtr = false;
      this.tbStyle = [];
      this.ckStyle = [];
      let checkName = "";
      // if (data.length == 0) {
      //   this.loading = false;
      //   return;
      // }
      this.checkPz = [];
      this.tbData = [];
      this.$http.get("/api/labCheckKind2?kindOid=" + kind).then((res) => {
        this.checkPz.push(res.data.kindName);
      });
      this.$http.get("/api/getLabCheckItem?kindOid=" + kind).then((res) => {
        this.tbData = res.data;
        this.sortNum(this.tbData, "sn");
      });

      setTimeout(() => {
        let sum = 0;
        let pz = 0;
        let cg = 0;
        if (this.tbData.length > 0) {
          for (let i = 0; i < this.tbData.length; i++) {
            this.sortNum(this.tbData[i].labCheckStandard, "sn");
            this.$set(this.tbData[i], "readonly", true);
            let num = 0;
            if (this.tbData[i].labCheckStandard.length > 0) {
              cg += this.tbData[i].labCheckStandard.length - 1;
              for (let j = 0; j < this.tbData[i].labCheckStandard.length; j++) {
                this.sortNum(
                  this.tbData[i].labCheckStandard[j].labCheckScopeRange,
                  "sn"
                );
                pz += this.tbData[i].labCheckStandard[j].labCheckScopeRange
                  .length;
                num += this.tbData[i].labCheckStandard[j].labCheckScopeRange
                  .length;
                sum += this.tbData[i].labCheckStandard[j].labCheckScopeRange
                  .length;
                this.$set(this.tbData[i].labCheckStandard[j], "readonly", true);
                if (this.tbData[i].labCheckStandard != null) {
                  for (
                    let k = 0;
                    k <
                    this.tbData[i].labCheckStandard[j].labCheckScopeRange
                      .length;
                    k++
                  ) {
                    this.$set(
                      this.tbData[i].labCheckStandard[j].labCheckScopeRange[k],
                      "readonly",
                      true
                    );
                    this.$set(
                      this.tbData[i].labCheckStandard[j].labCheckScopeRange[k],
                      "cell",
                      false
                    );
                  }
                  if (num === 0) {
                    pz++;
                    sum++;
                    let item = {
                      height: 50 + "px",
                      "line-height": 50 + "px",
                    };
                    this.$set(
                      this.tbData[i].labCheckStandard[j],
                      "ckStyle",
                      item
                    );
                  } else {
                    let item = {
                      height: num * 50 + "px",
                      "line-height": num * 50 + "px",
                    };
                    this.$set(
                      this.tbData[i].labCheckStandard[j],
                      "ckStyle",
                      item
                    );
                  }
                  num = 0;
                }
              }
            } else {
              pz++;
            }
            let data1 = {};

            if (sum > 0) {
              data1 = {
                height: sum * 50 + "px",
                "line-height": sum * 50 + "px",
              };
            } else {
              data1 = {
                height: "50px",
                "line-height": "50px",
              };
            }
            this.$set(this.tbData[i], "tbStyle", data1);
            // this.tbStyle.push(data1);
            sum = 0;
          }
        }
        if (this.tbData.length > 0) {
          let pzHight = {
            height: pz * 50 + cg + this.tbData.length - 1 + "px",
            "line-height": pz * 50 + cg + this.tbData.length - 1 + "px",
          };
          this.pzStyle.push(pzHight);
        } else {
          let pzHight = {
            height: pz * 50 + this.tbData.length + "px",
            "line-height": pz * 50 + this.tbData.length + "px",
          };
          this.pzStyle.push(pzHight);
        }

        this.tbDatas = JSON.parse(JSON.stringify(this.tbData));
        this.btnCtr = true;
        this.loading = false;
      }, 2000);
    },
    // 修改触发事件，记录数据变化
    iptChange(value) {
      this.canSave = true;
      if (this.changeData.length == 0) {
        this.changeData.push(value);
      } else {
        for (let index = 0; index < this.changeData.length; index++) {
          if (this.changeData[index].scopeOid === value.scopeOid) {
            break;
          }
          if (
            index == this.changeData.length - 1 &&
            this.changeData[index].scopeOid != value.scopeOid
          ) {
            this.changeData.push(value);
          }
        }
      }
    },
    Editor() {
      //开启编辑
      this.realOnly = false;
      this.isCell = !this.isCell;
    },
    Update() {
      this.loading = true;
      this.changeData.forEach((data, index) => {
        for (var key in data) {
          if (data[key] == null) {
            data[key] = "";
          }
        }
        this.$http
          .put(
            "/api/labCheckScopeRange/v1.0/updateById?handleSuggest=" +
              data.handleSuggest +
              "&itemDesc=" +
              data.itemDesc +
              "&judgeVerdict=" +
              data.judgeVerdict +
              "&testResult=" +
              data.testResult +
              "&scopeOid=" +
              data.scopeOid +
              "&supportEquipment=" +
              data.supportEquipment +
              "&testData=" +
              data.testData +
              "&standOid=" +
              data.standOid
          )
          .then((res) => {
            if (res.data.code == 200) {
              this.isCell = false;
              this.realOnly = !this.realOnly;
            } else {
              error(this.$t("energy.xgsb"));
              this.loading = false;
              return;
            }
          })
          .catch((err) => {
            error(this.$t("energy.xgsb"));
            this.loading = false;
            return;
          });
      });
      // this.checkVariety(this.$refs.qlHead.kind);

      this.loading = false;
      this.changeData = [];
      success(this.$t("energy.xgcg"));
    },
    Cancel() {
      //取消编辑
      this.loading = true;
      this.isCell = false;
      this.realOnly = true;
      this.canSave = false;
      this.changeData = [];
      this.checkVariety(this.$refs.qlHead.kind);
    },
    isScroll() {
      let dom1 = this.$refs.mainBox1.$el;
      let dom2 = this.$refs.mainBox2.$el;
      dom1.scrollTop = dom2.scrollTop;
    },
    noScroll() {
      // let dom1 = document.getElementsByClassName("mainBox")[1];
      // let dom2 = document.getElementsByClassName("mainBox")[2];
      let dom2 = this.$refs.mainBox2.$el;
      let dom1 = this.$refs.mainBox1.$el;
      if (dom1.scrollTop == dom2.scrollTop) {
        return;
      } else {
        dom1.scrollTop = dom2.scrollTop;
      }
    },
    //===============================//
    //封装的排序函数
    sortNum(arr, key) {
      return arr.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
  },
  created() {},
  mounted() {
    let dom1 = this.$refs.mainBox2.$el;
    let dom2 = this.$refs.mainBox1.$el;
    dom1.addEventListener("scroll", this.isScroll, { touchmove: true });
    dom2.addEventListener("scroll", this.noScroll, { touchmove: true });
  },
};
</script>

<style lang="stylus">
#dyeFabric {
  text-align: center;

  .Quality {
    // width: 1200px;
    // overflow-x: scroll;
    border: 1px solid #C0C4CC;
    border-right: 1px solid #C0C4CC;
  }

  .tbBox1 {
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;

    .contentDiv {
      border-bottom: 1px solid #C0C4CC;

      .ffStyle {
        border-right: 1px solid #C0C4CC;
        // margin-left: -0.5px;
        // border-top: 1px solid #C0C4CC;
        // margin-top: -1px;
      }

      .contentList {
        border-right: 1px solid #C0C4CC;
        border-top: 1px solid #C0C4CC;
        margin-top: -1px;

        .cdiv {
          height: 49px;
          line-height: 49px;
          text-align: center;
          // margin-left: -0.5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cdiv:last-child {
          border-bottom: none;
          height: 50px;
          line-height: 50px;
        }
      }
    }

    .contentDiv:last-child {
      border-bottom: none;
    }

    .rowBox {
      width: 150%;
      float: none;
      min-width: 900px;
      white-space: nowrap;
    }

    .el-input {
      width: 90%;
    }

    .el-input--mini .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
  }

  .tbBox {
    .contentDiv {
      border-bottom: 1px solid #C0C4CC;
      border-right: 1px solid #26a7e0;

      .ffStyle {
        border-right: 1px solid #C0C4CC;
        // margin-left: -0.5px;
        // border-top: 1px solid #C0C4CC;
        // margin-top: -1px;
      }

      .contentList {
        border-right: 1px solid #C0C4CC;
        border-top: 1px solid #C0C4CC;
        margin-top: -1px;

        .cdiv {
          height: 49px;
          line-height: 49px;
          text-align: center;
          // margin-left: -0.5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cdiv:last-child {
          border-bottom: none;
          height: 50px;
          line-height: 50px;
        }
      }

      .contentList:last-child {
      }
    }

    .contentDiv:last-child {
      border-bottom: none;
    }

    .el-input {
      width: 90%;
    }
  }

  .content {
    border-bottom: 1px solid #C0C4CC;
  }

  .headBox {
    padding: 0 !important;
    height: 100% !important;
    width: 100%;
  }

  .labDiv {
    height: 50px;
    line-height: 50px;
  }

  .rowHead {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    background: #f4f4f4;
    border: 1px solid #C0C4CC;
    border-right: none;

    .el-col {
      height: 50px;
      line-height: 50px;
      border-right: 1px solid #C0C4CC;
    }

    .el-col:last-child {
      height: 50px;
      line-height: 50px;
      border-right: none;
    }
  }

  .mainBox {
    font-size: 15px;
    height: 600px;
    padding: 0 !important;
    border-bottom: 1px solid #C0C4CC;
    // border-top: 1px solid #C0C4CC;
    // border-left: 1px solid #C0C4CC;
    // border-right: 1px solid #C0C4CC;
    // padding: 0 1px;
    -ms-overflow-style: none;
    /* 火狐下隐藏滚动条 */
    overflow: none;
    scrollbar-width: none;

    // overflow-y: hidden;
    .iptBox {
      height: 44px;
      line-height: 44px;
      margin: 3px 0;
      text-align: center;
    }

    .mainRow {
      border-top: 1px solid black;
    }

    .mainRow:frist-child {
      border-top: none;
    }
  }

  .avue-form .el-input--mini input {
    width: 100% !important;
  }

  .mainBox::-webkit-scrollbar {
    display: none;
  }

  .pzStyle {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    border: 1px solid #C0C4CC;
    border-top: none;
    border-bottom: 1px solid #C0C4CC;
    text-overflow: ellipsis;
    // white-space: nowrap;
    overflow: hidden;
  }

  .pzCont {
    height: 100%;
    line-height: 50%;
  }

  .nullStyle {
    height: 50px;
    line-height: 50px;
    border-right: 1px solid #C0C4CC;
    // margin-left: -0.5px;
  }

  .xmStyle {
    height: 50px;
    // line-height: 50px;
    border-right: 1px solid #C0C4CC;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // margin-left: -0.5px;
  }

  .tbLabel {
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-indent: 10%;
  }

  .readonlys {
    border: none;
  }

  .btn {
    height: 50px;
    line-height: 50px;
    border-right: 1px solid #C0C4CC;
  }

  .btns {
    height: 50px;
    line-height: 50px;
    border-right: 1px solid #C0C4CC;
    border-bottom: 1px solid #C0C4CC;
  }

  .btns:last-child {
    border-bottom: none;
  }

  .tbBtn {
    margin: 10px 10px 10px 0px;
    text-align: left;
  }

  .content {
    width: 100%;
    font-size: 14px;
    letter-spacing: 1px;
    height: auto;

    // display: flex;
    // align-items: center;
    .el-col:last-child {
      border: none;
    }

    .supEqut {
      min-height: 30px;
      line-height: 30px;
    }
  }

  .item {
    padding: 4px;
    font-size: 14px;
  }

  // .el-dialog__header {
  // height: 0;
  // padding: 0;
  // }
  .el-dialog__body {
    padding: 10px;
  }

  .avue-form__menu--center {
    margin-left: -25px !important;
  }

  .nullData {
    margin-top: -1px;
    height: 51px;
    line-height: 51px;

    .el-col-6, .el-col-8 {
      border-right: 1px solid #C0C4CC;
    }
  }
}
</style>