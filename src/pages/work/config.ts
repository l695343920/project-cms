/*
 * @Descripttion:
 * @Date: 2021-06-21 20:47:58
 */
export const option = {
  title: {
    text: "",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "邮件营销",
      type: "line",
      stack: "总量",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "联盟广告",
      type: "line",
      stack: "总量",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "视频广告",
      type: "line",
      stack: "总量",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "直接访问",
      type: "line",
      stack: "总量",
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "搜索引擎",
      type: "line",
      stack: "总量",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};

export const option1 = {
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: ["product", "2015", "2016", "2017"],
    source: [
      { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
      { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
      { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
      { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
    ],
  },
  xAxis: { type: "category" },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
};

export const option2 = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "搜索引擎" },
        { value: 735, name: "直接访问" },
        { value: 580, name: "邮件营销" },
        { value: 484, name: "联盟广告" },
        { value: 300, name: "视频广告" },
      ],
    },
  ],
};

export const option3 = {
  title: {
    text: "某站点用户访问来源",
    subtext: "纯属虚构",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "搜索引擎" },
        { value: 735, name: "直接访问" },
        { value: 580, name: "邮件营销" },
        { value: 484, name: "联盟广告" },
        { value: 300, name: "视频广告" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

export const option4 = {
  title: {
    text: "世界人口总量",
    subtext: "数据来自网络",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["2011年", "2012年"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: "category",
    data: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"],
  },
  series: [
    {
      name: "2011年",
      type: "bar",
      data: [18203, 23489, 29034, 104970, 131744, 630230],
    },
    {
      name: "2012年",
      type: "bar",
      data: [19325, 23438, 31000, 121594, 134141, 681807],
    },
  ],
};
