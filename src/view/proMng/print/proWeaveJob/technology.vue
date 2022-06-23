<!--
 * @Author: Lyl
 * @Date: 2022-06-16 10:22:40
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-22 16:07:31
 * @FilePath: \iot.vue\src\view\proMng\print\proWeaveJob\technology.vue
 * @Description: 
-->
<template>
  <div class="proWeaveJob-technology" v-loading="loading" element-loading-text="拼命加载中...">
    <el-row class="btnList">
      <el-button type="success" @click="handleSave">{{ this.$t("public.save") }}</el-button>
      <el-button type="primary" @click="choiceV = true">选择织单</el-button>
      <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
    </el-row>
    <el-row class="formBox">
      <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
    </el-row>
    <el-row class="crudBox">
      <el-col :span="5">
        <view-container title="织针排列">
          <avue-crud ref="arrangement" :option="arrangementOp" :data="arrangement" style="margin-top: 5px"></avue-crud>
        </view-container>
      </el-col>
      <el-col :span="19">
        <view-container title="三角排列">
          <avue-crud ref="technology" :option="technologyOp" :data="technology" style="margin-top: 5px">
            <template v-for="(item, index) in form.totalColumn" :slot="'prop' + (index + 3)" slot-scope="scope">
              <el-select v-model="scope.row['prop' + (index + 3)]" :key="index">
                <el-option v-for="item in scope.row.type == 1 ? picTop : picBottom" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </avue-crud>
        </view-container>
      </el-col>
    </el-row>
    <div v-if="yarnList.length">
      <avue-crud ref="fabric" :option="fabricOp" :data="fabric" style="margin-top: 5px"></avue-crud>
    </div>
    <choice :choiceV="choiceV" :choiceTle="choiceTle" :choiceQ="choiceQ" dlgWidth="100%" @choiceData="handleCheck" @close="choiceV = false" v-if="choiceV"></choice>
  </div>
