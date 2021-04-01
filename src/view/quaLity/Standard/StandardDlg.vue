<template>
  <div id="StandardDlg">
    <view-container title="标准明细">
      <div style="padding: 0 5px; overflow: auto">
        <!-- 下拉选择 -->
        <!-- 按钮 -->
        <el-row class="tbBtn" v-if="btnCtr">
          <el-col :span="24">
            <el-button type="primary" v-if="!isCell" @click="addBtnClick"
              >新增一级標準</el-button
            >
            <el-button type="primary" v-if="!isCell" @click="Editor">
              {{ $t("energy.bj") }}
            </el-button>
            <el-button
              type="success"
              v-else
              :disabled="!canSave"
              @click="Update"
              >{{ $t("energy.bc") }}</el-button
            >
            <el-button type="warning" v-if="isCell" @click="Cancel">
              {{ $t("energy.qx") }}
            </el-button>
            <el-button type="warning" @click="closeDialg">{{
              this.$t("public.close")
            }}</el-button>
          </el-col>
        </el-row>
        <div v-loading="loading" :element-loading-text="$t('proReport.jzz')">
          <!-- 按钮 -->
          <!-- 质量检查项目 -->
          <el-row class="Quality">
            <el-col :span="24">
              <div class="tbBox">
                <el-container class="rowBox">
                  <el-header class="headBox">
                    <el-row class="rowHead">
                      <el-col :span="24">
                        <el-row>
                          <el-col :span="1">
                            <div
                              style="width: 100%; border-right: 1px solid #ccc"
                            >
                              序號
                            </div>
                          </el-col>
                          <el-col :span="3">
                            <div
                              style="width: 100%; border-right: 1px solid #ccc"
                            >
                              一级標準
                            </div>
                          </el-col>
                          <el-col :span="20">
                            <el-row>
                              <el-col
                                :span="4"
                                style="border-right: 1px solid #ccc"
                                >二級標準</el-col
                              >
                              <el-col :span="20">
                                <el-row>
                                  <el-col
                                    :span="5"
                                    style="border-right: 2px solid #26a7e0"
                                  >
                                    <div style="border-right: 1px solid #ccc">
                                      三級標準
                                    </div>
                                  </el-col>
                                  <el-col :span="5">检测方法</el-col>
                                  <el-col :span="5">適用范围</el-col>
                                  <el-col :span="5">合格范围</el-col>
                                  <el-col :span="4">是否关键项目</el-col>
                                </el-row>
                              </el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-header>
                  <el-main class="mainBox">
                    <el-row
                      v-if="tbData.length > 0"
                      style="border-top: 1px solid #c0c4cc; margin-top: -1px"
                    >
                      <draggable
                        v-model="tbData"
                        @update="datadragEnd($event, tbData, '一級')"
                        :move="getdata"
                      >
                        <el-row
                          class="content"
                          v-for="(item, index) of tbData"
                          :key="index"
                        >
                          <!-- 标准名称 -->
                          <el-col
                            :span="1"
                            :style="item.tbStyle"
                            style="border-right: 1px solid #ccc"
                            >{{ index + 1 }}</el-col
                          >
                          <el-col
                            :span="3"
                            :style="item.tbStyle"
                            style="border-right: 1px solid #ccc"
                            @mouseenter.native="mouseEnter(item, '一级標準')"
                            @mouseleave.native="mouseLeave(item, '一级標準')"
                          >
                            <el-input
                              v-model="item.itemName"
                              placeholder="一级標準"
                              @input="iptChange(item)"
                              maxlength="8"
                              v-show="!realOnly"
                              clearable
                            ></el-input>
                            <div class="tbLabel" v-if="realOnly">
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
                              <div class="handleDl" v-if="!item.display">
                                <div @click="addBtnClick(item, '二级標準')">
                                  <i class="el-icon-plus"></i>
                                </div>
                                <div
                                  @click="delBtnClick(item, '二级標準')"
                                  v-if="item.qcStandarDetailEx2.length == 0"
                                >
                                  <i class="el-icon-close"></i>
                                </div>
                              </div>
                            </div>
                          </el-col>

                          <el-col
                            :span="20"
                            v-if="item.qcStandarDetailEx2.length > 0"
                          >
                            <draggable
                              v-model="item.qcStandarDetailEx2"
                              @update="datadragEnd($event, item, '二級')"
                              :move="getdata"
                            >
                              <div
                                v-if="item.qcStandarDetailEx2.length > 0"
                                v-for="(
                                  items, indexs
                                ) in item.qcStandarDetailEx2"
                                class="contentDiv"
                              >
                                <el-row>
                                  <el-col
                                    :span="4"
                                    :style="items.ckStyle"
                                    class="ffStyle"
                                    @mouseenter.native="mouseEnter(items)"
                                    @mouseleave.native="mouseLeave(items)"
                                  >
                                    <el-input
                                      v-model="items.itemName"
                                      placeholder="二级標準"
                                      @input="iptChange(items)"
                                      maxlength="8"
                                      v-show="!realOnly"
                                      clearable
                                    ></el-input>
                                    <div class="tbLabel" v-if="realOnly">
                                      <el-popover
                                        placement="top-start"
                                        width="200"
                                        trigger="click"
                                        :content="items.itemName"
                                      >
                                        <span slot="reference">
                                          {{ items.itemName }}
                                        </span>
                                      </el-popover>
                                      <div
                                        class="handleDl"
                                        v-if="!items.display"
                                      >
                                        <div
                                          @click="
                                            addBtnClick(items, '三級標準')
                                          "
                                        >
                                          <i class="el-icon-plus"></i>
                                        </div>
                                        <div
                                          @click="delBtnClick(items)"
                                          v-if="
                                            items.qcStandarDetail.length == 0
                                          "
                                        >
                                          <i class="el-icon-close"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </el-col>
                                  <draggable
                                    v-model="items.qcStandarDetail"
                                    @update="datadragEnd($event, items, '三級')"
                                    :move="getdata"
                                  >
                                    <el-col
                                      :span="20"
                                      v-for="(
                                        data, indexs
                                      ) of items.qcStandarDetail"
                                      :key="indexs"
                                      v-if="items.qcStandarDetail.length > 0"
                                    >
                                      <el-row>
                                        <el-col
                                          :span="5"
                                          style="
                                            border-right: 3px solid #26a7e0;
                                          "
                                          @mouseenter.native="mouseEnter(data)"
                                          @mouseleave.native="mouseLeave(data)"
                                        >
                                          <div class="contentList tbLabel">
                                            <div class="cdiv">
                                              <el-input
                                                v-model="data.itemName"
                                                placeholder="三级標準"
                                                @input="iptChange(data)"
                                                maxlength="8"
                                                v-show="!realOnly"
                                                clearable
                                              ></el-input>
                                              <el-popover
                                                v-if="realOnly"
                                                placement="top-start"
                                                width="200"
                                                trigger="click"
                                                :content="data.itemName"
                                              >
                                                <span slot="reference">
                                                  {{ data.itemName }}
                                                </span>
                                              </el-popover>
                                              <div
                                                class="handleDl"
                                                v-if="!data.display"
                                              >
                                                <div
                                                  @click="
                                                    delBtnClick(
                                                      data,
                                                      '三级標準'
                                                    )
                                                  "
                                                >
                                                  <i class="el-icon-close"></i>
                                                </div>
                                              </div>
                                              <div
                                                class="tbLabel"
                                                v-if="
                                                  data.itemName == null ||
                                                  data.itemName == ''
                                                "
                                              >
                                                /
                                              </div>
                                            </div>
                                          </div>
                                        </el-col>
                                        <el-col :span="5">
                                          <div class="contentList">
                                            <div class="cdiv">
                                              <el-input
                                                v-model="data.examineMethod"
                                                placeholder="检测方法"
                                                @input="iptChange(data)"
                                                maxlength="8"
                                                v-show="!realOnly"
                                                clearable
                                              ></el-input>
                                              <el-popover
                                                v-if="realOnly"
                                                placement="top-start"
                                                width="200"
                                                trigger="click"
                                                :content="data.examineMethod"
                                              >
                                                <span slot="reference">
                                                  {{ data.examineMethod }}
                                                </span>
                                              </el-popover>
                                              <div
                                                class="tbLabel"
                                                v-if="
                                                  data.examineMethod == null ||
                                                  data.examineMethod == ''
                                                "
                                              >
                                                /
                                              </div>
                                            </div>
                                          </div>
                                        </el-col>
                                        <el-col :span="5">
                                          <div class="contentList">
                                            <div class="cdiv">
                                              <el-input
                                                v-model="data.fitScop"
                                                placeholder="適用範圍"
                                                @input="iptChange(data)"
                                                maxlength="8"
                                                v-show="!realOnly"
                                                clearable
                                              ></el-input>
                                              <el-popover
                                                v-if="realOnly"
                                                placement="top-start"
                                                width="200"
                                                trigger="click"
                                                :content="data.fitScop"
                                              >
                                                <span slot="reference">
                                                  {{ data.fitScop }}
                                                </span>
                                              </el-popover>
                                              <div
                                                class="tbLabel"
                                                v-if="
                                                  data.fitScop == null ||
                                                  data.fitScop == ''
                                                "
                                              >
                                                /
                                              </div>
                                            </div>
                                          </div>
                                        </el-col>
                                        <el-col :span="5">
                                          <div class="contentList">
                                            <div class="cdiv">
                                              <el-input
                                                v-model="data.passRange"
                                                placeholder="合格範圍"
                                                @input="iptChange(data)"
                                                maxlength="8"
                                                v-show="!realOnly"
                                                clearable
                                              ></el-input>
                                              <el-popover
                                                v-if="realOnly"
                                                placement="top-start"
                                                width="200"
                                                trigger="click"
                                                :content="data.passRange"
                                              >
                                                <span slot="reference">
                                                  {{ data.passRange }}
                                                </span>
                                              </el-popover>
                                              <div
                                                class="tbLabel"
                                                v-if="
                                                  data.passRange == null ||
                                                  data.passRange == ''
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
                                              <el-select
                                                style="margin-left: 10%"
                                                v-show="!realOnly"
                                                v-model="data.isKeyItem"
                                                placeholder="请选择"
                                                @input="iptChange(data)"
                                                clearable
                                              >
                                                <el-option
                                                  v-for="item in isKeyItemData"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value"
                                                ></el-option>
                                              </el-select>

                                              <span
                                                class="isKeyItem"
                                                v-if="data.isKeyItem === true"
                                                slot="reference"
                                                >√</span
                                              >
                                              <span
                                                class="noKeyItem"
                                                v-else
                                                slot="reference"
                                                >X</span
                                              >

                                              <div class="contentList" v-else>
                                                <span class="cdiv">/</span>
                                              </div>
                                            </div>
                                          </div>
                                        </el-col>
                                      </el-row>
                                    </el-col>
                                  </draggable>
                                  <!-- 只有二級標準 -->
                                  <el-col
                                    :span="20"
                                    v-if="items.qcStandarDetail.length == 0"
                                  >
                                    <el-col
                                      :span="5"
                                      style="border-right: 2px solid #26a7e0"
                                    >
                                      <div class="contentList">
                                        <div class="cdiv">/</div>
                                      </div>
                                    </el-col>
                                    <el-col :span="5">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-input
                                            v-model="items.examineMethod"
                                            placeholder="检测方法"
                                            @input="iptChange(items)"
                                            maxlength="8"
                                            v-show="!realOnly"
                                            clearable
                                          ></el-input>
                                          <el-popover
                                            v-if="realOnly"
                                            placement="top-start"
                                            width="200"
                                            trigger="click"
                                            :content="items.examineMethod"
                                          >
                                            <span slot="reference">
                                              {{ items.examineMethod }}
                                            </span>
                                          </el-popover>
                                          <div
                                            class="tbLabel"
                                            v-if="
                                              items.examineMethod == null ||
                                              items.examineMethod == ''
                                            "
                                          >
                                            /
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                    <el-col :span="5">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-input
                                            v-model="items.fitScop"
                                            placeholder="適用範圍"
                                            @input="iptChange(items)"
                                            maxlength="8"
                                            v-show="!realOnly"
                                            clearable
                                          ></el-input>
                                          <el-popover
                                            v-if="realOnly"
                                            placement="top-start"
                                            width="200"
                                            trigger="click"
                                            :content="items.fitScop"
                                          >
                                            <span slot="reference">
                                              {{ items.fitScop }}
                                            </span>
                                          </el-popover>
                                          <div
                                            class="tbLabel"
                                            v-if="
                                              items.fitScop == null ||
                                              items.fitScop == ''
                                            "
                                          >
                                            /
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                    <el-col :span="5">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-input
                                            v-model="items.passRange"
                                            placeholder="合格範圍"
                                            @input="iptChange(items)"
                                            maxlength="8"
                                            v-show="!realOnly"
                                            clearable
                                          ></el-input>
                                          <el-popover
                                            v-if="realOnly"
                                            placement="top-start"
                                            width="200"
                                            trigger="click"
                                            :content="items.passRange"
                                          >
                                            <span slot="reference">
                                              {{ items.passRange }}
                                            </span>
                                          </el-popover>
                                          <div
                                            class="tbLabel"
                                            v-if="
                                              items.passRange == null ||
                                              items.passRange == ''
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
                                          <el-select
                                            style="margin-left: 10%"
                                            v-show="!realOnly"
                                            v-model="items.isKeyItem"
                                            placeholder="请选择"
                                            @input="iptChange(items)"
                                            clearable
                                          >
                                            <el-option
                                              v-for="item in isKeyItemData"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value"
                                            ></el-option>
                                          </el-select>
                                          <span
                                            class="isKeyItem"
                                            v-if="items.isKeyItem === true"
                                            slot="reference"
                                            >√</span
                                          >
                                          <span
                                            class="noKeyItem"
                                            v-else
                                            slot="reference"
                                            >X</span
                                          >

                                          <div class="contentList" v-else>
                                            <span class="cdiv">/</span>
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                  </el-col>
                                </el-row>
                              </div>
                            </draggable>
                          </el-col>

                          <!-- 只有一級標準 -->
                          <el-col :span="20" v-else>
                            <div class="contentDiv">
                              <el-row>
                                <el-col :span="4" class="contentList">
                                  <div class="cdiv">/</div>
                                </el-col>
                                <el-col :span="20">
                                  <el-row>
                                    <el-col
                                      :span="5"
                                      style="border-right: 2px solid #26a7e0"
                                    >
                                      <div class="contentList">
                                        <div class="cdiv">/</div>
                                      </div>
                                    </el-col>
                                    <el-col :span="5">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-input
                                            v-model="item.examineMethod"
                                            placeholder="检测方法"
                                            @input="iptChange(item)"
                                            maxlength="8"
                                            v-show="!realOnly"
                                            clearable
                                          ></el-input>
                                          <el-popover
                                            v-if="realOnly"
                                            placement="top-start"
                                            width="200"
                                            trigger="click"
                                            :content="item.examineMethod"
                                          >
                                            <span slot="reference">
                                              {{ item.examineMethod }}
                                            </span>
                                          </el-popover>
                                          <div
                                            class="tbLabel"
                                            v-if="
                                              item.examineMethod == null ||
                                              (item.examineMethod == '' &&
                                                realOnly)
                                            "
                                          >
                                            /
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                    <el-col :span="5">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-input
                                            v-model="item.fitScop"
                                            placeholder="適用範圍"
                                            @input="iptChange(item)"
                                            maxlength="8"
                                            v-show="!realOnly"
                                            clearable
                                          ></el-input>
                                          <el-popover
                                            v-if="realOnly"
                                            placement="top-start"
                                            width="200"
                                            trigger="click"
                                            :content="item.fitScop"
                                          >
                                            <span slot="reference">
                                              {{ item.fitScop }}
                                            </span>
                                          </el-popover>
                                          <div
                                            class="contentList"
                                            v-if="
                                              item.fitScop == null ||
                                              (item.fitScop == '' && realOnly)
                                            "
                                          >
                                            <span class="cdiv">/</span>
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>

                                    <el-col :span="5">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-input
                                            v-model="item.passRange"
                                            placeholder="合格範圍"
                                            @input="iptChange(item)"
                                            maxlength="8"
                                            v-show="!realOnly"
                                            clearable
                                          ></el-input>
                                          <el-popover
                                            v-if="realOnly"
                                            placement="top-start"
                                            width="200"
                                            trigger="click"
                                            :content="item.passRange"
                                          >
                                            <span slot="reference">
                                              {{ item.passRange }}
                                            </span>
                                          </el-popover>
                                          <div
                                            class="contentList"
                                            v-if="
                                              item.passRange == null ||
                                              (item.passRange == '' && realOnly)
                                            "
                                          >
                                            <span class="cdiv">/</span>
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                    <el-col :span="4">
                                      <div class="contentList">
                                        <div class="cdiv">
                                          <el-select
                                            style="margin-left: 10%"
                                            v-show="!realOnly"
                                            v-model="item.isKeyItem"
                                            placeholder="请选择"
                                            @input="iptChange(item)"
                                            clearable
                                          >
                                            <el-option
                                              v-for="item in isKeyItemData"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value"
                                            ></el-option>
                                          </el-select>

                                          <span
                                            class="isKeyItem"
                                            v-if="item.isKeyItem === true"
                                            slot="reference"
                                            >√</span
                                          >
                                          <span
                                            class="noKeyItem"
                                            v-else
                                            slot="reference"
                                            >X</span
                                          >
                                          <div
                                            class="contentList"
                                            v-if="
                                              item.isKeyItem == null && realOnly
                                            "
                                          >
                                            <span class="cdiv">/</span>
                                          </div>
                                        </div>
                                      </div>
                                    </el-col>
                                  </el-row>
                                </el-col>
                              </el-row>
                            </div>
                          </el-col>
                        </el-row>
                      </draggable>
                    </el-row>
                    <el-row
                      v-else
                      style="
                        border-bottom: 1px solid #c0c4cc;
                        margin-top: -0.5px;
                      "
                    >
                      <el-col :span="24" class="nullData">
                        <el-row>
                          <div style="border-right: 1px solid #c0c4cc">/</div>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </div>
            </el-col>
          </el-row>
          <!-- 新增弹窗 -->
          <el-row>
            <el-dialog
              :visible.sync="addDialog"
              width="80%"
              append-to-body
              :close-on-click-modal="false"
              class="standardDlg"
            >
              <el-row>
                <el-tabs v-model="activeName" type="border-card">
                  <el-tab-pane
                    :label="addDlgName"
                    name="level1"
                    v-if="activeName == 'level1'"
                  >
                    <div class="btnList">
                      <el-button type="success" @click="save">{{
                        this.$t("public.save")
                      }}</el-button>
                      <el-button type="warning" @click="addDialog = false">{{
                        this.$t("public.close")
                      }}</el-button>
                    </div>
                    <el-row>
                      <avue-form
                        ref="level1"
                        v-model="level1"
                        :option="level1Op"
                        @submit="level1Sub"
                      />
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
              </el-row>
            </el-dialog>
          </el-row>
        </div>
      </div>
    </view-container>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { cofirm, success, error, warning } from "@/seal/seal"; // 引入封装的消息提示和弹框组件
