<template>
  <div class="container">
    <div class="table-wrap">
      <el-table :data="state.items" border style="width: 100%">
        <el-table-column
          v-for="col in state.fields"
          :key="col.id"
          :prop="col.id"
          :label="col.info.label"
          width="auto"
          :default-sort="{ prop: 'col.id', order: 'descending' }"
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- <div v-for="item in state.items">
      {{ item.pollutant }} {{ item.county }} : {{ item.status }}
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "@nuxtjs/composition-api";
import { infoApi } from "@/api/info";

type Fields = {
  id: String;
  type: String;
  info: {
    label: String;
  };
};

type Item = {
  sitename: String;
  county: String;
  aqi: String;
  pollutant: String;
  status: String;
  so2: String;
  co: String;
  o3: String;
  o3_8hr: String;
  pm10: String;
  "pm2.5": String;
  no2: String;
  nox: String;
  no: String;
  wind_speed: String;
  wind_direc: String;
  publishtime: String;
  co_8hr: String;
  "pm2.5_avg": String;
  pm10_avg: String;
  so2_avg: String;
  longitude: String;
  latitude: String;
  siteid: String;
};

const state = reactive({
  date: new Date(),
  items: [] as Item[],
  fields: [] as Fields[],
});

const getData = async (): Promise<void> => {
  const info = infoApi();
  const response = await info.getInfo();

  if (response) {
    const data = response.data;
    console.log(data);

    state.fields = data.fields;
    state.items = data.records;
  }
};

const setInfo = (): void => {};

onMounted(() => {
  console.log("onMounted,", state.date);
  getData();
});
</script>

<style>
.container {
  padding: 25px;
}
</style>