</template>
<script>
import choice from "@/components/proMng/index";
import { JSONLoader } from "../../../../config/three";
import {
  getYarn,
  update,
  createWeaveJobTechnology,
  updateWeaveJobTechnology,
  fetchWeaveJobTechnology,
  reomveWeaveJobTechnology,
} from "./api";
import {
  arrangementCrud,
  technologyCrud,
  technologyForm,
  fabricCrud,
  picTop,
  picBottom,
} from "./data";
export default {
  components: {
    choice,
  },
  props: {
    weave: Object,
  },
  data() {
    return {
      picTop,
      picBottom,
      fabricOp: fabricCrud(this),
      fabric: [],
      formOp: technologyForm(this),
      form: {
      },
      arrangementOp: arrangementCrud(this),
      arrangement: [],
      technology: [],
      technologyOp: technologyCrud(this),
      yarnList: [],
      loading: false,
      cycle: {},
      oldData: [],
      choiceV: false,
      choiceTle: "选择织造通知单",
      choiceQ: {
        sortF: "weaveJobCode",
      },
    };
  },
  watch: {
    technology(o, n) {
      let sum = n.filter((item) =>{ return item.type == 1 }).length
      let i = 0 ,j = 0;
      n.forEach(item => {
        if (item.type == 1) {
          item.prop2 = sum - i++;
        }else{
          item.prop2 = j++ + 1;
        }
      });
    },
  },
  computed: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      this.loading = true;
      if (!this.weave.weaveJobId) {
        this.loading = false;
        this.$emit("close");
        return;
      }
      this.fabric = [];
      await getYarn({
        proWeaveJobFk: this.weave.weaveJobId,
      }).then((res) => {
        this.yarnList = this.$unique(res.data.records, 'yarnCode');
        this.yarnList.forEach((item, i) => {
          this.fabric.push({
            prop1: item.yarnName,
            $cellEdit: true,
          });
        });
      });
      await this.getTechonlogyData(this.weave, false);
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    async getTechonlogyData(val, type) {
      this.form.levelNo = val.levelNo || 1;
      this.form.pinColumn = val.pinColumn || 0;
      this.form.diskNum = val.diskNum || 0;
      this.form.syringeNum = val.syringeNum || 0;
      this.form.totalColumn = val.totalColumn || 0;
      this.form.needlePlaceType = val.needlePlaceType || 0;
      await this.$nextTick();
      await fetchWeaveJobTechnology({ weaveJobId: val.weaveJobId }).then(
        (res) => {
          if (!type) {
            this.oldData = res.data; // 旧数据
          }
          res.data.forEach((item) => {
            if (item.picType === "1") {
              console.log(item);
              // 织针排列
              this.$set(
                this.arrangement[Number(item.rowId) - 1],
                ["prop" + (this.form.levelNo == '1' ? Number(item.colId) + 1 : Number(item.colId))],
                item.cpValue
              );
            } else if (item.picType === "2") {
              this.$set(
                this.technology[Number(item.rowId) - 1],
                ["prop" + item.colId],
                item.cpValue
              );
            } else if (this.yarnList.length) {
              if ( item.colId != '1') { // 复制织单，不复制纱线名称
                this.$set(
                  this.fabric[Number(item.rowId) - 1],
                  ["prop" + item.colId],
                  item.cpValue
                );
              }
            }
          });
        }
      );
    },
    pincolumnChange(val) {
      // 排针列数
      this.arrangement = [];
      let num = val;
      while (num > 0) {
        this.arrangement.push({
          $cellEdit: true,
          prop1: 1,
          prop2: 1,
        });
        num--;
      }
    },
    NumChange(val, type) {
      // 上下针
      // 如果是空数组 直接添加本次数据
      let num = val,
        i = 1;
      if (!this.technology.length) {
        while (num > 0) {
          this.technology.push(
            Object.assign(
              {
                $cellEdit: true,
                prop1: type == 1 ? "针盘针(上针)" : "针筒针(下针)",
                type,
              },
              this.cycle
            )
          );
          num--, i++;
        }
        return;
      }
      // 存在数据
      if (type == 1) {
        // 上针
        let sum = this.technology.filter((item) => item.type == type).length; // 存在上针的数量
        if (sum > val) {
          // 原路数大于新路数 删除多余
          while (sum - i > val - 1) {
            this.technology.splice(sum - i, 1);
            i++;
          }
          return;
        }
        // 原路数小于新路数 新增
        while (num - sum > 0) {
          this.technology.splice(
            sum + i - 1,
            0,
            Object.assign(
              {
                $cellEdit: true,
                prop1: "针盘针(上针)",
                type,
              },
              this.cycle
            )
          );
          num--, i++;
        }
        return;
      }
      // 下针
      let sum = this.technology.filter((item) => item.type == type).length; // 存在下针的数量
      if (sum > val) {
        // 原路数大于新路数 删除多余
        let oldLength = this.technology.length;
        while (sum - i > val - 1) {
          this.technology.splice(oldLength - sum, 1); // 删除第一条下针数据
          num--, i++;
        }
        return;
      }
      // 原路数小于新路数 新增
      while (num - sum > 0) {
        this.technology.push(
          Object.assign(
            {
              $cellEdit: true,
              prop1: "针筒针(下针)",
              type,
            },
            this.cycle
          )
        );
        num--, i++;
      }
      return;
    },
    async cycleChange(val) {
      if (!val) {
        this.technologyOp = technologyCrud(this);
        this.fabricOp = fabricCrud(this);
        return;
      }
      // 循环路数
      if (val > 5) {
        this.loading = true;
      }
      await this.$nextTick();
      this.technologyOp = technologyCrud(this);
      this.fabricOp = fabricCrud(this);
      this.cycle = {};
      let num = val,
        i = 1;
      while (num > 0) {
        this.technologyOp.column.push({
          prop: "prop" + (i + 2),
          label: i + "",
          width: 110,
          slot: true,
        });
        this.fabricOp.column.push({
          prop: "prop" + (i + 1),
          label: i + "",
          width: 110,
          type: "checkbox",
          cell: true,
          align: "center",
          dicData: [
            {
              value: "true",
              label: "",
            },
          ],
        });
        this.$set(this.cycle, "prop" + (i + 2), "━");
        num--;
        i++;
      }
      this.technology.forEach((item) => {
        for (let i = 1; i <= val; i++) {
          if (!item["prop" + (i + 2)]) {
            this.$set(item, "prop" + (i + 2), "━");
          }
        }
      });
      this.fabric.forEach((item) => {
        for (let i = 1; i <= val; i++) {
          if (!item["prop" + (i + 1)]) {
            this.$set(item, "prop" + (i + 1), true);
          }
        }
      });

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    async handleSave() {
      if (!this.form.pinColumn) {
        this.$tip.warning("排针列数不能为0!");
        return;
      }
      if (!this.form.totalColumn) {
        this.$tip.warning("循环路数不能为0!");
        return;
      }
      // this.loading = true;
      // 织针排列
      let data = [];
      this.arrangement.forEach((item, i) => {
        // 行
        for (let j = 0; j < this.form.levelNo; j++) {
          //列
          data.push({
            weaveJobId: this.weave.weaveJobId,
            colId: j + 1,
            colName: this.arrangementOp.column[this.form.levelNo == 1 ? j + 1 : j].label,
            rowId: i + 1,
            rowName: i + 1,
            cpValue: item[this.arrangementOp.column[this.form.levelNo == 1 ? j + 1 : j].prop],
            picType: 1,
            needleType: this.form.levelNo == 1 ? 2 : j == 0 ? 1 : 2,
          });
        }
      });

      // 三角排列
      this.technology.forEach((item, i) => {
        // 行
        for (let j = 0; j < this.technologyOp.column.length; j++) {
          //列
          data.push({
            weaveJobId: this.weave.weaveJobId,
            colId: j + 1,
            colName: this.technologyOp.column[j].label,
            rowId: i + 1,
            rowName: i + 1,
            cpValue: item[this.technologyOp.column[j].prop],
            picType: 2,
            needleType: item.type,
          });
        }
      });

      // 纱线排针
      this.fabric.forEach((item, i) => {
        // 行
        for (let j = 0; j < this.fabricOp.column.length; j++) {
          //列
          data.push({
            weaveJobId: this.weave.weaveJobId,
            colId: j + 1,
            colName: this.fabricOp.column[j].label,
            rowId: i + 1,
            rowName: i + 1,
            cpValue: item[this.fabricOp.column[j].prop]
              ? item[this.fabricOp.column[j].prop]
              : false,
            picType: 3,
          });
        }
      });
      update(Object.assign(this.weave, this.form)); // 更新主表数据
      let delData = await this.filterDelData(this.oldData, data);
      await data.forEach(async (item) => {
        if (item.proWeaveJobTechnologyId) {
          await updateWeaveJobTechnology(item);
        } else {
          await createWeaveJobTechnology(item);
        }
      });
      await delData.forEach((item) => {
        reomveWeaveJobTechnology(item.proWeaveJobTechnologyId);
      });
      await this.initData();
      this.$emit("refresh", this.form);
      this.$tip.success("保存成功!");
      this.loading = false;
    },
    filterDelData(oList, nList) {
      let result = [];
      oList.forEach((o, i) => {
        for (let j = 0; j < nList.length; j++) {
          if (
            o.colId == nList[j].colId &&
            o.rowId == nList[j].rowId &&
            o.picType == nList[j].picType
          ) {
            nList[j].proWeaveJobTechnologyId = o.proWeaveJobTechnologyId;
            break;
          } else if (j == nList.length - 1) {
            result.push(o);
          }
        }
      });
      return result;
    },
    async handleCheck(val) {
      if (!val || !val.weaveJobId) return;
      this.loading = true;
      await this.getTechonlogyData(val, true);
      this.choiceV = false;
      this.loading = false;
    },
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="stylus" scoped>
.proWeaveJob-technology {
  >>>.el-select input {
    text-align: center;
  }
}
</style>