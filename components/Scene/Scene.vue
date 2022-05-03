<template>
  <div ref="container" class="scene coverdiv"></div>
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
    }
  },
  watch: {
    isLaunched() {
      if (this.isLaunched) this.scene.playMedias()
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
  methods: {},
}
</script>

<style scoped>
</style>