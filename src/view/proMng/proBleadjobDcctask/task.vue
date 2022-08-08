<template>
    <div id="task" :element-loading-text="loadLabel" v-loading="loading">
        <div class="btnList">
            <el-tooltip class="item" effect="dark" content="Tra cứu" placement="bottom">
                <el-button type="primary" @click="getData()">{{ this.$t("public.query") }}</el-button>
            </el-tooltip>
        </div>
        <div class="formBox">
            <avue-form ref="form" :option="FormOp" v-model="form" />
        </div>
        <div class="crudBox">
            <avue-crud ref="crud" :option="crudOp" :data="crud" :page.sync="page" v-loading="loading"
                @on-load="getData" />
        </div>
    </div>
</template>
<script>
import { taskCrud, mainForm } from "./data";
import { getProBleadjobDcctaskView } from "./api";

export default {
    name: "task",
    components: {},
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
                console.log(res);
                this.crud = res.data.records;
                this.page.total = res.data.total;
                this.crud.soft((a, b) =>
                    a.fdate - b.fdate < 0
                )
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
        }
    },
    mounted() {
        this.getData()
    }
}
</script>
<style>
</style>
