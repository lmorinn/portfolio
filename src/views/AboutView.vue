<template>
  <main class="block">
    <h1 class="title">ABOUT</h1>
    <div class="banner">
      <p>私について</p>
      <ElIcon><ArrowDown /></ElIcon>
    </div>
    <ProfileCard />
    <MainSkills />
    <section class="about-block">
      <p><FontAwesomeIcon :icon="['fas', 'code']" size="2x" /></p>
      <p class="section-text">言語・フレームワーク、ツールなど</p>
      <SkillList />
      <RouterLink to="/works" class="jump">
        WORKS
        <ElIcon><ArrowRight /></ElIcon>
      </RouterLink>
    </section>
    <HistoryTimeline />
  </main>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'
import ProfileCard from '@/components/ProfileCard.vue'
import MainSkills from '@/components/MainSkills.vue'
import SkillList from '@/components/SkillList.vue'
import HistoryTimeline from '@/components/HistoryTimeline.vue'
</script>
