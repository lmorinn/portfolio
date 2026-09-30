<template>
  <div class="skill-block">
    <TransitionGroup tag="div" class="skill-list" appear>
      <div v-for="skill in skills" :key="skill" class="skill">
        <p class="skill-title">{{ skill }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const skills = ['HTML&CSS', 'JavaScript', 'C++', 'Python', 'Vue.js', 'Git', 'Firebase']
</script>

<style scoped>
.skill-list {
  width: 100%;
}

.skill {
  width: 100%;
  margin: 30px 0;
}

.skill-title {
  margin: 3px 0;
  padding: 5px 35px;
  border-radius: 2px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-align: left;
}

.skill-block {
  display: flex;
  justify-content: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media screen and (max-width: 600px) {
  .skill {
    width: 80%;
    margin: 0 auto 50px;
    border-bottom: solid 1px #efefef;
  }

  .skill-title {
    padding: 5px 0;
  }
}
</style>
