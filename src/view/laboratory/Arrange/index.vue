<template>
  <div id="Arrange">
    <!-- 选项卡 -->
    <el-tabs v-model="activeName" type="border-card" v-loading="wLoading">
      <el-tab-pane
        :label="$t('menuData.Laboratory[3].data.blmx')"
        name="second"
      >
        <el-row class="queryForm">
          <div class="btnList">
            <el-button type="primary" @click="Giveadd(checkData)">{{
              $t("ProWorkflowInfo.scsbd")
            }}</el-button>
          </div>
        </el-row>
        <avue-crud
          :data="ArData"
          :option="ArOption"
          @row-click="handleRowClick"
          :page.sync="arPage"
          @on-load="ArList"
          @row-dblclick="Giveadd(checkData)"
        ></avue-crud>

        <!-- 生成送板单 -->
        <el-dialog
          title
          :visible.sync="dialogVisible"
          v-loading="loading"
          append-to-body
          fullscreen
        >
          <view-container title="生成送板单" v-if="dialogVisible">
            <div class="btnList">
              <el-button type="success" @click="handleSubmit(form)">{{
                this.$t("public.save")
              }}</el-button>
              <el-button type="warning" @click="dialogVisible = false">{{
                $t("public.close")
              }}</el-button>
            </div>
            <div
              class="formBox"
              style="margin-top: 10px; height: calc(100vh - 130px)"
            >
              <avue-form
                ref="addSbd"
                :option="option"
                v-model="form"
                @submit="submit"
              ></avue-form>
            </div>
          </view-container>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane :label="$t('menuData.Laboratory[3].data.sbd')" name="first">
        <el-row class="queryForm">
          <div class="btnList">
            <el-button type="success" size="mini" @click="editor">{{
              this.$t("public.update")
            }}</el-button>
            <el-button type="danger" size="mini" @click="del(checkData2)">{{
              this.$t("public.del")
            }}</el-button>
            <!-- <el-button type="primary" @click="openDialog(checkData2)">
              <span class="btnTle">{{ $t("ProWorkflowInfo.scpf") }}</span>
            </el-button> -->
          </div>
        </el-row>

        <avue-crud
          ref="Give"
          :data="GiveData"
          :option="GiveOption"
          @row-click="handleRowClick2"
          @row-dblclick="editor"
          :page.sync="givePage"
          @on-load="GiveList"
        ></avue-crud>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="dialogTableVisible"
      @close="closeDialg"
      fullscreen
      class="ldDlg"
    >
      <router-view to="ldRecipeChild" />
    </el-dialog>
  </div>
</template>

