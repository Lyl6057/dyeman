<template>
  <div id="EquipmentSchedule" class="eqsd">
    <!-- <el-row style="background:white;margin:0 5px">
      <el-col :span="24" style="text-align:left;padding:10px 15px ">
        <span class="title">{{$t('menuData.Production[0].name')}}</span>
        <span class="time">{{Time}}</span>
      </el-col>
      </el-row>-->
    <el-tabs type="border-card">
      <el-tab-pane label="生产排期进度">
        <div class="box">
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            v-loading="loading"
            :element-loading-text="$t('public.loading')"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <template v-for="item in eqData">
              <el-tab-pane
                :label="item.categoryName"
                :name="item.categoryId"
                style="margin-top: 10px"
              >
                <template>
                  <div
                    v-show="tabData.length !== 0"
                    v-bind:style="{ width: tabData.length * 370 + 'px' }"
                  >
                    <div class="equipment">
                      <div class="eqModel" v-for="(items, index) in tabData">
                        <el-card class="box-card">
                          <div slot="header" class="clearfix">
                            <span class="eqName">{{
                              items.equipmentName
                            }}</span>
                          </div>
                          <div class="eqImg">
                            <img
                              src="../../../assets/logo.png"
                              class="img"
                              style
                              alt
                            />
                          </div>
                          <div class="eqInfo">
                            <el-collapse
                              v-model="activeNames"
                              @change="handleChange"
                            >
                              <el-collapse-item
                                title="设备信息"
                                :name="items.equId"
                              >
                                <div>设备名称：{{ items.equipmentName }}</div>
                                <div>编号：{{ items.equipmentCode }}</div>
                                <div>横坐标：{{ items.localX }}</div>
                                <div>纵坐标：{{ items.localY }}</div>
                                <div>机速：{{ items.equSpeed }}</div>
                                <div>容量：{{ items.maxOutput }}</div>
                                <div>单位：{{ items.unit }}</div>
                                <div>计量方式：{{ items.measureMethod }}</div>
                                <div>针数：{{ items.needleCount }}</div>
                                <div>路数：{{ items.wayCount }}</div>
                                <div>设备型号：{{ items.localX }}</div>
                                <!-- <div>ID：{{items.equModel}}</div> -->
                              </el-collapse-item>
                              <el-collapse-item
                                v-show="items.eqScheduleData.isON === '1'"
                                title="设备排期"
                                :name="items.equId + 1"
                              >
                                <div>
                                  机速：{{ items.eqScheduleData.equSpeed }}
                                </div>
                                <div>
                                  状态{{ items.eqScheduleData.equState }}
                                </div>
                                <div>
                                  容量：{{ items.eqScheduleData.maxOutput }}
                                </div>
                                <div>单位：{{ items.eqScheduleData.unit }}</div>
                                <div>
                                  计量方式：{{
                                    items.eqScheduleData.measureMethod
                                  }}
                                </div>
                                <div>
                                  生产排期名称：{{
                                    items.eqScheduleData.schName
                                  }}
                                </div>
                                <div>
                                  生产数量：{{ items.eqScheduleData.proAmount }}
                                </div>
                                <div>
                                  工序名称：{{ items.eqScheduleData.workName }}
                                </div>
                                <div>
                                  工序ID：{{ items.eqScheduleData.workflowId }}
                                </div>
                                <div>
                                  最早开始：{{
                                    items.eqScheduleData.earliestEnd
                                  }}
                                </div>
                                <div>
                                  最早完成：{{
                                    items.eqScheduleData.earliestEnd
                                  }}
                                </div>
                                <div>
                                  最晚开始：{{ items.eqScheduleData.lastStart }}
                                </div>
                                <div>
                                  最晚完成：{{ items.eqScheduleData.lastEnd }}
                                </div>
                                <div>
                                  计划开始：{{ items.eqScheduleData.planStart }}
                                </div>
                                <div>
                                  计划完成：{{ items.eqScheduleData.planEnd }}
                                </div>
                                <div>
                                  实际开始：{{ items.eqScheduleData.realStart }}
                                </div>
                                <div>
                                  实际完成：{{ items.eqScheduleData.realEnd }}
                                </div>
                                <div>
                                  完成时间：{{ items.eqScheduleData.schEnd }}
                                </div>
                                <div>
                                  完成比例：{{
                                    items.eqScheduleData.finishProportion
                                  }}
                                </div>
                                <div>
                                  完成状态：{{
                                    items.eqScheduleData.finishState
                                  }}
                                </div>
                              </el-collapse-item>

                              <el-collapse-item
                                v-show="items.detail.isON === '1'"
                                title="工序明细"
                                :name="items.equId + 2"
                              >
                                <div>工序ID：{{ items.detail.workflowId }}</div>
                                <div>任务序号：{{ items.detail.schSn }}</div>
                                <div>工序名称：{{ items.detail.workName }}</div>
                                <div>
                                  操作人员快照：{{ items.detail.persnSnap }}
                                </div>
                                <div>
                                  使用设备：{{ items.detail.equipmentSnap }}
                                </div>
                                <div>
                                  所需材料清单：{{ items.detail.materSnap }}
                                </div>
                                <div>
                                  检验标准：{{ items.detail.checkSnap }}
                                </div>
                                <div>
                                  操作方法：{{ items.detail.workMethodSnap }}
                                </div>
                                <div>
                                  环境要求：{{ items.detail.environmentSnap }}
                                </div>
                                <div>
                                  最早开始：{{ items.detail.earliestEnd }}
                                </div>
                                <div>
                                  最早完成：{{ items.detail.earliestEnd }}
                                </div>
                                <div>
                                  最晚开始：{{ items.detail.lastStart }}
                                </div>
                                <div>最晚完成：{{ items.detail.lastEnd }}</div>
                                <div>
                                  计划开始：{{ items.detail.planStart }}
                                </div>
                                <div>计划完成：{{ items.detail.planEnd }}</div>
                                <div>
                                  实际开始：{{ items.detail.realStart }}
                                </div>
                                <div>实际完成：{{ items.detail.realEnd }}</div>
                                <div>
                                  完成比例：{{ items.detail.finishProportion }}
                                </div>
                                <div>
                                  完成状态：{{ items.detail.finishState }}
                                </div>
                                <div>
                                  前置工序：{{ items.detail.frontWorkName }}
                                </div>
                                <div>
                                  前置工序：{{ items.detail.frontWork }}
                                </div>
                                <div>后置任务：{{ items.detail.postWork }}</div>
                                <div>
                                  估算耗时：{{ items.detail.exampleUseTime }}
                                </div>
                                <div>
                                  实际耗时：{{ items.detail.realUseTime }}
                                </div>
                                <div>
                                  宽放时间：{{ items.detail.broadTime }}
                                </div>
                                <div>
                                  实际宽放时间：{{ items.detail.realBroad }}
                                </div>
                                <div>
                                  转场时间：{{ items.detail.transferTime }}
                                </div>
                                <div>
                                  实际转场时间：{{ items.detail.realTransfer }}
                                </div>
                                <div>
                                  设置为关键工序：{{ items.detail.isKey }}
                                </div>
                                <div>返工工序：{{ items.detail.isRework }}</div>
                              </el-collapse-item>
                            </el-collapse>
                          </div>
                        </el-card>
                      </div>
                    </div>
                  </div>
                  <div v-show="tabData.length == 0">暂无数据</div>
                </template>
              </el-tab-pane>
            </template>
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import { nowTime } from "@/seal/gridOption"; //nowTime
export default {
  data() {
    return {
      Time: "",
      eqData: [],
      activeName: "dev-1",
      activeNames: "1",
      eqInfoData: [],
      tabData: [],
      equIdData: [],
      gxData: [], //工序
      loading: false,
      // eqScheduleData: []
    };
  },
  methods: {
    handleClick(tab, event) {
      this.loading = true;

      this.tabData = [];
      //设备信息
      for (let index = 0; index < this.eqInfoData.length; index++) {
        if (this.eqInfoData[index].categoryId == this.activeName) {
          let data = {
            detailId: "",
            earliestEnd: "",
            earliestStart: "",
            equId: "",
            equSpeed: "",
            equState: "",
            finishProportion: "",
            finishState: "",
            lastEnd: "",
            lastStart: "",
            maxOutput: "",
            measureMethod: "",
            planEnd: "",
            planStart: "",
            proAmount: "",
            realEnd: "",
            realStart: "",
            salNoticeDetailId: "",
            salNoticeType: "",
            schCode: "",
            schEnd: "",
            schId: "",
            schName: "",
            schSn: "",
            schStart: "",
            unit: "",
            workName: "",
            workflowId: "",
            isON: "0",
          };
          let data2 = {
            broadTime: "",
            checkSnap: "",
            detailId: "",
            earliestEnd: "",
            earliestStart: "",
            environmentSnap: "",
            equipmentSnap: "",
            exampleUseTime: "",
            finishProportion: "",
            finishState: "",
            frontWork: "",
            isKey: "",
            isRework: "",
            lastEnd: "",
            lastStart: "",
            materSnap: "",
            persnSnap: "",
            planEnd: "",
            planStart: "",
            postWork: "",
            realBroad: "",
            realEnd: "",
            realStart: "",
            realTransfer: "",
            realUseTime: "",
            schId: "",
            schSn: "",
            transferTime: "",
            workMethodSnap: "",
            workName: "",
            workflowId: "",
            isON: 0,
          };
          this.$set(this.eqInfoData[index], "eqScheduleData", data);
          this.$set(this.eqInfoData[index], "detail", data2);
          this.tabData.push(this.eqInfoData[index]);
        }
      }
      //设备排期
      this.$http.post("/api/vmEquimentInfoList").then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          for (let index2 = 0; index2 < this.tabData.length; index2++) {
            if (this.tabData[index2].equId === res.data[index].equId) {
              this.tabData[index2].eqScheduleData = res.data[index];
              this.$set(this.tabData[index2].eqScheduleData, "isON", "1");
            }
          }
        }
      });
      setTimeout(() => {
        //获取工序明细信息
        this.$http.post("/api/proScheduleDetailList").then((res) => {
          for (let index = 0; index < res.data.length; index++) {
            for (let index2 = 0; index2 < this.tabData.length; index2++) {
              if (
                res.data[index].detailId ==
                this.tabData[index2].eqScheduleData.detailId
              ) {
                this.tabData[index2].detail = res.data[index];
                if (this.tabData[index2].detail.isKey == true) {
                  this.tabData[index2].detail.isKey = "是";
                } else {
                  this.tabData[index2].detail.isKey = "否";
                }
                if (this.tabData[index2].detail.isRework == true) {
                  this.tabData[index2].detail.isRework = "是";
                } else {
                  this.tabData[index2].detail.isRework = "否";
                }
                this.$set(this.tabData[index2].detail, "isON", "1");
                this.$set(this.tabData[index2].detail, "frontWorkName", "");
                //获取工序数据
                this.$http
                  .get(
                    "/api/proWorkflowInfo?workflowId=" +
                      this.tabData[index2].detail.frontWork +
                      ""
                  )
                  .then((res) => {
                    this.tabData[index2].detail.frontWorkName =
                      res.data.workflowName;
                  });
              }
            }
          }
          this.loading = false;
        }, 1000);
      });
    },
    getData() {
      //设备类型
      this.$http.get("/api/baseEquipmentCategoryList").then((res) => {
        this.eqData = res.data;
      });
      //设备排期信息
      this.$http.post("/api/proEquipmentScheduleList").then((res) => {
        this.equIdData = res.data;
      });
      //设备信息
      this.$http.post("/api/baseEquipmentCategoryChildren").then((res) => {
        this.eqInfoData = res.data;
        this.handleClick();
      });
    },
    handleChange() {},
  },
  created() {
    this.getData();
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="">
.el-tabs__nav-next,
.el-tabs__nav-prev {
  line-height: 30px;
}
.eqsd .title {
  font-size: 16px;
}
.eqsd .time {
  font-size: 15px;
  margin-left: 15px;
}
.eqsd .box {
  margin: 0 5px;
}
.eqsd .box .el-tabs__nav-scroll,
.el-tabs__nav-wrap.is-scrollable {
  background: #fff !important;
}
.test {
  overflow: auto;
}
.eqsd .equipment {
  /* max-height: 120%; */
  height: calc(100vh - 155px);
  min-height: 500px;
  margin: 0;
  padding: 0;
  white-space: nowrap;
}
.eqsd .eqModel {
  width: 350px;
  height: 100%;
  float: left;
  margin: 0px 10px;
}
.eqName {
  text-align: left;
  float: left;
  font-size: 16px;
}
.eqsd .el-card__header {
  padding: 5px 10px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 350px;
}
.eqsd .el-tabs__nav-wrap.is-scrollable {
  background: white;
}
.eqsd .eqImg {
  width: 90%;
  height: 150px;
  margin: 10px auto;
}
.eqImg .img {
  height: 150px;
  width: 150px;
}
.eqsd .eqInfo {
  width: 100%;
  border-radius: 5px;
  background: #f0f9eb;
  margin: 5px 0;
  text-indent: 0.5em;
  letter-spacing: 2px;
  text-align: left;
}
/* .eqInfo .info1 {
  font-size: 15px;
  text-align: left;
  width: 45%;
  padding: 5px 8px;
  float: left;
} */
.el-tab-pane {
  width: 100%;
  overflow: auto;
}
.eqsd .el-tabs__nav-next,
.el-tabs__nav-prev {
  font-size: 18px;
}
</style>