import { Data_Width, label_Width, isDate } from "@/seal/gridOption";
import { level1Op } from "./data";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      tbData: [],
      tbStyle: [],
      ckStyle: [],
      checkPz: [],
      pzAdd: false,
      isCell: false,
      canSave: false,
      itemDialog: false,
      loading: false,
      realOnly: true,
      isCell: false,
      canSave: false,
      btnCtr: false,
      isKeyItemData: [
        {
          value: true,
          label: "是",
        },
        {
          value: false,
          label: "否",
        },
      ],
      addDialog: false,
      addDlgName: "新增一级標準",
      activeName: "level1",
      level1: {},
      level1Op: level1Op(this),
      menuChangeData: [],
      itemChangeData: [],
      linkData: {},
      draging: {},
      target: {},
    };
  },
  methods: {
    closeDialg() {
      this.$emit("closeDialg");
    },
    // 检查种类下拉选择
    checkVariety(val) {
      if (val != undefined) {
        this.linkData = val;
      }

      this.loading = true;
      this.tbData = [];
      this.btnCtr = false;
      this.tbStyle = [];
      this.ckStyle = [];
      for (var key in this.level1) {
        this.level1[key] = "";
      }
      this.menuChangeData = [];
      // if (data.length == 0) {
      //   this.loading = false;
      //   return;
      // }
      this.$http
        .get(
          "/api/qcStandarDetail/v1.0/getListOrId?standardId=" +
            this.linkData.standardId
        )
        .then((res) => {
          this.tbData = res.data;
          setTimeout(() => {
            let sum = 0;
            let pz = 0;
            let cg = 0;
            if (this.tbData.length > 0) {
              for (let i = 0; i < this.tbData.length; i++) {
                // this.sortNum(this.tbData[i].children, "sn");
                this.$set(this.tbData[i], "readonly", true);
                this.$set(this.tbData[i], "display", true);
                let num = 0;
                if (this.tbData[i].qcStandarDetailEx2.length > 0) {
                  cg += this.tbData[i].qcStandarDetailEx2.length - 1;
                  for (
                    let j = 0;
                    j < this.tbData[i].qcStandarDetailEx2.length;
                    j++
                  ) {
                    // this.sortNum(this.tbData[i].qcStandarDetailEx2[j].qcStandarDetail, "sn");
                    pz += this.tbData[i].qcStandarDetailEx2[j].qcStandarDetail
                      .length;
                    num += this.tbData[i].qcStandarDetailEx2[j].qcStandarDetail
                      .length;
                    sum += this.tbData[i].qcStandarDetailEx2[j].qcStandarDetail
                      .length;
                    this.$set(
                      this.tbData[i].qcStandarDetailEx2[j],
                      "readonly",
                      true
                    );
                    this.$set(
                      this.tbData[i].qcStandarDetailEx2[j],
                      "display",
                      true
                    );
                    if (this.tbData[i].qcStandarDetailEx2 != null) {
                      for (
                        let k = 0;
                        k <
                        this.tbData[i].qcStandarDetailEx2[j].qcStandarDetail
                          .length;
                        k++
                      ) {
                        this.$set(
                          this.tbData[i].qcStandarDetailEx2[j].qcStandarDetail[
                            k
                          ],
                          "readonly",
                          true
                        );
                        this.$set(
                          this.tbData[i].qcStandarDetailEx2[j].qcStandarDetail[
                            k
                          ],
                          "display",
                          true
                        );
                        this.$set(
                          this.tbData[i].qcStandarDetailEx2[j].qcStandarDetail[
                            k
                          ],
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
                          this.tbData[i].qcStandarDetailEx2[j],
                          "ckStyle",
                          item
                        );
                      } else {
                        let item = {
                          height: num * 40 + "px",
                          "line-height": num * 40 + "px",
                        };
                        this.$set(
                          this.tbData[i].qcStandarDetailEx2[j],
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
                    height:
                      sum * 40 +
                      this.tbData[i].qcStandarDetailEx2.length -
                      1 +
                      "px",
                    "line-height":
                      sum * 40 +
                      this.tbData[i].qcStandarDetailEx2.length -
                      1 +
                      "px",
                  };
                } else {
                  data1 = {
                    height: "40px",
                    "line-height": "40px",
                  };
                }
                this.$set(this.tbData[i], "tbStyle", data1);
                // this.tbStyle.push(data1);
                sum = 0;
              }
            }
            if (this.tbData.length > 0) {
              let pzHight = {
                height: pz * 40 + cg + this.tbData.length - 1 + "px",
                "line-height": pz * 40 + cg + this.tbData.length - 1 + "px",
              };
            } else {
              let pzHight = {
                height: pz * 40 + this.tbData.length + "px",
                "line-height": pz * 40 + this.tbData.length + "px",
              };
            }
            this.btnCtr = true;
            this.loading = false;
          });
        });
      // this.sortNum(this.tbData, "sn");
    },
    // 修改触发事件，记录数据变化
    iptChange(value) {
      this.canSave = true;
      if (this.itemChangeData.length == 0) {
        this.itemChangeData.push(value);
      } else {
        for (let index = 0; index < this.itemChangeData.length; index++) {
          if (this.itemChangeData[index].itemCode === value.itemCode) {
            break;
          }
          if (
            index == this.itemChangeData.length - 1 &&
            this.itemChangeData[index].itemCode != value.itemCode
          ) {
            this.itemChangeData.push(value);
          }
        }
      }
    },
    Editor() {
      // 开启编辑
      this.realOnly = false;
      this.isCell = !this.isCell;
    },
    Update() {
      this.loading = true;
      this.itemChangeData.forEach((data, index) => {
        this.$http
          .put(
            "/api/qcStandarDetail/v1.0/updateById?itemName=" +
              data.itemName +
              "&standardId=" +
              data.standardId +
              "&itemCode=" +
              data.itemCode +
              "&fitScop=" +
              data.fitScop +
              "&isKeyItem=" +
              data.isKeyItem +
              "&passRange=" +
              data.passRange +
              "&sn=" +
              data.sn +
              "&examineMethod=" +
              data.examineMethod
          )
          .then((res) => {})
          .catch((err) => {
            error(this.$t("energy.xgsb"));
            this.loading = false;
          });
      });
      setTimeout(() => {
        this.checkVariety();
        this.isCell = false;
        this.realOnly = !this.realOnly;
        this.menuChangeData = [];
        this.itemChangeData = [];
        // this.loading = false
        success(this.$t("energy.xgcg"));
      }, 200);
    },
    Cancel() {
      // 取消编辑
      this.loading = true;
      if (this.canSave == true) {
        cofirm("是否放棄修改的数据？")
          .then(() => {
            this.isCell = false;
            this.realOnly = true;
            this.menuChangeData = [];
            this.itemChangeData = [];
            this.checkVariety();
          })
          .catch(() => {
            // this.$http
            //   .delete("/api/qcStandarDetail/v1.0/removeById?id=" + val.itemCode)
            //   .then(Res => {
            //     if (Res.data.code == 200) {
            //       success(this.$t("public.sccg"));
            //       this.checkVariety();
            //     }
            //   });
          });
      } else {
        this.isCell = false;
        this.realOnly = true;
        this.canSave = false;
      }
      this.loading = false;
    },
    addBtnClick(val, label) {
      this.level1.isKeyItem = true;
      if (label) {
        this.addDlgName = "新增" + label;
        this.level1.itemCode = val.itemCode;
        label === "二级標準"
          ? (this.level1.itemLevel = 2)
          : (this.level1.itemLevel = 3);
      } else {
        this.level1.itemLevel = 1;
        this.level1.itemCode = "";
        this.addDlgName = "新增一级標準";
      }
      this.addDialog = true;
    },
    save() {
      this.$refs.level1.submit();
    },
    level1Sub(form, done) {
      form.isKeyItem == true ? (form.isKeyItem = 1) : (form.isKeyItem = 0);
      let api = "";
      if (form.itemCode == "") {
        api =
          "/api/qcStandarDetail/v1.0/saves?fitScop=" +
          form.fitScop +
          "&isKeyItem=" +
          form.isKeyItem +
          "&itemLevel=" +
          form.itemLevel +
          "&itemName=" +
          form.itemName +
          "&passRange=" +
          form.passRange +
          "&standardId=" +
          this.linkData.standardId +
          "&examineMethod=" +
          form.examineMethod +
          "&checkItemCode=" +
          form.checkItemCode;
      } else {
        api =
          "/api/qcStandarDetail/v1.0/saves?fitScop=" +
          form.fitScop +
          "&isKeyItem=" +
          form.isKeyItem +
          "&itemLevel=" +
          form.itemLevel +
          "&itemName=" +
          form.itemName +
          "&passRange=" +
          form.passRange +
          "&standardId=" +
          this.linkData.standardId +
          "&itemCode=" +
          form.itemCode +
          "&examineMethod=" +
          form.examineMethod +
          "&checkItemCode=" +
          form.checkItemCode;
      }
      this.$http.post(api).then((Res) => {
        if (Res.status == 200) {
          success("新增成功！");
          setTimeout(() => {
            this.checkVariety();
            done();
            this.addDialog = false;
          }, 200);
        } else {
          error("新增失败！");
          done();
          this.addDialog = false;
        }
      });
      done();
    },
    delBtnClick(val, label) {
      cofirm("是否确认删除 " + val.itemName + " 此数据").then(() => {
        this.$http
          .delete("/api/qcStandarDetail/v1.0/removeById?id=" + val.itemCode)
          .then((Res) => {
            if (Res.data.code == 200) {
              success(this.$t("public.sccg"));
              this.checkVariety();
            }
          });
      });
    },
    mouseEnter(val, label) {
      if (this.realOnly == false) {
        return;
      }
      val.display = !val.display;
    },
    mouseLeave(val, label) {
      if (this.realOnly == false) {
        return;
      }
      val.display = !val.display;
    },
    datadragEnd(evt, val, label) {
      if (label == "一級") {
        if (Math.abs(evt.oldIndex - evt.newIndex) <= 1) {
          val[evt.newIndex].sn = [
            val[evt.oldIndex].sn,
            (val[evt.oldIndex].sn = val[evt.newIndex].sn),
          ][0];
          this.iptChange(val[evt.newIndex]);
          this.iptChange(val[evt.oldIndex]);
        } else {
          val.forEach((item, index) => {
            item.sn = "0000" + (index + 1);
            this.iptChange(item);
          });
        }
      }
      if (label == "二級") {
        if (Math.abs(evt.oldIndex - evt.newIndex) <= 1) {
          val.qcStandarDetailEx2[evt.newIndex].sn = [
            val.qcStandarDetailEx2[evt.oldIndex].sn,
            (val.qcStandarDetailEx2[evt.oldIndex].sn =
              val.qcStandarDetailEx2[evt.newIndex].sn),
          ][0];
          this.iptChange(val.qcStandarDetailEx2[evt.newIndex]);
          this.iptChange(val.qcStandarDetailEx2[evt.oldIndex]);
        } else {
          val.qcStandarDetailEx2.forEach((item, index) => {
            item.sn = val.sn + "0000" + (index + 1);
            this.iptChange(item);
          });
        }
      }
      if (label == "三級") {
        if (Math.abs(evt.oldIndex - evt.newIndex) <= 1) {
          val.qcStandarDetail[evt.newIndex].sn = [
            val.qcStandarDetail[evt.oldIndex].sn,
            (val.qcStandarDetail[evt.oldIndex].sn =
              val.qcStandarDetail[evt.newIndex].sn),
          ][0];
          this.iptChange(val.qcStandarDetail[evt.newIndex]);
          this.iptChange(val.qcStandarDetail[evt.oldIndex]);
        } else {
          val.qcStandarDetail.forEach((item, index) => {
            item.sn = val.sn + "0000" + (index + 1);
            this.iptChange(item);
          });
        }
      }
    },
    getdata(evt) {
      // 开启编辑
      this.canSave = true;
      this.realOnly = false;
      this.isCell = true;
    },
    getCheckIte() {
      this.$http.get("/api/baseStandardCheckItem/v1.0/list").then((res) => {
        this.level1Op.column[9].dicData = res.data;
      });
    },
    // ===============================//
    // 封装的排序函数
    sortNum(arr, key) {
      return arr.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
  },
  created() {
    // 获取检测项目基础定义数据
    this.getCheckIte();
    // 解决 Firefox 拖拽后在新窗口打开搜索的问题
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
  },
  mounted() {},
};
</script>

<style lang="stylus">
#StandardDlg {
  text-align: center;

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    padding-bottom: 15px !important;
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    z-index: 9;
  }

  .el-tab-pane {
    overflow: hidden !important;
  }

  .isKeyItem {
    color: green;
    font-family: '微軟雅黑';
    font-size: 18px;
    font-weight: bold;
  }

  .noKeyItem {
    color: red;
    font-family: '微軟雅黑';
    font-size: 18px;
    font-weight: bold;
  }

  .tbLabel {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    width: 100%;
  }

  .handleDl {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    width: 20%;
    z-index: 999;
    top: 0;
    right: 0;
    font-size: 16px;
    color: #409EFF;
    cursor: pointer;
    background: #fff;

    div {
      height: 25px;
      line-height: 25px;
    }

    i {
      padding: 5px 0;
      width: 100%;
      background: rgba(38, 167, 224, 0.3);
    }
  }

  .Quality {
    // width: 1200px;
    // overflow-x: scroll;
    overflow-y: hidden;

    .contentDiv {
      // border-bottom: 1px solid #C0C4CC;
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
          height: 40px;
          line-height: 40px;
        }
      }
    }

    .contentDiv:last-child {
      border-bottom: none;
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

      .ffStyle {
        border-right: 1px solid #C0C4CC;
        border-bottom: 1px solid #C0C4 C;
      }

      .ffStyle:first-child {
        border-bottom: none;
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
          height: 40px;
          line-height: 40px;
        }
      }
    }

    .contentDiv:last-child {
      border-bottom: none;
    }

    .el-input {
      width: 90%;
    }
  }

  .headBox {
    padding: 0 !important;
    height: 100% !important;
    width: 100%;
  }

  .rowHead {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    background: #f4f4f4;
    border: 1px solid #C0C4CC;
    width: 100%;
    float: none;
    min-width: 800px;
    white-space: nowrap;

    .el-col {
      height: 40px;
      line-height: 40px;
      // border-right: 1px solid #C0C4CC;
    }

    .el-col-5, .el-col-4 {
      border-right: 1px solid #C0C4CC;
    }

    .el-col:last-child {
      height: 40px;
      line-height: 40px;
      border-right: none;
    }
  }

  .mainBox {
    font-size: 15px;
    height: calc(100vh - 125px);
    padding: 0 !important;
    // border-top: 1px solid #C0C4CC;
    border-bottom: 1px solid #C0C4CC;
    border-right: 1px solid #C0C4CC;
    // padding: 0 1px;
    -ms-overflow-style: none;
    // /* 火狐下隐藏滚动条 */
    overflow: overlay;
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
    // display: none;
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
    border-left: 1px solid #C0C4CC;
    border-bottom: 1px solid #C0C4CC;

    .el-col:last-child {
      border: none;
    }

    .supEqut {
      min-height: 30px;
      line-height: 30px;
    }
  }

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
