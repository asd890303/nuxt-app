<template>
  <div class="container">
    <h3>
      空氣品質指標(AQI)
      <i class="el-icon-refresh refresh" @click="refresh()"></i>
    </h3>
    <span>
      https://data.epa.gov.tw/api/v2/aqx_p_432?sort=ImportDate%20desc&format=JSON
    </span>
    <div class="table-wrap">
      <el-table
        v-loading="state.loading"
        class="table"
        ref="table"
        :data="state.items"
        :align="'center'"
        :header-align="'center'"
        style="width: 100%"
        height="80vh"
        :show-overflow-tooltip="true"
        border
      >
        <el-table-column
          v-for="col in state.tableColumn"
          :key="col.id"
          :prop="col.id"
          :label="col.info.label"
          sortable
        >
          <template slot-scope="scope">
            <div v-if="col.id === 'pollutant'">
              <strong> {{ scope.row[col.id] }}</strong>
            </div>
            <div
              v-else-if="
                col.id === 'status' &&
                !['普通', '良好'].includes(scope.row[col.id])
              "
            >
              <strong style="color: red"> {{ scope.row[col.id] }}</strong>
            </div>
            <div v-else>
              {{ scope.row[col.id] }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="65"
          :align="'center'"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="medium"
            >
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page.sync="state.currentPage"
        :layout="'total, sizes, prev, pager, next, jumper'"
        :page-sizes="[10, 20, 30, 50]"
        background
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <el-dialog
        title="詳細內容"
        :visible.sync="state.showDetail"
        width="80%"
        :before-close="handleClose"
      >
        <el-descriptions
          class="margin-top"
          title=""
          :column="3"
          :size="'medium'"
          border
        >
          <el-descriptions-item
            v-for="(item, key) in state.currentItem"
            :key="key"
          >
            <template slot="label">
              {{ state.fields.find((f) => f.id === key)?.info.label }}
            </template>
            {{ item }}
          </el-descriptions-item>
        </el-descriptions>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="state.showDetail = false">
            確定
          </el-button>
        </span>
      </el-dialog>
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
  currentItem: {} as Item,
  showDetail: false,
});

const displaySimpleColumn = computed(() => {
  return {
    siteid: true,
    sitename: true,
    county: true,
    aqi: true,
    pollutant: true,
    status: true,
    publishtime: true,
  };
});

const getData = async (): Promise<void> => {
  const info = infoApi({ offset: "0", limit: "1000" });
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
  state.currentItem = row;
  state.showDetail = true;
};

const handleSizeChange = () => {
  // getData({ offset: state.currentPage });
};

const handleCurrentChange = () => {
  // getData({ offset: state.currentPage });
};

const handleClose = () => {};
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
  margin-top: 15px;
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
