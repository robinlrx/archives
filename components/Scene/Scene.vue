<template>
  <div class="canvas-container">
    <div ref="white_fade" class="white-fade" style="
        width: 100vw;
        height: 100vh;
        position: absolute;
        background-color: #black;
        z-index: 10;
        transform: opacity 0.8s ease;
        opacity: 0;
        pointer-events: none;
      "></div>
    <div ref="container" class="scene coverdiv"></div>
  </div>
</template>

<script>
// import * as THREE from 'three'
import SceneInit from './Scene-init'

export default {
  components: {},
  props: {
    isLaunched: Boolean,
  },
  data() {
    return {
      models: ['tasse'],
      objects: [],
      pageTransition: false,
    }
  },
  watch: {
    isLaunched() {
      if (this.isLaunched) {
        this.scene.playMedias()
        // this.timeUp()
      }
    },
  },
  created() {
    this.$nuxt.$on('MESH_UPDATE', this.updateMesh)
  },
  destroyed() {
    this.$nuxt.$off('MESH_UPDATE', this.updateMesh)
  },
  mounted() {
    this.scene = SceneInit({ rootEl: this.$refs.container })
  },
  methods: {
    timeUp() {
      setTimeout(() => {
        document.querySelector(".canvas-container").style.opacity = 0
        this.scene.endCutscene()

        setTimeout(() => {
          this.scene.stopMedias()
          // this.$nuxt.$router.push('/question')
          window.location.href = "/question"
        }, 2000)
      }, 170000) // 4 min = 240000
    },
  },
}
</script>

<style >
.canvas-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  opacity: 0;
  transition: opacity 0.5s ease, filter 0.8s ease;
  filter: blur(0px);
  z-index: 2;
}

.white-fade {
  transition: opacity 0.8s ease;
  opacity: 0
}
</style>