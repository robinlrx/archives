<template>
  <div>
    <Focus />
    <LoadingScreen @launch="lauchExperience" />
    <Cross />
    <GUI />
    <Scene :isLaunched="isLaunched" />
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
}
</style>
