<template>
  <article class="activity-card">
    <header class="activity-header">
      <a :href="profileUrl" target="_blank" rel="noopener noreferrer">
        {{ title }}
      </a>
      <span>{{ calendar.total }} {{ totalUnit }}</span>
    </header>

    <div class="heatmap-scroll" tabindex="0" :aria-label="title + 'の直近365日の活動'">
      <div class="heatmap" role="img">
        <template v-for="(cell, index) in cells" :key="cell?.date ?? 'empty-' + index">
          <span v-if="!cell" class="heatmap-placeholder" aria-hidden="true" />
          <ElTooltip v-else :content="tooltipText(cell)" placement="top" :show-after="100">
            <span
              class="heatmap-day"
              :class="'level-' + cell.level"
              :aria-label="tooltipText(cell)"
            />
          </ElTooltip>
        </template>
      </div>
    </div>

    <footer class="activity-footer">
      <span>{{ calendar.from }}</span>
      <div class="legend" aria-label="活動量の凡例">
        <span>Less</span>
        <i v-for="level in levels" :key="level" :class="'level-' + level" />
        <span>More</span>
      </div>
      <span>{{ calendar.to }}</span>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ActivityCalendar, ActivityDay, ActivityLevel } from '@/types/activity'

const props = defineProps<{
  calendar: ActivityCalendar
}>()

const levels: ActivityLevel[] = [0, 1, 2, 3, 4]

const title = computed(() =>
  props.calendar.provider === 'github' ? 'GitHub Contributions' : 'AtCoder Problems',
)
const profileUrl = computed(() =>
  props.calendar.provider === 'github'
    ? 'https://github.com/' + props.calendar.username
    : 'https://atcoder.jp/users/' + props.calendar.username,
)
const totalUnit = computed(() =>
  props.calendar.provider === 'github' ? 'contributions' : 'problems solved',
)
const cells = computed<Array<ActivityDay | null>>(() => {
  const first = props.calendar.days[0]
  if (!first) return []
  const leadingEmpty = new Date(first.date + 'T00:00:00Z').getUTCDay()
  return [...Array<ActivityDay | null>(leadingEmpty).fill(null), ...props.calendar.days]
})

function tooltipText(day: ActivityDay) {
  const unit = props.calendar.provider === 'github' ? 'contributions' : 'new AC problems'
  return day.date + ': ' + day.count + ' ' + unit
}
</script>

<style scoped>
.activity-card {
  min-width: 0;
  padding: 24px;
  border: 1px solid #dce3ec;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 14px rgb(3 0 101 / 8%);
}

.activity-header,
.activity-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.activity-header {
  margin-bottom: 22px;
}

.activity-header a {
  color: #030065;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
}

.activity-header a:hover,
.activity-header a:focus-visible {
  text-decoration: underline;
}

.activity-header > span {
  color: #797c80;
  font-size: 13px;
}

.heatmap-scroll {
  overflow-x: auto;
  padding: 8px 2px 12px;
}

.heatmap-scroll:focus-visible {
  outline: 2px solid #1373e6;
  outline-offset: 2px;
}

.heatmap {
  display: grid;
  width: max-content;
  min-width: 100%;
  grid-auto-columns: 11px;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 11px);
  justify-content: center;
  gap: 3px;
}

.heatmap-day,
.heatmap-placeholder,
.legend i {
  display: block;
  width: 11px;
  height: 11px;
  border-radius: 2px;
}

.level-0 {
  background-color: #edf1f5;
}

.level-1 {
  background-color: #d6e4ff;
}

.level-2 {
  background-color: #91b7f2;
}

.level-3 {
  background-color: #3d7cc9;
}

.level-4 {
  background-color: #030065;
}

.activity-footer {
  margin-top: 12px;
  color: #797c80;
  font-size: 11px;
}

.legend {
  display: flex;
  align-items: center;
  gap: 3px;
}

@media screen and (max-width: 600px) {
  .activity-card {
    padding: 18px;
  }

  .activity-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }

  .heatmap {
    justify-content: start;
  }

  .activity-footer > span {
    display: none;
  }

  .activity-footer {
    justify-content: flex-end;
  }
}
</style>
