<!--
 * @Author: Lyl
 * @Date: 2022-08-22 10:24:22
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-26 14:50:05
 * @FilePath: \iot.vue\src\view\proMng\revolve\schedule-detail.vue
 * @Description:  染单排期
-->
<template>
  <div class="revolve-scheduleDetail">
    <el-dialog append-to-body fullscreen :visible.sync="dialogVisible" :element-loading-text="$t('public.loading')"
      v-loading="wLoading" width="100%" :close-on-click-modal="false" :close-on-press-escape="false">
      <view-container title="生产排期工作包信息">
        <div class="btnList">
          <el-tooltip effect="dark" content="Bảo tồn" placement="top-start">
            <el-button type="success" @click="handleSave" :loading="wLoading">{{
                $t("public.save")
            }}</el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="đóng" placement="top-start">
            <el-button type="warning" @click="handleClose">{{
                this.$t("public.close")
            }}</el-button>
          </el-tooltip>
        </div>
        <div class="formBox">
          <avue-form ref="scheduleDetailForm" :option="scheduleDetailCrudOp" v-model="scheduleDetailFormData">
          </avue-form>
        </div>
      </view-container>
      <view-container title="工作包工序明细">
        <div class="btnList">
          <el-tooltip effect="dark" content="Bảo tồn" placement="top-start">
            <el-button type="primary" @click="handleAdd" :loading="wLoading">{{
                $t("public.add")
            }}</el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="đóng" placement="top-start">
            <el-button type="danger" @click="handleDel">{{
                this.$t("public.del")
            }}</el-button>
          </el-tooltip>
        </div>
        <div class="crudBox" style="margin-top: 0px">
          <avue-crud ref="scheduleDetailCrud" v-loading="crudLoading" :option="scheduleDetailCrudOp"
            :data="scheduleDetailCrudData" @current-row-change="handleCellClick"
            @selection-change="handleSelectionChange">
          </avue-crud>
        </div>
      </view-container>
    </el-dialog>
    <selectWorkstep ref="selectWorkstep" stepId="0D315AE933AE43C1B6963B6E84989827" @handleCheckStep="handleCheckStep">
    </selectWorkstep>
  </div>
</template>

