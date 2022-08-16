<template>
    <div id="craft-only-read">
        <el-row>
            <div class="btnList">
                <el-tooltip class="item" effect="dark" content="Thoát" placement="bottom">
                    <el-button type="warning" @click="close">{{ this.$t("public.close") }}</el-button>
                </el-tooltip>
            </div>
        </el-row>
        <el-row>
            <el-col :span="12">
                <view-container title="生產工藝">
                    <div class="crudBox">
                        <avue-crud ref="crudTechargue" :option="techargueCrud" :data="crudTG" v-loading="loading"
                            @row-click="handleCellClick" />
                    </div>
                </view-container>
            </el-col>
            <el-col :span="12">
                <view-container title="工藝明細">
                    <div class="crudBox">
                        <avue-crud :option="codeItemCrud" :data="crudCI" />
                    </div>
                </view-container>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { taskCrud, mainForm } from "./data";
import { getProBleadjobDccitem, getProBleadyeJobTechargue, getProBleadyeJobTechItem } from "./api";
import { techargueCrud, codeItemCrud } from "./data";

export default {
    name: "TaskDetail",
    components: {},
    props: {
        vatNo: String
    },
    data() {
        return {
            loadLabel: "加载中...",
            loading: false,
            FormOp: mainForm(this),
            techargueCrud: techargueCrud(this),
            codeItemCrud: codeItemCrud(this),
            crudCI: [],
            crudTG: [],
            form: {},
            crud: [],
            page: {
                pageSizes: [20, 50, 100, 200],
                pageSize: 20,
                currentPage: 1,
                total: 0
            },
            techItem: [],
        }
    },
    methods: {

        handleCellClick(val) {
            let temp = this.techItem;
            this.crudCI = temp.filter(e => e.proBleadyeJobTechargueFk == val.jobTechId)
            this.crudCI.map((e, i) => {
                e.index = i + 1;
            })
        },
        getData() {
            //Tìm job_id 
            //Tra cứu toàn bộ item 
            //sắp xếp theo nhóm tìm ra id của nhóm 
            //lấy về thông tin nhóm chính + tên 
            // mặc định nhóm được chọn đầu tiên
            this.loading = true;
            if (this.vatNo.split("_").length != 2 && this.vatNo.split("_")[1] == null) {
                return;
            }
            const job_dcc_id = this.vatNo.split("_")[1];
            let ListTask = [];
            let ListTechID = [];
            getProBleadjobDccitem({ jobDccFk: job_dcc_id }).then(async (res) => {
                ListTask = res.data;
                if (ListTask.length == 0) {
                    this.$tip.error("没找到数据！");
                    this.loading = false;
                    return;
                }
                for (let index = 0; index < ListTask.length; index++) {
                    const element = ListTask[index];
                    await getProBleadyeJobTechItem({ techItemId: element.techItemId }).then((res) => {
                        try {
                            this.techItem.push(res.data[0]);
                        } catch (error) {
                            this.$tip.error(`操作出现问题${error}`)
                        }
                    })
                }
                this.techItem.map((e) => {
                    if (ListTechID.findIndex(item => item.id == e.proBleadyeJobTechargueFk) == -1) {
                        ListTechID.push({
                            id: e.proBleadyeJobTechargueFk
                        })
                    };
                })
                for (let index = 0; index < ListTechID.length; index++) {
                    const element = ListTechID[index];
                    await getProBleadyeJobTechargue({ jobTechId: element.id }).then((res) => {
                        try {
                            if (res.data.length > 0) {
                                this.crudTG.push(res.data[0])
                            }
                        } catch (error) {
                            this.$tip.error(`操作出现问题${error}`)
                        }
                    })
                }
                this.crudTG.sort((a, b) => { return a.sn - b.sn });
                this.crudTG.map((e, i) => {
                    e.index = i + 1;
                })
                this.$refs.crudTechargue.setCurrentRow(this.crudTG[0]);
                this.handleCellClick(this.crudTG[0]);
                this.loading = false;
            })
        },
        close() {
            this.$emit("close");
        },
    },
    mounted() {
        this.getData()
    }
}
</script>
<style>
</style>
