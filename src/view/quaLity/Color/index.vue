<template>
  <div id="psgl">
    <!-- 选项卡 -->
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane :label="$t('energy.scpqgxmx')" name="second">
        <!-- 生成排期工序明细表 -->
        <div class="queryForm">
          <el-row class="btnList">
            <el-button type="primary" @click="handleEdit(checkData)">{{
              $t("energy.scpsd")
            }}</el-button>
          </el-row>
        </div>
        <avue-crud
          :data="CoData"
          :option="COption"
          @current-row-change="handleCurrentRowChange"
        ></avue-crud>

        <!-- 生成批色单 -->
        <el-dialog
          :title="$t('energy.sc')"
          :visible.sync="dialogVisible"
          fullscreen
        >
          <div>
            <avue-form
              :option="option"
              v-model="form"
              @submit="handleSubmit"
            ></avue-form>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane :label="$t('energy.psd')" name="first">
        <!-- 批色单表 -->
        <div class="queryForm">
          <el-row class="btnList">
            <el-button type="primary" @click="editor(checkData2)">{{
              this.$t("public.update")
            }}</el-button>
            <el-button type="primary" @click="QCdel(checkData2)">{{
              this.$t("public.del")
            }}</el-button>
          </el-row>
        </div>
        <avue-crud
          ref="crud"
          id="sss"
          :data="QCData"
          :option="QCOption"
          @row-update="QCupdate"
          @row-del="QCdel"
          @current-row-change="handleCurrentRowChange2"
        ></avue-crud>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { cofirm, success, warning, error } from "@/seal/seal"; //引入封装的消息提示和弹框组件
