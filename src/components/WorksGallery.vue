<template>
  <section id="works">
    <TransitionGroup tag="div" class="works-list" appear>
      <button
        v-for="item in works"
        :key="item.name"
        type="button"
        class="work-item"
        @click="selected = item"
      >
        <img :src="item.path" :alt="item.name" />
        <ElCard class="works-card" shadow="never">
          <p class="item-title">{{ item.name }}</p>
          <p class="item-summary">{{ item.text }}</p>
        </ElCard>
      </button>
    </TransitionGroup>

    <ElDialog
      v-model="dialogVisible"
      :title="selected?.name"
      fullscreen
      destroy-on-close
      aria-label="成果物の詳細"
    >
      <div v-if="selected" class="dialog-box">
        <img :src="selected.path" :alt="selected.name" class="dialog-image" />
        <span class="dialog-text">{{ selected.text }}</span>
        <p class="dialog-lang">主な使用言語/フレームワークなど:{{ selected.lang }}</p>
        <p v-if="selected.summary" class="dialog-summary">{{ selected.summary }}</p>
        <div v-if="selected.link" class="dialog-icon">
          <a :href="selected.link" target="_blank" rel="noopener noreferrer" class="jump">
            サイトへ移動
          </a>
        </div>
        <div v-if="selected.github" class="dialog-icon">
          <a :href="selected.github" target="_blank" rel="noopener noreferrer" class="jump">
            GitHub
          </a>
        </div>
        <ElButton @click="selected = null">
          <ElIcon><Close /></ElIcon>
          閉じる
        </ElButton>
      </div>
    </ElDialog>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { works, type WorkItem } from '@/data/works'

const selected = ref<WorkItem | null>(null)
const dialogVisible = computed({
  get: () => selected.value !== null,
  set: (visible: boolean) => {
    if (!visible) selected.value = null
  },
})
</script>

<style scoped>
.works-list {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  margin: 50px auto 0;
  padding-top: 30px;
  background-color: #efefef;
}

.work-item {
  width: 500px;
  height: 375px;
  margin: 20px 20px 100px;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 20px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font: inherit;
  text-align: inherit;
  transition: all 200ms ease;
}

.work-item:hover,
.work-item:focus-visible {
  box-shadow: 0 0 30px rgb(0 0 0 / 20%);
  outline: none;
  transform: translateY(-10px);
}

.work-item > img {
  display: block;
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition-duration: 0.3s;
}

.work-item:hover > img {
  transform: scale(1.05);
}

.works-card {
  border: 0;
  border-radius: 0;
}

:deep(.works-card .el-card__body) {
  height: 100px;
  padding: 20px;
}

.work-item p {
  margin: 0;
  padding: 5px;
}

.item-title {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 19px;
  font-weight: 500;
  text-align: left;
}

.item-summary {
  color: #797c80;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 15px;
  font-weight: 400;
  text-align: left;
}

.dialog-box {
  padding: 50px 0;
  border: solid 1px #e0e1e5;
  border-radius: 8px;
}

.dialog-image {
  display: block;
  width: 40%;
  height: auto;
  max-height: 45vh;
  margin: 0 auto 20px;
  object-fit: contain;
}

.dialog-text {
  color: #000;
  font-size: 20px;
}

.dialog-lang {
  color: #000;
}

.dialog-summary {
  width: 45%;
  margin: 60px auto 30px;
  color: #000;
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.dialog-icon {
  margin: 30px 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media screen and (max-width: 600px) {
  .work-item {
    width: 90%;
    height: auto;
    margin: 30px 10px;
  }

  .work-item p {
    padding: 10px;
  }

  .dialog-image {
    width: 100%;
    max-height: none;
  }

  .dialog-box {
    padding: 20px 20px 50px;
  }

  .dialog-summary {
    width: 100%;
    margin: 40px auto 70px;
    font-size: 18px;
  }
}
</style>
