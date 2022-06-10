<template>
  <div>
    <LoadingScreen @launch="lauchExperience" @loadModels="loadModels" />
    <Focus />
    <Cross />
    <GUI />
    <Scene :isLaunched="isLaunched" ref="scene" />
  </div>
</template>

<script>
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
      this.$refs.scene.scene.wakeUpCutscene()
    },
    loadModels() {
      this.$refs.scene.loadModels()
    },
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
