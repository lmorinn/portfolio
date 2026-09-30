<template>
  <section id="profile">
    <ElAvatar :size="100">
      <img src="/img/icon.jpg" alt="lmoriのプロフィール画像" />
    </ElAvatar>
    <h2>lmori</h2>
    <p>会津大学コンピュータ理工学部</p>
    <p>コンピュータ理工学科4年</p>
  </section>
</template>

<style scoped>
#profile {
  width: 100%;
  height: 70%;
  margin-top: 30px;
  padding: 90px 0;
  background-color: #f3f3f3;
}

#profile p {
  width: 80%;
  margin: auto;
  color: #333;
  font-size: 17px;
}
</style>
