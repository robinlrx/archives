import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Model {
  constructor({ src, audioSrc, loadingManager, listener, material }) {
    this.src = src
    this.audioSrc = audioSrc
    this.material = material
    this.loadingManager = loadingManager
    this.listener = listener
    this.container = new THREE.Object3D()
    this.container.name = this.src
    this.init()
  }

  init() {
    this.loadModel()
    this.initSound()

    // this.initSound()
  }

  initSound() {
    console.log(this.listener)
    const sound = new THREE.PositionalAudio(this.listener)
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load(`sounds/${this.audioSrc}`, (buffer) => {
      sound.setBuffer(buffer)
      sound.setVolume(1)
      sound.play()
    })
    this.container.add(sound)
  }

  loadModel(callback) {
    const loader = new GLTFLoader(this.loadingManager)

    loader.load(`models/${this.src}.gltf`, (gltf) => {
      if (typeof callback === 'function') {
        callback(gltf.scene)
      }

      if (this.material) {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material = this.material
          }
        })
      }
      //   this.scene.add(gltf.scene)
      this.container.add(gltf.scene)
    })
  }
}
