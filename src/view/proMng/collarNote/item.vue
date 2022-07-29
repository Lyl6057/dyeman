<template>
    <div id="collarNote">
        <view-container :title="(isAdd ? '新增' : '修改') + '收货台账'" :element-loading-text="$t('public.loading')"
            v-loading="wLoading" class="not-number-icon">
            <el-row class="btnList">
                <el-tooltip class="item" effect="dark" content="Lưu lại" placement="bottom">
                    <el-button type="success" @click="save">保存</el-button>
                </el-tooltip>
                <temaple v-if="this.isAdd" style="margin-left:7px;margin-right:7px">
                    <el-tooltip class="item" effect="dark" content="Thêm hàng" placement="bottom">
                        <el-button type="primary" @click="newRow">增加</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Xóa hàng" placement="bottom">
                        <el-button type="danger" @click="delRow">删除</el-button>
                    </el-tooltip>
                </temaple>
                <el-tooltip class="item" effect="dark" content="Thoát" placement="bottom">
                    <el-button type="warning" @click="close">取消</el-button>
                </el-tooltip>
            </el-row>
            <el-row class="formBox">
                <avue-form ref="form" :option="formOp" v-model="form" style="margin-top: 15px">
                    <template slot-scope="scope" slot="weaveJobCode">
                        <el-select v-model="form.weaveJobCode" filterable remote reserve-keyword clearable
                            default-first-option placeholder="请输入缸号" :remote-method="remoteMethod" @change="change">
                            <el-option v-for="item in  options" :key="item.weaveJobId" :label="item.weaveJobCode"
                                :value="item.weaveJobCode">
                            </el-option>
                        </el-select>
                    </template>
                </avue-form>
            </el-row>
            <el-row class="crudBox">
                <avue-crud ref="crud" id="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
                    @on-load="query" @row-dblclick="edit" @current-row-change="cellClick">
                    <template slot="itemActual" slot-scope="scope">
                        <div v-if="scope.row.dataStyle === 'string'">
                            <!-- string 类型 -->
                            <el-input v-model="scope.row.itemActual" type="number"></el-input>
                        </div>

                        <div v-else style="text-align: center">
                            <!-- boolean 类型 -->
                            <el-checkbox v-model="scope.row.itemActual" :true-label="1" :false-label="0"></el-checkbox>
                        </div>
                    </template>
                </avue-crud>
            </el-row>

        </view-container>
    </div>
</template>
<script>
import { dlgForm, mainDlgCrud } from "./data";
import { getZZ, post, put, get, getColorAPI } from "./api";
import { warning, error } from '@/seal/seal';
import { async } from 'q';

