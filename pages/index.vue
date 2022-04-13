<template>
  <div>
    <LoadingScreen />
    <Cross />
    <GUI />
    <Scene />
  </div>
</template>

<script>
import Scene from '@/components/Scene/Scene'
import GUI from '@/components/Scene/GUI'
import Cross from '@/components/Scene/Cursor'
import LoadingScreen from '@/components/Scene/LoadingScreen'

export default {
  components: {
    Scene,
    GUI,
    Cross,
    LoadingScreen
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
