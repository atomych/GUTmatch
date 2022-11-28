<template>
  <section class="wrapper" ref="wrapper">
    <div
      class="photo"
      :style="{ 'background-image': getPhoto }"
      ref="photo"
    ></div>

    <div class="content">
      <div class="top">
        <span class="name">{{ nameAge }}</span>
        <tg-link :tg="tg" />
      </div>
      <tags-list class="tags" :tags="tags" />
      <div class="about">
        {{ about }}
      </div>

      <div class="panel">
        <button class="settings" @click="toSettings()"></button>
        <slider-dots class="dots" :counter="images" :current="currentImg" />
        <button class="add" @click="displayFileField()"></button>
      </div>
    </div>

    <input type="file" class="input-file" ref="fileImg" @change="addImage" />
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.input-file {
  display: none;
}

.panel {
  position: absolute;

  top: -30px;
  left: 50%;

  transform: translateX(-50%);

  display: flex;
  align-items: center;

  .settings,
  .add {
    display: block;

    width: 18px;
    height: 18px;
    border: none;
    background: center center no-repeat;
    background-size: contain;
  }

  .settings {
    margin-right: 20px;

    background-image: url("../assets/icons/settings.png");
  }

  .add {
    margin-left: 20px;

    background-image: url("../assets/icons/add.png");
  }
}

.content {
  display: flex;
  flex-direction: column;

  padding: 30px 5px 10px 5px;

  border-top-left-radius: 40px;
  border-top-right-radius: 40px;

  z-index: 10;
  background-color: #fff;

  position: relative;

  .top {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 40px;

    .name {
      font-size: 26px;
      font-weight: 600;

      margin-right: 50px;
    }

    .tg {
      font-weight: 400;
      font-size: 16px;
      color: #3907ff;

      position: relative;

      &::before {
        content: "";
        display: block;
        position: absolute;

        top: 50%;
        left: -20px;

        transform: translateY(-50%);

        width: 18px;
        height: 18px;

        background: url("../assets/icons/tg-icon.png") center center no-repeat;
      }
    }
  }

  .tags {
    justify-content: center;

    max-width: 300px;
    margin: 0 auto;
  }

  .about {
    max-width: 280px;
    margin: 0 auto;

    font-size: 15px;
    font-weight: 400;
  }
}

.photo {
  position: absolute;

  width: 100%;
  height: 100%;

  background: rgb(0, 0, 0) url("../assets/sleep-fox.png") center center
    no-repeat;
  background-size: 100% auto;

  z-index: 5;
}
</style>

<script>
import SliderDots from "../components/SliderDots.vue";
import TagsList from "../components/TagsList.vue";
import TgLink from "../components/TgLink.vue";

import { mapGetters, mapMutations } from "vuex";
import { uploadImage } from "../firebase/storage";
import { writeData } from "../firebase/database";

export default {
  name: "ProfilePage",

  components: {
    SliderDots,
    TagsList,
    TgLink,
  },

  data() {
    return {
      currentImg: 0,
      touchX: null,
    };
  },

  mounted() {
    this.$refs.photo.addEventListener("click", (event) => {
      const coordX = event.clientX;
      const displayWidth = window.innerWidth;

      if (coordX < displayWidth / 2) {
        this.currentImg -= 1;
      } else {
        this.currentImg += 1;
      }
    });

    this.$refs.wrapper.addEventListener("touchstart", (event) => {
      this.touchX = event.touches[0].clientX;
    });

    this.$refs.wrapper.addEventListener("touchend", (event) => {
      const diffX = event.changedTouches[0].clientX - this.touchX;

      if (Math.abs(diffX) >= 100) {
        if (diffX > 0) {
          this.toSettings();
        } else {
          this.displayFileField();
        }
      }
    });
  },

  watch: {
    currentImg() {
      if (this.currentImg < 0) this.currentImg = 0;
      if (this.currentImg > this.images - 1) this.currentImg = this.images - 1;
    },
  },

  computed: {
    ...mapGetters([
      "nameAge",
      "tags",
      "tg",
      "about",
      "uid",
      "images",
      "imagesList",
    ]),

    getPhoto() {
      if (this.images > 0) {
        return `url(${this.imagesList[this.currentImg].src})`;
      }
      return "initial";
    },
  },

  methods: {
    ...mapMutations(["addImage"]),

    toSettings() {
      this.$router.push({ name: "settings" });
    },

    displayFileField() {
      if (this.images >= 3) return;
      this.$refs.fileImg.click();
      this.addImage();
    },

    addImage() {
      if (!this.$refs.fileImg.files[0]) return;

      const file = this.$refs.fileImg.files[0];
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = (data) => {
        const dataURL = data.currentTarget.result;
        const linkStorage = `${this.uid}/img${this.images}`;
        const linkDatabase = `${this.uid}/images`;

        uploadImage(dataURL, linkStorage);
        writeData(linkDatabase, this.images + 1);

        const img = new Image();
        img.src = dataURL;

        img.onload = () => {
          this.$store.commit("addImage", img);
          this.$refs.fileImg.value = "";
        };
      };
    },
  },
};
</script>
