<template>
  <section class="wrapper">
    <div class="bg like" :style="{ opacity: getLikeOpacity }">
      <img src="../assets/search-like.png" alt="" />
    </div>
    <div class="bg diss" :style="{ opacity: getDissOpacity }">
      <img src="../assets/search-diss.png" alt="" />
    </div>
    <div
      ref="window"
      class="photo"
      :style="{
        'background-image': getImage,
        transform: `${getMovePhoto} ${getRotatePhoto}`,
      }"
      @click="changeImg()"
    >
      <div class="information">
        <div class="person">{{ getNameAge }}</div>
        <tags-list :tags="getTags" />
        <div class="about">{{ getAbout }}</div>
      </div>
      <slider-dots
        class="dots"
        :counter="currentImages.length"
        :current="selectedImg"
      />
      <div class="black-bg"></div>
    </div>
    <download-spinner v-if="download" />
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 15px;

  position: relative;
  overflow: hidden;
}

.bg {
  position: absolute;
  width: 100%;
  height: 100%;

  transition: all 0.2s linear;

  top: 0;

  z-index: 1;

  background: #fff left top no-repeat;

  img {
    position: absolute;
    top: 100px;
  }

  &.like {
    background-image: url("../assets/search-bg-green.png");
    left: -44px;

    img {
      left: 100px;
    }
  }

  &.diss {
    background-image: url("../assets/search-bg-red.png");
    right: -44px;

    img {
      right: 100px;
    }
  }
}

.black-bg {
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 50%;

  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.498));
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  z-index: 3;
}

.dots {
  position: absolute;

  bottom: 0;
  left: 50%;

  transform: translateX(-50%);
}

.photo {
  flex-grow: 1;
  border-radius: 20px;

  background: #000 center center no-repeat;
  background-size: cover;

  transition: all 0.2s linear;

  width: 100%;
  max-width: 550px;

  z-index: 10;
}

