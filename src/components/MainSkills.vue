<template>
  <section>
    <div class="banner">
      <p>開発について</p>
      <ElIcon><ArrowDown /></ElIcon>
    </div>
    <div class="main-skill">
      <div>
        <ElIcon><Monitor /></ElIcon>
        <h2>競技プログラミング</h2>
      </div>
      <div>
        <ElIcon><Setting /></ElIcon>
        <h2>アプリケーション開発</h2>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowDown, Monitor, Setting } from '@element-plus/icons-vue'
</script>

<style scoped>
.main-skill > div {
  margin: 100px 0;
}

.main-skill .el-icon {
  font-size: 55px;
}

.main-skill h2 {
  margin: 20px 0;
  font-size: 19px;
}

@media screen and (max-width: 600px) {
  .main-skill > div {
    margin: 80px 0;
  }
}
</style>
