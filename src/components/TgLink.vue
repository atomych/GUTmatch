<template>
  <section class="container">
    <img src="../assets/icons/tg-icon.png" alt="" />
    <div class="text">
      <a :href="getLink">{{ tg }}</a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;

  .text {
    font-weight: 400;
    font-size: 16px;
    color: #3907ff;

    margin-left: 6px;
  }
}
</style>

<script>
export default {
  name: "TgLink",

  props: {
    tg: {
      type: String,
      required: true,
      default: "telegram",
    },
  },

  computed: {
    getLink() {
      return `https://t.me/${this.tg.substring(1)}`;
    },
  },
};
</script>
