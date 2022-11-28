<template>
  <router-view />
</template>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;

  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;

  background-attachment: fixed;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>

<script>
export default {
  name: "App",

  created() {
    this.$router.push({ name: "auth" });
  },
};
</script>
