import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

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
    videoSrc,
    action
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
    this.action = action
    this.init()
  }

  init() {
    this.loadModel()
  }

  initSound(target) {
    this.sound = new THREE.PositionalAudio(this.listener)
    this.sound.name = 'PositionalAudio'
    this.audioLoader = new THREE.AudioLoader()
    this.audioLoader.load(`${this.audioSrc}`, (buffer) => {
      this.sound.setLoop(true)
      this.sound.setBuffer(buffer)
      this.sound.setVolume(this.audioVolume)
      this.sound.setRefDistance(this.audioDistance)
    })
    target.add(this.sound)
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
    texture.flipY = false
    this.video = target.material.map.image
  }

  loadModel(callback) {
    const dracoLoader = new DRACOLoader()

    dracoLoader.setDecoderPath('draco/')

    dracoLoader.preload()
    const loader = new GLTFLoader(this.loadingManager)
    loader.setDRACOLoader(dracoLoader)

    loader.load(`models/${this.src}.gltf`, (gltf) => {
      if (typeof callback === 'function') {
        callback(gltf.scene)
      }

      gltf.scene.traverse((child) => {
        child.objectName = this.src
        if (this.videoSrc && child.name === this.videoContainer) {
          this.initVideoTexture(child)
        }
        if (this.material && child.name !== this.videoContainer) {
          child.material = this.material
        }
      })

      //   this.scene.add(gltf.scene)
      if (this.audioSrc) this.initSound(gltf.scene.children[0])
      this.container.add(gltf.scene)
    })
  }
}
