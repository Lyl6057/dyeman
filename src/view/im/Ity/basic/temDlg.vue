<!--
 * @Author: Lyl
 * @Date: 2021-03-25 00:46:18
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-27 23:04:55
 * @Description: 
-->
<template>
  <div id="ityTme">
    <view-container title="材料维护">
      <div class="btnList">
        <el-button type="success" @click="save" :disabled="crud.length == 0"
          >保存</el-button
        >
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="danger" @click="del">删除</el-button>
        <el-button type="warning" @click="close">关闭</el-button>
      </div>
      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <div class="crudBox">
        <avue-crud
          ref="crud"
          id="crud"
          :option="crudOp"
          :data="crud"
          :page.sync="page"
          v-loading="loading"
          @on-load="getData"
          @current-row-change="cellClick"
        ></avue-crud>
      </div>
    </view-container>
    <mater-choice
      :choiceV="choiceV"
      :choiceQ="choiceQ"
      @close="choiceV = !choiceV"
      @choiceData="choiceData"
    />
  </div>
</template>
<script>
import { formTemOp, crudTemOp } from "./data";
import materChoice from "@/components/material/choice";
import { get, add, update, del, updateStock } from "./api";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  components: {
    materChoice: materChoice,
  },
  data() {
    return {
      loading: false,
      loadLabel: "拼命加载中",
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      formOp: formTemOp(this),
      form: {},
      crudOp: crudTemOp(this),
      crud: [],
      chooseData: {},
      choiceV: false,
      choiceQ: {},
      oldData: {},
      changed: false,
    };
  },
  watch: {},
  methods: {
    getData() {},
    getMaterial() {
      get({
        materialId: this.form.materialId,
        rows: 10,
        start: 0,
      }).then((res) => {
        let data = res.data;
        this.page.total = data.total;
        this.crud = data.records;
        if (this.crud.length == 0) {
          this.loading = false;
        }
        this.crud.forEach((item, i) => {
          item.index = i + 1;
          if (this.crud.length - 1 === i) {
            setTimeout(() => {
              this.form.unitId = this.crud[0].unitId;
              this.$nextTick(() => {
                this.$refs.crud.setCurrentRow(this.crud[0]);
                this.$refs["crud"].doLayout();
              });
              this.loading = false;
            }, 200);
          }
        });
      });
    },
    save() {
      if (!this.form.kindId) {
        this.$tip.error("材料編號不能為空!");
        return;
      }
      if (!this.form.unitId) {
        this.$tip.error("單位不能為空!");
        return;
      }
      for (let i = 0; i < this.crud.length; i++) {
        if (!this.crud[i].batchNo) {
          this.$tip.error("材料批號不能為空!");
          return;
        }
        if (this.crud[i].openingQty === "") {
          this.$tip.error("材料期初数量不能為空!");
          return;
        }
        if (this.crud[i].oldpooccupyqty === "") {
          this.$tip.error("材料老单占用数不能為空!");
          return;
        }
      }
      this.loading = true;
      try {
        this.crud.forEach((item, i) => {
          item.unitId = this.form.unitId;
          if (item.whseMaterialopeningoid) {
            update(item).then((res) => {});
          } else {
            add(item).then((res) => {
              item.whseMaterialopeningoid = res.data.data;
            });
          }

          if (i === this.crud.length - 1) {
            updateStock({
              materialId: this.form.materialId,
              unitId: this.form.unitId,
            }).then((res) => {});
            setTimeout(() => {
              this.changed = true;
              this.$tip.success("保存成功!");
              this.loading = false;
            }, 200);
          }
        });
      } catch (error) {
        this.loading = false;
      }
    },
    add() {
      if (!this.form.materialId) {
        this.$tip.error("請先選擇材料編號!");
        return;
      } else {
        this.crud.push({
          kindId: this.form.kindId,
          materialType: this.form.materialType,
          materialId: this.form.materialId,
          materialName: this.form.materialName,
          unitId: this.form.unitId,
          batchNo: "",
          openingQty: 0,
          oldpooccupyqty: 0,
          index: this.crud.length + 1,
        });
        // this.crud.forEach((item, i) => {
        //   item.index = i + 1;
        // });
        this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
        this.$nextTick(() => {
          this.$toTableLow(this, "crud");
        });
      }
    },
    del() {
      if (Object.keys(this.chooseData).length === 0) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.chooseData.whseMaterialopeningoid) {
        this.crud.splice(this.chooseData.index - 1, 1);
        if (this.crud.length > 0) {
          this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
        }
        this.crud.forEach((item, i) => {
          item.index = i + 1;
        });
      } else {
        this.$tip
          .cofirm(
            "是否确定删除批號为 【 " + this.chooseData.batchNo + " 】 的数据?",
            this,
            {}
          )
          .then(() => {
            del(this.chooseData.whseMaterialopeningoid)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$tip.success("删除成功");
                  this.crud.splice(this.chooseData.index - 1, 1);
                  if (this.crud.length > 0) {
                    this.$refs.crud.setCurrentRow(
                      this.crud[this.crud.length - 1]
                    );
                  }
                  this.crud.forEach((item, i) => {
                    item.index = i + 1;
                  });
                  // this.getMaterial();
                } else {
                  this.$tip.error("删除失败");
                }
              })
              .catch((err) => {
                this.$tip.error("删除失败!");
              });
          })
          .catch((err) => {
            this.$tip.warning("取消操作");
          });
      }
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    choiceData(val) {
      this.loading = true;
      this.form.materialId =
        val.yarnsId || val.calicoId || val.bcCode || val.hardwareId;
      this.form.materialName =
        val.yarnsName || val.calicoName || val.chinName || val.cnnamelong;
      this.form.materialType =
        val.$yarnsType ||
        val.$clothType ||
        val.$bcClass ||
        val.$basProductionaccFk ||
        val.$basHardwareFk ||
        val.$basAdsuppliesFk;
      this.form.kindId = val.kindId;
      this.getMaterial();
      this.choiceV = false;
    },
    close() {
      this.$emit("close", this.changed);
    },
  },
  created() {
    if (this.isAdd) {
      this.loading = true;
      this.form = this.detail;
      this.getMaterial();
    }
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#ityTme {
  .avue-crud__menu {
    height: 0 !important;
    min-height: 0 !important;
    font-size: 18px;
    margin-bottom: 0 !important;
  }
}
</style>