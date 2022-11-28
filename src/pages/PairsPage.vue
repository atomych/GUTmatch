<template>
  <section class="wrapper">
    <h1 class="title">Мои пары</h1>
    <ul class="list">
      <li class="list__item" v-for="(item, index) in list" :key="index">
        <div class="img">
          <img
            :src="
              item.image ? item.image.src : 'https://via.placeholder.com/80'
            "
            alt=""
            width="80"
            height="80"
          />
        </div>
        <div class="information">
          <div class="name">
            <span>{{ item.name }}, {{ item.age }}</span>
            <tg-link :tg="item.teleg" />
          </div>
          <tags-list class="tags" :tags="item.tags" />
        </div>
      </li>
    </ul>

    <download-spinner v-if="download" />
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 30px;

  position: relative;
}

.logo {
  justify-content: center;
  padding: 30px 0;
}

.title {
  font-size: 30px;
  font-weight: 400;
  padding-left: 20px;
  margin-bottom: 20px;

  width: 100%;
  max-width: 400px;
}

.list {
  max-width: 400px;
  margin: 0 auto;

  list-style: none;

  flex-grow: 1;

  overflow-y: scroll;

  padding: 0 10px;

  &__item {
    display: flex;

    margin-bottom: 20px;

    position: relative;

    &::after {
      display: block;
      position: absolute;
      content: "";

      width: 280px;
      height: 1px;

      background-color: #838383;

      right: 10px;
      bottom: 0;
    }

    &:last-child::after {
      display: none;
    }

    .img {
      display: flex;
      align-items: center;

      img {
        display: block;
        border-radius: 50%;
      }
    }

    .information {
      flex-grow: 1;

      padding: 0 5px;

      .name {
        display: flex;
        align-items: center;

        margin-bottom: 15px;

        span {
          font-size: 17px;
          font-weight: 400;

          margin-right: 10px;
        }
      }

      .tags {
        justify-content: start;
      }
    }
  }
}
</style>

<script>
import TgLink from "../components/TgLink.vue";
import TagsList from "../components/TagsList.vue";
import DownloadSpinner from "../components/DownloadSpinner.vue";

import { mapGetters } from "vuex";
import { readData } from "../firebase/database";
import { downloadImage } from "../firebase/storage";

export default {
  name: "PairsPage",

  components: {
    TgLink,
    TagsList,
    DownloadSpinner,
  },

  data() {
    return {
      download: false,
      list: [],
    };
  },

  async mounted() {
    if (this.pairs.length) this.download = true;

    for (let index = 0; index < this.pairs.length; index++) {
      const id = this.pairs[index];

      readData(`${id}`).then((snapshot) => {
        const data = snapshot.val();
        const obj = {
          name: data.name,
          age: data.age,
          tags: data.tags ? data.tags : [],
          teleg: data.tg,
        };

        if (data.images != 0) {
          downloadImage(`${id}/img0`).then((dataURL) => {
            const img = new Image();
            img.src = dataURL;

            obj.image = img;
            this.list.push(obj);

            if (index == this.pairs.length - 1) this.download = false;
          });
        } else {
          this.list.push(obj);
          if (index == this.pairs.length - 1) this.download = false;
        }
      });
    }
  },

  computed: {
    ...mapGetters(["pairs"]),
  },
};
</script>
