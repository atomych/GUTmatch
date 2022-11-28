export default {
  state: {
    uid: "",
    email: "",
    name: "",
    age: "",
    about: "",
    tags: "",
    images: "",
    tg: "",
    imagesList: [],
  },
  actions: {},
  mutations: {
    setUserData(state, data) {
      state.email = data.email;
      state.name = data.name;
      state.age = data.age;
      state.tags = data.tags;
      state.images = data.images;
      state.about = data.about;
      state.tg = data.tg;
      state.likes = data.likes;
      state.pairs = data.pairs;
    },

    updatePairs(state, data) {
      state.pairs = data;
    },

    updateLikes(state, data) {
      state.likes = data;
    },

    addPair(state, id) {
      state.pairs.push(id);
    },

    removeLike(state, id) {
      state.likes = state.likes.filter((el) => el != id);
    },

    addImage(state, file) {
      state.images += 1;
      state.imagesList.push(file);
    },

    downloadImage(state, file) {
      state.imagesList.push(file);
    },

    setUID(state, uid) {
      state.uid = uid;
    },

    addTag(state, index) {
      state.tags.push(index);
    },

    removeTag(state, index) {
      state.tags = state.tags.filter((tag) => tag != index);
    },

    changeTg(state, value) {
      state.tg = value;
    },

    changeAbout(state, value) {
      state.about = value;
    },
  },
  getters: {
    pairs(state) {
      return state.pairs;
    },

    likes(state) {
      return state.likes;
    },

    nameAge(state) {
      return `${state.name}, ${state.age}`;
    },

    tags(state) {
      return Object.values(state.tags);
    },

    tg(state) {
      return state.tg;
    },

    about(state) {
      return state.about;
    },

    uid(state) {
      return state.uid;
    },

    images(state) {
      return state.images;
    },

    imagesList(state) {
      return state.imagesList;
    },
  },
};
