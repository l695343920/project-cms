<!--
 * @Descripttion: 工作台页面
 * @Date: 2021-05-26 20:39:46
-->
<template>
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :lg="6" v-for="(item, index) in cardData">
      <a-card class="id_card" :style="{ background: item.bg }">
        <a-row type="flex" justify="space-between">
          {{ item.title }}
          <component :is="antIcons[item.icons]"></component
        ></a-row>
        <a-row type="flex" align="bottom">
          <span class="value">{{ item.value }}</span>
          <span>{{ item.unit }}</span>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
  <a-row></a-row>
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :lg="12">
      <div id="main"></div>
    </a-col>
    <a-col :xs="24" :lg="12">
      <div id="sub"></div>
    </a-col>
  </a-row>
  <a-row>
    <a-col :xs="24" :lg="8"> <div id="small"></div></a-col>
    <a-col :xs="24" :lg="8"> <div id="small1"></div> </a-col>
    <a-col :xs="24" :lg="8"> <div id="small2"></div></a-col>
  </a-row>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  getCurrentInstance,
  onUnmounted,
} from "vue";
import * as echarts from "echarts";
import { option, option1, option2, option3, option4 } from "./config";

export default defineComponent({
  name: "Work",
  setup(props, ctx) {
    let myChartMain: any,
      myChartSub: any,
      myChartSmall: any,
      myChartSmall1: any,
      myChartSmall2: any;
    onMounted(() => {
      initMian();
      initSub();
      initSmall();
      initSmall1();
      initSmall2();
    });

    onUnmounted(() => {
      myChartMain.dispose();
      myChartSub.dispose();
      myChartSmall.dispose();
      myChartSmall1.dispose();
      myChartSmall2.dispose();
    });

    const initMian = () => {
      let chartDom = document.getElementById("main");
      if (!chartDom) return false;
      myChartMain = echarts.init(chartDom);
      option && myChartMain.setOption(option);
      window.addEventListener("resize", function () {
        myChartMain.resize();
      });
    };

    const initSub = () => {
      let chartDom = document.getElementById("sub");
      if (!chartDom) return false;
      myChartSub = echarts.init(chartDom);
      option && myChartSub.setOption(option1);
      myChartSub.resize();
      window.addEventListener("resize", function () {
        myChartSub.resize();
      });
    };

    const initSmall = () => {
      let chartDom = document.getElementById("small");
      if (!chartDom) return false;
      myChartSmall = echarts.init(chartDom);
      option && myChartSmall.setOption(option2);
      myChartSmall.resize();
      window.addEventListener("resize", function () {
        myChartSmall.resize();
      });
    };

    const initSmall1 = () => {
      let chartDom = document.getElementById("small1");
      if (!chartDom) return false;
      myChartSmall1 = echarts.init(chartDom);
      option && myChartSmall1.setOption(option3);
      myChartSmall1.resize();
      window.addEventListener("resize", function () {
        myChartSmall1.resize();
      });
    };

    const initSmall2 = () => {
      let chartDom = document.getElementById("small2");
      if (!chartDom) return false;
      myChartSmall2 = echarts.init(chartDom);
      option && myChartSmall2.setOption(option4);
      window.addEventListener("resize", function () {
        myChartSmall2.resize();
      });
    };
    const currentInstance: any = getCurrentInstance();

    const antIcons =
      currentInstance.appContext.config.globalProperties.$antIcons;
    return {
      antIcons,
      cardData: [
        {
          title: "客户",
          icons: "TeamOutlined",
          value: "100000000",
          unit: "位",
          bg: "linear-gradient(#ca6230, #fb9e38)",
        },
        {
          title: "合同",
          icons: "FileDoneOutlined",
          value: "100000000",
          unit: "份",
          bg: "linear-gradient(#cf3843, #ec4850)",
        },
        {
          title: "订单",
          icons: "ProfileOutlined",
          value: "50000",
          unit: "单",
          bg: "linear-gradient(#1c69c5, #158ab4)",
        },
        {
          title: "商品",
          icons: "ShoppingOutlined",
          value: "50000",
          unit: "件",
          bg: "linear-gradient(#4740c8, #7e5de7)",
        },
      ],
    };
  },
});
</script>

<style lang="less">
.id_card {
  width: 100%;
  color: #fdeff0;
  font-weight: bold;
  border-radius: 4px;
  .anticon {
    font-size: 18px;
  }
  .value {
    font-size: 24px;
    margin-right: 10px;
  }
}

#main,
#sub,
#small,
#small1,
#small2 {
  width: 94%;
  height: 300px;
  margin-top: 20px;
}
</style>
