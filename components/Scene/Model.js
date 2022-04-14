import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Model {
  constructor({ src, audioSrc, audioVolume=1, audioDistance=1, loadingManager, listener, material }) {
    this.src = src
    this.audioSrc = audioSrc
	this.audioVolume = audioVolume
	this.audioDistance= audioDistance
    this.material = material
    this.loadingManager = loadingManager
    this.listener = listener
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
	  if (this.audioSrc) this.initSound(gltf.scene.children[0])

      this.container.add(gltf.scene.children[0])
    })
  }
}
