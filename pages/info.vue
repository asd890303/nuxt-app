<template>
  <div class="container">
    <h3>
      空氣品質指標(AQI)
      <i class="el-icon-refresh refresh" @click="refresh()"></i>
    </h3>
    <!-- <el-skeleton :rows="2" animated :loading="state.loading" /> -->
    <span>
      https://data.epa.gov.tw/api/v2/aqx_p_432?sort=ImportDate%20desc&format=JSON
    </span>
    <Tips />
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
          :label="col.info.label.toString()"
          sortable
        >
          <template #default="scope">
            <div v-if="col.id === 'pollutant'">
              <strong> {{ scope.row && scope.row[col.id] }}</strong>
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
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" text size="default">
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
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      v-model="showDetail"
      title="詳細內容"
      width="80%"
      :before-close="() => (showDetail = false)"
      append-to-body
    >
      <el-descriptions
        class="margin-top"
        title=""
        :column="3"
        :size="'default'"
        border
      >
        <el-descriptions-item
          v-for="(item, key) in state.currentItem"
          :key="key"
        >
          <template #label>
            {{ state.fields.find((f) => f.id === key)?.info.label }}
          </template>
          {{ item }}
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer" right>
          <el-button :type="'success'" @click="handleAddToFollow">
            追蹤
          </el-button>
          <el-button type="primary" @click="showDetail = false">
            確定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// import { computed, onMounted, reactive } from '@nuxtjs/composition-api';
// import { infoApi } from '@/api/info';

import { useUseInfoStore } from "@/store/index";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const useStore = useUseInfoStore();
const { addToFollowList } = useStore;
const { followList } = storeToRefs(useStore);

const showDetail = ref(false);
const state = reactive({
  date: new Date(),
  items: [] as Item[],
  fields: [] as Fields[],
  tableColumn: [] as Fields[],
  loading: true,
  currentPage: 1,
  currentItem: {} as Item,
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
  console.log(followList.value);
  const data = await $fetch("/api/aqx_p_432", {
    method: "get",
    params: {
      api_key: "e8dd42e6-9b8b-43f8-991e-b3dee723a52d",
    },
  })
    .then((response) => {
      console.log(response);
      const data = response as any;
      if (data) {
        const fields = data.fields as Fields[];
        state.tableColumn = fields.filter((i) => {
          const fieldName = i.id as keyof typeof displaySimpleColumn.value;
          return displaySimpleColumn.value[fieldName];
        });

        state.fields = fields;
        state.items = data.records;
      }
    })
    .finally(() => {
      state.loading = false;
    });

  // nuxt 2
  // const info = infoApi();
  // const response = await info
  //   .getInfo({ offset: '0', limit: '1000' })
  //   .finally(() => {
  //     state.loading = false;
  //   });

  // if (data) {
  //   const fields = data.fields as Fields[];
  //   state.tableColumn = fields.filter((i) => {
  //     const fieldName = i.id as keyof typeof displaySimpleColumn.value;
  //     return displaySimpleColumn.value[fieldName];
  //   });

  //   state.fields = fields;
  //   state.items = data.records;
  // }
};

const refresh = () => {
  state.loading = true;
  // getData();
};

const handleClick = async (row: any) => {
  console.log("click");
  state.currentItem = row;
  showDetail.value = true;

  console.log(showDetail.value);
};

const handleAddToFollow = (): void => {
  if (followList.value.find((i) => i.siteid === state.currentItem.siteid)) {
    ElMessage({
      message: "已經追蹤",
      type: "warning",
    });
  } else {
    addToFollowList(state.currentItem);

    ElMessage({
      message: "追蹤成功",
      type: "success",
    });
  }

  console.log(followList.value);
};

const handleCurrentChange = () => {
  // getData({ offset: state.currentPage });
};

const getIsFollowed = (id: String): boolean => {
  const hasFollowed = !!followList.value.find((i) => i.siteid === id);
  console.log(hasFollowed);
  return hasFollowed;
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
