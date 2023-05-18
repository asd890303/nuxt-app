<template>
  <div class="container">
    <h3>
      空氣品質指標(AQI)
      <i class="el-icon-refresh refresh" @click="refresh()"></i>
    </h3>
    <div class="table-wrap">
      <el-table
        v-loading="state.loading"
        class="table"
        :data="state.items"
        :align="'center'"
        :header-align="'center'"
        style="width: 100%"
        height="80vh"
        :show-overflow-tooltip="true"
      >
        <el-table-column
          v-for="col in state.tableColumn"
          :key="col.id"
          :prop="col.id"
          :label="col.info.label"
          sortable
        >
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="65"
          :align="'center'"
        >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="state.currentPage"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "@nuxtjs/composition-api";
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
  tableColumn: [] as Fields[],
  loading: true,
  currentPage: 1,
});

const displaySimpleColumn = computed(() => {
  return {
    siteid: true,
    sitename: true,
    county: true,
    aqi: true,
    pollutant: true,
    status: true,
  };
});

const getData = async (): Promise<void> => {
  const info = infoApi();
  const response = await info.getInfo().finally(() => {
    state.loading = false;
  });

  if (response) {
    const data = response.data;
    const fields = data.fields as Fields[];
    state.tableColumn = fields.filter((i) => {
      const fieldName = i.id as keyof typeof displaySimpleColumn.value;
      return displaySimpleColumn.value[fieldName];
    });
    console.log(state.tableColumn);
    state.fields = fields;
    state.items = data.records;
  }
};

const refresh = () => {
  state.loading = true;
  getData();
};

const handleClick = (row: any) => {
  console.log(row);
};

const handleSizeChange = () => {};

const handleCurrentChange = () => {};

onMounted(() => {
  console.log("onMounted,", state.date);
  getData();
});
</script>

<style>
.container {
  padding: 0px 15px;
}

.table-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.table {
  width: 85%;
  overflow: scroll;
}

.refresh {
  margin-left: 5px;
  cursor: pointer;
  transition: 0.31s;
}

.refresh:hover {
  transform: rotate(-180deg);
}
</style>
