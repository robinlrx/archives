<template>
  <div class="loaderScreen">
    <button class="startButton" @click="start">Se réveiller</button>

    <!-- <div class="loaderScreen__progressBar">
      <div class="loaderScreen__progress"></div>
    </div> -->
    <h1 class="loaderScreen__load">0%</h1>
    <div class="loaderScreen__progressBar">
      <div class="loaderScreen__progress"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
  methods: {
    start() {
      this.$emit('launch')
    },
  },
}
</script>

<style>
.loaderScreen {
  position: absolute;
  z-index: 10;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.55s opacity ease-out;
}

.loaderScreen__load {
  padding: 0;
  color: #fff;
  font-family: Montserrat;
  font-weight: 200;
  user-select: none;
}

.loaderScreen__progressBar {
  width: 100%;
  position: absolute;
  background-color: #232323;
  display: flex;
}
.loaderScreen__progressBar:first-child {
  top: 0;
  justify-content: flex-start;
}
.loaderScreen__progressBar:last-child {
  bottom: 0;
  justify-content: flex-end;
}

.loaderScreen__progress {
  width: 0px;
  height: 4px;
  background-color: #fff;
  transition: 0.32s ease-out width;
}

.startButton {
  font-weight: bold;
  font-size: 28px;
  border: 0;
  padding: 15px 100px 15px 100px;
  cursor: pointer;
}
</style>