<template>
  <div class="container"></div>
</template>

<script setup lang="ts">
// import { computed, onMounted, reactive } from "@nuxtjs/composition-api";
import { userStore } from "@/store/";

const state = reactive({});

const { getFollowList } = userStore();

onMounted(() => {
  console.log(getFollowList);
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
