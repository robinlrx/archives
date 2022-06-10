<template>
  <div>
    <div class="loaderScreen" ref="loaderScreen">
      <section id="component--mouse" ref="componentMouse">

        <svg width="48" height="52" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_2552_4331" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="48"
            height="52">
            <path d="M0 8.75L8.75 0H48V51.5H0V8.75Z" fill="#5C5C5C" />
          </mask>
          <g mask="url(#mask0_2552_4331)">
            <path d="M27.1205 28.5483L26.2576 29.4159L18.4241 50.0678L4.93986 6.18265L46.9231 20.9136L27.1205 28.5483Z"
              fill="#EAF2D3" stroke="black" stroke-width="3" stroke-linejoin="bevel" />
            <path d="M27.2502 29.2498L20.0002 21.9998" stroke="black" stroke-width="3" />
          </g>
        </svg>

      </section>
      <div class="start-button" @click="start" ref="startButton">
      </div>
      <div class="start-button start-button-transition" ref="startButtonTransition">
      </div>

      <div class="loaderScreen__progressBar">
      </div>
      <div class="logo-container" ref="logoClick">
        <img src="images/intro_logo.png" @click="playVideo" />
      </div>

      <div class="intro-container">
        <video ref="video" src="videos/intro.mp4" controls></video>
        <video ref="videoTransition" style="display:none">

        </video>
      </div>
    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web';

export default {
  name: 'LoadingScreen',
  data() {
    return { displayButton: false }
  },
  mounted() {
    document.querySelector(".loaderScreen").addEventListener('mousemove', (e) => {
      if (this.$refs.componentMouse.style.opacity === "0")
        this.$refs.componentMouse.style.opacity = "1"
      this.$refs.componentMouse.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
    });
    this.$refs.videoTransition.src = this.supportsHEVCAlpha() ? 'videos/intro_transition.mov' : 'videos/intro_transition.webm';

    this.startButtonAnim = lottie.loadAnimation({
      container: this.$refs.startButton, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'lotties/start_button.json' // the path to the animation json
    });

  },
  methods: {
    start() {
      this.displayButton = false
      this.startButtonAnimTransition = lottie.loadAnimation({
        container: this.$refs.startButtonTransition, // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'lotties/start_button_transition.json' // the path to the animation json
      });
      this.startButtonAnimTransition.play()
      this.$refs.startButton.remove()
      this.$refs.videoTransition.play()
      this.$emit('launch')

      this.$refs.videoTransition.onended = () => {
        this.$refs.loaderScreen.remove()
      }

      // this.$emit('launch')
    },
    playVideo() {
      this.$refs.video.play()
      this.$refs.logoClick.remove()
      this.$refs.videoTransition.style.display = "block"

      this.$refs.video.addEventListener('timeupdate', () => {
        if (this.$refs.video.currentTime >= 10 && !this.displayButton) {
          this.startButtonAnim.play()
          this.displayButton = true
          this.$emit('loadModels')
        }

      })
      this.$refs.video.onended = () => {
        this.$refs.video.remove()
      }
    },
    supportsHEVCAlpha() {
      const navigator = window.navigator;
      const ua = navigator.userAgent.toLowerCase()
      const hasMediaCapabilities = !!(navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo)
      const isSafari = ((ua.includes('safari') !== -1) && (!(ua.includes('chrome') !== -1) && (ua.includes('version/') !== -1)))
      return isSafari && hasMediaCapabilities
    }
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
  transition: opacity 1.7s 3s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

#component--mouse {
  position: fixed;
  z-index: 6;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  pointer-events: none;
  transition: opacity .5s;
}

.loaderScreen {
  position: fixed;
  z-index: 5;
  top: 0;
  width: 100%;
  height: 100%;
  /* background-color: #000; */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.55s opacity ease-out;
  cursor: none
}

.logo-container {
  position: absolute;
  width: 6%;
  z-index: 4
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

.intro-container video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.intro-container video:first-of-type {
  z-index: 1
}

.start-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  z-index: 4;

}

.start-button-transition {
  z-index: 3
}
</style>