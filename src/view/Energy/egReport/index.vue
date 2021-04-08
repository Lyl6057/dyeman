<template>
  <div id="egReport">
    <basicContainer>
      <el-row>
        <el-col
          class="queryForm"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="正在导出..."
        >
          <el-tabs type="border-card">
            <el-tab-pane label="能源成本核算">
              <div class="btnList">
                <el-button type="primary" size="mini" @click="exportTable">導出</el-button>
                <!-- <input type="file" @change="out" /> -->
              </div>
              <div :span="24">
                <avue-form :option="formOption" v-model="form"></avue-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </basicContainer>
  </div>
</template>

<script>
import XlsxTemplate from "xlsx-template";
import JSZipUtils from "jszip-utils";
import saveAs from "file-saver";
import { eneBusiness, getPositionList } from "@/api/energy.js";

export default {
  data() {
    return {
      formOption: {
        emptyBtn: false,
        submitBtn: false,
        submitText: this.$t("energy.cx"),
        emptyText: this.$t("energy.qk"),
        labelWidth: 100,
        column: [
          {
            label: this.$t("energy.kssj"),
            prop: "startTime",
            type: "date",
            span: 12,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          {
            label: this.$t("energy.jssj"),
            prop: "endTime",
            type: "date",
            span: 12,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            row: true,
          },
          {
            label: this.$t("energy.yblx"),
            prop: "emType",
            span: 12,
            type: "select",
            multiple: true,
            dicData: [],
          },
          {
            label: this.$t("energy.wz"),
            prop: "emSite",
            span: 12,
            type: "select",
            multiple: true,
            dicData: [],
          },
        ],
      },
      form: {},
      fullscreenLoading: false,
    };
  },
  methods: {
    getData() {
      this.$axios
        .get("/api/getcodeValue?codeTableId=eWDFS_401")
        .then((res) => {
          res.data.forEach((item, index) => {
            item.value = item.codeid;
            item.label = item.codename;
            item.sign = index;
          });
          res.data.sort(function (a, b) {
            return a.value < b.value ? 1 : -1;
          });
          this.formOption.column[2].dicData = res.data;
        })
        .catch((err) => {
          error(this.$t("energy.fwq"));
        });
      // 获取位置list
      getPositionList().then((res) => {
        res.data.forEach((item, index) => {
          item.value = item.emSite;
          item.label = item.emSite;
        });
        this.formOption.column[3].dicData = res.data;
      });
    },
    exportTable() {
      this.fullscreenLoading = true;
      let type = [];
      this.form.emType.forEach((item) => {
        type.push(item);
      });
      this.form.emType = type;
      //如果需要请求接口来获取渲染的数据，则需要给接口添加async，把exportTable前面的async删掉
      let data = [];
      eneBusiness(this.form).then(async (res) => {
        data = this.group(res.data, "erDate");
        this.form.type = "";
        data.forEach((item) => {
          item.erDate = (item.erDate || "").split(" ")[0];
          item.list = this.group(item.data, "emType");
          item.list.forEach((list, Index) => {
            let sumData = {
              [list.emType + "num"]: 0,
              [list.emType + "price"]: 0,
              [list.emType + "sum"]: 0,
            };
            for (
              let index = 0;
              index < this.formOption.column[2].dicData.length;
              index++
            ) {
              if (
                list.emType === this.formOption.column[2].dicData[index].value
              ) {
                list.emName = this.formOption.column[2].dicData[index].label;
                list.sign = this.formOption.column[2].dicData[index].sign;
                sumData = {
                  [list.sign + "num"]: 0,
                  [list.sign + "price"]: 0,
                  [list.sign + "sum"]: 0,
                };
                break;
              }
            }
            list.data.forEach((items, index) => {
              for (
                let index = 0;
                index < this.formOption.column[2].dicData.length;
                index++
              ) {
                // if (
                //   list.emType === this.formOption.column[2].dicData[index].value
                // ) {
                //   list.emName = this.formOption.column[2].dicData[index].label;
                //   list.sign = this.formOption.column[2].dicData[index].sign;
                //   // sumData = {
                //   //   [list.sign + "num"]: 0,
                //   //   [list.sign + "price"]: 0,
                //   //   [list.sign + "sum"]: 0,
                //   // };
                // }
                // console.log(this.form);
                this.form[
                  this.formOption.column[2].dicData[index].sign + "name"
                ] = this.formOption.column[2].dicData[index].label;
                if (
                  this.form[
                    this.formOption.column[2].dicData[index].sign + "name"
                  ].indexOf("水") != -1
                ) {
                  this.form[
                    this.formOption.column[2].dicData[index].sign + "name"
                  ] = "水量/m³";
                } else if (
                  this.form[
                    this.formOption.column[2].dicData[index].sign + "name"
                  ].indexOf("蒸汽") != -1
                ) {
                  this.form[
                    this.formOption.column[2].dicData[index].sign + "name"
                  ] = "蒸汽/T³";
                } else if (
                  this.form[
                    this.formOption.column[2].dicData[index].sign + "name"
                  ].indexOf("电") != -1
                ) {
                  this.form[
                    this.formOption.column[2].dicData[index].sign + "name"
                  ] = "电量/KW*H";
                } else if (
                  this.form[
                    this.formOption.column[2].dicData[index].sign + "name"
                  ].indexOf("导热油") != -1
                ) {
                  this.form[
                    this.formOption.column[2].dicData[index].sign + "name"
                  ] = "导热油/GJ";
                } else if (
                  this.form[
                    this.formOption.column[2].dicData[index].sign + "name"
                  ].indexOf("压缩") != -1
                ) {
                  this.form[
                    this.formOption.column[2].dicData[index].sign + "name"
                  ] = "压缩空气/m³";
                } else {
                  // 另外加的情况
                }
              }
              sumData[list.sign + "num"] += Number(items.erQty);
              sumData[list.sign + "price"] =
                sumData[list.sign + "price"] + Number(items.erPrice);
              if (index === list.data.length - 1) {
                // 计算总金额以及金额格式
                sumData[list.sign + "price"] = sumData[
                  list.sign + "price"
                ].toFixed(2);
                sumData[list.sign + "sum"] = (
                  sumData[list.sign + "price"] * sumData[list.sign + "num"]
                ).toFixed();
                // item.sumData = sumData;
                sumData[list.sign + "num"] = sumData[list.sign + "num"];
                sumData[list.sign + "price"] = this.toThousands(
                  sumData[list.sign + "price"]
                );
                sumData[list.sign + "sum"] = this.toThousands(
                  sumData[list.sign + "sum"]
                );
                this.$set(
                  item,
                  [list.sign + "num"],
                  sumData[list.sign + "num"]
                );
                this.$set(
                  item,
                  [list.sign + "price"],
                  sumData[list.sign + "price"]
                );
                this.$set(
                  item,
                  [list.sign + "sum"],
                  sumData[list.sign + "sum"]
                );
              }
            });
          });
        });
        try {
          //获得Excel模板的buffer对象
          const exlBuf = await JSZipUtils.getBinaryContent(
            "../../static/xlxsTemplate/mb.xlsx"
          );
          // Create a template
          var template = new XlsxTemplate(exlBuf);
          // Replacements take place on first sheet
          var sheetNumber = "能源成本核算";
          // Set up some placeholder values matching the placeholders in the template
          var query = this.form;
          query.type = "";
          query.site = "";
          for (let i = 0; i < this.formOption.column[2].dicData.length; i++) {
            for (let j = 0; j < query.emType.length; j++) {
              if (
                this.formOption.column[2].dicData[i].value === query.emType[j]
              ) {
                query.type =
                  query.type +
                  (query.type === "" ? "" : "/") +
                  this.formOption.column[2].dicData[i].label;
              }
            }
          }
          for (let j = 0; j < query.emSite.length || 0; j++) {
            query.site =
              query.site + (query.site === "" ? "" : "/") + query.emSite[j];
          }
          data.sort(function (a, b) {
            return a.erDate < b.erDate ? 1 : -1;
          });
          var values = {
            //数据需要自己提前准备好
            data,
            query,
          };
          // console.log(values);
          // this.fullscreenLoading = false;
          // return;
          // Perform substitution
          template.substitute(sheetNumber, values);
          // Get binary data.
          var out = template.generate({ type: "blob" });
          var fun1 = function () {
            return new Promise((resolve, reject) => {
              saveAs(out, "能源成本核算.xlsx");
              resolve();
            });
          };
          fun1().then((res) => {
            setTimeout(() => {
              this.fullscreenLoading = false;
            }, 2000);
          });
        } catch (e) {
          console.log(e);
        }
      });
    },
    group(arr, type) {
      var map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai[type]]) {
          dest.push({
            [type]: ai[type],
            data: [ai],
          });
          map[ai[type]] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj[type] == ai[type]) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang='stylus'>
#egReport {
  .el-select .el-input--mini .el-input__inner {
    height: 60px !important;
  }

  .el-select__tags {
    height: 100% !important;
  }
}
</style>