export default {
    name: "item",
    props: {
        detail: Object,
        isAdd: Boolean,

    },
    components: {
    },
    data() {
        return {
            formOp: dlgForm(this),
            form: {},
            crudOp: mainDlgCrud(this),
            crud: [],
            options: [],
            wLoading: false,
            vatLoading: false,
            refresh: true,
            weaveJobFk: "",
            currentRow: "",
            loading: false,
        }
    },
    methods: {
        getData() {
            if (this.isAdd) {
                setTimeout(() => {
                    this.form = {};
                }, 100);
            } else {
                this.wLoading = true;
                this.form = this.detail;
                this.weaveJobFk = this.detail.weaveJobFk;
                for (let key in this.form) {
                    if (this.form[key] == "undefined" || !this.form[key]) {
                        delete this.form[key];
                    }
                }
                this.crud[0] = this.detail
                this.crud[0].$cellEdit = true
                setTimeout(() => {
                    this.wLoading = false;
                }, 200);
            }
        },
        newRow() {
            this.crud.push({ index: this.crud.length + 1, $cellEdit: true });
            this.$refs.crud.setCurrentRow(this.crud[this.crud.length - 1]);
        },
        addRowStatus() {
            let crudColLen = this.crudOp.column.length;
            if (crudColLen < 9) {
                this.crudOp.column.push({
                    prop: `status`,
                    label: '保存状态',
                    placeholder: " ",
                    width: 150
                })
            }
        },
        delRow() {
            this.crud = this.crud.filter(item => item.index !== this.currentRow.index);
            this.currentRow = this.crud[0];
        },
        cellClick(val) {
            this.currentRow = val;
            console.log(this.currentRow);
        },
        save() {
            this.$refs.form.validate((valid, done) => {
                if (valid) {
                    if (this.validateValue() == false) {
                        done();
                        return;
                    }
                    if (this.isAdd) {
                        this.loading == true;
                        this.addRowStatus();
                        let scucessList = [];
                        this.AddNewRecord()
                    } else {
                        this.updateRecord()
                    }
                }
                setTimeout(() => {
                    done();
                }, 200);
            })
        },

        async updateRecord() {
            if (this.form.weaveJobCode != this.crud[0].weaveJobCode || this.form.colorName != this.crud[0].colorName) {
                this.$tip.warning("您不能修改织造编号或颜色，你可以外面删除然后重新做。 Bạn không thể chỉnh sửa Mã dệt và mã màu, bạn có thể xóa và thêm mới lại");
                return;
            }
            let e = this.crud[0];
            let params = Object.assign({ ...e })
            await put(params).then((res) => {
                if (res.data.code == 200) {
                    this.$tip.success("操作成功！ Thao tác thành công!");
                    this.close();
                } else {
                    this.$tip.error("操作失败！Vui lòng kiểm tra lại!")
                }
                i++;
            })
            this.loading == false;
        },
        async AddNewRecord() {
            let requestList = this.crud.filter(e => e.status != "成功");
            for (let i = 0; i < requestList.length; i++) {
                const e = requestList[i];
                if (!e.sizeInch || !e.sizeCm || !e.nw || !e.gw || !e.amount || !e.packageCount) {
                    this.crud[i].status = "失败";
                } else {
                    let params = Object.assign(this.form, {
                        weaveJobFk: this.weaveJobFk,
                        sizeInch: e.sizeInch,
                        sizeCm: e.sizeCm,
                        nw: e.nw,
                        gw: e.gw,
                        amount: e.amount,
                        yarnDesc: e.yarnDesc,
                        packageCount: e.packageCount
                    })
                    console.log("error", i);
                    await post(params).then((res) => {
                        if (res.data.code == 200) {
                            e.status = "成功";
                        } else {
                            e.status = "失败";
                        }
                    })
                }
            }
            let ar = this.crud.filter(e => e.status == "失败");
            if (ar.length == 0) {
                this.$tip.success("操作成功！ Thao tác thành công!");
                this.close();
            } else {
                this.$tip.error("操作失败！ Vui lòng kiểm tra lại!")
            }
            this.loading == false;
        },
        change(val) {
            const fk = this.options.findIndex(e => e.weaveJobCode == val);
            this.weaveJobFk = this.options[fk].weaveJobId;
            this.form.colorName = this.options[fk].colorName;
        },
        close() {
            if (this.refresh) {
                this.$emit("refresh");
                this.$emit("close");
            } else {
                this.$emit("close");
            }
        },
        remoteMethod(val) {
            if (!this.isAdd) {
                this.$tip.warning("不能修改织单编号, Không thể chỉnh sửa mã dệt");
                this.form.JobCode = this.detail.weaveJobCode;
                return;
            };
            this.vatLoading = true;
            getZZ({
                weaveJobCode: "!^%" + val,
                rows: 10,
                start: 1,
            }).then((res) => {
                this.options = res.data.records;
                this.vatLoading = false;
                this.$nextTick(() => {
                    if (res.data.records.length == 1) {
                        this.form.weaveJobCode = res.data.records[0].weaveJobCode;
                        setTimeout(() => {
                            this.codeChange();
                        }, 200);
                    }
                });
            });
        },
        validateValue() {
            return true;
        }
    },
    mounted() { this.getData() },
}
</script>