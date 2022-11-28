<template>
  <section class="wrapper">
    <header class="header">
      <img src="../assets/icons/settings.png" alt="" width="83" height="83" />
    </header>
    <main class="main">
      <input-default
        :data="{
          placeholder: 'telegram',
          warning: 'Укажите ваш телеграм начиная с @',
          type: 'text',
        }"
        v-model:input="teleg.value"
        v-model:err="teleg.err"
        @change="saveTg()"
      />
      <ul class="tags">
        <li
          class="tags__item"
          :class="{ 'tags__item--green': tags.indexOf(2) != -1 }"
          @click="selTag(2)"
        >
          поиск соседа
        </li>
        <li
          class="tags__item"
          :class="{ 'tags__item--red': tags.indexOf(1) != -1 }"
          @click="selTag(1)"
        >
          новые знакомства
        </li>
        <li
          class="tags__item"
          :class="{ 'tags__item--blue': tags.indexOf(0) != -1 }"
          @click="selTag(0)"
        >
          помощь с <br />
          учебой
        </li>
      </ul>
      <text-field
        :data="{ placeholder: 'о себе' }"
        v-model:text="text"
        @change="saveAbout()"
      />
    </main>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 325px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: center;

  margin-bottom: 70px;
}

.tags {
  margin: 23px 0;

  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__item {
    width: 220px;
    height: 55px;

    background-color: #838383;
    border-radius: 20px;

    font-weight: 300;
    font-size: 20px;
    text-transform: uppercase;

    margin-bottom: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    &--green {
      background-color: #abf562;
    }

    &--red {
      background-color: #ffa3c1;
    }

    &--blue {
      background-color: #7cc0f2;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

<script>
import InputDefault from "../components/InputDefault.vue";
import TextField from "../components/TextField.vue";

import { mapGetters, mapMutations } from "vuex";
import { writeData } from "../firebase/database";

export default {
  name: "UserSettings",

  data() {
    return {
      teleg: {
        value: "",
        err: false,
      },
      text: "",
    };
  },

  components: {
    InputDefault,
    TextField,
  },

  mounted() {
    this.teleg.value = this.tg;
    this.text = this.about;
  },

  computed: {
    ...mapGetters(["tags", "tg", "about", "uid"]),
  },

  methods: {
    ...mapMutations(["addTag", "removeTag", "changeTg", "changeAbout"]),

    selTag(number) {
      if (this.tags.indexOf(number) == -1) {
        this.$store.commit("addTag", number);
      } else {
        this.$store.commit("removeTag", number);
      }

      const link = `${this.uid}/tags`;
      writeData(link, this.tags);
    },

    saveTg() {
      this.$store.commit("changeTg", this.teleg.value);

      const link = `${this.uid}/tg`;
      writeData(link, this.teleg.value);
    },

    saveAbout() {
      this.$store.commit("changeAbout", this.text);

      const link = `${this.uid}/about`;

      writeData(link, this.text);
    },
  },
};
</script>
