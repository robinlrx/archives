<template>
  <div id="tuto-container" ref="introContainer" class="active">
    <div id="mouse-container" ref="mouseContainer">
    </div>
    <div id="text-container" ref="textContainer">
    </div>
    <img src="images/vignette.png" />
  </div>
</template>

<script>
import lottie from 'lottie-web';
export default {
  name: "GUI", data() {
    return {}
  }, mounted() {
    this.tutoLottie = lottie.loadAnimation({
      container: this.$refs.mouseContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'lotties/tuto.json'
    });
    this.tutoTextLottie = lottie.loadAnimation({
      container: this.$refs.textContainer,
      renderer: 'svg',
      loop: false, autoplay: false,
      path: 'lotties/tuto_text.json'
    });

    this.tutoLottie.addEventListener("complete", () => {
      this.$refs.introContainer.style.opacity = 0
      this.$refs.introContainer.classList.remove("active")
      this.$emit("tutoEnded")
      document.querySelector(".canvas-container").style.filter = "blur(0px)"
      setTimeout(() => {
        this.$refs.introContainer.style.display = "none"
      }, 1500);
    })
  },
  methods: {
    playAnim() {
      this.$refs.introContainer.style.opacity = 1
      document.querySelector(".canvas-container").style.filter = "blur(4px)"
      this.tutoLottie.play()
      this.tutoTextLottie.play()
    }
  }
}

</script>

<style scope>
#tuto-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.65);
  cursor: none;
  opacity: 0;
  transition: opacity .8s ease
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