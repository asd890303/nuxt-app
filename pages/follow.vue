<template>
  <div class="container">
    <h3>追蹤</h3>
    <Tips />
    <div v-if="!followList || followList.length === 0">
      目前沒有追蹤任何地區
    </div>
    <div v-for="(follow, index) in followList">
      <strong class="no">
        {{ `${index + 1}.${follow.county}(${follow.siteid})` }}
      </strong>
      <div class="float-right">
        {{ `加入時間:${follow.addTime}` }}
      </div>
      <el-descriptions
        class="margin-top"
        title=""
        :key="index"
        :column="3"
        :size="'default'"
        border
      >
        <el-descriptions-item v-for="(item, key) in follow" :key="key">
          <template #label>
            {{ fields.find((f) => f.id === key)?.info.label }}
          </template>
          <template v-if="fields.find((f) => f.id === key)">
            {{ item }}
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUseInfoStore } from "@/store/index";
import { storeToRefs } from "pinia";

const state = reactive({});
const useStore = useUseInfoStore();
const { followList, fields } = storeToRefs(useStore);

onMounted(() => {});
</script>

<style>
.container {
  padding: 0px 15px;
}
.no {
  margin-bottom: 12px;
}

.el-descriptions {
  margin: 12px 0;
}

.float-right {
  float: right;
}
</style>
