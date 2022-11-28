<template>
  <div class="wrapper">
    <img src="../assets/love-fox.png" alt="fox" class="img" />
    <h1 class="logo">ГУТmatch</h1>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img {
  display: block;
  margin-bottom: -20px;
}

.logo {
  font-size: 60px;
  font-weight: 900;
  font-style: italic;
  color: #e5792c;

  text-shadow: 6px 8px #d9d3cb;
}
</style>

<script>
export default {
  name: "LoveLogo",
};
</script>