import { Data_Width, label_Width, isDate } from "@/seal/gridOption"; //时间格式转化、表头宽度控制
//生产批色单的通过标志状态默认值
var DIC = {
  VAILD: [
    {
      label: "通过",
      value: "true",
    },
    {
      label: "不通过",
      value: "false",
    },
  ],
};
var DBC = {
  VAILD: [
    {
      label: "通过",
      value: "true",
    },
    {
      label: "不通过",
      value: "false",
    },
  ],
};
export default {
  data() {
    return {
      activeName: "first", //选项卡默认状态
      CoData: [], //工序表数据
      jugestatus: "", //批色单通过状态
      //工序表配置
      COption: {
        align: "center",
        menuAlign: "center",
        columnBtn: false,
        delBtn: false,
        addBtn: false,
        editBtn: false,
        refreshBtn: false,
        menuWidth: 160,
        height: 350,
        labelWidth: 100,
        highlightCurrentRow: true,
        column: [
          {
            label: this.$t("energy.xxxxid"),
            prop: "detailId",
            hide: true,
            display: false,
            width: 120,
          },
          {
            label: this.$t("energy.scpqid"),
            prop: "schId",
            hide: true,
            display: false,
          },
          {
            label: this.$t("energy.gxid"),
            prop: "workflowId",
            hide: true,
            display: false,
          },
          {
            label: this.$t("energy.rwxh"),
            prop: "schSn",
            width: 140,
          },
          {
            label: this.$t("energy.gxmc"),
            prop: "workName",
          },
          {
            label: this.$t("energy.czrykz"),
            prop: "persnSnap",
          },
          {
            label: this.$t("energy.sysb"),
            prop: "equipmentSnap",
          },
          {
            label: this.$t("energy.sxclqd"),
            prop: "materSnap",
          },
        ],
      },
      dialogVisible: false, //弹出笼罩蒙版状态
      form: {},
      //生成批色单配置
      option: {
        submitText: this.$t("energy.cx"),
        emptyText: this.$t("energy.qk"),
        column: [
          {
            label: this.$t("energy.pqbh"),
            prop: "schCode",
            span: 8,
            display: false,
          },
          {
            label: this.$t("energy.pqid"),
            prop: "schId",
            span: 8,
            display: false,
          },
          {
            label: this.$t("energy.xxxxid"),
            prop: "detailId",
            span: 8,
            display: false,
          },
          {
            label: this.$t("energy.kssj"),
            prop: "startTime",
            span: 8,
            type: "datetime",
          },
          {
            label: this.$t("energy.wcsj"),
            prop: "endTime",
            span: 8,
            type: "datetime",
          },
          {
            label: this.$t("energy.pstgbz"),
            prop: "jugePass",
            span: 8,
            type: "select",
            dicData: DIC.VAILD,
          },
          {
            label: this.$t("energy.wlpj"),
            prop: "physicalCheckup",
            span: 8,
            type: "textarea",
          },
          {
            label: this.$t("energy.hxpj"),
            prop: "chymistCheckup",
            span: 8,
            type: "textarea",
          },
          {
            label: this.$t("energy.wljl"),
            prop: "physicalResult",
            span: 8,
          },
          {
            label: this.$t("energy.hxjl"),
            prop: "chymistResult",
            span: 8,
          },
          {
            label: this.$t("energy.zdr"),
            prop: "singlePerson",
            span: 8,
          },
          {
            label: this.$t("energy.qcjyr"),
            prop: "qcPerson",
            span: 8,
          },
          {
            label: this.$t("energy.qcjysj"),
            prop: "qcTime",
            span: 8,
            type: "datetime",
          },
          {
            label: this.$t("energy.hyr"),
            prop: "labPerson",
            span: 8,
          },
          {
            label: this.$t("energy.hyd"),
            prop: "labChckRecId",
            span: 8,
          },
          {
            label: this.$t("energy.hysj"),
            prop: "labTime",
            span: 8,
            type: "datetime",
          },
        ],
      },
      QCData: [], //批色单表数据
      // 批色单表配置
      QCOption: {
        highlightCurrentRow: true,
        align: "center",
        menuAlign: "center",
        columnBtn: false,
        addBtn: false,
        refreshBtn: false,
        height: 350,
        menuWidth: 150,
        menu: false,
        labelWidth: 110,
        column: [
          {
            label: this.$t("energy.psid"),
            prop: "jugeId",
            width: 100,
            hide: true,
            display: false,
          },
          {
            label: this.$t("energy.xxxxid"),
            prop: "detailId",
            width: 150,
            hide: true,
            display: false,
          },
          {
            label: this.$t("energy.pqid"),
            prop: "schId",
            width: 100,
            hide: true,
            display: false,
          },
          {
            label: this.$t("energy.pqbh"),
            prop: "schCode",
            width: 100,
            hide: true,
            display: false,
          },
          {
            label: this.$t("energy.kssj"),
            prop: "startTime",
            width: 100,
            type: "datetime",
          },
          {
            label: this.$t("energy.wcsj"),
            prop: "endTime",
            width: 100,
            type: "datetime",
          },
          {
            label: this.$t("energy.pstgbz"),
            prop: "jugePass",
            width: 150,
            type: "select",
            dicData: DBC.VAILD,
          },
          {
            label: this.$t("energy.wlpj"),
            prop: "singlePerson",
            width: 100,
          },
          {
            label: this.$t("energy.hxpj"),
            prop: "physicalCheckup",
            width: 100,
            type: "textarea",
          },
          {
            label: this.$t("energy.wljl"),
            prop: "chymistCheckup",
            width: 100,
            type: "textarea",
          },
          {
            label: this.$t("energy.hxjl"),
            prop: "chymistResult",
            width: 100,
          },
          {
            label: this.$t("energy.zdr"),
            prop: "physicalResult",
            width: 100,
          },

          {
            label: this.$t("energy.qcjyr"),
            prop: "qcPerson",
            width: 125,
          },
          {
            label: this.$t("energy.qcjysj"),
            prop: "qcTime",
            width: 150,
            type: "datetime",
          },
          {
            label: this.$t("energy.hyr"),
            prop: "labPerson",
            width: 75,
          },
          {
            label: this.$t("energy.hyd"),
            prop: "labChckRecId",
            width: 75,
          },
          {
            label: this.$t("energy.hysj"),
            prop: "labTime",
            width: 100,
            type: "datetime",
          },
        ],
      },
      checkData: {},
      checkData2: {},
    };
  },
  methods: {
    //工序表查询
    handleList() {
      this.$http
        .get("/api/proScheduleDetailInfo")
        .then((res) => {
          this.CoData = res.data;
          this.COption = Data_Width(this.COption, this.CoData);
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    handleCurrentRowChange(row) {
      this.checkData = row;
    },
    handleCurrentRowChange2(row) {
      this.checkData2 = row;
    },
    //将缸号ID，明细ID，排期ID进行处理方便下面进行生成批色单
    handleEdit(row) {
      if (row.schId) {
        this.form.schCode = row.proSalSchedule.schCode;
        this.form.schId = row.schId;
        this.form.detailId = row.detailId;
        this.dialogVisible = true;
      } else {
        warning("请点击要生成的数据");
        return;
      }
    },
    // 生成批色单(批色单新增数据)
    handleSubmit(form, done) {
      form = isDate(this.option, form);
      this.$http
        .put(
          "/api/qcJudgeColor?chymistCheckup=" +
            form.chymistCheckup +
            "&schCode=" +
            this.form.schCode +
            "&schId=" +
            this.form.schId +
            "&detailId=" +
            this.form.detailId +
            "&chymistResult=" +
            form.chymistResult +
            "&endTime=" +
            form.endTime +
            "&jugePass=" +
            form.jugePass +
            "&labChckRecId=" +
            form.labChckRecId +
            "&labPerson=" +
            form.labPerson +
            "&labTime=" +
            form.labTime +
            "&physicalCheckup=" +
            form.physicalCheckup +
            "&physicalResult=" +
            form.physicalResult +
            "&qcPerson=" +
            form.qcPerson +
            "&qcTime=" +
            form.qcTime +
            "&singlePerson=" +
            form.singlePerson +
            "&startTime=" +
            form.startTime
        )
        .then((res) => {
          if (res.data.code == 200) {
            success(this.$t("energy.sccgong"));
            this.QChandleList();
            this.dialogVisible = false;
            this.activeName = "first";
          } else {
            error(this.$t("energy.scsbai"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
      done();
    },

    //批色单查询
    QChandleList() {
      this.$http
        .post("/api/qcJudgeColorList")
        .then((res) => {
          this.QCData = res.data;
          this.QCOption = Data_Width(this.QCOption, this.QCData);
          for (var i = 0; i < this.QCData.length; i++) {
            if (this.QCData[i].jugePass == false) {
              this.QCData[i].jugePass = "不通过";
            } else if (this.QCData[i].jugePass == true) {
              this.QCData[i].jugePass = "通过";
            }
          }
        })
        .catch((err) => {
          error(this.$t("energy.fwqcw"));
        });
    },
    editor(val) {
      if (val.schId) {
        this.$refs.crud.rowEdit(val);
      } else {
        warning("请点击要修改的数据");
        return;
      }
    },
    //批色单更新数据
    QCupdate(row, index, done, loading) {
      if (row.jugePass == "true") {
        this.jugestatus = true;
      } else if (row.jugePass == "false") {
        this.jugestatus = false;
      }
      row = isDate(this.QCOption, row);
      this.$http
        .post(
          "/api/qcJudgeColor?chymistCheckup=" +
            row.chymistCheckup +
            "&detailId=" +
            row.detailId +
            "&schCode=" +
            row.schCode +
            "&schId=" +
            row.schId +
            "&jugeId=" +
            row.jugeId +
            "&chymistResult=" +
            row.chymistResult +
            "&endTime=" +
            row.endTime +
            "&jugePass=" +
            this.jugestatus +
            "&labChckRecId=" +
            row.labChckRecId +
            "&labPerson=" +
            row.labPerson +
            "&labTime=" +
            row.labTime +
            "&physicalCheckup=" +
            row.physicalCheckup +
            "&physicalResult=" +
            row.physicalResult +
            "&qcPerson=" +
            row.qcPerson +
            "&qcTime=" +
            row.qcTime +
            "&singlePerson=" +
            row.singlePerson +
            "&startTime=" +
            row.startTime
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.QChandleList();
            success(this.$t("energy.xgcg"));
          } else {
            error(this.$t("energy.xgsb"));
          }
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
      done();
    },
    //批色单删除
    QCdel(row) {
      if (!row.schId) {
        warning("请点击要删除的数据");
        return;
      }
      const data = row.jugeId;
      cofirm(this.$t("energy.sfjx"), this.$t("energy.ts"), {})
        .then(() => {
          this.$http.delete("/api/qcJudgeColor?jugeId=" + data).then((res) => {
            if (res.data.code == 200) {
              success(this.$t("energy.sccg"));
              this.QChandleList();
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
        })
        .catch((err) => {
          error(this.$t("energy.cw"));
        });
    },
  },
  created() {
    this.handleList();
    this.QChandleList();
    this.COption = label_Width(this.COption);
    this.QCOption = label_Width(this.QCOption);
  },
};
</script>
<style lang="stylus">
#psgl {
  .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
    height: 100% !important;
  }

  .avue-form__menu {
    display: block !important;
  }
}
</style>