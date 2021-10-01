<template>
  <div id="ldDrawDesign">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane :label="$t('ProWorkflowInfo.lddy')" name="first">
        <el-row class="queryForm">
          <div class="btnList">
            <el-button type="primary" size="mini" @click="edit">编辑</el-button>
            <el-button type="primary" size="mini" @click="del">删除</el-button>
            <el-button type="primary" size="mini" @click="openDialog">{{
              $t("ProWorkflowInfo.scpf")
            }}</el-button>
          </div>
        </el-row>
        <el-row class="crudBox">
          <avue-crud
            ref="firstCrud"
            :data="isData"
            :option="isOption"
            v-model="isObj"
            @row-update="update"
            @row-del="del"
            @row-click="handleRowClick"
          ></avue-crud>
        </el-row>
        <el-dialog
          :visible.sync="dialogTableVisible"
          @close="closeDialg"
          fullscreen
        >
          <router-view to="ldDrawDesignChild" />
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane :label="$t('ProWorkflowInfo.dsc')" name="second">
        <el-row class="queryForm">
          <div class="btnList">
            <el-button type="primary" size="mini" @click="sendFirstData">{{
              $t("ProWorkflowInfo.scLD")
            }}</el-button>
          </div>
        </el-row>
        <avue-crud
          :data="orderData"
          :option="option2"
          v-model="obj"
          @row-dblclick="handleRowDBLClick"
          @row-click="handleRowClick2"
          ref="table"
        >
          <!-- <template slot-scope="scope" slot="menu">
              <el-button
                icon="el-icon-check"
                type="primary"
                size="small"
                @click="handleRowDBLClick(scope.row)"
              >{{ $t("ProWorkflowInfo.generate") }}</el-button>
            </template>-->
        </avue-crud>
      </el-tab-pane>
      <el-dialog
        title=" "
        :visible.sync="dialogVisible"
        center
        width="90%"
        class="dialogS"
      >
        <el-row style="margin-top: 10px">
          <avue-form ref="form" v-model="formObj" :option="formOption">
            <template>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formObj.schStart"
                style="width: 33.3333%"
              ></el-date-picker>
            </template>
          </avue-form>

          <div style="padding: 10px">
            <el-button @click="dialogVisible = false">
              {{ $t("ProWorkflowInfo.cancel") }}
            </el-button>
            <el-button type="primary" @click="sendData">
              {{ $t("ProWorkflowInfo.submit") }}
            </el-button>
          </div>
        </el-row>
      </el-dialog>
    </el-tabs>
  </div>
</template>

