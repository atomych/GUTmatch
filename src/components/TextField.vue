<template>
  <textarea
    class="text"
    v-text="text"
    :placeholder="data.placeholder"
    @input="$emit('update:text', $event.target.value)"
  ></textarea>
</template>

<style lang="scss" scoped>
.text {
  resize: none;

  width: 100%;
  height: 130px;

  border-radius: 10px;
  border: 1px solid #838383;

  padding: 9px;

  color: #000;
  font-weight: 300;
  font-size: 25px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #838383;
  }
}
</style>

<script>
export default {
  name: "TextField",

  props: {
    data: {
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
