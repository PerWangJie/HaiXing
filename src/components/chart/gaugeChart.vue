<template>
  <div class="gaugeChart">
    <div id="gauge" style="width: 100%; height: 100%" ref="gauge"></div>
  </div>
</template>
<script>
import { defineComponent, Ref, ref, onMounted, onCreated } from "vue";
import * as echarts from "echarts";
export default {
  setup() {
    let resize = () => {
      let myChart = echarts.init(document.getElementById("gauge"));
      myChart.resize()
    };
    let echartInit = () => {
      let myChart = echarts.init(document.getElementById("gauge"));
      // 指定图表的配置项和数据
      let option = {
        grid: {
          top: 'top',
          bottom: '20%'
        },
        series: [
          {
            type: "gauge",
            progress: {
              show: true,
              width: 40,
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
              shadowColor: "rgba(0,138,255,0.45)",
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            axisLine: {
              lineStyle: {
                width: 40,
              },
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 24,
              color: '#00EDFF',
              offsetCenter: [0, "60%"],
            },
            data: [
              {
                value: '50',
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    };
    //onMounted
    onMounted(() => {
      echartInit();
      window.addEventListener("resize", () => {
        echarts.init(document.getElementById("gauge")).resize();
      });
    });
    //return
    return {
      echartInit,
      resize
    };
  },
};
</script>

<style lang="scss" scoped>
.gaugeChart {
  width: 100%;
  height: 100%;
  position: relative;
  top: -20px;
}
</style>
