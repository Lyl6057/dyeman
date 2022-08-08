<template>
  <div id="craft-only-read">
    <el-row>
      <div class="btnList">
        <el-tooltip class="item" effect="dark" content="Thoát" placement="bottom">
          <el-button type="warning" @click="close">{{ this.$t("public.close") }}</el-button>
        </el-tooltip>
      </div>
    </el-row>
    <el-row>
      <el-col :span="12">
        <view-container title="生產工藝">
          <div class="crudBox">
            <avue-crud ref="crudTechargue" :option="techargueCrud" :data="crudTG" v-loading="loading"
                       @on-load="queryTechargue" @row-click="handleCellClick"/>
          </div>
        </view-container>
      </el-col>
      <el-col :span="12">
        <view-container title="工藝明細">
          <div class="crudBox">
            <avue-crud :option="codeItemCrud" :data="crudCI"/>
          </div>
        </view-container>
      </el-col>
    </el-row>
  </div>


</template>
<script>
import {taskCrud, mainForm} from "./data";
import {getProBleadjobDcctaskView, getProBleadyeJobTechargue, getProBleadyeJobTechItem} from "./api";
import {techargueCrud, codeItemCrud} from "./data";

export default {
  name: "craft",
  components: {},
  props: {
    bleadyeJobId: String
  },
  data() {
    return {
      loadLabel: "加载中...",
      loading: false,
      FormOp: mainForm(this),
      techargueCrud: techargueCrud(this),
      codeItemCrud: codeItemCrud(this),
      crudCI: [],
      crudTG: [],
      form: {},
      crud: [],
      page: {
        pageSizes: [20, 50, 100, 200],
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
    }
  },
  methods: {
    queryTechargue() {
      getProBleadyeJobTechargue({
        proBleadyeJobFk: this.bleadyeJobId
      }).then((res) => {
        this.crudTG = res.data;
        this.$refs.crudTechargue.setCurrentRow(this.crudTG[0]);
        this.queryCodeItem(this.crudTG[0])
        this.crudTG.map((e, i) => {
          e.index = i + 1;
        })
      })
    },
    queryCodeItem(val) {
      getProBleadyeJobTechItem({
        proBleadyeJobTechargueFk: val.jobTechId
      }).then((res) => {
        console.log(res)
        this.crudCI = res.data;
        this.crudCI.map((e, i) => {
          e.index = i + 1;
          console.log(this.crudCI)
        })
        //  this.$refs.crudTechargue.setCurrentRow(this.crudTG[0]);
      })
    },
    handleCellClick(val) {
      this.queryCodeItem(val)
    },
    getData() {
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }
      let params = Object.assign(this.form, {
        fmono: (this.form.fmono) ? `%${this.form.fmono}` : "%",
        fno: (this.form.fno) ? `%${this.form.fno}` : "%",
        rows: this.page.pageSize,
        start: this.page.currentPage,
      });
      getProBleadjobDcctaskView(params).then((res) => {
        console.log(res);
        this.crud = res.data.records;
        this.page.total = res.data.total;
        this.crud.map((e, i) => {
          e.index = i + 1;
        })
      })
      if (this.form.fmono.indexOf("%") !== -1) {
        this.form.fmono = this.form.fmono.split("%")[1] || "";
      }
      if (this.form.fno.indexOf("%") !== -1) {
        this.form.fno = this.form.fno.split("%")[1] || "";
      }
    },
    close() {
      this.$emit("close");
    },
  },
  mounted() {
    this.getData()
  }
}
</script>
<style>
</style>
