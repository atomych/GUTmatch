<template>
  <section class="wrapper">
    <div class="error">
      <span class="number">4</span>
      <img src="../assets/fox.png" alt="" />
      <span class="number">4</span>
    </div>

    <div class="content">
      <div class="icons">
        <div class="icon">
          <img src="../assets/google-play.png" alt="" />
        </div>
        <div class="icon">
          <img src="../assets/app-store.png" alt="" />
        </div>
      </div>

      <div class="text">
        может ты еще и тик ток на компе смотришь, <br />
        давай скорее скачивай наше приложение
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.error {
  display: flex;
  align-items: center;

  .number {
    font-size: 320px;
    font-weight: 400;
    color: #e66606;
  }
}

.content {
  display: flex;
  flex-direction: column;

  .icons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    .icon:first-child {
      margin-right: 80px;
    }
  }

  .text {
    text-align: center;
    color: #000;
    font-size: 30px;
    font-weight: 500;
    opacity: 0.5;
  }
}
</style>
