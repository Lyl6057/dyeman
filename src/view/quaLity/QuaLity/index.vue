<template>
  <div id="Quality">
    <!-- 下拉选择 -->
    <div class="queryForm">
      <el-tabs type="border-card">
        <el-tab-pane label="品质项目管理">
          <el-row>
            <ql-Head ref="qlHead" @checkVariety="checkVariety"></ql-Head>
          </el-row>
          <!-- 按钮 -->
          <el-row class="btnList">
            <el-col :span="24" v-if="tbData.length > 0">
              <el-button type="primary" v-if="!isCell" @click="Editor">{{
                $t("energy.bj")
              }}</el-button>
              <el-button
                type="success"
                v-else
                :disabled="!canSave"
                @click="Update"
                >{{ $t("energy.bc") }}</el-button
              >
              <el-button type="warning" :disabled="!isCell" @click="Cancel">{{
                $t("energy.qx")
              }}</el-button>
            </el-col>
          </el-row>
          <div
            class="Quality"
            v-loading="loading"
            :element-loading-text="$t('public.loading')"
          >
            <!-- 质量检查项目 -->
            <div class="tbBox">
              <el-container>
                <el-header class="headBox">
                  <el-row class="rowHead">
                    <el-col :span="2">
                      <div>{{ $t("energy.jczl") }}</div>
                    </el-col>
                    <el-col :span="22">
                      <el-row>
                        <el-col :span="1">
                          <span>{{ $t("energy.xh") }}</span>
                        </el-col>
                        <el-col :span="8">
                          <span>{{ $t("energy.jcxm") }}</span>
                        </el-col>
                        <el-col :span="15" class="inbox">
                          <el-row>
                            <el-col :span="12" style="border: none">
                              <div
                                style="
                                  width: 99.7%;
                                  border-right: 1px solid #c0c4cc;
                                "
                              >
                                {{ $t("energy.ckff") }}
                              </div>
                            </el-col>
                            <el-col :span="6">
                              <span>{{ $t("energy.gg") }}</span>
                            </el-col>
                            <el-col :span="6">
                              <span>{{ $t("energy.jsbz") }}</span>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-header>
                <el-main class="mainBox">
                  <el-row style="font-size: 15px">
                    <el-col
                      :span="2"
                      @mouseenter.native="mouseEnter(checkPz, 'pz')"
                      @mouseleave.native="mouseLeave(checkPz, 'pz')"
                      style="position: inherit"
                    >
                      <div
                        class="pzStyle"
                        v-if="checkPz != '' && tbData.length > 0"
                        :style="pzStyle"
                      >
                        <el-col>
                          <el-popover
                            placement="top-start"
                            width="100"
                            trigger="click"
                            :content="checkPz"
                          >
                            <span slot="reference">{{ checkPz }}</span>
                          </el-popover>
                        </el-col>
                        <el-col
                          class="handleDl1"
                          v-if="pzAdd"
                          :style="{
                            top:
                              tbData.length > 1
                                ? Number(pzStyle.height.split('px')[0]) / 2 -
                                  35 +
                                  'px'
                                : Number(pzStyle.height.split('px')[0]) / 2 -
                                  15 +
                                  'px',
                          }"
                        >
                          <el-row>
                            <el-col
                              :span="24"
                              @click.native="addBtnClick(tbData, 'pz')"
                            >
                              <i class="el-icon-plus"></i>
                            </el-col>
                          </el-row>
                        </el-col>
                      </div>
                    </el-col>
                    <el-col :span="22">
                      <el-row
                        class="content"
                        v-for="(item, index) of tbData"
                        :key="index"
                      >
                        <el-col
                          :span="1"
                          :style="tbStyle[index]"
                          style="
                            border-right: 1px solid #c0c4cc;
                            line-height: 40px;
                            height: 40;
                          "
                        >
                          <span>{{ item.sn }}</span>
                        </el-col>
                        <!-- 检测项目 -->
                        <el-col
                          :span="8"
                          :style="tbStyle[index]"
                          class="xmStyle"
                          @mouseenter.native="mouseEnter(index, 'project')"
                          @mouseleave.native="mouseLeave(index, 'project')"
                        >
                          <div v-if="!isCell">
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
                              <div class="handleDl" v-if="!item.readonly">
                                <div
                                  style="height: 20px; line-height: 20px"
                                  @click="addBtnClick(item, 'project')"
                                >
                                  <i class="el-icon-plus"></i>
                                </div>
                                <div
                                  style="height: 20px; line-height: 20px"
                                  @click="delBtnClick(item, 'project')"
                                >
                                  <i class="el-icon-close"></i>
                                </div>
                              </div>
                            </el-row>
                          </div>
                          <el-input
                            v-else
                            v-model="item.itemName"
                            maxlength="20"
                            class="iptBox"
                            :placeholder="$t('energy.qsr')"
                            @input="iptChange(item, 'project')"
                          ></el-input>
                        </el-col>
                        <!-- 参考方法 -->
                        <el-col :span="15">
                          <el-row>
                            <el-col :span="24">
                              <div
                                v-show="item.qcItemStandardList.length > 0"
                                v-for="(
                                  items, indexs
                                ) in item.qcItemStandardList"
                                class="contentDiv"
                                :key="indexs"
                              >
                                <el-row
                                  v-if="item.qcItemStandardList.length > 0"
                                >
                                  <el-col
                                    :span="12"
                                    :style="items.ckStyle"
                                    style="position: inherit"
                                    class="ffStyle"
                                    @mouseenter.native="
                                      mouseEnter(items, 'standard')
                                    "
                                    @mouseleave.native="
                                      mouseLeave(items, 'standard')
                                    "
                                  >
                                    <div class="tbLabel" v-if="!isCell">
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
                                    <div
                                      class="handleDl"
                                      v-if="!items.readonly"
                                    >
                                      <div
                                        @click="addBtnClick(items, 'standard')"
                                      >
                                        <i class="el-icon-plus"></i>
                                      </div>
                                      <div
                                        @click="delBtnClick(items, 'standard')"
                                      >
                                        <i class="el-icon-close"></i>
                                      </div>
                                    </div>
                                    <el-input
                                      v-if="isCell"
                                      maxlength="15"
                                      v-model="items.standName"
                                      class="iptBox"
                                      :placeholder="$t('energy.qsr')"
                                      @input="iptChange(items, 'standard')"
                                    ></el-input>
                                  </el-col>
                                  <el-col :span="12">
                                    <el-row>
                                      <el-col :span="12">
                                        <div
                                          v-for="(
                                            data, i
                                          ) of items.qcScopeRangeList"
                                          class="contentList"
                                          @mouseenter="mouseEnter(data, 'size')"
                                          @mouseleave="mouseLeave(data, 'size')"
                                          :key="i"
                                        >
                                          <div
                                            style="width: 95%; margin: 0 auto"
                                            class="cdiv"
                                            v-if="!isCell"
                                          >
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
                                          <el-input
                                            v-else
                                            v-model="data.scopeName"
                                            maxlength="15"
                                            class="iptBox"
                                            :placeholder="$t('energy.qsr')"
                                            @input="iptChange(data, 'size')"
                                          ></el-input>
                                        </div>
                                      </el-col>
                                      <el-col :span="12">
                                        <div
                                          v-for="(
                                            data, num
                                          ) of items.qcScopeRangeList"
                                          class="contentList"
                                          @mouseenter="mouseEnter(data, 'size')"
                                          @mouseleave="mouseLeave(data, 'size')"
                                          style="position: inherit"
                                          :key="num"
                                        >
                                          <el-row>
                                            <el-col
                                              :span="23"
                                              style="margin: 0 auto"
                                              class="cdiv"
                                              v-if="!isCell"
                                            >
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
                                            </el-col>
                                            <el-input
                                              v-else
                                              maxlength="20"
                                              class="iptBox"
                                              v-model="data.rangeAccept"
                                              :placeholder="$t('energy.qsr')"
                                              @input="iptChange(data, 'size')"
                                            ></el-input>
                                            <el-col
                                              class="handleDl"
                                              style="width: 15%"
                                              v-if="data.cell"
                                            >
                                              <div
                                                @click="
                                                  delBtnClick(data, 'size')
                                                "
                                              >
                                                <i class="el-icon-close"></i>
                                              </div>
                                            </el-col>
                                          </el-row>
                                        </div>
                                      </el-col>
                                    </el-row>
                                  </el-col>

                                  <el-col
                                    :span="12"
                                    v-if="items.qcScopeRangeList.length === 0"
                                    class="nullStyle"
                                    style="border-right: 1px solid #c0c4cc"
                                    >/</el-col
                                  >
                                </el-row>
                              </div>
                              <div v-if="item.qcItemStandardList.length === 0">
                                <el-row>
                                  <el-col :span="12" class="nullStyle">
                                    <div class="cdiv">/</div>
                                  </el-col>
                                  <el-col :span="6">
                                    <div class="nullStyle">
                                      <div class="cdiv">/</div>
                                    </div>
                                  </el-col>
                                  <el-col :span="6">
                                    <div class="nullStyle">
                                      <div class="cdiv">/</div>
                                    </div>
                                  </el-col>
                                </el-row>
                              </div>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row v-if="tbData.length == 0">
                    <div>
                      <el-button
                        type="primary"
                        icon="el-icon-plus"
                        style="float: left; margin: 10px 0"
                        @click.native="addBtnClick(tbData, 'pz')"
                        >{{ $t("energy.xz") }}</el-button
                      >
                    </div>
                    <div style="margin-top: 10%">
                      <avue-empty :szie="10"></avue-empty>
                    </div>
                  </el-row>
                </el-main>
                <!-- 新增弹窗 -->
                <el-row>
                  <el-dialog
                    :visible.sync="itemDialog"
                    width="80%"
                    :close-on-click-modal="false"
                    append-to-body
                  >
                    <el-row v-if="itemDialog">
                      <el-tabs
                        v-model="activeName"
                        @tab-click="handleClick"
                        type="border-card"
                        v-loading="dlgLoading"
                      >
                        <el-tab-pane
                          :label="$t('energy.jcxm')"
                          name="pz"
                          v-if="activeName == 'pz'"
                        >
                          <el-row class="btnList">
                            <el-button
                              type="success"
                              @click="projectSub(project)"
                              >{{ this.$t("public.save") }}</el-button
                            >
                            <el-button
                              type="warning"
                              @click="itemDialog = false"
                              >{{ this.$t("public.close") }}</el-button
                            >
                          </el-row>
                          <el-row class="formBox">
                            <avue-form
                              ref="project"
                              v-model="project"
                              :option="projectOp"
                              @submit="projectSub"
                            />
                          </el-row>
                        </el-tab-pane>
                        <el-tab-pane
                          :label="$t('energy.ckff')"
                          name="project"
                          v-if="activeName == 'project'"
                        >
                          <el-row class="btnList">
                            <el-button
                              type="success"
                              @click="standardSub(standard)"
                              >{{ this.$t("public.save") }}</el-button
                            >
                            <el-button
                              type="warning"
                              @click="itemDialog = false"
                              >{{ this.$t("public.close") }}</el-button
                            >
                          </el-row>
                          <el-row class="formBox">
                            <avue-form
                              ref="standard"
                              v-model="standard"
                              :option="standardOp"
                              @submit="standardSub"
                            />
                          </el-row>
                        </el-tab-pane>
                        <el-tab-pane
                          :label="$t('energy.ggjebz')"
                          name="standard"
                          v-if="activeName == 'standard'"
                        >
                          <el-row class="btnList">
                            <el-button type="success" @click="sizeSub(size)">{{
                              this.$t("public.save")
                            }}</el-button>
                            <el-button
                              type="warning"
                              @click="itemDialog = false"
                              >{{ this.$t("public.close") }}</el-button
                            >
                          </el-row>
                          <el-row class="formBox">
                            <avue-form
                              ref="size"
                              v-model="size"
                              :option="sizeOp"
                              @submit="sizeSub"
                            />
                          </el-row>
                        </el-tab-pane>
                      </el-tabs>
                    </el-row>
                  </el-dialog>
                </el-row>
              </el-container>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { cofirm2, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { Data_Width, label_Width, isDate } from "@/seal/gridOption";
import qlHead from "./head";
export default {
  components: { qlHead: qlHead },
  data() {
    return {
      tbData: [],
      tbStyle: [],
      ckStyle: [],
      checkPz: "",
      pzStyle: {},
      pzAdd: false,
      isCell: false,
      canSave: false,
      itemDialog: false,
      activeName: "project",
      project: {},
      projectOp: {
        // emptyBtn: false,
        // submitBtn: false,
        labelWidth: 130,
        emptyText: this.$t("energy.qk"),
        submitText: this.$t("energy.bc"),
        column: [
          {
            label: this.$t("energy.jczl"),
            span: 8,
            prop: "kindOid",
            display: false,
          },
          {
            label: this.$t("energy.jcxmc"),
            prop: "itemName",
            span: 8,
            rules: [
              {
                required: true,
                message: this.$t("energy.qsrjcxmc"),
                trigger: "blur",
              },
            ],
            maxlength: 15,
          },
          {
            label: this.$t("energy.jcxxh"),
            span: 8,
            prop: "sn",
            display: false,
          },
          {
            label: this.$t("energy.jcxbh"),
            span: 8,
            prop: "standCod",
            display: false,
          },
          {
            label: this.$t("energy.sxsb"),
            prop: "supportEquipment",
            span: 8,
            maxlength: 20,
          },
          {
            label: this.$t("energy.bz"),
            span: 8,
            prop: "itemDesc",
            maxlength: 20,
          },
        ],
      },
      standard: {},
      standardOp: {
        // emptyBtn: false,
        // submitBtn: false,
        emptyText: this.$t("energy.qk"),
        labelWidth: 150,
        submitText: this.$t("energy.bc"),
        column: [
          {
            label: this.$t("energy.jcxid"),
            prop: "itemOid",
            display: false,
          },
          {
            label: this.$t("energy.xh"),
            prop: "sn",
            display: false,
          },
          {
            label: this.$t("energy.jcxbh"),
            prop: "standCod",
            display: false,
          },
          {
            label: this.$t("energy.ckbz"),
            span: 12,
            prop: "standName",
            rules: [
              {
                required: true,
                message: this.$t("energy.qsrckbz"),
                trigger: "blur",
              },
            ],
            maxlength: 15,
          },
          {
            label: this.$t("energy.ckffms"),
            span: 12,
            prop: "standDesc",
            maxlength: 20,
          },
        ],
      },
      sizeOp: {
        // emptyBtn: false,
        // submitBtn: false,
        emptyText: this.$t("energy.qk"),
        labelWidth: 148,
        submitText: this.$t("energy.bc"),
        column: [
          // {
          //   label: "标准ID",
          //   prop: "scopeOid",
          //   span: 6,
          //   display: false
          // },
          {
            label: "标准ID2",

            prop: "standOid",
            display: false,
          },
          {
            label: "序号",
            prop: "sn",

            display: false,
          },
          {
            label: this.$t("energy.ggmc"),
            span: 12,
            prop: "scopeName",
            rules: [
              {
                required: true,
                message: this.$t("energy.qsrggmc"),
                trigger: "blur",
              },
            ],
            maxlength: 15,
          },
          {
            label: this.$t("energy.kjsfw"),
            span: 12,
            prop: "rangeAccept",
            rules: [
              {
                required: true,
                message: this.$t("energy.qsrkjsfw"),
                trigger: "blur",
              },
            ],
            maxlength: 20,
          },
        ],
      },
      size: {},
      pjChange: [],
      sdChange: [],
      sizeChange: [],
      loading: false,
      dlgLoading: false,
    };
  },
  methods: {
    //检查种类下拉选择
    checkVariety(value, label) {
      this.loading = true;
      this.tbStyle = [];
      this.ckStyle = [];
      this.tbData = [];
      this.kindoid = value;
      let checkName = "";
      if (this.$refs.qlHead.varietyData.length != 0) {
        this.$refs.qlHead.varietyData.forEach((item, index) => {
          if (item.kindOid == value) {
            this.checkPz = item.kindName;
          }
        });
      }
      if (value == "") {
        setTimeout(() => {
          this.loading = false;
        }, 200);
        return;
      }
      this.$http.get("/api/checkItemInfo?kindOid=" + value).then((res) => {
        this.tbData = res.data;
        this.sortNum(this.tbData, "sn");
        let sum = 0;
        let pz = 0;
        let cg = 0;
        let pzHeight = 0;
        if (this.tbData.length > 0) {
          for (let i = 0; i < this.tbData.length; i++) {
            this.sortNum(this.tbData[i].qcItemStandardList, "sn");
            this.$set(this.tbData[i], "readonly", true);
            let num = 0;

            if (this.tbData[i].qcItemStandardList.length > 0) {
              cg = this.tbData[i].qcItemStandardList.length - 1;
              for (
                let j = 0;
                j < this.tbData[i].qcItemStandardList.length;
                j++
              ) {
                this.sortNum(
                  this.tbData[i].qcItemStandardList[j].qcScopeRangeList,
                  "sn"
                );
                pz +=
                  this.tbData[i].qcItemStandardList[j].qcScopeRangeList.length;
                num +=
                  this.tbData[i].qcItemStandardList[j].qcScopeRangeList.length;
                sum +=
                  this.tbData[i].qcItemStandardList[j].qcScopeRangeList.length;
                this.$set(
                  this.tbData[i].qcItemStandardList[j],
                  "readonly",
                  true
                );
                if (this.tbData[i].qcItemStandardList != null) {
                  for (
                    let k = 0;
                    k <
                    this.tbData[i].qcItemStandardList[j].qcScopeRangeList
                      .length;
                    k++
                  ) {
                    this.$set(
                      this.tbData[i].qcItemStandardList[j].qcScopeRangeList[k],
                      "readonly",
                      true
                    );
                    this.$set(
                      this.tbData[i].qcItemStandardList[j].qcScopeRangeList[k],
                      "cell",
                      false
                    );
                  }
                  if (num === 0) {
                    pz++;
                    sum++;
                    let item = {
                      height: 40 + "px",
                      "line-height": 40 + "px",
                    };
                    this.$set(
                      this.tbData[i].qcItemStandardList[j],
                      "ckStyle",
                      item
                    );
                  } else {
                    let item = {
                      height: num * 40 + "px",
                      "line-height": num * 40 + "px",
                    };
                    this.$set(
                      this.tbData[i].qcItemStandardList[j],
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
            let data = {};

            if (sum > 1) {
              data = {
                height: sum * 40 + cg + "px",
                "line-height": sum * 40 + cg + "px",
              };
              pzHeight += sum * 40 + cg;
            } else {
              data = {
                height: "40px",
                "line-height": "40px",
              };
              pzHeight += 40;
            }
            this.tbStyle.push(data);
            sum = 0;
          }
        }

        this.pzStyle = {
          height: pzHeight + this.tbData.length - 1 + "px",
          "line-height": pzHeight + this.tbData.length - 1 + "px",
        };

        setTimeout(() => {
          this.loading = false;
        }, 200);
        // this.pzStyles = {
        //   margin: pz * 40 + "px auto"
        // };
      });
    },
    mouseEnter(index, value) {
      if (this.isCell) {
        return;
      }
      if (value === "project") {
        this.tbData[index].readonly = !this.tbData[index].readonly;
      }
      if (value === "standard") {
        index.readonly = !index.readonly;
      }
      if (value === "pz") {
        this.pzAdd = !this.pzAdd;
      }
      if (value === "size") {
        index.cell = !index.cell;
      }
    },
    mouseLeave(index, value) {
      if (this.isCell) {
        return;
      }
      if (value === "project") {
        this.tbData[index].readonly = !this.tbData[index].readonly;
      }
      if (value === "standard") {
        index.readonly = !index.readonly;
      }
      if (value === "pz") {
        this.pzAdd = !this.pzAdd;
      }
      if (value === "size") {
        index.cell = !index.cell;
      }
    },
    //修改触发事件，记录数据变化
    iptChange(value, label) {
      this.canSave = true;
      if (label == "project") {
        if (this.pjChange.length == 0) {
          this.pjChange.push(value);
        } else {
          for (let index = 0; index < this.pjChange.length; index++) {
            if (this.pjChange[index].itemOid === value.itemOid) {
              break;
            }
            if (
              index == this.pjChange.length - 1 &&
              this.pjChange[index].itemOid != value.itemOid
            ) {
              this.pjChange.push(value);
            }
          }
        }
      } else if (label == "standard") {
        if (this.sdChange.length == 0) {
          this.sdChange.push(value);
        } else {
          for (let index = 0; index < this.sdChange.length; index++) {
            if (this.sdChange[index].standOid === value.standOid) {
              break;
            }
            if (
              index == this.sdChange.length - 1 &&
              this.sdChange[index].standOid != value.standOid
            ) {
              this.sdChange.push(value);
            }
          }
        }
      } else if (label == "size") {
        if (this.sizeChange.length == 0) {
          this.sizeChange.push(value);
        } else {
          for (let index = 0; index < this.sizeChange.length; index++) {
            if (this.sizeChange[index].scopeOid === value.scopeOid) {
              break;
            }
            if (
              index == this.sizeChange.length - 1 &&
              this.sizeChange[index].scopeOid != value.scopeOid
            ) {
              this.sizeChange.push(value);
            }
          }
        }
      }
    },
    Editor() {
      //开启编辑
      this.isCell = !this.isCell;
    },
    Update() {
      //编辑保存
      this.loading = true;
      this.isCell = !this.isCell;
      let isSave = true;
      //更新项目
      this.pjChange.forEach((item, index) => {
        this.$http
          .post(
            "/api/qcCheckItem?kindOid=" +
              item.kindOid +
              "&itemOid=" +
              item.itemOid +
              "&supportEquipment=" +
              item.supportEquipment +
              "&sn=" +
              item.sn +
              "&itemName=" +
              item.itemName +
              "&itemDesc=" +
              item.itemDesc +
              "&itemCod=" +
              item.itemCod
          )
          .then((res) => {
            if (res.data.code == 200) {
              this.pjChange = [];
              // success(this.$t("energy.xgcg"));
            } else {
              isSave = false;
              error(this.$t("energy.xgsb") + res);
            }
          })
          .catch((err) => {
            isSave = false;
            error(this.$t("energy.xgsbs"));
          });
      });
      //更新参考方法标准
      this.sdChange.forEach((item, index) => {
        this.$http
          .put(
            "/api/qcItemStandard/v1.0/updateById?itemOid=" +
              item.itemOid +
              "&standOid=" +
              item.standOid +
              "&standName=" +
              item.standName +
              "&sn=" +
              item.sn +
              "&standDesc=" +
              item.standDesc +
              "&itemDstandCodesc=" +
              item.standCod
          )
          .then((res) => {
            if (res.data.code == 200) {
              this.sdChange = [];
              // success(this.$t("energy.xgcg"));
            } else {
              error(this.$t("energy.xgsb") + res);
              isSave = false;
            }
          })
          .catch((err) => {
            error(this.$t("energy.xgsbs"));
            isSave = false;
          });
      });
      //更新规格/接受标准
      this.sizeChange.forEach((item, index) => {
        this.$http
          .put(
            "/api/qcScopeRange/v1.0/updateById?standOid=" +
              item.standOid +
              "&scopeOid=" +
              item.scopeOid +
              "&scopeName=" +
              item.scopeName +
              "&sn=" +
              item.sn +
              "&rangeAccept=" +
              item.rangeAccept
          )
          .then((res) => {
            if (res.data.code == 200) {
              this.sizeChange = [];
              // success(this.$t("energy.xgcg"));
            } else {
              error(this.$t("energy.xgsb") + res);
              isSave = false;
            }
          })
          .catch((err) => {
            error(this.$t("energy.xgsbs"));
            isSave = false;
          });
      });
      setTimeout(() => {
        if (isSave == true) {
          success(this.$t("energy.xgcg"));
        } else {
          error(this.$t("energy.xgsb"));
          this.checkVariety(this.kindoid);
        }
        this.loading = false;
      }, 2000);
    },
    Cancel() {
      //取消编辑
      this.isCell = false;
      this.canSave = false;
      if (this.$refs.qlHead.variety != "") {
        this.checkVariety(this.$refs.qlHead.variety);
      }
    },
    //新增按钮
    addBtnClick(value, label) {
      if (this.$refs.qlHead.variety == "" || this.$refs.qlHead.variety == "") {
        error("请先选择检查种类!");
        return;
      }
      this.activeName = label;
      this.itemDialog = true;
      if (label == "pz") {
        if (value.length == 0) {
          this.project.sn = 1;
        } else {
          this.project.sn = value[value.length - 1].sn + 1;
        }
        this.project.kindOid = this.kindoid;
      }
      if (label == "project") {
        if (value.length == 0) {
          this.standard.sn = 1;
        } else {
          this.standard.sn = value.qcItemStandardList.length + 1;
        }
        this.standard.itemOid = value.itemOid;
      }
      if (label == "standard") {
        if (value.qcScopeRangeList.length == 0) {
          this.size.sn = 1;
        } else {
          this.size.sn =
            value.qcScopeRangeList[value.qcScopeRangeList.length - 1].sn + 1;
        }
        this.size.standOid = value.standOid;
      }
    },
    //删除按钮
    delBtnClick(value, label) {
      cofirm2(this.$t("energy.sfjx"), this, {})
        .then(() => {
          if (label == "project") {
            this.$http
              .delete("/api/qcCheckItem?itemOid=" + value.itemOid)
              .then((res) => {
                if (res.data.code == 200) {
                  this.checkVariety(this.kindoid);
                  success(this.$t("energy.sccg"));
                } else {
                  error(this.$t("energy.scsb") + res.data);
                }
              })
              .catch((err) => {
                // console.log(err);
                error(this.$t("energy.scsbs"));
              });
          }
          if (label == "standard") {
            this.$http
              .delete(
                "/api/qcItemStandard/v1.0/removeById?id=" + value.standOid
              )
              .then((res) => {
                if (res.data.code == 200) {
                  this.checkVariety(this.kindoid);
                  success(this.$t("energy.sccg"));
                } else {
                  error(this.$t("energy.scsb") + res.data);
                }
              })
              .catch((err) => {
                // console.log(err);
                error(this.$t("energy.scsbs"));
              });
          }
          if (label == "size") {
            this.$http
              .delete("/api/qcScopeRange/v1.0/removeById?id=" + value.scopeOid)
              .then((res) => {
                if (res.data.code == 200) {
                  this.checkVariety(this.kindoid);
                  success(this.$t("energy.sccg"));
                } else {
                  error(this.$t("energy.scsb") + res.data);
                }
              })
              .catch((err) => {
                // console.log(err);
                error(this.$t("energy.scsbs"));
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("energy.yqxsc"),
          });
        });
    },
    //切换选项卡
    handleClick() {},
    //新增参考方法标准
    standardSub(form, done) {
      if (form.itemName === "") {
        error("参考标准不能为空!");
        return;
      }
      this.dlgLoading = true;
      this.$http
        .post(
          "/api/qcItemStandard/v1.0/save?itemOid=" +
            form.itemOid +
            "&sn=" +
            form.sn +
            "&standCod=" +
            form.standCod +
            "&standDesc=" +
            form.standDesc +
            "&standName=" +
            form.standName
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.checkVariety(this.kindoid);
            this.standard.standName = "";
            this.standard.standDesc = "";
            this.standard.standCod = "";
            setTimeout(() => {
              this.dlgLoading = false;
              success(this.$t("energy.xzcg"));
              this.itemDialog = false;
            }, 200);
          } else {
            error(this.$t("energy.xzsb") + res.data);
            this.itemDialog = false;
          }
        })
        .catch((err) => {
          error(this.$t("energy.xzsbs") + err);
          this.itemDialog = false;
        });
    },
    sizeSub(form, done) {
      if (form.scopeName === "") {
        error("规格名称不能为空!");
        return;
      }
      if (form.rangeAccept === "") {
        error("可接受標準不能为空!");
        return;
      }
      this.dlgLoading = true;
      this.$http
        .post(
          "/api/qcScopeRange/v1.0/save?rangeAccept=" +
            form.rangeAccept +
            "&scopeName=" +
            form.scopeName +
            "&standOid=" +
            form.standOid +
            "&sn=" +
            form.sn
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.checkVariety(this.kindoid);
            this.size.scopeName = "";
            this.size.rangeAccept = "";
            setTimeout(() => {
              this.dlgLoading = false;
              success(this.$t("energy.xzcg"));
              this.itemDialog = false;
            }, 200);
          } else {
            error(this.$t("energy.xzsb") + res.data);
            this.itemDialog = false;
          }
        })
        .catch((err) => {
          error(this.$t("energy.xzsbs") + err);
          this.itemDialog = false;
        });
    },
    projectSub(form, done) {
      if (form.itemName === "") {
        error("检查项名称不能为空!");
        return;
      }
      this.dlgLoading = true;
      this.$http
        .put(
          "/api/qcCheckItem?itemOid=" +
            form.itemOid +
            "&itemDesc=" +
            form.itemDesc +
            "&itemName=" +
            form.itemName +
            "&kindOid=" +
            form.kindOid +
            "&sn=" +
            form.sn +
            "&standOid=" +
            form.standOid +
            "&supportEquipment=" +
            form.supportEquipment
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.checkVariety(this.kindoid);
            this.project.supportEquipment = "";
            this.project.itemName = "";
            this.project.standCod = "";
            this.project.itemDesc = "";
            setTimeout(() => {
              this.dlgLoading = false;
              success(this.$t("energy.xzcg"));
              this.itemDialog = false;
            }, 200);
          } else {
            error(this.$t("energy.xzsb") + res.data);
            this.itemDialog = false;
          }
        })
        .catch((err) => {
          error(this.$t("energy.xzsbs") + err);
          this.itemDialog = false;
        });
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
};
</script>

<style lang="stylus">
#Quality {
  text-align: center;

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    z-index: 99;
  }

  .handleDl {
    position: absolute;
    width: 10%;
    top: 0;
    right: 0;
    z-index: 2;
    font-size: 16px;
    color: #409EFF;
    cursor: pointer;

    div {
      height: 20px;
      line-height: 20px;
    }

    div:first-child {
      border-bottom: 1px solid #fff;
    }

    i {
      padding: 2px 0;
      width: 100%;
      background: rgba(38, 167, 224, 0.3);
    }
  }

  .handleDl1 {
    position: absolute;
    width: 25%;
    // top: 45%;
    right: 5%;
    z-index: 2;
    font-size: 16px;
    color: #409EFF;
    cursor: pointer;

    div {
      height: 30px;
      line-height: 30px;
    }

    i {
      padding: 3px 0;
      width: 100%;
      background: rgba(38, 167, 224, 0.3);
    }
  }

  .content {
    border-bottom: 1px solid #C0C4CC;
  }

  .headBox {
    padding: 0 !important;
    height: 100% !important;
  }

  .mainBox {
    height: calc(100vh - 240px);
    padding: 0 !important;
    border-bottom: 1px solid #C0C4CC;
    // border-left: 1px solid #C0C4CC;
    // border-right: 1px solid #C0C4CC;
    padding: 0 1px;
    -ms-overflow-style: none;
    /* 火狐下隐藏滚动条 */
    overflow: none;
    scrollbar-width: none;

    // overflow-y: hidden;
    .iptBox {
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }

  .avue-form .el-input--mini input {
    width: 100% !important;
  }

  .mainBox::-webkit-scrollbar {
    display: none;
  }

  .rowHead {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    background: #f4f4f4;
    border: 1px solid #C0C4CC;
    margin-left: -1px;

    .el-col {
      height: 40px;
      line-height: 40px;
      border-right: 1px solid #C0C4CC;
    }

    .el-col:last-child {
      height: 40px;
      line-height: 40px;
      border-right: none;
    }
  }

  .pzStyle {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border: 1px solid #C0C4CC;
    border-top: none;
    text-overflow: ellipsis;
    // white-space: nowrap;
    overflow: hidden;
  }

  .pzCont {
    height: 100%;
    line-height: 40%;
  }

  .tbBox {
    padding: 0px 0.5% 10%;

    // margin-bottom: 20%;
    // min-height: 700px;
    .el-input {
      width: 90%;
    }

    .el-input--mini .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
  }

  .tbBtn {
    margin: 10px 10px 0 10px;
    text-align: left;
  }

  .nullStyle {
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #C0C4CC;
    // margin-left: -0.5px;
  }

  .xmStyle {
    height: 40px;
    // line-height: 40px;
    border-right: 1px solid #C0C4CC;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    margin-left: -0.5px;
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
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #C0C4CC;
  }

  .btns {
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #C0C4CC;
    border-bottom: 1px solid #C0C4CC;
  }

  .btns:last-child {
    border-bottom: none;
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

    .contentDiv {
      border-bottom: 1px solid #C0C4CC;

      .ffStyle {
        border-right: 1px solid #C0C4CC;
        // margin-left: -1px;
        // border-top: 1px solid #C0C4CC;
        // margin-top: -1px;
      }

      .contentList {
        border-right: 1px solid #C0C4CC;
        border-top: 1px solid #C0C4CC;
        margin-top: -1px;

        .cdiv {
          height: 40px;
          line-height: 40px;
          text-align: center;
          // margin-left: -0.5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cdiv:last-child {
          border-bottom: none;
        }
      }

      .contentList:first-child {
        border-top: none;
      }
    }

    .contentDiv:last-child {
      border-bottom: none;
    }

    .supEqut {
      min-height: 30px;
      line-height: 30px;
    }
  }

  .content:last-child {
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
}
</style>