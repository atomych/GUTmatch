<template>
  <div class="wrapper">
    <router-view class="content-side" />
    <nav class="nav-bar">
      <a class="icon" @click="toProfile()">
        <img src="../assets/icons/profile.png" alt="home.png" title="Профиль" />
      </a>
      <a class="icon" @click="toSearch()">
        <img src="../assets/icons/search.png" alt="search.png" title="Поиск" />
      </a>
      <a class="icon" @click="toPairs()">
        <img
          src="../assets/icons/friends.png"
          alt="friends.png"
          title="Мои пары"
        />
      </a>
    </nav>

    <download-spinner v-if="download" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
}

.content-side {
  height: calc(100vh - 87px);
}

.nav-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: 235px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: url("../assets/nav-bar-bg.png") center center no-repeat;

  padding: 17px 6px;

  .icon {
    margin-right: 38px;

    display: flex;
    align-items: center;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

<script>
import { readData, subscribeToUpadate } from "../firebase/database";
import { mapGetters, mapMutations } from "vuex";
import { downloadImage } from "../firebase/storage";

import DownloadSpinner from "../components/DownloadSpinner.vue";

export default {
  name: "UserView",

  components: {
    DownloadSpinner,
  },

  data() {
    return {
      download: false,
    };
  },

  async mounted() {
    const uid = this.uid;
    const reference = `${uid}`;

    this.download = true;

    readData(reference).then((snapshot) => {
      let data = snapshot.val();
      if (!data.tags) {
        data.tags = [];
      }
      if (!data.likes) {
        data.likes = [];
      }
      if (!data.pairs) {
        data.pairs = [];
      }
      this.$store.commit("setUserData", data);

      subscribeToUpadate(`${this.uid}/likes`, (snapshot) => {
        let newValue = snapshot.val();
        if (!newValue) newValue = [];
        this.$store.commit("updateLikes", newValue);
      });

      subscribeToUpadate(`${this.uid}/pairs`, (snapshot) => {
        let newValue = snapshot.val();
        if (!newValue) newValue = [];
        this.$store.commit("updatePairs", newValue);
      });

      if (this.images > 0) {
        for (let counter = 0; counter < this.images; counter++) {
          const link = `${this.uid}/img${counter}`;
          downloadImage(link).then((url) => {
            const img = new Image();
            img.src = url;

            this.$store.commit("downloadImage", img);

            img.onload = () => {
              if (counter == this.images - 1) {
                this.download = false;
                this.$router.push({ name: "profile" });
              }
            };
          });
        }
      } else {
        this.download = false;
        this.$router.push({ name: "profile" });
      }
    });
  },

  computed: {
    ...mapGetters(["uid", "images"]),
  },

  methods: {
    ...mapMutations([
      "setUserData",
      "downloadImage",
      "updateLikes",
      "updatePairs",
    ]),

    toProfile() {
      this.$router.push({ name: "profile" });
    },

    toPairs() {
      this.$router.push({ name: "pairs" });
    },

    toSearch() {
      this.$router.push({ name: "search" });
    },
  },
};
</script>
