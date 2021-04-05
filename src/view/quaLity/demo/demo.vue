<template>
  <basicContainer id="Quality">
    <div class="Quality">
      <!-- 下拉选择检查类型 -->
      <div class="head-left">
        <el-row>
          <!-- 检查类型 -->
          <el-col :span="12">
            <el-select
              v-model="value"
              :placeholder="$t('energy.qxz')"
              @change="fn_SelectID"
            >
              <el-option
                v-for="(item, index) in SelctData"
                :key="item.cateId"
                :label="item.cateName"
                :value="item.cateId"
              ></el-option>
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="fn_dialog(0)"
              >{{ $t("energy.xz") }}</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="fn_dialog(1)"
              >{{ $t("energy.bj") }}</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="fn_dialog(2)"
              >{{ $t("energy.schu") }}</el-button
            >
          </el-col>
          <el-dialog :title="title" :visible.sync="dialog" width="60%">
            <el-row>
              <el-col :span="12">
                <div>
                  {{ $t("energy.flmc") }}
                  <el-input
                    v-model="cateName"
                    :placeholder="$t('energy.qsrflmc')"
                    style="width: 76%"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  {{ $t("energy.flbh") }}
                  <el-input
                    v-model="cateCode"
                    :placeholder="$t('energy.qsrflbh')"
                    style="width: 80%"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div style="width: 90%; margin: 30px 0 0 0">
                  {{ $t("energy.flms") }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div>
                  <el-input
                    type="textarea"
                    v-model="cateDesc"
                    :placeholder="$t('energy.qsrflms')"
                    style="width: 90%; margin: 0 0 0 55px"
                  ></el-input>
                </div>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialog = false">{{
                $t("energy.qx")
              }}</el-button>

              <el-button
                type="primary"
                style="display: none"
                id="sunbtn"
                @click="fn_addType"
                >{{ $t("energy.bc") }}</el-button
              >
              <el-button
                type="primary"
                style="display: none"
                id="monbtn"
                @click="fn_monType"
                >{{ $t("energy.xg") }}</el-button
              >
            </span>
          </el-dialog>
          <!-- 检查种类 -->
          <el-col :span="12">
            <el-select v-model="variety" @change="checkVariety">
              <el-option
                v-for="(item, index) in varietyData"
                :key="item.kindOid"
                :label="item.kindName"
                :value="item.kindOid"
              ></el-option>
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="fn_kindialog(0)"
              >{{ $t("energy.xz") }}</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="fn_kindialog(1)"
              >{{ $t("energy.bj") }}</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="fn_kindialog(2)"
              >{{ $t("energy.schu") }}</el-button
            >
          </el-col>
        </el-row>
        <el-dialog :title="title" :visible.sync="kindialog" width="60%">
          <el-row>
            <el-col :span="12">
              <div>
                种类名称
                <el-input
                  v-model="kindName"
                  placeholder="请输入种类名称"
                  style="width: 76%"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                序号
                <el-input
                  v-model="kindSn"
                  placeholder="请输入序号"
                  style="width: 80%"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="kindialog = false">取消</el-button>
            <el-button
              type="primary"
              style="display: none"
              id="kinsun"
              @click="fn_kindAdd"
              >{{ this.$t("public.save") }}</el-button
            >
            <el-button
              type="primary"
              style="display: none"
              id="kinmon"
              @click="fn_kindup"
              >{{ this.$t("public.update") }}</el-button
            >
          </span>
        </el-dialog>
      </div>

      <el-row v-if="tbData.length > 0" class="tbBtn">
        <el-col :span="24">
          <el-button type="primary" v-if="!isCell" @click="Editor"
            >编辑</el-button
          >
          <el-button
            type="primary"
            v-else
            :disabled="!canSave"
            @click="Update"
            >{{ this.$t("public.save") }}</el-button
          >
          <el-button type="primary" :disabled="!isCell" @click="Cancel"
            >取消</el-button
          >
        </el-col>
      </el-row>

      <!-- 质量检查项目 -->
      <div class="tbBox">
        <el-row class="rowHead">
          <el-col :span="2">
            <div>品种</div>
          </el-col>
          <el-col :span="22">
            <el-row>
              <el-col :span="2">
                <span>序号</span>
              </el-col>
              <el-col :span="8">
                <span>检测项目</span>
              </el-col>
              <el-col :span="14" class="inbox">
                <el-row>
                  <el-col :span="12">
                    <span>参考方法标准</span>
                  </el-col>
                  <el-col :span="6">
                    <span>规格</span>
                  </el-col>
                  <el-col :span="6">
                    <span>接受标准</span>
                  </el-col>
                  <!-- <el-col :span="4">
                    <span>操作</span>
                  </el-col>-->
                </el-row>
              </el-col>
              <!-- <el-col :span="2">
                <span>其他</span>
              </el-col>-->

              <!-- <el-col :span="3">
            <span>所需设备</span>
          </el-col>
          <el-col :span="3">
            <span>备注</span>
              </el-col>-->
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin-top: -1px">
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
              <el-col style="line-height: 30px" :style="pzStyles">{{
                checkPz
              }}</el-col>
              <el-col
                class="handleDl"
                v-if="pzAdd"
                style="margin: -15% 15% 0 0"
              >
                <el-row>
                  <el-col :span="24" @click.native="addBtnClick(tbData, 'pz')">
                    <i class="el-icon-plus"></i>
                  </el-col>
                  <!-- <el-col
                    :span="24"
                    @click.native="delBtnClick(item,'pz')"
                    style="height:20px;line-height:20px"
                  >
                    <i class="el-icon-close"></i>
                  </el-col>-->
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
                :span="2"
                :style="tbStyle[index]"
                style="
                  border-right: 1px solid #ccc;
                  line-height: 40px;
                  height: 40px;
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
                    <el-col :span="24">{{ item.itemName }}</el-col>
                    <el-col class="handleDl" v-if="!item.readonly">
                      <div
                        style="margin-top: -30%; height: 20px"
                        @click="addBtnClick(item, 'project')"
                      >
                        <i class="el-icon-plus"></i>
                      </div>
                      <div style @click="delBtnClick(item, 'project')">
                        <i class="el-icon-close"></i>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <el-input
                  v-else
                  v-model="item.itemName"
                  placeholder="请输入内容"
                  @input="iptChange(item, 'project')"
                ></el-input>
              </el-col>
              <!-- 参考方法 -->
              <el-col :span="14">
                <el-row>
                  <el-col :span="24">
                    <div
                      v-if="item.qcItemStandardList.length > 0"
                      v-for="(items, indexs) in item.qcItemStandardList"
                      class="contentDiv"
                    >
                      <el-row v-if="item.qcItemStandardList.length > 0">
                        <el-col
                          :span="12"
                          :style="items.ckStyle"
                          style="position: inherit"
                          class="ffStyle"
                          @mouseenter.native="mouseEnter(items, 'standard')"
                          @mouseleave.native="mouseLeave(items, 'standard')"
                        >
                          <div v-if="!isCell">{{ items.standName }}</div>
                          <el-col class="handleDl" v-if="!items.readonly">
                            <div
                              style="height: 20px; margin-top: -30%"
                              @click="addBtnClick(items, 'standard')"
                            >
                              <i class="el-icon-plus"></i>
                            </div>
                            <div
                              style="height: 20px"
                              @click="delBtnClick(items, 'standard')"
                            >
                              <i class="el-icon-close"></i>
                            </div>
                          </el-col>
                          <el-input
                            v-if="isCell"
                            v-model="items.standName"
                            placeholder="请输入内容"
                            @input="iptChange(items, 'standard')"
                          ></el-input>
                        </el-col>
                        <el-col :span="12">
                          <el-row>
                            <el-col :span="12">
                              <div
                                v-for="data of items.qcScopeRangeList"
                                class="contentList"
                                @mouseenter="mouseEnter(data, 'size')"
                                @mouseleave="mouseLeave(data, 'size')"
                              >
                                <div class="cdiv" v-if="!isCell">
                                  <span>{{ data.scopeName }}</span>
                                </div>
                                <el-input
                                  v-else
                                  v-model="data.scopeName"
                                  placeholder="请输入内容"
                                  @input="iptChange(data, 'size')"
                                ></el-input>
                              </div>
                            </el-col>
                            <el-col :span="12">
                              <div
                                v-for="(data, num) of items.qcScopeRangeList"
                                class="contentList"
                                @mouseenter="mouseEnter(data, 'size')"
                                @mouseleave="mouseLeave(data, 'size')"
                                style="position: inherit"
                              >
                                <el-row>
                                  <el-col
                                    :span="24"
                                    class="cdiv"
                                    v-if="!isCell"
                                  >
                                    <span>{{ data.rangeAccept }}</span>
                                  </el-col>
                                  <el-input
                                    v-else
                                    v-model="data.rangeAccept"
                                    placeholder="请输入内容"
                                    @input="iptChange(data, 'size')"
                                  ></el-input>
                                  <el-col
                                    class="handleDl"
                                    v-if="data.cell"
                                    style="margin-right: 5%"
                                  >
                                    <!-- <div
                                      style="border-right:1px solid #ccc;height:40px;line-height:40px"
                                      @click="addBtnClick(data,'szie')"
                                    >
                                      <i class="el-icon-plus"></i>
                                    </div>-->
                                    <div
                                      @click="delBtnClick(data, 'size')"
                                      style="height: 40px; line-height: 40px"
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
                          style="
                            border-right: 1px solid #ccc;
                            margin-left: 0.5px;
                          "
                          >/</el-col
                        >
                      </el-row>
                    </div>
                    <div v-if="item.qcItemStandardList.length === 0">
                      <el-row>
                        <el-col
                          :span="12"
                          class="nullStyle"
                          style="margin-left: -1px"
                        >
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
                        <!-- <el-col :span="4">
                          <div class="btn">
                            <div class="cdiv">/</div>
                          </div>
                        </el-col>-->
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </el-col>

              <!-- 设备 -->
              <!-- <el-col :span="3">
            <div class="supEqut">{{item.supportEquipment}}</div>
              </el-col>-->
              <!-- 备注 -->
              <!-- <el-col :span="3">
            <span>备注</span>
              </el-col>-->
            </el-row>
          </el-col>
        </el-row>
        <!-- 新增弹窗 -->
        <el-row>
          <el-dialog
            :visible.sync="itemDialog"
            width="80%"
            :close-on-click-modal="false"
          >
            <!-- <el-row style="text-align:left;padding:0 0 1em 0">
              <el-button type="primary" @click="itemDialog = false">保 存</el-button>
              <el-button type="primary" @click="itemDialog = false">关 闭</el-button>
            </el-row>-->
            <el-row>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  label="检测项目"
                  name="pz"
                  v-if="activeName == 'pz'"
                >
                  <el-row>
                    <avue-form
                      ref="project"
                      v-model="project"
                      :option="projectOp"
                      @submit="projectSub"
                    />
                  </el-row>
                </el-tab-pane>
                <el-tab-pane
                  label="参考方法标准"
                  name="project"
                  v-if="activeName == 'project'"
                >
                  <el-row>
                    <avue-form
                      ref="standard"
                      v-model="standard"
                      :option="standardOp"
                      @submit="standardSub"
                    />
                  </el-row>
                </el-tab-pane>
                <el-tab-pane
                  label="规格/接受标准"
                  name="standard"
                  v-if="activeName == 'standard'"
                >
                  <el-row>
                    <avue-form
                      ref="size"
                      v-model="size"
                      :option="sizeOp"
                      @submit="sizeSub"
                    />
                  </el-row>
                </el-tab-pane>
                <el-tab-pane
                  label="规格/接受标准"
                  name="size"
                  v-if="activeName == 'size'"
                  >角色管理</el-tab-pane
                >
              </el-tabs>
            </el-row>
          </el-dialog>
        </el-row>
      </div>
    </div>
  </basicContainer>