<script>
import { scheduleDtlCrudOp } from "./data";
import {
  fetchProSalScheduleDetailData,
  createProSalScheduleDetailData,
  updateProSalScheduleDetailData,
  removeProSalScheduleDetailData
} from "./api";
import selectWorkstep from "@/components/select-workstep/index";
export default {
  components: {
    selectWorkstep
  },
  props: {
    //  1：织单， 2：染单
    scheduleType: {
      type: Number,
      default: 1
    },
    // 缸号信息
    runJobInfo: {}
  },
  data () {
    return {
      wLoading: true,
      dialogVisible: false,
      crudLoading: true,
      scheduleDetailFormData: {},
      scheduleDetailCrudOp: scheduleDtlCrudOp(this),
      scheduleDetailCrudData: [],
      rowCheckData: {
        $cellEdit: false
      },
      selectionList: []
    };
  },
  watch: {
    rowCheckData (n, o) {
      if (n) n.$cellEdit = true;
      if (o) o.$cellEdit = false;
    }
  },
  computed: {},
  created () {
  },
  updated () {
    this.$nextTick(() => {
      this.$refs["scheduleDetailCrud"].doLayout();
    });
  },
  mounted () { },
  methods: {
    async handleQuery () {
      this.crudLoading = true;
      this.scheduleDetailCrudData = [];
      let params = {
        schDetailCode: this.runJobInfo.runJobId,
      };
      let resData = await fetchProSalScheduleDetailData(params).then(res => { return res.data });
      if (resData.length) {
        this.scheduleDetailFormData = resData.filter((item) => item.schType == 2)[0];
        let childrenList = resData.filter((item) => item.schType == 1).sort((a, b) => a.schSn - b.schSn);
        let removeArr = [];
        childrenList.forEach((item, i) => {
          item.children = [];
          item.children = childrenList.filter((obj) => { return obj.pareantId == item.detailId });
          removeArr = removeArr.concat(item.children);
        })
        this.scheduleDetailCrudData = childrenList.filter((item) => !removeArr.some((r) => r.detailId === item.detailId));
        this.handleRestSn(this.scheduleDetailCrudData);
      } else {
        let nowData = this.$getNowTime("datetime");
        this.scheduleDetailFormData = {
          stepId: this.runJobInfo.runJobId,
          stepCode: this.runJobInfo.vatNo,
          schDetailCode: this.runJobInfo.runJobId,
          workAmount: this.runJobInfo.poAmountKg,
          realAmount: this.runJobInfo.poAmountKg,
          workUnit: this.runJobInfo.wmUnit,
          finishState: 0,
          planStart: this.runJobInfo.workDate,
          planEnd: this.runJobInfo.deliveDate,
          realStart: nowData,
          colorName: this.runJobInfo.colorName,
          realEnd: ""
        };
        this.scheduleDetailCrudData = [];
      }
      this.crudLoading = false;
      this.wLoading = false;
    },
    async fetchScheduleDatailChildrenData () {
      let resData = await fetchProSalScheduleDetailData({ pareantId: this.scheduleDetailFormData.detailId });
      this.scheduleDetailCrudData = resData.data.sort((a, b) => { return a.schSn - b.schSn });
    },
    handleCellClick (row) {
      this.rowCheckData = row;
    },
    handleSelectionChange (list) {
      this.selectionList = list;
    },
    handleSave () {
      this.$refs.scheduleDetailForm.validate(async (valid, done) => {
        if (!valid) {
          done();
          this.$tip.warning("请补充排期工作包信息!");
          return;
        }
        this.wLoading = true;
        Object.keys(this.scheduleDetailFormData).forEach(item => {
          if (this.scheduleDetailFormData[item] == "undefined") {
            delete this.scheduleDetailFormData[item];
          }
        });
        this.scheduleDetailFormData.hasChildren = this.scheduleDetailCrudData.length ? true : false;
        try {
          if (this.scheduleDetailFormData.detailId) {
            await updateProSalScheduleDetailData(
              Object.assign(this.scheduleDetailFormData, {
                schType: 2,
                updateTime: this.$getNowTime("datetime"),
                updator: parent.userID,
              })
            ).then(res => {
              return res.data.data;
            });
          } else {
            let createRes = await createProSalScheduleDetailData(
              Object.assign(this.scheduleDetailFormData, {
                schType: 2,
                createTime: this.$getNowTime("datetime"),
                creator: parent.userID,
                workName: `${this.scheduleDetailFormData.stepCode}(${this.scheduleDetailFormData.colorName})工作包`
              })
            ).then(res => {
              return res.data.data;
            });
            this.scheduleDetailFormData.detailId = createRes;
          }
          await this.handleSaveChildren(this.scheduleDetailFormData.detailId);
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
          // await this.handleQuery();
          this.$tip.success(this.$t("public.bccg"));
          done();
        } catch (error) {
          this.wLoading = false;
          this.$tip.error(this.$t("public.bcsb") + error);
          done();
        }
      });
    },
    handleSaveChildren (oid) {
      if (!this.scheduleDetailCrudData.length) return;
      this.scheduleDetailCrudData.forEach(async (item, i) => {
        let saveData = JSON.parse(JSON.stringify(item))
        saveData.hasChildren = saveData.children.length ? true : false;
        Object.keys(saveData).forEach(key => {
          if (saveData[key] == "undefined") {
            delete saveData[key];
          }
        });
        if (saveData.detailId) {
          await updateProSalScheduleDetailData(
            Object.assign(saveData, {
              updateTime: this.$getNowTime("datetime"),
              updator: parent.userID,
              children: null
            }).then(async _ => {
              await item.children.forEach(async (child) => {
                Object.keys(child).forEach(key => {
                  if (child[key] == "undefined") {
                    delete child[key];
                  }
                });
                if (child.detailId) {
                  await updateProSalScheduleDetailData(
                    Object.assign(child, {
                      updateTime: this.$getNowTime("datetime"),
                      updator: parent.userID,
                      pareantId: item.detailId
                    })
                  );
                } else {
                  await createProSalScheduleDetailData(
                    Object.assign(child, {
                      schType: 1,
                      createTime: this.$getNowTime("datetime"),
                      creator: parent.userID,
                      pareantId: item.detailId
                    })
                  ).then(res => { child.detailId = res.data.data })
                }
              })
            })
          );
        } else {
          await createProSalScheduleDetailData(
            Object.assign(saveData, {
              pareantId: oid,
              schType: 1,
              createTime: this.$getNowTime("datetime"),
              creator: parent.userID,
              children: null
            })
          ).then(async res => {
            item.detailId = res.data.data;
            await item.children.forEach(async (child) => {
              Object.keys(child).forEach(key => {
                if (child[key] == "undefined") {
                  delete child[key];
                }
              });
              if (child.detailId) {
                await updateProSalScheduleDetailData(
                  Object.assign(child, {
                    updateTime: this.$getNowTime("datetime"),
                    updator: parent.userID,
                    pareantId: item.detailId

                  })
                );
              } else {
                await createProSalScheduleDetailData(
                  Object.assign(child, {
                    schType: 1,
                    createTime: this.$getNowTime("datetime"),
                    creator: parent.userID,
                    pareantId: item.detailId
                  })
                ).then(res => { child.detailId = res.data.data })
              }
            })
          })
        }

      });

    },
    async handleAdd () {
      this.$refs.selectWorkstep.dialogVisible = true;
      await this.$nextTick();
      this.$refs.selectWorkstep.handleQuery();
    },
    handleCheckStep (stepList) {
      stepList = this.$unique(stepList, "stepId");
      if (!stepList.length) {
        return;
      }
      stepList.sort((a, b) => { a.stepSn > b.stepSn ? 1 : -1 });
      stepList = stepList.map((item, i) => {
        let nowData = this.$getNowTime("datetime");
        return {
          ...this.scheduleDetailFormData,
          stepCode: item.stepCode,
          stepId: item.stepId,
          workName: item.stepName,
          schDetailCode: this.runJobInfo.runJobId,
          workAmount: this.scheduleDetailFormData.workAmount,
          realAmount: this.scheduleDetailFormData.realAmount,
          finishState: 0,
          planStart: this.scheduleDetailCrudData.length
            ? this.scheduleDetailCrudData[
              this.scheduleDetailCrudData.length - 1
            ].planEnd ||
            this.scheduleDetailCrudData[
              this.scheduleDetailCrudData.length - 1
            ].planStart ||
            nowData
            : this.scheduleDetailFormData.planStart || nowData,
          planEnd: this.scheduleDetailCrudData.length
            ? "" : this.scheduleDetailFormData.planEnd,
          // realStart: this.scheduleDetailCrudData.length
          //   ? this.scheduleDetailCrudData[
          //     this.scheduleDetailCrudData.length - 1
          //   ].realEnd ||
          //   this.scheduleDetailCrudData[
          //     this.scheduleDetailCrudData.length - 1
          //   ].realStart ||
          //   nowData
          //   : this.scheduleDetailFormData.realStart || nowData,
          // realEnd: "",
          pareantId: item.pareantId,
          detailId: "",
          // schSn: sn + i + 1
        }
      })
      let removeArr = [];
      stepList.forEach((item, i) => {
        item.children = [];
        item.children = stepList.filter((obj) => { return obj.pareantId == item.stepId });
        item.children.length && (item.hasChildrens = true);
        delete item.hasChildren
        removeArr = removeArr.concat(item.children);
      })
      stepList = stepList.filter((item) => !removeArr.some((r) => r.stepId === item.stepId));
      let sn = this.scheduleDetailCrudData.length;
      stepList.forEach((item, i) => {
        item.schSn = sn++ + 1;
        item.children.forEach((child, j) => {
          child.schSn = j + 1 //item.schSn + '-' + (j + 1)  ; 
        })
      })
      this.scheduleDetailCrudData = this.scheduleDetailCrudData.concat(stepList);
      this.handleRestSn(this.scheduleDetailCrudData);
      this.$refs.scheduleDetailCrud.setCurrentRow(this.scheduleDetailCrudData[this.scheduleDetailCrudData.length - 1]);
    },
    async handleDel () {
      if (!this.selectionList.length) {
        this.$tip.warning("请勾选要删除的数据!");
        return;
      }
      let cofirmRes = await this.$tip.cofirm("是否确定删除选中的数据?", this, {});
      if (!cofirmRes) return;
      this.wLoading = true;
      let delArr = [];
      this.selectionList.forEach((item, i) => {
        delArr = delArr.concat(item.children);
        item.children = [];
      })
      delArr = this.$unique(delArr.concat(this.selectionList), "detailId");
      delArr.forEach(async (item, i) => {
        if (item.detailId) {
          await removeProSalScheduleDetailData(item.detailId);
        }
        item.hasChildrens && this.scheduleDetailCrudData.splice(item.$index, 1);
        this.scheduleDetailCrudData.forEach((data, i) => {
          data.detailId == item.detailId && this.scheduleDetailCrudData.splice(i, 1);
          data.children.forEach((child, j) => {
            child.detailId == item.detailId && data.children.splice(j, 1);
          })
        })
        if (i == delArr.length - 1) {
          this.$refs.scheduleDetailCrud.selectClear(); // 清除勾选
          this.$refs.scheduleDetailCrud.setCurrentRow();
          this.handleRestSn(this.scheduleDetailCrudData); // 排序
          this.$tip.success("删除成功!");
          setTimeout(() => {
            this.wLoading = false;
          }, 200);
        }
      });
    },
    handleRestSn (arr, sn = 1) {
      arr.forEach((item, i) => {
        item.schSn = i + sn;
        item.hasChildrens = item.children.length ? true : false;
        delete item.hasChildren
        item.children.length && this.handleRestSn(item.children, item.schSn + 1);
        sn += item.children.length;
      })
    },
    handleClose () {
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
>>>.el-tag--mini {
  display: none;
}

>>>.el-table__expand-icon{
  font-size: 20px;
}
.revolve-scheduleDetail {
}
</style>
