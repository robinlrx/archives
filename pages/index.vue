<template>
  <div>
    <LoadingScreen @wakeUpCutscene="lauchExperience" @loadModels="loadModels" />
    <Focus />
    <Cross />
    <GUI ref="tuto" />
    <Scene :isLaunched="isLaunched" ref="scene" />
  </div>
</template>

<script>
import { gsap, Power3, } from 'gsap'
import Scene from '@/components/Scene/Scene'
import GUI from '@/components/Scene/GUI'
import Cross from '@/components/Scene/Cursor'
import LoadingScreen from '@/components/Scene/LoadingScreen'
import Focus from '@/components/Scene/Focus'

export default {
  components: {
    Scene,
    GUI,
    Cross,
    LoadingScreen,
    Focus,
  },
  data() {
    return {
      isLaunched: false,
    }
  },
  methods: {
    lauchExperience() {
      this.isLaunched = true
      this.wakeUpCutscene()
    },
    loadModels() {
      this.$refs.scene.scene.initManager()
      this.$refs.scene.scene.initModels()
      this.$refs.scene.scene.initBackgroundNoise()

    },
    wakeUpCutscene() {
      const camera = this.$refs.scene.scene.camera
      this.wakeUpCutsceneTL = gsap.timeline()
      this.wakeUpCutsceneTL.to(camera.position, {
        x: 0,
        y: 11,
        z: -10,
        duration: 0.6,
        delay: 1.8,
        ease: Power3,
      })
      this.wakeUpCutsceneTL.to(
        camera.rotation,
        {
          x: 0.16,
          duration: 0.6,
          ease: Power3,
        },
        '<'
      )
      this.wakeUpCutsceneTL.to(
        camera.rotation,
        {
          x: 0.18,
          duration: 0.3,
          ease: Power3,
        },
        '>'
      )
      this.wakeUpCutsceneTL.to(
        camera.rotation,
        {
          x: 0.16,
          y: 0.23,
          duration: 0.6,
          ease: Power3,
        },
        '>-0.1'
      )
      this.wakeUpCutsceneTL.to(
        camera.rotation,
        {
          x: 0.16,
          y: -0.35,
          duration: 0.6,
          ease: Power3,
          onComplete: () => {
            this.$refs.tuto.playAnim()
          }
        },
        '>0.1',
      )
      this.wakeUpCutsceneTL.to(
        camera.position,
        {
          x: 0,
          y: 11,
          z: -7,
          duration: 1,
          ease: Power3,
        },
        '>'
      )
      this.wakeUpCutsceneTL.to(
        camera.rotation,
        {
          x: 0,
          y: 0,
          duration: 1,
          ease: Power3,
        },
        '<',
      )
      this.wakeUpCutsceneTL.play()
    }
  },
}
</script>
<style>
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #000000
}
</style>
