<template>
  <div class="pieChart">
    <div id="pie" style="width: 100%; height: 100%" ref="pie"></div>
  </div>
</template>
<script>
import { defineComponent, Ref, ref, onMounted, onCreated } from "vue";
import * as echarts from "echarts";
export default {
  setup() {
    let resize = () => {
      let myChart = echarts.init(document.getElementById("pie"));
      myChart.resize();
    }
    let echartInit = () => {
      console.log(111)
      let myChart = echarts.init(document.getElementById("pie"));
      // 指定图表的配置项和数据
      let option = {
        legend: {
          right: "right",
          top: '20%',
          textStyle: {
            color: '#FFF'
          }
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: ["20%", "90%"],
            center: ["50%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    };
    //onMounted
    onMounted(() => {
      echartInit()
      window.addEventListener('resize', () => {
        echarts.init(document.getElementById('pie')).resize()
      })
    })
    //return
    return {
      echartInit,
      resize,
    };
  },
};
</script>

<style lang="scss" scoped>
.pieChart {
  width: 100%;
  height: 100%;
}
</style>
