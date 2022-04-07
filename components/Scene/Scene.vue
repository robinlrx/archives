<template>
  <div ref="container" class="scene coverdiv"></div>
</template>

<script>
import * as THREE from 'three'
import SceneInit from './Scene-init'

export default {
  data() {
    return {
      models: ['office2', 'TV1', 'TV2'],
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
    const matcapTexture = new THREE.TextureLoader().load(
      'textures/7A7A7A_D0D0D0_BCBCBC_B4B4B4-512px.png'
    )
    matcapTexture.encoding = THREE.sRGBEncoding

    this.previewMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
      side: THREE.DoubleSide,
    })

    this.scene = SceneInit({ rootEl: this.$refs.container })
    this.loadModel()
  },
  methods: {
    applyVideoTexture(modelTarget, src) {
      const video = document.createElement('video')
      video.src = src
      video.setAttribute('loop', '')
      video.load() // must call after setting/changing source
      const texture = new THREE.VideoTexture(video)
      // texture.minFilter = THREE.LinearFilter
      // texture.magFilter = THREE.LinearFilter
      texture.format = THREE.RGBAFormat
      const videoMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
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
              child.material = this.previewMaterial
            }
          })
          if (this.models[i] === 'TV1') {
            model.camPosition = new THREE.Vector3(11.0, 11.5, -0.5)
            model.getObjectByName('Screen').scale.z = -1
            model.getObjectByName('Screen').position.z = -50
            this.applyVideoTexture(
              model.getObjectByName('Screen'),
              'videos/france2-lucet.mp4'
            )
          }
          if (this.models[i] === 'TV2') {
            model.camPosition = new THREE.Vector3(12.2, 16.8, 6)
            console.log(model)
            // model.getObjectByName('Screen').scale.z = -1
            // model.getObjectByName('Screen').position.z = -50
            this.applyVideoTexture(
              model.getObjectByName('ScreenTV2_2'),
              'videos/france2-proces.mp4'
            )
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