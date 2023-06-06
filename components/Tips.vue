<template>
  <div class="">
    <el-popover :width="300" placement="top-start" trigger="hover">
      <template #reference>
        <div class="tips">
          What is AQI? <el-icon :size="'18px'"><InfoFilled /></el-icon>
        </div>
      </template>
      <template #default>
        <h3>空氣品質指標的定義</h3>
        <span>
          空氣品質指標為依據監測資料將當日空氣中臭氧 (O3)、細懸浮微粒
          (PM2.5)、懸浮微粒 (PM10)、一氧化碳 (CO)、二氧化硫 (SO2) 及二氧化氮
          (NO2)
          濃度等數值，以其對人體健康的影響程度，分別換算出不同污染物之副指標值，再以當日各副指標之最大值為該測站當日之空氣品質指標值
          (AQI)。
          <br />
          <br />

          <el-link
            href="https://air.epa.gov.tw/EnvTopics/AirQuality_1.aspx"
            target="_blank"
            type="primary"
            >更多</el-link
          >
        </span>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
const state = reactive({
  activeNames: ["1"],
});

onMounted(() => {
  console.log();
});
</script>

<style>
.tips {
  line-height: 24px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.tips .el-icon {
  margin-left: 5px;
}
</style>
