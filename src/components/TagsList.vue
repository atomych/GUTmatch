<template>
  <section class="container">
    <div class="tag tag--blue" v-if="tags.indexOf(0) != -1">
      Помощь с учебой
    </div>
    <div class="tag tag--red" v-if="tags.indexOf(1) != -1">
      Новые знакомства
    </div>
    <div class="tag tag--green" v-if="tags.indexOf(2) != -1">Поиск соседа</div>
  </section>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  font-weight: 300;
  font-size: 10px;
  text-transform: uppercase;

  padding: 10px;
  border-radius: 20px;

  margin-right: 10px;
  margin-bottom: 10px;

  &--green {
    background-color: #abf562;
  }

  &--red {
    background-color: #ffa3c1;
  }

  &--blue {
    background-color: #7cc0f2;
  }
}
</style>

<script>
export default {
  name: "TagsList",

  props: {
    tags: {
      required: true,
      default: [],
    },
  },
};
</script>
