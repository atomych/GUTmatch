<template>
  <section class="wrapper">
    <ul class="dots">
      <li
        class="dots__item"
        v-for="(dot, index) in dots"
        :key="index"
        :class="{ 'dots__item--sel': dot == current }"
      ></li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.dots {
  list-style: none;

  display: flex;
  align-items: center;
  justify-content: center;

  &__item {
    width: 11px;
    height: 11px;

    border-radius: 50%;

    background-color: #d9d9d9;

    opacity: 0.7;

    transition: all 0.2s linear;

    margin-right: 20px;

    &--sel {
      opacity: 1;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

<script>
export default {
  name: "SliderDots",

  data() {
    return {
      dots: [],
    };
  },

  watch: {
    counter() {
      this.dots = [];
      for (let index = 0; index < this.counter; index++) {
        this.dots.push(index);
      }
    },
  },

  props: {
    counter: {
      type: Number,
      required: true,
      default: 0,
    },
    current: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  mounted() {
    for (let index = 0; index < this.counter; index++) {
      this.dots.push(index);
    }
  },
};
</script>