.information {
  position: absolute;

  bottom: 40px;
  left: 0;

  width: 100%;
  padding: 0 15px;

  z-index: 15;

  .person {
    font-weight: 500;
    font-size: 32px;
    color: #fff;

    margin-bottom: 20px;
  }

  .tags {
    list-style: none;

    display: flex;
    flex-wrap: wrap;

    margin-bottom: 30px;

    &__item {
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
  }

  .about {
    font-size: 20px;
    font-weight: 400;
    color: #fff;

    max-width: 100%;
  }
}
</style>

<script>
import SliderDots from "../components/SliderDots.vue";
import TagsList from "../components/TagsList.vue";
import DownloadSpinner from "../components/DownloadSpinner.vue";

import { readData, writeData } from "../firebase/database";
import { downloadImage } from "../firebase/storage";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SearchPage",

  data() {
    return {
      currentID: null,
      usersUID: [],
      users: {},
      download: false,
      currentImages: [],
      selectedImg: 0,
      touchX: null,
      movePhotoX: null,
      resultMove: null,
    };
  },

  components: {
    SliderDots,
    TagsList,
    DownloadSpinner,
  },

  async mounted() {
    this.$refs.window.addEventListener("touchstart", (event) => {
      this.touchX = event.changedTouches[0].clientX;
    });

    this.$refs.window.addEventListener("touchmove", (event) => {
      const currentX = event.changedTouches[0].clientX;
      this.movePhotoX = currentX - this.touchX;

      if (Math.abs(this.movePhotoX) > 150) {
        if (this.movePhotoX > 0) this.resultMove = "like";
        else this.resultMove = "diss";
      } else {
        this.resultMove = null;
      }
    });

    this.$refs.window.addEventListener("touchend", () => {
      this.touchX = null;
      this.movePhotoX = null;

      console.log(this.resultMove);

      if (this.resultMove != null) this.moveUser();
    });

    this.download = true;

    readData("/").then((snapshot) => {
      const data = this.filterUsers(snapshot.val());

      for (let item of data) {
        const userTags = Object.values(item[1].tags);

        for (let tag of userTags) {
          if (this.tags.indexOf(tag) != -1) {
            this.users[item[0]] = {
              name: item[1].name,
              age: item[1].age,
              about: item[1].about,
              tags: userTags,
              images: item[1].images,
            };
            break;
          }
        }

        if (Object.keys(this.users).length > 100) {
          break;
        }
      }

      if (Object.keys(this.users).length < 100) {
        for (let item of data) {
          this.users[item[0]] = {
            name: item[1].name,
            age: item[1].age,
            about: item[1].about,
            tags: Object.values(item[1].tags),
            images: item[1].images,
          };
          if (Object.keys(this.users).length > 100) {
            break;
          }
        }
      }

      this.usersUID = Object.keys(this.users);
      this.currentID = 0;
      this.download = false;
    });
  },

  watch: {
    currentID() {
      if (this.currentID == null) return;

      const images = this.users[this.usersUID[this.currentID]].images;

      this.currentImages = [];
      this.selectedImg = 0;

      if (images > 0) {
        for (let counter = 0; counter < images; counter++) {
          const link = `${this.usersUID[this.currentID]}/img${counter}`;
          downloadImage(link).then((dataURL) => {
            const img = new Image();
            img.src = dataURL;

            this.currentImages = [...this.currentImages, img];
          });
        }
      }
    },
  },

  computed: {
    ...mapGetters(["tags", "uid", "pairs", "likes"]),

    getLikeOpacity() {
      if (this.movePhotoX != null) {
        if (this.movePhotoX > 0) {
          return `${this.movePhotoX / 150}`;
        } else {
          return "0";
        }
      } else {
        return "0";
      }
    },

    getDissOpacity() {
      if (this.movePhotoX != null) {
        if (this.movePhotoX < 0) {
          return `${Math.abs(this.movePhotoX) / 150}`;
        } else {
          return "0";
        }
      } else {
        return "0";
      }
    },

    getMovePhoto() {
      if (Math.abs(this.movePhotoX) > 150) return;
      if (this.movePhotoX != null) return `translateX(${this.movePhotoX}px)`;
      else return "translateX(0)";
    },

    getRotatePhoto() {
      if (this.movePhotoX != null) {
        return `rotate(${(this.movePhotoX / 350) * 45}deg)`;
      } else {
        return "rotate(0deg)";
      }
    },

    getImage() {
      if (this.currentImages.length) {
        const src = this.currentImages[this.selectedImg].src;
        return `url(${src})`;
      } else {
        return "initial";
      }
    },

    getNameAge() {
      if (this.usersUID.length != 0) {
        const name = this.users[this.usersUID[this.currentID]].name;
        const age = this.users[this.usersUID[this.currentID]].age;
        return `${name}, ${age}`;
      } else {
        return "";
      }
    },

    getAbout() {
      if (this.usersUID.length != 0) {
        const about = this.users[this.usersUID[this.currentID]].about;
        return `${about}`;
      } else {
        return "";
      }
    },

    getTags() {
      if (this.usersUID.length != 0) {
        const tags = this.users[this.usersUID[this.currentID]].tags;
        return tags;
      } else {
        return [];
      }
    },
  },

  methods: {
    ...mapMutations(["addPair", "removeLike"]),

    changeImg() {
      if (this.selectedImg != this.currentImages.length - 1) {
        this.selectedImg += 1;
      } else {
        this.selectedImg = 0;
      }
    },

    moveUser() {
      if (this.resultMove == "diss") {
        if (this.usersUID.length - 1 == this.currentID) this.currentID = 0;
        else this.currentID += 1;
      } else if (this.resultMove == "like") {
        const id = this.usersUID[this.currentID];

        if (this.likes.indexOf(id) != -1) {
          this.$store.commit("addPair", id);
          let link = `${this.uid}/pairs`;
          writeData(link, this.pairs);

          this.$store.commit("removeLike", id);
          link = `${this.uid}/likes`;
          writeData(link, this.likes);

          link = `${id}`;
          readData(link).then((snapshot) => {
            const data = snapshot.val();

            if (data.pairs) {
              data.pairs.push(this.uid);
            } else {
              data.pairs = [this.uid];
            }

            writeData(`${id}/pairs`, data.pairs);
          });
        } else {
          readData(`${id}`).then((snapshot) => {
            const data = snapshot.val();

            if (data.likes) {
              if (data.likes.indexOf(this.uid) == -1) data.likes.push(this.uid);
            } else {
              data.likes = [this.uid];
            }

            writeData(`${id}/likes`, data.likes);
          });
        }

        if (this.usersUID.length - 1 == this.currentID) this.currentID = 0;
        else this.currentID += 1;
      }

      this.resultMove = null;
    },

    filterUsers(data) {
      return Object.entries(data).filter((el) => {
        const id = el[0];
        let comp = true;
        if (this.pairs.indexOf(id) != -1) comp = false;
        if (id == this.uid) comp = false;
        return comp;
      });
    },
  },
};
</script>
