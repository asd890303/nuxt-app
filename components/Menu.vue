<template>
  <el-row class="menu-container">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#353c48"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template slot="title"> </template>

        <el-menu-item index="1" @click="router.push('/')">
          <strong> <i class="el-icon-s-home"></i>首頁</strong>
        </el-menu-item>

        <el-menu-item index="2" @click="router.push('/Info')">
          <strong> <i class="el-icon-monitor"></i>空氣品質</strong>
        </el-menu-item>

        <el-menu-item index="3" @click="router.push('/About')">
          <strong><i class="el-icon-warning-outline"></i>關於</strong>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, useRouter } from "@nuxtjs/composition-api";

const state = reactive({
  activeNames: ["1"],
});

const handleOpen = () => {};
const handleClose = () => {};
const router = useRouter();

onMounted(() => {
  console.log();
});
</script>

<style>
.menu-title {
  padding-left: 20px;
}

.menu-container {
  transition: width 0.28s;
  width: 160px !important;
  background-color: #353c48;
  color: #fff;
  height: 100%;
  position: fixed;
  font-size: 14px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
</style>
