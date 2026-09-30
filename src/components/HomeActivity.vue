<template>
  <section class="top-block activity-section">
    <h2 class="index-text" data-aos="fade-right">ACTIVITY</h2>
    <div class="activity-grid">
      <ActivityCalendar :calendar="githubCalendar" />
      <ActivityCalendar :calendar="atcoderCalendar" />
    </div>
    <p v-if="loadError" class="activity-note">
      活動データを読み込めなかったため、次回の自動更新後に再表示します。
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ActivityCalendar from '@/components/ActivityCalendar.vue'
import type {
  ActivityCalendar as ActivityCalendarData,
  ActivityDataFile,
  ActivityProvider,
} from '@/types/activity'

const calendars = ref<ActivityCalendarData[]>([])
const loadError = ref(false)

const githubCalendar = computed(
  () =>
    calendars.value.find((calendar) => calendar.provider === 'github') ??
    createEmptyCalendar('github', 'lmorinn'),
)
const atcoderCalendar = computed(
  () =>
    calendars.value.find((calendar) => calendar.provider === 'atcoder') ??
    createEmptyCalendar('atcoder', 'lmori'),
)

onMounted(async () => {
  try {
    const response = await fetch(import.meta.env.BASE_URL + 'data/activity.json')
    if (!response.ok) throw new Error('Activity data request failed')
    const data = (await response.json()) as ActivityDataFile
    if (!Array.isArray(data.calendars)) throw new Error('Invalid activity data')
    calendars.value = data.calendars
  } catch {
    loadError.value = true
  }
})

function createEmptyCalendar(provider: ActivityProvider, username: string): ActivityCalendarData {
  const today = formatDateInJst(new Date())
  const start = new Date(today + 'T00:00:00Z')
  start.setUTCDate(start.getUTCDate() - 364)

  const days = []
  for (let index = 0; index < 365; index += 1) {
    const date = new Date(start)
    date.setUTCDate(date.getUTCDate() + index)
    days.push({ date: date.toISOString().slice(0, 10), count: 0, level: 0 as const })
  }

  return {
    provider,
    username,
    from: days[0]?.date ?? today,
    to: today,
    total: 0,
    generatedAt: '',
    days,
  }
}

function formatDateInJst(date: Date) {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
</script>

<style scoped>
.activity-section {
  padding-bottom: 30px;
}

.activity-grid {
  display: grid;
  width: min(1180px, 92%);
  margin: 0 auto;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}

.activity-note {
  margin: 24px auto 0;
  color: #797c80;
  font-size: 13px;
}

@media screen and (max-width: 900px) {
  .activity-grid {
    grid-template-columns: 1fr;
  }
}
</style>
