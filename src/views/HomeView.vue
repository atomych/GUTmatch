<template>
  <section class="wrapper">
    <router-view />
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
}
</style>

<script>
export default {
  name: "HomeView",

  mounted() {
    if (navigator.userAgentData) {
      const isMobileDevice = navigator.userAgentData.mobile;

      if (isMobileDevice) this.$router.push("entry");
      else this.$router.push({ name: "err" });
    } else {
      this.$router.push("entry");
    }
  },
};
</script>
