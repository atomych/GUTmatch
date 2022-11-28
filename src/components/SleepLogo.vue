<template>
  <section>
    <div class="img">
      <img src="../assets/sleep-fox.png" alt="" />
    </div>
    <h1 class="logo">ГУТMATCH</h1>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  align-items: center;

  width: 100%;
}

.img {
  margin-right: 5px;
}

.logo {
  font-size: 30px;
  font-weight: 900;
  font-style: italic;
  color: #e5792c;

  text-shadow: 6px 8px #d9d3cb;
}
</style>

<script>
export default {
  name: "SleepLogo",
};
</script>
