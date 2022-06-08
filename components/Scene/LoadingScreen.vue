<template>
  <div>
    <div class="loaderScreen">
      <transition name="fade">
        <div v-if="displayButton" class="start-button" @click="start">
          <p>COMMENCER</p>
        </div>
      </transition>

      <div class="logo-container" ref="logoClick">
        <img src="images/logo_intro.png" @click="playVideo" />
      </div>

      <div class="intro-container">
        <video
          ref="video"
          src="videos/intro.mp4"
          autoplay
          @click="playVideo"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
  data() {
    return { displayButton: false }
  },
  methods: {
    start() {
      this.$emit('launch')
    },
    playVideo() {
      this.$refs.video.play()
      this.$refs.logoClick.remove()
      this.$refs.video.addEventListener('timeupdate', () => {
        if (this.$refs.video.currentTime >= 10 && !this.displayButton) {
          this.displayButton = true
          this.$emit('loadModels')
        }
      })
    },
  },
}
</script>

<style scope>
@import '../../css/general.css';

* {
  font-family: 'Strong-concrete';
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.loaderScreen {
  position: absolute;
  z-index: 5;
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
.logo-container {
  position: absolute;
  width: 6%;
}

.logo-container img {
  width: 100%;
  height: auto;
}

.intro-container {
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  pointer-events: none;
  overflow: hidden;
}

@keyframes slide-top {
  0% {
    -webkit-transform: translateY(100px);
    transform: translateY(100px);
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
}
.intro-container video {
  width: 100%;
  height: auto;
  /* animation: slide-top 2s  cubic-bezier(0.25, 0.46, 0.45, 0.94) both; */
}
.start-button {
  position: absolute;
  bottom: 25%;
  width: 30%;
  padding: 0;
  margin: 0;
  font-size: 32px;
  color: black;
  text-align: center;
  background-color: #e0ecd2;
  /* border-bottom: solid 3px black;
  border-right: solid 3px black; */
  box-shadow: 0px 0px 0px #e0ecd229;
  border: solid 3px #e0ecd2;

  background-image: linear-gradient(to right, #e0ecd2 50%, #000000 0);
  background-position: 100% 50%;
  background-size: 200% 200%;
  transition: background-position 1s ease, box-shadow 3s ease;
}

.start-button p {
  margin: 4% 0% 5% 0;
  pointer-events: none;
}
</style>