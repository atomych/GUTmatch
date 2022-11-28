<template>
  <section class="wrapper">
    <love-logo class="logo" />
    <div class="form">
      <input type="email" class="input" placeholder="email" v-model="email" />
      <input
        type="password"
        class="input"
        placeholder="пароль"
        v-model="password"
      />
    </div>
    <div class="control">
      <button class="btn" @click="entry()">Войти</button>
      <span class="or">или</span>
      <button class="btn" @click="toReg()">Зарегистрироваться</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  margin-bottom: 40px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 300px;

  margin-bottom: 30px;
}

.control {
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 300px;
}

.input {
  display: block;
  width: 100%;

  font-size: 16px;
  font-weight: 500;
  color: #838383;

  border: none;
  border-radius: 20px;
  background-color: #fabc90;

  margin-bottom: 20px;
  padding: 10px 20px;

  &:last-child {
    margin-bottom: 0;
  }

  &::placeholder {
    color: #838383;
    font-size: 15px;
    font-weight: 400;

    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }
}

.btn {
  font-size: 19px;
  font-weight: 600;
  color: #fff;
  text-align: center;

  background-color: #e5792c;

  width: 100%;
  padding: 10px 0;

  border: none;
  border-radius: 10px;

  cursor: pointer;
}

.or {
  display: block;
  position: relative;

  font-size: 19px;
  font-weight: 600;
  color: #838383;

  max-width: max-content;
  margin: 20px auto;

  &::before,
  &::after {
    display: block;
    content: "";
    position: absolute;

    width: 50px;
    height: 2px;

    background-color: #838383;

    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: -60px;
  }

  &::after {
    right: -60px;
  }
}
</style>

<script>
import LoveLogo from "../components/LoveLogo.vue";

import { signIn } from "../firebase/auth";
import { mapMutations } from "vuex";

export default {
  name: "EntryPage",

  components: {
    LoveLogo,
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    ...mapMutations(["setUID", "setUserData"]),

    toReg() {
      this.$router.push({ name: "reg" });
    },

    entry() {
      signIn(this.email, this.password).then((userCredential) => {
        const uid = userCredential.user.uid;
        this.$store.commit("setUID", uid);
        this.$router.push({ name: "user" });
      });
    },
  },
};
</script>
