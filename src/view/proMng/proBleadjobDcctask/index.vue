<template>
  <div id="pro-blead-job-dcc-task">
    <el-tabs v-model="tabName" type="border-card">
      <el-tab-pane name="task" label="已中控任务">
        <Task></Task>
      </el-tab-pane>
      <el-tab-pane name="untask" label="未中控任务">
        <UnTask></UnTask>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Task from "./task.vue"
import UnTask from "./untask.vue"

export default {
  name: "",
  components: {
    Task,
    UnTask,
  },
  data() {
    return {
      tabName: 'task'
    };
  },
  mounted() {
  },
};
</script>
