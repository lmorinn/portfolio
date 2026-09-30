<template>
  <header class="header">
    <div>
      <p>lmori's portfolio</p>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  padding: 15%;
  background: #0575e6;
  background: linear-gradient(to right, #021b79, #0575e6);
}

.header div {
  position: relative;
  left: 0;
}

.header p {
  color: #dedede;
  font-family: bilo, sans-serif;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
}

@media screen and (max-width: 600px) {
  .header p {
    color: rgb(146 150 208 / 81%);
    font-size: 40px;
  }
}
</style>
