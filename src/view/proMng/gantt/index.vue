<!--
 * @Author: Lyl
 * @Date: 2021-12-17 16:02:40
 * @LastEditors: Lyl
 * @LastEditTime: 2022-01-14 16:54:48
 * @Description: 
-->

<template>
  <div ref="gantt" style="width: 1000px; height: 500px"></div>
</template>
<script>
import { gantt } from "dhtmlx-gantt";
export default {
  name: "app",
  components: {
    // Gantt,
  },
  data() {
    return {
      tasks: {
        data: [
          {
            text: "Test001-001", //任务名
            start_date: "19-04-2017", //开始时间
            id: 1, //任务
            idduration: 13, //任务时长，从start_date开始计算
            progress: 0.6, //任务完成情况，进度
            parent: 2, //父任务
            IDuser: "李四", //成员
            planned_end: "19-04-2017", //计划开始时间
            planned_start: "10-04-2017", //计划结束时间
            show: false,
            open: true, //默认是否打开
            type: "project", // gantt.config.types.milestone为里程碑类型
            // project为项目任务类型，也就是摘要任务，        // task为普通任务类型
          },
          {
            id: 2,
            text: "Task #1",
            start_date: "15-04-2017",
            duration: 3,
            progress: 0.6,
          },
          {
            id: 3,
            text: "Task #2",
            startDate: "18-04-2017",
            duration: 3,
            progress: 0.4,
          },
        ],
        links: [
          // links为任务之间连接的线
          { id: 1, source: 1, target: 2, type: "0" }, //source根源 target目标 也就是从id为1的指向id为2的        //type:'0'是从1任务完成到2任务开始，type:'1'是1任务开始到2任务开始，        //type:'2'是从1任务完成到2任务完成，type:'3'是从1任务开始到2任务完成
        ],
      },
      zoomConfig: {
        levels: [
          {
            name: "day",
            scale_height: 27,
            min_column_width: 80,
            scales: [{ unit: "day", step: 1, format: "%d %M" }],
          },
          {
            name: "week",
            scale_height: 50,
            min_column_width: 50,
            scales: [
              {
                unit: "week",
                step: 1,
                format: function (date) {
                  var dateToStr = gantt.date.date_to_str("%d %M");
                  var endDate = gantt.date.add(date, 6, "day");
                  var weekNum = gantt.date.date_to_str("%W")(date);
                  return (
                    "#" +
                    weekNum +
                    ", " +
                    dateToStr(date) +
                    " - " +
                    dateToStr(endDate)
                  );
                },
              },
              { unit: "day", step: 1, format: "%j %D" },
            ],
          },
          {
            name: "month",
            scale_height: 50,
            min_column_width: 120,
            scales: [
              { unit: "month", format: "%F, %Y" },
              { unit: "week", format: "Week #%W" },
            ],
          },
          {
            name: "quarter",
            height: 50,
            min_column_width: 90,
            scales: [
              { unit: "month", step: 1, format: "%M" },
              {
                unit: "quarter",
                step: 1,
                format: function (date) {
                  var dateToStr = gantt.date.date_to_str("%M");
                  var endDate = gantt.date.add(
                    gantt.date.add(date, 3, "month"),
                    -1,
                    "day"
                  );
                  return dateToStr(date) + " - " + dateToStr(endDate);
                },
              },
            ],
          },
          {
            name: "year",
            scale_height: 50,
            min_column_width: 30,
            scales: [{ unit: "year", step: 1, format: "%Y" }],
          },
        ],
      },
    };
  },
  mounted() {
    gantt.i18n.setLocale("cn");
    gantt.config.start_date = new Date("2022-01-15 00:00:00");
    gantt.config.end_date = new Date("2022-01-19 00:00:00");
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.scales = [
      {
        unit: "day",
        step: 1,
        format: "%D",
      },
    ];
    gantt.config.duration_unit = "minute";
    gantt.config.subscales = [{ unit: "minute", step: 30, format: "%H:%i" }];
    gantt.init(this.$refs.gantt);
    gantt.parse(this.data.tasks);
    // gantt.ext.zoom.init(this.zoomConfig);
  },
};
</script>
