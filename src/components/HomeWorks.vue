<template>
  <section class="top-block">
    <h2 class="index-text" data-aos="fade-right">WORKS</h2>
    <div class="block">
      <ElCarousel indicator-position="outside" :height="carouselHeight">
        <ElCarouselItem v-for="photo in gallery" :key="photo">
          <img :src="photo" alt="" class="works-img" />
        </ElCarouselItem>
      </ElCarousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const gallery = [
  '/img/develop.jpg',
  '/img/face.png',
  '/img/webrain.png',
  '/img/portfolio_image.png',
]
const carouselHeight = ref('500px')

function handleResize() {
  carouselHeight.value = window.innerWidth <= 600 ? '270px' : '500px'
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.works-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
