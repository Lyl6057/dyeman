<!--
 * @Author: PMP
 * @Date: 2022-07-13 12:55:12
 * @LastEditors: 
 * @LastEditTime: 
 * @Description:
-->
<template>
    <div id="clothMerge" :element-loading-text="$t('public.loading')" v-loading="wLoading" style="{height:50vh}">
        <el-dialog :visible.sync="confirmVisible" append-to-body width="35%" center style="text-align: center">
            <view-container title="确定合并">
                <div style="{padding: 17px;margin:17px}">
                    <el-form ref="formcofirm" :model="marge" label-width="120px" class="demo-ruleForm">
                        <el-form-item label="合并成品号码" prop="productNo">
                            <el-select v-model="marge.productNo" placeholder="请选下合并后成品编号" size="medium">
                                <el-option v-for="item in crud" :label="item.productNo" :key="item.productNo"
                                    :value="item.productNo">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在部门">
                            <el-select v-model:value="marge.handDtp" placeholder="请选下部门" size="medium" :disabled="true">
                                <el-option v-for="item in comboDpt" :label="item.dptName" :value="item.dptCode"
                                    :key="item.dptCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="操作的人：" size="medium" prop="mergeStaff">
                            <el-input v-model="marge.mergeStaff" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="合并原因：">
                            <el-input type="textarea" v-model="marge.margeRemark" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="post">确定</el-button>
                            <el-button @click="confirmVisible = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </view-container>
        </el-dialog>
        <view-container :title="(this.edit != null) ? '修改成品布合并' : '成品布合并'">
            <el-row class="btnList">
                <el-button type="success" @click="handCreate" :disabled="!crud.length"> {{ (this.edit !=
                        null) ? "保存" : "合并"
                }}</el-button>
                <el-button type="danger" @click="clear" :disabled="!crud.length">全删</el-button>
                <el-button type="warning" @click="handleClose">{{ this.$t("public.close") }}</el-button>
            </el-row>
            <div class="formBox">
                <avue-form ref="formOp" :option="formOp" v-model="form">
                    <template slot-scope="scope" slot="productNo">
                        <el-select v-model="form.productNo" filterable remote reserve-keyword clearable
                            default-first-option placeholder="请输入成品编号" :remote-method="remoteMethod"
                            :loading="vatLoading" @change="queryCheck(2)">
                            <el-option v-for="item in options" :key="item.cardId" :label="item.productNo"
                                :value="item.productNo">
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="scope" slot="vatNo">
                        <el-select v-model="form.vatNo" filterable remote reserve-keyword clearable default-first-option
                            placeholder="请输入成品编号" :remote-method="remoteMethod" :loading="vatLoading"
                            @change="queryCheck(1)">
                            <el-option v-for="item in options" :key="item.cardId" :label="item.vatNo"
                                :value="item.vatNo">
                            </el-option>
                        </el-select>
                    </template>
                </avue-form>
            </div>
            <el-row class="crudBox">
                <el-col :span="20">
                    <avue-crud ref="crud" :data="crud" :option="crudOp" v-loading="loading"
                        @selection-change="selectionChange">
                        <template slot-scope="scope" slot="menu">
                            <el-button type="danger" plain @click="remove(scope)">删除</el-button>
                        </template>
                    </avue-crud>
                </el-col>
                <el-col :span="4">
                    <el-card class="box-card"
                        style="text-align: left;padding-left: 10px;width:97%;height: calc(100vh - 200px)">
                        <div slot="header" class="clearfix">
                            <span>合并信息</span>
                        </div>
                        <p>
                            <span style="font-weight: 600;">合并后毛重(公斤): {{ marge.margeGwKg }} KG </span>
                        </p>
                        <p style="">
                            <span style="font-weight: 600; ">合并后毛重(磅): {{ marge.margeGwLbs }} LBS</span>
                        </p>
                        <p>
                            <span style="font-weight: 600;">合并后净重(公斤): {{ marge.margeNwKg }} KG</span>
                        </p>
                        <p>
                            <span style="font-weight: 600;">合并后净重(磅): {{ marge.margeNwLbs }} LBS</span>
                        </p>
                        <p>
                            <span style="font-weight: 600;">码长: {{ marge.yardLength }} </span>
                        </p>
                        <p>
                            <span style="font-weight: 600;">疋号: {{ marge.pidNo }}</span>
                        </p>
                    </el-card>
                </el-col>
            </el-row>
        </view-container>
    </div>
