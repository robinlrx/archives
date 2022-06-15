<template>
  <div class="loaderScreen" ref="loaderScreen">
    <transition name="fade">
      <section v-if="showCursor" id="component--mouse" ref="componentMouse">
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
    </transition>

    <div class="button-container" ref="buttonContainer" v-if="displayButton" @click="start">
      <div class="wakeUpButton" ref="wakeUpButton">SE RéVEILLER</div>
      <div class="loaderScreen__progressBar">
      </div>
    </div>


    <div class="logo-container" ref="logoClick">
      <img src="images/intro_logo.png" @click="playVideo" />
    </div>

    <div class="intro-container" ref="intro_container">
      <video ref="video" src="videos/intro.mp4"></video>
      <video ref="videoTransition" style="display:none">

      </video>
    </div>
  </div>
  </transition>

</template>

<script>
// import lottie from 'lottie-web';
import { Howl } from 'howler';


export default {
  name: 'LoadingScreen',
  data() {
    return { displayButton: false, showCursor: false, cutscenePlaying: false }
  },
  mounted() {

    this.$refs.video.addEventListener('loadeddata', () => {
      if (this.$refs.video.readyState >= 2) {
        this.$refs.intro_container.style.opacity = "1"
      }
    })
    document.querySelector(".loaderScreen").addEventListener('mousemove', (e) => {
      if (!this.showCursor) {
        this.showCursor = !this.showCursor
      }
      else {
        this.$refs.componentMouse.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
      }
    });
    this.$refs.videoTransition.src = this.supportsHEVCAlpha() ? 'videos/intro_transition.mov' : 'videos/intro_transition.webm';
    this.transitionVoiceOver = new Howl({
      src: ['sounds/intro_transition_voice.wav'],
      html5: true
    });

  },
  methods: {
    playVideo() {
      this.$refs.video.play()
      this.$refs.logoClick.remove()
      this.$refs.videoTransition.style.display = "block"

      this.$refs.video.addEventListener('timeupdate', () => {
        if (this.$refs.video.currentTime >= 10 && !this.displayButton) {
          this.displayButton = true
          this.$emit('loadModels')
        }

      })
      this.$refs.video.onended = () => {
        this.$refs.video.remove()
        document.querySelector(".canvas-container").style.opacity = "0.8"
      }
    },
    start() {
      this.$refs.videoTransition.play()
      document.querySelector(".button-container").classList.add("button-container-transition")
      document.querySelector("#component--mouse").classList.add("cursor-container-transition")

      this.$refs.videoTransition.addEventListener('timeupdate', () => {
        if (this.$refs.videoTransition.currentTime >= 1 && !this.cutscenePlaying) {
          this.cutscenePlaying = true
          this.$emit('wakeUpCutscene')
        }
      })
      this.transitionVoiceOver.play();
      this.$refs.videoTransition.onended = () => {
        this.$refs.loaderScreen.remove()
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
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

#component--mouse {
  position: fixed;
  z-index: 6;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  pointer-events: none;
  /* opacity: 0;
  transition: opacity .5s; */
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
  transition: opacity 1.4s 0.4s ease;
  opacity: 0;
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

.button-container {
  position: fixed;
  z-index: 2;
  bottom: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  width: 18%;
  transition: opacity 0.8s ease;
  animation: buttonContainerSlide 2s ease both;
}

.button-container-transition {
  animation: buttonContainerSlideOff 1s ease both;

}

@keyframes buttonContainerSlide {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0%);
    opacity: 1
  }
}

@keyframes buttonContainerSlideOff {
  from {
    transform: translateY(0%);
    opacity: 1;
  }

  to {
    transform: translateY(100%);
    opacity: 0
  }
}

.cursor-container-transition {
  animation: cursorSlideOff 0.5s ease both;

}

@keyframes cursorSlideOff {
  from {
    opacity: 1;
  }

  to {
    opacity: 0
  }
}

.wakeUpButton {
  color: #f1efe526;
  transition: color 0.8s ease;
  width: 100%;
  font-size: 20px;
  pointer-events: none;
}

.active-button {
  pointer-events: initial;
  color: #f1efe575;
  transition: color 0.8s ease;

}

.button-container:hover .active-button {
  color: #F1EFE5;
  transition: color 0.4s ease;
}

.loaderScreen__progressBar {
  width: 1%;
  transition: width 1s 2s ease, background-color 1s 2s ease;
  height: 2px;
  background-color: transparent;
  margin-top: 5px
}
</style>