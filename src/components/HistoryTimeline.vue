<template>
  <section class="about-block">
    <p><FontAwesomeIcon :icon="['far', 'calendar-alt']" size="2x" /></p>
    <p class="section-text">これまでの活動</p>
    <ElTimeline>
      <ElTimelineItem v-for="activity in activities" :key="activity.timestamp">
        <ElAvatar :src="activity.image" :size="150" />
        <ElCard>
          <p class="activity-text">{{ activity.content }}</p>
          <p>{{ activity.timestamp }}</p>
        </ElCard>
      </ElTimelineItem>
    </ElTimeline>
  </section>
</template>

<script setup lang="ts">
const activities = [
  { content: 'プログラミングの学習を開始', timestamp: '2019年6月', image: '/img/history_1.png' },
  { content: 'ITパスポート 合格', timestamp: '2019年12月', image: '/img/develop.jpg' },
  {
    content: 'AtCoder Algorithm Rating400到達',
    timestamp: '2020年6月',
    image: '/img/develop.jpg',
  },
  { content: '応用情報技術者試験 合格', timestamp: '2023年12月', image: '/img/develop.jpg' },
  {
    content: 'AtCoder Algorithm Rating800到達',
    timestamp: '2023年12月',
    image: '/img/develop.jpg',
  },
  {
    content: 'AtCoder Algorithm Rating1200到達',
    timestamp: '2024年12月',
    image: '/img/develop.jpg',
  },
  {
    content: '会津大学イノベーション・創業教育プログラム シリコンバレーインターンシッププログラム 参加',
    timestamp: '2025年2月',
    image: '/img/develop.jpg',
  },
]
</script>

<style scoped>
:deep(.el-timeline-item) {
  padding-bottom: 35px;
}

.activity-text {
  font-size: 18px;
}

:deep(.el-avatar) {
  margin-bottom: 35px;
}
</style>
