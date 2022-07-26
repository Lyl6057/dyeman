<template>
    <div id="collarNote">
        <view-container :title="(isAdd ? '新增' : '修改') + '收货台账'" :element-loading-text="$t('public.loading')"
            v-loading="wLoading" class="not-number-icon">
            <el-row class="btnList">
                <el-tooltip class="item" effect="dark" content="Lưu lại" placement="bottom">
                    <el-button type="success" @click="save">保存</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Thoát" placement="bottom">
                    <el-button type="warning" @click="close">取消</el-button>
                </el-tooltip>
            </el-row>
            <el-row class="formBox">
                <avue-form ref="form" :option="formOp" v-model="form" style="margin-top: 15px">
                    <template slot-scope="scope" slot="weaveJobCode">
                        <el-select v-model="form.weaveJobCode" filterable remote reserve-keyword clearable
                            default-first-option placeholder="请输入缸号" :remote-method="remoteMethod" @change="change">
                            <el-option v-for="item in  options" :key="item.weaveJobCode" :label="item.weaveJobCode"
                                :value="item.weaveJobCode">
                            </el-option>
                        </el-select>
                    </template>
                </avue-form>
            </el-row>
        </view-container>
    </div>
</template>
<script>
import { dlgForm } from "./data";
import { getZZ, post, put, get } from "./api";
import { warning, error } from '@/seal/seal';
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
            options: [],
            wLoading: false,
            vatLoading: false,
            refresh: true,
            weaveJobFk: ""
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
                setTimeout(() => {
                    this.wLoading = false;
                }, 200);
            }
        },
        save() {
            this.$refs.form.validate((valid, done) => {

                if (valid) {
                    if (this.validateValue() == false) {
                        done();
                        return;
                    }
                    let params = Object.assign(this.form, {
                        weaveJobFk: this.weaveJobFk,
                    })
                    if (this.isAdd) {
                        get({
                            weaveJobCode: this.form.weaveJobCode,
                            rows: 10,
                            start: 1
                        }).then((res) => {
                            if (res.data.records.length > 0) {
                                this.$tip.cofirm("这个织造编号【】已经做了收货单， 您确认需要继续吗？ Mã này bạn đã khởi tạo qua rồi, bạn có muốn tiếp tục không?").then(() => {
                                    this.addNew(params);
                                })
                            } else {
                                this.addNew(params);
                            }

                        })

                    } else {
                        this.$tip.cofirm("您确定需要修改吗？ Bạn có chắc chắc muốn lưu không?").then(() => {
                            put(params).then((res) => {
                                if (res.data.code == 200) {
                                    this.$tip.success(res.data.msg);
                                    this.close();
                                } else {
                                    this.$tip.error(res.data.msg);
                                }
                            })
                        })

                    }
                }
                setTimeout(() => {
                    done();
                }, 200);
            })
        },
        addNew(params) {
            post(params).then((res) => {
                if (res.data.code == 200) {
                    this.$tip.success(res.data.msg);
                    this.close();
                } else {
                    this.$tip.error(res.data.msg);
                }
            })
        },
        change(val) {
            const fk = this.options.findIndex(e => e.weaveJobCode == val);
            this.weaveJobFk = this.options[fk].weaveJobFk;
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
            // if (!isNaN(this.form.nw) || !isNaN(this.form.gw)) {
            //     this.$tip.error("重量必须是数字");
            //     return false;
            // }
            // if (Number.isInteger(this.form.amount) || Number.isInteger(this.form.packageCount)) {
            //     this.$tip.error("数量必须是数字");
            //     return false;
            // }
            return true;
        }
    },

    mounted() { this.getData() },

}
</script>