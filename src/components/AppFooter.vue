<template>
  <footer>
    <div class="footer-link-parent">
      <p class="footer-title">LINK</p>
      <div class="footer-link">
        <a
          href="https://github.com/lmorinn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="lmorinnのGitHubプロフィール"
        >
          <FontAwesomeIcon :icon="['fab', 'github']" size="2x" color="#1aad41" />
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>©︎{{ currentYear }} lmori</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-link {
  display: flex;
  justify-content: center;
}

.footer-link-parent {
  margin-top: 40px;
  padding: 30px 0;
  background-color: #030065;
}

.footer-bottom {
  padding: 20px 0;
  background-color: rgb(19 19 35);
}

.footer-bottom p {
  display: inline;
  margin: 0 0 0 50px;
  color: aliceblue;
}

.footer-link a {
  display: block;
  width: 5%;
  margin: 0 10px;
  padding: 30px;
}

.footer-title {
  width: 70%;
  margin: auto;
  color: #fff;
  font-family: brandon-grotesque, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
}

@media screen and (max-width: 600px) {
  .footer-link a {
    width: auto;
  }

  .footer-bottom p {
    margin-left: 0;
  }
}
</style>
