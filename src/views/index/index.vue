<template>
  <div class="login-container" style="background-color: #fff; padding: 20px">
    <line-chart :chart-data="lineChartData" />
  </div>
</template>
<script>
import { queryDeviceStatus } from "@/api/management";
import LineChart from "./LineChart.vue";
export default {
  data() {
    return {
      lineChartData: {
        timedata: [],
        typeData: [
          {
            name: "在线设备",
            icon: "pin",
          },
          {
            name: "离线设备",
            icon: "pin",
          },
        ],
        x1: [],
        x2: [],
      },
    };
  },
  components: {
    LineChart,
  },
  created() {
    this.getDeviceStatus(0);
    this.getDeviceStatus(1);
  },
  methods: {
    async getDeviceStatus(status) {
      let params = {
        devicestatus: status,
      };
      const res = await queryDeviceStatus(params);
      if (res) {
        if (status === 1) {
          this.lineChartData.x1.push(res);
        } else {
          this.lineChartData.x2.push(res);
        }
      }
      console.log(this.lineChartData);
    },
  },
};
</script>
