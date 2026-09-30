<template>
  <main class="block">
    <h1 class="title">TOP</h1>
    <div class="banner">
      <p>About me</p>
      <ElIcon><ArrowDown /></ElIcon>
    </div>
    <HomeAbout />
    <RouterLink to="/about" class="jump">
      ABOUT
      <ElIcon><ArrowRight /></ElIcon>
    </RouterLink>
    <HomeWorks />
    <RouterLink to="/works" class="jump">
      WORKS
      <ElIcon><ArrowRight /></ElIcon>
    </RouterLink>
    <HomeActivity />
  </main>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'
import HomeAbout from '@/components/HomeAbout.vue'
import HomeWorks from '@/components/HomeWorks.vue'
import HomeActivity from '@/components/HomeActivity.vue'
</script>
