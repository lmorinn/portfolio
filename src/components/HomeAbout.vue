<template>
  <section class="top-block">
    <h2 class="index-text" data-aos="fade-right">ABOUT</h2>
    <div class="top-about-block">
      <div class="top-about-profile">
        <h2>lmori</h2>
        <p>会津大学コンピュータ理工学部 コンピュータ理工学科 4年</p>
      </div>
    </div>
    <ElDivider />
    <div class="top-about-icon">
      <p class="caption">主な取り組み</p>
      <div class="icon-parent">
        <p>競技プログラミング</p>
        <div class="icon-block">
          <ElIcon><Monitor /></ElIcon>
        </div>
      </div>
      <div class="icon-parent">
        <p>アプリケーション開発</p>
        <div class="icon-block">
          <ElIcon><Setting /></ElIcon>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Monitor, Setting } from '@element-plus/icons-vue'
</script>

<style scoped>
.top-about-block {
  display: flex;
  border-radius: 1px;
  background-image: url('/img/develop.jpg');
  background-size: cover;
}

.top-about-block > div {
  width: 25%;
  margin: 40px 0;
  padding: 10% 10% 10% 15%;
  background-color: rgb(8 0 154 / 83%);
}

.top-about-profile h2 {
  color: #f5f5f5;
  font-size: 26px;
  text-align: left;
}

.top-about-profile p {
  margin-bottom: 10px;
  color: #f5f5f5;
  font-size: 17px;
  letter-spacing: 0.03em;
  text-align: left;
}

.top-about-icon {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.icon-parent {
  width: 30%;
  margin: 70px 20px;
}

.icon-parent > p {
  color: #1373e6;
  font-size: 20px;
  letter-spacing: 0.02em;
}

.icon-block {
  margin: auto;
  padding: 50px 0;
  border: solid 1px #1373e6;
  border-radius: 5px;
}

.icon-block .el-icon {
  margin: 20px 0;
  color: #375d8a;
  font-size: 60px;
}

.caption {
  width: 100%;
  margin: 80px 0 0;
  font-size: 30px;
}

@media screen and (max-width: 600px) {
  .top-about-block > div {
    width: 80%;
    margin: 10px 0;
    padding: 30px 20px;
    box-shadow: 0 0 3px grey;
  }

  .icon-parent {
    width: 100%;
    margin: 20px;
  }

  .icon-parent > p {
    font-size: 18px;
    font-weight: bold;
  }

  .top-about-profile h2 {
    font-size: 26px;
  }

  .top-about-profile p {
    font-size: 16px;
    letter-spacing: 0.02em;
  }
}
</style>
