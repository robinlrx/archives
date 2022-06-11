<template>
  <transition name="fade">
    <div v-if="showTuto" id="tuto-container">
      <div id="mouse-container" ref="mouseContainer">
      </div>
      <div id="text-container" ref="textContainer">
      </div>
      <img src="images/vignette.png" />

    </div>
  </transition>
</template>

<script>
import lottie from 'lottie-web';

export default {
  name: "GUI", data() {
    return { showTuto: false }
  }, mounted() {
    this.tutoLottie = lottie.loadAnimation({
      container: this.$refs.mouseContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'lotties/tuto.json'
    });
    this.tutoTextLottie = lottie.loadAnimation({
      container: this.$refs.textContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'lotties/tuto_text.json'
    });
    this.tutoLottie.addEventListener("complete", () => {
      this.showTuto = false
      document.querySelector(".canvas-container").style.filter = "blur(0px);"

    })
  },
  methods: {
    playAnim() {
      this.showTuto = true
      this.tutoLottie.play()
      this.tutoTextLottie.play()
      document.querySelector(".canvas-container").style.filter = "blur(4px);"
    }
  }
}

</script>

<style scope>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .8s ease
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

#tuto-container {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
}

#mouse-container {
  max-width: 18%;
}

#text-container {
  max-width: 18%;
  position: fixed;
  bottom: 12%;
}

img {
  width: 100%;
  height: 100%;
  position: fixed
}
</style>