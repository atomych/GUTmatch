<template>
  <section class="wrapper">
    <sleep-logo class="logo" />
    <div class="form">
      <template v-if="stage == 1">
        <input-default
          :data="{
            placeholder: 'Почта',
            warning: 'Укажите вашу почту',
            type: 'email',
          }"
          v-model:input="email.value"
          v-model:err="email.err"
        />
        <input-default
          :data="{
            placeholder: 'Пароль',
            warning: 'Придумайте пароль',
            type: 'password',
          }"
          v-model:input="pass.value"
          v-model:err="pass.err"
        />
        <input-default
          :data="{
            placeholder: 'Подтвердите',
            warning: 'Пароли не совпадют',
            type: 'password',
          }"
          v-model:input="pass2.value"
          v-model:err="pass2.err"
        />
      </template>

      <template v-if="stage == 2">
        <input-default
          :data="{
            placeholder: 'Имя',
            warning: 'Укажите ваше имя',
            type: 'text',
          }"
          v-model:input="name.value"
          v-model:err="name.err"
        />
        <input-default
          :data="{
            placeholder: 'Возраст',
            warning: 'Укажите ваш возраст',
            type: 'text',
          }"
          v-model:input="age.value"
          v-model:err="age.err"
        />
        <input-default
          :data="{
            placeholder: 'Telegram',
            warning: 'Укажите ваш telegram начиная с @',
            type: 'text',
          }"
          v-model:input="tg.value"
          v-model:err="tg.err"
        />
        <text-field v-model:text="about" :data="{ placeholder: 'О себе' }" />
        <div class="gender">
          <div class="text">Пол</div>
          <div class="container">
            <input
              type="radio"
              name="male"
              ref="male"
              @click="selectGender('male')"
            />
            <label for="male" class="mr">Мужской</label>
            <input
              type="radio"
              name="female"
              ref="female"
              @click="selectGender('female')"
            />
            <label for="female">Женский</label>
          </div>
        </div>
      </template>
      <template v-if="stage == 3">
        <h1 class="title">
          Выберите несколько <br />
          интересующих <br />
          вас категорий
        </h1>
        <ul class="list" ref="tags">
          <li
            class="list__item list__item--small list__item--1"
            @click="selectTag"
            data-type="0"
          >
            <span>Помощь с учебой</span>
          </li>
          <li
            class="list__item list__item--small list__item--2"
            @click="selectTag"
            data-type="1"
          >
            <span>Новые знакомства</span>
          </li>
          <li
            class="list__item list__item--large list__item--3"
            @click="selectTag"
            data-type="2"
          >
            <span>Поиск человека для совместного проживания</span>
          </li>
        </ul>
      </template>
    </div>
    <div class="arrow">
      <img src="../assets/icons/arrow.png" alt="" @click.stop="control()" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  justify-content: center;
}

.form {
  flex-grow: 1;
  width: 100%;
  max-width: 320px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.arrow {
  display: flex;
  justify-content: center;

  padding-bottom: 20px;
}

.gender {
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .text {
    font-size: 25px;
    font-weight: 300;
    color: #838383;

    margin-left: 20px;
    margin-bottom: 10px;
  }

  label {
    font-size: 25px;
    font-weight: 300;

    &.mr {
      margin-right: 20px;
    }
  }

  input {
    margin-right: 5px;
  }
}

.title {
  text-align: center;

  font-size: 24px;
  font-weight: 400;

  margin-bottom: 50px;
}

.list {
  list-style: none;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  max-width: 350px;

  &__item {
    height: 170px;

    font-size: 20px;
    font-weight: 800;
    color: #fff;

    border: 5px solid transparent;
    border-radius: 20px;

    display: flex;
    align-items: end;

    padding: 5px;

    background-position: center center;
    background-repeat: no-repeat;

    transition: all 0.2s linear;

    &--small {
      width: 48%;

      margin-bottom: 10px;
      background-size: 153px auto;
    }

    &--large {
      width: 100%;
      background-size: 320px auto;
    }

    &--1 {
      background-image: url("../assets/tags/1.jpeg");
      background-size: auto 100%;
    }

    &--2 {
      background-image: url("../assets/tags/2.jpeg");
    }

    &--3 {
      background-image: url("../assets/tags/3.jpeg");
    }

    &--sel {
      border-color: #e5792c;
    }
  }
}
</style>

<script>
import SleepLogo from "../components/SleepLogo.vue";
import InputDefault from "../components/InputDefault.vue";
import TextField from "../components/TextField.vue";

import { mapMutations } from "vuex";
import { createUser } from "../firebase/auth";
import { writeData } from "../firebase/database";

export default {
  name: "RegPage",

  data() {
    return {
      stage: 1,
      email: {
        value: "",
        err: false,
      },
      pass: {
        value: "",
        err: false,
      },
      pass2: {
        value: "",
        err: false,
      },
      name: {
        value: "",
        err: false,
      },
      age: {
        value: "",
        err: false,
      },
      tg: {
        value: "",
        err: false,
      },
      about: "",
      tags: [],
      gender: "",
    };
  },

  components: {
    SleepLogo,
    InputDefault,
    TextField,
  },

  methods: {
    ...mapMutations(["setRegData"]),

    control() {
      if (this.stage == 1) this.firstStage();
      else if (this.stage == 2) this.secondStage();
      else if (this.stage == 3) this.thirdStage();
    },

    selectGender(type) {
      if (type == "female") {
        this.$refs.male.checked = false;
        this.gender = "female";
      }
      if (type == "male") {
        this.$refs.female.checked = false;
        this.gender = "male";
      }
    },

    selectTag(event) {
      event.target.classList.toggle("list__item--sel");
    },

    firstStage() {
      if (this.email.value == "") {
        this.email.err = true;
        return;
      }

      if (this.pass.value == "" || this.pass.value.length < 6) {
        this.pass.err = true;
        return;
      }

      if (this.pass.value != this.pass2.value) {
        this.pass2.err = true;
        return;
      }

      this.stage += 1;
    },

    secondStage() {
      if (this.name.value == "") {
        this.name.err = true;
        return;
      }

      if (this.age.value == "") {
        this.age.err = true;
        return;
      }

      if (this.tg.value == "") {
        this.tg.err = true;
        return;
      }

      if (this.gender == "") {
        return;
      }

      this.stage += 1;
    },

    thirdStage() {
      for (let tag of this.$refs.tags.childNodes) {
        if (tag.classList.contains("list__item--sel")) {
          this.tags.push(+tag.dataset.type);
        }
      }

      if (!this.tags.length) return;
      this.final();
    },

    final() {
      const newUserData = {
        email: this.email.value,
        password: this.pass.value,
        name: this.name.value,
        age: this.age.value,
        tg: this.tg.value,
        about: this.about,
        gender: this.gender,
        tags: this.tags,
        images: 0,
      };

      createUser(newUserData.email, newUserData.password).then(
        (userCredential) => {
          const userID = userCredential.user.uid;
          const reference = `${userID}/`;
          writeData(reference, newUserData);
          this.$router.push({ name: "entry" });
        }
      );
    },
  },
};
</script>
