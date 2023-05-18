<template>
  <div>
    <Menu />
    <nuxt class="main" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "@nuxtjs/composition-api";
import Menu from "@/components/Menu.vue";
onMounted(() => {
  console.log("layout");
});
</script>

<style>
.main {
  margin-left: 240px;
}
</style>
