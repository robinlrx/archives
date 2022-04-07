<template>
  <div ref="container" class="scene coverdiv"></div>
</template>

<script>
import * as THREE from 'three'
import SceneInit from './Scene-init'

export default {
  data() {
    return {
      models: ['office', 'TV1'],
      objects: [],
    }
  },
  created() {
    this.$nuxt.$on('MESH_UPDATE', this.updateMesh)
  },
  destroyed() {
    this.$nuxt.$off('MESH_UPDATE', this.updateMesh)
  },
  mounted() {
    // const matcapTexture = new THREE.TextureLoader().load(
    //   'textures/38925D_142B23_1D4835_2A6449-512px.png'
    // )
    this.previewMaterial = new THREE.MeshDepthMaterial({
      // matcap: matcapTexture,
      side: THREE.DoubleSide,
    })

    this.scene = SceneInit({ rootEl: this.$refs.container })
    this.loadModel()
  },
  methods: {
    applyVideoTexture(modelTarget) {
      const video = document.createElement('video')
      video.src = 'videos/france2-proces.mp4'
      video.load() // must call after setting/changing source
      const texture = new THREE.VideoTexture(video)
      // texture.minFilter = THREE.LinearFilter
      // texture.magFilter = THREE.LinearFilter
      texture.format = THREE.RGBAFormat
      const videoMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        emissive: 0xffffff,
      })
      modelTarget.material = videoMaterial
      // modelTarget.material.map.image.play()
    },

    /**
     * setActiveMesh - Set active mesh, assign a material map that duplicates the editor canvas
     *
     * @param {string} mesh          model mesh
     * @param {boolean} forward      go to the next or previous sibling
     * @param {boolean} onModelLoad  On model load
     *
     */

    loadModel() {
      //   this.isLoaded = false
      for (let i = 0; i < this.models.length; i++) {
        this.scene.loadModel(`models/${this.models[i]}.gltf`, (model) => {
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true
              child.receiveShadow = true
              child.material = this.previewMaterial
            }
          })
          if (this.models[i] === 'TV1') {
            model.camPosition = new THREE.Vector3(11.0, 11.5, -0.5)
            model.getObjectByName('Screen').scale.z = -1
            model.getObjectByName('Screen').position.z = -50
            this.applyVideoTexture(model.getObjectByName('Screen'))
            console.log(model.getObjectByName('Screen'))
          }
          this.scene.add(model)
        })
      }
    },
  },
}
</script>

<style scoped>
</style>