<template>
  <div>
    <Menu />
    <NuxtPage class="main" />
  </div>
</template>

<script setup lang="ts">
// import { onMounted } from "@nuxtjs/composition-api";
import Menu from '@/components/Menu.vue';
onMounted(() => {
  console.log('layout');
});
</script>

<style>
.main {
  margin-left: 160px;
}

body {
  font-size: 16px;
  font-family: '微軟正黑體', 'Helvetica', 'Arial', sans-serif;
  overflow: hidden;
}
</style>
