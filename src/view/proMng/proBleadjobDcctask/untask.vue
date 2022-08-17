<template>
    <div id="task" :element-loading-text="loadLabel" v-loading="loading">
        <div class="btnList">
            <el-tooltip class="item" effect="dark" content="Chọn" placement="bottom">
                <el-button type="success" @click="add()">绑定</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Tra cứu" placement="bottom">
                <el-button type="primary" @click="getData()">{{ this.$t("public.query") }}</el-button>
            </el-tooltip>
        </div>
        <div class="formBox">
            <avue-form ref="form" :option="FormOp" v-model="form" />
        </div>
        <div class="crudBox">
            <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading" @on-load="getData"
                @row-dblclick="handleRowDBLClick" @row-click="handleCellClick" @selection-change="selectionChange" />
        </div>
        <el-dialog id="choiceDlg" :visible.sync="dialogVisible" fullscreen append-to-body :close-on-click-modal="false"
            v-if="dialogVisible">
            <craft :bleadyeJobId="detailID" @close="dialogVisible = false" />
        </el-dialog>
    </div>
</template>
<script>
import { unTaskCrud, QueryForm } from "./data";
import { getproBleadyeJobPage, postProBleadjobDcctask } from "./api";
import craft from "./craft.vue";
import temDlg from "../print/dyeing/temDlg.vue";

export default {
    name: "untask",
    components: {
        temDlg,
        craft
    },
    data() {
        return {
            loadLabel: "加载中...",
            loading: false,
            FormOp: QueryForm(this),
            form: {},
            crudOp: unTaskCrud(this),
            crud: [],
            page: {
                pageSizes: [20, 50, 100, 200],
                pageSize: 20,
                currentPage: 1,
                total: 0
            },
            selection: [],
            detail: {},
            isAdd: false,
            refresh: true,
            dialogVisible: false,
            detailID: ""
        }
    },
    methods: {
        getData() {
            this.loading = true;
            this.selection = [];
            for (var key in this.form) {
                if (this.form[key] === "") {
                    delete this.form[key];
                }
            }
            let params = Object.assign(this.form, {
                vatNo: (this.form.vatNo) ? `%${this.form.vatNo}` : "%",
                weaveJobCode: (this.form.weaveJobCode) ? `%${this.form.weaveJobCode}` : "%",
                salPoNo: (this.form.salPoNo) ? `%${this.form.salPoNo}` : "%",
                rows: this.page.pageSize,
                start: this.page.currentPage,
            });
            getproBleadyeJobPage(params).then((res) => {
                this.crud = res.data.records;
                this.page.total = res.data.total;
            }
            )
            if (this.form.vatNo.indexOf("%") !== -1) {
                this.form.vatNo = this.form.vatNo.split("%")[1] || "";
            }
            if (this.form.weaveJobCode.indexOf("%") !== -1) {
                this.form.weaveJobCode = this.form.weaveJobCode.split("%")[1] || "";
            }
            if (this.form.salPoNo.indexOf("%") !== -1) {
                this.form.salPoNo = this.form.salPoNo.split("%")[1] || "";
            }
            setTimeout(() => {
                this.loading = false;
            }, 300);
        },
        add() {
            if (this.selection.length === 0) {
                this.$tip.warning("您还没选择, Bạn chưa lựa chọn ！");
                return;
            }
            this.selection.map(async (e, i) => {
                if (e.dyeMathine == null) {
                    this.$tip.error("染缸機台號不能为空， Số máy của bồn nhộm không được trống!");
                } else {
                    this.$tip.cofirm("您确定需要绑定缸号 【" + e.vatNo + "】 吗？").then(() => {
                        postProBleadjobDcctask(e.bleadyeJobId).then((res) => {
                            if (res.data.code === 200) {
                                this.$tip.success(res.data.msg);
                            } else {
                                this.$tip.error(res.data.msg);
                            }
                        })
                    })
                }
                await this.$nextTick();
            })
        },
        handleRowDBLClick() {

        },
        handleCellClick(val) {
            this.detailID = val.bleadyeJobId;
            this.dialogVisible = true;
        },
        selectionChange(val) {
            this.selection = val;
        }
    },
    mounted: {}
}
</script>
<style>
</style>
