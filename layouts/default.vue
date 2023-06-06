<template>
  <div>
    <Menu />
    <NuxtPage class="main" />
  </div>
</template>

<script setup lang="ts">
// import { onMounted } from "@nuxtjs/composition-api";
import Menu from "@/components/Menu.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const nuxtApp = useNuxtApp();
// element-plus/icons-vue https://segmentfault.com/a/1190000043619438
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  nuxtApp.vueApp.component(key, component);
}

onMounted(() => {
  console.log("layout");
});
</script>

<style>
.main {
  margin-left: 160px;
}

body {
  font-size: 16px;
  font-family: "微軟正黑體", "Helvetica", "Arial", sans-serif;
  overflow: auto;
}
</style>