<script>
import {
  getVLabArranRd,
  getCustomerSample,
  addCustomerSample,
  updateCustomerSample,
  delLabCustomerSample,
} from "./api";
import { getUcmlUser } from "@/const/whse.js";
import { baseCodeSupply, baseCodeSupplyEx } from "@/api/index";
import { getDIC, getDicT, getXDicT, postDicT } from "@/config";
import { cofirm2, success, warning, error } from "@/seal/seal"; // 引入封装的消息提示和弹框组件
import { Data_Width, label_Width, timeConversion } from "@/seal/gridOption"; // 时间格式转化、表头宽度控制
export default {
  data() {
    return {
      activeName: "second", // 选项卡默认状态
      ArData: [], // 办布布料明细单数据
      data: [],
      arPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      //   办布布料明细单配置
      ArOption: {
        menuAlign: "center",
        columnBtn: false,
        delBtn: false,
        addBtn: false,
        editBtn: false,
        refreshBtn: false,
        menuWidth: 150,
        height: "calc(100vh - 160px)",
        menu: false,
        labelWidth: 110,
        border: true,
        highlightCurrentRow: true,
        column: [
          {
            label: "Sal_ArrangeCloth_dtlaOID",
            prop: "salArrangeclothDtlaoid",
            width: 600,
            hide: true,
            display: false,
          },
          {
            label: "订单布料明细FK",
            prop: "salPoDtlaFk",
            width: 200,
            hide: true,
            display: false,
          },
          {
            label: "生产通知单-办布FK",
            prop: "salArrangeclothFk",
            width: 250,
            hide: true,
            display: false,
          },
          {
            label: "BOM面料资料FK",
            prop: "salBomFabricFk",
            width: 225,
            hide: true,
            display: false,
          },
          {
            label: "#",
            prop: "index",
            width: 50,
            align: "center",
          },
          {
            label: "订单号",
            prop: "poNo",
            width: 150,
          },
          {
            label: "染单号",
            prop: "dyeingSheetno",
            width: 150,
          },
          {
            label: "客户",
            prop: "custId",
            width: 100,
            type: "select",
            dicData: getDicT("basCustomer", "custSname", "custCode"),
          },
          {
            label: this.$t("menuData.Laboratory[3].data.fabId"),
            prop: "fabId",
            width: 100,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.colorName"),
            prop: "colorName",
            width: 110,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.colorSource"),
            prop: "colorSource",
            width: 100,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.custColorNo"),
            prop: "custColorNo",
            width: 100,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.dyeColorNo"),
            prop: "dyeColorNo",
            width: 120,
          },
          {
            label: "OK色号",
            prop: "okColorNo",
            width: 90,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.fabQty"),
            prop: "colorQty",
            width: 80,
            align: "right",
          },
          {
            label: this.$t("menuData.Laboratory[3].data.qtyUnit"),
            prop: "fabUnit",
            width: 100,
            type: "select",
            dicData: getDIC("sal_fabUnit"),
          },
          // {
          //   label: this.$t("menuData.Laboratory[3].data.pinNumber"),
          //   prop: "pinNumber",
          //   width: 80,
          // },
          // {
          //   label: this.$t("menuData.Laboratory[3].data.inchNumber"),
          //   prop: "inchNumber",
          //   width: 80,
          // },
          // {
          //   label: this.$t("menuData.Laboratory[3].data.fabBreadth"),
          //   prop: "fabBreadth",
          //   width: 125,
          // },
          // {
          //   label: this.$t("menuData.Laboratory[3].data.qtyUnit"),
          //   prop: "breadthUnit",
          //   width: 100,
          // },
          // {
          //   label: this.$t("menuData.Laboratory[3].data.gramWeight"),
          //   prop: "gramWeight",
          //   width: 80,
          // },
          // {
          //   label: this.$t("menuData.Laboratory[3].data.lateralShrink"),
          //   prop: "lateralShrink",
          //   width: 80,
          // },
          // {
          //   label: this.$t("menuData.Laboratory[3].data.verticalShrink"),
          //   prop: "verticalShrink",
          //   width: 80,
          // },
          // {
          //   label: this.$t("menuData.Laboratory[3].data.twistDegrees"),
          //   prop: "twistDegrees",
          //   width: 80,
          // },
          // {
          //   label: this.$t("menuData.Laboratory[3].data.slopeDegrees"),
          //   prop: "slopeDegrees",
          //   width: 80,
          // },
          // {
          //   label: this.$t("menuData.Laboratory[3].data.fabYcount"),
          //   prop: "fabName",
          //   // width: 400,
          // },
        ],
      },
      dialogVisible: false, // 弹出笼罩蒙版状态
      form: {},
      // 生成送板单单配置
      option: {
        labelWidth: 130,
        emptyText: this.$t("energy.qk"),
        submitText: this.$t("energy.bc"),
        border: true,
        column: [
          {
            label: "送办编号",
            prop: "sampleCode",
            width: 150,
            span: 6,
            disabled: true,
            rules: [
              {
                required: true,
                message: "请输入送办编号",
                trigger: "blur",
              },
            ],
          },

          {
            label: this.$t("ProWorkflowInfo.dsblx"),
            prop: "sampleType",
            width: 125,
            span: 6,
            type: "select",
            dicData: getDIC("lab_sampleType"),
            rules: [
              {
                required: true,
                message: "请选择送办编号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "订单号",
            prop: "salPoNo",
            span: 6,
            disabled: true,
            placeholder: " ",
          },
          {
            label: "客色号",
            prop: "custColorNo",
            width: 150,
            span: 6,
            disabled: true,
            placeholder: " ",
          },
          {
            label: "已打办的版本",
            prop: "colorVersList",
            span: 6,
            placeholder: " ",
            disabled: true,
          },

          {
            label: "颜色名称",
            prop: "colorName",
            span: 6,
            disabled: true,
            placeholder: " ",
          },

          {
            label: "染厂色号",
            prop: "colorNo",
            span: 6,
            disabled: true,
            placeholder: " ",
          },
          {
            label: "ok色号",
            prop: "okColor",
            span: 6,
            disabled: true,
            placeholder: " ",
          },
          {
            label: "送办的版本号",
            prop: "colorVers",
            span: 6,
            type: "select",
            multiple: true,
            props: {
              label: "typeNo",
              value: "typeNo",
            },
            dicData: [],
            rules: [
              {
                required: true,
                message: "请选择送办的版本号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "打办日期",
            prop: "madeSampleDate",
            width: 100,
            type: "datetime",
            span: 6,
            disabled: true,
            placeholder: " ",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          {
            label: "送办日期",
            prop: "sendSampleDate",
            width: 100,
            type: "datetime",
            span: 6,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "请输入送办日期",
                trigger: "blur",
              },
            ],
          },

          {
            label: "同意送办日期",
            prop: "agreeSampleDate",
            width: 100,
            type: "datetime",
            span: 6,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          {
            label: "客户意见",
            prop: "agreeDesc",
            span: 18,
          },
          {
            label: "同意状态",
            prop: "agreeState",
            span: 6,
            type: "select",
            dicData: [
              {
                label: "待确认",
                value: "2",
              },
              {
                label: "同意",
                value: "1",
              },
              {
                label: "不同意",
                value: "0",
              },
            ],
            row: true,
          },
          {
            label: "成本价",
            prop: "costPrice",
            span: 6,
          },
          {
            label: "生产价格",
            prop: "madePrice",
            span: 6,
          },
          {
            label: "布料生产厂家",
            prop: "clothFactory",
            span: 6,
            type: "tree",
            dicData: getDicT("basSupplier", "suppName", "basSupplieroid"),
            rules: [
              {
                required: true,
                message: "请选择布料生产厂家",
                trigger: "blur",
              },
            ],
          },
          {
            label: "布料批号",
            prop: "clothLotCode",
            span: 6,
            rules: [
              {
                required: true,
                message: "请输入布料批号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "创建时间",
            prop: "createTime",
            width: 100,
            type: "datetime",
            span: 6,
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            hide: true,
            display: false,
          },

          {
            label: this.$t("energy.cjr"),
            prop: "creator",
            width: 75,
            disabled: true,
            span: 6,
            // type: "select",
            display: false,
            // dicData: postDicT("ucmlUserList", "employeename", "ucmlUseroid"),
          },
        ],
      },
      GiveData: [], // 送板单表数据
      // 送板单表配置
      GiveOption: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 160px)",
        refreshBtn: false,
        columnBtn: false,
        page: true,
        column: [
          {
            prop: "index",
            label: "#",
            width: 50,
            align: "center",
          },
          {
            label: "送办编号",
            prop: "sampleCode",
            width: 130,
          },
          // {
          //   label: "客色号",
          //   prop: "custColorNo",
          //   width: 150,
          //   span: 8,
          // },
          {
            label: "订单号",
            prop: "salPoNo",
            width: 140,
          },
          {
            label: this.$t("ProWorkflowInfo.dsblx"),
            prop: "sampleType",
            width: 110,
            type: "select",
            dicData: getDIC("lab_sampleType"),
          },
          {
            label: "颜色名称",
            prop: "colorName",
            width: 90,
          },

          {
            label: "染厂色号",
            prop: "colorNo",
            width: 120,
          },
          {
            label: "ok色号",
            prop: "okColor",
            width: 80,
          },
          {
            label: "送办版本",
            prop: "colorVers",
            width: 90,
          },
          {
            label: "成本价",
            prop: "costPrice",
            width: 80,
            align: "right",
          },
          {
            label: "生产价格",
            prop: "madePrice",
            align: "right",
            width: 90,
          },
          {
            label: "打办日期",
            prop: "madeSampleDate",
            width: 120,
            type: "datetime",
            align: "center",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          {
            label: "送办日期",
            prop: "sendSampleDate",
            width: 120,
            type: "datetime",
            align: "center",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },

          {
            label: "同意送办日期",
            prop: "agreeSampleDate",
            width: 120,
            type: "datetime",
            align: "center",
            display: false,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },

          {
            label: "同意状态",
            prop: "agreeState",
            width: 90,
            type: "select",
            dicData: [
              {
                label: "待确认",
                value: "2",
              },
              {
                label: "同意",
                value: "1",
              },
              {
                label: "不同意",
                value: "0",
              },
            ],
          },
          {
            label: "布料生产厂家",
            prop: "clothFactory",
            width: 220,
            type: "select",
            dicData: getDicT("basSupplier", "suppName", "basSupplieroid"),
          },
          {
            label: "布料批号",
            prop: "clothLotCode",
            width: 140,
          },
          {
            label: "客户意见",
            prop: "agreeDesc",
            width: 500,
          },
          {
            label: "创建时间",
            prop: "createTime",
            width: 100,
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            hide: true,
          },

          {
            label: this.$t("energy.cjr"),
            prop: "creator",
            width: 110,
            disabled: true,
            display: true,
            hide: true,
            type: "select",
            dicData: postDicT("ucmlUserList", "employeename", "ucmlUseroid"),
          },
        ],
      },
      givePage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      dialogTableVisible: false,
      checkData: {},
      checkData2: {},
      oldData: {},
      ucmlUseroid: "",
      loading: false,
      wLoading: false,
      ldData: [],
    };
  },
  methods: {
    // 办布布料明细单查询
    ArList() {
      this.wLoading = true;
      // this.$http
      //   .get("/api/vLabArranRd/page", {
      //     page: this.arPage.currentPage,
      //     rows: this.arPage.pageSize,
      //   })
      getVLabArranRd({
        start: this.arPage.currentPage,
        rows: this.arPage.pageSize,
      })
        .then((res) => {
          this.ArData = res.data.records;
          this.ArData.forEach((item, i) => {
            item.index = i + 1;
          });
          this.arPage.total = res.data.total;
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        })
        .catch((err) => {
          this.wLoading = false;
          error("服务器跑丢啦~");
        });
    },
    // 送办单查询
    GiveList() {
      this.wLoading = true;
      getCustomerSample({
        rows: this.givePage.pageSize,
        start: this.givePage.currentPage,
      })
        .then((res) => {
          this.GiveData = res.data.records;
          this.givePage.total = res.data.total;
          this.GiveData.forEach((item, i) => {
            item.index = i + 1;
          });
          this.$refs.Give.setCurrentRow();
          this.checkData2 = {};
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        })
        .catch((err) => {
          this.wLoading = false;
          error("服务器跑丢啦~");
        });
    },
    handleRowClick(row) {
      this.checkData = row;
    },
    // 生成送板单之前将色号等数据进行处理
    Giveadd(row) {
      // if (!row.salArrangeclothFk) {
      //   warning("请点击要编辑的数据");
      // } else {
      if (Object.keys(row).length === 0) {
        error("请先选择数据!");
        return;
      }
      baseCodeSupplyEx({ code: "LAB_ARRAN" }).then((res) => {
        this.option.column[8].dicData = [];
        this.form = row; // 染厂色号
        // this.form.salArrangeclothoid = row.salArrangeclothFk; // 办布通知单OID
        // this.form.salArrangeclothDtlaoid = row.salArrangeclothDtlaoid; // 办布通知明细OID
        this.form.salPoNo = row.poNo;
        this.form.okColor = row.okColorNo;
        this.form.colorNo = row.dyeColorNo;
        this.form.salPoDtlaFk = row.salPoDtlaoid; // 订单布料明细FK
        this.form.salBomFabricFk = row.salBomFabricFk; // BOM面料资料_FK
        this.form.creator = this.ucmlUseroid;
        this.form.madeSampleDate = timeConversion(new Date());
        this.form.agreeState = "2";
        this.form.sampleCode = res.data.data;
        this.getColorV();
        this.dialogVisible = true;
      });
      // }
    },
    async getColorV() {
      const data = await this.$http.get(
        "/api/labTapcolor?colorNo=" + this.form.colorNo
      );
      if (data.data.length === 0) {
        this.option.column[8].dicData = [];
        return;
      }
      const salLd = await this.$http.get(
        "/api/salLdNotice?labTapcolorFk=" + data.data[0].labTapcoloroid
      );
      if (salLd.data.length === 0) {
        this.option.column[8].dicData = [];
        return;
      }
      const salLdDtl = await this.$http.get(
        "/api/salLdNoticeDtld?salLdNoticeFk=" + salLd.data[0].salLdNoticeoid
      );
      this.form.colorVersList = salLd.data[0].runcolorType;

      salLdDtl.data = salLdDtl.data.sort((a, b) => {
        return a.typeNo.charCodeAt(0) - b.typeNo.charCodeAt(0);
      });
      this.option.column[8].dicData = salLdDtl.data;
      // 获取已打办的记录
    },
    // 提交生成板单数据
    handleSubmit(form) {
      this.$refs.addSbd.submit();
    },
    submit(form, done) {
      if (form.sampleId) {
        // update
        updateCustomerSample(form)
          .then((res) => {
            if (res.data.code === 200) {
              this.GiveList();
              success(this.$t("public.bccg"));
              done();
            } else {
              error("保存失败!");
              done();
            }
          })
          .catch((e) => {
            error("服务器错误" + e);
            done();
          });
      } else {
        // update
        form.createTime = timeConversion(new Date());
        let data = "";
        form.colorVers.forEach((item, i) => {
          if (i === form.colorVers.length - 1) {
            data += item + "";
          } else {
            data += item + ",";
          }
        });
        form.colorVers = data;
        addCustomerSample(form)
          .then((res) => {
            if (res.data.code === 200) {
              this.form.sampleId = res.data.data;
              this.GiveList();
              baseCodeSupply({ code: "LAB_ARRAN" }).then((res) => {});
              success(this.$t("public.bccg"));
              done();
            } else {
              error("保存失败!");
              done();
            }
          })
          .catch((e) => {
            error("服务器错误" + e);
            done();
          });
      }
    },
    editor() {
      if (Object.keys(this.checkData2).length === 0) {
        error("请选择修改的数据!");
        return;
      }
      this.option.column[8].dicData = [];
      this.form = this.checkData2;
      this.getColorV();
      this.dialogVisible = true;
    },
    // 删除
    del(row) {
      if (!row.sampleId) {
        error("请点击要删除的数据");
        return;
      }
      cofirm2(this.$t("energy.sfjx"), this, {})
        .then(() => {
          delLabCustomerSample(row.sampleId)
            .then((res) => {
              if (res.data.code == 200) {
                success(this.$t("public.sccg"));
                this.GiveList();
              } else {
                warning(this.$t("public.scsb"));
              }
            })
            .catch((err) => {
              error(this.$t("public.scsb"));
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 打开生成配方
    openDialog(row, index) {
      if (!row.schId) {
        warning("请点击要删除的数据");
        return;
      }
      this.dialogTableVisible = true;
      sessionStorage.setItem("dialogTableVisible1", this.dialogTableVisible);
      this.$router.push({ path: "ArranChild", query: { data: row } });
      let colorInfo = [];
      let colorList = [];
      let isIn = 0; // 判断是否存在色号信息
      let colorData = {
        salColorid: row.dyeColorNo,
        salColornumber: "00001",
      };
      // 获取色号信息
      this.$http
        .post("/api/salColorList")
        .then((res) => {
          colorList = res.data;
          for (let index = 0; index < colorList.length; index++) {
            if (colorList[index].salColorid == row.dyeColorNo) {
              isIn = 1;
            }
          }
          if (isIn == 0) {
            // 新增色号信息
            this.$http
              .put("/api/salColor", colorData)
              .then((res) => {})
              .catch((err) => {
                error("服务器错误");
              });
          }
        })
        .catch((err) => {
          error("服务器错误");
        });
      setTimeout(() => {
        this.$http
          .post("/api/salColorList")
          .then((res) => {
            for (let index = 0; index < res.data.length; index++) {
              if (
                res.data[index].salColorid == colorData.salColorid &&
                res.data[index].salColornumber == colorData.salColornumber
              ) {
                colorInfo.push(res.data[index]);
                // 保存颜色OID
                let selectdata = row.runcolorType.split(",");
                // 新增版本信息
                if (isIn == 0) {
                  for (let index = 0; index < selectdata.length; index++) {
                    let data = {
                      salColoroid: colorInfo[0].salColoroid,
                      sn: index,
                      verCode: selectdata[index],
                      verName: selectdata[index],
                    };
                    this.$http.put("/api/salColorVer", data).then((res) => {});
                  }
                }
                continue;
              }
            }
          })
          .catch((err) => {
            error("服务器错误");
          });
      }, 1000);
    },
    closeDialg() {
      // 生成配方页面，返回办布送板页面
      this.$router.push({ path: "Arran" });
      this.dialogTableVisible = false;
      sessionStorage.removeItem("dialogTableVisible1");
    },
    handleRowClick2(val) {
      this.checkData2 = val;
    },
    handledbRowClick() {},
  },
  created() {
    getUcmlUser({ usrLogin: parent.userID }).then((Res) => {
      this.ucmlUseroid = Res.data.ucmlUseroid; // 获取用户Id
    });
  },
  mounted() {},
};
</script>

<style lang="stylus">
#Arrange {
  .el-dialog__headerbtn {
    z-index: 99 !important;
  }

  .ldDlg {
    .el-dialog__header {
      padding: 0 !important;
      height: 0 !important;
    }
  }
}
</style>
