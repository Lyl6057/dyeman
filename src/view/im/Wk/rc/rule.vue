<template>
  <div id="wkRule">
    <view-container title="編號規則配置">
      <div class="btnList">
        <el-button type="success" @click="save">{{
          this.$t("public.save")
        }}</el-button>
        <el-button type="warning" @click="close">關閉</el-button>
      </div>
      <div class="formBox">
        <avue-form
          v-loading="loading"
          ref="form"
          :option="formOp"
          v-model="form"
          @submit="submit"
        ></avue-form>
      </div>
      <div class="bhsm">{{ bhsm }}</div>
    </view-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      loading: false,
      formOp: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "前綴",
            prop: "prefix",
            span: 12,
            placeholder: " ",
            labelWidth: 80,
            // click: () => {
            //   this.change("prefix");
            // },
            // change: () => {
            //   this.change("prefix");
            // },
          },
          {
            label: "流水號長度",
            prop: "length",
            span: 12,
            placeholder: " ",
            labelWidth: 120,
            type: "number",
            // change: () => {
            //   this.change("length");
            // },
          },
          {
            label: "日期",
            prop: "date",
            labelWidth: 80,
            span: 12,
            type: "checkbox",
            // change: () => {
            //   this.change("date");
            // },
            dicData: [
              {
                value: "%tY",
                label: "年",
              },
              {
                value: "%tm",
                label: "月",
              },
              {
                value: "%td",
                label: "日",
              },
            ],
          },
          // {
          //   label: "排序",
          //   prop: "sort",
          //   span: 12,
          //   placeholder: " ",
          //   labelWidth: 120,
          //   type: "select",
          //   multiple: true,
          //   dicData: [
          //     {
          //       value: "prefix",
          //       label: "前綴",
          //     },
          //     {
          //       value: "num",
          //       label: "流水號",
          //     },
          //     {
          //       value: "tY",
          //       label: "年",
          //     },
          //     {
          //       value: "tm",
          //       label: "月",
          //     },
          //     {
          //       value: "td",
          //       label: "日",
          //     },
          //   ],
          // },
        ],
      },
      bhsm: "編號 = ",
      form: {},
      codeSupply: {},
      codeIndex: {},
    };
  },
  watch: {
    form: {
      handler(val) {
        this.bhsm = "";
        if (val.prefix != "") {
          this.bhsm = "編號 = +" + val.prefix;
        } else {
          this.bhsm = "編號 = ";
        }
        this.form.date.forEach((item, index) => {
          this.bhsm +=
            item === "%tY"
              ? " + 年份"
              : item === "%tm"
              ? " + 月份"
              : item === "%td"
              ? " + 日"
              : "";
        });
        this.bhsm += " + 流水號";
        this.bhsm = this.bhsm.replace("+", "");

        // val.sort.forEach((item, index) => {
        //   item === "tY"
        //     ? (this.bhsm += "+ 年份")
        //     : item === "tm"
        //     ? (this.bhsm += "+ 月份  ")
        //     : item === "td"
        //     ? (this.bhsm += "+ 日")
        //     : item === "num"
        //     ? (this.bhsm += "+ 流水號")
        //     : (this.bhsm += "+" + item);
        //   if (index === val.sort.length - 1) {
        //     this.bhsm = this.bhsm.replace("+", "");
        //   }
        // });
      },
      deep: true,
    },
  },
  methods: {
    getData() {
      this.loading = true;
      axios
        .get("/api/baseCodeSupplyList?supCode=whse_In_yarn")
        .then((res) => {
          res.data.rows.forEach((item) => {
            if (item.supCode === "whse_In_yarn") {
              this.codeSupply = item;
              let data = item.supFormate.split("%");
              for (let i = 0; i < data.length; i++) {
                if (data[i][0] === "0" && data[i][data[i].length - 1] === "d") {
                  this.form.length = data[i]
                    .substring(0, data[i].length - 1)
                    .substr(1);
                  data[i] = "num";
                  this.codeIndex.length = i;
                } else if (
                  data[i] != "tY" &&
                  data[i] != "tm" &&
                  data[i] != "td"
                ) {
                  this.form.prefix = data[i];
                  // this.formOp.column[3].dicData[0].value = data[i];
                  // // this.formOp.column[3].dicData[0].label = data[i];
                  // this.codeIndex.prefix = i;
                } else {
                  this.form.date.push("%" + data[i]);
                  // this.codeIndex[data[i]] = i;
                }
              }
              // this.form.sort = data;
            }
          });
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    save() {
      this.$refs.form.submit();
      let supFormate = this.form.prefix;
      this.form.date.forEach((item) => {
        supFormate += item;
      });
      supFormate += "%0" + this.form.length + "d";
      let data = {
        supCode: this.rcType,
        supFormate: supFormate,
        maxSn: this.codeSupply.maxSn,
        supName: this.codeSupply.supName,
      };
      axios({ url: "/api/baseCodeSupply", method: "post", params: data }).then(
        (res) => {
          if (res.data.code === 0) {
            this.$tip.success(this.$t("public.bccg"));
          } else {
            this.$tip.error("保存失敗!");
          }
        }
      );
    },
    submit(form, done) {
      setTimeout(() => {
        done();
      }, 200);
    },
    // change(val) {
    //   if (val === "prefix") {
    //     this.$nextTick(() => {
    //       if (this.codeIndex.prefix === null) {
    //         this.form.sort.push(this.form.prefix);
    //         this.formOp.column[3].dicData[0].value = this.form.prefix;
    //         this.formOp.column[3].dicData[0].label = this.form.prefix;
    //         this.codeIndex.prefix = this.form.sort.length - 1;
    //       }
    //       if (this.form.prefix === "") {
    //         this.form.sort.splice(this.codeIndex.prefix, 1);
    //         this.codeIndex.prefix = null;
    //         return;
    //       }
    //       this.formOp.column[3].dicData[0].value = this.form.prefix;
    //       this.formOp.column[3].dicData[0].label = this.form.prefix;
    //       this.form.sort[this.codeIndex.prefix] = this.form.prefix;
    //     });
    //   }
    //   if (val === "date") {
    //     for (let i = 0; i <   this.form.date.length; i++) {
    //       console.log(this.sort);

    //     }
    // //   }
    // },
    close() {
      document.getElementsByClassName("el-dialog__headerbtn")[2].click();
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#wkRule {
  .bhsm {
    font-size: 17px;
    width: 92%;
    margin: 0 auto;
    color: red;
    margin-top: -10px;
    padding-bottom: 10px;
  }

  .el-checkbox__label {
    font-size: 17px;
  }

  .checkbox__inner {
    width: 18px;
    height: 18px;
  }

  .avue-checkbox .el-checkbox, .avue-radio .el-radio {
    margin-top: 2px;
    margin-right: 20px;
  }

  .el-checkbox__inner {
    width: 18px;
    height: 18px;
  }

  .el-checkbox__inner::after {
    left: 6px;
    top: 2px;
    height: 8px;
    border: 2px solid #FFF;
    border-left: 0;
    border-top: 0;
  }
}
</style>