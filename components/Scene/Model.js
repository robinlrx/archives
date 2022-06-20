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
    camPos,
    action,
    index,
    isNotPositional,
    addDefaultPosition,
    scene2,
    scene1,
    website,
    camera,
    card,
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
    this.camPos = camPos
    this.action = action
    this.index = index
    this.isNotPositional = isNotPositional
    this.addDefaultPosition = addDefaultPosition
    this.scene2 = scene2
    this.scene1 = scene1
    this.website = website
    this.camera = camera
    this.card = card
    this.init()
  }

  init() {
    this.loadModel()
  }

  initSound(target) {
    if (this.isNotPositional) this.sound = new THREE.Audio(this.listener)
    else this.sound = new THREE.PositionalAudio(this.listener)
    this.sound.name = 'PositionalAudio'
    this.audioLoader = new THREE.AudioLoader()
    this.audioLoader.load(`${this.audioSrc}`, (buffer) => {
      if (!this.isNotPositional) this.sound.setRefDistance(this.audioDistance)
      this.sound.setLoop(true)
      this.sound.setBuffer(buffer)
      this.sound.setVolume(this.audioVolume)
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
      side: THREE.DoubleSide,
    })
    target.material = videoMaterial
    texture.flipY = false
    this.video = target.material.map.image
  }

  initImage(target) {
    // const texture = new THREE.TextureLoader()
    const imageTexture = this.website
    // create the plane mesh
    const material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      map: imageTexture,
    })
    imageTexture.flipY = false
    imageTexture.needsUpdate = true
    material.needsUpdate = true
    target.material = material
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

      if (gltf.animations) {
        this.mixer = new THREE.AnimationMixer(gltf.scene)
        gltf.animations.forEach((clip) => {
          this.mixer.clipAction(clip).play()
        })
      }
      gltf.scene.traverse((child) => {
        child.objectName = this.src

        if (this.addDefaultPosition) {
          child.defaultPosition = child.getWorldPosition(new THREE.Vector3())
          child.defaultRotation = child.getWorldQuaternion(
            new THREE.Quaternion()
          )
        }
        if (child.isMesh) {
          child.material.side = THREE.DoubleSide
          child.castShadow = true
          child.receiveShadow = true
        }
        if (child.name === 'journal014') child.card = 'cardMedia1'
        if (child.name === 'journal015') child.card = 'cardMedia3'
        if (child.name === 'journal007') child.card = 'cardMedia10'
        if (child.name === 'journal016') child.card = 'cardMedia16'
        if (child.name === 'journal017') child.card = 'cardMedia16'

        if (this.videoSrc && child.name === this.videoContainer) {
          this.initVideoTexture(child)
        }
        if (this.material && child.name !== this.videoContainer) {
          child.material = this.material
        }

        if (this.website && child.name === this.videoContainer) {
          this.initImage(child)
        }
      })

      //   this.scene.add(gltf.scene)
      if (this.audioSrc) this.initSound(gltf.scene.children[0])
      this.container.add(gltf.scene)
      this.container.position.set(0, 6, -30)
      this.container.rotation.y = Math.PI
    })
  }
}