</template>
<script>
import { dlgForm, dlgCrud } from "./data";
import { getLoginOrg } from "@/api/index";
import { error } from '@/seal/seal';
import { getPort } from '@/api/mto/Rt/index.js';
import { async } from 'q';
import {
    getinfoCard,
    getFinishedNoteByPage,
    getMargePage,
    postMarge,
    updateMarge,
    deleteMarge,
    getMargePagedtl,
    postMargedtl,
    updateMargedtl,
    getMargeDetaildtl,
    deleteMargedtl,
    getallDpt,
    getMargedtl
} from "./api";
export default {
    name: "add",
    props: { edit: { type: Object, } },
    components: {},
    data() {
        return {
            formOp: dlgForm(this),
            form: {
                vatNo: '',
                productNo: ''
            },
            crudOp: dlgCrud(this),
            crud: [],
            page: {
                pageSize: 100,
                pageSizes: [20, 50, 100, 200, 500],
                total: 0,
            },
            loading: false,
            dialogVisible: false,
            detail: {
                weightUnit: "KG",
            },
            margeID: {
                mergeId: ""
            },
            marge: {
                margeRemark: "",
                margeGwKg: 0,
                margeGwLbs: 0,
                margeNwKg: 0,
                margeNwLbs: 0,
                pidNo: 0,
                productNo: '',
                yardLength: 0.0,
                mergeStaff: '',
                handDtp: '',
                cardId: '',
                vatNo: ''
            },
            deleteCrud: [],
            newCrud: [],
            spowerClient: "",
            wLoading: false,
            selectList: [],
            comboDpt: [],
            options: [],
            hasRefresh: false,
            confirmVisible: false,
            vatLoading: false,
            oldData: []
        };
    },
    watch: {},
    methods: {
        post() {
            let editMarge = (this.edit != null);
            // if (!this.marge.mergeStaff) { this.$tip.error("操作人不能为空， Vui lòng nhập tên người thao tác!"); return; }
            const date = new Date();
            const mon = ((date.getMonth() + 1) < 10) ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
            const HH = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
            const MM = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
            const ss = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();
            let datetime = date.getFullYear() + '-' + mon + '-' + date.getDate() + ' ' + HH + ":" + MM + ':' + ss;
            this.marge.cardId = (editMarge) ? this.edit.cardId : this.crud.filter(e => e.productNo == this.marge.productNo)[0].cardId;
            this.marge.mergeDate = datetime;
            if (this.edit != null) {
                this.$tip.cofirm("您确定需要修改合并吗？ Bạn có chắc chắn chỉnh sửa những thành phẩm này không?").then(() => {
                    this.marge.productNo = this.edit.productNo;
                    this.marge.mergeStaff = this.edit.mergeStaff;
                    this.marge.margeRemark = this.edit.margeRemark;
                    updateMarge(Object.assign(this.marge, this.mergeId)).then((res) => {
                        if (res.data.code == 200) {
                            if (this.newCrud.length > 0) {
                                this.newCrud.map((e) => {
                                    postMargedtl({
                                        productNo: e.productNo,
                                        productMergeFk: this.margeID.mergeId,
                                        productCardFk: e.cardId
                                    }).then((res) => {
                                        if (res.data.code != 200) {
                                            this.$tip.error("操作发生问题，错误号码： 103 ，Lỗi không thể thực hiện thao tác này, mã lỗi: 103!");
                                            this.wLoading = false;
                                            return;
                                        }
                                    })
                                })
                            }
                            if (this.deleteCrud.length > 0) {
                                this.deleteCrud.map((item) => {
                                    let array = this.oldData;
                                    let index = array.findIndex(e => e.productNo == item.row.productNo);
                                    if (index != -1) {
                                        deleteMargedtl(array[index].dtlId).then((res) => {
                                            if (res.data.code != 200) {
                                                this.$tip.error("操作发生问题，错误号码： 103 ，Lỗi không thể thực hiện thao tác này, mã lỗi: 104!");
                                                this.wLoading = false;
                                                return;
                                            }
                                        })
                                    }
                                })
                            }
                        }
                        setTimeout(() => {
                            this.$tip.success("修改成功, Chỉnh sửa thành công!");
                            this.confirmVisible = false;
                            this.wLoading = false;
                            this.hasRefresh = true;
                            this.handleClose();
                        }, 200);
                    })
                }).catch({})
            } else {
                this.$tip.cofirm("您确定需要合并这些成品布吗？ Bạn có chắc chắn hợp nhất những thành phẩm này lại với nhau không?").then(() => {
                    this.wLoading = true;
                    this.QueryAdd(this.marge);
                }).catch({})

            }
        },
        QueryAdd(params) {
            postMarge(params).then((res) => {
                if (res.data.code == 200) {
                    const productMergeFk = res.data.data;
                    this.crud.map((e) => {
                        postMargedtl({
                            productNo: e.productNo,
                            productMergeFk: productMergeFk,
                            productCardFk: e.cardId
                        }).then((res) => {
                            if (res.data.code != 200) {
                                deleteMarge(productMergeFk);
                                deleteMargedtl(productMergeFk);
                                this.$tip.error("操作发生问题，错误号码： 103 ，Lỗi không thể thực hiện thao tác này, mã lỗi: 103!");
                                console.error(res);
                                this.wLoading = false;
                                return;
                            }
                        })
                    })
                    this.$tip.success("合并成功，Hợp nhất thành công!");
                } else {
                    this.$tip.error("操作发生问题，Lỗi không thể thực hiện thao tác này!");
                    console.error(res)
                }
            })
            setTimeout(() => {
                this.confirmVisible = false;
                this.wLoading = false;
                this.hasRefresh = true;
                this.handleClose();
            }, 200);
        },
        queryCheck(type) {
            let data = (type == 1) ? { vatNo: this.form.vatNo } : { productNo: this.form.productNo };
            if (type == 2) {
                getMargedtl({
                    productNo: this.form.productNo
                }).then((res) => {
                    if (res.data.length > 0) {
                        this.$tip.error("这成品编号 【" + this.form.productNo + "】 已合并过了， 请你选别的! Mã này đã hợp nhất rồi, vui lòng chọn mã khác!");
                        this.form.productNo = "";
                        return;
                    }
                    const param = Object.assign(JSON.parse(JSON.stringify(data)));
                    this.loading = true;

                    getinfoCard(param).then((res) => {
                        if (res.data.length > 0) {
                            res.data.map((e) => {
                                if (this.crud.length > 0) {
                                    if (this.crud[0].vatNo != e.vatNo) {
                                        this.$tip.error("请选成品编号同一个缸号, Vui lòng chọn mã thành chẩm cùng mã lô nhộm");
                                        this.loading = false;
                                        return;
                                    }
                                }
                                if (this.crud.findIndex((el) => el.cardId == e.cardId) == -1) {

                                    this.crud.push(e);
                                    this.newCrud.push(e);

                                    setTimeout(() => {
                                        this.$refs.crud.setCurrentRow(this.crud[1]);
                                        this.calculation(this.crud);
                                        this.loading = false;
                                        this.$tip.success("添加成品信息成功！Thêm thông tin thành phẩm thành công!")
                                    }, 200);
                                }
                            })
                            this.form.vatNo = '';
                            this.form.productNo = '';
                        }
                    }).catch((error) => {

                        this.loading = false;
                        console.error(error);
                        this.$tip.error("操作发生问题， 请联系IT负责！ Lỗi , vui lòng liên hệ IT");
                    })

                })
            };


        },
        getPdtNo(productNo) {
            let data = { productNo: productNo };
            const param = Object.assign(JSON.parse(JSON.stringify(data)));
            getinfoCard(param).then((res) => {
                if (res.data.length > 0) {
                    res.data.map((e) => { if (this.crud.findIndex((el) => el.cardId == e.cardId) == -1) { this.crud.push(e); } })
                    this.form.vatNo = '';
                    this.form.productNo = '';
                }
            }).catch((error) => {
                console.error(error);
                this.$tip.success("操作发生问题， 请联系IT负责！ Lỗi , vui lòng liên hệ IT");
                return;
            })
        },
        remoteMethod(val) {
            this.vatLoading = true;
            getFinishedNoteByPage({
                productNo: "!^%" + val,
                rows: 20,
                start: 1,
                page: 1,
                cardType: 1,
            }).then((res) => {
                this.options = res.data.records;
                this.vatLoading = false;
            });
        },
        selectionChange(list) {
            if (list.length > 0) {
                this.selectList = list;
            } else {
                this.selectList = [];
            }
            this.calculation(this.selectList);
        },
        sum(data, name) {
            if (data.length == 0) return 0;
            let sum = 0;
            data.map((e) => {
                if (e[name]) {
                    sum = sum + e[name];
                }
            })
            return sum.toFixed(1);
        },
        remove(val) {
            if (this.edit != null) {
                if (this.edit.productNo == val.row.productNo) {
                    this.$tip.error("您不能删除这个成品编号，如果需要删除麻烦在主界面删除重新合并！ Bạn không được xóa mã này!");
                    return;
                }
            }
            if (this.crud.length > 0) {
                let index = this.crud.findIndex(e => e == val.row)
                if (index != -1) {
                    this.crud.splice(index, 1);
                    if (this.edit != null) { this.deleteCrud.push(val); }
                    let newIndex = this.newCrud.findIndex(e => e == val.row)
                    if (newIndex != -1) {
                        this.crud.splice(newIndex, 1);
                    }
                    this.$tip.success("删除成功！ Xóa thành công!");
                } else {
                    this.$tip.error("操作发生问题！Thao tác bị lỗi !");
                }
                this.calculation(this.crud);
            }

        },
        print() {
            if (!this.spowerClient || this.spowerClient.readyState == 3) {
                this.setCz();
                this.$tip.error("打印程序离线，请启动服务!");
                return;
            }
            this.selectList.forEach((item, i) => {
                this.spowerClient.send("print=finishCard:" + item.cardId);
                if (i == this.selectList.length - 1) {
                    this.$tip.success("已发送全部打印请求!");
                }
            });
        },
        clear() {
            if (this.edit != null) {
                this.$tip.warning("在修改界面不能全部删除, Không thể xóa toàn bộ khi đang chỉnh sửa");
            } else {
                this.crud = [];
                this.$tip.success("删除成功！ Xóa thành công!");
            }
        },
        handleClose() {
            this.$emit("close", true);
            this.hasRefresh = false;
        },
        handCreate() {
            if (this.crud.length < 2) { this.$tip.warning("请您先加多输入成品号码， Vui lòng chọn nhiều hơn 1!"); return; }
            if (this.edit != null) {
                this.post();
            } else {
                this.marge.productNo = this.crud[0].productNo;
                this.confirmVisible = true;
            }
        },
        calculation(list) {
            this.marge.margeGwKg = this.sum(list, 'grossWeight');
            this.marge.margeGwLbs = this.sum(list, 'grossWeightLbs');
            this.marge.margeNwKg = this.sum(list, 'netWeight');
            this.marge.margeNwLbs = this.sum(list, 'netWeightLbs');
            this.marge.pidNo = (this.sum(list, 'pidNo') == 0) ? 0 : this.sum(list, 'pidNo').split('.')[0];
            this.marge.yardLength = this.sum(list, 'yardLength');
            this.marge.vatNo = (!list.length) ? "" : list[0].vatNo;
        },
    },
    updated() { },
    beforeRouteEnter(to, form, next) {
        next((vm) => {
            // vm.setCz();
        });
    },
    beforeRouteLeave(to, from, next) {
        this.spowerClient = null;
        next();
    },
    created() {

    },
    async mounted() {
        const user = parent.userID;
        this.marge.mergeStaff = user;
        if (this.edit != null) {
            this.marge = this.edit
            this.margeID.mergeId = this.edit.mergeId;
            getMargeDetaildtl(this.edit.mergeId).then((res) => {
                this.oldData = res.data;
                res.data.map((e) => { this.getPdtNo(e.productNo); })
                setTimeout(() => {
                    this.calculation(this.crud);
                    this.loading = false;
                }, 200);
            })
        }
        let result = await getallDpt();
        this.comboDpt = result.data;
        await getLoginOrg({ account: user }).then((ress) => {
            if (ress.data.orgno == null) return;
            if (result.data.length > 0) {
                result.data.map((e) => {
                    let children = e.orgNo.split(',');
                    if (children.length > 0) {
                        let index = children.findIndex(e => e == ress.data.orgno);
                        if (index != -1) {
                            this.marge.handDtp = e.dptCode;
                        }
                    }
                })
            }

        });

    },
    beforeDestroy() { },
};
</script>
<style lang='stylus'>
.demo-input-label {
    display: inline-block;
    width: 130px;
  }
#clothFlyWeight
  .el-table
    overflow visible !important
  .el-tag--mini
    display none !important
#normal_Dlg
  .el-dialog__header
    padding 20px !important
    text-align center
  .el-dialog__body
    padding 10px !important
    text-align center
</style>
