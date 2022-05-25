<template>
  <div class="loaderScreen">
    <div class="logo-container"><img src="images/logo.svg" /></div>

    <div class="loaderScreen__progressBar">
      <div class="loaderScreen__progress"></div>
    </div>
    <button class="startButton" @click="start">Se réveiller</button>
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
  user-select: none;
  border: 1px solid white;
}

.loaderScreen__progressBar {
  width: 50%;
  height: 10px;
  background-color: #232323;
  display: flex;
  opacity: 0;
  animation: progressAppareance 1s 4s ease both;
  pointer-events: none;
  transition: 1.4s ease-out opacity;
}
.loaderScreen__progressBar:first-child {
  top: 0;
  height: 100%;

  justify-content: flex-start;
}
.loaderScreen__progressBar:last-child {
  bottom: 0;
  justify-content: flex-end;
}

.loaderScreen__progress {
  width: 0px;
  height: 100%;
  background-color: #fff;
  transition: 1s ease-in width;
}

.none-opacity {
  animation: noneOpacity 1.4s 0.4s ease-in-out both;
}

@keyframes noneOpacity {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes progressAppareance {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.logo-container {
  position: absolute;
  width: 40%;
  opacity: 0;
  animation: logoAppearance 4s 1s ease-in-out both;
  pointer-events: none;
}

@keyframes logoAppearance {
  0% {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }

  20% {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }

  40% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }

  60% {
    opacity: 0.5;

    transform: translateY(0%);
  }

  90% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

    transform: translateY(-140%);
  }
}

.logo-container img {
  width: 100%;
  height: auto;
}

.startButton {
  font-weight: bold;
  font-size: 28px;
  border: 0;
  padding: 15px 100px 15px 100px;
  cursor: pointer;
  display: none;
  animation: buttonAppareance 1s ease both;
}

@keyframes buttonAppareance {
  0% {
    opacity: 0;
    transform: translateY(40%);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>