<template>
  <div class="lineChart">
    <div id="line" style="width: 100%; height: 100%" ref="line"></div>
  </div>
</template>
<script>
import { defineComponent, Ref, ref, onMounted, onCreated, toRefs } from "vue";
import { ChartService } from "@/api/chart";
import * as echarts from "echarts";
export default {
  setup() {
    let resize = async () => {
      let myChart = echarts.init(document.getElementById("line"));
      myChart.resize();
    };
    let echartInit = async () => {
      const LineParams = {
        method: 'APP_XSCL',
        jgzxh: localStorage.getItem('jgdyh'),
      }
      const res = await ChartService.getLine(LineParams)
      // 时间列表
      let timeList = []
      // 产量列表
      let countList = []
      timeList = res.data.list.map(item => {
        return item.rq.substring(11,16)
      })
      countList = res.data.list.map(item => {
        return item.xscl
      })
      let myChart = echarts.init(document.getElementById("line"));
      // 指定图表的配置项和数据

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          text: "小时产量图",
          textStyle: {
            color: "#FFF",
          },
          left: "center",
        },
        grid: {
          top: "10%",
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          data: timeList,
          axisLabel: {
            textStyle: {
              color: "#FFF",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#FFF",
            },
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#FFF",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#666",
            },
          },
        },
        series: [
          {
            type: "bar",
            barWidth: "30",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            data: countList,
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
        echarts.init(document.getElementById("line")).resize();
      });
    });
    //return
    return {
      echartInit,
      resize,
      // ...toRefs(data),
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