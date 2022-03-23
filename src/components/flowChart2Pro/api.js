

import axios from "axios";


// 获取工序流程图数据
export function fetchFlowChartData2Pro(params) {
    return axios({
      url: "/api/pro/rpt/flow/chart/pro",
      method: "get",
      params:params
    });
  }