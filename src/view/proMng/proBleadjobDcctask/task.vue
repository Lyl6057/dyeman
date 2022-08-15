<template>
    <div id="task" :element-loading-text="loadLabel" v-loading="loading">
        <div class="btnList">
            <el-tooltip class="item" effect="dark" content="Tra cứu" placement="bottom">
                <el-button type="primary" @click="getData()">{{ this.$t("public.query") }}</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Xóa" placement="bottom">
                <el-button type="danger" @click="deleleData()" :disabled="!detailID">{{ this.$t("public.del") }}
                </el-button>
            </el-tooltip>
        </div>
        <div class="formBox">
            <avue-form ref="form" :option="FormOp" v-model="form">
                <template slot-scope="scope" slot="fdataid">
                    <el-select v-model="form.fdataid" filterable remote clearable default-first-option
                        placeholder="请输入染缸機台號" @change="changeDyeMathine">
                        <el-option v-for="item in dyeMathineList" :key="item.equipmentCode" :label="item.equipmentCode"
                            :value="item.equipmentCode">
                        </el-option>
                    </el-select>
                </template>
            </avue-form>
        </div>
        <div class="crudBox">
            <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
                @row-dblclick="handleRowDBLClick" @row-click="handleCellClick" @on-load="getData" />
        </div>
        <el-dialog id="choiceDlg" :visible.sync="dialogVisible" fullscreen append-to-body :close-on-click-modal="false"
            v-if="dialogVisible">
            <TaskDetail :vatNo="detailID" @close="dialogVisible = false" />
        </el-dialog>
    </div>
</template>
<script>
import { taskCrud, mainForm } from "./data";
import { getProBleadjobDcctaskView, getProBleadjobDccitem, deleteProBleadjobDccitem, deleteProBleadjobDcctask } from "./api";
import TaskDetail from "./TaskDetail.vue";
import { postBaseEquipmentList } from "../print/dyeing/api";
export default {
    name: "task",
    components: {
        TaskDetail
    },
    data() {
        return {
            loadLabel: "加载中...",
            loading: false,
            FormOp: mainForm(this),
            crudOp: taskCrud(this),
            form: {},
            crud: [],
            page: {
                pageSizes: [20, 50, 100, 200],
                pageSize: 20,
                currentPage: 1,
                total: 0
            },
            dialogVisible: false,
            detailID: "",
            dyeMathineList: []
        }
    },
    methods: {
        getData() {
            this.loading = true;
            for (var key in this.form) {
                if (this.form[key] === "") {
                    delete this.form[key];
                }
            }
            let params = Object.assign(this.form, {
                fmono: (this.form.fmono) ? `%${this.form.fmono}` : "%",
                fno: (this.form.fno) ? `%${this.form.fno}` : "%",
                rows: this.page.pageSize,
                start: this.page.currentPage,
            });
            getProBleadjobDcctaskView(params).then((res) => {
                this.crud = res.data.records;
                this.page.total = res.data.total;
                this.crud.sort((a, b) => {
                    var c = new Date(a.fdate.replace(/-/g, "-")).getTime();
                    var d = new Date(b.fdate.replace(/-/g, "-")).getTime();
                    return d - c
                });
                this.crud.map((e, i) => {
                    e.index = i + 1;
                })
            })
            if (this.form.fmono.indexOf("%") !== -1) {
                this.form.fmono = this.form.fmono.split("%")[1] || "";
            }
            if (this.form.fno.indexOf("%") !== -1) {
                this.form.fno = this.form.fno.split("%")[1] || "";
            }
            setTimeout(() => {
                this.loading = false;
            }, 300);

        },
        async deleleData() {
            //Tìm job_id 
            //Tra cứu toàn bộ item 
            //Xóa Item  
            //Xóa nhóm
            let isComfirn = await this.$tip.cofirm(`您确定需要删除【${this.detailID}】吗？Bạn có chắc chắn xóa không?`).then(res => true).catch(err => false);
            if (!isComfirn) return false;
            this.loading = true;
            if (this.detailID.split("_").length != 2 && this.detailID.split("_")[1] == null) {
                return;
            }
            const job_dcc_id = this.detailID.split("_")[1];
            let ListTask = [];
            getProBleadjobDccitem({ jobDccFk: job_dcc_id }).then(async (res) => {
                ListTask = res.data;
                if (ListTask.length > 0) {
                    for (let index = 0; index < ListTask.length; index++) {
                        const element = ListTask[index];
                        try {
                            await deleteProBleadjobDccitem(element.itemId).then((res) => {
                                if (res.data.code != 200) {
                                    this.$tip.error(res.data.msg);
                                    return;
                                }
                            })
                        } catch (error) {
                            this.$tip.error(`操作出现问题${error}`)
                        }
                    }
                }
                deleteProBleadjobDcctask(job_dcc_id).then((res) => {
                    if (res.data.code != 200) {
                        this.$tip.error(res.data.msg);
                    } else {
                        this.$tip.success(res.data.msg);
                    }
                })
                this.getData();
                this.loading = false;
            })
        },
        handleRowDBLClick() {
            this.dialogVisible = true;
        },
        handleCellClick(val) {
            this.detailID = val.fmono;
        }
    },
    mounted() {
        postBaseEquipmentList().then((res) => {
            res.data.sort((a, b) => {
                { return (a.equIdentCode.replace(/[^0-9]/g, '') > b.equIdentCode.replace(/[^0-9]/g, '')) ? 1 : -1; }
            });
            this.dyeMathineList = res.data;
        })
        this.getData();
    }
}
</script>
<style>
</style>
