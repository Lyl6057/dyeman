<template>
  <div id="imWl_Dlg">
    <view-container
      title="仓库维护"
      element-loading-text="拼命加载中"
      v-loading="wLoading"
    >
      <div class="btnList">
        <el-button type="success" @click="save">保存</el-button>
        <el-button type="warning" @click="close">关闭</el-button>
      </div>

      <div class="formBox">
        <avue-form ref="form" :option="formOp" v-model="form"></avue-form>
      </div>
      <el-row>
        <el-col :span="24">
          <view-container title="仓库分区">
            <div class="btnList">
              <el-button type="primary" @click="addPar">新增</el-button>
              <el-button type="danger" @click="delPar">删除</el-button>
              <el-button type="primary" @click="setLoc">货位定义</el-button>
              <el-button type="danger" @click="delAllLoc">清除货位</el-button>
            </div>
            <div class="crudBox" style="margin-top: 5px">
              <avue-crud
                ref="partion"
                id="partion"
                :option="partionOp"
                :data="partion"
                :page.sync="parPage"
                v-loading="loading"
                @on-load="query"
                @current-row-change="cellClick"
              ></avue-crud>
            </div> </view-container
        ></el-col>
      </el-row>
      <el-dialog
        id="colorMng_Dlg"
        :visible.sync="locDlg"
        fullscreen
        width="100%"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        v-if="locDlg"
        :before-close="handleClose"
      >
        <div>
          <view-container title="货位列表">
            <div class="btnList">
              <el-button type="success" @click="saveLoc">保存</el-button>
              <el-button type="primary" @click="addLoc">新增</el-button>
              <el-button type="danger" @click="delLoc">删除</el-button>
              <el-button type="warning" @click="addLocX"
                >自动生成货位</el-button
              >
              <el-button
                type="danger"
                @click="
                  locDlg = false;
                  change = false;
                "
                >关闭</el-button
              >
            </div>
            <el-row class="shelvesBox">
              <el-col :span="24">
                <avue-form
                  ref="shelves"
                  :option="shelvesOp"
                  v-model="shelves"
                ></avue-form
              ></el-col>
            </el-row>

            <div class="crudBox" style="margin-top: 5px">
              <avue-crud
                ref="loc"
                id="loc"
                :page.sync="locPage"
                :option="locOp"
                :data="loc"
                v-loading="locLoding"
                @current-row-change="locClick"
                @on-load="getLoc"
              ></avue-crud>
            </div>
          </view-container>
        </div>
      </el-dialog>
    </view-container>
  </div>
</template>
<script>
import { popupForm, partitionCrud, shelvesForm, locCrud } from "./data";
import {
  getDepth,
  getCodeSupply,
  addWarehouse,
  updateWarehouse,
  getPartition,
  addPartition,
  updatePartition,
  delPartition,
  // 货架
  getShelves,
  addShelves,
  updateShelves,
  delShelves,
  // 货位
  getLocation,
  addLocation,
  updateLocation,
  delLocation,
  delAllLocation,
} from "./api";

