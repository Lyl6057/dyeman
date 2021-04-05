<template>
  <div id="Big">
    <!-- 选项卡 -->
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane
        :label="$t('menuData.Laboratory[2].data.blmx')"
        name="second"
      >
        <el-row class="queryForm">
          <div class="btnList">
            <el-button
              type="primary"
              size="mini"
              @click.stop="Giveadd(checkData)"
              >{{ $t("ProWorkflowInfo.scsbd") }}</el-button
            >
          </div>
        </el-row>
        <avue-crud
          :data="BigData"
          :option="BigOption"
          @row-click="handleRowClick"
        >
          <!-- <template slot-scope="scope" slot="menu">
              <el-button
                icon="el-icon-plus"
                size="small"
                @click="dialogVisible = true"
                @click.stop="Giveadd(scope.row, scope.index)"
              ></el-button>
            </template>-->
        </avue-crud>

        <!-- 生成送板单 -->
        <el-dialog title :visible.sync="dialogVisible" fullscreen>
          <div>
            <avue-form
              :option="option"
              v-model="form"
              @submit="handleSubmit"
            ></avue-form>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane :label="$t('menuData.Laboratory[2].data.sbd')" name="first">
        <el-row class="queryForm">
          <div class="btnList">
            <el-button type="primary" @click="editor">{{
              this.$t("public.update")
            }}</el-button>
            <el-button type="primary" @click="del(checkData2)">{{
              this.$t("public.del")
            }}</el-button>
            <el-button type="primary" @click="openDialog(checkData2)">{{
              $t("ProWorkflowInfo.scpf")
            }}</el-button>
          </div>
        </el-row>
        <avue-crud
          ref="GiveCrud"
          :data="GiveData"
          :option="GiveOption"
          @row-update="update"
          @row-click="handleRowClick"
        >
          <!-- <template slot-scope="scope" slot="menu">
                <el-button
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  @click="openDialog(scope.row, scope.index)"
                >
                  <span class="btnTle">{{ $t("ProWorkflowInfo.scpf") }}</span>
                </el-button>
            </template>-->
        </avue-crud>
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
import { cofirm2, success, warning, error } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { Data_Width, label_Width, isDate } from "@/seal/gridOption"; //时间格式转化、表头宽度控制
export default {
  data() {
    return {
      activeName: "second", //选项卡默认状态
      BigData: [], //大货通知单数据
      data: [],
      //   大货通知单配置
      BigOption: {
        align: "center",
        menuAlign: "center",
        columnBtn: false,
        delBtn: false,
        addBtn: false,
        editBtn: false,
        refreshBtn: false,
        menu: false,
        menuWidth: 150,
        height: 605,
        labelWidth: 110,
        emptyText: this.$t("energy.qk"),
        submitText: this.$t("energy.bc"),
        highlightCurrentRow: true,
        border: true,
        column: [
          {
            label: "Sal_BigCargo_dtlaOID",
            prop: "salBigcargoDtlaoid",
            width: 500,
            hide: true,
            display: false,
          },
          {
            label: "订单布料明细_FK",
            prop: "salPoDtlaFk",
            width: 225,
            hide: true,
            display: false,
          },
          {
            label: "生产通知单-大货_FK",
            prop: "salBigcargoFk",
            width: 275,
            hide: true,
            display: false,
          },
          {
            label: "面料资料_FK",
            prop: "salBomFabricFk",
            width: 175,
            hide: true,
            display: false,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.fabId"),
            prop: "fabId",
            width: 100,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.colorName"),
            prop: "colorName",
            width: 80,
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
            width: 100,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.fabQty"),
            prop: "fabQty",
            width: 80,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.qtyUnit"),
            prop: "qtyUnit",
            width: 100,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.pinNumber"),
            prop: "pinNumber",
            width: 80,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.inchNumber"),
            prop: "inchNumber",
            width: 80,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.fabBreadth"),
            prop: "fabBreadth",
            width: 125,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.breadthUnit"),
            prop: "breadthUnit",
            width: 100,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.gramWeight"),
            prop: "gramWeight",
            width: 80,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.lateralShrink"),
            prop: "lateralShrink",
            width: 80,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.verticalShrink"),
            prop: "verticalShrink",
            width: 80,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.twistDegrees"),
            prop: "twistDegrees",
            width: 80,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.slopeDegrees"),
            prop: "slopeDegrees",
            width: 80,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.fabYcount"),
            prop: "fabYcount",
            width: 100,
          },
        ],
      },
      dialogVisible: false, //弹出笼罩蒙版状态
      form: {},
      //生成送板单单配置
      option: {
        labelWidth: 120,
        emptyText: this.$t("energy.qk"),
        submitText: this.$t("energy.bc"),
        highlightCurrentRow: true,
        border: true,
        column: [
          // 生产排期ID
          {
            label: "生产排期ID",
            prop: "schId",
            width: 150,
            hide: true,
            display: false,
          },
          {
            label: "订单布料明细_FK",
            prop: "salPoDtlaFk",
            width: 225,
            hide: true,
            display: false,
          },
          {
            label: "BOM面料资料_FK",
            prop: "salBomFabricFk",
            width: 250,
            hide: true,
            display: false,
          },
          {
            label: "大货通知单明细OID",
            prop: "salBigcargoDtlaoid",
            width: 250,
            hide: true,
            display: false,
          },
          {
            label: "大货通知单OID",
            prop: "salBigcargooid",
            width: 200,
            hide: true,
            display: false,
          },
          {
            label: "染厂色号",
            prop: "dyeColorNo",
            width: 100,
            hide: true,
            display: false,
          },
          {
            // 名稱
            label: this.$t("ProWorkflowInfo.name"),
            prop: "schName",
            width: 80,
          },
          {
            // 創建人
            label: this.$t("ProWorkflowInfo.cjsr"),
            prop: "creator",
            width: 75,
          },
          // 開始時間
          {
            label: this.$t("ProWorkflowInfo.kssj"),
            prop: "schStart",
            width: 100,
            type: "datetime",
          },
          // 完成时间
          {
            label: this.$t("ProWorkflowInfo.xcsj"),
            prop: "schEnd",
            width: 100,
            type: "datetime",
          },
          // 创建时间
          {
            label: this.$t("ProWorkflowInfo.cjsj"),
            prop: "createTime",
            type: "datetime",
          },
          // 大货检验编号
          {
            label: this.$t("ProWorkflowInfo.ysbh"),
            prop: "labCode",
            width: 150,
          },
          // 打色板类型
          {
            label: this.$t("menuData.Laboratory[2].data.dbbType"),
            prop: "runcolorType",
            width: 125,
          },
        ],
      },
      GiveData: [], //送板单表数据
      //送板单表配置
      GiveOption: {
        align: "center",
        highlightCurrentRow: true,
        menuAlign: "center",
        columnBtn: false,
        addBtn: false,
        refreshBtn: false,
        height: 605,
        menu: false,
        menuWidth: 220,
        labelWidth: 110,
        dialogHeight: 200,
        border: true,
        addBtn: true,
        editBtn: false,
        addRowBtn: false,
        cellBtn: true,
        rowKey: "schId",
        column: [
          {
            label: "生产排期ID",
            prop: "schId",
            width: 150,
            hide: true,
            display: false,
          },
          {
            label: "订单布料明细_FK",
            prop: "salPoDtlaFk",
            width: 225,
            hide: true,
            display: false,
          },
          {
            label: "BOM面料资料_FK",
            prop: "salBomFabricFk",
            width: 250,
            hide: true,
            display: false,
          },
          {
            label: "大货通知单明细OID",
            prop: "salBigcargoDtlaoid",
            width: 250,
            hide: true,
            display: false,
          },
          {
            label: "大货通知单OID",
            prop: "salBigcargooid",
            width: 200,
            hide: true,
            display: false,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.dataName"),
            prop: "schName",
            width: 90,
            cell: true,
          },
          {
            label: this.$t("ProWorkflowInfo.cjsr"),
            prop: "creator",
            width: 90,
            cell: true,
          },
          {
            label: this.$t("ProWorkflowInfo.kssj"),
            prop: "schStart",
            width: 100,
            type: "datetime",
            cell: true,
          },
          {
            label: this.$t("ProWorkflowInfo.xcsj"),
            prop: "schEnd",
            width: 100,
            type: "datetime",
            cell: true,
          },
          {
            label: this.$t("ProWorkflowInfo.cjsj"),
            prop: "createTime",
            width: 100,
            type: "datetime",
            cell: true,
          },
          {
            label: this.$t("menuData.Laboratory[3].data.dhbh"),
            prop: "labCode",
            width: 150,
            cell: true,
          },
          {
            label: this.$t("ProWorkflowInfo.dsblx"),
            prop: "runcolorType",
            width: 125,
            cell: true,
          },
          {
            label: this.$t("ProWorkflowInfo.rcsh"),
            prop: "dyeColorNo",
            width: 100,
            cell: true,
          },
        ],
      },
      dialogTableVisible: false,
      checkData: {},
      checkData2: {},
    };
  },
  methods: {
    //大货布料明细单查询
    BigList() {
      this.$http
        .get("/api/salBigcargoInfoList")
        .then((res) => {
          this.data = res.data;
          for (var i = 0; i < this.data.length; i++) {
            this.BigData = this.data[i].salBigcargoDtla;
            this.BigOption = Data_Width(this.BigOption, this.BigData);
          }
        })
        .catch((err) => {
          error("服务器跑丢啦~");
        });
    },
    //送板单查询
    GiveList() {
      this.$http
        .post("/api/labBigcargoScheduleList")
        .then((res) => {
          this.GiveData = res.data;
          this.GiveOption = Data_Width(this.GiveOption, this.GiveData);
        })
        .catch((err) => {
          error("服务器跑丢啦~");
        });
    },
    //生成送板单之前将色号等数据进行处理
    Giveadd(row, scope) {
      if (row.salBigcargoFk) {
        this.form.dyeColorNo = row.dyeColorNo; //染厂色号
        this.form.salBigcargooid = row.salBigcargoDtlaoid; //大货通知单OID
        this.form.salBigcargoDtlaoid = row.salBigcargoDtlaoid; //大货通知单明细OID
        this.form.salBomFabricFk = row.salBomFabricFk; //BOM面料资料_FK
        this.form.salPoDtlaFk = row.salPoDtlaFk; //订单布料明细_FK
        this.form.creator = parent.UserID;
        this.dialogVisible = true;
      } else {
        warning("请点击要生成的数据");
      }
    },
    handleRowClick(row) {
      if (this.activeName == "second") {
        this.checkData = row;
      } else {
        this.checkData2 = row;
      }
    },
    //提交生成板单数据
    handleSubmit(form, done) {
      form = isDate(this.option, form);
      this.$http
        .put(
          "/api/labBigcargoSchedule?creator=" +
            form.creator +
            "&salBigcargoDtlaoid=" +
            form.salBigcargoDtlaoid +
            "&salBigcargooid=" +
            form.salBigcargooid +
            "&salBomFabricFk=" +
            form.salBomFabricFk +
            "&salPoDtlaFk=" +
            form.salPoDtlaFk +
            "&schId=" +
            form.schId +
            "&schName=" +
            form.schName +
            "&schStart=" +
            form.schStart +
            "&schEnd=" +
            form.schEnd +
            "&createTime=" +
            form.createTime +
            "&runcolorType=" +
            form.runcolorType +
            "&dyeColorNo=" +
            form.dyeColorNo +
            "&labCode=" +
            form.labCode
        )
        .then((res) => {
          if (res.data.code == 0) {
            success("生成成功!");
            this.dialogVisible = false;
            this.activeName = "first";
            this.GiveList();
          } else {
            error("生成失败!");
          }
        })
        .catch((err) => {
          error("服务器错误~参数错误");
        });
      done();
    },
    editor() {
      if (this.checkData2.schId) {
        this.$refs.GiveCrud.rowEdit(this.checkData2);
      } else {
        warning("请点击要生成的数据");
      }
    },
    //更新数据
    update(row, index, done, loading) {
      row = isDate(this.GiveOption, row);
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
        .post(
          "/api/labBigcargoSchedule?creator=" +
            row.creator +
            "&salBigcargoDtlaoid=" +
            row.salBigcargoDtlaoid +
            "&salBigcargooid=" +
            row.salBigcargooid +
            "&salBomFabricFk=" +
            row.salBomFabricFk +
            "&salPoDtlaFk=" +
            row.salPoDtlaFk +
            "&schId=" +
            row.schId +
            "&schName=" +
            row.schName +
            "&schStart=" +
            row.schStart +
            "&schEnd=" +
            row.schEnd +
            "&createTime=" +
            row.createTime +
            "&dyeColorNo=" +
            row.dyeColorNo +
            "&labCode=" +
            row.labCode +
            "&runcolorType=" +
            row.runcolorType
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.GiveList();
            success("修改成功");
          } else {
            error("修改失败");
          }
        })
        .catch((err) => {
          error("修改失败!参数错误~~");
        });
      done();
      loading();
    },
    //删除
    del(row) {
      if (!row.schId) {
        warning("请点击要生成的数据");
        return;
      }
      const data = row.schId;
      cofirm2(this.$t("energy.sfjx"), this, {})
        .then(() => {
          this.$http
            .delete("/api/labBigcargoSchedule?schId=" + data)
            .then((res) => {
              if (res.data.code == 0) {
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
    //打开生成配方
    openDialog(row) {
      if (!row.schId) {
        warning("请点击要生成的数据");
        return;
      }
      this.dialogTableVisible = true;
      sessionStorage.setItem("dialogTableVisible1", this.dialogTableVisible);
      this.$router.push({ path: "BigChild", query: { data: row } });
      let colorInfo = [];
      let colorList = [];
      let isIn = 0; //判断是否存在色号信息
      let colorData = {
        salColorid: row.dyeColorNo,
        salColornumber: "00001",
      };
      //获取色号信息
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
            //新增色号信息
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
                //保存颜色OID
                let selectdata = row.runcolorType.split(",");
                //新增版本信息
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
      //生成配方页面，返回大货送板页面
      this.$router.push({ path: "Big" });
      this.dialogTableVisible = false;
      sessionStorage.removeItem("dialogTableVisible1");
    },
  },
  created() {
    this.BigList();
    this.GiveList();
    // this.BigOption = label_Width(this.BigOption);
    // this.GiveOption = label_Width(this.GiveOption);
  },
};
</script>

<style lang="stylus">
#Big {
  .btnTle {
    font-size: 10px;
  }

  .ldDlg {
    .el-dialog__header {
      padding: 0 !important;
      height: 0 !important;
    }
  }

  .el-dialog__headerbtn {
    z-index: 99 !important;
  }
}
</style>
