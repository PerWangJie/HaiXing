<template>
  <div class="lineChart">
    <div id="line" style="width: 100%; height: 100%" ref="line"></div>
  </div>
</template>
<script>
import { defineComponent, Ref, ref, onMounted, onCreated } from "vue";
import * as echarts from "echarts";
export default {
  setup() {
    let resize = () => {
      let myChart = echarts.init(document.getElementById("line"));
      myChart.resize();
    };
    let echartInit = () => {
      console.log(111);
      let myChart = echarts.init(document.getElementById("line"));
      // 指定图表的配置项和数据
      let option = (option = {
        color: ["#2B9DFF"],
        grid: {
          top: 30,
          bottom: 30,
          left: 40,
          right: 40,
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: "#FFF",
            },
            axisLine: {
              color: "#D6D6D6",
            },
            data: [
              "2016-1",
              "2016-2",
              "2016-3",
              "2016-4",
              "2016-5",
              "2016-6",
              "2016-7",
              "2016-8",
              "2016-9",
              "2016-10",
              "2016-11",
              "2016-12",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#FFF",
            },
            splitLine: {
              lineStyle: {
                color: "#D6D6D6",
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            name: "2016 降水量",
            type: "line",
            showSymbol: false,
            smooth: true,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(43, 157, 255, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(43, 157, 255, 0)",
                },
              ]),
            },
            data: [
              3.9,
              5.9,
              11.1,
              18.7,
              48.3,
              69.2,
              231.6,
              46.6,
              55.4,
              18.4,
              10.3,
              0.7,
            ],
          },
        ],
      });
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    };
    //onMounted
    onMounted(() => {
      echartInit();
      window.addEventListener("resize", () => {
        echarts.init(document.getElementById("line")).resize();
      });
    });
    //return
    return {
      echartInit,
      resize,
    };
  },
};
</script>

<style lang="scss" scoped>
.lineChart {
  width: 100%;
  height: 100%;
}
</style>
