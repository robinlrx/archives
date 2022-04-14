import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Model {
  constructor({
    src,
    audioSrc,
    audioVolume = 1,
    audioDistance = 1,
    loadingManager,
    listener,
    material,
    videoContainer,
    videoSrc
  }) {
    this.src = src
    this.audioSrc = audioSrc
    this.audioVolume = audioVolume
    this.audioDistance = audioDistance
    this.material = material
    this.loadingManager = loadingManager
    this.listener = listener
    this.videoContainer = videoContainer
    this.videoSrc = videoSrc
    this.container = new THREE.Object3D()
    this.container.name = this.src
    this.init()
  }

  init() {
    this.loadModel()
  }

  initSound(target) {
    const sound = new THREE.PositionalAudio(this.listener)
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load(`${this.audioSrc}`, (buffer) => {
      sound.setBuffer(buffer)
      sound.setVolume(this.audioVolume)
      sound.setRefDistance(this.audioDistance)
      sound.play()
    })
    target.add(sound)
  }

  initVideoTexture(target) {
    const video = document.createElement('video')
    video.src = this.videoSrc
    video.setAttribute('loop', '')
    video.muted = true
    video.load() // must call after setting/changing source
    const texture = new THREE.VideoTexture(video)

    texture.format = THREE.RGBAFormat
    const videoMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide
    })
    target.material = videoMaterial
    target.material.map.image.play()
  }

  loadModel(callback) {
    const loader = new GLTFLoader(this.loadingManager)

    loader.load(`models/${this.src}.gltf`, (gltf) => {
      gltf.scene.name = this.src
      if (typeof callback === 'function') {
        callback(gltf.scene)
      }

      if (this.material) {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material = this.material
          }
          if (this.videoSrc && child.name === this.videoContainer) {
            this.initVideoTexture(child)
          }
        })
      }
      //   this.scene.add(gltf.scene)
      if (this.audioSrc) this.initSound(gltf.scene.children[0])
      this.container.add(gltf.scene)
    })
  }
}
