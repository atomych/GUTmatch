<template>
  <section>
    <input
      :type="data.type"
      class="input"
      :placeholder="data.placeholder"
      :value="input"
      @input="change"
    />
    <div class="error" v-if="err">
      <img src="../assets/icons/warning.png" alt="" />
      <span class="text">{{ data.warning }}</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;
}

.input {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #838383;

  padding: 9px 20px;

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

.error {
  display: flex;
  align-items: center;

  margin-top: 5px;

  .text {
    font-weight: 300;
    font-size: 15px;
    color: #f67c7c;

    margin-left: 10px;
  }
}
</style>

<script>
export default {
  name: "InputDefault",

  props: {
    data: {
      required: true,
    },
    input: {
      required: true,
    },
    err: {
      required: true,
    },
  },

  methods: {
    change(event) {
      this.$emit("update:input", event.target.value);
      this.$emit("update:err", false);
    },
  },
};
</script>
