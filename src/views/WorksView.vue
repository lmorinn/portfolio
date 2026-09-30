<template>
  <main class="block">
    <h1 class="title">WORKS</h1>
    <div class="banner">
      <ElIcon><ArrowDown /></ElIcon>
    </div>
    <WorksGallery />
  </main>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import WorksGallery from '@/components/WorksGallery.vue'
</script>
