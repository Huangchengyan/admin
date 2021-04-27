<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>
<script>
var echarts = require("echarts");
export default {
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "450px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions(data) {
      this.chart.setOption({
        xAxis: [
          {
            data: [
              data.typeData[0].name +
                data.x1[0] +
                "台" +
                "______" +
                data.typeData[1].name +
                data.x2[0] +
                "台",
            ],
            boundaryGap: true,
            axisLine: {
              lineStyle: {
                color: "#ebeef5",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#515a6e",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        grid: {
          x: "5%",
          width: "90%",
          y: "12%",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.9)",
        },
        yAxis: [
          {
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#eee",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#515a6e",
              },
              formatter: "{value}",
            },
          },
        ],
        legend: {
          itemHeight: 5,
          itemWidth: 24,
          data: data.typeData,
          textStyle: {
            color: "#515a6e",
          },
          top: "2%",
        },
        series: [
          {
            name: data.typeData[0].name,
            type: "bar",
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(102,203,254,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(24,151,236,0.5)",
                  },
                ]),
                //柱状图圆角
                barBorderRadius: [30, 30, 0, 0],
              },
            },
            data: data.x1,
          },
          {
            name: data.typeData[1].name,
            type: "bar",
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(59, 188, 133,0.5)",
                  },
                  {
                    offset: 1,
                    color: "rgba(59, 188, 133,0)",
                  },
                ]),
                barBorderRadius: [30, 30, 0, 0],
              },
            },
            data: data.x2,
          },
        ],
      });
    },
  },
};
</script>
