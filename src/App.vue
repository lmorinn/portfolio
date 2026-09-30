<template>
  <ElConfigProvider :locale="ja">
    <div>
      <AppHeader />
      <nav id="nav" aria-label="メインナビゲーション">
        <RouterLink to="/" class="navmenu">TOP</RouterLink>
        <RouterLink to="/about" class="navmenu">ABOUT</RouterLink>
        <RouterLink to="/works" class="navmenu">WORKS</RouterLink>
      </nav>
      <RouterView v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
      <AppFooter />
    </div>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { nextTick, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import ja from 'element-plus/es/locale/lang/ja'
import AOS from 'aos'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()

watch(
  () => route.path,
  async () => {
    await nextTick()
    window.scrollTo(0, 600)
    AOS.refresh()
  },
)
</script>
