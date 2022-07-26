<template>
    <div id="collarNote">
        <view-container :title="(isAdd ? '新增' : '修改') + '收货台账'" :element-loading-text="$t('public.loading')"
            v-loading="wLoading" class="not-number-icon">
            <el-row class="btnList">
                <el-button type="success" @click="save">保存</el-button>
                <el-button type="warning" @click="close">取消</el-button>
            </el-row>
            <el-row class="formBox">
                <avue-form ref="form" :option="formOp" v-model="form" style="margin-top: 15px">
                    <template slot-scope="scope" slot="JobCode">
                        <el-select v-model="form.JobCode" filterable remote reserve-keyword clearable
                            default-first-option placeholder="请输入缸号" :remote-method="remoteMethod" @change="change">
                            <el-option v-for="item in 
                            " :key="item.weaveJobCode" :label="item.weaveJobCode" :value="item.weaveJobCode">
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
import { getZZ, post } from "./api";
import { warning } from '@/seal/seal';
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
            vatLoading: false
        }
    },
    methods: {
        save() {
            this.$refs.form.validate((valid, done) => {
                if (valid) {
                    if (this.isAdd) {
                        let params = Object.assign({
                            sizeInch: this.form.sizeInch,
                            sizeCm: this.form.sizeCm,
                            nw: this.form.nw,
                            gw: this.form.gw,
                            amount: this.form.amount,
                            yarnDesc: this.form.yarnDesc,
                            packageCount: this.form.packageCount,
                            colorName: this.form.colorName,
                            weaveJobCode: this.form.JobCode.weaveJobCode,
                            weaveJobFk: this.form.JobCode.weaveJobId,
                        })
                        post(params).then((res) => {
                            if (res.data.code == 200) {
                                this.$tip.success(res.data.msg);
                                this.close();
                            } else {
                                this.$tip.error(res.data.msg);
                            }
                        })
                    }
                }
            })
        },
        change(val) {

            const fk = this.options.findIndex(e => e.weaveJobCode == val);
            console.log(fk);
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
        initForm() {
            this.form.JobCode = "";
            this.form.colorName = "";
            this.form.sizeInch = "";
            this.form.sizeCm = "";
            this.form.nw = "";
            this.form.gw = "";
            this.form.amount = "";
            this.form.yarnDesc = "";
            this.form.packageCount = "";
        }
    },
    watch: {
        isAdd(newQuestion, oldQuestion) {
            this.initForm();
        },
        detail(newQuestion, oldQuestion) {
            this.initForm();
        }
    },
    mounted() { },
    beforeDestroy() {
        console.log("sadas");
    },
}
</script>