</template>
<script>
import { cofirm, success, error, warning } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { Data_Width, label_Width, isDate } from "@/seal/gridOption";
export default {
  data() {
    return {
      SelctData: [], //下拉选项卡
      value: "", //下拉选择的值
      varietyData: [],
      variety: "",
      dialog: false, //下拉选择笼罩蒙版的状态值
      kindialog: false,
      title: "", //蒙版标题
      cateId: "", //分类ID
      cateCode: "", //分类编号
      cateName: "", //分类名称
      cateDesc: "", //分类描述
      done: "",
      kindialog: false, //下拉检查种类笼罩蒙版的状态值
      kindName: "", //检查种类名称
      kindSn: "", //检查种类序号
      kindoid: "", //检查种类分类ID
      data: [],
      tbData: [],
      tbStyle: [],
      ckStyle: [],
      checkPz: "",
      pzStyle: {},
      pzStyles: {},
      pzAdd: false,
      isCell: false,
      canSave: false,
      itemDialog: false,
      activeName: "project",
      project: {},
      projectOp: {
        // emptyBtn: false,
        // submitBtn: false,
        labelWidth: 120,
        column: [
          {
            label: "检查种类",
            span: 8,
            prop: "kindOid",
            display: false,
          },
          {
            label: "检查项名称",
            prop: "itemName",
            span: 8,
            rules: [
              {
                required: true,
                message: "请输入检查项名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "检查项序号",
            span: 8,
            prop: "sn",
            display: false,
          },
          {
            label: "检查项编号",
            span: 8,
            prop: "standCod",
          },
          {
            label: "所需设备",
            prop: "supportEquipment",
            span: 8,
          },
          {
            label: "备注",
            span: 8,
            prop: "itemDesc",
          },
        ],
      },
      standard: {},
      standardOp: {
        // emptyBtn: false,
        // submitBtn: false,
        labelWidth: 120,
        submitText: "保存",
        column: [
          {
            label: "检查项ID",
            prop: "itemOid",
            span: 6,
            display: false,
          },
          {
            label: "序号",
            span: 8,
            prop: "sn",
            display: false,
          },
          {
            label: "编号",
            prop: "standCod",
            span: 8,
          },
          {
            label: "标准名称",
            span: 8,
            prop: "standName",
            rules: [
              {
                required: true,
                message: "请输入标准名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "标准描述",
            span: 8,
            prop: "standDesc",
          },
        ],
      },
      sizeOp: {
        // emptyBtn: false,
        // submitBtn: false,
        labelWidth: 120,
        submitText: "保存",
        column: [
          // {
          //   label: "标准ID",
          //   prop: "scopeOid",
          //   span: 6,
          //   display: false
          // },
          {
            label: "标准ID2",
            span: 6,
            prop: "standOid",
            display: false,
          },
          {
            label: "序号",
            prop: "sn",
            span: 8,
            display: false,
          },
          {
            label: "规格名称",
            span: 8,
            prop: "scopeName",
            rules: [
              {
                required: true,
                message: "请输入规格名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "接受标准范围",
            span: 8,
            prop: "rangeAccept",
            rules: [
              {
                required: true,
                message: "请输入接受标准范围",
                trigger: "blur",
              },
            ],
          },
        ],
      },
      size: {},
      pjChange: [],
      sdChange: [],
      sizeChange: [],
    };
  },
  methods: {
    //获取质量检查类型的全部列表数据将其赋给下拉选择框
    fn_PostTye() {
      this.$axios
        .post("/api/qcCheckCateList")
        .then((res) => {
          this.SelctData = res.data;
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    //点击选择不同的类型执行获取种类数据
    fn_SelectID(value) {
      this.variety = "";
      this.kindList(value);
      this.done = value;
    },
    //执行下拉选择类型的增删改查函数
    fn_dialog(done) {
      this.dialog = true;
      if (done === 0) {
        this.title = this.$t("energy.xz");
        document.getElementById("sunbtn").style.display = "";
        document.getElementById("monbtn").style.display = "none";
        this.cateName = "";
        this.cateCode = "";
        this.cateDesc = "";
      } else if (done === 1) {
        this.title = this.$t("energy.bj");
        document.getElementById("sunbtn").style.display = "none";
        document.getElementById("monbtn").style.display = "";
        this.SelctData.forEach((item) => {
          if (this.done == item.cateId) {
            this.cateName = item.cateName;
            this.cateCode = item.cateCode;
            this.cateDesc = item.cateDesc;
          }
        });
      } else if (done === 2) {
        //点击删除按钮删除检查类型---删除选中的该条数据
        this.dialog = false;
        cofirm(this.$t("energy.sfjx"), this.$t("energy.ts"), {})
          .then(() => {
            this.$axios
              .delete("/api/qcCheckCate?cateId=" + this.value)
              .then((res) => {
                if (res.data.code == 0) {
                  success(this.$t("energy.sccg"));
                  this.fn_PostTye();
                  this.value = "";
                } else {
                  error(this.$t("energy.scsb"));
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: this.$t("energy.yqxsc"),
            });
          });
      }
    },
    //检查类型新增
    fn_addType() {
      this.$axios
        .put(
          "/api/qcCheckCate?cateDesc=" +
            this.cateDesc +
            "&cateId=" +
            this.cateId +
            "&cateName=" +
            this.cateName +
            "&cateCode=" +
            this.cateCode
        )
        .then((res) => {
          if (res.data.code == 0) {
            success(this.$t("energy.xzcg"));
            this.dialog = false;
            this.fn_PostTye();
          } else {
            error(this.$t("energy.xzsb"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
    },
    //检查类型修改--修改当前选中的检查类型
    fn_monType() {
      this.$axios
        .post(
          "/api/qcCheckCate?cateDesc=" +
            this.cateDesc +
            "&cateId=" +
            this.value +
            "&cateName=" +
            this.cateName +
            "&cateCode=" +
            this.cateCode
        )
        .then((res) => {
          if (res.data.code == 0) {
            success(this.$t("energy.xgcg"));
            this.dialog = false;
            this.fn_PostTye();
          } else {
            error(this.$t("energy.xgsb"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
    },

    //==========================//
    //种类数据查询
    kindList(value) {
      this.$axios
        .get("/api/qcCheckKindList?cateId=" + value)
        .then((res) => {
          this.varietyData = res.data.rows;
          this.sortNum(this.varietyData, "sn");
        })
        .catch((err) => {
          error(this.$t("energy.yc"));
        });
      // this.$axios
      //   .get("/api/checkItemInfo?itemOid=" + value)
      //   .then(res => {
      //     this.KinData = res.data;
      //     console.log(this.KinData);
      //     this.sortNum(this.KinData, "sn");
      //   })
      //   .catch(err => {
      //     error(this.$t("energy.yc"));
      //   });
    },
    //种类新增,修改,删除数据之前的数据处理
    fn_kindialog(done) {
      if (this.done) {
        if (done == 0) {
          this.kindialog = true;
          this.title = this.$t("energy.xz");
          document.getElementById("kinsun").style.display = "";
          document.getElementById("kinmon").style.display = "none";
        } else if (done == 1) {
          if (this.kindoid) {
            this.kindialog = true;
            this.title = this.$t("energy.bj");
            document.getElementById("kinsun").style.display = "none";
            document.getElementById("kinmon").style.display = "";
          } else {
            this.kindialog = false;
            warning("请选择一个种类");
          }
        } else if (done == 2) {
          this.kindialog = false;
          cofirm(this.$t("energy.sfjx"), this.$t("energy.ts"), {})
            .then(() => {
              this.$axios
                .delete("/api/qcCheckKind?kindOid=" + this.kindoid)
                .then((res) => {
                  if (res.data.code == 0) {
                    success(this.$t("energy.sccg"));
                    this.kindialog = false;
                    this.value = "";
                  } else {
                    warning(this.$t("energy.scsb"));
                  }
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: this.$t("energy.yqxsc"),
              });
            });
        }
      } else {
        warning("请先选择一个检查项");
      }
    },
    //检查种类新增
    fn_kindAdd() {
      this.$axios
        .put(
          "/api/qcCheckKind?cateId=" +
            this.done +
            "&kindName=" +
            this.kindName +
            "+&sn=" +
            this.kindSn
        )
        .then((res) => {
          if (res.data.code == 0) {
            success(this.$t("energy.xzcg"));
            this.kindialog = false;
          } else {
            error(this.$t("energy.xzsb"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
    },
    //检查种类修改
    fn_kindup() {
      this.$axios
        .post(
          "/api/qcCheckKind?cateId=" +
            this.done +
            "&kindName=" +
            this.kindName +
            "&kindOid=" +
            this.kindoid +
            "&sn=" +
            this.kindSn
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.kindialog = false;
            success(this.$t("energy.xgcg"));
          } else {
            error(this.$t("energy.xgsb"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
    },
    //检查种类下拉选择
    checkVariety(value) {
      this.tbStyle = [];
      this.ckStyle = [];
      this.kindoid = value;
      let checkName = "";
      this.varietyData.forEach((item, index) => {
        if (item.kindOid == value) {
          this.checkPz = item.kindName;
        }
      });

      this.$axios.get("/api/checkItemInfo?kindOid=" + value).then((res) => {
        this.tbData = res.data;
        this.sortNum(this.tbData, "sn");
        let sum = 0;
        let pz = 0;
        let cg = 0;
        if (this.tbData.length > 0) {
          for (let i = 0; i < this.tbData.length; i++) {
            this.sortNum(this.tbData[i].qcItemStandardList, "sn");
            this.$set(this.tbData[i], "readonly", true);
            let num = 0;
            if (this.tbData[i].qcItemStandardList.length > 0) {
              cg += 1;

              for (
                let j = 0;
                j < this.tbData[i].qcItemStandardList.length;
                j++
              ) {
                this.sortNum(
                  this.tbData[i].qcItemStandardList[j].qcScopeRangeList,
                  "sn"
                );
                pz += this.tbData[i].qcItemStandardList[j].qcScopeRangeList
                  .length;
                num += this.tbData[i].qcItemStandardList[j].qcScopeRangeList
                  .length;
                sum += this.tbData[i].qcItemStandardList[j].qcScopeRangeList
                  .length;
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
            if (sum > 0) {
              data = {
                height: sum * 40 + 2 + "px",
                "line-height": sum * 40 + 2 + "px",
              };
            } else {
              data = {
                height: "40px",
                "line-height": "40px",
              };
            }
            this.tbStyle.push(data);
            sum = 0;
          }
        }
        this.pzStyle = {
          height: pz * 40 + cg * 2 + this.tbData.length + "px",
          "line-height": pz * 40 + cg * 2 + this.tbData.length + "px",
        };

        this.pzStyles = {
          margin: (pz * 40) / 2 + "px auto",
        };
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
      this.isCell = !this.isCell;
      //更新项目
      this.pjChange.forEach((item, index) => {
        this.$axios
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
            if (res.data.code == 0) {
              this.pjChange = [];
              // success(this.$t("energy.xgcg"));
            } else {
              error("修改失败" + res);
            }
          })
          .catch((err) => {
            error("修改失败" + err);
          });
      });
      //更新参考方法标准
      this.sdChange.forEach((item, index) => {
        this.$axios
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
              error("修改失败" + res);
            }
          })
          .catch((err) => {
            error("修改失败" + err);
          });
      });
      //更新规格/接受标准
      this.sizeChange.forEach((item, index) => {
        this.$axios
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
              error("修改失败" + res);
            }
          })
          .catch((err) => {
            error("修改失败" + err);
          });
      });

      success("修改成功！");
    },
    Cancel() {
      //取消编辑
      this.isCell = false;
      this.canSave = false;
      if (this.variety != "") {
        this.checkVariety(this.variety);
      }
    },
    //新增按钮
    addBtnClick(value, label) {
      this.activeName = label;
      this.itemDialog = true;
      if (label == "pz") {
        if (value.length == 0) {
          this.project.sn = 1;
        } else {
          this.project.sn = value[value.length - 1].sn + 1;
        }
        this.project.kindOid = value[0].kindOid;
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
      cofirm("此操作将永久删除该检测项目, 是否继续?", "提示", {})
        .then(() => {
          if (label == "project") {
            this.$axios
              .delete("/api/qcCheckItem?itemOid=" + value.itemOid)
              .then((res) => {
                if (res.data.code == 0) {
                  this.checkVariety(this.kindoid);
                  success(this.$t("public.sccg"));
                } else {
                  warning(this.$t("public.scsb") + res.data);
                }
              })
              .catch((err) => {
                console.log(err);
                warning(this.$t("public.scsb") + err);
              });
          }
          if (label == "standard") {
            this.$axios
              .delete(
                "/api/qcItemStandard/v1.0/removeById?id=" + value.standOid
              )
              .then((res) => {
                if (res.data.code == 200) {
                  this.checkVariety(this.kindoid);
                  success(this.$t("public.sccg"));
                } else {
                  warning(this.$t("public.scsb") + res.data);
                }
              })
              .catch((err) => {
                console.log(err);
                warning(this.$t("public.scsb") + err);
              });
          }
          if (label == "size") {
            this.$axios
              .delete("/api/qcScopeRange/v1.0/removeById?id=" + value.scopeOid)
              .then((res) => {
                if (res.data.code == 200) {
                  this.checkVariety(this.kindoid);
                  success(this.$t("public.sccg"));
                } else {
                  warning(this.$t("public.scsb") + res.data);
                }
              })
              .catch((err) => {
                console.log(err);
                warning(this.$t("public.scsb") + err);
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    //切换选项卡
    handleClick() {},
    //新增参考方法标准
    standardSub(form, done) {
      this.$axios
        .post("/api/qcItemStandard/v1.0/save?", form)
        .then((res) => {
          if (res.data.code == 200) {
            this.checkVariety(this.kindoid);
            this.standard.standName = "";
            this.standard.standDesc = "";
            this.standard.standCod = "";
            success("新增成功");
          } else {
            success(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      done();
      this.itemDialog = false;
    },
    sizeSub(form, done) {
      this.$axios
        .post("/api/qcScopeRange/v1.0/save?", form)
        .then((res) => {
          if (res.data.code == 200) {
            this.checkVariety(this.kindoid);
            this.size.scopeName = "";
            this.size.rangeAccept = "";
            success("新增成功");
          } else {
            success("新增成功" + res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      done();
      this.itemDialog = false;
    },
    projectSub(form, done) {
      this.$axios
        .put("/api/qcCheckItem?", form)
        .then((res) => {
          if (res.data.code == 0) {
            this.checkVariety(this.kindoid);
            this.project.supportEquipment = "";
            this.project.itemName = "";
            this.project.standCod = "";
            this.project.itemDesc = "";
            success("新增成功");
          } else {
            success("新增失败" + res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      done();
      this.itemDialog = false;
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
  created() {
    this.fn_PostTye();

    //判断表格数据为空时新增按钮不可见
    // this.KinData.length == 0
    //   ? (this.KindgridOption.addRowBtn = false)
    //   : (this.KindgridOption.addRowBtn = true);
  },
};
</script>

<style lang="stylus">
#Quality {
  .handleDl {
    position: absolute;
    width: 10%;
    height: 40px;
    top: 0;
    right: 0;
    z-index: 2;
    // background: rgba(0, 0, 0, 0.6);
    // background: #409EFF;
    font-size: 16px;
    color: #409EFF;
    cursor: pointer;
    opacity: 0.8;
  }

  .handleDl1 {
    // background: rgba(0, 0, 0, 0.6);
    // background: #409EFF;
    font-size: 16px;
    color: #409EFF;
    cursor: pointer;
    opacity: 0.8;
  }

  .content {
    border-bottom: 1px solid #ccc;
  }

  .rowHead {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    background: #f4f4f4;
    border: 1px solid #ccc;
    margin-left: -1px;

    .el-col {
      height: 40px;
      line-height: 40px;
      border-right: 1px solid #ccc;
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
    border: 1px solid #ccc;
  }

  .pzCont {
    height: 100%;
    line-height: 50%;
  }

  .tbBox {
    padding: 10px 10px 20% 10px;
    margin-bottom: 20%;
    min-height: 800px;
    min-width: 800px;

    .el-input {
      width: 90%;
    }
  }

  .tbBtn {
    margin: 10px 10px 0 10px;
    text-align: left;
  }

  .nullStyle {
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #ccc;
    margin-left: -0.5px;
  }

  .xmStyle {
    height: 40px;
    // line-height: 40px;
    border-right: 1px solid #cccccc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .readonlys {
    border: none;
  }

  .btn {
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #cccccc;
  }

  .btns {
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
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
      border-bottom: 1px solid #cccccc;

      .ffStyle {
        border-right: 1px solid #ccc;
        margin-left: -1px;
        // border-top: 1px solid #ccc;
        // margin-top: -1px;
      }

      .contentList {
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
        margin-top: -1px;

        .cdiv {
          height: 40px;
          line-height: 40px;
          text-align: center;
          margin-left: -0.5px;
        }

        .cdiv:last-child {
          border-bottom: none;
        }
      }

      .contentList:last-child {
      }

      .el-input__inner {
        height: 30px;
        line-height: 30px;
        margin: 5px 0;
        text-align: center;
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

  .Quality .head-left {
    margin: 0 0 0 0;
    padding: 10px;
    text-align: left;
  }

  .head-left button {
    height: 30px;
    padding: 0 12px;
  }

  .left {
    margin: 20px 0;
  }

  .Quality .right-main {
    margin: 95px 0 0 10px;
    background-color: #fff;
    height: 350px;
  }

  .tab-top {
    letter-spacing: 2px;
    font-size: 14px;
  }

  .out-tab {
    text-align: center;
    font-size: 14px;
    min-height: 40px;
    padding: 10px;
    border-collapse: collapse;
    border-top: 1px solid #ccc;
  }

  // .el-dialog__header {
  // height: 0;
  // padding: 0;
  // }
  .el-dialog__body {
    padding: 10px;
  }
}
</style>