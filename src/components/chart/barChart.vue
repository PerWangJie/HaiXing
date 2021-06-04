<template>
  <div class="barChart">
    <div id="bar" style="width: 100%; height: 100%" ref="bar"></div>
  </div>
</template>
<script>
import { defineComponent, Ref, ref, onMounted, onCreated } from "vue";
import * as echarts from "echarts";
export default {
  setup() {
    let resize = () => {
      let myChart = echarts.init(document.getElementById("bar"));
      myChart.resize();
    };
    let echartInit = () => {
      let myChart = echarts.init(document.getElementById("bar"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          data: [
            "Direct",
            "Mail Ad",
            "Affiliate Ad",
            "Video Ad",
            "Search Engine",
          ],
          right: "20",
          itemGap: 20,
          textStyle: {
            color: '#FFF'
          }
        },
        grid: {
          left: "0",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: '#FFF'
          }
        },
        yAxis: {
          show: false,
          type: "category",
          data: ["Mon"],
        },
        series: [
          {
            name: "Direct",
            barWidth: 30,
            type: "bar",
            stack: "total",
            showBackground: true,
            data: [320],
            backgroundStyle: {
              borderRadius: 25
            },
            itemStyle: {
              barBorderRadius: [25, 0, 0, 25]
            }
          },
          {
            name: "Mail Ad",
            barWidth: 30,
            type: "bar",
            stack: "total",
            data: [120],
          },
          {
            name: "Affiliate Ad",
            barWidth: 30,
            type: "bar",
            stack: "total",
            data: [220],
          },
          {
            name: "Video Ad",
            barWidth: 30,
            type: "bar",
            stack: "total",
            data: [150],
          },
          {
            name: "Search Engine",
            barWidth: 30,
            type: "bar",
            stack: "total",
            data: [820],
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
        echarts.init(document.getElementById("bar")).resize();
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
.barChart {
  width: 100%;
  height: 100%;
  position: relative;
  top: -30px;
}
</style>
