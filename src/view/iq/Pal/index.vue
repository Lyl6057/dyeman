<template>
  <div id="name">
    <view-container title="盘盈/盘亏">
      <div class="btnList">
        <el-button type="primary" @click="query" :disabled="loading">{{
          this.$t("public.query")
        }}</el-button>
        <el-button type="primary" :disabled="loading">导出报表</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" v-model="form" :option="formOp"> </avue-form>
      </div>
      <div class="crudBox" style="margin-top: 0px">
        <avue-crud
          v-loading="loading"
          ref="crud"
          :data="data"
          :option="crudOp"
          :page="page"
          @on-load="query"
        ></avue-crud>
      </div>
    </view-container>
  </div>
</template>
<script>
import { getPal } from "@/api/iq/Pal/index";
export default {
  name: "",
  components: {},
  data() {
    return {
      loading: false,
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      form: {},
      formOp: {
        submitBtn: false,
        emptyBtn: false,
        labelWidth: 120,
        column: [
          {
            label: "批号",
            prop: "batchNo",
            span: 6,
          },
          {
            label: "是否通过",
            prop: "isAdopt",
            span: 6,
            type: "select",
            dicData: [
              {
                value: true,
                label: "通过",
              },
              {
                value: false,
                label: "不通过",
              },
            ],
          },
        ],
      },
      data: [{}],
      crudOp: {
        menu: false,
        addBtn: false,
        border: true,
        highlightCurrentRow: true,
        height: "calc(100vh - 300px)",
        showSummary: true,
        sumColumnList: [
          {
            label: "共",
            name: "weight",
            type: "sum",
          },
          {
            label: "共",
            name: "caliWeight",
            type: "sum",
          },
        ],
        column: [
          {
            label: "#",
            prop: "index",
            cell: true,
            width: 50,
            align: "right",
          },
          {
            label: "批号",
            prop: "batchNo",
            width: 220,
          },

          {
            label: this.$t("whseField.ph2"),
            prop: "countingNo",
            width: 120,
          },
          {
            label: "布笼id",
            prop: "boxCarId",
            hide: true,
          },
          {
            label: _this.$t("whseField.zl"),
            prop: "weight",
            // cell: true,
            width: 100,
            align: "right",
          },
          {
            label: "盘点重量",
            prop: "caliWeight",
            width: 120,
            align: "right",
          },
          {
            label: "重量单位",
            prop: "weightUnit",
            width: 120,
            type: "select",
            dicData: getDIC("bas_matUnit"),
          },
          {
            label: "是否通过",
            prop: "isAdopt",
            width: 100,
            type: "select",
            dicData: [
              {
                value: true,
                label: "通过",
              },
              {
                value: false,
                label: "不通过",
              },
            ],
          },
          {
            label: "生产日期",
            prop: "productionDate",
            width: 180,
            type: "date",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
          },
          {
            label: "保质期",
            prop: "shelfLife",
            width: 120,
          },
          {
            label: "物料盘点OID",
            prop: "whseCalicoinDtlboid",
            width: 120,
            hide: true,
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    query() {
      this.loading = true;
      // this.data = [];
      for (var key in this.form) {
        if (this.form[key] === "") {
          delete this.form[key];
        }
      }

      getPal(
        Object.assign(this.form, {
          page: this.page.currentPage,
          rows: this.page.pageSize,
          // start: (this.page.currentPage - 1) * this.page.pageSize + 1,
        })
      ).then((res) => {
        // setTimeout(() => {
        //   this.$refs.crud.setCurrentRow({});
        // }, 100);
        this.data = res.data.records;
        this.page.total = res.data.total;
        this.data.forEach((item, index) => {
          item.index = index + 1;
          // let _this = this;
          // _this.$nextTick(() => {
          //   document
          //     .getElementsByClassName("el-table__row")
          //     [index].addEventListener(
          //       "input",
          //       function () {
          //         _this.iptChange(item);
          //       },
          //       false
          //     );
          // });
        });
        this.loading = false;
      });
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#name {
}
</style>