import { getDIC, getDicT, getXDicT, postDicT, preFixInt } from "@/config";
import { baseCodeSupply } from "@/api/index";
import { getUcmlUser } from "@/const/whse.js";
export default {
  name: "",
  props: {
    detail: Object,
    isAdd: Boolean,
  },
  data() {
    return {
      wLoading: false,
      formOp: popupForm(this),
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      refresh: false,
      code: getDIC("bas_companyCode"),
      partionOp: partitionCrud(this),
      partion: [],
      parPage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      loading: false,
      oldData: {},
      chooseData: {},
      shelvesOp: shelvesForm(this),
      shelves: {
        shelves: "",
        cs: 1,
        hws: 1,
        kbs: 1,
      },
      shelvesNum: 0,
      locOp: locCrud(this),
      loc: [],
      locPage: {
        pageSize: 100,
        currentPage: 1,
        total: 0,
      },
      locLoding: false,
      locOldData: {},
      locChooseData: {},
      shelvesType: 0,
      change: false,
      locDlg: false,
    };
  },
  watch: {},
  methods: {
    query(val) {
      if (this.isAdd) {
        this.form = {};
      } else {
        this.wLoading = true;
        getPartition({
          whseWarehouseFk: this.form.whseWarehouseoid,
          rows: this.parPage.pageSize,
          start: this.parPage.currentPage,
        })
          .then((res) => {
            let records = res.data;
            this.parPage.total = records.total;
            this.partion = records.records;
            this.partion.sort((a, b) => {
              return a.partitionId - b.partitionId;
            });
            this.partion.forEach((item, index) => {
              item.index = index + 1;
              if (index === this.partion.length - 1) {
                this.$refs.partion.setCurrentRow(this.partion[0]);
                this.wLoading = false;
              }
            });
            if (this.partion.length === 0) {
              this.wLoading = false;
            }
          })
          .catch((e) => {
            this.wLoading = false;
          });
      }
    },
    getLoc(val) {
      if (this.chooseData.whsePartitionoid) {
        this.locLoding = true;
        getLocation({
          whsePartitionFk: this.chooseData.whsePartitionoid,
          rows: this.locPage.pageSize,
          start: this.locPage.currentPage,
        })
          .then((res) => {
            let records = res.data;
            this.locPage.total = records.total;
            this.loc = records.records;
            this.loc.forEach((item, index) => {
              item.index = index + 1;
              if (index === this.loc.length - 1) {
                setTimeout(() => {
                  this.locLoding = false;
                  this.$refs.loc.setCurrentRow({});
                  this.locChooseData = {};
                }, 200);
                if (val === 1) {
                  this.$tip.success("保存成功!");
                }
              }
            });

            if (this.loc.length === 0) {
              this.locLoding = false;
            }
          })
          .catch((e) => {
            this.locLoding = false;
          });
      }
    },
    setLoc() {
      if (
        this.chooseData === undefined ||
        Object.keys(this.chooseData).length === 0
      ) {
        this.$tip.error("请选择要定义的数据!");
        return;
      }
      if (!this.chooseData.whsePartitionoid) {
        this.$tip.error("请先保存该分区数据!");
        return;
      }
      this.shelves.warehouseId = this.form.warehouseId;
      this.shelves.warehouseName = this.form.warehouseName;
      this.shelves.areaCode = this.chooseData.areaCode;
      this.locDlg = true;
    },
    cellClick(val) {
      this.oldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.oldData = val;
      this.chooseData = val;
    },
    locClick(val) {
      this.locOldData.$cellEdit = false;
      this.$set(val, "$cellEdit", true);
      this.locOldData = val;
      this.locChooseData = val;
    },
    addPar() {
      // 新增分区
      this.partion.push({
        index: this.partion.length + 1,
      });
      this.$refs.partion.setCurrentRow(this.partion[this.partion.length - 1]);
      this.$nextTick(() => {
        let dom = document
          .getElementById("partion")
          .getElementsByClassName("el-table__body-wrapper")[0];
        dom.scrollTo(0, dom.scrollHeight);
      });
    },
    delPar() {
      if (
        this.chooseData === undefined ||
        Object.keys(this.chooseData).length === 0
      ) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.chooseData.whsePartitionoid) {
        this.partion.splice(this.chooseData.index - 1, 1);
        this.parPage.total--;
        this.partion.forEach((item, i) => {
          item.index = i + 1;
        });
        this.$refs.partion.setCurrentRow(this.partion[0] || {});
        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除分区代号为 【 " +
            this.chooseData.partitionId +
            " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          delPartition(this.chooseData.whsePartitionoid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.partion.splice(this.chooseData.index - 1, 1);
                this.$refs.partion.setCurrentRow(this.partion[0] || {});
                this.partion.forEach((item, i) => {
                  item.index = i + 1;
                });
                // this.chooseData = {};
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
    },
    addLoc() {
      if (
        this.chooseData === undefined ||
        Object.keys(this.chooseData).length === 0
      ) {
        this.$tip.error("请选择要定义的数据!");
        return;
      }
      if (!this.chooseData.whsePartitionoid) {
        this.$tip.error("请先保存该分区数据!");
        return;
      }
      // 新增货位
      this.loc.push({
        index: this.loc.length + 1,
      });
      this.locPage.total++;
      // this.change = true;
      this.$refs.loc.setCurrentRow(this.loc[this.loc.length - 1]);
      this.$nextTick(() => {
        let dom = document
          .getElementById("loc")
          .getElementsByClassName("el-table__body-wrapper")[0];
        dom.scrollTo(0, dom.scrollHeight);
      });
    },
    addLocX() {
      if (this.change && this.loc.length != 0) {
        this.$tip.error("请先保存此次生成的货位!");
        return;
      }
      if (
        (this.shelvesType === "0" || this.shelvesType === "1") &&
        this.shelves.shelves === ""
      ) {
        this.$tip.error("请输入货架!");
        return;
      }
      if (
        this.shelvesType != "3" &&
        (this.shelves.cs === undefined || this.shelves.cs === "")
      ) {
        this.$tip.error("请输入层数!");
        return;
      }
      if (this.shelves.hws === "" || this.shelves.hws === undefined) {
        this.$tip.error("请输入货位数!");
        return;
      }
      if (
        (this.shelvesType === "0" && this.shelves.kbs === "") ||
        this.shelves.kbs === undefined
      ) {
        this.$tip.error("请输入卡板数!");
        return;
      }
      // 获取货架流水号
      this.locLoding = true;
      getShelves({
        whseWarehouseFk: this.form.whseWarehouseoid,
        whsePartitionFk: this.chooseData.whsePartitionoid,
      }).then((res) => {
        if (res.data.length === 0) {
          // 获取货架流水号
          this.shelvesNum = "001";
        } else {
          this.shelvesNum = preFixInt(Number(res.data.length) + 1, 3);
        }
        console.log(this.form, this.shelves);
        if (this.shelvesType === "0") {
          for (let i = 0; i < this.shelves.cs; i++) {
            // 层数
            for (let j = 0; j < this.shelves.hws; j++) {
              // 货位数
              for (let k = 0; k < this.shelves.kbs; k++) {
                // 卡板数
                let layerCode = preFixInt(i + 1, 2);
                let latticeCode = preFixInt(j + 1, 2);
                let cardCode = preFixInt(k + 1, 2);
                this.loc.push({
                  warehouseId: this.form.warehouseId,
                  whseWarehouseFk: this.form.whseWarehouseoid,
                  areaCode: this.chooseData.areaCode,
                  shelves: this.shelves.shelves,
                  shelvesCode: this.shelvesNum,
                  layerCode: layerCode,
                  latticeCode: latticeCode,
                  cardCode: cardCode,
                  locationCode: `${this.form.warehouseId}-${this.chooseData.areaCode}-${this.shelvesNum}-${layerCode}-${latticeCode}-${cardCode}`,
                });
              }
            }
          }
          this.chooseData.shelves = {
            areaCode: this.chooseData.areaCode,
            shelves: this.shelves.shelves,
            shelvesCode: this.shelvesNum,
            warehouseId: this.form.warehouseId,
            whsePartitionFk: this.chooseData.whsePartitionoid,
            whseWarehouseFk: this.form.whseWarehouseoid,
          };
        }
        if (this.shelvesType === "1") {
          for (let i = 0; i < this.shelves.cs; i++) {
            // 层数
            for (let j = 0; j < this.shelves.hws; j++) {
              // 货位数
              let layerCode = preFixInt(i + 1, 2);
              let latticeCode = preFixInt(j + 1, 2);
              this.loc.push({
                warehouseId: this.form.warehouseId,
                whseWarehouseFk: this.form.whseWarehouseoid,
                areaCode: this.chooseData.areaCode,
                shelves: this.shelves.shelves,
                shelvesCode: this.shelvesNum,
                layerCode: layerCode,
                latticeCode: latticeCode,
                locationCode: `${this.form.warehouseId}-${this.chooseData.areaCode}-${this.shelvesNum}-${layerCode}-${latticeCode}-00`,
              });
            }
          }
          this.chooseData.shelves = {
            areaCode: this.chooseData.areaCode,
            shelves: this.shelves.shelves,
            shelvesCode: this.shelvesNum,
            warehouseId: this.form.warehouseId,
            whsePartitionFk: this.chooseData.whsePartitionoid,
            whseWarehouseFk: this.form.whseWarehouseoid,
          };
        }
        if (this.shelvesType === "2") {
          for (let i = 0; i < this.shelves.cs; i++) {
            // 层数
            for (let j = 0; j < this.shelves.hws; j++) {
              // 货位数
              let layerCode = preFixInt(i + 1, 2);
              let latticeCode = preFixInt(j + 1, 2);
              this.loc.push({
                warehouseId: this.form.warehouseId,
                whseWarehouseFk: this.form.whseWarehouseoid,
                areaCode: this.chooseData.areaCode,
                shelves: "",
                shelvesCode: "000",
                layerCode: layerCode,
                latticeCode: latticeCode,
                locationCode: `${this.form.warehouseId}-${this.chooseData.areaCode}-000-${layerCode}-${latticeCode}-00`,
              });
            }
          }
        }
        if (this.shelvesType === "3") {
          for (let i = 0; i < this.shelves.hws; i++) {
            // 层数
            // 货位数
            let latticeCode = preFixInt(i + 1, 2);
            this.loc.push({
              warehouseId: this.form.warehouseId,
              whseWarehouseFk: this.form.whseWarehouseoid,
              areaCode: this.chooseData.areaCode,
              shelves: "",
              shelvesCode: "000",
              layerCode: "00",
              latticeCode: latticeCode,
              locationCode: `${this.form.warehouseId}-${this.chooseData.areaCode}-000-00-${latticeCode}-00`,
            });
          }
        }
        this.loc.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.loc.length - 1) {
            this.change = true;
            this.$refs.loc.setCurrentRow(this.loc[this.loc.length - 1]);
            this.locLoding = false;
          }
        });
        this.locPage.total = this.loc.length;
        this.$nextTick(() => {
          let dom = document
            .getElementById("loc")
            .getElementsByClassName("el-table__body-wrapper")[0];
          dom.scrollTo(0, dom.scrollHeight);
        });
      });
    },
    delLoc() {
      if (
        this.locChooseData === undefined ||
        Object.keys(this.locChooseData).length === 0
      ) {
        this.$tip.error("请选择要删除的数据!");
        return;
      }
      if (!this.locChooseData.whseLocationoid) {
        this.loc.splice(this.locChooseData.index - 1, 1);

        this.locPage.total--;
        this.loc.forEach((item, i) => {
          item.index = i + 1;
          if (i === this.loc.length - 1) {
            this.$nextTick(() => {
              this.$refs.loc.setCurrentRow({});
              this.locChooseData = {};
            });
          }
        });

        return;
      }
      this.$tip
        .cofirm(
          "是否确定删除货位码为 【 " +
            this.locChooseData.locationCode +
            " 】 的数据?",
          this,
          {}
        )
        .then(() => {
          delLocation(this.locChooseData.whseLocationoid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("删除成功");
                this.loc.splice(this.locChooseData.index - 1, 1);
                this.getLoc();
                // this.$refs.loc.setCurrentRow(this.loc[0] || {});
                // this.loc.forEach((item, i) => {
                //   item.index = i + 1;
                // });
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
    },
    delAllLoc() {
      if (
        this.chooseData === undefined ||
        Object.keys(this.chooseData).length === 0
      ) {
        this.$tip.error("请选择要清空的数据!");
        return;
      }
      this.$tip
        .cofirm(
          "是否确定清空分区代号为 【 " +
            this.chooseData.partitionId +
            " 】 的货位数据?",
          this,
          {}
        )
        .then(() => {
          delAllLocation(this.chooseData.whsePartitionoid)
            .then((res) => {
              if (res.data.code === 200) {
                this.$tip.success("清空成功");
              } else {
                this.$tip.error("清空失败");
              }
            })
            .catch((err) => {
              this.$tip.error("清空失败!");
            });
        })
        .catch((err) => {
          this.$tip.warning("取消操作");
        });
    },
    save() {
      if (this.form.warehouseId === "" || this.form.warehouseName === "") {
        this.$tip.error("仓代号/仓库名称不能为空!");
        return;
      } else if (
        this.form.warehouseType === "" ||
        this.form.warehouseLength === ""
      ) {
        this.$tip.error("仓库类型/仓库规格不能为空!");
        return;
      }
      for (let i = 0; i < this.partion.length; i++) {
        if (
          this.partion[i].partitionId === "" ||
          this.partion[i].partitionId === null ||
          this.partion[i].partitionId === undefined
        ) {
          this.$tip.error("分区代号不能为空!");
          return;
        }
        if (
          this.partion[i].areaCode === "" ||
          this.partion[i].areaCode === null ||
          this.partion[i].areaCode === undefined
        ) {
          this.$tip.error("区位码不能为空!");
          return;
        }
        if (
          this.partion[i].warehouseModel === "" ||
          this.partion[i].warehouseModel === null ||
          this.partion[i].warehouseModel === undefined
        ) {
          this.$tip.error("货位模型不能为空!");
          return;
        }
      }
      this.wLoading = true;
      this.refresh = true;
      if (this.form.whseWarehouseoid) {
        updateWarehouse(this.form).then((res) => {
          if (this.partion.length === 0) {
            setTimeout(() => {
              this.wLoading = false;
            }, 200);
            this.$tip.success("保存成功!");
          }
          let addDtla = (item, i) => {
            return new Promise((resolve, reject) => {
              let data = JSON.parse(JSON.stringify(item));
              data.list = [];
              data.shelves = [];
              data.warehouseId = this.form.warehouseId;
              if (item.whsePartitionoid) {
                updatePartition(data).then((res) => {
                  resolve();
                });
                // 修改
              } else {
                // 新增
                data.whseWarehouseFk = this.form.whseWarehouseoid;
                addPartition(data).then((res) => {
                  item.whsePartitionoid = res.data.data;
                  resolve();
                });
              }
            });
          };
          let promiseArr = this.partion.map((item, i) => {
            return addDtla(item, i);
          });
          Promise.all(promiseArr).then((res) => {
            setTimeout(() => {
              this.wLoading = false;
            }, 200);
            this.$tip.success("保存成功!");
            // for (let i = 0; i < this.partion.length; i++) {
            //   if (this.partion[i].list) {
            //     this.partion[i].list.forEach((item) => {
            //       item.areaCode = this.chooseData.areaCode;
            //       item.warehouseId = this.form.warehouseId;
            //       item.whseWarehouseFk = this.form.whseWarehouseoid;
            //       if (!item.whseLocationoid) {
            //         item.whsePartitionFk = this.partion[i].whsePartitionoid;
            //         addLocation(item).then((res) => {
            //           item.whseLocationoid = res.data.data;
            //         });
            //       } else {
            //         updateLocation(item).then((res) => {});
            //       }
            //     });
            //   }
            //   if (this.partion[i].shelves) {
            //   }
            //   if (i === this.partion.length - 1) {
            //     // this.getDetail();
            //     // this.detail = this.form;
            //     this.query(1);
            //     this.isAdd = false;
            //   }
            // }
          });
        });
      } else {
        // this.form.whseWarehouseFk = this.form.whseWarehouseoid;
        getUcmlUser({ usrLogin: parent.userID }).then((Res) => {
          this.form.sysCreatedby = Res.data.ucmlUseroid;
          addWarehouse(this.form).then((res) => {
            if (this.partion.length === 0) {
              setTimeout(() => {
                this.wLoading = false;
              }, 200);
              this.$tip.success("保存成功!");
            }
            this.form.whseWarehouseoid = res.data.data;
            // this.$emit("getData");
            let addDtla = (item, i) => {
              return new Promise((resolve, reject) => {
                let data = JSON.parse(JSON.stringify(item));
                data.list = [];
                data.shelves = [];
                data.warehouseId = this.form.warehouseId;
                if (item.whsePartitionoid) {
                  updatePartition(data).then((res) => {
                    resolve();
                  });
                  // 修改
                } else {
                  // 新增
                  data.whseWarehouseFk = this.form.whseWarehouseoid;
                  addPartition(data).then((res) => {
                    item.whsePartitionoid = res.data.data;
                    resolve();
                  });
                }
              });
            };
            let promiseArr = this.partion.map((item, i) => {
              return addDtla(item, i);
            });
            Promise.all(promiseArr).then((res) => {
              setTimeout(() => {
                this.wLoading = false;
              }, 200);
              this.$tip.success("保存成功!");
              // if (this.partion[i].list) {
              //   this.partion[i].list.forEach((item) => {
              //     item.areaCode = this.chooseData.areaCode;
              //     item.warehouseId = this.form.warehouseId;
              //     item.whseWarehouseFk = this.form.whseWarehouseoid;
              //     if (!item.whseLocationoid) {
              //       item.whsePartitionFk = this.partion[i].whsePartitionoid;
              //       addLocation(item).then((res) => {
              //         item.whseLocationoid = res.data.data;
              //       });
              //     } else {
              //       updateLocation(item).then((res) => {});
              //     }
              //   });
              // }
              // if (this.partion[i].shelves) {
              //   addShelves(this.partion[i].shelves).then((res) => {});
              // }
            });
            // if (i === this.partion.length - 1) {
            //   // this.detail = this.form;
            //   this.query(1);
            //   this.isAdd = false;
            //   setTimeout(() => {
            //     this.$tip.success("保存成功!");
            //     // this.wLoading = false;
            //   }, 200);
            // }
          });
        });
      }
    },
    saveLoc() {
      if (this.loc.length === 0) {
        return;
      }
      this.locLoding = true;
      this.loc.forEach((item, i) => {
        if (item.whseLocationoid) {
          updateLocation(item).then((res) => {});
        } else {
          item.whsePartitionFk = this.chooseData.whsePartitionoid;
          addLocation(item).then((res) => {
            item.whseLocationoid = res.data.data;
          });
        }
        if (i === this.loc.length - 1) {
          setTimeout(() => {
            this.getLoc(1);
            this.change = false;
            addShelves(this.chooseData.shelves).then((res) => {});
            // this.locLoding = false;
          }, 200);
        }
      });
    },
    model() {
      this.$nextTick(() => {
        this.shelvesType = this.chooseData.warehouseModel;
        this.shelvesOp = shelvesForm(this);
      });
    },
    handleClose(done) {
      this.change = false;
      done();
    },
    close() {
      if (this.refresh) {
        this.$emit("refresh");
        this.$emit("close");
      } else {
        this.$emit("close");
      }
    },
    getNowTime() {
      const time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mi = time.getMinutes();
      let s = time.getSeconds();
      m = m < 10 ? `0${m}` : m;
      d = d < 10 ? `0${d}` : d;
      h = h < 10 ? `0${h}` : h;
      mi = mi < 10 ? `0${mi}` : mi;
      s = s < 10 ? `0${s}` : s;
      return `${y}-${m}-${d}`;
    },
  },
  created() {
    if (!this.isAdd) {
      this.form = this.detail;
    }
  },
  mounted() {
    // this.getData();
  },
  beforeDestroy() {},
};
</script>
<style lang='stylus'>
#imWl_Dlg {
  .shelvesBox {
    margin-top: 5px;

    .el-input-number .el-input__inner {
      text-align: left !important;
    }

    // .el-form-item--mini.el-form-item {
    // margin-bottom: 0px;
    // }
    .el-input-number__increase, .el-input-number__decrease {
      display: none;
    }
  }

  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__headerbtn {
    top: 3px;
    font-size: 18px;
    font-weight: bold;
    z-index: 9;
  }

  .el-dialog__headerbtn .el-dialog__close, #sxrcDlg .el-dialog__headerbtn .el-dialog__close, #wkDlg .el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 24px;
  }

  .el-tag--mini {
    height: 24px;
    padding: 0 5px;
    line-height: 24px;
    font-size: 14px;
  }

  .el-select .el-tag__close.el-icon-close {
    right: -5px;
    height: 18px;
    width: 18px;
    line-height: 18px;
  }

  .avue-form .el-input--mini input {
    height: 35px !important;
    line-height: 35px;
  }
}
</style>