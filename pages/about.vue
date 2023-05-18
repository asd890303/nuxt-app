<template>
  <div class="container">
    <el-collapse v-model="state.activeNames" @change="handleChange">
      <el-collapse-item title="參考資料" name="1">
        <div>政府資料開放平臺</div>
        <div>
          <a href="https://data.gov.tw/dataset/40448">
            https://data.gov.tw/dataset/40448
          </a>
        </div>
      </el-collapse-item>
      <el-collapse-item title="使用元件" name="2">
        <div><strong>element UI</strong></div>
        <div>
          <a href="https://element.eleme.io/">https://element.eleme.io/</a>
        </div>

        <div><strong>nuxtjs</strong></div>
        <div>
          <a href="https://nuxtjs.org/">https://nuxtjs.org/</a>
        </div>

        <div><strong>nuxtjs/axios</strong></div>
        <div>
          <a href="https://go.nuxtjs.dev/axios">https://go.nuxtjs.dev/axios</a>
        </div>
      </el-collapse-item>
      <el-collapse-item title="2023.05" name="3"
        >Kent created.</el-collapse-item
      >
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "@nuxtjs/composition-api";

const state = reactive({
  activeNames: [""],
});

const handleChange = () => {};
onMounted(() => {
  console.log();
});
</script>
<style>
.container {
  padding: 20px;
}

.el-collapse-item__header {
  color: #4c3101;
  font-weight: 700;
}
</style>