<script>
import { cofirm2, success, warning, error } from "@/seal/seal"; //引入封装的消息提示和弹框组件
// import { Data_Width, label_Width, isDate } from "@/seal/gridOption";
export default {
  name: "ldDrawDesign",
  data() {
    return {
      activeName: "first",
      isData: [],
      //LD打样
      isOption: {
        page: false,
        // align: "center",
        menuAlign: "center",
        refreshBtn: false,
        menu: false,
        dialogWidth: "80%",
        dialogHeight: "100%",
        columnBtn: false,
        height: 580,
        menuWidth: 130,
        addBtn: false,
        labelWidth: 120,
        border: true,
        highlightCurrentRow: true,
        column: [
          {
            label: "生产排期ID",
            prop: "schId",
            hide: true,
            addDisplay: false,
            editDisplay: false,
          },

          {
            label: this.$t("ProWorkflowInfo.scpqmc"),
            prop: "schName",
            width: 120,
            span: 8,
          },

          {
            label: this.$t("ProWorkflowInfo.dybh"),
            prop: "ldCode",
            span: 8,
            readonly: true,
            width: 220,
            overHidden: true,
          },
          {
            label: this.$t("ProWorkflowInfo.dsblx"),
            // label: "打色板类型",
            prop: "runcolorType",
            width: 110,
            span: 8,
            readonly: true,
          },
          {
            label: this.$t("ProWorkflowInfo.rcsh"),
            prop: "dyeColorNo",
            span: 8,
            readonly: true,
            width: 120,
          },
          {
            label: this.$t("ProWorkflowInfo.scsl"),
            prop: "proAmount",
            span: 8,
            width: 110,
            align: "right",
          },
          {
            label: this.$t("ProWorkflowInfo.sldw"),
            prop: "proUnit",
            span: 8,
            width: 110,
          },
          {
            label: this.$t("ProWorkflowInfo.kssj"),

            prop: "schStart",
            span: 8,
            type: "datetime",
            width: 150,
          },
          {
            label: this.$t("ProWorkflowInfo.xcsj"),
            // label: "完成时间",
            prop: "schEnd",
            span: 8,
            type: "datetime",
            width: 150,
          },
          // {
          //   label: this.$t("ProWorkflowInfo.cjsj"),
          //   prop: "createTime",
          //   span: 8,
          //   type: "datetime",
          //   width: 150,
          // },
          {
            label: this.$t("ProWorkflowInfo.cjsr"),
            label: "创建人",
            prop: "creator",
            span: 8,
          },
          {
            label: this.$t("ProWorkflowInfo.scpqmc"),
            label: "对应的LD通知单信息ID",
            prop: "salLdNoticeoid",
            hide: true,
            addDisplay: false,
            editDisplay: false,
          },
          {
            label: this.$t("ProWorkflowInfo.scpqmc"),
            label: "订单布料明细_FK",
            prop: "salPoDtlaFk",
            hide: true,
            addDisplay: false,
            editDisplay: false,
          },
        ],
      },
      isObj: {},
      orderData: [],
      tbData: [],
      formObj: {},
      obj: {},
      option1: {
        page: false,
        align: "center",
        menuAlign: "center",
        refreshBtn: false,
        menu: true,
        dialogWidth: "100%",
        dialogHeight: "100%",
        dialogTop: 10,
        columnBtn: false,
        height: 580,
        addBtn: false,
        dialogEscape: true,
        selection: true,
        // addBtn: false,
        column: [
          {
            label: "订单明细ID",
            prop: "salPoDtlaoid",
            hide: true,
            editDisplay: false,
          },
          {
            label: "布料编号",
            prop: "fabId",
          },
          {
            label: "布料名称",
            prop: "fabName",
          },
          {
            label: "颜色",
            prop: "colorName",
          },
          {
            label: "颜色来源",
            prop: "colorSource",
          },
          {
            label: "客人色号",
            prop: "custColorNo",
            editDisplay: false,
            hide: true,
          },
          {
            label: "染厂色号",
            prop: "dyeColorNo",
          },
          {
            label: "数量",
            prop: "fabQty",
          },
          {
            label: "数量单位",
            prop: "qtyUnit",
          },
          {
            label: "单价",
            prop: "unitPrice",
          },
          {
            label: "币种",
            prop: "currencyType",
          },
          {
            label: "针数",
            prop: "pinNumber",
          },
          {
            label: "吋数",
            prop: "inchNumber",
          },
          {
            label: "幅宽/布封",
            prop: "fabBreadth",
          },
          {
            label: "布封单位",
            prop: "breadthUnit",
          },
          {
            label: "克重",
            prop: "gramWeight",
          },
          {
            label: "横缩",
            prop: "lateralShrink",
          },
          {
            label: "直缩",
            prop: "verticalShrink",
          },
          {
            label: "扭度",
            prop: "twistDegrees",
          },
          {
            label: "斜度",
            prop: "slopeDegrees",
          },
          {
            label: "布料类型",
            prop: "fabType",
          },
          {
            label: "加工类型",
            prop: "processType",
          },
          {
            label: "布料描述",
            prop: "fabYcount",
            width: 120,
          },
          {
            label: "总成份",
            prop: "fabComponents",
            width: 150,
          },
          {
            label: "布种",
            prop: "fabFabrics",
          },
          {
            label: "单价单位",
            prop: "priceUnit",
          },
          {
            label: "订单资料_FK",
            prop: "salPoFk",
            hide: true,
            editDisplay: false,
          },
          {
            label: "面料资料_FK",
            prop: "salBomFabricFk",
            hide: true,
            editDisplay: false,
          },
          {
            label: "颜色定义_FK",
            prop: "Sal_bom_fabric_dtle_FK",
            hide: true,
            editDisplay: false,
          },
        ],
      },
      option2: {
        page: false,
        align: "center",
        menuAlign: "center",
        refreshBtn: false,
        menu: false,
        updateBtn: false,
        delBtn: false,
        editBtn: false,
        menuWidth: 100,
        dialogWidth: "100%",
        dialogHeight: "100%",
        dialogTop: 10,
        columnBtn: false,
        height: 580,
        addBtn: false,
        dialogEscape: true,
        highlightCurrentRow: true,
        column: [
          {
            label: "Sal_LD_NoticeOID",
            prop: "salLdNoticeoid",
            hide: true,
            editDisplay: false,
          },
          {
            label: "创建日期",
            prop: "sysCreated",
            hide: true,
          },
          {
            label: "最后修改日期",
            prop: "sysLastUpd",
            hide: true,
          },
          {
            label: "记录删除标记",
            prop: "sysDeleted",
            hide: true,
          },
          {
            label: this.$t("menuData.Laboratory[2].data.dbbh"),
            prop: "runNo",
            width: 180,
          },
          {
            label: "下办日期",
            prop: "rundwownDate",
            hide: true,
          },
          {
            label: "交办日期",
            prop: "handoverDate",
            hide: true,
          },
          {
            label: this.$t("menuData.Laboratory[2].data.skyq"),
            prop: "colorRequest",
            type: "select",
            dicData: [
              {
                value: "1",
                label: "断纱",
              },
              {
                value: "2",
                label: "不断纱",
              },
            ],
          },
          {
            label: this.$t("menuData.Laboratory[2].data.pc"),
            prop: "batch",
          },
          {
            label: this.$t("menuData.Laboratory[2].data.dbbgs"),
            prop: "runcolorQty",
            width: 150,
          },
          {
            label: this.$t("menuData.Laboratory[2].data.isbb"),
            prop: "isCloth",
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
            label: this.$t("menuData.Laboratory[2].data.dbbType"),
            prop: "runcolorType",
            width: 150,
          },
          {
            label: "创建用户",
            prop: "sysCreatedby",
            hide: true,
          },
          {
            label: "授权用户",
            prop: "sysReplacement",
            hide: true,
          },
          {
            label: "所属岗位",
            prop: "sysPostn",
            hide: true,
          },
          {
            label: "所属部门",
            prop: "sysDivision",
            hide: true,
          },
          {
            label: "所属组织",
            prop: "sysOrg",
            hide: true,
          },
          {
            label: "最后修改用户",
            prop: "sysLastUpdBy",
            hide: true,
          },
          {
            label: "订单资料_FK",
            prop: "salPoFk",
            hide: true,
            editDisplay: false,
          },
          {
            label: "订单布料明细_FK",
            prop: "salPoDtlaFk",
            hide: true,
            editDisplay: false,
          },
        ],
      },
      formOption: {
        label: "",
        emptyBtn: false,
        submitBtn: false,
        labelWidth: 100,
        column: [
          // 生产排期 ID
          {
            label: this.$t("ProWorkflowInfo.scpqid"),
            prop: "schId",
            span: 8,
            readonly: true,
            display: false,
          },
          // 生产数量
          {
            label: this.$t("ProWorkflowInfo.scsl"),
            prop: "proAmount",
            span: 8,
            readonly: true,
          },
          {
            label: this.$t("ProWorkflowInfo.scpqmc"),
            prop: "schName",
            span: 8,
          },
          {
            label: this.$t("ProWorkflowInfo.sldw"),
            prop: "proUnit",
            span: 8,
            readonly: true,
          },
          {
            label: this.$t("ProWorkflowInfo.dybh"),
            prop: "ldCode",
            span: 8,
            readonly: true,
          },
          {
            label: this.$t("ProWorkflowInfo.dsblx"),
            prop: "runcolorType",
            span: 8,
            readonly: true,
          },
          {
            label: this.$t("ProWorkflowInfo.rcsh"),
            prop: "dyeColorNo",
            span: 8,
            readonly: true,
          },
          {
            label: this.$t("ProWorkflowInfo.kssj"),
            prop: "schStart",
            type: "datetime",
            span: 8,
          },
          {
            label: this.$t("ProWorkflowInfo.xcsj"),
            prop: "schEnd",
            span: 8,
            type: "datetime",
          },
          {
            label: this.$t("ProWorkflowInfo.cjsj"),
            prop: "createTime",
            span: 8,
            type: "datetime",
          },
          {
            label: this.$t("ProWorkflowInfo.cjsr"),
            prop: "creator",
            span: 8,
          },
          {
            label: this.$t("ProWorkflowInfo.dyid"),
            prop: "salLdNoticeoid",
            span: 8,
            display: false,
          },
          {
            label: this.$t("ProWorkflowInfo.ddblmx") + "_FK",
            prop: "salPoDtlaFk",
            span: 8,
            display: false,
          },
        ],
      },
      dialogVisible: false,
      dialogTableVisible: false,
      checkData: {},
    };
  },
  methods: {
    //获取LD工作任务
    getData() {
      this.$http
        .post("/api/labLdScheduleList")
        .then((res) => {
          this.isData = res.data;
          if (this.checkData.schId) {
            this.$nextTick(() => {
              const $el = document
                .getElementsByClassName("el-table__row")
                [this.checkData.$index].dispatchEvent(new MouseEvent("click"));
            });
          }
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    //获取未生成的任务
    getData2() {
      let LdData = [];
      this.tbData = [];
      this.orderData = [];
      //获取L/D通知单表
      this.$http
        .post("/api/salLdNoticeList")
        .then((Response) => {
          LdData = Response.data;
          //获取订单胚布明细资料--Sal_LD_Notice.Sal_po_dtla_FK=Sal_po_dtla.Sal_po_dtlaOID
          this.$http.post("/api/salPoDtlaList").then((res) => {
            for (let index = 0; index < res.data.length; index++) {
              for (let index2 = 0; index2 < LdData.length; index2++) {
                if (
                  res.data[index].salPoDtlaoid == LdData[index2].salPoDtlaFk
                ) {
                  this.tbData.push(res.data[index]);
                  this.orderData.push(LdData[index2]);
                }
              }
            }

            //过滤已经生成的通知单
            for (let index = 0; index < this.isData.length; index++) {
              for (let index2 = 0; index2 < this.orderData.length; index2++) {
                if (
                  this.orderData[index2].salLdNoticeoid ==
                  this.isData[index].salLdNoticeoid
                ) {
                  this.tbData.splice(index2, 1);
                  this.orderData.splice(index2, 1);
                }
              }
            }

            let test = new Set(this.tbData);
            this.tbData = Array.from(test);
          });
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    //双击
    handleRowDBLClick(row) {
      this.dialogVisible = true;
      this.formObj = {
        schId: "",
        proAmount: "",
        schName: "",
        proUnit: "",
        ldCode: "",
        runcolorType: "",
        dyeColorNo: "",
        schStart: "",
        schEnd: "",
        createTime: "",
        creator: parent.UserID,
        salLdNoticeoid: "",
        salPoDtlaFk: "",
      };
      let data2 = row;
      let data1 = [];
      for (let index = 0; index < this.tbData.length; index++) {
        if (this.tbData[index].salPoDtlaoid == row.salPoDtlaFk) {
          data1 = this.tbData[index];
        }
      }
      this.formObj.proAmount = data1.fabQty;
      this.formObj.proUnit = data1.qtyUnit;
      this.formObj.runcolorType = data2.runcolorType;
      this.formObj.dyeColorNo = data1.dyeColorNo;
      this.formObj.salLdNoticeoid = data2.salLdNoticeoid;
      this.formObj.salPoDtlaFk = data2.salPoDtlaFk;
      this.formObj.ldCode = data2.runNo;
    },
    handleRowClick2(row) {
      this.checkData = row;
    },
    //提交
    sendData() {
      // this.formObj = isDate(this.formOption, this.formObj);
      let colorInfo = [];
      let colorList = [];
      let isIn = 0; //判断是否存在色号信息
      let colorData = {
        salColorid: this.formObj.dyeColorNo,
        salColornumber: "00001",
      };
      cofirm2(this.$t("energy.qdsc"), this, {})
        .then(() => {
          this.$http
            .put("/api/labLdSchedule", this.formObj)
            .then((res) => {
              if (res.data.code == 0) {
                this.getData();
                this.getData2();
                success(this.$t("energy.sccgong"));
                this.dialogVisible = false;
              } else {
                warning(this.$t("energy.scsbai"));
              }
            })
            .catch((err) => {
              error(this.$t("energy.fwqcw"));
            });

          this.$http
            .post("/api/salColorList")
            .then((res) => {
              colorList = res.data;
              for (let index = 0; index < colorList.length; index++) {
                if (colorList[index].salColorid == this.formObj.dyeColorNo) {
                  isIn = 1;
                }
              }
              if (isIn == 0) {
                //新增色号信息
                this.$http
                  .put("/api/salColor", colorData)
                  .then((res) => {})
                  .catch((err) => {
                    error(this.$t("energy.fwqcw"));
                  });
              }
            })
            .catch((err) => {
              error(this.$t("energy.fwqcw"));
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
                    //保存颜色OID
                    let selectdata = this.formObj.runcolorType.split(",");
                    //新增版本信息

                    if (isIn == 0) {
                      for (let index = 0; index < selectdata.length; index++) {
                        let data = {
                          salColoroid: colorInfo[0].salColoroid,
                          sn: index,
                          verCode: selectdata[index],
                          verName: selectdata[index],
                        };
                        this.$http
                          .put("/api/salColorVer", data)
                          .then((res) => {});
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("energy.qx"),
          });
        });
    },
    //按钮提交
    sendFirstData() {
      if (this.checkData.salLdNoticeoid) {
        this.handleRowDBLClick(this.checkData);
        this.dialogVisible = true;
      } else {
        warning("请点击要生成的数据");
      }
    },
    handleRowClick(row) {
      this.checkData = row;
    },
    edit() {
      if (this.checkData.schId) {
        this.$refs.firstCrud.rowEdit(this.checkData);
      } else {
        warning("请点击要编辑的数据");
      }
    },
    update(row, index, done, loading) {
      // row = isDate(this.isOption, row);
      if (row.schStart == null) {
        row.schStart = "";
      }
      if (row.schEnd == null) {
        row.schEnd = "";
      }
      if (row.createTime == null) {
        row.createTime = "";
      }
      this.$http
        .post("/api/labLdSchedule", row)
        .then((res) => {
          if (res.data.code == 0) {
            success(this.$t("energy.xgcg"));
            this.getData();
          } else {
            error(this.$t("energy.xgsb"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
      done();
    },
    del() {
      if (!this.checkData.schId) {
        warning("请点击要删除的数据");
        return;
      }
      cofirm2(this.$t("energy.sfjx"), this, {})
        .then(() => {
          this.$http
            .delete("/api/labLdSchedule?schId=" + this.checkData.schId)
            .then((res) => {
              if (res.data.code == 0) {
                success(this.$t("energy.sccg"));
                this.getData();
                this.getData2();
                setTimeout(() => {
                  this.$refs.crud.setCurrentRow({});
                }, 100);
              } else {
                warning(this.$t("energy.scsb"));
              }
            })
            .catch((err) => {
              error(this.$t("energy.fwqcw"));
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("energy.yqxsc"),
          });
        });
    },
    openDialog(row, index) {
      if (!this.checkData.schId) {
        warning("请点击要生成的数据");
        return;
      }
      row = this.checkData;
      this.dialogTableVisible = true;
      sessionStorage.setItem("dialogTableVisible1", this.dialogTableVisible);
      this.$router.push({ path: "ldDrawDesignChild", query: { data: row } });
    },
    closeDialg() {
      //关闭排期表查询页面，跳转回生产排期信息页面
      this.$router.push({ path: "ldDrawDesign" });
      this.dialogTableVisible = false;
      sessionStorage.removeItem("dialogTableVisible1");
    },
  },
  mounted() {
    this.getData();
    this.getData2();
  },
};
</script>

<style lang="stylus">
#ldDrawDesign {
  .el-dialog__headerbtn {
    z-index: 99 !important;
  }

  .el-dialog__header {
    padding: 5px 10px !important;
  }

  .dialogS {
    .el-date-editor {
      text-align: center;
    }

    .el-input--mini .el-input__icon {
      display: none;
    }

    .el-input--prefix .el-input__inner {
      padding-left: 15px !important;
    }
  }
}
</style>
