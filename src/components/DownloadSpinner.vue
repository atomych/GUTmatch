<template>
  <section class="back">
    <div class="spiner"></div>
  </section>
</template>

<style lang="scss" scoped>
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(129, 129, 129);

  z-index: 100;
}

.spiner {
  width: 50px;
  height: 50px;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  border-top: 10px solid #fabc90;
  border-left: 10px solid #fabc90;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-radius: 50%;

  background-color: transparent;

  z-index: 101;

  animation: spiner 1s linear infinite;
}

@keyframes spiner {
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>

<script>
export default {
  name: "DownloadSpinner",
};
</script>
